import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import en_lang from "./translation/en.json";
import ua_lang from "./translation/ua.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      common: en_lang,
    },
    ua: {
      common: ua_lang,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);
