const express = require('express');
const router = express.Router();
const Tarjeta = require('../models/Tarjeta');// Asegúrate de que la ruta sea correcta
const Transaccion = require('../models/Transaccion');  // Modelo de transacción

// 📌 Crear una nueva tarjeta
router.post('/', async (req, res) => {
    try {
        const nuevaTarjeta = new Tarjeta(req.body);
        await nuevaTarjeta.save();
        res.status(201).json(nuevaTarjeta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Obtener todas las tarjetas existentes
router.get('/', async (req, res) => {
    try {
        const tarjetas = await Tarjeta.find();
        res.json(tarjetas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener una tarjeta por el ID
router.get('/:id', async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findById(req.params.id);
        if (!tarjeta) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }
        res.json(tarjeta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// 📌 Retirar dinero de la tarjeta
router.put('/retirar/:id', async (req, res) => {
    try {
        const { monto_Retirado } = req.body;

        // Validar que el monto sea positivo
        if (!monto_Retirado || monto_Retirado <= 0) {
            return res.status(400).json({ error: 'El monto a retirar debe ser un número positivo' });
        }

        // Buscar la tarjeta por su ID
        const tarjeta = await Tarjeta.findById(req.params.id);

        if (!tarjeta) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }

        // Validar si hay saldo suficiente
        if (tarjeta.BalanceActual < monto_Retirado) {
            return res.status(400).json({ error: 'Saldo insuficiente' });
        }

        // Guardar los valores actuales antes del retiro
        const balanceInicial = tarjeta.BalanceActual;

        // Realizar el retiro, descontar el monto
        tarjeta.BalanceActual -= monto_Retirado;
        await tarjeta.save();

        // Crear una nueva transacción
        const nuevaTransaccion = new Transaccion({
            idTarjeta: tarjeta._id,
            BalanceInicial: balanceInicial,  // Balance antes del retiro
            BalanceActual: tarjeta.BalanceActual,  // Balance después del retiro
            MontoRetirado: monto_Retirado,  // Monto retirado
            tipo: 'retiro',  // Tipo de transacción
        });

        await nuevaTransaccion.save();

        // Responder con el mensaje y el saldo restante
        res.json({
            message: 'Retiro realizado con éxito',
            saldoRestante: tarjeta.BalanceActual,
            transaccion: nuevaTransaccion,  // Incluir la transacción en la respuesta
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Depositar dinero en la tarjeta
router.put('/depositar/:id', async (req, res) => {
    try {
        const { monto_Depositado } = req.body;

        // Validar que el monto sea positivo
        if (!monto_Depositado || monto_Depositado <= 0) {
            return res.status(400).json({ error: 'El monto a depositar debe ser un número positivo' });
        }

        // Buscar la tarjeta por su ID
        const tarjeta = await Tarjeta.findById(req.params.id);

        if (!tarjeta) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }

        // Guardar los valores actuales antes del retiro
        const balanceInicial = tarjeta.BalanceActual;

        // Realizar el deposito, sumar el monto
        tarjeta.BalanceActual += monto_Depositado;
        await tarjeta.save();

        // Crear una nueva transacción
        const nuevaTransaccion = new Transaccion({
            idTarjeta: tarjeta._id,
            BalanceInicial: balanceInicial,  // Balance antes del retiro
            BalanceActual: tarjeta.BalanceActual,  // Balance después del retiro
            MontoRetirado: 0,  // Monto retirado (0 en caso de depósito)
            MontoDepositado: monto_Depositado,  // Monto depositado
            tipo: 'deposito',  // Tipo de transacción
        });

        await nuevaTransaccion.save();

        // Responder con el mensaje y el saldo restante
        res.json({
            message: 'Deposito realizado con éxito',
            saldoRestante: tarjeta.BalanceActual,
            transaccion: nuevaTransaccion,  // Incluir la transacción en la respuesta
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Actualizar tarjeta
router.put('/:id', async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarjeta) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }
        res.json(tarjeta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Eliminar una tarjeta
router.delete('/:id', async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findByIdAndDelete(req.params.id);
        if (!tarjeta) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }
        res.json({ message: 'Tarjeta eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;