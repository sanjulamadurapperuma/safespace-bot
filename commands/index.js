// get all commands from files
const fs = require('fs')
const commands = []
fs.readdir('./commands', (err, files) => {
  files.forEach(file => {
    if (!file.endsWith('.js') || file === 'index.js') return
    commands.push(require(`./${file}`))
  })
})

module.exports = function(msg, options) {
  for (let command of commands) {
    // console.log(command.regex(options))
    const match = command.regex(options).exec(msg.content)
    if (match) {
      // admin check
      if (command.admin && msg.guild.owner != msg.author.id)
        msg.channel.send(`This command is only available to the server admin.`)
      // execute command
      else command.action(msg, options, match)
      return true
    }
  }
}
