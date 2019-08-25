
function styleJSXitem( data, jsxParents, type, id, parentId, parentType, style, jsxVarName, growTree, multilineText, tabsies ) {
	var styleBlock = '';

	// ENABLED
	if ( !style.enabled ) {
		styleBlock += tabsies + jsxVarName + '.enabled = false; \n';
	}
	
	// HELP TIP
	if ( style.helpTip !== undefined && style.helpTip !== null ) {
		if ( style.helpTip.length > 0 ) styleBlock += tabsies + jsxVarName +'.helpTip = "' + style.helpTip.replace(/(\s\\n\s|\\n\s|\s\\n|\\n)/g,'\\n') + '"; \n';
	}
	
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
		
		// TABBED PANEL ALIGN CHILDREN
		if ( type === "TabbedPanel" ) {
			styleBlock += tabsies + jsxVarName + '.alignChildren = "fill"; \n';
		}
		
		// TEXT
		var addText = false;
		if ( style.text !== undefined && style.text.length > 0 ) {
			addText = true;
			// When statictext is multiline, the text is added when the item is made in make.item.js
			// Creation property 'multiline' doesn't affect this...
			if ( type === 'StaticText' && multilineText[0] ) {
				addText = false;
			}
			if ( type === 'DropDownList' ) {
				addText = false;
			}
		}
		if ( addText ) {
			var text = type === 'EditText' && multilineText[0] ? style.text.split('\n').join('\\r') : style.text;
			styleBlock += tabsies + jsxVarName +'.text = "' + text + '"; \n';
		}
		// CHECKED
		if ( style.checked === true ) {
			styleBlock += tabsies + jsxVarName +'.value = ' + style.checked + '; \n';
		}
		// PREFERRED SIZE
		if ( type === 'TabbedPanel' && style.preferredSize[0] === 0 ) {
			// Apparently this trick only works if the tab shelf is not wider than the widest child item.
			// styleBlock += tabsies + jsxVarName + '.preferredSize.width = 1; /\/\ A trick for != Photoshop \n';
			styleBlock += tabsies + jsxVarName + '.preferredSize.width = '+ $('#dialog [data-item-id="'+ id +'"]').outerWidth() +'; \n';
		}
		else if ( style.preferredSize !== undefined && type !== 'TreeView' ) {
			var width = style.preferredSize[0];
			var height = style.preferredSize[1];
			
			var isMultiline = type === 'EditText' ? multilineText[0] : false;
			if ( !isMultiline ) {
				if ( width > 0 ) {
					styleBlock += tabsies + jsxVarName + '.preferredSize.width = '+ width +'; \n';
				}
				if ( height > 0 ) {
					styleBlock += tabsies + jsxVarName + '.preferredSize.height = '+ height +'; \n';
				}
			}
			
		}
		// JUSTIFY
		if ( type === 'StaticText' && multilineText[0] ) {
			// No justify for multiline static text.
			// It's applied in make.item.js if needed.
		}
		// Right now button is the only item type that gets justify from here...
		else if ( type === "Button" && style.justify !== 'center' ) {
			styleBlock += tabsies + jsxVarName + '.justify = "' + style.justify + '"; \n';
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
		var marginsArray;
		if ( style.margins !== undefined && type !== 'TabbedPanel' ) {
			marginsArray = typeof style.margins === 'object';
			styleBlock += tabsies + jsxVarName + '.margins = ' + (marginsArray ? '['+ style.margins[3] +','+ style.margins[0] +','+ style.margins[1] +','+ style.margins[2] +']' : style.margins) + '; \n';
		}
		// Tab
		else if ( type === 'Tab' && data.items[ 'item-' + parentId ].style.margins !== undefined ) {
			var margins = data.items[ 'item-' + parentId ].style.margins;
			marginsArray = typeof margins === 'object';
			styleBlock += tabsies + jsxVarName + '.margins = ' + (marginsArray ? '['+ margins[3] +','+ margins[0] +','+ margins[1] +','+ margins[2] +']' : margins) + '; \n';
		}
		else if ( type === 'TabbedPanel' ) {
			styleBlock += tabsies + jsxVarName + '.margins = 0; \n';
		}
		// ALIGNMENT
		if ( style.alignment != null && !multilineText[0] ) {
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
			
			styleBlock += tabsies + jsxVarName + '.alignment = ' + alignment + '; \n';
		}
	}
	
	return styleBlock;
}
