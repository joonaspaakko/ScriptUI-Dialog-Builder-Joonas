
function selectAll(selector, context) {
  if ( typeof context === "string" ) {
    context = document.querySelector( context );
    if ( context === null  ) console.log('%cMake sure the %cPARENT %cselector is correct!: %c' + selector, 'font-weight: bold;', 'color: red;', 'font-weight: bold;', 'color: red;');
  }
  var element = (context || document).querySelectorAll(selector);
  if ( element === null  ) console.log('%cMake sure the %cCHILD %cselector is correct!: %c' + selector, 'font-weight: bold;', 'color: red;', 'font-weight: bold;', 'color: red;');
  return [...element];
}
function select(selector, context) {
  if ( typeof context === "string" ) {
    context = document.querySelector( context );
    if ( context === null  ) console.log('%cMake sure the %cPARENT %cselector is correct!: %c' + selector, 'font-weight: bold;', 'color: red;', 'font-weight: bold;', 'color: red;');
  }
  var element = (context || document).querySelector(selector);
  if ( element === null  ) console.log('%cMake sure the %cCHILD %cselector is correct!: %c' + selector, 'font-weight: bold;', 'color: red;', 'font-weight: bold;', 'color: red;');
  return element;
}
function elementAll(selector, context) {
  return selectAll( selector, context );
}
function element(selector, context) {
  return select( selector, context );
}
function pickAll(selector, context) {
  return selectAll( selector, context );
}
function pick(selector, context) {
  return select( selector, context );
}

var SDB = {
  
  init: function() {
    var editTexts = pickAll('[data-item-type="edittext"]');
    for ( var i=0; i < editTexts.length; i++ ) {
      var editText = editTexts[i];
      pick('.edit-text-inner-wrap', editText).addEventListener("click", function() {
        pick('.text-container', this).focus();
      });
    }
  },
  
  elementGetter: function( child, parent, childType, all ) {
    var parentSelector = '';
    if ( parent ) {
      var type = '';
      if ( typeof parent == "string" ) type = 'name';
      if ( typeof parent == "number" ) type = 'id';
      parentSelector = '[data-item-'+ type +'="'+ parent +'"] > .padding-box > ';
    }
    if ( all ) {
      return selectAll( parentSelector + '[data-item-'+ childType +'="'+ child +'"]');
    }
    else {
      return select( parentSelector + '[data-item-'+ childType +'="'+ child +'"]');
    }
  },
  
  id: function( childId, parentIDorName) {
    return SDB.elementGetter( childId, parentIDorName, 'id' );
  },
  
  name: function( childName, parentIDorName) {
    return SDB.elementGetter( childName, parentIDorName, 'name' );
  },
  
  typeAll: function( childType, parentIDorName ) {
    return SDB.elementGetter( childType, parentIDorName, 'type', 'all' );
  },
  
  disabled: function( element ) {
    return element.classList.contains('disable-item');
  },
  
  disable: {
    init: function( element ) {
      element.classList.add('disable-item');

      var type = element.getAttribute('data-item-type');
      if ( type === 'edittext' ) {
        select('[contenteditable]', element).setAttribute('contenteditable', false);
      }
    },
      
    element: function( element ) {
      if ( Array.isArray( element ) ) {
        for ( var item of element ) {
          SDB.disable.init( item );
        }
      }
      else {
        SDB.disable.init( element );
      }
    },
    id: function( id ) {
      if ( Array.isArray( id ) ) {
        for ( var item of id ) {
          var element = SDB.id( item );
          SDB.disable.init( element );
        }
      }
      else {
        var element = SDB.id( id );
        SDB.disable.init( element );
      }
    },
    name: function( name ) {
      if ( Array.isArray( name ) ) {
        for ( var item of name ) {
          var element = SDB.name( item );
          SDB.disable.init( element );
        }
      }
      else {
        var element = SDB.name( name );
        SDB.disable.init( element );
      }
    }
    
  },
  
  enable: {
    init: function( element ) {
      element.classList.remove('disable-item');

      var type = element.getAttribute('data-item-type');
      if ( type === 'edittext' ) {
        select('[contenteditable]', element).setAttribute('contenteditable', true);
      }
    },
    
    element: function( element ) {
      if ( Array.isArray( element ) ) {
        for ( var item of element ) {
          SDB.enable.init( item );
        }
      }
      else {
        SDB.enable.init( element );
      }
    },
    id: function( id ) {
      if ( Array.isArray( id ) ) {
        for ( var item of id ) {
          var element = SDB.id( item );
          SDB.enable.init( element );
        }
      }
      else {
        var element = SDB.id( id );
        SDB.enable.init( element );
      }
    },
    name: function( name ) {
      if ( Array.isArray( name ) ) {
        for ( var item of name ) {
          var element = SDB.name( item );
          SDB.enable.init( element );
        }
      }
      else {
        var element = SDB.name( name );
        SDB.enable.init( element );
      }
    }
    
  },
  
  editTextEvent: function() {
    if ( this.parentNode.parentNode.classList.contains('disable-item') ) this.blur();
  },
    
  inspector: function() {
    
    SDB.launchInspector();
    
    document.addEventListener("mousemove", function( e ){
      var inspector = pick('#sdb-inspector');
      if ( e.target === inspector ) {
        var classOp = inspector.classList.contains('top-right') ? 'remove' : 'add';
        inspector.classList[ classOp ]('top-right');
      }
      findClosestItem( e.target );
    });

    function findClosestItem( target ) {
      try {
        if ( target !== null ) {
          var idAttribute = target.getAttribute('data-item-id');
          var tabIDattribute = target.getAttribute('data-tab-id');
          var treeItemIDattribute = target.getAttribute('data-tree-item-id');
          if ( treeItemIDattribute !== null ) {
            SDB.updateInspector({
              id: treeItemIDattribute,
              parentId: target.getAttribute('data-item-parent-id'),
              name: target.getAttribute('data-item-name'),
              type: target.getAttribute('data-item-type')
            });
          }
          else if ( tabIDattribute !== null ) {
            var tabID = tabIDattribute;
            var tabContainer = pick('[data-item-id="'+ tabID +'"]');
            SDB.updateInspector({
              id: tabID,
              parentId: tabContainer.getAttribute('data-item-parent-id'),
              name: tabContainer.getAttribute('data-item-name'),
              type: tabContainer.getAttribute('data-item-type')
            });
          }
          else if ( idAttribute !== null ) {
            SDB.updateInspector({
              id: idAttribute,
              parentId: target.getAttribute('data-item-parent-id'),
              name: target.getAttribute('data-item-name'),
              type: target.getAttribute('data-item-type')
            });
          }
          else {
            findClosestItem( target.parentNode );
          }
        }
        else {
          findClosestItem( target.parentNode );
        }
      } catch(e) {}
    }
    
  },
  
  launchInspector: function() {
    
		var inspector = document.createElement('div');
		inspector.setAttribute("id", "sdb-inspector");
		select('body').appendChild(inspector);
    
  },
  
  updateInspector: function( item ) {
    var inspector = pick('#sdb-inspector');
    if ( inspector !== null ) {
      inspector.innerHTML =
        '<div class="type">Type: <span>'+ item.type +'</span></div>' +
        '<div class="id">ID: <span>'+ item.id +'</span></div>' +
        '<div class="parent">Parent ID: <span>'+ item.parentId +'</span></div>' +
        (item.name ? '<div class="name">Name: <span>'+ item.name +'</span></div>' : '')
      ;
    }
  },
  
  // https://github.com/undavide/PS-Panels-Boilerplate/blob/master/src/com.undavide.topcoat/js/themeManager.js
  themeManager: {
    init: function( csi ) {
    	SDB.themeManager.changeColor( csi.hostEnvironment.appSkinInfo );
    	csi.addEventListener( CSInterface.THEME_COLOR_CHANGED_EVENT, function() {
        var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
        SDB.themeManager.changeColor(skinInfo);
      });
    },
    
  	changeColor: function( appSkinInfo ) {

  		var themeShade = "",
  			redShade = appSkinInfo.panelBackgroundColor.color.red;
  		if (redShade > 200) {
  			themeShade = "lightest";
  		} else if (redShade > 180) {
  			themeShade = "light";

  		} else if (redShade > 80) {
  			themeShade = "dark";
  		
  		} else {
  			themeShade = "darkest";
  		}
      
      $('html').attr('data-theme-color', themeShade);
      
  	}
  }
};

SDB.init();
