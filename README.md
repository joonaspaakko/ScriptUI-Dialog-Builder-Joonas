[![](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/source/wiki-images/github-cover.png?raw=true)](https://scriptui.joonas.me)

## Website (web app)

ScriptUI Dialog Builder (SDB) - [scriptui.joonas.me](https://scriptui.joonas.me)

### Offline use

This repository includes a build folder that contains the same files as the website. So if the URL doesn't work for some reason, you should be able to download the repo and use it locally (offline). Everything it needs to run is in the build folder. Just open the `build\index.html` in Chrome.

### Desktop applications

<details><summary>Read more...</summary>
  
The desktop apps won't work offline since each version of the app is only loading up the website and not a full fledged desktop app. The desktop applications are only trying to fill a small slot of convenience.

[**Download desktop applications** (Dropbox link)](https://www.dropbox.com/sh/4wy71qv8e08deh1/AADJYT4BJRQQuJvVjl5CaYgUa?dl=0).

> The desktop apps were created using an online tool that converts websites into desktop applications: [Web2Desk](https://desktop.appmaker.xyz/). They don’t seem to mention it anywhere as far as I know, but I believe Web2Desk uses [Electron](https://electronjs.org/) to create the desktop app that simply displays the chosen website (`https://scriptui.joonas.me`) using Chromium. Also, I believe they inject their own google analytics. SDB by itself doesn't gather any data.

**Chrome App**

The download folder also includes a Chrome App. The great thing about it is that you can sync it to other computers. The downside is that it's tied to Chrome.

[**Download desktop applications** (Dropbox link)](https://www.dropbox.com/sh/4wy71qv8e08deh1/AADJYT4BJRQQuJvVjl5CaYgUa?dl=0).


## Documentation

For now SDB's general documentation is in the [github wiki](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/wiki), but I'm planning to move that over to [scriptui.joonas.me/docs](https://scriptui.joonas.me/docs) at some point.

There's not much to write about in the SDB documentation, but I'm planning to perhaps include a changelog and sort of hidden or hard to find out features.

## CEP Documentation

SDB has a CEP export: `Export button (above dialog preview) > Gear icon (bottom right in the modal window) > CEP export (When this is turned on, the export comes out as html, css and js)`. It does not export you a fully functional extension, rather just a SUI style layout with some js helper functions to make it easier for you to work with it. You just paste the exported code into your CEP boilerplate's `index.html` and the rest is up to you writing the interaction logic.

This CEP documentation is in [scriptui.joonas.me/docs](https://scriptui.joonas.me/docs) → Look for CEP in the top menu.

> [scriptui.joonas.me/docs](https://scriptui.joonas.me/docs) is also included in the repo: `source/docs` and `build/docs`.

**Desktop app pros**

- If you’re knee deep in the Windows ecosystem and a devout user of Internet Explorer _(or any browser that is not Chrome)_, this desktop application has got your back since it uses Chromium to display the website.
- You don't have to worry about losing progress if you wipe your browser's browsing history. Although it may be good to know the app does allow you to do that too if the need arises.
- You get an Icon in your desktop you can use to launch the web app
- You get to use the web app in its own window

**Desktop app cons**

- Can't be used offline
- There is a tiny hiccup on Windows. In Windows, the `Alt` key shows the top menu... and especially if you're duplicating items, the structure panel may shift vertically causing you to drop the item in the wrong place.
- For some reason, the icons look kinda terrible, but since these apps are generated using a 3rd party tool, there's nothing to be done about it.

</details>

## General info about ScriptUI Dialog Builder (SDB)

#### Description

SDB helps you design and build ScriptUI dialogs without writing code. It auto-generates ready to use Javascript on export. It doesn't handle events though, you'll need to write events yourself.

#### What to expect

Because SDB simply _emulates_ ScriptUI layout and behavior, there are various differences here and there. This is to be expected. So be aware that the dialog preview may look completely different depending on the application you're passing the code through. There are also some differences between applications. As an example, a really easy to spot difference is that `tabs` look completely different in Photoshop than they do in other applications. While no application will be 100% accurate, Illustrator CC will be closest since SDB was built using it as the template.

In my experience, even when you run the code through ESTK, which is completely different looking than CC applications, SDB is still better than hand coding the dialog.

#### Data handling

Dialog data is saved locally by your browser (local storage). So if you refresh the page or come back later with the same browser, your dialog should still be there, as long as nothing goes wrong in the reconstruction of the dialog. There's always the off chance that an error of some kind wipes it clean. If you’re browsing in incognito mode, your browser will forget this data as soon as you close the tab or window. Each code export also includes importable JSON at the top of the code, which means you can continue working on a dialog on another computer as long as you store the importable JSON somewhere. I've been just leaving it in my scripts. Though if you're using images you might not want to do that since it could make the script size incredibly large (for a script anyway). [Here's an example](https://github.com/joonaspaakko/Photoshop-Rename-Layers-Script/blob/59e725e3830e3567b7c1f5ef3d45af3b2a9ee03e/Rename%20Layers.jsx#L272) of one of my scripts where I left the import JSON in place.

## SDB Layout PSD files

Maybe there's not a whole lot of need for this, but figured I might as well share it. It could be helpful if you wanna suggest a new feature or something. Font files included in the download folder.

Dropbox download link: [ScriptUI Dialog Builder PSD files](https://www.dropbox.com/sh/htrtgdiv2rauyuw/AABo7Z4HHL9-RR4LOmSu7RuHa?dl=0)

> This was generated using [Page Layers](https://www.pagelayers.com/). I did clean it up a bit but some of the layer structure may be unnecessarily complicated because it follows the html structure. Because it's essentially a fancy layered screenshot, it doesn't include anything but the visible elements. So no modal windows.

## Usage

A good rule of thumb is to use width and height sparingly. Sometimes `Align children: Fill` or `Alignment: Fill` can be used to get the desired result without setting a static width. You can easily make the dialog hard to work with if you have to keep adjusting the width and/or height values every time you add new items or make other changes that would affect the size.

There's also the fact that while SDB gets fairly close in imitating SUI, it's not perfect and therefore things may end up shifting around, but the width or height you've set wont. There's a good example of this in the sample dialog. The two bottom panels are given the same height, but the bottom left panel ends up being tad bigger in Indesign CC, because the children end up taking more room than they do in SDB.

For example, the sample dialog only uses width and height for various EditText fields to basically leave room for characters and the 4 panels so that they have equal height. That said, if [this issue](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/issues/26) gets implemented, it would be a way to get around the issue, by making sure items that are supposed to be the same size actually end up that way.

## Browser support

**Chrome.** _The development has shifted focus to Chrome so you probably shouldn't push your luck with Firefox either._ No mobile support. Try [the desktop app](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/#desktop-applications) if you don't like to use Chrome.

## Source folder

The `source`  folder contains the development files, which are stitched together using [Codekit](https://codekitapp.com/). Codekit does have nifty features like compressing images and stuff, but the major thing is that it's used in order to stitch together various `HTML`, `CSS` and `Javascript` files... just because it's convenient.

I wouldn't expect anyone to contribute to the code because it's just a big mess. It's all pretty much just prototypes held together by duct tape (So Codekit probably won't be an issue). I may consider hopping off of Codekit in the future...

## Dialog examples (JSX+JSON)

1. [Export Layers Inside Selected Group Dialog (Gist)](https://gist.github.com/joonaspaakko/29c8bc6321fdb76b8fd6daa32745724e) - ([Comparison image - Illustrator CC 2019 ](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/source/wiki-images/export-layers-inside-selected-group-dialog.png?raw=true)).
2. [Import Multiple PDF pages (Gist)](https://gist.github.com/joonaspaakko/3752836f282819949d5d0ab7268007dd) - (Comparison image below ↓).

## Comparison between ScriptUI Dialog Builder and Indesign

I recreated the dialog of an Indesign script called [Multi Page Importer (download link)](http://indesignsecrets.com/downloads/MultiPageImporter2.5-CS5.zip) in the builder, exported the code and ran it in Indesign CC 2019.

[(Click to enlarge)](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)
[![Comparison between ScriptUI Dialog Builder and Indesign CC 2019](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/source/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)](https://github.com/joonaspaakko/ScriptUI-Dialog-Builder-Joonas/blob/master/wiki-images/dialog-comparison-Import-multiple-pdf-pages.png?raw=true)
