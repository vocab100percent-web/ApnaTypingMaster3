const fontSelect = document.getElementById("fontSelect");
const testText = document.getElementById("testText");
const typingBox = document.getElementById("typingBox");
const startBtn = document.getElementById("startTestBtn");
const resultBox = document.getElementById("resultBox");

const sampleTexts = {
  english: "The quick brown fox jumps over the lazy dog.",
  "hindi-inscript": "यह एक उदाहरण वाक्य है जिसे आप टाइप कर सकते हैं।",
  "hindi-krutidev": "¼;g ,d mnkguh okD; gS tks vki VkbZYi dj ldrs gSa½"
};

let startTime, timerRunning = false;

fontSelect.addEventListener("change", updateFont);
startBtn.addEventListener("click", startTest);
typingBox.addEventListener("input", checkTyping);

function updateFont() {
  const font = fontSelect.value;
  testText.innerText = sampleTexts[font];
  if (font === "english") {
    testText.style.fontFamily = "sans-serif";
    typingBox.style.fontFamily = "sans-serif";
  } else if (font === "hindi-inscript") {
    testText.style.fontFamily = "'Mangal', Arial, sans-serif";
    typingBox.style.fontFamily = "'Mangal', Arial, sans-serif";
  } else {
    testText.style.fontFamily = "'Kruti Dev 010', 'Mangal', sans-serif";
    typingBox.style.fontFamily = "'Kruti Dev 010', 'Mangal', sans-serif";
  }
}

function startTest() {
  updateFont();
  typingBox.value = "";
  typingBox.disabled = false;
  typingBox.focus();
  resultBox.classList.add("hidden");
  timerRunning = false;
  startTime = null;
}

function checkTyping() {
  if (!timerRunning) {
    startTime = new Date();
    timerRunning = true;
  }

  const typed = typingBox.value.trim();
  const original = testText.innerText.trim();

  if (typed === original) {
    const timeTaken = (new Date() - startTime) / 1000;
    const words = original.split(" ").length;
    const speed = Math.round((words / timeTaken) * 60);
    typingBox.disabled = true;
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `✅ Completed! <br>⏱ Time: <b>${timeTaken.toFixed(2)}s</b> | ⚡ Speed: <b>${speed} WPM</b>`;
  }
}
