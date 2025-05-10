module.exports = {
  name: 'rep',
  description: 'Выдать репутацию пользователю',
  async execute(message, args) {
    const targetUser = message.mentions.users.first();
    if (!targetUser) return message.reply('Укажите пользователя!');

    // Здесь может быть логика работы с БД (MySQL)
    message.channel.send(`✅ ${targetUser.username} получил +1 к репутации!`);
  },
};
