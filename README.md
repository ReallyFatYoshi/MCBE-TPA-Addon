<!--
This README.md template was NOT orginally created by me(ReallyFatYoshi)! This is a fork of:
https://github.com/othneildrew/Best-README-Template
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ReallyFatYoshi/MCBE-TPA-Addon">
    <img src="pack_icon.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center"><u>MCBE TPA Add-on</u></h3>

  <p align="center" style="font-size:16px;">
    <a href="https://github.com/ReallyFatYoshi/MCBE-TPA-Addon">View Demo</a>
    ·
    <a href="https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/issues">Report Bug</a>
    ·
    <a href="https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/issues">Request Feature</a>
  </p>
</p>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
![GitHub All Releases](https://img.shields.io/github/downloads/ReallyFatYoshi/MCBE-TPA-Addon/total) 

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Shippori+Antique&display=swap" rel="stylesheet">

<h3 style="color:red;font-family: 'Anton', sans-serif; font-family: 'Shippori Antique', sans-serif;"><strong>NOTE: </strong>This add-on only works for Minecraft Bedrock Version 1.18.10+</h3>
<h3 style="font-weight:bold;color:gray;">Commands:</h3>
<ul style="list-style-type:none;">
    <li>
        <strong>!</strong>tpahelp | Used to get all available commands or infomation about a specific command.
    </li>
    <li>
        <strong>!</strong>tpasend | Sends tpa request to the specified player you want to teleport to.
    </li>
    <li>
        <strong>!</strong>tpaaccept | Used to accept an incoming tpa request.
    </li>
    <li>
        <strong>!</strong>tpadecline | Used to decline incoming tpa requests.
    </li>
</ul>
<ul style="list-style-type:none;">
    <li>
        <strong>!</strong>tpaadmin | This command allows an admin to tp everyone to his location, teleport someone to his location or tp to a players location, without op permissions.
    </li>
    <li>
        <strong>!</strong>tpaconfig | This command can be used by admins, to change tpa configurations. Like: <strong>commandPrefix</strong>, <strong>Expiration Time</strong> and <strong>tpaAcceptUI</strong>.
    </li>
</ul>
<br />

<h3 style="font-weight:bold;color:gray;">Required Experimental Features:</h3>

![settings]

[settings]:https://cdn.discordapp.com/attachments/817055784273575966/930944353310998590/unknown.png


<h3 style="font-weight:bold;color:gray;">Config:</h3>
<ul style="list-style-type:none;">
    <li>
        The config can be found in <kbd><strong>scripts/config.js</strong></kbd> inside of the add-on.
        <alt>Config File Contents:</alt>

            /* 
                !WARNING!

                    All changes in this config file count globally as default settings to all your worlds that have this add-on enabled. 
                    All changes done from the config command in game count only to that specific world.
                
                !WARNING!
            */

            const config = {
                commandPrefix:"!", //Command Prefix.
                expiresIn:60, //In Seconds. 
                tpaAcceptUI:true, //Tpa accept UI.
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

</ul>

<!--Icons-->
[contributors-shield]: https://img.shields.io/github/contributors/ReallyFatYoshi/MCBE-TPA-Addon.svg?style=for-the-badge
[contributors-url]: https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ReallyFatYoshi/MCBE-TPA-Addon.svg?style=for-the-badge
[forks-url]: https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/network/members
[stars-shield]: https://img.shields.io/github/stars/ReallyFatYoshi/MCBE-TPA-Addon.svg?style=for-the-badge
[stars-url]: https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/stargazers
[issues-shield]: https://img.shields.io/github/issues/ReallyFatYoshi/MCBE-TPA-Addon.svg?style=for-the-badge
[issues-url]: https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/issues
[license-shield]: https://img.shields.io/github/license/ReallyFatYoshi/MCBE-TPA-Addon.svg?style=for-the-badge
[license-url]: https://github.com/ReallyFatYoshi/MCBE-TPA-Addon/blob/main/LICENSE
