var listbox = {
	
	init: function( listBoxWrap, id ) {
		
		listBoxWrap.on("click", "li", function() {
			var listBoxItem = $(this);
			listbox.clickety( id, listBoxWrap, listBoxItem );
		});
		
	},
	
	clickety: function( id, listBoxWrap, listBoxItem ) {
		
		
		// LIGHT SWITCH...
		var selectedClass = 'selected';
		var arClass = listBoxItem.hasClass( selectedClass ) ? 'removeClass' : 'addClass';
		listBoxItem[ arClass ]( selectedClass );
		
		// GET ALL SELECTED ITEMS...
		var collector = [];
		listBoxWrap.find('li').each( function() {
			if ( $(this).hasClass( selectedClass ) ) {
				collector.push( $(this).index() );
			}
		});
		
		// WRITE SELECTION LOCAL STORAGE...
		var data = local_storage.get('dialog');
		data.items[ 'item-' + id ].style.selection = collector;
		local_storage.set('dialog', data );
		
	},
	
	set: function( active, val ) {
	
		var ulist = active.find('ul');
		ulist.children().remove();
		var list = val.split(',');
		
		// Remove last selection if it's index is larger than the current list
		var data = local_storage.get('dialog');
		var dataItem = data.items[ 'item-' + data.activeId ];
		
		function getMax( input ) {
			var max = 0;
			$.each( input, function( i, val ) {
				if ( max < val ) max = val;
			});
			return max;
		}
		
		if ( dataItem.style.selection !== undefined ) {
			if ( getMax( dataItem.style.selection ) >= list.length ) {
				dataItem.style.selection.pop();
			}
			local_storage.set('dialog', data );
		}
		
		// Rebuild the list
		$.each( list, function( i, item ) {
			var trimmedItem = item.trim();
			var inSelection = $.inArray( i, dataItem.style.selection ) >= 0;
			var selectedClass = (inSelection) ? ' class="selected"' : '';
			$('<li'+ selectedClass +'><span>'+ trimmedItem +'</span></li>').appendTo( ulist );
		});
		
	}
	
};
