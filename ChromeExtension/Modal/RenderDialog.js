async function RenderDialog(vocabulary) {
  vocabulary = capitalizeFirstLetter(vocabulary);

  let { targetLanguage } = await chrome.storage.sync.get("targetLanguage");
  const meaningLambda = await GetMeaningLambda(vocabulary, targetLanguage);
  try {
    const data = await GetVocabulary(vocabulary);
    // console.log(data);
    const phonetic = data[0].phonetic || "";
    const meaningEnglish = data[0].meanings[0].definitions[0].definition || "";
    const example = data[0].meanings[0].definitions[0].example || "";

    // const meaningJapanese = await GetMeaningLambda(vocabulary, "ja");

    return DialogTemplate(vocabulary, phonetic, meaningLambda, example);
  } catch {
    //return when cannot get data from dictionary.dev
    return DialogTemplate(vocabulary, "", meaningLambda, "");
  }
}

function DialogTemplate(vocabulary, phonetic, meaningVietnamese, example) {
  return `
    <div id="translate-frame" class="translate-frame">
        <div class="vocabulary">${vocabulary || ""}  ${phonetic || ""}</div>
        <div class="mean">${meaningVietnamese || ""}</div>
        <div class="example">${example || ""}
        </div>
    <div>`;
}
