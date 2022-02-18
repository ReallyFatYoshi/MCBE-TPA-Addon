import commandBuilder from "../classes/commands.js";
import { getNames, runCMDS, smartSearchName } from "../utilities.js";

commandBuilder.register({
    commandName:"tpaadmin",
    description:"This command allows an admin to tp everyone to his location, teleport someone to his location or tp to a players location, without op permissions.",
    private:false,
    admin_only:true,
    usages:["tpaadmin hereall","tpaadmin here <player: playerName>","tpaadmin to <player: playerName>"],
    aliases: ["tpamin"]
},(name,args)=>{
    if (!args[0]) return commandBuilder.invalidSyntax("tpaconfig",name,[" "]);
    const text = args.join("");
    const target = !args[1] ? false:smartSearchName(text.replace(args[0],""));
    const playerNames = getNames();

    if (args[0]==="hereall") return runCMDS([
        `playsound note.hat "${name}"`,
        `tp @a "${name}"`,
        `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§r§e You've teleported everyone to your location."}]}`
    ]); else if (!["to","here"].includes(args[0])) return commandBuilder.invalidSyntax("tpaadmin",name,[...args]);
    
    if (!playerNames.includes(target)) return runCMDS([
        `playsound note.bass "${name}"`,
        `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§c ${text.replace(args[0],"")} §r§cdoes not exist."}]}`
    ]);

    switch (args[0]) {
        case "here":
            return runCMDS([
                `playsound note.hat "${name}"`,
                `tp "${target}" "${name}"`,
                `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§r§e You've teleported §l§c${target}§r§e to your location."}]}`
            ])
        case "to":
            return runCMDS([
                `playsound note.hat "${name}"`,
                `tp "${name}" "${target}"`,
                `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§r§e You've been teleported to §c§l${target}'s§r§e location."}]}`
            ]);
        default:
            return commandBuilder.invalidSyntax("tpaadmin",name,[...args]);
    }
});