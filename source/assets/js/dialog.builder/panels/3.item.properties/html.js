
var panel_edit_style_html = {};

// Mayhaps in hindsight this wasn't the best way to build this html...
// but what is done is done. Honestly, I look at this and I'm like oh
// boy... I have absolutely no idea why I made it this way. My best
// defense is that everything in this project started as a prototype
// and I never could be arsed to make it in a sensible way after I had
// decided what I wanted from it. Once a lazy boy, always a lazy boy.
panel_edit_style_html.init = function( key, value, source, treeActive, lowerCaseType, typeData ) {
	// Order is specified by the premade containers in 'build.js'
	
	if ( key !== 'creationProps' && key !== 'alignment' ) {
		value = value == null ? '' : (typeof value === 'string' ? value.replace(/\"/g, '&quot;') : value );
	}
	
	var html;
	switch ( key ) {
		
		case "varName":
			html = $(
				'<h2 title="Each item is given an automatically generated variable name. With this you can overwrite it with your own. These are used as the creation property name as well. \n\n Button: You should use the name &#039;ok&#039; or &#039;cancel&#039; to make a button the default or cancel type button. The user can typically dismiss a modal dialog by clicking an OK or Cancel button, or by typing certain keyboard shortcuts. By convention, typing ENTER is the same as clicking OK or the default button, and typing ESC is the same as clicking Cancel. The keyboard shortcut has the same effect as calling notify for the associated button control.">' +
					'Custom Name' +
				'</h2>' +
				'<input type="text" data-edit="varName" value="'+ ( value == null ? '' : value ) +'">'
			);
			break;
			
		case "windowType":
			html = $(
        '<h2 title="􏰀dialog — Creates a modal dialog. \n\npalette — Creates a modeless dialog, also called a floating palette. (Not supported by Photoshop CC.) \n􏰀\nwindow — Creates a simple window that can be used as a main window for an application. (Not supported by Photoshop CC.)">' +
          'Window Type' +
        '</h2>' +
        '<select name="qty" class="pretty-classic" data-edit="'+ key +'" >' +
          '<option '+ (value == "Dialog" ? 'selected' : '') +' value="Dialog">Dialog</option>' +
          '<option '+ (value == "Palette" ? 'selected' : '') +' value="Palette">Palette</option>' +
          '<option '+ (value == "Window" ? 'selected' : '') +' value="Window">Window</option>' +
        '</select>'
			);
			break;
		
		// Creation Props are loaded as a signle object on build,
		// but each property is updated separate on change.
		case "creationProps":
			var values_HTML = '';
			var creationProptitle = {
				su1PanelCoordinates: "When you add a panel to a window, you can choose to set a creation property (su1PanelCoordinates), which causes that panel to automatically adjust the positions of its children; see the add method for panel. When automatic adjustment is enabled, you provide position values that were correct for Photoshop CS, and the result is the same in Photoshop CS2, CS3, CS4, CS5, or CC. You can also set automatic adjustment for a window; in this case, it applies to all child panels of that window unless it is explicitly disabled in the child panel.",
				maximizeButton: "When true, the title bar includes a button to expand the window to its maximum size (typically, the entire screen), if the platform and window type allow it. When false, it does not. Default is false for type palette, true for type window. Not used for dialogs.",
				minimizeButton: "When true, the title bar includes a button to minimize or iconify the window, if the platform and window type allow it. When false, it does not. Default is false for type palette, true for type window. Main windows cannot have a minimize button in Mac OS. Not used for dialogs.",
				independent: "When true, a window of type window is independent of other application windows, and can be hidden behind them in Windows. In Mac OS, has no effect. Default is false.",
				closeButton: "When true, the title bar includes a button to close the window, if the platform and window type allow it. When false, it does not. Default is true. Not used for dialogs.",
				resizeable: "When true, the window can be resized by the user. Default is false.",
				borderStyle: "A string that specifies the appearance of the border drawn around the panel. One of black, etched, gray, raised, sunken. Default is etched.",
				truncate: " If middle or end, defines where to remove characters from the text and replace them with an ellipsis if the specified title does not fit within the space reserved for it. If none, and the text does not fit, characters are removed from the end, without any replacement ellipsis character.",
				scrolling: "When false (the default), the displayed text cannot be scrolled. When true, the displayed text can be vertically scrolled using scrollbars; this case implies multiline is true.",
				noecho: "When false (the default), the control displays input text. When true, the control does not display input text (used for password input fields).",
				readonly: "When false (the default), the control accepts text input. When true, the control does not accept input but only displays the contents of the text property.",
				multiline: "When false (the default), the control accepts a single line of text. When true, the control accepts multiple lines, in which case the text wraps within the width of the control.",
				scrollable: "(For multiline elements only) When true (the default), the text field has a vertical scrollbar that is enabled when the element contains more text than fits in the visible area. When false, no vertical scrollbar appears; if the element contains more text than fits in the visible area, the arrow keys can be used to scroll the text up and down.",
				borderless: "When true, the window has no title bar or borders. Properties that control those features are ignored.",
				enterKeySignalsOnChange: "When false (the default), the control signals an onChange event when the editable text is changed and the control loses the keyboard focus (that is, the user tabs to another control, clicks outside the control, or types ENTER). When true, the control only signals an onChange event when the editable text is changed and the user types ENTER; other changes to the keyboard focus do not signal the event.",
				multiselect: "When false (the default), only one item can be selected. When true, multiple items can be selected.",
				numberOfColumns: "A number of columns in which to display the items; default is 1. When there are multiple columns, each ListItem object represents a single selectable row. Its text and image values supply the label for the first column, and the subitems property specifies labels for additional columns.",
				columnWidths: "An array of numbers for the preferred width in pixels of each column.",
				columnTitles: "A corresponding array of strings for the title of each column, to be shown if showHeaders is true.",
				showHeaders: "True to display column titles.",
				style: "A string for the visual style, one of: button: Has a visible border with a raised or 3D appearance. toolbutton: Has a flat appearance, appropriate for inclusion in a toolbar",
				toggle: "For a button-style control, a value of true causes it to get a button-pressed appearance the first time it is clicked, and alternate with the unpressed appearance each time it is clicked. The toggle state is reflected in the control’s value property."
			};
			$.each(value, function( key, value ) {

				value = value == null ? '' : (typeof value === 'string' ? value.replace(/\"/g, '&quot;') : value );

				switch ( typeof value ) {
					case 'string':
					case 'number':
						values_HTML +=
						'<div class="creation-prop prop-'+ key +'">' +
							'<span title="'+ creationProptitle[ key ] +'">'+ key +': </span>' +
							'<input type="text" value="'+ value +'" data-edit="'+ key +'" />' +
						'</div>';
						break;
					default: // should be boolean
						values_HTML +=
						'<div class="creation-prop prop-'+ key +'">' +
							'<label for="'+ key +'-input">' +
								'<span title="'+ creationProptitle[ key ] +'">'+ key +': </span>' +
								'<input type="checkbox" '+ (value ? 'checked' : '') +' data-edit="'+ key +'" id="'+ key +'-input" style="display: none;" />' +
								'<span class="input-sibling checkbox"></span>' +
							'</label>' +
						'</div>';
				}
				
			});
			html = $(
				'<div class="creation-props-outer-wrap">' +
					'<h2 title="Some element types have attributes that can only be specified when the element is created. These are not normal properties of the element, in that they cannot be changed during the element’s lifetime, and they are only needed once. ">' +
						'Creation Properties' +
					'</h2>' +
					'<div class="creation-props-inner-wrap">' +
						values_HTML +
					'</div>' +
				'</div>'
			);
			break;
			
		case "helpTip":
			html = $(
				'<h2 title="The help text that is displayed when the mouse hovers over the element. You can add a linebreak by adding &#x5C;n">' +
					'Tooltip' +
					'<span style="font-size: 12px; color: #b6c0c1;"> forced line break " \\n "</span>' +
				'</h2>' +
				'<input type="text" data-edit="helpTip" value="'+ ( value == null ? '' : value ) +'">'
			);
			break;
			
		case "enabled":
			html = $(
				'<h2 title="When true, the control is enabled, meaning that it accepts input. When false, control elements do not accept input, and all types of elements have a dimmed appearance. A disabled ListItem is not selectable in a ListBox, DropDownList or TreeView list.">' +
					'Enabled ' +
					'<label for="enabled-input">' +
						'<input type="checkbox" '+ (value ? 'checked' : '') +' data-edit="enabled" id="enabled-input" style="display: none;" />' +
						'<span class="input-sibling checkbox"></span>' +
					'</label>' +
				'</h2>'
			);
			break;
			
		// case "iconButtonStroke":
		// 	html = $(
		// 		'<h2 title="Changes style property into &#x22;button&#x22; which creates a border around the button. If unchecked, a style property will use &#x22;toolbutton&#x22;, which has a flat appearance">' +
		// 			'Buttonify (Border): ' +
		// 			'<input style="float: right;" type="checkbox" data-edit="iconButtonStroke"'+ ( value ? 'checked' : '' ) +'>' +
		// 		'</h2>'
		// 	);
		// 	break;
    
    case "softWrap":
      // Defined below in the text case. They are always a pair.
      break;
		
		case "text":
      var softWrap = typeData.defaultStyle.softWrap;
			// This little piggy is deprecated. I decided to make it so that
			// if anyone used text in prior dialogs, the text still shows up..
			// so I had to keep it in the default styles in "items.js" so this
			// shows up, but then we don't want it to show up when a new item is created.
			// The assumption here is that if the value is "DropDownList", it's either a new item or you don't care that you can't edit it anymore... You better not...
			if ( value === 'DropDownList' ) {
				html = $('');
			}
			else {
				html = $(
					'<h2 title="Initial text to be displayed in the control as the title, label, or contents, depending on the control type.">' +
						'Text' +
						( (softWrap === true || softWrap === false) ? '<label class="soft-wrap-wrap-wrap" style="color: #c1c1c1; font-size: 13px; float: right;" for="softWrapCheckbox">Soft Wrap: <input id="softWrapCheckbox" style="display: none; position: relative; top: -1px;" type="checkbox" data-edit="softWrap"'+ ( !$('#dialog .active').hasClass('disable-soft-wrap') ? 'checked' : '' ) +'><span class="input-sibling checkbox"></span></label>' : '' ) +
					'</h2>' +
					'<div class="edit-text-wrap">' +
					'<div class="no-linebreaks-icon" title="This item does not support multiline, so no line breaks."><img src="assets/images/no-line-break-icon.svg" alt="" /></div>' +
					'<textarea data-edit="text" class="textarea">' +
					value +
					'</textarea>' +
					'<div>'
				);
			}
			break;

		case "listItems":
			html = $(
				'<h2 title="The array of choice items displayed in the drop-down or pop-up list.">' +
					'List Items' + '<span class="desc"> (Comma separated)</span>' +
				'</h2>' +
				'<textarea data-edit="listItems" class="textarea">' +
					value +
				'</textarea>'
			);
			break;
		
		// TÄHÄN JÄIN
		
		case "exportChildren":
			html = $(
				'<h2 title="If unchecked, the child items are omitted from the export. This way you can have placeholder items in SDB and you get to populate them later in your script.">' +
					'Export Child Items' +
				'</h2>' +
				'<label for="'+ key +'-input">' +
					'<span title="'+ creationProptitle[ key ] +'">'+ key +': </span>' +
					'<input type="checkbox" '+ (value ? 'checked' : '') +' data-edit="'+ key +'" id="'+ key +'-input" style="display: none;" />' +
					'<span class="input-sibling checkbox"></span>' +
				'</label>'
			);
			break;
		
		case "justify":
			html = $(
				'<div class="justify-container">' +
					'<h4>Justify:</h4>' +
					'<div class="justify-icon-wrap">' +
						'<div class="justify-icon" data-edit="justify" data-value="left">' +
							'<i class="icon fas fa-align-left"></i>' +
						'</div>' +
						'<div class="justify-icon" data-edit="justify" data-value="center">' +
							'<i class="icon fas fa-align-center"></i>' +
						'</div>' +
						'<div class="justify-icon" data-edit="justify" data-value="right">' +
							'<i class="icon fas fa-align-right"></i>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
			html.find('[data-value="'+ value +'"]').addClass('active');
			break;
		//
    // case "typeName":
    //   html = $(
    //     '<h2 title="The user can typically dismiss a modal dialog by clicking an OK or Cancel button, or by typing certain keyboard shortcuts. By convention, typing ENTER is the same as clicking OK or the default button, and typing ESC is the same as clicking Cancel. The keyboard shortcut has the same effect as calling notify for the associated button control.">' +
    //       'Button name' +
    //     '</h2>' +
    //     '<select name="qty" class="pretty-classic" data-edit="typeName" >' +
    //       '<option '+ (value == null ? 'selected' : '') +' value="null">Empty</option>' +
    //       '<option '+ (value == "Ok" ? 'selected' : '') +' value="Ok">Ok</option>' +
    //       '<option '+ (value == "Cancel" ? 'selected' : '') +' value="Cancel">Cancel</option>' +
    //     '</select>'
    //   );
    //   break;

		case "margins":
			var singleVal = typeof value !== 'object';
			html = $(
				'<h2 title="The number of pixels between the edges of a container and the outermost child elements. \n\nYou can specify different margins for each edge of the container. The default value is based on the type of container, and is chosen to match the standard Adobe UI guidelines.">' +
					'Margins' +
					'<div class="link-icon '+ (singleVal ? 'active' : '') +'" title="Adjust each side individually...">' +
						'<i class="fas fa-unlock-alt"></i>' +
						'<i class="fas fa-lock-open"></i>' +
					'</div>' +
				'</h2>' +
				'<span class="desc margins-desc '+ (!singleVal ? '' : 'hide') +'"><span>top</span><span>right</span><span>bottom</span><span>left</span></span>' +

				'<div class="margin-inputs">' +
					'<input class="number" style="display: none;">' +
					
					'<div class="n-1-4">' +
						'<input data-edit="margins" class="number top" value="'+ (!singleVal ? value[0] : value) +'" min="0" max="300" step="1" modifier-step="10">' +
					'</div>' +
					'<div class="n-3-4 '+ (singleVal ? 'hidden' : '') +'">' +
						'<input data-edit="margins" class="number right" value="'+ (!singleVal ? value[1] : value) +'" min="0" max="300" step="1" modifier-step="10"' + (singleVal ? 'disabled' : '') +'>' +
						'<input data-edit="margins" class="number bottom" value="'+ (!singleVal ? value[2] : value) +'" min="0" max="300" step="1" modifier-step="10"' + (singleVal ? 'disabled' : '') +'>' +
						'<input data-edit="margins" class="number left" value="'+ (!singleVal ? value[3] : value) +'" min="0" max="300" step="1" modifier-step="10"' + (singleVal ? 'disabled' : '') +'>' +
					'</div>' +

					'<input class="number" style="display: none;">' +
				'</div>'
			);
			break;
			
		case "preferredSize":
			html = $(
				'<h2 title="The preferred size, used by layout managers to determine the best size for each element. \n\nIf not explicitly set by a script, value is established by the UI framework in which ScriptUI is employed, and is based on such attributes of the element as its text, font, font size, icon size, and other UI framework-specific attributes. A script can explicitly set preferredSize before the layout manager is invoked in order to establish an element size other than the default.">' +
					'Preferred Size' +
				// '<h2 title="The minimum height and width to which the element can be resized.">' +
				// 	'Minimum Size' +
				// '<h2 title="If item is a parent, the exported code will use preferredSize and if the item is not a parent, minimumSize is used.">' +
				// 	'Size' +
					'<span class="preferred-size-auto" title="Reset to content size (0)"><i class="fas fa-compress"></i></span>' +
				'</h2>' +

				'<div class="dimensions-container linked">' +
					'<input class="number" style="display: none;">' +
					'<h4 class="width-heading">Width:</h4><input class="number width" data-edit="preferredSize" value="'+ value[0] +'" min="0" max="2000" step="1" modifier-step="10">' +
					'<h4 class="height-heading">Height:</h4><input class="number height" data-edit="preferredSize" value="'+ value[1] +'" min="0" max="2000" step="1" modifier-step="10">' +
					'<input class="number" style="display: none;">' +
				'</div>'
			);
			break;
			
		case "tabNavWidth":
			html = $(
				'<h2 title="The preferred size, used by layout managers to determine the best size for each element. \n\nIf not explicitly set by a script, value is established by the UI framework in which ScriptUI is employed, and is based on such attributes of the element as its text, font, font size, icon size, and other UI framework-specific attributes. A script can explicitly set preferredSize before the layout manager is invoked in order to establish an element size other than the default.">' +
					'Preferred width <small>(ListBox)</small>' +
					// '<span class="preferred-size-auto" title="Reset to content size (0)"><i class="fas fa-compress"></i></span>' +
				'</h2>' +

				'<div class="dimensions-container linked">' +
					'<input class="number" style="display: none;">' +
					'<h4 class="width-heading">Width:</h4><input class="number tabNavWidth" data-edit="tabNavWidth" value="'+ value +'" min="0" max="2000" step="1" modifier-step="10">' +
					'<input class="number" style="display: none;">' +
				'</div>'
			);
			break;
			
		case "orientation":
			// For future reference: I should've probably added a parent container
			// for both orientation and spacing, so that I can then seat them
			// next to each other easily. I wrote the prototype html this way
			// as I was figuring out how to position everything and well here we
			// are. This should never become an issue, since they are both parent
			// element properties, so they are always together... So yea... as it
			// is, "orientation" creates the heading for "spacing". Deal with it.
			html = $(
				'<h2 class="orientation-heading" title="The layout orientation of children in a container.">' +
					'Orientation' +
				'</h2>' +
				
				'<h2 class="spacing-heading" title="The number of pixels separating one child element from its adjacent sibling element. \n\nBecause each container holds only a single row or column of children, only a single spacing value is needed for a container. The default value is based on the type of container, and is chosen to match standard Adobe UI guidelines.">' +
					'Spacing' +
				'</h2>' +
				
				'<br>' +
				
				'<div class="orientation">' +
					'<select name="qty" class="pretty-classic" data-edit="orientation">' +
						'<option>row</option>' +
						'<option>column</option>' +
					'</select>' +
				'</div>'
			);
			html.last().find('option:contains("'+ value +'")').prop('selected', true);
			break;
			
		case "spacing":
			// Confused? read the comment above...
			html = $(
				'<input class="number" style="display: none;">' +
				'<div class="spacing-container">' +
					'<input class="number" data-edit="spacing" value="'+ value +'" min="0" max="300" step="1" modifier-step="5">' +
				'</div>' +
				'<input class="number" style="display: none;">'
			);
			break;
			
		case "alignChildren":
		
			var acaIsColumn = $('#dialog .active').hasClass('orientation-column');
					
			var horizontalFill = !acaIsColumn ? '' : '<option>fill</option>';
			var verticalFill   =  acaIsColumn ? '' : '<option>fill</option>';
			
			html = $(
				'<h2 title="Tells the layout manager how unlike-sized children of this container should be aligned within a column or row. \n\nOrder of creation determines which children are at the top of a column or the left of a row; the earlier a child is created, the closer it is to the top or left of its column or row. If defined, alignment for a child element overrides the alignChildren setting for the parent container. See alignment property for values.">' +
					'Align Children' +
				'</h2>' +
				'<div class="align-children">' +
					'<span class="x-axis">X:</span>' +
					'<select id="align-children-horizontal" data-edit="alignChildren" name="qty" class="pretty-classic">' +
						'<option>left</option>' +
						'<option>center</option>' +
						'<option>right</option>' +
						horizontalFill +
					'</select>' +
					
					'<span class="y-axis">Y:</span>' +
					'<select id="align-children-vertical" data-edit="alignChildren" name="qty" class="pretty-classic">' +
						'<option>top</option>' +
						'<option>center</option>' +
						'<option>bottom</option>' +
						verticalFill +
					'</select>' +
				'</div>'
			);
			
			// var horizontalValue = !isColumn && value[0] === 'fill' ? 'center' : value[0];
			// var verticalValue   =  isColumn && value[1] === 'fill' ? 'center' : value[1];
			var horizontalValue = value[0];
			var verticalValue   = value[1];
			
			html.find('#align-children-horizontal option:contains("'+ horizontalValue +'")').prop('selected', true);
			html.find('#align-children-vertical option:contains("'+ verticalValue +'")').prop('selected', true);
			break;
			
		case "image":
			html = $(
				'<div class="image-edit">' +
					'<div class="img-wrapper">' +
						'<img class="base64-bin" src="'+ value[0] +'" alt="" />' +
					'</div>' +
					'<div class="custom-file-input">' +
						'<div class="add">' +
							'<i class="fas fa-upload"></i>' + 'Choose file...' +
						'</div>' +
						'<div class="remove">' +
							'<i class="fas fa-times"></i>' + 
						'</div>' +
					'</div>' +
					'<input data-edit="image" type="file" accept="image/jpeg, image/png">' +
				'</div>'
			);
			break;
			
		case "alignment":
			
			var parent = $('#dialog .active').parent('div').parent('div'),
					apIsColumn = parent.hasClass('orientation-column'),
					parentOrientation = apIsColumn ? 'column' : 'row',
					orientation = apIsColumn ? 'horizontal' : 'vertical',
					noVal = value === null;
			
			var options = apIsColumn ? ['left', 'center', 'right', 'fill'] : ['top', 'center', 'bottom', 'fill'];
			
			var opt = '';
			$.each(options, function( i, v ) {
				v = v == null ? '' : (typeof v === 'string' ? v.replace(/\"/g, '&quot;') : v );
				opt += '<option value="'+ v +'">'+ v +'</option>';
			});
			
			var dropDown =
					'<div id="alignment-'+ orientation +'">' +
						'<select name="qty" class="pretty-classic" data-edit="alignment"  data-edit-value="'+ orientation +'" '+ (noVal ? 'disabled' : '') +' >' +
							opt +
						'</select>' +
					'</div>';
			
			html = $(
				'<div class="alignment-container">' +
				
					'<h2 title="The alignment style for this element. If defined, this value overrides the alignChildren setting for the parent container.">' +
						'Alignment <span>(Self)</span>' +
					'</h2>' +
	        
					'<div class="alignment-checkbox">' +
            '<input type="checkbox" id="alignment-checkbox-input" name="" '+ (noVal ? '' : 'checked') +' />' +
            '<label for="alignment-checkbox-input"></label>' +
          '</div>' +
					
					'<br>' +
					
					dropDown +
					
				'</div>'
			);
			
			var alignment;
			
			if ( parentOrientation === 'column' ) {
				alignment =
						value === 'top' && 'left' ||
						value === 'bottom' && 'right' ||
						value;
				html.find('#alignment-horizontal option:contains("'+ (value === null ? 'center' : alignment) +'")').prop('selected', true);
			}
			else {
				alignment =
						value === 'left' && 'top' ||
						value === 'right' && 'bottom' ||
						value;
				html.find('#alignment-vertical option:contains("'+ (value === null ? 'center' : alignment) +'")').prop('selected', true);
			}
			
			break;
			
	}
	
	return html;
	
};
