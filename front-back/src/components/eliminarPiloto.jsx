const pilotos = require("../models/pilotos"); // Ajusta según tu estructura

const eliminarPiloto = async (req, res) => {
    try {
        const { nombre } = req.params;

        const eliminado = await pilotos.findOneAndDelete({ nombre });

        if (!eliminado) {
            return res.status(404).json({ mensaje: "Piloto no encontrado" });
        }

        res.status(200).json({ mensaje: "Piloto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = eliminarPiloto;
