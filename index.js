import { createSignal, createEffect } from "solid";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log("count changed", count());
  document.querySelector("#count").textContent = count();
});

document.querySelector("button").addEventListener("click", () => {
  setCount(count() + 1);
});
