const { EmbedBuilder } = require('discord.js');
const db = require('../db/database');

module.exports = {
  name: 'rep',
  description: 'Дать репутацию пользователю',
  async execute(message, args) {
    const targetUser = message.mentions.users.first();
    if (!targetUser) return message.reply('Укажите пользователя!');

    // Проверка, чтобы нельзя было накручивать себе
    if (targetUser.id === message.author.id) {
      return message.reply('Нельзя повышать репутацию себе!');
    }

    // Добавление репутации в БД
    try {
      await db.query(
        'INSERT INTO reputation (user_id, guild_id, rep_points) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE rep_points = rep_points + 1',
        [targetUser.id, message.guild.id]
      );

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`✅ ${targetUser.username} получил +1 к репутации!`);
      
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Произошла ошибка!');
    }
  },
};
