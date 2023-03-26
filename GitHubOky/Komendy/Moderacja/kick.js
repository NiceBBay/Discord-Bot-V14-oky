const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Wykonuje wyrzucenie osoby z serwera')
    .addUserOption(option => option.setName('osoba').setDescription('Wybierz którą osobę chcesz wyrzucić z serwera').setRequired(true))
    .addStringOption(option => option.setName('powód').setDescription('Powód wyrzucenia z serwera.')),
    async execute (interaction, client) {

        const kickUser = interaction.options.getUser('osoba');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "❌ | ɴɪᴇ ᴘᴏꜱɪᴀᴅᴀꜱᴢ ᴜᴘʀᴀᴡɴɪᴇŃ ᴅᴏ ᴛᴇᴊ ᴋᴏᴍᴇɴᴅʏ.", ephemeral: true });
        if (!kickMember) return await interaction.reply({ content: '⚠️ | ᴏᴢɴᴀᴄᴢᴏɴᴀ ᴏꜱᴏʙᴀ ɴɪᴇ ᴊᴇꜱᴛ ɴᴀ ᴛʏᴍ ꜱᴇʀᴡᴇʀᴢᴇ.', ephemeral: true});
        if (!kickMember.kickable) return await interaction.reply({ content: "⚠️ | ɴɪᴇ ᴍᴏɢĘ ᴡʏʀᴢᴜᴄɪĆ ᴛᴇɢᴏ ᴜŻʏᴛᴋᴏᴡɴɪᴋᴀ, ᴘᴏɴɪᴇᴡᴀŻ ᴍᴀ ᴏɴ ʀᴏʟᴇ ᴡʏŻꜱᴢĄ ɴɪŻ ᴊᴀ ʟᴜʙ ᴛʏ. ", ephemeral: true});

        let reason = interaction.options.getString('powód');
        if (!reason) reason = "Brak powodu.";

        const dmEmbed = new EmbedBuilder()
        .setColor("Purple")
        .setDescription(`:white_check_mark:  Zostałeś wyrzucony z serwera **${interaction.guild.name} | Powód: ${reason}**`)

        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setDescription(`:white_check_mark:  ${kickUser.tag} został pomyślnie **wyrzucony** | Powód: ${reason}`)

        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await kickMember.kick({ reason: reason }).catch(err => {
            interaction.reply({ content: "Error?", ephemeral: true});
        });

        await interaction.reply({ embeds: [embed] });

    }
}