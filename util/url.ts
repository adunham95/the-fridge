export function generateURLOrigin() {
  if (window === undefined) {
    return '';
  } else {
    return window.location.origin;
  }
}
