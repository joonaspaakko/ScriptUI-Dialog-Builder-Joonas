

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
				// Makes sure the panel container is always wide enough to hold the title
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
				droplist.set.items( active, val, style );
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
			
			var newWidth  = val[0] == 0 ? 'auto' : val[0];
			var newHeight = val[1] == 0 ? 'auto' : val[1] + (type === 'Dialog' ? $('#dialog-title-bar').outerHeight() : 0);
			active.css({ minWidth: newWidth, minHeight: newHeight });
			
			/*global dangerZone*/
			/*eslint no-undef: ["error", { "typeof": true }] */
			dangerZone.set( params, active, paddingBox );
			
			/*global droplist*/
			/*eslint no-undef: ["error", { "typeof": true }] */
			droplist.set.size( active, val, style, type, newWidth, newHeight );
			
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
		
		// IMAGE
		case 'image':
			active.find('img').attr("src", val[0] );
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
