document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('directusToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Tab-Navigation
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Entferne die aktive Klasse von allen Tabs und Inhalten
            document.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Setze die aktive Klasse für den angeklickten Tab
            this.classList.add('active');
            const contentId = this.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Setze den ersten Tab und Inhalt als aktiv
    document.querySelector('.tab-link').classList.add('active');
    document.querySelector('.tab-content').classList.add('active');

    const linkForm = document.getElementById('link-form');
    const linkTableBody = document.getElementById('links-table').querySelector('tbody');
    const cancelLinkButton = document.getElementById('cancel-button');

    const userForm = document.getElementById('user-form');
    const userTableBody = document.getElementById('users-table').querySelector('tbody');
    const cancelUserButton = document.getElementById('cancel-user-button');

    async function fetchLinks() {
        try {
            const response = await fetch('https://directus-1.nekozdevteam.eu/items/links', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            linkTableBody.innerHTML = ''; // Reset the table body

            if (!data.data || data.data.length === 0) {
                throw new Error('Keine Daten gefunden');
            }

            data.data.forEach(link => {
                console.log('Verarbeite Link:', link);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${link.title}</td>
                    <td><a href="${link.url}" target="_blank">${link.url}</a></td>
                    <td>
                        <button onclick="editLink(${link.id})">Bearbeiten</button>
                        <button onclick="deleteLink(${link.id})">Löschen</button>
                    </td>
                `;
                linkTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Fehler beim Laden der Links:', error);
        }
    }

    async function fetchUsers() {
        try {
            const response = await fetch('https://directus-1.nekozdevteam.eu/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('User API Response:', data);

            userTableBody.innerHTML = ''; // Reset the table body

            if (!data.data || data.data.length === 0) {
                throw new Error('Keine Benutzer gefunden');
            }

            data.data.forEach(user => {
                console.log('Verarbeite Benutzer:', user);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.first_name || ''} ${user.last_name || ''}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Bearbeiten</button>
                        <button onclick="deleteUser(${user.id})">Löschen</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Fehler beim Laden der Benutzer:', error);
        }
    }

    async function addLink(event) {
        event.preventDefault();

        const id = document.getElementById('link-id').value;
        const title = document.getElementById('title').value;
        const url = document.getElementById('url').value;

        const requestOptions = {
            method: id ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, url })
        };

        let endpoint = 'https://directus-1.nekozdevteam.eu/items/links';
        if (id) {
            endpoint += `/${id}`;
        }

        await fetch(endpoint, requestOptions);

        linkForm.reset();
        document.getElementById('link-id').value = '';
        cancelLinkButton.style.display = 'none';
        fetchLinks();
    }

    async function addUser(event) {
        event.preventDefault();

        const id = document.getElementById('user-id').value;
        const name = document.getElementById('user-name').value.split(' ');
        const firstName = name[0];
        const lastName = name.slice(1).join(' ');
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;

        const requestOptions = {
            method: id ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
        };

        let endpoint = 'https://directus-1.nekozdevteam.eu/users';
        if (id) {
            endpoint += `/${id}`;
        }

        await fetch(endpoint, requestOptions);

        userForm.reset();
        document.getElementById('user-id').value = '';
        cancelUserButton.style.display = 'none';
        fetchUsers();
    }

    linkForm.addEventListener('submit', addLink);
    cancelLinkButton.addEventListener('click', () => {
        linkForm.reset();
        document.getElementById('link-id').value = '';
        cancelLinkButton.style.display = 'none';
    });

    userForm.addEventListener('submit', addUser);
    cancelUserButton.addEventListener('click', () => {
        userForm.reset();
        document.getElementById('user-id').value = '';
        cancelUserButton.style.display = 'none';
    });

    window.editLink = async (id) => {
        const response = await fetch(`https://directus-1.nekozdevteam.eu/items/links/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const link = await response.json();

        document.getElementById('link-id').value = id;
        document.getElementById('title').value = link.data.title;
        document.getElementById('url').value = link.data.url;
        cancelLinkButton.style.display = 'inline-block';
    };

    window.deleteLink = async (id) => {
        if (confirm('Möchten Sie diesen Link wirklich löschen?')) {
            await fetch(`https://directus-1.nekozdevteam.eu/items/links/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchLinks();
        }
    };

    window.editUser = async (id) => {
        const response = await fetch(`https://directus-1.nekozdevteam.eu/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const user = await response.json();

        document.getElementById('user-id').value = id;
        document.getElementById('user-name').value = `${user.data.first_name} ${user.data.last_name}`;
        document.getElementById('user-email').value = user.data.email;
        cancelUserButton.style.display = 'inline-block';
    };

    window.deleteUser = async (id) => {
        if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
            try {
                const response = await fetch(`https://directus-1.nekozdevteam.eu/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Benutzer gelöscht:', id);
                fetchUsers();
            } catch (error) {
                console.error('Fehler beim Löschen des Benutzers:', error);
                alert('Fehler beim Löschen des Benutzers. Bitte überprüfen Sie die Konsole auf Details.');
            }
        }
    };

    fetchLinks();
    fetchUsers();
});
