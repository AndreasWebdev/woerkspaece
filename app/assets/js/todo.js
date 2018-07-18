// UI references
var uiTodo = document.querySelector(".section-todo textarea");
var uiSaveSaved = document.querySelector(".section-save-saved");
var uiSaveSaving = document.querySelector(".section-save-saving");

// Timer
var keyInterval;

// Load todo from stash and input to textarea
function loadInput() {
  if(stash.get("todo-value"))
    uiTodo.value = stash.get("todo-value");
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

    // Stop Timer
    clearInterval(keyInterval);
  }, 1000);
}

// First time load
loadInput();

// Setup listener
uiTodo.addEventListener("keyup", saveInput);
