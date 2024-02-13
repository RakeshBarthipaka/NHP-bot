import * as sdk from 'microsoft-cognitiveservices-speech-sdk';


let player: any = null;
const speakText = (textMessage: string[], voiceName: string) => {
  cancelPlayingAudio();
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "35d3e90f532e400bac302cf61738dce6",
    "centralindia"
  );
  player = new sdk.SpeakerAudioDestination();
  const audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
  speechConfig.speechSynthesisVoiceName = voiceName || "en-GB-LibbyNeural";
  const speechSynthesizer = new sdk.SpeechSynthesizer(
    speechConfig,
    audioConfig
  );
  speechSynthesizer.speakTextAsync(textMessage.toString());
};

const muteAudio = () => {
  if(player){
    player.mute();
  }
};

const unmuteAudio = () => {
  if(player){
    player.unmute();
  }
};

const cancelPlayingAudio = () => {
  if (player) {
    player.internalAudio.currentTime = player.internalAudio.duration;
  }
};

export { speakText, muteAudio, unmuteAudio, cancelPlayingAudio };
