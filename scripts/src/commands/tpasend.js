import commandBuilder from "../classes/commands.js";
import TPA from "../classes/tpa.js";
import { getNames, runCMDS, smartSearchName } from "../utilities.js";

commandBuilder.add({
    commandName:"tpasend",
    description:"Sends tpa request to the specified player you want to teleport to.",
    usages:["tpasend <target: playerName>"],
    aliases: ["tpas"]
},(name,args)=>{ 
    if (!args[0]) return commandBuilder.invalidSyntax("tpasend",name,[" "]);
    const target = args.length === 1 ? args[0]:args.join(" ");
    const names = getNames();
    const lowerCasenames = names.map(t=>t.toLowerCase());

    if (lowerCasenames.includes(target.toLowerCase())){
        if (name.toLowerCase() == target.toLowerCase()) return runCMDS([
            `playsound note.bass "${name}"`,
            `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§r§c You cannot send a tpa request to yourself."}]}`
        ]);
        TPA.send(name,target);
    } else {
        let newTarget = smartSearchName(target);
        if (newTarget) {
            if (name.toLowerCase() == newTarget.toLowerCase()) return runCMDS([
                `playsound note.bass "${name}"`,
                `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§r§c You cannot send a tpa request to yourself."}]}`
            ]);
            TPA.send(name,newTarget);
        } else return runCMDS([
            `playsound note.bass "${name}"`,
            `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§c ${target} §r§cdoesn't exist or isn't currently online on this world/realm."}]}`
        ])
    }
});