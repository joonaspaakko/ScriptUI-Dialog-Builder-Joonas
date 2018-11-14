
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
      id = 	isDialog && 0 ||
						isTab && _this.data('tab-id') ||
						_this.closest('[data-item-id]').data('item-id');
  
  item.activate( id );

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
dialogElem.on("click", '[data-item-type="EditText"]', function( e ) {
	
  e.preventDefault();
  $(this).find('[contenteditable]').focus();
  
});


// MIRROR TEXT CHANGES TO EDIT PANEL FROM DIALOG CONTENTEDITABLE
dialogElem.on("keydown", "[contenteditable]", function( e ) {
  
  return lineBreakIntercept( e );
	
}).on("keyup", "[contenteditable]", function() {
  
  
  var linebreak = $(this).text().indexOf('\n');
  $(this).removeClass('multiline');
  if ( linebreak > 0 ) {
    $(this).addClass('multiline');
  }
  
  var textBox = $('#panel-edit-style-wrap [data-edit="text"]');
  // Properties panel is updated right here, and the funnel update below updates local storage + tree view
  textBox.html( $(this).text() );
  // Keeps textbox height up to date with the content
  autosize.update( textBox );
  // Since dialog is being manipulated, it is ignored in the update pipeline...
  var ignore = 'dialog';
  item.funnel.update( 'text', ignore );
	
});


// DIALOG TITLE ELLIPSIS (input/contenteditable with ellipsis) FIX:
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
