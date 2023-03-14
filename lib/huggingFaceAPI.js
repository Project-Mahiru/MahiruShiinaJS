const axios = require('axios');

async function query(prompt) {
  if (process.env.LOCALAPI) {
    try {
      const response = await axios.post(
        `${process.env.LOCALAPI}api/v1/talk`,
        {
          prompt: prompt
        },
        {
          timeout: 5000
        }
      );
      const result = response.data.response;
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/Hobospider132/DialoGPT-Mahiru-Proto",
        {
          inputs: {
            text: prompt,
          },
        },
        {
          headers: { Authorization: "Bearer " + process.env.HTOKEN }, // HTOKEN is my API key for HuggingFace
        }
      );
      const result = response.data.generated_text;
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = query;
