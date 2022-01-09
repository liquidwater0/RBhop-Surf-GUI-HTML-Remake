export { playerList, yourStyle, yourPersonalBest };

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const playerListElement = document.getElementById("playerList");
const yourPlayer = document.querySelector("#playerList [data-your-player]");
const yourStyle = document.querySelector("#playerList [data-your-style]");
const yourPersonalBest = document.querySelector("#playerList [data-your-personal-best]");
const pingElements = document.querySelectorAll("[data-ping]");

document.addEventListener("keydown", function(event) {
    if (document.activeElement.tagName == "INPUT") return;

    if (event.key == "`") playerListElement.classList.add("player-list-open");
});

document.addEventListener("keyup", function(event) {
    if (document.activeElement.tagName == "INPUT") return;

    if (event.key == "`") playerListElement.classList.remove("player-list-open");
});

function playerList() {
    yourPlayer.textContent = localStorage.playerName_RBS_GUI_Remake || "Player 1";
    
    setInterval(update, 200);

    function update() {
        pingElements.forEach(function(pingElement) {
            pingElement.textContent = getRandomNumber(0, 1000);
        });
    }
}
