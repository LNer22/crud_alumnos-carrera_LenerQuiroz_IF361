import express from 'express'
import { alumno, editarAlumno, eliminarAlumno, guardarAlumno, listarAlumnos } from '../controllers/alumnos.js'
import { carrera, editarCarrera, eliminarCarrera, guardarCarrera, listarCarreras } from '../controllers/carreras.js'
const router = express.Router()

//Rutas de los alumnos
router.get('/',listarAlumnos)
router.delete('/',eliminarAlumno)
router.get('/alumno',alumno)
router.post('/alumno',guardarAlumno)
router.post('/alumno/editar',editarAlumno)
//Rutas de las carreras
router.get('/carreras',listarCarreras)
router.get('/carrera',carrera)
router.post('/carrera',guardarCarrera)
router.delete('/carreras',eliminarCarrera)
router.post('/carrera/editar',editarCarrera)


export default router