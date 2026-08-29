export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://gaurav-dataanalyst-portfolio.onrender.com'
    : 'http://localhost:5000');

