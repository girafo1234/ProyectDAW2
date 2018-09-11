function newLogin(){
  var email= document.getElementById("login-email").value;
  var pass= SHA1(document.getElementById("login-password").value);
  var respuesta;
  var nombre;
  var imagen;
  $.ajax({
    url: 'http://localhost:45/Usuarios',
    type: 'GET',
    dataType: 'JSON',
    success: function (json) {
      
     json.forEach(n => {
       
        if(pass == n.contraseña && email == n.email){
            nombre = n.nombre;
            imagen = n.imagen;
            id= n.id;
            respuesta = true;
            
        }
     });
    },
    error: function (jqXHR, status, error) {
      reject(Error(error));
    },
  });

  setTimeout(function(){
    if(respuesta){
      quitarLoginRegister();
      logueado(nombre,imagen)
      
    }else{
      loginBad();
    }
  },200)
}
//function autologin(){
  //var login=localStorage.getItem("resultado");
  //login.split(":");
 //$("login-email").val(login[1]);
 //$("login-password").val(login[2]);
 //$("login-entrar").submit();

//}





//function login() {
  //if ($("#login-error").length) {
    // Si existe       
    //$("#login-error").remove();
    //$(".login__body").css("grid-template-rows", "repeat(2, 1fr) 10% 1fr");
    //$(".login__body").css("grid-template-areas", "'email' 'password' 'rembember' 'entrar'");
    //$(".login__body__remember").css("margin-bottom", "13px");
  //}

  //if (loginVerify()) {
    //loginVerifyServer($("#login-email").val(), SHA1($("#login-password").val())).then(response => {
      //if (response == "TRUE") {
        //quitarLoginRegister();
      //} else {
        //loginBad();
      //}
    //});

  //} else {
    //loginBad();
  //}
//}

function quitarLoginRegister() {
  $("#miModal").remove();
  $("#modal-backdrop").remove();
  $("body").removeClass("modal-open");
  $("#navbar").removeClass("navbar-modal-open");
}


function logueado(nombre, imagen) {
  while ($("#navbar-list").children().length != 1) {
    $("#navbar-list").children()[1].remove();
  }


  img = imagen.split(".")[0] + "-35x30." + imagen.split(".")[1];

  $("<li class='navbar-list__item navbar-list__item--perfil navbar-list__item--highlighted' id='perfil'>" +
    "<button class='nav-link nav-link--movement boton-invisible'>" +
    "<span>" + nombre + "</span>" + "  <img class='navbar-list__item__imagen' src='images/usuarios/" + img + "'></img></button>" +
    "</li>").appendTo($("#navbar-list"));
  $('.navbar-list__item').css("padding-bottom", "20px");
  $(".navbar-list__item").css("height", "50px");

  $("#perfil").on("click", mostrarPerfil);
}

function loginBad() {
  $(".login__body").css("grid-template-rows", "repeat(2,1fr) repeat(2, 10%) 1fr");
  $(".login__body").css("grid-template-areas", "'email' 'password' 'remember' 'error' 'entrar'");
  $(".login__body__remember").css("margin-bottom", "20px");
  $('<span class="login__body__error" id="login-error">Usuario o contraseña incorrectos</span>').insertBefore("#login-entrar");
}

//function loginVerify() {
  //estado = true;
  //var email = $("#login-email").val();
  //if (email.length == 0 || email.indexOf("@") == -1 || $("#login-password").val().length == 0) {
    //estado = false;
  //}
  //return estado;
//}

//async function loginVerifyServer(email, password) {
  //if ($("#remember").length && $("#remember").prop("checked")) {
    //checked = "true";
  //} else {
    //checked = "false";
  //}

  //return new Promise(function (resolve, reject) { //RESOLVER LA PROMISE o RECHAZAR
    //$.ajax({
      //url: 'php/login.php',
      //data: {
        //email: email,
        //password: password,
        //checked: checked
      //},
      //type: 'GET',
      //dataType: 'JSON',
      //success: function (json) {
        //if (json["igual"] == "TRUE") {
          //logueado(json["nombre"], json["imagen"]);
          //resolve("TRUE");
        //} else {
          //resolve("FALSE");
        //}
      //},
      //error: function (jqXHR, status, error) {
        //reject(Error("FALSE " + error));
      //},
    //});
  //});
  //Termina return
//}

function mostrarPerfil() {


  var texto = '<div id="modal-propio-trasera" class="modal-propio modal-propio__capa-trasera">' +
    '</div>' +
    '<div id="modal-propio" class="modal-propio modal-propio__conteiner">' +
    '<div class="modal-propio__lateral modal-propio__lateral--izquierdo">' +

    '<div class="menu-lateral">' +
    '<div class="menu-lateral__body">' +
    '<ul id="menu-lateral-perfil" class="menu-lateral__body__lista">' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--title">Mi cuenta</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-address-card-o" aria-hidden="true"></i> Datos personales' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-heart-o" aria-hidden="true"></i> Productos deseados' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-list" aria-hidden="true"></i> Mis productos' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-comments-o" aria-hidden="true"></i> Chats' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-handshake-o" aria-hidden="true"></i> Truekes realizados' +
    '</li>' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-upload" aria-hidden="true"></i> Subir producto' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--logout">' +
    '<i class="fa fa-sign-out" aria-hidden="true"></i> Login out' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal menu-lateral__body__lista__item--salir">' +
    '<i class="fa fa-arrow-left" aria-hidden="true"></i> Volver' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '<div id="modal-propio-lateral-derecho" class="modal-propio__lateral modal-propio__lateral--derecho">' +
    '</div>' +
    '</div>';

  $("body").append(texto);
  $("body").css("overflow", "hidden");
  perfilExtendido();
  $("#menu-lateral-perfil").children()[1].addEventListener("click", perfilExtendido);
  $("#menu-lateral-perfil").children()[2].addEventListener("click", crearCarrito);
  $("#menu-lateral-perfil").children()[3].addEventListener("click", misProductos);
  $("#menu-lateral-perfil").children()[4].addEventListener("click", function () {
    chats(null);
  });
  $("#menu-lateral-perfil").children()[5].addEventListener("click", tradesRealizados);
  $("#menu-lateral-perfil").children()[6].addEventListener("click", subirProducto);
  $("#menu-lateral-perfil").children()[7].addEventListener("click", desloguearse);
  $("#menu-lateral-perfil").children()[8].addEventListener("click", salirPerfil);
  $("#menu-lateral-perfil").children().on("click", animaciones);

};

function crearCarrito() {
  if (!$("#perfil-contenedor-deseos").length) {
    if ($("#modal-propio-lateral-derecho").children().length != 0) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "php/carrito.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        var texto = '<div id="perfil-contenedor-deseos" class="contenedor-deseos">' +
          '</div>';
        $("#modal-propio-lateral-derecho").addClass("modal-propio__lateral--derecho__animation");

        $("#modal-propio-lateral-derecho").append(texto);
        var texto = '<div class="container">' +
          '<table id="cart" class="table table-hover table-condensed">' +
          '<thead>' +
          '<tr class="carrito-header">' +
          '<th style="width:50%;border-top: 0px;border-bottom: 0px">Producto</th>' +
          '<th style="width:10%;border-top: 0px; border-bottom: 0px;">Eliminar</th>' +
          '<th style="width:8%;border-top: 0px;border-bottom: 0px">Contacto</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody id="cuerpoCarritoProductosDeseados">' +
          '</tbody>' +
          '</table>' +
          '</div>';
        $("#perfil-contenedor-deseos").append(texto);
        if (json.length == 0) {
          var texto =
            '<tr>' +
            '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no desea ningún producto</h3></td>' +
            '</tr>';

          $("#cuerpoCarritoProductosDeseados").append(texto);
        } else {
          $("#perfil-contenedor-deseos").on("click", "div table tbody tr td a.empezar-trueke", crearTrade);
          $("#perfil-contenedor-deseos").on("click", "div table tbody tr td a.trueke-iniciado", event => {
            var idTrade;
            if (event.target.classList.contains("trueke-iniciado")) {
              idTrade = event.target.getAttribute("value");
            } else {
              idTrade = event.target.parentElement.getAttribute("value");
            }
            irAlTrade(idTrade);

          });
          $("#cuerpoCarritoProductosDeseados").on('click', "tr td.tabla button.boton-eliminar", eliminarProducto);
          $("#cuerpoCarritoProductosDeseados").on("click", "tr td div div h4.volver-carrito", event => {
            key = "modal-carrito";
            productosDetallados(event)
            salirPerfil()
          });


          json.forEach(n => {
            mostrarCarrito(n);
          });
        }


      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la peticion de deseados");
      }
    });
  }
}

function crearTrade() {
  $.ajax({
    url: "php/iniciarTrade.php",
    type: 'GET',
    data: {
      idProducto: this.parentElement.parentElement.id
    },
    dataType: 'text',
    success: function (idTrade) {
      irAlTrade(idTrade);
    },
    error: function (jqXHR, status, error) {

    }
  });
}

function mostrarCarrito(producto) {

  var texto =
    '<tr id=' + producto.idProducto + '>' +
    '<td data-th="Product">' +
    '<div class="row">' +
    '<div class="col-sm-2 hidden-xs"><img src="' + producto.imagen + '" alt="..." class="img-responsive img-carro volver-carrito"/></div>' +
    '<div class="col-sm-8 td-texto--central">' +
    '<h4 class="nomargin volver-carrito">' + producto.nombre + '</h4>' +
    '<p>' + producto.descripcion + '</p>' +
    '</div>' +
    '</div>' +
    '</td>' +
    '<td  class="tabla" data-th="Quantity">' +
    '<button id=' + producto.idProducto + ' class="btn btn-info btn-sm boton-eliminar">Eliminar</button>' +
    '</td>';

  if (producto.idTrade === null) {
    texto += '<td><a href="#" class="btn btn-block empezar-trueke">Iniciar Trueke <i class="fa fa-commenting" aria-hidden="true"></i></a></td>' +
      '</tr>'
  } else {
    texto += '<td><a href="#" value="' + producto.idTrade + '" class="btn btn-success btn-block trueke-iniciado">Ir al Trueke <i class="fa fa-commenting" aria-hidden="true"></i></a></td>' +
      '</tr>'
  }

  $("#cuerpoCarritoProductosDeseados").append(texto);

}

function tradesRealizados() {
  if (!$("#perfil-contenedor-trades").length) {
    if ($("#modal-propio-lateral-derecho").children().length != 0) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "http://localhost:45/historial/"+id,
      contentType: "application/json; charset=utf-8",
      async: true,
      type: 'GET',
      dataType: 'json',
      success: function (json) {
        var texto = '<div id="perfil-contenedor-trades" class="contenedor-deseos">' +
          '</div>';
        $("#modal-propio-lateral-derecho").addClass("modal-propio__lateral--derecho__animation");
        $("#modal-propio-lateral-derecho").append(texto);
        var texto = '<div class="container contenedor-historial">' +
        '<h1 class = "titulo">Historial de Truekes</h1>'+
          '<div id="cart">' +
          '<div id="cuerpoCarritoMisProductos">' +
          '</div>' +
          '</div>' +
          '</div>';
        $("#perfil-contenedor-trades").append(texto);
        if (json.length == 0) {
          var texto =
            '<tr>' +
            '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no tiene productos</h3></td>' +
            '</tr>';

          $("#cuerpoCarritoMisProductos").append(texto);
        }

        json.forEach(n => {
          var texto =
            '<div class="panel-contenedor-historial table-hover">' +
            '<h5 class="titulo-historial"><strong>'+n[6]+' / '+n[7]+'</strong></h5>'+
            '<table class="tabla-trueke">'+
            '<tr class="tabla-trueke fila">'+
            '<td style="width:10%;"><img src="' + n[3] + '" alt="..." class="img-responsive imagen-pequeña"/>'+
            '<td style="width:50%;"><b class="titulo-historial">Nombre del producto</b>'+
            '<h3>' + n[2] + '</h3></td>' +
            '<td style="width:30%;"><b class="titulo-historial">Nombre de usuario</b>'+
            '<h3>' + n[0] + '</h3></td>' +
            '</tr>'+
            '<tr class="tabla-trueke fila">'+
            '<td><img src="' + n[5] + '" alt="..." class="img-responsive imagen-pequeña"/>'+
            '<td><b class="titulo-historial">Nombre del producto</b>'+
            '<h3>' + n[4] + '</h3></td>' +
            '<td><b class="titulo-historial">Nombre de usuario</b>'+
            '<h3>' + n[1] + '</h3></td>' +
            '</tr>'+
            '</table>';
          
            '</div>';


          $("#cuerpoCarritoMisProductos").append(texto);
        });
        comprobarMisproductos();

      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la peticion de mis truekes");
      }
    });
  }
  $("#modal-propio-lateral-derecho").removeClass("modal-propio__lateral--derecho__animation");

}

function irAlTrade(idTrade) {
  chats(idTrade);
}

function salirPerfil() {
  $("#modal-propio-trasera").remove();
  $("#modal-propio").remove();
  $("body").css("overflow", "inherit");
}

function desloguearse() {
  borrarCookieSiExiste().then(resolve => {
    location.reload();
  });
}

async function borrarCookieSiExiste() {

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "php/desloguearse.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        resolve("True");
      },
      error: function (jqXHR, status, error) {
        reject(Error("FALSE"));
      }
    });
  });
}

function borrarContenidoCapaDerecha() {
  $("#modal-propio-lateral-derecho").empty();
  $("#modal-propio-lateral-derecho").removeClass("modal-propio__lateral--derecho__animation");

}

function perfilExtendido() {
  if (!$("#container-perfil").length) {
    if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
      borrarContenidoCapaDerecha();
      // $("#modal-propio-lateral-derecho").addClass("modal-propio__lateral--derecho__animation");
    }
    
    $.ajax({ 
      url: "http://localhost:45/Usuarios/" + id,
      type: 'GET',
      dataType: 'json',
      success: function (n) {
          nombre = n.nombre;
          imagen = n.imagen;
          email = n.email;
          direccion = n.direccion;
          provincia = n.provincia;
          fechaNacimiento = n.fechaNacimiento;
          const meses = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
          ]
          const date = new Date(n.fechaAlta)
          const dia = date.getDate()
          const mes = date.getMonth()
          const ano = date.getFullYear()
          fechaAlta = `${dia} de ${meses[mes]} del ${ano}`;
          if (n.fechaNacimiento != null && n.fechaNacimiento != "" ||
            n.fechaNacimiento == "Introduce tu fecha de nacimiento") {
            if (n.fechaNacimiento.search('1') &&
              !n.fechaNacimiento.length <= '11' && fechaNacimiento != "Introduce tu fecha de nacimiento") {
              const date1 = new Date(n.fechaNacimiento)
              const dia1 = date1.getDate()
              const mes1 = date1.getMonth()
              const ano1 = date1.getFullYear()
              fechaNacimiento = `${dia1} de ${meses[mes1]} del ${ano1}`;
            }

          } else {

          }
          if (!fechaNacimiento.search("undefined")) {
            fechaNacimiento = "Introduce tu fecha de nacimiento";
          }
        var texto = '   <div id="container-perfil" class="contenedor-deseos">  ' +
          '    <form enctype="multipart/form-data" class="form-horizontal" method="post" role="form" id="edit-form1" autocomplete="off">  ' +
          '<div class="container-perfil--titulo">' +
          '       <h1>Editar el perfil de @' + nombre + '</h1>  ' + '       <h3>Miembro desde el ' + fechaAlta + '</h3>  ' +
          ' </div>' +
          '     	<hr>  ' +
          '   	<div class="row">  ' +
          '         <!-- left column -->  ' +
          '         <div class="col-md-3">  ' +
          '           <div class="text-center">  ' +
          '<div class="form-group">  ' +
          '             <img src="images/usuarios/' + imagen + '"  class="avatar img-circle imagen-perfil"  alt="avatar">  ' +
          // console.log(imagen);
          '             <h6>Cambiar foto de perfil...</h6>  ' +
          '   <input type="file" name="imagenPerfil" id="file-5" class="inputfile inputfile-5"/>  ' +
          '   <label for="file-5">  ' +
          '   <svg xmlns="" class="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>  ' +
          '  <br> <span class="iborrainputfile">Subir</span>  ' +
          '  </label>  ' +
          '           </div>  ' +
          '         </div>  ' +
          // '         </form>  ' +
          '           </div>  ' +
          '         <!-- edit form column -->  ' +
          '         <div class="col-md-9 personal-info personal-info--right">  ' +
          '           <div id="alertmessageperfil" class="alert alert-info alert-dismissable">  ' +
          '             <a class="panel-close close" data-dismiss="alert">×</a>   ' +
          '             <i class="fa fa-coffee"></i>  ' +
          '              <strong>Alertas!</strong>. No tiene avisos importantes.  ' +
          '           </div>  ' +
          '           <h3>Información Personal</h3>  ' +
          // '           <form class="form-horizontal" method="post" role="form" id="edit-form" autocomplete="off" enctype="multipart/form-data">  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Nombre:</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <input id="idNombre" name="nombre" class="form-control" value="' + nombre + '" type="text">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Direccion</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <input id="idDireccion" name="direccion" class="form-control" placeholder"Escribe tu direccion" value="' + direccion + '" type="text">  ' +
          '               </div>  ' +
          '             </div>  ' +
          ' <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Provincia</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <div class="ui-select">  ' +
          '                   <select id="idProvincia" name="provincia" id="user_zone" class="form-control">  ' +
          '<option value"' + provincia + '" selected="selected">' + provincia + '</option> ' +
          '   <option value="">' + provincia + '</option>  ' +
          '   <option value="A coru&#241;a">A coru&#241;a</option>  ' +
          '   <option value="&#193;lava">&#193;lava</option>  ' +
          '   <option value="Albacete">Albacete</option>  ' +
          '   <option value="Alicante">Alicante</option>  ' +
          '   <option value="Almer&#237;a">Almer&#237;a</option>  ' +
          '   <option value="Asturias">Asturias</option>  ' +
          '   <option value="&#193;vila">&#193;vila</option>  ' +
          '   <option value="Badajoz>Badajoz</option>  ' +
          '   <option value="Baleares">Baleares</option>  ' +
          '   <option value="Barcelona">Barcelona</option>  ' +
          '   <option value="Burgos">Burgos</option>  ' +
          '   <option value="C&#225;ceres">C&#225;ceres</option>  ' +
          '   <option value="C&#225;diz">C&#225;diz</option>  ' +
          '   <option value="Cantabria">Cantabria</option>  ' +
          '   <option value="Castell&#243;n">Castell&#243;n</option>  ' +
          '   <option value="Ceuta">Ceuta</option>  ' +
          '   <option value="Ciudad Real">Ciudad Real</option>  ' +
          '   <option value="C&#243;rdoba">C&#243;rdoba</option>  ' +
          '   <option value="Cuenca">Cuenca</option>  ' +
          '   <option value="Extranjero">Extranjero</option>  ' +
          '   <option value="Girona">Girona</option>  ' +
          '   <option value="Granada">Granada</option>  ' +
          '   <option value="Guadalajara">Guadalajara</option>  ' +
          '   <option value="Guip&#250;zcoa">Guip&#250;zcoa</option>  ' +
          '   <option value="Huelva">Huelva</option>  ' +
          '   <option value="Huesca">Huesca</option>  ' +
          '   <option value="Ja&#233;n">Ja&#233;n</option>  ' +
          '   <option value="La rioja>La rioja</option>  ' +
          '   <option value="Las palmas">Las palmas</option>  ' +
          '   <option value="Le&#243;n">Le&#243;n</option>  ' +
          '   <option value="Lleida">Lleida</option>  ' +
          '   <option value="Lugo">Lugo</option>  ' +
          '   <option value="Madrid">Madrid</option>  ' +
          '   <option value="M&#225;laga">M&#225;laga</option>  ' +
          '   <option value="Melilla">Melilla</option>  ' +
          '   <option value="Murcia">Murcia</option>  ' +
          '   <option value="Navarra">Navarra</option>  ' +
          '   <option value="Ourense">Ourense</option>  ' +
          '   <option value="Palencia">Palencia</option>  ' +
          '   <option value="Pontevedra">Pontevedra</option>  ' +
          '   <option value="Salamanca">Salamanca</option>  ' +
          '   <option value="Santa cruz de tenerife">Santa cruz de tenerife</option>  ' +
          '   <option value="Segovia">Segovia</option>  ' +
          '   <option value="Sevilla">Sevilla</option>  ' +
          '   <option value="Soria">Soria</option>  ' +
          '   <option value="Tarragona">Tarragona</option>  ' +
          '   <option value="Teruel">Teruel</option>  ' +
          '   <option value="Toledo">Toledo</option>  ' +
          '   <option value="Valencia">Valencia</option>  ' +
          '   <option value="Valladolid">Valladolid</option>  ' +
          '   <option value="Vizcaya">Vizcaya</option>  ' +
          '   <option value="Zamora">Zamora</option>  ' +
          '   <option value="Zaragoza">Zaragoza</option>  ' +
          '                   </select>  ' +
          '                 </div>  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <div class="col-lg-8">  ' +
          '       			<label>Fecha de Nacimiento</label>  ' +
          '     <p><input  name="fechaNacimiento" class="form-control" type="text" id="datepicker"  value="' + fechaNacimiento + '" placeholder="' + fechaNacimiento + '"/></p>     ' +
          '      		</div>  ' +
          '               </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Email:</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <input id="idEmail" name="email" class="form-control" value="' + email + '" type="text">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-md-3 control-label">Contraseña:</label>  ' +
          '               <div class="col-md-8">  ' +
          '                 <input name="password" class="form-control"  placeholder="Escribe una nueva contraseña" type="password">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-md-3 control-label">Confirma la contraseña:</label>  ' +
          '               <div class="col-md-8">  ' +
          '                 <input name="cpassword" class="form-control"  placeholder="Repite la contraseña" type="password">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-md-3 control-label"></label>  ' +
          '                   <div class="col-md-8">  ' +
          '                 <input name="botonGuardar" id="btn-edit" class="btn btn-primary" value="Guardar cambios" type="button">  ' +
          '                 <span></span>  ' +
          '                 <input name="botonBorrar" class="btn btn-default" value="Borrar" type="reset">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '         </div>  ' +
          '     </div>  ' +
          '           </form>  ' +
          '   </div>  ' +
          '  <hr>  ';
        $("#modal-propio-lateral-derecho").addClass("modal-propio__lateral--derecho__animation");
        $("#modal-propio-lateral-derecho").append(texto); //añade el perfil a la capa derecha
        $("#btn-edit").on("click", editar); // lanza la funcion editar perfil
        $(function () {
          $("#datepicker").datepicker();
        });
        // alert para avisos

        function actualizarImagen() {
          const files = document.getElementById("file-5").files[0];
          
            const reader = new FileReader();
            reader.onload = function (event) {
              var src = event.target.result;
              $(".avatar").remove();
              $('<img class="avatar img-circle imagen-perfil"  alt="avatar" src='+src+'>').insertBefore("h6");
            };
            reader.readAsDataURL(files);
        }

        $('#file-5').on('change', actualizarImagen);



        if ($("#idNombre").val().length > 0 &&
          $("#idEmail").val().length > 0 &&
          $("#idProvincia").val().length > 0 &&
          $("#idDireccion").val().length > 0 && $("#idDireccion").val() != "Introducir nueva direccion" &&
          $("#datepicker").val().length > 0 && $("#datepicker").val() != "Introduce tu fecha de nacimiento") {

          mensaje = '<a class="panel-close close" data-dismiss="alert">X' +
            '</a><i class="fa fa-coffee"></i>' +
            '<strong>Aviso!</strong>. Datos correctos, puede realizar trukes.';
          $('#alertmessageperfil').removeClass('alert-info').addClass('alert-success');
          $('#alertmessageperfil').removeClass('alert-danger').addClass('alert-success');
          $('#alertmessageperfil').html("");
          $('#alertmessageperfil').html('</div>' + mensaje + '</div>');

        } else {
          mensaje = '<a class="panel-close close" data-dismiss="alert">X' +
            '</a><i class="fa fa-coffee"></i>' +
            '<strong>Aviso!</strong>. No podra realizar truekes hasta que complete todos sus datos.';
          $('#alertmessageperfil').removeClass('alert-info').addClass('alert-danger');
          $('#alertmessageperfil').html("");
          $('#alertmessageperfil').html('</div>' + mensaje + '</div>');
        }



        function hideIt() {
          $("#datepicker").datepicker("destroy");
          $("#datepicker").hide();
        }

        function showIt() {
          $("#datepicker").show();
          $("#datepicker").datepicker();
        }
        //var currentDate = $( ".datapicker" ).datepicker( "getDate" );

      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la recuperacion del perfil");
      }
    });

    function editar() {
      var datos = $('#edit-form1').serializeArray();
      var almacen = new FormData($('#edit-form1')[0]);

      validacion = true;
      if ($("#idNombre").val().length < 5) {
        alertaMensaje('El nombre');
        validacion = false;
      }

      if ($("#idEmail").val().length < 5) {
        alertaMensaje('El Email');
        validacion = false;
      }

      if ($("#idDireccion").val().length < 5) {
        alertaMensaje('La direccion');
        validacion = false;
      }

      if (validacion == true) {
        $.ajax({
          url: 'php/editarPerfil.php',
          type: 'POST',
          data: almacen,
          contentType: false,
          processData: false,
          dataType: 'json',
          success: function (json) {
            console.log("success");
            if ($("#container-perfil").length) {
              if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
                borrarContenidoCapaDerecha();
                perfilExtendido();
              }
            }
          },
          //Termina success    
          error: function (jqXHR, status, error) {
            console.log("Fallo en la peticion ajax para los productos");
            console.log(error);
            if ($("#container-perfil").length) {
              if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
                borrarContenidoCapaDerecha();
                perfilExtendido();
              }
            }
          }
        });
      }
    };
  }
}

function alertaMensaje(campo) {
  mensaje = '<a class="panel-close close" data-dismiss="alert">X' +
    '</a><i class="fa fa-coffee"></i>' +
    '<strong>Aviso!</strong>. El ' + campo + ' debe tener como mínimo 5 caracteres.';
  $('#alertmessageperfil').removeClass('alert-info').addClass('alert-danger');
  $('#alertmessageperfil').removeClass('alert-success').addClass('alert-danger');
  $('#alertmessageperfil').html("");
  $('#alertmessageperfil').html('</div>' + mensaje + '</div>');
}



function animaciones(){
  $("#modal-propio-lateral-derecho").children()[0]
}