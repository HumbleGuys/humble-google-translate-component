const w = ({ defaultLanguage: e, availableLanguages: n }) => ({
  activeLanguage: e,
  init() {
    this.$store.googleTranslate.initStore(
      e,
      n
    ), Alpine.effect(() => {
      this.activeLanguage = this.$store.googleTranslate.activeLanguage;
    });
  },
  changeLanguage(a) {
    this.$store.googleTranslate.changeLanguage(a);
  }
});
/*! js-cookie v3.0.1 | MIT */
function l(e) {
  for (var n = 1; n < arguments.length; n++) {
    var a = arguments[n];
    for (var c in a)
      e[c] = a[c];
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
function d(e, n) {
  function a(o, s, t) {
    if (!(typeof document > "u")) {
      t = l({}, n, t), typeof t.expires == "number" && (t.expires = new Date(Date.now() + t.expires * 864e5)), t.expires && (t.expires = t.expires.toUTCString()), o = encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var i = "";
      for (var r in t)
        !t[r] || (i += "; " + r, t[r] !== !0 && (i += "=" + t[r].split(";")[0]));
      return document.cookie = o + "=" + e.write(s, o) + i;
    }
  }
  function c(o) {
    if (!(typeof document > "u" || arguments.length && !o)) {
      for (var s = document.cookie ? document.cookie.split("; ") : [], t = {}, i = 0; i < s.length; i++) {
        var r = s[i].split("="), L = r.slice(1).join("=");
        try {
          var u = decodeURIComponent(r[0]);
          if (t[u] = e.read(L, u), o === u)
            break;
        } catch {
        }
      }
      return o ? t[o] : t;
    }
  }
  return Object.create(
    {
      set: a,
      get: c,
      remove: function(o, s) {
        a(
          o,
          "",
          l({}, s, {
            expires: -1
          })
        );
      },
      withAttributes: function(o) {
        return d(this.converter, l({}, this.attributes, o));
      },
      withConverter: function(o) {
        return d(l({}, this.converter, o), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(n) },
      converter: { value: Object.freeze(e) }
    }
  );
}
var g = d(C, { path: "/" });
const p = "googleTranslateInit";
let h = !1, f, m;
const v = new Promise((e, n) => {
  f = e, m = n;
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
  initStore(e, n) {
    this.initalizaed || (this.pageLanguage = e, this.availableLanguages = n, this.initalizaed = !0, E().then((a) => {
      new a.translate.TranslateElement(
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
      const n = document.querySelector(
        "#google_translate_element select"
      );
      n.value = e;
      let a;
      typeof Event == "function" ? a = new Event("change") : (a = document.createEvent("Event"), a.initEvent("change", !0, !0)), n.dispatchEvent(a), n.dispatchEvent(a);
    });
  }
};
document.addEventListener("alpine:init", () => {
  window.Alpine.data("googleTranslate", w), window.Alpine.store("googleTranslate", A);
});
