const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true,
});

bot.onText(/\/echo/, (msg, match) => {
  const id = msg.chat.id;
  console.log(msg);
  bot.sendMessage(id, "Echo command");
});

bot.on("message", (msg) => {
  console.log(msg);
  const id = msg.chat.id;
  const text = msg.text.toLowerCase();
  if (text === "hi") {
    bot.sendMessage(id, "Hi");
  } else {
    bot.sendMessage(id, msg.text);
  }
});
