## Website

[scriptui.joonas.me](https://scriptui.joonas.me)

This epository includes a build folder, which contains the same files as in the website. So if the url doesn't work for some reason, you should be able to to download the repo and use it locally.

## Info

Easily design and auto generate JSX code for Adobe Script UI dialogs.

There are various limitations here and there, but the most important items/features, I would argue, are there and you should be able to make relatively complex dialogs with ease. Speaking of limitations, there are small differences between Adobe applications so the dialog preview may not entirely match what you will see in the application. The dialog preview was made using Illustrator CC dialog as the base, so that will have the least amount of differences. 

It's designed to work in modern browsers, such as Chrome or Firefox and not so much Internet Explorer. Dialog data is saved locally by your browser (local storage). So if you refresh the page or come back later with the same browser, your dialog should still be there, as long as nothing goes wrong in the reconstruction of the dialog. There's always the off chance that an error of some kind wipes it clean. If you’re browsing in incognito mode, your browser will forget this data as soon as you close the tab or window.

<sup><sub>I wouldn't expect anyone to contribute to the code because it's just a big mess. It's pretty much just all prototypes bundled into one.</sub></sup>

## Dialog examples (JSX+JSON)

1. [Export Layers Inside Selected Group Dialog (Gist)](https://gist.github.com/joonaspaakko/29c8bc6321fdb76b8fd6daa32745724e) - ([Comparison image - Illustrator CC 2019 ](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/export-layers-inside-selected-group-dialog.png?raw=true)).
2. [Import Multiple PDF pages (Gist)](https://gist.github.com/joonaspaakko/3752836f282819949d5d0ab7268007dd) - (Comparison image below ↓).

## Comparison between ScriptUI Dialog Builder and Indesign

I recreated the Indesign script [Multi Page Importer](http://indesignsecrets.com/downloads/MultiPageImporter2.5-CS5.zip) in the builder, exported the code and ran it in Indesign CC 2019.

[(Click to enlarge)](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)
[![Comparison between ScriptUI Dialog Builder and Indesign CC 2019](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)
