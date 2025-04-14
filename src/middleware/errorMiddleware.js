// Middleware para manejar los errores
const errorHandler = (err, req, res, next) => {
    // Loguear el error en consola (opcional, dependiendo del entorno)
    console.error(err.stack);

    // Definir el status code y el mensaje de error
    const statusCode = res.statusCode ? res.statusCode : 500; // Si no se ha definido un status code, usar 500 (error interno del servidor)
    res.status(statusCode);

    // Enviar respuesta JSON con el error
    res.json({
        message: err.message, // El mensaje de error
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Solo mostrar el stack trace en desarrollo
    });
};

// Exportar el middleware
module.exports = { errorHandler };
