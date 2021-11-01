import Vue from "vue";

Vue.filter("capitalize", (value, allWords) => {
  if (!value) {
    return "";
  }

  if (allWords) {
    return value.replace(/\b\w/gu, (l) => l.toUpperCase());
  } else {
    return value.replace(/\b\w/u, (l) => l.toUpperCase());
  }
});
