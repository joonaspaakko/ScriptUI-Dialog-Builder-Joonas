
item.activate = function( id ) {
	
	droplist.hide();
	
  // Write active item id to local storage
	var data = local_storage.get('dialog');
	data.activeId = id;
  local_storage.set('dialog', data );
  
  // Change the active element in the treeview.
	var treeView = $('#panel-tree-view-wrap');
	treeView.find('.active').removeClass('active');
	treeView.find('[data-item-id="'+ id +'"]').addClass('active');
  
  // Change the active element in the dialog preview
  var dialogPreview =  $('#dialog');
  dialogPreview.find('.active').removeClass('active');
  dialogPreview.find('[data-item-id="'+ id +'"]').addClass('active');
	
	tab.onActivate( id );
	
};
