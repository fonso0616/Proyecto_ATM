const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transaccion');  // Asegúrate de que la ruta sea correcta

// 📌 Crear una nueva transacción 
router.post('/', async (req, res) => {
    try {
        const { aprobacion, monto_Retirado, fecha, intentos_fallidos, comentario } = req.body;

        // Validación de los datos de la transacción
        if (!monto_Retirado || monto_Retirado <= 0) {
            return res.status(400).json({ error: 'Monto_Retirado debe ser un número positivo' });
        }

        // Crea la nueva transacción
        const nuevaTransaccion = new Transaccion(req.body);
        await nuevaTransaccion.save();
        res.status(201).json(nuevaTransaccion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Obtener todas las transacciones existentes
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaccion.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener una transacción por el ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaccion.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Actualizar transacción



// 📌 Eliminar una transacción
router.delete('/:idTransaction', async (req, res) => {
    try {
        const transaction = await Transaccion.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }
        res.json({ message: 'Transacción eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;