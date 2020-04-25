const http = require("http");
require("dotenv").config();

let listeners = 0;

const tokenLastfm = process.env.LASTFM_TOKEN;

http
  .get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=placebo&api_key=${tokenLastfm}&format=json`,
    (res) => {
      let data = "";
      let results = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", () => {
        data = JSON.parse(data);
        results = data.results;
        listeners = results.artistmatches.artist[0].listeners;

        console.log(listeners);
      });
    }
  )
  .on("error", (err) => {
    console.log("error");
  });

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true,
});

bot.onText(/\/echo/, (msg, match) => {
  const id = msg.chat.id;
  bot.sendMessage(id, "Echo command");
});

bot.onText(/\/start/, (msg, match) => {
  const id = msg.chat.id;
  bot.sendMessage(id, `Hello`);
});

bot.onText(/\/kbd/, (msg, match) => {
  const id = msg.chat.id;
  bot.sendMessage(id, "Выберите команду", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Show me Listeners",
            callback_data: "listeners",
          },
        ],
      ],
    },
  });
});

bot.on("callback_query", (query) => {
  const id = query.message.chat.id;
  if (query.data === "listeners") {
    bot.sendMessage(id, listeners);
  }
});

bot.onText(/\/listeners/, (msg, match) => {
  const id = msg.chat.id;
  bot.sendMessage(id, listeners);
});

bot.on("message", (msg) => {
  const id = msg.chat.id;
  const text = msg.text.toLowerCase();
  if (text === "hi") {
    bot.sendMessage(id, "Hi");
  }
});
