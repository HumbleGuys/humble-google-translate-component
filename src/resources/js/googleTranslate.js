export default ({ defaultLanguage, availableLanguages }) => ({
    activeLanguage: defaultLanguage,

    init() {
        this.$store.googleTranslate.initStore(
            defaultLanguage,
            availableLanguages
        );

        Alpine.effect(() => {
            this.activeLanguage = this.$store.googleTranslate.activeLanguage;
        });
    },

    changeLanguage(lang) {
        this.$store.googleTranslate.changeLanguage(lang);
    },
});
