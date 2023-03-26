const { EmbedBuilder } = require("@discordjs/builders");
const {GuildMember} = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member
   */
  execute(member) {
    const {user, guild} = member;
    const memberLogs = member.guild.channels.cache.get('ID KANALU GDZIE MA BYC POWITANIE');
    const welcomeMessage = `Witamy <@${member.id}> na serwerze **Nazwa serwera*!** Życzymy miłej zabawy!`;
    
    const welcomeEmbed = new EmbedBuilder()
    .setTitle('** Przyleciała nowa osoba :partying_face: **')
    .setColor(0x4ea3f7)
    .setDescription(welcomeMessage)
    .setTimestamp();

    memberLogs.send({embeds: [welcomeEmbed]});
    console.log(`Użytkownik o id ${member.id} dołączył na nasz serwer .`)
  },
};