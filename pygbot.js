var child_process = require("child_process");
var fs            = require("fs");
var https         = require("https");
var Discord = require("/usr/local/lib/node_modules/discord.io");
var logger  = require("/usr/local/lib/node_modules/winston");
var authorization = require("./token.json");

function random_choice(arr) {
	return arr[Math.floor(arr.length * Math.random())];
}
function download(url, dest, cb) {
	//https://stackoverflow.com/a/22907134/688624
	var file = fs.createWriteStream(dest);
	var request = https.get(url, function (response) {
		response.pipe(file);
		file.on("finish", function () {
			file.close(cb);
		});
	}).on("error", function (err) {
		fs.unlink(dest);
		if (cb) cb(err.message);
	});
};

var msgs_ping = [
	"Yes; I'm here.", "Pong!", "mhmmm?", "yes hello?"
];
var msgs_done = [
	"Here ya go, $!", "Lookin' good, $!", "$ Well done.", "$ I live to serve.", "$ Your wish is my command.", "$ Complete!", "Hope this helps, $.", "$ Coming along nicely."
];
var msgs_reactions = [
	//"\:heart:"
	"✅","👍"
];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = "debug";

// Initialize Discord Bot
var client = new Discord.Client({ token:authorization.token, autorun:true });
client.on("ready", function (evt) {
	logger.info("Logged in as: "+client.username+" (id "+client.id+")");
});
client.on("message", function (user, userID, channelID, msg, evt) {
	//logger.info("Got msg: \""+msg+"\".");

	//Ignore our own messages.
	if (userID!=client.id);
	else return;

	//If we are tagged, then:
	if (msg.includes("<@"+client.id+">")) {
		//client.sendMessage({ to:channelID, message:"I've been mentioned by "+userID+", <"+userID+">, <@"+userID+">, "+user+", @"+user+"!" });

		if (evt.d.attachments.length==1) {
			client.addReaction({ channelID:channelID, messageID:evt.d.id, reaction:random_choice(msgs_reactions) });

			download(evt.d.attachments[0].url,"tmp/__program.py",function () {
				child_process.exec("python ./run_script.py", function (error, stdout, stderr) {
					//client.sendMessage({ to:channelID, message:"error: \""+error+"\", stdout: \""+stdout+"\", stderr: \""+stderr+"\"" });

					client.uploadFile({
						to:channelID,
						file: "tmp/__screenshot.png",
						filename: "screenshot.png",
						message: random_choice(msgs_done).replace("$","<@"+userID+">")
					});
				});
			});
		} else if (msg.includes("ping")) {
			client.sendMessage({ to:channelID, message:random_choice(msgs_ping) });
		} else if (msg.includes("help")) {
			client.sendMessage({ to:channelID, message:"Basically, just upload your .py file and tag me in the \"add a comment\" section with \"<@"+client.id+">\" so that I know to look for it.  Then, I'll download your file and try to run it.  I'll take a screenshot after a second a so and post it back here." });
		} else {
			client.sendMessage({ to:channelID, message:"(No command. Try \"<@"+client.id+"> help\" for info?)" });
		}
	}

	/*for (var prop in msg) {
		logger.info("."+prop+": "+msg[prop]);
	}
	for (var prop in evt.d.attachments[0].url) {
		logger.info("."+prop+": "+evt.d.attachments[0][prop]);
	}*/
});
