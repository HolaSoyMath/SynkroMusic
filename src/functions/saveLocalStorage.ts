export function saveLocalStorage(name: string, value: string) {
  return window.localStorage.setItem(name, value)
}
