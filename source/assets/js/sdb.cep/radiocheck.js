
SDB.Radiocheck = {
  
  init: function() {
    
    var buttons = selectAll('#dialog [data-item-type="radiobutton"], #dialog [data-item-type="checkbox"]');
    for ( var i=0; i < buttons.length; i++ ) {
      var button = buttons[i];
      var radiocheck = pick('.radiocheck', button);
      // Just incase someone tries to manually check if it's checked, class 'checked' is clearer...
      if (radiocheck.classList.contains('on') ) {
        radiocheck.classList.add('checked');
      }
      select('.radiocheck', button).addEventListener("click", function() { rClick( this ) });
      select('label', button).addEventListener("click", function() { rClick( this ) });
      
      function rClick( _this ) {
        var parent = _this.parentNode;
        SDB.Radiocheck.toggle( parent );
        var customEvent = new CustomEvent('onCheck', { detail: {
          checked: SDB.Radiocheck.checked( parent )
        }});
        parent.dispatchEvent( customEvent );
      }
    }
    
  },
  
  toggle: function( button ) {
    SDB.Radiocheck.classOperation( button, 'toggle' );
    SDB.Radiocheck.crowdControl( button );
  },
  
  check: function( button ) {
    SDB.Radiocheck.classOperation( button, 'add' );
    SDB.Radiocheck.crowdControl( button );
  },
  
  uncheck: function( button ) {
    SDB.Radiocheck.classOperation( button, 'remove' );
  },
  
  checked: function( button ) {
    return pick('.radiocheck', button).classList.contains('on');
  },
  
  value: function( button ) {
    return SDB.Radiocheck.checked( button );
  },
  
  classOperation: function( button, method ) {
    var radiocheck = button.querySelector('.radiocheck');
    radiocheck.classList[ method ]('on');
    radiocheck.classList[ method ]('checked'); // Just in case...
  },
  
  // Removes the checked state from adjacent siblings... Which is not the same as any sibling.
  crowdControl: function( button ) {

    if ( button.classList.contains('radiobutton') ) {
      uncheckAdjacent( button, 'previous' );
      uncheckAdjacent( button, 'next' );

      function uncheckAdjacent( btn, type ) {
        if ( btn[ type + 'ElementSibling' ] !== null && btn[ type + 'ElementSibling' ].classList.contains('radiobutton') ) {
          var adjacentBtn = btn[ type + 'ElementSibling' ];
          SDB.Radiocheck.classOperation( adjacentBtn, 'remove' );
          uncheckAdjacent( adjacentBtn, type );
        }
      }
    }

  }
  
};

SDB.Radiobutton = {
  toggle: function( button ) {
    SDB.Radiocheck.toggle( button);
  },
  check: function( button ) {
    SDB.Radiocheck.check( button);
  },
  uncheck: function( button ) {
    SDB.Radiocheck.uncheck( button);
  },
  checked: function( button ) {
    return SDB.Radiocheck.checked( button);
  },
  value: function( button ) {
    return SDB.Radiocheck.checked( button);
  }
};
SDB.Checkbox = SDB.Radiobutton;

SDB.Radiocheck.init();
