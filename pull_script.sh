#!/bin/bash

cd /home/opc/discord_bot

current_hash=$(git rev-parse HEAD)

git pull origin main > /dev/null 2>&1

new_hash=$(git rev-parse HEAD)


if [ "$current_hash" != "$new_hash" ]; then
	echo "New changes detected, restarting bot"
	tmux has-session -t atrbot 2>/dev/null

	if [ $? -eq 0 ]; then
		tmux kill-session -t atrbot
	fi

	node ./deploy-commands.js
	tmux new-session -d -s atrbot "node ./index.js"
else
	echo "No new changes"
fi
