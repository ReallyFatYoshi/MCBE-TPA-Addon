import database from "../classes/binaryDB.js";
import commandBuilder from "../classes/commands.js";
import { updateConfig } from "../newconfig.js";
import { runCMDS } from "../utilities.js";

commandBuilder.add({
    commandName:"tpaconfig",
    description:"This command can be used by admins, to change tpa configurations. Like: Command Prefix, TPA Request Expiration Time and TPA Accept UI",
    config:true,
    admin_only:true,
    usages:[
        "tpaconfig commandPrefix <commandPrefix: string> | TPA command prefix. (Leave value empty for Default)",
        "tpaconfig expiresIn <Int: value> | How long it takes for an TPA request to expire. (Leave value empty for Default)",
        "tpaconfig tpaAcceptUI <Boolean: true/false> | If you want there to be a TPA Accept UI. (Leave value empty for Default)",
    ],
},(config,name,args)=>{
    if (!args[0]) return commandBuilder.invalidSyntax("tpaconfig",name,[""]);
    const DBCONFIG = database.table("tpaaddon");
    
    switch (args[0]) {
        case "commandPrefix": 
            if (!args[1]) return commandBuilder.invalidSyntax(`tpaconfig ${args[0]}`,name,args[1]);
            if (DBCONFIG.has("commandPrefix")) DBCONFIG.remove("commandPrefix");
            DBCONFIG.set("commandPrefix",args[1]);
            break;
        case "expiresIn": 
            if (!args[1]) return commandBuilder.invalidSyntax(`tpaconfig ${args[0]}`,name,args[1]);
            if (DBCONFIG.has("expiresIn")) DBCONFIG.remove("expiresIn");
            DBCONFIG.set("expiresIn",Math.floor(parseInt(args[1])));
            break;
        case "tpaAcceptUI": 
            if (!args[1]) return commandBuilder.invalidSyntax(`tpaconfig ${args[0]}`,name,args[1]);
            if (DBCONFIG.has("tpaAcceptUI")) DBCONFIG.remove("tpaAcceptUI");
            DBCONFIG.set("tpaAcceptUI",args[1]);
            break;
        default:
            return runCMDS([
                `playsound note.bass "${name}"`,
                `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§c ${args[0]} §r§cis an invalid configuration option."}]}`
            ])
    };

    config.admins.forEach(admin=>{
        runCMDS([
            `execute "${admin}" ~ ~ ~ playsound beacon.activate @s ~ ~ ~ 1 2`,
            `tellraw "${admin}" {"rawtext":[{"text":"§a§lTPA§c ${name} §r§ehas set ${args[0]} to §l§e${args[1]}§r§c."}]}`
        ])     
    });

    updateConfig();
});