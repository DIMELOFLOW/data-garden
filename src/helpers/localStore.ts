export function clearLocalStorage(): void {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.clear();
    }
}