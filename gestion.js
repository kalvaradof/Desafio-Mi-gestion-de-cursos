const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "holahola",
    database: "cursos",
    port: 5432,
});

async function nuevoCurso(curso) {
    const valores = Object.values(curso)
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES($1, $2, $3, $4) RETURNING *;`, valores
        );
        return result.rows;
    } catch (e) {
        console.log(e)
        return e;
    }
}

async function getCursos() {
    try {
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;
    } catch (e) {
        return e;
    }
}

async function editarCurso(id, curso) {
    const valores = Object.values(curso);
    valores.push(id)
    try {
        const res = await pool.query(
            "UPDATE cursos SET nombre=$1, nivel=$2, fecha=$3,duracion=$4 WHERE id=$5 RETURNING *", valores
        );
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}

async function eliminarCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id ='${id}'`);
        return result.rowCount;
    } catch (e) {
        return e;
    }
}

// Paso 3: Exportar un objeto con la función asíncrona 
module.exports = {
    nuevoCurso,
    getCursos,
    editarCurso,
    eliminarCurso
};


//1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de
//un nuevo curso y los ingrese a la tabla cursos.
//2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la tabla cursos.
//3. Crear una ruta PUT /curso que reciba un payload desde el cliente con los datos de un
//curso ya existente y actualice su registro en la tabla cursos.
//4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la
//ruta y elimine el registro relacionado en la tabla cursos.
