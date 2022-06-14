const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { nuevoCurso, getCursos, editarCurso, eliminarCurso } = require("./gestion");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
//1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de
//un nuevo curso y los ingrese a la tabla cursos.
app.post("/curso", async (req, res) => {
    const curso = req.body;
    const respuesta = await nuevoCurso(curso);
    // Paso 6: Devolver la respuesta al cliente
    res.send(respuesta);
});

//2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la tabla cursos.
app.get("/cursos", async (req, res) => {
    const respuesta = await getCursos();
    //Devolver al cliente la respuesta almacenada en la const respuesta
    res.send(respuesta);
});

//3. Crear una ruta PUT /curso que reciba un payload desde el cliente con los datos de un
//curso ya existente y actualice su registro en la tabla cursos.
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

//4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la
//ruta y elimine el registro relacionado en la tabla cursos.
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