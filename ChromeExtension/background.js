let selectedLanguage = 1; //Default is English
let selectedVoice = "Alex";
let listVoice = [];
let targetLanguage = "vi"; //Default is Vietnamese
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ listVoice });
  chrome.storage.sync.set({ selectedLanguage });
  chrome.storage.sync.set({ selectedVoice });
  chrome.storage.sync.set({ targetLanguage });
  console.log(
    "Default set language is English",
    `language : ${selectedLanguage}`
  );
});
