console.log("Open Speak Selection");
const languageSelector = document.getElementById("languageSelector");
const voiceSelector = document.getElementById("voiceSelector");
const targetLanguageSelector = document.getElementById("targetLanguage");
GetVoiceSelection();

function GetVoiceSelection() {
  LoadListVoice();
  LoadSelectedVoice();
  languageSelector.addEventListener("change", (e) => {
    chrome.storage.sync.set({ selectedLanguage: e.target.value });
  });
  voiceSelector.addEventListener("change", (e) => {
    chrome.storage.sync.set({ selectedVoice: e.target.value });
  });
  targetLanguageSelector.addEventListener("change", (e) => {
    chrome.storage.sync.set({ targetLanguage: e.target.value });
  });
}

async function LoadSelectedVoice() {
  let { selectedLanguage } = await chrome.storage.sync.get("selectedLanguage");
  let { selectedVoice } = await chrome.storage.sync.get("selectedVoice");
  let { targetLanguage } = await chrome.storage.sync.get("targetLanguage");
  console.log(selectedLanguage + " : " + selectedVoice);
  languageSelector.value = selectedLanguage;
  voiceSelector.value = selectedVoice;
  targetLanguageSelector.value = targetLanguage;
}

async function LoadListVoice() {
  let { listVoice } = await chrome.storage.sync.get("listVoice");
  //   let { selectedVoice } = await chrome.storage.sync.get("selectedVoice");
  voiceSelector.innerHTML = "";
  listVoice.forEach((voice, index) => {
    let item = document.createElement("option");
    item.textContent = voice.voiceName + "(" + voice.voiceLang + ")";
    item.setAttribute("data-name", voice.voiceName);
    item.setAttribute("data-lang", voice.voiceLang);
    item.setAttribute("value", voice.voiceName);
    voiceSelector.appendChild(item);
  });
  voiceSelector.selectedIndex = 0;
  voiceSelector.value = "Alex";
}

function LoadSelected() {}
