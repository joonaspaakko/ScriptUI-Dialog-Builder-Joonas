

// var shortcuts = {
//   init: function() {
//
//   },
//
//   // Visual indicator so user knows he pressed a shortcut and something happened, probably...
//   flash: function() {
//
//   }
//
// };

// GLOBAL SHORTCUT(S)
$(document).on("keydown", function( e ) {
    
  // Export code
  var keycode = e.keyCode ? e.keyCode : e.which;
  var alt_e = keycode == 69 && e.altKey;
  if ( alt_e ) $('.l-export').trigger('click');
  
});

var bgTimeout;
var iconTimeout;
shortcutExport();

function shortcutExport() {
  var clipboard = new ClipboardJS('.l-export', {
    text: function() {
      return exportCode();
    }
  });
  
  var l_export = $('.l-export');
  clipboard.on('success', function() {
    
    clearTimeout( bgTimeout );
    l_export.addClass('success');
    $('body').addClass('successful-shortcut-export');
    bgTimeout = setTimeout(function() {
      l_export.removeClass('success');
	    $('body').removeClass('successful-shortcut-export');
    }, 350);
		
    clearTimeout( iconTimeout );
    $('#dialog-section #export-success-icon:first').remove();
		$(
      '<div id="export-success-icon">' +
        '<div class="center-1">' +
          '<div class="center-2">' +
            '<div class="center-3">' +
              '<div class="circle">' +
                '<img src="assets/images/export-shortcut-icon_animated.svg" alt="" />' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    ).appendTo('#dialog-section');
		iconTimeout = setTimeout(function() {
	    $('#export-success-icon').remove();
    }, 950);
    
  });
  clipboard.on('error', function() {
     
    l_export.addClass('failure');
    $('body').addClass('shortcut-export-failure');
    setTimeout(function() {
      l_export.removeClass('failure');
	    $('body').removeClass('shortcut-export-failure');
    }, 350);
    
  });
}
