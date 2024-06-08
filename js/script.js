document.addEventListener('DOMContentLoaded', () => {
    const linkButtons = document.querySelectorAll('.link-button');

    function animateRainbowBorder() {
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

    linkButtons.forEach(button => {
        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
    });
});
