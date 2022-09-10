import "./css/index.css";

import googleTranslate from "./js/googleTranslate";
import store from "./js/store";

document.addEventListener("alpine:init", () => {
    window.Alpine.data("googleTranslate", googleTranslate);

    window.Alpine.store("googleTranslate", store);
});
