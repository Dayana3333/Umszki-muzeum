const items = [
    { id: 0, cover: true, title: 'UMSZKI', sub: 'Múzeum', desc: 'Digitális Emlékkönyv' },
    { id: 1, title: 'Tükrös galvanométer', description: 'Dr. B. Lange cég • 1930-as évek' },
    { id: 2, title: 'Többfunkciós elektromos mérőműszer', description: 'Német gyártmány • 1930-as évek' },
    { id: 3, title: 'Működőképes stabil gőzgépmodell', description: 'Vizsgamunka • 1957-1958' },
    { id: 4, title: 'Precíziós laboratóriumi kétkarú mérleg', description: 'Zier Károly Budapest • 1930-as évek' },
    { id: 5, title: 'Katódsugárcső', description: '1960-as évek' },
    { id: 6, title: 'Univeka szervizműszer', description: 'Hazai gyártmány • 1960' },
    { id: 7, title: 'Vákuumcső', description: 'Néhány megmaradt iskolai műhelygyakorlaton gyártott rádiócső' },
    { id: 8, title: 'Műszer katódsugárcső', description: '1960-as évek' },
    { id: 9, title: 'Univeka', description: 'hordozható szervizműszer hazai gyártmány, 1960' },
    { id: 10, title: 'Unavo', description: 'Laboratóriumi csővoltmérő' },
];

const lp = document.getElementById('leftPage');
const rp = document.getElementById('rightPage');
const lc = document.getElementById('leftContent');
const rc = document.getElementById('rightContent');
const urc=document.getElementById('underRightContent');

let index = 0;
let isAnimating = false;
const book=document.querySelector('.book');

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
book.classList.add('cover-mode');
        lc.innerHTML = '';
        rc.innerHTML = getPageHTML(0);
        rp.classList.add('cover-page');
    } else {
book.classList.remove('cover-mode');
        rp.classList.remove('cover-page');
        lc.innerHTML = getPageHTML(index);
        rc.innerHTML = getPageHTML(index + 1);
        urc.innerHTML = getPageHTML(index + 3);
    }
}

function flip(direction) {
    if (isAnimating) return;
    
    // Boundary checks
    if (direction > 0 && index >= items.length - 1) return;
    if (direction < 0 && index <= 0) return;

    isAnimating = true;
    const movingPage = direction > 0 ? rp : lp;
    const underRight=document.getElementById('underRightPage');
    const turnAngle = direction > 0 ? -175 : 175;

if(direction>0){
document.getElementById('underRightPage').style.visibility='visible';
} else {
underRight.style.visibility='visible';
underRight.querySelector('#underRightContent').innerHTML = getPageHTML(Math.max(0,index-2));
}
    movingPage.style.zIndex = 100;
    movingPage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    movingPage.style.transformOrigin = direction > 0 ? 'left center' : 'right center';
    movingPage.style.perspectiveOrigin = 'center center';
    
    // Pull page toward viewer so it flips OUTSIDE the book, not inside
    movingPage.style.transformStyle = 'preserve-3d';
    movingPage.style.backfaceVisibility = 'visible';
    movingPage.style.transform = direction > 0
      ? 'perspective(2600px) translateZ(18px) rotateY(-165deg) rotateX(-1.5deg) scale(0.98)'
      : 'perspective(2600px) translateZ(18px) rotateY(165deg) rotateX(1.5deg) scale(0.98)';

    setTimeout(() => {
        // Logic for page skipping (0 to 1, then by 2s)
        if (direction > 0) {
            index = index === 0 ? 1 : index + 2;
        } else {
            index = index === 1 ? 0 : index - 2;
        }

        render();
        underRight.style.visibility='hidden';

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