const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { nuevoCurso, getCursos, editarCurso, eliminarCurso } = require("./gestion");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/curso", async (req, res) => {
    const curso = req.body;
    const respuesta = await nuevoCurso(curso);
    // Paso 6: Devolver la respuesta al cliente
    res.send(respuesta);
});

app.get("/cursos", async (req, res) => {
    const respuesta = await getCursos();
    //Devolver al cliente la respuesta almacenada en la const respuesta
    res.send(respuesta);
});

app.put("/curso/:id", async (req, res) => {
    // Paso 2
    const { id } = req.params;
    // Paso 3
    const curso = req.body;
    // Paso 4
    const respuesta = await editarCurso(id, curso);
    // Paso 5
    res.send(respuesta);
});

app.delete("/curso/:id", async (req, res) => {
    // Paso 2
    const { id } = req.params;
    // Paso 3
    const respuesta = await eliminarCurso(id);
    // Paso 4
    respuesta > 0
        ? res.send(`El curso de id ${id} fue eliminado con éxito`)
        : res.send("No existe un curso registrado con ese id");
});

app.listen(3000, () => console.log("Terminal OK"));