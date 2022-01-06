export { chat, messageList, sendNoticeMessage };
import { commandHandler } from "./commands.js";

/*<li>
    <span class="time">[5:00pm]</span>
    <span class="bracket">[</span><span class="notice">Notice</span><span class="bracket">]</span>
    Player 1 placed #10/1000000 in the style Autohop with a time of 42:64.057
</li>*/

let chatClosed = false;

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

setNameColor();

function setNameColor () {
    document.documentElement.style.setProperty("--nameColor", localStorage.nameColor || "rgb(0, 160, 255)");
}

function chat() {
    chatBox.addEventListener("keydown", function(event) { if (event.key == "Enter") sendMessage() });
    openCloseChatButton.addEventListener("click", openCloseChat);

    function sendMessage() {
        if (chatBox.value.trim() == "") return;

        messageList.insertAdjacentHTML("beforeend", `
            <li>
                <span class="time">[${getTime()}]</span>
                <span class="player">${localStorage.playerName || "Player 1"}:</span> 
                ${chatBox.value}
            </li>
        `);

        commandHandler(chatBox.value);
        chatBox.value = "";
    }
}

function openCloseChat() {
    const messageContainer = document.getElementById("messageContainer");

    chatClosed = !chatClosed;
    
    messageContainer.classList.toggle("chatClosed", chatClosed);
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
