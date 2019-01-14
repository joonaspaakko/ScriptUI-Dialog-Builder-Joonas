// TEXT INFO THAT IS USED FOR MULTIPLE ITEMS
function breadCrumbs(e,t){
// Burn it all!!
e.find(".active-parent").removeClass("active-parent"),t.parentsUntil(".dialog.tree-root").filter('[data-parent="true"]').addClass("active-parent")}
// Just don't jump in the witch's oven...
function lightThePath(e,t){if(
// Burn it all!! Okay... Maybe not the best word choice there...
$(".path-node").removeClass("path-node"),$(".path-item").removeClass("path-item"),$(".path-sibling-node").removeClass("path-sibling-node"),$(".path-end").removeClass("path-end"),$(".path-start").removeClass("path-start"),$(".path-start-last").removeClass("path-start-last"),$(".path-start-node").removeClass("path-start-node"),$(".path-parent-ul").removeClass("path-parent-ul"),"Dialog"!==t.data("item-type")){e.find(".active-parent").first().addClass("path-end");
// PATH END
var i=t;i.next().length<1?i.addClass("path-start-last"):i.data("parent")?i.addClass("path-start-node"):i.addClass("path-start"),e.find(".active-parent:not(:first)").addClass("path-node").add(i).each(function(){$(this).prevUntil(":first").each(function(){$(this).data("parent")?($(this).addClass("path-sibling-node"),$(this).parent("ul").addClass("path-parent-ul")):$(this).addClass("path-item")})})}}function droplistOnWindowResize(){$(window).on("resize",function(){droplist.hide()})}// Defines how fast the number updates while dragging.
function numberInputs(){function r(e,t,i,a){var n=e.val();if(isNaN(n))e.val(p);else{n=parseInt(n,10);
// var active     = $('#dialog .active'),
// 		contWidth  = active.width(),
// 		widthInput = numberElement.hasClass('width'),
// 		contHeight = active.height(),
// 		heightInput = numberElement.hasClass('height');
// if (
// 	number === 0 && numberElement.hasClass('danger-zone') ||
// 	widthInput && number >= contWidth && numberElement.hasClass('danger-zone') ||
// 	heightInput && number >= contHeight && numberElement.hasClass('danger-zone')
// ) {
// 	numberElement.removeClass('danger-zone');
// }
// else if (
// 	widthInput && number < contWidth && !numberElement.hasClass('danger-zone') ||
// 	heightInput && number < contHeight && !numberElement.hasClass('danger-zone')
// ) {
// 	numberElement.addClass('danger-zone');
// 	// notification( 'error', "The current size you've set is smaller than the item's contents. <br> The size you're set will be is included in the export", 6.5 );
// }
var d={min:parseInt(e.attr("min"),10),max:parseInt(e.attr("max"),10),step:a||parseInt(e.attr("step"),10),modifierStep:parseInt(e.attr("modifier-step"),10)},r=(i?d.modifierStep:d.step)||1,l=n<d.min,o=n>d.max,s=l||o;switch(t){case"blur":if(s){var c=l&&d.min||o&&d.max;e.val(c)}break;case"up":n<d.max&&(n=n+r>d.max?d.max:n+r,e.val(n),p=n);break;case"down":n>d.min&&(n=n-r<d.min?d.min:n-r,e.val(n),p=n);break}}item.funnel.update(e.data("edit"))}$(".number").wrap('<div class="number-wrap">');var p,e=$(".number-wrap");$('<div class="arrow plus"></div><div class="arrow minus"></div><div class="number-overlay"></div>').appendTo(e);var t=e.find(".number"),i=e.find(".number-overlay");t.each(function(){"none"===$(this).css("display")&&$(this).closest(".number-wrap").addClass("hide")});var l,o,s=!1,c=0,m=null,f=null;$(window).on("mousedown mousemove mouseup",function(e){if("mousedown"===e.type)s=!0,l=$(e.target).parent(),o=l.find("> .number");else if("mousemove"===e.type){if(s&&mousemovePing&&o.hasClass("number")){
// if ( dragStartElement.data('edit') === 'margins' ) {
// 	$('body').addClass('dragging-margins');
// }
// dragWrapper.find('.number-overlay').css({ position: 'fixed' });
if(mousemovePing=!1,e.preventDefault(),null===m)return m=Date.now(),void(f=e.screenY);var t=Date.now(),i=t-m,a=e.screenY-f,n=Math.abs(Math.round(a/i*(e.shiftKey?200:40))),d=4<n?n:0;// Poor mans slow start...
m=t,f=e.screenY,e.pageY<c?r(o,"up",e.shiftKey,d):e.pageY>c&&r(o,"down",e.shiftKey,d),c=e.pageY}}else if("mouseup"===e.type){
// dragStartElement.removeClass('danger-zone');
// dragWrapper.find('.number-overlay').css({ position: 'absolute' });
s&&o.length;s=!1}}),
// I tried to emulate native functionality by making it so that
// single click simply places the caret and double click selects the
// text, but ended up leaving that out. I liked it better that the
// text gets selected however you click.
// var overlay_dblclick = true;
// The overlay is there to prevent weird text selection stuff when dragging, but
// that in turn makes it so that you can't directly focus on the input.
// With this, clicking the overlay will result in the same thing.
i.on("click",function(){$(this).parent().find(".number").focus()}),t.on("focus blur",function(e){var t=$(this);"focus"===e.type?(p=$(this).val(),
// if ( overlay_dblclick === true ) {
$(this).select()):r(t,"blur")}),e.find(".arrow").on("click",function(e){var t=$(this),i=t.parent().find(".number");t.hasClass("plus")?r(i,"up",e.shiftKey):t.hasClass("minus")&&r(i,"down",e.shiftKey)}),t.on("keyup",function(e){var t=e.keyCode?e.keyCode:e.which,i=$(this);// Arrow Up
r(i,38===t?"up":40===t?"down":"numberEntry",e.shiftKey)})}function exportCode(){var e=local_storage.get("dialog");return"/* \nCode for Import https://scriptui.joonas.me — (Triple click to select): \n"+JSON.stringify(e)+"\n*/ \n\n"+getJSX(e)+"dialog.show();"}function clipBoardEvent(n){
/*global ClipboardJS*/
/*eslint no-undef: ["error", { "typeof": true }] */
var e=new ClipboardJS(".btn.copy",{text:function(){return n.getValue()}});e.on("success",function(e){var t=$(e.trigger),i=t.find(".fa-check"),a=t.find(".fa-clipboard-list");i.addClass("rotateIn"),a.hide(),setTimeout(function(){i.removeClass("rotateIn"),a.show()},750)}),e.on("error",function(e){var t=$(e.trigger),i=t.find(".fa-times"),a=t.find(".fa-clipboard-list");i.addClass("tada"),a.hide(),setTimeout(function(){n.execCommand("selectAll"),i.removeClass("tada"),a.show()},750)})}function getJSX(c){var p="",m={},f={dialog:"",tab:""},// Can't remember why I added tab here, but oh well. Let's not mess with this jenga tower.
u={name:"",parent:""},g=[];// JUST DO IT
// Creates rest of the counters based on the "Add items" panel...
$("#panel-new-item-wrap ul li").each(function(){f[$(this).data("item-type").toLowerCase()]=0});var e=$("#panel-tree-view-wrap .tree-dialog li"),v=e.length;return e.each(function(e){var t=e,i=$(this).data().itemId,a=c.items["item-"+i],n=a.parentId,d=0===n||!1===n?"Dialog":c.items["item-"+n].type,r=a.type,l=a.id,o=a.style,s=!1;e===v-1&&(s=!0),p+=makeJSXitem(t,c,f,m,r,l,n,d,o,u,g,s)}),p}
// When the item type is not a fitting variable name...
function customVarNames(e,t,i){var a;switch(e){case"dropdownlist":a="dropdown"+i[e];break;case"tabbedpanel":a="tpanel"+i[e];break;case"dialog":// This otherwise fine as is, I just forgot that dialog doesn't need the counters :/
a=e;break;default:a=e+i[e]}return a}function makeJSXitem(e,t,i,a,n,d,r,l,o,s,c,p){var m=[!1],f="",u=n.toLowerCase();++i[u];var g=customVarNames(u,l,i);a[d]=g;var v=a[r];
// If current item is a parent...
"TreeItem"!==n&&(item.list[n.toLowerCase()](!1).parent?(f+="// "+g.toUpperCase()+"\n",f+="// "+Array(g.length+1).join("=")+"\n"):s.parent!==v&&s.name!==v&&(f+="// "+v.toUpperCase()+"\n",f+="// "+Array(v.length+1).join("=")+"\n"));var h=$("#dialog");
// This is where each item is first added
switch(n){case"Dialog":f+="var "+g+' = new Window("'+u+'"); \n';break;case"ListBox":case"DropDownList":var y=o.listItems.split("\n").join("").split(",");$.each(y,function(e){y[e]=y[e].trim()}),f+="var "+g+'_array = ["'+y.join('","')+'"]; \n',f+="var "+g+" = "+a[r]+'.add("'+u+'", undefined, '+g+"_array",void 0!==o.selection&&"ListBox"===n&&1<o.selection.length&&(f+=", {multiselect: true}"),f+="); \n";break;case"Divider":f+="var "+g+" = "+a[r]+'.add("panel"); \n';break;case"TreeView":var b=h.find('[data-item-id="'+d+'"]'),w=0<o.preferredSize[0]?o.preferredSize[0]:Math.round(b.width()),x=0<o.preferredSize[1]?o.preferredSize[1]:Math.round(b.height());f+="var "+g+" = "+a[r]+'.add("'+n.toLowerCase()+'", [0,0,'+(w+0)+","+(x+0)+"]); \n";break;case"TreeItem":var C=h.find('[data-item-id="'+d+'"]').hasClass("tree-node")?"node":"item";f+="var "+g+" = "+a[r]+'.add("'+C+'", "'+o.text+'"); \n';break;case"StaticText":
// ScriptUI has issues with multiline text if you don't define both
// width and height. Let's say you only set width... what it appears to
// do is it creates the item, applies width and height to the bounds
// based on how ever the text flows as is and then it applies the
// width or height you wanted gave it... and that changes the text
// flow, often resulting in unnecessary whitespace below the text.
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Normally you could just give it a static width + height and call it a
// day... but because this is a separate web app that simulates the ScriptUI,
// not to mention all the differences between Adobe Applications... It's
// totally not a mirror image of ScriptUI. So my original bandaid was to
// give a static width and height on export aaand to also try and make the
// text pixel perfect, which proved to be impossible. Because of these small
// differences, the text will flow slightly differently. It's basically a
// gamble. It might look perfect... It might also get whitespace below the text
// or even worse... Some text might overflow the container and not show up.
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// To tackle this issue I basically split multiline text into multiple one line
// statictext items and place them in a group. Problem solved for static text.
// Since this operation is done on export, it doesn't affect the import JSON.
// Obviously it does make it harder to edit the text once it's been exported...
if((m=multilineCheck(d))[0]){var I="    ";
// ADD PARENT GROUP
// ALIGNMENT
if(f+="var "+g+" = "+a[r]+'.add("group"); \n',
// PREFERRED SIZE
void 0!==o.preferredSize&&(0<o.preferredSize[0]&&(f+=I+g+".preferredSize.width = "+o.preferredSize[0]+"; \n"),0<o.preferredSize[1]&&(f+=I+g+".preferredSize.height = "+o.preferredSize[1]+"; \n")),
// ORIENTATION
f+=I+g+'.orientation = "column"; \n',
// ALIGN CHILDREN
void 0!==o.justify&&(f+=I+g+'.alignChildren = ["'+o.justify+'","center"]; \n'),
// SPACING
f+=I+g+".spacing = 0; \n",null!=o.alignment){var S=t.items["item-"+r].style.orientation,k="";k="column"===S?("top"===o.alignment?"left":"bottom"===o.alignment&&"right")||o.alignment:("left"===o.alignment?"top":"right"===o.alignment&&"bottom")||o.alignment;var T=t.items["item-"+r].style.alignChildren;k="column"===S?'["'+k+'","'+T[1]+'"]':'["'+T[0]+'","'+k+'"]',f+=I+g+".alignment = "+k+"; \n"}
// SPACER
f+="\n";
// All softwrapped lines have been converted into forced linebreaks
var z=m[1].split("<br>");$.each(z,function(e,t){
// ADD EACH LINE AS SEPARATE STATIC TEXT ITEM
f+=I+g+'.add("statictext", undefined, "'+t+'"); \n'})}else f+="var "+g+" = "+a[r]+'.add("'+u+'"); \n';break;case"EditText":m=multilineCheck(d);var P=$('#dialog [data-item-id="'+d+'"]'),_=Math.round(P.width()),D=Math.round(P.height()),j=m[0]?", [0,0, "+_+", "+D+" ], undefined, {multiline: true}":"";f+="var "+g+" = "+a[r]+'.add("'+u+'"'+j+"); \n";break;default:f+="var "+g+" = "+a[r]+'.add("'+u+'"); \n'}s.name=g,s.parent=a[r];var L=/*type === 'TreeView' ||*/"TreeItem"!==n||p?"\n":"";f+=styleJSXitem(t,i,a,n,d,r,l,o,g,c,m)+L;
// Add in treeItem expanded properties if this is the last of treeItems in this group
var V=t.order[e+1];if(void 0!==V){var B=t.items["item-"+V],E="TreeItem"===n&&"TreeItem"!==B.type;E&&0<c.length?(f+="\n",$.each(c,function(e,t){f+=t}),f+="\n",c=[]):E&&(f+="\n")}else void 0===V&&"TreeItem"===n&&($.each(c,function(e,t){f+=t}),f+="\n",c=[]);return f}function multilineCheck(e){var d=!1,r=[],l=$('#dialog [data-item-id="'+e+'"] .text-container'),t=l.html(),i=t.replace(/<br>$/,"").split(" ");// Just to make super sure the dialog text stays the same...
return l.html(""),$.each(i,function(e,t){var a=t.split("<br>");if(1<a.length)d=!0,$.each(a,function(e,t){var i=e===a.length-1;l.html(l.html()+(i?"":" ")+t+(i?"":"<br>")),r.push((i?"":" ")+t+(i?"":"<br>"))});else{var i=l.height(),n=0===e?"":" ";l.html(l.html()+n+t),
// New line has appeared.
// Joonas uses crushing depression. It's super effective!
i<l.height()?(r.push(t),d=!0,r.splice(r.length-1,0,"<br>")):r.push(n+t)}}),l.html(t),[d,r.join("")]}function styleJSXitem(e,t,i,a,n,d,r,l,o,s,c){var p="",m="    ";
// var counter = counters[ type.toLowerCase() ];
if("TreeItem"===a){var f=e.items["item-"+n].expanded,u=$('#dialog [data-item-id="'+n+'"]').parentsUntil(".tree-view").filter(".tree-view-item"),g=!1;$.each(u,function(){$(this).hasClass("expanded")||(g=!0);// CLOSE THE FLOOD GATES!!! AAAAAAAAAAAAAAAAAAAA!!!
}),f&&!1===g&&s.push(m+o+".expanded = true; \n")}else if("Divider"===a)p+=m+o+'.alignment = "fill"; \n';else if("Slider"===a)p+=m+o+".minvalue = 0; \n",p+=m+o+".maxvalue = 100; \n",p+=m+o+".value = 50; \n";else{if(
// DROP LIST SELECTION
"DropDownList"===a&&void 0!==l.selection&&(p+=m+o+".selection = "+l.selection+"; \n"),"ListBox"===a&&void 0!==l.selection&&0<l.selection.length)p+=m+o+".selection = "+(1<l.selection.length?JSON.stringify(l.selection):l.selection)+"; \n";
// TABBED PANEL SELECTION
// Due to me being an idiot, it's better for our insanity if tabbed panel selection defined when the selected item is created.
// TEXT
if("Tab"===a&&e.items["item-"+d].style.selection===n&&(p+=m+i[d]+".selection = "+o+"; \n"),
// TABBED PANEL ALIGN CHILDREN
"TabbedPanel"===a&&(p+=m+o+'.alignChildren = "fill"; \n'),void 0!==l.text&&0<l.text.length)if("StaticText"===a&&!c[0]||"StaticText"!==a)p+=m+o+'.text = "'+("EditText"===a&&c[0]?l.text.split("\n").join("\\r"):l.text)+'"; \n';
// CHECKED
// PREFERRED SIZE
if(!0===l.checked&&(p+=m+o+".value = "+l.checked+"; \n"),void 0!==l.preferredSize&&"TreeView"!==a){var v=l.preferredSize[0],h=l.preferredSize[1];c[0]||(0<v&&(p+=m+o+".preferredSize.width = "+v+"; \n"),0<h&&(p+=m+o+".preferredSize.height = "+h+"; \n"))}
// JUSTIFY
if(void 0!==l.justify&&"left"!==l.justify||"Button"===a&&"center"!==l.justify)if(!c[0]&&"StaticText"!==a)p+=m+(0<(void 0===l.text?0:l.text.indexOf("\n"))?"// ":"")+o+'.justify = "'+l.justify+'"; \n';
// ORIENTATION
// MARGINS
if(void 0!==l.orientation&&(p+=m+o+'.orientation = "'+l.orientation+'"; \n'),
// ALIGN CHILDREN
void 0!==l.alignChildren&&(p+=m+o+'.alignChildren = ["'+l.alignChildren[0]+'","'+l.alignChildren[1]+'"]; \n'),
// SPACING
void 0!==l.spacing&&(p+=m+o+".spacing = "+l.spacing+"; \n"),void 0!==l.margins)p+=m+o+".margins = "+("object"==typeof l.margins?"["+l.margins[3]+","+l.margins[0]+","+l.margins[1]+","+l.margins[2]+"]":l.margins)+"; \n";
// ALIGNMENT
if(null!=l.alignment&&!c[0]){var y=e.items["item-"+d].style.orientation,b="";b="column"===y?("top"===l.alignment?"left":"bottom"===l.alignment&&"right")||l.alignment:("left"===l.alignment?"top":"right"===l.alignment&&"bottom")||l.alignment;var w=e.items["item-"+d].style.alignChildren;p+=m+o+".alignment = "+(b="column"===y?'["'+b+'","'+w[1]+'"]':'["'+w[0]+'","'+b+'"]')+"; \n"}}return p}function resetDialog(){modal.init('<div id="reset-box"><h2>Delete Dialog.jsx</h2><span class="text">This will delete the dialog, <br /> allowing you to start over from a clean slate.</span><span class="yes" data-enter>Delete</span><span class="no">Cancel</span></div>');var e=$("#reset-box");e.find(".yes").on("click",function(){modal.remove(),setTimeout(function(){local_storage.remove("dialog"),loadingScreen.init(1.5,function(){location.reload()})},300)}),e.find(".no").on("click",function(){modal.remove()})}
/* exported notification */
function notification(e,t,i){
// "I think that padding makes you look fat..."
function a(e){e.addClass("fadeOut"),setTimeout(function(){e.remove()},300)}
// HTML
var n=$('<div class="notification '+e+' animated"><div><i class="fas fa-info-circle icon"></i><div class="msg">'+t+"<div></div></div>").appendTo("#notifications-wrap"),d=$("#notifications-wrap .notification").length;
// Crowd control - GET BACK YOU MONSTERS!!!! *hoses the crap out of the crowd while frantically digging for the pepper spray*
1<=d&&a($("#notifications-wrap .notification").slice(0,d-1));var r=n.height();n.css({height:0,visibility:"visible"}),n.animate({height:r},300,"easeInOutBack"),
// Bananas - B - A - N - A - N - A - S !!
$("#notifications-wrap .notification:last").addClass("last").prev().removeClass("last"),
// Ain't nobody got time to close notifications manually.
// But would you be interested in our newsletter?
setTimeout(function(){a(n)},1e3*i||5e3)}function shortcutExport(){var e=new ClipboardJS(".l-export",{text:function(){return exportCode()}}),t=$(".l-export");e.on("success",function(){clearTimeout(bgTimeout),t.addClass("success"),$("body").addClass("successful-shortcut-export"),bgTimeout=setTimeout(function(){t.removeClass("success"),$("body").removeClass("successful-shortcut-export")},350),clearTimeout(iconTimeout),$("#dialog-section #export-success-icon").remove(),$('<div id="export-success-icon"><div class="center-1"><div class="center-2"><div class="center-3"><div class="circle"><img src="assets/images/export-shortcut-icon.svg?'+(new Date).getTime()+'" alt="" /></div></div></div></div></div>').appendTo("#dialog-section"),iconTimeout=setTimeout(function(){$("#export-success-icon").remove()},950)}),e.on("error",function(){t.addClass("failure"),$("body").addClass("shortcut-export-failure"),setTimeout(function(){t.removeClass("failure"),$("body").removeClass("shortcut-export-failure")},350)})}function lineBreakIntercept(e){
// Stop the press if element doesn't support multiline.
var t=e.keyCode?e.keyCode:e.which,i=$("#panel-tree-view-wrap .active").data("item-type"),a=item.list[i.toLowerCase()](!1).multiline;return!(13===t&&!a)}var reText={tabs:" <br><br>You can nest TabbedPanels by inserting them inside a Tab item. <br><br>Visible tabs are selected on export (WYSIWYG)."},item={list:{}};item.list.dialog=function(e){return{type:"Dialog",parent:!0,defaultStyle:{text:"Dialog",preferredSize:[0,0],margins:16,orientation:"column",spacing:10,alignChildren:["center","top"]},previewHtml:'<div id="dialog-container" data-parent="true" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div id="dialog-title-bar"><div contenteditable="true">'+e.type+'</div></div><div class="padding-box"></div></div>'}},item.list.group=function(e){return{type:"Group",parent:!0,addPanelIconClass:"fas fa-object-group",defaultStyle:{preferredSize:[0,0],margins:0,orientation:"row",spacing:10,alignChildren:["left","center"],alignment:null},previewHtml:'<div class="group" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.panel=function(e){return{type:"Panel",parent:!0,addPanelDivider:"below",addPanelIconClass:"fas fa-columns",defaultStyle:{text:"Panel",preferredSize:[0,0],margins:10,orientation:"column",spacing:10,alignChildren:["left","top"],alignment:null},previewHtml:'<div class="panel" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="title" contenteditable="true">'+e.type+'</span><div class="padding-box"></div></div>'}},item.list.statictext=function(e){return{type:"StaticText",addPanelIconClass:"fas fa-font",multiline:!0,editInfo:'This item supports multiline text. <br><br>Due to issues with ScriptUI multiline text, the code export will not output "true" multiline. <br><br>Instead, multiline <code>statictext</code> will be sliced and diced into several <code>statictext</code> and put inside a <code>group</code>.',defaultStyle:{text:"StaticText",justify:"left",preferredSize:[0,0],alignment:null},previewHtml:'<div class="static-text" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="text-container" contenteditable="true">'+e.type+"</span></div>"}},item.list.edittext=function(e){return{type:"EditText",addPanelIconClass:"fas fa-i-cursor",multiline:!0,editInfo:"This item supports multiline text. <br><br>Multiline text flow may differ drastically from ScriptUI.",defaultStyle:{text:"EditText",
// justify: 'left',
preferredSize:[0,0],alignment:null},previewHtml:'<div class="edit-text" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="edit-text-inner-wrap"><span class="text-container" contenteditable="true">'+e.type+"</span></span></div>"}},item.list.button=function(e){return{type:"Button",addPanelIconClass:"fas fa-toggle-on",defaultStyle:{text:"Button",justify:"center",preferredSize:[0,0],alignment:null},previewHtml:'<div class="button" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="button-border"><span class="text-container" contenteditable="true">'+e.type+"</span></div></div>"}},item.list.divider=function(e){return{type:"Divider",addPanelIconClass:"fas fa-strikethrough",defaultStyle:!1,stylePropInfo:"This item doesn't have any adjustable properties.",editInfo:"Divider orientation is locked to the parent item orientation.",previewHtml:'<div class="panel divider-line" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.checkbox=function(e){return{type:"Checkbox",addPanelIconClass:"fas fa-check-square",editInfo:"You can check the checkbox in the dialog preview.",defaultStyle:{text:"Checkbox",preferredSize:[0,0],alignment:null},previewHtml:'<div class="checkbox" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="radiocheck checkbox"><i class="fas fa-check"></i></i></div><label contenteditable="true">'+e.type+"</label></div>"}},item.list.radiobutton=function(e){return{type:"RadioButton",addPanelIconClass:"fas fa-dot-circle",editInfo:"You can check the radiobutton in the dialog preview. <br><br> Radiobuttons are split into different groups if there is a different type of item between them.",defaultStyle:{text:"RadioButton",preferredSize:[0,0],alignment:null},previewHtml:'<div class="radiobutton" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="radiocheck radiobutton"><i class="fas fa-circle"></i></div><label contenteditable="true">'+e.type+"</label></div>"}},item.list.dropdownlist=function(e){return{type:"DropDownList",addPanelIconClass:"fas fa-caret-square-down",editInfo:"You can select a dropdown item in the dialog preview. <br><br>You can make a divider by adding an item that is a single dash character: <code>-</code>.",defaultStyle:{text:"DropDownList",listItems:"Item 1, -, Item 2",preferredSize:[0,0],alignment:null,selection:0},previewHtml:'<div class="dropdownlist" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><label contenteditable="true">'+e.type+'</label><div class="drop-list-wrap"><div class="items"><div class="selected">Item 1</div><div>-</div><div>Item 2</div></div><div class="arrow"><i class="fas fa-chevron-down"></i></div></div></div>'}},item.list.slider=function(e){return{type:"Slider",addPanelIconClass:"fas fa-sliders-h",defaultStyle:!1,stylePropInfo:"This item doesn't have any adjustable properties.",editInfo:"Export outputs a static range from 0 to 100 with current value of 50 every single time.",previewHtml:'<div class="slider"><input type="range" min="0" max="100" value="" data-item-type="'+e.type+'" data-item-id="'+e.id+'"  data-item-parent-id="'+e.parentId+'"></div>'}},item.list.listbox=function(e){return{type:"ListBox",addPanelIconClass:"fas fa-list-alt",editInfo:"You can select item(s) in the dialog preview. <br><br> If you select multiple items, <code>multiline</code> property will be added on export.",defaultStyle:{listItems:"Item 1, Item 2",preferredSize:[0,0],alignment:null},previewHtml:'<div class="list-box" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="inner-wrap"><ul><li><span>Item 1</span></li><li><span>Item 2</span></li></ul></div></div>'}},item.list.tabbedpanel=function(e){return{type:"TabbedPanel",parent:!0,addPanelDivider:"above",addPanelIconClass:"fas fa-folder",editInfo:'<strong>Valid child item:</strong> <br><i class="far fa-folder"></i> Tab.'+reText.tabs,defaultStyle:{preferredSize:[0,0],margins:10,alignment:null},previewHtml:'<div class="panel tabbed-panel" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="tab-container"></div><div class="padding-box"></div></div>'}},item.list.tab=function(e){return{type:"Tab",parent:!0,addPanelDivider:"below",addPanelIconClass:"far fa-folder",editInfo:"Can only be placed inside <br><i class='fas fa-folder'></i> TabbedPanel."+reText.tabs,defaultStyle:{text:"Tab",preferredSize:[0,0],margins:10,orientation:"column",spacing:10,alignChildren:["left","top"]},previewHtml:'<div class="panel tab" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.treeview=function(e){return{type:"TreeView",parent:!0,addPanelIconClass:"fas fa-tree",editInfo:'<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem.',defaultStyle:{preferredSize:[0,0],alignment:null},previewHtml:'<div class="panel tree-view" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.treeitem=function(e){return{type:"TreeItem",parent:!0,addPanelDivider:"below",addPanelIconClass:"fas fa-leaf",editInfo:'<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem. <br><br>You can expand or collapse these items in the dialog preview by clicking the arrows.',defaultStyle:{text:"TreeItem"},previewHtml:'<div class="tree-view-item" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="item-wrap"><span class="tree-view-arrow"><i class="fas fa-chevron-right"></i></span><span class="text-container" contenteditable="true">'+e.type+'</span></div><div class="padding-box"></div></div>'}},
// Cram it in there...
item.funnel={create:function(e){e.style=item.create.localStorage(e),item.create.treeView(e),item.update.order(),// Rebuilds the order every time a new item is created.
item.create.dialogPreview(e),item.activate(e.id),tab.onCreate(e);item.funnel.update("all","localStorage"),"loadFromLocalStorage"===e.event||edit_style_panel.build(e.style),"TabbedPanel"===e.type&&tabbedPanel.onCreate(e.event),"TreeView"===e.type&&treeView.onCreate(e.event);var t=$('#dialog [data-item-id="'+e.id+'"]');if("EditText"===e.type){var i=t.find(".edit-text-inner-wrap"),a=t.find("[contenteditable]"),n=i.overlayScrollbars({paddingAbsolute:!0}).overlayScrollbars(),d=$(n.getElements().host).find(".os-content-glue").first(),r=function(){d.html(a.html())};r(),a.on("input",function(){r()})}else"ListBox"===e.type&&t.find(".inner-wrap").overlayScrollbars({});$("#dialog-section").backstretch("resize")},remove:function(e){var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]'),i=t.prev(),a=t.next(),n=t.parent("ul").parent("li"),d=t.data("item-type");
// If the removed item was active, figure out which element to activate next.
if(item.remove.treeView(e),item.remove.dialogPreview(e,d),item.remove.localStorage(),$("#panel-tree-view-wrap .active").length<1){
// Order of operation:
// ( If not possible, move to the next one )
// 1. Select next down
// 2. Select next up
// 3. Select parent
e=0<a.length&&a.data("item-id")||0<i.length&&i.data("item-id")||n.data("item-id"),item.activate(e);
// Build Item Properties panel
var r=local_storage.get("dialog");edit_style_panel.build(r.items["item-"+e].style)}$("#dialog-section").backstretch("resize")},update:function(e,t){droplist.hide();
// LOCAL STORAGE
var i=local_storage.get("dialog"),a=(i="localStorage"===t?i:item.update.style.localStorage(e,i)).items["item-"+i.activeId];
// TREE VIEW PANEL
item.update.style.treeView(e,i,a),
// DIALOG PREVIEW
"dialog"!==t&&item.update.style.dialogPreview(e,i,a),
// TAB - ITEM
tab.onUpdate.init(i,a.id),
// TREE VIEW - ITEM
treeViewItem.onUpdate(i,a),
// Background size was not always updating, so this be a quick fix for I am lazy...
// It was happening especially when the text changes from type to anything else.
setTimeout(function(){$("#dialog-section").backstretch("resize")},10)},sort:function(e,t,i,a,n){item.sort.dialogPreview(e,t,i,a,n),item.sort.localStorage(e,t),$("#dialog-section").backstretch("resize")}},item.create={localStorage:function(e){var t=local_storage.get("dialog"),i=(t=null===t?{}:t).hasOwnProperty("items"),a="item-"+e.id,n=!1;
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
n=t?d?e.previousIsParent?"insertAfter":"prependTo":"appendTo":"insertAfter",$(i)[n](e.target)},dialogPreview:function(e){var t,i,a=item.list[e.type.toLowerCase()](e).previewHtml,n=e.target.is("ul")?e.target.parent("li"):e.target,d=n.data("parent"),r=n.data("item-id"),l=$("#dialog"),o=l.find('[data-item-id="'+r+'"]'),s=e.event.match(/^drag/);
// No data in ul, so gotta go a step higher to look for the data...
// Append to parent items
i=d?(t=s?e.previousIsParent?"insertAfter":"prependTo":"appendTo","Dialog"===e.type?l:s&&e.previousIsParent?o:o.find("> .padding-box")):(t="insertAfter",l.find('[data-item-id="'+r+'"]')),$(a)[t](i);var c=$('#dialog [data-item-id="'+e.id+'"]');"DropDownList"===e.type?droplist.init(c,e.id):"RadioButton"===e.type||"Checkbox"===e.type?radiocheck.init(c,e.id,e.type):"ListBox"===e.type&&listbox.init(c,e.id)}},item.get={},item.get.order=function(){var t=[];return $("#panel-tree-view-wrap .contents [data-item-id]").each(function(){var e=$(this).data("item-id");t.push(e)}),t},item.get.id=function(){var e=item.get.order();return Math.max.apply(null,e)+1},item.activate=function(e){droplist.hide();
// Write active item id to local storage
var t=local_storage.get("dialog");t.activeId=e,local_storage.set("dialog",t);
// Change the active element in the treeview.
var i=$("#panel-tree-view-wrap");i.find(".active").removeClass("active");var a=i.find('[data-item-id="'+e+'"]');a.addClass("active");
// Change the active element in the dialog preview
var n=$("#dialog");n.find(".active").removeClass("active"),n.find('[data-item-id="'+e+'"]').addClass("active"),tab.onActivate(e),breadCrumbs(i,a),lightThePath(i,a)},item.remove={localStorage:function(){
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
local_storage.set("dialog",a)},dialogPreview:function(e,t,i,a,n){var d=$("#dialog"),r=d.find('[data-item-id="'+e+'"]'),l=d.find('[data-item-id="'+n+'"]'),o="insertAfter"===a?l:l.find("> .padding-box");
// If you move a checked radiobutton to a parent that already has a checked radio button, uncheck the radiobutton that was moved.
if(r[a](o),"RadioButton"===i){var s=r.find(".radiobutton"),c=s.hasClass("on"),p=0,m=':not([data-item-type="RadioButton"],.spacing)';if(r.nextUntil(m).add(r.prevUntil(m)).each(function(){$(this).find(".radiobutton").hasClass("on")&&++p}),0<p&&c){s.removeClass("on");var f=local_storage.get("dialog");f.items["item-"+e].style.checked=!1,local_storage.set("dialog",f)}}}},
// @codekit-append "get.values.js";
// @codekit-append "set.values.js";
item.update={},item.update.style={},item.update.style.localStorage=function(e,t){var i=item.update.get_values(e);return t.items["item-"+t.activeId].style[e]=i[e],local_storage.set("dialog",t),t;// Changed data is force fed to the two functions below
},item.update.style.treeView=function(e,t,i){if("text"===e||"all"===e){var a=i.style.text,n=$('#panel-tree-view-wrap [data-item-id="'+i.id+'"] > .item-text'),d=i.type,r=void 0===a?d:a.trim();n.html(d.toLowerCase()===r.toLowerCase()?d:'<span class="type">'+d+':</span> <span class="txt">'+a+"</span>")}},item.update.style.dialogPreview=function(e,t,i,a){var n={property:e,value:i.style[e],data:t,dataItem:i,event:a};
// prop: 'all' is used when items are first created. After that the properties are edited individually.
"all"===e?$.each(i.style,function(e,t){n.property=e,n.value=t,item.update.set_values(n)}):item.update.set_values(n)},item.update.order=function(){
// Read old data from local storage....
var e=local_storage.get("dialog");
// Update order by re-recoding the id's of every single item currently in the tree view
e.order=item.get.order(),
// Write back to local storage...
local_storage.set("dialog",e)},item.update.get_values=function(e){var t={},i=$("#panel-edit-style-wrap"),a=i.find('[data-edit^="'+e+'"]');switch(e){case"text":t.text=a.val();break;case"listItems":t.listItems=a.val();break;case"justify":t.justify=i.find('[data-edit^="justify"].active').data("value");break;case"margins":
// All sides share the same value.
// - single number value
if(0<i.find(".n-3-4.hidden").length)t.margins=parseInt(i.find(".margin-inputs .top").val(),10);else{var n=[];i.find('[data-edit="margins"]').each(function(){n.push(parseInt($(this).val(),10))}),t.margins=n}break;case"preferredSize":var d=parseInt(i.find("input.width").val(),10),r=parseInt(i.find("input.height").val(),10);t.preferredSize=[d,r];break;case"orientation":t.orientation=a.find("option:selected").val();break;case"spacing":t.spacing=parseInt(a.val(),10);break;case"alignChildren":var l=i.find('#align-children-horizontal[data-edit="alignChildren"] option:selected').val(),o=i.find('#align-children-vertical[data-edit="alignChildren"] option:selected').val();t.alignChildren=[l,o];break;case"alignment":!1===a.prop("disabled")?t.alignment=a.find("option:selected").val():t.alignment=null;break}
// console.table( data );
return t},
// Updates the Dialog preview look
item.update.set_values=function(e){var t=e.value,i=e.dataItem.type,a=e.dataItem.style,n=e.dataItem.id,d=$("#dialog .active"),r=d.find("> .padding-box");switch(e.property){
// TEXT
case"text":if("Dialog"===i)d.find("#dialog-title-bar div").text(t);else if("Panel"===i){var l=d.find("> .title");l.text(t),
// Makes sure the panel container is always wide enough to cover the title
r.css({minWidth:l.width()+22})}
// type === 'RadioButton' || type === 'Checkbox' || type === 'DropDownList'
else if(0<d.find("> label").length)d.find("label").text(t);else if("Tab"===i)d.parent().parent().find('> .tab-container [data-tab-id="'+n+'"]').text(t);else if("TreeItem"===i)d.find("> .item-wrap .text-container").text(t);else if(item.list[i.toLowerCase()](!1).multiline){d.find(".text-container").html(t.split("\n").join("<br>"))}else d.find(".text-container").html(t);break;
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
case"margins":var o=t[0],s=t[1],c=t[2],p=t[3],m="object"!=typeof t,f=m?t:o,u=m?t:s,g=m?t:c,v=m?t:p;"Dialog"===i?r.css({paddingTop:f<=6?1:f,paddingRight:u<=1?1:u,paddingBottom:g<=1?1:g,paddingLeft:v<=1?1:v}):"Panel"===i||"Tab"===i?r.css({paddingTop:f<=3?3:f,paddingRight:u<=3?3:u,paddingBottom:g<=1?1:g,paddingLeft:v<=3?3:v}):r.css({paddingTop:f,paddingRight:u,paddingBottom:g,paddingLeft:v});break;
// PREFERRED SIZE
case"preferredSize":
// active.width('auto').height('auto');
// var contWidth = Math.round( active.width() );
// var contHeight = Math.round( active.height() );
// var isParent = item.list[ type.toLowerCase() ](false).parent;
// Paren't can't be smaller than children
// var newWidth  = val[0] == 0 ? 'auto' : ( params.event !== 'loadFromLocalStorage' && isParent && val[0] < contWidth  ) ? contWidth  : val[0];
// var newHeight = val[1] == 0 ? 'auto' : ( params.event !== 'loadFromLocalStorage' && isParent && val[1] < contHeight ) ? contHeight : val[1];
var h=0==t[0]?"auto":t[0],y=0==t[1]?"auto":t[1];
// Special treatment for Dropdownlist
if(d.css({width:h,height:y+("Dialog"===i?23:"")}),"DropDownList"===i){var b=d.find(".drop-list-wrap"),w=d.find("label");d.removeClass("too-big"),d.removeClass("too-small"),d.addClass("get-width");var x=d.width(),C=w.outerWidth(!0),I=b.outerWidth(!0);d.removeClass("get-width");var S=C+I;S<h?(d.addClass("too-big"),I<x&&b.width("auto")):h<S&&(d.addClass("too-small"),x<I&&b.width(x-16),d.parent().parent().hasClass("orientation-row")&&
// In this situation the label has position: absolute; so it doesn't respect the padding on the left side.
d.find("label").css({marginLeft:d.css("padding-left")}))}break;
// ORIENTATION
case"orientation":d.removeClass(function(e,t){return(t.match(/(^|\s)orientation-\S+/g)||[]).join(" ")}).addClass("orientation-"+t);break;
// SPACING
case"spacing":var k=d.find("> .padding-box"),T="> .padding-box";k.find("> style.spacing").remove();// Get rid of the old one.
var z=0,P=e.data.items["item-"+n].parentId;if(!1!==P)"row"===e.data.items["item-"+P].style.orientation&&(z=2);t+=z,$('<style class="spacing">#dialog [data-item-id="'+d.data("item-id")+'"].orientation-row '+T+" > div {padding-left: "+t+'px;}\n#dialog [data-item-id="'+d.data("item-id")+'"].orientation-row '+T+' > div:first-of-type {padding-left: 0px;}\n#dialog [data-item-id="'+d.data("item-id")+'"].orientation-column '+T+" > div {padding-top: "+t+'px;}\n#dialog [data-item-id="'+d.data("item-id")+'"].orientation-column '+T+" > div:first-of-type {padding-top: 0px;}</style>").appendTo(k);break;
// ALIGN CHILDREN
case"alignChildren":d.removeClass(function(e,t){return(t.match(/(^|\s)align-children-\S+/g)||[]).join(" ")}),d.addClass("align-children-horizontal-"+t[0]),d.addClass("align-children-vertical-"+t[1]);break;
// ALIGNMENT
case"alignment":if(d.removeClass(function(e,t){return(t.match(/(^|\s)alignment-\S+/g)||[]).join(" ")}),null!==t){var _="left"===t&&["left","top"]||"top"===t&&["left","top"]||"right"===t&&["right","bottom"]||"bottom"===t&&["right","bottom"]||[t,t];d.addClass("alignment-horizontal-"+_[0]),d.addClass("alignment-vertical-"+_[1])}break}};var tabbedPanel={onCreate:function(e){
// There's no point in having a tabbed panel with less than
// two items, so this section makes sure that when a tabbed
// panel is created, two child tabs are created as well.
if("loadFromLocalStorage"!==e&&"drag-duplicate"!==e){var t=$("#panel-tree-view-wrap"),i=t.find(".active"),a=i.data("item-id"),n={id:item.get.id(),type:"Tab",parentId:i.data("item-id"),target:i.find("> ul"),event:"parent-propagation"};item.funnel.create(n);// Filler tab N.1.
var d=t.find(".active").data("item-id");item.activate(a),n.id=item.get.id(),item.funnel.create(n),// Filler tab N.2.
item.activate(d)}
// Tab item is hidden in the "Add items" panel by default, because you don't need it unless you have a TabbedPanel in the document.
// There's no need for extra conditionals because this is triggered only after a tabbed panel is created, which is what happens on load or import when the dialog is reconstructed.
var r=$("#panel-new-item-wrap .tab");r.hasClass("show")||r.addClass("show")},
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
if(d){var r=$("#panel-edit-style-wrap .edit-info");r.removeClass("highlight-animation"),// Reset so that the animation can run again if user tries to add another item with similar issues.
setTimeout(function(){r.addClass("highlight-animation")},10)}return d}},tab={onCreate:function(e){if("Tab"===e.type){var t=$('#dialog [data-item-id="'+e.parentId+'"]'),i=t.find("> .tab-container");
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
onSort:function(e){var t=e.hasClass("tab"),i=e.hasClass("tabbedpanel");if(t||i||0<$('#dialog [data-item-id="'+e.data("item-id")+'"]').closest(".tab").length){$("body").removeClass("dragging-tab");var a=local_storage.get("dialog"),n=e.data("item-id"),d=a.items["item-"+n].parentId,r=$("#dialog"),l=r.find('[data-item-id="'+d+'"]'),o=l.find("> .tab-container");r.find('.tab-container [data-tab-id="'+n+'"]').appendTo(o);
// Sort the shelf
var s=l.find("> .padding-box > .tab");tab.containerSort(s,o),item.activate(n),
// Build Item Properties panel
edit_style_panel.build(a.items["item-"+n].style),
// Update
tab.onUpdate.init(a,n)}},containerSort:function(e,t){e.each(function(){var e=$(this).data("item-id");t.find('[data-tab-id="'+e+'"]').appendTo(t)})},onUpdate:{init:function(r,e){
// Start churning if updated item inside a tabbed panel...
// - Because any nested item can cause parents and the whole hecking family to bloat up
var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]');0<t.closest(".tabbedpanel").length&&t.parentsUntil(".dialog").filter(".tabbedpanel").each(function(){var e=r.items["item-"+$(this).data("item-id")],t=$('#dialog [data-item-id="'+e.id+'"]'),i=0,a=0;t.find("> .padding-box > .tab").each(function(){
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
var r=$("#panel-new-item-wrap .treeitem");r.hasClass("show")||r.addClass("show")},
// Prevents dragging items to specific containers...
// True = Prevent dropping
onDragValid:function(e,t){var i=t.target.parent("li"),a=e.hasClass("treeitem"),n=i.hasClass("treeview"),d=i.hasClass("treeitem");
// ITEMS
// True = Prevent dropping
// Dragging item  + Target is not treeview or item = NO DROPSIES
// Dragging !item + Target is treeview or item     = NO DROPSIES
return a&&!n&&!d||!a&&(n||d)},
// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels. Silly humans...
onClick:function(e,t){var i=t.data("item-type"),a=e.hasClass("treeitem"),n="TreeView"===i,d="TreeItem"===i,r=a&&!n&&!d||!a&&(n||d);
// ITEMS
if(r){var l=$("#panel-edit-style-wrap .edit-info");l.removeClass("highlight-animation"),// Reset so that the animation can run again if user tries to add another item with similar issues.
setTimeout(function(){l.addClass("highlight-animation")},10)}return r}},treeViewItem={onClick:function(){$("#dialog").on("click",".tree-view-arrow",function(){var e=$(this).parent(".item-wrap").parent(".tree-view-item"),t=e.data("item-id"),i=local_storage.get("dialog"),a=i.items["item-"+t];treeViewItem.expand(i,a,e,!0)})},onSort:function(e,t,i){if("TreeItem"===t){$('#dialog [data-item-id="'+i+'"]').parent(".padding-box").parent(".tree-view-item").addClass("tree-node");
// Get rid of previous data
var a=$("#dialog .tree-node > .padding-box:empty").parent().removeClass("tree-node expanded");if(0<a.length){var n=a.data("item-id"),d=local_storage.get("dialog");delete d.items["item-"+n].expanded,local_storage.set("dialog",d)}}},onUpdate:function(e,t){if("TreeItem"===t.type){var i=$('#dialog [data-item-id="'+t.id+'"]');0<i.parent(".padding-box").parent(".tree-view-item").length&&i.parent(".padding-box").parent(".tree-view-item").addClass("tree-node"),treeViewItem.expand(e,t,i)}},expand:function(e,t,i,a){var n,d="expanded";if(!0!==a)n=t.expanded?"addClass":"removeClass";else{var r=i.hasClass(d);n=r?"removeClass":"addClass"}i[n](d),a&&(
// COLLAPSE
r?delete e.items["item-"+t.id].expanded:e.items["item-"+t.id].expanded=!0,local_storage.set("dialog",e))}};treeViewItem.onClick();var listbox={init:function(t,i){t.on("click","li",function(){var e=$(this);listbox.clickety(i,t,e)})},clickety:function(e,t,i){
// LIGHT SWITCH...
var a="selected",n=i.hasClass(a)?"removeClass":"addClass";i[n](a);
// GET ALL SELECTED ITEMS...
var d=[];t.find("li").each(function(){$(this).hasClass(a)&&d.push($(this).index())});
// WRITE SELECTION LOCAL STORAGE...
var r=local_storage.get("dialog");r.items["item-"+e].style.selection=d,local_storage.set("dialog",r)},set:function(e,t){var n=e.find("ul");n.children().remove();var i,a,d=t.split(","),r=local_storage.get("dialog"),l=r.items["item-"+r.activeId];
// Remove last selection if it's index is larger than the current list
void 0!==l.style.selection&&(i=l.style.selection,a=0,$.each(i,function(e,t){a<t&&(a=t)}),a>=d.length&&l.style.selection.pop(),local_storage.set("dialog",r)),
// Rebuild the list
$.each(d,function(e,t){var i=t.trim(),a=0<=$.inArray(e,l.style.selection);$("<li"+(a?' class="selected"':"")+"><span>"+i+"</span></li>").appendTo(n)})}};// This droplist has so many smoking mirrors... Practically all mirrors at this point... **FRAGILE**
// REMOVE (HIDE) LIST ON WINDOW RESIZE
// Because the opened up list is held in place via absolute positioning...
droplistOnWindowResize();var droplist={init:function(e,a){e.find(".drop-list-wrap").on("click",function(){
// THERE CAN BE ONLY ONE!!
$("#drop-list").remove();var i=$(this);if(i.hasClass("open"))droplist.hide();else{i.addClass("open");var e=droplist.inspector(a,i);droplist.makeList(a,i,e),$("#drop-list ul li").on("click",function(){var e=$(this),t=local_storage.get("dialog");t.items["item-"+a].style.selection=e.index(),local_storage.set("dialog",t),i.find(".selected").removeClass("selected"),i.find(".items").children().eq(e.index()).addClass("selected"),droplist.hide()})}
// Second click on the .drop-list-wrap...
})},backbone:function(e){var t=null,i=e.find(".items").children();i.each(function(){var e=$(this).width();t<e&&(t=e)}),
// listWrap.width( maxWidth );
i.width(t)},inspector:function(e,t){var i="",a=t.find(".selected").index();return t.find(".items").children().each(function(e){var t=$(this).text();i+='<li class="option'+("-"===t?" horizontal-line":"")+(e===a?" selected":"")+'">'+t+"</li>"}),i},makeList:function(e,t,i){var a=t.offset().top,n=t.offset().left,d=t.outerWidth(),r=t.outerHeight();$('<div id="drop-list"><ul>'+i+"</ul></div>").appendTo("#dialog-section");var l=$("#drop-list"),o=2*parseInt(l.css("border-left-width"),10),s=2*parseInt(l.css("padding-left"),10);l.css({top:a+r,left:n-($(window).width()-$("#dialog-overlay-wrap").width()),width:d-(o+s)})},set:function(e,t,d){var r=e.find(".items");r.children().remove();var l=!1;
// Rebuild the list
// Makes it so that if the selected item is removed, the selected item is swapped to the first item.
// This will prevent bunch of other issues...
if($.each(t.split(","),function(e,t){var i=t.trim(),a="-"==i?" horizontal-line":"",n=e===d.selection?" selected test":"";e===d.selection&&(l=!0),$('<div class="'+n+a+'">'+i+"</div>").appendTo(r)}),!l){var i=local_storage.get("dialog");i.items["item-"+i.activeId].style.selection=0,local_storage.set("dialog",i),r.find("> div:first").addClass("selected")}var a=e.find(".drop-list-wrap");droplist.backbone(a)},hide:function(){$("#drop-list").remove(),$(".drop-list-wrap.open").removeClass("open")}},radiocheck={init:function(e,d,t){var r=this,i=e.find(".radiocheck");r.restore(e,d,t,i),i.on("click",function(){var e=$(this),t=local_storage.get("dialog"),i=t.items["item-"+d],a=e.hasClass("on");e[a?"removeClass":"addClass"]("on");var n=!a;
// RADIOBUTTON
e.is(".radiobutton")&&r.radio.clearSiblings(t,e),i.style.checked=n,local_storage.set("dialog",t)})},restore:function(e,t,i,a){!0===local_storage.get("dialog").items["item-"+t].style.checked&&a.addClass("on")},radio:{clearSiblings:function(a,e){var t=e.parent(),i=':not([data-item-type="RadioButton"],.spacing)';
// Clear all adjacent sibling radiobuttons...
t.nextUntil(i).add(t.prevUntil(i)).each(function(){var e=$(this),t=e.data("item-id"),i=e.find(".radiocheck");e.hasClass("radiobutton")&&(i.removeClass("on"),a.items["item-"+t].style.checked=!1)})}}},addItemsPanel={init:function(){this.generateHTML(),
// CREATE NEW ITEM EVENT
$("#panel-new-item-wrap li").on("click",function(){var e=$("#panel-tree-view-wrap").find(".active"),t=e.data("parent"),i={id:item.get.id(),type:$(this).data("item-type"),parentId:t?e.data("item-id"):e.data("item-parent-id"),target:t?e.find("> ul"):e,event:"click"},a=tabbedPanel.onClick($(this),e,i),n=treeView.onClick($(this),e,i);a||n||item.funnel.create(i)})},generateHTML:function(){var i="";$.each(item.list,function(e){var t=item.list[e](!1);t.addPanelIconClass&&("above"===t.addPanelDivider&&(i+='<span class="gouping-divider"></span>'),i+='<li class="'+e+'" data-item-type="'+t.type+'"><i class="fas fa-info-circle failure-is-an-option"></i><i class="'+t.addPanelIconClass+'"></i><span>'+t.type+"</span></li>","below"===t.addPanelDivider&&(i+='<span class="gouping-divider"></span>'))}),i+='<div class="disabled-overlay"></div>',$("<ul>"+i+"<ul>").appendTo("#panel-new-item-wrap .contents")}};addItemsPanel.init();
// @codekit-append "html.js";
var edit_style_panel={build:function(e,t){var a=$("#edit-style-inner-container");a.html("");var i=$("#panel-tree-view-wrap .active").data("item-type").toLowerCase(),n=item.list[i](!1);if(!1===e)$("<div class='no-properties'>"+n.stylePropInfo+"</div>").appendTo(a);else{
// Generate edit panel structure
$.each(e,function(e,t){var i=panel_edit_style_html.init(e,t);void 0!==i&&i.appendTo(a)}),
// Style number inputs
numberInputs();var d=item.list[i](!1).defaultStyle.text,r=item.list[i](!1).multiline,l=$('#panel-edit-style-wrap [data-edit="text"]'),o=l.parent();
// Icon on the text container telling the user they can't add linebreaks to current item
!d||r||o.hasClass("is-not-multiline")||o.addClass("is-not-multiline"),
// Style dropdowns
$(".pretty-classic").prettyDropdown({classic:!0,customClass:"arrow triangle",selectedMarker:'<i class="fas fa-check"></i>'}),$("#panel-edit-style-wrap textarea").each(function(){
/*global autosize*/
/*eslint no-undef: ["error", { "typeof": true }] */
autosize(this)}),
// SELECT TEXT INPUT IN THE ITEM PROPERTIES PANEL
// If the item has default text, then try to select it. If it doesn't have default text, it never will.
// This check is used because when the textarea doesn't exist, there's nothing to focus in so it just basically does a site wide Cmd+A, which is not cool...
"dialog"!==t&&d&&(l.focus(),l.select())}var s=n.editInfo;s&&$('<div class="edit-info">'+s+"</div>").appendTo(a)}},panel_edit_style_html={
// Mayhaps in hindsight this wasn't the best way to build this html...
// but what is done is done. Honestly, I look at this and I'm like oh
// boy... I have absolutely no idea why I made it this way. My best
// defense is that everything in this project started as a prototype
// and I never could be arsed to make it in a sensible way after I had
// decided what I wanted from it. Once a lazy boy, always a lazy boy.
init:function(e,t){var i;switch(e){case"text":i=$('<h2 title="Initial text to be displayed in the control as the title, label, or contents, depending on the control type.">Text</h2><div class="edit-text-wrap"><div class="no-linebreaks-icon" title="This item does not support multiline, so no line breaks."><img src="assets/images/no-line-break-icon.svg" alt="" /></div><textarea data-edit="text" class="textarea">'+t+"</textarea><div>");break;case"listItems":i=$('<h2 title="The array of choice items displayed in the drop-down or pop-up list.">List Items<span class="desc"> (Comma separated)</span></h2><textarea data-edit="listItems" class="textarea">'+t+"</textarea>");break;case"justify":(i=$('<div class="justify-container"><h4>Justify:</h4><div class="justify-icon-wrap"><div class="justify-icon" data-edit="justify" data-value="left"><i class="icon fas fa-align-left"></i></div><div class="justify-icon" data-edit="justify" data-value="center"><i class="icon fas fa-align-center"></i></div><div class="justify-icon" data-edit="justify" data-value="right"><i class="icon fas fa-align-right"></i></div></div></div>')).find('[data-value="'+t+'"]').addClass("active");break;case"margins":var a="object"!=typeof t;i=$('<h2 title="The number of pixels between the edges of a container and the outermost child elements. \n\nYou can specify different margins for each edge of the container. The default value is based on the type of container, and is chosen to match the standard Adobe UI guidelines.">Margins<div class="link-icon '+(a?"active":"")+'" title="Adjust each side individually..."><i class="fas fa-unlock-alt"></i><i class="fas fa-lock-open"></i></div></h2><span class="desc margins-desc '+(a?"hide":"")+'"><span>top</span><span>right</span><span>bottom</span><span>left</span></span><div class="margin-inputs"><input class="number" style="display: none;"><div class="n-1-4"><input data-edit="margins" class="number top" value="'+(a?t:t[0])+'" min="0" max="300" step="1" modifier-step="10"></div><div class="n-3-4 '+(a?"hidden":"")+'"><input data-edit="margins" class="number right" value="'+(a?t:t[1])+'" min="0" max="300" step="1" modifier-step="10"'+(a?"disabled":"")+'><input data-edit="margins" class="number bottom" value="'+(a?t:t[2])+'" min="0" max="300" step="1" modifier-step="10"'+(a?"disabled":"")+'><input data-edit="margins" class="number left" value="'+(a?t:t[3])+'" min="0" max="300" step="1" modifier-step="10"'+(a?"disabled":"")+'></div><input class="number" style="display: none;"></div>');break;case"preferredSize":i=$('<h2 title="The preferred size, used by layout managers to determine the best size for each element. \n\nIf not explicitly set by a script, value is established by the UI framework in which ScriptUI is employed, and is based on such attributes of the element as its text, font, font size, icon size, and other UI framework-specific attributes. A script can explicitly set preferredSize before the layout manager is invoked in order to establish an element size other than the default.">Preferred Size<span class="preferred-size-auto" title="Reset to content size (0)"><i class="fas fa-compress"></i></span></h2><div class="dimensions-container linked"><input class="number" style="display: none;"><h4 class="width-heading">Width:</h4><input class="number width" data-edit="preferredSize" value="'+t[0]+'" min="0" max="2000" step="1" modifier-step="10"><h4 class="height-heading">Height:</h4><input class="number height" data-edit="preferredSize" value="'+t[1]+'" min="0" max="2000" step="1" modifier-step="10"><input class="number" style="display: none;"></div>');break;case"orientation":(
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
var d=t[0],r=t[1];i.find('#align-children-horizontal option:contains("'+d+'")').prop("selected",!0),i.find('#align-children-vertical option:contains("'+r+'")').prop("selected",!0);break;case"alignment":var l,o=$("#dialog .active").parent("div").parent("div").hasClass("orientation-column"),s=o?"column":"row",c=o?"horizontal":"vertical",p=null===t,m=o?["left","center","right","fill"]:["top","center","bottom","fill"],f="";$.each(m,function(e,t){f+='<option value="'+t+'">'+t+"</option>"}),i=$('<div class="alignment-container"><h2 title="The alignment style for this element. If defined, this value overrides the alignChildren setting for the parent container.">Alignment <span>(Self)</span></h2><div class="alignment-checkbox"><input type="checkbox" id="alignment-checkbox-input" name="" '+(p?"":"checked")+' /><label for="alignment-checkbox-input"></label></div><br>'+('<div id="alignment-'+c+'"><select name="qty" class="pretty-classic" data-edit="alignment"  data-edit-value="'+c+'" '+(p?"disabled":"")+" >"+f+"</select></div>")+"</div>"),"column"===s?(l=("top"===t?"left":"bottom"===t&&"right")||t,i.find('#alignment-horizontal option:contains("'+(null===t?"center":l)+'")').prop("selected",!0)):(l=("left"===t?"top":"right"===t&&"bottom")||t,i.find('#alignment-vertical option:contains("'+(null===t?"center":l)+'")').prop("selected",!0));break}return i}},propsPanel=$("#panel-edit-style-wrap");
// EDIT PANEL CLICK EVENTS
// JUSTIFY
propsPanel.on("click",".justify-icon",function(){$(this).addClass("active").siblings().removeClass("active")}),
// ALIGNMENT POWER STATE TOGGLE → ON / OFF
propsPanel.on("change",".alignment-checkbox input",function(){var e=$(this).prop("checked"),t=!e,i=e?"removeClass":"addClass";$(".alignment-container select").prop("disabled",t).trigger("change"),$(".alignment-container .prettydropdown")[i]("disabled")}),
// PREFERRED SIZE → RESET BACK TO 0 (content size)
propsPanel.on("click",".preferred-size-auto",function(){var e=propsPanel.find("input.width");e.val(0).change(),propsPanel.find("input.height").val(0).change(),item.funnel.update(e.data("edit"))}),
// MARGINS TOGGLE → ALL SIDES / TOP, RIGHT, BOTTOM, LEFT
propsPanel.on("click",".link-icon",function(){var e=$(".margin-inputs .n-3-4");
// ENABLE ALL
e.hasClass("hidden")?($(this).removeClass("active"),e.removeClass("hidden"),e.find("input").prop("disabled",!1).val($(".margin-inputs .n-1-4 input").val()),$("#panel-edit-style-wrap .margins-desc").removeClass("hide")):($(this).addClass("active"),e.addClass("hidden"),e.find("input").prop("disabled",!0),$("#panel-edit-style-wrap .margins-desc").addClass("hide")),item.funnel.update("margins")}),
// ***********************
// UPDATE ITEM PROPERTIES
// ***********************
propsPanel.on("keydown",'[data-edit="text"]',function(e){return lineBreakIntercept(e)}),propsPanel.on("keyup",'[data-edit="text"]',function(e){18!=(e.keyCode?e.keyCode:e.which)&&// Update if alt is released.
item.funnel.update($(this).data("edit"));var t=$("#dialog .active");"EditText"===t.data("item-type")&&t.find(".os-content-glue").html(t.find("[contenteditable]").html());var i=t.find(".text-container"),a=t.data("item-type"),n=i.height(),d=!1,r="StaticText"===a,l="EditText"===a;console.log(l),r&&25.5<n?d=!0:l&&22.5<n&&(d=!0),d?i.addClass("multiline"):i.removeClass("multiline")}),propsPanel.on("keyup",'[data-edit="listItems"]',function(){item.funnel.update($(this).data("edit"))}),propsPanel.on("click",'[data-edit="justify"]',function(){item.funnel.update($(this).data("edit"))}),propsPanel.on("change","select[data-edit]",function(){if("orientation"===$(this).data("edit")){var e="column"===$(this).find("option:selected").val(),t=$("#align-children-horizontal"),i=$("#align-children-vertical");e?(i.find("option:contains(fill)").remove(),$("<option>fill</option>").appendTo(t)):(t.find("option:contains(fill)").remove(),$("<option>fill</option>").appendTo(i)),$("#panel-edit-style-wrap .align-children select").each(function(){$(this).clone().appendTo("#panel-edit-style-wrap .align-children")}),$("#panel-edit-style-wrap .align-children .prettydropdown").remove(),$("#panel-edit-style-wrap .align-children .pretty-classic").each(function(){$(this).trigger("change"),$(this).prettyDropdown({classic:!0,customClass:"arrow triangle",selectedMarker:'<i class="fas fa-check"></i>'})})}item.funnel.update($(this).data("edit"))});var mousemovePing,local_storage={set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){return JSON.parse(localStorage.getItem(e))},remove:function(e){localStorage.removeItem(e)}},loadingScreen={init:function(e,t){$('<div id="loader-bg"><div class="loader">Loading...</div></div>').appendTo("body"),$("#loader-bg").backstretch([{url:"./assets/images/bg.jpg",alignX:"center"}]),setTimeout(function(){t()},this.secondsToMilliseconds(e))},secondsToMilliseconds:function(e){return 1e3*e}};setInterval(function(){mousemovePing=!0},45);var bgTimeout,iconTimeout,modal={init:function(e){modal.make(e),$("#modal-window-overlay").on("click",function(){modal.remove()})},make:function(e){e=void 0===e?"":e,$('<div id="modal-window"><div id="modal-window-overlay" data-esc></div><div id="modal-window-content" class="animated fadeIn">'+e+"</div></div>").appendTo("body"),$("body").addClass("modal-window-active")},remove:function(){$("#modal-window-content").addClass("fadeOut"),setTimeout(function(){$("#modal-window").remove(),$("body").removeClass("modal-window-active")},100)}};$(document).on("keydown",function(e){if(0<$("#modal-window").length){var t=e.keyCode?e.keyCode:e.which,i=13===t;27===t?$("#modal-window").find("[data-esc]").trigger("click"):i&&$("#modal-window").find("[data-enter]").trigger("click")}}),
// @codekit-append "export/make.item.js";
// @codekit-append "export/apply.style.js";
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
$("#toolbar .import").on("click",function(){var d,r;modal.init('<div id="import-box"><h2>Import.jsx</h2><div class="ta"><div class="placeholder"><span class="important">The current dialog will be overwritten on a successful import.</span> <br><br>You can only import JSON generated by this this tool on export. 3rd line of every export includes the impotable JSON. Your old dialog code written in Javascript will <strong>not</strong> work! <br><br>Valid JSON is beautified (restructured) on paste <br> so that it is easier to read if necessary. <br></br><strong>Paste below</strong> <br><strong>↓</strong></div><div class="code"></div></div><div data-enter class="import-btn animated infinite"><i class="fas fa-arrow-right"></i><i class="fas fa-times"></i></div></div>'),(r=CodeMirror($("#import-box .code")[0],{mode:{name:"javascript",json:!0},theme:"monokai",autofocus:!0,lineNumbers:!0})).on("change",function(e,t){if("paste"===t.origin)
/*eslint no-empty: "error"*/
try{
// Poor man's 'beautify' on paste
var i=r.getValue();d=i;var a=JSON.parse(i),n=JSON.stringify(a,null,3);r.getDoc().setValue(n)}catch(e){
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
$("#toolbar .reset").on("click",resetDialog),
// Load sample dialog
$("#toolbar .sample-dialog").on("click",function(){modal.init('<div id="reset-box"><h2>Sample Dialog.jsx</h2><span class="text">Are you sure you want to <strong>replace</strong> <br>the current dialog with a sample?</span><span class="yes" data-enter>Load Sample</span><span class="no">Cancel</span></div>');var e=$("#reset-box");e.find(".yes").on("click",function(){modal.remove(),setTimeout(function(){local_storage.remove("dialog"),local_storage.set("dialog",JSON.parse('{"activeId":1,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"text":"Import Multiple PDF pages","preferredSize":[0,0],"margins":16,"orientation":"row","spacing":10,"alignChildren":["left","top"]}},"item-1":{"id":1,"type":"Panel","parentId":20,"style":{"text":"Page Selection","preferredSize":[0,205],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"StaticText","parentId":1,"style":{"text":"Import PDF Pages:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-3":{"id":3,"type":"EditText","parentId":6,"style":{"text":"1","preferredSize":[60,0],"alignment":null}},"item-4":{"id":4,"type":"StaticText","parentId":6,"style":{"text":"thru","justify":"left","preferredSize":[0,0],"alignment":null}},"item-5":{"id":5,"type":"EditText","parentId":6,"style":{"text":"1","preferredSize":[60,0],"alignment":null}},"item-6":{"id":6,"type":"Group","parentId":1,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"StaticText","parentId":1,"style":{"text":"Start Placing on Doc Page:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-8":{"id":8,"type":"Checkbox","parentId":1,"style":{"text":"Reverse Page Order","preferredSize":[0,0],"alignment":null}},"item-9":{"id":9,"type":"Panel","parentId":20,"style":{"text":"Sizing Options","preferredSize":[0,160],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-10":{"id":10,"type":"Checkbox","parentId":9,"style":{"text":"Fit to Page","preferredSize":[0,0],"alignment":null}},"item-11":{"id":11,"type":"Checkbox","parentId":9,"style":{"text":"Keep Proportions","preferredSize":[0,0],"alignment":null}},"item-12":{"id":12,"type":"Checkbox","parentId":9,"style":{"text":"Bleed the Fit Page","preferredSize":[0,0],"alignment":null,"checked":true}},"item-13":{"id":13,"type":"StaticText","parentId":9,"style":{"text":"Scale of Imported Page","justify":"left","preferredSize":[0,0],"alignment":null}},"item-14":{"id":14,"type":"Group","parentId":9,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-15":{"id":15,"type":"EditText","parentId":14,"style":{"text":"100","preferredSize":[40,0],"alignment":null}},"item-16":{"id":16,"type":"StaticText","parentId":14,"style":{"text":"Y%","justify":"left","preferredSize":[0,0],"alignment":null}},"item-17":{"id":17,"type":"EditText","parentId":14,"style":{"text":"100","preferredSize":[40,0],"alignment":null}},"item-18":{"id":18,"type":"StaticText","parentId":14,"style":{"text":"X%:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-19":{"id":19,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-20":{"id":20,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-21":{"id":21,"type":"Panel","parentId":19,"style":{"text":"Positioning Options","preferredSize":[0,205],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"text":"Position on Page Aligned From:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-23":{"id":23,"type":"DropDownList","parentId":21,"style":{"text":"","listItems":"Top Left, Top Center, Top Right, Center Left, Center, Center Right, Bottom Left, Bottom Center, Bottom Right, -, Top - Relative to spine,  Center  - Relative to spine,  Right  - Relative to spine","preferredSize":[0,0],"alignment":null,"selection":0}},"item-24":{"id":24,"type":"DropDownList","parentId":21,"style":{"text":"Rotation:","listItems":"0, 90, 180, 270","preferredSize":[0,0],"alignment":null,"selection":0}},"item-25":{"id":25,"type":"StaticText","parentId":21,"style":{"text":"Offset by:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-26":{"id":26,"type":"Group","parentId":21,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-27":{"id":27,"type":"StaticText","parentId":26,"style":{"text":"X:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-28":{"id":28,"type":"EditText","parentId":26,"style":{"text":"0","preferredSize":[40,0],"alignment":null}},"item-29":{"id":29,"type":"StaticText","parentId":26,"style":{"text":"X:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-30":{"id":30,"type":"EditText","parentId":26,"style":{"text":"0","preferredSize":[40,0],"alignment":null}},"item-31":{"id":31,"type":"Panel","parentId":19,"style":{"text":"Placement Options","preferredSize":[0,160],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-32":{"id":32,"type":"DropDownList","parentId":31,"style":{"text":"Crop to:","listItems":"Art, Crop, Trim, Bleed, Media","preferredSize":[0,0],"alignment":null,"selection":0}},"item-33":{"id":33,"type":"Checkbox","parentId":31,"style":{"text":"Place Pages on a New Layer","preferredSize":[0,0],"alignment":null}},"item-34":{"id":34,"type":"Checkbox","parentId":31,"style":{"text":"Ignore Font and Image Errors","preferredSize":[0,0],"alignment":null}},"item-35":{"id":35,"type":"Checkbox","parentId":31,"style":{"text":"Transparent PDF Background","preferredSize":[0,0],"alignment":null,"checked":true}},"item-36":{"id":36,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-37":{"id":37,"type":"Button","parentId":36,"style":{"text":"OK","justify":"center","preferredSize":[0,0],"alignment":null}},"item-38":{"id":38,"type":"Button","parentId":36,"style":{"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null}},"item-39":{"id":39,"type":"EditText","parentId":1,"style":{"text":"1","preferredSize":[60,0],"alignment":null}},"item-40":{"id":40,"type":"Checkbox","parentId":1,"style":{"text":"Map to Doc Pages","preferredSize":[0,0],"alignment":null}}},"order":[0,20,1,2,6,3,4,5,8,7,39,40,9,10,11,12,13,14,18,15,16,17,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]}')),modal.remove(),loadingScreen.init(1.5,function(){location.reload()})},300)}),e.find(".no").on("click",function(){modal.remove()})}),$(".grey-out-active").on("click",function(){$(this).hasClass("off")?($(this).removeClass("off"),$("#dialog").removeClass("hide-active"),notification("info","Active item highlighted in the dialog preview.",3.5)):($(this).addClass("off"),$("#dialog").addClass("hide-active"),notification("meh","Active item grayed out in the dialog preview.",3.5))}),
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
$(document).on("keydown",function(e){69==(e.keyCode?e.keyCode:e.which)&&e.altKey&&$(".l-export").trigger("click")}),shortcutExport(),$(".panel-wrap .collapse").on("click",function(){var e=$(this).parent(),t=e.hasClass("collapse")?"removeClass":"addClass";e[t]("collapse"),$("#dialog-section").backstretch("resize")}),
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
// @codekit-prepend "dialog.builder/modules/toolbar/sample.dialog.js";
// @codekit-prepend "dialog.builder/modules/custom.cursor.js";
// @codekit-prepend "dialog.builder/modules/toggle.active.visibility.js";
// @codekit-prepend "dialog.builder/modules/notifications.js";
// @codekit-prepend "dialog.builder/modules/legend.js";
// @codekit-prepend "dialog.builder/modules/panels.collapse.js";
$(".panel-wrap").each(function(){$(this).find(".overflow-wrap").overlayScrollbars({})}),$("#dialog-overlay-wrap").overlayScrollbars({className:"os-theme-dark",scrollbars:{visibility:"visible",autoHide:"never"}});var data=local_storage.get("dialog");
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
$.each(data.order,function(e,t){void 0!==data.items["item-"+t].style.preferredSize&&(item.activate(t),item.update.style.dialogPreview("preferredSize",data,data.items["item-"+t],"loadFromLocalStorage"))}),
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
vertical:!0,distance:4,delay:100,
// I didn't do a huge amount of testing, but it seems setting a minus
// tolerance helped with a problem when using the 'isValidTarget' function.
// - Vague description: Somehow when isValidTarget
// function was utilized to prevent dragging tabs where they don't
// belong, just sorting withing a tabbed panel make the placeholder
// line jump up and down in a way that din't make any sense...
tolerance:-3,isValidTarget:function(e,t){var i=tabbedPanel.onDragValid(e,t),a=treeView.onDragValid(e,t);
// TRUE = Droppable
// FALSE = No dropsies
return!i&&!a},onDragStart:function(e,t,i,a){
// Gives the container a static width to prevent size from changing as
// soon as you remove something by dragging. This width is removed onDrop.
treeDialog.width(treeDialog.width()),
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
0<e.find(".item-text").length?(
// For most items nothing needs to be done
// onDragStart, except when you're duplicating items
tab.onStartSort(e),
// DUPLICATE ITEMS
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
a.altKey&&(
// Make a clone in the place of the original...
e.clone().insertAfter(e).addClass("dolly"),$("body").addClass("duplicate-item"))):t.options.drop||e.clone(!0).insertAfter(e),i(e,t)},onDrop:function(e,t,i){if(
// The width is made static onDragStart making things
// less jumpy. This normalizes the container width.
treeDialog.width("auto"),0<t.target.closest("#panel-new-item-wrap").length)e.remove();else{var a=0<e.find(".item-text").length,n=$("body").hasClass("duplicate-item");
// REGULAR SORT
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
a&&!n?item.drag.sort(e):a&&n?item.drag.duplicate(e,t):item.drag.make(e)}i(e,t)}}),
// ADD ITEMS BY DRAGGING THEM INTO THE TREE VIEW
// The events are handled in the function above
$("#panel-new-item-wrap ul").sortable({drop:!1,group:"dialog-items"}),item.drag={},
// *********************************
// DRAG - SORT ITEM(S) (onDrop)
// *********************************
item.drag.sort=function(e){
// $('#panel-tree-view-wrap .sort-temp-item').remove();
var t=e.parent("ul").parent("li").data("item-id"),i=e.prev(),a=0<i.length?"insertAfter":"prependTo",n=0<i.length?i.data("item-id"):t;e.attr("item-parent-id",t),e.data({"item-parent-id":t});var d=e.data("item-type"),r=e.data("item-id");item.funnel.sort(r,t,d,a,n),item.activate(r);
// Build Item Properties panel
var l=local_storage.get("dialog");edit_style_panel.build(l.items["item-"+r].style),tab.onSort(e),treeViewItem.onSort(e,d,r)},
// *********************************
// DRAG - MAKE NEW ITEM (onDrop)
// *********************************
item.drag.make=function(e){var t=e.prev(),i=e.parent("ul"),a=t.length<1,n=t.data("parent"),d=a?i:t,r={id:item.get.id(),// Picked up in the function onDragStart.
type:e.data("item-type"),parentId:a?i.parent("li").data("item-id"):t.data("item-parent-id"),// Fetch parent id from the previous item. If it doesn't exist, fetch id from the parent item.
target:d,previousIsParent:n,event:"drag"};// Traget previous item. If it doesn't exist, target parent item.
e.remove(),// Item is the dragged li from the "Add Items" panel
item.funnel.create(r)},
// **************************************
// DRAG - DUPLICATE ITEM(S) (onDrop)
// **************************************
item.drag.duplicate=function(e,r){var t=e.prev(),i=e.parent("ul"),a=t.length<1,l=t.data("parent"),o=a?i:t;// Target previous item. If it doesn't exist, target parent item.
$("body").removeClass("duplicate-item"),// The function of this class is to change the cursor
// Dolly becomes a real sheep by way of eliminating the original
// The cloned elements are actually just thrown away and then re-created
// from scratch. I did it this way because there's basically 3 places
// where the items exist at all times; Treeview, Dialog Preview and Local
// storage. Since I have a system in place for creating items that handles
// creating the item in all of these 3 places in one swing, then why not...
$("#panel-tree-view-wrap .dolly").removeClass("dolly"),e.remove();var s,c=local_storage.get("dialog"),p=$("#panel-tree-view-wrap"),m={};
// Filled inside the each function below.
// Dragged item and every child with data-item-id attribute
e.find("[data-item-id]").add(e).each(function(e){var t=$(this).data("item-id"),i=c.items["item-"+t],a=item.get.id(),n=0===e?r.target.parent("li").data("item-id"):m["parent-"+i.parentId];
// Maps old parent id with the new parent id so that
// following items can then check what they new parent id is
$(this).data("parent")&&(m["parent-"+t]=a);var d={id:a,type:i.type,parentId:n,target:0===e?o:p.find('[data-item-id="'+n+'"] > ul'),event:0===e?"drag-duplicate":"loadFromLocalStorage",previousIsParent:l,sourceId:t};0===e&&(s=d.id),item.funnel.create(d)}),
// Reactivate the ye olde active item
item.activate(s);var n=(
// Build Item Properties panel
c=local_storage.get("dialog")).items["item-"+s];edit_style_panel.build(n.style),$("body").removeClass("dragging")};var dialogElem=$("#dialog");
// ACTIVATE ITEMS WHEN FOCUSED IN DIALOG PREVIEW
dialogElem.on("focus","[contenteditable]",function(){var e=$(this),t=(e.parent().attr("id"),e.hasClass("tab")&&e.data("tab-id")||e.closest("[data-item-id]").data("item-id"));item.activate(t);
// Build Item Properties panel
var i=local_storage.get("dialog");edit_style_panel.build(i.items["item-"+t].style,"dialog")}),
// My man EditText needs some extra care to keep its public image.
dialogElem.on("focus blur",'[data-item-type="EditText"] [contenteditable]',function(e){"focusin"===e.type?$(this).parent().parent().addClass("focused"):dialogElem.find(".focused").removeClass("focused")}),dialogElem.on("click",'[data-item-type="EditText"]',function(e){e.preventDefault(),$(this).find("[contenteditable]").focus()}),
// MIRROR TEXT CHANGES TO EDIT PANEL FROM DIALOG CONTENTEDITABLE
dialogElem.on("keydown","[contenteditable]",function(e){return lineBreakIntercept(e)}).on("keyup","[contenteditable]",function(){
// var linebreak = $(this).text().indexOf('\n');
var e=$('#panel-edit-style-wrap [data-edit="text"]'),t=$(this).html().replace(/<br>$/,"").split("<br>").join("\n");
// Properties panel is updated right here, and the funnel update below updates local storage + tree view
// I'm not a 100% sure what is going on, but it seems that
// in this contenteditable div, when you make line break at
// the end, it actually adds 2 br tags, but when you remove
// the linebreak you made, it only removes one of them.
// So for now I'm going to just make sure it doesn't travel further up the chain...
e.html(t);
// This is a bit dangerous... If I ever change the css of the text
// container in these two, there may be issues. The more flexible
// method I used elsewhere doesn't work here because the caret
// position would be reset and it's just as slippery as this.
var i=$(this).closest("[data-item-type]").hasClass("static-text"),a=$(this).closest("[data-item-type]").hasClass("edit-text");if(i||a){var n=$(this).height(),d=!1;i&&25.5<n?d=!0:a&&22.5<n&&(d=!0),console.log(d),d?$(this).addClass("multiline"):$(this).removeClass("multiline")}
// Keeps textbox height up to date with the content
autosize.update(e);item.funnel.update("text","dialog")}).on("paste","[contenteditable]",function(e){e.preventDefault(),// Don't want to be pasting html into contenteditable
notification("meh","Sorry, you can't paste text here. <br> The textarea in Item Properties Panel has been focused, paste there instead.",5.5),$('#panel-edit-style-wrap [data-edit="text"]').focus()}),
// DIALOG TITLE ELLIPSIS (input/contenteditable with ellipsis) FIX:
// Related code can be found in 'dialog-preview.scss' file. Search
// for: #5945573415 The css already gets rid of the ellipsis
// on focus, but that is only part of the problem. When user
// unfocuses, it comes back kinda wonky. I found that flashing
// normal whitespace and switching back to nowrap fixed it..
$("#dialog-title-bar div").on("blur",function(){var e=$(this);e.css({whiteSpace:"normal"}),setTimeout(function(){e.css({whiteSpace:"nowrap"})},.1)});