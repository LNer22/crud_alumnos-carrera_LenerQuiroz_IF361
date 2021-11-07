$(document).ready(function () {
    const myDatePicker = MCDatepicker.create({
        el: '#alumnoFechaNacimiento',
        dateFormat: 'YYYY-MM-DD',
        bodyType: 'modal',
    })
    let optionCarreras = `<option selected disabled value="">Seleccione una opción..</option>`
    if(carreras){
        carreras.forEach(element => {
            if (accion === 'editar') {
                optionCarreras += `<option ${element.carreraNombre == alumno[0].carreraNombre ? 'selected' : null}  value="${element.carreraId}">${element.carreraNombre}</option>`
            } else if (accion === 'nuevo') {
                optionCarreras += `<option 'selected' value="${element.carreraId}">${element.carreraNombre}</option>`
            }
        })
        $("#carreraId").html(optionCarreras)
    }
    if(accion === 'editar'){
        const splitAt = index => x => [x.slice(0, index), x.slice(index)]
        let fecha = alumno[0].alumnoFechaNacimiento.slice(0,10)
        $("#alumnoId").val(alumno[0].alumnoId)
        $("#alumnoNombre").val(alumno[0].alumnoNombre)
        $("#alumnoTelefono").val(alumno[0].alumnoTelefono)
        $("#alumnoCorreo").val(alumno[0].alumnoCorreo)
        $("#alumnoSexo").val(alumno[0].alumnoSexo);
        $("#alumnoFechaNacimiento").val(fecha)
    }
})
