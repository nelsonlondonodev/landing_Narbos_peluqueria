export class Breadcrumbs {
    constructor(items) {
        this.items = items;
    }

    render() {
        const listItems = this.items.map((item, index) => {
            const isLast = index === this.items.length - 1;
            
            if (isLast) {
                return `
                    <li>
                        <span class="text-gray-800 font-semibold" aria-current="page">${item.label}</span>
                    </li>
                `;
            }

            return `
                <li class="flex items-center">
                    <a href="${item.link}" class="hover:text-brand-green transition-colors">${item.label}</a>
                    <svg class="w-3 h-3 mx-3" aria-hidden="true" style="width: 12px; height: 12px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </li>
            `;
        }).join('');

        return `
            <nav aria-label="Breadcrumb" class="bg-gray-100 py-3 px-6 relative z-10 pt-24 md:pt-32">
                <div class="container mx-auto max-w-screen-xl">
                    <ol class="list-none p-0 inline-flex text-sm text-gray-600">
                        ${listItems}
                    </ol>
                </div>
            </nav>
        `;
    }
}
