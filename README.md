# MahiruShiinaJS
The code for Mahiru Shiina discord bot AI

By Hobospider132

This code uses the huggingface API to talk to Mahiru AI and is built off DialoGPT as well as the dialogue from Otonari no Tenshi-sama  
Written in JS in case Oleg is willing to merge it with the current Mahiru bot. Hosted with UptimeRobot at the moment. Added a Python version because... uh... I forgot why we added it 💀 (It was added for simplicity as discord.py is more... flexible? Also Python is easier to understand)

Required modules: 

`discord.js v.14`
`@replit/node-fetch`

Thanks to:

- Sleeping Italian, Singaporean child and Mahiru Shiina for helping out with making the dataset  
- Winword.zip, Tech. TTGames and Akshayan Singla for helping out with the code  

Special thanks to:

- Sleeping Italian for carrying the dataset
- Winword.zip for improvement and debugging of code 
- Tech. TTGames for providing template code for Python version

TODO:

- [ ] Finish dataset 
- [x] Find a way to ping HuggingFace model every 5 minutes, (maybe look into a time.sleep equivalent) [Pinging doesn't do anything, the model still goes offline]
- [ ] Get a database and append all chat history to it (maybe try brain browser or mongodb)
- [ ] Figure out a way to load a database to HuggingFace model
- [ ] add a way to disable keepalive server when not running on replit
- [ ] add a way to load enviorment varible from docker stuff instead when running on docker
