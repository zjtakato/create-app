(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".btn1{background-color:#ff0}.btn3[data-v-06632a17]{background-color:#0ff}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineComponent as _, openBlock as l, createElementBlock as d, Fragment as r, createElementVNode as n, toDisplayString as c, pushScopeId as u, popScopeId as p } from "vue";
const i = (t) => (u("data-v-06632a17"), t = t(), p(), t), b = { class: "btn1" }, m = { style: { backgroundColor: "red" } }, x = /* @__PURE__ */ i(() => /* @__PURE__ */ n("button", { class: "btn3" }, "btn3", -1)), v = /* @__PURE__ */ _({
  __name: "index",
  props: {
    btn1Value: null,
    btn2Value: null
  },
  setup(t) {
    return (o, e) => (l(), d(r, null, [
      n("button", b, c(t.btn1Value), 1),
      n("button", m, c(t.btn2Value.value), 1),
      x
    ], 64));
  }
});
const h = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [s, a] of o)
    e[s] = a;
  return e;
}, g = /* @__PURE__ */ h(v, [["__scopeId", "data-v-06632a17"]]);
export {
  g as Example
};
