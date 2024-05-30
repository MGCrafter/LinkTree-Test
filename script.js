document.addEventListener('DOMContentLoaded', () => {
    const linkButtons = document.querySelectorAll('.link-button');
    const footer = document.querySelector('.link-footer');

    // Funktion zur Animation des Regenbogen-Borders
    function animateRainbowBorder(borderElement) {
        let x = 0;
        function animate() {
            x += 0.5;
            borderElement.style.backgroundPosition = `${x}% 50%`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Animation für alle Buttons und den Footer starten
    linkButtons.forEach(button => {
        animateRainbowBorder(button);
    });
    animateRainbowBorder(footer);

    function adjustElements() {
        const screenWidth = window.innerWidth;

        linkButtons.forEach(button => {
            const buttonWidth = screenWidth < 768 ? '95%' : '80%';
            button.style.width = buttonWidth;
        });
    }

    adjustElements();
    window.addEventListener('resize', adjustElements);
});
