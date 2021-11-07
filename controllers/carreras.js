import cnn from "../database/connection.js"

export const listarCarreras = async (req, res) => {
    cnn.query(`SELECT * FROM carrera` , (err, result) => {
        if (err) {
            console.log("Ocurrio un error", err);
            res.render('carrera',{accion: "error",err:err,data:"",carrera:""})
            return
        }
        res.render('carreras', { data: result })
    })
}

export const carrera = async (req, res) => {
    const { accion, carreraId } = req.query
    if (accion == 'editar' && carreraId) {
        cnn.query(`select * from carrera where carreraId = '${carreraId}'`, (err, result) => {
            if (err) {
                console.log("Ocurrio un error", err);
                res.render('carrera',{accion: "error",err:err,data:""})
                return
            }else
                res.render('carrera', { accion: accion, data: result})
        })
    }else{
        res.render('carrera', { accion: accion, data:"",err:"",})
    }
}

export const guardarCarrera = async (req, res) => {
    const {
        carreraId,
        carreraNombre,
        carreraDuracion,
        carreraModulos,
        carreraFormato} = req.body
    if (!carreraId || !carreraNombre || !carreraDuracion || !carreraModulos || !carreraFormato) {
        res.render('carrera',{accion: "error",err:{sqlMessage:"Debe enviar los datos completos"},data:""})
        return
    }
    const data = {
        carreraId: carreraId,
        carreraNombre: carreraNombre,
        carreraDuracion: carreraDuracion,
        carreraModulos: carreraModulos,
        carreraFormato: carreraFormato,
        
    }
    cnn.query("INSERT INTO carrera SET ?", [data], async (err, result) => {
        if (err) {
            console.log(err)
            res.render('carrera',{accion: "error",err:err,data:""})
            return
        }
        res.redirect("/carreras")

    })

}

export const eliminarCarrera = async (req, res) => {
    const { carreraId } = req.body
    console.log(carreraId)
    if (!carreraId) {
        res.render('carrera',{accion: "error",err:{sqlMessage:"Debe enviar los datos completos"},data:""})
        return
    }
    cnn.query("DELETE FROM carrera WHERE carreraId=?", [carreraId], async (err, result) => {
        if (err) {
            console.log(err)
            res.render('carrera',{accion: "error",err:err,data:""})
            return
        }
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.json({ type: 'success' })

    })
}

export const editarCarrera = async (req, res) => {
    const {
        carreraId,
        carreraNombre,
        carreraDuracion,
        carreraModulos,
        carreraFormato} = req.body
    if (!carreraId || !carreraNombre || !carreraDuracion || !carreraModulos || !carreraFormato) {
        res.render('carrera',{accion: "error",err:{sqlMessage:"Debe enviar los datos completos"},data:""})
        return
    }
    cnn.query(`UPDATE carrera SET carreraNombre='${carreraNombre}', carreraDuracion='${carreraDuracion}', carreraModulos='${carreraModulos}', carreraFormato='${carreraFormato}' WHERE carreraId='${carreraId}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.render('carrera',{accion: "error",err:err,data:""})
            return
        }
        res.redirect("/carreras")

    })
}