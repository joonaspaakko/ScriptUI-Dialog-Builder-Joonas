

var tab = {
	
	preCreate: function( params ) {
		
		// Tab of a vertical tabbed panel...
		if ( params.type === 'Tab' && $('[data-panel="treeview"] [data-item-id="'+ params.parentId +'"]').data('item-type') === 'VerticalTabbedPanel' ) {
			
			var style = item.list[ 'tab' ](false).defaultStyle;
			style.alignChildren = ['fill', 'top'];
			params.defaultStyle = style;
			
		}
		
		return params;
		
	},
	
	onCreate: function( params  ) {
		var isTab = params.type === 'Tab';
		if ( isTab ) {
			
			var parentPanel  = $('#dialog [data-item-id="'+ params.parentId +'"]');
			var parentType = parentPanel.data('item-type');
			
			// TABBED PANEL
			if ( parentType === 'TabbedPanel' ) {
				
				var tabCont = parentPanel.find('> .tab-container');
				$(
					'<div class="tab" data-tab-id="'+ params.id +'" contenteditable>' +
						params.style.text +
					'</div>'
				).appendTo( tabCont );
				
				tab.containerSort( parentPanel.find('> .padding-box > .tab'), tabCont );
				
			}
			// VERTICAL TABBED PANEL
			else {
				
				var vtabCont = parentPanel.find('> .tab-container > .inner-wrap > ul');
				$(
					'<li class="tab" data-tab-id="'+ params.id +'">' +
						'<span contenteditable>'+ params.style.text +'</span>' +
					'</li>'
				).appendTo( vtabCont );
				
				tab.containerSort( parentPanel.find('> .padding-box > .tab'), vtabCont );
			}
			
			item.activate( params.id, 'dialog-preview' );
			
			// Build Item Properties panel
			var data  = local_storage.get('dialog');
		  edit_style_panel.build( data.items[ 'item-' + params.id ].style );
			
		}
	},
	
	// Prevents dragging items to specific containers...
	// True = Prevent dropping
	onDragValid: function( $item, container ) {
		
		var contItem = container.target.parent('li');
		
		// ITEMS
		var itemIsTab      = $item.hasClass('tab');
		// TARGETS
		var targetIsTPanel = contItem.hasClass('tabbedpanel');
		var targetIsVTPanel = contItem.hasClass('verticaltabbedpanel');
		
		// True = Prevent dropping
		// DRAGGING: tab  + Target container != TPanel or VTPanel = NO DROPSIES
		// DRAGGING: !tab + Target container == TPanel or VTPanel = NO DROPSIES
		var result =
				itemIsTab && (!targetIsTPanel && !targetIsVTPanel) ||
			 !itemIsTab && ( targetIsTPanel ||  targetIsVTPanel);
		return result;
		
	},
	
	// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels.
	onClick: function( clickedItem, active ) {
		
		var activeType = active.data('item-type');
		
		// ITEMS
		var itemIsTab = clickedItem.hasClass('tab');
		// var itemIsTPanel = clickedItem.hasClass('tabbedpanel');
		// var itemIsVTPanel = clickedItem.hasClass('verticaltabbedpanel');
		
		// TARGETS
		var targetIsTPanel  = activeType === "TabbedPanel";
		var targetIsVTPanel = activeType === "VerticalTabbedPanel";
		
		// FALSE = Item is created...
		// TRUE = warning flash...
		var result =
			 itemIsTab && (!targetIsTPanel && !targetIsVTPanel)  ||
			!itemIsTab && ( targetIsTPanel ||  targetIsVTPanel);
			
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
		
	},
	
	onActivate: function( id ) {
		
		var currentItem = $('#panel-tree-view-wrap [data-item-id="'+ id +'"]');
		
		// Shows the green accent color on the tab text...
		var currentTab = $('#dialog .tab-container [data-tab-id="'+ id +'"]');
		$('#dialog .currently-active-tab').removeClass('currently-active-tab');
		currentTab.addClass('currently-active-tab');
		
		if ( currentItem.closest('.tabbedpanel').length > 0 || currentItem.closest('.verticaltabbedpanel').length > 0 ) {
			var data          = local_storage.get('dialog');
			var allParentTabs = currentItem.parentsUntil('.dialog').filter('.tab');
			
			allParentTabs.add( currentItem.data('item-type') === 'Tab' && currentItem ).each(function() {
			
				var dataTab    = data.items['item-' + $(this).data('item-id') ];
				var dataTPanel = data.items['item-'+ $(this).data('item-parent-id') ];
				
				tab.show( dataTab, dataTPanel );
				
				$(this).css({ minWidth: '', minHeight: '' });
				tab.resizeActive( dataTab.id );
				
				// Write back to local storage
				dataTPanel.style.selection = dataTab.id;
				local_storage.set('dialog', data);
			
			});
		}
		
	},
	
	resizeActive: function( id ) {
		
		var active = $('#dialog [data-item-id="'+ id +'"]'),
				// parentId = active.data('item-parent-id'),
				vtClass = 'visible-tab';
		
		active.addClass('tab-width-auto');
		var activePB = active.find('> .padding-box');
		var activeW = activePB.innerWidth(),
				activeH = activePB.innerHeight();
		active.removeClass('tab-width-auto');
		
		var maxWidth = 0,
				maxHeight = 0;
		
		active.removeClass( vtClass );
		active.siblings('.tab').each(function() {
			
			$(this).addClass( vtClass + ' tab-width-auto');
			var tabPB = $(this).find('> .padding-box');
			var tabWidth = tabPB.innerWidth();
			var tabHeight = tabPB.innerHeight();
			if ( tabWidth  > maxWidth )  maxWidth = tabWidth;
			if ( tabHeight > maxHeight ) maxHeight = tabHeight;
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
			$('#dialog [data-tab-id="'+ tabId +'"]').remove();
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
		var itemIsVTPanel = $item.hasClass('verticaltabbedpanel');
		
    if (
			itemIsTab ||
			itemIsTPanel ||
			itemIsVTPanel ||
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
			var parentData = data.items[ 'item-' + parentId ];
			var parentType = parentData.type;
			var parentIsVertical = parentType === 'VerticalTabbedPanel';
			
			var tabShelf, mTab;
			if ( parentIsVertical ) {
				tabShelf = tPanel.find('> .tab-container > .inner-wrap > ul');
				mTab     = dialog.find('.tab-container [data-tab-id="'+ id +'"]').parent('li');
			}
			else {
				tabShelf = tPanel.find('> .tab-container');
				mTab     = dialog.find('.tab-container [data-tab-id="'+ id +'"]');
			}
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
	},
	
	onHideToggle: function( isHidden, hiddenClass, itemData ) {
		$('#dialog [data-tab-id="'+ itemData.id +'"]')[ !isHidden ? 'addClass' : 'removeClass' ]( hiddenClass );
	}
};
