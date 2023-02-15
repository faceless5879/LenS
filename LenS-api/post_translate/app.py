import json
import boto3

translate_client = boto3.client("translate")


def lambda_handler(event, context):
    req_body = json.loads(event["body"])
    text = req_body["text"]
    target_language = req_body["targetLanguage"]
    print(text, target_language)

    translate_response = translate_client.translate_text(
        Text=text,
        SourceLanguageCode="auto",
        TargetLanguageCode=target_language,
    )
    translated_result = translate_response["TranslatedText"]
    print(translated_result)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps({"translated_result": translated_result}),
    }
