const db = require('./db/firestore')

module.exports = {
  getUserInGuildFromText(msg, searchText) {
    if (searchText.length < 2) return
    const usersInGuild = msg.guild.members.array()
    const userNamesInGuild = usersInGuild.map(user => ({
      ...user,
      searchString: `${user.user.username} ${user.user.username}#${
        user.user.discriminator
      } ${user.nickname ? user.nickname : ''} <@!${user.id}>`.toLowerCase(),
    }))
    const foundUser = userNamesInGuild.find(
      userName => userName.searchString.indexOf(searchText.toLowerCase()) >= 0
    )
    return foundUser
  },

  async getAllOffendersInGuild(guild) {
    const memberIds = guild.members.array().map(m => m.id || m.user.id)
    return await db.getAllMemberInfractions({ memberIds })
  },

  getUserInGuildFromId(guild, id) {
    if (!guild || !id) return
    const usersInGuild = guild.members.array()
    return usersInGuild.find(user => (user.id || user.user.id) == id)
  },

  getLabelFromUser(user) {
    return `${user.nickname ? user.nickname + ' (' : ''}${user.user.username}#${
      user.user.discriminator
    }${user.nickname ? ')' : ''}`
  },
}