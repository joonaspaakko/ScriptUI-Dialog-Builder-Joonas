
// When the item type is not a fitting variable name...
function customVarNames( style, type, parentType, counters ) {
	
	var result;
	if ( style.varName ) {
		var cvCounter = counters[ style.varName.toLowerCase() ];
		result = style.varName + ( cvCounter > 0 ? cvCounter : '' );
	}
	else {
		switch ( type ) {
			case "dropdownlist":
				result = 'dropdown' + counters[ type ];
				break;
			case "tabbedpanel":
				result = 'tpanel' + counters[ type ];
				break;
			case "dialog": // This otherwise fine as is, I just forgot that dialog doesn't need the counters :/
				result = type;
				break;
			default:
				result = type + counters[ type ];
		}
	}
	return result;
	
}

function makeJSXitem( index, data, counters, jsxParents, type, id, parentId, parentType, style, previousItem, growTree, lastLoop ) {
	
	var tabsies = '    ';
	var multilineText = [false];
	
	var block = '';
	var lowerCaseType = type.toLowerCase();
	
	if ( style.varName ) {
		++counters[ style.varName.toLowerCase() ];
	}
	else {
		++counters[ lowerCaseType ];
	}
	
	var jsxVarName = customVarNames( style, lowerCaseType, parentType, counters );
	jsxParents[ id ] = jsxVarName;
	var jsxParentName = jsxParents[ parentId ];
	
	// If current item is a parent...
	if ( type !== "TreeItem" ) {
		if ( item.list[ type.toLowerCase() ](false).parent ) {
			block += '// '+ jsxVarName.toUpperCase() +'\n';
			block += '// '+ Array(jsxVarName.length+1).join("=") +'\n';
		}
		else if ( previousItem.parent !== jsxParentName && previousItem.name !== jsxParentName ) {
			block += '// '+ jsxParentName.toUpperCase() +'\n';
			block += '// '+ Array(jsxParentName.length+1).join("=") +'\n';
		}
	}
	
	var dialog = $('#dialog');
	
	// This is where each item is first added
	switch ( type ) {
		
		case 'Dialog':
			block += 'var '+ jsxVarName +' = new Window("'+ lowerCaseType +'"); \n';
			break;
			
		case 'ListBox':
		case 'DropDownList':
			var list = style.listItems.split('\n').join('').split(',');
			$.each( list, function( i ) {
				list[ i ] = list[ i ].trim();
			});
			block += 'var '+ jsxVarName +'_array = ["' + list.join('","') + '"]; \n';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'", undefined, '+ jsxVarName +'_array';
			if ( style.selection !== undefined ) {
				if ( type === 'ListBox' && style.selection.length > 1 ) {
					block += ', {multiselect: true}';
				}
			}
			block += '); \n';
			break;
			
		case 'Divider':
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("panel"); \n';
			break;
			
		case 'TreeView':
			var dialogTreeViewItem = dialog.find('[data-item-id="'+ id +'"]');
			var width = style.preferredSize[0] > 0 ? style.preferredSize[0] : Math.round( dialogTreeViewItem.width() );
			var height = style.preferredSize[1] > 0 ? style.preferredSize[1] : Math.round( dialogTreeViewItem.height() );
			var extra = 0;
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ type.toLowerCase() +'", [0,0,'+ (width+extra) +','+ (height+extra) +']); \n';
			break;
			
		case 'TreeItem':
			var dialogTreeItem = dialog.find('[data-item-id="'+ id +'"]');
			var itemName = dialogTreeItem.hasClass('tree-node') ? 'node' : 'item';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ itemName +'", "'+ style.text +'"); \n';
			break;
			
		case 'StaticText':
			multilineText = multilineCheck( id );
			
			// ScriptUI has issues with multiline text if you don't define both
			// width and height. Let's say you only set width... what it appears to
			// do is it creates the item, applies width and height to the bounds
			// based on how ever the text flows as is and then it applies the
			// width or height you wanted gave it... and that changes the text
			// flow, often resulting in unnecessary whitespace below the text.
			// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
			// Normally you could just give it a static width + height and call it a
			// day... but because this is a separate web app that simulates the ScriptUI,
			// not to mention all the differences between Adobe Applications... It's
			// totally not a mirror image of ScriptUI. So my original bandaid was to
			// give a static width and height on export aaand to also try and make the
			// text pixel perfect, which proved to be impossible. Because of these small
			// differences, the text will flow slightly differently. It's basically a
			// gamble. It might look perfect... It might also get whitespace below the text
			// or even worse... Some text might overflow the container and not show up.
			// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
			// To tackle this issue I basically split multiline text into multiple one line
			// statictext items and place them in a group. Problem solved for static text.
			// Since this operation is done on export, it doesn't affect the import JSON.
			// Obviously it does make it harder to edit the text once it's been exported...
			if ( multilineText[0] ) {
				
				// ADD PARENT GROUP
				block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("group"); \n';
				// PREFERRED SIZE
				if ( style.preferredSize !== undefined  ) {
					if ( style.preferredSize[0] > 0 ) {
						block += tabsies + jsxVarName +'.preferredSize.width = '+ style.preferredSize[0] +'; \n';
					}
					if ( style.preferredSize[1] > 0 ) {
						block += tabsies + jsxVarName +'.preferredSize.height = '+ style.preferredSize[1] +'; \n';
					}
				}
				// ORIENTATION
				block += tabsies + jsxVarName +'.orientation = "column"; \n';
				// ALIGN CHILDREN
				if ( style.justify !== undefined ) {
					block += tabsies + jsxVarName + '.alignChildren = ["'+ style.justify +'","center"]; \n';
				}
				// SPACING
				block += tabsies + jsxVarName +'.spacing = 0; \n';
				// ALIGNMENT
				if ( style.alignment != null ) {
					var parentOrientation = data.items[ 'item-' + parentId ].style.orientation;
					var alignment = '';
					if ( parentOrientation === 'column' ) {
						alignment =
							style.alignment === 'top' && 'left' ||
							style.alignment === 'bottom' && 'right' ||
							style.alignment;
					}
					else {
						alignment =
							style.alignment === 'left' && 'top' ||
							style.alignment === 'right' && 'bottom' ||
							style.alignment;
					}
					
					var alignC = data.items[ 'item-' + parentId ].style.alignChildren;
					alignment = parentOrientation === 'column' ? ('["' + alignment + '","' + alignC[1] + '"]') : ('["' +alignC[0] + '","' + alignment + '"]');
					
					block += tabsies + jsxVarName + '.alignment = ' + alignment + '; \n';
				}
				// SPACER
				block += '\n';
				
				// All softwrapped lines have been converted into forced linebreaks
				var lines = multilineText[1].split('<br>');
				$.each( lines, function( i, line ) {
					// ADD EACH LINE AS SEPARATE STATIC TEXT ITEM
					block += tabsies + jsxVarName +'.add("statictext", undefined, "'+ line +'"); \n';
				});
			
			}
			else {
				block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"); \n';
			}
			break;
			
		case 'EditText':
			multilineText = multilineCheck( id );
			var container = $('#dialog [data-item-id="'+ id +'"]');
			var cW = Math.round( container.width() );
			var cH = Math.round( container.height() );
			var addition = multilineText[0] ? ', [0,0, '+ (cW) +', '+ (cH) +' ], undefined, {multiline: true}' : '';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ addition +'); \n';
			break;
		
		case 'Image':
			block += 'var '+ jsxVarName + '_string = "'+ encodeURIComponent( atob( style.image[0].split(',')[1].replace(/=$/, "").replace(/=$/, "") ) ) +'"; \n';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("image", undefined, File.decode('+ jsxVarName + '_string' +') ); \n';
			break;
		
		case 'IconButton':
			block += 'var '+ jsxVarName + '_string = "'+ encodeURIComponent( atob( style.image[0].split(',')[1].replace(/=$/, "").replace(/=$/, "") ) ) +'"; \n';
			var ibStroke = style.iconButtonStroke ? ', {style: "button"}' : ', {style: "toolbutton"}';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("iconbutton", undefined, File.decode('+ jsxVarName + '_string' +')'+ ibStroke +' ); \n';
			break;

    case 'Button':
      if ( style.typeName != "null" ) {
        block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'", undefined, undefined, {name:"'+ style.typeName +'"}); \n';
      }
      else {
        block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"); \n';
      }
      break; 
			
		default:
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"); \n';
    
	}
	
	previousItem.name = jsxVarName;
	previousItem.parent = jsxParents[ parentId ];
	
	var lb = /*type === 'TreeView' ||*/ type === 'TreeItem' && !lastLoop ? '' : '\n';
	block += (styleJSXitem( data, counters, jsxParents, type, id, parentId, parentType, style, jsxVarName, growTree, multilineText, tabsies )) + lb;
	
	// Add in treeItem expanded properties if this is the last of treeItems in this group
	var nextItemId = data.order[ index + 1 ];
	if ( nextItemId !== undefined ) {
		
		var nextItem = data.items[ 'item-' + nextItemId ];
		var afterTreeItems = type === 'TreeItem' && nextItem.type !== 'TreeItem';
		
		if ( afterTreeItems && growTree.length > 0  ) {
			block += '\n';
			$.each( growTree, function( i,val ) {
				block += val;
			});
			block += '\n';
			growTree = [];
		}
		else if ( afterTreeItems ) {
			block += '\n';
		}
		
	}
	else if ( nextItemId === undefined && type === 'TreeItem' ) {
		
		$.each( growTree, function( i,val ) {
			block += val;
		});
		block += '\n';
		growTree = [];
		
	}
	
	if ( type === 'Tab' ) {
		
		// If the current tab is the last of its siblings → Generate the parent tpanel selection here.
		var lastTabId = $('#dialog [data-item-id="'+ parentId +'"] > .tab-container .tab:last').data('tab-id');
		if ( id === lastTabId ) {
			block += '// '+ jsxParentName.toUpperCase() +'\n';
			block += '// '+ Array(jsxParentName.length+1).join("=") +'\n';
			block += jsxParents[ parentId ] +'.selection = '+ jsxParents[ data.items[ 'item-' + parentId ].style.selection ] +'; \n\n';
		}
		
	}
	
	if ( lastLoop ) block += jsxParents[ 0 ] + '.show();';
	
	return block;
}


function multilineCheck( id ) {
	
	var isMultiline = false;
	var exportText = [];
	
	var container = $('#dialog [data-item-id="'+ id +'"] .text-container');
	// Had some extension adding extra classes in the <br> so I added this to protect against that
	container.find('br').replaceWith('<br>');
	var text = container.html();
	container.width( container.width() ); // Give container width so it doesn't change while this function runs.
	var words = text.replace(/<br>/g, ' <br>').replace(/-/g, '- ').split(" ");
	container.html('');
	$.each( words, function( i, nextWord ) {
		
		var heightBefore = container.height();
		var space = i === 0 ? '' : ' ';
		container.html( container.html() + space + nextWord );
		var heightAfter = container.height();
		// New line has appeared.
		// Joonas uses crushing depression. It's super effective!
		if ( heightBefore < heightAfter ) {
			exportText.push(
				nextWord.replace('<br>', '') // To get rid of forced line break. Added back with splice.
			);
			isMultiline = true;
			exportText.splice( exportText.length-1, 0, "<br>"); // Add to second to last position
		}
		else {
			exportText.push( space + nextWord );
		}
		
	});
	
	container.width('');
	container.html( text ); // Just to make super sure the dialog text stays the same...
	return [ isMultiline, exportText.join('').replace(/- /g, '-') ];
}
