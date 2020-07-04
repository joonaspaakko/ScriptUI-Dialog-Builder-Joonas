
var contextMenu = {
	
	opt: {
		// Flexible notification hide delay depending on the length of the
		// copied string. Because this notification is more of a confirmation,
		// you're not supposed to read it and why would you... so the timer
		// tries to kinda balance between too fast and too slow... maybe leaning
		// towards too fast, because again... there's no need to read it here...
		notificationTimer: function( words ) {
			var seconds = 0.50 // seconds per "word"
			var timer = (seconds * words);
			timer = (timer < 2 ? 2 : timer) + 0.4; // .4 for reaction time...
			// console.log( 'timer: ' + timer );
			// console.log( 'words: ' + words );
			return timer; // Seconds
		}
	},
	
	init: function() {
		
		$(window).on("contextmenu", function( e ) {
			var _this = $(e.target);
			var targetItem = _this.closest('[data-item-id]');
			
			contextMenu.close();
			if ( targetItem.length > 0 ) {
				
				e.preventDefault();
				contextMenu.create( e, targetItem );
				
			}
		}).on("click", function( e ) {
			if ( $('#context-menu').length > 0 ) {
				var menu = $( e.target ).closest('#context-menu');
				if ( menu.length < 1 ) {
					contextMenu.close();
				}
			}
		});
		
	},
	
	create: function( e, targetItem ) {
		
		var menu = $( contextMenu.menuHTML ).appendTo('body');
		menu.css({
			top: e.pageY,
			left: e.pageX
		});
		
		var id = targetItem.data('item-id');
		targetItem.addClass('context-menu-target');
		menu.attr('data-context-id', id);
		
		hideItem.contextMenu.onShow( targetItem.data('item-id') );
		
		menu.find('li').on("click", function() {
			
			var itemAction = $(this).data('action');
			var itemFunc = $(this).data('func');
			contextMenu[ itemAction ][ itemFunc ]( $(this), targetItem );
			contextMenu.close();
			
		});
		menu.show();
		
	},
	
	close: function() {
		var menu = $('#context-menu');
		if ( menu.length > 0 ) {
			menu.remove();
			$('.context-menu-target').removeClass('context-menu-target');
		}
	},
	
	menuHTML:
		'<ul id="context-menu" class="animated fadeInDown">' +
			'<li class="item-hide" data-action="item" data-func="hide">' +
				'Toggle visibility' + 	// ITEM 0
			'</li>' +
			'<li class="copy-find-element" data-action="get" data-func="findElement">' +
				'<i class="far fa-clipboard"></i> Copy findElement()' + 	// ITEM 1
			'</li>' +
			'<li class="copy-variable-name" data-action="get" data-func="varName">' +
				'<i class="far fa-clipboard"></i> Copy variable name' +  // ITEM 2
			'</li>' +
			'<li class="copy-path" data-action="get" data-func="path">'+
				'<i class="far fa-clipboard"></i> Copy item path' + 			// ITEM 3
			'</li>' +
		'</ul>',
	
	get: {
		path: function( _this, targetItem, source ) {
			
			customVar.init();
			var clipboardString = '', notificationString = '';
			var parents = targetItem.parents('[data-item-id]');
			var relatedItems = parents.add( targetItem );
			
			// When dialog is targeted, highlight it using green to stay consistent...
			if ( targetItem.data('item-id') == 0 && parents.length === 0 ) {
				clipboardString += customVar.names[ 0 ];
				notificationString += '<span class="highlight">'+ customVar.names[ 0 ] +'</span>';
			}
			else {
				relatedItems.each(function( i ) {
					var id = $(this).data('item-id');
					var firstLoop = (i === 0);
					var lastLoop = (i === relatedItems.length-1);
					var itemName = customVar.names[ id ];
					
					var type = $(this).data('item-type');
					if ( type === 'TreeItem' ) {
						itemName = 'items[' + $(this).index() + ']';
					}
					
					var varName = firstLoop && '<span class="highlight-3">' + itemName + '</span>' ||
					lastLoop && '<span class="highlight">' + itemName + '</span>' ||
					itemName;
					
					clipboardString += (firstLoop ? '' : '.') + itemName;
					notificationString += (firstLoop ? '' : '<wbr><span class="fade">.</span>') + varName;
					
				});
			}
			
			if ( source === 'export' ) {
				return clipboardString;
			}
			else {
				clipboard.set( clipboardString, function() {
					notification( 'clipboard', /*'<strong>Path:</strong> + '*/ notificationString, contextMenu.opt.notificationTimer( relatedItems.length ) );
				});
			}
			
		},
		findElement: function( _this, targetItem, source ) {
		
			customVar.init();
			var clipboardString = '', notificationString = '';
			var id = targetItem.data('item-id');
			var dialogVarName = customVar.names[ 0 ];
			var varName = customVar.names[ id ];
			// I'm not entirely sure why I decided to write this so differently from "get.path()", but I did...
			// I think I was just writing it on a different day and just saw the world differently...
			var familyTree = contextMenu.get.familyTree( targetItem );
			
			// When dialog is targeted, highlight it using green to stay consistent...
			if ( id == 0 ) {
				clipboardString = dialogVarName;
				notificationString = '<span class="highlight">'+ dialogVarName +'</span>';
			}
			// The target item and possibly some of its parents are nameless:
			// dialog.find('targetItem's_parent_with_a_name').items[ index ].items[ targetItem_index ]
			else if ( familyTree ) {
				clipboardString = familyTree[0];
				notificationString = familyTree[1];
			}
			// Simply: dialog.findElement('targetItem');
			else {
				clipboardString = dialogVarName + '.findElement("'+ varName +'")';
				notificationString = '<span class="highlight-3">' + dialogVarName + '</span><wbr><span class="fade">.</span>findElement("<span class="highlight">'+ varName +'</span>")';
			}
			
			if ( source === 'export' ) {
				return clipboardString;
			}
			else {
				clipboard.set( clipboardString, function() {
					notification( 'clipboard', notificationString, contextMenu.opt.notificationTimer( familyTree[2] === undefined ? ( id === 0 ? 1 : 3 ) : familyTree[2] ) );
				});
			}
			
		},
		varName: function( _this, targetItem, source ) {
			
			customVar.init();
			var id = targetItem.data('item-id');
			// var dialogVarName = customVar.names[ 0 ];
			var varName = customVar.names[ id ];
			var string = varName;
			if ( source === 'export' ) {
				return string;
			}
			else {
				clipboard.set( string, function() {
					notification( 'clipboard', ('<span class="highlight">'+ string +'</span>'), contextMenu.opt.notificationTimer( 1 ) );
				});
			}
			
		},
		familyTree: function( targetItem ) {
			
			var counter = 2;
			var panel = $('[data-panel="treeview"]');
			var id = targetItem.data('item-id');
			var firstId = id;
			var type = targetItem.data('item-type');
			var familyClipboard = '';
			var familyNotification = '';
			
			var result;
			
			if ( type === 'TreeItem' ) {
				climbUpTo('TreeView', id);
				result = [familyClipboard, familyNotification, counter ];
			}
			else {
				result = false;
			}
			
			return result;
			
			function climbUpTo( targetType, id ) {
				
				++counter;
				
				var item = panel.find('li[data-item-id="'+ id +'"]');
				
				var type = item.data('item-type');
				// var varName = customVar.names[ id ];
				
				// Item without a name
				if ( type !== targetType ) {
					var highlight = id === firstId ? ['<span class="highlight">','</span>'] : ['',''];
					familyClipboard = '.' + 'items['+ item.index() +']' + familyClipboard;
					familyNotification = '<wbr><span class="fade">.</span>' + highlight[0] + 'items['+ item.index() +']' + highlight[1] + familyNotification;
					// If current item is not the target ancestor, continue climbing up.
					climbUpTo( targetType, item.data('item-parent-id') );
				}
				// Parent item with a name
				else {
					familyClipboard = customVar.names[ 0 ] + '.findElement("'+ customVar.names[ id ] +'")' + familyClipboard;
					familyNotification = '<span class="highlight-3">' + customVar.names[ 0 ] + '</span>' + '<wbr><span class="fade">.</span>findElement("<span class="highlight-2">' + customVar.names[ id ] +'</span>")' + familyNotification;
				}
				
			}
			
		}
	},
	
	item: {
		hide: function( _this, item ) {
			
			// hide.item.js
			hideItem.contextMenu.onClick( _this, item );
			
		}
	}
	
};

contextMenu.init();
