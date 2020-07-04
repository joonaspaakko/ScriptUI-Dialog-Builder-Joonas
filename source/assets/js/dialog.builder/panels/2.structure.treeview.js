
var treeElem = $('#panel-tree-view-wrap');

var dialog = $('#dialog');
// So you can easily show parent items on hover without having to activate it
$('#panel-tree-view-wrap').on("mouseenter mouseleave", ".item-text", function( e ) {
  
  var parent = $(this).parent('li'),
      id     = parent.data('item-id'),
      ghost  = dialog.find('[data-item-id="'+ id +'"]');
  
  if ( parent.data('item-type') === 'Tab') {
    ghost = dialog.find('[data-tab-id="'+ id +'"]');
    // If parent is VerticalTabbedPanel
    var grampa = parent.parent('ul').parent('li');
    if ( grampa.data('item-type') === 'VerticalTabbedPanel' ) {
      ghost = ghost.add( dialog.find('[data-item-id="'+ id +'"]') );
    }
  }
  
  if ( e.type === "mouseenter" ) {
  	ghost.addClass('ghosting');
  }
  else {
    ghost.removeClass('ghosting');
  }
  
});

// TREEVIEW PARENT COLLAPSE
treeElem.on("dblclick", 'li[data-parent="true"] > .item-text, li[data-parent="true"] > .collapsed-icon', function() {
  
  var treeItem = $(this).parent('li');
  var isCollapsed = treeItem.hasClass('collapsed');
  
  var id = treeItem.data('item-id');
	var data = local_storage.get('dialog');
  var dataItem = data.items[ 'item-' + id ];
  
  var toggle = !isCollapsed ? 'add' : 'remove';
  treeItem[ toggle+'Class' ]('collapsed');
  
  if ( !isCollapsed ) {
    dataItem.collapsed = true;
    $('<img class="collapsed-icon" src="assets/images/parent-collapsed.svg">').appendTo( treeItem );
  }
  else {
    treeItem.find('> .collapsed-icon').remove();
    if ( dataItem.collapsed != undefined ) delete dataItem.collapsed;
  }
  
  local_storage.set('dialog', data );
  
  $("#dialog-section").backstretch("resize");
  
});

// TREEVIEW NEW ITEM ACTIVATE CLICK EVENT
treeElem.on("click", ".item-text", function() {
  
  var clickedItem = $(this).parent('li');
	var id = clickedItem.data('item-id');
  
  item.activate( id );
	
  // Build Item Properties panel
  var data = local_storage.get('dialog');
  edit_style_panel.build( data.items[ 'item-' + id ].style );

});

// REMOVE ICON CLICK EVENT
treeElem.on("click", ".remove-item", function() {
  var id = $(this).parent('li').data('item-id');
  if ( id === 0 ) {
    resetDialog(); // If the item is dialog, show a warning first.
  }
  else {
    item.funnel.remove( id );
  }
});

var treeRootUl = $('#panel-tree-view-wrap .tree-root > ul');
var treeDialog = $('#panel-tree-view-wrap .tree-dialog');

// TREEVIEW DRAG EVENT
treeRootUl.sortable({
  group: 'dialog-items',
	// exclude: ".disabled",
	vertical: true,
  distance: 4,
	delay: 100,
  // I didn't do a huge amount of testing, but it seems setting a minus
  // tolerance helped with a problem when using the 'isValidTarget' function.
  // - Vague description: Somehow when isValidTarget
  // function was utilized to prevent dragging tabs where they don't
  // belong, just sorting withing a tabbed panel make the placeholder
  // line jump up and down in a way that din't make any sense...
  tolerance: -3,
  isValidTarget: function ($item, container ) {
    var result = true;
    var tb  = tab.onDragValid( $item, container );
    var tv  = treeView.onDragValid( $item, container );
    
    if ( tb || tv ) {
      result = false;
    }
    
    // Prevents dropping inside a collapsed parent
    if ( container.el.parent('li').hasClass('collapsed') ) {
      result = false;
    }
    
    // TRUE = Droppable
    // FALSE = No dropsies
    return result;
  },
  onDragStart: function ($item, container, _super, event) {
    
    // Gives the container a static width to prevent size from changing as
    // soon as you remove something by dragging. This width is removed onDrop.
    treeDialog.width( treeDialog.width() );
    
    // DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
    if ( $item.find('.item-text').length > 0 ) {
      
      // For most items nothing needs to be done
      // onDragStart, except when you're duplicating items
      
      tab.onStartSort( $item );
      
      // DUPLICATE ITEMS
      // DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
      if ( event.altKey ) {
        // Make a clone in the place of the original...
        $item.clone().insertAfter( $item ).addClass('dolly');
        $('body').addClass('duplicate-item'); // The function of this class is to change the cursor
      }
      
    }
    // MAKE NEW ITEM
    // DRAGGING FROM THE ADD PANEL TO THE TREE VIEW PANEL
    else if( !container.options.drop ) {
			$item.clone(true).insertAfter($item);
    }
    
    _super($item, container);
    
  },
  onDrop: function( $item, container, _super ) {
    
    // The width is made static onDragStart making things
    // less jumpy. This normalizes the container width.
    treeDialog.width( 'auto' );
    
    var addItemsPanel = container.target.closest('#panel-new-item-wrap').length > 0;
		
    if ( addItemsPanel ) {
      $item.remove();
    }
    else {
      
      var sortingTreeView = $item.find('.item-text').length > 0;
      var itemDuplicateStarted = $('body').hasClass('duplicate-item');
      
      // REGULAR SORT
      // DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
      if ( sortingTreeView && !itemDuplicateStarted ) {
        item.drag.sort( $item );
      }
      // DUPLICATE ITEMS
      // DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
      else if ( sortingTreeView && itemDuplicateStarted ) {
        item.drag.duplicate( $item, container );
      }
      // MAKE NEW ITEM
      // DRAGGING FROM THE ADD PANEL TO THE TREE VIEW PANEL
      else {
        item.drag.make( $item );
      }
      
    }
    
    _super($item, container);
      
  }
  
});

// ADD ITEMS BY DRAGGING THEM INTO THE TREE VIEW
// The events are handled in the function above
$('#panel-new-item-wrap ul').sortable({
  drop: false,
  group: 'dialog-items'
});


item.drag = {};

// *********************************
// DRAG - SORT ITEM(S) (onDrop)
// *********************************
item.drag.sort = function( $item ) {
  
  // $('#panel-tree-view-wrap .sort-temp-item').remove();
  
  var parentId = $item.parent('ul').parent('li').data('item-id'),
  previousItem = $item.prev();
  
  var method   = previousItem.length > 0 ? 'insertAfter' : 'prependTo';
  var targetId = previousItem.length > 0 ? previousItem.data('item-id') : parentId;
  
  $item.attr('item-parent-id', parentId);
  $item.data({ "item-parent-id": parentId });
  
  var type = $item.data('item-type');
  var id   = $item.data('item-id');
  
  item.funnel.sort( id, parentId, type, method, targetId );
  item.activate( id );
  // Build Item Properties panel
  var data = local_storage.get('dialog');
  
  item.update.style.treeViewAll( data );
  edit_style_panel.build( data.items[ 'item-' + id ].style );
  
  tab.onSort( $item );
  treeViewItem.onSort( $item, type, id );
  
};


// *********************************
// DRAG - MAKE NEW ITEM (onDrop)
// *********************************
item.drag.make = function( $item ) {
  
  var previousItem     = $item.prev(),
      parentUl         = $item.parent('ul'),
      noPrevious       = previousItem.length < 1,
      previousIsParent = previousItem.data('parent'),
      targetElement    = noPrevious ? parentUl : previousItem; // Traget previous item. If it doesn't exist, target parent item.
  
  var params = {
    id: item.get.id(), // Picked up in the function onDragStart.
    type: $item.data('item-type'),
    parentId: noPrevious ? parentUl.parent('li').data('item-id') : previousItem.data('item-parent-id'), // Fetch parent id from the previous item. If it doesn't exist, fetch id from the parent item.
    target: targetElement,
    previousIsParent: previousIsParent,
    event: 'drag'
  };
  
  $item.remove(); // Item is the dragged li from the "Add Items" panel
  item.funnel.create( params ); // A dialog item is created in its place
  
};


// **************************************
// DRAG - DUPLICATE ITEM(S) (onDrop)
// **************************************
item.drag.duplicate = function( $item, container ) {
  
  var previousItem     = $item.prev(),
      parentUl         = $item.parent('ul'),
      noPrevious       = previousItem.length < 1,
      previousIsParent = previousItem.data('parent'),
      targetElement    = noPrevious ? parentUl : previousItem; // Target previous item. If it doesn't exist, target parent item.
  
  $('body').removeClass('duplicate-item'); // The function of this class is to change the cursor
  
  // Dolly becomes a real sheep by way of eliminating the original
  // The cloned elements are actually just thrown away and then re-created
  // from scratch. I did it this way because there's basically 3 places
  // where the items exist at all times; Treeview, Dialog Preview and Local
  // storage. Since I have a system in place for creating items that handles
  // creating the item in all of these 3 places in one swing, then why not...
  $('#panel-tree-view-wrap .dolly').removeClass('dolly');
  $item.remove();
  
  var data     = local_storage.get('dialog'),
      treeView = $('#panel-tree-view-wrap'),
      dupRootId;
  
  // Filled inside the each function below.
  var parentMap = {};
  
  // Dragged item and every child with data-item-id attribute
  $item.find('[data-item-id]').add( $item ).each(function( i ) {
    
    var sourceId    = $(this).data('item-id'),
        sourceItemData = data.items[ 'item-' + sourceId ],
        newId = item.get.id(),
        newParentId = i === 0 ? container.target.parent('li').data('item-id') : parentMap[ 'parent-' + sourceItemData.parentId ];
    
    // Maps old parent id with the new parent id so that
    // following items can then check what they new parent id is
    if ( $(this).data('parent') ) {
      parentMap[ 'parent-' + sourceId ] = newId;
    }
    
    var params = {
      id: newId,
      type: sourceItemData.type,
      parentId: newParentId,
      target: i === 0 ? targetElement : treeView.find('[data-item-id="'+ newParentId +'"] > ul'),
      event: i === 0 ? 'drag-duplicate' : 'loadFromLocalStorage',
      previousIsParent: previousIsParent,
      sourceId: sourceId // This is pushed forward to "item.create.localStorage" function, which handles copying the item specific style to this one...
    };
    if ( i === 0 ) dupRootId = params.id;
    item.funnel.create( params );
    
	});
  
  // Reactivate the ye olde active item
  item.activate( dupRootId );
  
  // Build Item Properties panel
  data = local_storage.get('dialog');
  
  item.update.style.treeViewAll( data );
  var newItem = data.items[ 'item-' + dupRootId ];
  edit_style_panel.build( newItem.style );
  
  
  $('body').removeClass('dragging');
	
};
