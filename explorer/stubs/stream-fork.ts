// This stub replaces stream-fork in the browser bundle
export default function fork() {
  throw new Error('stream-fork is not available in the browser.');
}
