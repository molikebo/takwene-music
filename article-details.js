document.addEventListener("DOMContentLoaded", () => {
    const articleContainer = document.getElementById("article-content");
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        loadArticle(articleId);
    } else {
        articleContainer.innerHTML = "<p>لم يتم تحديد مقال.</p>";
    }

    async function loadArticle(id) {
        try {
            const response = await fetch(`data/articles/${id}.txt`);
            if (!response.ok) throw new Error('Article not found');
            
            const text = await response.text();
            const [title, ...content] = text.split('---');
            const fullContent = content.join('---').trim();

            // Update SEO tags
            document.title = title.trim();
            document.querySelector('meta[name="description"]').setAttribute("content", fullContent.substring(0, 160));

            articleContainer.innerHTML = `
                <!-- Note: Image would go here if available -->
                <!-- <img src="images/articles/${id}.png" alt="${title.trim()}" class="article-image-full"> -->
                <h1>${title.trim()}</h1>
                <p>${fullContent.replace(/\n/g, '<br>')}</p>
            `;

        } catch (error) {
            console.error("Error loading article:", error);
            articleContainer.innerHTML = "<p>لا يمكن العثور على المقال.</p>";
        }
    }
});
