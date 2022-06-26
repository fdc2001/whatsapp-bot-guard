## Project to manage group in whatsapp
### ⚠️ Project stay in development ⚠️
### 📝 Project description

The project plans to be an automated bot to manage whatsapp groups.

## 📝 Features
- [x] Verify content of message contain link and remove after 3 warnings
- [x] command to list all admins in group (/admins)
- [x] command to close group only admins send message (/close) and (/open) to allow all users send message
- [x] command add to send in private link for group to a user mentioned in command (/add 123456789)
- [x] command to list rules configured in group (/rules)
- [x] command to list all commands available (/help)


### Commands for config group
For config a new group and manage rules for bot send this commands in private chat with bot:
- [x] /start to start the configuration of group
- [x] /changePermissions for change permissions of group
- [x] /create for create a new group with a bot and configurations predefined

# Installation

```bash 
git clone https://github.com/fdc2001/whatsapp-bot-guard.git &&
cd whatsapp-bot-guard &&
sh install.sh &&
npm install
```
The command wil be installing the dependencies

### Tanks
The project is being developed based on the library: [Open-wa/wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs.git)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


