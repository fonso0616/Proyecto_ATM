const mongoose = require('mongoose');
const Tarjeta = require('../models/Tarjeta');  // Asegúrate de que la ruta sea correcta
const Transaccion = require('../models/Transaccion');  // Asegúrate de que la ruta sea correcta

mongoose.connect('mongodb://admin:password@localhost:27017/ATM_DB?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function realizarTransaccion(idTarjeta, montoRetirado, pin) {
    try {
        // Paso 1: Buscar la tarjeta por ID
        const tarjeta = await Tarjeta.findById(idTarjeta);
        
        if (!tarjeta) {
            console.log("Tarjeta no encontrada.");
            return;
        }

        // Paso 2: Validar el PIN (suponiendo que el PIN está almacenado)
        if (tarjeta.Pin !== pin) {
            console.log("PIN incorrecto.");
            return;
        }

        // Paso 3: Verificar si la tarjeta tiene suficiente saldo
        if (tarjeta.BalanceActual < montoRetirado) {
            console.log("Saldo insuficiente.");
            return;
        }

        // Paso 4: Actualizar el balance de la tarjeta
        tarjeta.BalanceActual -= montoRetirado;
        await tarjeta.save();
        console.log(`Transacción exitosa. Nuevo balance: ${tarjeta.BalanceActual}`);

        // Paso 5: Crear la transacción en la base de datos
        const nuevaTransaccion = new Transaccion({
            idTarjeta: tarjeta.idTarjeta,
            monto_retirado: montoRetirado,
            aprobacion: true,
            fecha: new Date(),
            intentos_fallidos: 0, // Puede ser un contador que incrementes si hay un fallo
            comentario: 'Retiro exitoso',
        });

        await nuevaTransaccion.save();
        console.log("Transacción registrada.");

    } catch (error) {
        console.error("Error al realizar la transacción:", error);
    }
}

// Ejemplo de uso
realizarTransaccion("67fd4b66a6100dd1f72394cf", 1000, 6223);  // Reemplaza con ID, monto y PIN válidos
