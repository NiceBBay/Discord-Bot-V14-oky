const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Komenda która banuje użytkownika.')
    .addUserOption(option => option.setName('osoba').setDescription('Osoba którą chcesz zbanować.').setRequired(true))
    .addStringOption(option => option.setName('powód').setDescription('Powód bana.')),
    async execute (interaction, client) {

        const banUser = interaction.options.getUser('osoba');
        const banMember = await interaction.guild.members.fetch(banUser.id);
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "❌ | ɴɪᴇ ᴘᴏꜱɪᴀᴅᴀꜱᴢ ᴜᴘʀᴀᴡɴɪᴇŃ ᴅᴏ ᴛᴇᴊ ᴋᴏᴍᴇɴᴅʏ.", ephemeral: true });
        if (!banMember) return await interaction.reply({ content: '⚠️ | ᴏᴢɴᴀᴄᴢᴏɴᴀ ᴏꜱᴏʙᴀ ɴɪᴇ ᴊᴇꜱᴛ ɴᴀ ᴛʏᴍ ꜱᴇʀᴡᴇʀᴢᴇ.', ephemeral: true});
        if (!banMember.kickable) return await interaction.reply({ content: "⚠️ | ɴɪᴇ ᴍᴏɢĘ ᴢʙᴀɴᴏᴡᴀĆ ᴛᴇɢᴏ ᴜŻʏᴛᴋᴏᴡɴɪᴋᴀ, ᴘᴏɴɪᴇᴡᴀŻ ᴍᴀ ᴏɴ ʀᴏʟᴇ ᴡʏŻꜱᴢĄ ɴɪŻ ᴊᴀ ʟᴜʙ ᴛʏ.", ephemeral: true});

        let reason = interaction.options.getString('powód');
        if (!reason) reason = "Brak powodu.";

        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:exclamation:   Zostałeś zbanowany z serwera **${interaction.guild.name}** :exclamation: | Powód: ${reason}`)

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:exclamation:   ${banUser.tag} został pomyślnie **zbanowany** :exclamation: | Powód: ${reason}`)

        await banMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await banMember.ban({ reason: reason }).catch(err => {
            interaction.reply({ content: "Error?", ephemeral: true});
        });

        await interaction.reply({ embeds: [embed] });

    }
}