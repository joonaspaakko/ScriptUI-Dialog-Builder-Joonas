
SDB.Treeview = {
  
  init: function() {
    
		var treeViews = selectAll('.tree-view');
		for ( var i=0; i < treeViews.length; i++ ) {
			var treeview = treeViews[i];
      var treeItems = selectAll('.tree-view-item', treeview);
      for ( var i=0; i < treeItems.length; i++ ) {
        var item = treeItems[i];
        item.setAttribute('data-tree-item-id', i);
        var itemWrap = select(':scope > .item-wrap', item);
        this.attachClick( itemWrap, treeview );
      }
		}
    
  },
  
	add: function( item, textString) {
    
    if ( Array.isArray( textString ) ) {
      SDB.Treeview.addInBulk( item, textString);
    }
    else {
      this.makeItem( item, textString );
      return select(':scope > .padding-box > .tree-view-item:last-child', item);
    }
    
	},
  
  remove: function( item ) {
    if ( item.classList.contains('tree-view-item') ) {
      var parentItem = item.parentNode.parentNode;
      var children = [...parentItem.querySelectorAll(':scope > .padding-box > .tree-view-item')];
      if ( children.length <= 1 ) {
        parentItem.classList.remove('tree-node');
      }
      item.remove();
    }
  },
  
  expand: function( item, levels ) {
    if ( item.classList.contains('tree-view-item') ) {
      SDB.Treeview.classOperation(item, 'add');
      return item;
    }
  },
  
  expanded: function( item ) {
    if ( item.classList.contains('tree-view-item') ) {
      return item.classList.contains('expanded');
    }
  },
  
  expandAll: function( item, remove ) {
    
    var treeNodes = [item];
    treeNodes = treeNodes.concat( pickAll('.tree-view-item.tree-node',item) );
    for ( var treeNode of treeNodes ) {
      SDB.Treeview.classOperation(treeNode, (remove ? 'remove': 'add') );
    }
    return treeNodes;
    
  },
  
  collapse: function( item ) {
    if ( item.classList.contains('tree-view-item') ) {
      this.classOperation(item, 'remove');
      return item;
    }
  },
  
  collapseAll: function( item ) {
    return SDB.Treeview.expandAll( item, 'remove' );
  },
  
  text: function( item ) {
    if ( item.classList.contains('tree-view-item') ) {
      return select(':scope > .item-wrap .text-container', item).textContent;
    }
  },
  
	empty: function( item ) {
    var isNode = item.classList.contains('tree-node');
    if ( item.classList.contains('tree-view') || isNode ) {
  		pick(':scope > .padding-box', item).innerHTML = '';
      if ( isNode ) {
        item.classList.remove('tree-node');
      }
    }
	},
  
  addInBulk: function( item, textString) {
    var node;
    for ( var i=0; i < textString.length; i++ ) {
      var itemText = textString[i];
      if ( i === 0 )
        node = SDB.Treeview.add( item, itemText );
      else
        SDB.Treeview.add( node, itemText );
    }
  },
  
  makeItem: function(item, textString) {
    // Item wrapper
		var itemWrapper = document.createElement('div');
    itemWrapper.classList.add('tree-view-item');
    var treeview = item.closest('.tree-view');
    var allItems = pickAll('.tree-view-item', treeview);
    if ( allItems.length > 0 ) {
      var ids = []
      for ( var i=0; i < allItems.length; i++ ) {
        var cE = allItems[i];
        var cID = cE.getAttribute('data-tree-item-id');
        ids.push( parseInt( cID, 10) );
      }
      var largestID = Math.max( ...ids );
    }
    else {
      var largestID = -1;
    }
    var currentID = largestID + 1;
    // Text wrapper
    var treeItemWrap = document.createElement('div');
    treeItemWrap.classList.add('item-wrap');
    // Arrow wrapper
    var arrowWrapper = document.createElement('span');
    arrowWrapper.classList.add('tree-view-arrow');
    // Arrow
    var arrowString = '<svg class="fa-chevron-right" enable-background="new 0 0 265 436.7" viewBox="0 0 265 436.7" xmlns="http://www.w3.org/2000/svg"><path d="m258 235.3-194.4 194.4c-9.4 9.4-24.6 9.4-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.5 0-33.9l154-154.7-154-154.8c-9.3-9.4-9.3-24.5 0-33.9l22.7-22.7c9.4-9.4 24.6-9.4 33.9 0l194.4 194.4c9.4 9.3 9.4 24.5 0 33.9z" fill="#dadada"/></svg>';
    arrowWrapper.innerHTML = arrowString;
    // Text container
    var textCont = document.createElement('span');
    textCont.classList.add('text-container');
    textCont.textContent = textString;
    // Padding box
    var paddingBox = document.createElement('div');
    paddingBox.classList.add('padding-box');
    
    treeItemWrap.appendChild( arrowWrapper );
    treeItemWrap.appendChild( textCont );
    itemWrapper.appendChild( treeItemWrap );
    itemWrapper.appendChild( paddingBox );
    
		pick(':scope > .padding-box', item).appendChild( itemWrapper );
    
    itemWrapper.setAttribute('data-item-type', 'treeitem');
    itemWrapper.setAttribute('data-tree-item-id', currentID);
    itemWrapper.setAttribute('data-item-name', 'tree-item-' + currentID);
    var parent = treeItemWrap.parentNode.parentNode.parentNode;
    itemWrapper.setAttribute('data-item-parent-id', parent.getAttribute('data-tree-item-id') || parent.getAttribute('data-item-id') );
    
    this.initParentMode( item );
    this.attachClick( treeItemWrap, treeview );
  },
  
  // .item-wrap
  attachClick: function( itemWrap, treeview ) {
    
    var treeview = itemWrap.closest('.tree-view');
    itemWrap.addEventListener("click", function() {

      var treeItem = this.parentNode;
      SDB.Treeview.classOperation( treeItem, 'toggle' );
      var details = {
        element: treeItem,
        index: pickAll('.tree-view-item', treeview).indexOf(treeItem),
        id: parseInt( treeItem.getAttribute('data-tree-item-id'), 10),
        text: select('.text-container', itemWrap).textContent
      };
      var isParent = treeItem.classList.contains('tree-node');
      details.isParent = isParent;
      details.expanded = treeItem.classList.contains('expanded');
      var customEvent = new CustomEvent('onClick', { detail: details });
      treeview.dispatchEvent( customEvent );

    });
    
  },
  
  classOperation: function( item, method ) {
    item.classList[ method ]('expanded');
  },
  
  initParentMode: function( item ) {
    var parentIsTreeITem = item.classList.contains('tree-view-item');
    if ( parentIsTreeITem ) {
      item.classList.add('tree-node');
    }
  }
  
};

SDB.Treeview.init();
