const { SlashCommandBuilder, CommandInteraction, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription(`Wyczyszcza wybraną ilość wiadomości na danym kanale!`)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addIntegerOption(option => option
        .setName('ilość')
        .setDescription(`Ilość wiadomości która ma być wyczyszczona.`)
        .setRequired(true)
        )
        .addUserOption(option => option
            .setName('osoba')
            .setDescription(`Wybierz osobę której wiadomości mają być wyczyszczone`)
            .setRequired(false)
            ),
            async execute(interaction, client) {
                const {channel, options} = interaction;

                const amount = options.getInteger('ilość');
                const user = options.getUser('osoba');

                const messages = await channel.messages.fetch({
                    limit: amount +1,
                });

                const res = new EmbedBuilder()
                    .setColor('Purple')

                if(user) {
                    let i = 0;
                    const filtered = [];

                    (await messages).filter((msg) => {
                        if(msg.author.id === user.id && amount > i) {
                            filtered.push(msg);
                            i++;
                        }
                    });

                    await channel.bulkDelete(filtered).then(messages => {
                        res.setDescription(`:white_check_mark: | Pomyślnie usunięto ${messages.size} wiadomości  użytkownika ${user}!`);
                        interaction.reply({ embeds: [res] });
                    });
                } else {
                    await channel.bulkDelete(amount, true).then(messages => {
                        res.setDescription(`:white_check_mark: | Pomyślnie usunięto ${messages.size} wiadomości z kanału!`);
                        interaction.reply({ embeds: [res] });
                    });
                }
            }
}