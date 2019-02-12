function breadCrumbs(e,t){
// Burn it all!!
e.find(".active-parent").removeClass("active-parent"),t.parentsUntil(".dialog.tree-root").filter('[data-parent="true"]').addClass("active-parent")}
// Just don't jump in the witch's oven...
function lightThePath(e,t){if(
// Burn it all!! Okay... Maybe not the best word choice there...
$(".path-node").removeClass("path-node"),$(".path-item").removeClass("path-item"),$(".path-sibling-node").removeClass("path-sibling-node"),$(".path-end").removeClass("path-end"),$(".path-start").removeClass("path-start"),$(".path-start-last").removeClass("path-start-last"),$(".path-start-node").removeClass("path-start-node"),$(".path-parent-ul").removeClass("path-parent-ul"),"Dialog"!==t.data("item-type")&&!t.parent().parent().hasClass("tree-root")){e.find(".active-parent").first().addClass("path-end");
// PATH END
var a=t;a.next().length<1?a.addClass("path-start-last"):a.data("parent")?a.addClass("path-start-node"):a.addClass("path-start"),e.find(".active-parent:not(:first)").addClass("path-node").add(a).each(function(){$(this).prevUntil(":first").each(function(){$(this).data("parent")?($(this).addClass("path-sibling-node"),$(this).parent("ul").addClass("path-parent-ul")):$(this).addClass("path-item")})})}}function droplistOnWindowResize(){$(window).on("resize",function(){droplist.hide()})}// Defines how fast the number updates while dragging.
function numberInputs(){function s(e,t,a,i){var n=e.val();if(isNaN(n))e.val(g);else{n=parseInt(n,10);var l=$("#dialog .active"),s=e.hasClass("width"),r=e.hasClass("height"),d={min:parseInt(e.attr("min"),10),max:parseInt(e.attr("max"),10),step:i||parseInt(e.attr("step"),10),modifierStep:parseInt(e.attr("modifier-step"),10)},o=(a?d.modifierStep:d.step)||1,c=n<d.min,p=n>d.max,m=c||p;
// If value is 0 when the action starts → fetch
// visual size and then continue as normal...
if(v)if(v=!1,s)n=Math.round(l.width())+("down"===t?1:0)-("up"===t?1:0);else if(r){var u="Dialog"===$("#dialog .active").data("item-type")?l.find("> .padding-box").outerHeight():l.height();n=Math.round(u)+("down"===t?1:0)-("up"===t?1:0)}switch(t){case"blur":if(m){var f=c&&d.min||p&&d.max;e.val(f)}break;case"up":n<d.max&&(n=n+o>d.max?d.max:n+o,e.val(n),g=n);break;case"down":n>d.min&&(n=n-o<d.min?d.min:n-o,e.val(n),g=n);break}}item.funnel.update(e.data("edit"))}$(".number").wrap('<div class="number-wrap">');var g,v,e=$(".number-wrap");$('<div class="arrow plus"></div><div class="arrow minus"></div><div class="number-overlay"></div>').appendTo(e);var t=e.find(".number"),a=e.find(".number-overlay");t.each(function(){"none"===$(this).css("display")&&$(this).closest(".number-wrap").addClass("hide")});var r,d,o=!1,c=0,p=null,m=null;$(window).on("mousedown mousemove mouseup",function(e){if("mousedown"===e.type)o=!0,r=$(e.target).parent(),d=r.find("> .number"),g=d.val(),v=0==g;else if("mousemove"===e.type){if(o&&mousemovePing&&d.hasClass("number")){
// if ( dragStartElement.data('edit') === 'margins' ) {
// 	$('body').addClass('dragging-margins');
// }
// dragWrapper.find('.number-overlay').css({ position: 'fixed' });
if(mousemovePing=!1,e.preventDefault(),null===p)return p=Date.now(),void(m=e.screenY);var t=Date.now(),a=t-p,i=e.screenY-m,n=Math.abs(Math.round(i/a*(e.shiftKey?200:40))),l=4<n?n:0;// Poor mans slow start...
p=t,m=e.screenY,e.pageY<c?s(d,"up",e.shiftKey,l):e.pageY>c&&s(d,"down",e.shiftKey,l),c=e.pageY}}else if("mouseup"===e.type){
// dragStartElement.removeClass('danger-zone');
// dragWrapper.find('.number-overlay').css({ position: 'absolute' });
o&&d.length;o=!1}}),
// I tried to emulate native functionality by making it so that
// single click simply places the caret and double click selects the
// text, but ended up leaving that out. I liked it better that the
// text gets selected however you click.
// var overlay_dblclick = true;
// The overlay is there to prevent weird text selection stuff when dragging, but
// that in turn makes it so that you can't directly focus on the input.
// With this, clicking the overlay will result in the same thing.
a.on("click",function(){$(this).parent().find(".number").focus()}),t.on("focus blur",function(e){var t=$(this);"focus"===e.type?(g=t.val(),v=0==g,$(this).select()):s(t,"blur")}),e.find(".arrow").on("click",function(e){var t=$(this),a=t.parent().find(".number");g=a.val(),v=0==g,t.hasClass("plus")?s(a,"up",e.shiftKey):t.hasClass("minus")&&s(a,"down",e.shiftKey)}),t.on("keyup",function(e){var t=e.keyCode?e.keyCode:e.which,a=$(this);g=a.val(),v=0==g,// Arrow Up
s(a,38===t?"up":40===t?"down":"numberEntry",e.shiftKey)}),a.on("wheel",function(e){
// Because the modifier key for increasing step is Shift, which also
// reverses the scroll direction, both X and Y need to be checked...
var t=e.originalEvent.deltaY,a=e.originalEvent.deltaX,i=t<0||a<0,n=$(this).parent().find(".number");g=n.val(),v=0==g,// Scroll Up
s(n,i?"up":"down",e.shiftKey)})}function exportCode(){var e=local_storage.get("dialog");return"/* \nCode for Import https://scriptui.joonas.me — (Triple click to select): \n"+JSON.stringify(e)+"\n*/ \n\n"+getJSX(e)+"dialog.show();"}function clipBoardEvent(n){
/*global ClipboardJS*/
/*eslint no-undef: ["error", { "typeof": true }] */
var e=new ClipboardJS(".btn.copy",{text:function(){return n.getValue()}});e.on("success",function(e){var t=$(e.trigger),a=t.find(".fa-check"),i=t.find(".fa-clipboard-list");a.addClass("rotateIn"),i.hide(),setTimeout(function(){a.removeClass("rotateIn"),i.show()},750)}),e.on("error",function(e){var t=$(e.trigger),a=t.find(".fa-times"),i=t.find(".fa-clipboard-list");a.addClass("tada"),i.hide(),setTimeout(function(){n.execCommand("selectAll"),a.removeClass("tada"),i.show()},750)})}function getJSX(c){var p="",m={},u={dialog:"",tab:""},// Can't remember why I added tab here, but oh well. Let's not mess with this jenga tower.
f={name:"",parent:""},g=[];// JUST DO IT
// Creates rest of the counters based on the "Add items" panel...
$('[data-panel="treeview"] ul li').each(function(){var e=$(this).data("item-id"),t=$(this).data("item-type"),a=c.items["item-"+e].style.varName;a?u[a.toLowerCase()]=-1:u[t.toLowerCase()]=0});var e=$("#panel-tree-view-wrap .tree-dialog li"),v=e.length;return e.each(function(e){var t=e,a=$(this).data().itemId,i=c.items["item-"+a],n=i.parentId,l=0===n||!1===n?"Dialog":c.items["item-"+n].type,s=i.type,r=i.id,d=i.style,o=!1;e===v-1&&(o=!0),p+=makeJSXitem(t,c,u,m,s,r,n,l,d,f,g,o)}),p}
// When the item type is not a fitting variable name...
function customVarNames(e,t,a,i){var n;if(e.varName){var l=i[e.varName.toLowerCase()];n=e.varName+(0<l?l:"")}else switch(t){case"dropdownlist":n="dropdown"+i[t];break;case"tabbedpanel":n="tpanel"+i[t];break;case"dialog":// This otherwise fine as is, I just forgot that dialog doesn't need the counters :/
n=t;break;default:n=t+i[t]}return n}function makeJSXitem(e,t,a,i,n,l,s,r,d,o,c,p){var m=[!1],u="",f=n.toLowerCase();d.varName?++a[d.varName.toLowerCase()]:++a[f];var g=customVarNames(d,f,r,a);i[l]=g;var v=i[s];
// If current item is a parent...
"TreeItem"!==n&&(item.list[n.toLowerCase()](!1).parent?(u+="// "+g.toUpperCase()+"\n",u+="// "+Array(g.length+1).join("=")+"\n"):o.parent!==v&&o.name!==v&&(u+="// "+v.toUpperCase()+"\n",u+="// "+Array(v.length+1).join("=")+"\n"));var h=$("#dialog");
// This is where each item is first added
switch(n){case"Dialog":u+="var "+g+' = new Window("'+f+'"); \n';break;case"ListBox":case"DropDownList":var y=d.listItems.split("\n").join("").split(",");$.each(y,function(e){y[e]=y[e].trim()}),u+="var "+g+'_array = ["'+y.join('","')+'"]; \n',u+="var "+g+" = "+i[s]+'.add("'+f+'", undefined, '+g+"_array",void 0!==d.selection&&"ListBox"===n&&1<d.selection.length&&(u+=", {multiselect: true}"),u+="); \n";break;case"Divider":u+="var "+g+" = "+i[s]+'.add("panel"); \n';break;case"TreeView":var b=h.find('[data-item-id="'+l+'"]'),w=0<d.preferredSize[0]?d.preferredSize[0]:Math.round(b.width()),C=0<d.preferredSize[1]?d.preferredSize[1]:Math.round(b.height());u+="var "+g+" = "+i[s]+'.add("'+n.toLowerCase()+'", [0,0,'+(w+0)+","+(C+0)+"]); \n";break;case"TreeItem":var x=h.find('[data-item-id="'+l+'"]').hasClass("tree-node")?"node":"item";u+="var "+g+" = "+i[s]+'.add("'+x+'", "'+d.text+'"); \n';break;case"StaticText":
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
if((m=multilineCheck(l))[0]){var I="    ";
// ADD PARENT GROUP
// ALIGNMENT
if(u+="var "+g+" = "+i[s]+'.add("group"); \n',
// PREFERRED SIZE
void 0!==d.preferredSize&&(0<d.preferredSize[0]&&(u+=I+g+".preferredSize.width = "+d.preferredSize[0]+"; \n"),0<d.preferredSize[1]&&(u+=I+g+".preferredSize.height = "+d.preferredSize[1]+"; \n")),
// ORIENTATION
u+=I+g+'.orientation = "column"; \n',
// ALIGN CHILDREN
void 0!==d.justify&&(u+=I+g+'.alignChildren = ["'+d.justify+'","center"]; \n'),
// SPACING
u+=I+g+".spacing = 0; \n",null!=d.alignment){var k=t.items["item-"+s].style.orientation,S="";S="column"===k?("top"===d.alignment?"left":"bottom"===d.alignment&&"right")||d.alignment:("left"===d.alignment?"top":"right"===d.alignment&&"bottom")||d.alignment;var T=t.items["item-"+s].style.alignChildren;S="column"===k?'["'+S+'","'+T[1]+'"]':'["'+T[0]+'","'+S+'"]',u+=I+g+".alignment = "+S+"; \n"}
// SPACER
u+="\n";
// All softwrapped lines have been converted into forced linebreaks
var z=m[1].split("<br>");$.each(z,function(e,t){
// ADD EACH LINE AS SEPARATE STATIC TEXT ITEM
u+=I+g+'.add("statictext", undefined, "'+t+'"); \n'})}else u+="var "+g+" = "+i[s]+'.add("'+f+'"); \n';break;case"EditText":m=multilineCheck(l);var P=$('#dialog [data-item-id="'+l+'"]'),_=Math.round(P.width()),D=Math.round(P.height()),j=m[0]?", [0,0, "+_+", "+D+" ], undefined, {multiline: true}":"";u+="var "+g+" = "+i[s]+'.add("'+f+'"'+j+"); \n";break;case"Image":u+="var "+g+'_array = ["'+encodeURIComponent(atob(d.image[0].split(",")[1].replace(/=$/,"").replace(/=$/,"")))+'"]; \n',u+="var "+g+" = "+i[s]+'.add("image", undefined, File.decode('+g+"_array[0]) ); \n";break;default:u+="var "+g+" = "+i[s]+'.add("'+f+'"); \n'}o.name=g,o.parent=i[s];var A=/*type === 'TreeView' ||*/"TreeItem"!==n||p?"\n":"";u+=styleJSXitem(t,a,i,n,l,s,r,d,g,c,m)+A;
// Add in treeItem expanded properties if this is the last of treeItems in this group
var L=t.order[e+1];if(void 0!==L){var N=t.items["item-"+L],E="TreeItem"===n&&"TreeItem"!==N.type;E&&0<c.length?(u+="\n",$.each(c,function(e,t){u+=t}),u+="\n",c=[]):E&&(u+="\n")}else void 0===L&&"TreeItem"===n&&($.each(c,function(e,t){u+=t}),u+="\n",c=[]);return u}function multilineCheck(e){var l=!1,s=[],r=$('#dialog [data-item-id="'+e+'"] .text-container'),t=r.html(),a=t.replace(/<br>$/,"").split(" ");// Just to make super sure the dialog text stays the same...
return r.html(""),$.each(a,function(e,t){var i=t.split("<br>");if(1<i.length)l=!0,$.each(i,function(e,t){var a=e===i.length-1;r.html(r.html()+(a?"":" ")+t+(a?"":"<br>")),s.push((a?"":" ")+t+(a?"":"<br>"))});else{var a=r.height(),n=0===e?"":" ";r.html(r.html()+n+t),
// New line has appeared.
// Joonas uses crushing depression. It's super effective!
a<r.height()?(s.push(t),l=!0,s.splice(s.length-1,0,"<br>")):s.push(n+t)}}),r.html(t),[l,s.join("")]}function styleJSXitem(e,t,a,i,n,l,s,r,d,o,c){var p="",m="    ";
// var counter = counters[ type.toLowerCase() ];
if("TreeItem"===i){var u=e.items["item-"+n].expanded,f=$('#dialog [data-item-id="'+n+'"]').parentsUntil(".tree-view").filter(".tree-view-item"),g=!1;$.each(f,function(){$(this).hasClass("expanded")||(g=!0);// CLOSE THE FLOOD GATES!!! AAAAAAAAAAAAAAAAAAAA!!!
}),u&&!1===g&&o.push(m+d+".expanded = true; \n")}else if("Divider"===i)p+=m+d+'.alignment = "fill"; \n';else if("Slider"===i)p+=m+d+".minvalue = 0; \n",p+=m+d+".maxvalue = 100; \n",p+=m+d+".value = 50; \n";else{if(
// DROP LIST SELECTION
"DropDownList"===i&&void 0!==r.selection&&(p+=m+d+".selection = "+r.selection+"; \n"),"ListBox"===i&&void 0!==r.selection&&0<r.selection.length)p+=m+d+".selection = "+(1<r.selection.length?JSON.stringify(r.selection):r.selection)+"; \n";
// TABBED PANEL SELECTION
// Due to me being an idiot, it's better for our insanity if tabbed panel selection defined when the selected item is created.
// TEXT
if("Tab"===i&&e.items["item-"+l].style.selection===n&&(p+=m+a[l]+".selection = "+d+"; \n"),
// TABBED PANEL ALIGN CHILDREN
"TabbedPanel"===i&&(p+=m+d+'.alignChildren = "fill"; \n'),void 0!==r.text&&0<r.text.length)if("StaticText"===i&&!c[0]||"StaticText"!==i)p+=m+d+'.text = "'+("EditText"===i&&c[0]?r.text.split("\n").join("\\r"):r.text)+'"; \n';
// CHECKED
// PREFERRED SIZE
if(!0===r.checked&&(p+=m+d+".value = "+r.checked+"; \n"),void 0!==r.preferredSize&&"TreeView"!==i){var v=r.preferredSize[0],h=r.preferredSize[1];c[0]||(0<v&&(p+=m+d+".preferredSize.width = "+v+"; \n"),0<h&&(p+=m+d+".preferredSize.height = "+h+"; \n"))}
// JUSTIFY
if(void 0!==r.justify&&"left"!==r.justify||"Button"===i&&"center"!==r.justify)if(!c[0]&&"StaticText"!==i)p+=m+(0<(void 0===r.text?0:r.text.indexOf("\n"))?"// ":"")+d+'.justify = "'+r.justify+'"; \n';
// ORIENTATION
// MARGINS
if(void 0!==r.orientation&&(p+=m+d+'.orientation = "'+r.orientation+'"; \n'),
// ALIGN CHILDREN
void 0!==r.alignChildren&&(p+=m+d+'.alignChildren = ["'+r.alignChildren[0]+'","'+r.alignChildren[1]+'"]; \n'),
// SPACING
void 0!==r.spacing&&(p+=m+d+".spacing = "+r.spacing+"; \n"),void 0!==r.margins)p+=m+d+".margins = "+("object"==typeof r.margins?"["+r.margins[3]+","+r.margins[0]+","+r.margins[1]+","+r.margins[2]+"]":r.margins)+"; \n";
// ALIGNMENT
if(null!=r.alignment&&!c[0]){var y=e.items["item-"+l].style.orientation,b="";b="column"===y?("top"===r.alignment?"left":"bottom"===r.alignment&&"right")||r.alignment:("left"===r.alignment?"top":"right"===r.alignment&&"bottom")||r.alignment;var w=e.items["item-"+l].style.alignChildren;p+=m+d+".alignment = "+(b="column"===y?'["'+b+'","'+w[1]+'"]':'["'+w[0]+'","'+b+'"]')+"; \n"}}return p}function resetDialog(){modal.init('<div id="reset-box"><h2>Delete Dialog.jsx</h2><span class="text">This will delete the dialog, <br /> allowing you to start over from a clean slate.</span><span class="yes" data-enter>Delete</span><span class="no">Cancel</span></div>');var e=$("#reset-box");e.find(".yes").on("click",function(){modal.remove(),setTimeout(function(){local_storage.remove("dialog"),loadingScreen.init(null,function(){location.reload()})},300)}),e.find(".no").on("click",function(){modal.remove()})}
/* exported notification */
function notification(e,t,a){
// "I think that padding makes you look fat..."
function i(e){e.addClass("fadeOut"),setTimeout(function(){e.remove()},300)}
// HTML
var n=$('<div class="notification '+e+' animated"><div><i class="fas fa-info-circle icon"></i><div class="msg">'+t+"<div></div></div>").appendTo("#notifications-wrap"),l=$("#notifications-wrap .notification").length;
// Crowd control - GET BACK YOU MONSTERS!!!! *hoses the crap out of the crowd while frantically digging for the pepper spray*
1<=l&&i($("#notifications-wrap .notification").slice(0,l-1));var s=n.height();n.css({height:0,visibility:"visible"}),n.animate({height:s},300,"easeInOutBack"),
// Bananas - B - A - N - A - N - A - S !!
$("#notifications-wrap .notification:last").addClass("last").prev().removeClass("last"),
// Ain't nobody got time to close notifications manually.
// But would you be interested in our newsletter?
setTimeout(function(){i(n)},1e3*a||5e3)}function shortcutExport(){var e=new ClipboardJS(".l-export",{text:function(){return exportCode()}}),t=$(".l-export");e.on("success",function(){clearTimeout(bgTimeout),t.addClass("success"),$("body").addClass("successful-shortcut-export"),bgTimeout=setTimeout(function(){t.removeClass("success"),$("body").removeClass("successful-shortcut-export")},350),clearTimeout(iconTimeout),$("#dialog-section #export-success-icon").remove(),$('<div id="export-success-icon"><div class="center-1"><div class="center-2"><div class="center-3"><div class="circle"><img src="assets/images/export-shortcut-icon.svg?'+(new Date).getTime()+'" alt="" /></div></div></div></div></div>').appendTo("#dialog-section"),iconTimeout=setTimeout(function(){$("#export-success-icon").remove()},950)}),e.on("error",function(){t.addClass("failure"),$("body").addClass("shortcut-export-failure"),setTimeout(function(){t.removeClass("failure"),$("body").removeClass("shortcut-export-failure")},350)})}function lineBreakIntercept(e){
// Stop the press if element doesn't support multiline.
var t=e.keyCode?e.keyCode:e.which,a=$("#panel-tree-view-wrap .active").data("item-type"),i=item.list[a.toLowerCase()](!1).multiline;return!(13===t&&!i)}var local_storage={set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){return JSON.parse(localStorage.getItem(e))},remove:function(e){localStorage.removeItem(e)}},reText={tabs:" <br><br>You can nest TabbedPanels by inserting them inside a Tab item. <br><br>Visible tabs are selected on export (WYSIWYG)."},item={list:{}};item.list.dialog=function(e){return{type:"Dialog",parent:!0,defaultStyle:{varName:null,text:"Dialog",preferredSize:[0,0],margins:16,orientation:"column",spacing:10,alignChildren:["center","top"]},previewHtml:'<div id="dialog-container" data-parent="true" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div id="dialog-title-bar"><div contenteditable="true">'+e.type+'</div></div><div class="padding-box"></div></div>'}},item.list.group=function(e){return{type:"Group",parent:!0,addPanelIconClass:"fas fa-object-group",defaultStyle:{varName:null,preferredSize:[0,0],margins:0,orientation:"row",spacing:10,alignChildren:["left","center"],alignment:null},previewHtml:'<div class="group" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.panel=function(e){return{type:"Panel",parent:!0,addPanelDivider:"below",addPanelIconClass:"fas fa-columns",defaultStyle:{varName:null,text:"Panel",preferredSize:[0,0],margins:10,orientation:"column",spacing:10,alignChildren:["left","top"],alignment:null},previewHtml:'<div class="panel" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="title" contenteditable="true">'+e.type+'</span><div class="padding-box"></div></div>'}},item.list.statictext=function(e){return{type:"StaticText",addPanelIconClass:"fas fa-font",multiline:!0,editInfo:'This item supports multiline text. <br><br>Due to issues with ScriptUI multiline text, the code export will not output "true" multiline. <br><br>Instead, multiline <code>statictext</code> will be sliced and diced into several <code>statictext</code> and put inside a <code>group</code>.',defaultStyle:{varName:null,text:"StaticText",justify:"left",preferredSize:[0,0],alignment:null},previewHtml:'<div class="static-text" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="text-container" contenteditable="true">'+e.type+"</span></div>"}},item.list.edittext=function(e){return{type:"EditText",addPanelIconClass:"fas fa-i-cursor",multiline:!0,editInfo:"This item supports multiline text. <br><br>Multiline text flow may differ drastically from ScriptUI.",defaultStyle:{varName:null,text:"EditText",
// justify: 'left',
preferredSize:[0,0],alignment:null},previewHtml:'<div class="edit-text" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><span class="edit-text-inner-wrap"><span class="text-container" contenteditable="true">'+e.type+"</span></span></div>"}},item.list.button=function(e){return{type:"Button",addPanelIconClass:"fas fa-toggle-on",defaultStyle:{varName:null,text:"Button",justify:"center",preferredSize:[0,0],alignment:null},previewHtml:'<div class="button" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="button-border"><span class="text-container" contenteditable="true">'+e.type+"</span></div></div>"}},item.list.divider=function(e){return{type:"Divider",addPanelIconClass:"fas fa-strikethrough",defaultStyle:{varName:null},stylePropInfo:"This item doesn't have any adjustable properties.",editInfo:"Divider orientation is locked to the parent item orientation.",previewHtml:'<div class="panel divider-line" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.checkbox=function(e){return{type:"Checkbox",addPanelIconClass:"fas fa-check-square",editInfo:"You can check the checkbox in the dialog preview.",defaultStyle:{varName:null,text:"Checkbox",preferredSize:[0,0],alignment:null},previewHtml:'<div class="checkbox" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="radiocheck checkbox"><i class="fas fa-check"></i></i></div><label contenteditable="true">'+e.type+"</label></div>"}},item.list.radiobutton=function(e){return{type:"RadioButton",addPanelIconClass:"fas fa-dot-circle",editInfo:"You can check the radiobutton in the dialog preview. <br><br> Radiobuttons are split into different groups if there is a different type of item between them.",defaultStyle:{varName:null,text:"RadioButton",preferredSize:[0,0],alignment:null},previewHtml:'<div class="radiobutton" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="radiocheck radiobutton"><i class="fas fa-circle"></i></div><label contenteditable="true">'+e.type+"</label></div>"}},item.list.dropdownlist=function(e){return{type:"DropDownList",addPanelIconClass:"fas fa-caret-square-down",editInfo:"You can select a dropdown item in the dialog preview. <br><br>You can make a divider by adding an item that is a single dash character: <code>-</code>.",defaultStyle:{varName:null,text:"DropDownList",listItems:"Item 1, -, Item 2",preferredSize:[0,0],alignment:null,selection:0},previewHtml:'<div class="dropdownlist" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><label contenteditable="true">'+e.type+'</label><div class="drop-list-wrap"><div class="items"><div class="selected">Item 1</div><div>-</div><div>Item 2</div></div><div class="arrow"><i class="fas fa-chevron-down"></i></div></div></div>'}},item.list.slider=function(e){return{type:"Slider",addPanelIconClass:"fas fa-sliders-h",defaultStyle:{varName:null},stylePropInfo:"This item doesn't have any adjustable properties.",editInfo:"Export outputs a static range from 0 to 100 with current value of 50 every single time.",previewHtml:'<div class="slider" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><input type="range" min="0" max="100" value="" /></div>'}},item.list.listbox=function(e){return{type:"ListBox",addPanelIconClass:"fas fa-list-alt",editInfo:"You can select item(s) in the dialog preview. <br><br> If you select multiple items, <code>multiline</code> property will be added on export.",defaultStyle:{varName:null,listItems:"Item 1, Item 2",preferredSize:[0,0],alignment:null},previewHtml:'<div class="list-box" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="inner-wrap"><ul><li><span>Item 1</span></li><li><span>Item 2</span></li></ul></div></div>'}},item.list.image=function(e){return{type:"Image",addPanelIconClass:"fas fa-image",editInfo:"Images are never actually uploaded anywhere, they are stored locally in your browser. <br><br>Make sure to resize images before uploading. <br /><br />It is actually possible to do this in ScriptUI, but takes quite a bit of trickery. I chose not to include it in favor of smaller filesize.",defaultStyle:{varName:null,image:["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQdJREFUeNrslv0NgyAQxcV0AEZwBEdoN3AEu0E7iSN0hW6gG9gRuoFuQB8NtGg9QSL4R33JixcUf3zcEZiAkg2UJhvpYMRX+BGYl8PVOxJfHV164rsc5j5UydCwdEGnAu4QtnCH+OY7AOcZ410moeJXVegZFzAn2jfJah4afF/Yvg6YMfbE4wz3RnOjSjBcchnfcpUgWbRyUjPv4UatgDmYWtZ3tORSdVzDcrUWwVPLjyu4tEBzI8Pd4dQeq5NJq5zY61ZMq6Pg5h5PgkfQAdwCnYXPggmo1sUBSsJJsAXqowGcArcijD5wE8wiXX3kiXfSmR/z6jMuvYT93WVvB+/gHbyaXgIMAHWCmD3KjfSwAAAAAElFTkSuQmCC"],alignment:null},previewHtml:'<div class="image-item" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><img src="" alt="" /></div>'}},item.list.tabbedpanel=function(e){return{type:"TabbedPanel",parent:!0,addPanelDivider:"above",addPanelIconClass:"fas fa-folder",editInfo:'<strong>Valid child item:</strong> <br><i class="far fa-folder"></i> Tab.'+reText.tabs,defaultStyle:{varName:null,preferredSize:[0,0],margins:10,alignment:null},previewHtml:'<div class="panel tabbed-panel" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="tab-container"></div><div class="padding-box"></div></div>'}},item.list.tab=function(e){return{type:"Tab",parent:!0,addPanelDivider:"below",addPanelIconClass:"far fa-folder",editInfo:"Can only be placed inside <br><i class='fas fa-folder'></i> TabbedPanel."+reText.tabs,defaultStyle:{varName:null,text:"Tab",preferredSize:[0,0],margins:10,orientation:"column",spacing:10,alignChildren:["left","top"]},previewHtml:'<div class="panel tab" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.treeview=function(e){return{type:"TreeView",parent:!0,addPanelIconClass:"fas fa-tree",editInfo:'<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem.',defaultStyle:{varName:null,preferredSize:[0,0],alignment:null},previewHtml:'<div class="panel tree-view" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="padding-box"></div></div>'}},item.list.treeitem=function(e){return{type:"TreeItem",parent:!0,addPanelDivider:"below",addPanelIconClass:"fas fa-leaf",editInfo:'<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem. <br><br>You can expand or collapse these items in the dialog preview by clicking the arrows.',defaultStyle:{varName:null,text:"TreeItem"},previewHtml:'<div class="tree-view-item" data-parent="true" data-item-type="'+e.type+'" data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'"><div class="item-wrap"><span class="tree-view-arrow"><i class="fas fa-chevron-right"></i></span><span class="text-container" contenteditable="true">'+e.type+'</span></div><div class="padding-box"></div></div>'}},
// Cram it in there...
item.funnel={create:function(e){e.style=item.create.localStorage(e),item.create.treeView(e),item.update.order(),// Rebuilds the order every time a new item is created.
item.create.dialogPreview(e),item.activate(e.id),tab.onCreate(e);item.funnel.update("all","localStorage"),"loadFromLocalStorage"===e.event||edit_style_panel.build(e.style),"TabbedPanel"===e.type&&tabbedPanel.onCreate(e.event),"TreeView"===e.type&&treeView.onCreate(e.event);var t=$('#dialog [data-item-id="'+e.id+'"]');if("EditText"===e.type){var a=t.find(".edit-text-inner-wrap"),i=t.find("[contenteditable]"),n=a.overlayScrollbars({paddingAbsolute:!0}).overlayScrollbars(),l=$(n.getElements().host).find(".os-content-glue").first(),s=function(){l.html(i.html())};s(),i.on("input",function(){s()})}else"ListBox"===e.type&&t.find(".inner-wrap").overlayScrollbars({});$("#dialog-section").backstretch("resize")},remove:function(e){var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]'),a=t.prev(),i=t.next(),n=t.parent("ul").parent("li"),l=t.data("item-type");
// If the removed item was active, figure out which element to activate next.
if(item.remove.treeView(e),item.remove.dialogPreview(e,l),item.remove.localStorage(),$("#panel-tree-view-wrap .active").length<1){
// Order of operation:
// ( If not possible, move to the next one )
// 1. Select next down
// 2. Select next up
// 3. Select parent
e=0<i.length&&i.data("item-id")||0<a.length&&a.data("item-id")||n.data("item-id"),item.activate(e);
// Build Item Properties panel
var s=local_storage.get("dialog");edit_style_panel.build(s.items["item-"+e].style)}setTimeout(function(){$("#dialog-section").backstretch("resize")},1)},update:function(e,t){droplist.hide();
// LOCAL STORAGE
var a=local_storage.get("dialog"),i=(a="localStorage"===t?a:item.update.style.localStorage(e,a)).items["item-"+a.activeId];
// TREE VIEW PANEL
item.update.style.treeView(e,a,i),
// DIALOG PREVIEW
"dialog"!==t&&item.update.style.dialogPreview(e,a,i),
// TAB - ITEM
tab.onUpdate.init(a,i.id),
// TREE VIEW - ITEM
treeViewItem.onUpdate(a,i),forceSize.onUpdate(e,a,i),
// Background size was not always updating, so this be a quick fix for I am lazy...
// It was happening especially when the text changes from type to anything else.
setTimeout(function(){$("#dialog-section").backstretch("resize")},10)},sort:function(e,t,a,i,n){item.sort.dialogPreview(e,t,a,i,n),item.sort.localStorage(e,t),$("#dialog-section").backstretch("resize")}},item.create={localStorage:function(e){var t=local_storage.get("dialog"),a=(t=null===t?{}:t).hasOwnProperty("items"),i="item-"+e.id,n=!1;
// Make object for the current item and fill it...
if(a&&(n=t.items.hasOwnProperty(i)),t.activeId=e.id,!n){void 0===t.items&&(t.items={}),void 0===t.items[i]&&(t.items[i]={});var l=t.items[i];
// Add item id
l.id=e.id,
// Add item type
l.type=e.type,
// Add parent id
l.parentId=e.parentId,
// Copy style from existing element
// SourceId is used in item duplication. If it's set, duplication is in process.
e.sourceId?l.style=$.extend(!0,{},t.items["item-"+e.sourceId].style):l.style=item.list[e.type.toLowerCase()](e).defaultStyle}
// Always return style object, which is either default data or data that is saved in local storage
return t.items["item-"+e.id],
// Adds varName to the style if it's missing
void 0===t.items["item-"+e.id].style.varName&&(t.items["item-"+e.id].style.varName=null),local_storage.set("dialog",t),t.items["item-"+e.id].style},treeView:function(e){var t=item.list[e.type.toLowerCase()](!1).parent?'data-parent="true"':"",a=$("<li "+t+' data-item-id="'+e.id+'" data-item-parent-id="'+e.parentId+'" data-item-type="'+e.type+'" class="'+e.type.toLowerCase()+'"><span class="remove-item"><i class="fas fa-times"></i></span><span class="item-text">'+e.type+"</span></li>");"Dialog"===e.type&&(a=$('<ul class="tree-dialog">'+a.prop("outerHTML")+"</ul>")).find("> li").addClass("tree-root");
// Special treatment for all parent items
var i=e.type.toLowerCase();item.list[i](!1).parent&&$("<ul></ul>").insertAfter(a.find(".item-text")),t=(e.target.is("ul")?e.target.parent("li"):e.target).data("parent");
// No data in ul, so gotta go a step higher to look for the data...
var n,l=e.event.match(/^drag/);
// Append to parent items
n=t?l?e.previousIsParent?"insertAfter":"prependTo":"appendTo":"insertAfter",$(a)[n](e.target)},dialogPreview:function(e){var t,a,i=item.list[e.type.toLowerCase()](e).previewHtml,n=e.target.is("ul")?e.target.parent("li"):e.target,l=n.data("parent"),s=n.data("item-id"),r=$("#dialog"),d=r.find('[data-item-id="'+s+'"]'),o=e.event.match(/^drag/);
// No data in ul, so gotta go a step higher to look for the data...
// Append to parent items
a=l?(t=o?e.previousIsParent?"insertAfter":"prependTo":"appendTo","Dialog"===e.type?r:o&&e.previousIsParent?d:d.find("> .padding-box")):(t="insertAfter",r.find('[data-item-id="'+s+'"]')),$(i)[t](a);var c=$('#dialog [data-item-id="'+e.id+'"]');"DropDownList"===e.type?droplist.init(c,e.id):"RadioButton"===e.type||"Checkbox"===e.type?radiocheck.init(c,e.id,e.type):"ListBox"===e.type&&listbox.init(c,e.id)}},item.get={},item.get.order=function(){var t=[];return $("#panel-tree-view-wrap .contents [data-item-id]").each(function(){var e=$(this).data("item-id");t.push(e)}),t},item.get.id=function(){var e=item.get.order();return Math.max.apply(null,e)+1},item.activate=function(e){droplist.hide();
// Write active item id to local storage
var t=local_storage.get("dialog");t.activeId=e,local_storage.set("dialog",t);
// Change the active element in the treeview.
var a=$("#panel-tree-view-wrap");a.find(".active").removeClass("active");var i=a.find('[data-item-id="'+e+'"]');i.addClass("active");
// Change the active element in the dialog preview
var n=$("#dialog");n.find(".active").removeClass("active"),n.find('[data-item-id="'+e+'"]').addClass("active"),tab.onActivate(e),breadCrumbs(a,i),lightThePath(a,i)},item.remove={localStorage:function(){
// Read old data from local storage.
var e,t,a,i=local_storage.get("dialog");
// Get current order
i.order=(e=[],$("#tree-view-contents [data-item-id]").each(function(){e.push($(this).data("item-id"))}),e),
// Check items in the local storage against the current order.
// Remove all items that don't belong.
$.each((t=i,a=[],$.each(t.items,function(e,t){a.push(t.id)}),a),function(e,t){$.inArray(t,i.order)<0&&delete i.items["item-"+t]}),
// Write back to local storage.
local_storage.set("dialog",i)},treeView:function(e){$("#panel-tree-view-wrap").find('[data-item-id="'+e+'"]').remove()},dialogPreview:function(e,t){
// Gets rid of the tab in dialog prev and also handles resizing
tab.onRemove(e,t);
// Remove the clicked item...
var a=$("#dialog");0<a.find('[data-item-id="'+e+'"]').length&&a.find('[data-item-id="'+e+'"]').remove()}},
// Functions triggered from
// "assets/js/dialog.builder/panels/structure.treeview.js" by a drag
// event created by the jquery sortable plugin Tree View doesn't need
// its own function, since the sortable plugin takes care of that.
item.sort={localStorage:function(e,t){
// Read old data from local storage....
var a,i=local_storage.get("dialog");
// Update order by re-recoding the id's of every single item currently in the tree view
i.order=(a=[],$("#tree-view-contents [data-item-id]").each(function(){var e=$(this).data("item-id");a.push(e)}),a),
// Update parent id
i.items["item-"+e].parentId=t,
// Write back to local storage...
local_storage.set("dialog",i)},dialogPreview:function(e,t,a,i,n){var l=$("#dialog"),s=l.find('[data-item-id="'+e+'"]'),r=l.find('[data-item-id="'+n+'"]'),d="insertAfter"===i?r:r.find("> .padding-box");
// If you move a checked radiobutton to a parent that already has a checked radio button, uncheck the radiobutton that was moved.
if(s[i](d),"RadioButton"===a){var o=s.find(".radiobutton"),c=o.hasClass("on"),p=0,m=':not([data-item-type="RadioButton"],.spacing)';if(s.nextUntil(m).add(s.prevUntil(m)).each(function(){$(this).find(".radiobutton").hasClass("on")&&++p}),0<p&&c){o.removeClass("on");var u=local_storage.get("dialog");u.items["item-"+e].style.checked=!1,local_storage.set("dialog",u)}}}},
// @codekit-append "get.values.js";
// @codekit-append "set.values.js";
item.update={},item.update.style={},item.update.style.localStorage=function(e,t){var a=item.update.get_values(e);return t.items["item-"+t.activeId].style[e]=a[e],local_storage.set("dialog",t),t;// Changed data is force fed to the two functions below
},item.update.style.treeView=function(e,t,a){if("text"===e||"all"===e){var i=a.style.text,n=$('#panel-tree-view-wrap [data-item-id="'+a.id+'"] > .item-text'),l=a.type,s=void 0===i?l:i.trim();n.html(l.toLowerCase()===s.toLowerCase()?l:'<span class="type">'+l+':</span> <span class="txt">'+i+"</span>")}},item.update.style.dialogPreview=function(e,t,a,i){var n={property:e,value:a.style[e],data:t,dataItem:a,event:i};
// prop: 'all' is used when items are first created. After that the properties are edited individually.
"all"===e?$.each(a.style,function(e,t){n.property=e,n.value=t,item.update.set_values(n)}):item.update.set_values(n),
// The dialog seems to collapse a bit when soft wrapping
// happens + #dialog-section is smaller than the dialog
// (when dialog doesn't quite fit and scrollbars come up)
$("#dialog-section .center-3").css({minWidth:$("#dialog-container").width(),minHeight:$("#dialog-container").height()})},item.update.order=function(){
// Read old data from local storage....
var e=local_storage.get("dialog");
// Update order by re-recoding the id's of every single item currently in the tree view
e.order=item.get.order(),
// Write back to local storage...
local_storage.set("dialog",e)},item.update.get_values=function(e){var t={},a=$("#panel-edit-style-wrap"),i=a.find('[data-edit^="'+e+'"]');switch(e){case"varName":t.varName=i.val().replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"");break;case"text":t.text=i.val();break;case"listItems":t.listItems=i.val();break;case"justify":t.justify=a.find('[data-edit^="justify"].active').data("value");break;case"margins":
// All sides share the same value.
// - single number value
if(0<a.find(".n-3-4.hidden").length)t.margins=parseInt(a.find(".margin-inputs .top").val(),10);else{var n=[];a.find('[data-edit="margins"]').each(function(){n.push(parseInt($(this).val(),10))}),t.margins=n}break;case"preferredSize":var l=parseInt(a.find("input.width").val(),10),s=parseInt(a.find("input.height").val(),10);t.preferredSize=[l,s];break;case"orientation":t.orientation=i.find("option:selected").val();break;case"spacing":t.spacing=parseInt(i.val(),10);break;case"alignChildren":var r=a.find('#align-children-horizontal[data-edit="alignChildren"] option:selected').val(),d=a.find('#align-children-vertical[data-edit="alignChildren"] option:selected').val();t.alignChildren=[r,d];break;case"image":t.image=[a.find(".base64-bin").attr("src")];break;case"alignment":!1===i.prop("disabled")?t.alignment=i.find("option:selected").val():t.alignment=null;break}
// console.table( data );
return t},
// Updates the Dialog preview look
item.update.set_values=function(e){var t=e.value,a=e.dataItem.type,i=e.dataItem.style,n=e.dataItem.id,l=$("#dialog .active"),s=l.find("> .padding-box");switch(e.property){
// TEXT
case"text":if("Dialog"===a)l.find("#dialog-title-bar div").text(t);else if("Panel"===a){var r=l.find("> .title");r.text(t),
// Makes sure the panel container is always wide enough to hold the title
s.css({minWidth:r.width()+22})}
// type === 'RadioButton' || type === 'Checkbox' || type === 'DropDownList'
else if(0<l.find("> label").length)l.find("label").text(t);else if("Tab"===a)l.parent().parent().find('> .tab-container [data-tab-id="'+n+'"]').text(t);else if("TreeItem"===a)l.find("> .item-wrap .text-container").text(t);else if(item.list[a.toLowerCase()](!1).multiline){l.find(".text-container").html(t.split("\n").join("<br>"))}else l.find(".text-container").html(t);break;
// LIST ITEMS
case"listItems":"DropDownList"===a?
/*global droplist*/
/*eslint no-undef: ["error", { "typeof": true }] */
droplist.set.items(l,t,i):"ListBox"===a&&
/*global listbox*/
/*eslint no-undef: ["error", { "typeof": true }] */
listbox.set(l,t,i);break;
// CHECKED
case"checked":!0===t&&l.find("input").prop("checked",!0);break;
// JUSTIFY
case"justify":l.removeClass(function(e,t){return(t.match(/(^|\s)justify-\S+/g)||[]).join(" ")}).addClass("justify-"+e.value);break;
// MARGINS
case"margins":var d=t[0],o=t[1],c=t[2],p=t[3],m="object"!=typeof t,u=m?t:d,f=m?t:o,g=m?t:c,v=m?t:p;"Dialog"===a?s.css({paddingTop:u<=6?1:u,paddingRight:f<=1?1:f,paddingBottom:g<=1?1:g,paddingLeft:v<=1?1:v}):"Panel"===a||"Tab"===a?s.css({paddingTop:u<=3?3:u,paddingRight:f<=3?3:f,paddingBottom:g<=1?1:g,paddingLeft:v<=3?3:v}):s.css({paddingTop:u,paddingRight:f,paddingBottom:g,paddingLeft:v});break;
// PREFERRED SIZE
case"preferredSize":var h=0==t[0]?"auto":t[0],y=0==t[1]?"auto":t[1]+("Dialog"===a?$("#dialog-title-bar").outerHeight():0);l.css({minWidth:h,minHeight:y}),
/*global dangerZone*/
/*eslint no-undef: ["error", { "typeof": true }] */
dangerZone.set(e,l,s),
/*global droplist*/
/*eslint no-undef: ["error", { "typeof": true }] */
droplist.set.size(l,t,i,a,h,y);break;
// ORIENTATION
case"orientation":l.removeClass(function(e,t){return(t.match(/(^|\s)orientation-\S+/g)||[]).join(" ")}).addClass("orientation-"+t);break;
// SPACING
case"spacing":var b=l.find("> .padding-box"),w="> .padding-box";b.find("> style.spacing").remove();// Get rid of the old one.
var C=0,x=e.data.items["item-"+n].parentId;if(!1!==x)"row"===e.data.items["item-"+x].style.orientation&&(C=2);t+=C,$('<style class="spacing">#dialog [data-item-id="'+l.data("item-id")+'"].orientation-row '+w+" > div {padding-left: "+t+'px;}\n#dialog [data-item-id="'+l.data("item-id")+'"].orientation-row '+w+' > div:first-of-type {padding-left: 0px;}\n#dialog [data-item-id="'+l.data("item-id")+'"].orientation-column '+w+" > div {padding-top: "+t+'px;}\n#dialog [data-item-id="'+l.data("item-id")+'"].orientation-column '+w+" > div:first-of-type {padding-top: 0px;}</style>").appendTo(b);break;
// ALIGN CHILDREN
case"alignChildren":l.removeClass(function(e,t){return(t.match(/(^|\s)align-children-\S+/g)||[]).join(" ")}),l.addClass("align-children-horizontal-"+t[0]),l.addClass("align-children-vertical-"+t[1]);break;
// IMAGE
case"image":l.find("img").attr("src",t[0]);break;
// ALIGNMENT
case"alignment":if(l.removeClass(function(e,t){return(t.match(/(^|\s)alignment-\S+/g)||[]).join(" ")}),null!==t){var I="left"===t&&["left","top"]||"top"===t&&["left","top"]||"right"===t&&["right","bottom"]||"bottom"===t&&["right","bottom"]||[t,t];l.addClass("alignment-horizontal-"+I[0]),l.addClass("alignment-vertical-"+I[1])}break}};var tabbedPanel={onCreate:function(e){
// There's no point in having a tabbed panel with less than
// two items, so this section makes sure that when a tabbed
// panel is created, two child tabs are created as well.
if("loadFromLocalStorage"!==e&&"drag-duplicate"!==e){var t=$("#panel-tree-view-wrap"),a=t.find(".active"),i=a.data("item-id"),n={id:item.get.id(),type:"Tab",parentId:a.data("item-id"),target:a.find("> ul"),event:"parent-propagation"};item.funnel.create(n);// Filler tab N.1.
var l=t.find(".active").data("item-id");item.activate(i),n.id=item.get.id(),item.funnel.create(n),// Filler tab N.2.
item.activate(l)}
// Tab item is hidden in the "Add items" panel by default, because you don't need it unless you have a TabbedPanel in the document.
// There's no need for extra conditionals because this is triggered only after a tabbed panel is created, which is what happens on load or import when the dialog is reconstructed.
var s=$("#panel-new-item-wrap .tab");s.hasClass("show")||s.addClass("show")},
// Prevents dragging items to specific containers...
// True = Prevent dropping
onDragValid:function(e,t){var a=t.target.parent("li"),i=e.hasClass("tab"),n=a.hasClass("tabbedpanel");
// ITEMS
// True = Prevent dropping
// Dragging tab  + Target is not TPanel = NO DROPSIES
// Dragging !tab + Target is TPanel     = NO DROPSIES
return i&&!n||!i&&n},
// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels.
onClick:function(e,t){var a=t.data("item-type"),i=e.hasClass("tab"),n="TabbedPanel"===a,l=i&&!n||!i&&n;
// ITEMS
if(l){var s=$("#panel-edit-style-wrap .edit-info");s.removeClass("highlight-animation"),// Reset so that the animation can run again if user tries to add another item with similar issues.
setTimeout(function(){s.addClass("highlight-animation")},10)}return l}},tab={onCreate:function(e){if("Tab"===e.type){var t=$('#dialog [data-item-id="'+e.parentId+'"]'),a=t.find("> .tab-container");
// var tabItem = $('#dialog [data-item-id="'+ params.id +'"]');
$('<div class="tab" data-tab-id="'+e.id+'" contenteditable>'+e.style.text+"</div>").appendTo(a),tab.containerSort(t.find("> .padding-box > .tab"),a),item.activate(e.id);
// Build Item Properties panel
var i=local_storage.get("dialog");edit_style_panel.build(i.items["item-"+e.id].style)}},onActivate:function(e){var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]'),a=$('#dialog .tab-container [data-tab-id="'+e+'"]');
// Shows the green "active" color on the tab text...
if($("#dialog .currently-active-tab").removeClass("currently-active-tab"),a.addClass("currently-active-tab"),0<t.closest(".tabbedpanel").length){var i=local_storage.get("dialog");t.parentsUntil(".dialog").filter(".tab").add("Tab"===t.data("item-type")&&t).each(function(){var e=i.items["item-"+$(this).data("item-id")],t=i.items["item-"+$(this).data("item-parent-id")];tab.show(e,t),
// Write back to local storage
t.style.selection=e.id,local_storage.set("dialog",i)})}},show:function(e,t){$('#dialog [data-item-id="'+t.id+'"] > .tab-container [data-tab-id="'+e.id+'"]').addClass("visible").siblings().removeClass("visible"),$('#dialog [data-item-id="'+t.id+'"] > .padding-box > [data-item-id="'+e.id+'"]').addClass("visible-tab").siblings().removeClass("visible-tab")},onRemove:function(e,t){var a,i=local_storage.get("dialog");if("Tab"===t){a=e,$('#dialog div[data-tab-id="'+a+'"]').remove();var n=i.items["item-"+e];a=$('#panel-tree-view-wrap [data-item-id="'+n.parentId+'"] > ul > li:first').data("item-id"),$('#dialog [data-item-id="'+e+'"]').remove(),tab.onUpdate.init(i,a)}else 0<$('#dialog [data-item-id="'+e+'"]').closest(".tab").length&&(a=$('#dialog [data-item-id="'+e+'"]').closest(".tab").data("item-id"),$('#dialog [data-item-id="'+e+'"]').remove(),tab.onUpdate.init(i,a))},
// Makes sure the previous tabbed panel minimum
// dimensions don't include the moved item anymore
onStartSort:function(e){if(e.hasClass("tab")){$("body").addClass("dragging-tab");var t=e.data("item-id"),a=local_storage.get("dialog"),i=$('#dialog [data-item-id="'+t+'"]');i.addClass("tab-temp-hide-class"),tab.onUpdate.init(a,t),i.removeClass("tab-temp-hide-class")}},
// Remove dragged tab from the dialog preview. The next function (
// onDragSortDrop ) triggers update that makes sure it is all up to date.
// So even if you decide to drop it where you picked it up, it is put back.
onSort:function(e){var t=e.hasClass("tab"),a=e.hasClass("tabbedpanel");if(t||a||0<$('#dialog [data-item-id="'+e.data("item-id")+'"]').closest(".tab").length){$("body").removeClass("dragging-tab");var i=local_storage.get("dialog"),n=e.data("item-id"),l=i.items["item-"+n].parentId,s=$("#dialog"),r=s.find('[data-item-id="'+l+'"]'),d=r.find("> .tab-container");s.find('.tab-container [data-tab-id="'+n+'"]').appendTo(d);
// Sort the shelf
var o=r.find("> .padding-box > .tab");tab.containerSort(o,d),item.activate(n),
// Build Item Properties panel
edit_style_panel.build(i.items["item-"+n].style),
// Update
tab.onUpdate.init(i,n)}},containerSort:function(e,t){e.each(function(){var e=$(this).data("item-id");t.find('[data-tab-id="'+e+'"]').appendTo(t)})},onUpdate:{init:function(s,e){
// Start churning if updated item inside a tabbed panel...
// - Because any nested item can cause parents and the whole hecking family to bloat up
var t=$('#panel-tree-view-wrap [data-item-id="'+e+'"]');0<t.closest(".tabbedpanel").length&&t.parentsUntil(".dialog").filter(".tabbedpanel").each(function(){var e=s.items["item-"+$(this).data("item-id")],t=$('#dialog [data-item-id="'+e.id+'"]'),a=0,i=0;t.find("> .padding-box > .tab").each(function(){
// Makes current tab visible so that dimensions return properly.
// Siblings are also hidden...
$(this).addClass("tab-temp-class");var e=$(this).innerWidth(),t=$(this).innerHeight();$(this).removeClass("tab-temp-class"),
// Collect max dimensions...
a<e&&(a=e),i<t&&(i=t)});
// Sneak in the tab container width if it's bigger than the biggest tab container.
var n=t.find("> .tab-container"),l=n.width()+2*parseInt(n.css("margin-left"),10);a<l&&(a=l),
// Apply width and height to tabbed panel so that everything stays within limits and thinds don't jump around.
t.find("> .padding-box").css({minWidth:a,minHeight:i})})}}},treeView={onCreate:function(e){
// There's no point in having a treeview with less than
// two items, so this section makes sure that when it is
// created, two child items are created as well.
if("loadFromLocalStorage"!==e&&"drag-duplicate"!==e){var t=$("#panel-tree-view-wrap"),a=t.find(".active"),i=a.data("item-id"),n={id:item.get.id(),type:"TreeItem",parentId:a.data("item-id"),target:a.find("> ul"),event:"parent-propagation"};item.funnel.create(n);// Filler tab N.1.
var l=t.find(".active").data("item-id");item.activate(i),
// params.target = treeView.find('.active').find('> ul');
n.id=item.get.id(),item.funnel.create(n),// Filler tab N.2.
item.activate(l)}
// TreeViewItem item is hidden in the "Add items" panel by default, because you don't need it unless you have a TreeView item in the document.
// There's no need for extra conditionals because this is triggered only after a TreeView item is created, which is what happens on load or import when the dialog is reconstructed.
var s=$("#panel-new-item-wrap .treeitem");s.hasClass("show")||s.addClass("show")},
// Prevents dragging items to specific containers...
// True = Prevent dropping
onDragValid:function(e,t){var a=t.target.parent("li"),i=e.hasClass("treeitem"),n=a.hasClass("treeview"),l=a.hasClass("treeitem");
// ITEMS
// True = Prevent dropping
// Dragging item  + Target is not treeview or item = NO DROPSIES
// Dragging !item + Target is treeview or item     = NO DROPSIES
return i&&!n&&!l||!i&&(n||l)},
// Just a little reminder for people trying to add anything but tabs inside tabbed panel or a tab outside of tabbed panels. Silly humans...
onClick:function(e,t){var a=t.data("item-type"),i=e.hasClass("treeitem"),n="TreeView"===a,l="TreeItem"===a,s=i&&!n&&!l||!i&&(n||l);
// ITEMS
if(s){var r=$("#panel-edit-style-wrap .edit-info");r.removeClass("highlight-animation"),// Reset so that the animation can run again if user tries to add another item with similar issues.
setTimeout(function(){r.addClass("highlight-animation")},10)}return s}},treeViewItem={onClick:function(){$("#dialog").on("click",".tree-view-arrow",function(){var e=$(this).parent(".item-wrap").parent(".tree-view-item"),t=e.data("item-id"),a=local_storage.get("dialog"),i=a.items["item-"+t];treeViewItem.expand(a,i,e,!0)})},onSort:function(e,t,a){if("TreeItem"===t){$('#dialog [data-item-id="'+a+'"]').parent(".padding-box").parent(".tree-view-item").addClass("tree-node");
// Get rid of previous data
var i=$("#dialog .tree-node > .padding-box:empty").parent().removeClass("tree-node expanded");if(0<i.length){var n=i.data("item-id"),l=local_storage.get("dialog");delete l.items["item-"+n].expanded,local_storage.set("dialog",l)}}},onUpdate:function(e,t){if("TreeItem"===t.type){var a=$('#dialog [data-item-id="'+t.id+'"]');0<a.parent(".padding-box").parent(".tree-view-item").length&&a.parent(".padding-box").parent(".tree-view-item").addClass("tree-node"),treeViewItem.expand(e,t,a)}},expand:function(e,t,a,i){var n,l="expanded";if(!0!==i)n=t.expanded?"addClass":"removeClass";else{var s=a.hasClass(l);n=s?"removeClass":"addClass"}a[n](l),i&&(
// COLLAPSE
s?delete e.items["item-"+t.id].expanded:e.items["item-"+t.id].expanded=!0,local_storage.set("dialog",e))}};treeViewItem.onClick();var listbox={init:function(t,a){t.on("click","li",function(){var e=$(this);listbox.clickety(a,t,e)})},clickety:function(e,t,a){
// LIGHT SWITCH...
var i="selected",n=a.hasClass(i)?"removeClass":"addClass";a[n](i);
// GET ALL SELECTED ITEMS...
var l=[];t.find("li").each(function(){$(this).hasClass(i)&&l.push($(this).index())});
// WRITE SELECTION LOCAL STORAGE...
var s=local_storage.get("dialog");s.items["item-"+e].style.selection=l,local_storage.set("dialog",s)},set:function(e,t){var n=e.find("ul");n.children().remove();var a,i,l=t.split(","),s=local_storage.get("dialog"),r=s.items["item-"+s.activeId];
// Remove last selection if it's index is larger than the current list
void 0!==r.style.selection&&(a=r.style.selection,i=0,$.each(a,function(e,t){i<t&&(i=t)}),i>=l.length&&r.style.selection.pop(),local_storage.set("dialog",s)),
// Rebuild the list
$.each(l,function(e,t){var a=t.trim(),i=0<=$.inArray(e,r.style.selection);$("<li"+(i?' class="selected"':"")+"><span>"+a+"</span></li>").appendTo(n)})}};// This droplist has so many smoking mirrors... Practically all mirrors at this point... **FRAGILE**
// REMOVE (HIDE) LIST ON WINDOW RESIZE
// Because the opened up list is held in place via absolute positioning...
droplistOnWindowResize();var droplist={init:function(e,i){e.find(".drop-list-wrap").on("click",function(){
// THERE CAN BE ONLY ONE!!
$("#drop-list").remove();var a=$(this);if(a.hasClass("open"))droplist.hide();else{a.addClass("open");var e=droplist.inspector(i,a);droplist.makeList(i,a,e),$("#drop-list ul li").on("click",function(){var e=$(this),t=local_storage.get("dialog");t.items["item-"+i].style.selection=e.index(),local_storage.set("dialog",t),a.find(".selected").removeClass("selected"),a.find(".items").children().eq(e.index()).addClass("selected"),droplist.hide()})}
// Second click on the .drop-list-wrap...
})},backbone:function(e){var t=null,a=e.find(".items").children();a.each(function(){var e=$(this).width();t<e&&(t=e)}),
// listWrap.width( maxWidth );
a.width(t)},inspector:function(e,t){var a="",i=t.find(".selected").index();return t.find(".items").children().each(function(e){var t=$(this).text();a+='<li class="option'+("-"===t?" horizontal-line":"")+(e===i?" selected":"")+'">'+t+"</li>"}),a},makeList:function(e,t,a){var i=t.offset().top,n=t.offset().left,l=t.outerWidth(),s=t.outerHeight();$('<div id="drop-list"><ul>'+a+"</ul></div>").appendTo("#dialog-section");var r=$("#drop-list"),d=2*parseInt(r.css("border-left-width"),10),o=2*parseInt(r.css("padding-left"),10);r.css({top:i+s,left:n-($(window).width()-$("#dialog-overlay-wrap").width()),width:l-(d+o)})},set:{items:function(e,t,l){var s=e.find(".items");s.children().remove();var r=!1;
// Rebuild the list
// Makes it so that if the selected item is removed, the selected item is swapped to the first item.
// This will prevent bunch of other issues...
if($.each(t.split(","),function(e,t){var a=t.trim(),i="-"==a?" horizontal-line":"",n=e===l.selection?" selected test":"";e===l.selection&&(r=!0),$('<div class="'+n+i+'">'+a+"</div>").appendTo(s)}),!r){var a=local_storage.get("dialog");a.items["item-"+a.activeId].style.selection=0,local_storage.set("dialog",a),s.find("> div:first").addClass("selected")}var i=e.find(".drop-list-wrap");droplist.backbone(i)},size:function(e,t,a,i,n){
// Special treatment for Dropdownlist
if("DropDownList"===i){var l=e.find(".drop-list-wrap"),s=e.find("label");e.removeClass("too-big"),e.removeClass("too-small"),e.addClass("get-width");var r=e.width(),d=s.outerWidth(!0),o=l.outerWidth(!0);e.removeClass("get-width");var c=d+o;c<n?(e.addClass("too-big"),o<r&&l.width("auto")):n<c&&(e.addClass("too-small"),r<o&&l.width(r-16),e.parent().parent().hasClass("orientation-row")&&
// In this situation the label has position: absolute; so it doesn't respect the padding on the left side.
e.find("label").css({marginLeft:e.css("padding-left")}))}}},hide:function(){$("#drop-list").remove(),$(".drop-list-wrap.open").removeClass("open")}},radiocheck={init:function(e,l,t){var s=this,a=e.find(".radiocheck");s.restore(e,l,t,a),a.on("click",function(){var e=$(this),t=local_storage.get("dialog"),a=t.items["item-"+l],i=e.hasClass("on");e[i?"removeClass":"addClass"]("on");var n=!i;
// RADIOBUTTON
e.is(".radiobutton")&&s.radio.clearSiblings(t,e),a.style.checked=n,local_storage.set("dialog",t)})},restore:function(e,t,a,i){!0===local_storage.get("dialog").items["item-"+t].style.checked&&i.addClass("on")},radio:{clearSiblings:function(i,e){var t=e.parent(),a=':not([data-item-type="RadioButton"],.spacing)';
// Clear all adjacent sibling radiobuttons...
t.nextUntil(a).add(t.prevUntil(a)).each(function(){var e=$(this),t=e.data("item-id"),a=e.find(".radiocheck");e.hasClass("radiobutton")&&(a.removeClass("on"),i.items["item-"+t].style.checked=!1)})}}},addItemsPanel={init:function(){this.generateHTML(),
// CREATE NEW ITEM EVENT
$("#panel-new-item-wrap li").on("click",function(){var e=$("#panel-tree-view-wrap").find(".active"),t=e.data("parent"),a={id:item.get.id(),type:$(this).data("item-type"),parentId:t?e.data("item-id"):e.data("item-parent-id"),target:t?e.find("> ul"):e,event:"click"},i=tabbedPanel.onClick($(this),e,a),n=treeView.onClick($(this),e,a);i||n||item.funnel.create(a)})},generateHTML:function(){var a="";$.each(item.list,function(e){var t=item.list[e](!1);t.addPanelIconClass&&("above"===t.addPanelDivider&&(a+='<span class="gouping-divider"></span>'),a+='<li class="'+e+'" data-item-type="'+t.type+'"><i class="fas fa-info-circle failure-is-an-option"></i><i class="'+t.addPanelIconClass+'"></i><span>'+t.type+"</span></li>","below"===t.addPanelDivider&&(a+='<span class="gouping-divider"></span>'))}),a+='<div class="disabled-overlay"></div>',$("<ul>"+a+"<ul>").appendTo("#panel-new-item-wrap .contents")}};addItemsPanel.init();
// @codekit-append "html.js";
var edit_style_panel={build:function(e,t){var i=$("#edit-style-inner-container");i.html('<span class="target-varName"></span><span class="target-image"></span><span class="target-text"></span><span class="target-listItems"></span><span class="target-justify"></span><span class="target-preferredSize"></span><span class="target-margins"></span><span class="target-orientation"></span><span class="target-spacing"></span><span class="target-alignChildren"></span><span class="target-alignment"></span>');var a=$("#panel-tree-view-wrap .active").data("item-type").toLowerCase(),n=item.list[a](!1);if(!1===e)$("<div class='no-properties'>"+n.stylePropInfo+"</div>").appendTo(i);else{
// Generate edit panel structure
$.each(e,function(e,t){var a=panel_edit_style_html.init(e,t);void 0!==a&&a.appendTo(i.find(".target-"+e))}),
// Style number inputs
numberInputs();var l=item.list[a](!1).defaultStyle.text,s=item.list[a](!1).multiline,r=$('#panel-edit-style-wrap [data-edit="text"]'),d=r.parent();
// Icon on the text container telling the user they can't add linebreaks to current item
!l||s||d.hasClass("is-not-multiline")||d.addClass("is-not-multiline"),
// Style dropdowns
$(".pretty-classic").prettyDropdown({classic:!0,customClass:"arrow triangle",selectedMarker:'<i class="fas fa-check"></i>'}),$("#panel-edit-style-wrap textarea").each(function(){
/*global autosize*/
/*eslint no-undef: ["error", { "typeof": true }] */
autosize(this)}),
// SELECT TEXT INPUT IN THE ITEM PROPERTIES PANEL
// If the item has default text, then try to select it. If it doesn't have default text, it never will.
// This check is used because when the textarea doesn't exist, there's nothing to focus in so it just basically does a site wide Cmd+A, which is not cool...
"dialog"!==t&&l&&(r.focus(),r.select())}var o=n.editInfo;o&&$('<div class="edit-info">'+o+"</div>").appendTo(i)}},panel_edit_style_html={
// Mayhaps in hindsight this wasn't the best way to build this html...
// but what is done is done. Honestly, I look at this and I'm like oh
// boy... I have absolutely no idea why I made it this way. My best
// defense is that everything in this project started as a prototype
// and I never could be arsed to make it in a sensible way after I had
// decided what I wanted from it. Once a lazy boy, always a lazy boy.
init:function(e,t){var a;switch(e){case"varName":a=$('<h2>Custom Variable Name</h2><input type="text" data-edit="varName" value="'+(null==t?"":t)+'" />');break;case"text":a=$('<h2 title="Initial text to be displayed in the control as the title, label, or contents, depending on the control type.">Text</h2><div class="edit-text-wrap"><div class="no-linebreaks-icon" title="This item does not support multiline, so no line breaks."><img src="assets/images/no-line-break-icon.svg" alt="" /></div><textarea data-edit="text" class="textarea">'+t+"</textarea><div>");break;case"listItems":a=$('<h2 title="The array of choice items displayed in the drop-down or pop-up list.">List Items<span class="desc"> (Comma separated)</span></h2><textarea data-edit="listItems" class="textarea">'+t+"</textarea>");break;case"justify":(a=$('<div class="justify-container"><h4>Justify:</h4><div class="justify-icon-wrap"><div class="justify-icon" data-edit="justify" data-value="left"><i class="icon fas fa-align-left"></i></div><div class="justify-icon" data-edit="justify" data-value="center"><i class="icon fas fa-align-center"></i></div><div class="justify-icon" data-edit="justify" data-value="right"><i class="icon fas fa-align-right"></i></div></div></div>')).find('[data-value="'+t+'"]').addClass("active");break;case"margins":var i="object"!=typeof t;a=$('<h2 title="The number of pixels between the edges of a container and the outermost child elements. \n\nYou can specify different margins for each edge of the container. The default value is based on the type of container, and is chosen to match the standard Adobe UI guidelines.">Margins<div class="link-icon '+(i?"active":"")+'" title="Adjust each side individually..."><i class="fas fa-unlock-alt"></i><i class="fas fa-lock-open"></i></div></h2><span class="desc margins-desc '+(i?"hide":"")+'"><span>top</span><span>right</span><span>bottom</span><span>left</span></span><div class="margin-inputs"><input class="number" style="display: none;"><div class="n-1-4"><input data-edit="margins" class="number top" value="'+(i?t:t[0])+'" min="0" max="300" step="1" modifier-step="10"></div><div class="n-3-4 '+(i?"hidden":"")+'"><input data-edit="margins" class="number right" value="'+(i?t:t[1])+'" min="0" max="300" step="1" modifier-step="10"'+(i?"disabled":"")+'><input data-edit="margins" class="number bottom" value="'+(i?t:t[2])+'" min="0" max="300" step="1" modifier-step="10"'+(i?"disabled":"")+'><input data-edit="margins" class="number left" value="'+(i?t:t[3])+'" min="0" max="300" step="1" modifier-step="10"'+(i?"disabled":"")+'></div><input class="number" style="display: none;"></div>');break;case"preferredSize":a=$('<h2 title="The preferred size, used by layout managers to determine the best size for each element. \n\nIf not explicitly set by a script, value is established by the UI framework in which ScriptUI is employed, and is based on such attributes of the element as its text, font, font size, icon size, and other UI framework-specific attributes. A script can explicitly set preferredSize before the layout manager is invoked in order to establish an element size other than the default.">Preferred Size<span class="preferred-size-auto" title="Reset to content size (0)"><i class="fas fa-compress"></i></span></h2><div class="dimensions-container linked"><input class="number" style="display: none;"><h4 class="width-heading">Width:</h4><input class="number width" data-edit="preferredSize" value="'+t[0]+'" min="0" max="2000" step="1" modifier-step="10"><h4 class="height-heading">Height:</h4><input class="number height" data-edit="preferredSize" value="'+t[1]+'" min="0" max="2000" step="1" modifier-step="10"><input class="number" style="display: none;"></div>');break;case"orientation":(
// For future reference: I should've probably added a parent container
// for both orientation and spacing, so that I can then seat them
// next to each other easily. I wrote the prototype html this way
// as I was figuring out how to position everything and well here we
// are. This should never become an issue, since they are both parent
// element properties, so they are always together... So yea... as it
// is, "orientation" creates the heading for "spacing". Deal with it.
a=$('<h2 class="orientation-heading" title="The layout orientation of children in a container.">Orientation</h2><h2 class="spacing-heading" title="The number of pixels separating one child element from its adjacent sibling element. \n\nBecause each container holds only a single row or column of children, only a single spacing value is needed for a container. The default value is based on the type of container, and is chosen to match standard Adobe UI guidelines.">Spacing</h2><br><div class="orientation"><select name="qty" class="pretty-classic" data-edit="orientation"><option>row</option><option>column</option></select></div>')).last().find('option:contains("'+t+'")').prop("selected",!0);break;case"spacing":
// Confused? read the comment above...
a=$('<input class="number" style="display: none;"><div class="spacing-container"><input class="number" data-edit="spacing" value="'+t+'" min="0" max="300" step="1" modifier-step="5"></div><input class="number" style="display: none;">');break;case"alignChildren":var n=$("#dialog .active").hasClass("orientation-column");a=$('<h2 title="Tells the layout manager how unlike-sized children of this container should be aligned within a column or row. \n\nOrder of creation determines which children are at the top of a column or the left of a row; the earlier a child is created, the closer it is to the top or left of its column or row. If defined, alignment for a child element overrides the alignChildren setting for the parent container. See alignment property for values.">Align Children</h2><div class="align-children"><span class="x-axis">X:</span><select id="align-children-horizontal" data-edit="alignChildren" name="qty" class="pretty-classic"><option>left</option><option>center</option><option>right</option>'+(n?"<option>fill</option>":"")+'</select><span class="y-axis">Y:</span><select id="align-children-vertical" data-edit="alignChildren" name="qty" class="pretty-classic"><option>top</option><option>center</option><option>bottom</option>'+(n?"":"<option>fill</option>")+"</select></div>");
// var horizontalValue = !isColumn && value[0] === 'fill' ? 'center' : value[0];
// var verticalValue   =  isColumn && value[1] === 'fill' ? 'center' : value[1];
var l=t[0],s=t[1];a.find('#align-children-horizontal option:contains("'+l+'")').prop("selected",!0),a.find('#align-children-vertical option:contains("'+s+'")').prop("selected",!0);break;case"image":a=$('<div class="image-edit"><div class="img-wrapper"><img class="base64-bin" src="'+t[0]+'" alt="" /></div><div class="custom-file-input"><i class="fas fa-upload"></i>Choose file...</div><input data-edit="image" type="file" accept="image/jpeg, image/png"></div>');break;case"alignment":var r,d=$("#dialog .active").parent("div").parent("div").hasClass("orientation-column"),o=d?"column":"row",c=d?"horizontal":"vertical",p=null===t,m=d?["left","center","right","fill"]:["top","center","bottom","fill"],u="";$.each(m,function(e,t){u+='<option value="'+t+'">'+t+"</option>"}),a=$('<div class="alignment-container"><h2 title="The alignment style for this element. If defined, this value overrides the alignChildren setting for the parent container.">Alignment <span>(Self)</span></h2><div class="alignment-checkbox"><input type="checkbox" id="alignment-checkbox-input" name="" '+(p?"":"checked")+' /><label for="alignment-checkbox-input"></label></div><br>'+('<div id="alignment-'+c+'"><select name="qty" class="pretty-classic" data-edit="alignment"  data-edit-value="'+c+'" '+(p?"disabled":"")+" >"+u+"</select></div>")+"</div>"),"column"===o?(r=("top"===t?"left":"bottom"===t&&"right")||t,a.find('#alignment-horizontal option:contains("'+(null===t?"center":r)+'")').prop("selected",!0)):(r=("left"===t?"top":"right"===t&&"bottom")||t,a.find('#alignment-vertical option:contains("'+(null===t?"center":r)+'")').prop("selected",!0));break}return a}},propsPanel=$("#panel-edit-style-wrap");
// EDIT PANEL CLICK EVENTS
// JUSTIFY
propsPanel.on("click",".justify-icon",function(){$(this).addClass("active").siblings().removeClass("active")}),
// ALIGNMENT POWER STATE TOGGLE → ON / OFF
propsPanel.on("change",".alignment-checkbox input",function(){var e=$(this).prop("checked"),t=!e,a=e?"removeClass":"addClass";$(".alignment-container select").prop("disabled",t).trigger("change"),$(".alignment-container .prettydropdown")[a]("disabled")}),
// PREFERRED SIZE (ICON) → RESET BACK TO 0 (content size)
propsPanel.on("click",".preferred-size-auto",function(){var e=propsPanel.find("input.width");e.val(0).change(),propsPanel.find("input.height").val(0).change(),item.funnel.update(e.data("edit"))}),
// RESET NUMBER INPUTS BACK TO 0 (content size)
propsPanel.on("dblclick",".number-overlay",function(){var e=$(this).parent().find(".number");e.val(0).change(),item.funnel.update(e.data("edit"))}),
// MARGINS TOGGLE → ALL SIDES / TOP, RIGHT, BOTTOM, LEFT
propsPanel.on("click",".link-icon",function(){var e=$(".margin-inputs .n-3-4");
// ENABLE ALL
e.hasClass("hidden")?($(this).removeClass("active"),e.removeClass("hidden"),e.find("input").prop("disabled",!1).val($(".margin-inputs .n-1-4 input").val()),$("#panel-edit-style-wrap .margins-desc").removeClass("hide")):($(this).addClass("active"),e.addClass("hidden"),e.find("input").prop("disabled",!0),$("#panel-edit-style-wrap .margins-desc").addClass("hide")),item.funnel.update("margins")}),
// ***********************
// UPDATE ITEM PROPERTIES
// ***********************
propsPanel.on("keydown",'[data-edit="text"]',function(e){return lineBreakIntercept(e)}),propsPanel.on("keyup",'[data-edit="text"]',function(e){18!=(e.keyCode?e.keyCode:e.which)&&// Update if alt is released.
item.funnel.update($(this).data("edit"));var t=$("#dialog .active");"EditText"===t.data("item-type")&&t.find(".os-content-glue").html(t.find("[contenteditable]").html());var a=t.find(".text-container"),i=t.data("item-type"),n=a.height(),l=!1;"StaticText"===i&&25.5<n?l=!0:"EditText"===i&&22.5<n&&(l=!0),l?a.addClass("multiline"):a.removeClass("multiline")}),propsPanel.on("keyup",'[data-edit="listItems"], [data-edit="varName"]',function(){item.funnel.update($(this).data("edit"))}),propsPanel.on("click",'[data-edit="justify"]',function(){item.funnel.update($(this).data("edit"))}),propsPanel.on("change","select[data-edit]",function(){if("orientation"===$(this).data("edit")){var e="column"===$(this).find("option:selected").val(),t=$("#align-children-horizontal"),a=$("#align-children-vertical");e?(a.find("option:contains(fill)").remove(),$("<option>fill</option>").appendTo(t)):(t.find("option:contains(fill)").remove(),$("<option>fill</option>").appendTo(a)),$("#panel-edit-style-wrap .align-children select").each(function(){$(this).trigger("change"),$(this).prettyDropdown({classic:!0,customClass:"arrow triangle",selectedMarker:'<i class="fas fa-check"></i>'}).refresh()})}item.funnel.update($(this).data("edit"))}),propsPanel.on("click",".custom-file-input",function(){propsPanel.find('[data-edit="image"]').trigger("click")}),propsPanel.on("change",'[data-edit="image"]',function(){var e=this.files[0],t={render:function(e,t){var a=new FileReader;a.onload=function(){t(a.result)},a.readAsDataURL(e)},getBinary:function(e,t){var a=new FileReader;a.onload=function(){t(encodeURIComponent(a.result))},a.readAsBinaryString(e)}};t.render(e,function(e){propsPanel.find(".base64-bin").attr("src",e),item.funnel.update("image")})});
// The point of this loading screen is to make it more understandable that something changed.
// It's really just a transition, rather than an actual loading screen.
var snapshot={init:function(){snapshot.fetch_items_length()},openPanel:function(){var e=$('[data-panel="snapshots"]');
// Once the page is loaded, the lock stays open
if(e.data("lock")){e.data({lock:!1});var t=snapshot.fetch_all_items();$(t).prependTo(e.find(".snapshots")),e.find(".take-snapshot").on("click",snapshot.capture),e.on("click",".image",function(){var e=$(this).closest(".snapshot").data("id"),t=local_storage.get("dialog-snapshots").storage["dialog-"+e];modal.init('<img src="'+t.image+'" alt="" />'),$("#modal-window-content").addClass("snapshot-preview")}),e.on("click",".remove",function(){snapshot.remove($(this).closest(".snapshot"))}),e.on("click",".ss-label",function(){snapshot.replace($(this).closest(".snapshot"))})}},replace:function(e){var t=e.data("id"),a=local_storage.get("dialog-snapshots").storage["dialog-"+t],i=
// '<div id="reset-box">' +
'<div id="snapshot-replace-box"><img src="'+a.image+'" alt="" /><div class="info-wrap" data-id="'+a.id+'"><span><strong>ID: </strong>'+a.id+"</span><span><strong>Date: </strong>"+new Date(a.date).toLocaleString()+'</span><br><div>Use left and right arrow keys to navigate between snapshots.</div><div>When you load a snapshot it overwrites your current dialog, so you should take a new snapshot first if it has changes you want to keep.</div></div><div class="btn-wrap"><span class="remove">Delete</span><span class="yes" data-enter>Load this snapshot</span><span class="no">Close</span></div></div>';modal.init(i,"snapshot-replace");var n=$("#snapshot-replace-box");n.find(".yes").on("click",function(){modal.remove(),setTimeout(function(){local_storage.remove("dialog"),local_storage.set("dialog",a.json),modal.remove(),loadingScreen.init(null,function(){location.reload()})},300)}),n.find(".no").on("click",function(){modal.remove()}),n.find(".remove").on("click",function(){var e=$("#modal-window.snapshot-replace .info-wrap").data("id"),t=$('[data-panel="snapshots"] .snapshot[data-id="'+e+'"]');modal.remove(function(){(t.prev().length<1?t.next():t.prev()).find(".ss-label").trigger("click"),snapshot.remove(t)})})},remove:function(e){var t=e.data("id"),a=local_storage.get("dialog-snapshots");
// var content =
// 	'<div id="reset-box">' +
// 		'<h2>Remove snapshot ('+ id +').jsx</h2>' +
// 		'<span class="text">Are you sure you want to remove this snapshot?</span>' +
// 		'<span class="yes" data-enter>Remove</span>' +
// 		'<span class="no">Cancel</span>' +
// 	'</div>';
//
// modal.init( content );
//
// var resetBox = $('#reset-box');
//
// resetBox.find('.yes').on('click', function() {
delete a.storage["dialog-"+t],e.remove();var i=[];$('[data-panel="snapshots"] .snapshots').children().each(function(){i.push($(this).data("id"))}),a.ids=i.reverse(),local_storage.set("dialog-snapshots",a),snapshot.fetch_items_length()},fetch_items_length:function(){var e=local_storage.get("dialog-snapshots"),t=null;if(e&&e.ids&&(t=e.ids.length),null!==t){var a=$('[data-panel="snapshots"] .label .ss-number');0<e.ids.length?a.html("("+e.ids.length+")"):a.html("")}},fetch_all_items:function(){
// local_storage.remove('dialog-snapshots');
var e=local_storage.get("dialog-snapshots");null===e&&(e={ids:[],storage:{}},local_storage.set("dialog-snapshots",e));for(var t="",a=e.ids.length;a--;){// Reverse loop (newest at the top)
var i=e.storage["dialog-"+e.ids[a]];t+=snapshot.make_html(i)}return t},capture:function(){var l=$('<div class="snapshot temp"><img src="assets/images/snapshot-load.gif" alt="" /></div>').prependTo('[data-panel="snapshots"] .snapshots'),s=local_storage.get("dialog-snapshots"),r=local_storage.get("dialog"),e=$("#dialog-container");
// var dlgWidth = dlgCont.width();
// var dlgHeight = dlgCont.height();
// var longEdge = dlgWidth > dlgHeight ? ['width', dlgWidth] : ['height', dlgHeight];
// var percentage = (300 / longEdge[1]) * 100;
// var canvasScale = percentage / 100;
/*global html2canvas*/
/*eslint no-undef: ["error", { "typeof": true }] */
html2canvas(e[0],{
// scale: canvasScale,
backgroundColor:null,logging:!1}).then(function(e){var t=$('[data-panel="snapshots"]');l.remove();
// Place current dialog in snapshot storage
var a=0<s.ids.length?Math.max.apply(null,s.ids)+1:1,i=s.storage["dialog-"+a]={};i.id=a,// Find the largest id and add 1 to it
i.date=(new Date).getTime(),i.image=e.toDataURL("image/png"),i.json=r,s.ids.push(i.id),local_storage.set("dialog-snapshots",s);var n=snapshot.make_html(i);t.find('[data-id="'+a+'"]').length<=0&&$(n).prependTo(t.find(".snapshots")),snapshot.fetch_items_length()})},make_html:function(e){var t=new Date(e.date);return'<div class="snapshot" data-id="'+e.id+'"><div class="ss-label"><span title="'+t+'">'+e.id+'</span><div class="text">Snapshot</div></div><div class="icons-wrap animated fadeIn"><div class="remove" title="Remove snapshot..."><i class="fas fa-trash"></i></div></div></div>'}};snapshot.init(),$(document).on("keydown",function(e){if(0<$("#modal-window.snapshot-replace").length){var t=e.keyCode?e.keyCode:e.which,a=37===t,i=39===t,n=$("#modal-window.snapshot-replace .info-wrap").data("id");(a||i)&&modal.remove(function(){var e,t=$('[data-panel="snapshots"] .snapshot[data-id="'+n+'"]');a?e=t.next().length<1?t.siblings().first():t.next():i&&(e=t.prev().length<1?t.siblings().last():t.prev()),e.length<1&&(e=t),e.find(".ss-label").trigger("click")})}});
// The point of this loading screen is to make it more understandable that something changed.
// It's really just a transition, rather than an actual loading screen.
var mousemovePing,loadingScreen={init:function(e,t){e=e||.1,$("body").addClass("loading");$('<div id="loader-bg"><div class="loader">Loading...</div></div>').appendTo("body"),$("#loader-bg").backstretch([{url:"./assets/images/bg.jpg",alignX:"center"}]),setTimeout(function(){t()},this.secondsToMilliseconds(e))},secondsToMilliseconds:function(e){return 1e3*e}};setInterval(function(){mousemovePing=!0},45);var bgTimeout,iconTimeout,modal={init:function(e,t){modal.make(e,t),$("#modal-window-overlay").on("click",function(){modal.remove()})},make:function(e,t){e=void 0===e?"":e,$('<div id="modal-window" class="'+(t||"")+'"><div id="modal-window-overlay" data-esc></div><div id="modal-window-content" class="animated fadeIn">'+e+"</div></div>").appendTo("body"),$("body").addClass("modal-window-active")},remove:function(e){$("#modal-window-content").addClass("fadeOut"),setTimeout(function(){$("#modal-window").remove(),$("body").removeClass("modal-window-active"),void 0!==e&&e()},100)}};$(document).on("keydown",function(e){if(0<$("#modal-window").length){var t=e.keyCode?e.keyCode:e.which,a=13===t;27===t?$("#modal-window").find("[data-esc]").trigger("click"):a&&$("#modal-window").find("[data-enter]").trigger("click")}}),
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
value:exportCode()}),t=$(window).height(),a=$("#export-box"),i=a.height();
// This section makes sure the #export-box doesn't spill past the viewport
if(t<i+60){var n=$(window).height()-(i-a.find(".CodeMirror").height());a.find(".code").css({maxHeight:n-160})}clipBoardEvent(e),a.find(".download").on("click",function(){
/*global download*/
/*eslint no-undef: ["error", { "typeof": true }] */
download(exportCode(),"ScriptUI Dialog Builder - Export.jsx","application/javascript");var e=$(this),t=e.find(".fa-check"),a=e.find(".fa-download");t.addClass("rotateIn"),a.hide(),setTimeout(function(){t.removeClass("rotateIn"),a.show()},750)})}),
// IMPORT EVENT
$("#toolbar .import").on("click",function(){var l,s;modal.init('<div id="import-box"><h2>Import.jsx</h2><div class="ta"><div class="placeholder"><span class="important">The current dialog will be overwritten on a successful import.</span> <br><br>You can only import JSON generated by this this tool on export. 3rd line of every export includes the impotable JSON. Your old dialog code written in Javascript will <strong>not</strong> work! <br><br>Valid JSON is beautified (restructured) on paste <br> so that it is easier to read if necessary. <br></br><strong>Paste below</strong> <br><strong>↓</strong></div><div class="code"></div></div><div data-enter class="import-btn animated infinite"><i class="fas fa-arrow-right"></i><i class="fas fa-times"></i></div></div>'),(s=CodeMirror($("#import-box .code")[0],{mode:{name:"javascript",json:!0},theme:"monokai",autofocus:!0,lineNumbers:!0})).on("change",function(e,t){if("paste"===t.origin)
/*eslint no-empty: "error"*/
try{
// Poor man's 'beautify' on paste
var a=s.getValue();l=a;var i=JSON.parse(a),n=JSON.stringify(i,null,3);s.getDoc().setValue(n)}catch(e){
// continue regardless of error
}
// This section makes sure the #export-box doesn't spill past the viewport
setTimeout(function(){var e=$(window).height(),t=$("#import-box"),a=t.height();if(e<a+60){var i=$(window).height()-(a-t.find(".CodeMirror").height()),n=i-160,l=e<n?i-20:n;t.find(".code").css({maxHeight:l})}},10)}),$("#import-box").find(".import-btn").on("click",function(){
/*eslint no-empty: "error"*/
var e;try{var t=l.trim();e=JSON.parse(t)}catch(e){
// continue regardless of error
}
// Failed to parse JSON
if(void 0===e){
// Show a red X telling the used it failed for what ever reason....
var a=$("#import-box");a.find(".fa-arrow-right").hide(),a.find(".import-btn").addClass("tada"),setTimeout(function(){a.find(".fa-arrow-right").show(),a.find(".import-btn").removeClass("tada")},1900)}
// JSON parsed succesfully
else local_storage.remove("dialog"),local_storage.set("dialog",e),modal.remove(),loadingScreen.init(null,function(){location.reload()})})}),
// RESET EVENT
$("#toolbar .reset").on("click",resetDialog),
// Load sample dialog
$("#toolbar .sample-dialog").on("click",function(){modal.init('<div id="reset-box"><h2>Sample Dialog.jsx</h2><span class="text">Are you sure you want to <strong>replace</strong> <br>the current dialog with a sample?</span><span class="yes" data-enter>Load Sample</span><span class="no">Cancel</span></div>');var e=$("#reset-box");e.find(".yes").on("click",function(){modal.remove(),setTimeout(function(){local_storage.remove("dialog"),local_storage.set("dialog",JSON.parse('{"activeId":1,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"text":"Import Multiple PDF pages","preferredSize":[0,0],"margins":16,"orientation":"row","spacing":10,"alignChildren":["left","top"]}},"item-1":{"id":1,"type":"Panel","parentId":20,"style":{"text":"Page Selection","preferredSize":[0,205],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"StaticText","parentId":1,"style":{"text":"Import PDF Pages:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-3":{"id":3,"type":"EditText","parentId":6,"style":{"text":"1","preferredSize":[60,0],"alignment":null}},"item-4":{"id":4,"type":"StaticText","parentId":6,"style":{"text":"thru","justify":"left","preferredSize":[0,0],"alignment":null}},"item-5":{"id":5,"type":"EditText","parentId":6,"style":{"text":"1","preferredSize":[60,0],"alignment":null}},"item-6":{"id":6,"type":"Group","parentId":1,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"StaticText","parentId":1,"style":{"text":"Start Placing on Doc Page:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-8":{"id":8,"type":"Checkbox","parentId":1,"style":{"text":"Reverse Page Order","preferredSize":[0,0],"alignment":null}},"item-9":{"id":9,"type":"Panel","parentId":20,"style":{"text":"Sizing Options","preferredSize":[0,160],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-10":{"id":10,"type":"Checkbox","parentId":9,"style":{"text":"Fit to Page","preferredSize":[0,0],"alignment":null}},"item-11":{"id":11,"type":"Checkbox","parentId":9,"style":{"text":"Keep Proportions","preferredSize":[0,0],"alignment":null}},"item-12":{"id":12,"type":"Checkbox","parentId":9,"style":{"text":"Bleed the Fit Page","preferredSize":[0,0],"alignment":null,"checked":true}},"item-13":{"id":13,"type":"StaticText","parentId":9,"style":{"text":"Scale of Imported Page","justify":"left","preferredSize":[0,0],"alignment":null}},"item-14":{"id":14,"type":"Group","parentId":9,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-15":{"id":15,"type":"EditText","parentId":14,"style":{"text":"100","preferredSize":[40,0],"alignment":null}},"item-16":{"id":16,"type":"StaticText","parentId":14,"style":{"text":"Y%:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-17":{"id":17,"type":"EditText","parentId":14,"style":{"text":"100","preferredSize":[40,0],"alignment":null}},"item-18":{"id":18,"type":"StaticText","parentId":14,"style":{"text":"X%:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-19":{"id":19,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-20":{"id":20,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-21":{"id":21,"type":"Panel","parentId":19,"style":{"text":"Positioning Options","preferredSize":[0,205],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"text":"Position on Page Aligned From:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-23":{"id":23,"type":"DropDownList","parentId":21,"style":{"text":"","listItems":"Top Left, Top Center, Top Right, Center Left, Center, Center Right, Bottom Left, Bottom Center, Bottom Right, -, Top - Relative to spine,  Center  - Relative to spine,  Right  - Relative to spine","preferredSize":[0,0],"alignment":null,"selection":0}},"item-24":{"id":24,"type":"DropDownList","parentId":21,"style":{"text":"Rotation:","listItems":"0, 90, 180, 270","preferredSize":[0,0],"alignment":null,"selection":0}},"item-25":{"id":25,"type":"StaticText","parentId":21,"style":{"text":"Offset by:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-26":{"id":26,"type":"Group","parentId":21,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-27":{"id":27,"type":"StaticText","parentId":26,"style":{"text":"X:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-28":{"id":28,"type":"EditText","parentId":26,"style":{"text":"0","preferredSize":[40,0],"alignment":null}},"item-29":{"id":29,"type":"StaticText","parentId":26,"style":{"text":"Y:","justify":"left","preferredSize":[0,0],"alignment":null}},"item-30":{"id":30,"type":"EditText","parentId":26,"style":{"text":"0","preferredSize":[40,0],"alignment":null}},"item-31":{"id":31,"type":"Panel","parentId":19,"style":{"text":"Placement Options","preferredSize":[0,160],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-32":{"id":32,"type":"DropDownList","parentId":31,"style":{"text":"Crop to:","listItems":"Art, Crop, Trim, Bleed, Media","preferredSize":[0,0],"alignment":null,"selection":0}},"item-33":{"id":33,"type":"Checkbox","parentId":31,"style":{"text":"Place Pages on a New Layer","preferredSize":[0,0],"alignment":null}},"item-34":{"id":34,"type":"Checkbox","parentId":31,"style":{"text":"Ignore Font and Image Errors","preferredSize":[0,0],"alignment":null}},"item-35":{"id":35,"type":"Checkbox","parentId":31,"style":{"text":"Transparent PDF Background","preferredSize":[0,0],"alignment":null,"checked":true}},"item-36":{"id":36,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-37":{"id":37,"type":"Button","parentId":36,"style":{"text":"OK","justify":"center","preferredSize":[0,0],"alignment":null}},"item-38":{"id":38,"type":"Button","parentId":36,"style":{"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null}},"item-39":{"id":39,"type":"EditText","parentId":1,"style":{"text":"1","preferredSize":[60,0],"alignment":null}},"item-40":{"id":40,"type":"Checkbox","parentId":1,"style":{"text":"Map to Doc Pages","preferredSize":[0,0],"alignment":null}}},"order":[0,20,1,2,6,3,4,5,8,7,39,40,9,10,11,12,13,14,18,15,16,17,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]}')),modal.remove(),loadingScreen.init(null,function(){location.reload()})},300)}),e.find(".no").on("click",function(){modal.remove()})}),$(".grey-out-active").on("click",function(){$(this).hasClass("off")?($(this).removeClass("off"),$("#dialog").removeClass("hide-active"),notification("info","Active item highlighted in the dialog preview.",3.5)):($(this).addClass("off"),$("#dialog").addClass("hide-active"),notification("meh","Active item grayed out in the dialog preview.",3.5))}),
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
$(document).on("keydown",function(e){69==(e.keyCode?e.keyCode:e.which)&&e.altKey&&$(".l-export").trigger("click")}),shortcutExport(),$(".panel-wrap .panel-title, .panel-wrap .collapse, .panel-wrap .label").on("click",function(){var e,t,a;e=$(this),t=e.parent(),a=t.hasClass("collapse")?"removeClass":"addClass",t.hasClass("collapse")&&snapshot.openPanel(),t[a]("collapse"),$("#dialog-section").backstretch("resize")});
// The orange text in Preferred Size number inputs
var dangerZone={set:function(e,t){var
// id         = dataItem.id,
a=e.dataItem.type,i=e.value,n=i[0],l=i[1],s=0!==n,r=0!==l,d=t,o=Math.round(d.width()),c=Math.round(d.height())-("Dialog"===a?Math.round($("#dialog-title-bar").outerHeight()):0),p=$("#panel-edit-style-wrap"),m=p.find(".number.width"),u=p.find(".number.height"),f="danger-zone";s&&!m.hasClass(f)&&n<o?m.addClass(f):(m.hasClass(f)&&!s||m.hasClass(f)&&o<=n)&&m.removeClass(f),r&&!u.hasClass(f)&&l<c?u.addClass(f):(u.hasClass(f)&&!r||u.hasClass(f)&&c<=l)&&u.removeClass(f)}},forceSize={onUpdate:function(e,p){$("#dialog").find([".static-text",".edit-text",".list-box",".tree-view"].join(", ")).each(function(){var e=$(this),t=e.data("item-id"),a=e.data("item-parent-id"),i={active:p.items["item-"+t],parent:p.items["item-"+a]},n="fill"!==i.parent.style.alignChildren[0],l="fill"!==i.parent.style.alignChildren[1],s=i.active.style.preferredSize[0],r=i.active.style.preferredSize[1],d=0!==s,o=0!==r,c="fill"!==i.active.style.alignment;d&&n&&c?e.width(s):"auto"!==e.width()&&e.width("auto"),o&&l&&c?e.height(r):"auto"!==e.height()&&e.height("auto")})}};
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
// @codekit-prepend "dialog.builder/item.factory/special.logic/danger.zone.js";
// @codekit-prepend "dialog.builder/item.factory/special.logic/force.size.js";
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
$.inArray(data.activeId,data.order)<0&&data.order.push(data.activeId);var oldActiveId=data.activeId;$.each(data.order,function(e,t){var a=data.items["item-"+t],i=$("#panel-tree-view-wrap"),n={id:t,type:a.type,parentId:a.parentId,target:0===t?i.find(".contents"):i.find('[data-item-id="'+a.parentId+'"] > ul'),event:"loadFromLocalStorage"};item.funnel.create(n)}),
// Update preferred size now that all items/elements are created
$.each(data.order,function(e,t){void 0!==data.items["item-"+t].style.preferredSize&&(item.activate(t),item.update.style.dialogPreview("preferredSize",data,data.items["item-"+t],"loadFromLocalStorage"))}),
// Reactivate the ye olde active item
item.activate(oldActiveId);var oldItem=(
// Build Item Properties panel
data=local_storage.get("dialog")).items["item-"+oldActiveId];edit_style_panel.build(oldItem.style)}var treeElem=$("#panel-tree-view-wrap"),dialog=$("#dialog");
// So you can easily show parent items on hover without having to activate it
$("#panel-tree-view-wrap").on("mouseenter mouseleave",".item-text",function(e){var t=$(this).parent("li"),a=t.data("item-id"),i=dialog.find('[data-item-id="'+a+'"]');"Tab"===t.data("item-type")&&(i=dialog.find('[data-tab-id="'+a+'"]')),"mouseenter"===e.type?i.addClass("ghosting"):i.removeClass("ghosting")}),
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
tolerance:-3,isValidTarget:function(e,t){var a=tabbedPanel.onDragValid(e,t),i=treeView.onDragValid(e,t);
// TRUE = Droppable
// FALSE = No dropsies
return!a&&!i},onDragStart:function(e,t,a,i){
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
i.altKey&&(
// Make a clone in the place of the original...
e.clone().insertAfter(e).addClass("dolly"),$("body").addClass("duplicate-item"))):t.options.drop||e.clone(!0).insertAfter(e),a(e,t)},onDrop:function(e,t,a){if(
// The width is made static onDragStart making things
// less jumpy. This normalizes the container width.
treeDialog.width("auto"),0<t.target.closest("#panel-new-item-wrap").length)e.remove();else{var i=0<e.find(".item-text").length,n=$("body").hasClass("duplicate-item");
// REGULAR SORT
// DRAGGING / SORTING WITHIN THE TREE VIEW PANEL
i&&!n?item.drag.sort(e):i&&n?item.drag.duplicate(e,t):item.drag.make(e)}a(e,t)}}),
// ADD ITEMS BY DRAGGING THEM INTO THE TREE VIEW
// The events are handled in the function above
$("#panel-new-item-wrap ul").sortable({drop:!1,group:"dialog-items"}),item.drag={},
// *********************************
// DRAG - SORT ITEM(S) (onDrop)
// *********************************
item.drag.sort=function(e){
// $('#panel-tree-view-wrap .sort-temp-item').remove();
var t=e.parent("ul").parent("li").data("item-id"),a=e.prev(),i=0<a.length?"insertAfter":"prependTo",n=0<a.length?a.data("item-id"):t;e.attr("item-parent-id",t),e.data({"item-parent-id":t});var l=e.data("item-type"),s=e.data("item-id");item.funnel.sort(s,t,l,i,n),item.activate(s);
// Build Item Properties panel
var r=local_storage.get("dialog");edit_style_panel.build(r.items["item-"+s].style),tab.onSort(e),treeViewItem.onSort(e,l,s)},
// *********************************
// DRAG - MAKE NEW ITEM (onDrop)
// *********************************
item.drag.make=function(e){var t=e.prev(),a=e.parent("ul"),i=t.length<1,n=t.data("parent"),l=i?a:t,s={id:item.get.id(),// Picked up in the function onDragStart.
type:e.data("item-type"),parentId:i?a.parent("li").data("item-id"):t.data("item-parent-id"),// Fetch parent id from the previous item. If it doesn't exist, fetch id from the parent item.
target:l,previousIsParent:n,event:"drag"};// Traget previous item. If it doesn't exist, target parent item.
e.remove(),// Item is the dragged li from the "Add Items" panel
item.funnel.create(s)},
// **************************************
// DRAG - DUPLICATE ITEM(S) (onDrop)
// **************************************
item.drag.duplicate=function(e,s){var t=e.prev(),a=e.parent("ul"),i=t.length<1,r=t.data("parent"),d=i?a:t;// Target previous item. If it doesn't exist, target parent item.
$("body").removeClass("duplicate-item"),// The function of this class is to change the cursor
// Dolly becomes a real sheep by way of eliminating the original
// The cloned elements are actually just thrown away and then re-created
// from scratch. I did it this way because there's basically 3 places
// where the items exist at all times; Treeview, Dialog Preview and Local
// storage. Since I have a system in place for creating items that handles
// creating the item in all of these 3 places in one swing, then why not...
$("#panel-tree-view-wrap .dolly").removeClass("dolly"),e.remove();var o,c=local_storage.get("dialog"),p=$("#panel-tree-view-wrap"),m={};
// Filled inside the each function below.
// Dragged item and every child with data-item-id attribute
e.find("[data-item-id]").add(e).each(function(e){var t=$(this).data("item-id"),a=c.items["item-"+t],i=item.get.id(),n=0===e?s.target.parent("li").data("item-id"):m["parent-"+a.parentId];
// Maps old parent id with the new parent id so that
// following items can then check what they new parent id is
$(this).data("parent")&&(m["parent-"+t]=i);var l={id:i,type:a.type,parentId:n,target:0===e?d:p.find('[data-item-id="'+n+'"] > ul'),event:0===e?"drag-duplicate":"loadFromLocalStorage",previousIsParent:r,sourceId:t};0===e&&(o=l.id),item.funnel.create(l)}),
// Reactivate the ye olde active item
item.activate(o);var n=(
// Build Item Properties panel
c=local_storage.get("dialog")).items["item-"+o];edit_style_panel.build(n.style),$("body").removeClass("dragging")};var dialogElem=$("#dialog");
// ACTIVATE ITEMS WHEN FOCUSED IN DIALOG PREVIEW
dialogElem.on("focus","[contenteditable]",function(){var e=$(this),t=(e.parent().attr("id"),e.hasClass("tab")&&e.data("tab-id")||e.closest("[data-item-id]").data("item-id"));item.activate(t);
// Build Item Properties panel
var a=local_storage.get("dialog");edit_style_panel.build(a.items["item-"+t].style,"dialog")}),
// My man EditText needs some extra care to keep its public image.
dialogElem.on("focus blur",'[data-item-type="EditText"] [contenteditable]',function(e){"focusin"===e.type?$(this).parent().parent().addClass("focused"):dialogElem.find(".focused").removeClass("focused")}),
// So that the whitespace (padding) around edittext is clickable too...
dialogElem.on("click",'[data-item-type="EditText"]',function(e){e.preventDefault(),$(this).find("[contenteditable]").focus()}),
// Image click activate
dialogElem.on("click",'[data-item-type="Image"]',function(){var e=$(this).data("item-id");item.activate(e);
// Build Item Properties panel
var t=local_storage.get("dialog");edit_style_panel.build(t.items["item-"+e].style)}),
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
var a=$(this).closest("[data-item-type]").hasClass("static-text"),i=$(this).closest("[data-item-type]").hasClass("edit-text");if(a||i){var n=$(this).height(),l=!1;a&&25.5<n?l=!0:i&&22.5<n&&(l=!0),l?$(this).addClass("multiline"):$(this).removeClass("multiline")}
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
//# sourceMappingURL=dialog.builder.js.map