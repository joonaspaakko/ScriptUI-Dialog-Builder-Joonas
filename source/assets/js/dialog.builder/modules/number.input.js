// Mistakes were made....

var mousemovePing;
setInterval( function() {
	mousemovePing = true;
}, 45 ); // Defines how fast the number updates while dragging.

function numberInputs() {
	
	$('.number').wrap('<div class="number-wrap">');

	var wrap = $('.number-wrap');

	$(
	  '<div class="arrow plus"></div>' +
	  '<div class="arrow minus"></div>' +
	  '<div class="number-overlay"></div>'
	).appendTo( wrap );

	var startNumber, startZero;
	var numberInputs = wrap.find('.number');
	var numberOverlays = wrap.find('.number-overlay');

	numberInputs.each(function() {
		
		if ( $(this).css('display') === 'none' ) {
			$(this).closest('.number-wrap').addClass('hide');
		}
		
	});
	
	var dragging = false, dragScale = 0, dragWrapper, dragStartElement, timestamp = null, lastMouseY = null;
	
	$(window).on('mousedown mousemove mouseup', function( e ) {
		
	  if ( e.type === 'mousedown' ) {
			
	    dragging = true;
	    dragWrapper = $(e.target).parent();
	    dragStartElement = dragWrapper.find('> .number');
			
			startNumber = dragStartElement.val();
			startZero = startNumber == 0 ? true : false;
			
	  }
	  else if ( e.type === 'mousemove' ) {
			
	    if ( dragging && mousemovePing && dragStartElement.hasClass('number') ) {
				
				mousemovePing = false;
	      e.preventDefault();
				
				// if ( dragStartElement.data('edit') === 'margins' ) {
				// 	$('body').addClass('dragging-margins');
				// }
				// dragWrapper.find('.number-overlay').css({ position: 'fixed' });
				
		    if (timestamp === null) {
		      timestamp = Date.now();
		      lastMouseY = e.screenY;
		      return;
		    }
				
		    var now = Date.now();
		    var dt =  now - timestamp;
		    var dy = e.screenY - lastMouseY;
				
		    var speedY = Math.abs( Math.round(dy / dt * (e.shiftKey ? 200 : 40)) );
				var dragSpeed = speedY > 4 ? speedY : 0; // Poor mans slow start...
				
		    timestamp = now;
		    lastMouseY = e.screenY;
				
	      if ( e.pageY < dragScale ) {
					numberSwitch( dragStartElement, 'up', e.shiftKey, dragSpeed );
	      }
	      else if ( e.pageY > dragScale ) {
	        numberSwitch( dragStartElement, 'down', e.shiftKey, dragSpeed );
				}
				
				dragScale = e.pageY;
				
	    }
	    
	  }
	  else if ( e.type === 'mouseup' ) {
			
			// dragStartElement.removeClass('danger-zone');
			
			// dragWrapper.find('.number-overlay').css({ position: 'absolute' });
			var bleep = dragging && dragStartElement.length === 1;
			if ( bleep ) {
				// if ( dragStartElement.data('edit') === 'margins' ) {
				// 	$('body').removeClass('dragging-margins');
				// }
			}
			dragging = false;
			
	  }
		
	});
	
	
	// I tried to emulate native functionality by making it so that
	// single click simply places the caret and double click selects the
	// text, but ended up leaving that out. I liked it better that the
	// text gets selected however you click.
	// var overlay_dblclick = true;
	
	// The overlay is there to prevent weird text selection stuff when dragging, but
	// that in turn makes it so that you can't directly focus on the input.
	// With this, clicking the overlay will result in the same thing.
	numberOverlays.on('click', function() {
		
		// overlay_dblclick = e.type === 'dblclick' ? true : false;
		
		var _this = $(this);
		_this.parent().find('.number').focus();
		
	});
	
	numberInputs.on('focus blur', function( e ) {
	  
	  var numberElement = $(this);
	  
	  if ( e.type === 'focus' ) {
	    startNumber = numberElement.val();
			startZero = startNumber == 0 ? true : false;
				$(this).select();
	  }
	  else {
	    numberSwitch( numberElement, 'blur' );
	  }
	                        
	});

	wrap.find('.arrow').on("click", function( e ) {
	  
	  var _this = $(this),
	      numberElement = _this.parent().find('.number');
	  
    startNumber = numberElement.val();
		startZero = startNumber == 0 ? true : false;
		
	  if ( _this.hasClass('plus') ) {
	    numberSwitch( numberElement, 'up', e.shiftKey );
	  }
	  else if ( _this.hasClass('minus') ) {
	    numberSwitch( numberElement, 'down', e.shiftKey );
	  }
	  
	});
	                
	numberInputs.on('keyup', function( e ) {
	  
	  var keycode = e.keyCode ? e.keyCode : e.which;
	  var numberElement = $(this);
		
    startNumber = numberElement.val();
		startZero = startNumber == 0 ? true : false;
		
	  if ( keycode === 38 ) { // Arrow Up
	    numberSwitch( numberElement, 'up', e.shiftKey );
	  }
	  else if ( keycode === 40 ) { // Arrow Down
	    numberSwitch( numberElement, 'down', e.shiftKey );
	  }
		else {
	    numberSwitch( numberElement, 'numberEntry', e.shiftKey );
		}
		
	});
	
	numberOverlays.on("wheel", function( e ) {
		
		// Because the modifier key for increasing step is Shift, which also
		// reverses the scroll direction, both X and Y need to be checked...
		var scrollY = e.originalEvent.deltaY,
				scrollX = e.originalEvent.deltaX,
				scrollUp = scrollY < 0 || scrollX < 0,
				numberElement = $(this).parent().find('.number');
		
    startNumber = numberElement.val();
		startZero = startNumber == 0 ? true : false;
		
		if ( scrollUp ) { // Scroll Up
			numberSwitch( numberElement, 'up', e.shiftKey );
		}
		else { // Scroll Down
			numberSwitch( numberElement, 'down', e.shiftKey );
		}

	});

	function numberSwitch( numberElement, action, shift, dragSpeed ) {
		
		var numberRaw = numberElement.val();
	  var number = parseInt( numberRaw.replace(/\D/g,''), 10);
		number = !number ? 0 : number;
		
		var active      = $('#dialog .active'),
				widthInput  = numberElement.hasClass('width'),
				heightInput = numberElement.hasClass('height');
		
		var numData = {
			min: parseInt( numberElement.attr('min'), 10),
			max: parseInt( numberElement.attr('max'), 10),
			step: dragSpeed || parseInt( numberElement.attr('step'), 10),
			modifierStep: parseInt( numberElement.attr('modifier-step'), 10)
		};
		
		var step = (shift ? numData.modifierStep : numData.step) || 1,
				belowMin = number < numData.min,
				aboveMax = number > numData.max,
				outOfRange = belowMin || aboveMax;
		
		// If value is 0 when the action starts → fetch
		// visual size and then continue as normal...
		if ( startZero ) {
			startZero = false;
			if ( widthInput ) {
				number = Math.round( active.width() ) + ( action === 'down' ? 1 : 0 ) - ( action === 'up' ? 1 : 0 );
			}
			else if ( heightInput ) {
				var startHeight = $('#dialog .active').data('item-type') === 'Dialog' ? active.find('> .padding-box').outerHeight() : active.height();
				number = Math.round( startHeight ) + ( action === 'down' ? 1 : 0 ) - ( action === 'up' ? 1 : 0 );
			}
		}
		// Gets rid of non numeric characters
		else if ( numberRaw !== number.toString() ) {
			numberElement.val( number );
		}
		// If empty
		else if ( !number ) {
			numberElement.val( 0 );
		}

		switch ( action ) {
			case 'up':
				if ( number < numData.max ) {
					number = number + step > numData.max ? numData.max : number + step;
					numberElement.val( number );
					startNumber = number;
				}
				break;
			case 'down':
				if ( number > numData.min ) {
					number = number - step < numData.min ? numData.min : number - step;
					numberElement.val( number );
					startNumber = number;
				}
				break;
		}
		
		// Is outside of the min max range defined in the input.number with a data-attribute...
		if ( outOfRange ) {
			var n = belowMin && numData.min ||
							aboveMax && numData.max
			numberElement.val( n );
		}
		
		item.funnel.update( numberElement.data('edit') );
		
	}
	
}
