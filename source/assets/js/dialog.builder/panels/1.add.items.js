var addItemsPanel = {
	
	init: function() {
		
		this.generateHTML();
		
		// CREATE NEW ITEM EVENT
		$('#panel-new-item-wrap li').on("click", function() {
			
			var treeviewPanel = $('#panel-tree-view-wrap'),
					active   = treeviewPanel.find('.active'),
					isParent = active.data('parent');
			
		  var params = {
				id: item.get.id(),
		    type: $(this).data('item-type'),
		    parentId: isParent ? active.data('item-id') : active.data('item-parent-id'),
				target: isParent ? active.find('> ul') : active,
		    event: 'click'
		  };
			
			var t = tab.onClick( $(this), active, params );
			var tv = treeView.onClick( $(this), active, params );
			if ( !t && !tv ) {
				item.funnel.create( params );
			}
			
		});
	
	},
	
	generateHTML: function() {
		
		var addItemsHTML = '';

		$.each( item.list, function( name ) {
			var itemData = item.list[ name ](false);
			if ( itemData.addPanelIconClass && itemData.type !== 'Dialog' ) {
				
				if ( itemData.addPanelDivider === 'above' ) addItemsHTML += '<span class="gouping-divider"></span>';
				addItemsHTML +=
					'<li class="'+ name +'" data-item-type="'+ itemData.type +'">' +
						'<i class="fas fa-exclamation-triangle failure-is-an-option"></i>' +
						'<i class="'+ itemData.addPanelIconClass +'"></i><span>'+ itemData.type +'</span>' +
					'</li>';
				if ( itemData.addPanelDivider === 'below' ) addItemsHTML += '<span class="gouping-divider"></span>';
				
			}
		});
		
		addItemsHTML += '<div class="disabled-overlay"></div>';

		$('<ul>'+ addItemsHTML +'<ul>').appendTo('#panel-new-item-wrap .contents');
		
	}
	
};

addItemsPanel.init();
