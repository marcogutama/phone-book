// Obtener el protocolo y host actual desde la URL del navegador
const getApiUrl = () => {
    // Obtiene el protocolo (http: o https:)
    const protocol = window.location.protocol;
    
    // Obtiene el hostname (ejemplo: 10.17.17.53)
    const hostname = window.location.hostname;
    
    // Construye la URL de la API usando el mismo protocolo y hostname, pero con puerto 5000
    return `${protocol}//${hostname}:5000`;
  };
  
  // Usar variable de entorno solo como fallback si estamos en desarrollo
  export const baseUrl = getApiUrl();