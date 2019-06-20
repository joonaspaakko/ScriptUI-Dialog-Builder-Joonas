

// @codekit-append "export/make.item.js";
// @codekit-append "export/apply.style.js";

// IMPORT EVENT
var myCodeMirror, sdbExport, cmMode;
$('#toolbar .export').on("click", function() {
	
	var content =
		'<div id="export-box">' +
			'<h2>Export.jsx</h2>' +
			'<div class="code"></div>' +
			'<div class="btns">' +
        '<div class="download btn animated fadeInDown">' +
          '<div class="icon">' +
            '<i class="fas fa-check animated"></i>' +
            '<i class="fas fa-download"></i>' +
						' <span>Download</span>' +
          '</div>' +
        '</div>' +
      '<div class="copy btn animated fadeInDown">' +
        '<div class="icon">' +
          '<i class="fas fa-check animated"></i>' +
          '<i class="fas fa-times animated"></i>' +
          '<i class="fas fa-clipboard-list"></i>' +
					' <span>Copy to Clipboard</span>' +
        '</div>' +
      '</div>' +
      '<div class="settings btn animated fadeInDown">' +
        '<div class="icon">' +
          '<i class="fas fa-cog"></i>' +
					' <span>Settings</span>' +
        '</div>' +
      '</div>' +
      '<div class="settings-window">' +
        '<div>' +
          settings.html() +
        '</div>' +
      '</div>' +
			'</div>' +
		'</div>';
	
	modal.init( content, 'export-modal' );
	
	$('#modal-window-content').on("click", function( e ) {
		if ( $(e.target).attr('id') === 'modal-window-content' ) {
			modal.remove();
		}
	});
		
	sdbExport = getExportCode();
	cmMode = (sdbExport.language === 'javascript') ? {
		name: sdbExport.language,
		json: true
	} : sdbExport.language;
	
	/*global CodeMirror*/
	/*eslint no-undef: ["error", { "typeof": true }] */
	myCodeMirror = CodeMirror( $("#export-box .code")[0], {
		mode: cmMode,
		theme: 'monokai',
		autofocus: true,
		lineNumbers: true,
		value: sdbExport.code,
		readOnly: true
	});
	
	// This section makes sure the #export-box doesn't spill past the viewport
	// var winH = $(window).height();
	var exportBox = $('#export-box');
	// var exportBoxH = exportBox.outerHeight(true);
	// var extraMargins = 30;
	// if ( winH < (exportBoxH+extraMargins) ) {
	// 	var cmMaxHeight = $(window).height() - ( exportBoxH-exportBox.find('.CodeMirror').height() );
	// 	exportBox.find('.code').css({ maxHeight: cmMaxHeight - (extraMargins*2) });
	// }
	
	clipBoardEvent( myCodeMirror );
	
	exportBox.find('.download').on("click", function() {
		
		/*global download*/
		/*eslint no-undef: ["error", { "typeof": true }] */
		download( sdbExport.code, sdbExport.filename, "text/" + sdbExport.language);
		
		var _this = $(this);
		var faCheck = _this.find('.fa-check');
		var faClipboard = _this.find('.fa-download');
		faCheck.addClass('rotateIn');
		faClipboard.hide();
		setTimeout(function() {
			faCheck.removeClass('rotateIn');
			faClipboard.show();
		}, 750);
		
	});

  exportBox.find('.settings').on("click", function() {
    
    var settingsWindow = exportBox.find('.settings-window');
    var toggle = settingsWindow.hasClass('open') ? 'removeClass' : 'addClass';
    settingsWindow[ toggle ]('open');

  });
	
  exportBox.find('.settings-window input').on("change", function() {
    settings.toggleEvent( $(this) );
  });
	
});

function getExportCode() {
	
	customVar.init();
	
	var data = local_storage.get('dialog');
	var importJSON = '\nCode for Import https://scriptui.joonas.me — (Triple click to select): \n' + JSON.stringify( data ) + '\n';
  
	var bundle = {};
	// HTML
  if ( data.settings.cepExport ) {
		importJSON = data.settings.importJSON ? ('<!-- ' + importJSON + '--> \n\n') : '';
		bundle.code = settings.cepExport.onExport( data, importJSON );
		bundle.language = 'htmlmixed';
		bundle.filename = 'ScriptUI Dialog Builder - Export.html';
	}
	// JAVASCRIPT
	else {
		var jsxItems = getJSX( data );
		importJSON = data.settings.importJSON ? ('/*' + importJSON + '*/ \n\n') : '';
		bundle.code = importJSON + jsxItems;
		bundle.language = 'javascript';
		bundle.filename = 'ScriptUI Dialog Builder - Export.jsx';
	}
	
	return bundle;

}

function clipBoardEvent( myCodeMirror ) {
	
	/*global ClipboardJS*/
	/*eslint no-undef: ["error", { "typeof": true }] */
	var clipboard = new ClipboardJS('.btn.copy', {
		text: function() {
			return myCodeMirror.getValue();
		}
	});
	
	clipboard.on('success', function(e) {
		
		var _this = $(e.trigger);
		var faCheck = _this.find('.fa-check');
		var faClipboard = _this.find('.fa-clipboard-list');
		faCheck.addClass('rotateIn');
		faClipboard.hide();
		setTimeout(function() {
			faCheck.removeClass('rotateIn');
			faClipboard.show();
		}, 750);
		
	});

	clipboard.on('error', function(e) {
		
		
		var _this = $(e.trigger);
		var faTimes = _this.find('.fa-times');
		var faClipboard = _this.find('.fa-clipboard-list');
		faTimes.addClass('tada');
		faClipboard.hide();
		setTimeout(function() {
			myCodeMirror.execCommand('selectAll');
			faTimes.removeClass('tada');
			faClipboard.show();
		}, 750);
		
	});
	
}

function getJSX( data ) {
	
	var cornucopia = '',
			jsxParents = {},
			previousItem = {
				name: '',
				parent: ''
			},
			growTree = []; // JUST DO IT
	
	var allItems = $('#panel-tree-view-wrap .tree-dialog li');
	var itemsLength = allItems.length;
	
	allItems.each(function( i ) {
		
		
		var index      = i,
				currentId  = $(this).data().itemId,
				dataItem   = data.items[ 'item-' + currentId ],
				parentId   = dataItem.parentId,
				parentType = (parentId === 0 || parentId === false) ? 'Dialog' : data.items[ 'item-' + parentId ].type,
				type       = dataItem.type,
				id         = dataItem.id,
				style      = dataItem.style;
				
		var lastLoop = false;
		if ( i === ( itemsLength-1 ) ) {
			lastLoop = true;
		}
		
		cornucopia += makeJSXitem( index, data, jsxParents, type, id, parentId, parentType, style, previousItem, growTree, lastLoop );
		
	});
	
	return cornucopia;
	
}
