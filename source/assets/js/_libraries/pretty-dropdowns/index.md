# jQuery Pretty Dropdowns

Pretty Dropdowns is a simple, lightweight jQuery plugin that converts `<select>` drop-down menus into "pretty" menus that you can skin using CSS.

### Features:

- Two arrow styles and sizes to choose from (or add your own style)
- Easily add icons, thumbnails, and other custom HTML to the menu items
- Support for multiple-select lists (`<select multiple>`)
- Support for option groups (`<optgroup>`)
- Tooltips (`title`) carried over at `<select>`, `<option>`, and `<optgroup>` levels
- Full keyboard navigation (you can even go directly to a menu item by typing its text)
- Auto-linked to `<label for>` (menu will get focus when you click on the label)
- Accessible (it plays nicely with screen readers)
- Sensible (when you open the menu it does its best to keep the menu items within the viewport)

**[See a demo &raquo;](https://thdoan.github.io/pretty-dropdowns/demo.html)**

## Getting Started

### Step 1: Link the required files

```
<link rel="stylesheet" href="/css/prettydropdowns.css">
<script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="/js/jquery.prettydropdowns.js"></script>
```

You have complete control over the look and feel of the drop-down menu by modifying `prettydropdowns.css`. It is recommended to load the JavaScript files at the bottom just before the closing `</body>` tag if possible.

### Step 2: Call the .prettyDropdown() function

Make sure this comes after the two required JavaScript files from Step 1 are loaded.

```
<script>
$(document).ready(function() {
  $('select').prettyDropdown();
});
</script>
```

You can also specify some options:

```
<script>
$(document).ready(function() {
  $('select').prettyDropdown({
    height: 30
  });
});
</script>
```

## Options

Name                | Type     | Default      | Description
------------------- | -------- | ------------ | -----------
`classic`           | boolean  | false        | The default behavior is to move the selected item to the top. If you want the order of items to remain static, then set this to `true`.
`customClass`       | string   | arrow        | The class name to customize the drop-down menu style. The default `arrow` class displays a chevron-type arrow icon. Two additional helper classes are built in (add either or both to `arrow`): `triangle` converts the chevron into a solid triangle; `small` renders the arrow icon at half size.
`height`            | number   | 50           | The drop-down menu item height. The minimum value is 8. Note that the maximum number of items displayed when the menu is opened is determined by the `size` attribute of the `<select>` element.
`hoverIntent`       | number   | 200          | The wait period (in milliseconds) before collapsing the drop-down menu after you hover off of it. If you hover back onto the menu within the wait period, it will remain open. The minimum value is 0.
`multiDelimiter`    | string   | ;            | The separator character to use for the list of selected items in a multi-select menu.
`multiVerbosity`    | number   | 99           | The maximum number of selected items to display in a multi-select menu before replacing it with a summary (e.g., "2/3 selected"). To display "0/3 selected" instead of "None selected", set this option to -1.
`selectedMarker`    | string   | **&#10003;** | The icon or symbol to mark that an item is selected. HTML is accepted (e.g., `<i class="fa fa-check"></i>`).
`afterLoad`         | function |              | Callback function to execute after the drop-down menu widget is loaded.

## Methods

Name        | Description
------------| -----------
`refresh()` | Rebuild the drop-down menu. You should do this whenever the `<select>` state changes (e.g., one or more `<option>` gets added, removed, or disabled).

**Example:**

```
<script>
$(document).ready(function() {
  $dropdown = $('select').prettyDropdown();
});
// When <select> state changes...
$dropdown.refresh();
</script>
```

## Data Attributes

The `data-prefix` and `data-suffix` attributes can be added to the `<option>` elements to insert custom HTML before and after each menu item, respectively. You can make use of these attributes to add icons, thumbnails, badges, etc. to the menu items. A good example can be seen [in the demo](https://thdoan.github.io/pretty-dropdowns/demo.html#example3).

## Keyboard Navigation

Key     | Description
------- | -----------
`Tab`   | Put focus on the next drop-down menu. If a menu is open, it will automatically close.
`Shift`+`Tab` | Put focus on the previous drop-down menu. If a menu is open, it will automatically close.
`Enter` | Open the drop-down menu that is in focus. If it is already open, then select the highlighted item.
`Esc`   | Close the drop-down menu.
`Home`  | Jump to the first item in the drop-down menu.
`End`   | Jump to the last item in the drop-down menu.
`PgUp`  | Go to the previous page of items. If there is no scrollbar, then this is the same as `Home`.
`PgDn`  | Go to the next page of items. If there is no scrollbar, then this is the same as `End`.
`Up`    | Highlight the previous item in the drop-down menu. If already on the first item, then highlight the last item.
`Down`  | Highlight the next item in the drop-down menu. If already on the last item, then highlight the first item.
`A`-`Z`<br>`0`-`9`<br>`Space` | If the drop-down menu is open, jump to the first item matching the key(s) pressed. Every time you press a key it will cycle through the matching items. **Hint:** if you type fast enough, it will try to find a match for everything you typed instead of just the first character. If the menu is closed and in focus, `Space` opens the menu (same as `Enter`).

## Accessibility

The following attributes are added to improve accessibility when using alternative input methods (e.g., keyboard, screen reader):

- `role="listbox"` and `role="option"` (to tell screen readers that it's a drop-down menu widget)
- `aria-activedescendant` (points to the currently selected menu item)
- `aria-expanded` (this is `true` when the menu is open and `false` when it's closed)
- `aria-label` (this is equivalent to the `title` attribute for screen readers)
- `aria-labelledby` (points to the `<label>` element that is linked to the `<select>` if it exists)
- `tabindex="0"` (to allow the widget to get focus when you hit the `Tab` key)

Please [submit an issue](https://github.com/thdoan/pretty-dropdowns/issues) if there are other ways to improve accessibility.

## Known Issues

- After resizing the window, the drop-down menu near the bottom of the page sometimes doesn't open in reverse.
- The `title` value will be read twice in some screen reader clients (once for `title`, once for `aria-label`).

## Installation

Choose from one of the following methods:

- `git clone git@github.com:thdoan/pretty-dropdowns.git`
- `git clone https://github.com/thdoan/pretty-dropdowns.git`
- `bower install pretty-dropdowns`
- `npm install pretty-dropdowns`
- [Download ZIP](https://github.com/thdoan/pretty-dropdowns/archive/master.zip)
