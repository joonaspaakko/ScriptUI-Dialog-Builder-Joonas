

document.addEventListener('copy', function( e ){
  if ( $('body').hasClass('sdb-code-export') ) {
    e.preventDefault();
    e.clipboardData.setData('text/plain', getExportCode().code);
    $('body').removeClass('sdb-code-export');
  }
});

// GLOBAL SHORTCUT(S)
$(document).on("keydown", function( e ) {
    
  // Export code
  var keycode = e.keyCode ? e.keyCode : e.which;
  var alt_e = keycode == 69 && e.altKey;
  if ( alt_e ) {
    e.preventDefault();
    
    if ( $('#export-box').length < 1 ) {
      exportToClipboard( 'shortcut' );
    }
    else {
      modal.remove(function() {
  			exportToClipboard( 'export-window' );
  		});
    }
  }
  
});

function exportToClipboard( exportOrigin ) {
  
  $('body').addClass('sdb-code-export');

  var faClipboard;
  var xportBox = $('#export-box');
  var exportWindow = exportOrigin === 'export-window';
  
  if ( exportWindow ) {
    var copyBtn = xportBox.find('.copy.btn');
    copyBtn.find('.fa-clipboard-list').hide();
    copyBtn.find('img').show();
  }
  
  var clipboardSpinner = $('#clipboard-export-spinner');
  clipboardSpinner.show();
  
  // $('<textarea id="clipboard-export-temp" style="opacity: 0; position: absolute; z-index: 9999999; top: -9999px; left: -9999px;"></textarea>').appendTo('body');
  // var clipboardExportTemp = $('#clipboard-export-temp');
  
  setTimeout(function() {
    
    var bgTimeout;
    var iconTimeout;
    var l_export = $('.l-export');
    
    // clipboardExportTemp.val( getExportCode().code );
    // clipboardExportTemp.select();
    
    var copySuccess = false;
    try {
      var copy = document.execCommand('copy');
      if ( copy ) copySuccess = true;
    } catch(e) {/**/}
    
    if ( exportWindow ) {
      xportBox.find('.copy.btn img').hide();
    }
    
    clipboardSpinner.hide();
      
    if ( copySuccess ) {
      
      if ( exportWindow ) {
        
        var _this = xportBox.find('.btn.copy');
        var faCheck = _this.find('.fa-check');
        faClipboard = _this.find('.fa-clipboard-list');
        faCheck.addClass('rotateIn');
        faClipboard.hide();
        setTimeout(function() {
          faCheck.removeClass('rotateIn');
          faClipboard.show();
        }, 750);
        
      }
      
      clearTimeout( bgTimeout );
      l_export.addClass('success');
      $('body').addClass('successful-shortcut-export');
      bgTimeout = setTimeout(function() {
        l_export.removeClass('success');
        $('body').removeClass('successful-shortcut-export');
      }, 350);
      
      clearTimeout( iconTimeout );
      $('#dialog-section #export-success-icon').remove();
      $(
        '<div id="export-success-icon">' +
          '<div class="center-1">' +
            '<div class="center-2">' +
              '<div class="center-3">' +
                '<div class="circle">' +
                  '<img src="assets/images/export-shortcut-icon.svg?'+ new Date().getTime() +'" alt="" />' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      ).appendTo('#dialog-section');
      iconTimeout = setTimeout(function() {
        $('#export-success-icon').remove();
        if ( exportWindow ) {
          $('#toolbar .export').trigger('click');
        }
      }, 950);
      
    }
    else {
      
      if ( exportWindow ) {
        
        var copyBtn = xportBox.find('.btn.copy');
        var faTimes = copyBtn.find('.fa-times');
        faClipboard = copyBtn.find('.fa-clipboard-list');
        faTimes.addClass('tada');
        faClipboard.hide();
        setTimeout(function() {
          myCodeMirror.execCommand('selectAll');
          faTimes.removeClass('tada');
          faClipboard.show();
        }, 750);
      }
      
      l_export.addClass('failure');
      $('body').addClass('shortcut-export-failure');
      setTimeout(function() {
        l_export.removeClass('failure');
        $('body').removeClass('shortcut-export-failure');
        
        if ( exportWindow ) {
          
          notification( 'failure', 'Try copying the code manually from the export window', 3 );
          setTimeout(function() {
            $('#toolbar .export').trigger('click');
          }, 3000);
        }
        else {
          notification( 'failure', 'Try copying the code manually from the export window.', 3 );
        }
      }, 350);
      
    }
    
    // clipboardExportTemp.remove();
    
  }, 200);
  
}
