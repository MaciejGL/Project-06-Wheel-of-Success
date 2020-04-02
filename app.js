const btnReset = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('.start');
const startOverlayH2 = document.querySelector('h2.title');
const startOverlayH3 = document.querySelector('h3');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const hearts = document.querySelectorAll('.tries');
let missed = 0;
let found = 0;
let wins = 0;
const phrases = ['Hit Below The Belt', 'On the Ropes', 'A Chip on Your Shoulder', 'Rain on Your Parade', 'Needle In a Haystack']
// let arrOfLetters;

//  Get letters to array

const getRandomPhraseAsArray = (arr) => {
    let randomNumber = Math.floor(Math.random() * phrases.length);
    const phrase = arr[randomNumber];
    let arrOfLetters = phrase.split('');
    return arrOfLetters
}


// Add letters to display

const addPhraseToDisplay = (arr) => {


    for (let i = 0; i < arr.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<li>${arr[i]}</li>`;
        document.getElementById('phrase').appendChild(listItem);
        if (arr[i] !== " ") {
            listItem.classList.add('letter')
        } else {
            listItem.classList.add('space')
        }
    }
}


// Check letters

const checkLetter = (value) => {
    const letters = document.querySelectorAll('.letter')
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i].textContent;
        if (value == letter.toLowerCase()) {
            letters[i].classList.add('show');
            match = value;
            found++
        }
    }
    return match
}


let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

qwerty.addEventListener('click', (e) => {
    let tag = e.target.tagName;
    const chosenLetter = e.target.textContent
    // console.log(tag)
    if (tag == 'BUTTON' && e.target.classList != "chosen") {
        e.target.classList.add('chosen');
        // console.log(chosenLetter)
        let checked = checkLetter(chosenLetter);
        console.log(checked)
        if (checked == null && missed < 5) {
            hearts[missed].innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`
            missed++
        }

    }
    checkWin()
})


// Check win

const checkWin = () => {
    const letters = document.querySelectorAll('.letter');
    const shown = document.querySelectorAll('.show');

    if (letters.length == shown.length) {
        if (startOverlay.classList.contains('lose')) {
            startOverlay.classList.remove('lose')
        }
        wins++
        startOverlay.classList.add('win');
        startOverlayH2.textContent = "You Win!!";
        startOverlayH3.textContent = `Total wins: ${wins}`;
        startOverlayH3.style.display = `block`;
        btnReset.textContent = "Another round?"
        startOverlay.style.top = 0;

    }

    if (missed > 4) {
        if (startOverlay.classList.contains('win')) {
            startOverlay.classList.remove('win')
        }
        startOverlayH3.style.display = 'none'
        startOverlay.classList.add('lose');
        startOverlayH2.textContent = "You lost... :(";
        btnReset.textContent = "Try Again!"
        startOverlay.style.top = 0;
    }
}






btnReset.addEventListener('click', () => {
    // document.querySelector('.start').style.display = 'none';
    if (startOverlay.classList.contains("win") || startOverlay.classList.contains("lose")) {

        // delete li
        document.querySelectorAll('#phrase li').forEach(letter => letter.remove())

        // remove class chosen in buttons
        document.querySelectorAll('button').forEach(button => button.classList.remove('chosen'))

        // Heart reset 
        document.querySelectorAll('.tries').forEach(heart => {
            heart.innerHTML = `<img src="images/liveHeart.png" height="35px" width="30px">`
        })

        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
        missed = 0;
    }
    startOverlay.style.top = '200%';
})