const { SlashCommandBuilder, EmbedBuilder, client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('statystyki')
        .setDescription('Zobacz jakie sa statystyki!'),

    async execute(interaction, client) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 23
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60
        let totalUptime = `\`${days}\` dni, \`${hours}\` godzin, \`${minutes}\` minut,  \`${seconds}\` sekund`

        let totalMembers = client.users.cache.size;
        let totalServers = client.guilds.cache.size;

        let botPfp = client.user.displayAvatarURL()

        const embed = new EmbedBuilder()
            .setTitle(" • STATYSTYKI BOTA •")
            .setThumbnail(botPfp)
            .setColor('Purple')
            .addFields(
                { name: "**💻Developer**", value: "oky#6336", inline: true },
                { name: "**🌍Język bota**", value: "JavaScript", inline: true },
                { name: "**🌐Na ilu serwerach**", value: `${totalServers}`, inline: false },
                { name: "**🧔Wszyscy użytkownicy**", value: `${totalMembers}`, inline: true },
                { name: "**🆙Aktywny**", value: `${totalUptime}`, inline: false }
            )
            .setFooter({ text: "Bot stworzony przez oky#6336"({ dynamic: true }) });

            
        await interaction.reply({ embeds: [embed] });
    }
}