
var treeViewItem = {
	
	onClick: function() {
		
		$('#dialog').on("click", ".tree-view-arrow", function() {
			
			var treeItem = $(this).parent('.item-wrap').parent('.tree-view-item');
			var treeId = treeItem.data('item-id');
			
			var data = local_storage.get('dialog');
			var dataItem = data.items[ 'item-' + treeId ];
			
			treeViewItem.expand( data, dataItem, treeItem, true );
			
		});
		
	},
	
	onSort: function( $item, type, id ) {
		
    if ( type === 'TreeItem' ) {
			var treeItem = $('#dialog [data-item-id="'+ id +'"]')
			var parent = treeItem.parent('.padding-box').parent('.tree-view-item');
			
			parent.addClass('tree-node');
			
			// Get rid of previous data
			var prevParent = $('#dialog .tree-node > .padding-box:empty').parent().removeClass('tree-node expanded');
			
			if ( prevParent.length > 0 ) {
				var prevParentId = prevParent.data('item-id');
				var data = local_storage.get('dialog');
				var dataItem = data.items[ 'item-' + prevParentId ];
				delete dataItem.expanded
				local_storage.set('dialog', data);
			}
			
		}
		
	},
	
	onUpdate: function( data, dataItem ) {
		
		if ( dataItem.type === 'TreeItem' ) {
			var treeItem = $('#dialog [data-item-id="'+ dataItem.id +'"]');
						
			var hasParent = treeItem.parent('.padding-box').parent('.tree-view-item').length > 0;
			var nodeClass = 'tree-node';

			if ( hasParent ) {
				treeItem.parent('.padding-box').parent('.tree-view-item').addClass( nodeClass );
			}
			
			treeViewItem.expand( data, dataItem, treeItem );
		}
		
	},
	
	expand: function( data, dataItem, treeItem, click ) {
		
		var eClass = 'expanded';
		
		var classwap;
		if ( click !== true ) {
			classwap = dataItem.expanded ? 'addClass' : 'removeClass';
		}
		else {
			var isExpanded = treeItem.hasClass( eClass );
			classwap = isExpanded ? 'removeClass' : 'addClass';
		}
		treeItem[ classwap ]( eClass );
		
		if ( click ) {
			// COLLAPSE
			if ( isExpanded ) {
				delete data.items[ 'item-' + dataItem.id ].expanded
			}
			// EXPAND
			else {
				data.items[ 'item-' + dataItem.id ].expanded = true;
			}
			local_storage.set('dialog', data );
		}
		
	}

};

treeViewItem.onClick();
