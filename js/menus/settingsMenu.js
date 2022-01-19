export { settingsMenu, updateAutoRestart, settings, autoRestart };
import { playerList } from "../playerList.js";
import { activateMenu } from "../menus.js";

let settings = localStorage.RBS_GUI_Remake ? JSON.parse(localStorage.RBS_GUI_Remake) : {};
let autoRestart = settings.autoRestart || false;

function updateAutoRestart() { autoRestart = !autoRestart };

function settingsMenu() {
    //Name and Color Changer
    const saveNameButton = document.getElementById("saveNameButton");
    const nameInput = document.getElementById("nameInput");
    const nameColor = document.getElementById("nameColor");

    nameInput.value = settings.playerName || "Player 1";
    nameColor.value = settings.nameColor || "#00a0ff";

    saveNameButton.addEventListener("click", saveName);    

    function saveName() {
        settings.playerName = nameInput.value;
        settings.nameColor = nameColor.value;

        localStorage.RBS_GUI_Remake = JSON.stringify(settings);
        
        playerList();
        activateMenu("nameChange", false);
    }

    //Theme Changer
    const changeThemeButton = document.querySelector("[data-action='changeTheme']");
    changeThemeButton.addEventListener("click", changeTheme);

    let isDarkTheme;

    setTheme();

    function setTheme() {
        document.documentElement.setAttribute("data-theme", settings.theme || "dark");
    }

    function changeTheme() {
        isDarkTheme = !settings.theme || settings.theme == "dark" ? true : false;
        isDarkTheme = !isDarkTheme;

        settings.theme = isDarkTheme ? "dark" : "light";
        localStorage.RBS_GUI_Remake = JSON.stringify(settings);

        setTheme();
    }
}
