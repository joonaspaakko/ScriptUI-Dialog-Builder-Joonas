

// Updates the Dialog preview look
item.update.set_values = function( params ) {
	
	var val   = params.value,
			type  = params.dataItem.type,
			style = params.dataItem.style,
			id    = params.dataItem.id;
	
  var active = $('#dialog .active');
	var paddingBox = active.find('> .padding-box');
	
	switch ( params.property ) {
		
		// TEXT
		case 'text':
		
			if ( type === 'Dialog' ) {
				active.find('#dialog-title-bar div').text( val );
			}
			else if ( type === 'Panel' ) {
				var title = active.find('> .title');
				title.text( val );
				// Makes sure the panel container is always wide enough to cover the title
				paddingBox.css({ minWidth: title.width() + 22 });
			}
			// type === 'RadioButton' || type === 'Checkbox' || type === 'DropDownList'
			else if ( active.find('> label').length > 0 ) {
				active.find('label').text( val );
			}
			else if ( type === 'Tab' ) {
				active.parent().parent().find('> .tab-container [data-tab-id="'+ id +'"]').text( val );
			}
			else if ( type === 'TreeItem' ) {
				active.find('> .item-wrap .text-container').text( val );
			}
			else if ( item.list[ type.toLowerCase() ](false).multiline ) {
				
				var textContainer = active.find('.text-container');
				textContainer.html( val.split('\n').join("<br>") );
				
				var isMultiline = multilineCheck( params.dataItem.id )[0];
				var linebreak = val.indexOf('\n');
				if ( isMultiline ) {
					textContainer.addClass('multiline');
				}
				else {
					textContainer.removeClass('multiline');
				}
				
			}
			else {
				active.find('.text-container').html( val );
			}
			break;
		
		// LIST ITEMS
		case 'listItems':
			if ( type === 'DropDownList' ) {
				/*global droplist*/
				/*eslint no-undef: ["error", { "typeof": true }] */
				droplist.set( active, val, style );
			}
			else if ( type === 'ListBox' ) {
				/*global listbox*/
				/*eslint no-undef: ["error", { "typeof": true }] */
				listbox.set( active, val, style );
			}
			break;
		
		// CHECKED
		case 'checked':
			if ( val === true ) {
				active.find('input').prop( 'checked', true  );
			}
			break;
		
		// JUSTIFY
		case 'justify':
			active.removeClass(function(i, classy) {
				return (classy.match(/(^|\s)justify-\S+/g) || []).join(' ');
			}).addClass('justify-' + params.value );
			break;
		
		// MARGINS
		case 'margins':
			
			var val0 = val[0];
			var val1 = val[1];
			var val2 = val[2];
			var val3 = val[3];
			
			var singleVal = typeof val !== 'object';
			
			var top    = !singleVal ? val0 : val,
					right  = !singleVal ? val1 : val,
					bottom = !singleVal ? val2 : val,
					left   = !singleVal ? val3 : val;
			
			if ( type === 'Dialog' ) {
				paddingBox.css({
					paddingTop: top <= 6 ? 1 : top,
					paddingRight: right <= 1 ? 1 : right,
					paddingBottom: bottom <= 1 ? 1 : bottom,
					paddingLeft: left <= 1 ? 1 : left
				});
			}
			else if ( type === 'Panel' || type === 'Tab' ) {
				paddingBox.css({
					paddingTop: top <= 3 ? 3 : top,
					paddingRight: right <= 3 ? 3 : right,
					paddingBottom: bottom <= 1 ? 1 : bottom,
					paddingLeft: left <= 3 ? 3 : left
				});
			}
			else {
				paddingBox.css({
					paddingTop: top,
					paddingRight: right,
					paddingBottom: bottom,
					paddingLeft: left
				});
			}
			
			break;
		
		// PREFERRED SIZE
		case 'preferredSize':
			
			active.width('auto').height('auto');
			var contWidth = Math.round( active.width() );
			var contHeight = Math.round( active.height() );
			
			var isParent = item.list[ type.toLowerCase() ](false).parent;
			
			var newWidth  = val[0] == 0 ? 'auto' : ( params.event !== 'loadFromLocalStorage' && isParent && val[0] < contWidth  ) ? contWidth  : val[0];
			var newHeight = val[1] == 0 ? 'auto' : ( params.event !== 'loadFromLocalStorage' && isParent && val[1] < contHeight ) ? contHeight : val[1];
			active.css({ width: newWidth, height: newHeight + ( type === 'Dialog' && 23 )});
			
			// Special treatment for Dropdownlist
			if ( type === "DropDownList" ) {
				
				var listWrap = active.find('.drop-list-wrap');
				var label = active.find('label');
				
				active.removeClass('too-big');
				active.removeClass('too-small');
				
				active.addClass('get-width');
				var active_width = active.width();
				var label_width = label.outerWidth( true );
				var select_width = listWrap.outerWidth( true );
				active.removeClass('get-width');
				
				var children_width = label_width + select_width;
				
				if ( newWidth > children_width ) {
					active.addClass('too-big');
					if ( select_width < active_width ) {
						listWrap.width( 'auto' );
					}
				}
				else if ( newWidth < children_width ) {
					active.addClass('too-small');
					if ( select_width > active_width ) {
						listWrap.width( active_width - 16 );
					}
					if ( active.parent().parent().hasClass('orientation-row') ) {
						// In this situation the label has position: absolute; so it doesn't respect the padding on the left side.
						active.find('label').css({ marginLeft: active.css('padding-left') })
					}
				}
			}
			
			break;
		
		// ORIENTATION
		case 'orientation':
			active.removeClass(function(i, classy) {
				return (classy.match(/(^|\s)orientation-\S+/g) || []).join(' ');
			}).addClass('orientation-' + val );
			break;
		
		// SPACING
		case 'spacing':
			
			var	element = active.find('> .padding-box');
			var paddingBoxClass = '> .padding-box';
			element.find('> style.spacing').remove(); // Get rid of the old one.
			
			var extraPadding = 0;
			var parentId = params.data.items['item-' + id].parentId;
			if ( parentId !== false ) {
				var parentData = params.data.items['item-' + parentId];
				var parentOrientationRow = parentData.style.orientation === 'row';
				if ( parentOrientationRow ) {
					extraPadding = 2;
				}
			}
			
			val = val + extraPadding;
			
			$(
			'<style class="spacing">' +
				'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-row '+ paddingBoxClass +' > div {' +
					'padding-left: '+ val +'px;' +
				'}\n' +
				'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-row '+ paddingBoxClass +' > div:first-of-type {' +
					'padding-left: 0px;' +
				'}\n' +
				'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-column '+ paddingBoxClass +' > div {' +
					'padding-top: '+ val +'px;' +
				'}\n' +
				'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-column '+ paddingBoxClass +' > div:first-of-type {' +
					'padding-top: 0px;' +
				'}' +
			'</style>'
			).appendTo( element );
			break;
		
		// ALIGN CHILDREN
		case 'alignChildren':
			active.removeClass(function(i, classy) {
				return (classy.match(/(^|\s)align-children-\S+/g) || []).join(' ');
			});
			active.addClass('align-children-horizontal-' + val[0]);
			active.addClass('align-children-vertical-' + val[1]);
			break;
		
		// ALIGNMENT
		case 'alignment':
			active.removeClass(function(i, classy) {
				return (classy.match(/(^|\s)alignment-\S+/g) || []).join(' ');
			});
			
			if ( val !== null ) {
				var alignment =
						val === 'left' && ['left','top'] ||
						val === 'top' && ['left','top'] ||
						val === 'right' && ['right','bottom'] ||
						val === 'bottom' && ['right','bottom'] ||
						[val, val];
				
				active.addClass('alignment-horizontal-' + alignment[0] );
				active.addClass('alignment-vertical-' +  alignment[1] );
			}
			break;
	}
			
};
