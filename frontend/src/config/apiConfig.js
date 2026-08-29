export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://gaurav-portfolio-api.onrender.com'
    : 'http://localhost:5000');

