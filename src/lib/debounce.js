/**
 * Debounce
 * @see https://www.matthewgerstman.com/tech/throttle-and-debounce/
 * @param {Function} next
 * @param {number} ms
 * @return {Function}
 */
export default function debounce(next, ms) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            next(...args);
        }, ms);
    };
}