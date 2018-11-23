
// CORE
// ****
// @codekit-prepend "dialog.builder/item.factory/items.js";
// @codekit-prepend "dialog.builder/item.factory/_funnel.js";
// @codekit-prepend "dialog.builder/item.factory/create.js";
// @codekit-prepend "dialog.builder/item.factory/activate.js";
// @codekit-prepend "dialog.builder/item.factory/remove.js";
// @codekit-prepend "dialog.builder/item.factory/sort.js";
// @codekit-prepend "dialog.builder/item.factory/update/update.js";


// ITEMS THAT NEED SOME EXTRA ATTENTION
// ************************************
// @codekit-prepend "dialog.builder/item.factory/special.items/tabbed.panel.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tab.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.item.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/list.box.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/drop.list.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/radiocheck.js";

// PANELS
// ******
// @codekit-prepend "dialog.builder/panels/1.add.items.js";
// @codekit-append "dialog.builder/panels/2.structure.treeview.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/build.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/events.js";
// @codekit-append "dialog.builder/panels/4.dialog.preview.js";

// MISCELLANEOUS
// *************
// @codekit-prepend "dialog.builder/modules/local.storage.js";
// @codekit-prepend "dialog.builder/modules/loading.screen.js";
// @codekit-prepend "dialog.builder/modules/number.input.js";
// @codekit-prepend "dialog.builder/modules/modal.window.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export.js";
// @codekit-prepend "dialog.builder/modules/toolbar/import.js";
// @codekit-prepend "dialog.builder/modules/toolbar/reset.js";
// @codekit-prepend "dialog.builder/modules/toolbar/sample.dialog.js";
// @codekit-prepend "dialog.builder/modules/custom.cursor.js";
// @codekit-prepend "dialog.builder/modules/toggle.active.visibility.js";
// @codekit-prepend "dialog.builder/modules/notifications.js";
// @codekit-prepend "dialog.builder/modules/legend.js";
// @codekit-prepend "dialog.builder/modules/panels.collapse.js";

var data = local_storage.get('dialog');

// START FROM NOTHING...
if ( data === null ) {
  
  var params = {
    id: 0,
    type: 'Dialog',
    parentId: false,
    target: $('#panel-tree-view-wrap .contents'),
    event: 'load'
  };
  item.funnel.create( params );
  
}
// REBUILD FROM EXISTING LOCAL STORAGE DATA...
else {
  
  // Don't mind me adding a little duct tape...
  // Saw this weird error where I came back to a built dialog after
  // a day and somehow the last id was missing in the order array.
  // That id was the active id and it was also in the list of items,
  // so hopefully this puts it back without creating more issues...
  if ( $.inArray( data.activeId, data.order ) < 0 ) {
    data.order.push( data.activeId );
  }
	
  var oldActiveId = data.activeId;
  
	$.each( data.order, function( i, currentId ) {
    
		var currentItem = data.items[ 'item-' + currentId ];
    var treeView = $('#panel-tree-view-wrap');
    var params = {
      id: currentId,
      type: currentItem.type,
      parentId: currentItem.parentId,
      target: currentId === 0 ? treeView.find('.contents') : treeView.find('[data-item-id="'+ currentItem.parentId +'"] > ul'),
      event: 'loadFromLocalStorage'
    };
    item.funnel.create( params );
    
	});
  
	// Update preferred size now that all items/elements are created
	$.each( data.order, function( i, currentId ) {
		var currentItem = data.items[ 'item-' + currentId ];
    if ( currentItem.style.preferredSize !== undefined ) {
      item.activate( currentId );
      item.update.style.dialogPreview( 'preferredSize', data, data.items['item-'+currentId] );
    }
	});
	
  // Reactivate the ye olde active item
  item.activate( oldActiveId );
  // Build Item Properties panel
  var oldItem = data.items[ 'item-' + oldActiveId ];
  edit_style_panel.build( oldItem.style );
	

}
