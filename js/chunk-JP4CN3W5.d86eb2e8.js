function h(e,t,a={}){let s={"featured-video":"col-span-1 row-span-2 md:col-span-2 md:row-span-2",vertical:"col-span-1 row-span-2 md:col-span-1 md:row-span-2",horizontal:"col-span-2 md:col-span-2",square:"col-span-1"},i=s[e.layout]||s.square,o="";e.type==="video"?o=`
            <div class="video-container relative w-full h-full cursor-pointer group/video" onclick="this.innerHTML = '<video autoplay controls playsinline class='w-full h-full object-cover'><source src='${e.src}' type='video/mp4'></video>'">
                <img src="${e.poster}" alt="${e.alt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/30 transition-colors">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover/video:scale-110 transition-transform duration-300">
                        <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            </div>
        `:e.type==="logo-card"?o=`
            <div class="w-full h-full bg-stone-900 flex items-center justify-center p-8 group-hover:bg-stone-800 transition-colors duration-500">
                <img src="${e.src}" alt="${e.alt}" class="w-2/3 h-2/3 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        `:o=`
            <img src="${e.src}" alt="${e.alt}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        `;let n=e.subImages&&e.subImages.length>0,p=`gallery-${(e.title||"item").replace(/[^a-zA-Z0-9]/g,"-").toLowerCase()}-${t}`,l=a.isolateItems||n?p:"bento-gallery",r="";return n&&(r=e.subImages.map(d=>`
            <a href="javascript:void(0);" data-href="${d.src}" class="glightbox hidden" data-gallery="${l}" data-type="image" aria-label="${d.alt||""}"></a>
        `).join("")),`
        <div class="${i} relative group overflow-hidden rounded-2xl shadow-lg">
            ${o}
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
                <div>
                    ${e.title?`<p class="text-white font-serif font-bold text-sm md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${e.title}</p>`:""}
                    ${e.subtitle?`<p class="text-gray-200 text-xs md:text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${e.subtitle}</p>`:""}
                </div>
            </div>
             <!-- Lightbox Trigger -->
            <a href="javascript:void(0);" data-href="${e.src}" class="glightbox absolute inset-0 z-10" data-gallery="${l}" data-type="${e.type==="video"?"video":"image"}" aria-label="${e.alt}"></a>
            ${r}
        </div>
    `}function g(e,t={}){return!e||e.length===0?"":`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[250px]" data-animation="fadeInUp" data-animation-delay="0.2s">
            ${e.map((s,i)=>h(s,i,t)).join("")}
        </div>
    `}var c=class{constructor(t){if(this.services=t,this.modal=document.getElementById("service-modal"),!this.modal){console.warn("ServiceModal: Modal element not found in DOM");return}this.refs={backdrop:document.getElementById("modal-backdrop"),panel:document.getElementById("modal-panel"),scrollContainer:document.getElementById("modal-scroll-container"),closeBtn:document.getElementById("close-modal-btn"),title:document.getElementById("modal-title"),image:document.getElementById("modal-image"),duration:document.getElementById("modal-duration"),price:document.getElementById("modal-price"),desc:document.getElementById("modal-description"),whatsappBtn:document.getElementById("modal-whatsapp-btn")},this.init()}init(){this.bindEvents(),window.openServiceModal=t=>this.open(t)}bindEvents(){this.refs.closeBtn&&this.refs.closeBtn.addEventListener("click",()=>this.close()),this.refs.scrollContainer&&this.refs.scrollContainer.addEventListener("click",t=>this.handleOutsideClick(t)),document.addEventListener("keydown",t=>{t.key==="Escape"&&!this.modal.classList.contains("hidden")&&this.close()})}open(t){let a=this.services.find(s=>s.id===t);a&&(this.updateContent(a),this.show())}updateContent(t){if(this.refs.title&&(this.refs.title.textContent=t.title),this.refs.image&&(this.refs.image.src=t.image),this.refs.duration&&(this.refs.duration.textContent=t.duration),this.refs.price&&(this.refs.price.textContent=t.price),this.refs.desc&&(this.refs.desc.innerHTML=t.description.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")),this.refs.whatsappBtn){let a=encodeURIComponent(`Hola, quisiera agendar una cita para ${t.title}`),s="573123462618";this.refs.whatsappBtn.href=`https://wa.me/${s}?text=${a}`}}show(){this.modal.classList.remove("hidden"),this.lockScroll(),requestAnimationFrame(()=>{this.refs.backdrop&&this.refs.backdrop.classList.remove("opacity-0"),this.refs.panel&&(this.refs.panel.classList.remove("opacity-0","scale-95"),this.refs.panel.classList.add("opacity-100","scale-100"))})}close(){this.refs.backdrop&&this.refs.backdrop.classList.add("opacity-0"),this.refs.panel&&(this.refs.panel.classList.remove("opacity-100","scale-100"),this.refs.panel.classList.add("opacity-0","scale-95")),setTimeout(()=>{this.modal.classList.add("hidden"),this.unlockScroll()},300)}handleOutsideClick(t){(t.target===this.refs.scrollContainer||t.target.parentElement===this.refs.scrollContainer&&!t.target.closest("#modal-panel"))&&this.close()}lockScroll(){let t=window.innerWidth-document.documentElement.clientWidth;document.body.style.overflow="hidden",t>0&&(document.body.style.paddingRight=`${t}px`)}unlockScroll(){document.body.style.overflow="",document.body.style.paddingRight=""}};export{g as a,c as b};
