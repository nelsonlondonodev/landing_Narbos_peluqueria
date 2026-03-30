import { ArticleCard } from '../components/ArticleCard.js';
import articles from '../data/articles.js';

export class BlogController {
    constructor(appRoot) {
        this.appRoot = appRoot || '';
        this.init();
    }

    init() {
        const grid = document.getElementById('articles-grid');
        if (!grid) return;

        // Si ya tiene artículos adentro (SSG o inyectados), no hacemos nada
        if (grid.children.length > 0) return;

        // Limpiamos el grid en caso de comentarios HTML u otros elementos invisibles
        grid.innerHTML = '';

        if (articles && articles.length > 0) {
            const sortedArticles = [...articles].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
            sortedArticles.forEach(data => {
                const processedData = {
                    ...data,
                    link: data.link.startsWith('http') ? data.link : this.resolvePath(data.link),
                    image: data.image.startsWith('http') ? data.image : this.resolvePath(data.image)
                };
                const card = new ArticleCard(processedData);
                grid.appendChild(card.render());
            });
        }
    }

    resolvePath(path) {
        if (!path) return '';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return new URL(cleanPath, this.appRoot).href;
    }
}
