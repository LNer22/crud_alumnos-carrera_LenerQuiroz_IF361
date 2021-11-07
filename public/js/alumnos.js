window.onload = function () {
    function calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }
    let tr = ''
    data.forEach(element => {
        let fecha = element.alumnoFechaNacimiento.split('T')
        tr += `
            <tr id="fila-${element.alumnoId}">
                <th scope="row"> ${element.alumnoId}</th>
                <td> ${element.alumnoNombre}</td>
                <td> ${element.alumnoTelefono}</td>
                <td> ${element.alumnoCorreo}</td>
                <td> ${element.alumnoSexo == 'm' ? 'Maculino' : 'Femenino'}</td>
                <td> ${calcularEdad(fecha[0])}</td>
                <td> ${element.carreraNombre}</td>
                <td>
                    <a href="/alumno/?accion=editar&alumnoId=${element.alumnoId}" class="btn btn-outline-warning btn-sm"><i class="fas fa-edit"></i></a>
                    <a href="javascript:eliminarAlumno('${element.alumnoId}')" class="btn btn-outline-danger btn-sm"><i class="fas fa-eraser"></i></a>
                </td>
            </tr>
        `
    })
    document.getElementById("data-alumnos").innerHTML = tr
};
function eliminarAlumno(alumnoId){
    $.ajax({
        url : '/',
        method : 'DELETE',
        async:false,
        cache: false,
        data : {alumnoId :alumnoId}
    })
    .done((respuesta) => {
    if (respuesta.type == 'success') {
        $("#fila-"+alumnoId).fadeOut("normal", function() {
            $("#fila-"+alumnoId).remove()
        })
    }
});
}