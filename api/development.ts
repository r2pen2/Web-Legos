export function setHostname(hostname: string) {
  localStorage.setItem("wl-dev-hostname", "https://" + hostname);
}

export function getHostname() {
  return localStorage.getItem("wl-dev-hostname") ? localStorage.getItem("wl-dev-hostname") : "";
}