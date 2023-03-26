const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Zdobądż avatar danej osoby.')
    .addUserOption(option => option.setName('użytkownik').setDescription('Osoba której chcesz zobaczyć avatar').setRequired(true)),

    async execute(interaction) {
 
        const user = interaction.options.getUser('użytkownik')
        const userAvatar = user.displayAvatarURL({ size: 512 });

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`Oto avatar użytkownika ${user}\n`)
        .setImage(`${userAvatar}`)

        interaction.reply({ embeds: [embed] });

    }
}