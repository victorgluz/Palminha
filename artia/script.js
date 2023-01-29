var _target, _deg = 0;
function ordSequential(part_deg, players) {
    rand = Math.floor(Math.random() * players);
    return _deg = _deg + (rand * part_deg) + 2160;
};

function cookiesMessage(){
    Swal.fire({
        title: 'Aceita um cookie? 🍪',
        text: 'Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços. Ao utilizar nossos serviços, você está ciente dessa funcionalidade.',
        footer: '<a href="../politica-de-privacidade" target="_blank">Política de Privacidade</a>⠀⠀⠀⠀⠀⠀⠀⠀<a href="https://pt.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)" target="_blank">O que são cookies?</a>',
        confirmButtonText: 'Continuar'
    })
}

function showMessage(type, message, delay){
    //success - error - warning	- info - question
    if(delay == undefined){ delay = 1500; }
    Swal.fire({
        position: 'center',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: delay
    })
}

function flashMessage(type, message, delay){
    if(delay == undefined){ delay = 1500; }
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: type,
        title: message
      })
}

function switchMode(mode){
    if(mode == "register"){
        $('#form-modal').fadeOut( "slow", function() {
            $('#formMode').val('register');
            $('.switch-title').html("Cadastro");
            $('.input-name').show();
            $('#btn-login').html('Cadastrar');
            $('.switch-mode').html('Já tem uma conta?  <a href="#" class="text-muted" onclick="switchMode(\'login\')">Você pode fazer login!');
            $('.switch-help').html("Ao clicar em Cadastrar, entendemos que você concorda com com os <a href=\"../termos-de-uso\">termos de uso</a> e <a href=\"../politica-de-privacidade\">política de privacidade</a>.");
            $('#form-modal').fadeIn("slow");
        });
    }else{
        $('#form-modal').fadeOut( "slow", function() {
            $('#formMode').val('login');
            $('.switch-title').html("Login");
            $('.input-name').hide();
            $('#btn-login').html('Entrar');
            $('.switch-mode').html('Ainda não tem uma conta?  <a href="#" class="text-muted" onclick="switchMode(\'register\')">Você pode se cadastrar!');
            $('.switch-help').html("Ao clicar em Entrar, entendemos que você concorda com com os <a href=\"../termos-de-uso\">termos de uso</a> e <a href=\"../politica-de-privacidade\">política de privacidade</a>.");$('#form-modal').fadeIn("slow");
        });
    }
}

function hideModal(element){
    $('.jquery-modal').hide();
    $(element).hide();
}

let current_ip = "";
function getIp(){
    $.ajax({
        url: "../api/getIp.php",
        success: function(returned){
            current_ip = returned;
        }
    });
}
getIp();

function userLogin(){
    var mode = $('#formMode').val()
    var device = { ip: current_ip, screen: window.outerWidth+"x"+window.outerHeight, user_agent: navigator.userAgent }
    var name = $('#userName').val()
    var email = $('#userEmail').val()
    var password = $('#userPassword').val()
    var regexEmail = new RegExp("^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$");
    if(mode == "register" && name.length <= 1){
        flashMessage('warning', "Nome não pode ficar vazio!")
        $('#userName').focus();
        return false;
    }
    if(!regexEmail.test(email)){
        flashMessage('warning', "Digite um E-mail válido!")
        $('#userEmail').focus();
        return false;
    }
    if(password.length < 8){
        flashMessage('warning', "A senha deve ter no mínimo 8 caracteres!")
        $('#userPassword').focus();
        return false;
    }
    password = btoa(password)
    $.ajax({
        type: "POST",
        url: "../api/login.php",
        data: { mode: mode, name: name, email: email, pass: password, device: device },
        success: function(returned){
            console.log(returned);
            switch (returned) {
                case 'error_login':
                    $('#userPassword').val('');
                    flashMessage('error', "E-mail ou senha incorreto(s).")
                    break;
                case 'error_account':
                    $('#userEmail').val('');
                    flashMessage('error', "Este e-mail já está cadastrado no sistema!", 3000)
                    break;
                case 'registered':
                    hideModal('modalSignin');
                    flashMessage('success', "Registrado com sucesso!")
                    break;
                default:
                    hideModal('modalSignin');
                    flashMessage('success', "Logado com sucesso!")
                    break;
            }
        }
    });
}

function showPremium(){
    premium = false;
    if(premium){
        $(".stats, .history").show();
        $(".default-menu").hide();
        $(".premium-menu").show();
    }
    return false;
}

$( document ).ready(function() {
    var date = new Date();
    var weekday = date.getDay() - 1;
    var titleDay = ["Segundouu", "Terçouu", "Quartouuu", "Quintouuuu", "🎉 SEXTOUUUUUU 🎉", "É Sábado mano, o que se tá fazendo aqui?", "É Domingo mano, o que se tá fazendo aqui?"]
    $("#day").html(titleDay[weekday]);
    
    var list = [
        "Simão",
        "Vitão",
        "Dani",
        "Lucas",
        "Matheus",
        "Sander",
        "Simoneto",
        "Heitor",
        "Leandro P.",
        "Shai",
        "Leandro S.",
        "Luiza",
        "Grawe",
        "Zeferino",
        "Daniela",
        "Jessica",
        "Carlos",
        "Priscila"
    ];   
    
    const part = 360 / list.length;
    
    for(i=0; i<list.length; i++){
        $("#wheel").append("<li><a class='fancybox'>"+list[i]+"</a></li>");
        $(".wheel li:nth-child("+(i+1)+")").css({"-webkit-transform" : "rotate("+(i*part)+"deg)"});
        $(".wheel li:nth-child("+(i+1)+")").css({"-moz-transform" : "rotate("+(i*part)+"deg)"});
        $(".wheel li:nth-child("+(i+1)+")").css({"-ms-transform" : "rotate("+(i*part)+"deg)"});
        $(".wheel li:nth-child("+(i+1)+")").css({"-o-transform" : "rotate("+(i*part)+"deg)"});
        $(".wheel li:nth-child("+(i+1)+")").css({"transform" : "rotate("+(i*part)+"deg)"});
    }

    $('#btn-confetti').click(function(){
        party.confetti($('#btn-confetti')[0], {
            count: party.variation.range(10, 20),
        });
    });

    $(".skills-wheel .btn-run").on("click", function (e) {
        ordSequential(part, list.length);
        _target = (_deg - (360 * parseInt(_deg / 360))) / part;
        $(".fancybox").parent("li").velocity({
            opacity: 1
        }, {
            duration: 100,
            complete: function () {
                $(".wheel").velocity({
                    rotateZ: _deg + "deg"
                }, {
                    duration: 5000,
                    complete: function (elements) {
                        var audio = new Audio('../src/clap.mp3');
                        audio.play();
                        setTimeout(function() {
                            elemento = document.querySelector("#wheel");
                            party.confetti(elemento, {
                                    count: party.variation.range(100, 100),
                            });
                        }, 500);
                        

                        $(".fancybox").parent("li").eq(_target).velocity({
                            opacity: 0.8
                        }, {
                            duration: 100,
                            complete: function () {
                                $(".fancybox").eq(_target).trigger("click");
                            }
                        });
                    }
                }); 
            }
        });
        return false;
    });
    showPremium();
}); // ready