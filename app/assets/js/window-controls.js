const { remote } = require('electron');

var uiWindowControlsMinimize = document.querySelector(".ui-window-controls-minimize");
var uiWindowControlsClose = document.querySelector(".ui-window-controls-close");

uiWindowControlsMinimize.addEventListener('click', function() {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

uiWindowControlsClose.addEventListener('click', function() {
  remote.BrowserWindow.getFocusedWindow().close();
});
