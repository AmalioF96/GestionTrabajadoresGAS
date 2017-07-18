function creaEventoCalendarioTrabajador(titulo, fechaI, fechaF, horas, dias, localizacion, descripcion, calendario) {
    //Buscamos el calendario segun el id.
    var calendar = CalendarApp.getCalendarById(calendario);
    //Calculamos que días va a ir
    var days = calculaDias(dias);
    
    //Creamos una fecha igual que la fechaI pero sumando las horas que va a echar el trabajador
    var fechaHoraFin = new Date();
    var descripcionCorta = descripcion.substring(0,4).toUpperCase();
  
    fechaHoraFin.setUTCDate(fechaI.getUTCDate());
    fechaHoraFin.setMonth(fechaI.getMonth());
    fechaHoraFin.setYear(fechaI.getYear());
    fechaHoraFin.setHours(fechaI.getHours() + horas);
    fechaHoraFin.setMinutes(fechaI.getMinutes());
    
    //Creamos el evento recursivo
    var eventSeries = calendar.createEventSeries(titulo + ' - ' + descripcionCorta,
        fechaI,
        fechaHoraFin,
        CalendarApp.newRecurrence().addWeeklyRule()
        .onlyOnWeekdays(days)
        .until(fechaF), {
            location: localizacion,
            description: 'tarea de: ' + titulo + '\n' + descripcion,
            colorId: 1
        }
    );
}

function creaEventoCalendario(titulo, fechaI, fechaF, horas, dias, localizacion, descripcion) {

    //Llamamos a la función anterior pero con un calendario por defecto, de esta forma tenemos todos los eventos
    //registrados en un calendario
    var idCalServer = "codigo calendario de todos los trabajadores.calendar.google.com";
    creaEventoCalendarioTrabajador(titulo, fechaI, fechaF, horas, dias, localizacion, descripcion, idCalServer);
}
