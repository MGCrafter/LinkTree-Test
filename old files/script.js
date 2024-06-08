document.addEventListener('DOMContentLoaded', () => {
    const linkButtons = document.querySelectorAll('.link-button');

<<<<<<< Updated upstream
    function animateRainbowBorder() {
=======
    function animateRainbowBorder(borderElement) {
>>>>>>> Stashed changes
        let x = 0;
        function animate() {
            x += 0.5;
            linkButtons.forEach(button => {
                button.style.backgroundPosition = `${x}% 50%`;
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

<<<<<<< Updated upstream
    animateRainbowBorder();

    function adjustElements() {
        const screenWidth = window.innerWidth;
        const buttonWidth = screenWidth < 768 ? '95%' : '80%';

        linkButtons.forEach(button => {
            button.style.width = buttonWidth;
        });
    }

    adjustElements();
    window.addEventListener('resize', adjustElements);

    function handleMouseMove(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;

        button.style.transform = `rotateX(${deltaY * 30}deg) rotateY(${deltaX * 30}deg)`;
    }

    function handleMouseLeave(e) {
        e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
    }

=======
>>>>>>> Stashed changes
    linkButtons.forEach(button => {
        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
    });
<<<<<<< Updated upstream
=======

    function adjustElements() {
        const screenWidth = window.innerWidth;

        linkButtons.forEach(button => {
            const buttonWidth = screenWidth < 768 ? '95%' : '80%';
            button.style.width = buttonWidth;
        });
    }

    adjustElements();
    window.addEventListener('resize', adjustElements);

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
            button.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
>>>>>>> Stashed changes
});
