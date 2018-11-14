
### General Info

The purpose of this tool is to easily design and export Adobe Script UI dialogs. There are various limitations here and there, but the most important items, I would argue, are there and you should be able to make relatively complex dialogs. Speaking of limitations, there are small differences between Adobe applications so the dialog preview may not match what you will see in the application. The dialog preview was made using Illustrator CC dialog as the base, so that will have the least amount of changes. There are some seriously bizarre differences and I decided I can't be bothered with that. It's just not worth it.

This is designed to work in modern browsers, such as Chrome or Firefox and not so much Internet Explorer. Dialog data is saved locally by your browser. So if you refresh the page or come back later with the same browser your dialog should still be there. Maybe don’t push your luck though, because there’s always the off chance that an error of some kind wipes it clean. If you’re browsing in incognito mode, your browser will forget this data as soon as you close the tab or window.

[Github](#)
[Gitter](https://gitter.im/ScriptUI-Dialog-Builder/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

### General ScriptUI resources

*   [Peter Kahrel’s ScriptUI for dummies](http://www.kahrel.plus.com/indesign/scriptui.html)
*   [Jongware’s ScriptUI reference guide](http://jongware.mit.edu/Sui/)
*   There's a pretty extensive, pdf that you can find the ExtendScript Toolkit application help menu.
      * You can find the pdf online here in the [extendscript toolkit archives](https://www.adobe.com/devnet/scripting/estk.html), though the one you find in the ESTK.app help menu may be newer.
      * There's also [this project](http://estk.aenhancers.com/index.html) that aims to convert the JavaScript Tools Guide to readthedocs.io format, which may be a bit nicer to navigate and read, though it isn't a 100% complete [conversion as of now](https://bitbucket.org/motiondesign/javascript-tools-guide/src/master/).

### Add items

1.  Items can be created by either clicking or dragging from the "Add Items" panel to the "Structure" panel.
2.  `ListBox` and `DropDownList` use a comma separated list to create sub items. That list is editable in the "Item Properties" panel when these items are active.

### Activate items

1.  Simply clicking an item in the "Structure" panel will select it.
2.  You can also activate/edit item text by clicking on the item text in the dialog preview window.
      * There is one clear advantage in editing text there, because you can `TAB` and `Shift + TAB` to jump from item to item. Really handy if you’re on a quest to rename things.

### Duplicate items

1.  Hold down the `Alt` key and drag to another location in the "Structure" panel. _The modifier key needs to be held down before you start dragging._
2.  You can only drag one item at a time, but if you drag a parent item, all nested items will be duplicated with it.
3.  You can duplicate parent items inside itself.

### Mark items as selected

1.  Selections, such as checking a `Checkbox` or selecting an item in a `DropDownlist` happens in the dialog preview.

#### Selectable items:

*   `Checkbox`
*   `RadioButton`
*   `DropdownList`
*   `ListBox` You can select multiple items just by clicking and toggling the selection. In Adobe applications this item requires a modifier key to select multiple items.
*   `Tab` This item is selected every single time it is activated for easy editing.
*   `TreeItem`

### Moving items

1.  Simply drag item to a new location in the "Structure" panel.
2.  You can only drag one item at a time, but if you drag a parent item, all nested items will be moved with it.

### Editing number values

1. You can change the numbers with arrow keys up and down.
2. You an change the numbers by dragging the input
3. Increase step by `10` by holding down `Shift`.
      * This works with the arrow icons, arrow keys and dragging.

### Export

1.  You can find the export icon above the dialog preview.
2.  Export window shows you code preview and you can choose to either download or copy to clipboard.
3.  There’s also a shortcut `Alt+E` for quick clipboard export. This shortcut is much nicer to use if you’re constantly checking the output and piping it through the ExtendScript Toolkit for example.
4.  Comments with item name announce the scope for the following items.

### Import

1.  3rd line of every export will include the `JSON` that you can copy & paste to the import window. You can find the export icon on top of the dialog preview.
2.  I wouldn’t necessarily push my luck with this either. There’s always a chance an error occurs and your code can’t be imported.
