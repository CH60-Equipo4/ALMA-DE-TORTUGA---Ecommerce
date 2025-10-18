/* Logica para flip cards*/ 
document.addEventListener('DOMContentLoaded', () => {
    //seleccionamos todas las clases que sean flip-card
    const flipCards = document.querySelectorAll('.flip-card');
    //añadimos for para que cada tarjeta sea volteada
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            //activamos la logica flipped que se encuentra en CSS
            card.classList.toggle('flipped');
        });
    });
});