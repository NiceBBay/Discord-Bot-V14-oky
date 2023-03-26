const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Odcisza osobe z serwera.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("użytkownik")
                .setDescription("Wybierz osobę do odciszenia.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("osoba");
        const member = guild.members.cache.get(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription('⚠️ | ᴘʀᴏʙʟᴇᴍ ᴢ ᴡʏᴋᴏɴᴀɴɪᴇᴍ ᴋᴏᴍᴇɴᴅʏ. ᴘʀᴏꜱɪᴍʏ ꜱᴘʀÓʙᴏᴡᴀĆ ᴘÓŻɴɪᴇᴊ.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Odciszono**")
            .setDescription(`✅ | ᴘᴏᴍʏŚʟɴɪᴇ ᴏᴅᴄɪꜱᴢᴏɴᴏ ${user}!`)
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); 

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(null);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}