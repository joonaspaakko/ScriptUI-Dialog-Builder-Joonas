
item.activate = function( id, source ) {
	
	// droplist.hide();
	
  // Write active item id to local storage
	var data = local_storage.get('dialog');
	data.activeId = id;
  local_storage.set('dialog', data );
  
  // Change the active element in the treeview.
	var treeView = $('#panel-tree-view-wrap');
	var previouslyActive = treeView.find('.active');
	previouslyActive.removeClass('active');
	var treeActive = treeView.find('[data-item-id="'+ id +'"]');
	treeActive.addClass('active');
  
  // Change the active element in the dialog preview
  var dialogPreview =  $('#dialog');
  dialogPreview.find('.active').removeClass('active');
  dialogPreview.find('[data-item-id="'+ id +'"]').addClass('active');
	
	tab.onActivate( id );
	
	if ( source === 'dialog-preview' ) structurePanelScroll( id, previouslyActive );
	breadCrumbs( treeView, treeActive );
	lightThePath( treeView, treeActive );
	
};

function structurePanelScroll( id, previouslyActive ) {
	
	var treeviewPanel = $('[data-panel="treeview"]');
	var overflowWrap = treeviewPanel.find(".overflow-wrap");
	var newOffsetTop = treeviewPanel.find('[data-item-id="'+ id +'"]').position().top;
	var oldOffsetTop = previouslyActive.position().top;
	var newPosition = newOffsetTop + 9 - (overflowWrap.height() / 2);
	// var oldPosition = overflowWrap.scrollTop();
	
	var speed = Math.abs( newOffsetTop - oldOffsetTop ); // Difference between new position and old position
	speed = speed <= 300 && 300 ||
					speed >= 1000 && 1000 ||
					speed; // Limiter
	
	overflowWrap.animate({
      scrollTop: newPosition
  }, speed);
	
}

function breadCrumbs( treeView, treeActive ) {
	
	// Burn it all!!
	treeView.find('.active-parent').removeClass('active-parent');
	var parents = treeActive.parentsUntil('.dialog.tree-root').filter('[data-parent="true"]');
	parents.addClass('active-parent');
		
}

// Just don't jump in the witch's oven...
function lightThePath( treeView, treeActive ) {
		
	// Burn it all!! Okay... Maybe not the best word choice there...
	$('.path-node').removeClass('path-node');
	$('.path-item').removeClass('path-item');
	$('.path-sibling-node').removeClass('path-sibling-node');
	$('.path-end').removeClass('path-end');
	$('.path-start').removeClass('path-start');
	$('.path-start-last').removeClass('path-start-last');
	$('.path-start-node').removeClass('path-start-node');
	$('.path-parent-ul').removeClass('path-parent-ul');
	
	if ( treeActive.data('item-type') !== "Dialog" && !treeActive.parent().parent().hasClass('tree-root') ) {
		// PATH START
		var pathEnd = treeView.find('.active-parent').first();
		pathEnd.addClass('path-end');
		
		// PATH END
		var pathStart = treeActive;
		
		if ( pathStart.next().length < 1 ) {
			pathStart.addClass('path-start-last');
		}
		else if ( pathStart.data('parent') ) {
			pathStart.addClass('path-start-node');
		}
		else {
			pathStart.addClass('path-start');
		}
		
		treeView.find('.active-parent:not(:first)').addClass('path-node').add( pathStart ).each(function() {
			var prevItems = $(this).prevUntil(':first');
			prevItems.each(function() {
				
				if ( $(this).data('parent') ) {
					$(this).addClass('path-sibling-node');
					$(this).parent('ul').addClass('path-parent-ul');
				}
				else {
					$(this).addClass('path-item');
				}
				
			});
			
		});
	}
	
}
