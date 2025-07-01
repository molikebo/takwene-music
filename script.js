document.addEventListener("DOMContentLoaded", () => {
    const artistContainer = document.getElementById("artist-card-container");

    // Function to fetch artist data and render it
    async function loadArtists() {
        try {
            // Fetch the list of files from the data/artists directory
            const response = await fetch('data/artists/');
            const text = await response.text();
            
            // This is a simple way to parse the file listing from the http.server
            // It might need adjustment if the server format is different
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = Array.from(doc.querySelectorAll('a'));

            for (const link of links) {
                const fileName = link.getAttribute('href');
                if (fileName.endsWith('.md')) {
                    // Fetch the content of the markdown file
                    const fileResponse = await fetch(`data/artists/${fileName}`);
                    const fileContent = await fileResponse.text();
                    
                    // Extract the artist's name from the file name (by removing .md)
                    const artistName = fileName.replace('.md', '').replace(/-/g, ' ');

                    // Create the artist card
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <h3>${artistName}</h3>
                        <a href="artist.html?artist=${fileName.replace('.md', '')}" class="button">عرض التفاصيل</a>
                    `;
                    artistContainer.appendChild(card);
                }
            }
        } catch (error) {
            console.error("Error loading artists:", error);
            artistContainer.innerHTML = "<p>حدث خطأ أثناء تحميل الفنانين.</p>";
        }
    }

    loadArtists();
});