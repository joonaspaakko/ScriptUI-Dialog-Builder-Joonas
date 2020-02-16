

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
			else if ( type === 'DropDownList') {
				// Droplist is no more
			}
			// type === 'RadioButton' || type === 'Checkbox'
			else if ( active.find('> label').length > 0 ) {
				active.find('label').text( val );
			}
			else if ( type === 'Tab' ) {
				var parent = active.parent().parent();
				var parentType = parent.data('item-type');
				var tab = parent.find('> .tab-container [data-tab-id="'+ id +'"]');
				if ( parentType === 'TabbedPanel' ) {
					tab.text( val );
				}
				else if ( parentType === 'VerticalTabbedPanel' ) {
					tab.find('span').text( val );
				}
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
				droplist.set.items( active, val, style );
			}
			else if ( type === 'ListBox' ) {
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
			else if ( type === 'Panel' ) {
				paddingBox.css({
					paddingTop: top <= 3 ? 3 : top,
					paddingRight: right <= 3 ? 3 : right,
					paddingBottom: bottom <= 1 ? 1 : bottom,
					paddingLeft: left <= 3 ? 3 : left
				});
			}
			else if ( type === 'TabbedPanel' || type === 'VerticalTabbedPanel' ) {
				tabbedPanel.set.margins( top, right, bottom, left, id, paddingBox );
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
			
			if ( item.list[ type.toLowerCase() ](false).parent ) {
				active.find('> .soft-wrap-guard').remove(); // Get rid of the old one.
				if ( val[0] > 0 ) {
					$(
						'<style class="soft-wrap-guard"> \n' +
						'#dialog [data-item-id="'+ id +'"] .edit-text, \n' +
						'#dialog [data-item-id="'+ id +'"] .static-text {' +
							'max-width: '+ val[0] +'px;' +
						'}\n' +
						'#dialog [data-item-id="'+ id +'"] .edit-text.disable-soft-wrap, \n' +
						'#dialog [data-item-id="'+ id +'"] .static-text.disable-soft-wrap {' +
							'max-width: none;' +
						'}\n' +
						'</style>'
					).prependTo( active );
				}
			}
			
			dangerZone.set( params, active );
			droplist.set.size( active, val, style, type, newWidth, newHeight );
			
			break;
			
		// TAB NAV WIDTH
		case 'tabNavWidth':
			
			var verticalTabCont = active.find('.tab-container');
			verticalTabCont.css({ minWidth: val == 0 ? 'auto' : val });
			dangerZone.set( params, verticalTabCont, '.number.tabNavWidth' );
			
			break;
		
		// ORIENTATION
		case 'orientation':
		
			active.removeClass(function(i, classy) {
				return (classy.match(/(^|\s)orientation-\S+/g) || []).join(' ');
			}).addClass('orientation-' + val );
			
			break;
		
		// SPACING
		case 'spacing':
			
			// var	element = active.find('> .padding-box');
			var paddingBoxClass = '> .padding-box';
			active.find('> style.spacing').remove(); // Get rid of the old one.
			
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
					// ROW - First item reset
					'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-row '+ paddingBoxClass +' > div:not(.sdb-hidden) {' +
						'padding-left: 0px;' +
					'}\n' +
					// ROW - Spacing
					'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-row '+ paddingBoxClass +' > div:not(.sdb-hidden) ~ div:not(.sdb-hidden) {' +
						'padding-left: '+ val +'px;' +
					'}\n' +
					// COLUMN - First item reset
					'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-column '+ paddingBoxClass +' > div:not(.sdb-hidden) {' +
						'padding-top: 0px;' +
					'}' +
					// COLUMN - Spacing
					'#dialog [data-item-id="'+ active.data('item-id') +'"].orientation-column '+ paddingBoxClass +' > div:not(.sdb-hidden) ~ div:not(.sdb-hidden) {' +
						'padding-top: '+ val +'px;' +
					'}\n' +
				'</style>'
			).appendTo( active );
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
		
		// HELP TIP
		case 'helpTip':
			if ( val != null ) {
				active.attr('title', val.replace(/(\s\\n\s|\\n\s|\s\\n|\\n)/g,'\n') );
			}
			break;
      
		// SOFT WRAP
		case 'softWrap':
			if ( val != null ) {
        // Softwrap = true
        var arc = val ? 'removeClass' : 'addClass';
        active[ arc ]('disable-soft-wrap');
			}
			break;
			
		// CUSTOM VARIABLE NAME
		case 'varName':
			var lowerCaseName = typeof val == 'string' ? val.toLowerCase() : val;
			if ( type === 'Button' ) {
				if ( lowerCaseName === 'ok' )
					active.addClass('default-button');
				else if ( lowerCaseName !== 'ok' && active.hasClass('default-button') )
					active.removeClass('default-button');
			}
			break;
			
		// ENABLED
		case 'enabled':
			var classy = val ? 'removeClass' : 'addClass';
			active[ classy ]('disable-item');
			break;
	}
			
};
