const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const { customId, values, guild, member } = interaction; 
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({ content: "Przedawniona komenda" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {

      if (customId == "Zweryfikuj") {
        const role = interaction.guild.roles.cache.get("ID ROLI");
        return interaction.member.roles.add(role).then((member) =>
          interaction.reply({
            content: `✅ | Pomyślnie zweryfikowano cię jako członek na naszym serwerze!`,
            ephemeral: true,
          })
        );
      }
    } else if (interaction.isSelectMenu()) {
      if (customId == "reakcje-role") {
        for (let i = 0; i < values.length; i++) {
          const roleId = values[i];

          const role = guild.roles.cache.get(roleId);
          const hasRole = member.roles.cache.has(roleId);

          switch (hasRole) {
            case true:
              member.roles.remove(roleId);
              break;
            case false:
              member.roles.add(roleId);
              break;
          }
        }

        interaction.reply({ content: "Rola zaktualizowana.", ephemeral: true });
      }
    } else {
      return;
    }
  },
};
