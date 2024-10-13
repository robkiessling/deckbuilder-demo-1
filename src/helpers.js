
// Shuffles array in place (make a copy first if you need it to be immutable)
// https://stackoverflow.com/a/12646864
export function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


// @param defaultValue can be a primitive value (like an integer or string) or a function that returns the desired value.
// Do not pass an object as a default value; otherwise all the elements will be a reference to the same object. You
// should pass a function that returns a new object.
export function createArray(size, defaultValue = null) {
  let array = [];

  for (let i = 0; i < size; i++) {
    array.push(isFunction(defaultValue) ? defaultValue(i) : defaultValue);
  }

  return array;
}


export function isFunction(variable) {
  return typeof variable === 'function'
}