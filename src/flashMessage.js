// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
// <script src="../src/flashMessage.js"></script>

function cookiesMessage(){
    var aceepted = localStorage.getItem('cookies_accepted');
    if(aceepted != "true"){
        Swal.fire({
            title: 'Aceita um cookie? 🍪',
            text: 'Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços. Ao utilizar nossos serviços, você está ciente dessa funcionalidade.',
            footer: '<a href="../politica-de-privacidade" target="_blank">Política de Privacidade</a>⠀⠀⠀⠀⠀⠀⠀⠀<a href="https://pt.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)" target="_blank">O que são cookies?</a>',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: "success",
                    title: "Salvo!",
                    showConfirmButton: false,
                    timer: 1000
                })
                localStorage.setItem('cookies_accepted', 'true')
            }
        })
    }
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