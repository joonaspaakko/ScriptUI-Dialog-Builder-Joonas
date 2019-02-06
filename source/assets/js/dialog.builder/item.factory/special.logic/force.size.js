
// Force size
// Gotta get those midichlorians in check yo
var forceSize = {};
forceSize.onUpdate = function( prop, data ) {
	
	var items = [
		'.static-text',
		'.edit-text',
		'.list-box',
		'.tree-view'
	];
	
	var dialog = $('#dialog');
	dialog.find( items.join(", ") ).each(function() {
		
		var active   = $(this);
		var id       = active.data('item-id');
		var parentId = active.data('item-parent-id');
		// var parent   = $('#dialog [data-item-id="'+ parentId +'"]');
		
		var d = {
			active: data.items[ 'item-' + id ],
			parent: data.items[ 'item-' + parentId ]
		};
		
		var xNotParentFill = d.parent.style.alignChildren[0] !== 'fill',
				yNotParentFill = d.parent.style.alignChildren[1] !== 'fill';
				
		var width  = d.active.style.preferredSize[0],
				height = d.active.style.preferredSize[1];
		
		var widthSet  = width !== 0,
				heightSet = height !== 0;
		
		var alignmentNotFill = d.active.style.alignment !== 'fill';
		
		if ( widthSet && xNotParentFill && alignmentNotFill ) {
			active.width( width );
		}
		else if ( active.width() !== 'auto' ) {
			active.width( 'auto' );
		}
		
		if ( heightSet && yNotParentFill && alignmentNotFill ) {
			active.height( height );
		}
		else if ( active.height() !== 'auto' ) {
			active.height( 'auto' );
		}
		
	});
	
};
