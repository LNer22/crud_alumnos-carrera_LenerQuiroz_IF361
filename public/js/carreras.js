window.onload = function () {
    let tr = ''
    data.forEach(element => {
        tr += `
            <tr id="fila-${element.carreraId}">
                <th scope="row"> ${element.carreraId}</th>
                <td> ${element.carreraNombre}</td>
                <td> ${element.carreraDuracion + " Años"}</td>
                <td> ${element.carreraModulos  + " Módulos"}</td>
                <td> ${element.carreraFormato}</td>
                <td>
                    <a href="/carrera/?accion=editar&carreraId=${element.carreraId}" class="btn btn-outline-warning btn-sm"><i class="fas fa-edit"></i></a>
                    <a href="javascript:eliminarCarrera('${element.carreraId}')" class="btn btn-outline-danger btn-sm"><i class="fas fa-eraser"></i></a>
                </td>
            </tr>
        `
    })
    document.getElementById("data-carreras").innerHTML = tr
};
function eliminarCarrera(carreraId){
    $.ajax({
        url : '/carreras',
        method : 'DELETE',
        async:false,
        cache: false,
        data : {carreraId :carreraId}
    })
    .done((respuesta) => {
        if (respuesta.type == 'success') {
            $("#fila-"+carreraId).fadeOut("normal", function() {
                $("#fila-"+carreraId).remove()
            })
        }
    });
}