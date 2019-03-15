

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
		
		// Shows the green accent color on the tab text...
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
				
				$(this).css({ minWidth: '', minHeight: '' });
				
				// Write back to local storage
				dataTPanel.style.selection = dataTab.id;
				local_storage.set('dialog', data);
			
			});
		}
		
		if ( currentItem.data('item-type') === 'Tab' ) {
			tab.resizeActive( id );
		}
		
	},
	
	resizeActive: function( id ) {
		
		var active = $('#dialog [data-item-id="'+ id +'"]'),
				// parentId = active.data('item-parent-id'),
				vtClass = 'visible-tab';
		
		active.addClass('tab-width-auto');
		var activeW = active.width(),
				activeH = active.height();
		active.removeClass('tab-width-auto');
		
		var maxWidth = 0,
				maxHeight = 0;
		
		active.removeClass( vtClass );
		active.siblings('.tab').each(function() {
			
			$(this).addClass( vtClass + ' tab-width-auto');
			if ( $(this).width()  > maxWidth )  maxWidth = $(this).width();
			if ( $(this).height() > maxHeight ) maxHeight = $(this).height();
			$(this).removeClass( vtClass + ' tab-width-auto');
			
			$(this).css({ minWidth: '', minHeight: '' });
			
		});
		
		if ( maxWidth > activeW ) active.css({ minWidth: maxWidth });
		else { active.css({ minWidth: '' }) }
		
		if ( maxHeight > activeH ) active.css({ minHeight: maxHeight });
		else { active.css({ minHeight: '' }) }
		
		active.addClass( vtClass );
		
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
		
		var removedItem = $('#dialog [data-item-id="'+ id +'"]');
		
		
		// var parent = removedItem.data('item-parent-id')
				
		if ( type === "Tab" ) {
			tabId = id;
			$('#dialog div[data-tab-id="'+ tabId +'"]').remove();
			var dataItem = data.items['item-'+ id ];
			var anotherTab = $('#panel-tree-view-wrap [data-item-id="'+ dataItem.parentId +'"] > ul > li:first');
			tabId = anotherTab.data('item-id');
			var visibleSiblingTab = removedItem.siblings('.visible-tab');
			
			var activeRelativeId =
					removedItem.prev().length > 0 && removedItem.prev().data('item-id') ||
					removedItem.next().length > 0 && removedItem.next().data('item-id') ||
					removedItem.closest('.panel.tab').length > 0 && removedItem.closest('.panel.tab').data('item-id') ||
					false;
			
			removedItem.remove();
			visibleSiblingTab.length > 0 && tab.resizeActive( visibleSiblingTab.data('item-id') );
			if ( visibleSiblingTab.length < 1 && activeRelativeId ) {
				item.activate( activeRelativeId );
			}
		}
		else if ( removedItem.closest('.tab').length > 0 ) {
			removedItem.remove();
		}
		
	},
	
	// Makes sure the previous tabbed panel minimum
	// dimensions don't include the moved item anymore
	onStartSort: function( $item ) {
		
		var itemIsTab = $item.hasClass('tab');
		if ( itemIsTab ) {
			
			$('body').addClass('dragging-tab');
			
			var activeRelativeId =
					$item.prev().length > 0 && $item.prev().data('item-id') ||
					$item.next().length > 0 && $item.next().data('item-id') ||
					$item.closest('.tab').length > 0 && $item.closest('.tab').data('item-id') ||
					false;
			if ( activeRelativeId ) $('#dialog [data-item-id="'+ activeRelativeId +'"]').addClass('dragged-tab-relative');
			
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
			
			// This tries to make sure the previous tabbed panel still has an active tab and js resized
			var draggedRelative = $('#dialog .dragged-tab-relative').removeClass('dragged-tab-relative');
			item.activate( draggedRelative.data('item-id') );
			
			item.activate( id );
			
			// Build Item Properties panel
			edit_style_panel.build( data.items[ 'item-' + id ].style );
			
		}
		
	},
	
	containerSort: function( tabContent, tabShelf ) {
		tabContent.each(function() {
			var itemId = $(this).data('item-id');
			tabShelf.find('[data-tab-id="'+ itemId +'"]').appendTo( tabShelf );
		});
	}

};
