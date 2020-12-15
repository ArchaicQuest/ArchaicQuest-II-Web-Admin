# ArchaicQuest II - Web Admin
![alt ArchaicQuest II](https://i.imgur.com/LUv3vGm.png)

This is the content management system project for [ArchaicQuest II](https://github.com/ArchaicQuest/ArchaicQuest-II). The goal is to have all the content for the game managed from the web.

## Current Features
- Dashboard with stats on Items, mobs, area/rooms, and quests. List of who's playing. Stats on new accounts and characters per month. PvP & PvE kill stats coming soon 📈
- Manage game settings: Double XP, gains, and quest points. Toggle PvP/thieving ⚙
-  Manage admin users and view logs of game changes 🎫
- View/Add/Edit Areas & rooms 🏦
- View/Add/Edit Items ⚔
- View/Add/Edit Mobs 👹
- View/Add/Edit Skills & spells ✨
- View/Add/Edit Classes 🧙‍♂️
- View/Add/Edit Quests ⁉
- Lua scripting for mobs & quests 📜

ArchaicQuest II comprises of [3 projects](https://github.com/ArchaicQuest) that are required together.


| Project                                                                                     | Description                                                                                                            |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [ArchaicQuest II](https://github.com/ArchaicQuest/ArchaicQuest-II)                          | C# game engine, contains the web API for the admin tool and the SignalR hub for the web socket connects to the client. |
| [ArchaicQuest II - Admin tool](https://github.com/ArchaicQuest/ArchaicQuest-II-Web-Admin)   | Angular 8+ web admin, allows creation and management of your MUD world.                                                |
| [ArchaicQuest II - Game Client](https://github.com/ArchaicQuest/ArchaicQuest-II-Web-Client) | Angular 8+ web client for connecting to the game and playing with others.                                              |

---
## Running the project

You need [Node.js](https://nodejs.org/en/) installed

Run `npm install` in the directory where you cloned the repo

Run `npm start` to run the project. Navigate to `http://localhost:1337/`. The app will automatically reload if you change any of the source files.

## Build for production

Run `npm run buildProd` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
 
## Screenshots

### Dashboard
![alt ArchaicQuestII Web Admin](https://i.imgur.com/PTJRxlr.png)

### Area / Room View

![alt ArchaicQuestII Web Admin](https://i.imgur.com/Wd7H8E2.png)


![alt ArchaicQuestII Web Admin](https://cdn.discordapp.com/attachments/660365544377155604/764419912088420352/editRoom.PNG)

### Mob view/Edit
![alt ArchaicQuestII Web Admin](https://i.imgur.com/JKt7bMw.png)

### Mob List view
![alt ArchaicQuestII Web Admin](https://i.imgur.com/FXCTNCQ.png)
