let chat = null;
let token = null;
let alert = null;
let goal = null;
let emoji = null;

// taken from iframe extension so i can make streamlabs features work --

const featurePolicy = {
  accelerometer: "'none'",
  "ambient-light-sensor": "'none'",
  battery: "'none'",
  camera: "'none'",
  "display-capture": "'none'",
  "document-domain": "'none'",
  "encrypted-media": "'none'",
  fullscreen: "'none'",
  geolocation: "'none'",
  gyroscope: "'none'",
  magnetometer: "'none'",
  microphone: "'none'",
  midi: "'none'",
  payment: "'none'",
  "picture-in-picture": "'none'",
  "publickey-credentials-get": "'none'",
  "speaker-selection": "'none'",
  usb: "'none'",
  vibrate: "'none'",
  vr: "'none'",
  "screen-wake-lock": "'none'",
  "web-share": "'none'",
  "interest-cohort": "'none'",
};

const SANDBOX = [
  "allow-same-origin",
  "allow-scripts",
  "allow-forms",
  "allow-modals",
  "allow-popups",

  // The big one we don't want to include is allow-top-navigation
];

class Twitch {
  getInfo() {
    return {
      id: 'boptwitch',
      name: 'Twitch',
      color1: '#772CE8',
      blocks: [
        {
          blockType: Scratch.BlockType.LABEL,
          text: "Twitch Chat",
        },
        {
          opcode: 'setupchat',
          text: 'setup chat [username] chat fade enabled [fade] show bots [bots] prevent clipping [prevent] width [width] height [height] position [position]',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://tekinical.github.io/twitchURI.png',
          arguments: {
            username: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Twitch Username'
            },
            fade: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 30
            },
            bots: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: true
            },
            prevent: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: false
            },
            width: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "100%"
            },
            height: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "100%"
            },
            position: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "absolute"
            }
          }
        },
        {
          opcode: 'closechat',
          text: 'close chat',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://tekinical.github.io/twitchURI.png'
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: "Streamlabs",
        },
        {
          opcode: 'settoken',
          text: 'set streamlabs token [token]',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico',
          arguments: {
            token: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'streamlabs token (get it from one of the widget links!!)'
            }
          }
        },
        {
          opcode: 'alert',
          text: 'create alert',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico'
        },
        {
          opcode: 'goal',
          text: 'create goal',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico'
        },
        {
          opcode: 'emoji',
          text: 'create emoji pop',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico'
        },
        {
          opcode: 'closealert',
          text: 'close alert',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico'
        },
        {
          opcode: 'closegoal',
          text: 'close goal',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico'
        },
        {
          opcode: 'closeemoji',
          text: 'close emoji pop',
          blockType: Scratch.BlockType.COMMAND,
          blockIconURI: 'https://streamlabs.com/favicon.ico'
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: "Utilities",
        },
        {
          opcode: 'true',
          text: 'true',
          blockType: Scratch.BlockType.BOOLEAN,
          blockIconURI: 'https://tekinical.github.io/twitchURI.png'
        },
        {
          opcode: 'false',
          text: 'false',
          blockType: Scratch.BlockType.BOOLEAN,
          blockIconURI: 'https://tekinical.github.io/twitchURI.png'
        },
      ]
    }
  }

  setupchat(args) {
    var Link = "https://nightdev.com/hosted/obschat/?theme=bttv_dark&channel=" + args.username + "&fade=" + args.fade + "&bot_activity=" + args.bots + "&prevent_clipping=" + args.prevent;
    chat = document.createElement("iframe");
    chat.style.width = args.width;
    chat.style.height = args.height;
    chat.style.border = "none";
    chat.style.position = args.position;
    chat.setAttribute("allowtransparency", "true");
    chat.setAttribute("src", Link);
    Scratch.renderer.addOverlay(chat, "manual");
  }

  closechat() {
    if (chat == null) {
      console.log("Can't close chat if chat wasn't opened.");
    } else {
      Scratch.renderer.removeOverlay(chat);
      chat = null;
    }
  }

  settoken(args) {
    token = args.token;
  }

  alert() {
    if (token == null) {
      console.log("Please set your token before using Streamlabs with Twitch.")
    } else {
      var Link = "https://streamlabs.com/alert-box/v3/" + token;
      alert = document.createElement("iframe");
      alert.style.width = "100%";
      alert.style.height = "100%";
      alert.style.border = "none";
      alert.style.position = "absolute";
      alert.setAttribute("allowtransparency", "true");
      alert.setAttribute("src", Link);
      Scratch.renderer.addOverlay(alert, "manual");
    }
  }

  goal(args) {
    if (token == null) {
      console.log("Please set your token before using Streamlabs with Twitch.")
    } else {
      var Link = "https://streamlabs.com/widgets/follower-goal?token=" + token;
      goal = document.createElement("iframe");
      goal.style.width = "100%";
      goal.style.height = "100%";
      goal.style.border = "none";
      goal.style.position = "absolute";
      goal.setAttribute("sandbox", SANDBOX.join(" "));
      goal.setAttribute(
        "allow",
        Object.entries(featurePolicy)
          .map(([name, permission]) => `${name} ${permission}`)
          .join("; ")
      );
      goal.setAttribute("allowtransparency", "true");
      goal.setAttribute("src", Link);
      Scratch.renderer.addOverlay(goal, "manual");
    }
  }

  emoji(args) {
    if (token == null) {
      console.log("Please set your token before using Streamlabs with Twitch.")
    } else {
      var Link = "https://streamlabs.com/widgets/emote-wall?token=" + token;
      console.log(Link);
      emoji = document.createElement("iframe");
      emoji.style.width = "100%";
      emoji.style.height = "100%";
      emoji.style.border = "none";
      emoji.style.position = "absolute";
      emoji.setAttribute("allowtransparency", "true");
      emoji.setAttribute("src", Link);
      Scratch.renderer.addOverlay(emoji, "manual");
    }
  }

  closealert() {
    if (alert == null) {
      console.log("Can't close alerts if chat wasn't opened.");
    } else {
      Scratch.renderer.removeOverlay(alert);
      alert = null;
    }
  }

  closegoal() {
    if (goal == null) {
      console.log("Can't close goals if chat wasn't opened.");
    } else {
      Scratch.renderer.removeOverlay(goal);
      goal = null;
    }
  }

  closeemoji() {
    if (emoji == null) {
      console.log("Can't close emoji wall if chat wasn't opened.");
    } else {
      Scratch.renderer.removeOverlay(emoji);
      emoji = null;
    }
  }

  true() {
    return true;
  }

  false() {
    return false;
  }
}

Scratch.extensions.register(new Twitch());
