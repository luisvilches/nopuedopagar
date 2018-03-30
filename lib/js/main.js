function send() {    
    if(validarFormulario()){
        SendMail();
    }
}

function SendMail(){
    var nombre = document.getElementById("name").value;
    $.ajax({
        type: "POST",
        url: "sendMail.php",
        data: $("#formulario").serialize(), // Adjuntar los campos del formulario enviado.
        success: function(data)
        {
            if(data === "Mensaje enviado" || data === "200"){
                var m = document.getElementById("result");
                m.innerHTML = "";
                m.innerHTML = successTemplate(nombre);
            } else {
                alert(document.getElementById("alert"),"Ocurrio un error al enviar el mensaje, intente mas tarde!");
            }
        }
    });
    return false; 
}

function alertMsg(parent,msg){
    parent.innerText = msg;
    parent.style.display = "block";
}

function truAlert(parent){
    parent.innerText = "";
    parent.style.display = "none";
}

function validarFormulario(){
 
    var txtNombre = document.getElementById('name').value;
    var txtAsunto = document.getElementById('asunto').value;
    var txtCorreo = document.getElementById('mail').value;
    var txtMsg = document.getElementById('msg').value;
    var alert = document.getElementById("alert");
    var expresionRegular1=/^([0-9]+){9}$/;//<--- con esto vamos a validar el numero
    var expresionRegular2=/\s/;//<--- con esto vamos a validar que no tenga espacios en blanco

    //Test campo obligatorio
    if(txtNombre == null || txtNombre.length == 0 || /^\s+$/.test(txtNombre)){
        alertMsg(alert,'El campo nombre no debe ir vacío');
        return false;
    }

    if(!(/\S+@\S+\.\S+/.test(txtCorreo))){
        alertMsg(alert,'Debe escribir un correo válido');
        return false;
    }

    if(txtAsunto == null || txtAsunto.length == 0){
        alertMsg(alert,'Debe ingresar un Numero Valido');
        return false;
    } else if(expresionRegular2.test(txtAsunto)){
        alertMsg(alert,'Debe ingresar un Numero Valido');
        return false;
    } else if(expresionRegular1.test(txtAsunto)){
        alertMsg(alert,'Debe ingresar un Numero Valido');
        return false;
    }

    if(txtMsg == null || txtMsg.length == 0){
        alertMsg(alert,'Debe ingresar un Mensaje');
        return false;
    }

    truAlert(alert);
    return true;
}


function successMesage(name){
    return `Estimado ${name}, su mensaje fue enviado con éxito, nos podremos en contacto con usted a la brevedad`;
}

function successTemplate(name){
    return `
        <div class="tmp">
            <h4>${successMesage(name)}</h4>
        </div>
    `
};

function desplazarDown(ubicacion){
    if(ubicacion === "body"){
        var posicion = $(ubicacion).offset().top - 200;
    } else {
        var posicion = $(ubicacion).offset().top - 60;
    }
    event.preventDefault()
    $("html, body").animate({
        scrollTop: posicion
    }, 2000);
};

function irArriba(){
    $(document).on("scroll", function(){
        var desplazamientoActual = $(document).scrollTop();
        var controlArriba = $("#irArriba");
        console.log("Estoy en " , desplazamientoActual); 
        if(desplazamientoActual > 100 && controlArriba.css("display") == "none"){
            controlArriba.fadeIn(500);
        }
        if(desplazamientoActual < 100 && controlArriba.css("display") == "block"){
            controlArriba.fadeOut(500);
        }
    });
};