
item.activate = function( id ) {
	
	droplist.hide();
	
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
	
	activeParent( treeView, treeActive );
	lightThePath( treeView, treeActive );
	
};

function activeParent( treeView, treeActive ) {
	
	// Burn it all!!
	treeView.find('.active-parent').removeClass('active-parent');
	var parents = treeActive.parentsUntil('.dialog.tree-root').filter('[data-parent="true"]');
	parents.addClass('active-parent');
		
}

// Just don't jump in the witch's oven...
function lightThePath( treeView, treeActive ) {
	
	// Burn it all!! Okay... Maybe not the best word choice there...
	$('.path-start').removeClass('path-start');
	$('.path-item').removeClass('path-item');
	$('.path-node').removeClass('path-node');
	$('.path-sibling-node').removeClass('path-sibling-node');
	$('.path-sibling-parent').removeClass('path-sibling-parent');
	$('.path-end').removeClass('path-end');
	$('.path-start-last').removeClass('path-start-last');
	
	// PATH START
	var pathEnd = treeView.find('.active-parent').first();
	pathEnd.addClass('path-end');
	
	// PATH END
	var pathStart = treeActive;
	pathStart.addClass('path-start');
	
	if ( pathStart.data('parent') || pathStart.next().length < 1 ) {
		pathStart.addClass('path-start-last');
	}
	
	treeView.find('.active-parent:not(:first)').addClass('path-node').add( pathStart ).each(function() {
		var prevItems = $(this).prevUntil(':first');
		prevItems.each(function() {
			console.log( $(this) );
			if ( $(this).data('parent') ) {
				$(this).addClass('path-sibling-node');
			}
			else {
				$(this).addClass('path-item');
			}
			
		});
		
		// $(this).addClass('path-node');
		// $(this).find('ul').children()..each(function() {
		//
		// 	if ( $(this).data('parent') ) {
		// 		// console.log( $(this).data('parent') );
		// 		$(this).addClass('path-sibling-node');
		// 	}
		// 	else {
		// 		$(this).addClass('path-item');
		// 	}
		// });
		
	});
	
}


//
// function traversePath( treeView, pathStart, pathEnd ) {
//
// 	// pathStart.prevUntil(':first').addClass('path-item');
// 	//
// 	// // console.log( pathStart.next().length );
// 	// if ( pathStart.next().length == 0 ) {
// 	// 	pathStart.addClass('path-start-last');
// 	// }
//
// 	prevUntilParent( pathStart );
// 	function prevUntilParent( item ) {
//
// 		var prev = item.prev();
// 		if ( prev.length > 0 ) {
// 			if ( prev.data('parent') ) {
// 				prev.addClass('path-sibling-parent');
// 			}
// 			else {
// 				prev.addClass('path-item');
// 			}
// 		}
// 		else {
// 			prevUntilParent( item.parent('ul').parent('li') );
// 		}
//
// 	}
//
//
// 	//
// 	// treeView.find('.active-parent:not(:first)').each(function() {
// 	//
// 	// 	$(this).addClass('path-node');
// 	// 	console.log( $(this)[0] );
// 	// 	$(this).find('ul').children().each(function() {
// 	//
// 	// 		if ( $(this).data('parent') ) {
// 	// 			// console.log( $(this).data('parent') );
// 	// 			$(this).addClass('path-sibling-node');
// 	// 		}
// 	// 		else {
// 	// 			$(this).addClass('path-item');
// 	// 		}
// 	// 	});
// 	//
// 	// });
//
// }
