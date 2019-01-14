

var propsPanel = $('#panel-edit-style-wrap');

// EDIT PANEL CLICK EVENTS

// JUSTIFY
propsPanel.on("click", '.justify-icon', function() {
  $(this).addClass('active').siblings().removeClass('active');
});

// ALIGNMENT POWER STATE TOGGLE → ON / OFF
propsPanel.on("change", '.alignment-checkbox input', function() {
	
  var on = $(this).prop('checked');
  var prop =  on ? false : true;
  var classToggle = on ? 'removeClass' : 'addClass';
  
  $('.alignment-container select').prop('disabled', prop).trigger('change');
	$('.alignment-container .prettydropdown')[ classToggle ]('disabled');
  
});

// PREFERRED SIZE → RESET BACK TO 0 (content size)
propsPanel.on("click", '.preferred-size-auto', function() {
	
  var width = propsPanel.find('input.width');
  width.val(0).change();
  var height = propsPanel.find('input.height');
  height.val(0).change();
  
  item.funnel.update( width.data('edit') ); // No need to update height. These two get updated as a pair.
	
});

// MARGINS TOGGLE → ALL SIDES / TOP, RIGHT, BOTTOM, LEFT
propsPanel.on("click", '.link-icon', function() {
	
	var hiddenMargins = $('.margin-inputs .n-3-4');
  var isHidden = hiddenMargins.hasClass('hidden');
  
  // ENABLE ALL
  if ( isHidden ) {
    $(this).removeClass('active');
    hiddenMargins.removeClass('hidden');
    hiddenMargins.find('input')
      .prop('disabled', false)
      .val( $('.margin-inputs .n-1-4 input').val() );
		$('#panel-edit-style-wrap .margins-desc').removeClass('hide');
  }
  // ENABLE FIRST
  else {
    $(this).addClass('active');
    hiddenMargins.addClass('hidden');
    hiddenMargins.find('input').prop('disabled', true);
		$('#panel-edit-style-wrap .margins-desc').addClass('hide');
  }
  
  item.funnel.update( 'margins' );
  
});

// ***********************
// UPDATE ITEM PROPERTIES
// ***********************

propsPanel.on("keydown", '[data-edit="text"]', function( e ) {
  return lineBreakIntercept( e );
});

propsPanel.on("keyup", '[data-edit="text"]', function( e ) {
  
  var keycode = e.keyCode ? e.keyCode : e.which;
  
  if ( keycode != 18 ) { // Update if alt is released.
    item.funnel.update( $(this).data('edit') );
  }
  
  var active = $('#dialog .active');
  if ( active.data('item-type') === 'EditText' ) {
    active.find('.os-content-glue').html( active.find('[contenteditable]').html() );
  }
  
  var textContainer = active.find('.text-container');
  var type = active.data('item-type');
  var tcHeight = textContainer.height();
  var isMultiline = false;
  var parentST = type === "StaticText";
  var parentET = type === "EditText";
  console.log( parentET );
  if ( parentST && tcHeight > 25.5 ) {
    isMultiline = true;
  }
  else if ( parentET && tcHeight > 22.5 ) {
    isMultiline = true;
  }
  
  if ( isMultiline ) {
    textContainer.addClass('multiline');
  }
  else {
    textContainer.removeClass('multiline');
  }
  
});

propsPanel.on("keyup", '[data-edit="listItems"]', function() {
  item.funnel.update( $(this).data('edit') );
});

propsPanel.on("click", '[data-edit="justify"]', function() {
	item.funnel.update( $(this).data('edit') );
});

propsPanel.on("change", 'select[data-edit]', function() {
  
  // Don't you judge me....
  var isOrientation = $(this).data('edit') === 'orientation';
  if ( isOrientation ) {
    
    var selection = $(this).find('option:selected'),
        isColumn  = selection.val() === 'column';
    
    var acHorizontal = $('#align-children-horizontal');
    var acVertical = $('#align-children-vertical');
    
    if ( !isColumn ) {
      acHorizontal.find('option:contains(fill)').remove();
      $('<option>fill</option>').appendTo( acVertical );
    }
    else {
      acVertical.find('option:contains(fill)').remove();
      $('<option>fill</option>').appendTo( acHorizontal );
    }
    
    $('#panel-edit-style-wrap .align-children select').each(function() {
      $(this).clone().appendTo('#panel-edit-style-wrap .align-children');
    });
    
    $('#panel-edit-style-wrap .align-children .prettydropdown').remove();
    
    $('#panel-edit-style-wrap .align-children .pretty-classic').each(function() {
      
      $(this).trigger('change');
      
      $(this).prettyDropdown({
        classic: true,
        customClass: 'arrow triangle',
        selectedMarker: '<i class="fas fa-check"></i>'
      });
      
    });
  }
  
	item.funnel.update( $(this).data('edit') );
  
});
