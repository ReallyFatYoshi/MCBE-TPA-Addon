import { getConfig } from "./src/newconfig.js";

import TPA from "./src/classes/tpa.js";
import commandBuilder from "./src/classes/commands.js";

import { getNames, getScore, getTag, runCMDS } from "./src/utilities.js";
import { World } from "mojang-minecraft";

import './src/imports.js';

World.events.beforeChat.subscribe((msg)=>{
    const newConfig = getConfig();
    
    if (!msg.message.startsWith(newConfig.commandPrefix)) return;

    msg.cancel = true;

    if (newConfig.exceptions.enabled) {
        let hasTag = false;
        let inNames = false;
        let player = msg.sender;

        newConfig.exceptions.hasTags.forEach(tag=>{
            if (getTag(`${player.nameTag}`,tag)===true) hasTag = true;
        });

        newConfig.exceptions.names.forEach(name=>{
            if (name.toLowerCase()===player.nameTag.toLowerCase()) inNames = true;
        });

        if (inNames||hasTag) return runCMDS([
            `playsound note.bass "${player.nameTag}"`,
            `tellraw "${player.nameTag}" {"rawtext":[{"text":"§a§lTPA§r §cYou cannot use tpa commands at the moment."}]}`
        ]);
    };
    const MSG = msg.message.replace(/(@)?(")?/g,"") ?? msg.message;
    let cmd = MSG.slice(newConfig.commandPrefix.length).trim().split(/ +/)[0] ?? null;
    let args = MSG.slice(newConfig.commandPrefix.length).replace(cmd,"").trim().split(/ +/) ?? null;

    commandBuilder.check(cmd,msg,args);
});

let ticks = 0;
World.events.tick.subscribe(()=>{
    ticks++;
    if (ticks%20==0) {
        TPA.countDown();
    };
    
    if (ticks%10==0) getNames().forEach(name=>{
        if (!TPA.tpaRequestUI.has(name)) return;
        const data = TPA.tpaRequestUI.get(name);
        if (getScore(name,"mcbe-tpa_decline")>=1) TPA.decline(name,data.target);
        else if (getScore(name,"mcbe-tpa_accept")>=1) TPA.accept(name,data.target); else return;
        runCMDS([
            `scoreboard players reset ${name} mcbe-tpa_accept`,
            `scoreboard players reset ${name} mcbe-tpa_decline`
        ]);
        TPA.tpaRequestUI.delete(name);
    });
});

/**
 * @author Knight
 * @description This Add-on was created by Knight
 * @copyright 2021-2022 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */