export function runThemeDebug() {
    console.group("🔍 Theme Debugger");
    
    // 1. Check HTML classes
    const html = document.documentElement;
    const htmlClasses = html.classList.toString();
    console.log(`HTML Classes: "${htmlClasses}" (Should NOT have 'dark' in Light Mode)`);
    
    // 2. Check Body
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    console.log(`Body BG: ${bodyBg}`);

    // 3. Check Video Container
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
        const videoBg = window.getComputedStyle(videoContainer).backgroundColor;
        console.log(`Video Container BG: ${videoBg}`);
        const videoClasses = videoContainer.className;
        console.log(`Video Container Classes: ${videoClasses}`);
    } else {
        console.warn("Video Container NOT found");
    }

    // 4. Check Contact Input (Sample)
    const contactInput = document.querySelector('#contact-form input');
    if (contactInput) {
        const inputBg = window.getComputedStyle(contactInput).backgroundColor;
        console.log(`Contact Input BG: ${inputBg}`);
    } else {
         console.warn("Contact Input NOT found");
    }
    
    // 5. Check Section Video Promo
    const videoSection = document.getElementById('video-promo');
    if (videoSection) {
        const sectionBg = window.getComputedStyle(videoSection).backgroundColor;
        console.log(`Video Promo Section BG: ${sectionBg}`);
    }

    console.groupEnd();
}
