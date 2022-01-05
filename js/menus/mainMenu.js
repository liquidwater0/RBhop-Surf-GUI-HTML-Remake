import { activateMenu } from "../menus.js";
import { restart } from "../timer.js";
import { chatBox } from "../chat.js";

export function mainMenu() {
    const restartButton = document.querySelector("[data-action='restart']");
    restartButton.addEventListener("click", restart);

    let isOpen = false;

    document.addEventListener("keypress", function(event) {
        if (chatBox == document.activeElement) return;

        if (event.key == "m" || event.key == "M") activateMenu("mainMenu", isOpen);
        isOpen = !isOpen;
    });
}
