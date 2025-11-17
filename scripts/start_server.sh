#!/bin/bash
cd /home/ec2-user/discord-bot
pm2 start index.js --name "discord-bot"
pm2 save
