
var treeView = {
	
	onCreate: function( event ) {
		
		// There's no point in having a treeview with less than
		// two items, so this section makes sure that when it is
		// created, two child items are created as well.
		if ( event !== "loadFromLocalStorage" && event !== "drag-duplicate" )  {
			
			var treeView      = $('#panel-tree-view-wrap'),
					active        = treeView.find('.active'),
					treeViewId = active.data('item-id');
			
			var params = {
				id: item.get.id(),
				type: 'TreeItem',
				parentId: active.data('item-id'),
				target: active.find('> ul'),
				event: 'parent-propagation'
			};
			item.funnel.create( params ); // Filler tab N.1.
			var firstTabId = treeView.find('.active').data('item-id');
			
			item.activate( treeViewId );
			// params.target = treeView.find('.active').find('> ul');
			params.id = item.get.id();
			item.funnel.create( params ); // Filler tab N.2.
			
			item.activate( firstTabId ); // I'm not a 100% sure about this. The other option could be to activate the parent tabbed panel, but for now I figured You'd likely want to continue adding stuff inside the tab (on click) and possibly edit the tab text
			
		}
		
		// TreeViewItem item is hidden in the "Add items" panel by default, because you don't need it unless you have a TreeView item in the document.
		// There's no need for extra conditionals because this is triggered only after a TreeView item is created, which is what happens on load or import when the dialog is reconstructed.
		var addTab = $('#panel-new-item-wrap .treeitem');
		if ( !addTab.hasClass('show') ) {
			addTab.addClass('show');
		}
		
	},
	
	// Prevents dragging items to specific containers...
	// True = Prevent dropping
	onDragValid: function( $item, container ) {
		
		var contItem = container.target.parent('li');
		
		// ITEMS
		var itemIs_TreeviewItem  = $item.hasClass('treeitem');
		// TARGETS
		var targetIs_Treeview = contItem.hasClass('treeview');
		var targetIs_TreeviewItem = contItem.hasClass('treeitem');
		
		// True = Prevent dropping
		// Dragging item  + Target is not treeview or item = NO DROPSIES
		// Dragging !item + Target is treeview or item     = NO DROPSIES
		return (
			 itemIs_TreeviewItem && ( !targetIs_Treeview && !targetIs_TreeviewItem ) ||
		  !itemIs_TreeviewItem && (  targetIs_Treeview ||  targetIs_TreeviewItem )
		);
		
	},
	
	// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels. Silly humans...
	onClick: function( clickedItem, active ) {
		
		var activeType = active.data('item-type');
		
		// ITEMS
		var itemIs_TreeviewItem = clickedItem.hasClass('treeitem');
		// var itemIs_Treeview = clickedItem.hasClass('treeview');
		
		// TARGETS
		var targetIs_Treeview = activeType === "TreeView";
		var targetIs_TreeviewItem = activeType === "TreeItem";
		
		var result =
			 itemIs_TreeviewItem && ( !targetIs_Treeview && !targetIs_TreeviewItem ) ||
			!itemIs_TreeviewItem && (  targetIs_Treeview ||  targetIs_TreeviewItem );
			
	    if ( result ) {
				
				notification( 'error', "This item can't be placed inside the active item!", 1.8 );
				
				var deClass = 'failure-info';
				clickedItem.removeClass( deClass ); // reset
				clickedItem.addClass( deClass );
				setTimeout( function() {
					clickedItem.removeClass( deClass );
				}, 1950 );
				
	    }
		
		return result;
		
	}
	
};
