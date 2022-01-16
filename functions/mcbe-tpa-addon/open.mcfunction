scoreboard players add @a[scores={mcbe-tpa_open=0..}] mcbe-tpa_open 1
scoreboard players add @e[type=tpaaddon:tpa_request_menu] mcbe-tpa_open 0
execute @a[scores={mcbe-tpa_open=5..}] ~ ~ ~ dialogue open @e[type=tpaaddon:tpa_request_menu,scores={mcbe-tpa_open=0},c=1] @s tpa_addon_request