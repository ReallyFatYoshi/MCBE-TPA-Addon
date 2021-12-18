import { runCMDS, smartSearchName } from '../utilities.js'
import config from '../../config.js'

class tpa {
    constructor() {
        this.tpaRequests = [];
    }

    #check(sender,target) {
        let returnValue = false;
        this.tpaRequests.forEach(request=>{
            if (request.sender.toLocaleLowerCase() === sender.toLocaleLowerCase() && request.target.toLocaleLowerCase() === target.toLocaleLowerCase()) return returnValue = true;
        });
        return returnValue;
    };

    countDown() {
        this.tpaRequests.forEach((request,index)=>{
            request.expiresIn--;
            if (request.expiresIn<=0) {
                runCMDS([
                    `tellraw "${request.target}" {"rawtext":[{"text":"§a§lTPA§r §eThe tpa request from §l§c${request.sender}§r§e has expired."}]}`,
                    `tellraw "${request.sender}" {"rawtext":[{"text":"§a§lTPA§r §cYour tpa request to §l${request.target}§r§c has expired."}]}`,
                    `playsound mob.agent.spawn "${request.sender}"`,
                    `playsound mob.agent.spawn "${request.target}"`
                ]);
                this.tpaRequests.splice(index,1)
            };
        });
    };

    /**
     * @param {String} sender 
     * @param {String} target 
     */
    send(sender,target) {
        const hasSend = this.#check(sender,target);
        if (!hasSend) {
            this.tpaRequests.push({sender,target,expiresIn:config.expiresIn});
            runCMDS([
                `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§r §eYou've send tpa request to ${target}."}]}`,
                `tellraw "${target}" {"rawtext":[{"text":"§a§lTPA§r §e${sender} has send tpa request to you. Type §l§a${config.commandPrefix}§r§atpaaccept ${sender} §eto accept the tpa request."}]}`,
                `playsound note.hat "${sender}"`,
                `playsound note.hat "${target}"`
            ]);
        } else runCMDS([
                `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§r §eYou've already send a tpa request to §l§c${target}§r§e."}]}`,
                `playsound mob.agent.spawn "${sender}"`
            ]);
    };

    /**
     * @param {String} sender 
     * @param {String} target 
     */
    decline(sender,target) {
        let foundDecline = false;
        this.tpaRequests.forEach((request,index)=>{
            if (request.sender.toLowerCase() === target.toLowerCase() && request.target.toLowerCase() === sender.toLowerCase()) {          
                runCMDS([
                    `tellraw "${request.target}" {"rawtext":[{"text":"§a§lTPA§r §eYou've §c§lDeclined§r§e the tpa request from ${request.sender}."}]}`,
                    `tellraw "${request.sender}" {"rawtext":[{"text":"§a§lTPA§r §c${request.target} has declined your tpa request."}]}`,
                    `playsound mob.agent.spawn "${request.sender}"`,
                    `playsound mob.agent.spawn "${request.target}"`
                ]);
                foundDecline=true;
                this.tpaRequests.splice(index,1);
            };
        });
        if (!foundDecline) runCMDS([
            `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§r §l§c${target}§r§c has never send a tpa request to you."}]}`,
            `playsound mob.agent.spawn "${sender}"`
        ]);
    };

    /**
     * @param {String} sender 
     * @param {String} target 
     */
    accept(sender,target) {
        let teleportRequestFound = false;
        this.tpaRequests.forEach((request,index)=>{
            if (request.sender.toLocaleLowerCase() === target.toLocaleLowerCase() && request.target.toLocaleLowerCase() === sender.toLocaleLowerCase()) {
                teleportRequestFound = true;
                runCMDS([
                    `tellraw "${request.sender}" {"rawtext":[{"text":"§a§lTPA§r §aYou've been teleported to ${request.target} location."}]}`,
                    `tellraw "${request.target}" {"rawtext":[{"text":"§a§lTPA§r §a${request.sender} has been teleported to your location."}]}`,
                    `playsound mob.endermen.portal "${request.sender}"`,
                    `playsound mob.endermen.portal "${request.target}"`,
                    `tp "${target}" "${sender}"`
                ]);
                this.tpaRequests.splice(index,1);
            } else {
                let newTarget = smartSearchName(target);
                if (newTarget && request.sender.toLowerCase() === newTarget.toLowerCase() && request.target.toLowerCase() === sender.toLowerCase()) {
                    teleportRequestFound = true;
                    runCMDS([
                        `tellraw "${request.sender}" {"rawtext":[{"text":"§a§lTPA§r §aYou've been teleported to ${request.target} location."}]}`,
                        `tellraw "${request.target}" {"rawtext":[{"text":"§a§lTPA§r §a${request.sender} has been teleported to your location."}]}`,
                        `playsound mob.endermen.portal "${request.sender}"`,
                        `playsound mob.endermen.portal "${request.target}"`,
                        `tp "${newTarget}" "${sender}"`
                    ]);
                    this.tpaRequests.splice(index,1);
                } else if (!teleportRequestFound) return runCMDS([
                    `playsound note.bass "${sender}"`,
                    `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§c ${newTarget} §r§chas never send you a tpa request."}]}`
                ]);
            };
        });
        if (!teleportRequestFound) return runCMDS([
            `playsound note.bass "${sender}"`,
            `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§c ${target} §r§chas never send you a tpa request."}]}`
        ]);
    };
};

let TPA = new tpa();

export default TPA;

/**
 * @author Knight
 * @description This Add-on is created by Knight
 * @copyright 2021 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */