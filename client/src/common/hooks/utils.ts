/**
 * Returns a promise that resolves when the document is ready.
 * @param creator
 * @returns
 */
export function documentReadyPromise<T>(creator: () => Promise<T>): Promise<T> {
  return new Promise((resolve): void => {
    if (document.readyState === 'complete') {
      resolve(creator())
    } else {
      window.addEventListener('load', () => resolve(creator()))
    }
  })
}
