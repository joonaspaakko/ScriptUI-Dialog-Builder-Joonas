
// Cram it in there...
item.funnel = {
	create: function( params ) {
		
		params = tab.preCreate( params );
		
		params.style = item.create.localStorage( params );
		item.create.treeView( params );
		
		item.update.order(); // Rebuilds the order every time a new item is created.
		item.create.dialogPreview( params );
		item.activate( params.id );
		
		tab.onCreate( params );
		
		var ignore = 'localStorage';
		item.funnel.update( 'all', ignore );
		
		var loadFromLocalStorage = params.event === 'loadFromLocalStorage';
	  if ( !loadFromLocalStorage ) edit_style_panel.build( params.style );
		
		var isTPanel = params.type === 'TabbedPanel';
		if ( isTPanel ) tabbedPanel.onCreate( params.event );
		var isVTPanel = params.type === 'VerticalTabbedPanel';
		if ( isVTPanel ) verticalTabbedPanel.onCreate( params.event );
		var isTreeView = params.type === 'TreeView';
		if ( isTreeView ) treeView.onCreate( params.event );
		
		// var active = $('#dialog [data-item-id="'+ params.id +'"]');
		
		hideItem.onCreate( params.id );
		
		$("#dialog-section").backstretch("resize");
		
	},
	remove: function( id ) {
		
		var removedItem = $('#panel-tree-view-wrap [data-item-id="'+ id +'"]'),
				prev        = removedItem.prev(),
				next        = removedItem.next(),
				parent      = removedItem.parent('ul').parent('li'),
				removedType = removedItem.data('item-type');
		
		item.remove.treeView( id );
		item.remove.dialogPreview( id, removedType );
		item.remove.localStorage();
		
		var data = local_storage.get('dialog');
		item.update.style.treeViewAll( data );
		
		// If the removed item was active, figure out which element to activate next.
		if ( $('#panel-tree-view-wrap .active').length < 1 ) {
			
			// Order of operation:
			// ( If not possible, move to the next one )
			// 1. Select next down
			// 2. Select next up
			// 3. Select parent
			id =
				(next.length > 0) && next.data('item-id') ||
				(prev.length > 0) && prev.data('item-id') ||
				parent.data('item-id');
			
			item.activate( id );
			
			// Build Item Properties panel
		  edit_style_panel.build( data.items[ 'item-' + id ].style );
		}
		
		setTimeout(function(){
			$("#dialog-section").backstretch("resize");
		}, 1);
		
	},
	update: function( prop, ignore ) {
		
		// droplist.hide();
		
		// LOCAL STORAGE
		var data = local_storage.get('dialog');
		
		data = ignore === 'localStorage' ? data : item.update.style.localStorage( prop, data );
		var dataItem = data.items[ 'item-' + data.activeId ];
		
		// TREE VIEW PANEL
		item.update.style.treeView( prop, data, dataItem );
		item.update.style.treeViewAll( data );
			
		// DIALOG PREVIEW
		if ( ignore !== "dialog" ) item.update.style.dialogPreview( prop, data, dataItem );
		
		// TREE VIEW - ITEM
		treeViewItem.onUpdate( data, dataItem );
		
		forceSize.onUpdate( prop, data, dataItem );
		
		// Background size was not always updating, so this be a quick fix for I am lazy...
		// It was happening especially when the text changes from type to anything else.
		setTimeout(function() {
			$("#dialog-section").backstretch("resize");
		}, 10);
		
	},
	sort: function( id, parentId, type, method, targetId ) {
		
		item.sort.dialogPreview( id, parentId, type, method, targetId );
		item.sort.localStorage( id, parentId );
		$("#dialog-section").backstretch("resize");
		
	}
	
};
