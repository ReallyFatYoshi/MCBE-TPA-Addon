import commandBuilder from "../classes/commands.js";
import { runCMDS } from "../utilities.js"

commandBuilder.add({
    commandName:"tpahelp",
    description:"Used to get all available commands or infomation about a specific command.",
    config:true, 
    usages:["tpahelp","tpahelp <command: CommandName>"],
    aliases:["tpah"]
},(config,name,args)=>{
    if (!args[0]) {
        const commands = commandBuilder.getList(name);
        runCMDS([
            `playsound note.hat "${name}"`,
            `tellraw "${name}" {"rawtext":[{"text":"§l§e---------------\n§r§eType §a§l${config.commandPrefix}§r§atpahelp [command: CommandName] §eto get information about the command.\n§r§eTPA Commands List:${commands.map(cmd=>`\n §r§f- §a§l${config.commandPrefix}§r§a${cmd.cmd} | ${cmd.description}`).join(``)} \n§l§e---------------"}]}`
        ]);
    } else {
        commandBuilder.getInfo(name,args[0]);
    };
});