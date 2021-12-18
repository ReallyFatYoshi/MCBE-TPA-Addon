import config from "./config.js";
import { World } from "mojang-minecraft";
import TPA from "./src/classes/tpa.js";
import commandBuilder from "./src/classes/commands.js";
import './src/imports.js';
import { getTag, runCMDS } from "./src/utilities.js";

World.events.beforeChat.subscribe((msg)=>{
    if (!msg.message.startsWith(config.commandPrefix)) return;
    msg.cancel = true;

    if (config.exceptions.enabled) {
        let hasTag = false;
        let inNames = false;
        let player = msg.sender;

        config.exceptions.hasTags.forEach(tag=>{
            if (getTag(`${player.nameTag}`,tag)===true) hasTag = true;
        });

        config.exceptions.names.forEach(name=>{
            if (name.toLowerCase()===player.nameTag.toLowerCase()) inNames = true;
        });

        if (inNames||hasTag) return runCMDS([
            `playsound note.bass "${player.nameTag}"`,
            `tellraw "${player.nameTag}" {"rawtext":[{"text":"§a§lTPA§r §cYou cannot use tpa commands at the moment."}]}`
        ]);
    };

    let cmd = msg.message.slice(config.commandPrefix.length).trim().split(/ +/)[0] ?? null;
    let args = msg.message.slice(config.commandPrefix.length).replace(cmd,"").trim().split(/ +/) ?? null;

    commandBuilder.check(cmd,msg,args);
});

let ticks = 0;
World.events.tick.subscribe(()=>{
    ticks++;
    if (ticks%20==0) {
        TPA.countDown();
    };
});

/**
 * @author Knight
 * @description This Add-on is created by Knight
 * @copyright 2021 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */