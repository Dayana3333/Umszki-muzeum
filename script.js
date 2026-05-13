const items = [
{id:3,title:'Működőképes stabil gőzgépmodell',description:'Vizsgamunka • 1957-1958'},
{id:4,title:'Precíziós laboratóriumi kétkarú mérleg',description:'Zier Károly Budapest • 1930-as évek'},
{id:5,title:'Katódsugárcső',description:'1960-as évek'},
{id:6,title:'Univeka szervizműszer',description:'Hazai gyártmány • 1960'},
{id:6,title:'Univeka szervizműszer',description:'Hazai gyártmány • 1960'},
{id:7, title: 'Vákuumcső', description: 'Néhány megmaradt iskolai műhelygyakorlaton gyártott rádiócső '},
{id:8, title: 'Műszer katódsugárcső', description: '1960-as évek'},
{id:9, title: 'Univeka', description: 'hordozható szervizműszer hazai gyártmány, 1960'},
{id:10, title: 'Unavo', description: 'laboratóriumi csővoltmérő'}
];

const left = document.getElementById('leftContent');
const right = document.getElementById('rightContent');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');

let spread = 0;
let animating = false;
const maxSpread = Math.ceil(items.length / 2);

function createPage(item){
if(!item) return '<div class="empty-page"></div>';
return `
<div class="page-art"></div>
<div class="number">${item.id}. MŰSZER</div>
<h2>${item.title}</h2>
<p>${item.description}</p>
<div class="corner"></div>`;
}

function render(){
const leftItem = items[spread * 2];
const rightItem = items[spread * 2 + 1];
left.innerHTML = createPage(leftItem);
right.innerHTML = createPage(rightItem);
}

function flip(page, direction, callback){
if(animating) return;
animating = true;

page.classList.remove('flipping-next','flipping-prev');
void page.offsetWidth;
page.classList.add(direction === 'next' ? 'flipping-next' : 'flipping-prev');

setTimeout(() => {
callback();
}, 700);

setTimeout(() => {
page.classList.remove('flipping-next','flipping-prev');
animating = false;
}, 1400);
}

function nextSpread(){
if(animating) return;
flip(rightPage,'next',() => {
spread = (spread + 1) % maxSpread;
render();
});
}

function prevSpread(){
if(animating) return;
flip(leftPage,'prev',() => {
spread = (spread - 1 + maxSpread) % maxSpread;
render();
});
}

window.nextSpread = nextSpread;
window.prevSpread = prevSpread;

document.addEventListener('keydown', (e) => {
if(animating) return;
if(e.code === 'Space' || e.key === 'ArrowRight') {
e.preventDefault();
nextSpread();
}
if(e.key === 'ArrowLeft') {
e.preventDefault();
prevSpread();
}
});

render();
