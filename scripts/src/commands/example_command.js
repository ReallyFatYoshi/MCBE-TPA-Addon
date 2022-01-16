import commandBuilder from "../classes/commands.js"; //Required to register command.

commandBuilder.add({
    commandName:"exampleCommand", //commandName cannot contain spaces. (Required)
    description:"Description", //Command Description. (Required)
    private:false, //Command Private. (Optional)
    config:false, //Uses config. If it's enabled the callback parameters are (config, name, args) (Optional)
    admin_only:false, //Command can only be used by admins. (Optional)
    usages:[],  //Command usages. (Required)
    aliases:[] //Command Aliases. (Optional)
},(name/*Player Name*/,args/*Args*/)=>{
});