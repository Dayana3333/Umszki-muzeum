const items = [
{id:1,title:'Tükrös galvanométer',description:'Dr. B. Lange cég • 1930-as évek'},
{id:2,title:'Többfunkciós elektromos mérőműszer',description:'Német gyártmány • 1930-as évek'},
{id:3,title:'Működőképes stabil gőzgépmodell',description:'Vizsgamunka • 1957-1958'},
{id:4,title:'Precíziós laboratóriumi kétkarú mérleg',description:'Zier Károly Budapest • 1930-as évek'},
{id:5,title:'Katódsugárcső',description:'1960-as évek'},
{id:6,title:'Univeka szervizműszer',description:'Hazai gyártmány • 1960'},
{id:7, title: 'Vákuumcső', description: 'Néhány megmaradt iskolai műhelygyakorlaton gyártott rádiócső '},
{id:8, title: 'Műszer katódsugárcső', description: '1960-as évek'},
{id:9, title: 'Univeka', description: 'hordozható szervizműszer hazai gyártmány, 1960'},
{id:10, title: 'Unavo', description: 'laboratóriumi csővoltmérő'},
];

const leftContent = document.getElementById('leftContent');
const rightContent = document.getElementById('rightContent');

const flipFront = document.getElementById('flipFront');
const flipBack = document.getElementById('flipBack');

const flipPage = document.getElementById('flipPage');

const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');

const cover = document.getElementById('cover');

let spread = 0;
let animating = false;
let opened = false;

const maxSpread = Math.ceil(items.length / 2);

function createPage(item){

if(!item){
return `<div class="empty"></div>`;
}

return `
<div class="page-art"></div>

<div class="number">
${item.id}. MŰSZER
</div>

<h2>${item.title}</h2>

<p>${item.description}</p>

<div class="corner"></div>
`;
}

function render(){

const leftItem = items[spread * 2];
const rightItem = items[spread * 2 + 1];

leftContent.innerHTML = createPage(leftItem);
rightContent.innerHTML = createPage(rightItem);
}

function openBook(){

if(opened || animating) return;

animating = true;

cover.classList.add('open');

setTimeout(() => {

opened = true;
animating = false;

}, 1800);
}

function nextSpread(){

if(animating) return;

if(!opened){

openBook();
return;
}

const next = spread + 1;

if(next >= maxSpread) return;

animating = true;

const currentRight = items[spread * 2 + 1];
const nextLeft = items[next * 2];

flipFront.innerHTML = createPage(currentRight);
flipBack.innerHTML = createPage(nextLeft);

flipPage.classList.remove('flip-left');
void flipPage.offsetWidth;

flipPage.classList.add('flip-right');

spread = next;

render();

setTimeout(() => {

flipPage.classList.remove('flip-right');

animating = false;

}, 1800);
}

function prevSpread(){

if(animating) return;
if(spread <= 0) return;

animating = true;

const prev = spread - 1;

const currentLeft = items[spread * 2];
const prevRight = items[prev * 2 + 1];

flipFront.innerHTML = createPage(currentLeft);
flipBack.innerHTML = createPage(prevRight);

flipPage.classList.remove('flip-right');
void flipPage.offsetWidth;

flipPage.classList.add('flip-left');

spread = prev;

render();

setTimeout(() => {

flipPage.classList.remove('flip-left');

animating = false;

}, 1800);
}

/* CLICK TURNING */

rightPage.addEventListener('click', () => {
nextSpread();
});

leftPage.addEventListener('click', () => {
prevSpread();
});

/* KEYBOARD */

document.addEventListener('keydown', (e) => {

if(e.key === 'ArrowRight'){
e.preventDefault();
nextSpread();
}

if(e.key === 'ArrowLeft'){
e.preventDefault();
prevSpread();
}

});

render();
