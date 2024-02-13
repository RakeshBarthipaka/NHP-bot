import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface Props {
  setTranscriptValue: any;
  setisListen: any;
}


let recognizer: any = null;

const speechToTextStart = (props: Props) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "35d3e90f532e400bac302cf61738dce6",
    "centralindia"
  );
  speechConfig.speechRecognitionLanguage = "en-US";
  const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
  recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  recognizer.recognizeOnceAsync((result: any) => {
    let displayText;
    if (result.reason === ResultReason.RecognizedSpeech) {
      displayText = result.text;
      props.setTranscriptValue(displayText);
    } else {
      props.setisListen(false);
    }
  });
};

const speechToTextStop = () => {
  if (recognizer) {
    recognizer.stopContinuousRecognitionAsync();
  }
};
export { speechToTextStart, speechToTextStop };
