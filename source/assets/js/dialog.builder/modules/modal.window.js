
var modal = {
	
	init: function( content, customClass ) {
		
		$('#modal-window').remove();
		
		modal.make( content, customClass );
		
		$('#modal-window-overlay').on("click", function() {
			modal.remove();
		});
		
			
	},
	
	make: function( content, customClass ) {
		
		content = content === undefined ? '' : content;
		
		$(
			'<div id="modal-window" class="'+ (customClass ? customClass : '') +'">' +
				'<div id="modal-window-overlay" data-esc></div>' +
				'<div id="modal-window-content" class="animated fadeIn">' +
					content +
				'</div>' +
			'</div>'
		).appendTo( 'body' );
		
		$('body').addClass('modal-window-active');
		
	},
	
	remove: function( callbach ) {
		
		$('#modal-window-content').addClass('fadeOut');
		
		setTimeout(function() {
			$('#modal-window').remove();
			$('body').removeClass('modal-window-active');
			
			callbach !== undefined && callbach();
			
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
