var modalBackground = null;
var modal = null;
const MODAL_WIDTH = 350;
const MODAL_HEIGHT = 180;
GenerateDialog();

document.body.addEventListener("dblclick", async function (e) {
  // console.log(e.clientX + ":" + e.clientY);
  ShowDialog();
  // let { listVoice } = await chrome.storage.sync.get("listVoice");
  // let { selectedLanguage } = await chrome.storage.sync.get("selectedLanguage");
  // let { selectedVoice } = await chrome.storage.sync.get("selectedVoice");
  // console.log(selectedLanguage + " : " + selectedVoice);
});

document.body.addEventListener("keydown", function (event) {
  if (event.altKey) {
    ShowDialog();
  }
  if (event.metaKey) {
    ShowDialog();
  }
});

async function ShowDialog() {
  modalBackground.style.display = "none";
  let s = window.getSelection();
  let selectedText = s.toString();
  if (selectedText.trim().length <= 0) return;
  // SpeakEnglish(selectedText);
  Speak(selectedText);
  modalBackground.innerHTML = await RenderDialog(selectedText);
  modal = document.getElementById("translate-frame");
  oRange = s.getRangeAt(0); //get the text range
  oRect = oRange.getBoundingClientRect();
  let x = oRect.left;
  let y = oRect.bottom;
  var width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  var top = y + MODAL_HEIGHT;
  if (top > height) {
    top = height;
  }

  top -= MODAL_HEIGHT + 100;
  var left = x + MODAL_WIDTH;
  if (left > width) {
    left = width - 50;
  }
  left -= MODAL_WIDTH;
  modal.style.left = left + "px";
  modal.style.top = top + 5 + "px";
  modalBackground.style.display = "block";
}

function GenerateDialog() {
  const modalElement = document.createElement("div");
  modalElement.innerHTML = `<div id="modalBackground" class="modal">${RenderDialog(
    "hello"
  )}</div>`;
  document.body.appendChild(modalElement);
  modalBackground = document.getElementById("modalBackground");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalBackground) {
      modalBackground.style.display = "none";
      tts.cancel();
    }
  };
}
