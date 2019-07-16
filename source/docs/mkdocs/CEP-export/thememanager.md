# Theme Manager

Theme manager changes the theme color automatically based on the app interface color.

You need to manually add this `SDB.themeManager.init( csinterface );` after wherever you define CSInterface and provide it as a parameter.

Something like this:

```Javascript
var csi = new CSInterface();
SDB.themeManager.init( csi );
```
