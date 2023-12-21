const redBlock = document.querySelectorAll('.red-block')[0];
const inputImgs = document.querySelectorAll('.user-image-input');
const usernames = document.querySelectorAll('.username');
const clearBtn = document.querySelector('#clear-btn');
const mainBtn = document.querySelector('#main-btn');
const counter = document.querySelector('#love-percentage');

inputImgs.forEach(inp => {
    inp.addEventListener('change', () => {
        const file = inp.files[0];
        const parent = inp.parentElement;
        let urlImg = 'var(--user-img)';
        if (file) {
            urlImg = `url(${URL.createObjectURL(file)})`;
        }
        parent.style.backgroundImage = urlImg;
    });
});

usernames.forEach(inp => {
    inp.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        loveCalculator();
    });
});

mainBtn.addEventListener('click', async () => {

    const percentage = loveCalculator();
    let counterNum = Number(counter.innerHTML.replace('%',''));

    for (let i = 0; i < 3; i++) {
        for (let j = counterNum; j <= 100; j++) {
            await delay(8);
            counter.innerHTML = `${j}%`;
            redBlock.style.top = `${100 - j}%`;
            if (i === 2 && percentage <= 49 && percentage === j) {
                return;
            }
        }
        for (let j = 100; j >= 0; j--) {
            await delay(8);
            counter.innerHTML = `${j}%`;
            redBlock.style.top = `${100 - j}%`;
            if (i === 2 && percentage >= 50 && percentage === j) {
                return;
            }
            counterNum = 0;
        }
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loveCalculator() {
    const number = Math.floor(Math.random() * 101);
    return number;
}