import initGoogleTranslate from "./initGoogleTranslate.js";
import Cookies from "js-cookie";

export default ({ defaultLanguage, availableLanguages }) => ({
    pageLanguage: defaultLanguage,
    availableLanguages: availableLanguages,
    activeLanguage: defaultLanguage,

    init() {
        initGoogleTranslate().then((google) => {
            new google.translate.TranslateElement(
                {
                    pageLanguage: this.pageLanguage,
                    availableLanguages: this.availableLanguages
                        ? this.availableLanguages.join(",")
                        : null,
                    autoDisplay: false,
                },
                "google_translate_element"
            );

            this.activeLanguage =
                Cookies.get("GoogleAccountsLocale_session") ||
                this.pageLanguage;

            document.body.classList.add(
                `google-translate-lang-${this.activeLanguage}`
            );
        });
    },

    changeLanguage(lang) {
        document.body.classList.remove(
            `google-translate-lang-${this.activeLanguage}`
        );
        document.body.classList.add(`google-translate-lang-${lang}`);

        this.activeLanguage = lang;

        if (this.pageLanguage === lang) {
            Cookies.remove("googtrans", { path: "" });
            Cookies.remove("googtrans", {
                path: "",
                domain: `.${window.location.hostname}`,
            });
        } else {
            Cookies.set("googtrans", `/${this.pageLanguage}/${lang}`, {
                expires: 999,
                path: "",
            });
        }

        Cookies.set("GoogleAccountsLocale_session", lang, {
            expires: 999,
        });

        this.$nextTick(() => {
            const el = document.querySelector(
                "#google_translate_element select"
            );

            el.value = lang;

            let event;
            if (typeof Event === "function") {
                event = new Event("change");
            } else {
                event = document.createEvent("Event");
                event.initEvent("change", true, true);
            }

            el.dispatchEvent(event);
            el.dispatchEvent(event);
        });
    },
});
