# PygBot
## A Discord bot that auto-runs Python graphics code

This is a bot for Discord that, when you upload an attachment and tag it, will download that attachment and attempt to run it as Python code.  After a one-second delay, it will take a screenshot and upload it.  This may be useful for showing examples in graphics frameworks like [pygame](https://www.pygame.org/news), without bothering to take a screenshot yourself.

# Installation

(Note: setting up this bot required *lots* of trial and error.  These steps are as-best as I can remember and ascertain which steps were important.  Feedback and corrections especially welcome here.)

**IMPORTANT NOTE: PygBot currently does no sandboxing.  This is a security risk.  It is essential to run only in a VM or system you do not care about.**

1. Prerequisites:
    1. `sudo apt-get install nodejs`
    2. `sudo npm init`
    3. `sudo npm install -g izy521/discord.io winston --save`
    4. Create a folder where you want the bot to run from.
    5. Download and extract PygBot into this folder.
2. Create and add the Discord app:
    1. Go to [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me) and click "New App".
    2. The recommended app name is "pygbot" (Python Graphics Bot).  Add a helpful description, if you like.  Click "Create App".
    3. Add bot user.
    4. Copy the client ID into "CLIENTID" in this URL: https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=0
    5. Go to that URL and select a server you control.  A placeholder for the bot will join the server.
    6. Copy the token into the field in "token.json".
3. Start bot: `node pygbot.js`

<!--
This needed?
`sudo apt-get install scrot imagemagick python-gtk2 python-qt4 python-pyside`
-->

# Interaction

The main usage is to upload an attachment and tag "@pygbot" in the add-comment section.  It will download the attachment, run it, take a screenshot after a one-second delay, and upload the screenshot with an appropriate quip.

Without an attachment, you can mention "help" to get it to describe its usage, or "ping" to get it to talk (very stupidly) back to you.

# Known Issues

Sandboxing is not yet implemented.  This is a security risk.

Capturing a screenshot does not work on at least VirtualBox VMs.  I believe this is a bug in their graphics utilities, but more study is needed.

If the program results in an error, the bot will happily take a screenshot anyway.  Instead, it should report the error with an apologetic or encouraging message.