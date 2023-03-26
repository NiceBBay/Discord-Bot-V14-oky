const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("propozycja")
        .setDescription("Co chcesz zaproponować")
        .addStringOption(option =>
            option.setName("propozycja")
                .setDescription("Nazwij swoją propozycję")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("opis")
                .setDescription("Jak to ma działać?")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("propozycja");
        const description = options.getString("opis");

        const embed = new EmbedBuilder()
            .setColor("Grey")
            .setDescription(`Propozycja użytkownika: ${member}`)
            .addFields(
                { name: "Propozycja", value: `${name}` },
                { name: "Opis", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('ID KANALU Z PROPOZYCJAMI').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Twoja sugestia została pomyślnie stworzona.", ephemeral: true });
    }
}