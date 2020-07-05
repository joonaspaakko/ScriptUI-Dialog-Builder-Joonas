

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

// PREFERRED SIZE (ICON) → RESET BACK TO 0 (content size)
propsPanel.on("click", '.preferred-size-auto', function() {
  
	var width = propsPanel.find('input.width');
	width.val(0).change();
	var height = propsPanel.find('input.height');
	height.val(0).change();
  
	item.funnel.update( width.data('edit') ); // No need to update height. These two get updated as a pair.
  
});

// RESET NUMBER INPUTS BACK TO 0 (content size)
propsPanel.on("dblclick", '.number-overlay', function() {
  
  var parent = $(this).parent(),
      number = parent.find('.number');
  
  number.val(0).change();
  
  item.funnel.update( number.data('edit') ); // No need to update height. These two get updated as a pair.
  
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
  var textContainer = active.find('.text-container');
  var type = active.data('item-type');
  var tcHeight = textContainer.height();
  var isMultiline = false;
  var parentST = type === "StaticText";
  var parentET = type === "EditText";
  
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

// Data-edit just to make sure no stray checkboxes are listened. GET OUT OF HERE WITH YOUR STUPID STORIES, GARY!
propsPanel.on("change", 'input[type="checkbox"][data-edit]', function() {
  item.funnel.update( $(this).data('edit') );
});
  
propsPanel.on("keyup", '[data-edit="listItems"], [data-edit="varName"], [data-edit="helpTip"], .creation-props-inner-wrap input[type="text"]', function() {
  
  // Make sure varName is camelCase
  if ( $(this).data('edit') === 'varName' ) {
		// https://stackoverflow.com/a/32604073/603568
		var toCamelCase = function (str) {
			// Lower cases the string
			return str//.toLowerCase()
				// Replaces any - or _ characters with a space
				// .replace( /[-_]+/g, ' ')
				.replace( /[-]+/g, ' ')
				// Remove number prefixes
				.replace( /^[0-9]/g, '')
				// Removes any non alphanumeric characters
				.replace( /[^\w\s]/g, '')
				// Uppercases the first character in each group immediately following a space
				// (delimited by spaces)
				.replace( / (.)/g, function($1) { return $1.toUpperCase(); })
				// Removes spaces
				.replace( / /g, '' );
		}
		$(this).val( toCamelCase( $(this).val() ) );
  }
  
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
    
    $('#panel-edit-style-wrap .align-children select').each( function() {
      $(this).trigger('change');
      $(this).prettyDropdown({
        classic: true,
        customClass: 'arrow triangle',
        selectedMarker: '<i class="fas fa-check"></i>'
      }).refresh();
    });
    
  }
  
	item.funnel.update( $(this).data('edit') );
  
});

propsPanel.on("click", '.custom-file-input > div', function() {
  var remove = $(this).hasClass('remove');
  if ( remove ) {
    propsPanel.find('.base64-bin').attr('src', '');
    item.funnel.update( 'image' );
  }
  else {
  	propsPanel.find('[data-edit="image"]').trigger("click");
  }
});

propsPanel.on("change", '[data-edit="image"]', function() {
    
    var file = this.files[0];
		
		var image = {};

		image.render = function( file, callback ) {

		  var reader = new FileReader();
		  reader.onload = function() {
		    callback( reader.result );
		  }
		  reader.readAsDataURL(file);
		  
		};

		image.getBinary = function( file, callback ) {

		  var reader = new FileReader();
		  reader.onload = function(){
		    callback( encodeURIComponent( reader.result ) );
		  };
		  reader.readAsBinaryString( file );
		  
		};

    image.render( file, function( base64 ){
      propsPanel.find('.base64-bin').attr( "src", base64 );
      item.funnel.update( 'image' );
      
    });
    
});
