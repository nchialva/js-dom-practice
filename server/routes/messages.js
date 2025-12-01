const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST nuevo mensaje
router.post('/', async (req, res) => {
    console.log('Datos recibidos del formulario:', req.body); // <--- verificamos que llegan
    const { nombre, email, telefono, mensaje } = req.body;

    try {
        const newMessage = new Message({ nombre, email, telefono, mensaje });
        await newMessage.save();
        console.log('Mensaje guardado en MongoDB:', newMessage); // <--- confirmamos guardado
        res.status(201).json({ msg: 'Mensaje guardado correctamente' });
    } catch (err) {
        console.error('Error guardando mensaje:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET todos los mensajes
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


// POST test
router.post('/test', (req, res) => {
    console.log('Llegó algo al servidor:', req.body);
    res.json({ msg: 'Servidor recibe datos correctamente', datos: req.body });
});