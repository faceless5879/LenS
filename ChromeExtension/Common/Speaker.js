const tts = window.speechSynthesis;
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = GetVoice;
}
let voices = [];
GetVoice();

async function Speak(text) {
  let { listVoice } = await chrome.storage.sync.get("listVoice");
  let { selectedLanguage } = await chrome.storage.sync.get("selectedLanguage");
  let { selectedVoice } = await chrome.storage.sync.get("selectedVoice");
  tts.cancel();
  if (text === "") return;
  let toSpeak = new SpeechSynthesisUtterance(text);
  voices.forEach((voice) => {
    if (voice.name === selectedVoice) {
      toSpeak.voice = voice;
    }
  });
  setTimeout(() => {
    tts.speak(toSpeak);
  }, 200);
}

function SpeakEnglish(text) {
  tts.cancel();
  if (text === "") return;
  let toSpeak = new SpeechSynthesisUtterance(text);
  let selectedVoiceName = "Alex";
  voices.forEach((voice) => {
    // console.log(voice);
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  setTimeout(() => {
    tts.speak(toSpeak);
  }, 300);
}

async function GetVoice() {
  voices = await tts.getVoices();
  setTimeout(() => {
    chrome.storage.sync.set({
      listVoice: voices.map((v) => {
        return { voiceName: v.name, voiceLang: v.lang };
      }),
    });
  }, 10);
}
