$(document).ready(function () {
    if(accion === 'editar'){
        $("#nombreCarrera").text(carrera[0].carreraNombre)
        $("#carreraId").val(carrera[0].carreraId)
        $("#carreraNombre").val(carrera[0].carreraNombre)
        $("#carreraDuracion").val(carrera[0].carreraDuracion)
        $("#carreraModulos").val(carrera[0].carreraModulos)
        $("#carreraFormato").val(carrera[0].carreraFormato)
    }
})
