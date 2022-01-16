import { getNames, runCMDS, smartSearchName } from '../utilities.js'

class tpa {
    constructor() {
        this.tpaRequests = [];
        this.tpaRequestUI = new Map();
        this.config = {};
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
                const names = getNames();
                if (names.includes(request.target)) runCMDS([
                    `tellraw "${request.target}" {"rawtext":[{"text":"§a§lTPA§r §eThe tpa request from §l§c${request.sender}§r§e has expired."}]}`,
                    `playsound mob.agent.spawn "${request.target}"`
                ]);

                if (names.includes(request.sender)) runCMDS([
                    `tellraw "${request.sender}" {"rawtext":[{"text":"§a§lTPA§r §cYour tpa request to §l${request.target}§r§c has expired."}]}`,
                    `playsound mob.agent.spawn "${request.sender}"`
                ]);
                this.tpaRequests.splice(index,1)
            };
        });
    };

    /**
     * @method updateConfig Used to update the config file in commands.
     * @param {Array<T>} data Config Data.
     */
    updateConfig(data) {
        this.config = data;
    }

    /** 
     * @param {String} sender 
     * @param {String} target 
     */
    open_accept_ui(sender,target) {
        const newTarget = smartSearchName(target);
        let teleportRequestFound = false;

        this.tpaRequests.forEach((request)=>{
            if (request.sender.toLocaleLowerCase() === target.toLocaleLowerCase() && request.target.toLocaleLowerCase() === sender.toLocaleLowerCase()) {
                teleportRequestFound = true;
                this.tpaRequestUI.set(sender,{target});
                runCMDS([
                    `execute "${sender}" ~ ~ ~ summon tpaaddon:tpa_request_menu "${request.sender}'s request" ~ ~ ~`,
                    `tellraw "${sender}" {"rawtext":[{"text":"§aLoading UI..."}]}`,
                    `scoreboard players set "${sender}" mcbe-tpa_open 0`
                ]);
            } else {
                if (newTarget && request.sender.toLowerCase() === newTarget.toLowerCase() && request.target.toLowerCase() === sender.toLowerCase()) {
                    teleportRequestFound = true;
                    this.tpaRequestUI.set(sender,{target});
                    runCMDS([
                        `execute "${sender}" ~ ~ ~ summon tpaaddon:tpa_request_menu "${request.sender}'s request" ~ ~ ~`,
                        `tellraw "${sender}" {"rawtext":[{"text":"§aLoading UI..."}]}`,
                        `scoreboard players set "${sender}" mcbe-tpa_open 0`
                    ]);
                }
            }
        });

        if (!teleportRequestFound) return runCMDS([
            `playsound note.bass "${sender}"`,
            `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§c ${newTarget !== false ? newTarget:target} §r§chas never send you a tpa request."}]}`
        ]);
    };

    /**
     * @param {String} sender 
     * @param {String} target 
     */
    send(sender,target) {
        const hasSend = this.#check(sender,target);
        if (!hasSend) {
            this.tpaRequests.push({sender,target,expiresIn:this.config.expiresIn});
            runCMDS([
                `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§r §eYou've send tpa request to ${target}."}]}`,
                `tellraw "${target}" {"rawtext":[{"text":"§a§lTPA§r §e${sender} has send tpa request to you. Type §l§a${this.config.commandPrefix}§r§atpaaccept ${sender} §eto accept the tpa request."}]}`,
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
        let newTarget = smartSearchName(target);

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
                };
            };
        });
        if (!teleportRequestFound) return runCMDS([
            `playsound note.bass "${sender}"`,
            `tellraw "${sender}" {"rawtext":[{"text":"§a§lTPA§c ${newTarget !== false ? newTarget:target} §r§chas never send you a tpa request."}]}`
        ]);
    };
};

let TPA = new tpa();

export default TPA;

/**
 * @author Knight
 * @description This Add-on was created by Knight
 * @copyright 2021-2022 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */