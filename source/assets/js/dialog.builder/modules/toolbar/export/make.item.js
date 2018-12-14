
// When the item type is not a fitting variable name...
function customVarNames( type, parentType, counters ) {
	var result;
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
	return result;
}

function makeJSXitem( index, data, counters, jsxParents, type, id, parentId, parentType, style, previousItem, growTree, lastLoop ) {
	
	var block = '';
	var lowerCaseType = type.toLowerCase();
	
	++counters[ lowerCaseType ];
	
	var jsxVarName = customVarNames( lowerCaseType, parentType, counters );
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
			
			// var isMultiline = statictext_multiline( id );
			var textContainer = $('#dialog [data-item-id="'+ id +'"] .text-container');
			var oldText = textContainer.text();
			// textContainer.splitLines({
			// 		keepHtml: false,
			//     tag: '<div class="line">',
			// 		width: 96
			// });
			// console.log( textContainer.width() );
			
			// textContainer.html( textContainer.html().split('\n').join("<br>") )
			
			textContainer.breakLines({
				// lineBreakHtml : '<br>'
				lineBreakHtml: '\n'
			});
			
			console.table( textContainer.text().split(/[\n]+/) );
			textContainer.text( oldText );
			
			// ScriptUI has issues with multiline text if you don't define both
			// width and height. Let's say you only set width, what it appears to
			// do is it creates the item applies width and height to the bounds
			// based on how ever the text flows as is and then it applies that
			// width or height you wanted to give it... and that changes the text
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
			// To tackle this issue I basically split multiline text into
			// multiple single line statictext items and place them in a
			// group. Problem solved for static text. Since this operation
			// is done on export, it doesn't affect the import JSON.
			// if ( isMultiline ) {
			//
			// 	block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("group"); \n';
			//
			// 	// All softwrapped lines have been converted into forced linebreaks
			// 	var text = dialog.find('[data-item-id="'+ id +'"] .text-container').data('export-text');
			// 	var lines = text.split('\r');
			//
			// 	$.each( lines, function( i, line ) {
			//
			// 		block += '    ' + jsxVarName +'.add("statictext", undefined, "'+ line +'"); \n';
			//
			// 	});
			//
			//
			// }
		
			// var multilineItem = item.list[ type.toLowerCase() ](false).multiline;
			// var linebreak = style.text === undefined ? 0 : style.text.indexOf('\n');
			// var textContainer = $('#dialog [data-item-id="'+ id +'"] .text-container');
			// var tcW = Math.round( textContainer.width() );
			// var tcH = Math.round( textContainer.height() );
			// var softwrap = tcH > 22;
			// var multilineText = softwrap || linebreak > 0  ? ', [0,0, '+ (tcW) +', '+ (tcH) +' ], undefined, {multiline: true}' : '';
			//
			//
			//
			//
			// block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ multilineText +'); \n';
			break;
			
		case 'EditText':
			// var multilineItem = item.list[ type.toLowerCase() ](false).multiline;
			var linebreak2 = style.text === undefined ? 0 : style.text.indexOf('\n');
			var container = $('#dialog [data-item-id="'+ id +'"]');
			var cW = Math.round( container.width() );
			var cH = Math.round( container.height() );
			var softwrap2 = tcH > 34;
			var multilineText2 = softwrap2 || linebreak2 > 0  ? ', [0,0, '+ (cW) +', '+ (cH) +' ], undefined, {multiline: true}' : '';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ multilineText2 +'); \n';
			break;
			
		default:
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"); \n';
	
	}
	
	previousItem.name = jsxVarName;
	previousItem.parent = jsxParents[ parentId ];
	
	var lb = /*type === 'TreeView' ||*/ type === 'TreeItem' && !lastLoop ? '' : '\n';
	block += (styleJSXitem( data, counters, jsxParents, type, id, parentId, parentType, style, jsxVarName, growTree )) + lb;
	
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
	
	return block;
}

function statictext_multiline( id ) {
	
	var isMultiline = false;
	var exportText = '';
	
	var item = new function() {
		this.object = $('#dialog [data-item-id="'+ id +'"] .text-container');
		this.text = this.object.text();
		this.words = this.text.split(/[\s\\n]+/);
	};
	item.object.text('');
	
	$.each( item.words, function( i, nextWord ) {
		
		var linebreak = i === 0 ? '' : ' ';
			
		var heightBefore = item.object.height();
		item.object.text( item.object.text() + linebreak + nextWord );
		exportText += linebreak + nextWord;
		console.log( '- - -' );
		console.table( item.words );
		console.log( nextWord );
		var heightAfter = item.object.height();
		
		// New line has appeared.
		// Joonas uses crushing depression. It's super effective!
		if ( heightBefore < heightAfter ) {
			isMultiline = true;
			exportText += '\\r';
		}
		
	});
	
	item.object.data({ "export-text": exportText });
	
	return isMultiline;
}
