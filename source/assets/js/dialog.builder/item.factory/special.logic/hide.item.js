
var hideItem = {
	
	hiddenClass: 'sdb-hidden',
	
	onCreate: function( id ) {
		
		var lss = 'dialog';
		var data = local_storage.get( lss );
		var itemData = data.items[ 'item-'+id ];
		var isHidden = itemData.hidden;
		
		// Thought I'd also hide items if any ancestor has the class
		// `.sdb-hidden`, but after trying it, I realized it would make it harder
		// to figure out which item was actually hidden. It did cross my mind
		// I could color code them, but leaivng it as it is, is less work and
		// probably makes more sense to users.
		
		// $('[data-panel="treeview"] [data-item-id="'+ itemData.id  +'"]').closest('.sdb-hidden').length > 0
		if ( isHidden ) {
			var dialogItem = $('#dialog [data-item-id="'+ id +'"]');
			if ( dialogItem.data('item-type') === 'Tab' ) $('#dialog [data-tab-id="'+ id +'"]').addClass( hideItem.hiddenClass );
			dialogItem.addClass( hideItem.hiddenClass );
			$('[data-panel="treeview"] [data-item-id="'+ id +'"]').addClass( hideItem.hiddenClass );
		}
		
	},
	
	contextMenu: {
		onShow: function( id ) {
			
			if ( id != 0 ) {
				var lss = 'dialog';
				var data = local_storage.get( lss );
				var itemData = data.items[ 'item-'+id ];
				var isHidden = itemData.hidden;
				
				var newText = isHidden ? '<i class="far fa-eye"></i> Show' : '<i class="far fa-eye-slash"></i> Hide';
				$('#context-menu .item-hide').html( newText + ' item' );
			}
			else {
				$('#context-menu .item-hide').remove();
			}
			
		},
		onClick: function( _this, item ) {
			var id = item.data('item-id');
			if ( id !== 0 ) {
				
				var lss = 'dialog';
				var data = local_storage.get( lss );
				
				var itemData = data.items[ 'item-'+id ];
				var isHidden = itemData.hidden;
				
				var dialogItem = $('#dialog [data-item-id="'+ id +'"]');
				var treeItem = $('[data-panel="treeview"] [data-item-id="'+ id +'"]');
				if ( !isHidden ) {
					itemData.hidden = true;
					dialogItem.addClass( hideItem.hiddenClass );
					treeItem.addClass( hideItem.hiddenClass );
				}
				else {
					delete itemData.hidden;
					dialogItem.removeClass( hideItem.hiddenClass );
					treeItem.removeClass( hideItem.hiddenClass );
				}
				
				if ( itemData.type === 'Tab' ) {
					tab.onHideToggle( isHidden, hideItem.hiddenClass, itemData, data );
				}
				
				local_storage.set( lss, data );
				
			}
		}
	},
	
	onExport: function( itemData ) {
		
		var comment = '// ';
		var commentOut = itemData.hidden && comment ||
										 $('[data-panel="treeview"] [data-item-id="'+ itemData.id  +'"]').closest('.sdb-hidden').length > 0 && comment ||
										 '';
		// if item data is hidden or if any ancestor has class `.sdb-hidden`
		return commentOut;
		
	}
	
};
