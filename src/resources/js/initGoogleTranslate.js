const CALLBACK_NAME = "googleTranslateInit";

let initialized = false;
let resolveInitPromise;
let rejectInitPromise;

const initPromise = new Promise((resolve, reject) => {
    resolveInitPromise = resolve;
    rejectInitPromise = reject;
});

export default function init() {
    if (initialized) {
        return initPromise;
    }

    initialized = true;

    window[CALLBACK_NAME] = () => resolveInitPromise(window.google);

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://translate.google.com/translate_a/element.js?cb=${CALLBACK_NAME}`;
    script.onerror = rejectInitPromise;
    document.querySelector("head").appendChild(script);

    return initPromise;
}
