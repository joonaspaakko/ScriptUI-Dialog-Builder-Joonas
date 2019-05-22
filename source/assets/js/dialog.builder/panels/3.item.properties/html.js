
var panel_edit_style_html = {};

// Mayhaps in hindsight this wasn't the best way to build this html...
// but what is done is done. Honestly, I look at this and I'm like oh
// boy... I have absolutely no idea why I made it this way. My best
// defense is that everything in this project started as a prototype
// and I never could be arsed to make it in a sensible way after I had
// decided what I wanted from it. Once a lazy boy, always a lazy boy.
panel_edit_style_html.init = function( key, value ) {

	// Order is specified by the premade containers in 'build.js'

	var html;
	
	switch ( key ) {
		
		case "varName":
			html = $(
				'<h2 title="Each item is given an automatically generated variable. Those variables are pretty generic. With this you can overwrite it with your own.">' +
					'Custom Variable Name' +
				'</h2>' +
				'<input type="text" data-edit="varName" value="'+ ( value == null ? '' : value ) +'">'
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
			
		case "iconButtonStroke":
			html = $(
				'<h2 title="Changes style property into &#x22;button&#x22; which creates a border around the button. If unchecked, a style property will use &#x22;toolbutton&#x22;, which has a flat appearance">' +
					'Buttonify (Border): ' +
					'<input style="float: right;" type="checkbox" data-edit="iconButtonStroke"'+ ( value ? 'checked' : '' ) +'>' +
				'</h2>'
			);
			break;


    case "softWrap":
      // Defined below in the text case. They are always a pair.
      break;
		
		case "text":
      var softWrap = item.list[ $('#dialog .active[data-item-type]').data('item-type').toLowerCase() ](false).defaultStyle.softWrap;
			html = $(
				'<h2 title="Initial text to be displayed in the control as the title, label, or contents, depending on the control type.">' +
					'Text' +
          ( (softWrap === true || softWrap === false) ? '<label class="soft-wrap-wrap-wrap" style="color: #c1c1c1; font-size: 13px; float: right;" for="softWrapCheckbox">Soft Wrap: <input id="softWrapCheckbox" style="position: relative; top: -1px;" type="checkbox" data-edit="softWrap"'+ ( !$('#dialog .active').hasClass('disable-soft-wrap') ? 'checked' : '' ) +'></label>' : '' ) +
				'</h2>' +
				'<div class="edit-text-wrap">' +
          '<div class="no-linebreaks-icon" title="This item does not support multiline, so no line breaks."><img src="assets/images/no-line-break-icon.svg" alt="" /></div>' +
					'<textarea data-edit="text" class="textarea">' +
						value +
					'</textarea>' +
				'<div>'
			);
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
						'<i class="fas fa-upload"></i>' + 'Choose file...' +
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
