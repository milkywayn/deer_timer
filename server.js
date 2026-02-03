// server.js
require('dotenv').config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

// Discord Bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// Botログイン
client.login(TOKEN);

// タイマー通知エンドポイント
app.post("/notify", async (req, res) => {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send("⏰ タイマーが終了しました！");
    res.sendStatus(200);
  } catch (err) {
    console.error("通知エラー:", err);
    res.sendStatus(500);
  }
});

// ポート設定（Railwayでは環境変数PORTが自動設定される）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
