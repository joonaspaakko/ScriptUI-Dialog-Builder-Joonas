# Getting Started

## Usage

After you turn on the CEP export, there's not much to it:

1. Export the code
2. Paste to your CEP `HTML` file
   - I strongly advice to turn off word wrap in your editor, because the CSS and JS take up a lot of space. Unless of course you choose to link the files instead.
3. You're good to go.

**Just make sure the `JS` and `CSS` is included.**

!!! error "Theme Manager"
		Automatic theme switching is built in, but it needsto be triggered manually. Read more at [Theme Manager](/docs/CEP-export/thememanager/).

> The `HTML` obviously changes every single time you make changes in SDB, but the `JS` and `CSS` will not change very often if at all. So you may way to export `HTML` only after the first export. You'll likely want to put the `JS` file above your own Javascript. `CSS` isn't that picky.

## The required CSS and JS files

By default the export will include `HTML` + `CSS` & `JS`, but you can also export the `HTML` only. You can download the required `CSS` and `JS` files using these links.

- [CSS: `ScriptUI-Dialog-Builder-Joonas-master/build/assets/css/sdb.cep.css`](https://raw.githubusercontent.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/master/build/assets/css/sdb.cep.css)
- [JS: `ScriptUI-Dialog-Builder-Joonas-master/build/assets/js/sdb.cep.js`](https://raw.githubusercontent.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/master/build/assets/js/sdb.cep.js)

??? example "Uncompressed files?"
    
    Both of the files listed above are minified for convenience/performance reasons. Here's paths where you can find the uncompressed files.

    **JS**

    [`ScriptUI-Dialog-Builder-Joonas-master/build/assets/js/dialog.builder/sdb.cep/`](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/tree/master/source/assets/js/dialog.builder/sdb.cep/)
  
    - `helper.functions.js` has to be included if any of the other files are included and it has to be included first.
    - They don't necessarily have to be compiled into one big file. You could just include them one by one.
    - If you want, you don't have to include every single file, if you're not using all of these special items.

    **CSS**
        
    [`ScriptUI-Dialog-Builder-Joonas-master/build/assets/_sass/panels/5-dialog-preview.scss`](https://raw.githubusercontent.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/master/source/assets/_sass/panels/5-dialog-preview.scss)
    
    !!! error ""
        This is a SASS (SCSS) file, so it will have to be compliled to CSS before you can use it. You could use [SASS Meister](https://www.sassmeister.com/) to do the conversion.

## Samples
  
  Link to [SDB-to-CEP-samples](https://github.com/joonaspaakko/SDB-to-CEP-samples).

## Offline use

If you try to do an export locally without an internet connection, your export will not include anything but a mockup link to for the `CSS` and `JS`.

**The repository paths are:**

- `ScriptUI-Dialog-Builder-Joonas-master/build/assets/css/sdb.cep.css`
- `ScriptUI-Dialog-Builder-Joonas-master/build/assets/js/sdb.cep.js`

## Helper methods?

The included javascript has bunch of helper methods that make it easier to for example add new items. _That documentation starts from [Helper functions](/CEP-export/helper-functions/) in the left sidebar._ Only some of the items have these helper functions since the others don't really need them.

??? "What about other items?"
    I'm not planning to write a full library of commands for every single item. I strongly feel this is enough. I don't think it's necessary since this CEP export is part of SDB, so you can make the items there. But for example `Dropdownlist` has these helper methods because you can't populate it with data coming from the application or other outside sources in SDB. Plus you could spend a whole day trying to figure out how you can populate it. The premade `add()` method makes sure it functions without you having to Sherlock Holmes your way through the HTML/SDB to try and figure it out.

    With any of the other items you could fairly easily make the item in SDB, hide it and show it as is your want. The other option would be to just create the button using SDB, cut & paste from the HTML to your JS, store it in JS and plop it wherever you need it later. Of course, some data-attribute edits might be needed.

## Issues?
  The CEP export is very much an after thought and may suffer from that to a degree. Post your issues in [Github](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/issues).
