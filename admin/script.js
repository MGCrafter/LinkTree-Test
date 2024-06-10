document.addEventListener('DOMContentLoaded', () => {
    const linkTreeContainer = document.getElementById('linktree');

    async function fetchLinks() {
        try {
            const response = await fetch('https://directus-1.nekozdevteam.eu/items/links', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Log API Response
            console.log('API Response:', data);
            
            if (!data.data || data.data.length === 0) {
                throw new Error('Keine Daten gefunden');
            }

            data.data.forEach(link => {
                console.log('Verarbeite Link:', link); // Überprüft jeden Link
                const linkButton = document.createElement('a');
                linkButton.href = link.url;
                linkButton.textContent = link.title;
                linkButton.className = 'link-button';
                linkButton.target = '_blank';
                linkTreeContainer.appendChild(linkButton);
            });

            initializeLinkAnimations(); // Stellt sicher, dass die Animationen angewendet werden
        } catch (error) {
            console.error('Fehler beim Laden der Links:', error);
        }
    }

    function initializeLinkAnimations() {
        const linkButtons = document.querySelectorAll('.link-button');

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

        function adjustElements() {
            const screenWidth = window.innerWidth;

            linkButtons.forEach(button => {
                const buttonWidth = screenWidth < 768 ? '95%' : '80%';
                button.style.width = buttonWidth;
            });
        }

        adjustElements();
        window.addEventListener('resize', adjustElements);

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
    }

    fetchLinks();
});
