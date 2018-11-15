
// IMPORT EVENT

$('#toolbar .export').on("click", function() {
	
	var content =
		'<div id="export-box">' +
				'<h2>Export.jsx</h2>' +
				'<div class="code"></div>' +
				'<div class="btns">' +
				'<div class="download btn animated fadeInDown">' +
					'<div class="icon">' +
						'<i class="fas fa-check animated"></i>' +
						'<i class="fas fa-download"></i>' +
					'</div>' +
					' <span>Download</span>' +
				'</div>' +
					'<div class="copy btn animated fadeInDown">' +
						'<div class="icon">' +
							'<i class="fas fa-check animated"></i>' +
							'<i class="fas fa-times animated"></i>' +
							'<i class="fas fa-clipboard-list"></i>' +
						'</div>' +
						' <span>Copy to Clipboard</span>' +
					'</div>' +
				'</div>' +
		'</div>';
	
	modal.init( content );
	
	/*global CodeMirror*/
	/*eslint no-undef: ["error", { "typeof": true }] */
	var myCodeMirror = CodeMirror(
		$("#export-box .code")[0]
	, {
		mode: {
			name: 'javascript',
			json: true
		},
		theme: 'monokai',
		autofocus: true,
		lineNumbers: true,
		// I really wanted to used this to avoid the sideways scrolling, but even with
		// a few items the JSON gets super bulky at the top, so... no wrappity wraps...
		// lineWrapping: true,
		value: exportCode()
	});
	
	// This section makes sure the #export-box doesn't spill past the viewport
	var winH = $(window).height();
	var exportBox = $('#export-box');
	var exportBoxH = exportBox.height();
	var extraMargins = 80;
	if ( winH < exportBoxH+60 ) {
		var cmMaxHeight = $(window).height() - ( exportBoxH-exportBox.find('.CodeMirror').height() );
		exportBox.find('.code').css({ maxHeight: cmMaxHeight - (extraMargins*2) });
	}
	
	clipBoardEvent( myCodeMirror );
	
	exportBox.find('.download').on("click", function() {
		
		/*global download*/
		/*eslint no-undef: ["error", { "typeof": true }] */
		download( exportCode(), "ScriptUI Dialog Builder - Export.jsx", "application/javascript");
		
		var _this = $(this);
		var faCheck = _this.find('.fa-check');
		var faClipboard = _this.find('.fa-download');
		faCheck.addClass('rotateIn');
		faClipboard.hide();
		setTimeout(function() {
			faCheck.removeClass('rotateIn');
			faClipboard.show();
		}, 750);
		
	});
	
	
});

function exportCode() {
	var data = local_storage.get('dialog');
	var importJSON = '/* \nCode for Import http://scriptui.joonas.me — (Triple click to select): \n' + JSON.stringify( data ) + '\n*/ \n\n';
	var jsxItems = getJSX( data );
	var bundle = importJSON + jsxItems + 'dialog.show();';
	return bundle;
}

function clipBoardEvent( myCodeMirror ) {
	
	/*global ClipboardJS*/
	/*eslint no-undef: ["error", { "typeof": true }] */
	var clipboard = new ClipboardJS('.btn.copy', {
		text: function() {
			return myCodeMirror.getValue();
		}
	});
	
	clipboard.on('success', function(e) {
		
		var _this = $(e.trigger);
		var faCheck = _this.find('.fa-check');
		var faClipboard = _this.find('.fa-clipboard-list');
		faCheck.addClass('rotateIn');
		faClipboard.hide();
		setTimeout(function() {
			faCheck.removeClass('rotateIn');
			faClipboard.show();
		}, 750);
		
	});

	clipboard.on('error', function(e) {
		
		
		var _this = $(e.trigger);
		var faTimes = _this.find('.fa-times');
		var faClipboard = _this.find('.fa-clipboard-list');
		faTimes.addClass('tada');
		faClipboard.hide();
		setTimeout(function() {
			myCodeMirror.execCommand('selectAll');
			faTimes.removeClass('tada');
			faClipboard.show();
		}, 750);
		
	});
	
}

function getJSX( data ) {
	
	var cornucopia = '',
			jsxParents = {},
			counters = { dialog: '', tab: '' }, // Can't remember why I added tab here, but oh well. Let's not mess with this jenga tower.
			previousItem = {
				name: '',
				parent: ''
			},
			growTree = []; // JUST DO IT
	
	// Creates rest of the counters based on the "Add items" panel...
	$('#panel-new-item-wrap ul li').each(function() {
		counters[ $(this).data('item-type').toLowerCase() ] = 0;
	});
	
	var allItems = $('#panel-tree-view-wrap .tree-dialog li');
	var itemsLength = allItems.length;
	
	allItems.each(function( i ) {
		
		
		var index      = i,
				currentId  = $(this).data().itemId,
				dataItem   = data.items[ 'item-' + currentId ],
				parentId   = dataItem.parentId,
				parentType = (parentId === 0 || parentId === false) ? 'Dialog' : data.items[ 'item-' + parentId ].type,
				type       = dataItem.type,
				id         = dataItem.id,
				style      = dataItem.style;
				
		var lastLoop = false;
		if ( i === ( itemsLength-1 ) ) {
			lastLoop = true;
		}
		
		cornucopia += makeJSXitem( index, data, counters, jsxParents, type, id, parentId, parentType, style, previousItem, growTree, lastLoop );
		
	});
	
	return cornucopia;
	
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
			
		default:
			var multilineItem = item.list[ type.toLowerCase() ](false).multiline;
			var linebreak = style.text === undefined ? 0 : style.text.indexOf('\n');
			var multilineText = multilineItem && linebreak > 0 ? ', undefined, undefined, {multiline: true}' : '';
			block += 'var '+ jsxVarName +' = '+ jsxParents[ parentId ] +'.add("'+ lowerCaseType +'"'+ multilineText +'); \n';
	
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

function styleJSXitem( data, counters, jsxParents, type, id, parentId, parentType, style, jsxVarName, growTree ) {
	var styleBlock = '';
	// var counter = counters[ type.toLowerCase() ];
	var tabsies = '    ';
	
	if ( type === "TreeItem" ) {
		
		var expanded = data.items['item-'+id].expanded;
		
		var allParents = $('#dialog [data-item-id="'+ id +'"]').parentsUntil('.tree-view').filter('.tree-view-item');
		
		// Build a dam to prevent expanded items from going through if there's a parent that is collapsed.
		// ScriptUI ignores those so it feels silly including them in the export.
		// I did consider just basically deleting the status "expanded" if a parent is collapsed, but it seemed unnecessary.
		var dam = false;
		$.each( allParents, function() {
			if ( !$(this).hasClass('expanded') ) dam = true; // CLOSE THE FLOOD GATES!!! AAAAAAAAAAAAAAAAAAAA!!!
		});
		
		if ( expanded && dam === false ) {
			growTree.push( tabsies + jsxVarName + '.expanded = true; \n' );
		}
	}
	else if ( type === "Divider" ) {
		styleBlock += tabsies + jsxVarName + '.alignment = "fill"; \n';
	}
	else if ( type === "Slider" ) {
		styleBlock += tabsies + jsxVarName + '.minvalue = 0; \n';
		styleBlock += tabsies + jsxVarName + '.maxvalue = 100; \n';
		styleBlock += tabsies + jsxVarName + '.value = 50; \n';
	}
	else {
		
		// DROP LIST SELECTION
		if ( type === "DropDownList" && style.selection !== undefined ) {
			styleBlock += tabsies + jsxVarName +'.selection = '+ style.selection +'; \n';
		}
		if ( type === "ListBox" && style.selection !== undefined && style.selection.length > 0 ) {
			var addSelection = (style.selection.length > 1) ? JSON.stringify(style.selection) : style.selection;
			styleBlock += tabsies + jsxVarName +'.selection = '+ addSelection +'; \n';
		}
		
		// TABBED PANEL SELECTION
		// Due to me being an idiot, it's better for our insanity if tabbed panel selection defined when the selected item is created.
		if ( type === "Tab" && data.items['item-'+parentId].style.selection === id ) {
			styleBlock += tabsies + jsxParents[ parentId ] +'.selection = '+ jsxVarName +'; \n';
		}
		
		// TABBED PANEL ALIGN CHILDREN
		if ( type === "TabbedPanel" ) {
			styleBlock += tabsies + jsxVarName + '.alignChildren = "fill"; \n';
		}
		
		// TEXT
		var multilineItem = item.list[ type.toLowerCase() ](false).multiline;
		if ( style.text !== undefined && style.text.length > 0 ) {
			var text = multilineItem ? style.text.split('\n').join('\\r') : style.text;
			styleBlock += tabsies + jsxVarName +'.text = "' + text + '"; \n';
		}
		// CHECKED
		if ( style.checked === true ) {
			styleBlock += tabsies + jsxVarName +'.value = ' + style.checked + '; \n';
		}
		// PREFERRED SIZE
		if ( style.preferredSize !== undefined && type !== 'TreeView' ) {
			var width = style.preferredSize[0];
			var height = style.preferredSize[1];
			
			var size = item.list[ type.toLowerCase() ](false).parent ? 'preferredSize' : 'minimumSize';
			
			if ( width > 0 ) {
				styleBlock += tabsies + jsxVarName + '.'+ size +'.width = '+ width +'; \n';
				// styleBlock += tabsies + jsxVarName + '.preferredSize.width = '+ width +'; \n';
			}
			if ( height > 0 ) {
				styleBlock += tabsies + jsxVarName + '.'+ size +'.height = '+ height +'; \n';
				// styleBlock += tabsies + jsxVarName + '.preferredSize.height = '+ height +'; \n';
			}
		}
		// JUSTIFY
		if ( style.justify !== undefined && style.justify !== 'left' || type === "Button" && style.justify !== 'center' ) {
			var linebreak = style.text === undefined ? 0 : style.text.indexOf('\n');
			styleBlock += tabsies + ( linebreak > 0 ? '// ' : ''  ) + jsxVarName + '.justify = "' + style.justify + '"; \n';
		}
		
		// ORIENTATION
		if ( style.orientation !== undefined  ) {
			styleBlock += tabsies + jsxVarName + '.orientation = "' + style.orientation + '"; \n';
		}
		// ALIGN CHILDREN
		if ( style.alignChildren !== undefined ) {
			styleBlock += tabsies + jsxVarName + '.alignChildren = ' + '["'+ style.alignChildren[0] + '","' + style.alignChildren[1] +'"]; \n';
		}
		// SPACING
		if ( style.spacing !== undefined ) {
			styleBlock += tabsies + jsxVarName + '.spacing = ' + style.spacing + '; \n';
		}
		// MARGINS
		if ( style.margins !== undefined ) {
			var marginsArray = typeof style.margins === 'object';
			styleBlock += tabsies + jsxVarName + '.margins = ' + (marginsArray ? '['+ style.margins[3] +','+ style.margins[0] +','+ style.margins[1] +','+ style.margins[2] +']' : style.margins) + '; \n';
		}
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
			styleBlock += tabsies + jsxVarName + '.alignment = "' + alignment + '"; \n';
		}
	}
	
	return styleBlock;
}
