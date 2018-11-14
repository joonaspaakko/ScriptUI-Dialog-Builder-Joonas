

var tab = {
	
	onCreate: function( params  ) {
		var isTab = params.type === 'Tab';
		if ( isTab ) {
			
			var tPanel  = $('#dialog [data-item-id="'+ params.parentId +'"]');
			var tabCont = tPanel.find('> .tab-container');
			// var tabItem = $('#dialog [data-item-id="'+ params.id +'"]');
			
			$(
				'<div class="tab" data-tab-id="'+ params.id +'" contenteditable>'+
					params.style.text +
				'</div>'
			).appendTo( tabCont );
			
			tab.containerSort( tPanel.find('> .padding-box > .tab'), tabCont );
			item.activate( params.id );
			
			// Build Item Properties panel
			var data  = local_storage.get('dialog');
		  edit_style_panel.build( data.items[ 'item-' + params.id ].style );
			
		}
	},
	
	onActivate: function( id ) {
		
		var currentItem = $('#panel-tree-view-wrap [data-item-id="'+ id +'"]');
		
		// Shows the green "active" color on the tab text...
		var currentTab = $('#dialog .tab-container [data-tab-id="'+ id +'"]');
		$('#dialog .currently-active-tab').removeClass('currently-active-tab');
		currentTab.addClass('currently-active-tab');
		
		if ( currentItem.closest('.tabbedpanel').length > 0 ) {
			var data          = local_storage.get('dialog');
			var allParentTabs = currentItem.parentsUntil('.dialog').filter('.tab');
			
			allParentTabs.add( currentItem.data('item-type') === 'Tab' && currentItem ).each(function() {
			
				var dataTab    = data.items['item-' + $(this).data('item-id') ];
				var dataTPanel = data.items['item-'+ $(this).data('item-parent-id') ];
				
				tab.show( dataTab, dataTPanel );
				
				// Write back to local storage
				dataTPanel.style.selection = dataTab.id;
				local_storage.set('dialog', data);
				
			});
		}
		
	},
	
	show: function( dataTab, dataTPanel ) {
		
		var tab = $('#dialog [data-item-id="'+ dataTPanel.id +'"] > .tab-container [data-tab-id="'+ dataTab.id +'"]');
			tab.addClass('visible').siblings().removeClass('visible'); // Tab
		var tabContent = $('#dialog [data-item-id="'+ dataTPanel.id +'"] > .padding-box > [data-item-id="'+ dataTab.id +'"]')
			tabContent.addClass('visible-tab').siblings().removeClass('visible-tab'); // Tab content
			
	},
	
	onRemove: function( id, type ) {
		
		var data = local_storage.get('dialog');
		var tabId;
		
		if ( type === "Tab" ) {
			tabId = id;
			$('#dialog div[data-tab-id="'+ tabId +'"]').remove();
			var dataItem = data.items['item-'+ id ];
			var anotherTab = $('#panel-tree-view-wrap [data-item-id="'+ dataItem.parentId +'"] > ul > li:first');
			tabId = anotherTab.data('item-id');
			
			$('#dialog [data-item-id="'+ id +'"]').remove();
			tab.onUpdate.init( data, tabId );
		}
		else if ( $('#dialog [data-item-id="'+ id +'"]').closest('.tab').length > 0 ) {
			tabId = $('#dialog [data-item-id="'+ id +'"]').closest('.tab').data('item-id');
			
			$('#dialog [data-item-id="'+ id +'"]').remove();
			tab.onUpdate.init( data, tabId );
		}
		
		
	},
	
	// Makes sure the previous tabbed panel minimum
	// dimensions don't include the moved item anymore
	onStartSort: function( $item ) {
		
		var itemIsTab = $item.hasClass('tab');
		if ( itemIsTab ) {
			
			$('body').addClass('dragging-tab');
			
			var id = $item.data('item-id');
			var data = local_storage.get('dialog');
			// var itemData = data.items['item-'+ id ];
			var dialogItem = $('#dialog [data-item-id="'+ id +'"]');

			dialogItem.addClass('tab-temp-hide-class');
			tab.onUpdate.init( data, id );
			dialogItem.removeClass('tab-temp-hide-class');
		}
		
	},
	
	// Remove dragged tab from the dialog preview. The next function (
	// onDragSortDrop ) triggers update that makes sure it is all up to date.
	// So even if you decide to drop it where you picked it up, it is put back.
	onSort: function( $item ) {
		
		var itemIsTab = $item.hasClass('tab');
		var itemIsTPanel = $item.hasClass('tabbedpanel');
		
    if (
			itemIsTab ||
			itemIsTPanel ||
			$('#dialog [data-item-id="'+ $item.data('item-id') +'"]').closest('.tab').length > 0
		) {
			
		
			$('body').removeClass('dragging-tab');
			
			var data     = local_storage.get('dialog');
			var id       = $item.data('item-id');
			var itemData = data.items[ 'item-' + id ];
			var parentId = itemData.parentId;
			
			// Move tab to the new tab-container
			var dialog  = $('#dialog');
			var tPanel  = dialog.find('[data-item-id="'+ parentId +'"]');
			var tabShelf = tPanel.find('> .tab-container');
			var mTab    = dialog.find('.tab-container [data-tab-id="'+ id +'"]');
			mTab.appendTo( tabShelf );
			
			// Sort the shelf
			var tabContent = tPanel.find('> .padding-box > .tab');
			tab.containerSort( tabContent, tabShelf );
			
			item.activate( id );
			
			// Build Item Properties panel
			edit_style_panel.build( data.items[ 'item-' + id ].style );
			
			// Update
			tab.onUpdate.init( data, id );
			
		}
		
	},
	
	containerSort: function( tabContent, tabShelf ) {
		tabContent.each(function() {
			var itemId = $(this).data('item-id');
			tabShelf.find('[data-tab-id="'+ itemId +'"]').appendTo( tabShelf );
		});
	},
	
	onUpdate: {
		init: function( data, id ) {
			
			// Start churning if updated item inside a tabbed panel...
			// - Because any nested item can cause parents and the whole hecking family to bloat up
			var currentItem = $('#panel-tree-view-wrap [data-item-id="'+ id +'"]');
			if ( currentItem.closest('.tabbedpanel').length > 0 ) {
				
				// Inception
				// Going through all the nested tabbed panels...
				var allParentTpanels = currentItem.parentsUntil('.dialog').filter('.tabbedpanel');
				allParentTpanels.each(function() {
					
					var dataItem = data.items['item-' + $(this).data('item-id') ];
					var currentItem = $('#dialog [data-item-id="'+ dataItem.id +'"]');
					
					// Inception 2: The Inceptioning
					// - Goes through every child tab checking which one is the biggest.
					var padMinWidth = 0, padMinHeight = 0;
					currentItem.find('> .padding-box > .tab').each(function() {
						// Makes current tab visible so that dimensions return properly.
						// Siblings are also hidden...
						$(this).addClass('tab-temp-class');
						var panelWidth = $(this).innerWidth();
						var panelHeight = $(this).innerHeight();
						$(this).removeClass('tab-temp-class');
						// Collect max dimensions...
						if ( panelWidth > padMinWidth ) padMinWidth = panelWidth;
						if ( panelHeight > padMinHeight ) padMinHeight = panelHeight;
					});
					
					// Sneak in the tab container width if it's bigger than the biggest tab container.
					var tabContainer = currentItem.find('> .tab-container');
					var tabContWidth = tabContainer.width() + (parseInt( tabContainer.css('margin-left'), 10) * 2);
					if ( padMinWidth < tabContWidth ) padMinWidth = tabContWidth;
					
					// Apply width and height to tabbed panel so that everything stays within limits and thinds don't jump around.
					currentItem.find('> .padding-box').css({ minWidth: padMinWidth, minHeight: padMinHeight });
					
				});
			
			}
		
		}
	
	}

};
