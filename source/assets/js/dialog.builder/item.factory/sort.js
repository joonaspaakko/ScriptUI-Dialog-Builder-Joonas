
// Functions triggered from
// "assets/js/dialog.builder/panels/structure.treeview.js" by a drag
// event created by the jquery sortable plugin Tree View doesn't need
// its own function, since the sortable plugin takes care of that.

item.sort = {
	localStorage: function( id, parentId ) {
		
		// Read old data from local storage....
		var data = local_storage.get('dialog');
		// Update order by re-recoding the id's of every single item currently in the tree view
		data.order = getOrder();
		// Update parent id
		data.items[ 'item-' + id ].parentId = parentId;
		// Write back to local storage...
		local_storage.set('dialog', data );
		
		function getOrder() {
			var order = [];
			$('#tree-view-contents [data-item-id]').each(function() {
				var id = $(this).data('item-id');
				order.push( id );
			});
			return order;
		}
		
	},
	dialogPreview: function( id, parentId, type, method, targetId ) {
		
		var dialog = $('#dialog'),
				active = dialog.find('[data-item-id="'+ id +'"]'),
				targetElement = dialog.find('[data-item-id="'+ targetId +'"]'),
				target = method === 'insertAfter' ? targetElement : targetElement.find('> .padding-box');
		
		active[ method ]( target );
		
		// If you move a checked radiobutton to a parent that already has a checked radio button, uncheck the radiobutton that was moved.
		if ( type === "RadioButton" ) {
			
			var radiobutton = active.find('.radiobutton'),
					radiobuttonIsOn = radiobutton.hasClass('on'),
					selectedSiblingsCounter = 0;
					
			var notRadioBtn = ':not([data-item-type="RadioButton"],.spacing)';
			var adjacentSiblings = active.nextUntil( notRadioBtn ).add( active.prevUntil( notRadioBtn ) );
			
			adjacentSiblings.each(function(){
				if ( $(this).find('.radiobutton').hasClass('on') ) ++selectedSiblingsCounter;
			});

			if ( selectedSiblingsCounter > 0 && radiobuttonIsOn ) {
				
				radiobutton.removeClass('on');
				
				var data = local_storage.get('dialog');
				data.items[ 'item-' + id ].style.checked = false;
				local_storage.set('dialog', data );
				
			}
			
		}
		
	}
	
};
