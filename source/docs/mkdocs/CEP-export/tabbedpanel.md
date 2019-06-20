# Tabbedpanel

## Methods

### select()
```Javascript
SDB.Tabbedpanel.select.index( element, index ); // Selects a tab using its index
SDB.Tabbedpanel.select.id( element, id );       // Selects a tab using a id
```

### onSelect eventListener

Target element should be a `.tabbed-panel`.

```Javascript
element.addEventListener("onSelect", function(e) {
  console.log( e.detail );
});
```

----

## Real world examples

### Select a tab using its index

Select tab number `4`

```Javascript
SDB.Tabbedpanel.select.index( SDB.id(2), 5 );
```

----

### Select a tab using its ID

Select tab with the id `4`

```Javascript
SDB.Tabbedpanel.select.id( SDB.id(2), 4 );
```

----

### Disable element if tab is activated

Disable item with the name `Charles` if tab #2 of `TammyTabs` is selected

```Javascript
var tabbedPanel = SDB.name('TammyTabs');
tabbedPanel.addEventListener("onSelect", function(e) {
  var tabIndex = e.detail.selected.index;
  var action = tabIndex === 1 ? 'disable' : 'enable';
  SDB[ action ].name('Charles');
});
```

----

## HTML structure

_The HTML might be slightly cleaned up to make it easier to to read._

??? "Expand code here"
	```HTML
	<div class="panel tabbed-panel" data-parent="true" data-item-type="tabbedpanel" data-item-name="tabbyTheTabbedPanel" data-item-id="1" data-item-parent-id="0">
		<div class="tab-container">
			<div class="tab currently-active-tab visible" data-tab-id="2" contenteditable="">Tab1</div>
			<div class="tab" data-tab-id="3" contenteditable="">Tab2</div>
		</div>
		<div class="padding-box">
			<style class="margins">
			#dialog [data-item-id="1"]>.padding-box>.tab>.padding-box { padding: 10px 10px 10px 10px; }
			</style>
			<div class="panel tab orientation-column align-children-horizontal-left align-children-vertical-top active visible-tab" data-parent="true" data-item-type="tab" data-item-name="tab1" data-item-id="2" data-item-parent-id="1">
				<div class="padding-box">
					<style class="spacing">
					#dialog [data-item-id="2"].orientation-row>.padding-box>div { padding-left: 10px; }
					#dialog [data-item-id="2"].orientation-row>.padding-box>div:first-of-type { padding-left: 0px; }
					#dialog [data-item-id="2"].orientation-column>.padding-box>div { padding-top: 10px; }
					#dialog [data-item-id="2"].orientation-column>.padding-box>div:first-of-type { padding-top: 0px; }
					</style>
					<div class="edit-text disable-soft-wrap" data-item-type="edittext" data-item-name="text1" data-item-id="4" data-item-parent-id="2">
						<span class="edit-text-inner-wrap">
							<span class="text-container" contenteditable="true">EditText</span>
						</span>
					</div>
				</div>
			</div>
			<div class="panel tab orientation-column align-children-horizontal-left align-children-vertical-top" data-parent="true" data-item-type="tab" data-item-name="tab2" data-item-id="3" data-item-parent-id="1">
				<div class="padding-box">
					<style class="spacing">
					#dialog [data-item-id="3"].orientation-row>.padding-box>div { padding-left: 10px; }
					#dialog [data-item-id="3"].orientation-row>.padding-box>div:first-of-type { padding-left: 0px; }
					#dialog [data-item-id="3"].orientation-column>.padding-box>div { padding-top: 10px; }
					#dialog [data-item-id="3"].orientation-column>.padding-box>div:first-of-type { padding-top: 0px; }
					</style>
					<div class="button justify-center" data-item-type="button" data-item-name="buthon" data-item-id="5" data-item-parent-id="3">
						<div class="button-border">
							<span class="text-container" contenteditable="false">Button</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	```
