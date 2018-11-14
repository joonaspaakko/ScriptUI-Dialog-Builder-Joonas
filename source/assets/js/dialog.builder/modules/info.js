
// The graduation cap icon...
(function() {
	
	$('#bottom-left-toolbar .info').on("click", function() {
		
		var content = $(this).find('.content').html();
		modal.init( content );
		
		$('#modal-window').find('.v').html( $('body').data().version );
		
		$('#modal-window-content').css({ position: 'absolute', top: 0 });
		
		// makeMenu();
		
	});
	
	// function makeMenu() {
	//
	// 	var listItems = '';
	//
	// 	$('#modal-window-content h3').each(function() {
	//
	// 		var text = $(this).text();
	// 		var id = $(this).attr('id');
	//
	// 		var listItem = '<li><a href="#'+ id +'">'+ text +'</a></li>';
	//
	// 		listItems += listItem;
	//
	// 	});
	//
	// 	$('<ul id="info-menu">'+ listItems +'</ul>').prependTo('#modal-window-content .information-desk .container');
	//
	// }
	
}());
