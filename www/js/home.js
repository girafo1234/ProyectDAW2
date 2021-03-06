/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
$(document).ready(function () {
  home();
  //if(localStorage.getItem("resultado") !=null){
    //autologin();
  //}
  
  
  
 
  
});
//Termina de cargar la página

function home() {
  mostrarNavHome();
  mostrarBodyHome();
  //loginVerifyServer(null, null);
  politicaCookie();
  carruselPrincipal();
  
  
  

  
  
  
  
  //Acaba petición AJAX

  //Si escribe se autocompleta
  $("#main-browser").on("keyup", function (event) {
    if ($(this).val() == "") {
      $("#main-desplegable-categorias,#main-desplegable-subcategorias").removeClass("ocultar");
      $("#main-desplegable-productos").removeClass("mostrar");
      $("#main-desplegable-productos").children().remove();
      anterior = undefined;
    } else {
      if (event.which == 13) {
        //Se muestran los productos relacionados con lo introducido
        prepararMostrarProductos();
      } else {
        if (!$("#main-desplegable-productos").hasClass("mostrar")) {
          $("#main-desplegable-subcategorias").height($("#main-desplegable-categorias").height());
          $("#main-desplegable-categorias,#main-desplegable-subcategorias").addClass("ocultar");
          $("#main-desplegable-productos").addClass("mostrar");
          anterior = undefined;
        }

        if (event.which == 9) {
          $(this).val() = palabrasClaveAmpliado[0];
        }


        if ($(this).val().length == 1 && typeof anterior === 'undefined') {
          $.ajax({
            url: 'php/autocompletar.php',
            data: {
              key: $(this).val()
            },
            type: 'GET',
            dataType: 'json',
            success: function (json) {
              $("#main-desplegable-productos").children().remove();
              palabrasClave = [];
              $.each(json, (index, value) => {
                palabrasClave.push({
                  "id": value.id,
                  "palabra": value.palabra
                });
                añadirPalabraclave(value);
              });
              if (palabrasClave.length == 0) {
                value = {
                  id: 0,
                  palabra: "No se ha obtenido ningún resultado para tu búsqueda"
                };
                añadirPalabraclave(value);
              }
            },
            error: function (jqXHR, status, error) {
              console.log("Error al traer las palabras clave");
            }
          });
          //Acaba peticion Ajax       
        } else {

          $("#main-desplegable-productos").children().remove();
          if (event.which != 8 && $(this).val().length != 2) {
            lista = palabrasClaveAmpliado;
          } else {
            lista = palabrasClave;
          }

          palabrasClaveAmpliado = lista.filter(n => {
            return ~n.palabra.toLowerCase().indexOf($(this).val().toLowerCase());
          });

          if (palabrasClaveAmpliado.length == 0) {
            value = {
              id: 0,
              palabra: "No se ha encontrado ninguna palabra"
            };
            añadirPalabraclave(value);
          } else {
            $.each(palabrasClaveAmpliado, (index, value) => {
              añadirPalabraclave(value);
            });
          }
        }
        anterior = $(this).val();
      }
      //Acabe tecla normal
    }
    //Acaba no esta vacio
  });
  //Acaba autocompletar

  //Mostrar la capa de categorias
  // #browser-icon

  $("#main-browser").on("focusout", buscador);
  $("#main-browser").on("focusin", buscador);


  $("#button-cancel").on("click", function () {
    $("#main-browser").val("");
  });

  $("#main-desplegable-categorias").on("mouseover", ".dropdown__level1__item", function () {
    $("#main-desplegable-categorias").children(".dropdown__level1__item--marked").removeClass("dropdown__level1__item--marked");
    $(this).addClass("dropdown__level1__item--marked");
    $("#main-desplegable-subcategorias").html("");
    subcategoriasImagen.forEach(n => {
      if(this.id==n.idCategoria){
        $('<li class="list-group-item dropdown__level2__item"><button  type="button" class="dropdown__level2__link boton-invisible" href="" id="' + n.id + '"><img class="dropdown__level2__icon" src="' + n.icono + '" alt="">' + n.nombre + '</button></li>').appendTo("#main-desplegable-subcategorias");
      }
    });
    
  });

  $("#btn-registrarse").on("click", registrarse);

  $("#login").on("click", () => {

    $("body").addClass("modal-open");
    $("#navbar").addClass("navbar-modal-open");
    ventanaModal = '<div class="modal fade window-modal" id="miModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog window-dialog" role="document">' +
      '<div class="modal-content login" id="window-modal">' +
      '<div class="modal-header login__header">' +
      '<button type="button" id="login-cancel" class="boton-invisible login__header__cancel">' +
      '<i class="fa fa-times" aria-hidden="true"></i>' +
      '</button>' +
      '<h3 class="modal-title login__header__title">Log in</h3>' +
      '</div>' +
      '<div class="modal-body login__body">' +
      '<input type="email" id="login-email" class="login__body__input login__body__input--email" placeholder="correo@ejemplo.com">' +
      '<input type="password" maxlength="20" id="login-password" class="login__body__input login__body__input--password" placeholder="Contraseña">' +
      '<div class="login__body__remember"><input type="checkbox" id="remember" class="login__body__checkbox" value="Entrar"><label for="remember" class="login__body__checkbox__text">Recordarme</label></div>' +
      '<input type="button" id="login-entrar" class="login__body__entrar" value="Entrar">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<!-- Termina Div -->' +
      '<div id="modal-backdrop" class="modal-backdrop fade show"></div>';

    $("body").append(ventanaModal);

    $("#login-entrar").on("click", newLogin);
    $("#login-password").on("keyup", event => {
      if (event.which == 13) {
        login();
      }
    });
    $("#modal-backdrop").on("click", quitarLoginRegister);
    $("#login-cancel").on("click", quitarLoginRegister);
  });


  $("#registrarse").on("click", (event) => {
    $("body").addClass("modal-open");
    $("#navbar").addClass("navbar-modal-open");
    ventanaModal = '<div class="modal fade window-modal modal-auto-clear" id="miModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog window-dialog" role="document">' +
      '<div class="modal-content" id="window-modal">' +
      '<div class="signup-form-container">' +
      ' <!-- form start -->' +
      '<form method="post" role="form" id="register-form" autocomplete="off">' +
      ' <div class="form-header">' +
      '<h2 class="form-title"><i class="fa fa-user"></i><span class="glyphicon glyphicon-user"></span> Registro de nuevo usuari@</h2>' +
      ' <div class="pull-right">' +
      '<h3 class="form-title"><span class="glyphicon glyphicon-pencil"></span></h3>' +
      ' </div>' +
      ' </div>' +
      '<div class="form-body">' +
      ' <!-- json response will be here -->' +
      '   <div id="errorDiv"></div>' +
      '<!-- json response will be here -->' +
      '<div class="form-group">' +
      ' <div class="input-group">' +
      ' <div class="input-group-addon"><span class="fa fa-user"></span></div>' +
      '  <input name="nombre" type="text" id="name" class="form-control" placeholder="Nombre" maxlength="40" autofocus="true">' +
      '</div>' +
      '   <span class="help-block" id="error"></span>' +
      '  </div>' +
      ' <div class="form-group">' +
      ' <div class="input-group">' +
      '<div class="input-group-addon"><span class="fa fa-user"></span></div>' +
      ' <input name="apellido" id ="apellido" type="text" class="form-control" placeholder="Apellido">' +
      ' </div>' +
      '<span class="help-block" id="error"></span>' +
      '</div> ' +
      ' <div class="form-group">' +
      ' <div class="input-group">' +
      '<div class="input-group-addon"><span class="fa fa-envelope"></span></div>' +
      '<input name="email" id="email" type="text" class="form-control" placeholder="Email" maxlength="50">' +
      ' </div> ' +
      '  <span class="help-block" id="error"></span> ' +
      '</div>' +
      ' <div class="row">' +
      '<div class="form-group col-lg-6">' +
      ' <div class="input-group">' +
      ' <div class="input-group-addon"><span class="fa fa-lock"></span></div>' +
      ' <input name="password" id="password" type="password" class="form-control" placeholder="Contraseña">' +
      '</div>  ' +
      ' <span class="help-block" id="error"></span> ' +
      ' </div>' +
      ' <div class="form-group col-lg-6">' +
      ' <div class="input-group">' +
      ' <div class="input-group-addon"><span class="fa fa-lock"></span></div>' +
      '<input name="cpassword" type="password" id="repitpass" class="form-control" placeholder="Repite la contraseña">' +
      ' </div>  ' +
      '<span class="help-block" id="error"></span> ' +
      '</div>' +
      ' </div>' +
      ' </div>' +
      ' <div class="form-footer form-footer--responsive">' +
      '<button type="submit" class="btn btn-info btn-info-form" id="btn-signup">' +
      '  <span class="fa fa-sign-in"></span> Registrarse' +
      '</button>' +
      '<button type="reset" class="btn btn-info btn-info-form" id="btn-reset">' +
      '  <span class="fa fa-eraser"></span> Borrar Datos' +
      '</button>' +
      '<button type="button" class="btn btn-info btn-info-form" id="btn-cerrar">' +
      '  <span class="fa fa-times""></span> Cerrar' +
      '</button>' +
      // $('#miModal').modal('hide');
      ' </div>' +
      ' </form>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      '<!-- Termina Div -->' +
      '<div id="modal-backdrop" class="modal-backdrop fade show"></div>';

    $("body").append(ventanaModal);

    $("#btn-cerrar").on("click", function () {
      $('.modal-auto-clear').remove();
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');

    });


    //caracteres validos para el nombre
    var nameregex = /^[a-zA-Z ]+$/;

    $.validator.addMethod("validname", function (value, element) {
      return this.optional(element) || nameregex.test(value);
    });

    // valid email pattern
    var eregex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $.validator.addMethod("validemail", function (value, element) {
      return this.optional(element) || eregex.test(value);
    });

    $("#register-form").validate({
      rules: {
        nombre: {
          required: true,
          validname: true,
          minlength: 4
        },
        apellido: {
          required: true,
          validname: true,
          minlength: 4
        },
        email: {
          required: true,
          validemail: true,
          remote: {
            url: "php/comprobar-email.php",
            type: "post",
            data: {
              email: function () {
                return $("#email").val();
              }
            }
          }
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 15
        },
        cpassword: {
          required: true,
          equalTo: '#password'
        },
      },
      messages: {
        nombre: {
          required: "Por favor introduce el nombre",
          validname: "El nombre solo puede tener letras y espacios",
          minlength: "Tu nombre es muy corto"
        },
        apellido: {
          required: "Por favor introduce el apellido",
          validname: "El apellido solo puede tener letras y espacios",
          minlength: "Tu apellido es muy corto"
        },
        email: {
          required: "Por favor introduce un Email",
          validemail: "Introduce una dirección de Email valida",
          remote: "El Email ya se encuentra registrado" // añadir una opcion para recuperar la contraseña
        },
        password: {
          required: "Por favor introduce la contraseña",
          minlength: "Escribe minimo 6 caracteres"
        },
        cpassword: {
          required: "Por favor repite la contraseña",
          equalTo: "No coinciden las contraseñas"
        }
      },
      errorPlacement: function (error, element) {
        $(element).closest('.form-group').find('.help-block').html(error.html());
      },
      highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        $(element).closest('.form-group').find('.help-block').html('');
      },
      submitHandler: submitForm
    });


    function submitForm() {
      var f = new Date();
      var miObjeto = new Object();
      miObjeto.nombre= $("#name").val();
      miObjeto.apellido= $("#apellido").val();
      miObjeto.email= $("#email").val();
      miObjeto.contraseña = SHA1($("#password").val());
      miObjeto.imagen = "0.jpg";
      miObjeto.fechaAlta = f.getDate();
      miObjeto.direccion= "Introduce nueva direccion";
      miObjeto.provincia = "Sin introducir";
      miObjeto.fechaNacimiento = "Introduce tu fecha de nacimiento";
      var myString = JSON.stringify(miObjeto);
      
      $.ajax({
          url: 'http://localhost:45/Usuarios',
          contentType: "application/json; charset=utf-8",
          async: true,
          type: 'POST',
          data: myString,
          dataType: 'json'
        })
        .done(function (data) {
          $('#btn-signup').html('<img src="images/ajax-loader.gif" /> &nbsp; registrando...').prop('disabled', true);
          $('input[type=text],input[type=email],input[type=password]').prop('disabled', true);
          
          setTimeout(function () {

            if (data.status === undefined) {

              $('#errorDiv').slideDown('fast', function () {
                $('#errorDiv').html('<div class="alert alert-info">' + data.message + '</div>');
                $("#register-form").trigger('reset');
                $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
                $('#btn-signup').html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Registrar').prop('disabled', false);

                setTimeout(function () {
                  $('.modal-auto-clear').remove();
                  $('.modal-backdrop').remove();
                  $('body').removeClass('modal-open');
                }, 3000);

              }).delay(3000).slideUp('fast');


            } else {

              $('#errorDiv').slideDown('fast', function () {
                $('#errorDiv').html('<div class="alert alert-danger">' + data.message + '</div>');
                $("#register-form").trigger('reset');
                $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
                $('#btn-signup').html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Registrar').prop('disabled', false);
              }).delay(3000).slideUp('fast');
            }

          }, 3000);

        })
        .fail(function () {
          $("#register-form").trigger('reset');
          alert('Ocurrio un error, prueba de nuevo mas tarde...');
        });
    }
  });
  
    $("#main-desplegable-subcategorias").on("click", ".dropdown__level2__link", prepararMostrarProductos);
    $("#main-desplegable-productos").on("click", ".dropdown__notlevel__link", prepararMostrarProductos);
    $('#btn-home1').on('click', gohome);
  
 

  


};

//Termina clickar login

//Acaba el HOME --> ready del home /////////////////
//////////////////////////////////////
/////////////////////////


function mostrarNavHome() {
  nav = '<div class="container nav-container">' +
    '<img class="navbar-brand navbar-logo" src="images/logoPequeno.png">' +

    '<!-- Boton Collapse -->' +

    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"' +
    'aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>' +

    ' <!-- Menu Principal -->   ' +
    ' <div class="collapse navbar-collapse nav-main-collapse" id="navbarResponsive">' +
    '<ul class="navbar-nav navbar-list ml-auto" id="navbar-list">' +
    '<li id="btn-home1" class="navbar-list__item active navbar-list__item--highlighted">' +
    '<button class="nav-link boton-invisible" id="btn-home">Home</button>' +
    '</li>' +
    '<li class="navbar-list__item navbar-list__item--highlighted" id="login">' +
    '<button class="nav-link boton-invisible">Entrar</button>' +
    '</li>' +
    '<li class="navbar-list__item navbar-list__item--highlighted">' +
    '<button class="boton-invisible nav-link" id="registrarse">Registrarse</button>' +
    '</li>' +
    '</ul>' +
    '</div>' +



    '</div>';
  $("#navbar").append(nav);

};


function mostrarBodyHome() {
  $(".main-conteiner").html('<div id="puta" class="row">' +

    '<div class="col-lg-12 col-carousel">' +

    '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
    '<ol class="carousel-indicators" id="indicators">' +
    '<!-- Para pasar las fotos -->' +
    '</ol>' +
    '<div class="carousel-inner" id="carousel">' +
    '<!-- Aquí van las fotos del carousel -->' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<!-- /.col-lg-9 -->' +

    '</div>' +
    '<!-- /.row -->' +



    '<div class="row main-browser-dropdown-conteiner" id="main-browser-dropdown-conteiner">' +

    '<div class="col-lg-12">' +

    '<div class="browser" id="main-browser-conteiner">' +
    '<i class="fa fa-search browser__icon browser__icon--search" id="browser-icon" aria-hidden="true"></i>' +
    '<input type="text" class="browser__textfield" id="main-browser" placeholder="¿Que buscas?">' +
    '<button class="browser__button browser__button--search" type="button">Buscar</button>' +
    '<div class="browser__button--cancel">' +
    '<button type="button" id="button-cancel" class="boton-invisible"><i class="fa fa-times boton-invisible__icon" aria-hidden="true"></i></button>' +
    '</div>' +
    '</div>' +

    '<div class="main-dropdown" id="main-drop">' +
    '<div class="card dropdown">' +
    '<ul class="list-group list-group-flush dropdown__level1" id="main-desplegable-categorias">' +
    '<!-- Aqui van las categorias            -->' +
    '</ul>' +
    '<ul class="list-group list-group-flush dropdown__level2" id="main-desplegable-subcategorias">' +
    '<!-- Aqui van las subcategorias                                     -->' +
    '</ul>' +
    '<ul class="list-group list-group-flush dropdown__notlevel" id="main-desplegable-productos">' +
    '<!-- Aqui van los productos AUTOCOMPLETAR                              -->' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '</div>' +

    '<!-- <div class="row"> -->' +

    '<div id="contenedor-mid" class="container middle-conteiner">' +
    '<div class="row row-middle" id="contenedor-mid-interior">' +

    '<h1 class="row-middle-title col-lg-12">Deportes de temporada</h1>' +

    '</div>' +
    '</div>' +
    '</div>');



};

function quitarMainBrowserMin() {
  $("#navbar,#contenedor,#footer").removeClass("ocultar");
  $("#main-browser-dropdown-conteiner").removeClass("main-browser-dropdown-conteiner-mini");
  $("#main-browser-dropdown-conteiner").insertBefore($("#contenedor").children("div")[1]);
  $("#main-browser-min").remove();
  $("#main-drop").removeClass("mostrar");
  $("#main-browser").val("");
}

function mostrarMiddleContainer() {
   i=1;
  subcategoriasImagen.forEach(n => {
    
    if(n.imagen != null && n.imagen.startsWith(estacion()) && i<=3){
      
      $("<div class='col-lg-4 col-md-6 mb-4'>" +
      "<div class='card-body'>" +
      " <h4 class='card-title producto-titulo-centrar' id=" + n.id + ">" +
      " <button class='boton-invisible boton-invisible-producto'>" + n.nombre + "</button>" +
      "</div>" +
      "<div id='conteiner-imagen-deporte-temporada' class='card h-80'>" +
      "<button id=" + n.id + " class='boton-invisible'>" +
      "<img  class='card-img-top' src=" + 'images/middle/' + n.imagen + " alt=''>" +
      "</button>" +
      "</div>" +
      "</div>").appendTo("#contenedor-mid-interior");
      i++;
    }
    
  });
  $(".card-title").on("click", prepararMostrarProductos);
  $(".h-80").on("click", "button", prepararMostrarProductos);

};


function estacion() {
  var dt = new Date();
  var estacion;
  if (dt.getMonth() + 1 >= 5 && dt.getMonth() + 1 <= 9) {
    estacion = "verano";
  } else {
    estacion = "invierno";
  };
  return estacion;
};

function añadirPalabraclave(value) {
  $('<li class="list-group-item dropdown__notlevel__item"><button class="dropdown__notlevel__link boton-invisible" href="" id="' + value.id + '">' + value.palabra + '</button></li>').appendTo("#main-desplegable-productos");
}

var frasesCarrusel = ["Amplia tus horizontes",
  "Los grandes logros requieren tiempo y paciencia",
  "Todo lo que sea capaz de creer, eres capaz de conseguir",
  "El 90% del éxito se basa en el esfuerzo",
  "No te ahogarás por caerte en el mar, sino por no salir de él",
  "Tu nivel de esfuerzo determinará tu éxito",
  "Olvídate del reloj y sigue su paso, adelante"
];



function buscador() {
  setTimeout(function () {


    //Crear capa solo para el textfield --> Tamaño pequeño
    if ($(window).width() < 575) {
      if (!$("#navbar,#contenedor,#footer").hasClass("ocultar")) {
        $("<div class='main-browser-min' id='main-browser-min'><span class='contenedor-boton-invisible' id='contenedor-boton-invisible'><button type='button' class='boton-invisible'><i class='fa fa-times boton-invisible__icon' aria-hidden='true'></i></button></span></div>").append($("#main-browser-dropdown-conteiner")).appendTo("body");
        $("#navbar,#contenedor,#footer").addClass("ocultar");
        $("#main-browser-dropdown-conteiner").addClass("main-browser-dropdown-conteiner-mini");
        //La x del texfield en tamaño pequeño
        $("#contenedor-boton-invisible").on("click", function () {
          quitarMainBrowserMin();
        });
        $("#main-browser").focus();
      }
    }
    if ($("#main-drop").hasClass("mostrar")) {
      $("#main-drop").removeClass("mostrar");
      $("#main-browser-conteiner").removeClass("browser-extended");
      $("#main-desplegable-categorias").children(".dropdown__level1__item--marked").removeClass("dropdown__level1__item--marked");
      $("#main-desplegable-subcategorias").children().remove();
    } else {
      $("#main-drop").addClass("mostrar");
      $("#main-browser-conteiner").addClass("browser-extended");
      $("#main-desplegable-subcategorias").height($("#main-desplegable-categorias").height());
    }
  }, 100)
};


function politicaCookie() {
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#252e39"
      },
      "button": {
        "background": "#14a7d0"
      }
    },
    "theme": "classic",
    "content": {
      "message": "Las cookies de este sitio se usan para personalizar el contenido y los anuncios, para ofrecer funciones de medios sociales y para analizar el tráfico. Además, compartimos información sobre el uso que haga del sitio web con nuestros partners de medios sociales, de publicidad y de análisis web.",
      "dismiss": "Aceptar",
      "link": "Ver mas"
    }
  });
}


function gohome() {
  $('#contenedor-mid').html("");

  $('<div class="row row-middle" id="contenedor-mid-interior">' +
    '<h1 class="row-middle-title col-lg-12">Deportes de temporada</h1>' +
    '</div>').appendTo("#contenedor-mid");
  mostrarMiddleContainer();
}

 function traerSubcategorias(){
  subcategoriasImagen = [];
  $.ajax({
    url: "http://localhost:45/Subcategorias",
    type: "GET",
    dataType: 'json',
    success: function (json) {
      json.forEach(n => {
        
        subcategoriasImagen.push(n);
        
      });
    }
  });
  
 }


 function carruselPrincipal() {
  $('.carousel').carousel({
    interval: 4000
  });
  $.ajax({
    url: 'http://localhost:45/Categorias',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      
      first = true;
      contador = 1;
      
      
      //Recorro las categorias
      var frasesCarruselTemporal = frasesCarrusel.slice();
      // var contador = 0;
      $.each(json, (id, value) => {
        
        //Cargo el carousel

        if (value.imagen != null) {
          if (first) {
            first = false;
            aleatorio = Math.floor(Math.random() * (frasesCarruselTemporal.length));
            seleccion = frasesCarruselTemporal[aleatorio];
            $('<div class="carousel-item active"><img class="d-block img-fluid" src=' + value.imagen + '></img><div class="carousel-text carousel-caption d-none d-md-block">' +
              '<h1>' + seleccion + '</h1>' +
              '</div></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>').appendTo('#indicators');
          } else {
            aleatorio = Math.floor(Math.random() * (frasesCarruselTemporal.length));
            seleccion = frasesCarruselTemporal[aleatorio];
            $('<div class="carousel-item"><img class="d-block img-fluid" src=' + value.imagen + '></img><div class="carousel-text carousel-caption d-none d-md-block">' +
              '<h1>' + seleccion + '</h1>' +
              '</div></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="' + contador + '"></li>').appendTo('#indicators');
            contador++;
          }
        }

        /*Cargo las categorias*/
        $('<li class="list-group-item dropdown__level1__item" id=' + value.id + '><img src=' + value.icono + '>' + "  " + value.nombre + '</li>').appendTo("#main-desplegable-categorias");
        
      });
  
    },
    error: function (jqXHR, status, error) {
      alert('Disculpe, existió un problema trayendo las categorias. Error: ' + error);
    }
  }); 
  traerSubcategorias();
  
  setTimeout(function(){
    mostrarMiddleContainer();
    },100);
}
