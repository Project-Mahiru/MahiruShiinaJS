# MahiruShiinaJS
The code for Mahiru Shiina discord bot AI

By Hobospider132

This code uses the huggingface API to talk to Mahiru AI and is built off DialoGPT as well as the dialogue from Otonari no Tenshi-sama
Written in JS in case Oleg is willing to merge it with the current Mahiru bot. Hosted with UptimeRobot at the moment

Required modules: 

discord.js v.14
@replit/node-fetch latest version
node-cron

Thanks to:

Sleeping Italian, Singaporean child and Mahiru Shiina for helping out with making the dataset
Winword.zip and Akshayan Singla for helping out with the code

TODO:

- [ ] Finish dataset 
- [x] Find a way to ping HuggingFace model every 5 minutes, (maybe look into a time.sleep equivalent) 
- [ ] Get a database and append all chat history to it (maybe try brain browser or mongodb)
- [ ] Figure out a way to load a database to HuggingFace model

