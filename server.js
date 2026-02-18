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
  .setTitle("<:lw:1473557143993978914> じかんだけど～？<:lw:1473557143993978914>")
  .setDescription("@here \n**<:lw:1473557143993978914>設定した時間になりました！**<:lw:1473557143993978914>")
  .setColor(0x00ff00)
  .setTimestamp(new Date())
  .setFooter({ text: "LWタイマー" })
  .setThumbnail("https://i.namu.wiki/i/37Lm6iCzuM0Y2oiAIsWFPiGuaU9tyd3Sxn2_PxHiIBK_XhZpo4_zPXFD0D2OcYp8m2m4IwHDGzt7ZOLuIzq64OyW_nC2WVXYVZYCVshQBoawLl81vKTXWlcfv81jb6L3aE4oaxp-DKFhng1fI1abKQ.webp"); // 右上に表示される小さな画像


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
