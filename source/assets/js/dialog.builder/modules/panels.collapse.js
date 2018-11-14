(function() {
	
	$('.panel-wrap .collapse').on("click", function() {
		
		var _this = $(this),
				parent = _this.parent(),
				collapseClass = parent.hasClass('collapse') ? 'removeClass' : 'addClass';
		
		parent[ collapseClass ]('collapse');
		
		$("#dialog-section").backstretch("resize");
		
	});
	
}());
