
// this function is much more complicated, but I don't want to copy&paste
// a lot of code
function getQueryStringParameterByName(name) {
  const url = window.location.href;
  return url.indexOf(name) >= 0;
}

export default function getBaseUrl() {
  return getQueryStringParameterByName('useMockAPI') ? 'http://localhost:3001/' : '/';
}

