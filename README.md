# TeamSpeak5-OBS-Overlay

This is an overlay for OBS to show the current talking clients in your TeamSpeak5 Channel.  
This App uses the new "Remote Apps" feature of TeamSpeak5.

This overlay uses the [TeamSpeak Remote App API](https://github.com/DerTyp7/react-teamspeak-remote-app-api).

![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/d0ab06f2-1a36-479d-826f-bd4bd3d405b7)

- [TeamSpeak5-OBS-Overlay](#teamspeak5-obs-overlay)
  - [Usage](#usage)
    - [Quick instructions](#quick-instructions)
    - [Detailed instructions](#detailed-instructions)
  - [Common Issues](#common-issues)
    - [The overlay is empty, but i'm connected to a TeamSpeak5 server](#the-overlay-is-empty-but-im-connected-to-a-teamspeak5-server)
    - [OBS doesn't show the latest version of the overlay](#obs-doesnt-show-the-latest-version-of-the-overlay)
  - [Setup (Developer)](#setup-developer)

## Usage

### Quick instructions

1. Open this link in your Browser: [https://ts5-overlay.tealfire.de/#/generate](https://ts5-overlay.tealfire.de/#/generate)
2. Follow the instructions on the website
3. Accept overlay inside TeamSpeak5  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/aa83b07d-3dea-461f-9487-f9e6a299f2f3)

### Detailed instructions

Try this instruction if you have problems with the quick instructions above.

1. Open this link in your Browser: [https://ts5-overlay.tealfire.de/#/generate](https://ts5-overlay.tealfire.de/#/generate)

2. Follow the instructions on the website

3. Go into the TeamSpeak5 Settings and enable "Remote Apps"  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/b31bc553-fde2-46ab-b07c-d3c81339cc7d)

4. Add a new Browser Source to your OBS Scene  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/0198b468-bb96-4b65-bdd4-3d6bb3ef7d25)  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/58ad399f-5344-456f-b243-6e267b489fd5)

5. Enter the in step 1 generated URL into the URL field of the Browser Source
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/e8fd4a1b-be70-4123-8d28-4dc7ebc8c2bd)

6. Set the width and height to your desired size. Recommended is a width of 1000px and the height is determined of how many clients are expected (play around with these values)

7. You should now receive a notification in TeamSpeak5 that the app is allowed to connect to your TeamSpeak5 client. Allow it. (If you don't get a notification, restart TeamSpeak5 and OBS -> try again)  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/40faa435-e128-415f-98eb-a9e8809e8f65)

## Common Issues

### The overlay is empty, but i'm connected to a TeamSpeak5 server

**Fix 1**  
Make sure you accepted the notification in your TeamSpeak Client.

**Fix 2**  
Sadly TeamSpeak5 does not give us any information about the current active server tab.  
So we try currently use a workaround, where the active server tab is determined by looking on which server the your hardware input was unmuted the latest, since the non-active server tabs in TS5 usually mute the client’s microphone.

However this workaround is not 100% accurate and can fail in some cases.

Possible fixes:

- Unmute and mute yourself in the active server tab (Just a normal unmute and mute, not the hardware mute)
- Reconnect to the TS5 server while the overlay is open

### OBS doesn't show the latest version of the overlay

This can happen if the OBS Browser Source is caching the overlay.  
To fix this, open the Browser Source settings and click on "Refresh cache of current page".

## Setup (Developer)

1. Clone this repository
2. Run `npm install`
3. To start the development server run `npm run dev`

> **Note:** Pull requests are welcome, but please be consistent with the code style.  
> This project uses [Prettier](https://prettier.io/) to format the code.  
> Pull requests always in the `dev` branch.
