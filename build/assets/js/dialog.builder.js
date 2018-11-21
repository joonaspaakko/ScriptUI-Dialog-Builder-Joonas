// TEXT INFO THAT IS USED FOR MULTIPLE ITEMS
function activeParent(e,t){
// Burn it all!!
e.find(".active-parent").removeClass("active-parent"),t.parentsUntil(".dialog.tree-root").filter('[data-parent="true"]').addClass("active-parent")}
// Just don't jump in the witch's oven...
function lightThePath(e,t){if(
// Burn it all!! Okay... Maybe not the best word choice there...
$(".path-node").removeClass("path-node"),$(".path-item").removeClass("path-item"),$(".path-sibling-node").removeClass("path-sibling-node"),$(".path-end").removeClass("path-end"),$(".path-start").removeClass("path-start"),$(".path-start-last").removeClass("path-start-last"),$(".path-start-node").removeClass("path-start-node"),"Dialog"!==t.data("item-type")){e.find(".active-parent").first().addClass("path-end");
// PATH END
var i=t;i.next().length<1?i.addClass("path-start-last"):i.data("parent")?i.addClass("path-start-node"):i.addClass("path-start"),e.find(".active-parent:not(:first)").addClass("path-node").add(i).each(function(){$(this).prevUntil(":first").each(function(){$(this).data("parent")?$(this).addClass("path-sibling-node"):$(this).addClass("path-item")})})}}function droplistOnWindowResize(){$(window).on("resize",function(){droplist.hide()})}// Defines how fast the number updates while dragging.
function numberInputs(){function o(e,t,i,a){var n=e.val();if(isNaN(n))e.val(g);else{n=parseInt(n,10);var d=$("#dialog .active"),o=d.width(),s=e.hasClass("width"),r=d.height(),l=e.hasClass("height");0===n?e.removeClass("danger-zone"):s&&n<o?e.addClass("danger-zone"):s&&o<=n?e.removeClass("danger-zone"):l&&n<r?e.addClass("danger-zone"):l&&r<=n&&e.removeClass("danger-zone");var c={min:parseInt(e.attr("min"),10),max:parseInt(e.attr("max"),10),step:a||parseInt(e.attr("step"),10),modifierStep:parseInt(e.attr("modifier-step"),10)},p=(i?c.modifierStep:c.step)||1,m=n<c.min,v=n>c.max,u=m||v;switch(t){case"blur":if(u){var f=m&&c.min||v&&c.max;e.val(f)}break;case"up":n<c.max&&(n=n+p>c.max?c.max:n+p,e.val(n),g=n);break;case"down":n>c.min&&(n=n-p<c.min?c.min:n-p,e.val(n),g=n);break}}item.funnel.update(e.data("edit"))}$(".number").wrap('<div class="number-wrap">');var g,e=$(".number-wrap");$('<div class="arrow plus"></div><div class="arrow minus"></div><div class="number-overlay"></div>').appendTo(e);var t=e.find(".number"),i=e.find(".number-overlay");t.each(function(){"none"===$(this).css("display")&&$(this).closest(".number-wrap").addClass("hide")});var s,r,l=!1,c=0,p=null,m=null;$(window).on("mousedown mousemove mouseup",function(e){if("mousedown"===e.type)l=!0,s=$(e.target).parent(),r=s.find("> .number");else if("mousemove"===e.type){if(l&&mousemovePing&&r.hasClass("number")){
// if ( dragStartElement.data('edit') === 'margins' ) {
// 	$('body').addClass('dragging-margins');
// }
// dragWrapper.find('.number-overlay').css({ position: 'fixed' });
if(mousemovePing=!1,e.preventDefault(),null===p)return p=Date.now(),void(m=e.screenY);var t=Date.now(),i=t-p,a=e.screenY-m,n=Math.abs(Math.round(a/i*(e.shiftKey?200:40))),d=4<n?n:0;// Poor mans slow start...
p=t,m=e.screenY,e.pageY<c?o(r,"up",e.shiftKey,d):e.pageY>c&&o(r,"down",e.shiftKey,d),c=e.pageY}}else if("mouseup"===e.type){
// dragStartElement.removeClass('danger-zone');
// dragWrapper.find('.number-overlay').css({ position: 'absolute' });
l&&r.length;l=!1}}),
// I tried to emulate native functionality by making it so that
// single click simply places the caret and double click selects the
// text, but ended up leaving that out. I liked it better that the
// text gets selected however you click.
// var overlay_dblclick = true;
// The overlay is there to prevent weird text selection stuff when dragging, but
// that in turn makes it so that you can't directly focus on the input.
// With this, clicking the overlay will result in the same thing.
i.on("click",function(){$(this).parent().find(".number").focus()}),t.on("focus blur",function(e){var t=$(this);"focus"===e.type?(g=$(this).val(),
// if ( overlay_dblclick === true ) {
$(this).select()):o(t,"blur")}),e.find(".arrow").on("click",function(e){var t=$(this),i=t.parent().find(".number");t.hasClass("plus")?o(i,"up",e.shiftKey):t.hasClass("minus")&&o(i,"down",e.shiftKey)}),t.on("keyup",function(e){var t=e.keyCode?e.keyCode:e.which,i=$(this);// Arrow Up
o(i,38===t?"up":40===t?"down":"numberEntry",e.shiftKey)})}function exportCode(){var e=local_storage.get("dialog");return"/* \nCode for Import https://scriptui.joonas.me — (Triple click to select): \n"+JSON.stringify(e)+"\n*/ \n\n"+getJSX(e)+"dialog.show();"}function clipBoardEvent(n){
/*global ClipboardJS*/
/*eslint no-undef: ["error", { "typeof": true }] */
var e=new ClipboardJS(".btn.copy",{text:function(){return n.getValue()}});e.on("success",function(e){var t=$(e.trigger),i=t.find(".fa-check"),a=t.find(".fa-clipboard-list");i.addClass("rotateIn"),a.hide(),setTimeout(function(){i.removeClass("rotateIn"),a.show()},750)}),e.on("error",function(e){var t=$(e.trigger),i=t.find(".fa-times"),a=t.find(".fa-clipboard-list");i.addClass("tada"),a.hide(),setTimeout(function(){n.execCommand("selectAll"),i.removeClass("tada"),a.show()},750)})}function getJSX(c){var p="",m={},v={dialog:"",tab:""},// Can't remember why I added tab here, but oh well. Let's not mess with this jenga tower.
u={name:"",parent:""},f=[];// JUST DO IT
// Creates rest of the counters based on the "Add items" panel...
$("#panel-new-item-wrap ul li").each(function(){v[$(this).data("item-type").toLowerCase()]=0});var e=$("#panel-tree-view-wrap .tree-dialog li"),g=e.length;return e.each(function(e){var t=e,i=$(this).data().itemId,a=c.items["item-"+i],n=a.parentId,d=0===n||!1===n?"Dialog":c.items["item-"+n].type,o=a.type,s=a.id,r=a.style,l=!1;e===g-1&&(l=!0),p+=makeJSXitem(t,c,v,m,o,s,n,d,r,u,f,l)}),p}function makeJSXitem(e,t,i,a,n,d,o,s,r,l,c,p){var m="",v=n.toLowerCase();++i[v];var u=customVarNames(v,s,i);a[d]=u;var f=a[o];
// If current item is a parent...
"TreeItem"!==n&&(item.list[n.toLowerCase()](!1).parent?(m+="// "+u.toUpperCase()+"\n",m+="// "+Array(u.length+1).join("=")+"\n"):l.parent!==f&&l.name!==f&&(m+="// "+f.toUpperCase()+"\n",m+="// "+Array(f.length+1).join("=")+"\n"));var g=$("#dialog");
// This is where each item is first added
switch(n){case"Dialog":m+="var "+u+' = new Window("'+v+'"); \n';break;case"ListBox":case"DropDownList":var h=r.listItems.split("\n").join("").split(",");$.each(h,function(e){h[e]=h[e].trim()}),m+="var "+u+'_array = ["'+h.join('","')+'"]; \n',m+="var "+u+" = "+a[o]+'.add("'+v+'", undefined, '+u+"_array",void 0!==r.selection&&"ListBox"===n&&1<r.selection.length&&(m+=", {multiselect: true}"),m+="); \n";break;case"Divider":m+="var "+u+" = "+a[o]+'.add("panel"); \n';break;case"TreeView":var b=g.find('[data-item-id="'+d+'"]'),y=0<r.preferredSize[0]?r.preferredSize[0]:Math.round(b.width()),w=0<r.preferredSize[1]?r.preferredSize[1]:Math.round(b.height());m+="var "+u+" = "+a[o]+'.add("'+n.toLowerCase()+'", [0,0,'+(y+0)+","+(w+0)+"]); \n";break;case"TreeItem":var C=g.find('[data-item-id="'+d+'"]').hasClass("tree-node")?"node":"item";m+="var "+u+" = "+a[o]+'.add("'+C+'", "'+r.text+'"); \n';break;default:var x=item.list[n.toLowerCase()](!1).multiline,I=void 0===r.text?0:r.text.indexOf("\n"),k=x&&0<I?", undefined, undefined, {multiline: true}":"";m+="var "+u+" = "+a[o]+'.add("'+v+'"'+k+"); \n"}l.name=u,l.parent=a[o];var T=/*type === 'TreeView' ||*/"TreeItem"!==n||p?"\n":"";m+=styleJSXitem(t,i,a,n,d,o,s,r,u,c)+T;
// Add in treeItem expanded properties if this is the last of treeItems in this group
var S=t.order[e+1];if(void 0!==S){var P=t.items["item-"+S],_="TreeItem"===n&&"TreeItem"!==P.type;_&&0<c.length?(m+="\n",$.each(c,function(e,t){m+=t}),m+="\n",c=[]):_&&(m+="\n")}else void 0===S&&"TreeItem"===n&&($.each(c,function(e,t){m+=t}),m+="\n",c=[]);return m}
// When the item type is not a fitting variable name...
function customVarNames(e,t,i){var a;switch(e){case"dropdownlist":a="dropdown"+i[e];break;case"tabbedpanel":a="tpanel"+i[e];break;case"dialog":// This otherwise fine as is, I just forgot that dialog doesn't need the counters :/
a=e;break;default:a=e+i[e]}return a}function styleJSXitem(e,t,i,a,n,d,o,s,r,l){var c="",p="    ";
// var counter = counters[ type.toLowerCase() ];
if("TreeItem"===a){var m=e.items["item-"+n].expanded,v=$('#dialog [data-item-id="'+n+'"]').parentsUntil(".tree-view").filter(".tree-view-item"),u=!1;$.each(v,function(){$(this).hasClass("expanded")||(u=!0);// CLOSE THE FLOOD GATES!!! AAAAAAAAAAAAAAAAAAAA!!!
}),m&&!1===u&&l.push(p+r+".expanded = true; \n")}else if("Divider"===a)c+=p+r+'.alignment = "fill"; \n';else if("Slider"===a)c+=p+r+".minvalue = 0; \n",c+=p+r+".maxvalue = 100; \n",c+=p+r+".value = 50; \n";else{if(
// DROP LIST SELECTION
"DropDownList"===a&&void 0!==s.selection&&(c+=p+r+".selection = "+s.selection+"; \n"),"ListBox"===a&&void 0!==s.selection&&0<s.selection.length)c+=p+r+".selection = "+(1<s.selection.length?JSON.stringify(s.selection):s.selection)+"; \n";
// TABBED PANEL SELECTION
// Due to me being an idiot, it's better for our insanity if tabbed panel selection defined when the selected item is created.
"Tab"===a&&e.items["item-"+d].style.selection===n&&(c+=p+i[d]+".selection = "+r+"; \n"),
// TABBED PANEL ALIGN CHILDREN
"TabbedPanel"===a&&(c+=p+r+'.alignChildren = "fill"; \n');
// TEXT
var f=item.list[a.toLowerCase()](!1).multiline;if(void 0!==s.text&&0<s.text.length)c+=p+r+'.text = "'+(f?s.text.split("\n").join("\\r"):s.text)+'"; \n';
// CHECKED
// PREFERRED SIZE
if(!0===s.checked&&(c+=p+r+".value = "+s.checked+"; \n"),void 0!==s.preferredSize&&"TreeView"!==a){var g=s.preferredSize[0],h=s.preferredSize[1],b=item.list[a.toLowerCase()](!1).parent?"preferredSize":"minimumSize";0<g&&(c+=p+r+"."+b+".width = "+g+"; \n"),0<h&&(c+=p+r+"."+b+".height = "+h+"; \n")}
// JUSTIFY
if(void 0!==s.justify&&"left"!==s.justify||"Button"===a&&"center"!==s.justify)c+=p+(0<(void 0===s.text?0:s.text.indexOf("\n"))?"// ":"")+r+'.justify = "'+s.justify+'"; \n';
// ORIENTATION
// MARGINS
if(void 0!==s.orientation&&(c+=p+r+'.orientation = "'+s.orientation+'"; \n'),
// ALIGN CHILDREN
void 0!==s.alignChildren&&(c+=p+r+'.alignChildren = ["'+s.alignChildren[0]+'","'+s.alignChildren[1]+'"]; \n'),
// SPACING
void 0!==s.spacing&&(c+=p+r+".spacing = "+s.spacing+"; \n"),void 0!==s.margins)c+=p+r+".margins = "+("object"==typeof s.margins?"["+s.margins[3]+","+s.margins[0]+","+s.margins[1]+","+s.margins[2]+"]":s.margins)+"; \n";
// ALIGNMENT
if(null!=s.alignment){var y=e.items["item-"+d].style.orientation,w="";w="column"===y?("top"===s.alignment?"left":"bottom"===s.alignment&&"right")||s.alignment:("left"===s.alignment?"top":"right"===s.alignment&&"bottom")||s.alignment;var C=e.items["item-"+d].style.alignChildren;c+=p+r+".alignment = "+(w="column"===y?'["'+w+'","'+C[1]+'"]':'["'+C[0]+'","'+w+'"]')+"; \n"}}return c}function resetDialog(){modal.init('<div id="reset-box"><h2>Delete Dialog.jsx</h2><span class="text">This will delete the dialog, <br /> allowing you to start over from a clean slate.</span><span class="yes" data-enter>Delete</span><span class="no">Cancel</span></div>');var e=$("#reset-box");e.find(".yes").on("click",function(){modal.remove(),setTimeout(function(){local_storage.remove("dialog"),loadingScreen.init(1.5,function(){location.reload()})},300)}),e.find(".no").on("click",function(){modal.remove()})}
/* exported notification */
function notification(e,t,i){
// "I think that padding makes you look fat..."
function a(e){e.addClass("fadeOut"),setTimeout(function(){e.remove()},300)}
// HTML
var n=$('<div class="notification '+e+' animated"><div><i class="fas fa-info-circle icon"></i><div class="msg">'+t+"<div></div></div>").appendTo("#notifications-wrap"),d=$("#notifications-wrap .notification").length;
// Crowd control - GET BACK YOU MONSTERS!!!! *hoses the crap out of the crowd while frantically digging for the pepper spray*
1<=d&&a($("#notifications-wrap .notification").slice(0,d-1));var o=n.height();n.css({height:0,visibility:"visible"}),n.animate({height:o},300,"easeInOutBack"),
// Bananas - B - A - N - A - N - A - S !!
$("#notifications-wrap .notification:last").addClass("last").prev().removeClass("last"),
// Ain't nobody got time to close notifications manually.
// But would you be interested in our newsletter?
setTimeout(function(){a(n)},1e3*i||5e3)}function shortcutExport(){var e=new ClipboardJS(".l-export",{text:function(){return exportCode()}}),t=$(".l-export");e.on("success",function(){clearTimeout(bgTimeout),t.addClass("success"),$("body").addClass("successful-shortcut-export"),bgTimeout=setTimeout(function(){t.removeClass("success"),$("body").removeClass("successful-shortcut-export")},350),clearTimeout(iconTimeout),$("#dialog-section #export-success-icon").remove(),$('<div id="export-success-icon"><div class="center-1"><div class="center-2"><div class="center-3"><div class="circle"><img src="assets/images/export-shortcut-icon.svg?'+(new Date).getTime()+'" alt="" /></div></div></div></div></div>').appendTo("#dialog-section"),iconTimeout=setTimeout(function(){$("#export-success-icon").remove()},950)}),e.on("error",function(){t.addClass("failure"),$("body").addClass("shortcut-export-failure"),setTimeout(function(){t.removeClass("failure"),$("body").removeClass("shortcut-export-failure")},350)})}function processItemName(e,t){
// debugger;
var i=void 0===e?t:e.trim();return t.toLowerCase()===i.toLowerCase()?t:'<span class="type">'+t+':</span> <span class="txt">'+e+"</span>"}function lineBreakIntercept(e){
// Stop the press if element doesn't support multiline.
var t=e.keyCode?e.keyCode:e.which,i=$("#panel-tree-view-wrap .active").data("item-type"),a=item.list[i.toLowerCase()](!1).multiline;return!(13===t&&!a)}var reText={textItems:"This item supports multiline text <small>(press enter to insert a line break)</small>. <br><br> Changing the default justification of multiline text renders inconsistently and for that reason multiline text is always aligned to the left.",tabs:" <br><br>You can nest TabbedPanels by inserting them inside a Tab item. <br><br>Visible tabs are selected on export (WYSIWYG)."},item={list:{}};item.list.dialog=function(e){return{type:"Dialog",parent:!0,defaultStyle:{text:"Dialog",preferredSize:[0,0],margins:16,orientation:"column",spacing:10,alignChildren:["center","top"]},previewHtml:'<div id="dialog-container" data-parent="true" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div id="dialog-title-bar"><div contenteditable="true">'+e.type+'</div></div><div class="padding-box"></div></div>'}},item.list.group=function(e){return{type:"Group",parent:!0,addPanelIconClass:"fas fa-object-group",defaultStyle:{preferredSize:[0,0],margins:0,orientation:"row",spacing:10,alignChildren:["left","center"],alignment:null},previewHtml:'<div class="group" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.panel=function(e){return{type:"Panel",parent:!0,addPanelDivider:"below",addPanelIconClass:"fas fa-columns",defaultStyle:{text:"Panel",preferredSize:[0,0],margins:10,orientation:"column",spacing:10,alignChildren:["left","top"],alignment:null},previewHtml:'<div class="panel" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="title" contenteditable="true">'+e.type+'</span><div class="padding-box"></div></div>'}},item.list.statictext=function(e){return{type:"StaticText",addPanelIconClass:"fas fa-font",multiline:!0,editInfo:reText.textItems+"<br><br> In the case of multiline text and justify <code>center</code> or <code>right</code> the justify setting is included in the export but commented out.",defaultStyle:{text:"StaticText",justify:"left",preferredSize:[0,0],alignment:null},previewHtml:'<div class="static-text" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="text-container" contenteditable="true">'+e.type+"</span></div>"}},item.list.edittext=function(e){return{type:"EditText",addPanelIconClass:"fas fa-i-cursor",multiline:!0,editInfo:reText.textItems,defaultStyle:{text:"EditText",
// justify: 'left',
preferredSize:[0,0],alignment:null},previewHtml:'<div class="edit-text" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span><span class="text-container" contenteditable="true">'+e.type+"</span></span></div>"}},item.list.button=function(e){return{type:"Button",addPanelIconClass:"fas fa-toggle-on",defaultStyle:{text:"Button",justify:"center",preferredSize:[0,0],alignment:null},previewHtml:'<div class="button" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="button-border"><span class="text-container" contenteditable="true">'+e.type+"</span></div></div>"}},item.list.divider=function(e){return{type:"Divider",addPanelIconClass:"fas fa-strikethrough",defaultStyle:!1,stylePropInfo:"This item doesn't have any adjustable properties.",editInfo:"Divider orientation is locked to the parent item orientation.",previewHtml:'<div class="panel divider-line" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.checkbox=function(e){return{type:"Checkbox",addPanelIconClass:"fas fa-check-square",editInfo:"You can check the checkbox in the dialog preview.",defaultStyle:{text:"Checkbox",preferredSize:[0,0],alignment:null},previewHtml:'<div class="checkbox" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="radiocheck checkbox"><i class="fas fa-check"></i></i></div><label contenteditable="true">'+e.type+"</label></div>"}},item.list.radiobutton=function(e){return{type:"RadioButton",addPanelIconClass:"fas fa-dot-circle",editInfo:"You can check the radiobutton in the dialog preview. <br><br> Radiobuttons are split into different groups if there is a different type of item between them.",defaultStyle:{text:"RadioButton",preferredSize:[0,0],alignment:null},previewHtml:'<div class="radiobutton" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="radiocheck radiobutton"><i class="fas fa-circle"></i></div><label contenteditable="true">'+e.type+"</label></div>"}},item.list.dropdownlist=function(e){return{type:"DropDownList",addPanelIconClass:"fas fa-caret-square-down",editInfo:"You can select a dropdown item in the dialog preview. <br><br>You can make a divider by adding an item that is a single dash character: <code>-</code>.",defaultStyle:{text:"DropDownList",listItems:"Item 1, -, Item 2",preferredSize:[0,0],alignment:null,selection:0},previewHtml:'<div class="dropdownlist" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><label contenteditable="true">'+e.type+'</label><div class="drop-list-wrap"><div class="items"><div class="selected">Item 1</div><div>-</div><div>Item 2</div></div><div class="arrow"><i class="fas fa-chevron-down"></i></div></div></div>'}},item.list.slider=function(e){return{type:"Slider",addPanelIconClass:"fas fa-sliders-h",defaultStyle:!1,stylePropInfo:"This item doesn't have any adjustable properties.",editInfo:"Export outputs a static range from 0 to 100 with current value of 50 every single time.",previewHtml:'<div class="slider"><input type="range" min="0" max="100" value="" data-item-type="'+e.type+'" data-item-id="'+e.id+'"  data-item-parent-id="'+e.parentId+'"></div>'}},item.list.listbox=function(e){return{type:"ListBox",addPanelIconClass:"fas fa-list-alt",editInfo:"You can select item(s) in the dialog preview. <br><br> If you select multiple items, <code>multiline</code> property will be added on export.",defaultStyle:{listItems:"Item 1, Item 2",preferredSize:[0,0],alignment:null},previewHtml:'<div class="list-box" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><ul><li><span>Item 1</span></li><li><span>Item 2</span></li></ul></div>'}},item.list.tabbedpanel=function(e){return{type:"TabbedPanel",parent:!0,addPanelDivider:"above",addPanelIconClass:"fas fa-folder",editInfo:'<strong>Valid child item:</strong> <br><i class="far fa-folder"></i> Tab.'+reText.tabs,defaultStyle:{preferredSize:[0,0],margins:10,alignment:null},previewHtml:'<div class="panel tabbed-panel" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="tab-container"></div><div class="padding-box"></div></div>'}},item.list.tab=function(e){return{type:"Tab",parent:!0,addPanelDivider:"below",addPanelIconClass:"far fa-folder",editInfo:"Can only be placed inside <br><i class='fas fa-folder'></i> TabbedPanel."+reText.tabs,defaultStyle:{text:"Tab",preferredSize:[0,0],margins:10,orientation:"column",spacing:10,alignChildren:["left","top"]},previewHtml:'<div class="panel tab" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.treeview=function(e){return{type:"TreeView",parent:!0,addPanelIconClass:"fas fa-tree",editInfo:'<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem.',defaultStyle:{preferredSize:[0,0],alignment:null},previewHtml:'<div class="panel tree-view" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.treeitem=function(e){return{type:"TreeItem",parent:!0,addPanelDivider:"below",addPanelIconClass:"fas fa-leaf",editInfo:'<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem. <br><br>You can expand or collapse these items in the dialog preview by clicking the arrows.',defaultStyle:{text:"TreeItem"},previewHtml:'<div class="tree-view-item" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="item-wrap"><span class="tree-view-arrow"><i class="fas fa-chevron-right"></i></span><span class="text-container" contenteditable="true">'+e.type+'</span></div><div class="padding-box"></div></div>'}},
// Cram it in there...
item.funnel={create:function(e){e.style=item.create.localStorage(e),item.create.treeView(e),item.update.order(),// Rebuilds the order every time a new item is created.
item.create.dialogPreview(e),item.activate(e.id),tab.onCreate(e);item.funnel.update("all","localStorage"),"loadFromLocalStorage"===e.event||edit_style_panel.build(e.style),"TabbedPanel"===e.type&&tabbedPanel.onCreate(e.event),"TreeView"===e.type&&treeView.onCreate(e.event),$("#dialog-section").backstretch("resize")},remove:function(e){var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]'),i=t.prev(),a=t.next(),n=t.parent("ul").parent("li"),d=t.data("item-type");
// If the removed item was active, figure out which element to activate next.
if(item.remove.treeView(e),item.remove.dialogPreview(e,d),item.remove.localStorage(),$("#panel-tree-view-wrap .active").length<1){
// Order of operation:
// ( If not possible, move to the next one )
// 1. Select next down
// 2. Select next up
// 3. Select parent
e=0<a.length&&a.data("item-id")||0<i.length&&i.data("item-id")||n.data("item-id"),item.activate(e);
// Build Item Properties panel
var o=local_storage.get("dialog");edit_style_panel.build(o.items["item-"+e].style)}$("#dialog-section").backstretch("resize")},update:function(e,t){droplist.hide();
// LOCAL STORAGE
var i=local_storage.get("dialog"),a=(i="localStorage"===t?i:item.update.style.localStorage(e,i)).items["item-"+i.activeId];
// TREE VIEW PANEL
item.update.style.treeView(e,i,a),
// DIALOG PREVIEW
"dialog"!==t&&item.update.style.dialogPreview(e,i,a),
// TAB - ITEM
tab.onUpdate.init(i,a.id),
// TREE VIEW - ITEM
treeViewItem.onUpdate(i,a),$("#dialog-section").backstretch("resize")},sort:function(e,t,i,a,n){item.sort.dialogPreview(e,t,i,a,n),item.sort.localStorage(e,t),$("#dialog-section").backstretch("resize")}},item.create={localStorage:function(e){var t=local_storage.get("dialog"),i=(t=null===t?{}:t).hasOwnProperty("items"),a="item-"+e.id,n=!1;
// Make object for the current item and fill it...
if(i&&(n=t.items.hasOwnProperty(a)),t.activeId=e.id,!n){void 0===t.items&&(t.items={}),void 0===t.items[a]&&(t.items[a]={});var d=t.items[a];
// Add item id
d.id=e.id,
// Add item type
d.type=e.type,
// Add parent id
d.parentId=e.parentId,
// Copy style from existing element
// SourceId is used in item duplication. If it's set, duplication is in process.
e.sourceId?d.style=$.extend(!0,{},t.items["item-"+e.sourceId].style):d.style=item.list[e.type.toLowerCase()](e).defaultStyle}
// Always return style object, which is either default data or data that is saved in local storage
return local_storage.set("dialog",t),t.items["item-"+e.id].style},treeView:function(e){var t=item.list[e.type.toLowerCase()](!1).parent?'data-parent="true"':"",i=$("<li "+t+' data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'" data-item-type="'+e.type+'" class="'+e.type.toLowerCase()+'"><span class="remove-item"><i class="fas fa-times"></i></span><span class="item-text">'+e.type+"</span></li>");"Dialog"===e.type&&(i=$('<ul class="tree-dialog">'+i.prop("outerHTML")+"</ul>")).find("> li").addClass("tree-root");
// Special treatment for all parent items
var a=e.type.toLowerCase();item.list[a](!1).parent&&$("<ul></ul>").insertAfter(i.find(".item-text")),t=(e.target.is("ul")?e.target.parent("li"):e.target).data("parent");
// No data in ul, so gotta go a step higher to look for the data...
var n,d=e.event.match(/^drag/);
// Append to parent items
n=t?d?e.previousIsParent?"insertAfter":"prependTo":"appendTo":"insertAfter",$(i)[n](e.target)},dialogPreview:function(e){var t,i,a=item.list[e.type.toLowerCase()](e).previewHtml,n=e.target.is("ul")?e.target.parent("li"):e.target,d=n.data("parent"),o=n.data("item-id"),s=$("#dialog"),r=s.find('[data-item-id="'+o+'"]'),l=e.event.match(/^drag/);
// No data in ul, so gotta go a step higher to look for the data...
// Append to parent items
i=d?(t=l?e.previousIsParent?"insertAfter":"prependTo":"appendTo","Dialog"===e.type?s:l&&e.previousIsParent?r:r.find("> .padding-box")):(t="insertAfter",s.find('[data-item-id="'+o+'"]')),$(a)[t](i),"DropDownList"===e.type?droplist.init($('#dialog [data-item-id="'+e.id+'"]'),e.id):"RadioButton"===e.type||"Checkbox"===e.type?radiocheck.init($('#dialog [data-item-id="'+e.id+'"]'),e.id,e.type):"ListBox"===e.type&&listbox.init($('#dialog [data-item-id="'+e.id+'"]'),e.id)}},item.get={},item.get.order=function(){var t=[];return $("#panel-tree-view-wrap .contents [data-item-id]").each(function(){var e=$(this).data("item-id");t.push(e)}),t},item.get.id=function(){var e=item.get.order();return Math.max.apply(null,e)+1},item.activate=function(e){droplist.hide();
// Write active item id to local storage
var t=local_storage.get("dialog");t.activeId=e,local_storage.set("dialog",t);
// Change the active element in the treeview.
var i=$("#panel-tree-view-wrap");i.find(".active").removeClass("active");var a=i.find('[data-item-id="'+e+'"]');a.addClass("active");
// Change the active element in the dialog preview
var n=$("#dialog");n.find(".active").removeClass("active"),n.find('[data-item-id="'+e+'"]').addClass("active"),tab.onActivate(e),activeParent(i,a),lightThePath(i,a)},item.remove={localStorage:function(){
// Read old data from local storage.
var e,t,i,a=local_storage.get("dialog");
// Get current order
a.order=(e=[],$("#tree-view-contents [data-item-id]").each(function(){e.push($(this).data("item-id"))}),e),
// Check items in the local storage against the current order.
// Remove all items that don't belong.
$.each((t=a,i=[],$.each(t.items,function(e,t){i.push(t.id)}),i),function(e,t){$.inArray(t,a.order)<0&&delete a.items["item-"+t]}),
// Write back to local storage.
local_storage.set("dialog",a)},treeView:function(e){$("#panel-tree-view-wrap").find('[data-item-id="'+e+'"]').remove()},dialogPreview:function(e,t){
// Gets rid of the tab in dialog prev and also handles resizing
tab.onRemove(e,t);
// Remove the clicked item...
var i=$("#dialog");0<i.find('[data-item-id="'+e+'"]').length&&i.find('[data-item-id="'+e+'"]').remove()}},
// Functions triggered from
// "assets/js/dialog.builder/panels/structure.treeview.js" by a drag
// event created by the jquery sortable plugin Tree View doesn't need
// its own function, since the sortable plugin takes care of that.
item.sort={localStorage:function(e,t){
// Read old data from local storage....
var i,a=local_storage.get("dialog");
// Update order by re-recoding the id's of every single item currently in the tree view
a.order=(i=[],$("#tree-view-contents [data-item-id]").each(function(){var e=$(this).data("item-id");i.push(e)}),i),
// Update parent id
a.items["item-"+e].parentId=t,
// Write back to local storage...
local_storage.set("dialog",a)},dialogPreview:function(e,t,i,a,n){var d=$("#dialog"),o=d.find('[data-item-id="'+e+'"]'),s=d.find('[data-item-id="'+n+'"]'),r="insertAfter"===a?s:s.find("> .padding-box");
// If you move a checked radiobutton to a parent that already has a checked radio button, uncheck the radiobutton that was moved.
if(o[a](r),"RadioButton"===i){var l=o.find(".radiobutton"),c=l.hasClass("on"),p=0,m=':not([data-item-type="RadioButton"],.spacing)';if(o.nextUntil(m).add(o.prevUntil(m)).each(function(){$(this).find(".radiobutton").hasClass("on")&&++p}),0<p&&c){l.removeClass("on");var v=local_storage.get("dialog");v.items["item-"+e].style.checked=!1,local_storage.set("dialog",v)}}}},
// @codekit-append "get.values.js";
// @codekit-append "set.values.js";
item.update={},item.update.style={},item.update.style.localStorage=function(e,t){var i=item.update.get_values(e);return t.items["item-"+t.activeId].style[e]=i[e],local_storage.set("dialog",t),t;// Changed data is force fed to the two functions below
},item.update.style.treeView=function(e,t,i){if("text"===e||"all"===e){var a=i.style.text;$('#panel-tree-view-wrap [data-item-id="'+i.id+'"] > .item-text').html(processItemName(a,i.type))}},item.update.style.dialogPreview=function(e,t,i){var a={property:e,value:i.style[e],data:t,dataItem:i};
// prop: 'all' is used when items are first created. After that the properties are edited individually.
"all"===e?$.each(i.style,function(e,t){a.property=e,a.value=t,item.update.set_values(a)}):item.update.set_values(a)},item.update.order=function(){
// Read old data from local storage....
var e=local_storage.get("dialog");
// Update order by re-recoding the id's of every single item currently in the tree view
e.order=item.get.order(),
// Write back to local storage...
local_storage.set("dialog",e)},item.update.get_values=function(e){var t={},i=$("#panel-edit-style-wrap"),a=i.find('[data-edit^="'+e+'"]');switch(e){case"text":t.text=a.val();break;case"listItems":t.listItems=a.val();break;case"justify":t.justify=i.find('[data-edit^="justify"].active').data("value");break;case"margins":
// All sides share the same value.
// - single number value
if(0<i.find(".n-3-4.hidden").length)t.margins=parseInt(i.find(".margin-inputs .top").val(),10);else{var n=[];i.find('[data-edit="margins"]').each(function(){n.push(parseInt($(this).val(),10))}),t.margins=n}break;case"preferredSize":var d=parseInt(i.find("input.width").val(),10),o=parseInt(i.find("input.height").val(),10);t.preferredSize=[d,o];break;case"orientation":t.orientation=a.find("option:selected").val();break;case"spacing":t.spacing=parseInt(a.val(),10);break;case"alignChildren":var s=i.find('#align-children-horizontal[data-edit="alignChildren"] option:selected').val(),r=i.find('#align-children-vertical[data-edit="alignChildren"] option:selected').val();t.alignChildren=[s,r];break;case"alignment":!1===a.prop("disabled")?t.alignment=a.find("option:selected").val():t.alignment=null;break}
// console.table( data );
return t},
// Updates the Dialog preview look
item.update.set_values=function(e){var t=e.value,i=e.dataItem.type,a=e.dataItem.style,n=e.dataItem.id,d=$("#dialog .active"),o=d.find("> .padding-box");switch(e.property){
// TEXT
case"text":if("Dialog"===i)d.find("#dialog-title-bar div").text(t);else if("Panel"===i){var s=d.find("> .title");s.text(t),
// Makes sure the panel container is always wide enough to cover the title
o.css({minWidth:s.width()+22})}
// type === 'RadioButton' || type === 'Checkbox' || type === 'DropDownList'
else if(0<d.find("> label").length)d.find("label").text(t);else if("Tab"===i)d.parent().parent().find('> .tab-container [data-tab-id="'+n+'"]').text(t);else if("TreeItem"===i)d.find("> .item-wrap .text-container").text(t);else{var r=d.find(".text-container"),l=item.list[i.toLowerCase()](!1).multiline,c=t.indexOf("\n");
// #U7FTZMRVYxVqiArfdgQeQjMRpx6R → dialog.scss
// Multiline text yo!
// Visually locks multiline text alignment to left
r.removeClass("multiline"),l&&0<c&&r.addClass("multiline"),r.text(t)}break;
// LIST ITEMS
case"listItems":"DropDownList"===i?
/*global droplist*/
/*eslint no-undef: ["error", { "typeof": true }] */
droplist.set(d,t,a):"ListBox"===i&&
/*global listbox*/
/*eslint no-undef: ["error", { "typeof": true }] */
listbox.set(d,t,a);break;
// CHECKED
case"checked":!0===t&&d.find("input").prop("checked",!0);break;
// JUSTIFY
case"justify":d.removeClass(function(e,t){return(t.match(/(^|\s)justify-\S+/g)||[]).join(" ")}).addClass("justify-"+e.value);break;
// MARGINS
case"margins":var p=t[0],m=t[1],v=t[2],u=t[3],f="object"!=typeof t,g=f?t:p,h=f?t:m,b=f?t:v,y=f?t:u;"Dialog"===i?o.css({paddingTop:g<=6?1:g,paddingRight:h<=1?1:h,paddingBottom:b<=1?1:b,paddingLeft:y<=1?1:y}):"Panel"===i||"Tab"===i?o.css({paddingTop:g<=3?3:g,paddingRight:h<=3?3:h,paddingBottom:b<=1?1:b,paddingLeft:y<=3?3:y}):o.css({paddingTop:g,paddingRight:h,paddingBottom:b,paddingLeft:y});break;
// PREFERRED SIZE
case"preferredSize":d.width("auto").height("auto");var w=d.width(),C=d.height(),x=0==t[0]?"auto":t[0]<w?w:t[0],I=0==t[1]?"auto":t[1]<C?C:t[1];
// Special treatment for Dropdownlist
if(d.css({width:x,height:I}),"DropDownList"===i){var k=d.find(".drop-list-wrap"),T=d.find("label");d.removeClass("too-big"),d.removeClass("too-small"),d.addClass("get-width");var S=d.width(),P=T.outerWidth(!0),_=k.outerWidth(!0);d.removeClass("get-width");var z=P+_;z<x?(d.addClass("too-big"),_<S&&k.width("auto")):x<z&&(d.addClass("too-small"),S<_&&k.width(S-16),d.parent().parent().hasClass("orientation-row")&&
// In this situation the label has position: absolute; so it doesn't respect the padding on the left side.
d.find("label").css({marginLeft:d.css("padding-left")}))}break;
// ORIENTATION
case"orientation":d.removeClass(function(e,t){return(t.match(/(^|\s)orientation-\S+/g)||[]).join(" ")}).addClass("orientation-"+t);break;
// SPACING
case"spacing":var D=d.find("> .padding-box"),j="> .padding-box";D.find("> style.spacing").remove();// Get rid of the old one.
var L=0,V=e.data.items["item-"+n].parentId;if(!1!==V)"column"===e.data.items["item-"+V].style.orientation&&(L=2);t+=L,$('<style class="spacing">#dialog [data-item-id="'+d.data("item-id")+'"].orientation-row '+j+" > div {padding-left: "+t+'px;}\n#dialog [data-item-id="'+d.data("item-id")+'"].orientation-row '+j+' > div:first-of-type {padding-left: 0px;}\n#dialog [data-item-id="'+d.data("item-id")+'"].orientation-column '+j+" > div {padding-top: "+t+'px;}\n#dialog [data-item-id="'+d.data("item-id")+'"].orientation-column '+j+" > div:first-of-type {padding-top: 0px;}</style>").appendTo(D);break;
// ALIGN CHILDREN
case"alignChildren":d.removeClass(function(e,t){return(t.match(/(^|\s)align-children-\S+/g)||[]).join(" ")}),d.addClass("align-children-horizontal-"+t[0]),d.addClass("align-children-vertical-"+t[1]);break;
// ALIGNMENT
case"alignment":if(d.removeClass(function(e,t){return(t.match(/(^|\s)alignment-\S+/g)||[]).join(" ")}),null!==t){var A="left"===t&&["left","top"]||"top"===t&&["left","top"]||"right"===t&&["right","bottom"]||"bottom"===t&&["right","bottom"]||[t,t];d.addClass("alignment-horizontal-"+A[0]),d.addClass("alignment-vertical-"+A[1])}break}};var tabbedPanel={onCreate:function(e){
// There's no point in having a tabbed panel with less than
// two items, so this section makes sure that when a tabbed
// panel is created, two child tabs are created as well.
if("loadFromLocalStorage"!==e&&"drag-duplicate"!==e){var t=$("#panel-tree-view-wrap"),i=t.find(".active"),a=i.data("item-id"),n={id:item.get.id(),type:"Tab",parentId:i.data("item-id"),target:i.find("> ul"),event:"parent-propagation"};item.funnel.create(n);// Filler tab N.1.
var d=t.find(".active").data("item-id");item.activate(a),n.id=item.get.id(),item.funnel.create(n),// Filler tab N.2.
item.activate(d)}
// Tab item is hidden in the "Add items" panel by default, because you don't need it unless you have a TabbedPanel in the document.
// There's no need for extra conditionals because this is triggered only after a tabbed panel is created, which is what happens on load or import when the dialog is reconstructed.
var o=$("#panel-new-item-wrap .tab");o.hasClass("show")||o.addClass("show")},
// Prevents dragging items to specific containers...
// True = Prevent dropping
onDragValid:function(e,t){var i=t.target.parent("li"),a=e.hasClass("tab"),n=i.hasClass("tabbedpanel");
// ITEMS
// True = Prevent dropping
// Dragging tab  + Target is not TPanel = NO DROPSIES
// Dragging !tab + Target is TPanel     = NO DROPSIES
return a&&!n||!a&&n},
// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels.
onClick:function(e,t){var i=t.data("item-type"),a=e.hasClass("tab"),n="TabbedPanel"===i,d=a&&!n||!a&&n;
// ITEMS
if(d){var o=$("#panel-edit-style-wrap .edit-info");o.removeClass("highlight-animation"),// Reset so that the animation can run again if user tries to add another item with similar issues.
setTimeout(function(){o.addClass("highlight-animation")},10)}return d}},tab={onCreate:function(e){if("Tab"===e.type){var t=$('#dialog [data-item-id="'+e.parentId+'"]'),i=t.find("> .tab-container");
// var tabItem = $('#dialog [data-item-id="'+ params.id +'"]');
$('<div class="tab" data-tab-id="'+e.id+'" contenteditable>'+e.style.text+"</div>").appendTo(i),tab.containerSort(t.find("> .padding-box > .tab"),i),item.activate(e.id);
// Build Item Properties panel
var a=local_storage.get("dialog");edit_style_panel.build(a.items["item-"+e.id].style)}},onActivate:function(e){var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]'),i=$('#dialog .tab-container [data-tab-id="'+e+'"]');
// Shows the green "active" color on the tab text...
if($("#dialog .currently-active-tab").removeClass("currently-active-tab"),i.addClass("currently-active-tab"),0<t.closest(".tabbedpanel").length){var a=local_storage.get("dialog");t.parentsUntil(".dialog").filter(".tab").add("Tab"===t.data("item-type")&&t).each(function(){var e=a.items["item-"+$(this).data("item-id")],t=a.items["item-"+$(this).data("item-parent-id")];tab.show(e,t),
// Write back to local storage
t.style.selection=e.id,local_storage.set("dialog",a)})}},show:function(e,t){$('#dialog [data-item-id="'+t.id+'"] > .tab-container [data-tab-id="'+e.id+'"]').addClass("visible").siblings().removeClass("visible"),$('#dialog [data-item-id="'+t.id+'"] > .padding-box > [data-item-id="'+e.id+'"]').addClass("visible-tab").siblings().removeClass("visible-tab")},onRemove:function(e,t){var i,a=local_storage.get("dialog");if("Tab"===t){i=e,$('#dialog div[data-tab-id="'+i+'"]').remove();var n=a.items["item-"+e];i=$('#panel-tree-view-wrap [data-item-id="'+n.parentId+'"] > ul > li:first').data("item-id"),$('#dialog [data-item-id="'+e+'"]').remove(),tab.onUpdate.init(a,i)}else 0<$('#dialog [data-item-id="'+e+'"]').closest(".tab").length&&(i=$('#dialog [data-item-id="'+e+'"]').closest(".tab").data("item-id"),$('#dialog [data-item-id="'+e+'"]').remove(),tab.onUpdate.init(a,i))},
// Makes sure the previous tabbed panel minimum
// dimensions don't include the moved item anymore
onStartSort:function(e){if(e.hasClass("tab")){$("body").addClass("dragging-tab");var t=e.data("item-id"),i=local_storage.get("dialog"),a=$('#dialog [data-item-id="'+t+'"]');a.addClass("tab-temp-hide-class"),tab.onUpdate.init(i,t),a.removeClass("tab-temp-hide-class")}},
// Remove dragged tab from the dialog preview. The next function (
// onDragSortDrop ) triggers update that makes sure it is all up to date.
// So even if you decide to drop it where you picked it up, it is put back.
onSort:function(e){var t=e.hasClass("tab"),i=e.hasClass("tabbedpanel");if(t||i||0<$('#dialog [data-item-id="'+e.data("item-id")+'"]').closest(".tab").length){$("body").removeClass("dragging-tab");var a=local_storage.get("dialog"),n=e.data("item-id"),d=a.items["item-"+n].parentId,o=$("#dialog"),s=o.find('[data-item-id="'+d+'"]'),r=s.find("> .tab-container");o.find('.tab-container [data-tab-id="'+n+'"]').appendTo(r);
// Sort the shelf
var l=s.find("> .padding-box > .tab");tab.containerSort(l,r),item.activate(n),
// Build Item Properties panel
edit_style_panel.build(a.items["item-"+n].style),
// Update
tab.onUpdate.init(a,n)}},containerSort:function(e,t){e.each(function(){var e=$(this).data("item-id");t.find('[data-tab-id="'+e+'"]').appendTo(t)})},onUpdate:{init:function(o,e){
// Start churning if updated item inside a tabbed panel...
// - Because any nested item can cause parents and the whole hecking family to bloat up
var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]');0<t.closest(".tabbedpanel").length&&t.parentsUntil(".dialog").filter(".tabbedpanel").each(function(){var e=o.items["item-"+$(this).data("item-id")],t=$('#dialog [data-item-id="'+e.id+'"]'),i=0,a=0;t.find("> .padding-box > .tab").each(function(){
// Makes current tab visible so that dimensions return properly.
// Siblings are also hidden...
$(this).addClass("tab-temp-class");var e=$(this).innerWidth(),t=$(this).innerHeight();$(this).removeClass("tab-temp-class"),
// Collect max dimensions...
i<e&&(i=e),a<t&&(a=t)});
// Sneak in the tab container width if it's bigger than the biggest tab container.
var n=t.find("> .tab-container"),d=n.width()+2*parseInt(n.css("margin-left"),10);i<d&&(i=d),
// Apply width and height to tabbed panel so that everything stays within limits and thinds don't jump around.
t.find("> .padding-box").css({minWidth:i,minHeight:a})})}}},treeView={onCreate:function(e){
// There's no point in having a treeview with less than
// two items, so this section makes sure that when it is
// created, two child items are created as well.
if("loadFromLocalStorage"!==e&&"drag-duplicate"!==e){var t=$("#panel-tree-view-wrap"),i=t.find(".active"),a=i.data("item-id"),n={id:item.get.id(),type:"TreeItem",parentId:i.data("item-id"),target:i.find("> ul"),event:"parent-propagation"};item.funnel.create(n);// Filler tab N.1.
var d=t.find(".active").data("item-id");item.activate(a),
// params.target = treeView.find('.active').find('> ul');
n.id=item.get.id(),item.funnel.create(n),// Filler tab N.2.
item.activate(d)}
// TreeViewItem item is hidden in the "Add items" panel by default, because you don't need it unless you have a TreeView item in the document.
// There's no need for extra conditionals because this is triggered only after a TreeView item is created, which is what happens on load or import when the dialog is reconstructed.
var o=$("#panel-new-item-wrap .treeitem");o.hasClass("show")||o.addClass("show")},
// Prevents dragging items to specific containers...
// True = Prevent dropping
onDragValid:function(e,t){var i=t.target.parent("li"),a=e.hasClass("treeitem"),n=i.hasClass("treeview"),d=i.hasClass("treeitem");
// ITEMS
// True = Prevent dropping
// Dragging item  + Target is not treeview or item = NO DROPSIES
// Dragging !item + Target is treeview or item     = NO DROPSIES
return a&&!n&&!d||!a&&(n||d)},
// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels. Silly humans...
onClick:function(e,t){var i=t.data("item-type"),a=e.hasClass("treeitem"),n="TreeView"===i,d="TreeItem"===i,o=a&&!n&&!d||!a&&(n||d);
// ITEMS
if(o){var s=$("#panel-edit-style-wrap .edit-info");s.removeClass("highlight-animation"),// Reset so that the animation can run again if user tries to add another item with similar issues.
setTimeout(function(){s.addClass("highlight-animation")},10)}return o}},treeViewItem={onClick:function(){$("#dialog").on("click",".tree-view-arrow",function(){var e=$(this).parent(".item-wrap").parent(".tree-view-item"),t=e.data("item-id"),i=local_storage.get("dialog"),a=i.items["item-"+t];treeViewItem.expand(i,a,e,!0)})},onSort:function(e,t,i){if("TreeItem"===t){$('#dialog [data-item-id="'+i+'"]').parent(".padding-box").parent(".tree-view-item").addClass("tree-node");
// Get rid of previous data
var a=$("#dialog .tree-node > .padding-box:empty").parent().removeClass("tree-node expanded");if(0<a.length){var n=a.data("item-id"),d=local_storage.get("dialog");delete d.items["item-"+n].expanded,local_storage.set("dialog",d)}}},onUpdate:function(e,t){if("TreeItem"===t.type){var i=$('#dialog [data-item-id="'+t.id+'"]');0<i.parent(".padding-box").parent(".tree-view-item").length&&i.parent(".padding-box").parent(".tree-view-item").addClass("tree-node"),treeViewItem.expand(e,t,i)}},expand:function(e,t,i,a){var n,d="expanded";if(!0!==a)n=t.expanded?"addClass":"removeClass";else{var o=i.hasClass(d);n=o?"removeClass":"addClass"}i[n](d),a&&(
// COLLAPSE
o?delete e.items["item-"+t.id].expanded:e.items["item-"+t.id].expanded=!0,local_storage.set("dialog",e))}};treeViewItem.onClick();var listbox={init:function(t,i){t.on("click","li",function(){var e=$(this);listbox.clickety(i,t,e)})},clickety:function(e,t,i){
// LIGHT SWITCH...
var a="selected",n=i.hasClass(a)?"removeClass":"addClass";i[n](a);
// GET ALL SELECTED ITEMS...
var d=[];t.find("li").each(function(){$(this).hasClass(a)&&d.push($(this).index())});
// WRITE SELECTION LOCAL STORAGE...
var o=local_storage.get("dialog");o.items["item-"+e].style.selection=d,local_storage.set("dialog",o)},set:function(e,t){var n=e.find("ul");n.children().remove();var i,a,d=t.split(","),o=local_storage.get("dialog"),s=o.items["item-"+o.activeId];
// Remove last selection if it's index is larger than the current list
void 0!==s.style.selection&&(i=s.style.selection,a=0,$.each(i,function(e,t){a<t&&(a=t)}),a>=d.length&&s.style.selection.pop(),local_storage.set("dialog",o)),
// Rebuild the list
$.each(d,function(e,t){var i=t.trim(),a=0<=$.inArray(e,s.style.selection);$("<li"+(a?' class="selected"':"")+"><span>"+i+"</span></li>").appendTo(n)})}};// This droplist has so many smoking mirrors... Practically all mirrors at this point... **FRAGILE**
// REMOVE (HIDE) LIST ON WINDOW RESIZE
// Because the opened up list is held in place via absolute positioning...
droplistOnWindowResize();var droplist={init:function(e,a){e.find(".drop-list-wrap").on("click",function(){
// THERE CAN BE ONLY ONE!!
$("#drop-list").remove();var i=$(this);if(i.hasClass("open"))droplist.hide();else{i.addClass("open");var e=droplist.inspector(a,i);droplist.makeList(a,i,e),$("#drop-list ul li").on("click",function(){var e=$(this),t=local_storage.get("dialog");t.items["item-"+a].style.selection=e.index(),local_storage.set("dialog",t),i.find(".selected").removeClass("selected"),i.find(".items").children().eq(e.index()).addClass("selected"),droplist.hide()})}
// Second click on the .drop-list-wrap...
})},backbone:function(e){var t=null,i=e.find(".items").children();i.each(function(){var e=$(this).width();t<e&&(t=e)}),
// listWrap.width( maxWidth );
i.width(t)},inspector:function(e,t){var i="",a=t.find(".selected").index();return t.find(".items").children().each(function(e){var t=$(this).text();i+='<li class="option'+("-"===t?" horizontal-line":"")+(e===a?" selected":"")+'">'+t+"</li>"}),i},makeList:function(e,t,i){var a=t.offset().top,n=t.offset().left,d=t.outerWidth(),o=t.outerHeight();$('<div id="drop-list"><ul>'+i+"</ul></div>").appendTo("#dialog-section");var s=$("#drop-list"),r=2*parseInt(s.css("border-left-width"),10),l=2*parseInt(s.css("padding-left"),10);s.css({top:a+o,left:n-($(window).width()-$("#dialog-overlay-wrap").width()),width:d-(r+l)})},set:function(e,t,d){var o=e.find(".items");o.children().remove();var s=!1;
// Rebuild the list
// Makes it so that if the selected item is removed, the selected item is swapped to the first item.
// This will prevent bunch of other issues...
if($.each(t.split(","),function(e,t){var i=t.trim(),a="-"==i?" horizontal-line":"",n=e===d.selection?' class="selected'+a+'"':"";s=e===d.selection,$("<div"+n+">"+i+"</div>").appendTo(o)}),!s){var i=local_storage.get("dialog");i.items["item-"+i.activeId].style.selection=0,local_storage.set("dialog",i),o.find("> div:first").addClass("selected")}var a=e.find(".drop-list-wrap");droplist.backbone(a)},hide:function(){$("#drop-list").remove(),$(".drop-list-wrap.open").removeClass("open")}},radiocheck={init:function(e,d,t){var o=this,i=e.find(".radiocheck");o.restore(e,d,t,i),i.on("click",function(){var e=$(this),t=local_storage.get("dialog"),i=t.items["item-"+d],a=e.hasClass("on");e[a?"removeClass":"addClass"]("on");var n=!a;
// RADIOBUTTON
e.is(".radiobutton")&&o.radio.clearSiblings(t,e),i.style.checked=n,local_storage.set("dialog",t)})},restore:function(e,t,i,a){!0===local_storage.get("dialog").items["item-"+t].style.checked&&a.addClass("on")},radio:{clearSiblings:function(a,e){var t=e.parent(),i=':not([data-item-type="RadioButton"],.spacing)';
// Clear all adjacent sibling radiobuttons...
t.nextUntil(i).add(t.prevUntil(i)).each(function(){var e=$(this),t=e.data("item-id"),i=e.find(".radiocheck");e.hasClass("radiobutton")&&(i.removeClass("on"),a.items["item-"+t].style.checked=!1)})}}},addItemsPanel={init:function(){this.generateHTML(),
// CREATE NEW ITEM EVENT
$("#panel-new-item-wrap li").on("click",function(){var e=$("#panel-tree-view-wrap").find(".active"),t=e.data("parent"),i={id:item.get.id(),type:$(this).data("item-type"),parentId:t?e.data("item-id"):e.data("item-parent-id"),target:t?e.find("> ul"):e,event:"click"},a=tabbedPanel.onClick($(this),e,i),n=treeView.onClick($(this),e,i);a||n||item.funnel.create(i)})},generateHTML:function(){var i="";$.each(item.list,function(e){var t=item.list[e](!1);t.addPanelIconClass&&("above"===t.addPanelDivider&&(i+='<span class="gouping-divider"></span>'),i+='<li class="'+e+'" data-item-type="'+t.type+'"><i class="fas fa-info-circle failure-is-an-option"></i><i class="'+t.addPanelIconClass+'"></i><span>'+t.type+"</span></li>","below"===t.addPanelDivider&&(i+='<span class="gouping-divider"></span>'))}),i+='<div class="disabled-overlay"></div>',$("<ul>"+i+"<ul>").appendTo("#panel-new-item-wrap .contents")}};addItemsPanel.init();
// @codekit-append "html.js";
var edit_style_panel={build:function(e,t){var a=$("#edit-style-inner-container");a.html("");var i=$("#panel-tree-view-wrap .active").data("item-type").toLowerCase(),n=item.list[i](!1);if(!1===e)$("<div class='no-properties'>"+n.stylePropInfo+"</div>").appendTo(a);else{
// Generate edit panel structure
$.each(e,function(e,t){var i=panel_edit_style_html.init(e,t);void 0!==i&&i.appendTo(a)}),
// Style number inputs
numberInputs();var d=item.list[i](!1).defaultStyle.text,o=item.list[i](!1).multiline,s=$('#panel-edit-style-wrap [data-edit="text"]'),r=s.parent();
// Icon on the text container telling the user they can't add linebreaks to current item
!d||o||r.hasClass("is-not-multiline")||r.addClass("is-not-multiline"),
// Style dropdowns
$(".pretty-classic").prettyDropdown({classic:!0,customClass:"arrow triangle",selectedMarker:'<i class="fas fa-check"></i>'}),$("#panel-edit-style-wrap textarea").each(function(){
/*global autosize*/
/*eslint no-undef: ["error", { "typeof": true }] */
autosize(this)}),
// SELECT TEXT INPUT IN THE ITEM PROPERTIES PANEL
// If the item has default text, then try to select it. If it doesn't have default text, it never will.
// This check is used because when the textarea doesn't exist, there's nothing to focus in so it just basically does a site wide Cmd+A, which is not cool...
"dialog"!==t&&d&&(s.focus(),s.select())}var l=n.editInfo;l&&$('<div class="edit-info">'+l+"</div>").appendTo(a)}},panel_edit_style_html={
// Mayhaps in hindsight this wasn't the best way to build this html...
// but what is done is done. Honestly, I look at this and I'm like oh
// boy... I have absolutely no idea why I made it this way. My best
// defense is that everything in this project started as a prototype
// and I never could be arsed to make it in a sensible way after I had
// decided what I wanted from it. Once a lazy boy, always a lazy boy.
init:function(e,t){var i;switch(e){case"text":i=$('<h2 title="Initial text to be displayed in the control as the title, label, or contents, depending on the control type.">Text</h2><div class="edit-text-wrap"><div class="no-linebreaks-icon" title="This item does not support multiline, so no line breaks."><img src="assets/images/no-line-break-icon.svg" alt="" /></div><textarea data-edit="text" class="textarea">'+t+"</textarea><div>");break;case"listItems":i=$('<h2 title="The array of choice items displayed in the drop-down or pop-up list.">List Items<span class="desc"> (Comma separated)</span></h2><textarea data-edit="listItems" class="textarea">'+t+"</textarea>");break;case"justify":(i=$('<div class="justify-container"><h4>Justify:</h4><div class="justify-icon-wrap"><div class="justify-icon" data-edit="justify" data-value="left"><i class="icon fas fa-align-left"></i></div><div class="justify-icon" data-edit="justify" data-value="center"><i class="icon fas fa-align-center"></i></div><div class="justify-icon" data-edit="justify" data-value="right"><i class="icon fas fa-align-right"></i></div></div></div>')).find('[data-value="'+t+'"]').addClass("active");break;case"margins":var a="object"!=typeof t;i=$('<h2 title="The number of pixels between the edges of a container and the outermost child elements. \n\nYou can specify different margins for each edge of the container. The default value is based on the type of container, and is chosen to match the standard Adobe UI guidelines.">Margins<div class="link-icon '+(a?"active":"")+'" title="Adjust each side individually..."><i class="fas fa-unlock-alt"></i><i class="fas fa-lock-open"></i></div></h2><span class="desc margins-desc '+(a?"hide":"")+'"><span>top</span><span>right</span><span>bottom</span><span>left</span></span><div class="margin-inputs"><input class="number" style="display: none;"><div class="n-1-4"><input data-edit="margins" class="number top" value="'+(a?t:t[0])+'" min="0" max="300" step="1" modifier-step="10"></div><div class="n-3-4 '+(a?"hidden":"")+'"><input data-edit="margins" class="number right" value="'+(a?t:t[1])+'" min="0" max="300" step="1" modifier-step="10"'+(a?"disabled":"")+'><input data-edit="margins" class="number bottom" value="'+(a?t:t[2])+'" min="0" max="300" step="1" modifier-step="10"'+(a?"disabled":"")+'><input data-edit="margins" class="number left" value="'+(a?t:t[3])+'" min="0" max="300" step="1" modifier-step="10"'+(a?"disabled":"")+'></div><input class="number" style="display: none;"></div>');break;case"preferredSize":i=$(
// '<h2 title="The preferred size, used by layout managers to determine the best size for each element. \n\nIf not explicitly set by a script, value is established by the UI framework in which ScriptUI is employed, and is based on such attributes of the element as its text, font, font size, icon size, and other UI framework-specific attributes. A script can explicitly set preferredSize before the layout manager is invoked in order to establish an element size other than the default.">' +
// 	'Preferred Size' +
// '<h2 title="The minimum height and width to which the element can be resized.">' +
// 	'Minimum Size' +
'<h2 title="If item is a parent, the exported code will use preferredSize and if the item is not a parent, minimumSize is used.">Size<span class="preferred-size-auto" title="Reset to content size (0)"><i class="fas fa-compress"></i></span></h2><div class="dimensions-container linked"><input class="number" style="display: none;"><h4 class="width-heading">Width:</h4><input class="number width" data-edit="preferredSize" value="'+t[0]+'" min="0" max="2000" step="1" modifier-step="10"><h4 class="height-heading">Height:</h4><input class="number height" data-edit="preferredSize" value="'+t[1]+'" min="0" max="2000" step="1" modifier-step="10"><input class="number" style="display: none;"></div>');break;case"orientation":(
// For future reference: I should've probably added a parent container
// for both orientation and spacing, so that I can then seat them
// next to each other easily. I wrote the prototype html this way
// as I was figuring out how to position everything and well here we
// are. This should never become an issue, since they are both parent
// element properties, so they are always together... So yea... as it
// is, "orientation" creates the heading for "spacing". Deal with it.
i=$('<h2 class="orientation-heading" title="The layout orientation of children in a container.">Orientation</h2><h2 class="spacing-heading" title="The number of pixels separating one child element from its adjacent sibling element. \n\nBecause each container holds only a single row or column of children, only a single spacing value is needed for a container. The default value is based on the type of container, and is chosen to match standard Adobe UI guidelines.">Spacing</h2><br><div class="orientation"><select name="qty" class="pretty-classic" data-edit="orientation"><option>row</option><option>column</option></select></div>')).last().find('option:contains("'+t+'")').prop("selected",!0);break;case"spacing":
// Confused? read the comment above...
i=$('<input class="number" style="display: none;"><div class="spacing-container"><input class="number" data-edit="spacing" value="'+t+'" min="0" max="300" step="1" modifier-step="5"></div><input class="number" style="display: none;">');break;case"alignChildren":var n=$("#dialog .active").hasClass("orientation-column");i=$('<h2 title="Tells the layout manager how unlike-sized children of this container should be aligned within a column or row. \n\nOrder of creation determines which children are at the top of a column or the left of a row; the earlier a child is created, the closer it is to the top or left of its column or row. If defined, alignment for a child element overrides the alignChildren setting for the parent container. See alignment property for values.">Align Children</h2><div class="align-children"><select id="align-children-horizontal" data-edit="alignChildren" name="qty" class="pretty-classic"><option>left</option><option>center</option><option>right</option>'+(n?"<option>fill</option>":"")+'</select><select id="align-children-vertical" data-edit="alignChildren" name="qty" class="pretty-classic"><option>top</option><option>center</option><option>bottom</option>'+(n?"":"<option>fill</option>")+"</select></div>");
// var horizontalValue = !isColumn && value[0] === 'fill' ? 'center' : value[0];
// var verticalValue   =  isColumn && value[1] === 'fill' ? 'center' : value[1];
var d=t[0],o=t[1];i.find('#align-children-horizontal option:contains("'+d+'")').prop("selected",!0),i.find('#align-children-vertical option:contains("'+o+'")').prop("selected",!0);break;case"alignment":var s,r=$("#dialog .active").parent("div").parent("div").hasClass("orientation-column"),l=r?"column":"row",c=r?"horizontal":"vertical",p=null===t,m=r?["left","center","right","fill"]:["top","center","bottom","fill"],v="";$.each(m,function(e,t){v+='<option value="'+t+'">'+t+"</option>"}),i=$('<div class="alignment-container"><h2 title="The alignment style for this element. If defined, this value overrides the alignChildren setting for the parent container.">Alignment <span>(Self)</span></h2><div class="alignment-checkbox"><input type="checkbox" id="alignment-checkbox-input" name="" '+(p?"":"checked")+' /><label for="alignment-checkbox-input"></label></div><br>'+('<div id="alignment-'+c+'"><select name="qty" class="pretty-classic" data-edit="alignment"  data-edit-value="'+c+'" '+(p?"disabled":"")+" >"+v+"</select></div>")+"</div>"),"column"===l?(s=("top"===t?"left":"bottom"===t&&"right")||t,i.find('#alignment-horizontal option:contains("'+(null===t?"center":s)+'")').prop("selected",!0)):(s=("left"===t?"top":"right"===t&&"bottom")||t,i.find('#alignment-vertical option:contains("'+(null===t?"center":s)+'")').prop("selected",!0));break}return i}},propsPanel=$("#panel-edit-style-wrap");
// EDIT PANEL CLICK EVENTS
// JUSTIFY
propsPanel.on("click",".justify-icon",function(){$(this).addClass("active").siblings().removeClass("active")}),
// ALIGNMENT POWER STATE TOGGLE → ON / OFF
propsPanel.on("change",".alignment-checkbox input",function(){var e=$(this).prop("checked"),t=!e,i=e?"removeClass":"addClass";$(".alignment-container select").prop("disabled",t).trigger("change"),$(".alignment-container .prettydropdown")[i]("disabled")}),
// PREFERRED SIZE → RESET BACK TO 0 (content size)
propsPanel.on("click",".preferred-size-auto",function(){var e=propsPanel.find("input.width");e.val(0).change(),propsPanel.find("input.height").val(0).change(),item.funnel.update(e.data("edit"))}),
// MARGINS TOGGLE → ALL SIDES / TOP, RIGHT, BOTTOM, LEFT
propsPanel.on("click",".link-icon",function(){var e=$(".margin-inputs .n-3-4");e.hasClass("hidden")?($(this).removeClass("active"),e.removeClass("hidden"),e.find("input").prop("disabled",!1).val($(".margin-inputs .n-1-4 input").val()),$("#panel-edit-style-wrap .margins-desc").removeClass("hide")):($(this).addClass("active"),e.addClass("hidden"),e.find("input").prop("disabled",!0),$("#panel-edit-style-wrap .margins-desc").addClass("hide"))}),
// ***********************
// UPDATE ITEM PROPERTIES
// ***********************
propsPanel.on("keydown",'[data-edit="text"]',function(e){return lineBreakIntercept(e)}),propsPanel.on("keyup",'[data-edit="text"]',function(e){18!=(e.keyCode?e.keyCode:e.which)&&// Update if alt is released.
item.funnel.update($(this).data("edit"))}),propsPanel.on("keyup",'[data-edit="listItems"]',function(){item.funnel.update($(this).data("edit"))}),propsPanel.on("click",'[data-edit="justify"]',function(){item.funnel.update($(this).data("edit"))}),propsPanel.on("change","select[data-edit]",function(){if("orientation"===$(this).data("edit")){var e="column"===$(this).find("option:selected").val(),t=$("#align-children-horizontal"),i=$("#align-children-vertical");e?(i.find("option:contains(fill)").remove(),$("<option>fill</option>").appendTo(t)):(t.find("option:contains(fill)").remove(),$("<option>fill</option>").appendTo(i)),$("#panel-edit-style-wrap .align-children select").each(function(){$(this).clone().appendTo("#panel-edit-style-wrap .align-children")}),$("#panel-edit-style-wrap .align-children .prettydropdown").remove(),$("#panel-edit-style-wrap .align-children .pretty-classic").each(function(){$(this).trigger("change"),$(this).prettyDropdown({classic:!0,customClass:"arrow triangle",selectedMarker:'<i class="fas fa-check"></i>'})})}item.funnel.update($(this).data("edit"))});var mousemovePing,local_storage={set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){return JSON.parse(localStorage.getItem(e))},remove:function(e){localStorage.removeItem(e)}},loadingScreen={init:function(e,t){$('<div id="loader-bg"><div class="loader">Loading...</div></div>').appendTo("body"),$("#loader-bg").backstretch([{url:"./assets/images/bg.jpg",alignX:"center"}]),setTimeout(function(){t()},this.secondsToMilliseconds(e))},secondsToMilliseconds:function(e){return 1e3*e}};setInterval(function(){mousemovePing=!0},45);var bgTimeout,iconTimeout,modal={init:function(e){modal.make(e),$("#modal-window-overlay").on("click",function(){modal.remove()})},make:function(e){e=void 0===e?"":e,$('<div id="modal-window"><div id="modal-window-overlay" data-esc></div><div id="modal-window-content" class="animated fadeIn">'+e+"</div></div>").appendTo("body"),$("body").addClass("modal-window-active")},remove:function(){$("#modal-window-content").addClass("fadeOut"),setTimeout(function(){$("#modal-window").remove(),$("body").removeClass("modal-window-active")},100)}};$(document).on("keydown",function(e){if(0<$("#modal-window").length){var t=e.keyCode?e.keyCode:e.which,i=13===t;27===t?$("#modal-window").find("[data-esc]").trigger("click"):i&&$("#modal-window").find("[data-enter]").trigger("click")}}),
// IMPORT EVENT
$("#toolbar .export").on("click",function(){modal.init('<div id="export-box"><h2>Export.jsx</h2><div class="code"></div><div class="btns"><div class="download btn animated fadeInDown"><div class="icon"><i class="fas fa-check animated"></i><i class="fas fa-download"></i></div> <span>Download</span></div><div class="copy btn animated fadeInDown"><div class="icon"><i class="fas fa-check animated"></i><i class="fas fa-times animated"></i><i class="fas fa-clipboard-list"></i></div> <span>Copy to Clipboard</span></div></div></div>');
/*global CodeMirror*/
/*eslint no-undef: ["error", { "typeof": true }] */
var e=CodeMirror($("#export-box .code")[0],{mode:{name:"javascript",json:!0},theme:"monokai",autofocus:!0,lineNumbers:!0,
// I really wanted to used this to avoid the sideways scrolling, but even with
// a few items the JSON gets super bulky at the top, so... no wrappity wraps...
// lineWrapping: true,
value:exportCode()}),t=$(window).height(),i=$("#export-box"),a=i.height();
// This section makes sure the #export-box doesn't spill past the viewport
if(t<a+60){var n=$(window).height()-(a-i.find(".CodeMirror").height());i.find(".code").css({maxHeight:n-160})}clipBoardEvent(e),i.find(".download").on("click",function(){
/*global download*/
/*eslint no-undef: ["error", { "typeof": true }] */
download(exportCode(),"ScriptUI Dialog Builder - Export.jsx","application/javascript");var e=$(this),t=e.find(".fa-check"),i=e.find(".fa-download");t.addClass("rotateIn"),i.hide(),setTimeout(function(){t.removeClass("rotateIn"),i.show()},750)})}),
// IMPORT EVENT
$("#toolbar .import").on("click",function(){var d,o;modal.init('<div id="import-box"><h2>Import.jsx</h2><div class="ta"><div class="placeholder"><span class="important">The current dialog will be overwritten on a successful import.</span> <br><br>You can only import JSON generated by this this tool on export. 3rd line of every export includes the impotable JSON. Your old dialog code written in Javascript will <strong>not</strong> work! <br><br>Valid JSON is beautified (restructured) on paste <br> so that it is easier to read if necessary. <br></br><strong>Paste below</strong> <br><strong>↓</strong></div><div class="code"></div></div><div data-enter class="import-btn animated infinite"><i class="fas fa-arrow-right"></i><i class="fas fa-times"></i></div></div>'),(o=CodeMirror($("#import-box .code")[0],{mode:{name:"javascript",json:!0},theme:"monokai",autofocus:!0,lineNumbers:!0})).on("change",function(e,t){if("paste"===t.origin)
/*eslint no-empty: "error"*/
try{
// Poor man's 'beautify' on paste
var i=o.getValue();d=i;var a=JSON.parse(i),n=JSON.stringify(a,null,3);o.getDoc().setValue(n)}catch(e){
// continue regardless of error
}
// This section makes sure the #export-box doesn't spill past the viewport
setTimeout(function(){var e=$(window).height(),t=$("#import-box"),i=t.height();if(e<i+60){var a=$(window).height()-(i-t.find(".CodeMirror").height()),n=a-160,d=e<n?a-20:n;t.find(".code").css({maxHeight:d})}},10)}),$("#import-box").find(".import-btn").on("click",function(){
/*eslint no-empty: "error"*/
var e;try{var t=d.trim();e=JSON.parse(t)}catch(e){
// continue regardless of error
}
// Failed to parse JSON
if(void 0===e){
// Show a red X telling the used it failed for what ever reason....
var i=$("#import-box");i.find(".fa-arrow-right").hide(),i.find(".import-btn").addClass("tada"),setTimeout(function(){i.find(".fa-arrow-right").show(),i.find(".import-btn").removeClass("tada")},1900)}
// JSON parsed succesfully
else local_storage.remove("dialog"),local_storage.set("dialog",e),modal.remove(),loadingScreen.init(1.5,function(){location.reload()})})}),
// RESET EVENT
$("#toolbar .reset").on("click",resetDialog),$(".grey-out-active").on("click",function(){$(this).hasClass("off")?($(this).removeClass("off"),$("#dialog").removeClass("hide-active"),notification("info","Active item highlighted in the dialog preview.",3.5)):($(this).addClass("off"),$("#dialog").addClass("hide-active"),notification("meh","Active item grayed out in the dialog preview.",3.5))}),
// Very sophisticated notification system.
// Check out our kickaster at verysophisticatednotificationsystem.gov
// Press that like button and subscribe...
// Make parent container
$('<div id="notifications-wrap"></div>').appendTo("#dialog-overlay-wrap"),
// var shortcuts = {
//   init: function() {
//
//   },
//
//   // Visual indicator so user knows he pressed a shortcut and something happened, probably...
//   flash: function() {
//
//   }
//
// };
// GLOBAL SHORTCUT(S)
$(document).on("keydown",function(e){69==(e.keyCode?e.keyCode:e.which)&&e.altKey&&$(".l-export").trigger("click")}),shortcutExport(),$(".panel-wrap .collapse").on("click",function(){var e=$(this).parent(),t=e.hasClass("collapse")?"removeClass":"addClass";e[t]("collapse"),$("#dialog-section").backstretch("resize")});
// CORE
// ****
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
// @codekit-prepend "dialog.builder/item.factory/special.items/tab.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.item.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/list.box.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/drop.list.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/radiocheck.js";
// PANELS
// ******
// @codekit-prepend "dialog.builder/panels/1.add.items.js";
// @codekit-append "dialog.builder/panels/2.structure.treeview.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/build.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/events.js";
// @codekit-append "dialog.builder/panels/4.dialog.preview.js";
// MISCELLANEOUS
// *************
// @codekit-prepend "dialog.builder/modules/local.storage.js";
// @codekit-prepend "dialog.builder/modules/loading.screen.js";
// @codekit-prepend "dialog.builder/modules/number.input.js";
// @codekit-prepend "dialog.builder/modules/modal.window.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export.js";
// @codekit-prepend "dialog.builder/modules/toolbar/import.js";
// @codekit-prepend "dialog.builder/modules/toolbar/reset.js";
// @codekit-prepend "dialog.builder/modules/custom.cursor.js";
// @codekit-prepend "dialog.builder/modules/toggle.active.visibility.js";
// @codekit-prepend "dialog.builder/modules/notifications.js";
// @codekit-prepend "dialog.builder/modules/legend.js";
// @codekit-prepend "dialog.builder/modules/panels.collapse.js";
var data=local_storage.get("dialog");
// START FROM NOTHING...
if(null===data){var params={id:0,type:"Dialog",parentId:!1,target:$("#panel-tree-view-wrap .contents"),event:"load"};item.funnel.create(params)}
// REBUILD FROM EXISTING LOCAL STORAGE DATA...
else{
// Don't mind me adding a little duct tape...
// Saw this weird error where I came back to a built dialog after
// a day and somehow the last id was missing in the order array.
// That id was the active id and it was also in the list of items,
// so hopefully this puts it back without creating more issues...
$.inArray(data.activeId,data.order)<0&&data.order.push(data.activeId);var oldActiveId=data.activeId;$.each(data.order,function(e,t){var i=data.items["item-"+t],a=$("#panel-tree-view-wrap"),n={id:t,type:i.type,parentId:i.parentId,target:0===t?a.find(".contents"):a.find('[data-item-id="'+i.parentId+'"] > ul'),event:"loadFromLocalStorage"};item.funnel.create(n)}),
// Update preferred size now that all items/elements are created
$.each(data.order,function(e,t){void 0!==data.items["item-"+t].style.preferredSize&&(item.activate(t),item.update.style.dialogPreview("preferredSize",data,data.items["item-"+t]))}),
// Reactivate the ye olde active item
item.activate(oldActiveId);
// Build Item Properties panel
var oldItem=data.items["item-"+oldActiveId];edit_style_panel.build(oldItem.style)}var treeElem=$("#panel-tree-view-wrap"),dialog=$("#dialog");
// So you can easily show parent items on hover without having to activate it
$("#panel-tree-view-wrap").on("mouseenter mouseleave",".item-text",function(e){var t=$(this).parent("li"),i=t.data("item-id"),a=dialog.find('[data-item-id="'+i+'"]');"Tab"===t.data("item-type")&&(a=dialog.find('[data-tab-id="'+i+'"]')),"mouseenter"===e.type?a.addClass("ghosting"):a.removeClass("ghosting")}),
// TREEVIEW NEW ITEM ACTIVATE CLICK EVENT
treeElem.on("click",".item-text",function(){var e=$(this).parent("li").data("item-id");item.activate(e);
// Build Item Properties panel
var t=local_storage.get("dialog");edit_style_panel.build(t.items["item-"+e].style)}),
// REMOVE ICON CLICK EVENT
treeElem.on("click",".remove-item",function(){var e=$(this).parent("li").data("item-id");0===e?resetDialog():item.funnel.remove(e)});var treeRootUl=$("#panel-tree-view-wrap .tree-root > ul"),treeDialog=$("#panel-tree-view-wrap .tree-dialog");
// TREEVIEW DRAG EVENT
treeRootUl.sortable({group:"dialog-items",
// exclude: ".disabled",
vertical:!0,
// distance: 4,
delay:100,
// I didn't do a huge amount of testing, but it seems setting a minus
// tolerance helped with a problem when using the 'isValidTarget' function.
tolerance:-3,isValidTarget:function(e,t){var i=tabbedPanel.onDragValid(e,t),a=treeView.onDragValid(e,t);
// TRUE = Droppable
// FALSE = No dropsies
return!i&&!a},onDragStart:function(e,t,i,a){
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
if(
// Gives the container a static width to prevent size from changing as
// soon as you remove something by dragging. This width is removed onDrop.
treeDialog.width(treeDialog.width()),0<e.find(".item-text").length){
// Make a clone in the place of the original...
e.clone().insertAfter(e).addClass("dolly");//.addClass('dolly duplicate-parent');
var n=$("#panel-tree-view-wrap .dolly");
// dolly.find('[data-parent="true"]').addClass('duplicate-parent');
tab.onStartSort(e),
// DUPLICATE ITEMS
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
a.altKey?$("body").addClass("duplicate-item"):n.addClass("sort-temp-item")}
// MAKE NEW ITEM
// DRAGGING FROM THE ADD PANEL TO THE TREE VIEW PANEL
else t.options.drop||e.clone(!0).insertAfter(e);i(e,t)},onDrop:function(e,t,i){if(
// The width is made static onDragStart making things
// less jumpy. This normalizes the container width.
treeDialog.width("auto"),0<t.target.closest("#panel-new-item-wrap").length)e.remove();else{var a=0<e.find(".item-text").length,n=$("body").hasClass("duplicate-item");
// REGULAR SORT
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
a&&!n?item.drag.sort(e):a&&n?item.drag.duplicate(e,t):item.drag.make(e),
// Tabs already get activated on drag, so I figured I should do the same for all items...
item.activate(e.data("item-id"))}i(e,t)}}),
// ADD ITEMS BY DRAGGING THEM INTO THE TREE VIEW
// The events are handled in the function above
$("#panel-new-item-wrap ul").sortable({drop:!1,group:"dialog-items"}),item.drag={},
// *********************************
// DRAG - SORT ITEM(S) (onDrop)
// *********************************
item.drag.sort=function(e){$("#panel-tree-view-wrap .sort-temp-item").remove();var t=e.parent("ul").parent("li").data("item-id"),i=e.prev(),a=0<i.length?"insertAfter":"prependTo",n=0<i.length?i.data("item-id"):t;e.attr("item-parent-id",t),e.data({"item-parent-id":t});var d=e.data("item-type"),o=e.data("item-id");item.funnel.sort(o,t,d,a,n),tab.onSort(e),treeViewItem.onSort(e,d,o)},
// *********************************
// DRAG - MAKE NEW ITEM (onDrop)
// *********************************
item.drag.make=function(e){var t=e.prev(),i=e.parent("ul"),a=t.length<1,n=t.data("parent"),d=a?i:t,o={id:item.get.id(),// Picked up in the function onDragStart.
type:e.data("item-type"),parentId:a?i.parent("li").data("item-id"):t.data("item-parent-id"),// Fetch parent id from the previous item. If it doesn't exist, fetch id from the parent item.
target:d,previousIsParent:n,event:"drag"};// Traget previous item. If it doesn't exist, target parent item.
e.remove(),// Item is the dragged li from the "Add Items" panel
item.funnel.create(o)},
// **************************************
// DRAG - DUPLICATE ITEM(S) (onDrop)
// **************************************
item.drag.duplicate=function(e,d){var t=e.prev(),i=e.parent("ul"),a=t.length<1,o=t.data("parent"),s=a?i:t;// Target previous item. If it doesn't exist, target parent item.
// Dolly becomes a real sheep by way of eliminating the original
$("#panel-tree-view-wrap .dolly").removeClass("dolly"),e.remove(),$("body").removeClass("duplicate-item");// The function of this class is to change the cursor
var r,l=local_storage.get("dialog"),c=$("#panel-tree-view-wrap"),p=Math.abs(e.data("item-id")-item.get.id());
// Dragged item and every child with data-item-id attribute
e.find("[data-item-id]").add(e).each(function(e){var t=$(this).data("item-id"),i=l.items["item-"+t],a=0===e?d.target.parent("li").data("item-id"):i.parentId+p,n={id:item.get.id(),type:i.type,parentId:a,target:0===e?s:c.find('[data-item-id="'+a+'"] > ul'),event:0===e?"drag-duplicate":"loadFromLocalStorage",previousIsParent:o,sourceId:t};0===e&&(r=n.id),item.funnel.create(n)}),
// Reactivate the ye olde active item
item.activate(r);var n=(
// Build Item Properties panel
l=local_storage.get("dialog")).items["item-"+r];edit_style_panel.build(n.style),$("body").removeClass("dragging")};var dialogElem=$("#dialog");
// ACTIVATE ITEMS WHEN FOCUSED IN DIALOG PREVIEW
dialogElem.on("focus","[contenteditable]",function(){var e=$(this),t=(e.parent().attr("id"),e.hasClass("tab")&&e.data("tab-id")||e.closest("[data-item-id]").data("item-id"));item.activate(t);
// Build Item Properties panel
var i=local_storage.get("dialog");edit_style_panel.build(i.items["item-"+t].style,"dialog")}),
// My man EditText needs some extra care to keep its public image.
dialogElem.on("focus blur",'[data-item-type="EditText"] [contenteditable]',function(e){"focusin"===e.type?$(this).parent().parent().addClass("focused"):dialogElem.find(".focused").removeClass("focused")}),dialogElem.on("click",'[data-item-type="EditText"]',function(e){e.preventDefault(),$(this).find("[contenteditable]").focus()}),
// MIRROR TEXT CHANGES TO EDIT PANEL FROM DIALOG CONTENTEDITABLE
dialogElem.on("keydown","[contenteditable]",function(e){return lineBreakIntercept(e)}).on("keyup","[contenteditable]",function(){var e=$(this).text().indexOf("\n");$(this).removeClass("multiline"),0<e&&$(this).addClass("multiline");var t=$('#panel-edit-style-wrap [data-edit="text"]');
// Properties panel is updated right here, and the funnel update below updates local storage + tree view
t.html($(this).text()),
// Keeps textbox height up to date with the content
autosize.update(t);item.funnel.update("text","dialog")}),
// DIALOG TITLE ELLIPSIS (input/contenteditable with ellipsis) FIX:
// Related code can be found in 'dialog-preview.scss' file. Search
// for: #5945573415 The css already gets rid of the ellipsis
// on focus, but that is only part of the problem. When user
// unfocuses, it comes back kinda wonky. I found that flashing
// normal whitespace and switching back to nowrap fixed it..
$("#dialog-title-bar div").on("blur",function(){var e=$(this);e.css({whiteSpace:"normal"}),setTimeout(function(){e.css({whiteSpace:"nowrap"})},.1)});