
var verticalTabbedPanel = {
	
	onCreate: function( event ) {
		
		// There's no point in having a tabbed panel with less than
		// two items, so this section makes sure that when a tabbed
		// panel is created, two child tabs are created as well.
		if ( event !== "loadFromLocalStorage" && event !== "drag-duplicate" )  {
			
			var treeView      = $('#panel-tree-view-wrap'),
					active        = treeView.find('.active'),
					VTPanelId = active.data('item-id');
			
			var params = {
				id: item.get.id(),
				type: 'Tab',
				parentId: active.data('item-id'),
				target: active.find('> ul'),
				event: 'parent-propagation'
			};

			item.funnel.create( params ); // Filler tab N.1.
			var firstTabId = treeView.find('.active').data('item-id');
			
			item.activate( VTPanelId );
			params.id = item.get.id();
			item.funnel.create( params ); // Filler tab N.2.
			
			item.activate( firstTabId ); // I'm not a 100% sure about this. The other option could be to activate the parent tabbed panel, but for now I figured You'd likely want to continue adding stuff inside the tab (on click) and possibly edit the tab text
			
		}
		
		// Tab item is hidden in the "Add items" panel by default, because you don't need it unless you have a TabbedPanel in the document.
		// There's no need for extra conditionals because this is triggered only after a tabbed panel is created, which is what happens on load or import when the dialog is reconstructed.
		var addTab = $('#panel-new-item-wrap .tab');
		if ( !addTab.hasClass('show') ) {
			addTab.addClass('show');
		}
		
	}
	
};
