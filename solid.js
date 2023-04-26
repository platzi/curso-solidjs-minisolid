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

export function createStore(value) {
  const subscriptions = new Set();

  /*
    const [todos, setTodos] = createStore([
      { text: "Learn Solid", done: false },
    ])

    createEffect(() => {
      console.log("todos", todos[0].done)
    })

    setTodos('0', 'done', true)
  */
  const read = new Proxy(value, {
    get(target, key) {
      const observer = context[context.length - 1];
      if (observer) subscriptions.add(observer);
      return target[key];
    },
  });

  const write = (...props) => {
    const [index, key, newValue] = props;
    value[index][key] = newValue;
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
