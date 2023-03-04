import { createEffect, createMemo, createSignal } from "solid";

const [getCount, setCount] = createSignal(0);
const double = createMemo(() => getCount() * 2);

createEffect(() => {
  console.log("count changed", getCount());
  document.querySelector("#count").textContent = getCount();
});

createEffect(() => {
  console.log("double changed", double());
  document.querySelector("#double").textContent = double();
});

document.querySelector("button").addEventListener("click", () => {
  const number = Number(document.querySelector("#number").value);
  setCount(getCount() + number);
});
