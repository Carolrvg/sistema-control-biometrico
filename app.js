const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3002;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.post('/api/registros', (req, res) => {
    const nuevoRegistro = req.body;
    console.log("REQ ",nuevoRegistro)
    fs.readFile('registros.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        const registros = data.length > 0 ? JSON.parse(data) : [];
        registros.push(nuevoRegistro);

        fs.writeFile('registros.json', JSON.stringify(registros, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el registro');
            }
            res.status(200).send('Registro guardado');
        });
    });
});

app.get('/api/registros', (req, res) => {
    fs.readFile('registros.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }
        res.json(JSON.parse(data));
    });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en port:${port}`);
});
