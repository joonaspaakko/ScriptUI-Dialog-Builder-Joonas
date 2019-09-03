// This droplist has so many smoking mirrors... Practically all mirrors at this point... **FRAGILE**

// REMOVE (HIDE) LIST ON WINDOW RESIZE
// Because the opened up list is held in place via absolute positioning...
droplistOnWindowResize();
function droplistOnWindowResize() {
	$(window).on("resize", function() {
		droplist.hide();
	});
}

var droplist = {
	
	init: function( active ) {
		
		var listWrap = active.find('.drop-list-wrap');
		
		listWrap.on('click', function() {
			
			// THERE CAN BE ONLY ONE!!
			$('#drop-list').remove();
			
			var listWrap = $(this);
			var isOpen = listWrap.hasClass('open');
			// Activate item if textbox doesn't exist
			var id = listWrap.parent().data('item-id');
			var data  = local_storage.get('dialog');
			var itemData = data.items[ 'item-' + id ];
			item.activate( id, 'dialog-preview' );
			edit_style_panel.build( itemData.style );
			
			if ( !isOpen ) {
				
				listWrap.addClass('open');
				
				var items = droplist.inspector( id, listWrap );
				
				droplist.makeList( id, listWrap, items );
				
				$('#drop-list ul li').on('click', function() {
					
					var clickedItem = $(this),
				  		localStorage_data = local_storage.get('dialog');
					
			    localStorage_data.items[ 'item-' + id ].style.selection = clickedItem.index();
					local_storage.set('dialog', localStorage_data );
					listWrap.find('.selected').removeClass('selected');
					listWrap.find('.items').children().eq( clickedItem.index() ).addClass('selected');
					droplist.hide();
					
				});
				
			}
			// Second click on the .drop-list-wrap...
			else {
				droplist.hide();
			}
			
		});
		
	},
	
	backbone: function( listWrap ) {
		
		var maxWidth = null;
		var items = listWrap.find('.items').children();
		
		items.each(function(){
			var currentWidth = $(this).width();
			if ( currentWidth > maxWidth ) {
				maxWidth = currentWidth;
			}
		});
		// listWrap.width( maxWidth );
		items.width( maxWidth );
		
	},
	
	inspector: function( id, listWrap ) {
		
		var itemCollector = '';
		var selectedIndex = listWrap.find('.selected').index();
		listWrap.find('.items').children().each(function( i ) {
			var text = $(this).text();
			var hr = text === '-' ? ' horizontal-line' : '';
			itemCollector += '<li class="option'+ hr + (i === selectedIndex ? ' selected' : '') +'">'+ text +'</li>';
		});
		return itemCollector;
		
	},
	
	makeList: function( id, listWrap, items ) {
		
		var listWrapOffsetTop  = listWrap.offset().top,
				listWrapOffsetleft = listWrap.offset().left,
				listWrapWidth      = listWrap.outerWidth(),
				listWrapHeight     = listWrap.outerHeight();
		
		$('<div id="drop-list"><ul>'+ items +'</ul></div>').appendTo('#dialog-section');
		
		var dl = $('#drop-list'),
				border = parseInt( dl.css('border-left-width'), 10) * 2,
				padding = parseInt( dl.css('padding-left'), 10) * 2;
				
		dl.css({
			top: listWrapOffsetTop + listWrapHeight,
			left: listWrapOffsetleft - ($(window).width() - $('#dialog-overlay-wrap').width()),
			width: listWrapWidth - ( border + padding )
		});
		
	},
	
	set: {
		items: function( active, val, style ) {
			
			var dropDownItems = active.find('.items');
			dropDownItems.children().remove();
			var ping = false;
			// Rebuild the list
			$.each( val.split(','), function( i, item ) {
				var trimmedItem = item.trim();
				var hr = trimmedItem == '-' ? ' horizontal-line' : '';
				var selectedClass = (i === style.selection) ? ' selected test' : '';
				if ( i === style.selection ) ping = true;
				$('<div class="'+ selectedClass + hr +'">'+ trimmedItem +'</div>').appendTo( dropDownItems );
			});
			
			// Makes it so that if the selected item is removed, the selected item is swapped to the first item.
			// This will prevent bunch of other issues...
			if ( !ping ) {
				var data = local_storage.get('dialog');
				var dataItem = data.items[ 'item-' + data.activeId ];
				dataItem.style.selection = 0;
				local_storage.set('dialog', data );
				
				dropDownItems.find('> div:first').addClass('selected');
			}
			
			var listWrap = active.find('.drop-list-wrap');
			droplist.backbone( listWrap );
			
		},
		
		size: function( active, val, style, type, newWidth ) {
			
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
			
		}
	},
	
	hide: function() {
		
		$('#drop-list').remove();
		$('.drop-list-wrap.open').removeClass('open');
		
	},
	
	onActivate: function( active ) {
		if ( active.data('item-type') === 'DropDownList' && !$('[data-panel="edit"] .target-text').is(':empty') ) {
			$('<small title="Use staticText instead. For more info check issue: #56" style="color: red;"> Deprecated!</small>').appendTo('[data-panel="edit"] .target-text > h2');
		}
	},
	
	onExport: function() {
		
		var data = local_storage.get('dialog');
		$.each( data.items, function( item, itemData ) {
			if ( itemData.type === 'DropDownList' && itemData.style.text != undefined ) {
				if ( itemData.style.text.trim() == '' ) {
					delete itemData.style.text;
				}
			}
		});
		
		local_storage.set('dialog', data);
		
	}
	
};
