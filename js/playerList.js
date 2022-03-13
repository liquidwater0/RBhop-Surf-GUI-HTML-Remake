export { playerList, yourStyle, yourPersonalBest };

import { settings } from "./menus/settingsMenu.js";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const playerListElement = document.getElementById("playerList");
const pingElements = document.querySelectorAll("[data-ping]");

const yourPlayer = document.querySelector("#playerList [data-your-player]");
const yourStyle = document.querySelector("#playerList [data-your-style]");
const yourPersonalBest = document.querySelector("#playerList [data-your-personal-best]");

document.addEventListener("keydown", event => {
    if (document.activeElement.tagName == "INPUT") return;

    if (event.key == "Tab") {
        event.preventDefault();
        playerListElement.classList.add("player-list-expanded");
    }
});

document.addEventListener("keyup", event => {
    if (document.activeElement.tagName == "INPUT") return;
    
    if (event.key == "Tab") {
        event.preventDefault();
        playerListElement.classList.remove("player-list-expanded");
    }
});

function playerList() {
    yourPlayer.textContent = settings.playerName || "Player 1";
    
    setInterval(update, 200);

    function update() {
        pingElements.forEach(pingElement => pingElement.textContent = getRandomNumber(0, 1000));
    }
}
