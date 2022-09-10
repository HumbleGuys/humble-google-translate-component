const w = ({ defaultLanguage: e, availableLanguages: a }) => ({
  activeLanguage: e,
  init() {
    this.$store.googleTranslate.initStore(
      e,
      a
    ), Alpine.effect(() => {
      this.activeLanguage = this.$store.googleTranslate.activeLanguage;
    });
  },
  changeLanguage(o) {
    this.$store.googleTranslate.changeLanguage(o);
  }
});
/*! js-cookie v3.0.1 | MIT */
function l(e) {
  for (var a = 1; a < arguments.length; a++) {
    var o = arguments[a];
    for (var c in o)
      e[c] = o[c];
  }
  return e;
}
var C = {
  read: function(e) {
    return e[0] === '"' && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(e) {
    return encodeURIComponent(e).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function d(e, a) {
  function o(t, s, n) {
    if (!(typeof document > "u")) {
      n = l({}, a, n), typeof n.expires == "number" && (n.expires = new Date(Date.now() + n.expires * 864e5)), n.expires && (n.expires = n.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var i = "";
      for (var r in n)
        !n[r] || (i += "; " + r, n[r] !== !0 && (i += "=" + n[r].split(";")[0]));
      return document.cookie = t + "=" + e.write(s, t) + i;
    }
  }
  function c(t) {
    if (!(typeof document > "u" || arguments.length && !t)) {
      for (var s = document.cookie ? document.cookie.split("; ") : [], n = {}, i = 0; i < s.length; i++) {
        var r = s[i].split("="), L = r.slice(1).join("=");
        try {
          var u = decodeURIComponent(r[0]);
          if (n[u] = e.read(L, u), t === u)
            break;
        } catch {
        }
      }
      return t ? n[t] : n;
    }
  }
  return Object.create(
    {
      set: o,
      get: c,
      remove: function(t, s) {
        o(
          t,
          "",
          l({}, s, {
            expires: -1
          })
        );
      },
      withAttributes: function(t) {
        return d(this.converter, l({}, this.attributes, t));
      },
      withConverter: function(t) {
        return d(l({}, this.converter, t), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(a) },
      converter: { value: Object.freeze(e) }
    }
  );
}
var g = d(C, { path: "/" });
const p = "googleTranslateInit";
let h = !1, f, m;
const v = new Promise((e, a) => {
  f = e, m = a;
});
function E() {
  if (h)
    return v;
  h = !0, window[p] = () => f(window.google);
  const e = document.createElement("script");
  return e.async = !0, e.defer = !0, e.src = `https://translate.google.com/translate_a/element.js?cb=${p}`, e.onerror = m, document.querySelector("head").appendChild(e), v;
}
const A = {
  activeLanguage: null,
  availableLanguages: null,
  pageLanguage: null,
  initalizaed: !1,
  initStore() {
    this.initalizaed || (this.initalizaed = !0, E().then((e) => {
      new e.translate.TranslateElement(
        {
          pageLanguage: this.pageLanguage,
          availableLanguages: this.availableLanguages ? this.availableLanguages.join(",") : null,
          autoDisplay: !1
        },
        "google_translate_element"
      ), this.activeLanguage = g.get("GoogleAccountsLocale_session") || this.pageLanguage, document.body.classList.add(
        `google-translate-lang-${this.activeLanguage}`
      );
    }));
  },
  changeLanguage(e) {
    document.body.classList.remove(
      `google-translate-lang-${this.activeLanguage}`
    ), document.body.classList.add(`google-translate-lang-${e}`), this.activeLanguage = e, this.pageLanguage === e ? (g.remove("googtrans", { path: "" }), g.remove("googtrans", {
      path: "",
      domain: `.${window.location.hostname}`
    })) : g.set("googtrans", `/${this.pageLanguage}/${e}`, {
      expires: 999,
      path: ""
    }), g.set("GoogleAccountsLocale_session", e, {
      expires: 999
    }), requestAnimationFrame(() => {
      const a = document.querySelector(
        "#google_translate_element select"
      );
      a.value = e;
      let o;
      typeof Event == "function" ? o = new Event("change") : (o = document.createEvent("Event"), o.initEvent("change", !0, !0)), a.dispatchEvent(o), a.dispatchEvent(o);
    });
  }
};
document.addEventListener("alpine:init", () => {
  window.Alpine.data("googleTranslate", w), window.Alpine.store("googleTranslate", A);
});
