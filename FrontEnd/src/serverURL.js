// src/serverURL.js
const serverURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com'  // Replace with your production URL
  : 'https://localhost:3000';          // HTTPS for local development

export default serverURL;