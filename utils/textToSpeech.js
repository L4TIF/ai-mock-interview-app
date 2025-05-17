export const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1
        utterance.voice = speechSynthesis.getVoices()[1]
        speechSynthesis.speak(utterance)
    }
    else {
        alert('Speech not supported in your browser')
    }
}