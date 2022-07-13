var _target, _deg = 0;
function ordSequential(part_deg, players) {
    rand = Math.floor(Math.random() * players);
    return _deg = _deg + (rand * part_deg) + 2160;
};
$( document ).ready(function() {
    var date = new Date();
    var weekday = date.getDay() - 1;
    var titleDay = ["Segundouu", "Terçouu", "Quartouuu", "Quintouuuu", "🎉 SEXTOUUUUUU 🎉", "É Sábado mano, o que se tá fazendo aqui?", "É Domingo mano, o que se tá fazendo aqui?"]
    $("#day").html(titleDay[weekday]);
    
    var list = [
        "Guilherme",
        "Dayan",
        "Lucas M.",
        "Mateus",
        "Milles",
        "Karla",
        "Loren",
        "Erivaldo",
        "Eric",
        "Jadson S.",
        "Jadson C."
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

        
    $(".skills-wheel .btn").on("click", function (e) {
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
}); // ready