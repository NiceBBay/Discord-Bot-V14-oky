const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wycisz")
        .setDescription("Wybierz osobę do wyciszenia.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("użytkownik")
                .setDescription("Wybierz osobę do wyciszenia.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("czas")
                .setDescription("Przez jaki czas ma być ta osoba wyciszona?")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("powód")
                .setDescription("Jaki jest powód wyciszenia?")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("użytkownik");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("czas");
        const convertedTime = ms(time);
        const reason = options.getString("powód") || "Nie podano powodu";

        const errEmbed = new EmbedBuilder()
            .setDescription('Coś poszło nie tak. Proszę spróbować póżniej.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Wyciszono!**")
            .setDescription(`Pomyślnie wyciszono ${user}.`)
            .addFields(
                { name: "Powód", value: `${reason}`, inline: true },
                { name: "Czas", value: `${time}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}