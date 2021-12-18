const config = {
    commandPrefix:"!",
    expiresIn:60, //In Seconds. 
    exceptions:{
        enabled:false, // Enable Exceptions. (Default: false)
        hasTags:[], //Players who have the tags inside of this array, cannot use tpa commands, untill the tag has been removed from them.
        names:[], //Players who's name is written in this array, cannot use tpa command.
    }
};

export default config;