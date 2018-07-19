const { remote } = require('electron');

var uiWindowControlsInfo = document.querySelector(".ui-window-controls-info");
var uiWindowControlsMinimize = document.querySelector(".ui-window-controls-minimize");
var uiWindowControlsClose = document.querySelector(".ui-window-controls-close");

uiWindowControlsInfo.addEventListener('click', function() {
  alert("== wörkspäce ==\nVersion 1.1.1\n\nDevelopment & Code: Andreas Heimann\nUsed technology: Electron, NodeJS, Showdown, Atom");
});

uiWindowControlsMinimize.addEventListener('click', function() {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

uiWindowControlsClose.addEventListener('click', function() {
  remote.BrowserWindow.getFocusedWindow().close();
});
