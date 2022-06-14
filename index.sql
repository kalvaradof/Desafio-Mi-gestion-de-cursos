CREATE DATABASE cursos;
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50), 
    nivel SMALLINT, 
    fecha DATE, 
    duracion INT
);  