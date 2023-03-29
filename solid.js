export function createSignal(value) {
  const read = () => {
    console.log("read");
    return value;
  };

  const write = (newValue) => {
    console.log("write");
    value = newValue;
  };

  return [read, write];
}
