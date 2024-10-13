
// Shuffles array in place (make a copy first if you need it to be immutable)
// https://stackoverflow.com/a/12646864
export function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
