import { restart } from "./timer.js";
import { activateMenu } from "./menus.js";
import { settings, saveSettings, updateAutoRestart, autoRestart } from "./menus/settingsMenu.js";

export const commands = [
    {
        name: "Restart",
        description: "Restart the run.",
        aliases: ["r", "restart"],
        arguments: null,
        activateCommand: () => restart()
    }, {
        name: "Styles",
        description: "Open the styles menu.",
        aliases: ["style", "styles"],
        arguments: null,
        activateCommand: () => activateMenu("styles", true)
    }, {
        name: "Settings",
        description: "Open the settings menu.",
        aliases: ["settings"],
        arguments: null,
        activateCommand: () => activateMenu("settings", true)
    }, {
        name: "Name Change",
        description: "Open the name change menu.",
        aliases: ["name"],
        arguments: null,
        activateCommand: () => activateMenu("nameChange", true)
    }, {
        name: "Theme",
        description: "Change the theme.",
        aliases: ["theme"],
        arguments: ["dark", "light"],
        activateCommand: argument => {
            document.documentElement.setAttribute("data-theme", argument);
            settings.theme = argument;
            
            saveSettings();
        }
    }, {
        name: "Controls",
        description: "Open the controls menu.",
        aliases: ["controls"],
        arguments: null,
        activateCommand: () => activateMenu("controls", true)
    }, {
        name: "Auto Restart",
        description: "Open the styles menu.",
        aliases: ["autorestart", "ar"],
        optionalArgs: true,
        arguments: ["on", "off"],
        activateCommand: argument => {
            if (argument === "on") {
                settings.autoRestart = true;
            } else if (argument === "off") {
                settings.autoRestart = false;
            } else {
                updateAutoRestart();
                settings.autoRestart = autoRestart;
            }

            saveSettings();
        }
    }, {
        name: "Main Menu",
        description: "Open the main menu.",
        aliases: ["menu"],
        arguments: null,
        activateCommand: () => activateMenu("mainMenu", true)
    }, {
        name: "Showkeys",
        description: "Open showkeys.",
        aliases: ["showkeys"],
        arguments: null,
        activateCommand: () => {
            const showkeys = document.querySelector(".showkeys");
            showkeys.classList.toggle("active", showkeys.classList.active);
        }
    }
]
