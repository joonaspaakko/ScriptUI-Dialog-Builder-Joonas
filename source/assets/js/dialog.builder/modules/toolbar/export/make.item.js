
function makeJSXitem( index, data, jsxParents, type, id, parentId, parentType, style, previousItem, growTree, lastLoop, tabsies, wrapperTabsies ) {
	
	var commentOut = hideItem.onExport( data.items[ 'item-'+id ] );
	
	var windowType = data.items['item-0'].style.windowType.toLowerCase();
	var multilineText = [false];
	var block = '';
	var lowerCaseType = type.toLowerCase();
	
	var jsxVarName = customVar.names[ id ];
	jsxParents[ id ] = jsxVarName;
	var jsxParentName = jsxParents[ parentId ];
	
	function creationProps( addUndefined, noCurclyBrackets ) {
		
		var defaultCreationProps = item.list[ lowerCaseType ](false).defaultStyle.creationProps;
		var props = '';
		
		switch ( lowerCaseType ) {
			case 'iconbutton':
				// Use old iconbutton style if the data exists... as long as the new creation property is not set.
				var cpStyleNotSet = defaultCreationProps.style === style.creationProps.style;
				if ( cpStyleNotSet ) {
					var ibStroke = '';
					if ( style.iconButtonStroke )
						ibStroke = 'style: "button"';
					else
						ibStroke = 'style: "toolbutton"';
					props += ', ' + ibStroke;
				}
				break;
			case 'dropdownlist':
				if ( style.listItems ) props += ', items: '+ jsxVarName +'_array';
				break;
			case 'listbox':
				if ( style.listItems ) props += ', items: '+ jsxVarName +'_array';
				
				if ( style.selection !== undefined && !style.creationProps.multiselect ) {
					if ( style.selection.length > 1 ) {
						props += ', multiselect: true';
					}
				}
				break;
		}
		
		// Creation Property-o-matic
		// - If the local storage data matches default values, don't add the property
		var userCProps = '';
		$.each( style.creationProps, function( prop, value) {
			var defaultValue = defaultCreationProps[ prop ];
			if ( defaultValue != value ) {
				var isString = typeof value == 'string';
				var doubleQuotes = isString ? '"' : '';
				userCProps += ', ' + prop + ': ' + doubleQuotes + value + doubleQuotes;
			}
		});
		
		// No name for Dialog
		if ( lowerCaseType === 'dialog' ) {
			if ( userCProps === '' )
				return '';
			else
				return ', undefined, undefined, ' + (noCurclyBrackets ? '' : '{') + userCProps.replace(', ','') + (noCurclyBrackets ? '' : '}'); // Dialog doesn't have a name prefix, so the first comma is taken out. Agent 47, I choose you!
		}
		else {
			return ( addUndefined ? ', undefined, undefined' : '' ) + (noCurclyBrackets ? '' : ', {') +'name: "'+ jsxVarName +'"' + props + userCProps + (noCurclyBrackets ? '' : '}');
		}
		
	} // creationProps();
	
	// If current item is a parent...
	if ( type !== "TreeItem" ) {
		if ( item.list[ lowerCaseType ](false).parent ) {
			block += wrapperTabsies + '// '+ jsxVarName.toUpperCase() +'\n';
			block += wrapperTabsies + '// '+ Array(jsxVarName.length+1).join("=") +'\n';
		}
		else if ( previousItem.parent !== jsxParentName && previousItem.name !== jsxParentName ) {
			block += wrapperTabsies + '// '+ jsxParentName.toUpperCase() +'\n';
			block += wrapperTabsies + '// '+ Array(jsxParentName.length+1).join("=") +'\n';
		}
	}
	
	var dialog = $('#dialog');
	
	// This is where each item is first added
	switch ( type ) {
		
		case 'Dialog':
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = new Window("'+ windowType +'"'+ creationProps( true ) +'); \n';
			break;
			
		case 'ListBox':
		case 'DropDownList':
			if ( style.listItems.trim() ) {
				var list = style.listItems.split('\n').join('').split(',');
				$.each( list, function( i ) {
					list[ i ] = list[ i ].trim();
				});
				block += wrapperTabsies + commentOut + 'var '+ jsxVarName +'_array = ["' + list.join('","') + '"]; \n';
			}
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ creationProps( true ) +'); \n';
			break;
			
		case 'Divider':
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("panel"'+ creationProps( true ) +'); \n';
			break;
			
		case 'TreeView':
			var dialogTreeViewItem = dialog.find('[data-item-id="'+ id +'"]');
			var width = style.preferredSize[0] > 0 ? style.preferredSize[0] : Math.round( dialogTreeViewItem.width() ) + 12;
			var height = style.preferredSize[1] > 0 ? style.preferredSize[1] : Math.round( dialogTreeViewItem.height() ) + 12;
			var extra = 0;
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ type.toLowerCase() +'", [0,0,'+ (width+extra) +','+ (height+extra) +'], undefined' + creationProps() +'); \n';
			break;
			
		case 'TreeItem':
			var dialogTreeItem = dialog.find('[data-item-id="'+ id +'"]');
			var itemName = dialogTreeItem.hasClass('tree-node') ? 'node' : 'item';
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ itemName +'", "'+ style.text +'"); \n';
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
				block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("group"); \n';
				// PREFERRED SIZE
				if ( style.preferredSize !== undefined  ) {
					if ( style.preferredSize[0] > 0 ) {
						block += tabsies + commentOut + jsxVarName +'.preferredSize.width = '+ style.preferredSize[0] +'; \n';
					}
					if ( style.preferredSize[1] > 0 ) {
						block += tabsies + commentOut + jsxVarName +'.preferredSize.height = '+ style.preferredSize[1] +'; \n';
					}
				}
				// ORIENTATION
				block += tabsies + commentOut + jsxVarName +'.orientation = "column"; \n';
				// ALIGN CHILDREN
				if ( style.justify !== undefined ) {
					block += tabsies + commentOut + jsxVarName + '.alignChildren = ["'+ style.justify +'","center"]; \n';
				}
				// SPACING
				block += tabsies + commentOut + jsxVarName +'.spacing = 0; \n';
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
					
					block += tabsies + commentOut + jsxVarName + '.alignment = ' + alignment + '; \n';
				}
				// SPACER
				block += '\n';
				
				// All softwrapped lines have been converted into forced linebreaks
				var lines = multilineText[1].split('<br>');
				$.each( lines, function( i, line ) {
					// ADD EACH LINE AS SEPARATE STATIC TEXT ITEM
					block += tabsies + commentOut + jsxVarName +'.add("statictext", undefined, "'+ line +'"'+ creationProps() +'); \n';
				});
			
			}
			else {
				block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ creationProps( true ) +'); \n';
			}
			break;
		
		case 'EditText':
			multilineText = multilineCheck( id );
			var container = $('#dialog [data-item-id="'+ id +'"]');
			var cW = container.width();
			var cH = container.height();
			var multilineSize = multilineText[0] ? 'size: ['+cW+','+cH+'], ' : '';
			var multilineMultiline = (multilineText[0] && !style.creationProps.multiline) ? ', multiline: true' : '';
			
			// PS test because PS doesn't like multiline: true + justify: 'center' or 'right';
			// With this the script would still work in PS...
			var edittextMultilineJustify =
					(multilineText[0] || style.creationProps.multiline) && style.justify !== 'left' ?
					("'+ (app.name === 'Adobe Photoshop' ? '' : 'justify: "+ '"' + style.justify + '"' +", ') +'") :
					("justify: "+ '"' + style.justify + '"' +", ");
			var edittextJustify = style.justify.toLowerCase() === 'left' ? '' : edittextMultilineJustify;
			// The reason why EditText is now in a stringy string format is
			// that for some weird ass reason justify: "center/right" works
			// more consistently if justify if fed in a resource string...
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add('+ "'" + 'EditText {'+ multilineSize + edittextJustify + 'properties: {'+ creationProps( false, true ) + multilineMultiline +'}}' + "'" +'); \n';
			break;
		
		case 'Image':
		case 'IconButton':
			var imageString = encodeURIComponent( atob( style.image[0].split(',')[1].replace(/=$/, "").replace(/=$/, "") ) );
			imageString = imageDuplicateCheck.init( jsxVarName, imageString );
			if ( imageString.length === 2 ) {
				block += wrapperTabsies + commentOut + 'var '+ jsxVarName + '_imgString = "'+ imageString[1] +'"; \n';
			}
			
			if ( lowerCaseType === 'image' ) {
				
				block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("image", undefined, File.decode('+ imageString[0] + '_imgString' +')'+ creationProps() +'); \n';
			}
			else {
				block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("iconbutton", undefined, File.decode('+ imageString[0] + '_imgString' +')' + creationProps() +'); \n';
			}
			break;

    case 'Group':
      block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'", undefined'+ creationProps() +'); \n';
      break;
			
		case 'Slider':
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'", undefined, undefined'+ creationProps( true ) +'); \n';
			break;
			
		default:
			block += wrapperTabsies + commentOut + 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ creationProps( true ) +'); \n';
    
	}
	
	previousItem.name = jsxVarName;
	previousItem.parent = jsxParents[ parentId ];
	
	var lb = /*type === 'TreeView' ||*/ type === 'TreeItem' && !lastLoop ? '' : '\n';
	block += (styleJSXitem( data, jsxParents, type, id, parentId, parentType, style, jsxVarName, growTree, multilineText, tabsies, commentOut )) + lb;
	
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
			var selectionId = data.items[ 'item-' + parentId ].style.selection;
			var selectionItem = data.items[ 'item-' + selectionId ];
			var tpanelCommentOut = (selectionItem.hidden || $('[data-panel="treeview"] [data-item-id="'+ selectionId  +'"]').closest('.sdb-hidden').length > 0 ) ? '// ' : '';
			// console.log( selectionItem.hidden );
			block += wrapperTabsies + tpanelCommentOut + jsxParents[ parentId ] +'.selection = '+ jsxParents[ selectionId ] +'; \n\n';
		}
		
	}
	
	return block;
}


function multilineCheck( id ) {
	
	var isMultiline = false;
	var exportText = [];
	
	var item = $('#dialog [data-item-id="'+ id +'"]');
	var isHidden = item.hasClass('sdb-hidden');
	if ( isHidden ) item.removeClass('sdb-hidden');
	var hiddenParents = item.parents('.sdb-hidden');
	if ( hiddenParents.length > 0 ) {
		hiddenParents.each(function() {
			$(this).removeClass('sdb-hidden');
		});
	}
	var container = item.find('.text-container');
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
	if ( isHidden ) item.addClass('sdb-hidden');
	if ( hiddenParents.length > 0 ) {
		hiddenParents.each(function() {
			$(this).addClass('sdb-hidden');
		});
	}
	return [ isMultiline, exportText.join('').replace(/- /g, '-') ];
}
