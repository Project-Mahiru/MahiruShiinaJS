const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
require("dotenv").config();
const os = require("os");
const percent = require("../lib/cpuStat");

function parseDuration(duration) {
  const time = {
    days: Math.floor(duration / (24 * 60 * 60 * 1000)),
    hours: Math.floor((duration / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((duration / (60 * 1000)) % 60),
    seconds: Math.floor((duration / 1000) % 60),
  };

  const parts = [];

  if (time.days) {
    parts.push(`${time.days} day${time.days > 1 ? "s" : ""}`);
  }

  if (time.hours) {
    parts.push(`${time.hours} hour${time.hours > 1 ? "s" : ""}`);
  }

  if (time.minutes) {
    parts.push(`${time.minutes} minute${time.minutes > 1 ? "s" : ""}`);
  }

  if (time.seconds) {
    parts.push(`${time.seconds} second${time.seconds > 1 ? "s" : ""}`);
  }

  return parts.join(", ");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("get serverinfo"),
  async execute(client, interaction) {
    const cpuUsage = process.cpuUsage();
    const cores = os.cpus().length;
    const uptimeSeconds = process.uptime();
    const cpuUsagePercent =
      ((cpuUsage.user + cpuUsage.system) / cores / uptimeSeconds) * 100;

    percent(async function (e, percent, seconds) {
      const botinfo = new EmbedBuilder()
        .setAuthor({
          name: `${client.user.tag} Information`,
          iconURL: client.user.displayAvatarURL(),
          url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
        })

        .setDescription(
          `\`\`\`yml\nName: ${client.user.tag} [${
            client.user.id
          }]\nBot Latency: ${Math.round(
            Date.now() - interaction.createdTimestamp
          )}ms\nApi Latency: ${Math.round(client.ws.ping)}ms\nRuntime: ${
            parseDuration(client.uptime)
          }\`\`\``
        )
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
          {
            name: `💿 General -- Stats`,
            value: `\`\`\`yml\nServers: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size}\n\`\`\``,
            inline: true,
          },
          {
            name: "💿 Bot -- Stats",
            value:
              "```\nNode.js: " +
              process.version +
              "\nDiscord.js: v" +
              Discord.version +
              "```",
            inline: true,
          },
          {
            name: "💿 System -- Stats",
            value: `\`\`\`\yml\nOS: Linux | Debian\nCPU Usage: ${percent.toFixed(
              2
            )} %\nRAM Usage: ${(
              process.memoryUsage().heapUsed /
              1024 /
              1024
            ).toFixed(2)} MB\`\`\``,
          },
          {
            name: "CPU",
            value: "```md\n" + os.cpus().map((i) => `${i.model}`)[0] + "```",
          },
          {
            name: "🤖 CPU usage",
            value: "`" + percent.toFixed(2) + "%`",
            inline: true,
          },
          {
            name: "🤖 Arch",
            value: "`" + os.arch() + "`",
            inline: true,
          },
          {
            name: "💾 Disk Space -- Stats",
            value: `\`\`\`\yml\nTotal Disk Space: ${(
              os.totalmem() /
              1024 /
              1024 /
              1024
            ).toFixed(2)} GB\nFree Disk Space: ${(
              os.freemem() /
              1024 /
              1024 /
              1024
            ).toFixed(2)} GB\`\`\``,
          },
          {
            name: "🧮 Uptime",
            value: `\`\`\`\n${parseDuration(client.uptime)}\`\`\``,
          }
        );
      await interaction.reply({
        embeds: [botinfo],
      });
    });
  },
};
