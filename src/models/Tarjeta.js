const mongoose = require("mongoose");

const tarjetaSchema = new mongoose.Schema({
    idTarjeta: Number,
    idCuenta: Number,
    Pin: Number,
    BalanceInicial: Number,
    BalanceActual: Number,
    Estado: Boolean,
});

const Tarjeta = mongoose.model("Tarjeta", tarjetaSchema);
module.exports = Tarjeta;
