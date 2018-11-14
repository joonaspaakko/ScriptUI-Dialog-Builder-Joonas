
var modal = {
	
	init: function( content ) {
		
		modal.make( content );
		
		$('#modal-window-overlay').on("click", function() {
			modal.remove();
		});
		
			
	},
	
	make: function( content ) {
		
		content = content === undefined ? '' : content;
		
		$(
			'<div id="modal-window">' +
				'<div id="modal-window-overlay" data-esc></div>' +
				'<div id="modal-window-content" class="animated fadeIn">' +
					content +
				'</div>' +
			'</div>'
		).appendTo( 'body' );
		
		$('body').addClass('modal-window-active');
		
	},
	
	remove: function() {
		
		$('#modal-window-content').addClass('fadeOut');
		
		setTimeout(function() {
			$('#modal-window').remove();
			$('body').removeClass('modal-window-active');
		}, 100);
	
	}
	
};


$(document).on("keydown", function( e ) {
	
	if ( $('#modal-window').length > 0 ) {
		var keycode = e.keyCode ? e.keyCode : e.which;
		
		var esc   = (keycode === 27);
		var enter = (keycode === 13);
		
		if ( esc ) {
			$('#modal-window').find('[data-esc]').trigger('click');
		}
		else if ( enter ) {
			$('#modal-window').find('[data-enter]').trigger('click');
		}
	}
	
});
