
item.remove = {
	localStorage: function() {
		
		// Read old data from local storage.
		var data = local_storage.get('dialog');
		// Get current order
		data.order = newTreeViewOrder();
		
		// Check items in the local storage against the current order.
		// Remove all items that don't belong.
		$.each( localStorageItems(data), function( i, id ) {
			if ( $.inArray( id, data.order ) < 0 ) {
				delete data.items[ 'item-' + id ];
			}
		});
		
		// Write back to local storage.
		local_storage.set('dialog', data );
		
		// Gets ID's of all the items in local storage
		function localStorageItems( data ) {
			var localStorageItems = [];
			$.each( data.items, function( i, item ) {
				localStorageItems.push( item.id );
			});
			return localStorageItems;
		}
		
		// Gets ID's of all the items currently in the Tree View Panel...
		function newTreeViewOrder() {
			var newTreeViewOrder = [];
			$('#tree-view-contents [data-item-id]').each(function() {
				newTreeViewOrder.push( $(this).data('item-id') );
			});
			return newTreeViewOrder;
		}
		
	},
	treeView: function( id ) {
		
		// Remove the clicked item...
		var treeView = $('#panel-tree-view-wrap');
		treeView.find('[data-item-id="'+ id +'"]').remove();
		
	},
	dialogPreview: function( id, removedType ) {
		
		// Gets rid of the tab in dialog prev and also handles resizing
		tab.onRemove( id, removedType );
		
		// Remove the clicked item if it exists...
		var dialog = $('#dialog');
		var removedItem = dialog.find('[data-item-id="'+ id +'"]');
		if ( removedItem.length > 0 ) {
			dialog.find('[data-item-id="'+ id +'"]').remove();
		}
		
	}
	
};
