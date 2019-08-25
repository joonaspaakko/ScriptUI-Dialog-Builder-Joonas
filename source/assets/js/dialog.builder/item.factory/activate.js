
item.activate = function( id ) {
	
	// droplist.hide();
	
  // Write active item id to local storage
	var data = local_storage.get('dialog');
	data.activeId = id;
  local_storage.set('dialog', data );
  
  // Change the active element in the treeview.
	var treeView = $('#panel-tree-view-wrap');
	treeView.find('.active').removeClass('active');
	var treeActive = treeView.find('[data-item-id="'+ id +'"]');
	treeActive.addClass('active');
  
  // Change the active element in the dialog preview
  var dialogPreview =  $('#dialog');
  dialogPreview.find('.active').removeClass('active');
  dialogPreview.find('[data-item-id="'+ id +'"]').addClass('active');
	
	tab.onActivate( id );
	
	breadCrumbs( treeView, treeActive );
	lightThePath( treeView, treeActive );
	
};

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
