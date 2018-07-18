// UI references
var uiTimer = document.querySelector(".section-timer .time");
var uiTimerSettings = document.querySelector(".section-timer .settings");
var uiTimerSettingsPanel = document.querySelector(".section-timer .settings-panel");
var uiTimerSettingTime = document.querySelector(".section-timer .setting-time");
var uiTimerSettingTimeSave = document.querySelector(".section-timer .setting-time-save");

// Time references
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;

// Timer
var timer;
var timerHours;
var timerMinutes;

// Pad numbers (5 => 05, 13 => 13)
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function updateTimer() {
  if(timerHours == NaN || timerMinutes == NaN || timerHours == undefined || timerMinutes == undefined) {
    uiTimer.innerHTML = "No time set";
    return;
  }

  var now = new Date();
  var then = new Date();
  then.setHours(timerHours, timerMinutes, 00);

  var distance = then - now;
  if(distance < 0) {
    clearInterval(timer);
    uiTimer.innerHTML = "ENDE";
    return;
  }

  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  uiTimer.innerHTML = pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
}

function saveTimerSettings() {
  var timeValue = uiTimerSettingTime.value;
  console.log("Saving new time");

  var timeH = timeValue.split(":")[0];
  var timeM = timeValue.split(":")[1];

  stash.set("timer-hours", timeH);
  stash.set("timer-minutes", timeM);

  loadTimerSettings();
  updateTimer();
}

function loadTimerSettings() {
  timerHours = stash.get("timer-hours");
  timerMinutes = stash.get("timer-minutes");

  uiTimerSettingTime.value = timerHours + ":" + timerMinutes;
}

uiTimerSettings.addEventListener('click', function() {
  uiTimerSettingsPanel.classList.add("active");
});

uiTimerSettingTimeSave.addEventListener('click', function() {
  uiTimerSettingsPanel.classList.remove("active");
  saveTimerSettings();
});

loadTimerSettings();
updateTimer();
timer = setInterval(updateTimer, 1000);
