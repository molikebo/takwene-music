document.addEventListener("DOMContentLoaded", () => {
    const artistDetailsContainer = document.getElementById("artist-details-content");

    // Get the artist's ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('artist');

    // A map of artist IDs to their YouTube channels
    const artistChannels = {
        'connan': 'https://www.youtube.com/@connanofficial',
        'veto': 'https://www.youtube.com/@vetoofficial10',
        'dj-totti': 'https://www.youtube.com/@DjTotti',
        'mc-mego': 'https://www.youtube.com/@MCMEGO',
        'wave': 'https://www.youtube.com/channel/UCOqj1Robs8AZT1Dxu6JGMGw'
    };

    if (artistId) {
        loadArtistDetails(artistId);
    } else {
        artistDetailsContainer.innerHTML = "<p>لم يتم تحديد فنان.</p>";
    }

    // Function to fetch and display artist details
    async function loadArtistDetails(id) {
        try {
            // Fetch the markdown file for the artist
            const response = await fetch(`data/artists/${id}.md`);
            if (!response.ok) {
                throw new Error('Artist not found');
            }
            const markdown = await response.text();

            // Simple markdown parsing (can be improved with a library)
            const artistName = id.replace(/-/g, ' ');
            const bio = markdown.split('---').pop().trim(); // Get content after ---
            const youtubeChannel = artistChannels[id] || '#'; // Get channel or a fallback

            // Construct the HTML
            artistDetailsContainer.innerHTML = `
                <img src="images/artists/${id}.webp" alt="${artistName}" class="artist-image">
                <h2>${artistName}</h2>
                <h3>النبذة الذاتية</h3>
                <p>${bio.replace(/\n/g, '<br>')}</p>
                <h3>الإصدارات</h3>
                <a href="${youtubeChannel}" target="_blank" class="button">عرض كل الإصدارات على يوتيوب</a>
                <h3>مقالات ذات صلة</h3>
                <a href="article-details.html?id=${id}&type=artist" class="button">اقرأ المقال عن ${artistName}</a>
            `;
        } catch (error) {
            console.error("Error loading artist details:", error);
            artistDetailsContainer.innerHTML = "<p>لا يمكن العثور على تفاصيل الفنان.</p>";
        }
    }
});