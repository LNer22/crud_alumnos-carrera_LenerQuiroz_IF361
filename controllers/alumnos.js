import cnn from "../database/connection.js"

export const listarAlumnos = async (req, res) => {
    cnn.query(`
    select 
	    alumnoId, 
        alumnoNombre, 
        alumnoTelefono, 
        alumnoCorreo, 
        alumnoSexo, 
        alumnoFechaNacimiento,
        c.carreraNombre 
    from alumno a 
    inner join carrera c ON c.carreraId = a.carreraId` , (err, result) => {
        if (err) {
            console.log("Ocurrio un error", err);
            res.render('alumno',{accion: "error",err:err,carreras:"",alumno:""})
            return
        }
        res.render('alumnos', { data: result })
    })
}

export const alumno = async (req, res) => {
    const { accion, alumnoId } = req.query
    let alumno = ''
    if (accion == 'editar' && alumnoId) {
        cnn.query(`
            select 
                alumnoId, 
                alumnoNombre, 
                alumnoTelefono, 
                alumnoCorreo, 
                alumnoSexo, 
                alumnoFechaNacimiento,
                c.carreraId,
                c.carreraNombre
            from alumno a 
            inner join carrera c ON c.carreraId = a.carreraId
            where alumnoId = ?`, [alumnoId], (err, result) => {
            if (err) {
                res.render('alumno',{accion: "error",err:err,carreras:"",alumno:""})
                return
            }
            alumno = result
        })
    }
    cnn.query(`select carreraId,carreraNombre from carrera`, (err, result) => {
        if (err) {
            console.log("Ocurrio un error", err);
            res.render('alumno',{accion: "error",err:err,carreras:"",alumno:""})
            return
        }
        res.render('alumno', { accion: accion, carreras: result,alumno: alumno,err:""})
    })

}

export const guardarAlumno = async (req, res) => {
    const {
        alumnoId,
        alumnoNombre,
        alumnoTelefono,
        alumnoCorreo,
        alumnoSexo,
        alumnoFechaNacimiento,
        carreraId } = req.body
    if (!alumnoId || !alumnoNombre || !alumnoTelefono || !alumnoFechaNacimiento || !alumnoSexo || !carreraId) {
        res.render('alumno',{accion: "error",err:{sqlMessage:"Debe enviar los datos completos"},carreras:"",alumno:""})
        return
    }
    const data = {
        alumnoId: alumnoId,
        alumnoNombre: alumnoNombre,
        alumnoTelefono: alumnoTelefono,
        alumnoCorreo: alumnoCorreo,
        alumnoSexo: alumnoSexo,
        alumnoFechaNacimiento: alumnoFechaNacimiento,
        carreraId: carreraId
    }
    cnn.query("INSERT INTO alumno SET ?", [data], async (err, result) => {
        if (err) {
            console.log(err)
            res.render('alumno',{accion: "error",err:err,carreras:"",alumno:""})
            return
        }
        res.redirect("/")

    })

}

export const eliminarAlumno = async (req, res) => {
    const { alumnoId } = req.body
    console.log(alumnoId)
    if (!alumnoId) {
        res.render('alumno',{accion: "error",err:{sqlMessage:"Error al detectar el identificador de alumno"},carreras:"",alumno:""})
        return
    }
    cnn.query("DELETE FROM alumno WHERE alumnoId=?", [alumnoId], async (err, result) => {
        if (err) {
            console.log(err)
            res.render('alumno',{accion: "error",err:err,carreras:"",alumno:""})
            return
        }
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.json({ type: 'success' })

    })
}

export const editarAlumno = async (req, res) => {
    const {
        alumnoId,
        alumnoNombre,
        alumnoTelefono,
        alumnoCorreo,
        alumnoSexo,
        alumnoFechaNacimiento,
        carreraId } = req.body
    if (!alumnoId || !alumnoNombre || !alumnoTelefono || !alumnoFechaNacimiento || !alumnoSexo || !carreraId || !alumnoCorreo) {
        res.render('alumno',{accion: "error",err:{sqlMessage:"Debe enviar los datos completos"},carreras:"",alumno:""})
        return
    }
    cnn.query(`UPDATE alumno SET alumnoNombre='${alumnoNombre}', alumnoTelefono='${alumnoTelefono}', alumnoCorreo='${alumnoCorreo}', alumnoSexo='${alumnoSexo}', alumnoFechaNacimiento='${alumnoFechaNacimiento}', carreraId='${carreraId}' WHERE alumnoId='${alumnoId}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.render('alumno',{accion: "error",err:err,carreras:"",alumno:""})
            return
        }
        console.log(alumnoId,
            alumnoNombre,
            alumnoTelefono,
            alumnoCorreo,
            alumnoSexo,
            alumnoFechaNacimiento,
            carreraId)
        res.redirect("/")

    })
}