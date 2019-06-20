
SDB.Listbox = {
  
  init: function() {
    
		var listBoxes = selectAll('.list-box');
		for (var i = 0; i < listBoxes.length; i++) {
			var listBox = listBoxes[i];
      var listItems = selectAll('li', listBox);
      SDB.Listbox.clickEvent( listBox, listItems );
		}
    
  },
  
  clickEvent: function( box, items ) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
      
      var span = select('span', item);
      var itemWrapper = document.createElement('div');
      item.appendChild( itemWrapper );
      itemWrapper.appendChild( span );
      
      itemWrapper.addEventListener("click", function() {
        SDB.Listbox.clickFunc( this );
      });
		}
  },
  
  clickFunc: function( innerWrapper ) {
    SDB.Listbox.classOperation( innerWrapper.parentNode, 'toggle' );
    var box = innerWrapper.closest('.list-box');
    var customEvent = new CustomEvent('onSelect', { detail: {
      element: innerWrapper,
      selection: {
        index: SDB.Listbox.selection.index( box ),
        text: SDB.Listbox.selection.text( box )
      }
    }});
    box.dispatchEvent( customEvent );
  },
  
  toggle: function( box, target ) {
    SDB.Listbox.stringNumberOperation( box, target, 'toggle' );
  },
  
  select: function( box, target ) {
    SDB.Listbox.stringNumberOperation( box, target, 'add' );
  },
  
  deselect: function( box, target ) {
    SDB.Listbox.stringNumberOperation( box, target, 'remove' );
  },
  
  deselectAll: function( box ) {
    var selected = pickAll('.selected', box);
    for ( var item of selected ) {
      SDB.Listbox.classOperation( item, 'remove' );
    }
  },
  
  selection: {
    init: function( box, selectionType) {
      var selected = [];
      var listItems = selectAll('li', box);
      for ( var item of listItems ) {
        if ( item.classList.contains('selected') ) {
          if ( selectionType === 'index' ) {
            var index = listItems.indexOf(item);
            selected.push( index );
          }
          else if ( selectionType === 'text' ) {
            var text = item.childNodes[0].textContent;
            selected.push( text );
          }
        }
      }
      return selected;
    },
    index: function( box ) {
      return SDB.Listbox.selection.init( box, 'index');
    },
    text: function( box ) {
      return SDB.Listbox.selection.init( box, 'text');
    }
  },
  
  add: function( element, text ) {
    
    if ( Array.isArray( text ) ) {
      var addedItems = [];
      for ( var t of text ) {
        var newItem = SDB.Listbox.makeItem( element, t );
        addedItems.push( newItem );
      }
      return addedItems;
    }
    else {
      return SDB.Listbox.makeItem( element, text );
    }
  },
  
  empty: function( element ) {
    if ( element.classList.contains('list-box') ) {
  		pick('ul', element).innerHTML = '';
    }
  },
  
  makeItem: function( element, textString ) {
    var li = document.createElement('li');
    var div = document.createElement('div');
    var span = document.createElement('span');
    span.textContent = textString;
    li.appendChild( div );
    div.appendChild( span );
    pick('ul', element).appendChild( li );
    
    div.addEventListener("click", function() {
      SDB.Listbox.clickFunc( this );
    });
    
    return li;
  },
  
  stringNumberOperation: function( box, target, classMethod ) {
    if ( typeof target == "string" ) {
      for ( var element of selectAll('li', box) ) {
        if ( element.childNodes[0].textContent.includes(target) ) SDB.Listbox.classOperation( element, classMethod );
      }
    }
    else if ( typeof target == "number" ) {
      var element = selectAll('li', box)[target];
      SDB.Listbox.classOperation( element, classMethod );
    }
  },
  
  classOperation: function( box, method ) {
    box.classList[ method ]('selected');
  }
  
};

SDB.Listbox.init();
