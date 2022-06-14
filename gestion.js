//1. conexion SQL
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "holahola",
    database: "cursos",
    port: 5432,
});

//2.funciones CRUD
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

