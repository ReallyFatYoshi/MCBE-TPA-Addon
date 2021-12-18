import { Commands, World } from 'mojang-minecraft';

/** 
 * @param {String} command Command. 
 * @param {String} dimension Dimension. Dimensions: overworld | nether | the end
 * @returns {String} Returns an array.
*/
function runCMD(command,dimension) {
    try {
        return { error: false, result: Commands.run(`${command}`,World.getDimension(`${dimension ?? "overworld" }`)).statusMessage };
    } catch(e) {
        console.warn(`The following command failed to run: ${command}`);
        return { error: e, result: null };
    }
}

/** 
 * @param {Array<String>} commandArray Commands.
 * @param {String} dimension The dimension command should be run in. If left blank it will run in the: OverWorld. 
 * @returns {Array<String>} Returns the following array for each object in the array: {"error": false or error message, "result": "Command statusMessage"} .
 */
function runCMDS(commandArray,dimension) {
    for (let i=0; i<commandArray.length;++i) {
        runCMD(commandArray[i],dimension);
    }
}

/** 
 * @param {String} username Player Name.
 * @param {String} tag Tag.
 * @return {Boolean} Returns True/False.
 */
 function getTag(username,tag) {
    let tags = runCMD(`tag "${username}" list`).result;
    let tagFound = tags.match(`${tag}`);

    if (tagFound) return true;
    return false;
};

/** 
 * @return {Array<String>} Returns an Array with player names.
 */
 function getNames() {
    let playernames = World.getPlayers()
    playernames = playernames.map(t=>t.nameTag);
    return playernames;
};

/** 
 * @param {String} username Player Name.
 * @param {String} scoreboard Scoreboard.
 * @return {Number} Returns scoreboard value.
 */
function getScore(username,scoreboard) {
    let result = runCMD(`scoreboard players test "${username}" "${scoreboard}" * *`).result;
    let score = result !== null ? parseInt(result.match(/(?<=Score).+(?=is)/g)):0;
    
    return parseInt(score);
}

/** 
 * @param {String} name Player Name.
 * @return {String|Boolean} Returns Player Name else false.
 */
 function smartSearchName(name) {
    const names = getNames();
    const regexPattern = new RegExp('([a-zA-Z0-9]+)?'+name.toLowerCase()+'([a-zA-Z0-9]+)?','g');
    const newName = names.filter((n,i)=>{
        if (n.toLowerCase().match(regexPattern)) return names[i];
    });
    const nameReturn = newName[0] === undefined ? false:newName[0]; 
    return nameReturn;
}

export { runCMD, runCMDS, getTag, getNames, getScore, smartSearchName }

/**
 * @author Knight
 * @description This Add-on is created by Knight
 * @copyright 2021 Knight
 * @discordUsername Knight#8191
 * @discordServer https://discord.gg/38f4A5MD86
 */