import "./css/index.css";

import googleTranslate from "./js/googleTranslate";

document.addEventListener("alpine:init", () => {
    window.Alpine.data("googleTranslate", googleTranslate);
});
