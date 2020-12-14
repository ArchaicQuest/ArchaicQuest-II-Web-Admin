# ArchaicQuest II - Web Admin
![alt ArchaicQuest II](https://i.imgur.com/LUv3vGm.png)

This is the content management system project for [ArchaicQuest II](https://github.com/ArchaicQuest/ArchaicQuest-II).

The main goal is to have all the content for the game managed from the web, this includes:
* Items
* Mobs
* Mob Scripts (Responding to events, moving from a to b, other basic AI)
* NPC Dialogue
* Quests
* Skills
* Spells
* Races
* Classes
* World Building (Rooms / Areas)

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
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:1337/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
