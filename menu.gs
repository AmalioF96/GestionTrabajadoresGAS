function onOpen() {
    var ui = SpreadsheetApp.getUi();
    //Al abrir la hoja de calculo se ejecutará esta función y creara un nuevo elemento en la barra de menús llamado
    //Opciones avanzadas con el botón Gestionar Tarea que llama a la función menuTarea.
    ui.createMenu('Opciones avanzadas')
        .addItem('Gestionar Tarea', 'menuTarea')
        .addToUi();
}

function menuTarea() {
//Esta función recoge los datos de la hoja en la que se guardan las tareas de los trabajadores.
    //Selecionamos al hoja SHEET1 por su nombre
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('hoja de tareas');

    //Variables formulario
    var localizacion;
    var nombre;
    var dni;
    var initDate;
    var endDate;
    var horas;
    var dias;
    var descripcion;

    var data = ss.getDataRange().getValues();
    var calendario;
    for (var i = 1; i < data.length; i++) {

        if (data[i][8] != '1') {
            //localizacion de la tarea
            localizacion = data[i][0];
            
            //nombre del trabajador
            nombre = data[i][1];
            
            //dni del trabajador;
            dniSoc = data[i][2];
            
            //fecha y hora (DD/MM/aaaa hh:mm:ss) a la que empieza la tarea
            initDate = data[i][3];
            
            //fecha (DD/MM/aaaa) en la que termina la tarea
            endDate = data[i][4];
            
            //numero de horas que va a echar al día;
            horas = data[i][5];
            
            //dias de la semana que asistirá el trabajador;
            dias = data[i][6];
            
            //descripcion de la tarea del trabajador
            descripcion = data[i][7];

            //Buscamos el id del calendario del trabajador//
            calendario = buscaCalendario(dniSoc);

            //Creamos el evento recursivo en el calendario del trabajador y en un calendario global con todos los trabajadores
            creaEventoCalendarioTrabajador(nombreSoc, initDate, endDate, horas, dias, localizacion, descripcion, calendario);
            creaEventoCalendario(nombreSoc, initDate, endDate, horas, dias, localizacion, descripcion);


            //Marcamos la fila como leída para que la próxima vez que se ejecute la función no la revise 
            ss.getRange(i + 1, 9).setValue('1').setBackground('red');
        }
    }


}
