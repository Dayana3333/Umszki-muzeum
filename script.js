const items = [
    { id: 0, cover: true, title: 'UMSZKI', sub: 'Múzeum', desc: 'Digitális Emlékkönyv' },
    { id: 1, title: 'Tükrös galvanométer', description: 'Dr. B. Lange cég • 1930-as évek' },
    { id: 2, title: 'Többfunkciós elektromos mérőműszer', description: 'Német gyártmány • 1930-as évek' },
    { id: 3, title: 'Működőképes stabil gőzgépmodell', description: 'Vizsgamunka • 1957-1958' },
    { id: 4, title: 'Precíziós laboratóriumi kétkarú mérleg', description: 'Zier Károly Budapest • 1930-as évek' }
];

const lp = document.getElementById('leftPage');
const rp = document.getElementById('rightPage');
const lc = document.getElementById('leftContent');
const rc = document.getElementById('rightContent');

let index = 0;
let isAnimating = false;

function getPageHTML(i) {
    const item = items[i];
    if (!item) return '<div class="empty"></div>';
    if (item.cover) {
        return `
            <div class="hard-cover">
                <div class="sub">UMSZKI</div>
                <h1>Múzeum</h1>
                <p>Digitális Emlékkönyv</p>
            </div>`;
    }
    return `
        <div class="number">${item.id}. MŰSZER</div>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <div class="corner"></div>`;
}

function render() {
    if (index === 0) {
        lc.innerHTML = '';
        lp.style.visibility = 'hidden'; // Hide left page on cover
        rc.innerHTML = getPageHTML(0);
        rp.classList.add('cover-page');
    } else {
        lp.style.visibility = 'visible';
        rp.classList.remove('cover-page');
        lc.innerHTML = getPageHTML(index);
        rc.innerHTML = getPageHTML(index + 1);
    }
}

function flip(direction) {
    if (isAnimating) return;
    
    // Boundary checks
    if (direction > 0 && index >= items.length - 1) return;
    if (direction < 0 && index <= 0) return;

    isAnimating = true;
    const movingPage = direction > 0 ? rp : lp;
    const turnAngle = direction > 0 ? -175 : 175;

    movingPage.style.zIndex = 100;
    movingPage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    movingPage.style.transformOrigin = direction > 0 ? 'left center' : 'right center';
    
    // Apply the 3D rotation
    movingPage.style.transform = `rotateY(${turnAngle}deg) scale(1.02)`;

    setTimeout(() => {
        // Logic for page skipping (0 to 1, then by 2s)
        if (direction > 0) {
            index = index === 0 ? 1 : index + 2;
        } else {
            index = index === 1 ? 0 : index - 2;
        }

        render();

        // Reset the page position instantly
        movingPage.style.transition = 'none';
        movingPage.style.transform = 'rotateY(0deg) scale(1)';
        movingPage.style.zIndex = '';
        
        // Force reflow
        movingPage.offsetHeight;
        isAnimating = false;
    }, 800);
}

// Controls
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') flip(1);
    if (e.key === 'ArrowLeft') flip(-1);
});

document.addEventListener('click', e => {
    if (e.clientX > window.innerWidth / 2) flip(1);
    else flip(-1);
});

// Initial load
render();