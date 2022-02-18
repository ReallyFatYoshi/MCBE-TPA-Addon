import commandBuilder from "../classes/commands.js";
import TPA from "../classes/tpa.js";
import { getNames, runCMDS, smartSearchName } from "../utilities.js";

commandBuilder.register({
    commandName:"tpadecline",
    description:"Used to decline incoming tpa requests.",
    usages:["tpadecline <player: playerName>"],
    aliases: ["tpadeny","tpad"]
},(name,args)=>{
    if (!args[0]) return commandBuilder.invalidSyntax("tpadecline",name,[" "]);
    const target = args.length === 1 ? args[0]:args.join(" ");
    const names = getNames();
    const lowerCasenames = names.map(t=>t.toLowerCase());

    if (lowerCasenames.includes(target.toLowerCase())){
        TPA.decline(name,target);
    } else {
        let newTarget = smartSearchName(target);
        if (newTarget) {
            TPA.decline(name,newTarget);
        } else return runCMDS([
            `playsound note.bass "${name}"`,
            `tellraw "${name}" {"rawtext":[{"text":"§a§lTPA§c ${target} §r§cdoesn't exist or isn't currently online on this world/realm."}]}`
        ])
    }
});