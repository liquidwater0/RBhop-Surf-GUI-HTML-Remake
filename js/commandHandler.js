import { commands } from "./commands.js";
import { sendNoticeMessage } from "./chat.js";

export function commandHandler(message) {
    const prefixes = ["!", "/"];

    function checkPrefix(prefix) {
        return message[0] == prefix;
    }

    if (!prefixes.some(checkPrefix)) return;

    const messageParts = message.slice(1).split(" ");

    function checkCommand() {
        let commandObject = {};

        commands.forEach(command => {
            command.aliases.forEach(alias => {
                if (messageParts[0] === alias) commandObject.command = command;
            });

            if (command.arguments === null) return;

            command.arguments.forEach(argument => {
                if (messageParts[1] === argument) commandObject.correctArguments = true;
            });
        });

        return commandObject;
    }

    const correctCommand = checkCommand().command;

    if (!correctCommand) {
        sendNoticeMessage(`The command "${message}" does not exist.`);
        return;
    }

    //fix invalid arguments message for optional arguments
    if (correctCommand.arguments !== null && !checkCommand().correctArguments) {
        sendNoticeMessage(`Invalid arguments.`);
        return;
    }

    correctCommand.activateCommand(messageParts[1]);
}