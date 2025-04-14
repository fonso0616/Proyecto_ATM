const mongoose = require("mongoose");

mongoose.connect('mongodb://admin:password@localhost:27017/ATM_DB?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const Tarjeta = require("../models/Tarjeta"); // Asegúrate de que la ruta esté correcta

async function crearTarjeta() {
    try {
        const nuevaTarjeta = new Tarjeta({
            idTarjeta: 89566236,
            idCuenta: 59949446,
            Pin: 6223,
            BalanceInicial: 10000,
            BalanceActual: 10000,
            Estado: true,
        });

        await nuevaTarjeta.save();
        console.log("Tarjeta agregada!");
    } catch (error) {
        console.error("Error al crear la tarjeta:", error);
    }
}

crearTarjeta();
