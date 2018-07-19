// UI references
var uiTodoEditor = document.querySelector(".section-todoEditor");
var uiTodoViewer = document.querySelector(".section-todoViewer");
var uiTodoTabViewer = document.querySelector(".section-todoTabs .item-viewer");
var uiTodoTabEditor = document.querySelector(".section-todoTabs .item-editor");
var uiTodo = document.querySelector(".section-todoEditor textarea");
var uiSaveSaved = document.querySelector(".section-save-saved");
var uiSaveSaving = document.querySelector(".section-save-saving");

var showdown = require('showdown');
var converter = new showdown.Converter();

// 0 = Viewer, 1 = Editor
var currentTab = 0;

// Change active tab to Viewer
uiTodoTabViewer.addEventListener('click', function() {
  if(currentTab != 0) {
    currentTab = 0;
    uiTodoViewer.classList.add("active");
    uiTodoEditor.classList.remove("active");

    uiTodoTabViewer.classList.add("active");
    uiTodoTabEditor.classList.remove("active");
  }
});

// Change active tab to Editor
uiTodoTabEditor.addEventListener('click', function() {
  if(currentTab != 1) {
    currentTab = 1;
    uiTodoViewer.classList.remove("active");
    uiTodoEditor.classList.add("active");

    uiTodoTabViewer.classList.remove("active");
    uiTodoTabEditor.classList.add("active");
  }
});

// Timer
var keyInterval;

// Load todo from stash and input to textarea
function loadInput() {
  if(stash.get("todo-value")) {
    uiTodo.value = stash.get("todo-value");

    // Load Viewer
    uiTodoViewer.innerHTML = converter.makeHtml(uiTodo.value);
  }
}

// Save input of textarea to stash
function saveInput() {
  // Change UI to "Saving" state
  uiSaveSaving.style.display = "flex";
  uiSaveSaved.style.display = "none";

  // Reset timer
  clearInterval(keyInterval);

  // Timer so saving only happens after 1 second of doing nothing
  keyInterval = setInterval(function() {
    console.log("Saved...");

    // Get data and save it
    var value = uiTodo.value;
    stash.set("todo-value", value);

    // Change UI to "Saved" state
    uiSaveSaving.style.display = "none";
    uiSaveSaved.style.display = "flex";

    // Load Viewer
    uiTodoViewer.innerHTML = converter.makeHtml(value);

    // Stop Timer
    clearInterval(keyInterval);
  }, 1000);
}

// First time load
loadInput();

// Setup listener
uiTodo.addEventListener("keyup", saveInput);
