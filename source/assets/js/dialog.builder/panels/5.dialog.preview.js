
function lineBreakIntercept( e ) {
  // Stop the press if element doesn't support multiline.
  var keycode = e.keyCode ? e.keyCode : e.which;
  var type = $('#panel-tree-view-wrap .active').data('item-type');
  var multilineItem = item.list[ type.toLowerCase() ](false).multiline;
  var enter = keycode === 13;

	var result;
  
  if ( enter && !multilineItem ) {
    result = false;
  }
  else {
    result = true;
  }

	return result;
}

var dialogElem = $('#dialog');

// ACTIVATE ITEMS WHEN FOCUSED IN DIALOG PREVIEW
dialogElem.on("focus", "[contenteditable]", function() {
  var _this = $(this),
      isDialog = _this.parent().attr('id') === 'dialog-title-bar',
      isTab = _this.hasClass('tab'),
      isvTab = _this.parent().hasClass('tab'),
      id = 	isDialog && 0 ||
						isTab && _this.data('tab-id') ||
            isvTab && _this.parent().data('tab-id') ||
						_this.closest('[data-item-id]').data('item-id');
  
  item.activate( id, 'dialog-preview' );

  // Build Item Properties panel
  var data  = local_storage.get('dialog');
  var source = 'dialog';
  edit_style_panel.build( data.items[ 'item-' + id ].style, source );
  
});

// My man EditText needs some extra care to keep its public image.
dialogElem.on("focus blur", '[data-item-type="EditText"] [contenteditable]', function( e ) {
	
  if ( e.type === 'focusin' ) {
    $(this).parent().parent().addClass('focused'); // [data-item-type="EditText"] > span > span[contenteditable]
  }
  else {
    dialogElem.find('.focused').removeClass('focused');
  }
  
});

// So that the whitespace (padding) around edittext is clickable too...
dialogElem.on("click", '[data-item-type="EditText"]', function( e ) {
	
  e.preventDefault();
  $(this).find('[contenteditable]').focus();
  
});

// Image click activate
dialogElem.on("click", '[data-item-type="Image"], [data-item-type="IconButton"] img, [data-item-type="Slider"], [data-item-type="Progressbar"]', function() {
	
  var _this = $(this);
  var iconButton = $(this).closest('[data-item-type]');
  if ( iconButton.length > 0 ) _this = iconButton;
  var id = _this.data('item-id');
	item.activate( id, 'dialog-preview' );

  // Build Item Properties panel
  var data  = local_storage.get('dialog');
  edit_style_panel.build( data.items[ 'item-' + id ].style );
  
});


// MIRROR TEXT CHANGES TO EDIT PANEL FROM DIALOG CONTENTEDITABLE
dialogElem.on("keydown", "[contenteditable]", function( e ) {
  
  var keycode = e.keyCode ? e.keyCode : e.which;
  var tab = keycode === 9;
  if ( $(this).is('[contenteditable]:last') && (!e.shiftKey && tab) ) {
    e.preventDefault();
  }
  else if ( $(this).is('[contenteditable]:first') && (e.shiftKey && tab) ) {
    e.preventDefault();
  }
  
  return lineBreakIntercept( e );
	
}).on("keyup", "[contenteditable]", function() {
  
  
  // var linebreak = $(this).text().indexOf('\n');
	  
  var textBox = $('#panel-edit-style-wrap [data-edit="text"]');
  // Properties panel is updated right here, and the funnel update below updates local storage + tree view
	// I'm not a 100% sure what is going on, but it seems that
	// in this contenteditable div, when you make line break at
	// the end, it actually adds 2 br tags, but when you remove
	// the linebreak you made, it only removes one of them.
  // So for now I'm going to just make sure it doesn't travel further up the chain...
  var text = $(this).html().replace(/<br>$/, "").split('<br>').join('\n');
  textBox.html( text );
  
  // This is a bit dangerous... If I ever change the css of the text
  // container in these two, there may be issues. The more flexible
  // method I used elsewhere doesn't work here because the caret
  // position would be reset and it's just as slippery as this.
	var parentST = $(this).closest('[data-item-type]').hasClass('static-text');
	var parentET = $(this).closest('[data-item-type]').hasClass('edit-text');
	if ( parentST || parentET ) {
		var tcHeight = $(this).height();
		var isMultiline = false;
		if ( parentST && tcHeight > 25.5 ) {
			isMultiline = true;
		}
		else if ( parentET && tcHeight > 22.5 ) {
			isMultiline = true;
		}
    
		if ( isMultiline ) {
			$(this).addClass('multiline');
		}
		else {
			$(this).removeClass('multiline');
		}
	}
	
  // Keeps textbox height up to date with the content
  autosize.update( textBox );
  // Since dialog is being manipulated, it is ignored in the update pipeline...
  var ignore = 'dialog';
  item.funnel.update( 'text', ignore );
	
}).on("paste", "[contenteditable]", function( e ) {
  e.preventDefault(); // Don't want to be pasting html into contenteditable
  notification( 'meh', "Sorry, you can't paste text here. <br> The textarea in Item Properties Panel has been focused, paste there instead.", 5.5 );
  $('#panel-edit-style-wrap [data-edit="text"]').focus();
});


// A FIX FOR DIALOG TITLE ELLIPSIS (input/contenteditable with ellipsis):
// Related code can be found in 'dialog-preview.scss' file. Search
// for: #5945573415 The css already gets rid of the ellipsis
// on focus, but that is only part of the problem. When user
// unfocuses, it comes back kinda wonky. I found that flashing
// normal whitespace and switching back to nowrap fixed it..
$('#dialog-title-bar div').on("blur", function() {

  var _this = $(this);
  _this.css({ whiteSpace: 'normal' });
  setTimeout(function() {
    _this.css({ whiteSpace: 'nowrap' });
  }, 0.1);
  
});
