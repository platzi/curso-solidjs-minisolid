let context = []; // Stack - LIFO (Last In First Out)

export function createSignal(value) {
  const subscriptions = new Set();

  const read = () => {
    const observer = context[context.length - 1];
    if (observer) subscriptions.add(observer);
    return value;
  };

  const write = (newValue) => {
    if (typeof newValue === "function") newValue = newValue(value);
    value = newValue;
    subscriptions.forEach((observer) => observer());
  };

  return [read, write];
}

export function createEffect(fn) {
  context.push(fn);
  fn();
  context.pop();
}

export function createMemo(fn) {
  const [signal, setSignal] = createSignal();
  createEffect(() => {
    const value = fn();

    if (value !== signal()) setSignal(fn());
  });
  return signal;
}
