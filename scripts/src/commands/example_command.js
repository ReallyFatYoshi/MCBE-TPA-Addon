import commandBuilder from "../classes/commands.js"; //Required to register command.

commandBuilder.add({
    commandName:"exampleCommand", //commandName cannot contain spaces. (Required)
    description:"Description", //Command Description. (Required)
    usages:[],  //Command usages. (Required)
    aliases:[] //Command Aliases. (Optional)
},(name/*Player Name*/,args/*Args*/)=>{
});