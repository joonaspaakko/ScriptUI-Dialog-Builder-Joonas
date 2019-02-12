(function() {
	
	$('.panel-wrap .panel-title, .panel-wrap .collapse, .panel-wrap .label').on("click", function() {
		collapse( $(this) );
	});
	
	function collapse( _this ) {
		
		var parent = _this.parent(),
				collapseClass = parent.hasClass('collapse') ? 'removeClass' : 'addClass';
		
		if ( parent.hasClass('collapse') ) {
			snapshot.openPanel();
		}
		
		parent[ collapseClass ]('collapse');
		
		$("#dialog-section").backstretch("resize");
		
	}
	
}());
