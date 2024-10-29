"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv.config();
// Initialize the Discord client
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMembers],
});
// Retrieve the bot token and channel ID from environment variables
const botToken = process.env.BOT_TOKEN;
const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
// Ensure botToken and welcomeChannelId are available
if (!botToken || !welcomeChannelId) {
    console.error('Bot token or welcome channel ID is missing in .env file');
    process.exit(1); // Exit the process if required information is missing
}
// Event listener for when the bot is ready
client.once('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
// Event listener for when a new member joins the guild
client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) {
        console.error(`Channel with ID ${welcomeChannelId} not found`);
        return;
    }
    const welcomeText = `heyyy khoshumadi ${member}`;
    yield channel.send(welcomeText);
    // Use path to image file
    const imagePath = path_1.default.join(__dirname, 'welcome-image.png');
    const attachment = new discord_js_1.AttachmentBuilder(imagePath);
    yield channel.send({ files: [attachment] });
}));
client.login(botToken);
