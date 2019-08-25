
// https://developers.google.com/web/updates/2015/04/cut-and-copy-commands#simple_example
var clipboard = {
  set: function( string, callback ) {
    
    var clipboardSpinner = $('#clipboard-export-spinner');
    clipboardSpinner.show();
    
    $('<textarea id="clipboard-export-temp" style="opacity: 0; position: absolute; z-index: 9999999; top: -9999px; left: -9999px;"></textarea>').appendTo('body');
    var clipboardExportTemp = $('#clipboard-export-temp');
    
    clipboardExportTemp.val( string );
    clipboardExportTemp.select();
    
    var copySuccess = false;
    try {
      var copy = document.execCommand('copy');
      if ( copy ) copySuccess = true;
    } catch(e) {/**/}
    
    clipboardSpinner.hide();
    clipboardExportTemp.remove();
    
    if ( copySuccess ) {
      callback();
    }
    else {
			notification( 'failure', 'Copy failed...', 2 );
    }
    
  }
};
