/*
Coded By: ChokunPlayZ
Enail: chokun@chokunplayz.com
Discord: winword.zip#0036
Any Question regrads this file should be directed to me, I'll be the person that can resolve any issue you will encounter
*/

const fetch = require('@replit/node-fetch');

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Hobospider132/DialoGPT-Mahiru-Proto",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Authorization: "Bearer " + process.env.HTOKEN } // HTOKEN is my API key for HuggingFace
        }
    );
    const result = await response.json();
    return result;
}

module.exports = query;