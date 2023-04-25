import { createSignal, createEffect } from "solid";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log("count", count());
});

createEffect(() => {
  document.querySelector("#count").textContent = count();
});

document.querySelector("button").addEventListener("click", () => {
  setCount((c) => c + 1);
});
