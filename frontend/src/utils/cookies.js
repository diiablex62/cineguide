/**
 * Utilitaires pour gérer les cookies sans dépendance externe
 */

// Définir un cookie
export function setCookie(name, value, days = 1) {
  console.log(`Définition du cookie: ${name}`);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict${
    window.location.protocol === "https:" ? "; Secure" : ""
  }`;
  document.cookie = cookie;
}

// Récupérer la valeur d'un cookie
export function getCookie(name) {
  const cookieString = decodeURIComponent(document.cookie);
  const cookies = cookieString.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

// Supprimer un cookie
export function removeCookie(name) {
  console.log(`Suppression du cookie: ${name}`);
  // Pour supprimer un cookie, on le définit avec une date d'expiration dans le passé
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict${
    window.location.protocol === "https:" ? "; Secure" : ""
  }`;
}
