document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('directusToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('link-form');
    const tableBody = document.getElementById('links-table').querySelector('tbody');
    const cancelButton = document.getElementById('cancel-button');

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

            tableBody.innerHTML = ''; // Reset the table body

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
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Fehler beim Laden der Links:', error);
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

        form.reset();
        document.getElementById('link-id').value = '';
        cancelButton.style.display = 'none';
        fetchLinks();
    }

    form.addEventListener('submit', addLink);
    cancelButton.addEventListener('click', () => {
        form.reset();
        document.getElementById('link-id').value = '';
        cancelButton.style.display = 'none';
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
        cancelButton.style.display = 'inline-block';
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

    fetchLinks();
});
