export { chat, messageList, sendNoticeMessage, sendTimerMessage };

import { commandHandler } from "./commandHandler.js";
import { settings } from "./menus/settingsMenu.js";

let chatClosed = false;

const chatContainer = document.getElementById("chat");
const chatBox = document.getElementById("chatBox");
const openCloseChatButton = document.getElementById("openCloseChatButton");
const messageList = document.querySelector("#chat ul");

function getTime() {
    return new Date().toLocaleString("en-us", 
        { 
            hour: "numeric", 
            minute: "2-digit", 
            hour12: true 
        });
}

function chat() {
    chatBox.addEventListener("keydown", event => { if (event.key == "Enter") sendMessage() });
    openCloseChatButton.addEventListener("click", openCloseChat);

    function sendMessage() {
        if (chatBox.value.trim() == "") return;

        messageList.insertAdjacentHTML("beforeend", `
            <li>
                <span class="time">[${getTime()}]</span>
                <span style="color: ${settings.nameColor || "#00a0ff"}" class="player">${settings.playerName || "Player 1"}:</span> 
                ${chatBox.value}
            </li>
        `);

        commandHandler(chatBox.value);
        chatBox.value = "";
    }
}

function openCloseChat() {
    chatClosed = !chatClosed;
    
    chatContainer.classList.toggle("chat-closed", chatClosed);
    openCloseChatButton.classList.toggle("rotate", chatClosed);
}

function sendNoticeMessage(message) {
    messageList.insertAdjacentHTML("beforeend", `
        <li>
            <span class="time">[${getTime()}]</span>
            <span class="bracket">[</span><span class="notice">Notice</span><span class="bracket">]</span>
            ${message}
        </li>
    `);
}

function sendTimerMessage(message) {
    messageList.insertAdjacentHTML("beforeend", `
        <li>
            <span class="time">[${getTime()}]</span>
            <span class="bracket">[</span><span class="timer">Timer</span><span class="bracket">]</span>
            ${message}
        </li>
    `);
}
