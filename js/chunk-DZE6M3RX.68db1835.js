var s=class{constructor(t,n=[]){this.container=document.getElementById(t),this.brands=n}render(){if(!this.container||!this.brands||this.brands.length===0)return;let t="",n=a=>`
            <div class="brands-item group cursor-default select-none">
                <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-brand-green transition-colors duration-300 whitespace-nowrap">${a.name}</span>
                <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1 text-center">${a.sub}</span>
            </div>
        `,e=Array(12).fill(this.brands).flat().map(n).join("");this.container.innerHTML=`
            ${t}
            <section class="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <div class="container mx-auto px-6 text-center">
                    <p class="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-8 font-sans" data-animation="fadeInUp">Confianza Premium</p>
                    
                    <div class="brands-slider" data-animation="fadeInUp" data-animation-delay="0.1s">
                        <div class="brands-track">
                            ${e}
                        </div>
                    </div>
                </div>
            </section>
        `,document.fonts.ready.then(()=>{this.startAnimation()})}startAnimation(){let t=this.container.querySelector(".brands-track");if(!t)return;let n=t.children,e=this.brands.length,a=0;for(let r=0;r<e;r++)n[r]&&(a+=n[r].offsetWidth);t.animate([{transform:"translateX(0)"},{transform:`translateX(-${a}px)`}],{duration:e*6e3,iterations:1/0,easing:"linear"})}};export{s as a};
