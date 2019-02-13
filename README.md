
## Website

[scriptui.joonas.me](https://scriptui.joonas.me)

> This repository includes a build folder that contains the same files as in the website. So if the url doesn't work for some reason, you should be able to download the repo and use it locally. Everything it needs to run is in the build folder. Just open the `build\index.html` in your browser.

## Desktop applications

These were created using [Web2Desk](https://desktop.appmaker.xyz/). They don’t seem to mention it anywhere as far as I know, but I believe Web2Desk uses [Electron](https://electronjs.org/) to create the desktop app that simply displays the chosen website (`https://scriptui.joonas.me`) using Chromium.

Download [**desktop applications**](https://www.dropbox.com/sh/4wy71qv8e08deh1/AADJYT4BJRQQuJvVjl5CaYgUa?dl=0).

**Benefits?**

- You get an Icon in your desktop you can use to launch the web app
- You get to use the web app in its own window
- If you’re knee deep in the Windows ecosystem and a devout user of Internet Explorer _(or any browser that is not Chrome)_, this desktop application has got your back, since it uses Chromium to display the website.
- You don't have to worry about losing progress if you wipe your browser's browsing history. Although it may be good to know the app does allow you to do that too, if the need arises.

**Things to know?**

- There is a tiny hiccup on windows. When you try to duplicate item(s), it may jump a little causing you to grab the wrong items because the `alt` key shows the top menu on windows. Maybe I'll add a secondary modifier key at some point to get around that.
- For some reason the icons look kinda terrible, but it's too much work to do anything about it.

## Info

SDB's purpose is to help design Adobe Script UI dialogs and auto generate ready to use Javascript. It doesn't handle events. You'll need to write events yourself.

Because the builder simply _simulates_ ScriptUI layout and behavior, there are various differences here and there. One major factor is also that there are small differences between Adobe applications so be aware that the dialog preview may not entirely match what you will see in the application. As an example, a really easy to spot difference is that `tabs` look completely different in Photoshop than it does in other applications. The dialog preview was made using Illustrator CC ScriptUI as the template, so that will have the least amount of differences. I basically picked colors, and measurements of everything in order to replicate the layout + fiddled with the items and their various properties to see how they behave to replicate that as well. 

There's one kinda big feature that I had to leave out because I just couldn't replicate the behavior. I got pretty close, but I wasn't satisfied with it. ScriptUI items can actually have "fill" on both `x` and `y` axis, but in the builder it's limited to one axis.

Dialog data is saved locally by your browser (local storage). So if you refresh the page or come back later with the same browser, your dialog should still be there, as long as nothing goes wrong in the reconstruction of the dialog. There's always the off chance that an error of some kind wipes it clean. If you’re browsing in incognito mode, your browser will forget this data as soon as you close the tab or window. Each code export also includes importable JSON at the top of the code, which means you can continue working on a dialog on another computer as long as you save the JSON.

## Usage

A good rule of thumb is to use width and height sparingly. Sometimes `Align children: Fill` or `Alignment: Fill` can be used to get the desired result without setting a static width. You can easily make the dialog hard to work with if you have to keep adjusting width and/or height everytime you add new items or make other changes that would affect the size.

For example, the sample dialog only uses width and height for various EditText fields to basically leave room for characters and the 4 panels so that they have equal height.

## Browser support

Chrome. _May work in other modern browsers._ No mobile support. Use the desktop app if you don't like to use Chrome. 

## Source folder

Source contains the development files, which are stitched together using [Codekit](https://codekitapp.com/). Codekit does have nifty features like compressing images and stuff, but the major thing is that it's used in order to stitch together various `html`, `css` and `javascript` files... just because it's convenient.

I wouldn't expect anyone to contribute to the code because it's just a big mess. It's all pretty much just prototypes held together by duct tape (So Codekit probably won't be an issue).

## Dialog examples (JSX+JSON)

1. [Export Layers Inside Selected Group Dialog (Gist)](https://gist.github.com/joonaspaakko/29c8bc6321fdb76b8fd6daa32745724e) - ([Comparison image - Illustrator CC 2019 ](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/source/wiki-images/export-layers-inside-selected-group-dialog.png?raw=true)).
2. [Import Multiple PDF pages (Gist)](https://gist.github.com/joonaspaakko/3752836f282819949d5d0ab7268007dd) - (Comparison image below ↓).

## Comparison between ScriptUI Dialog Builder and Indesign

I recreated the dialog of an Indesign script called [Multi Page Importer (download link)](http://indesignsecrets.com/downloads/MultiPageImporter2.5-CS5.zip) in the builder, exported the code and ran it in Indesign CC 2019.

[(Click to enlarge)](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)
[![Comparison between ScriptUI Dialog Builder and Indesign CC 2019](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/source/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)
