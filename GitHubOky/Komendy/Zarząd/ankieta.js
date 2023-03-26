const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType, PermissionsBitField} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ankieta")
        .setDescription("Stwórz ankiete!")
        .addStringOption(option =>
            option.setName("tekst")
                .setDescription("Opis ankiety!")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("kanał")
                .setDescription("Na jakim kanale ma być ankieta?")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("opcja1")
                .setDescription("Opcja 1")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("opcja2")
                .setDescription("Opcja 2")
                .setRequired(true)
                
        ),
    async execute(interaction) {
        const { options } = interaction;

        const content = options.getString("tekst");
        const channel = options.getChannel("kanał");
        const option1 = options.getString("opcja1");
        const option2 = options.getString("opcja2");

        const embed1 = new EmbedBuilder()
            .setColor("Purple")
            .setDescription(`${content}\n\n:one: | ${option1}\n:two: | ${option2}`)
            .setTimestamp();
            if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: "❌ | ɴɪᴇ ᴘᴏꜱɪᴀᴅᴀꜱᴢ ᴜᴘʀᴀᴡɴɪᴇŃ ᴅᴏ ᴛᴇᴊ ᴋᴏᴍᴇɴᴅʏ.", ephemeral: true });

        try {

            const a = await channel.send({ embeds: [embed1] });
            await a.react("1️⃣");
            await a.react("2️⃣");
        

            await interaction.reply({ content: `✅ | ᴘᴏᴍʏŚʟɴɪᴇ ᴡʏᴋᴏɴᴀɴᴏ ᴀɴᴋɪᴇᴛĘ ɴᴀ ᴋᴀɴᴀʟᴇ ${channel}!`, ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}