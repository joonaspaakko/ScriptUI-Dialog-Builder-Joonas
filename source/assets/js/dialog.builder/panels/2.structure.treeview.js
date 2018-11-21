
function processItemName( text, type ) {
  // debugger;
  var trimmedText = text === undefined ? type : text.trim();
  return (type.toLowerCase() === trimmedText.toLowerCase() ) ? type : '<span class="type">' + type + ':</span> ' + '<span class="txt">' + text + '</span>';
}

var treeElem = $('#panel-tree-view-wrap');

var dialog = $('#dialog');
// So you can easily show parent items on hover without having to activate it
$('#panel-tree-view-wrap').on("mouseenter mouseleave", ".item-text", function( e ) {
  
  var parent = $(this).parent('li'),
      id     = parent.data('item-id'),
      ghost  = dialog.find('[data-item-id="'+ id +'"]');
  
  if ( parent.data('item-type') === 'Tab') {
    ghost = dialog.find('[data-tab-id="'+ id +'"]');
  }
  
  if ( e.type === "mouseenter" ) {
  	ghost.addClass('ghosting');
  }
  else {
    ghost.removeClass('ghosting');
  }
  
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
    	
      // Tabs already get activated on drag, so I figured I should do the same for all items...
			item.activate( $item.data('item-id') );
      
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
  
  var previousItem     = $item.prev(),
      parentUl         = $item.parent('ul'),
      noPrevious       = previousItem.length < 1,
      previousIsParent = previousItem.data('parent'),
      targetElement    = noPrevious ? parentUl : previousItem; // Target previous item. If it doesn't exist, target parent item.
  
  // Dolly becomes a real sheep by way of eliminating the original
  $('#panel-tree-view-wrap .dolly').removeClass('dolly');
  $item.remove();
  
  $('body').removeClass('duplicate-item'); // The function of this class is to change the cursor
  
  
  var data     = local_storage.get('dialog'),
      treeView = $('#panel-tree-view-wrap'),
      difference = Math.abs( $item.data('item-id') - item.get.id() ),
      dupRootId;
  
  // Dragged item and every child with data-item-id attribute
  $item.find('[data-item-id]').add( $item ).each(function( i ) {
    
    var sourceId    = $(this).data('item-id'),
        currentItem = data.items[ 'item-' + sourceId ],
        parentId    = i === 0 ? container.target.parent('li').data('item-id') : currentItem.parentId + difference;
    
    var params = {
      id: item.get.id(),
      type: currentItem.type,
      parentId: parentId,
      target: i === 0 ? targetElement : treeView.find('[data-item-id="'+ parentId +'"] > ul'),
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
  var newItem = data.items[ 'item-' + dupRootId ];
  edit_style_panel.build( newItem.style );
  
  $('body').removeClass('dragging');
	
};
