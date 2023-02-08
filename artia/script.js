let list = [
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
    "Carlos"
];

let part;
let current_ip = "";
let current_user = "";
json_user = localStorage.getItem('current_user');
if(json_user != undefined){
    current_user = JSON.parse(json_user);
}


var _target, _deg = 0;
function ordSequential(part_deg, players) {
    rand = Math.floor(Math.random() * players);
    return _deg = _deg + (rand * part_deg) + 2160;
};

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

function menuName(){
    var name = current_user.name.split(' ');
    return "Olá,&nbsp;"+name[0];
}

function loadMenu(){
    if(current_user.id == undefined){
        $(".stats, .history").hide();
        $(".login-menu").show();
        $(".default-menu").hide();
        $(".premium-menu").hide();
    }else if(current_user.is_premium == undefined){
        $(".stats, .history").hide();
        $(".login-menu").hide();
        $(".default-menu").show();
        $(".premium-menu").hide();
        $(".default-user").html(menuName());
    }else if(current_user.is_premium == "1"){
        $(".stats, .history").show();
        $(".login-menu").hide();
        $(".default-menu").hide();
        $(".premium-menu").show();
        $(".premium-user").html(menuName());
    }
}

function hideModal(element){
    $('.jquery-modal').hide();
    $(element).hide();
}


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
    localStorage.removeItem('current_user');
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
            switch (returned) {
                case 'error_login':
                    $('#userPassword').val('');
                    showMessage('error', "E-mail ou senha incorreto(s).")
                    break;
                case 'error_account':
                    $('#userEmail').val('');
                    showMessage('error', "Este e-mail já está cadastrado no sistema!", 3000)
                    break;
                case 'registered':
                    hideModal('modalSignin');
                    showMessage('success', "Registrado com sucesso!")
                    break;
                default:
                    hideModal('modalSignin');
                    showMessage('success', "Logado com sucesso!")
                    localStorage.setItem('current_user', returned);
                    current_user = JSON.parse(returned);
                    loadMenu();
                    break;
            }
        }
    });
}

function restoreSession(){
    if(current_user.id != undefined){
        loadMenu();
    }
}

$( document ).ready(function() {
    var date = new Date();
    var weekday = date.getDay() - 1;
    var titleDay = ["Segundouu", "Terçouu", "Quartouuu", "Quintouuuu", "🎉 SEXTOUUUUUU 🎉", "É Sábado mano, o que se tá fazendo aqui?", "É Domingo mano, o que se tá fazendo aqui?"]
    $("#day").html(titleDay[weekday]);
    
    part = 360 / list.length;
    
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
        
        var myInterval = "";
        var audio = new Audio('../src/roda-roda.mp3');
        audio.play();
        clearInterval(myInterval);
        ordSequential(part, list.length);
        _target = (_deg - (360 * parseInt(_deg / 360))) / part;
        $(".fancybox").parent("li").velocity({
            opacity: 1
        }, {
            duration: 100,
            start: function(){
                console.log(_deg+'deg');
                $("#wheel").css({"transform": "rotateZ(0deg)"});
            },
            complete: function () {
                $(".wheel").velocity({
                    rotateZ: _deg + "deg"
                }, {
                    duration: 5500,
                    complete: function (elements) {
                        // addToHistory();
                        myInterval = setInterval(function() {
                            elemento = document.querySelector("#wheel");
                            party.confetti(elemento, {
                                    count: party.variation.range(50, 75),
                            });
                        }, 1500);

                        setTimeout(function(){
                            clearInterval(myInterval);
                        }, 4500)
                        

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
    restoreSession();
    cookiesMessage();
}); // ready