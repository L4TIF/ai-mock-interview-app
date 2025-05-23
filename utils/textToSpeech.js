import { toast } from 'sonner'

let voices = [];

// Load voices when they become available
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
    };
    // Initial load of voices
    voices = speechSynthesis.getVoices();
}

export const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Get English voices
        const englishVoices = voices.filter(voice => voice.lang.includes('en'));

        // If we have English voices, use the first one
        if (englishVoices.length > 0) {
            utterance.voice = englishVoices[0];
        }

        speechSynthesis.speak(utterance);
        return utterance;
    }
    else {
        toast.error('Speech not supported in your browser');
    }
}