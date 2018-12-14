

// @codekit-append "export/make.item.js";
// @codekit-append "export/apply.style.js";

// IMPORT EVENT
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
					'</div>' +
					' <span>Download</span>' +
				'</div>' +
					'<div class="copy btn animated fadeInDown">' +
						'<div class="icon">' +
							'<i class="fas fa-check animated"></i>' +
							'<i class="fas fa-times animated"></i>' +
							'<i class="fas fa-clipboard-list"></i>' +
						'</div>' +
						' <span>Copy to Clipboard</span>' +
					'</div>' +
				'</div>' +
		'</div>';
	
	modal.init( content );
	
	/*global CodeMirror*/
	/*eslint no-undef: ["error", { "typeof": true }] */
	var myCodeMirror = CodeMirror(
		$("#export-box .code")[0]
	, {
		mode: {
			name: 'javascript',
			json: true
		},
		theme: 'monokai',
		autofocus: true,
		lineNumbers: true,
		// I really wanted to used this to avoid the sideways scrolling, but even with
		// a few items the JSON gets super bulky at the top, so... no wrappity wraps...
		// lineWrapping: true,
		value: exportCode()
	});
	
	// This section makes sure the #export-box doesn't spill past the viewport
	var winH = $(window).height();
	var exportBox = $('#export-box');
	var exportBoxH = exportBox.height();
	var extraMargins = 80;
	if ( winH < exportBoxH+60 ) {
		var cmMaxHeight = $(window).height() - ( exportBoxH-exportBox.find('.CodeMirror').height() );
		exportBox.find('.code').css({ maxHeight: cmMaxHeight - (extraMargins*2) });
	}
	
	clipBoardEvent( myCodeMirror );
	
	exportBox.find('.download').on("click", function() {
		
		/*global download*/
		/*eslint no-undef: ["error", { "typeof": true }] */
		download( exportCode(), "ScriptUI Dialog Builder - Export.jsx", "application/javascript");
		
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
	
	
});

function exportCode() {
	var data = local_storage.get('dialog');
	var importJSON = '/* \nCode for Import https://scriptui.joonas.me — (Triple click to select): \n' + JSON.stringify( data ) + '\n*/ \n\n';
	var jsxItems = getJSX( data );
	var bundle = importJSON + jsxItems + 'dialog.show();';
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
			counters = { dialog: '', tab: '' }, // Can't remember why I added tab here, but oh well. Let's not mess with this jenga tower.
			previousItem = {
				name: '',
				parent: ''
			},
			growTree = []; // JUST DO IT
	
	// Creates rest of the counters based on the "Add items" panel...
	$('#panel-new-item-wrap ul li').each(function() {
		counters[ $(this).data('item-type').toLowerCase() ] = 0;
	});
	
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
		
		cornucopia += makeJSXitem( index, data, counters, jsxParents, type, id, parentId, parentType, style, previousItem, growTree, lastLoop );
		
	});
	
	return cornucopia;
	
}
