const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        mongoose.set('strictQuery', false);
        if (mongoose.connect) {
            console.log('Pomyślnie połączono z bazą MongoDB.');
        }
        console.log(`${client.user.username} jest teraz aktywny!`);
        
    },
};