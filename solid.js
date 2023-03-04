let context = [];

export function createSignal(value) {
  const subscriptions = new Set();

  const read = () => {
    const observer = context[context.length - 1];
    if (observer) {
      subscriptions.add(observer);
    }
    return value;
  };

  const write = (newValue) => {
    value = newValue;

    subscriptions.forEach((observer) => {
      observer.execute();
    });
  };

  return [read, write];
}

export function createEffect(fn) {
  const effect = {
    execute() {
      context.push(effect);
      fn();
      context.pop();
    },
  };

  effect.execute();
}

export function createMemo(fn) {
  const [signal, setSignal] = createSignal();

  createEffect(() => {
    const value = fn();

    if (value !== signal()) setSignal(fn());
  });

  return signal;
}
