document.addEventListener('DOMContentLoaded', () => {
    const linkTreeElement = document.getElementById('linktree');
    const linkInputsElement = document.getElementById('linkInputs');
    const saveLinksButton = document.getElementById('saveLinks');
    const addLinkButton = document.getElementById('addLink');
    const adminSection = document.getElementById('adminSection');
    const adminLogoutButton = document.getElementById('adminLogout');

    let links = [];

    function checkAdminLogin() {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            adminSection.style.display = 'block';
        }
    }

    function loadLinks() {
        fetch('links.json')
            .then(response => response.json())
            .then(data => {
                links = data.links;
                renderLinks();
                renderInputs();
            });
    }

    function renderLinks() {
        linkTreeElement.innerHTML = '';
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'link-button';
            linkElement.target = '_blank';
            linkElement.textContent = link.name;
            linkTreeElement.appendChild(linkElement);
        });
    }

    function renderInputs() {
        linkInputsElement.innerHTML = '';
        links.forEach((link, index) => {
            const inputWrapper = document.createElement('div');
            inputWrapper.className = 'input-wrapper';

            const nameLabel = document.createElement('label');
            nameLabel.textContent = `Name ${index + 1}`;
            inputWrapper.appendChild(nameLabel);

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = link.name;
            nameInput.dataset.index = index;
            nameInput.className = 'name-input';
            inputWrapper.appendChild(nameInput);

            const urlLabel = document.createElement('label');
            urlLabel.textContent = `URL ${index + 1}`;
            inputWrapper.appendChild(urlLabel);

            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.value = link.url;
            urlInput.dataset.index = index;
            urlInput.className = 'url-input';
            inputWrapper.appendChild(urlInput);

            linkInputsElement.appendChild(inputWrapper);
        });
    }

    function addLink() {
        const newLink = { name: '', url: '' };
        links.push(newLink);
        renderInputs();
    }

    function saveLinks() {
        const nameInputs = document.querySelectorAll('.name-input');
        const urlInputs = document.querySelectorAll('.url-input');

        nameInputs.forEach(input => {
            const index = input.dataset.index;
            links[index].name = input.value;
        });

        urlInputs.forEach(input => {
            const index = input.dataset.index;
            links[index].url = input.value;
        });

        renderLinks();
    }

    function adminLogout() {
        sessionStorage.removeItem('isAdmin');
        adminSection.style.display = 'none';
        loadLinks(); // Refresh links to remove admin section
    }

    addLinkButton.addEventListener('click', addLink);
    saveLinksButton.addEventListener('click', saveLinks);
    adminLogoutButton.addEventListener('click', adminLogout);

    checkAdminLogin();
    loadLinks();
});
