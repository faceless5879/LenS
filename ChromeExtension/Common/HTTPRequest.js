var requestOptions = {
  method: "GET",
  redirect: "follow",
};

const TOKYO_LAMBDA_TRANSLATE_URL =
  "https://g71ph4gxz7.execute-api.ap-northeast-1.amazonaws.com/dev";
const Virginia_LAMBDA_TRANSLATE_URL =
  "https://mi5dc2t0rb.execute-api.us-east-1.amazonaws.com/v1/translate/";
const KEY_ACCESS_LAMBDA_TRANSLATE = "yURSgheVZX4NOUvyee3F37few7wGwt2Z92VIlZ97";

async function GetVocabulary(vocabulary) {
  return await FetchData(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${vocabulary}`
  )
    .then((data) => data)
    .catch((error) => console.log("error", error));
}

async function GetMeaningLambda(vocabulary, targetLanguage) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", KEY_ACCESS_LAMBDA_TRANSLATE);
  myHeaders.append("Content-Type", "text/plain");
  return await FetchData(TOKYO_LAMBDA_TRANSLATE_URL, {
    // Adding method type
    method: "POST",
    headers: myHeaders,
    // Adding body or contents to send
    body: JSON.stringify({
      vocabulary,
      targetLanguage,
    }),
    redirect: "follow",
  })
    .then((data) => data)
    .catch((error) => console.log("error", error));
}

async function FetchData(url, option) {
  return (await fetch(url, option)).json();
}
