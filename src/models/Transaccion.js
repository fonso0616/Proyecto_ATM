// models/Transaccion.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransaccionSchema = new Schema({
    idTarjeta: { type: mongoose.Schema.Types.ObjectId, ref: 'Tarjeta', required: true },
    BalanceInicial: { type: Number, required: true },  // Balance antes del retiro
    BalanceActual: { type: Number, required: true },   // Balance después del retiro
    MontoRetirado: { type: Number, required: true },   // Monto retirado
    tipo: { type: String, enum: ['retiro', 'deposito'], required: true },
    fecha: { type: Date, default: Date.now },
});

const Transaccion = mongoose.model('Transaccion', TransaccionSchema);
module.exports = Transaccion;
