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
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// タイマー通知エンドポイント
const { EmbedBuilder } = require("discord.js");

// 通知エンドポイント
app.post("/notify", async (req, res) => {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);

    // Embed 作成
    const embed = new EmbedBuilder()
  .setTitle("<:poteti:1468073766549459026> タイマー終了！<:kbtk:1468076409481068688>")
  .setDescription("@here \n<:sika:1468071889414131899>設定した時間になりました！")
  .setColor(0x00ff00)
  .setTimestamp(new Date())
  .setFooter({ text: "<:sika:1468071889414131899>鹿タイマー" })
  .setThumbnail("https://assets.stickpng.com/images/580b57fbd9996e24bc43bbb1.png"); // 右上に表示される小さな画像


    await channel.send({ embeds: [embed] });
    res.sendStatus(200);
  } catch (err) {
    console.error("通知エラー:", err);
    res.sendStatus(500);
  }
});

// ポート設定（Railwayでは環境変数PORTが自動設定される）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
