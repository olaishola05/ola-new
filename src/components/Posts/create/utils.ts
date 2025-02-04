export const clearStorage = () => {
  window.localStorage.removeItem('content')
  window.localStorage.removeItem('postTitle')
  window.localStorage.removeItem('img')
}