export class FAQAccordion {
    /**
     * @param {string} selector - CSS selector for the FAQ container (e.g., '#faq' or '.faq-section')
     */
    constructor(selector = '#faq') {
        this.container = document.querySelector(selector);
        this.init();
    }

    init() {
        if (!this.container) return;

        this.detailsElements = this.container.querySelectorAll('details');
        if (!this.detailsElements.length) return;

        this.detailsElements.forEach(details => {
            const summary = details.querySelector('summary');
            const content = details.querySelector('.faq-content');

            if (!summary || !content) return;

            summary.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default browser toggle
                if (details.hasAttribute('open')) {
                    this.close(details, content);
                } else {
                    this.open(details, content);
                }
            });
        });
    }

    open(details, content) {
        // Close others first (Accordion behavior)
        this.detailsElements.forEach(otherDetails => {
            if (otherDetails !== details && otherDetails.hasAttribute('open')) {
                const otherContent = otherDetails.querySelector('.faq-content');
                if (otherContent) this.close(otherDetails, otherContent);
            }
        });

        details.setAttribute('open', '');
        
        // Animation
        const startHeight = 0;
        const endHeight = content.scrollHeight;

        const animation = content.animate(
            [
                { height: `${startHeight}px`, opacity: 0 },
                { height: `${endHeight}px`, opacity: 1 }
            ],
            {
                duration: 300,
                easing: 'ease-out'
            }
        );

        animation.onfinish = () => {
            // Optional cleanup
        };
    }

    close(details, content) {
        const startHeight = content.scrollHeight;
        const endHeight = 0;

        const animation = content.animate(
            [
                { height: `${startHeight}px`, opacity: 1 },
                { height: `${endHeight}px`, opacity: 0 }
            ],
            {
                duration: 300,
                easing: 'ease-in'
            }
        );

        animation.onfinish = () => {
            details.removeAttribute('open');
        };
    }
}
