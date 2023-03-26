const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('weryfikacja')
    .setDescription('Stworz weryfikacje')
    .addChannelOption(option =>
        option.setName('kanal')
        .setDescription('Stwórz weryfikacje na danym kanale')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');
        const verifyEmbed = new EmbedBuilder()
        .setTitle(" WERYFIKACJA ")
        .setDescription('Kliknij przycisk weryfikacji żeby się dostać na nasz serwer.')
        .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('Zweryfikuj').setLabel('Zweryfikuj się').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({content: '🔺| ᴘʀᴏʙʟᴇᴍ ᴢ ᴡᴇʀʏꜰɪᴋᴀᴄᴊĄ! ꜱᴘʀÓʙᴜᴊ ᴘÓŻɴɪᴇᴊ', ephemeral: true});
        } else {
            return interaction.reply({content: '✅ | ᴘᴏᴍʏŚʟɴɪᴇ ᴡʏᴋᴏɴᴀɴᴏ ᴋᴏᴍᴇɴᴅĘ!', ephemeral: true});
        }
    },
};