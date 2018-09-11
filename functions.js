$(function () {
  var operation = "C"; 
  var selected_index = -1; // Indice de el elemento seleccionado en la lista
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar los datos almacenados
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null) // Si no hay datos, inicializar un array vacio
      tblPersons = [];

  function Create() {
    //Obtener los valores de la forma HTML y transformalos en String.
    var person = JSON.stringify({
      Nombre: $("#txtNombre").val(),
      Tipo: $("#txtTipo").val(),
      Valor: $("#txtValor").val(),
      
    }); 
    //Añadir el objeto a la tabla
    tblPersons.push(person);
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));  
    return true;
  }

   function Delete() {
    //Eliminar el elemento seleccionado en la tabla
    tblPersons.splice(selected_index, 1); 
    //Actualizar los datos del Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Nombre Movimiento</th>" +
            "<th>Tipo Movimiento</th>" +
            "<th>Valor Movimiento</th>" +            
            "<th>Acciones</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregar la tabla a la estructura HTML
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Nombre + "</td>" +
                "<td>" + per.Tipo + "</td>" +
                "<td>" + per.Valor + "</td>" +
                                  
                "<td><img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();    
  });
  
  List();

  $(".btnDelete").bind("click", function () {
    //Obtener el identificador del item a ser eliminado
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); //Eliminar el item
    List(); //Volver a listar los items en la tabla
  });
});

