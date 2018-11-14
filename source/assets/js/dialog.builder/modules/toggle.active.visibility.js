

$('.grey-out-active').on("click", function() {
	
	if ( $(this).hasClass('off') ) {
		$(this).removeClass('off');
		$('#dialog').removeClass('hide-active');
		notification( 'info', 'Active item highlighted in the dialog preview.', 3.5 );
	}
	else {
		$(this).addClass('off');
		$('#dialog').addClass('hide-active');
		notification( 'meh', 'Active item grayed out in the dialog preview.', 3.5 );
	}
	
});
