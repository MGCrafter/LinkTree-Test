document.addEventListener('DOMContentLoaded', function() {
  fetch('fetch_links.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var linktree = document.querySelector('.linktree');
      linktree.innerHTML = '';  // Vorhandene Links entfernen
      data.forEach(function(link) {
        var a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.className = 'link-button';
        a.target = '_blank';
        linktree.appendChild(a);
      });
    })
    .catch(function(error) {
      console.error('Error fetching links:', error);
    });
});
