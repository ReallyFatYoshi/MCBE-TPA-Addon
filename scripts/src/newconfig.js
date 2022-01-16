import config from "../config.js";
import database from "./classes/binaryDB.js";
import commandBuilder from "./classes/commands.js";
import TPA from "./classes/tpa.js";

const DBCONFIG = database.table("tpaaddon");

let newConfig;

export function updateConfig() {
    newConfig = { 
        commandPrefix:(DBCONFIG.has("commandPrefix") === true ? DBCONFIG.get("commandPrefix")["value"]:config.commandPrefix),
        expiresIn:(DBCONFIG.has("expiresIn") === true ? DBCONFIG.get("expiresIn")["value"]:config.expiresIn),
        tpaAcceptUI:(DBCONFIG.has("tpaAcceptUI") === true ? DBCONFIG.get("tpaAcceptUI")["value"]:config.tpaAcceptUI),
        admins:[...config.admins],
        exceptions:{
            enabled:config.exceptions.enabled,
            hasTags:[...config.exceptions.hasTags],
            names:[...config.exceptions.names],
        }
    };
    commandBuilder.updateConfig(newConfig);
    TPA.updateConfig(newConfig);
};

export function getConfig() { return newConfig };

updateConfig();