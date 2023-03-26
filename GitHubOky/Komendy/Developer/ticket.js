const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction, PermissionsBitField, PermissionOverwriteManager, PermissionOverwrites } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Tworzy wiadomość ticketa [ komenda dozowolna dla administratorów ]'),
    async execute (interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content:"Aby utworzyć ticketa musisz posiadać uprawnień administratora"})

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('🎫')
            .setLabel('Otwórz ticket')
            .setStyle(ButtonStyle.Success),
        )

        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle("Centrum Pomocy!")
        .setDescription("Witaj! W tym kanale możesz otworzyć ticket. Wystarczy, że klikniesz na reakcję poniżej, aby otworzyć nowy ticket.")

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `${i.user.tag}-ticket`,
                type: ChannelType.GuildText,
                parent: 'ID KATALOGU Z TICKETAMI'
            });


            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true} );
            channel.permissionOverwrites.create( channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false } );

            channel.send({ content: `Witaj ${i.user}! Twój ticket został utworzony pomyślnie! Opisz swój problem i czekaj na pomoc!`})
            i.user.send(`Twój ticket na serwerze **${i.guild.name}** został stworzony. Możesz go znaleść pod ${channel}.`).catch(err => {
                return;
            });
        })
    }
}