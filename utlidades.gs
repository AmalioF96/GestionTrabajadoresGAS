
function buscaCalendario(dni) {
    //Esta función busca en la hoja del trabajador su calendario según el dni, para esto
    //es necesario que esté el ID del calendario guardado en la hoja
    
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Datos de trabajador');
    var data = ss.getDataRange().getValues();
    var calId = "";
    var dniTrabajador;
    var i = 1;
    while (i < data.length & calId === "") {
        //Tarea
        dniTrabajador = data[i][0];
        if (dniTrabajador === dni) {
            calId = data[i][5];
        }
        i++;
    }
    return calId;
}

function calculaDias(dias) {
//Esta función recibe una cadena con los días de la semana (L M X J V) que el trabajador
//debe presentarse a realizar una tarea
//devuelve un array con los días en los que se va a crear el evento recursivo.
    var aux = dias.split(',');
    var days = [];
    for (var i = 0; i < aux.length; i++) {
        if (aux[i] === 'L') {
            days.push(CalendarApp.Weekday.MONDAY);
        } else if (aux[i] === 'M') {
            days.push(CalendarApp.Weekday.TUESDAY);
        } else if (aux[i] === 'X') {
            days.push(CalendarApp.Weekday.WEDNESDAY);
        } else if (aux[i] === 'J') {
            days.push(CalendarApp.Weekday.THURSDAY);
        } else if (aux[i] === 'V') {
            days.push(CalendarApp.Weekday.FRIDAY);
        }

    }
    return days;
}
