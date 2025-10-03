
const elements = document.querySelectorAll('.cards-scroll, .titulo-top, .card-scale, .titulo-scale, .card-left, .titulo-left') //podemos generar una sola constante para llamar todos los elementos de html

function mostrarElements(){
    const altura = window.innerHeight * 0.8

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top

        if(elementTop < altura){
            element.classList.add('show')
        }else{
            element.classList.remove('show')
        }
    })
}
window.addEventListener('scroll', () => {mostrarElements(), scrollNavbar()});


const dynamicBg = document.querySelector('.dynamic-bg');
const mouseCircle = document.getElementById('mouse-circle')
const toggleButton = document.getElementById('toggle-effect')

let isEffectActive = false;

document.addEventListener('mousemove', (e) => {

    //cambiar el color de fondo del contenedor
    const bgX =(e.clientX / window.innerWidth) * 255
    const bgY =(e.clientY / window.innerHeight) *255
    dynamicBg.style.background = `rgb(${bgX}, ${bgY}, 150)`
    //para el movimiento del raton
    const x = e.clientX + window.scrollX
    const y = e.clientY + window.scrollY

    if(isEffectActive){
        //actualizar la posicion del circulo segun el raton
        mouseCircle.style.left = `${x - mouseCircle.offsetWidth /2}px`
        mouseCircle.style.top = `${y - mouseCircle.offsetHeight / 2}px`

        //cambiar el color de la sombra del circulo
        const color =  `hsl(${x % 360},100%, 60% )`
        mouseCircle.style.boxShadow=`0 0 10px 10px ${color}`         
    }

})

//funcion para activar/desactivar el seguimiento del raton
toggleButton.addEventListener('click', () => {
    isEffectActive = !isEffectActive //cambiar el estado

    //cambiar color del boton
    toggleButton.style.backgroundColor = isEffectActive ? "blue" : "grey"

    //mostrar u ocultar el circulo
    mouseCircle.style.display = isEffectActive ? 'block' : 'none';
})

