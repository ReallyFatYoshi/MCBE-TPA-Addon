import config from "../../config.js";
import { runCMDS } from "../utilities.js";

class commandbuilder {
    constructor() {
        this.commands = [];
    };

    /**
     * @method invalid Sends invalid syntax message to the command invoker.
     * @param {String} cmdName Command name.
     * @param {String} name Command invoker username.
     * @param {Array<String>} error invalid syntaxes.
     */
     invalidSyntax(cmdName,name,error) {
        return runCMDS([
            `playsound note.bass "${name}"`,
            `tellraw "${name}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.syntax", "with": ["${config.commandPrefix}${cmdName} ","${error[0]}","${error.filter((t,i)=>{if (i!==0) return t;}).join(" ")}"]}]}`
        ]);
    }

    /**
     * @method check Checks if command exists if it does runs the command. Returns error message to the command executor.
     * @param {String} cmdName Command name.
     * @param {String} msg Msg object.
     * @param {Array<String|Object>} args Array of args.
     */
     check(cmdName,msg,args) {
        let name = msg.sender.nameTag;
        let command = this.commands.some((cmd)=>cmd.data.commandName.toLowerCase()===cmdName.toLowerCase() || cmd.data.aliases && cmd.data.aliases.includes(cmdName));
        if (!command) return runCMDS([
            `playsound note.bass "${name}"`,
            `tellraw "${name}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["§f${cmdName}§c"]}]}`
        ]);

        this.#run(cmdName,name,args);
    }

    /**
     * @method getList Returns a string with all the available commands with their descriptions.
     */
    getList() {
        let cmds = this.commands.map((cmd)=>{ return {cmd:cmd.data.commandName,description:cmd.data.description} });
        return cmds;
    }

    /**
     * @method add Add command.
     * @param {Array<String>} data Command Data.
     * @param {Function} callback Callback.
     */
    add(data,callback) {
        this.commands.push({data,callback});
    }

    /**
     * @method getInfo Sends information about the command.
     * @param {String} name Command invoker username. 
     * @param {String} cmdName Command Name.
     */
    getInfo(name,cmdName) {
        let command = false;
        this.commands.forEach((cmd)=>{
            if (cmd.data.commandName.toLowerCase()===cmdName.toLowerCase() || cmd.data.aliases && cmd.data.aliases.includes(cmdName)) {
                command = true;
                runCMDS([
                    `playsound note.hat "${name}"`,
                    `tellraw "${name}" {"rawtext":[{"text":"§e${cmdName} ${cmd.data.aliases ? `(also ${cmd.data.aliases.map(t=> t.toLowerCase()==cmdName.toLowerCase() ? cmd.data.commandName:t).join(", ")})`:""}:\n${cmd.data.description}\n§fUsage:${cmd.data.usages.map((t,i)=>`\n -${cmd.data.usages[i]}`).join("")}"}]}`
                ]);
            };
        });

        if (!command) return this.invalidSyntax(`tpahelp`,name,[cmdName])
    }

    /**
     * @method run Run command callback.
     * @param {String} cmdName Command name.
     * @param {String} name Command invoker username.
     * @param {Array<String|Object>} args Callback.
     */
    #run(cmdName,name,args) {
        this.commands.forEach((cmd)=>{
            if (cmd.data.commandName.toLowerCase()===cmdName.toLowerCase() || cmd.data.aliases && cmd.data.aliases.includes(cmdName)) {
                cmd.callback(name,args);
            };
        });
    }
}

let commandBuilder = new commandbuilder();

export default commandBuilder;

/**
 * @author Knight
 * @description This Add-on is created by Knight
 * @copyright 2021 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */