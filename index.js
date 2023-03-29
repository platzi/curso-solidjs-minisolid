import { createSignal } from "solid";

const [count, setCount] = createSignal(0);

document.querySelector("button").addEventListener("click", () => {
  setCount(count() + 1);
  document.querySelector("#count").textContent = count();
});
