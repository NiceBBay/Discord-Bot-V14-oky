const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pomoc')
    .setDescription('Wszystko czego potrzebujesz.'),
    async execute (interaction, client) {
        
        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle("Centrum")
        .setDescription(`Wybierz co ciebie interesuje:`)
        .addFields({ name: "Strona 1", value: "Pomoc i zasoby"})
        .addFields({ name: "Strona 2", value: "Ogólne komendy"})
        .addFields({ name: "Strona 3", value: "Komendy Moderacyjne"})
        .addFields({ name: "Strona 4", value: "Komendy 4FUN"})

        const embed2 = new EmbedBuilder()
        .setColor("Purple")
        .setTitle("Komendy ogólne")
        .addFields({ name: "/pomoc", value: "Zrób /pomoc dla listy poleceń i supportu"})
        .addFields({ name: "/ping", value: "Zrób /ping i zobacz co odpisze ci bot."})
        .addFields({ name: "/regulamin", value: "Zrób /regulamin i sprawdż jakie mamy zasady."})
        .setFooter({ text: "Komendy ogólne"})
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Purple")
        .setTitle("Komendy moderacji")
        .addFields({ name: "/ban", value: "Zrób /ban, aby zbanować członka"})
        .addFields({ name: "/unban", value: "Zrób /unban, aby odbanować członka"})
        .addFields({ name: "/wycisz", value: "Zrób /mute, aby wyciszyć członka"})
        .addFields({ name: "/odcisz", value: "Zrób /unmute, aby odciszyć członka"})
        .addFields({ name: "/wyczysc", value: "Zrób /wyczysc, aby wyczyszczyć chat"})
        .addFields({ name: "/wyrzuc", value: "Zrób /wyrzuc, to aby wyrzucić członka"})
        .setFooter({ text: "Komendy moderacji"})
        .setTimestamp()

        const embed4 = new EmbedBuilder()
        .setColor("Purple")
        .setTitle("Komendy 4FUN")
        .addFields({ name: "/8ball", value: "Zrób /8ball i zadaj pytanie"})
        .addFields({ name: "/mem", value: "Zrób /mem żeby zobaczyć mema"})
        .setFooter({ text: "Komendy 4FUN"})
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`strona1`)
            .setLabel(`Strona 1`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`strona2`)
            .setLabel(`Strona 2`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`strona3`)
            .setLabel(`Strona 3`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`strona4`)
            .setLabel(`Strona 4`)
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {
            
            if (i.customId === 'strona1') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Tylko ${interaction.user.tag} może korzystać z tej komendy!`, ephemeral: true})
                }
                await i.update({ embeds: [embed], components: [button] })
            }

            if (i.customId === 'strona2') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Tylko ${interaction.user.tag} może korzystać z tej komendy!`, ephemeral: true})
                }
                await i.update({ embeds: [embed2], components: [button] })
            }

            if (i.customId === 'strona3') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Tylko ${interaction.user.tag} może korzystać z tej komendy!`, ephemeral: true})
                }
                await i.update({ embeds: [embed3], components: [button] })
            }


            if (i.customId === 'strona4') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Tylko ${interaction.user.tag} może korzystać z tej komendy!`, ephemeral: true})
                }
                await i.update({ embeds: [embed4], components: [button] })
            }
        })


    }
}