# MahiruShiinaJS
The code for Mahiru Shiina discord bot AI

By Hobospider132

This code uses the huggingface API to talk to Mahiru AI and is built off DialoGPT as well as the dialogue from Otonari no Tenshi-sama  
Written in JS in case Oleg is willing to merge it with the current Mahiru bot. Hosted with UptimeRobot at the moment.  
[Python version](https://github.com/Hobospider132/MahiruShiinaPy).

Required modules: 

`discord.js v.14`
`@replit/node-fetch`

Thanks to:

- Sleeping Italian, Singaporean child and Mahiru Shiina for helping out with making the dataset  
- Winword.zip, Tech. TTGames and Akshayan Singla for helping out with the code  
- Everyone else who helped out with the dataset 

Special thanks to:

- Sleeping Italian for carrying the dataset
- Winword.zip for improvement and debugging of code 

TODO:

- [ ] Finish dataset 
- [ ] Get a database and append all chat history to it (maybe try brain browser or mongodb)
- [ ] Figure out a way to load a database to HuggingFace model
- [x] add Dockerfile
- [x] add a way to disable keepalive server when not running on replit
- [x] add a way to load enviorment varible from docker stuff instead when running on docker
