SDB.Tabbedpanel = {
  
  init: function() {
    var tabs = selectAll('[data-item-type="tabbedpanel"] > .tab-container > div');
    for ( var tab of tabs ) {
      SDB.Tabbedpanel.clickEvent( tab );
    }
  },
  
  clickEvent: function( tab ) {
    tab.addEventListener("click", function() {
      var tPanel = this.parentNode.parentNode;
      var tabID = this.getAttribute('data-tab-id');
      SDB.Tabbedpanel.select.id( tPanel, tabID );
      
      var customEvent = new CustomEvent('onSelect', { detail: {
        selected: {
          index: [...tab.parentNode.children].indexOf( tab ),
          text: tab.textContent,
          id: parseInt( tabID, 10)
        }
      }});
      tPanel.dispatchEvent( customEvent );
    });
  },
  
  matchHeight: function( targetContainer ) {

    var siblingContainers = [];
    for ( var child of targetContainer.parentNode.children ) {
      if ( child.tagName == 'DIV' ) {
        if ( child.classList.contains('visible-tab') ) {
          child.classList.remove('visible-tab');
        }
        if ( child != targetContainer ) {
          siblingContainers.push( child );
        }
      }
    }
    var targetContHeight = targetContainer.offsetHeight;
    targetContainer.classList.remove('visible-tab');
    
    var maxHeight = 0;
    for ( var cont of siblingContainers ) {
      cont.classList.add('visible-tab', 'tab-width-auto');
      var contHeight = cont.offsetHeight;
      if ( contHeight > maxHeight ) maxHeight = contHeight;
      cont.classList.remove('visible-tab', 'tab-width-auto');
    }
    
    if ( maxHeight > targetContHeight ) {
      targetContainer.style.minHeight = maxHeight + 'px';
    }
    
    targetContainer.classList.add('visible-tab');
    
  },
  
  select: {
    init: function( tPanel, target, type ) {
      
      var tab, tabID;
      if ( type === 'index' ) {
        var tabs = tPanel.children[0].querySelectorAll('div');
        for ( var t=0; t < tabs.length; t++ ) {
          var tb = tabs[t];
          var index = [...tabs].indexOf(tb);
          if ( index == target ) {
            tab = tb;
          }
        }
        tabID = tab.getAttribute('data-tab-id');
      }
      else if ( type === 'id' ) {
        tab = pick('[data-tab-id="'+ target +'"]');
        tabID = target;
      }
      
      var paddingBox = tPanel.children[1];
      var targetContainer = pick('[data-item-id="'+ tabID +'"]', paddingBox);
      
      // Mark visible tab
      tab.parentNode.querySelector('.visible').classList.remove('visible');
      tab.classList.add('visible');
      // Mark visible tab container
      targetContainer.classList.add('visible-tab');
      
      SDB.Tabbedpanel.matchHeight( targetContainer );
      
    },
    index: function ( tPanel, index ) {
      SDB.Tabbedpanel.select.init( tPanel, index, 'index' );
    },
    id: function( tPanel, id ) {
      SDB.Tabbedpanel.select.init( tPanel, id, 'id' );
    }
    
  }
  
};

SDB.Tabbedpanel.init();
