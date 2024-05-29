document.addEventListener('DOMContentLoaded', () => {
    const linkButtons = document.querySelectorAll('.link-button');
    const footerElement = document.querySelector('.link-footer');

    function animateRainbowBorder(borderElement) {
        let x = 0;
        function animate() {
            x += 0.5;
            borderElement.style.backgroundPosition = `${x}% 50%`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    linkButtons.forEach(button => {
        animateRainbowBorder(button);
    });

    animateRainbowBorder(footerElement); // Animation für den footer

    function adjustElements() {
        const screenWidth = window.innerWidth;

        linkButtons.forEach(button => {
            const buttonWidth = screenWidth < 768 ? '95%' : '80%';
            button.style.width = buttonWidth;

            // Reset margin-bottom to default
            button.style.marginBottom = '0';
        });

        const footerWidth = screenWidth < 768 ? '95%' : '80%';
        footerElement.style.width = footerWidth;
        footerElement.style.marginBottom = '0';
    }

    adjustElements();
    window.addEventListener('resize', adjustElements);

    // Funktion für das Dropdown-Menü bei Hover
    function handleDropdownHover(triggerElement) {
        triggerElement.addEventListener('mouseenter', () => {
            const dropdownContent = triggerElement.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'block';

                // Überprüfen, ob Dropdown-Menü den nächsten Button oder Footer überlappt
                const rect = dropdownContent.getBoundingClientRect();
                const nextElement = triggerElement.nextElementSibling;
                if (nextElement) {
                    const nextElementRect = nextElement.getBoundingClientRect();
                    const dropdownBottom = rect.top + rect.height;
                    const nextElementTop = nextElementRect.top;

                    if (dropdownBottom > nextElementTop) {
                        const distance = dropdownBottom - nextElementTop + 20; // zusätzlicher Abstand
                        triggerElement.style.marginBottom = `${distance}px`;
                    }
                }
            }
        });

        triggerElement.addEventListener('mouseleave', () => {
            const dropdownContent = triggerElement.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
                triggerElement.style.marginBottom = '0';
            }
        });
    }

    linkButtons.forEach(button => {
        handleDropdownHover(button);
    });

    handleDropdownHover(footerElement); // Dropdown-Funktionalität auf den Footer anwenden

});
