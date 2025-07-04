const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

// Configuration
const token = process.env.TELEGRAM_BOT_TOKEN;
const webappUrl = process.env.WEBAPP_URL;
const PORT = process.env.PORT || 3000;

// Création du bot
const bot = new TelegramBot(token, {polling: true});
const app = express();

// Serveur web minimal
app.get('/', (req, res) => {
  res.send('🤖 BillByte Bot est opérationnel 24/7!');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Gestionnaire pour la commande /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const welcomeMessage = `🚀 Bienvenue sur BillByte ($BBY) - Le pont entre richesse physique et numérique!\n\n` +
                         `Cliquez sur le bouton ci-dessous pour accéder à notre application :`;
  
  bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Accéder à BillByte", url: webappUrl }],
        [{ text: "Rejoindre notre communauté", url: "https://t.me/billbytecommunity" }]
      ]
    }
  });
});

// Gestionnaire pour le bouton "billbyte"
bot.onText(/billbyte/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🌐 Voici le lien vers notre application: ${webappUrl}`);
});

console.log('🤖 Bot BillByte démarré avec succès!');