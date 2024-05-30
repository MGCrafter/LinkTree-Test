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

    // Kommentar für Neigungs-Hover Effekt
    /*
    // Funktion, um die stärkere Neigung der Buttons bei Mausbewegung zu steuern
    linkButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;

            button.style.transform = `rotateX(${deltaY * 30}deg) rotateY(${deltaX * 30}deg)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    */
});
