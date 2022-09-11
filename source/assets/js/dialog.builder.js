
// CORE
// ****
// @codekit-prepend "dialog.builder/modules/local.storage.js";
// @codekit-prepend "dialog.builder/item.factory/items.js";
// @codekit-prepend "dialog.builder/item.factory/_funnel.js";
// @codekit-prepend "dialog.builder/item.factory/create.js";
// @codekit-prepend "dialog.builder/item.factory/activate.js";
// @codekit-prepend "dialog.builder/item.factory/remove.js";
// @codekit-prepend "dialog.builder/item.factory/sort.js";
// @codekit-prepend "dialog.builder/item.factory/update/update.js";


// ITEMS THAT NEED SOME EXTRA ATTENTION
// ************************************
// @codekit-prepend "dialog.builder/item.factory/special.items/tabbed.panel.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/vertical.tabbed.panel.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tab.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.item.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/list.box.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/drop.list.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/radiocheck.js";

// PANELS
// ******
// @codekit-prepend "dialog.builder/panels/1.add.items.js";
// @codekit-append  "dialog.builder/panels/2.structure.treeview.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/build.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/events.js";
// @codekit-prepend "dialog.builder/panels/4.snapshot.js";
// @codekit-append  "dialog.builder/panels/5.dialog.preview.js";

// MISCELLANEOUS
// *************
// @codekit-prepend "dialog.builder/modules/loading.screen.js";
// @codekit-prepend "dialog.builder/modules/clipboard.js";
// @codekit-prepend "dialog.builder/modules/number.input.js";
// @codekit-prepend "dialog.builder/modules/modal.window.js";
// @codekit-prepend "dialog.builder/modules/legend.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export/custom.var.names.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export/image.duplicate.check.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export.js";
// @codekit-prepend "dialog.builder/modules/settings.js";
// @codekit-prepend "dialog.builder/modules/toolbar/import.js";
// @codekit-prepend "dialog.builder/modules/toolbar/reset.js";
// @codekit-prepend "dialog.builder/modules/toolbar/sample.dialog.js";
// @codekit-prepend "dialog.builder/modules/custom.cursor.js";
// @codekit-prepend "dialog.builder/modules/toggle.active.visibility.js";
// @codekit-prepend "dialog.builder/modules/notifications.js";
// @codekit-prepend "dialog.builder/modules/context.menu.js";
// @codekit-prepend "dialog.builder/modules/panels.collapse.js";
// @codekit-prepend "dialog.builder/item.factory/special.logic/danger.zone.js";
// @codekit-prepend "dialog.builder/item.factory/special.logic/force.size.js";
// @codekit-prepend "dialog.builder/item.factory/special.logic/hide.item.js";


if ( window.location.href.lastIndexOf('load=sample') > -1 ) {
  local_storage.remove('dialog');
  local_storage.set('dialog', JSON.parse( sampleDialogData ) );
}

var data = local_storage.get('dialog');

// START FROM NOTHING...
if ( data === null ) {
  
  var params = {
    id: 0,
    type: 'Dialog',
    parentId: false,
    target: $('#panel-tree-view-wrap .contents'),
    event: 'load'
  };
  item.funnel.create( params );
  
}
// REBUILD FROM EXISTING LOCAL STORAGE DATA...
else {
  
  // Don't mind me adding a little duct tape...
  // Saw this weird error where I came back to a built dialog after
  // a day and somehow the last id was missing in the order array.
  // That id was the active id and it was also in the list of items,
  // so hopefully this puts it back without creating more issues...
  if ( $.inArray( data.activeId, data.order ) < 0 ) {
    data.order.push( data.activeId );
  }
	
  var oldActiveId = data.activeId;
  
	$.each( data.order, function( i, currentId ) {
    
		var currentItem = data.items[ 'item-' + currentId ];
    var treeView = $('#panel-tree-view-wrap');
    var params = {
      id: currentId,
      type: currentItem.type,
      parentId: currentItem.parentId,
      target: currentId === 0 ? treeView.find('.contents') : treeView.find('[data-item-id="'+ currentItem.parentId +'"] > ul'),
      event: 'loadFromLocalStorage'
    };
    item.funnel.create( params );
    
    // Makes sure collapsed items are actually collapsed
		if ( currentItem.collapsed ) {
			$('[data-panel="treeview"] [data-item-id="'+ currentId +'"]').addClass('collapsed');
      $('<img class="collapsed-icon" src="assets/images/parent-collapsed.svg">').appendTo('[data-panel="treeview"] [data-item-id="'+ currentId +'"]');
		}
    
	});
  
	// Update preferred size now that all items/elements are created
	$.each( data.order, function( i, currentId ) {
		var currentItem = data.items[ 'item-' + currentId ];
    if ( currentItem.style.preferredSize !== undefined ) {
      item.activate( currentId );
      item.update.style.dialogPreview( 'preferredSize', data, data.items['item-'+currentId], 'loadFromLocalStorage' );
    }
	});
	
  // Reactivate the ye olde active item
  item.activate( oldActiveId );
  // Build Item Properties panel
	data = local_storage.get('dialog');
  var oldItem = data.items[ 'item-' + oldActiveId ];
  edit_style_panel.build( oldItem.style, "loadFromLocalStorage" );
  
}

settings.setDefaults( data );


// Something something no ragrets 2019
var cep = {
  fetch: {
    dependencies: function() {
      
      var ajaxOpt = {
        version: 2.1,
        cache: true
      };
      var lsname = 'sdb-cep-dependencies';
      
      var data = local_storage.get( lsname ) || {};
      
      cep.fetch.css( ajaxOpt, function( css ) {
        cep.fetch.js( ajaxOpt, function( js ) {
          
          data.css = css;
          data.js = js;
          
          local_storage.set( lsname, data );
          
        });
      });
      
    },
    // CSS
    css: function( ajaxOpt, callback ) {
      
      var output = '';
      jQuery.ajax({
        // async: false,
        cache: ajaxOpt.cache,
        url: 'https://scriptui.joonas.me/assets/css/sdb.cep.css?v=' + ajaxOpt.version,
        success: function( css ) {
          
          var styleElement = $('<style/>');
          styleElement.text( getFonts() + css );
          output += styleElement.prop('outerHTML').replace('\n','');
          styleElement.remove();
          callback( output );
          
        },
        error: function() {
          
          var linkElement = $('<link/>');
          linkElement.attr('href', 'ScriptUI-Dialog-Builder-Joonas-master/build/assets/css/sdb.cep.css');
          output += linkElement.prop('outerHTML');
          linkElement.remove();
          callback( output );
          
        }
      });
    },
    // JAVASCRIPT
    js: function( ajaxOpt, callback ) {
      var scriptElement = $('<script/>');
      var outputJS = '';
      jQuery.ajax({
        // async: false,
        cache: ajaxOpt.cache,
        url: 'https://scriptui.joonas.me/assets/js/sdb.cep.js?v=' + ajaxOpt.version,
        success: function( js ) {
          
          scriptElement.text( js );
          outputJS += scriptElement.prop('outerHTML');
          scriptElement.remove();
          callback( outputJS );
          
        },
        error: function() {
          
          scriptElement.attr('src', 'ScriptUI-Dialog-Builder-Joonas-master/build/assets/js/sdb.cep.js');
          outputJS += scriptElement.prop('outerHTML');
          scriptElement.remove();
          callback( outputJS );
          
        }
      });
    }
  }
};

cep.fetch.dependencies();

// Warning for people not using chrome
// var chromeRestriction = "sdb-chrome-restriction";
// if ( window.navigator.vendor !== "Google Inc." && local_storage.get( chromeRestriction ) !== "I don't care"  ) {
if ( window.navigator.vendor !== "Google Inc." ) {
  
  var chromeRestriction_modal =
    '<div id="chrome-restrictions-modal" style="max-width: 400px; border-radius: 4px; background-clip: padding-box; box-shadow: 0 0 30px rgba(0,0,0,0.5); background: #474747; text-align:center; color: #dedede; font-family: Source Sans Pro, sans-serif; font-size: 14px; line-height: 15px; font-weight: 400; color: #c7c6c6;">' +
      '<h2>Browser Police.jsx</h2>' +
      '<div style="margin: 40px 60px;">' +
        '<img style=" max-width: 50px;" src=" data:image/png;base64,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" alt="" />' +
        "<h3 style='font-weight: normal; font-size: 20px; line-height: 24px; color: #fff;'>Hold up! It looks like you are not using Google Chrome</span>!</h3>" +
        "<p>Unfortunately this web app is designed <br>to work in desktop <strong>Chrome only</strong>.</p>" +
        '<div style="background: #474747; display: inline-block; border-radius: 4px; padding: 20px; margin-top: 10px; border: 1px solid #383838; font-size: 12px; font-weight: normal;">' +
          '<div><span style="color: #fee13c;">You should switch to Chrome</span><br /><span style="color: #a3a3a3;">or try the <a target="_blank" style="color: #a3a3a3; text-decoration: underline;" href="https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas#desktop-applications--chrome-app">pseudo desktop app</a>.</span></div>' +
          // " <div id='chrome-restriction' style='cursor: pointer; display: inline; color: #c7c6c6; text-decoration: underline;'>I'm feeling lucky</div>" +
        '</div>' +
        '<br><a style="display: inline-block; margin-top: 10px; font-size: 12px; font-weight: normal; color: #a3a3a3; text-decoration: underline;" href="https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas">SDB in Github</a>' +
      '</div>' +
    '</div>'
  ;
	modal.init( chromeRestriction_modal, 'export-modal' );
  
  $('#modal-window-overlay').off('click');
  
  $('#chrome-restriction').on("click", function() {
    // local_storage.set( chromeRestriction, "I don't care" );
    modal.remove();
  });
  
}
