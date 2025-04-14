const app = require('./app');  // Importa la configuración de la app desde app.js

const PORT = process.env.PORT || 3000;  // Define el puerto (puede ser 3000 o el especificado en las variables de entorno)

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});