const apperSound = document.querySelector("#appear-sound");
const fastSound = document.querySelector("#fast-sound");
const selectThemeAudio = document.querySelector("#select-sound");
const hangmansLaugh = document.querySelector("#hangmans-laugh");
const correctGuessSound = document.querySelector("#correct-guess-sound");
const deathBellSound = document.querySelector("#death-bell-sound");
const gameOverVoice = document.querySelector("#game-over-voice");
const victorySound = document.querySelector("#victory-sound");
const youWinVoice = document.querySelector("#you-win-voice");

const main = document.querySelector("main");
const tieImage = document.querySelector("img[alt=forca]");
const headContainer = document.querySelector(".head");
const bodyContainer = document.querySelector(".body");
const leftArmContainer = document.querySelector(".left-arm");
const rightArmContainer = document.querySelector(".right-arm");
const leftLegContainer = document.querySelector(".left-leg");
const righttLegContainer = document.querySelector(".right-leg");

const cotainerStartGame = document.querySelector(".start-game");
const selectTheme = document.querySelector("#select-theme");
const spanMessage = document.querySelector(".message");
const startBtn = document.querySelector(".start-btn");

const chooseLetter = document.querySelector(".choose-letter");
const choiceBtn = document.querySelectorAll(".choice-btn");
const letterA = document.querySelector("#a");
const letterB = document.querySelector("#b");
const letterC = document.querySelector("#c");
const letterD = document.querySelector("#d");
const letterE = document.querySelector("#e");
const letterF = document.querySelector("#f");
const letterG = document.querySelector("#g");
const letterH = document.querySelector("#h");
const letterI = document.querySelector("#i");
const letterJ = document.querySelector("#j");
const letterK = document.querySelector("#k");
const letterL = document.querySelector("#l");
const letterM = document.querySelector("#m");
const letterN = document.querySelector("#n");
const letterO = document.querySelector("#o");
const letterP = document.querySelector("#p");
const letterQ = document.querySelector("#q");
const letterR = document.querySelector("#r");
const letterS = document.querySelector("#s");
const letterT = document.querySelector("#t");
const letterU = document.querySelector("#u");
const letterV = document.querySelector("#v");
const letterW = document.querySelector("#w");
const letterX = document.querySelector("#x");
const letterY = document.querySelector("#y");
const letterZ = document.querySelector("#z");
const letterÇ = document.querySelector("#ç");

const modalLoser = document.querySelector(".modal-loser");
const modalSpan = document.querySelectorAll(".modal-span");
const resetBtn = document.querySelectorAll(".reset-btn");
const modalWin = document.querySelector(".modal-win");

let random;
let countReset = 3;

function enableLetterButtonsDisableStartSelectButton() {
    startBtn.classList.replace("appear-fast", "disappear-fast");
    startBtn.setAttribute("disabled", "disabled");
    chooseLetter.classList.replace("disappear", "appear");

    selectTheme.setAttribute("disabled", "disabled");
    selectTheme.classList.add("cursor-cancel-allowed");
    selectTheme.classList.remove("cursor-chalk");
}

function randomlyPick() {
    if (selectTheme.value === "animals") {
        random = animals[parseInt(Math.random() * animals.length)];

    } else if (selectTheme.value === "countries") {
        random = countries[parseInt(Math.random() * countries.length)];

    } else if (selectTheme.value === "fruits") {
        random = fruits[parseInt(Math.random() * fruits.length)];

    } else if (selectTheme.value === "objects") {
        random = objects[parseInt(Math.random() * objects.length)];

    }

    console.log(random);
    return random;
}

function createDashes() {
    const wordContainer = document.createElement("div");
    wordContainer.classList.add("word");

    main.insertBefore(wordContainer, cotainerStartGame);

    for (const letter of random) {
        const spanLetter = document.createElement("span");
        spanLetter.classList.add("span-letter");
        spanLetter.textContent = "_";
        wordContainer.appendChild(spanLetter);
    }
}

function checkGuess(guess) {
    const spanLetter = document.querySelectorAll(".span-letter");
    let correctGuess = false;
    let haveDashes = false;

    guess.classList.add("chosen");
    guess.classList.add("cursor-cancel-allowed");
    guess.classList.remove("cursor-chalk");
    guess.setAttribute("disabled", "disabled");

    for (let i = 0; i < random.length; i++) {
        if (guess.textContent === random[i]) {
            spanLetter[i].textContent = guess.textContent;
            correctGuess = true;

            selectThemeAudio.play();
            setTimeout(() => {
                correctGuessSound.play();
            }, 900);
        }
    }

    if (!correctGuess) {
        tieImage.src = "./assets/no-tie.png";

        selectThemeAudio.play();
        setTimeout(() => {
            hangmansLaugh.play();
        }, 900);

        if (headContainer.classList.contains("disappear")) {
            headContainer.classList.replace("disappear", "appear");
            return;

        } else if (headContainer.classList.contains("disappear")) {
            headContainer.classList.replace("disappear", "appear");
            return;

        } else if (bodyContainer.classList.contains("disappear")) {
            bodyContainer.classList.replace("disappear", "appear");
            return;

        } else if (leftArmContainer.classList.contains("disappear")) {
            leftArmContainer.classList.replace("disappear", "appear");
            return;

        } else if (rightArmContainer.classList.contains("disappear")) {
            rightArmContainer.classList.replace("disappear", "appear");
            return;

        } else if (leftLegContainer.classList.contains("disappear")) {
            leftLegContainer.classList.replace("disappear", "appear");
            return;

        } else {
            righttLegContainer.classList.replace("disappear", "appear");
            disableAllChoiceBtns();
            finalResult("lose")

            return;
        }
    } else {
        for (const span of spanLetter) {
            if (span.textContent === "_") {
                haveDashes = true;
            }
        }
    }

    if (!haveDashes) {
        disableAllChoiceBtns();
        finalResult("win");
    }
}

function disableAllChoiceBtns() {
    for (const btn of choiceBtn) {
        btn.classList.remove("chosen");
        btn.classList.add("cursor-chalk");
        btn.classList.remove("cursor-cancel-allowed");
        btn.setAttribute("disabled", "disabled");
    }
}

function finalResult(result) {

    if (result === "win") {
        for (const span of modalSpan) {
            span.textContent = random;
        }

        setTimeout(() => {
            modalWin.style.visibility = "visible";

            youWinVoice.play();
            youWinVoice.addEventListener("ended", () => {
                victorySound.play();
            });
        }, 2000);

        resetBtn[1].removeAttribute("disabled");
    } else {
        for (const span of modalSpan) {
            span.textContent = random;
        }

        setTimeout(() => {
            modalLoser.style.visibility = "visible";

            deathBellSound.play();
            deathBellSound.addEventListener("ended", () => {
                gameOverVoice.play();
            });
        }, 2000);

        resetBtn[0].removeAttribute("disabled");
    }
}

function resetGame() {
    startBtn.classList.replace("disappear-fast", "appear-fast");
    startBtn.removeAttribute("disabled");
    chooseLetter.classList.replace("appear", "disappear");

    selectTheme.removeAttribute("disabled");
    selectTheme.classList.add("cursor-chalk");
    selectTheme.classList.remove("cursor-cancel-allowed");
    selectTheme.value = "";

    tieImage.src = "./assets/tie.png";
    headContainer.classList.replace("appear", "disappear");
    bodyContainer.classList.replace("appear", "disappear");
    leftArmContainer.classList.replace("appear", "disappear");
    rightArmContainer.classList.replace("appear", "disappear");
    leftLegContainer.classList.replace("appear", "disappear");
    righttLegContainer.classList.replace("appear", "disappear");

    const wordContainer = document.querySelector(".word");
    main.removeChild(wordContainer);

    for (const btn of choiceBtn) {
        btn.removeAttribute("disabled");
    }

    random = "";
}

selectTheme.addEventListener("change", () => {
    if (selectTheme.value === "animals") {
        selectTheme.style.color = "#32cd32";
        selectThemeAudio.play();

    } else if (selectTheme.value === "countries") {
        selectTheme.style.color = "#8a2be2";
        selectThemeAudio.play();

    } else if (selectTheme.value === "fruits") {
        selectTheme.style.color = "#dc143c";
        selectThemeAudio.play();

    } else if (selectTheme.value === "objects") {
        selectTheme.style.color = "#ff8c00";
        selectThemeAudio.play();

    } else {
        selectTheme.style.color = "#f08080";
        selectThemeAudio.play();

    }
});

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    spanMessage.textContent = "";

    if (!selectTheme.value) {
        spanMessage.textContent = "Escolha um tema";
        fastSound.play();
    } else {
        apperSound.play();

        enableLetterButtonsDisableStartSelectButton();
        randomlyPick();
        createDashes();
    }
});

letterA.addEventListener("click", () => {
    checkGuess(letterA);
});

letterB.addEventListener("click", () => {
    checkGuess(letterB);
});

letterC.addEventListener("click", () => {
    checkGuess(letterC);
});

letterD.addEventListener("click", () => {
    checkGuess(letterD);
});

letterE.addEventListener("click", () => {
    checkGuess(letterE);
});

letterF.addEventListener("click", () => {
    checkGuess(letterF);
});

letterG.addEventListener("click", () => {
    checkGuess(letterG);
});

letterH.addEventListener("click", () => {
    checkGuess(letterH);
});

letterI.addEventListener("click", () => {
    checkGuess(letterI);
});

letterJ.addEventListener("click", () => {
    checkGuess(letterJ);
});

letterK.addEventListener("click", () => {
    checkGuess(letterK);
});

letterL.addEventListener("click", () => {
    checkGuess(letterL);
});

letterM.addEventListener("click", () => {
    checkGuess(letterM);
});

letterN.addEventListener("click", () => {
    checkGuess(letterN);
});

letterO.addEventListener("click", () => {
    checkGuess(letterO);
});

letterP.addEventListener("click", () => {
    checkGuess(letterP);
});

letterQ.addEventListener("click", () => {
    checkGuess(letterQ);
});

letterR.addEventListener("click", () => {
    checkGuess(letterR);
});

letterS.addEventListener("click", () => {
    checkGuess(letterS);
});

letterT.addEventListener("click", () => {
    checkGuess(letterT);
});

letterU.addEventListener("click", () => {
    checkGuess(letterU);
});

letterV.addEventListener("click", () => {
    checkGuess(letterV);
});

letterW.addEventListener("click", () => {
    checkGuess(letterW);
});

letterX.addEventListener("click", () => {
    checkGuess(letterX);
});

letterY.addEventListener("click", () => {
    checkGuess(letterY);
});

letterZ.addEventListener("click", () => {
    checkGuess(letterZ);
});

letterÇ.addEventListener("click", () => {
    checkGuess(letterÇ);
});

resetBtn[0].addEventListener("click", () => {
    setTimeout(() => {
        modalLoser.style.visibility = "hidden";
    }, 4000);

    const reading = setInterval(() => {
        resetBtn[0].textContent = countReset;
        countReset--;

        if (countReset < 0) {
            resetBtn[0].textContent = "JOGAR NOVAMENTE";
            countReset = 3;
            clearInterval(reading);
        }

    }, 1000);

    resetBtn[0].setAttribute("disabled", "disabled");
    resetGame();
});

resetBtn[1].addEventListener("click", () => {
    setTimeout(() => {
        modalWin.style.visibility = "hidden";
    }, 4000);

    const reading = setInterval(() => {
        resetBtn[1].textContent = `${countReset}`;

        countReset--;

        if (countReset < 0) {
            resetBtn[1].textContent = "JOGAR NOVAMENTE";
            countReset = 3;
            clearInterval(reading);
        }

    }, 1000);

    resetBtn[1].setAttribute("disabled", "disabled");
    resetGame();
});