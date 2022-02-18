/* 
    !WARNING!
        
        All changes in this config file count globally as default setting to all your worlds that have this add-on enabled. 
        All changes done from the config command in game count only to that specific world.
    
    !WARNING!
*/

const config = {
    commandPrefix:"!", //Command Prefix.
    expiresIn:60, //In Seconds. 
    tpaAcceptUI:false, //Tpa accept UI.
    admins:[], //All the player names in this array will have access to administrator commands.
    exceptions:{
        enabled:false, //Exceptions are used to disable tpa commands on certain players for certain situations. 
        hasTags:[], //Players who have the tags inside of this array, cannot use tpa commands, untill the tag has been removed from them.
        names:[], //Players who have their name is written in this array, cannot use tpa commands.
    }
};

export default config;

/**
 * @author Knight
 * @description This Add-on was created by Knight
 * @copyright 2021-2022 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */