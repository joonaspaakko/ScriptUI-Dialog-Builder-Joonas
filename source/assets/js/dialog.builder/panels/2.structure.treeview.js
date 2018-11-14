
function processItemName( text, type ) {
  // debugger;
  var trimmedText = text === undefined ? type : text.trim();
  return (type.toLowerCase() === trimmedText.toLowerCase() ) ? type : '<span class="type">' + type + ':</span> ' + '<span class="txt">' + text + '</span>';
}

// TREEVIEW NEW ITEM ACTIVATE CLICK EVENT
$('#panel-tree-view-wrap').on("click", ".item-text", function() {
  
  var clickedItem = $(this).parent('li');
	var id = clickedItem.data('item-id');
  
  item.activate( id );
	
  // Build Item Properties panel
  var data = local_storage.get('dialog');
  edit_style_panel.build( data.items[ 'item-' + id ].style );

});

// REMOVE ICON CLICK EVENT
$('#tree-view-contents').on("click", ".remove-item", function() {
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
  // distance: 4,
	delay: 100,
  // I didn't do a huge amount of testing, but it seems setting a minus
  // tolerance helped with a problem when using the 'isValidTarget' function.
  tolerance: -3,
  isValidTarget: function ($item, container ) {
    var result = true;
    
    var tp = tabbedPanel.onDragValid( $item, container );
    var tv = treeView.onDragValid( $item, container );
    
    result = tp || tv ? false : true;
    
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
      
      // Make a clone in the place of the original...
      $item.clone().insertAfter( $item ).addClass('dolly')//.addClass('dolly duplicate-parent');
      var dolly = $('#panel-tree-view-wrap .dolly');
      // dolly.find('[data-parent="true"]').addClass('duplicate-parent');
      
      tab.onStartSort( $item );
      
      // DUPLICATE ITEMS
      // DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
      if ( event.altKey ) {
        $('body').addClass('duplicate-item');
      }
      else {
        dolly.addClass('sort-temp-item');
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
  
  $('#panel-tree-view-wrap .sort-temp-item').remove();
  
  var parentId = $item.parent('ul').parent('li').data('item-id'),
  previousItem = $item.prev();
  
  var method   = previousItem.length > 0 ? 'insertAfter' : 'prependTo';
  var targetId = previousItem.length > 0 ? previousItem.data('item-id') : parentId;
  
  $item.attr('item-parent-id', parentId);
  $item.data({ "item-parent-id": parentId });
  
  var type = $item.data('item-type');
  var id   = $item.data('item-id');
  
  item.funnel.sort( id, parentId, type, method, targetId );
  
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
  
  // $item.find('ul').sortable('enable');
  
  var previousItem     = $item.prev(),
      parentUl         = $item.parent('ul'),
      noPrevious       = previousItem.length < 1,
      previousIsParent = previousItem.data('parent'),
      targetElement    = noPrevious ? parentUl : previousItem; // Target previous item. If it doesn't exist, target parent item.
  
  // Dolly becomes a real sheep by way of eliminating the original
  $('#panel-tree-view-wrap .dolly').removeClass('dolly');
  $item.remove();
  
  $('body').removeClass('duplicate-item'); // The function of this class is to change the cursor
  
  var data          = local_storage.get('dialog');
  var draggedItemId = $item.data('item-id');
  // var parentId      = $item.parent('ul').parent('li').data('item-id');
  // var oldActiveId   = data.activeId;
  var treeView      = $('#panel-tree-view-wrap');
  
  var difference = Math.abs( draggedItemId - item.get.id() );
  
  // Dragged item and every child with data-item-id attribute
  $item.find('[data-item-id]').add( $item ).each(function( i ) {
    
    var currentId   = $(this).data('item-id'),
        currentItem = data.items[ 'item-' + currentId ],
        // active      = treeView.find('.active'),
        // isParent    = active.data('parent'),
        parentId    = i === 0 ? container.target.parent('li').data('item-id') : currentItem.parentId + difference;
    
    var params = {
      id: currentId + difference,
      type: currentItem.type,
      parentId: parentId,
      target: i === 0 ? targetElement : treeView.find('[data-item-id="'+ parentId +'"] > ul'),
      event: i === 0 ? 'drag-duplicate' : 'loadFromLocalStorage',
      previousIsParent: previousIsParent,
      sourceId: currentId
    };
    item.funnel.create( params );
    
	});
  
  // Reactivate the ye olde active item
  item.activate( $item.data('item-id') + difference );
  // Build Item Properties panel
  var newItem = data.items[ 'item-' + $item.data('item-id') ];
  edit_style_panel.build( newItem.style );
  
  $('body').removeClass('dragging')
	
};
