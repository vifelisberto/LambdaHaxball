ballOut=true;
ballOut2=true;
kirmiziTakim=[];
maviTakim=[];redTeam  =[0,0,0,0,0,0];
blueTeam =[0,0,0,0,0,0];
redT=[];
blueT=[];
var roomName = "CyberLambda";
var maxPlayers = 8;
var roomPublic = false;
var playerName = "";
var ModoChatPausado = [];
voteKickList=[];
 
/* STADIUM */
//Wartości dotyczą boiska na którym rozgrywany jest mecz - wartości domyślne to oficjalna mapa RS
var stadiumWidth = 1150;
var stadiumHeight = 600;
var radiusBall = 9.8;
var throwInLeeway = 350;
var greenLine = 510;
 
/* SETTINGS */
 
var triggerDistance = radiusBall + 15 + 0.01;
var outLineY = stadiumWidth - (radiusBall / 2) + 6;
stadiumWidth += (radiusBall / 2) + 6;
stadiumHeight += (radiusBall / 2) + 6;
var abuser = 0;
 
var Team = {
    SPECTATORS: 0,
    RED: 1,
    BLUE: 2
};
var lastScores = 0;
var lastTeamTouched = 0;
var lineBallPosition;
var exitingPos = null;
var previousBallPos;
var assistingTouch = "";
var lastPlayerTouched = "";
var lat = -34.5;
var long = -58.4;
var backMSG = false;
var lastCall;
var lastCall2;
var isBallUp = false;
var crossed = false;
var isTimeAddedShown = false;
var isTimeAddedShowndos = false;
var isTimeAddedShowntres = false;
var isTimeAddedShowncuatro = false;
var isTimeAddedShowncinco = false;
var isTimeAddedShownseis = false;
var isTimeAddedShownquince = false;
var isTimeAddedShownsiete = false;
var lineCrossedPlayers = [{name: "temp", times: 0}];
var isBallKickedOutside = false;
var previousPlayerTouched;
var timeOutside = 0;

var db = { p: { N: 6, kt: 2 }, log: [] }; function f(a, b, c) { for (var i = 0; i < a.length; i += 1) { if (a[i][b] === c) { return i; } } return -1; } function spammerosFilter(player, message) { if (player.id == 0) { return; } var ind = f(db.log, 'id', player.id); db.log[ind].lm.push({ ts: Date.now() }); if (db.log[ind].lm.length >= db.p.N) { db.log[ind].lm.splice(0, db.log[ind].lm.length - db.p.N); if (db.log[ind].lm.length / ((db.log[ind].lm[db.log[ind].lm.length - 1].ts - db.log[ind].lm[0].ts) / 30000) > db.p.kt) { room.kickPlayer(player.id, "[👎] ❌ 🚫 𝐏𝐑𝐎𝐇𝐈𝐁𝐈𝐃𝐎 𝐒𝐏𝐀𝐌𝐌𝐄𝐑𝐎𝐒 🚫 ❌ ", true); } } }
var room = HBInit({ roomName: roomName, maxPlayers: maxPlayers, public: roomPublic, playerName: playerName,token: "thr1.AAAAAFyRjgZMy18R2w9YjQ.-FYMqQV18YE", geo: {"code": "CX", "lat": lat, "lon": long }});
var RawRGLHMap=`
{

	"name" : "[⚽] 𝚁𝙴𝙰𝙻 𝚂𝙾𝙲𝙲𝙴𝚁 1.3D by 𝑅𝑎𝑤𝑅 & 𝐺𝐿𝐻",

	"width" : 1400,

	"height" : 670,

	"bg" : { "type" : "grass", "width" : 1150, "height" : 600, "kickOffRadius" : 180, "color" : "6a9158" },

	"vertexes" : [
		/* 0 */ { "x" : 0, "y" : 700, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 1 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 2 */ { "x" : 0, "y" : -180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 3 */ { "x" : 0, "y" : -700, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 4 */ { "x" : 1150, "y" : 255, "cMask" : [ ] },
		/* 5 */ { "x" : 840, "y" : 255, "cMask" : [ ] },
		/* 6 */ { "x" : 1150, "y" : -255, "cMask" : [ ] },
		/* 7 */ { "x" : 840, "y" : -255, "cMask" : [ ] },
		/* 8 */ { "x" : 1150, "y" : 155, "cMask" : [ ] },
		/* 9 */ { "x" : 1030, "y" : 155, "cMask" : [ ] },
		/* 10 */ { "x" : 1150, "y" : -155, "cMask" : [ ] },
		/* 11 */ { "x" : 1030, "y" : -155, "cMask" : [ ] },
		/* 12 */ { "x" : 840, "y" : -135, "cMask" : [ ] },
		/* 13 */ { "x" : 840, "y" : 135, "cMask" : [ ] },
		/* 14 */ { "x" : -1150, "y" : -255, "cMask" : [ ] },
		/* 15 */ { "x" : -840, "y" : -255, "cMask" : [ ] },
		/* 16 */ { "x" : -1150, "y" : 255, "cMask" : [ ] },
		/* 17 */ { "x" : -840, "y" : 255, "cMask" : [ ] },
		/* 18 */ { "x" : -1150, "y" : -155, "cMask" : [ ] },
		/* 19 */ { "x" : -1030, "y" : -155, "cMask" : [ ] },
		/* 20 */ { "x" : -1150, "y" : 155, "cMask" : [ ] },
		/* 21 */ { "x" : -1030, "y" : 155, "cMask" : [ ] },
		/* 22 */ { "x" : -840, "y" : 135, "cMask" : [ ] },
		/* 23 */ { "x" : -840, "y" : -135, "cMask" : [ ] },
		/* 24 */ { "x" : 935, "y" : 4, "cMask" : [ ] },
		/* 25 */ { "x" : 935, "y" : -4, "cMask" : [ ] },
		/* 26 */ { "x" : -935, "y" : 4, "cMask" : [ ] },
		/* 27 */ { "x" : -935, "y" : -4, "cMask" : [ ] },
		/* 28 */ { "x" : -1150, "y" : 525, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 29 */ { "x" : -1075, "y" : 600, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 30 */ { "x" : -1075, "y" : -600, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 31 */ { "x" : -1150, "y" : -525, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 32 */ { "x" : 1075, "y" : 600, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 33 */ { "x" : 1150, "y" : 525, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 34 */ { "x" : 1150, "y" : -525, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 35 */ { "x" : 1075, "y" : -600, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 36 */ { "x" : -1150, "y" : 127, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 37 */ { "x" : -1214, "y" : 124, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 38 */ { "x" : -1150, "y" : -127, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 39 */ { "x" : -1214, "y" : -124, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 40 */ { "x" : 1150, "y" : 127, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 41 */ { "x" : 1214, "y" : 124, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 42 */ { "x" : 1150, "y" : -127, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		/* 43 */ { "x" : 1214, "y" : -124, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		
		/* 44 */ { "x" : 0, "y" : -4, "cMask" : [ ] },
		/* 45 */ { "x" : 0, "y" : 4, "cMask" : [ ] },
		/* 46 */ { "x" : 0, "y" : -4, "cMask" : [ ] },
		/* 47 */ { "x" : 0, "y" : 4, "cMask" : [ ] },
		/* 48 */ { "x" : -1214, "y" : 124, "cMask" : [ ] },
		/* 49 */ { "x" : -1250, "y" : 150, "cMask" : [ ] },
		/* 50 */ { "x" : -1214, "y" : -124, "cMask" : [ ] },
		/* 51 */ { "x" : -1250, "y" : -150, "cMask" : [ ] },
		/* 52 */ { "x" : 1214, "y" : 124, "cMask" : [ ] },
		/* 53 */ { "x" : 1250, "y" : 150, "cMask" : [ ] },
		/* 54 */ { "x" : 1214, "y" : -124, "cMask" : [ ] },
		/* 55 */ { "x" : 1250, "y" : -150, "cMask" : [ ] },
		/* 56 */ { "x" : -1185, "y" : 155, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 57 */ { "x" : -1185, "y" : 255, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 58 */ { "x" : 1185, "y" : 155, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 59 */ { "x" : 1185, "y" : 255, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 60 */ { "x" : -1185, "y" : -155, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 61 */ { "x" : -1185, "y" : -255, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 62 */ { "x" : 1185, "y" : -155, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 63 */ { "x" : 1185, "y" : -255, "bCoef" : -4.5, "cMask" : ["ball" ] },
		/* 64 */ { "x" : 1158, "y" : -607, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 65 */ { "x" : 1187, "y" : -578, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 66 */ { "x" : 1158, "y" : 607, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 67 */ { "x" : 1187, "y" : 578, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 68 */ { "x" : -1158, "y" : 607, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 69 */ { "x" : -1187, "y" : 578, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 70 */ { "x" : -1158, "y" : -607, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 71 */ { "x" : -1187, "y" : -578, "bCoef" : -2.45, "cMask" : ["ball" ] },
		/* 72 */ { "x" : -1190, "y" : -255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 73 */ { "x" : -1180, "y" : -255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 74 */ { "x" : -1190, "y" : -155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 75 */ { "x" : -1180, "y" : -155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 76 */ { "x" : -1190, "y" : 155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 77 */ { "x" : -1180, "y" : 155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 78 */ { "x" : -1190, "y" : 255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 79 */ { "x" : -1180, "y" : 255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 80 */ { "x" : 1190, "y" : -255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 81 */ { "x" : 1180, "y" : -255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 82 */ { "x" : 1190, "y" : -155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 83 */ { "x" : 1180, "y" : -155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 84 */ { "x" : 1190, "y" : 255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 85 */ { "x" : 1180, "y" : 255, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 86 */ { "x" : 1190, "y" : 155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 87 */ { "x" : 1180, "y" : 155, "bCoef" : -1, "cMask" : ["ball" ] },
		/* 88 */ { "x" : -1148, "y" : -525, "cMask" : [ ] },
		/* 89 */ { "x" : 1148, "y" : -525, "cMask" : [ ] },
		/* 90 */ { "x" : -1148, "y" : 525, "cMask" : [ ] },
		/* 91 */ { "x" : 1148, "y" : 525, "cMask" : [ ] },
		/* 92 */ { "x" : -1150, "y" : -260, "cMask" : [ ] },
		/* 93 */ { "x" : -840, "y" : -600, "cMask" : [ ] },
		/* 94 */ { "x" : -1150, "y" : 260, "cMask" : [ ] },
		/* 95 */ { "x" : -840, "y" : 600, "cMask" : [ ] },
		/* 96 */ { "x" : 1150, "y" : -260, "cMask" : [ ] },
		/* 97 */ { "x" : 840, "y" : -600, "cMask" : [ ] },
		/* 98 */ { "x" : 1150, "y" : 260, "cMask" : [ ] },
		/* 99 */ { "x" : 840, "y" : 600, "cMask" : [ ] },
		/* 100 */ { "x" : -1416, "y" : -475, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 101 */ { "x" : -1300, "y" : -475, "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["red" ] },
		/* 102 */ { "x" : -1300, "y" : 475, "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["red" ] },
		/* 103 */ { "x" : -1416, "y" : 475, "bCoef" : 0, "cMask" : ["blue" ] },
		
		/* 104 */ { "x" : -1414, "y" : -475, "trait" : "kickOffBarrier" },
		/* 105 */ { "x" : -1300, "y" : -475, "trait" : "kickOffBarrier" },
		/* 106 */ { "x" : -1300, "y" : 475, "trait" : "kickOffBarrier" },
		/* 107 */ { "x" : -1416, "y" : 475, "trait" : "kickOffBarrier" },
		
		/* 108 */ { "x" : -1356, "y" : -76, "bCoef" : 0, "cMask" : ["blue" ], "color" : "6666FF" },
		/* 109 */ { "x" : -1356, "y" : 84, "bCoef" : 0, "cMask" : ["blue" ], "color" : "6666FF" },
		/* 110 */ { "x" : -1361, "y" : -76, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 111 */ { "x" : -1351, "y" : -76, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 112 */ { "x" : -1361, "y" : 84, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 113 */ { "x" : -1351, "y" : 84, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 114 */ { "x" : -1410, "y" : -76, "bCoef" : 0, "cMask" : ["red" ] },
		/* 115 */ { "x" : -1410, "y" : 84, "bCoef" : 0, "cMask" : ["red" ] },
		/* 116 */ { "x" : 1400, "y" : -475, "bCoef" : 0, "cMask" : ["red" ], "dist" : -1400 },
		/* 117 */ { "x" : 1300, "y" : -475, "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["blue" ] },
		/* 118 */ { "x" : 1300, "y" : 475, "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["blue" ] },
		/* 119 */ { "x" : 1400, "y" : 475, "bCoef" : 0, "cMask" : ["red" ], "dist" : -1400 },
		
		/* 120 */ { "x" : 1400, "y" : -475, "trait" : "kickOffBarrier", "dist" : -1400 },
		/* 121 */ { "x" : 1300, "y" : -475, "trait" : "kickOffBarrier" },
		/* 122 */ { "x" : 1300, "y" : 475, "trait" : "kickOffBarrier" },
		/* 123 */ { "x" : 1400, "y" : 475, "trait" : "kickOffBarrier", "dist" : -1400 },
		
		/* 124 */ { "x" : 1345, "y" : -82, "bCoef" : 0, "cMask" : ["red" ], "color" : "FF6666" },
		/* 125 */ { "x" : 1345, "y" : 78, "bCoef" : 0, "cMask" : ["red" ], "color" : "FF6666" },
		/* 126 */ { "x" : 1350, "y" : -82, "bCoef" : 0, "cMask" : ["red" ] },
		/* 127 */ { "x" : 1340, "y" : -82, "bCoef" : 0, "cMask" : ["red" ] },
		/* 128 */ { "x" : 1350, "y" : 78, "bCoef" : 0, "cMask" : ["red" ] },
		/* 129 */ { "x" : 1340, "y" : 78, "bCoef" : 0, "cMask" : ["red" ] },
		/* 130 */ { "x" : 1410, "y" : -82, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 131 */ { "x" : 1410, "y" : 78, "bCoef" : 0, "cMask" : ["blue" ] }

	],

	"segments" : [
		{ "v0" : 37, "v1" : 39, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		{ "v0" : 43, "v1" : 41, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		
		{ "v0" : 4, "v1" : 5, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 5, "v1" : 7, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 6, "v1" : 7, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 8, "v1" : 9, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 9, "v1" : 11, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 10, "v1" : 11, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 13, "v1" : 12, "curve" : 130, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 0.4663076581549986 },
		{ "v0" : 14, "v1" : 15, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 15, "v1" : 17, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 16, "v1" : 17, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 18, "v1" : 19, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 19, "v1" : 21, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 20, "v1" : 21, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 23, "v1" : 22, "curve" : 130, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 0.4663076581549986 },
		{ "v0" : 25, "v1" : 24, "curve" : 180, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 27, "v1" : 26, "curve" : 180, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 24, "v1" : 25, "curve" : 180, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 26, "v1" : 27, "curve" : 180, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 24, "v1" : 25, "curve" : 89.99999999999999, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 1.0000000000000002 },
		{ "v0" : 26, "v1" : 27, "curve" : 89.99999999999999, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 1.0000000000000002 },
		{ "v0" : 25, "v1" : 24, "curve" : 89.99999999999999, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 1.0000000000000002 },
		{ "v0" : 27, "v1" : 26, "curve" : 89.99999999999999, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 1.0000000000000002 },
		{ "v0" : 24, "v1" : 25, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 26, "v1" : 27, "color" : "C7E6BD", "cMask" : [ ] },
		{ "v0" : 28, "v1" : 29, "curve" : 89.99999999999999, "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["wall" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 30, "v1" : 31, "curve" : 89.99999999999999, "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["wall" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 32, "v1" : 33, "curve" : 89.99999999999999, "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["wall" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 34, "v1" : 35, "curve" : 89.99999999999999, "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["wall" ], "curveF" : 1.0000000000000002 },
		
		{ "v0" : 36, "v1" : 37, "color" : "FFFFFF", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		{ "v0" : 39, "v1" : 38, "color" : "FFFFFF", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		{ "v0" : 41, "v1" : 40, "color" : "FFFFFF", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		{ "v0" : 42, "v1" : 43, "color" : "FFFFFF", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "line" },
		
		{ "v0" : 45, "v1" : 44, "curve" : 180, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 46, "v1" : 47, "curve" : 180, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 45, "v1" : 44, "curve" : 89.99999999999999, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 1.0000000000000002 },
		{ "v0" : 46, "v1" : 47, "curve" : 89.99999999999999, "color" : "C7E6BD", "cMask" : [ ], "curveF" : 1.0000000000000002 },
		{ "v0" : 48, "v1" : 49, "color" : "FFFFFF", "cMask" : [ ] },
		{ "v0" : 50, "v1" : 51, "color" : "FFFFFF", "cMask" : [ ] },
		{ "v0" : 52, "v1" : 53, "color" : "FFFFFF", "cMask" : [ ] },
		{ "v0" : 54, "v1" : 55, "color" : "FFFFFF", "cMask" : [ ] },
		{ "v0" : 56, "v1" : 57, "curve" : 40, "color" : "BEB86C", "bCoef" : -4.7, "cMask" : ["ball" ], "curveF" : 2.7474774194546225 },
		{ "v0" : 59, "v1" : 58, "curve" : 40, "color" : "BEB86C", "bCoef" : -4.7, "cMask" : ["ball" ], "curveF" : 2.7474774194546225 },
		{ "v0" : 61, "v1" : 60, "curve" : 40, "color" : "BEB86C", "bCoef" : -4.7, "cMask" : ["ball" ], "curveF" : 2.7474774194546225 },
		{ "v0" : 62, "v1" : 63, "curve" : 40, "color" : "BEB86C", "bCoef" : -4.7, "cMask" : ["ball" ], "curveF" : 2.7474774194546225 },
		{ "v0" : 65, "v1" : 64, "curve" : 59.99999999999999, "color" : "BEB86C", "bCoef" : -2.45, "cMask" : ["ball" ], "curveF" : 1.7320508075688774 },
		{ "v0" : 66, "v1" : 67, "curve" : 59.99999999999999, "color" : "BEB86C", "bCoef" : -2.45, "cMask" : ["ball" ], "curveF" : 1.7320508075688774 },
		{ "v0" : 69, "v1" : 68, "curve" : 59.99999999999999, "color" : "BEB86C", "bCoef" : -2.45, "cMask" : ["ball" ], "curveF" : 1.7320508075688774 },
		{ "v0" : 70, "v1" : 71, "curve" : 59.99999999999999, "color" : "BEB86C", "bCoef" : -2.45, "cMask" : ["ball" ], "curveF" : 1.7320508075688774 },
		{ "v0" : 0, "v1" : 1, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 1, "v1" : 2, "curve" : 180, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 2, "v1" : 1, "curve" : 180, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 2, "v1" : 3, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 72, "v1" : 73, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 74, "v1" : 75, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 76, "v1" : 77, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 78, "v1" : 79, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 80, "v1" : 81, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 82, "v1" : 83, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 84, "v1" : 85, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 86, "v1" : 87, "bCoef" : -1, "cMask" : ["ball" ] },
		{ "v0" : 88, "v1" : 89, "color" : "5E844D", "cMask" : [ ] },
		{ "v0" : 90, "v1" : 91, "color" : "5E844D", "cMask" : [ ] },
		{ "v0" : 93, "v1" : 92, "curve" : 100, "color" : "5E844D", "cMask" : [ ], "curveF" : 0.83909963117728 },
		{ "v0" : 94, "v1" : 95, "curve" : 100, "color" : "5E844D", "cMask" : [ ], "curveF" : 0.83909963117728 },
		{ "v0" : 96, "v1" : 97, "curve" : 100, "color" : "5E844D", "cMask" : [ ], "curveF" : 0.83909963117728 },
		{ "v0" : 99, "v1" : 98, "curve" : 100, "color" : "5E844D", "cMask" : [ ], "curveF" : 0.83909963117728 },
		{ "v0" : 100, "v1" : 101, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "y" : -475 },
		{ "v0" : 101, "v1" : 102, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["red" ], "x" : -1300 },
		{ "v0" : 102, "v1" : 103, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "y" : 475 },
		
		{ "v0" : 104, "v1" : 105, "trait" : "kickOffBarrier", "y" : -475 },
		{ "v0" : 106, "v1" : 107, "trait" : "kickOffBarrier", "y" : 475 },
		
		{ "v0" : 108, "v1" : 109, "color" : "6666FF", "bCoef" : 1000000, "cMask" : ["blue" ] },
		{ "v0" : 110, "v1" : 111, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 112, "v1" : 113, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 114, "v1" : 115, "vis" : false, "bCoef" : 1000000, "cMask" : ["red" ], "x" : -1410 },
		{ "v0" : 116, "v1" : 117, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "y" : -475 },
		{ "v0" : 117, "v1" : 118, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["blue" ], "x" : 1300 },
		{ "v0" : 118, "v1" : 119, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "y" : 475 },
		
		{ "v0" : 120, "v1" : 121, "trait" : "kickOffBarrier", "y" : -475 },
		{ "v0" : 122, "v1" : 123, "trait" : "kickOffBarrier", "y" : 475 },
		
		{ "v0" : 124, "v1" : 125, "color" : "FF6666", "bCoef" : 1000000, "cMask" : ["red" ] },
		{ "v0" : 126, "v1" : 127, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 128, "v1" : 129, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 130, "v1" : 131, "vis" : false, "bCoef" : 1000000, "cMask" : ["blue" ], "x" : 1410 }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -635, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [0,-1 ], "dist" : -635, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [0,1 ], "dist" : -675, "bCoef" : 0 },
		{ "normal" : [0,-1 ], "dist" : -675, "bCoef" : 0 },
		{ "normal" : [1,0 ], "dist" : -1214, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [-1,0 ], "dist" : -1214, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [1,0 ], "dist" : -1420, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -1420, "bCoef" : 0 }

	],

	"goals" : [
		{ "p0" : [-1161.3,-124 ], "p1" : [-1161.3,124 ], "team" : "red" },
		{ "p0" : [1161.3,124 ], "p1" : [1161.3,-124 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 9.8, "invMass" : 1.05, "cGroup" : ["ball","kick","score" ] },
		{ "radius" : 5, "invMass" : 0, "pos" : [-1150,127 ], "color" : "ffffff" },
		{ "radius" : 5, "invMass" : 0, "pos" : [-1150,-127 ], "color" : "ffffff" },
		{ "radius" : 5, "invMass" : 0, "pos" : [1150,127 ], "color" : "ffffff" },
		{ "radius" : 5, "invMass" : 0, "pos" : [1150,-127 ], "color" : "ffffff" },
		{ "radius" : 3, "invMass" : 0, "pos" : [-1250,150 ], "color" : "4a4e52", "bCoef" : 3, "cMask" : [ ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [-1250,-150 ], "color" : "4a4e52", "bCoef" : 3, "cMask" : [ ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [1250,150 ], "color" : "4a4e52", "bCoef" : 3, "cMask" : [ ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [1250,-150 ], "color" : "4a4e52", "bCoef" : 3, "cMask" : [ ] },
		{ "radius" : 2, "invMass" : 0, "pos" : [-1150,-600 ], "bCoef" : -0.1, "cMask" : ["ball" ] },
		{ "radius" : 2, "invMass" : 0, "pos" : [-1150,600 ], "bCoef" : -0.1, "cMask" : ["ball" ] },
		{ "radius" : 2, "invMass" : 0, "pos" : [1150,-600 ], "bCoef" : -0.1, "cMask" : ["ball" ] },
		{ "radius" : 2, "invMass" : 0, "pos" : [1150,600 ], "bCoef" : -0.1, "cMask" : ["ball" ] }

	],

	"playerPhysics" : {
		"acceleration" : 0.12,
		"kickStrength" : 5.65

	},
	"ballPhysics" : "disc0",

	"spawnDistance" : 500,

	"redSpawnPoints" : [
		[ -217, -30
		],
		[ -217, 30
		],
		[ -217, 90
		],
		[ -217, -90
		],
		[ -217, 150
		],
		[ -217, -150
		],
		[ -110, 654
		],
		[ -70, 654
		],
		[ -30, 654
		]

	],

	"blueSpawnPoints" : [
		[ 217, -30
		],
		[ 217, 30
		],
		[ 217, 90
		],
		[ 217, -90
		],
		[ 217, 150
		],
		[ 217, -150
		],
		[ 110, 654
		],
		[ 70, 654
		],
		[ 30, 654
		]

	],

	"traits" : {
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"line" : { "vis" : true, "cMask" : [ ] }

	}
}`;

var MiniRS=`
{

	"name" : "Mɪɴɪ 𝐑𝐒 ʙʏ 𝒓𝒔𝒌 & 𝐆𝐋𝐇",

	"width" : 940,

	"height" : 380,

	"spawnDistance" : 350,

	"bg" : { "type" : "hockey", "width" : 700, "height" : 320, "kickOffRadius" : 80, "cornerRadius" : 0 },

	"playerPhysics" : {
		"bCoef" : 0.1,
		"invMass" : 0.7,
		"acceleration" : 0.11,
		"kickingAcceleration" : 0.05,
		"kickStrength" : 5.67

	},

	"ballPhysics" : {
		"radius" : 9.9,
		"bCoef" : 0.5,
		"invMass" : 1,
		"damping" : 0.99,
		"color" : "FFDD00",
		"cMask" : [ "all"
		],
		"cGroup" : [ "ball"
		]

	},

	"vertexes" : [
		/* 0 */ { "x" : 700, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 1 */ { "x" : 491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 2 */ { "x" : 700, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 3 */ { "x" : 491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 4 */ { "x" : 700, "y" : 125, "trait" : "line", "color" : "004DFF" },
		/* 5 */ { "x" : 614, "y" : 125, "trait" : "line", "color" : "004DFF" },
		/* 6 */ { "x" : 700, "y" : -125, "trait" : "line", "color" : "004DFF" },
		/* 7 */ { "x" : 614, "y" : -125, "trait" : "line", "color" : "004DFF" },
		/* 8 */ { "x" : 491, "y" : -90, "trait" : "line", "curve" : -130, "color" : "004DFF" },
		/* 9 */ { "x" : 491, "y" : 79, "trait" : "line", "curve" : -130, "color" : "004DFF" },
		/* 10 */ { "x" : -700, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 11 */ { "x" : -491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 12 */ { "x" : -700, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 13 */ { "x" : -491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 14 */ { "x" : -700, "y" : -125, "trait" : "line", "color" : "F00000" },
		/* 15 */ { "x" : -614, "y" : -125, "trait" : "line", "color" : "F00000" },
		/* 16 */ { "x" : -700, "y" : 125, "trait" : "line", "color" : "F00000" },
		/* 17 */ { "x" : -614, "y" : 125, "trait" : "line", "color" : "F00000" },
		/* 18 */ { "x" : -491, "y" : 85, "trait" : "line", "curve" : -130, "color" : "F00000" },
		/* 19 */ { "x" : -491, "y" : -89, "trait" : "line", "curve" : -130, "color" : "F00000" },
		/* 20 */ { "x" : 556, "y" : 4.5, "trait" : "line", "color" : "2e2604" },
		/* 21 */ { "x" : 556, "y" : -4.5, "trait" : "line", "color" : "2e2604" },
		/* 22 */ { "x" : -553, "y" : 4.5, "trait" : "line", "color" : "2e2604" },
		/* 23 */ { "x" : -553, "y" : -4.5, "trait" : "line", "color" : "2e2604" },
		
		/* 24 */ { "x" : -700, "y" : -320, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 25 */ { "x" : -700, "y" : -386, "cMask" : ["ball" ], "vis" : false },
		/* 26 */ { "x" : -700, "y" : -320, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 27 */ { "x" : -700, "y" : -386, "cMask" : ["ball" ], "vis" : false },
		/* 28 */ { "x" : 700, "y" : -320, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 29 */ { "x" : 700, "y" : -390, "cMask" : ["ball" ], "vis" : false },
		/* 30 */ { "x" : 700, "y" : 390, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 31 */ { "x" : 700, "y" : 320, "cMask" : ["ball" ], "vis" : false },
		/* 32 */ { "x" : -700, "y" : 390, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 33 */ { "x" : -700, "y" : 320, "cMask" : ["ball" ], "vis" : false },
		/* 34 */ { "x" : -969, "y" : -123, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 35 */ { "x" : -822, "y" : -124, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 36 */ { "x" : -822, "y" : 123, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 37 */ { "x" : -967, "y" : 123, "bCoef" : 0, "cMask" : ["blue" ] },
		
		/* 38 */ { "x" : -969, "y" : -123, "trait" : "kickOffBarrier" },
		/* 39 */ { "x" : -822, "y" : -123, "trait" : "kickOffBarrier" },
		/* 40 */ { "x" : -822, "y" : 123, "trait" : "kickOffBarrier" },
		/* 41 */ { "x" : -969, "y" : 123, "trait" : "kickOffBarrier" },
		
		/* 42 */ { "x" : -909, "y" : -83, "bCoef" : 0, "cMask" : ["blue" ], "color" : "2257D2" },
		/* 43 */ { "x" : -909, "y" : 77, "bCoef" : 0, "cMask" : ["blue" ], "color" : "2257D2" },
		/* 44 */ { "x" : -914, "y" : -83, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 45 */ { "x" : -904, "y" : -83, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 46 */ { "x" : -914, "y" : 77, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 47 */ { "x" : -904, "y" : 77, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 48 */ { "x" : -959, "y" : -83, "bCoef" : 0, "cMask" : ["red" ] },
		/* 49 */ { "x" : -959, "y" : 77, "bCoef" : 0, "cMask" : ["red" ] },
		/* 50 */ { "x" : 969, "y" : -123, "bCoef" : 0, "cMask" : ["red" ] },
		/* 51 */ { "x" : 822, "y" : -123, "bCoef" : 0, "cMask" : ["red" ] },
		/* 52 */ { "x" : 822, "y" : 123, "bCoef" : 0, "cMask" : ["red" ] },
		/* 53 */ { "x" : 969, "y" : 123, "bCoef" : 0, "cMask" : ["red" ] },
		
		/* 54 */ { "x" : 969, "y" : -123, "trait" : "kickOffBarrier" },
		/* 55 */ { "x" : 823, "y" : -123, "trait" : "kickOffBarrier" },
		/* 56 */ { "x" : 822, "y" : 123, "trait" : "kickOffBarrier" },
		/* 57 */ { "x" : 969, "y" : 123, "trait" : "kickOffBarrier" },
		
		/* 58 */ { "x" : 911, "y" : -90, "bCoef" : 0, "cMask" : ["red" ], "color" : "FF2121" },
		/* 59 */ { "x" : 911, "y" : 70, "bCoef" : 0, "cMask" : ["red" ], "color" : "FF2121" },
		/* 60 */ { "x" : 916, "y" : -90, "bCoef" : 0, "cMask" : ["red" ] },
		/* 61 */ { "x" : 906, "y" : -90, "bCoef" : 0, "cMask" : ["red" ] },
		/* 62 */ { "x" : 916, "y" : 70, "bCoef" : 0, "cMask" : ["red" ] },
		/* 63 */ { "x" : 906, "y" : 70, "bCoef" : 0, "cMask" : ["red" ] },
		/* 64 */ { "x" : 961, "y" : -90, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 65 */ { "x" : 961, "y" : 70, "bCoef" : 0, "cMask" : ["blue" ] },
		
		/* 66 */ { "x" : -720, "y" : 236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 67 */ { "x" : -720, "y" : 152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 68 */ { "x" : -720, "y" : -152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 69 */ { "x" : -720, "y" : -236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 70 */ { "x" : 720, "y" : -236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 71 */ { "x" : 720, "y" : -152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 72 */ { "x" : 720, "y" : 152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "FFDD00" },
		/* 73 */ { "x" : 720, "y" : 236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "FFDD00" },
		/* 74 */ { "x" : -700, "y" : 83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "curve" : 0 },
		/* 75 */ { "x" : -760, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "vis" : false, "curve" : 12 },
		/* 76 */ { "x" : -700, "y" : -83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "curve" : 0 },
		/* 77 */ { "x" : -760, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "vis" : false, "curve" : 12 },
		/* 78 */ { "x" : -760, "y" : 82, "trait" : "line", "color" : "ffffff" },
		/* 79 */ { "x" : -760, "y" : -82, "trait" : "line", "color" : "ffffff" },
		/* 80 */ { "x" : -760, "y" : 82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		/* 81 */ { "x" : -760, "y" : -82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		/* 82 */ { "x" : 703.01261034953, "y" : -83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "curve" : 0 },
		/* 83 */ { "x" : 761, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "vis" : false, "curve" : 12 },
		/* 84 */ { "x" : 701, "y" : 83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "curve" : 0 },
		/* 85 */ { "x" : 761, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "vis" : false, "curve" : 12 },
		/* 86 */ { "x" : 761, "y" : -82, "trait" : "line", "color" : "ffffff" },
		/* 87 */ { "x" : 761, "y" : 82, "trait" : "line", "color" : "ffffff" },
		/* 88 */ { "x" : 761, "y" : -82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		/* 89 */ { "x" : 761, "y" : 82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		
		/* 90 */ { "x" : 0, "y" : -80, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		/* 91 */ { "x" : 0, "y" : -390, "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		/* 92 */ { "x" : -1, "y" : 390, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		/* 93 */ { "x" : 0, "y" : 80, "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		
		/* 94 */ { "x" : -491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 95 */ { "x" : -491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 96 */ { "x" : 491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 97 */ { "x" : 491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 98 */ { "x" : -700, "y" : 320, "trait" : "line", "color" : "FFDD00" },
		/* 99 */ { "x" : -700, "y" : -320, "trait" : "line", "color" : "FFDD00" },
		/* 100 */ { "x" : 700, "y" : 320, "trait" : "line", "color" : "FFDD00" },
		/* 101 */ { "x" : 700, "y" : -320, "trait" : "line", "color" : "FFDD00" },
		
		/* 102 */ { "x" : 0, "y" : 81, "trait" : "kickOffBarrier", "color" : "fcfcfc", "vis" : false },
		
		/* 103 */ { "x" : 0, "y" : -5, "trait" : "line", "color" : "FFDD00" },
		/* 104 */ { "x" : 0, "y" : 3, "trait" : "line", "color" : "FFDD00" },
		/* 105 */ { "x" : 0, "y" : -5, "trait" : "line", "color" : "FFDD00" },
		/* 106 */ { "x" : 0, "y" : 3, "trait" : "line", "color" : "FFDD00" },
		
		/* 107 */ { "x" : -30, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0 },
		/* 108 */ { "x" : -30, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0 },
		/* 109 */ { "x" : 30, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0 },
		/* 110 */ { "x" : 30, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0, "color" : "FFFFFF" },
		/* 111 */ { "x" : 80.5, "y" : 3, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : 12 },
		/* 112 */ { "x" : -80.5, "y" : 4, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : -12 },
		/* 113 */ { "x" : 72, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5, "vis" : true, "color" : "eec215" },
		/* 114 */ { "x" : -72, "y" : 35, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5, "vis" : true, "color" : "eec215" },
		/* 115 */ { "x" : 78.8, "y" : -19, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : 12 },
		/* 116 */ { "x" : -78.8, "y" : -18, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : -12 },
		/* 117 */ { "x" : 63, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : 154, "vis" : true, "color" : "eec215" },
		/* 118 */ { "x" : -64, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : 154, "vis" : true, "color" : "eec215" },
		/* 119 */ { "x" : 63, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "004dff" },
		/* 120 */ { "x" : 72, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "004dff" },
		/* 121 */ { "x" : -64, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "f73131" },
		/* 122 */ { "x" : -72, "y" : 35, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "f73131" },
		/* 123 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		/* 124 */ { "x" : 0, "y" : -320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		/* 125 */ { "x" : 0, "y" : 320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		/* 126 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		
		/* 127 */ { "x" : 0, "y" : -80, "trait" : "line", "color" : "FFDD00" },
		/* 128 */ { "x" : 0, "y" : 80, "trait" : "line", "color" : "FFDD00" },
		/* 129 */ { "x" : -700, "y" : 294, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 130 */ { "x" : -675, "y" : 320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 131 */ { "x" : -672.85422349049, "y" : -320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 132 */ { "x" : -700, "y" : -295.14627021274, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 133 */ { "x" : 671.84288219525, "y" : 320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 134 */ { "x" : 700, "y" : 294.15582349306, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 135 */ { "x" : 700, "y" : -293.03342928015, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 136 */ { "x" : 673.92337307118, "y" : -320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 137 */ { "x" : -712, "y" : -318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 138 */ { "x" : -740, "y" : -298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 139 */ { "x" : -740, "y" : 298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 140 */ { "x" : -712, "y" : 318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 141 */ { "x" : 712, "y" : 318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 142 */ { "x" : 740, "y" : 298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 143 */ { "x" : 740, "y" : -298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 144 */ { "x" : 712, "y" : -318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		
		/* 145 */ { "x" : 761, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 146 */ { "x" : 777, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 147 */ { "x" : 761, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 148 */ { "x" : 778, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 149 */ { "x" : -760, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 150 */ { "x" : -776, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 151 */ { "x" : -776, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 152 */ { "x" : -760, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 153 */ { "x" : -700, "y" : -320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 154 */ { "x" : 700, "y" : -320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 155 */ { "x" : -700, "y" : 320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 156 */ { "x" : 700, "y" : 320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 157 */ { "x" : -682, "y" : -323, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 158 */ { "x" : -682, "y" : -389, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false },
		/* 159 */ { "x" : -682, "y" : 390, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 160 */ { "x" : -682, "y" : 324, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false },
		/* 161 */ { "x" : 682, "y" : 325.00001268704, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 162 */ { "x" : 682, "y" : 390.99998652002, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false },
		/* 163 */ { "x" : 682, "y" : -389.99998731296, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 164 */ { "x" : 682, "y" : -324.00001347998, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "color" : "FFDD00", "trait" : "line", "y" : 206 },
		{ "v0" : 1, "v1" : 3, "color" : "e9cc6e", "trait" : "line", "x" : 840 },
		{ "v0" : 2, "v1" : 3, "color" : "FFDD00", "trait" : "line", "y" : -206 },
		{ "v0" : 4, "v1" : 5, "color" : "004DFF", "trait" : "line", "y" : 150 },
		{ "v0" : 5, "v1" : 7, "color" : "FFDD00", "trait" : "line", "x" : 1030 },
		{ "v0" : 6, "v1" : 7, "color" : "004DFF", "trait" : "line", "y" : -150 },
		{ "v0" : 8, "v1" : 9, "curve" : -130, "color" : "004DFF", "trait" : "line", "x" : 840 },
		{ "v0" : 10, "v1" : 11, "color" : "FFDD00", "trait" : "line", "y" : -206 },
		{ "v0" : 11, "v1" : 13, "color" : "e9cc6e", "trait" : "line", "x" : -840 },
		{ "v0" : 12, "v1" : 13, "color" : "FFDD00", "trait" : "line", "y" : 206 },
		{ "v0" : 14, "v1" : 15, "color" : "F00000", "trait" : "line", "y" : -150 },
		{ "v0" : 15, "v1" : 17, "color" : "FFDD00", "trait" : "line", "x" : -1030 },
		{ "v0" : 16, "v1" : 17, "color" : "F00000", "trait" : "line", "y" : 150 },
		{ "v0" : 18, "v1" : 19, "curve" : -130, "color" : "F00000", "trait" : "line", "x" : -491 },
		{ "v0" : 20, "v1" : 21, "curve" : -180, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -180, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 180, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 180, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 90, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 90, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : -90, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -90, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "color" : "2e2604", "trait" : "line", "x" : -935 },
		
		{ "v0" : 25, "v1" : 24, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 27, "v1" : 26, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 29, "v1" : 28, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 31, "v1" : 30, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 33, "v1" : 32, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 34, "v1" : 35, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 35, "v1" : 36, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 36, "v1" : 37, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		
		{ "v0" : 38, "v1" : 39, "trait" : "kickOffBarrier" },
		{ "v0" : 40, "v1" : 41, "trait" : "kickOffBarrier" },
		
		{ "v0" : 42, "v1" : 43, "color" : "2257D2", "bCoef" : 1000000, "cMask" : ["blue" ] },
		{ "v0" : 44, "v1" : 45, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 46, "v1" : 47, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 48, "v1" : 49, "vis" : false, "bCoef" : 1000000, "cMask" : ["red" ] },
		{ "v0" : 50, "v1" : 51, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 51, "v1" : 52, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 52, "v1" : 53, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		
		{ "v0" : 54, "v1" : 55, "trait" : "kickOffBarrier" },
		{ "v0" : 56, "v1" : 57, "trait" : "kickOffBarrier" },
		
		{ "v0" : 58, "v1" : 59, "color" : "FF2121", "bCoef" : 1000000, "cMask" : ["red" ] },
		{ "v0" : 60, "v1" : 61, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 62, "v1" : 63, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 64, "v1" : 65, "vis" : false, "bCoef" : 1000000, "cMask" : ["blue" ] },
		
		{ "v0" : 66, "v1" : 67, "curve" : -40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : -720 },
		{ "v0" : 68, "v1" : 69, "curve" : -40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : -730 },
		{ "v0" : 70, "v1" : 71, "curve" : -40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : 720 },
		
		{ "v0" : 75, "v1" : 77, "curve" : 12, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : -760 },
		
		{ "v0" : 74, "v1" : 75, "curve" : 0, "color" : "F00000", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		{ "v0" : 76, "v1" : 77, "curve" : 0, "color" : "F00000", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		
		{ "v0" : 80, "v1" : 81, "curve" : 10, "vis" : true, "color" : "FFF7F7", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : -760 },
		{ "v0" : 83, "v1" : 85, "curve" : 12, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : 760 },
		
		{ "v0" : 82, "v1" : 83, "curve" : 0, "color" : "004DFF", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		{ "v0" : 84, "v1" : 85, "curve" : 0, "color" : "004DFF", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		
		{ "v0" : 88, "v1" : 89, "curve" : 10, "vis" : true, "color" : "FFF7F7", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : 760 },
		
		{ "v0" : 90, "v1" : 91, "curve" : 0, "vis" : false, "color" : "585757", "trait" : "kickOffBarrier", "x" : 0 },
		{ "v0" : 92, "v1" : 93, "curve" : 0, "vis" : false, "color" : "585757", "trait" : "kickOffBarrier", "x" : 0 },
		
		{ "v0" : 94, "v1" : 95, "color" : "FFDD00", "trait" : "line", "x" : -840 },
		{ "v0" : 96, "v1" : 97, "color" : "FFDD00", "trait" : "line", "x" : 840 },
		{ "v0" : 98, "v1" : 99, "vis" : true, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 100, "v1" : 101, "vis" : true, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 103, "v1" : 104, "curve" : -180, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 105, "v1" : 106, "curve" : 180, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 103, "v1" : 104, "curve" : -90, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 105, "v1" : 106, "curve" : 90, "color" : "FFDD00", "trait" : "line" },
		
		{ "v0" : 107, "v1" : 108, "curve" : 0, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "x" : -10 },
		{ "v0" : 109, "v1" : 110, "curve" : 0, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "x" : 10 },
		{ "v0" : 111, "v1" : 112, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : 5 },
		{ "v0" : 113, "v1" : 114, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : 35 },
		{ "v0" : 115, "v1" : 116, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : -20 },
		{ "v0" : 117, "v1" : 118, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : -50 },
		{ "v0" : 114, "v1" : 113, "curve" : -129.997900266, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 118, "v1" : 117, "curve" : 103.422024528, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 119, "v1" : 120, "curve" : 64.5746162722, "vis" : true, "color" : "004dff", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "x" : 200 },
		{ "v0" : 121, "v1" : 122, "curve" : -60.1197451124, "vis" : true, "color" : "f73131", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "x" : -200 },
		{ "v0" : 116, "v1" : 112, "curve" : -12, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "x" : -180 },
		{ "v0" : 115, "v1" : 111, "curve" : 12, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "x" : 180 },
		{ "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		
		{ "v0" : 127, "v1" : 128, "vis" : true, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 129, "v1" : 130, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 131, "v1" : 132, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 133, "v1" : 134, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 135, "v1" : 136, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 137, "v1" : 138, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 139, "v1" : 140, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 141, "v1" : 142, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 143, "v1" : 144, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		
		{ "v0" : 145, "v1" : 146, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : -82 },
		{ "v0" : 147, "v1" : 148, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : 82 },
		{ "v0" : 149, "v1" : 150, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : -82 },
		{ "v0" : 151, "v1" : 152, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : 82 },
		
		{ "v0" : 73, "v1" : 72, "curve" : 40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : 720 },
		
		{ "v0" : 153, "v1" : 154, "curve" : 0, "vis" : true, "color" : "222223", "bCoef" : 1.2, "cMask" : ["ball" ], "y" : -320 },
		{ "v0" : 155, "v1" : 156, "curve" : 0, "vis" : true, "color" : "222223", "bCoef" : 1.2, "cMask" : ["ball" ] },
		{ "v0" : 158, "v1" : 157, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ] },
		{ "v0" : 160, "v1" : 159, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ], "x" : -682 },
		{ "v0" : 162, "v1" : 161, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ], "x" : 682 },
		{ "v0" : 164, "v1" : 163, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ], "x" : 682 }

	],

	"goals" : [
		{ "p0" : [-710,-82 ], "p1" : [-710,82 ], "team" : "red" },
		{ "p0" : [711,82 ], "p1" : [711,-82 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 3, "invMass" : 0, "pos" : [-700,-320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		{ "radius" : 3, "invMass" : 0, "pos" : [700,320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		{ "radius" : 3, "invMass" : 0, "pos" : [700,-320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		{ "radius" : 3, "invMass" : 0, "pos" : [-700,320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		
		{ "radius" : 5, "pos" : [-700,83.5 ], "color" : "f73131", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [-700,-83.5 ], "color" : "f73131", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [700,-83.5 ], "color" : "004DFF", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [700,83.5 ], "color" : "004DFF", "trait" : "goalPost" }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -346, "bCoef" : 0, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -346, "bCoef" : 0, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -390, "bCoef" : 0 },
		{ "normal" : [0,-1 ], "dist" : -392, "bCoef" : 0 },
		
		{ "normal" : [1,0 ], "dist" : -763, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },
		{ "normal" : [-1,0 ], "dist" : -763, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0 },
		
		{ "normal" : [1,0 ], "dist" : -970, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -971, "bCoef" : 0 }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 2 },
		"stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
		"cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.5, "color" : "FFFF00", "cGroup" : [ ] },
		"reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
		"reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
		"sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" },
		"tunnel" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "000000" },
		"advertising" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "333333" },
		"teambench" : { "vis" : true, "cMask" : [ ], "color" : "000000" },
		"manager" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "333333" },
		"physio" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "666666" },
		"redsubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "E56E56" },
		"bluesubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "5689E5" }

	}
}`;
var BigGLH=`
{

	"name" : "𝙱𝙸𝙶 ʙʏ 𝐆𝐋𝐇",

	"width" : 900,

	"height" : 550,

	"bg" : { "type" : "grass", "width" : 550, "height" : 240, "color" : "658456" },

	"vertexes" : [
		/* 0 */ { "x" : -550, "y" : 240, "cMask" : ["ball" ] },
		/* 1 */ { "x" : -550, "y" : 80, "cMask" : ["ball" ] },
		/* 2 */ { "x" : -550, "y" : -80, "cMask" : ["ball" ] },
		/* 3 */ { "x" : -550, "y" : -240, "cMask" : ["ball" ] },
		/* 4 */ { "x" : 550, "y" : 240, "cMask" : ["ball" ] },
		/* 5 */ { "x" : 550, "y" : 80, "cMask" : ["ball" ] },
		/* 6 */ { "x" : 550, "y" : -80, "cMask" : ["ball" ] },
		/* 7 */ { "x" : 550, "y" : -240, "cMask" : ["ball" ] },
		/* 8 */ { "x" : 0, "y" : 550, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 9 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 10 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 11 */ { "x" : 0, "y" : -550, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 12 */ { "x" : -610, "y" : -60, "bCoef" : 0.5, "cMask" : ["ball" ] },
		/* 13 */ { "x" : -610, "y" : 60, "bCoef" : 0.5, "cMask" : ["ball" ] },
		/* 14 */ { "x" : 610, "y" : -60, "bCoef" : 0.5, "cMask" : ["ball" ] },
		/* 15 */ { "x" : 610, "y" : 60, "bCoef" : 0.5, "cMask" : ["ball" ] },
		/* 16 */ { "x" : 0, "y" : 240, "cMask" : [ ] },
		/* 17 */ { "x" : 0, "y" : -240, "cMask" : [ ] },
		/* 18 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 19 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 20 */ { "x" : -29.768604220659014, "y" : 283.83575883575884, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 21 */ { "x" : -44.53980007404665, "y" : 283.83575883575884, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 22 */ { "x" : -66.82769914276764, "y" : 282.4178794178794, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 23 */ { "x" : -30.33672713809699, "y" : 304.3950103950104, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 24 */ { "x" : -16.273205893659373, "y" : 295.7993050521786, "curve" : 0, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 25 */ { "x" : -7.083545614580096, "y" : 306.18048818048817, "curve" : 0, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 26 */ { "x" : 3.12718802884131, "y" : 306.18048818048817, "curve" : 0, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 27 */ { "x" : 12.852450481303222, "y" : 260.1228271596088, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 28 */ { "x" : 13.46030818612154, "y" : 306.18048818048817, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 29 */ { "x" : 14.068165890939863, "y" : 282.68703552996317, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 30 */ { "x" : 34.73532785476279, "y" : 282.14808477144004, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 31 */ { "x" : 57.97265923418004, "y" : 306.18048818048817, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 32 */ { "x" : 84.09858713338295, "y" : 306.18048818048817, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 33 */ { "x" : 91.49271767089321, "y" : 303.27927216245575, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 34 */ { "x" : 101.35155838757353, "y" : 263.60413024854614, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 35 */ { "x" : 64.38090570002227, "y" : 262.34460193381886, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 36 */ { "x" : 56.98677516251203, "y" : 265.4934227206371, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 37 */ { "x" : 48.60676055333373, "y" : 306.18048818048817, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 38 */ { "x" : 79.16916677504278, "y" : 273.68035676636447, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 39 */ { "x" : 84.59152916921697, "y" : 288.7946965430919, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 40 */ { "x" : -16.273205893659373, "y" : 260.1228271596088, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 41 */ { "x" : 35.34318555958111, "y" : 260.1228271596088, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 42 */ { "x" : 35.95104326439943, "y" : 306.18048818048817, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 43 */ { "x" : 68.9392774017737, "y" : 277.93035476475785, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 44 */ { "x" : 71.40398758094378, "y" : 290.52563791203073, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 45 */ { "x" : 75.56352154072161, "y" : 276.04106229266694, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 46 */ { "x" : 78.5211737557257, "y" : 289.8958737546671, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 47 */ { "x" : 72.32892496298916, "y" : 284.85776049575793, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 48 */ { "x" : 78.24422939299737, "y" : 282.968468023667, "color" : "C2E9BA", "cMask" : ["ball" ] },
		/* 49 */ { "x" : -53.0956340956341, "y" : 260.1228271596088, "curve" : 0, "cMask" : ["ball" ] },
		/* 50 */ { "x" : -38.91683991683992, "y" : 260.1228271596088, "curve" : 0, "cMask" : ["ball" ] },
		/* 51 */ { "x" : -550, "y" : -240, "cMask" : [ ] },
		/* 52 */ { "x" : 550, "y" : -240, "cMask" : [ ] },
		/* 53 */ { "x" : 550, "y" : -80, "cMask" : [ ] },
		/* 54 */ { "x" : 550, "y" : 80, "cMask" : [ ] },
		/* 55 */ { "x" : 550, "y" : 240, "cMask" : [ ] },
		/* 56 */ { "x" : -550, "y" : 240, "cMask" : [ ] },
		/* 57 */ { "x" : -550, "y" : 80, "cMask" : [ ] },
		/* 58 */ { "x" : -550, "y" : -80, "cMask" : [ ] }

	],

	"segments" : [
		{ "v0" : 52, "v1" : 53, "vis" : false, "cMask" : ["ball" ] },
		{ "v0" : 54, "v1" : 55, "vis" : false, "cMask" : ["ball" ] },
		{ "v0" : 56, "v1" : 57, "vis" : false, "cMask" : ["ball" ] },
		{ "v0" : 58, "v1" : 51, "vis" : false, "cMask" : ["ball" ] },
		{ "v0" : 17, "v1" : 19, "color" : "C2E9BA", "cMask" : [ ] },
		{ "v0" : 19, "v1" : 18, "color" : "C2E9BA", "cMask" : [ ] },
		{ "v0" : 18, "v1" : 16, "color" : "C2E9BA", "cMask" : [ ] },
		{ "v0" : 1, "v1" : 2, "color" : "C2E9BA", "cMask" : [ ] },
		{ "v0" : 5, "v1" : 6, "color" : "C2E9BA", "cMask" : [ ] },
		{ "v0" : 8, "v1" : 9, "vis" : false, "color" : "C2E9BA", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 9, "v1" : 10, "curve" : 180, "color" : "C2E9BA", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 10, "v1" : 9, "curve" : 180, "color" : "C2E9BA", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 18, "v1" : 19, "curve" : 180, "color" : "C2E9BA", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 6.123233995736766e-17 },
		{ "v0" : 10, "v1" : 11, "vis" : false, "color" : "C2E9BA", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 1, "v1" : 13, "curve" : 89.99999999999999, "vis" : false, "color" : "C2E9BA", "bCoef" : 0.5, "cMask" : ["ball" ], "cGroup" : ["ball" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 12, "v1" : 13, "vis" : false, "color" : "C2E9BA", "bCoef" : 0.5, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
		{ "v0" : 12, "v1" : 2, "curve" : 89.99999999999999, "vis" : false, "color" : "C2E9BA", "bCoef" : 0.5, "cMask" : ["ball" ], "cGroup" : ["ball" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 15, "v1" : 5, "curve" : 89.99999999999999, "vis" : false, "color" : "C2E9BA", "cMask" : ["ball" ], "cGroup" : ["ball" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 14, "v1" : 15, "vis" : false, "color" : "C2E9BA", "cMask" : ["ball" ], "cGroup" : ["ball" ] },
		{ "v0" : 6, "v1" : 14, "curve" : 89.99999999999999, "vis" : false, "color" : "C2E9BA", "cMask" : ["ball" ], "cGroup" : ["ball" ], "curveF" : 1.0000000000000002 },
		{ "v0" : 20, "v1" : 21, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "v0" : 20, "v1" : 22, "curve" : 199.84976430225004, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 20, "v1" : 23, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : -90.23053808524419, "v0" : 24, "v1" : 25, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 25, "v1" : 26, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 27, "v1" : 28, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 29, "v1" : 30, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 31, "v1" : 32, "color" : "C2E9BA", "y" : 347.51851851851853, "cMask" : ["ball" ] },
		{ "curve" : -40.31363094108369, "v0" : 32, "v1" : 33, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 33, "v1" : 34, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 34, "v1" : 35, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : -12.443869458108697, "v0" : 35, "v1" : 36, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 36, "v1" : 37, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 37, "v1" : 31, "color" : "C2E9BA", "y" : 347.51851851851853, "cMask" : ["ball" ] },
		{ "curve" : -275.7481276737362, "v0" : 38, "v1" : 39, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : -72.57586441321521, "v0" : 39, "v1" : 38, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "v0" : 24, "v1" : 40, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 41, "v1" : 42, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 43.30136262581911, "v0" : 43, "v1" : 44, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 37.069696463287194, "v0" : 45, "v1" : 46, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 0, "v0" : 47, "v1" : 48, "color" : "C2E9BA", "cMask" : ["ball" ] },
		{ "curve" : 65.96742541763024, "color" : "C2E9BA", "v0" : 22, "v1" : 49, "cMask" : ["ball" ] },
		{ "curve" : 0, "color" : "C2E9BA", "v0" : 49, "v1" : 50, "y" : 282.5515538527033, "cMask" : ["ball" ] }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -550, "bCoef" : 0.1 },
		{ "normal" : [0,-1 ], "dist" : -550, "bCoef" : 0.1 },
		{ "normal" : [1,0 ], "dist" : -900, "bCoef" : 0.1 },
		{ "normal" : [-1,0 ], "dist" : -900, "bCoef" : 0.1 },
		{ "normal" : [0,1 ], "dist" : -240, "cMask" : ["ball" ] },
		{ "normal" : [0,-1 ], "dist" : -240, "cMask" : ["ball" ] }

	],

	"goals" : [
		{ "p0" : [-550,80 ], "p1" : [-550,-80 ], "team" : "red" },
		{ "p0" : [550,80 ], "p1" : [550,-80 ], "team" : "blue" }

	],

	"discs" : [
		{ "cGroup" : ["ball","kick","score" ] },
		{ "radius" : 8, "invMass" : 0, "pos" : [-550,80 ], "color" : "FFA8A8" },
		{ "radius" : 8, "invMass" : 0, "pos" : [-550,-80 ], "color" : "FFA8A8" },
		{ "radius" : 8, "invMass" : 0, "pos" : [550,80 ], "color" : "aaaaff" },
		{ "radius" : 8, "invMass" : 0, "pos" : [550,-80 ], "color" : "aaaaff" },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-566,76.5 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 0, "pos" : [-580,74 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.8,61 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.6,48 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.4,36 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.2,24 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579,12 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-578.8,0 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579,-12 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.2,-24 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.4,-36 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.6,-48 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-579.8,-61 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 0, "pos" : [-580,-74 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [-566,-76.5 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [566,76.5 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 0, "pos" : [580,74 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.8,61 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.6,48 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.4,36 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.2,24 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579,12 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [578.8,0 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579,-12 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.2,-24 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.4,-36 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.6,-48 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [579.8,-61 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 0, "pos" : [580,-74 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 },
		{ "radius" : 0.01, "invMass" : 1.5, "pos" : [566,-76.5 ], "color" : "0", "cMask" : ["ball","red","blue" ], "damping" : 0.96 }

	],

	"playerPhysics" : {
		"bCoef" : 0.5,
		"invMass" : 0.5,
		"damping" : 0.96,
		"acceleration" : 0.12,
		"kickingAcceleration" : 0.07,
		"kickingDamping" : 0.96,
		"kickStrength" : 5.65

	},

	"ballPhysics" : "disc0",


	"spawnDistance" : 350,

	"joints" : [
		{ "d0" : 1, "d1" : 5, "length" : 16.3783393541592, "strength" : 0.1 },
		{ "d0" : 5, "d1" : 6, "length" : 14.221462653327892, "strength" : 0.1 },
		{ "d0" : 6, "d1" : 7, "length" : 13.001538370516007, "strength" : 0.1 },
		{ "d0" : 7, "d1" : 8, "length" : 13.001538370516004, "strength" : 0.1 },
		{ "d0" : 8, "d1" : 9, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 9, "d1" : 10, "length" : 12.001666550941996, "strength" : 0.1 },
		{ "d0" : 10, "d1" : 11, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 11, "d1" : 12, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 12, "d1" : 13, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 13, "d1" : 14, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 14, "d1" : 15, "length" : 12.001666550941996, "strength" : 0.1 },
		{ "d0" : 15, "d1" : 16, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 16, "d1" : 17, "length" : 13.001538370516004, "strength" : 0.1 },
		{ "d0" : 17, "d1" : 18, "length" : 13.001538370516007, "strength" : 0.1 },
		{ "d0" : 18, "d1" : 19, "length" : 14.221462653327892, "strength" : 0.1 },
		{ "d0" : 19, "d1" : 2, "length" : 16.3783393541592, "strength" : 0.1 },
		{ "d0" : 3, "d1" : 20, "length" : 16.3783393541592, "strength" : 0.1 },
		{ "d0" : 20, "d1" : 21, "length" : 14.221462653327892, "strength" : 0.1 },
		{ "d0" : 21, "d1" : 22, "length" : 13.001538370516007, "strength" : 0.1 },
		{ "d0" : 22, "d1" : 23, "length" : 13.001538370516004, "strength" : 0.1 },
		{ "d0" : 23, "d1" : 24, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 24, "d1" : 25, "length" : 12.001666550941996, "strength" : 0.1 },
		{ "d0" : 25, "d1" : 26, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 26, "d1" : 27, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 27, "d1" : 28, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 28, "d1" : 29, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 29, "d1" : 30, "length" : 12.001666550941996, "strength" : 0.1 },
		{ "d0" : 30, "d1" : 31, "length" : 12.001666550942, "strength" : 0.1 },
		{ "d0" : 31, "d1" : 32, "length" : 13.001538370516004, "strength" : 0.1 },
		{ "d0" : 32, "d1" : 33, "length" : 13.001538370516007, "strength" : 0.1 },
		{ "d0" : 33, "d1" : 34, "length" : 14.221462653327892, "strength" : 0.1 },
		{ "d0" : 34, "d1" : 4, "length" : 16.3783393541592, "strength" : 0.1 }

	],

	"redSpawnPoints" : [
		[ -350, 0
		],
		[ -350, 60
		],
		[ -350, -60
		],
		[ -350, 120
		],
		[ -350, -120
		],
		[ -605, 0
		]

	],

	"blueSpawnPoints" : [
		[ 350, 0
		],
		[ 350, 60
		],
		[ 350, -60
		],
		[ 350, 120
		],
		[ 350, -120
		],
		[ 605, 0
		]

	],

	"traits" : {
		

	}
}`;


var pensred = `{

	"name" : "ᴘᴇɴᴀʟᴛʏ ʀᴇᴅ ᴛᴇᴀᴍ 🔴 | 𝐆𝐋𝐇",

	"width" : 1500,

	"height" : 734,

	"spawnDistance" : 300,

	"redSpawnPoints" : [
		[ 63, -33
		],
		[ 63, 33
		],
		[ 63, -99
		],
		[ 63, 99
		]

	],

	"blueSpawnPoints" : [
		[ 1376, 0
		],
		[ 1376, -48
		],
		[ 1376, 48
		],
		[ 1376, 96
		]

	],

	"bg" : { "type" : "grass", "width" : 1150, "height" : 600, "kickOffRadius" : 180, "cornerRadius" : 0, "color" : "6a9158" },

	"playerPhysics" : {
		"bCoef" : 0.5,
		"invMass" : 0.5,
		"damping" : 0.96,
		"acceleration" : 0.12,
		"kickingAcceleration" : 0.07,
		"kickingDamping" : 0.96,
		"kickStrength" : 5.65

	},

	"ballPhysics" : {
		"pos" : [ 935, 0
		],
		"radius" : 10

	},

	"vertexes" : [
		/* 0 */ { "x" : 1150, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 1 */ { "x" : 840, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 2 */ { "x" : 1150, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 3 */ { "x" : 840, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 4 */ { "x" : 1150, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 5 */ { "x" : 1031, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 6 */ { "x" : 1150, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 7 */ { "x" : 1029, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 8 */ { "x" : 840, "y" : -170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 9 */ { "x" : 840, "y" : 170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 10 */ { "x" : -1150, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 11 */ { "x" : -840, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 12 */ { "x" : -1150, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 13 */ { "x" : -840, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 14 */ { "x" : -1150, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 15 */ { "x" : -1030, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 16 */ { "x" : -1150, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 17 */ { "x" : -1030, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 18 */ { "x" : -840, "y" : 170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 19 */ { "x" : -840, "y" : -170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 20 */ { "x" : 935, "y" : 4, "trait" : "line", "color" : "a7cf9b" },
		/* 21 */ { "x" : 935, "y" : -4, "trait" : "line", "color" : "a7cf9b" },
		/* 22 */ { "x" : -935, "y" : 4, "trait" : "line", "color" : "a7cf9b" },
		/* 23 */ { "x" : -935, "y" : -4, "trait" : "line", "color" : "a7cf9b" },
		/* 24 */ { "x" : -1150, "y" : 574, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 25 */ { "x" : -1125, "y" : 599, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 26 */ { "x" : -1125, "y" : -600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 27 */ { "x" : -1150, "y" : -575, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 28 */ { "x" : 1124, "y" : 600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 29 */ { "x" : 1150, "y" : 574, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 30 */ { "x" : 1150, "y" : -574, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 31 */ { "x" : 1124, "y" : -600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "b3d4a7" },
		/* 32 */ { "x" : 0, "y" : -4, "trait" : "line", "color" : "b3d4a7" },
		/* 33 */ { "x" : 0, "y" : 4, "trait" : "line", "color" : "b3d4a7" },
		/* 34 */ { "x" : 0, "y" : -4, "trait" : "line", "color" : "b3d4a7" },
		/* 35 */ { "x" : 0, "y" : 4, "trait" : "line", "color" : "b3d4a7" },
		/* 36 */ { "x" : -1170, "y" : 150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 37 */ { "x" : -1170, "y" : 250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 38 */ { "x" : 1170, "y" : 150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 39 */ { "x" : 1170, "y" : 250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 40 */ { "x" : -1170, "y" : -150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 41 */ { "x" : -1170, "y" : -250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 42 */ { "x" : 1170, "y" : -150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 43 */ { "x" : 1170, "y" : -250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 44 */ { "x" : 1161, "y" : -599, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 45 */ { "x" : 1189, "y" : -579, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 46 */ { "x" : 1161, "y" : 599, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		/* 47 */ { "x" : 1189, "y" : 579, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		/* 48 */ { "x" : -1162, "y" : 599, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 49 */ { "x" : -1190, "y" : 579, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 50 */ { "x" : -1162, "y" : -600, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		/* 51 */ { "x" : -1190, "y" : -580, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		
		/* 52 */ { "x" : -1177, "y" : -250, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 53 */ { "x" : -1177, "y" : -150, "cMask" : ["ball" ] },
		
		/* 54 */ { "x" : -1170, "y" : 250, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		
		/* 55 */ { "x" : -1177, "y" : 250, "bCoef" : 0, "cMask" : ["ball" ] },
		
		/* 56 */ { "x" : -1170, "y" : 150, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		
		/* 57 */ { "x" : -1177, "y" : 150, "cMask" : ["ball" ] },
		/* 58 */ { "x" : 1177, "y" : -250, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 59 */ { "x" : 1177, "y" : -150, "cMask" : ["ball" ] },
		
		/* 60 */ { "x" : 1170, "y" : -150, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 61 */ { "x" : 1170, "y" : -250, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		
		/* 62 */ { "x" : 1177, "y" : 250, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 63 */ { "x" : 1177, "y" : 150, "cMask" : ["ball" ] },
		
		/* 64 */ { "x" : 1170, "y" : 250, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 65 */ { "x" : 1170, "y" : 150, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 66 */ { "x" : 0, "y" : 180, "cMask" : ["ball" ], "cGroup" : ["ball" ], "trait" : "line", "color" : "b3d4a7", "vis" : true, "curve" : 0 },
		/* 67 */ { "x" : 0, "y" : -180, "cMask" : ["ball" ], "cGroup" : ["ball" ], "trait" : "line", "color" : "b3d4a7", "vis" : true, "curve" : 0 },
		/* 68 */ { "x" : -818, "y" : -600, "trait" : "line", "curve" : 90, "color" : "638750" },
		/* 69 */ { "x" : -1150, "y" : -347, "trait" : "line", "curve" : 90, "color" : "638750" },
		/* 70 */ { "x" : -1150, "y" : 347, "trait" : "line", "color" : "638750" },
		/* 71 */ { "x" : -820, "y" : 600, "trait" : "line", "color" : "638750" },
		/* 72 */ { "x" : 820, "y" : 600, "trait" : "line", "color" : "638750" },
		/* 73 */ { "x" : 1150, "y" : 347, "trait" : "line", "color" : "638750" },
		/* 74 */ { "x" : 820, "y" : -600, "trait" : "line", "curve" : -90, "color" : "638750" },
		/* 75 */ { "x" : 1150, "y" : -347, "trait" : "line", "curve" : -90, "color" : "638750" },
		/* 76 */ { "x" : 1150, "y" : -525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 77 */ { "x" : -1150, "y" : -525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 78 */ { "x" : 1150, "y" : 525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 79 */ { "x" : -1150, "y" : 525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 80 */ { "x" : -1150, "y" : -600, "trait" : "line", "color" : "b3d4a7" },
		/* 81 */ { "x" : -1150, "y" : 600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFFF00" },
		/* 82 */ { "x" : 1150, "y" : 600, "trait" : "line", "color" : "b3d4a7" },
		/* 83 */ { "x" : 1150, "y" : -600, "trait" : "line", "color" : "b3d4a7" },
		
		/* 84 */ { "x" : -113, "y" : -138, "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["blueKO","redKO" ], "curve" : 235 },
		/* 85 */ { "x" : -115, "y" : 135, "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["blueKO","redKO" ], "curve" : 235 },
		/* 86 */ { "x" : 1495, "y" : -150, "bCoef" : 0, "cMask" : ["blue" ], "dist" : -1400 },
		/* 87 */ { "x" : 1300, "y" : -150, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 88 */ { "x" : 1300, "y" : 150, "bCoef" : 0, "cMask" : ["blue" ], "curve" : 0 },
		/* 89 */ { "x" : 1489, "y" : 150, "bCoef" : 0, "cMask" : ["blue" ], "dist" : -1400, "curve" : 0 },
		
		/* 90 */ { "x" : 1300, "y" : -150, "trait" : "kickOffBarrier", "cMask" : ["blue" ] },
		
		/* 91 */ { "x" : 1448, "y" : -120, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 92 */ { "x" : 1448, "y" : 120, "bCoef" : 0, "cMask" : ["blue" ] },
		
		/* 93 */ { "x" : 1150, "y" : -120.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7", "curve" : 0 },
		/* 94 */ { "x" : 1212.8375029631984, "y" : -120.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 95 */ { "x" : 1150.1431278225696, "y" : 116.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 96 */ { "x" : 1212.9145962189946, "y" : 116.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		
		/* 97 */ { "x" : 1150, "y" : 116.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "curve" : 0, "color" : "b3d4a7" },
		/* 98 */ { "x" : 1259, "y" : -148.867722739, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		/* 99 */ { "x" : 1259.5, "y" : 144, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		
		/* 100 */ { "x" : 1213.8375029631984, "y" : -118.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 101 */ { "x" : 1260, "y" : -146.867722739, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 102 */ { "x" : 1211.8375029631984, "y" : -122.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 103 */ { "x" : 1258, "y" : -150.867722739, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 104 */ { "x" : 1214.9145962189946, "y" : 114.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 105 */ { "x" : 1261.5, "y" : 142, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 106 */ { "x" : 1213.9145962189946, "y" : 119.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 107 */ { "x" : 1260.5, "y" : 147, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 108 */ { "x" : 1150, "y" : -120, "bCoef" : 0.5, "cMask" : ["blue","ball" ], "trait" : "line", "color" : "C7E6BD", "curve" : 0 },
		/* 109 */ { "x" : 1213, "y" : -120, "bCoef" : 0, "cMask" : ["blue","ball" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 110 */ { "x" : 1150, "y" : 116, "bCoef" : 0.5, "cMask" : ["blue","ball" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 111 */ { "x" : 1213, "y" : 116, "bCoef" : 0, "cMask" : ["blue","ball" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 112 */ { "x" : -1150, "y" : 118.00879788978456, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7", "curve" : 0 },
		/* 113 */ { "x" : -1213.3215131279903, "y" : 117.74394897515494, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 114 */ { "x" : -1149.628852252629, "y" : -118.97302216202547, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 115 */ { "x" : -1212.3997630875529, "y" : -119.23759275268432, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		
		/* 116 */ { "x" : -1150, "y" : -118.97241890367377, "bCoef" : 0, "cMask" : ["wall" ], "curve" : 0, "color" : "b3d4a7" },
		/* 117 */ { "x" : -1259.6013715431845, "y" : 145.49133453725509, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		/* 118 */ { "x" : -1258.866981665902, "y" : -147.37589424369935, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		
		/* 119 */ { "x" : -1214.3130746008003, "y" : 115.73975191756831, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 120 */ { "x" : -1260.5929330159947, "y" : 143.48713747966846, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 121 */ { "x" : -1212.3299516551804, "y" : 119.74814603274154, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 122 */ { "x" : -1258.6098100703748, "y" : 147.4955315948417, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 123 */ { "x" : -1214.4081749675327, "y" : -117.24604016227767, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 124 */ { "x" : -1260.8753935458817, "y" : -145.3843416532927, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 125 */ { "x" : -1213.3871097379695, "y" : -122.24178092786758, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 126 */ { "x" : -1259.8543283163185, "y" : -150.3800824188826, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 127 */ { "x" : -1150.4806674009055, "y" : 117.08328385388425, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "C7E6BD", "curve" : 0 },
		/* 128 */ { "x" : -1213.4801078094943, "y" : 116.81775004310506, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 129 */ { "x" : -1149.485969316082, "y" : -118.91461989892463, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 130 */ { "x" : -1212.4854097246707, "y" : -119.1801537097038, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		
		/* 131 */ { "x" : 80.06046236735585, "y" : 736, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 132 */ { "x" : 80.06046236735585, "y" : 724, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		
		/* 133 */ { "x" : -1150, "y" : -602, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 134 */ { "x" : -1150, "y" : -620.49609375, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 135 */ { "x" : -1148, "y" : -620.49609375, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 136 */ { "x" : -1148, "y" : -602, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 137 */ { "x" : -70, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 138 */ { "x" : -90, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 139 */ { "x" : -70, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 140 */ { "x" : -110, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 141 */ { "x" : -130, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 142 */ { "x" : -150, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 143 */ { "x" : -170, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 144 */ { "x" : -190, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 145 */ { "x" : -210, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 146 */ { "x" : -230, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 147 */ { "x" : -250, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 148 */ { "x" : -287.01500879340676, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 149 */ { "x" : -286.93953763264415, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 150 */ { "x" : -270, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 151 */ { "x" : -286.93953763264415, "y" : 736, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "vis" : false },
		/* 152 */ { "x" : -286.93953763264415, "y" : 724, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 153 */ { "x" : -286.93953763264415, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 154 */ { "x" : -286.93953763264415, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 155 */ { "x" : -70, "y" : 734.04149391746, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 156 */ { "x" : -70, "y" : 722.0417049239776, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 157 */ { "x" : -70, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 158 */ { "x" : -70, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 159 */ { "x" : 297, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 160 */ { "x" : 277, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 161 */ { "x" : 297, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 162 */ { "x" : 257, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 163 */ { "x" : 237, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 164 */ { "x" : 217, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 165 */ { "x" : 197, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 166 */ { "x" : 177, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 167 */ { "x" : 157, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 168 */ { "x" : 137, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 169 */ { "x" : 117, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 170 */ { "x" : 79.98499120659324, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 171 */ { "x" : 80.06046236735585, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 172 */ { "x" : 97, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 173 */ { "x" : 80.06046236735585, "y" : 736, "bCoef" : 10, "cGroup" : ["all" ] },
		/* 174 */ { "x" : 80.06046236735585, "y" : 724, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 175 */ { "x" : 80.06046236735585, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 176 */ { "x" : 80.06046236735585, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 177 */ { "x" : 297, "y" : 734.04149391746, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "vis" : false },
		/* 178 */ { "x" : 297, "y" : 722.0417049239776, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 179 */ { "x" : 297, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 180 */ { "x" : 297, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		
		/* 181 */ { "x" : 1149.968665547433, "y" : -618.9686646206542, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 182 */ { "x" : 1150.0694602019682, "y" : -600.4728455134504, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 183 */ { "x" : 1148.069489899352, "y" : -600.4619464927276, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 184 */ { "x" : 1147.9686952448167, "y" : -618.9577655999315, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 185 */ { "x" : 1158, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 186 */ { "x" : 1168, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 187 */ { "x" : 1149, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 188 */ { "x" : 1158, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 189 */ { "x" : 1149, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 190 */ { "x" : 1168, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		
		/* 191 */ { "x" : 1149.7396826762401, "y" : 597.9263578863065, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 192 */ { "x" : 1153.08526210564, "y" : 579.1424902194007, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 193 */ { "x" : 1155.0010783610655, "y" : 579.7166400913391, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 194 */ { "x" : 1151.7040246689874, "y" : 598.3023373212908, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 195 */ { "x" : 1161.6678517948505, "y" : 578.0712784773244, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 196 */ { "x" : 1171.2713154212654, "y" : 580.8593757453787, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 197 */ { "x" : 1153.0247345310775, "y" : 575.5619909360759, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 198 */ { "x" : 1160.6641350766317, "y" : 581.528531244323, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 199 */ { "x" : 1152.0210178128586, "y" : 579.0192437030742, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 200 */ { "x" : 1170.2675987030466, "y" : 584.316628512377, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		
		/* 201 */ { "x" : -1152.8011166944932, "y" : 581.2713204942369, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 202 */ { "x" : -1150.0489225384003, "y" : 599.5615066971152, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 203 */ { "x" : -1152.026657561816, "y" : 599.8591040377528, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 204 */ { "x" : -1154.7788517179088, "y" : 581.5689178348746, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 205 */ { "x" : -1162.170956870286, "y" : 578.11573185304, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 206 */ { "x" : -1152.4133863896525, "y" : 575.9271664975008, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 207 */ { "x" : -1170.9527703028564, "y" : 580.085440673025, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 208 */ { "x" : -1161.383072006498, "y" : 581.6284631816164, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 209 */ { "x" : -1170.1648854390683, "y" : 583.5981720016015, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 210 */ { "x" : -1151.6255015258641, "y" : 579.4398978260773, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 211 */ { "x" : -1159, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28", "radius" : 20 },
		
		/* 212 */ { "x" : -1149, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034", "radius" : 20 },
		
		/* 213 */ { "x" : -1168, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28", "radius" : 20 },
		/* 214 */ { "x" : -1159, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28", "radius" : 20 },
		
		/* 215 */ { "x" : -1168, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034", "radius" : 20 },
		
		/* 216 */ { "x" : -1149, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28", "radius" : 20 },
		
		/* 217 */ { "x" : -199, "y" : 711, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		/* 218 */ { "x" : -199, "y" : 700, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		/* 219 */ { "x" : 164, "y" : 704, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		/* 220 */ { "x" : 166, "y" : 696, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		
		/* 221 */ { "x" : 936.0539164518007, "y" : -13, "trait" : "powerboost", "bCoef" : -2.2, "vis" : false, "cMask" : ["ball" ], "pos" : [935,0 ], "radius" : 10 },
		/* 222 */ { "x" : 935.9681020082038, "y" : 13, "trait" : "powerboost", "bCoef" : -2.2, "vis" : false, "cMask" : ["ball" ], "pos" : [935,0 ], "radius" : 10 },
		
		/* 223 */ { "x" : 1134, "y" : 116.23596984067328, "bCoef" : 1, "cMask" : ["blue" ], "cGroup" : ["redKO" ], "vis" : false, "curve" : 0 },
		/* 224 */ { "x" : 1134, "y" : -123.76361382468703, "bCoef" : 1, "cMask" : ["blue" ], "cGroup" : ["redKO" ], "vis" : false, "curve" : 0 },
		/* 225 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 1300, "y" : 150 },
		/* 226 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 1300, "y" : 18 },
		/* 227 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 1240, "y" : 18 },
		/* 228 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 1300, "y" : -18 },
		/* 229 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 1240, "y" : -18 },
		/* 230 */ { "bCoef" : -2.4, "cMask" : ["blue" ], "x" : 1233.0188554822, "y" : 65.50390625 },
		/* 231 */ { "bCoef" : -2.4, "cMask" : ["blue" ], "x" : 1233.0188554822, "y" : -65.49609375 },
		/* 232 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 735, "y" : 620, "curve" : -74, "vis" : false },
		/* 233 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 735, "y" : -620, "curve" : -74 },
		/* 234 */ { "x" : 1134, "y" : 116.23596984067328, "bCoef" : 1, "cMask" : ["blue" ], "cGroup" : ["blueKO" ], "vis" : false, "curve" : 0, "radius" : 15, "pos" : [67,0 ] },
		/* 235 */ { "x" : 1134, "y" : -123.76361382468703, "bCoef" : 1, "cMask" : ["blue" ], "cGroup" : ["blueKO" ], "vis" : false, "curve" : 0, "radius" : 15, "pos" : [67,0 ] },
		/* 236 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 735, "y" : 661, "vis" : false },
		/* 237 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 735, "y" : -664 }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "color" : "b3d4a7", "trait" : "line", "y" : 250 },
		{ "v0" : 1, "v1" : 3, "color" : "b3d4a7", "trait" : "line", "x" : 840 },
		{ "v0" : 2, "v1" : 3, "color" : "b3d4a7", "trait" : "line", "y" : -250 },
		{ "v0" : 4, "v1" : 5, "color" : "b3d4a7", "trait" : "line", "y" : 195 },
		{ "v0" : 5, "v1" : 7, "color" : "b3d4a7", "trait" : "line", "x" : 1030 },
		{ "v0" : 6, "v1" : 7, "color" : "b3d4a7", "trait" : "line", "y" : -150 },
		{ "v0" : 8, "v1" : 9, "curve" : -110, "color" : "b3d4a7", "trait" : "line", "x" : 840 },
		{ "v0" : 10, "v1" : 11, "color" : "b3d4a7", "trait" : "line", "y" : -337 },
		{ "v0" : 11, "v1" : 13, "color" : "b3d4a7", "trait" : "line", "x" : -840 },
		{ "v0" : 12, "v1" : 13, "color" : "b3d4a7", "trait" : "line", "y" : 250 },
		{ "v0" : 14, "v1" : 15, "color" : "b3d4a7", "trait" : "line", "y" : -150 },
		{ "v0" : 15, "v1" : 17, "color" : "b3d4a7", "trait" : "line", "x" : -1030 },
		{ "v0" : 16, "v1" : 17, "color" : "b3d4a7", "trait" : "line", "y" : 150 },
		{ "v0" : 18, "v1" : 19, "curve" : -110, "color" : "b3d4a7", "trait" : "line", "x" : -840 },
		{ "v0" : 20, "v1" : 21, "curve" : -180, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -180, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 180, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 180, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 90, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 90, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : -90, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -90, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 24, "v1" : 25, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 26, "v1" : 27, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 28, "v1" : 29, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 30, "v1" : 31, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 32, "v1" : 33, "curve" : -180, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 34, "v1" : 35, "curve" : 180, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 32, "v1" : 33, "curve" : -90, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 34, "v1" : 35, "curve" : 90, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 36, "v1" : 37, "curve" : 40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 },
		{ "v0" : 38, "v1" : 39, "curve" : -40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 },
		{ "v0" : 40, "v1" : 41, "curve" : -40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 },
		{ "v0" : 42, "v1" : 43, "curve" : 40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 },
		{ "v0" : 44, "v1" : 45, "curve" : -60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 46, "v1" : 47, "curve" : 60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 48, "v1" : 49, "curve" : -60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 50, "v1" : 51, "curve" : 60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		
		{ "v0" : 41, "v1" : 52, "vis" : true, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "v0" : 40, "v1" : 53, "vis" : true, "cMask" : ["ball" ] },
		{ "v0" : 57, "v1" : 56, "vis" : true, "cMask" : ["ball" ] },
		{ "v0" : 55, "v1" : 54, "vis" : true, "cMask" : ["ball" ] },
		{ "v0" : 63, "v1" : 65, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		{ "v0" : 62, "v1" : 64, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		{ "v0" : 58, "v1" : 61, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		{ "v0" : 59, "v1" : 60, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		
		{ "v0" : 67, "v1" : 66, "vis" : true, "color" : "b3d4a7", "bCoef" : 0.1, "cMask" : ["ball" ], "cGroup" : ["ball" ], "trait" : "line", "x" : 0 },
		{ "v0" : 68, "v1" : 69, "curve" : 90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 70, "v1" : 71, "curve" : 90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 72, "v1" : 73, "curve" : 90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 74, "v1" : 75, "curve" : -90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 76, "v1" : 77, "curve" : 0, "vis" : true, "color" : "638750", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "y" : -525 },
		{ "v0" : 78, "v1" : 79, "curve" : 0, "vis" : true, "color" : "638750", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "y" : 525 },
		{ "v0" : 80, "v1" : 81, "vis" : true, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 81, "v1" : 82, "vis" : true, "color" : "b3d4a7", "trait" : "line", "y" : 600 },
		{ "v0" : 80, "v1" : 83, "vis" : true, "color" : "b3d4a7", "trait" : "line", "y" : -600 },
		{ "v0" : 82, "v1" : 83, "vis" : true, "color" : "b3d4a7", "trait" : "line" },
		
		{ "v0" : 84, "v1" : 85, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "x" : -1300, "curve" : 259.83403647248304, "cGroup" : ["blueKO","redKO" ] },
		{ "v0" : 86, "v1" : 87, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "y" : -150 },
		{ "v0" : 88, "v1" : 89, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "y" : 150, "curve" : 0 },
		{ "v0" : 91, "v1" : 92, "vis" : false, "bCoef" : 1000000, "cMask" : ["blue" ], "x" : 1410 },
		{ "v0" : 93, "v1" : 97, "curve" : 0, "vis" : true, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "x" : 1150 },
		{ "v0" : 94, "v1" : 98, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 96, "v1" : 99, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 100, "v1" : 101, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 102, "v1" : 103, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 104, "v1" : 105, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 106, "v1" : 107, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 109, "v1" : 111, "curve" : 0, "color" : "ffffff", "cMask" : ["blue","ball" ], "trait" : "reargoalNetleft", "x" : -242, "bCoef" : 0 },
		
		{ "v0" : 108, "v1" : 109, "curve" : 0, "color" : "ffffff", "cMask" : ["blue","ball" ], "trait" : "sidegoalNet", "bCoef" : 0.5 },
		{ "v0" : 110, "v1" : 111, "curve" : 0, "color" : "ffffff", "cMask" : ["blue","ball" ], "trait" : "sidegoalNet", "bCoef" : 0.5 },
		
		{ "v0" : 112, "v1" : 116, "curve" : 0, "vis" : true, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1150 },
		{ "v0" : 113, "v1" : 117, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 115, "v1" : 118, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 119, "v1" : 120, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 121, "v1" : 122, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 128, "v1" : 130, "curve" : 0, "color" : "ffffff", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : -242 },
		
		{ "v0" : 127, "v1" : 128, "curve" : 0, "color" : "ffffff", "cMask" : ["ball" ], "trait" : "sidegoalNet" },
		{ "v0" : 129, "v1" : 130, "curve" : 0, "color" : "ffffff", "cMask" : ["ball" ], "trait" : "sidegoalNet" },
		
		{ "v0" : 131, "v1" : 132, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		
		{ "v0" : 133, "v1" : 134, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 135, "v1" : 136, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 137, "v1" : 138, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 137, "v1" : 139, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 140, "v1" : 141, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 142, "v1" : 143, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 144, "v1" : 145, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 146, "v1" : 147, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 148, "v1" : 149, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 148, "v1" : 150, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 151, "v1" : 152, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		{ "v0" : 153, "v1" : 154, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		{ "v0" : 155, "v1" : 156, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 157, "v1" : 158, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 159, "v1" : 160, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 159, "v1" : 161, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 162, "v1" : 163, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 164, "v1" : 165, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 166, "v1" : 167, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 168, "v1" : 169, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 170, "v1" : 171, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 170, "v1" : 172, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 175, "v1" : 176, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		{ "v0" : 177, "v1" : 178, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 179, "v1" : 180, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		
		{ "v0" : 181, "v1" : 182, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 183, "v1" : 184, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 185, "v1" : 186, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 185, "v1" : 186, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 186, "v1" : 186, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148 },
		
		{ "v0" : 185, "v1" : 187, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 188, "v1" : 189, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 188, "v1" : 189, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 189, "v1" : 189, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 188, "v1" : 190, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 191, "v1" : 192, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 193, "v1" : 194, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 195, "v1" : 196, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 195, "v1" : 196, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 196, "v1" : 196, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148 },
		
		{ "v0" : 195, "v1" : 197, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 198, "v1" : 199, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 198, "v1" : 199, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 199, "v1" : 199, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 198, "v1" : 200, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 201, "v1" : 202, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 203, "v1" : 204, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 205, "v1" : 206, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 205, "v1" : 206, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 206, "v1" : 206, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148 },
		
		{ "v0" : 205, "v1" : 207, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 208, "v1" : 209, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 208, "v1" : 209, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 209, "v1" : 209, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 208, "v1" : 210, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 211, "v1" : 212, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 211, "v1" : 212, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 212, "v1" : 212, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148, "radius" : 20 },
		
		{ "v0" : 211, "v1" : 213, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "radius" : 20 },
		
		{ "v0" : 214, "v1" : 215, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 214, "v1" : 215, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 215, "v1" : 215, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		
		{ "v0" : 214, "v1" : 216, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "radius" : 20 },
		
		{ "v0" : 217, "v1" : 218, "curve" : -328.13941952332465, "vis" : false, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 219, "v1" : 220, "curve" : -336.8674849233308, "vis" : false, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		
		{ "v0" : 221, "v1" : 222, "curve" : 180, "trait" : "powerboost", "bCoef" : -2.2, "vis" : false, "cMask" : ["ball" ], "pos" : [935,0 ], "radius" : 10 },
		
		{ "v0" : 223, "v1" : 224, "curve" : 0, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["blue" ], "cGroup" : ["redKO" ], "x" : 1134 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 225, "v1" : 226 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 226, "v1" : 227, "y" : 18 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 228, "v1" : 229, "y" : -18 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 228, "v1" : 90 },
		{ "vis" : false, "bCoef" : -2.4, "cMask" : ["blue" ], "v0" : 230, "v1" : 231, "x" : 1233.0188554822 },
		{ "curve" : -74, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "v0" : 232, "v1" : 233 },
		{ "v0" : 234, "v1" : 235, "curve" : 0, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["blue" ], "cGroup" : ["blueKO" ], "x" : 1134, "radius" : 15, "pos" : [67,0 ] },
		{ "curve" : 0, "vis" : false, "color" : "6a9158", "bCoef" : 0, "cMask" : ["red" ], "v0" : 232, "v1" : 236 },
		{ "curve" : 0, "vis" : false, "color" : "6a9158", "bCoef" : 0, "cMask" : ["red" ], "v0" : 233, "v1" : 237 }

	],

	"goals" : [
		{ "p0" : [-1161.3,115 ], "p1" : [-1161.3,-116.89189189189187 ], "team" : "red" },
		{ "p0" : [1161.3,115.16891891891896 ], "p1" : [1161.3,-117.98923923923925 ], "team" : "blue" },
		{ "p0" : [1151.8187001142282,-121.478062190417 ], "p1" : [1014.199602660217,-101.29539394052615 ], "team" : "red" },
		{ "p0" : [1150.6265801259315,120.98565833533654 ], "p1" : [1026.839502692259,95.22488810287489 ], "team" : "red" },
		{ "p0" : [1033.9035938100174,-105.6225399413513 ], "p1" : [859.239486391142,-8.193337031992414 ], "team" : "red" },
		{ "p0" : [1032.296032056326,94.29163507192908 ], "p1" : [859.2170868190889,-5.926520547252252 ], "team" : "red" }

	],

	"discs" : [
		{ "radius" : 5, "pos" : [1150,-119 ], "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [1150,116 ], "trait" : "goalPost" },
		
		{ "radius" : 3, "invMass" : 0, "pos" : [1260.5,144 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [1259.5,-148 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		
		{ "radius" : 5, "pos" : [-1150,116.08750755868094 ], "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [-1150,-118.91461989892463 ], "trait" : "goalPost" },
		
		{ "radius" : 3, "invMass" : 0, "pos" : [-1259.8669727834986,-147.38010906609267 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [-1260.0977098047515,144.62151209452182 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		
		{ "radius" : 1.5, "pos" : [-1150.5542972394846,-600.1732586129118 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		{ "radius" : 1.5, "pos" : [1150.4457027605154,-600.1732586129118 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		{ "radius" : 1.5, "pos" : [1148.8518594069587,599.6163281131223 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		{ "radius" : 1.5, "pos" : [-1149.6336058891993,599.8040409312609 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		
		{ "radius" : 15, "invMass" : 1e-27, "pos" : [-181,705 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["red" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] },
		{ "radius" : 15, "invMass" : 1e-27, "pos" : [185,705 ], "color" : "403F45", "bCoef" : 1000, "cMask" : ["red" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -635, "bCoef" : 0, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -635, "bCoef" : 0, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -665, "bCoef" : 0 },
		{ "normal" : [0,-1 ], "dist" : -660, "bCoef" : 0 },
		{ "normal" : [1,0 ], "dist" : -1220, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [-1,0 ], "dist" : -1220, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [1,0 ], "dist" : -117, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -1492, "bCoef" : 0 }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 2 },
		"stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
		"cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.5, "color" : "FFFF00", "cGroup" : [ ] },
		"reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
		"reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
		"sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" },
		"tunnel" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "000000" },
		"advertising" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "333333" },
		"teambench" : { "vis" : true, "cMask" : [ ], "color" : "000000" },
		"manager" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "333333" },
		"physio" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "666666" },
		"redsubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "E56E56" },
		"bluesubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "5689E5" }

	}
}`;

 
var pensblue = `{

	"name" : "ᴘᴇɴᴀʟᴛʏ ʙʟᴜᴇ ᴛᴇᴀᴍ 🔵 | 𝐆𝐋𝐇",

	"width" : 1500,

	"height" : 734,

	"spawnDistance" : 300,

	"redSpawnPoints" : [
		[ 1376, 0
		],
		[ 1376, -48
		],
		[ 1376, 48
		],
		[ 1376, 96
		]

	],

	"blueSpawnPoints" : [
		[ 63, -33
		],
		[ 63, 33
		],
		[ 63, -99
		],
		[ 63, 99
		]

	],

	"bg" : { "type" : "grass", "width" : 1150, "height" : 600, "kickOffRadius" : 180, "cornerRadius" : 0, "color" : "6a9158" },

	"playerPhysics" : {
		"bCoef" : 0.5,
		"invMass" : 0.5,
		"damping" : 0.96,
		"acceleration" : 0.12,
		"kickingAcceleration" : 0.07,
		"kickingDamping" : 0.96,
		"kickStrength" : 5.65

	},

	"ballPhysics" : {
		"pos" : [ 935, 0
		],
		"radius" : 10

	},

	"vertexes" : [
		/* 0 */ { "x" : 1150, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 1 */ { "x" : 840, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 2 */ { "x" : 1150, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 3 */ { "x" : 840, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 4 */ { "x" : 1150, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 5 */ { "x" : 1031, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 6 */ { "x" : 1150, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 7 */ { "x" : 1029, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 8 */ { "x" : 840, "y" : -170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 9 */ { "x" : 840, "y" : 170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 10 */ { "x" : -1150, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 11 */ { "x" : -840, "y" : -337, "trait" : "line", "color" : "b3d4a7" },
		/* 12 */ { "x" : -1150, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 13 */ { "x" : -840, "y" : 337, "trait" : "line", "color" : "b3d4a7" },
		/* 14 */ { "x" : -1150, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 15 */ { "x" : -1030, "y" : -198, "trait" : "line", "color" : "b3d4a7" },
		/* 16 */ { "x" : -1150, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 17 */ { "x" : -1030, "y" : 198, "trait" : "line", "color" : "b3d4a7" },
		/* 18 */ { "x" : -840, "y" : 170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 19 */ { "x" : -840, "y" : -170, "trait" : "line", "curve" : -110, "color" : "b3d4a7" },
		/* 20 */ { "x" : 935, "y" : 4, "trait" : "line", "color" : "a7cf9b" },
		/* 21 */ { "x" : 935, "y" : -4, "trait" : "line", "color" : "a7cf9b" },
		/* 22 */ { "x" : -935, "y" : 4, "trait" : "line", "color" : "a7cf9b" },
		/* 23 */ { "x" : -935, "y" : -4, "trait" : "line", "color" : "a7cf9b" },
		/* 24 */ { "x" : -1150, "y" : 574, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 25 */ { "x" : -1125, "y" : 599, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 26 */ { "x" : -1125, "y" : -600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 27 */ { "x" : -1150, "y" : -575, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 28 */ { "x" : 1124, "y" : 600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 29 */ { "x" : 1150, "y" : 574, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 30 */ { "x" : 1150, "y" : -574, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7" },
		/* 31 */ { "x" : 1124, "y" : -600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "b3d4a7" },
		/* 32 */ { "x" : 0, "y" : -4, "trait" : "line", "color" : "b3d4a7" },
		/* 33 */ { "x" : 0, "y" : 4, "trait" : "line", "color" : "b3d4a7" },
		/* 34 */ { "x" : 0, "y" : -4, "trait" : "line", "color" : "b3d4a7" },
		/* 35 */ { "x" : 0, "y" : 4, "trait" : "line", "color" : "b3d4a7" },
		/* 36 */ { "x" : -1170, "y" : 150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 37 */ { "x" : -1170, "y" : 250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 38 */ { "x" : 1170, "y" : 150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 39 */ { "x" : 1170, "y" : 250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 40 */ { "x" : -1170, "y" : -150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 41 */ { "x" : -1170, "y" : -250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 42 */ { "x" : 1170, "y" : -150, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 43 */ { "x" : 1170, "y" : -250, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "546f48" },
		/* 44 */ { "x" : 1161, "y" : -599, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 45 */ { "x" : 1189, "y" : -579, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 46 */ { "x" : 1161, "y" : 599, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		/* 47 */ { "x" : 1189, "y" : 579, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		/* 48 */ { "x" : -1162, "y" : 599, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 49 */ { "x" : -1190, "y" : 579, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "546f48" },
		/* 50 */ { "x" : -1162, "y" : -600, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		/* 51 */ { "x" : -1190, "y" : -580, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "546f48" },
		
		/* 52 */ { "x" : -1177, "y" : -250, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 53 */ { "x" : -1177, "y" : -150, "cMask" : ["ball" ] },
		
		/* 54 */ { "x" : -1170, "y" : 250, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		
		/* 55 */ { "x" : -1177, "y" : 250, "bCoef" : 0, "cMask" : ["ball" ] },
		
		/* 56 */ { "x" : -1170, "y" : 150, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		
		/* 57 */ { "x" : -1177, "y" : 150, "cMask" : ["ball" ] },
		/* 58 */ { "x" : 1177, "y" : -250, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 59 */ { "x" : 1177, "y" : -150, "cMask" : ["ball" ] },
		
		/* 60 */ { "x" : 1170, "y" : -150, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 61 */ { "x" : 1170, "y" : -250, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		
		/* 62 */ { "x" : 1177, "y" : 250, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 63 */ { "x" : 1177, "y" : 150, "cMask" : ["ball" ] },
		
		/* 64 */ { "x" : 1170, "y" : 250, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 65 */ { "x" : 1170, "y" : 150, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "546f48" },
		/* 66 */ { "x" : 0, "y" : 180, "cMask" : ["ball" ], "cGroup" : ["ball" ], "trait" : "line", "color" : "b3d4a7", "vis" : true, "curve" : 0 },
		/* 67 */ { "x" : 0, "y" : -180, "cMask" : ["ball" ], "cGroup" : ["ball" ], "trait" : "line", "color" : "b3d4a7", "vis" : true, "curve" : 0 },
		/* 68 */ { "x" : -818, "y" : -600, "trait" : "line", "curve" : 90, "color" : "638750" },
		/* 69 */ { "x" : -1150, "y" : -347, "trait" : "line", "curve" : 90, "color" : "638750" },
		/* 70 */ { "x" : -1150, "y" : 347, "trait" : "line", "color" : "638750" },
		/* 71 */ { "x" : -820, "y" : 600, "trait" : "line", "color" : "638750" },
		/* 72 */ { "x" : 820, "y" : 600, "trait" : "line", "color" : "638750" },
		/* 73 */ { "x" : 1150, "y" : 347, "trait" : "line", "color" : "638750" },
		/* 74 */ { "x" : 820, "y" : -600, "trait" : "line", "curve" : -90, "color" : "638750" },
		/* 75 */ { "x" : 1150, "y" : -347, "trait" : "line", "curve" : -90, "color" : "638750" },
		/* 76 */ { "x" : 1150, "y" : -525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 77 */ { "x" : -1150, "y" : -525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 78 */ { "x" : 1150, "y" : 525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 79 */ { "x" : -1150, "y" : 525, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "638750" },
		/* 80 */ { "x" : -1150, "y" : -600, "trait" : "line", "color" : "b3d4a7" },
		/* 81 */ { "x" : -1150, "y" : 600, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFFF00" },
		/* 82 */ { "x" : 1150, "y" : 600, "trait" : "line", "color" : "b3d4a7" },
		/* 83 */ { "x" : 1150, "y" : -600, "trait" : "line", "color" : "b3d4a7" },
		
		/* 84 */ { "x" : -113, "y" : -138, "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["blueKO","redKO" ], "curve" : 235 },
		/* 85 */ { "x" : -114, "y" : 138, "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["blueKO","redKO" ], "curve" : 235 },
		/* 86 */ { "x" : 1495, "y" : -150, "bCoef" : 0, "cMask" : ["red" ], "dist" : -1400 },
		/* 87 */ { "x" : 1300, "y" : -150, "bCoef" : 0, "cMask" : ["red" ] },
		/* 88 */ { "x" : 1300, "y" : 150, "bCoef" : 0, "cMask" : ["red" ], "curve" : 0 },
		/* 89 */ { "x" : 1489, "y" : 150, "bCoef" : 0, "cMask" : ["red" ], "dist" : -1400, "curve" : 0 },
		
		/* 90 */ { "x" : 1300, "y" : -150, "trait" : "kickOffBarrier", "cMask" : ["red" ] },
		
		/* 91 */ { "x" : 1448, "y" : -120, "bCoef" : 0, "cMask" : ["red" ] },
		/* 92 */ { "x" : 1448, "y" : 120, "bCoef" : 0, "cMask" : ["red" ] },
		
		/* 93 */ { "x" : 1150, "y" : -120.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7", "curve" : 0 },
		/* 94 */ { "x" : 1212.8375029631984, "y" : -120.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 95 */ { "x" : 1150.1431278225696, "y" : 116.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 96 */ { "x" : 1212.9145962189946, "y" : 116.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		
		/* 97 */ { "x" : 1150, "y" : 116.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "curve" : 0, "color" : "b3d4a7" },
		/* 98 */ { "x" : 1259, "y" : -148.867722739, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		/* 99 */ { "x" : 1259.5, "y" : 144, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		
		/* 100 */ { "x" : 1213.8375029631984, "y" : -118.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 101 */ { "x" : 1260, "y" : -146.867722739, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 102 */ { "x" : 1211.8375029631984, "y" : -122.92552225676228, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 103 */ { "x" : 1258, "y" : -150.867722739, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 104 */ { "x" : 1214.9145962189946, "y" : 114.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 105 */ { "x" : 1261.5, "y" : 142, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 106 */ { "x" : 1213.9145962189946, "y" : 119.05779951814779, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 107 */ { "x" : 1260.5, "y" : 147, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 108 */ { "x" : 1150, "y" : -120, "bCoef" : 0.5, "cMask" : ["red","ball" ], "trait" : "line", "color" : "C7E6BD", "curve" : 0 },
		/* 109 */ { "x" : 1213, "y" : -120, "bCoef" : 0, "cMask" : ["red","ball" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 110 */ { "x" : 1150, "y" : 116, "bCoef" : 0.5, "cMask" : ["red","ball" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 111 */ { "x" : 1213, "y" : 116, "bCoef" : 0, "cMask" : ["red","ball" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 112 */ { "x" : -1150, "y" : 118.00879788978456, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "b3d4a7", "curve" : 0 },
		/* 113 */ { "x" : -1213.3215131279903, "y" : 117.74394897515494, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 114 */ { "x" : -1149.628852252629, "y" : -118.97302216202547, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 115 */ { "x" : -1212.3997630875529, "y" : -119.23759275268432, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		
		/* 116 */ { "x" : -1150, "y" : -118.97241890367377, "bCoef" : 0, "cMask" : ["wall" ], "curve" : 0, "color" : "b3d4a7" },
		/* 117 */ { "x" : -1259.6013715431845, "y" : 145.49133453725509, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		/* 118 */ { "x" : -1258.866981665902, "y" : -147.37589424369935, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ffffff" },
		
		/* 119 */ { "x" : -1214.3130746008003, "y" : 115.73975191756831, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 120 */ { "x" : -1260.5929330159947, "y" : 143.48713747966846, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 121 */ { "x" : -1212.3299516551804, "y" : 119.74814603274154, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 122 */ { "x" : -1258.6098100703748, "y" : 147.4955315948417, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 123 */ { "x" : -1214.4081749675327, "y" : -117.24604016227767, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 124 */ { "x" : -1260.8753935458817, "y" : -145.3843416532927, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 125 */ { "x" : -1213.3871097379695, "y" : -122.24178092786758, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "6a9158", "curve" : 0 },
		
		/* 126 */ { "x" : -1259.8543283163185, "y" : -150.3800824188826, "bCoef" : 0, "cMask" : ["wall" ], "color" : "6a9158" },
		
		/* 127 */ { "x" : -1150.4806674009055, "y" : 117.08328385388425, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "C7E6BD", "curve" : 0 },
		/* 128 */ { "x" : -1213.4801078094943, "y" : 116.81775004310506, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 129 */ { "x" : -1149.485969316082, "y" : -118.91461989892463, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		/* 130 */ { "x" : -1212.4854097246707, "y" : -119.1801537097038, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "ffffff", "curve" : 0 },
		
		/* 131 */ { "x" : 80.06046236735585, "y" : 736, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 132 */ { "x" : 80.06046236735585, "y" : 724, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		
		/* 133 */ { "x" : -1150, "y" : -602, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 134 */ { "x" : -1150, "y" : -620.49609375, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 135 */ { "x" : -1148, "y" : -620.49609375, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 136 */ { "x" : -1148, "y" : -602, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 137 */ { "x" : -70, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 138 */ { "x" : -90, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 139 */ { "x" : -70, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 140 */ { "x" : -110, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 141 */ { "x" : -130, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 142 */ { "x" : -150, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 143 */ { "x" : -170, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 144 */ { "x" : -190, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 145 */ { "x" : -210, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 146 */ { "x" : -230, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 147 */ { "x" : -250, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 148 */ { "x" : -287.01500879340676, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 149 */ { "x" : -286.93953763264415, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 150 */ { "x" : -270, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 151 */ { "x" : -286.93953763264415, "y" : 736, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "vis" : false },
		/* 152 */ { "x" : -286.93953763264415, "y" : 724, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 153 */ { "x" : -286.93953763264415, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 154 */ { "x" : -286.93953763264415, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 155 */ { "x" : -70, "y" : 734.04149391746, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 156 */ { "x" : -70, "y" : 722.0417049239776, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 157 */ { "x" : -70, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 158 */ { "x" : -70, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 159 */ { "x" : 297, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 160 */ { "x" : 277, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 161 */ { "x" : 297, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 162 */ { "x" : 257, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 163 */ { "x" : 237, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 164 */ { "x" : 217, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 165 */ { "x" : 197, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 166 */ { "x" : 177, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 167 */ { "x" : 157, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 168 */ { "x" : 137, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 169 */ { "x" : 117, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 170 */ { "x" : 79.98499120659324, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 171 */ { "x" : 80.06046236735585, "y" : 687, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 172 */ { "x" : 97, "y" : 667, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "color" : "ffffff" },
		/* 173 */ { "x" : 80.06046236735585, "y" : 736, "bCoef" : 10, "cGroup" : ["all" ] },
		/* 174 */ { "x" : 80.06046236735585, "y" : 724, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 175 */ { "x" : 80.06046236735585, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 176 */ { "x" : 80.06046236735585, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 177 */ { "x" : 297, "y" : 734.04149391746, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "vis" : false },
		/* 178 */ { "x" : 297, "y" : 722.0417049239776, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 179 */ { "x" : 297, "y" : 710, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		/* 180 */ { "x" : 297, "y" : 698, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		
		/* 181 */ { "x" : 1149.968665547433, "y" : -618.9686646206542, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 182 */ { "x" : 1150.0694602019682, "y" : -600.4728455134504, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 183 */ { "x" : 1148.069489899352, "y" : -600.4619464927276, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 184 */ { "x" : 1147.9686952448167, "y" : -618.9577655999315, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 185 */ { "x" : 1158, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 186 */ { "x" : 1168, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 187 */ { "x" : 1149, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 188 */ { "x" : 1158, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 189 */ { "x" : 1149, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 190 */ { "x" : 1168, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		
		/* 191 */ { "x" : 1149.7396826762401, "y" : 597.9263578863065, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 192 */ { "x" : 1153.08526210564, "y" : 579.1424902194007, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 193 */ { "x" : 1155.0010783610655, "y" : 579.7166400913391, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 194 */ { "x" : 1151.7040246689874, "y" : 598.3023373212908, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 195 */ { "x" : 1161.6678517948505, "y" : 578.0712784773244, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 196 */ { "x" : 1171.2713154212654, "y" : 580.8593757453787, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 197 */ { "x" : 1153.0247345310775, "y" : 575.5619909360759, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 198 */ { "x" : 1160.6641350766317, "y" : 581.528531244323, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 199 */ { "x" : 1152.0210178128586, "y" : 579.0192437030742, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 200 */ { "x" : 1170.2675987030466, "y" : 584.316628512377, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		
		/* 201 */ { "x" : -1152.8011166944932, "y" : 581.2713204942369, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		/* 202 */ { "x" : -1150.0489225384003, "y" : 599.5615066971152, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag", "curve" : 0, "color" : "D7D7D9" },
		
		/* 203 */ { "x" : -1152.026657561816, "y" : 599.8591040377528, "bCoef" : 0, "cMask" : ["wall" ] },
		/* 204 */ { "x" : -1154.7788517179088, "y" : 581.5689178348746, "bCoef" : 0, "cMask" : ["wall" ] },
		
		/* 205 */ { "x" : -1162.170956870286, "y" : 578.11573185304, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 206 */ { "x" : -1152.4133863896525, "y" : 575.9271664975008, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 207 */ { "x" : -1170.9527703028564, "y" : 580.085440673025, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 208 */ { "x" : -1161.383072006498, "y" : 581.6284631816164, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28" },
		
		/* 209 */ { "x" : -1170.1648854390683, "y" : 583.5981720016015, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034" },
		
		/* 210 */ { "x" : -1151.6255015258641, "y" : 579.4398978260773, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28" },
		/* 211 */ { "x" : -1159, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28", "radius" : 20 },
		
		/* 212 */ { "x" : -1149, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034", "radius" : 20 },
		
		/* 213 */ { "x" : -1168, "y" : -623, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28", "radius" : 20 },
		/* 214 */ { "x" : -1159, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "beff28", "radius" : 20 },
		
		/* 215 */ { "x" : -1168, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "color" : "ff3034", "radius" : 20 },
		
		/* 216 */ { "x" : -1149, "y" : -619.3999938964844, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "beff28", "radius" : 20 },
		
		/* 217 */ { "x" : -199, "y" : 711, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		/* 218 */ { "x" : -199, "y" : 700, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		/* 219 */ { "x" : 164, "y" : 704, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		/* 220 */ { "x" : 166, "y" : 696, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "curve" : -400 },
		
		/* 221 */ { "x" : 936.0539164518007, "y" : -13, "trait" : "powerboost", "bCoef" : -2.2, "vis" : false, "cMask" : ["ball" ], "pos" : [935,0 ], "radius" : 10 },
		/* 222 */ { "x" : 935.9681020082038, "y" : 13, "trait" : "powerboost", "bCoef" : -2.2, "vis" : false, "cMask" : ["ball" ], "pos" : [935,0 ], "radius" : 10 },
		
		/* 223 */ { "x" : 1134, "y" : 116.23596984067328, "bCoef" : 1, "cMask" : ["red" ], "cGroup" : ["redKO" ], "vis" : false, "curve" : 0 },
		/* 224 */ { "x" : 1134, "y" : -123.76361382468703, "bCoef" : 1, "cMask" : ["red" ], "cGroup" : ["redKO" ], "vis" : false, "curve" : 0 },
		/* 225 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 1300, "y" : 150 },
		/* 226 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 1300, "y" : 18 },
		/* 227 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 1240, "y" : 18 },
		/* 228 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 1300, "y" : -18 },
		/* 229 */ { "bCoef" : 0, "cMask" : ["red" ], "x" : 1240, "y" : -18 },
		/* 230 */ { "bCoef" : -2.4, "cMask" : ["red" ], "x" : 1233.0188554822, "y" : 65.50390625 },
		/* 231 */ { "bCoef" : -2.4, "cMask" : ["red" ], "x" : 1233.0188554822, "y" : -65.49609375 },
		/* 232 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 735, "y" : 620, "curve" : -74 },
		/* 233 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 735, "y" : -620, "curve" : 0 },
		/* 234 */ { "x" : 1134, "y" : 116.23596984067328, "bCoef" : 1, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "vis" : false, "curve" : 0, "radius" : 15, "pos" : [67,0 ] },
		/* 235 */ { "x" : 1134, "y" : -123.76361382468703, "bCoef" : 1, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "vis" : false, "curve" : 0, "radius" : 15, "pos" : [67,0 ] },
		/* 236 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 735, "y" : -666, "curve" : 0 },
		/* 237 */ { "bCoef" : 0, "cMask" : ["blue" ], "x" : 735, "y" : 661 }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "color" : "b3d4a7", "trait" : "line", "y" : 250 },
		{ "v0" : 1, "v1" : 3, "color" : "b3d4a7", "trait" : "line", "x" : 840 },
		{ "v0" : 2, "v1" : 3, "color" : "b3d4a7", "trait" : "line", "y" : -250 },
		{ "v0" : 4, "v1" : 5, "color" : "b3d4a7", "trait" : "line", "y" : 195 },
		{ "v0" : 5, "v1" : 7, "color" : "b3d4a7", "trait" : "line", "x" : 1030 },
		{ "v0" : 6, "v1" : 7, "color" : "b3d4a7", "trait" : "line", "y" : -150 },
		{ "v0" : 8, "v1" : 9, "curve" : -110, "color" : "b3d4a7", "trait" : "line", "x" : 840 },
		{ "v0" : 10, "v1" : 11, "color" : "b3d4a7", "trait" : "line", "y" : -337 },
		{ "v0" : 11, "v1" : 13, "color" : "b3d4a7", "trait" : "line", "x" : -840 },
		{ "v0" : 12, "v1" : 13, "color" : "b3d4a7", "trait" : "line", "y" : 250 },
		{ "v0" : 14, "v1" : 15, "color" : "b3d4a7", "trait" : "line", "y" : -150 },
		{ "v0" : 15, "v1" : 17, "color" : "b3d4a7", "trait" : "line", "x" : -1030 },
		{ "v0" : 16, "v1" : 17, "color" : "b3d4a7", "trait" : "line", "y" : 150 },
		{ "v0" : 18, "v1" : 19, "curve" : -110, "color" : "b3d4a7", "trait" : "line", "x" : -840 },
		{ "v0" : 20, "v1" : 21, "curve" : -180, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -180, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 180, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 180, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 90, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 90, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : -90, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -90, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "color" : "a7cf9b", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "color" : "a7cf9b", "trait" : "line", "x" : -935 },
		{ "v0" : 24, "v1" : 25, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 26, "v1" : 27, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 28, "v1" : 29, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 30, "v1" : 31, "curve" : 90, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 32, "v1" : 33, "curve" : -180, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 34, "v1" : 35, "curve" : 180, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 32, "v1" : 33, "curve" : -90, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 34, "v1" : 35, "curve" : 90, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 36, "v1" : 37, "curve" : 40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 },
		{ "v0" : 38, "v1" : 39, "curve" : -40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 },
		{ "v0" : 40, "v1" : 41, "curve" : -40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 },
		{ "v0" : 42, "v1" : 43, "curve" : 40, "vis" : true, "color" : "546f48", "bCoef" : -4.7, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 },
		{ "v0" : 44, "v1" : 45, "curve" : -60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 46, "v1" : 47, "curve" : 60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 48, "v1" : 49, "curve" : -60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 50, "v1" : 51, "curve" : 60, "vis" : true, "color" : "546f48", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		
		{ "v0" : 41, "v1" : 52, "vis" : true, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "v0" : 40, "v1" : 53, "vis" : true, "cMask" : ["ball" ] },
		{ "v0" : 57, "v1" : 56, "vis" : true, "cMask" : ["ball" ] },
		{ "v0" : 55, "v1" : 54, "vis" : true, "cMask" : ["ball" ] },
		{ "v0" : 63, "v1" : 65, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		{ "v0" : 62, "v1" : 64, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		{ "v0" : 58, "v1" : 61, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		{ "v0" : 59, "v1" : 60, "vis" : true, "color" : "000000", "cMask" : ["ball" ] },
		
		{ "v0" : 67, "v1" : 66, "vis" : true, "color" : "b3d4a7", "bCoef" : 0.1, "cMask" : ["ball" ], "cGroup" : ["ball" ], "trait" : "line", "x" : 0 },
		{ "v0" : 68, "v1" : 69, "curve" : 90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 70, "v1" : 71, "curve" : 90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 72, "v1" : 73, "curve" : 90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 74, "v1" : 75, "curve" : -90, "vis" : true, "color" : "638750", "trait" : "line" },
		{ "v0" : 76, "v1" : 77, "curve" : 0, "vis" : true, "color" : "638750", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "y" : -525 },
		{ "v0" : 78, "v1" : 79, "curve" : 0, "vis" : true, "color" : "638750", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "y" : 525 },
		{ "v0" : 80, "v1" : 81, "vis" : true, "color" : "b3d4a7", "trait" : "line" },
		{ "v0" : 81, "v1" : 82, "vis" : true, "color" : "b3d4a7", "trait" : "line", "y" : 600 },
		{ "v0" : 80, "v1" : 83, "vis" : true, "color" : "b3d4a7", "trait" : "line", "y" : -600 },
		{ "v0" : 82, "v1" : 83, "vis" : true, "color" : "b3d4a7", "trait" : "line" },
		
		{ "v0" : 84, "v1" : 85, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "x" : -1300, "curve" : 259.1001974989001, "cGroup" : ["blueKO","redKO" ] },
		{ "v0" : 86, "v1" : 87, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "y" : -150 },
		{ "v0" : 88, "v1" : 89, "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "y" : 150, "curve" : 0 },
		{ "v0" : 91, "v1" : 92, "vis" : false, "bCoef" : 1000000, "cMask" : ["red" ], "x" : 1410 },
		{ "v0" : 93, "v1" : 97, "curve" : 0, "vis" : true, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "x" : 1150 },
		{ "v0" : 94, "v1" : 98, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 96, "v1" : 99, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 100, "v1" : 101, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 102, "v1" : 103, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 104, "v1" : 105, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 106, "v1" : 107, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 109, "v1" : 111, "curve" : 0, "color" : "ffffff", "cMask" : ["red","ball" ], "trait" : "reargoalNetleft", "x" : -242, "bCoef" : 0 },
		
		{ "v0" : 108, "v1" : 109, "curve" : 0, "color" : "ffffff", "cMask" : ["red","ball" ], "trait" : "sidegoalNet", "bCoef" : 0.5 },
		{ "v0" : 110, "v1" : 111, "curve" : 0, "color" : "ffffff", "cMask" : ["red","ball" ], "trait" : "sidegoalNet", "bCoef" : 0.5 },
		
		{ "v0" : 112, "v1" : 116, "curve" : 0, "vis" : true, "color" : "b3d4a7", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1150 },
		{ "v0" : 113, "v1" : 117, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 115, "v1" : 118, "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 119, "v1" : 120, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 121, "v1" : 122, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 128, "v1" : 130, "curve" : 0, "color" : "ffffff", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : -242 },
		
		{ "v0" : 127, "v1" : 128, "curve" : 0, "color" : "ffffff", "cMask" : ["ball" ], "trait" : "sidegoalNet" },
		{ "v0" : 129, "v1" : 130, "curve" : 0, "color" : "ffffff", "cMask" : ["ball" ], "trait" : "sidegoalNet" },
		
		{ "v0" : 131, "v1" : 132, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		
		{ "v0" : 133, "v1" : 134, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 135, "v1" : 136, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 137, "v1" : 138, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 137, "v1" : 139, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 140, "v1" : 141, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 142, "v1" : 143, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 144, "v1" : 145, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 146, "v1" : 147, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 148, "v1" : 149, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 148, "v1" : 150, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 151, "v1" : 152, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		{ "v0" : 153, "v1" : 154, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		{ "v0" : 155, "v1" : 156, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 157, "v1" : 158, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 159, "v1" : 160, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 159, "v1" : 161, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 162, "v1" : 163, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 164, "v1" : 165, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 166, "v1" : 167, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 168, "v1" : 169, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "y" : 667 },
		{ "v0" : 170, "v1" : 171, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 170, "v1" : 172, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 175, "v1" : 176, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -286.93953763264415 },
		{ "v0" : 177, "v1" : 178, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		{ "v0" : 179, "v1" : 180, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -70 },
		
		{ "v0" : 181, "v1" : 182, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 183, "v1" : 184, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 185, "v1" : 186, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 185, "v1" : 186, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 186, "v1" : 186, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148 },
		
		{ "v0" : 185, "v1" : 187, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 188, "v1" : 189, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 188, "v1" : 189, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 189, "v1" : 189, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 188, "v1" : 190, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 191, "v1" : 192, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 193, "v1" : 194, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 195, "v1" : 196, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 195, "v1" : 196, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 196, "v1" : 196, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148 },
		
		{ "v0" : 195, "v1" : 197, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 198, "v1" : 199, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 198, "v1" : 199, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 199, "v1" : 199, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 198, "v1" : 200, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 201, "v1" : 202, "curve" : 0, "vis" : true, "color" : "D7D7D9", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "cornerflag" },
		
		{ "v0" : 203, "v1" : 204, "curve" : 0, "vis" : true, "color" : "6a9158", "bCoef" : 0, "cMask" : ["wall" ], "x" : 717 },
		{ "v0" : 205, "v1" : 206, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 205, "v1" : 206, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 206, "v1" : 206, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148 },
		
		{ "v0" : 205, "v1" : 207, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 208, "v1" : 209, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 208, "v1" : 209, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		{ "v0" : 209, "v1" : 209, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ] },
		
		{ "v0" : 208, "v1" : 210, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		
		{ "v0" : 211, "v1" : 212, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 211, "v1" : 212, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 212, "v1" : 212, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "x" : -1148, "radius" : 20 },
		
		{ "v0" : 211, "v1" : 213, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "radius" : 20 },
		
		{ "v0" : 214, "v1" : 215, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 214, "v1" : 215, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		{ "v0" : 215, "v1" : 215, "curve" : 0, "vis" : true, "color" : "ff3034", "bCoef" : 0, "cMask" : ["wall" ], "radius" : 20 },
		
		{ "v0" : 214, "v1" : 216, "vis" : true, "color" : "beff28", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "radius" : 20 },
		
		{ "v0" : 217, "v1" : 218, "curve" : -328.13941952332465, "vis" : false, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		{ "v0" : 219, "v1" : 220, "curve" : -336.8674849233308, "vis" : false, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
		
		{ "v0" : 221, "v1" : 222, "curve" : 180, "trait" : "powerboost", "bCoef" : -2.2, "vis" : false, "cMask" : ["ball" ], "pos" : [935,0 ], "radius" : 10 },
		
		{ "v0" : 223, "v1" : 224, "curve" : 0, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red" ], "cGroup" : ["redKO" ], "x" : 1134 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "v0" : 225, "v1" : 226 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "v0" : 226, "v1" : 227, "y" : 18 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "v0" : 228, "v1" : 229, "y" : -18 },
		{ "vis" : false, "bCoef" : 0, "cMask" : ["red" ], "v0" : 228, "v1" : 90 },
		{ "vis" : false, "bCoef" : -2.4, "cMask" : ["red" ], "v0" : 230, "v1" : 231, "x" : 1233.0188554822 },
		{ "curve" : -74, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 232, "v1" : 233 },
		{ "v0" : 234, "v1" : 235, "curve" : 0, "vis" : false, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "x" : 1134, "radius" : 15, "pos" : [67,0 ] },
		{ "curve" : 0, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 233, "v1" : 236, "x" : 735 },
		{ "curve" : 0, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ], "v0" : 232, "v1" : 237 }

	],

	"goals" : [
		{ "p0" : [-1161.3,115 ], "p1" : [-1161.3,-116.89189189189187 ], "team" : "red" },
		{ "p0" : [1161.3,115.16891891891896 ], "p1" : [1161.3,-117.98923923923925 ], "team" : "red" },
		{ "p0" : [1151.8187001142282,-121.478062190417 ], "p1" : [1014.199602660217,-101.29539394052615 ], "team" : "blue" },
		{ "p0" : [1150.6265801259315,120.98565833533654 ], "p1" : [1026.839502692259,95.22488810287489 ], "team" : "blue" },
		{ "p0" : [1033.9035938100174,-105.6225399413513 ], "p1" : [859.239486391142,-8.193337031992414 ], "team" : "blue" },
		{ "p0" : [1032.296032056326,94.29163507192908 ], "p1" : [859.2170868190889,-5.926520547252252 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 5, "pos" : [1150,-119 ], "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [1150,116 ], "trait" : "goalPost" },
		
		{ "radius" : 3, "invMass" : 0, "pos" : [1260.5,144 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [1259.5,-148 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		
		{ "radius" : 5, "pos" : [-1150,116.08750755868094 ], "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [-1150,-118.91461989892463 ], "trait" : "goalPost" },
		
		{ "radius" : 3, "invMass" : 0, "pos" : [-1259.8669727834986,-147.38010906609267 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		{ "radius" : 3, "invMass" : 0, "pos" : [-1260.0977098047515,144.62151209452182 ], "color" : "4a4e52", "cMask" : ["ball" ] },
		
		{ "radius" : 1.5, "pos" : [-1150.5542972394846,-600.1732586129118 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		{ "radius" : 1.5, "pos" : [1150.4457027605154,-600.1732586129118 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		{ "radius" : 1.5, "pos" : [1148.8518594069587,599.6163281131223 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		{ "radius" : 1.5, "pos" : [-1149.6336058891993,599.8040409312609 ], "color" : "13181C", "trait" : "cornerflag", "curve" : 0 },
		
		{ "radius" : 15, "invMass" : 1e-27, "pos" : [-181,705 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["red" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] },
		{ "radius" : 15, "invMass" : 1e-27, "pos" : [185,705 ], "color" : "403F45", "bCoef" : 1000, "cMask" : ["red" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -635, "bCoef" : 0, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -635, "bCoef" : 0, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -665, "bCoef" : 0 },
		{ "normal" : [0,-1 ], "dist" : -660, "bCoef" : 0 },
		{ "normal" : [1,0 ], "dist" : -1220, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [-1,0 ], "dist" : -1220, "bCoef" : 0, "cMask" : ["ball" ] },
		{ "normal" : [1,0 ], "dist" : -117, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -1492, "bCoef" : 0 }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 2 },
		"stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
		"cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.5, "color" : "FFFF00", "cGroup" : [ ] },
		"reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
		"reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
		"sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" },
		"tunnel" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "000000" },
		"advertising" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "333333" },
		"teambench" : { "vis" : true, "cMask" : [ ], "color" : "000000" },
		"manager" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "333333" },
		"physio" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "666666" },
		"redsubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "E56E56" },
		"bluesubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "5689E5" }

	}
}`;
// trusted admin list
const CensurarMensajes = ['rs', 'con', 'real', 'soccer', 'creo', ' con', '  con', '   con', '    con', ' rs', '  rs', '   rs', '    rs', 'R.S', 'R.S C.O.N T.I.A', 'r.s c.o.n t.i.a', 'c.on', 'co.n', 'c.o.n', 'C.ON', 'CO.N', 'C.O.N', 'r.s c.o.n t.i.a', 'R_S', 'R_S C_O_N T_I_A', 'r_s c_o_n t_i_a', 'c_on', 'co_n', 'c_o_n', 'C_ON', 'CO_N', 'C_O_N', 'r_s c_o_n t_i_a', 'R-S C-O-N T-I-A', 'r-s c-o-n t-i-a', 'c-on', 'co-n', 'c-o-n', 'C-ON', 'CO-N', 'C-O-N', 'C.REO', 'CR.EO', 'CRE.O', 'c.reo', 'cr.eo', 'cre.o', 'C-REO', 'CR-EO', 'CRE-O', 'c-reo', 'cr-eo', 'cre-o', 'c_reo', 'cr_eo', 'cre_o', 'C_REO', 'CR_EO', 'CRE_O', 'r.s', 'on', 'C.on', 'mogólico', 'mógolico', 'mogolíco', 'mogolicó', 'mógólícó', 'MOGÓLICO', 'MÓGOLICO', 'MOGOLÍCO', 'MOGOLICÓ', 'MÓGÓLÍCÓ', 'm.ogolico', 'mo.golico', 'mog.olico', 'mogo.lico', 'mogol.ico', 'mogoli.co', 'mogolic.o', 'M.OGOLICO', 'MO.GOLICO', 'MOG.OLICO', 'MOGO.LICO', 'MOGOL.ICO', 'MOOGOLI.CO', 'MOGOLIC.O', 'm-ogolico', 'mo-golico', 'mog-olico', 'mogo-lico', 'mogol-ico', 'mogoli-co', 'mogolic-o', 'M-OGOLICO', 'MO-GOLICO', 'MOG-OLICO', 'MOGO-LICO', 'MOGOL-ICO', 'MOOGOLI-CO', 'MOGOLIC-O', 'm_ogolico', 'mo_golico', 'mog_olico', 'mogo_lico', 'mogol_ico', 'mogoli_co', 'mogolic_o', 'M_OGOLICO', 'MO_GOLICO', 'MOG_OLICO', 'MOGO_LICO', 'MOGOL_ICO', 'MOOGOLI_CO', 'MOGOLIC_O', 'dawn', 'daun', 'doun', 'DÓWN', 'dówn', 'dáun', 'daún', 'dáún', 'DAWN', 'cancerígeno', 'CANCERÍGENO'];

// trusted admin list
const trustBanList = ['DETECTOR DE ADMIN DOWN', 'Áʀʙɪᴛʀᴏ ʙᴏᴛ', '', '🏁 Áʀʙɪᴛʀᴏ ʙᴏᴛ', 'detector de admin down', 'Detector de admin down', 'Detector De Admin Down', 'Dewan', 'MERCA', ' ', '  ', '       ', '      ', '       ', ' ', '  ', '   ', '    ', '     ', 'REAL SOCCER CON TÍA', 'REAL SOCCER CON TIA NEWTON', 'REAL SOCCER CON TÍA NEWTON', 'REAL SOCCER CON TN', 'REAL SOCCER CON TIA', 'Bill', 'bill', 'Juhhi', 'RS', 'Hunte CdN', 'Hunte cdn', 'hunte cdn', 'hunte CdN', 'HUNTE CDN', 'HUNTE cdn', 'hunte CDN', 'adebayor', 'Adebayor', 'ADEBAYOR', 'adebayor', 'adebayor ', 'adebayor  ', 'adebayor   ', 'adebayor     ', 'Adebayor', 'Adebayor ', 'Adebayor  ', 'Adebayor   ', 'Adebayor    ', ' Adebayor', '  Adebayor', 'adebayor', 'NANOTA', ' NANOTA', '  NANOTA', '   NANOTA', '    NANOTA', '     NANOTA', '      NANOTA', '      NANOTA', 'NANOTA ', 'NANOTA  ', 'NANOTA   ', 'NANOTA     ', 'NANOTA      ', 'nanota', ' nanota', '  nanota', '   nanota', '    nanota', '     nanota', '      nanota', '      nanota', 'nanota ', 'nanota  ', 'nanota   ', 'nanota     ', 'nanota      ', 'Nanota', ' Nanota', '  Nanota', '   Nanota', '    Nanota', '     Nanota', '      Nanota', '      Nanota', 'Nanota ', 'Nanota  ', 'Nanota   ', 'Nanota     ', 'Nanota      ', 'N4N0T4', 'n4n0t4', 'N4n0t4', 'not mesi', ' not mesi', '  not mesi', '   not mesi', '    not mesi', '     not mesi', '      not mesi', '      not mesi', 'not mesi ', 'not mesi  ', 'not mesi   ', 'not mesi     ', 'not mesi      ', 'not messi', ' not messi', '  not messi', '   not messi', '    not messi', '     not messi', '      not messi', '      not messi', 'not messi ', 'not messi  ', 'not messi   ', 'not messi     ', 'not messi      ', 'pants', ' pants', '  pants', '   pants', '    pants', '     pants', '      pants', '      pants', 'pants ', 'pants  ', 'pants   ', 'pants     ', 'pants      ', 'Pelé', ' Pelé', '  Pelé', '   Pelé', '    Pelé', '     Pelé', '      Pelé', '      Pelé', 'Pelé ', 'Pelé  ', 'Pelé   ', 'Pelé     ', 'Pelé      ', 'pelé', ' pelé', '  pelé', '   pelé', '    pelé', '     pelé', '      pelé', '      pelé', 'pelé ', 'pelé  ', 'pelé   ', 'pelé     ', 'pelé      ', 'PELÉ', ' PELÉ', '  PELÉ', '   PELÉ', '    PELÉ', '     PELÉ', '      PELÉ', '      PELÉ', 'PELÉ ', 'PELÉ  ', 'PELÉ   ', 'PELÉ     ', 'PELÉ      ', 'PeléE'];
let connections = []
 

room.setCustomStadium(BigGLH);
room.setScoreLimit(3);
room.setTimeLimit(3);
room.setTeamsLock(true);
room.setTeamColors(1, 60, 0xFFFFFF, [0xFF4D40, 0xFF4D40, 0xFF4D40]);
room.setTeamColors(2, 60, 0xFFFFFF, [0x0080ff, 0x0080ff, 0x0080ff]);


function clonekick(player){
    players = room.getPlayerList();
    for (i = 0; i < players.length-1; i++){
        if (player.name == players[i].name){
            room.kickPlayer(player.id,"𝚈𝚊 𝚎𝚡𝚒𝚜𝚝𝚎 𝚞𝚗 𝚓𝚞𝚐𝚊𝚍𝚘𝚛 𝚌𝚘𝚗 𝚎𝚜𝚎 𝚗𝚘𝚖𝚋𝚛𝚎 ⚊ 𝐃𝐔",false);
        }
    }
}
 
var ScoresNumbers = '0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣';
var boldedNumbers = '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
var circledNumbers = '🄋⓵⓶⓷⓸⓹⓺⓻⓼⓽';
 
function boldedNumber(num){
    var result = '';
    var reversedDigits = [];
    do{
        reversedDigits.push(num % 10);
        num = Math.floor(num / 10);
    }while(num > 0);
    for (var i = reversedDigits.length; i-- > 0; ){
        result += boldedNumbers.substr(reversedDigits[i]*2, 2);
    }
   
    return result;
}

function scorerNumber(num){
    var result = '';
    var reversedDigits = [];
    do{
        reversedDigits.push(num % 10);
        num = Math.floor(num / 10);
    }while(num > 0);
    for (var i = reversedDigits.length; i-- > 0; ){
        result += ScoresNumbers.substr(reversedDigits[i]*3, 3);
    }
   
    return result;
}

 
function circledNumber(num){
    var result = '';
    var reversedDigits = [];
    do{
        reversedDigits.push(num % 10);
        num = Math.floor(num / 10);
    }while(num > 0);
    for (var i = reversedDigits.length; i-- > 0; ){
        if(reversedDigits[i] == 0){
            result += circledNumbers.substr(reversedDigits[i], 2);
        }else{
            result += circledNumbers.substr(1+reversedDigits[i], 1);
        }
    }
   
    return result;
}
 
 
/*
    Functions
*/
// If there are no admins left in the room give admin to one of the remaining players.
function CensuradorDeSpammeros(message) {
    if (CensurarMensajes.includes(message)) {
        return true;
    }else return false;
}

function checkBanedAdmins(player) {
    if (trustBanList.includes(player.name)) {
        room.kickPlayer(player.id,"𝙰𝙲𝙲𝙴𝚂𝙾 𝙳𝙴𝙽𝙴𝙶𝙰𝙳𝙾 🚫", true);
    }
}

function updateAdmins() {
  // Get all players except the host (id = 0 is always the host)
  var players = room.getPlayerList().filter((player) => player.id != 0 );
  if ( players.length == 0 ){room.stopGame();} // No players left, do nothing.
  if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}
setInterval(function(){room.clearBans(); room.sendChat('Limpié los bans!'); },1800000);
setInterval(function(player, message){
var isRoomMuted = false;
        isRoomMuted = false;
        mutedPlayers = [];
    room.sendChat('Desmutee a todos los jugadores'); },1800000);
setInterval(function(){            
            room.setPlayerAdmin(room.getPlayerList().filter((player) => player.admin == true && player.id != 0)[0].id, false);
            room.setPlayerAdmin(room.getPlayerList().filter((player) => player.id != 0)[2].id, true); 
            room.sendChat('Sí, a la democracia. No, a dictadura :P'); },5400000);
setInterval(function(player, message){
    room.sendAnnouncement("                                                                                                           ░█▀▀▄ ░█▀▀▀█ ░█▄─░█ ─█▀▀█", player, 0xffcd2c, "normal", 0);
    room.sendAnnouncement("                                                                                                           ░█─░█ ░█──░█ ░█░█░█ ░█▄▄█", player, 0xea8f73, "normal", 0);
    room.sendAnnouncement("                                                                                                           ░█▄▄▀ ░█▄▄▄█ ░█──▀█ ░█─░█", player, 0xd757b3, "normal", 0);
    room.sendAnnouncement("                       Donando $1 (Peso Argentino) ayudas a que este host continue por 3 meses más", player, 0xd733ff, "bold", 0);
    room.sendAnnouncement("                                                                                                          ➡➡  🔗 LINK: http://bit.ly/2Ot0mQ2", player, 0xf1ff33, "bold", 0); },2400000);
function initPlayerStats(player){
}
 
 
 
/*
for commands
*/
 
function swapFun(player){
    if (player.admin == true){
        if (room.getScores() == null) {
            players = room.getPlayerList();
            for (i = 0; i < players.length; i++){
                if (players[i].team == 1){
                    room.setPlayerTeam(players[i].id, 2);
                }
                else if (players[i].team == 2){
                    room.setPlayerTeam(players[i].id, 1);
                }
            }
        }
    }
}
 
 
function pushMuteFun(player, message){ // !mute Anddy

    // Prevent somebody to talk in the room (uses the nickname, not the id)
    // need to be admin
    if (player.admin == true){
        if (!(mutedPlayers.includes(message.substr(6)))) mutedPlayers.push(message.substr(6));
    }
}

var isRoomMuted = false;
function UnmuteAll(player, message){ // !mute Anddy
    // Prevent somebody to talk in the room (uses the nickname, not the id)
    // need to be admin
    if (player.admin == true){
        isRoomMuted = false;
        mutedPlayers = [];
        room.sendChat("[💬] " + player.name + " ha desmuteado a todos los jugadores.");
    }
}  
 
function gotMutedFun(player){
    if (mutedPlayers.includes(player.name)){
        return true;
    }
}
function unmuteFun(player, message){ // !unmute Anddy
    // Allow somebody to talk if he has been muted
    // need to be admin
    if (player.admin == true){
        pos = mutedPlayers.indexOf(message.substr(9));
        mutedPlayers.splice(pos, 1);
    }
}
 
function confirmFun(player, message){ // !confirm aaa
    // Prevent somebody to talk in the room (uses the nickname, not the id)
    // need to be admin
    let password = message.substr(9);
    let account = accounts.find(a => a.password === password);
    if (account !== undefined) {
        account.playerId = player.id;
room.sendAnnouncement("[" + player.name + "] " + account.username + " ha accedido a su cuenta.", null, 0x66FFAD, "bold", 0);
room.sendAnnouncement("⚠ PARA VER TUS ESTADÍSTICAS DEBES PONER:", player.id, 0xffcd48, "bold", 0);
room.sendAnnouncement("                   ⬇   ⬇   ⬇   ⬇   ⬇   ⬇   ⬇   ⬇   ⬇ ", player.id, 0xffcd48, "bold", 0);
room.sendAnnouncement("                 '!stats " + account.username + "' (sin las comillas)", player.id, 0xdfff48, "normal", 0);
        confirmedPlayers.add(player.id);
        if (stats.hasOwnProperty(account.username)){}
        else {stats[account.username] = [0, 0, 0, 0, 0, 0, 1000, "D", "D", "D", "D", "D"];}
    }
    return false;
}

function chatasbotFun(player, message){
    if (player.admin == true){
    messagetext = message.substr(11)
    room.sendChat(messagetext);
    return false;
}
}  
 
function adminFun(player, message){ // !admin Andis
    // Gives admin to the person who type this password
 
    room.setPlayerAdmin(player.id, true);
    return false; // The message won't be displayed
}
 
function resignFun(player, message){
    room.setPlayerAdmin(player.id, false);
    updateAdmins();
}
 
function CamisetasFun(player) { // !camisetas
    room.sendAnnouncement("| !laliga | !seriea | !serieb | !premierleague | !bundesliga | !eredivisie | !ligue1 |  !superlig | !campeonatoruso | !1hnl | !premierucrania | !superligasuiza | !nb1 ⚽ ✦", player.id, 0xFF6F00, "bold", 0);
    room.sendAnnouncement("✦ ⚽  !paises | !superliga | !ascenso | !brasileirao | !campeonatouruguayo | !ligaparaguaya | !ligaaguila | !ligapro | !liga1peru | !campeonatochileno | !ligaboliviana | !ligamx | !mls | !fantasmas | !amateurs", player.id, 0xFF6F00, "bold", 0);
}
function FantasmasFun(player) { // !fantasmas
    room.sendAnnouncement("📜 👻 EQUIPOS FANTASMAS: ", player.id, 0xfaebd6, "bold", 0);
    room.sendAnnouncement("🌍 exSelecciones:  | !URSS | !YUG | !CZE", player.id, 0xfaebd6, "bold", 0);
    room.sendAnnouncement("🛡 exClubes: | !ALU | !LOA | !OCFC", player.id, 0xfaebd6, "bold", 0);
}
function SuperligaFun(player) { // !superliga
    room.sendAnnouncement("🅰 SUPERLIGA: | !BOC | !RIV | !SLO | !RAC | !IND | !HUR | !GIM | !EST | !NOB | !CEN", player.id, 0xADF4FF, "bold", 0); 
    room.sendAnnouncement("| !BAND | !LAN | !UNI | !CSF | !ALD | !AAAJ | !ATU | !TAL | !ARSE | !DYJ | !CCS", player.id, 0xADF4FF, "bold", 0); 
    room.sendAnnouncement("| !GOD | !VEL | !PAT", player.id, 0xADF4FF, "bold", 0); 
}
function AscensoFun(player) { // !ascenso
    room.sendAnnouncement('🅱 ASCENSO: | !TIG | !ALB | !FCO | !CHA | !ATL |  !SMT | !OLP | !PLA | !BEL | !QUI | !MOR | !NCH | !ALM | !SMSJ | !ABROWN', player.id, 0xDB1414, "bold", 0); 
    room.sendAnnouncement('| !DOC | !SCH | !RIE | !AGR | !ALV | !STEL​ | !MER | !AdQ | !CJA | !GyT | !CADU | !VSC | !EBA | !BOCHZ | !CDE | !SIT | !CDM', player.id, 0xDB1414, "bold", 0); 
}
function EquiposAmateursFun(player) { // !ascenso
    room.sendAnnouncement('🔰 AMATEURS (LIGAS BARRIALES) : | !CDYBGR', player.id, 0xDB1414, "bold", 0); 
}
function LigaHungaraFun(player) { // !NB1
    room.sendAnnouncement("(🇭🇺) NEMZETI BAJNOKSÁG I: | !PAKS | !DIO | !KISV | !MEZ | !PAFC | !HON | !DVS | !UJP | !VID | !FTC", player.id, 0x7AFF70, "bold", 0); 
}
function CampeonatoChilenoFun(player) { // !campeonatochileno
    room.sendAnnouncement("(🇨🇱) CAMPEONATO CHILENO:  | !CCO | !UDC | !UCA | !CDP | !COB", player.id, 0xFF2A12, "bold", 0); 
}
function LigaBolivianaFun(player) { // !ligaboliviana
    room.sendAnnouncement("(🇧🇴) LIGA BOLIVIANA:  | !BLV | !STG | !WTM", player.id, 0x5ACC31, "bold", 0); 
}
function MLSFun(player) { // !mls
    room.sendAnnouncement("(🇺🇸) MLS: | !LA | !TOFC | !NYC | !ATLU | !LAFC | !SEA | !NYRB | !PTIM | !ORL | !MIA", player.id, 0x1930FF, "bold", 0); 
}
function LigaUruguayaFun(player) { // !campeonatouruguayo
    room.sendAnnouncement('(🇺🇾) CAMPEONATO URUGUAYO: | !NAC | !PEN | !DAN | !RAM | !RIU | !WAN | !TOR | !CRL | !DFS', player.id, 0x69CDFF, "bold", 0); 
}
function CampeonatoRusoFun(player) { // !campeonatoruso
    room.sendAnnouncement('(🇷🇺) CAMPEONATO RUSO: | !SPM | !CSK | !ZEN | !LOK | !DIN', player.id, 0xe11a22, "bold", 0); 
}
function PremierUcranianaFun(player) { // !premierucrania
    room.sendAnnouncement('(🇺🇦) LIGA PREMIER UCRANIA: | !SHA | !DYK | !NYV', player.id, 0xFFF954, "bold", 0); 
}
function LaLigaFun(player) { // !laliga
    room.sendAnnouncement('(🇪🇸) LALIGA: | !RMA | !BAR | !ATM | !VAL | !BET | !GET | !LEV | !RAY | !ATH | !RCDE', player.id, 0xFF2A00, "bold", 0); 
}
function LigaAguilaFun(player) { // !ligaaguila
    room.sendAnnouncement('(🇨🇴) LIGA ÁGUILA: | !ATN | !MIL | !AME | !SFE | !CAL | !ONC', player.id, 0xFFE959, "bold", 0); 
}
function LigaParaguayaFun(player) { // !ligaparaguaya
    room.sendAnnouncement('(🇵🇾) LIGA PARAGUAYA: | !CCP | !OLI | !GUA | !LIB', player.id, 0xa3a3a3, "bold", 0);
}
function SerieATIMFun(player) { // !seriea
    room.sendAnnouncement('(🇮🇹) SERIE A: | !JUV | !ACM | !INT | !ROM | !NAP | !LAZ | !FIO | !ATA', player.id, 0x6699FF, "bold", 0);
}
function SerieBItaliaFun(player) { // !seriea
    room.sendAnnouncement('(🇮🇹) SERIE B: | !VENFC', player.id, 0x6699FF, "bold", 0);
}
function BrasilLeagueFun(player) { // !brasileirão
    room.sendAnnouncement('(🇧🇷) BRASILEIRAO: |!SAO | !SAN | !COR | !CRU | !GRE | !FLA | !SCI | !PAL | !VAS | !CAM ', player.id, 0xF7FF19, "bold", 0);
    room.sendAnnouncement('| !FLU | !BOT | !PAR', player.id, 0xF7FF19, "bold", 0); 
}
function PremierLeagueFun(player) { // !premierleague
    room.sendAnnouncement('(🇬🇧) PREMIER LEAGUE: | !TOT | !LIV| !ARS | !CHE| !MUN | !MCI | !AVL | !WBA | !FUL | !LEI ', player.id, 0xFFFFFF, "bold", 0); 
    room.sendAnnouncement('| !SOU | !WAT | !CRY | !EVE | !NEW | !WHU | !WOL | !HUL', player.id, 0xFFFFFF, "bold", 0); 
}
function SuperLigFun(player) { // !superlig
    room.sendAnnouncement('(🇹🇷) SUPER LIG: | !GS | !FB | !BJK ', player.id, 0xFA0000, "bold", 0); 
}
function PaisesFun(player) { // !paises
    room.sendAnnouncement('(🌎) PAISES: | !BRA | !ARG | !URU | !CHI | !COL | !PER | !PGY | !ECU | !VEN | !BOL | !ALE | !ITA', player.id, 0x5793FA, "bold", 0);  
    room.sendAnnouncement('| !ESP | !FRA | !POR | !ING | !HOL | !CRO | !BELG | !NGA | !JAP | !USA | !QAT | !CNO | !CSU | !AUT | !NZE | !RUS', player.id, 0x5793FA, "bold", 0); 
}
function BundesligaFun(player) { // !bundesliga
    room.sendAnnouncement('(🇩🇪) BUNDESLIGA: | !BVB | !FCB | !B𝟎𝟒 | !RBL | !HSV', player.id, 0xF5FAF8, "bold", 0); 
}
function EredivisieFun(player) { // !eredivisie
    room.sendAnnouncement('(🇳🇱) EREDIVISIE: | !AJA | !FEY | !PSV | !WIL', player.id, 0xFA6400, "bold", 0); 
} 

function Ligue1Fun(player) { // !ligue1
    room.sendAnnouncement('(🇫🇷) LIGUE 1: | !PSG | !OGC | !OM | !OL | !ASM | !FCN | !REN | !STE', player.id, 0x3744FA, "bold", 0); 
}
function LigaMXFun(player) { // !ligamx
    room.sendAnnouncement('(🇲🇽) LIGA MX: | !AMC | !CHV | !CRUZ | !TGS | !MTY', player.id, 0x75FF59, "bold", 0); 
} 
function LigaProFun(player) { // !ligapro
    room.sendAnnouncement('(🇪🇨) LIGA PRO: | !LDU | !BSC | !EME | !IDV', player.id, 0xFAFF5C, "bold", 0); 
}
function RaiffeisenSuperLeagueFun(player) { // !superligasuiza
    room.sendAnnouncement('(🇨🇭) RAIFFEISEN SUPER LEAGUE: | !BAS | ', player.id, 0xFF0A0A, "bold", 0); 
}
function Liga1PeruFun(player) { // !liga1peru
    room.sendAnnouncement('(🇵🇪) LIGA 1: | !UNV | !ALI | !CRI | !MEL ', player.id, 0xFF1C1C, "bold", 0); 
}
function PrimeraLigaDeCroaciaFun(player) { // !1hnl
    room.sendAnnouncement('(🇭🇷) Prva HNL: | !DZG | !HAJ | !RJK | !OSI | !NKLOK | !GOR | !SLB | !IST | !IZA | !VAR', player.id, 0xFF3B3B, "bold", 0); 
}
function RiverFun(player) { // !RIV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('riv/titular/red | riv/titular/blue | riv/alternativa/red |riv/alternativa/blue | riv/tercera/red |riv/tercera/blue | riv/adidas70years/red |riv/adidas70years/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('riv/titular/red/2018 | riv/titular/blue/2018 | riv/alternativa/red/2018 | riv/alternativa/blue/2018 | riv/tercera/red/2018 |riv/tercera/blue/2018', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('riv/titular/red/2017 | riv/titular/blue/2017 | riv/alternativa/red/2017 | riv/alternativa/blue/2017 | riv/alternativa/red/2009 | riv/alternativa/blue/2009', player.id, 0x6BFFB5, "normal", 0);
}
function RIVTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -144, 0x0e0e0e, [0xFFFFFF, 0xff2c30, 0xFFFFFF]);
    }
}
function RIVTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -144, 0x0e0e0e, [0xFFFFFF, 0xff2c30, 0xFFFFFF]);
    }
}
function RIVAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x7F1A28, 0x371315, 0x7F1A28]);
    }
}
function RIVAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x7F1A28, 0x371315, 0x7F1A28]);
    }
}
function RIVTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x943b39, [0xFFFFFF, 0xFFFFFF, 0x181819]);
    }
}
function RIVTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x943b39, [0xFFFFFF, 0xFFFFFF, 0x181819]);
    }
}
function RIVAdidas70YearsRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 125, 0xFAF9FF, [0x2A2D36, 0x4B515D, 0x4B515D]);
    }
}
function RIVAdidas70YearsBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 125, 0xFAF9FF, [0x2A2D36, 0x4B515D, 0x4B515D]);
    }
}
function RIVTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -145, 0x050505, [0xFCFBFB, 0xFE0B18, 0xFCFBFB]);
    }
}
function RIVTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -145, 0x050505, [0xFCFBFB, 0xFE0B18, 0xFCFBFB]);
    }
}
function RIVAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xebebeb, [0x3E2864, 0x261F32]);
    }
}
function RIVAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xebebeb, [0x3E2864, 0x261F32]);
    }
}
function RIVTercera2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 49, 0xF5F5F5, [0xD52828, 0x1C1C1C, 0x1C1C1C]);
    }
}
function RIVTercera2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 49, 0xF5F5F5, [0xD52828, 0x1C1C1C, 0x1C1C1C]);
    }
}
function RIVTitular2017RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x000000, [0xFFFFFF, 0xBD1F22, 0xFFFFFF]);
    }
}
function RIVTitular2017BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x000000, [0xFFFFFF, 0xBD1F22, 0xFFFFFF]);
    }
}
function RIVAlternativa2017RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe0dfdc, [0xF32424]);
    }
}
function RIVAlternativa2017BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe0dfdc, [0xF32424]);
    }
}
function RIVAlternativa2009RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 27, 0xffffff, [0x151515, 0xE01D1B, 0x151515]);
    }
}
function RIVAlternativa2009BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 27, 0xffffff, [0x151515, 0xE01D1B, 0x151515]);
    }
}
function BocaFun(player) { // !BOC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x0061ce, "bold", 0);
    room.sendAnnouncement('boc/titular/red | boc/titular/blue | boc/alternativa/red |boc/alternativa/blue | ', player.id, 0x0061ce, "bold", 0);
    room.sendAnnouncement('boc/titular/red/2019 | boc/titular/blue/2019 | boc/alternativa/red/2019 |boc/alternativa/blue/2019 | ', player.id, 0xe9bc01, "bold", 0);
    room.sendAnnouncement('boc/titular/red/2018 | boc/titular/blue/2018 | boc/alternativa/red/2018 |boc/alternativa/blue/2018 | boc/tercera/red/2018 | boc/tercera/blue/2018', player.id, 0xe9bc01, "bold", 0);
    room.sendAnnouncement('boc/titular/red/2017 | boc/titular/blue/2017 | boc/alternativa/red/2017 |boc/alternativa/blue/2017 | boc/tercera/red/2017 |boc/tercera/blue/2017', player.id, 0x0061ce, "bold", 0);
    room.sendAnnouncement('boc/titular/red/2016 | boc/titular/blue/2016 | boc/alternativa/red/2016 |boc/alternativa/blue/2016 | boc/alternativa/red/2013 |boc/alternativa/blue/2013', player.id, 0x0061ce, "bold", 0);
}
function BOCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x021AA1, 0xFFE808, 0x021AA1]);
    }
}
function BOCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x021AA1, 0xFFE808, 0x021AA1]);
    }
}
function BOCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x001B88, [0xFFFFFF, 0xEDAF00, 0xFFFFFF]);
    }
}
function BOCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x001B88, [0xFFFFFF, 0xEDAF00, 0xFFFFFF]);
    }
}
function BOCTitular2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x1B2C48, 0xFDB900, 0x1B2C48]);
    }
}
function BOCTitular2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x1B2C48, 0xFDB900, 0x1B2C48]);
    }
}
function BOCAlternativa2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x689AE0, [0xF8B728, 0x0A2E48, 0xF8B728]);
    }
}
function BOCAlternativa2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x689AE0, [0xF8B728, 0x0A2E48, 0xF8B728]);
    }
}
function BOCTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffff3f, [0x063B6D]);
    }
}
function BOCTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffff3f, [0x063B6D]);
    }
}
function BOCAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x0F1E5A, [0xFFFFFF, 0xFFE735, 0xFFFFFF]);
    }
}
function BOCAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x0F1E5A, [0xFFFFFF, 0xFFE735, 0xFFFFFF]);
    }
}
function BOCTercera2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xcdff00]);
    }
}
function BOCTercera2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xcdff00]);
    }
}
function BOCTitular2017RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xF7F8FC, [0x1D2349, 0xFBE863, 0x1D2349]);
    }
}
function BOCTitular2017BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xF7F8FC, [0x1D2349, 0xFBE863, 0x1D2349]);
    }
}
function BOCAlternativa2017RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x100704, [0xF9D807]);
    }
}
function BOCAlternativa2017BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x100704, [0xF9D807]);
    }
}
function BOCTercera2017RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x2D4C94, 0x1F2833, 0x2D4C94]);
    }
}
function BOCTercera2017BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x2D4C94, 0x1F2833, 0x2D4C94]);
    }
}
function BOCTitular2016RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x0047a6, 0xfff000, 0x0047a6]);
    }
}
function BOCTitular2016BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x0047a6, 0xfff000, 0x0047a6]);
    }
}
function BOCAlternativa2016RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x262b3e, [0xFFCC2A]);
    }
}
function BOCAlternativa2016BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x262b3e, [0xFFCC2A]);
    }
}
function BOCAlternativa2013RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x2b2c41 , [0xF699AC]);
    }
}
function BOCAlternativa2013BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x2b2c41 , [0xF699AC]);
    }
}
function SanLorenzoFun(player) { // !SLO
    room.sendAnnouncement('San Lorenzo | 🇦🇷', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('slo/titular/red | slo/titular/blue | slo/alternativa/red | slo/alternativa/blue | slo/tercera/red | slo/tercera/blue | slo/titular/red/2019 | slo/titular/blue/2019  ', player.id, 0x6BFFB5, "normal", 0);
}
function SLOTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x1C3585, 0xFD131E, 0x1C3585]);
    }
}
function SLOTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x1C3585, 0xFD131E, 0x1C3585]);
    }
}
function SLOAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1e2631, [0xF2F3F7, 0xEB212F, 0x1B3146]);
    }
}
function SLOAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1e2631, [0xF2F3F7, 0xEB212F, 0x1B3146]);
    }
}
function SLOTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x172025, [0xBAC3C8, 0xBAC3C8, 0xD50013]);
    }
}
function SLOTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x172025, [0xBAC3C8, 0xBAC3C8, 0xD50013]);
    }
}
function SLOTitular2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xCF000D, 0x1C3B4C, 0xCF000D]);
    }
}
function SLOTitular2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xCF000D, 0x1C3B4C, 0xCF000D]);
    }
}
function RacingFun(player) { // !RAC
    room.sendAnnouncement('Racing Club | 🇦🇷', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Temporada 2020/21: rac/titular/red | rac/titular/blue | rac/alternativa/red | rac/alternativa/blue | rac/tercera/red | rac/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Temporada 2018/19: rac/titular/red/2019 | rac/titular/blue/2019 | rac/alternativa/red/2019 | rac/alternativa/blue/2019 | rac/tercera/red/2019 | rac/tercera/blue/2019  | rac/alternativa2/red/2019 | rac/alternativa2/blue/2019', player.id, 0x6BFFB5, "normal", 0);
}
function RACTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x141414, [0x5BB8F5, 0xFFFFFF, 0x5BB8F5]);
    }
}
function RACTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x141414, [0x5BB8F5, 0xFFFFFF, 0x5BB8F5]);
    }
}
function RACAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xb2a16c, [0x18191D]);
    }
}
function RACAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xb2a16c, [0x18191D]);
    }
}
function RACTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x00306c, [0xCFF4FF, 0xE0FAFF, 0xCFF4FF]);
    }
}
function RACTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x00306c, [0xCFF4FF, 0xE0FAFF, 0xCFF4FF]);
    }
}
function RACTitular2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x111516, [0x00C7E1, 0xFFFFFF, 0x00C7E1]);
    }
}
function RACTitular2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x111516, [0x00C7E1, 0xFFFFFF, 0x00C7E1]);
    }
}
function RACAlternativa2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xeeeeed, [0x1D1E23, 0x11B8E5, 0x1D1E23]);
    }
}
function RACAlternativa2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xeeeeed, [0x1D1E23, 0x11B8E5, 0x1D1E23]);
    }
}
function RACTercera2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xF7F7F7, [0x59A1C6, 0x095D8C, 0x59A1C6]);
    }
}
function RACTercera2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xF7F7F7, [0x59A1C6, 0x095D8C, 0x59A1C6]);
    }
}
function RACAlternativa22019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 140, 0xFFFFFF, [0xF5C4D7, 0x19304F, 0x19304F]);
    }
}
function RACAlternativa22019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 140, 0xFFFFFF, [0xF5C4D7, 0x19304F, 0x19304F]);
    }
}
function IndependienteFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ind/titular/red | ind/titular/blue | ind/alternativa/red | ind/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CAITitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xffffff, [0xeb0421]);
    }
}
function CAITitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xffffff, [0xeb0421]);
    }
}
function CAIAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xe60828, [0xF8F7F3]);
    }
}
function CAIAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xe60828, [0xF8F7F3]);
    }
}
function AldosiviFun(player) { // !ALD
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ald/titular/red | ald/titular/blue | ald/alternativa/red | ald/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ALDTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xF8F232, 0x0E9E59, 0xF8F232]);
    }
}
function ALDTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xF8F232, 0x0E9E59, 0xF8F232]);
    }
}
function ALDAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xF8F232, 0xB7BBC6, 0xAAAEB7]);
    }
}
function ALDAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xF8F232, 0xB7BBC6, 0xAAAEB7]);
    }
}
function GimnasiaFun(player) { // !GIM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('gim/titular/red | gim/titular/blue | gim/alternativa/red |gim/alternativa/blue | gim/tercera/red |gim/tercera/blue | gim/alternativa/clasica/red |gim/alternativa/clasica/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GIMTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x3D71F2, [0xFFFFFF, 0x1F2B53, 0xFFFFFF]);
    }
}
function GIMTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x3D71F2, [0xFFFFFF, 0x1F2B53, 0xFFFFFF]);
    }
}
function GIMAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x1A264F, 0x022C94]);
    }
}
function GIMAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x1A264F, 0x022C94]);
    }
}
function GIMTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x4B4D3F, 0x221F3A, 0x4B4D3F]);
    }
}
function GIMTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x4B4D3F, 0x221F3A, 0x4B4D3F]);
    }
}
function GIMAlternativaClasicaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x9E9EB8, [0x202743, 0xFFFFFF, 0x202743]);
    }
}
function GIMAlternativaClasicaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x9E9EB8, [0x202743, 0xFFFFFF, 0x202743]);
    }
}
function NewellsFun(player) { // !NOB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nob/titular/red | nob/titular/blue | nob/alternativa/red | nob/alternativa/blue | nob/tercera/red | nob/tercera/blue | nob/rosa/red | nob/rosa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NOBTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xef0d2f, 0x212121]);
    }
}
function NOBTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xef0d2f, 0x212121]);
    }
}
function NOBAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xD30022, 0x222222, 0xF3F7FA]);
    }
}
function NOBAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xD30022, 0x222222, 0xF3F7FA]);
    }
}
function NOBTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x191919, 0xD41831, 0xD41831]);
    }
}
function NOBTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x191919, 0xD41831, 0xD41831]);
    }
}
function NOBRosaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xF7C9E5, 0xFC83B8]);
    }
}
function NOBRosaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xF7C9E5, 0xFC83B8]);
    }
}
function CentralFun(player) { // !CEN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cen/titular/red | cen/titular/blue | cen/alternativa/red | cen/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cen/titular/red/2019 | cen/titular/blue/2019 | cen/alternativa/red/2019 | cen/alternativa/blue/2019', player.id, 0x6BFFB5, "normal", 0);
}
function CENTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFEF21E, 0x054C74 , 0xFEF21E]);
    }
}
function CENTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFEF21E, 0x054C74 , 0xFEF21E]);
    }
}
function CENAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x2c3d60, [0x104980, 0xFEFF2B ,0xFEFF2B]);
    }
}
function CENAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x2c3d60, [0x104980, 0xFEFF2B ,0xFEFF2B]);
    }
}
function CENTitular2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xF9AB2D, 0x1A3548, 0xF9AB2D]);
    }
}
function CENTitular2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xF9AB2D, 0x1A3548, 0xF9AB2D]);
    }
}
function CENAlternativa2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1d303f, [0xFDB000]);
    }
}
function CENAlternativa2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1d303f, [0xFDB000]);
    }
}
function DefensaFun(player) { // !DYJ
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dyj/titular/red | dyj/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DYJTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x30a35b, [0x117B1E, 0xF9FF22, 0xF9FF22]);
    }
}
function DYJTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x30a35b, [0x117B1E, 0xF9FF22, 0xF9FF22]);
    }
}
function AtleticoMadridFun(player) { // !ATM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('atm/titular/red | atm/titular/blue | atm/alternativa/red | atm/alternativa/blue | atm/tercera/red | atm/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ATMTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xB5B9C9, [0xFFFAFB, 0xF41819, 0xFFFAFB]);
    }
}
function ATMTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xB5B9C9, [0xFFFAFB, 0xF41819, 0xFFFAFB]);
    }
}
function ATMAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xe61711, [0x201F24]);
    }
}
function ATMAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xe61711, [0x201F24]);
    }
}
function ATMTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 152, 0x0a243f, [0xAFD4EB, 0xA6CFE8]);
    }
}
function ATMTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 152, 0x0a243f, [0xAFD4EB, 0xA6CFE8]);
    }
}
function BarcelonaFun(player) { // !BAR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bar/titular/red | bar/titular/blue | bar/alternativa/red | bar/alternativa/blue |  | bar/tercera/red | bar/tercera/blue | bar/tercera/red/2018 | bar/tercera/blue/2018 | bar/alternativa/red/2012 | bar/alternativa/blue/2012', player.id, 0x6BFFB5, "normal", 0);
}
function BARTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffda26, [0xBC223B, 0x1D397A, 0xBC223B]);
    }
}
function BARTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffda26, [0xBC223B, 0x1D397A, 0xBC223B]);
    }
}
function BARAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x22285a, [0xFADA3C]);
    }
}
function BARAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x22285a, [0xFADA3C]);
    }
}
function BARTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x23285a, [0x4ED9CB, 0x36CCBC]);
    }
}
function BARTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x23285a, [0x4ED9CB, 0x36CCBC]);
    }
}
function BARAlternativa2012RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x112653, [0xf47413, 0xf9af2a, 0xfddb3c]);
    }
}
function BARAlternativa2012BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x112653, [0xf47413, 0xf9af2a, 0xfddb3c]);
    }
}
function BARTercera2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 320, 0x282423, [0xFEA69A, 0xFEA69A, 0xE1193D]);
    }
}
function BARTercera2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 320, 0x282423, [0xFEA69A, 0xFEA69A, 0xE1193D]);
    }
}
function RealMadridFun(player) { // !RMA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rma/titular/red | rma/titular/blue | rma/alternativa/red | rma/alternativa/blue | rma/tercera/red | rma/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RMATitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xc3af69, [0xFDFDFD]);
    }
}
function RMATitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xc3af69, [0xFDFDFD]);
    }
}
function RMAAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 243, 0xcebc77, [0x1C2E4D, 0x1C2E4D, 0x233B58]);
    }
}
function RMAAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 243, 0xcebc77, [0x1C2E4D, 0x1C2E4D, 0x233B58]);
    }
}
function RMATerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x002957, [0x6EE2C8]);
    }
}
function RMATerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x002957, [0x6EE2C8]);
    }
}
function InterMilanFun(player) { // !INT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('int/titular/red | int/titular/blue | int/alternativa/red | int/alternativa/blue | int/tercera/red | int/tercera/blue | int/tercera/red/1997 | int/tercera/blue/1997', player.id, 0x6BFFB5, "normal", 0);
}
function INTTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x0082E1, 0x0C161E, 0x0082E1]);
    }
}
function INTTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x0082E1, 0x0C161E, 0x0082E1]);
    }
}
function INTAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0x7DEDDF]);
    }
}
function INTAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0x7DEDDF]);
    }
}
function INTTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffce0a, [0x1B1B1C]);
    }
}
function INTTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffce0a, [0x1B1B1C]);
    }
}
function INTTercera1997RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffb700, [0x3C4144, 0x655F63, 0x3C4144]);
    }
}
function INTTercera1997BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffb700, [0x3C4144, 0x655F63, 0x3C4144]);
    }
}
function MilanFun(player) { // !ACM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('acm/titular/red | acm/titular/blue | acm/alternativa/red | acm/alternativa/blue | acm/tercera/red | acm/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MILTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf9f9f9, [0xE7002E, 0x242223, 0xE7002E]);
    }
}
function MILTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf9f9f9, [0xE7002E, 0x242223, 0xE7002E]);
    }
}
function MILAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xa61726, [0xFAFAFA]);
    }
}
function MILAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xa61726, [0xFAFAFA]);
    }
}
function MILTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf9f9f9, [0x2A2A2A]);
    }
}
function MILTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf9f9f9, [0x2A2A2A]);
    }
}
function CruzeiroFun(player) { // !CRU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cru/titular/red | cru/titular/blue | cru/alternativa/red | cru/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CRUTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xfefefd, [0x2251C4]);
    }
}
function CRUTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xfefefd, [0x2251C4]);
    }
}
function CRUAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x2f3f99, [0xF6F6FA]);
    }
}
function CRUAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x2f3f99, [0xF6F6FA]);
    }
}
function PalmeirasFun(player) { // !PAL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('pal/titular/red | pal/titular/blue | pal/alternativa/red | pal/alternativa/blue | pal/tercera/red | pal/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PALTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0x133D2F]);
    }
}
function PALTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0x133D2F]);
    }
}
function PALAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x10372a, [0xF2F1F2]);
    }
}
function PALAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x10372a, [0xF2F1F2]);
    }
}
function PALTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0x5ADAC5]);
    }
}
function PALTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0x5ADAC5]);
    }
}
function GremioFun(player) { // !GRE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('gre/titular/red | gre/titular/blue | gre/alternativa/red | gre/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GRETitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x0099DB, 0x20181E, 0x0099DB]);
    }
}
function GRETitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x19A2FF, 0x20181E, 0x19A2FF]);
    }
}
function GREAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0088be, [0xFAFAFC]);
    }
}
function GREAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0088be, [0xFAFAFC]);
    }
}
function TottenhamFun(player) { // !TOT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('tot/titular/red| tot/titular/blue| tot/alternativa/red| tot/alternativa/blue | tot/tercera/red| tot/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('tot/titular/red/2018 | tot/titular/blue/2018 | tot/alternativa/red/2018 | tot/alternativa/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function TOTTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x161d4f, [0xF0F0F1]);
    }
}
function TOTTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x161d4f, [0xF0F0F1]);
    }
}
function TOTAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xfffeff, [0x1B294B, 0x1B294B, 0x232956]);
    }
}
function TOTAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xfffeff, [0x1B294B, 0x1B294B, 0x232956]);
    }
}
function TOTTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x161d4f, [0x3AC0EB, 0x36B4E3]);
    }
}
function TOTTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x161d4f, [0x3AC0EB, 0x36B4E3]);
    }
}
function TOTTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x171c4f, [0xF5F4F9, 0xF5F4F9, 0x182341]);
    }
}
function TOTTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x171c4f, [0xF5F4F9, 0xF5F4F9, 0x182341]);
    }
}
function TOTAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x20374C, 0x0EAF9B]);
    }
}
function TOTAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x20374C, 0x0EAF9B]);
    }
}
function LiverpoolFun(player) { // !LIV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('liv/titular/red | liv/titular/blue | liv/alternativa/red | liv/alternativa/blue | liv/tercera/red | liv/tercera/blue  | liv/titular/red/2018 | liv/titular/blue/2018 | liv/alternativa/red/2018 | liv/alternativa/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function LIVTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xF7F7F7, [0xA80617, 0xB60D1F, 0xA80617]);
    }
}
function LIVTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xF7F7F7, [0xA80617, 0xB60D1F, 0xA80617]);
    }
}
function LIVAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xd91f29, [0xEBEBF0, 0xF7F7FC, 0xEBEBF0]);
    }
}
function LIVAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xd91f29, [0xEBEBF0, 0xF7F7FC, 0xEBEBF0]);
    }
}
function LIVTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x61c8b0, [0x1E1D22]);
    }
}
function LIVTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x61c8b0, [0x1E1D22]);
    }
}
function LIVTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0xA5191A]);
    }
}
function LIVTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0xA5191A]);
    }
}
function LIVAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xec0109, [0xDDE1E4]);
    }
}
function LIVAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xec0109, [0xDDE1E4]);
    }
}
function ArgentinaFun(player) { // !ARG
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('arg/titular/red | arg/titular/blue | arg/alternativa/red | arg/alternativa/blue | arg/alternativa/red/2019 | arg/alternativa/blue/2019 | arg/titular/red/2018 | arg/titular/blue/2018 | arg/titular/red/2016 | arg/titular/blue/2016 | arg/alternativa/red/2016 | arg/alternativa/blue/2016 | arg/alternativa/red/1986 | arg/alternativa/blue/1986 | arg/bandera/red | arg/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ARGTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x04455c, [0xBCEAEF, 0xFBF6F9, 0xBCEAEF]);
    }
}
function ARGTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x04455c, [0xBCEAEF, 0xFBF6F9, 0xBCEAEF]);
    }
}
function ARGAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x80cfca, [0x0D444B, 0x22383C, 0x1E3539]);
    }
}
function ARGAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x80cfca, [0x0D444B, 0x22383C, 0x1E3539]);
    }
}
function ARGAlternativa2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x2B2A2D]);
    }
}
function ARGAlternativa2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x2B2A2D]);
    }
}
function ARGTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x181219, [0xF3F5F6, 0xA8D0E4, 0xF3F5F6]);
    }
}
function ARGTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x181219, [0xF3F5F6, 0xA8D0E4, 0xF3F5F6]);
    }
}
function ARGTitular2016RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x010101, [0xA5D2E8, 0xFFFFFF, 0xA5D2E8]);
    }
}
function ARGTitular2016BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x010101, [0xA5D2E8, 0xFFFFFF, 0xA5D2E8]);
    }
}
function ARGAlternativa2016RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf7f7f7, [0x003E6F]);
    }
}
function ARGAlternativa2016BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf7f7f7, [0x003E6F]);
    }
}
function ARGAlternativa1986RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xC5CAD1, [0x22469C, 0x3965BC, 0x22469C]);
    }
}
function ARGAlternativa1986BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xC5CAD1, [0x22469C, 0x3965BC, 0x22469C]);
    }
}
function ARGBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf6b40e, [0x74ACDF, 0xFFFFFF, 0x74ACDF]);
    }
}
function ARGBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf6b40e, [0x74ACDF, 0xFFFFFF, 0x74ACDF]);
    }
}
function BelgicaFun(player) { // !BÉL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('belg/titular/red | belg/titular/blue | belg/alternativa/red | belg/alternativa/blue | belg/bandera/red | belg/bandera/blue | belg/titular/red/2016 | belg/titular/blue/2016 | belg/titular/red/2018 | belg/titular/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function BelgicaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0xfad215 , [0xDC0B29, 0x312423, 0xDC0B29]);
    }
}
function BelgicaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0xfad215 , [0xDC0B29, 0x312423, 0xDC0B29]);
    }
}
function BelgicaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000 , [0xF9C700, 0xF4AC00]);
    }
}
function BelgicaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000 , [0xF9C700, 0xF4AC00]);
    }
}
function BelgicaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF , [0x000000, 0xFAE042, 0xED2939]);
    }
}
function BelgicaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF , [0x000000, 0xFAE042, 0xED2939]);
    }
}
function BelgicaTitular2016RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf2fa08 , [0x151517, 0xDB1E1A, 0xDB1E1A]);
    }
}
function BelgicaTitular2016BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf2fa08 , [0x151517, 0xDB1E1A, 0xDB1E1A]);
    }
}
function BelgicaTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFE524 , [0xD51F1C]);
    }
}
function BelgicaTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFE524 , [0xD51F1C]);
    }
}
function BrasilFun(player) { // !BRA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bra/titular/red | bra/titular/blue | bra/alternativa/red | bra/alternativa/blue | bra/tercera/red | bra/tercera/blue | bra/retro/red | bra/retro/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BRATitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x019054, [0xF6DC3E]);
    }
}
function BRATitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x019054, [0xF6DC3E]);
    }
}
function BRAAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xfdda01, [0x0853B7, 0x086ACC]);
    }
}
function BRAAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xfdda01, [0x0853B7, 0x086ACC]);
    }
}
function BRATerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0053b5, [0xF8F9FE]);
    }
}
function BRATerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0053b5, [0xF8F9FE]);
    }
}
function BRARetroRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x20801e, [0xf0e237]);
    }
}
function BRARetroBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x20801e, [0xf0e237]);
    }
}
function ChileFun(player) { // !CHI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('chi/titular/red | chi/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CHITitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0xFF3829]);
    }
}
function CHITitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0xFF3829]);
    }
}
function UruguayFun(player) { // !URU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('uru/titular/red | uru/titular/blue | uru/alternativa/red | uru/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function URUTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0x8ABBE4]);
    }
}
function URUTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0x8ABBE4]);
    }
}
function URUAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xFCFBFB]);
    }
}
function URUAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xFCFBFB]);
    }
}
function FranciaFun(player) { // !FRA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fra/titular/red | fra/titular/blue | fra/alternativa/red | fra/alternativa/blue | fra/titular/red/centenario | fra/titular/blue/centenario | fra/bandera/red | fra/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FRATitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xf9f9f9, [0x1F273A, 0x1F273A, 0x3C87D9]);
    }
}
function FRATitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xf9f9f9, [0x1F273A, 0x1F273A, 0x3C87D9]);
    }
}
function FRAAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0x171f47, [0xF1F2F4]);
    }
}
function FRAAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0x171f47, [0xF1F2F4]);
    }
}
function FRABanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 1, 0x000000 , [0x002395, 0xFFFFFF, 0xED2939]);
    }
}
function FRABanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 1, 0x000000 , [0x002395, 0xFFFFFF, 0xED2939]);
    }
}
function FRATitularRedCentenarioFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xf8d088, [0x365FDD]);
    }
}
function FRATitularBlueCentenarioFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xf8d088, [0x365FDD]);
    }
}
function CroaciaFun(player) { // !CRO
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cro/titular/red | cro/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CROTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x2F4767, [0xDD083C, 0xFFFFFF, 0xFFFFFF]);
    }
}
function CROTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x2F4767, [0xDD083C, 0xFFFFFF, 0xFFFFFF]);
    }
}
function NapoliFun(player) { // !NAP
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nap/titular/red | nap/titular/blue | nap/alternativa/red | nap/alternativa/blue | nap/titular/red/ucl | nap/titular/blue/ucl', player.id, 0x6BFFB5, "normal", 0);
}
function NAPTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x031a45, [0x2485C8]);
    }
}
function NAPTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x031a45, [0x2485C8]);
    }
}
function NAPAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 299, 0xFFFFFF, [0x7E8641, 0x7E8641, 0x33392E]);
    }
}
function NAPAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 299, 0xFFFFFF, [0x7E8641, 0x7E8641, 0x33392E]);
    }
}
function NAPTitularUCLRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 299, 0xe0e0e0, [0x0C8FEA]);
    }
}
function NAPTitularUCLBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 299, 0xe0e0e0, [0x0C8FEA]);
    }
}
function BayernFun(player) { // !FCB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fcb/titular/red | fcb/titular/blue | fcb/alternativa/red | fcb/alternativa/blue | fcb/tercera/red | fcb/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FCBTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xF3000E]);
    }
}
function FCBTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xF3000E]);
    }
}
function FCBAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x62676a, [0xF6F8FC]);
    }
}
function FCBAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x62676a, [0xF6F8FC]);
    }
}
function FCBTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xe76352, [0x132243]);
    }
}
function FCBTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xe76352, [0x132243]);
    }
}

function BorussiaFun(player) { // !BVB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bvb/titular/red | bvb/titular/blue | bvb/alternativa/red | bvb/alternativa/blue | bvb/titular/red/ucl | bvb/titular/blue/ucl', player.id, 0x6BFFB5, "normal", 0);
}
function BorussiaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1f191a, [0xFFDB00]);
    }
}
function BorussiaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1f191a, [0xFFDB00]);
    }
}
function BorussiaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xcecfd1, [0x252525]);
    }
}
function BorussiaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xcecfd1, [0x252525]);
    }
}
function BorussiaTitularChampionsRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1f191a, [0x28222B, 0xFBCC30, 0xFBCC30]);
    }
}
function BorussiaTitularChampionsBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1f191a, [0x28222B, 0xFBCC30, 0xFBCC30]);
    }
}
function JuventusFun(player) { // !JUV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('juv/titular/red | juv/titular/blue | juv/alternativa/red | juv/alternativa/blue | juv/tercera/red | juv/tercera/blue | juv/cuarta/red | juv/cuarta/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('temporada 2017/18 juv/tercera/red/2017 | juv/tercera/blue/2017', player.id, 0x6BFFB5, "normal", 0);
}
function JuventusTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0x9D9FA6, [0xF4F5F6, 0x222424]);
    }
}
function JuventusTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0x9D9FA6, [0xF4F5F6, 0x222424]);
    }
}
function JuventusAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xd31218, [0xF9F4EE, 0xF6EDE5]);
    }
}
function JuventusAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xd31218, [0xF9F4EE, 0xF6EDE5]);
    }
}
function JuventusTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xfefefe, [0x1E9BE0, 0x0E7ECA]);
    }
}
function JuventusTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xfefefe, [0x1E9BE0, 0x0E7ECA]);
    }
}
function JuventusCuartaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xa4fb3d, [0xCFCFCF, 0x1F1F21, 0xCFCFCF]);
    }
}
function JuventusCuartaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xa4fb3d, [0xCFCFCF, 0x1F1F21, 0xCFCFCF]);
    }
}
function JuventusTercera2017RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffffff, [0x252527, 0x7d9138, 0x7d9138]);
    }
}
function JuventusTercera2017BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffffff, [0x252527, 0x7d9138, 0x7d9138]);
    }
}

function EstudiantesFun(player) { // !EST
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('est/titular/red | est/titular/blue | est/alternativa/red | est/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EstudiantesTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xDB1719, 0xFFFFFF, 0xDB1719]);
    }
}
function EstudiantesTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xDB1719, 0xFFFFFF, 0xDB1719]);
    }
}
function EstudiantesAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 243, 0xFFFFFF, [0x1C1C1E, 0x1C1C1E, 0xC80F22]);
    }
}
function EstudiantesAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 243, 0xFFFFFF, [0x1C1C1E, 0x1C1C1E, 0xC80F22]);
    }
}
function BanfieldFun(player) { // !BAND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('band/titular/red | band/titular/blue | band/alternativa/red | band/alternativa/blue | band/clasica/red | band/clasica/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BanfieldTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 44, 0xb5ac44, [0xFFFFFF, 0x066748, 0xFFFFFF]);
    }
}
function BanfieldTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 44, 0xb5ac44, [0xFFFFFF, 0x066748, 0xFFFFFF]);
    }
}
function BanfieldAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 44, 0xFFFFFF, [0x1C1C1C, 0x09694A, 0x1C1C1C]);
    }
}
function BanfieldAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 44, 0xFFFFFF, [0x1C1C1C, 0x09694A, 0x1C1C1C]);
    }
}
function BanfieldClasicaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0a0a0a, [0x02953F, 0xFEFFFF, 0x02953F]);
    }
}
function BanfieldClasicaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0a0a0a, [0x02953F, 0xFEFFFF, 0x02953F]);
    }
}
function LanusFun(player) { // !LAN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lan/titular/red | lan/titular/blue | lan/alternativa/red | lan/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lan/titular/red/2019 | lan/titular/blue/2019 | lan/alternativa/red/2019 | lan/alternativa/blue/2019', player.id, 0x6BFFB5, "normal", 0);

}
function LanusTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0x7a2139]);
    }
}
function LanusTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0x7a2139]);
    }
}
function LanusAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 65, 0x731e34, [0x4F1C27, 0xFFFFFF, 0xFFFFFF]);
    }
}
function LanusAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 65, 0x731e34, [0x4F1C27, 0xFFFFFF, 0xFFFFFF]);
    }
}
function LanusTitular2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0x630B29, 0x731430, 0x731430]);
    }
}
function LanusTitular2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0x630B29, 0x731430, 0x731430]);
    }
}
function LanusAlternativa2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x2B0812, [0xFFFFFF, 0x761731, 0xFFFFFF]);
    }
}
function LanusAlternativa2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x2B0812, [0xFFFFFF, 0x761731, 0xFFFFFF]);
    }
}
function ManUnitedFun(player) { // !MUN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Temporada 2016/17: mun/titular/red/2016 | mun/titular/blue/2016', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mun/titular/red | mun/titular/blue | mun/alternativa/red | mun/alternativa/blue | mun/tercera/red | mun/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ManUnitedTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xfdfdfd, [0xF40022]);
    }
}
function ManUnitedTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xfdfdfd, [0xF40022]);
    }
}
function ManUnitedAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x191816, [0xE1D2BF]);
    }
}
function ManUnitedAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x231f20, [0xF5EAD4]);
    }
}
function ManUnitedTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x231f20, [0xF5EAD4]);
    }
}
function ManUnitedTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 233, 0xf24134, [0x2B2F35, 0x212125]);
    }
}
function ManUnitedTitular2016RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xBA001E, 0xC80A26]);
    }
}
function ManUnitedTitular2016BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xBA001E, 0xC80A26]);
    }
}
function ManCityFun(player) { // !MCI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mci/titular/red | mci/titular/blue | mci/alternativa/red | mci/alternativa/blue | mci/tercera/red | mci/tercera/blue | mci/titular/red/ucl | mci/titular/blue/ucl', player.id, 0x6BFFB5, "normal", 0);
}
function ManCityTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x92D5F5]);
    }
}
function ManCityTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x92D5F5]);
    }
}
function ManCityAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xf8d711, [0x242424, 0x242424, 0xF58371]);
    }
}
function ManCityAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xf8d711, [0x242424, 0x242424, 0xF58371]);
    }
}
function ManCityTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xF5FB9C, 0xFEDC99, 0xFE9B7C]);
    }
}
function ManCityTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xF5FB9C, 0xFEDC99, 0xFE9B7C]);
    }
}
function ManCityTitularChampionsRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x4f2a78, [0x93D4F5]);
    }
}
function ManCityTitularChampionsBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x4f2a78, [0x93D4F5]);
    }
}
function ArsenalFun(player) { // !ARS
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ars/titular/red | ars/titular/blue | ars/alternativa/red | ars/alternativa/blue | ars/tercera/red | ars/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ArsenalTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x9BA3B0, [0xFFFFFF, 0xE11124, 0xFFFFFF]);
    }
}
function ArsenalTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x9BA3B0, [0xFFFFFF, 0xE11124, 0xFFFFFF]);
    }
}
function ArsenalAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 55, 0x0e2436, [0xEEC313, 0xFCCA08, 0xD3AC13]);
    }
}
function ArsenalAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 55, 0x0e2436, [0xEEC313, 0xFCCA08, 0xD3AC13]);
    }
}
function ArsenalTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xfecc00, [0x27354F]);
    }
}
function ArsenalTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xfecc00, [0x27354F]);
    }
}
function ChelseaFun(player) { // !CHE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('che/titular/red | che/titular/blue | che/alternativa/red | che/alternativa/blue | che/tercera/red | che/tercera/blue | che/cuarta/red | che/cuarta/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Temporada 2010/11 che/tercera/red/2010 | che/tercera/blue/2010', player.id, 0x6BFFB5, "normal", 0);
}
function ChelseaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -45, 0xFFFFFF, [0x3F60E3, 0x3F60E3, 0x33499F]);
    }
}
function ChelseaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -45, 0xFFFFFF, [0x3F60E3, 0x3F60E3, 0x33499F]);
    }
}
function ChelseaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 52, 0x003b7d, [0xF8F8F8]);
    }
}
function ChelseaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 52, 0x003b7d, [0xF8F8F8]);
    }
}
function ChelseaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 56, 0xf9500f, [0x1A1A1A, 0x161616]);
    }
}
function ChelseaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 56, 0xf9500f, [0x1A1A1A, 0x161616]);
    }
}
function ChelseaCuartaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 56, 0xf4da45, [0x33459F]);
    }
}
function ChelseaCuartaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 56, 0xf4da45, [0x33459F]);
    }
}
function ChelseaTercera2010RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0x9BF32D, 0x0A3050, 0x9BF32D]);
    }
}
function ChelseaTercera2010BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0x9BF32D, 0x0A3050, 0x9BF32D]);
    }
}
function ParanaenseFun(player) { // !PAR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('par/titular/red | par/titular/blue | par/alternativa/red | par/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ParanaenseTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 48, 0xFFFFFF, [0xC6012C, 0xC6012C, 0x100E0F]);
    }
}
function ParanaenseTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 48, 0xFFFFFF, [0xC6012C, 0xC6012C, 0x100E0F]);
    }
}
function ParanaenseAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 48, 0x0e0e0e, [0xFFFFFF, 0xFFFFFF, 0xBABABA]);
    }
}
function ParanaenseAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 48, 0x0e0e0e, [0xFFFFFF, 0xFFFFFF, 0xBABABA]);
    }
}
function HuracanFun(player) { // !HUR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('hur/titular/red | hur/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HuracanTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 52, 0xf01d12, [0xFFFFFF]);
    }
}
function HuracanTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 52, 0xf01d12, [0xFFFFFF]);
    }
}
function TigreFun(player) { // !TIG
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('tig/titular/red | tig/titular/blue | tig/alternativa/red | tig/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function TigreTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x0746DF, 0xEF3239, 0x0746DF]);
    }
}
function TigreTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x0746DF, 0xEF3239, 0x0746DF]);
    }
}
function TigreAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x0E54DA, 0xFD043E, 0xFFFFFF]);
    }
}
function TigreAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x0E54DA, 0xFD043E, 0xFFFFFF]);
    }
}
function AlemaniaFun(player) { // !ALE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ale/titular/red | ale/titular/blue | ale/bandera/red | ale/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AlemaniaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x24201d, [0xFFFFFF]);
    }
}
function AlemaniaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x24201d, [0xFFFFFF]);
    }
}
function AlemaniaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF , [0x000000, 0xDD0000, 0xFFCE00]);
    }
}
function AlemaniaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF , [0x000000, 0xDD0000, 0xFFCE00]);
    }
}
function EspanaFun(player) { // !ESP
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('esp/titular/red | esp/titular/blue | esp/alternativa/red | esp/alternativa/blue | esp/bandera/red | esp/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EspanaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffdd0e, [0xF81C1E]);
    }
}
function EspanaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffdd0e, [0xF81C1E]);
    }
}
function EspanaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xfd2721, [0xE5E6E7]);
    }
}
function EspanaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xfd2721, [0xE5E6E7]);
    }
}
function EspanaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xad1519 , [0xC60B1E, 0xFFC400, 0xC60B1E]);
    }
}
function EspanaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xad1519 , [0xC60B1E, 0xFFC400, 0xC60B1E]);
    }
}
function PortugalFun(player) { // !POR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('por/titular/red | por/titular/blue | por/alternativa/red | por/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PortugalTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf4b568, [0xF31633]);
    }
}
function PortugalTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf4b568, [0xF31633]);
    }
}
function PortugalAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xca262e, [0xF2F2F2]);
    }
}
function PortugalAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xca262e, [0xF2F2F2]);
    }
}
function ArgentinosJrsFun(player) { // !AAAJ
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('aaaj/titular/red | aaaj/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ArgentinosJrsTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 123, 0x075b99, [0xE62C2D, 0xFFFFFF, 0xE62C2D]);
    }
}
function ArgentinosJrsTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 123, 0x075b99, [0xE62C2D, 0xFFFFFF, 0xE62C2D]);
    }
}
function AllBoysFun(player) { // !ALB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('alb/titular/red | alb/titular/blue | alb/alternativa/red | alb/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AllBoysTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x282a27, [0xFFFFFF]);
    }
}
function AllBoysTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x282a27, [0xFFFFFF]);
    }
}
function AllBoysAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 50, 0xD6D6D6, [0xFFFFFF, 0x1E1A17, 0xFFFFFF]);
    }
}
function AllBoysAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 50, 0xD6D6D6, [0xFFFFFF, 0x1E1A17, 0xFFFFFF]);
    }
}
function AtlantaFun(player) { // !ATL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('atl/titular/red | atl/titular/blue | atl/alternativa/red | atl/alternativa/blue  | atl/escudo/red | atl/escudo/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AtlantaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xEDD41C, 0x214DAC, 0xEDD41C]);
    }
}
function AtlantaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xEDD41C, 0x214DAC, 0xEDD41C]);
    }
}
function AtlantaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xedd41c, [0x03264E, 0x09203C, 0x09203C]);
    }
}
function AtlantaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xedd41c, [0x03264E, 0x09203C, 0x09203C]);
    }
}
function AtlantaEscudoRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFBBB51, 0x18306E, 0xFBBB51]);
    }
}
function AtlantaEscudoBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFBBB51, 0x18306E, 0xFBBB51]);
    }
}
function BelgranoFun(player) { // !BEL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bel/titular/red | bel/titular/blue | bel/alternativa/red | bel/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BelgranoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0x17A7ED, 0x4ABFF0, 0x5ECCF5]);
    }
}
function BelgranoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0x17A7ED, 0x4ABFF0, 0x5ECCF5]);
    }
}
function BelgranoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 70, 0x000000, [0x10B0FF, 0xFFFFFF, 0xFFFFFF]);
    }
}
function BelgranoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 70, 0x000000, [0x10B0FF, 0xFFFFFF, 0xFFFFFF]);
    }
}
function ChacaritaFun(player) { // !CHA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cha/titular/red | cha/titular/blue | cha/alternativa/red | cha/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ChacaritaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x000000, 0xD2191E, 0x000000]);
    }
}
function ChacaritaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x000000, 0xD2191E, 0x000000]);
    }
}
function ChacaritaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x9C9C9C, [0xD2191E, 0xFFFFFF, 0x000000]);
    }
}
function ChacaritaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x9C9C9C, [0xD2191E, 0xFFFFFF, 0x000000]);
    }
}
function TalleresFun(player) { // !TAL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('tal/titular/red | tal/titular/blue | tal/alternativa/red | tal/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function TalleresTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0E1E3B, [0x042EA6, 0xFFFFFF, 0x0042EA6]);
    }
}
function TalleresTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0E1E3B, [0x042EA6, 0xFFFFFF, 0x0042EA6]);
    }
}
function TalleresAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x064DB4, 0x063477, 0x061F45]);
    }
}
function TalleresAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x064DB4, 0x063477, 0x061F45]);
    }
}
function PlatenseFun(player) { // !PLA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('pla/titular/red | pla/titular/blue | pla/alternativa/red | pla/alternativa/blue | pla/tercera/red | pla/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PlatenseTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xAD5C47, [0xFFFFFF, 0x4A2D27, 0xFFFFFF]);
    }
}
function PlatenseTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xAD5C47, [0xFFFFFF, 0x4A2D27, 0xFFFFFF]);
    }
}
function PlatenseAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x929294, [0x45251F, 0xFFFFFF, 0x45251F]);
    }
}
function PlatenseAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x929294, [0x45251F, 0xFFFFFF, 0x45251F]);
    }
}
function PlatenseTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x9E6F47, [0xC9B6A5, 0x4A2C21, 0xC9B6A5]);
    }
}
function PlatenseTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x9E6F47, [0xC9B6A5, 0x4A2C21, 0xC9B6A5]);
    }
}
function OlimpoFun(player) { // !OLI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('olp/titular/red | olp/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OlimpoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFFDD00, 0x24201D, 0xFFDD00]);
    }
}
function OlimpoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFFDD00, 0x24201D, 0xFFDD00]);
    }
}
function SanMartinTucumanFun(player) { // !SMT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('smt/titular/red | smt/titular/blue | smt/alternativa/red | smt/alternativa/blue | smt/tercera/red | smt/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SanMartinTucumanTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x0F0F0F, [0xE11A25, 0xFFFFFF, 0xE11A25]);
    }
}
function SanMartinTucumanTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x0F0F0F, [0xE11A25, 0xFFFFFF, 0xE11A25]);
    }
}
function SanMartinTucumanAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xE31515, 0x232326, 0x232326]);
    }
}
function SanMartinTucumanAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xE31515, 0x232326, 0x232326]);
    }
}
function SanMartinTucumanTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xFF3A43, 0x6F3C45, 0x6F3C45]);
    }
}
function SanMartinTucumanTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xFF3A43, 0x6F3C45, 0x6F3C45]);
    }
}
function AtlTucumanFun(player) { // !ATU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('atu/titular/red | atu/titular/blue | atu/alternativa/red | atu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AtlTucumanTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1f2f4c, [0xFFFFFF, 0x0F92FD, 0xFFFFFF]);
    }
}
function AtlTucumanTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1f2f4c, [0xFFFFFF, 0x0F92FD, 0xFFFFFF]);
    }
}
function AtlTucumanAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xccd5e6, [0x151A37]);
    }
}
function AtlTucumanAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xccd5e6, [0x151A37]);
    }
}
function FerroFun(player) { // !FCO
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fco/titular/red | fco/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FerroTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x1F8961]);
    }
}
function FerroTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x1F8961]);
    }
}
function NacionalFun(player) { // !NAC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nac/titular/red | nac/titular/blue | nac/alternativa/red | nac/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NacionalTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf9020a, [0xFAF9FF]);
    }
}
function NacionalTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf9020a, [0xFAF9FF]);
    }
}
function NacionalAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 50, 0xf9020a, [0x003361, 0xFFFFFF, 0x003361]);
    }
}
function NacionalAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 50, 0xf9020a, [0x003361, 0xFFFFFF, 0x003361]);
    }
}
function PenarolFun(player) { // !PEN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('pen/titular/red | pen/titular/blue | pen/alternativa/red | pen/alternativa/blue | pen/tercera/red | pen/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PenarolTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xfbd029, 0x241f23, 0xfbd029]);
    }
}
function PenarolTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xfbd029, 0x241f23, 0xfbd029]);
    }
}
function PenarolAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0D0D0D, [0xd2ff68]);
    }
}
function PenarolAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0D0D0D, [0xd2ff68]);
    }
}
function PenarolTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x252427, [0x656069]);
    }
}
function PenarolTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x252427, [0x656069]);
    }
}
function QuilmesFun(player) { // !QUI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('qui/titular/red | qui/titular/blue | qui/alternativa/red | qui/alternativa/blue | qui/tercera/red | qui/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function QuilmesTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x032051, [0x9BADBC, 0xFFFFFF, 0xFFFFFF]);
    }
}
function QuilmesTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x032051, [0x9BADBC, 0xFFFFFF, 0xFFFFFF]);
    }
}
function QuilmesAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x004FC6, 0x00215E, 0x00215E]);
    }
}
function QuilmesAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x004FC6, 0x00215E, 0x00215E]);
    }
}
function QuilmesTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 152, 0xFFFFFF, [0x2C2F36, 0x15181F, 0x2C2F36]);
    }
}
function QuilmesTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 152, 0xFFFFFF, [0x2C2F36, 0x15181F, 0x2C2F36]);
    }
}
function ChicagoFun(player) { // !CHI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nch/titular/red | nch/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ChicagoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0xFFFFFF, [0x3AC991, 0x000000, 0x3AC991]);
    }
}
function ChicagoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0xFFFFFF, [0x3AC991, 0x000000, 0x3AC991]);
    }
}
function MoronFun(player) { // !MOR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mor/titular/red | mor/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MoronTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x242b35, [0xFFFFFF, 0xE21C1C, 0xFFFFFF]);
    }
}
function MoronTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x242b35, [0xFFFFFF, 0xE21C1C, 0xFFFFFF]);
    }
}
function UnionFun(player) { // !UNI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('uni/titular/red | uni/titular/blue | uni/alternativa/red | uni/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function UnionTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1155a1, [0xFFFFFF, 0xDD0005, 0xFFFFFF]);
    }
}
function UnionTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1155a1, [0xFFFFFF, 0xDD0005, 0xFFFFFF]);
    }
}
function UnionAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 126, 0xFFFFFF, [0xF81726, 0x1461C7, 0x1461C7]);
    }
}
function UnionAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 126, 0xFFFFFF, [0xF81726, 0x1461C7, 0x1461C7]);
    }
}
function ColonFun(player) { // !CSF
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('csf/titular/red | csf/titular/blue | csf/alternativa/red | csf/alternativa/blue | csf/tercera/red | csf/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ColonTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xE61628, 0x18181E]);
    }
}
function ColonTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xE61628, 0x18181E]);
    }
}
function ColonAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 61, 0x000000, [0x7B0C1D, 0xFFFFFF, 0xFFFFFF]);
    }
}
function ColonAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 61, 0x000000, [0x7B0C1D, 0xFFFFFF, 0xFFFFFF]);
    }
}
function ColonTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0xB5B4B9, 0xBEBFC1, 0xBEBFC1]);
    }
}
function ColonTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0xB5B4B9, 0xBEBFC1, 0xBEBFC1]);
    }
}
function SarandiFun(player) { // !ARSE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('arse/titular/red | arse/titular/blue | arse/alternativa/red | arse/alternativa/blue | arse/tercera/red | arse/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SarandiTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0x70D1FF, 0xF12931, 0x70D1FF]);
    }
}
function SarandiTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0x70D1FF, 0xF12931, 0x70D1FF]);
    }
}
function SarandiAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0x1D1E1E, 0xF52626, 0x1D1E1E]);
    }
}
function SarandiAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0x1D1E1E, 0xF52626, 0x1D1E1E]);
    }
}
function SarandiTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xe61b37, [0xFFFFFF, 0xFFFFFF, 0x3BA1F6]);
    }
}
function SarandiTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xe61b37, [0xFFFFFF, 0xFFFFFF, 0x3BA1F6]);
    }
}
function DocksudFun(player) { // !DOC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('doc/titular/red | doc/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DocksudTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x254494, 0xF3C706, 0x254494]);
    }
}
function DocksudTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x254494, 0xF3C706, 0x254494]);
    }
}
function ColombiaFun(player) { // !COL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('col/titular/red | col/titular/blue | col/alternativa/red | col/alternativa/blue | col/alternativa/red/2019 | col/alternativa/blue/2019 | col/bandera/red | col/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ColombiaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xe93733, [0xF0E054, 0xF0E054, 0xF3E675]);
    }
}
function ColombiaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xe93733, [0xF0E054, 0xF0E054, 0xF3E675]);
    }
}
function ColombiaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xf1eb56, [0x3671AF, 0x3168A0, 0x1E477C]);
    }
}
function ColombiaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xf1eb56, [0x3671AF, 0x3168A0, 0x1E477C]);
    }
}
function ColombiaAlternativa2019RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 38, 0xfc3537, [0x02379E]);
    }
}
function ColombiaAlternativa2019BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 38, 0xfc3537, [0x02379E]);
    }
}
function ColombiaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF , [0xFCD116, 0x003893, 0xCE1126]);
    }
}
function ColombiaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF , [0xFCD116, 0x003893, 0xCE1126]);
    }
}
function PeruFun(player) { // !PER
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('per/titular/red | per/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PeruTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 39, 0x171a11, [0xFFFFFF, 0xFF353B, 0xFFFFFF]);
    }
}
function PeruTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 39, 0x171a11, [0xFFFFFF, 0xFF353B, 0xFFFFFF]);
    }
}
function WestBromFun(player) { // !WBA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('wba/titular/red | wba/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function WestBromTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xde2b2e, [0xFFFFFF, 0x1B2A41, 0xFFFFFF]);
    }
}
function WestBromTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xde2b2e, [0xFFFFFF, 0x1B2A41, 0xFFFFFF]);
    }
}
function AstonVillaFun(player) { // !AVL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('avl/titular/red | avl/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AstonVillaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x7A252A, 0x9F313A, 0x7A252A]);
    }
}
function AstonVillaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x7A252A, 0x9F313A, 0x7A252A]);
    }
}
function FulhamFun(player) { // !FUL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ful/titular/red | ful/titular/blue | ful/alternativa/red | ful/alternativa/blue | ful/clasica/red | ful/clasica/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FulhamTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1e202c, [0xF0EFF5]);
    }
}
function FulhamTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1e202c, [0xF0EFF5]);
    }
}
function FulhamAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xC71B29, 0x372729, 0xC71B29]);
    }
}
function FulhamAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xC71B29, 0x372729, 0xC71B29]);
    }
}
function FulhamClasicaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xe41b15, [0x000000, 0xFFFFFF, 0x000000]);
    }
}
function FulhamClasicaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xe41b15, [0x000000, 0xFFFFFF, 0x000000]);
    }
}
function LeicesterFun(player) { // !LEI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lei/titular/red | lei/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LeicesterTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 270, 0xFFFFFF, [0x364CFA, 0x3035FF]);
    }
}
function LeicesterTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 270, 0xFFFFFF, [0x364CFA, 0x3035FF]);
    }
}
function DanubioFun(player) { // !DAN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dan/titular/red | dan/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DanubioTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 50, 0xdb0d24, [0xFFFFFF, 0x131514, 0xFFFFFF]);
    }
}
function DanubioTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 50, 0xdb0d24, [0xFFFFFF, 0x131514, 0xFFFFFF]);
    }
}
function RamplaJrsFun(player) { // !RAM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ram/titular/red | ram/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RamplaJrsTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFF2E3B, 0x1D836D, 0xFF2E3B]);
    }
}
function RamplaJrsTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFF2E3B, 0x1D836D, 0xFF2E3B]);
    }
}
function SacachispasFun(player) { // !SCH
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sch/titular/red | sch/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SacachispasTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x262d3f, [0xFFFFFF, 0x9477B7, 0xFFFFFF]);
    }
}
function SacachispasTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x262d3f, [0xFFFFFF, 0x9477B7, 0xFFFFFF]);
    }
}
function HolandaFun(player) { // !HOL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('hol/titular/red | hol/titular/blue | hol/alternativa/red | hol/alternativa/blue | hol/retro/red | hol/retro/blue  hol/bandera/red | hol/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HolandaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0x200801, [0xF85404, 0xF85404, 0xF75E21]);
    }
}
function HolandaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0x200801, [0xF85404, 0xF85404, 0xF75E21]);
    }
}
function HolandaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x0d285f, [0x4ECDE4, 0x47BAD9, 0x3CA1C7]);
    }
}
function HolandaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x0d285f, [0x4ECDE4, 0x47BAD9, 0x3CA1C7]);
    }
}
function HolandaRetroRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x111419, [0xFC5F36, 0xFF7453, 0xF9A580]);
    }
}
function HolandaRetroBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x111419, [0xFC5F36, 0xFF7453, 0xF9A580]);
    }
}
function HolandaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xAE1C28, 0xFFFFFF, 0x21468B]);
    }
}
function HolandaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xAE1C28, 0xFFFFFF, 0x21468B]);
    }
}
function BoliviaFun(player) { // !BOL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bol/titular/red | bol/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BoliviaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x26A057]);
    }
}
function BoliviaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x26A057]);
    }
}
function ItaliaFun(player) { // !ITA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ita/titular/red | ita/titular/blue | ita/alternativa/red | ita/alternativa/blue | ita/retro/red | ita/retro/blue | ita/bandera/red | ita/bandera/blue | ita/alternativa/red/euro | ita/alternativa/blue/euro | ita/tercera/red/euro | ita/tercera/blue/euro', player.id, 0x6BFFB5, "normal", 0);
}
function ItaliaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf9f9f9, [0x0269DC]);
    }
}
function ItaliaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf9f9f9, [0x0269DC]);
    }
}
function ItaliaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x053da7, [0xF0F1F1]);
    }
}
function ItaliaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x053da7, [0xF0F1F1]);
    }
}
function ItaliaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 1, 0x000000 , [0x009246, 0xFFFFFF, 0xCE2B37]);
    }
}
function ItaliaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 1, 0x000000 , [0x009246, 0xFFFFFF, 0xCE2B37]);
    }
}
function ItaliaRetroRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xdbbc52, [0x1d3b6d, 0x2163b7, 0x1d3b6d]);
    }
}
function ItaliaRetroBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xdbbc52, [0x1d3b6d, 0x2163b7, 0x1d3b6d]);
    }
}
function ItaliaAlternativaEuro2020RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x23333e, [0xF3F3F3, 0xFCFBFC, 0xF3F3F3]);
    }
}
function ItaliaAlternativaEuro2020BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x23333e, [0xF3F3F3, 0xFCFBFC, 0xF3F3F3]);
    }
}
function ItaliaTerceraEuro2020RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 66, 0xe4c681, [0x0A363E, 0x064A4A, 0x064A4A]);
    }
}
function ItaliaTerceraEuro2020BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 66, 0xe4c681, [0x0A363E, 0x064A4A, 0x064A4A]);
    }
}
function InglaterraFun(player) { // !ING
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ing/titular/red | ing/titular/blue | ing/alternativa/red | ing/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function InglaterraTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xdc1413, [0xF3F4F9]);
    }
}
function InglaterraTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xdc1413, [0xF3F4F9]);
    }
}
function InglaterraAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xfbf9f9, [0xDB141F]);
    }
}
function InglaterraAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xfbf9f9, [0xDB141F]);
    }
}
function ParaguayFun(player) { // !PGY
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('pgy/titular/red | pgy/titular/blue | pgy/alternativa/red | pgy/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ParaguayTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x15327d, [0xFBFBFB, 0xF52A38, 0xFBFBFB]);
    }
}
function ParaguayTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x15327d, [0xFBFBFB, 0xF52A38, 0xFBFBFB]);
    }
}
function ParaguayAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x1637D4, 0x0018A0]);
    }
}
function ParaguayAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x1637D4, 0x0018A0]);
    }
}
function VenezuelaFun(player) { // !VEN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ven/titular/red | ven/titular/blue | ven/alternativa/red | ven/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function VenezuelaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x810B2B]);
    }
}
function VenezuelaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x810B2B]);
    }
}
function VenezuelaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xa30023, [0xFAFAFA]);
    }
}
function VenezuelaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xa30023, [0xFAFAFA]);
    }
}
function QatarFun(player) { // !QAT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('qat/titular/red | qat/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function QatarTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xBD1C2E]);
    }
}
function QatarTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xBD1C2E]);
    }
}
function AjaxFun(player) { // !AJA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('aja/titular/red | aja/titular/blue | aja/alternativa/red | aja/alternativa/blue | aja/alternativa/red/2018 | aja/alternativa/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function AjaxTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xB8BCC2, [0xFCFAFC, 0xE11025, 0xFCFAFC]);
    }
}
function AjaxTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xB8BCC2, [0xFCFAFC, 0xE11025, 0xFCFAFC]);
    }
}
function AjaxAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xee7024, [0x255459, 0x05707C, 0x255459]);
    }
}
function AjaxAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xee7024, [0x255459, 0x05707C, 0x255459]);
    }
}
function AjaxAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xc5c390, [0xDFDCC9, 0x1C2427, 0x1C2427]);
    }
}
function AjaxAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xc5c390, [0xDFDCC9, 0x1C2427, 0x1C2427]);
    }
}
function PSVFun(player) { // !PSV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('psv/titular/red | psv/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PSVTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x030303, [0xFFFFFF, 0xFA2747, 0xFFFFFF]);
    }
}
function PSVTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x030303, [0xFFFFFF, 0xFA2747, 0xFFFFFF]);
    }
}
function FeyenoordFun(player) { // !FEY
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fey/titular/red | fey/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FEYTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFFFFFF, 0xFA203B]);
    }
}
function FEYTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFFFFFF, 0xFA203B]);
    }
}
function ParisFun(player) { // !PSG
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('psg/titular/red | psg/titular/blue | psg/alternativa/red | psg/alternativa/blue | psg/tercera/red | psg/tercera/blue | psg/entrenamiento/red | psg/entrenamiento/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PSGTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf3f3f3, [0x293359, 0xE71B38, 0x293359]);
    }
}
function PSGTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf3f3f3, [0x293359, 0xE71B38, 0x293359]);
    }
}
function PSGAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0e0e0e, [0xFB503D]);
    }
}
function PSGAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0e0e0e, [0xFB503D]);
    }
}
function PSGTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x191e3f, [0xD40709, 0xEAF4F6, 0xEAF4F6]);
    }
}
function PSGTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x191e3f, [0xD40709, 0xEAF4F6, 0xEAF4F6]);
    }
}
function PSGEntrenamientoRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 57, 0xFFFFFF, [0xFF4F47, 0x2A232A, 0x55555F]);
    }
}
function PSGEntrenamientoBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 57, 0xFFFFFF, [0xFF4F47, 0x2A232A, 0x55555F]);
    }
}
function RiestraFun(player) { // !RIE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rie/titular/red | rie/titular/blue | rie/alternativa/red | rie/alternativa/blue  ', player.id, 0x6BFFB5, "normal", 0);
}
function RiestraTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0xFFFFFF, [0x1D1C21]);
    }
}
function RiestraTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0xFFFFFF, [0x1D1C21]);
    }
}
function RiestraAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0x19161b, [0xFDFDFD]);
    }
}
function RiestraAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0x19161b, [0xFDFDFD]);
    }
}
function CentralCordobaSdEFun(player) { // !CCS
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ccs/titular/red | ccs/titular/blue | ccs/alternativa/red | ccs/alternativa/blue | ccs/tercera/red | ccs/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CentralCordobaSdETitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xd10d1d, [0x1D1D1D, 0xFFFFFF, 0x1D1D1D]);
    }
}
function CentralCordobaSdETitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xd10d1d, [0x1D1D1D, 0xFFFFFF, 0x1D1D1D]);
    }
}
function CentralCordobaSdEAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x9C181C, 0x9C181C, 0xC02122]);
    }
}
function CentralCordobaSdEAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x9C181C, 0x9C181C, 0xC02122]);
    }
}
function CentralCordobaSdETerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 50, 0xca0009, [0xE7E7E7, 0xFBFBFB]);
    }
}
function CentralCordobaSdETerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 50, 0xca0009, [0xE7E7E7, 0xFBFBFB]);
    }
}
function OGCNiceFun(player) { // !OGC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ogc/titular/red | ogc/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OGCNiceTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFD2725, 0x0C0D11, 0xFD2725]);
    }
}
function OGCNiceTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFD2725, 0x0C0D11, 0xFD2725]);
    }
}
function OlympiqueMarsellaFun(player) { // !OM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('om/titular/red | om/titular/blue | om/alternativa/red | om/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OlympiqueMarsellaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0a93d6, [0xFAFAFA]);
    }
}
function OlympiqueMarsellaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0a93d6, [0xFAFAFA]);
    }
}
function OlympiqueMarsellaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 61, 0xFFFFFF, [0x24ADEA, 0x1473E5]);
    }
}
function OlympiqueMarsellaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 61, 0xFFFFFF, [0x24ADEA, 0x1473E5]);
    }
}
function ASRomaFun(player) { // !ROM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rom/titular/red | rom/titular/blue | rom/alternativa/red | rom/alternativa/blue | rom/tercera/red | rom/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ASRomaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffc500, [0xA8001A]);
    }
}
function ASRomaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffc500, [0xA8001A]);
    }
}
function ASRomaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x6e0f19, [0xF6F7FA]);
    }
}
function ASRomaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x6e0f19, [0xF6F7FA]);
    }
}
function ASRomaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf9b105, [0x172952, 0x1C2446]);
    }
}
function ASRomaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf9b105, [0x172952, 0x1C2446]);
    }
}
function FiorentinaFun(player) { // !FIO
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fio/titular/red | fio/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FiorentinaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x4C2A77]);
    }
}
function FiorentinaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x4C2A77]);
    }
}
function LazioFun(player) { // !LAZ
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('laz/titular/red | laz/titular/blue | laz/alternativa/red | laz/alternativa/blue | laz/tercera/red | laz/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LazioTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x194174, [0xFFFFFF, 0x9EDFFF]);
    }
}
function LazioTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x194174, [0xFFFFFF, 0x9EDFFF]);
    }
}
function LazioAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1e2e50, [0xFFFFFF, 0x86BBEF, 0xFFFFFF]);
    }
}
function LazioAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1e2e50, [0xFFFFFF, 0x86BBEF, 0xFFFFFF]);
    }
}
function LazioTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xc3e9fe, [0x0F1217]);
    }
}
function LazioTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xc3e9fe, [0x0F1217]);
    }
}
function SMSanJuanFun(player) { // !SMSJ
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('smsj/titular/red | smsj/titular/blue | smsj/alternativa/red | smsj/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SMSanJuanTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x131311, 0x4EA280, 0x131311]);
    }
}
function SMSanJuanTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x131311, 0x4EA280, 0x131311]);
    }
}
function SMSanJuanAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x030303, [0xFFFFFF, 0x48C079, 0xFFFFFF]);
    }
}
function SMSanJuanAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x030303, [0xFFFFFF, 0x48C079, 0xFFFFFF]);
    }
}
function GodoyCruzFun(player) { // !GOD
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('god/titular/red | god/titular/blue | god/alternativa/red | god/alternativa/blue | god/tercera/red | god/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GodoyCruzTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x8A8B91, [0x1A469D, 0xFFFFFF, 0x1A469D]);
    }
}
function GodoyCruzTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x8A8B91, [0x1A469D, 0xFFFFFF, 0x1A469D]);
    }
}
function GodoyCruzAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 237, 0x16439c, [0xDCDFDC, 0xEDEDEC]);
    }
}
function GodoyCruzAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 237, 0x16439c, [0xDCDFDC, 0xEDEDEC]);
    }
}
function GodoyCruzTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x881325, 0x5F0D1A, 0x881325]);
    }
}
function GodoyCruzTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x881325, 0x5F0D1A, 0x881325]);
    }
}
function VelezFun(player) { // !VEL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('vel/titular/red | vel/titular/blue | vel/alternativa/red | vel/alternativa/blue | vel/tercera/red | vel/tercera/blue', player.id, 0x6BFFB5, "normal", 0);

}
function VelezTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x273dce, [0xFFFFFF]);
    room.sendAnnouncement('𝘗𝘢𝘳𝘢 𝘦𝘮𝘶𝘭𝘢𝘳 𝘭𝘢 𝘤𝘢𝘮𝘪𝘴𝘦𝘵𝘢 𝘥𝘦 𝘝𝘦́𝘭𝘦𝘻 𝘱𝘶𝘦𝘥𝘦𝘴 𝘶𝘴𝘢𝘳 𝘥𝘦 𝘢𝘷𝘢𝘵𝘢𝘳 "/avatar ᐯ"', player.id, 0x6BFFB5, "normal", 0); 
    }
}
function VelezTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x273dce, [0xFFFFFF]);
    room.sendAnnouncement('𝘗𝘢𝘳𝘢 𝘦𝘮𝘶𝘭𝘢𝘳 𝘭𝘢 𝘤𝘢𝘮𝘪𝘴𝘦𝘵𝘢 𝘥𝘦 𝘝𝘦́𝘭𝘦𝘻 𝘱𝘶𝘦𝘥𝘦𝘴 𝘶𝘴𝘢𝘳 𝘥𝘦 𝘢𝘷𝘢𝘵𝘢𝘳 "/avatar ᐯ"', player.id, 0x6BFFB5, "normal", 0); 
    }
}
function VelezAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x2C3EA2, 0x2E42B5, 0x3248C4]);
    room.sendAnnouncement('𝘗𝘢𝘳𝘢 𝘦𝘮𝘶𝘭𝘢𝘳 𝘭𝘢 𝘤𝘢𝘮𝘪𝘴𝘦𝘵𝘢 𝘥𝘦 𝘝𝘦́𝘭𝘦𝘻 𝘱𝘶𝘦𝘥𝘦𝘴 𝘶𝘴𝘢𝘳 𝘥𝘦 𝘢𝘷𝘢𝘵𝘢𝘳 "/avatar ᐯ"', player.id, 0x6BFFB5, "normal", 0); 
    }
}
function VelezAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x2C3EA2, 0x2E42B5, 0x3248C4]);
    room.sendAnnouncement('𝘗𝘢𝘳𝘢 𝘦𝘮𝘶𝘭𝘢𝘳 𝘭𝘢 𝘤𝘢𝘮𝘪𝘴𝘦𝘵𝘢 𝘥𝘦 𝘝𝘦́𝘭𝘦𝘻 𝘱𝘶𝘦𝘥𝘦𝘴 𝘶𝘴𝘢𝘳 𝘥𝘦 𝘢𝘷𝘢𝘵𝘢𝘳 "/avatar ᐯ"', player.id, 0x6BFFB5, "normal", 0); 
    }
}
function VelezTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x000000, [0x097C7F, 0xFFFFFF, 0xF11931]);
    }
}
function VelezTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x000000, [0x097C7F, 0xFFFFFF, 0xF11931]);
    }
}
function FlamengoFun(player) { // !FLA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fla/titular/red | fla/titular/blue | fla/alternativa/red | fla/alternativa/blue | fla/tercera/red | fla/tercera/blue | fla/titular/red/2018 | fla/titular/blue/2018 | fla/alternativa/red/2018 | fla/alternativa/blue/2018 | fla/tercera/red/2018 | fla/tercera/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function FlamengoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf5f5f5, [0x872C32, 0x1B1F1F, 0x872C32]);
    }
}
function FlamengoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf5f5f5, [0x872C32, 0x1B1F1F, 0x872C32]);
    }
}
function FlamengoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xde111e, [0xEEEFF1, 0x1B1F1F, 0x872C32]);
    }
}
function FlamengoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xde111e, [0xEEEFF1, 0x1B1F1F, 0x872C32]);
    }
}
function FlamengoTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xc1e23f, [0x36363C]);
    }
}
function FlamengoTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xc1e23f, [0x36363C]);
    }
}
function FlamengoTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf5f5f5, [0xF70610, 0x131517, 0xF70610]);
    }
}
function FlamengoTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf5f5f5, [0xF70610, 0x131517, 0xF70610]);
    }
}
function FlamengoAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 67, 0x1a1a1a, [0xD82C23, 0xE4E8DF, 0xE4E8DF]);
    }
}
function FlamengoAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 67, 0x1a1a1a, [0xD82C23, 0xE4E8DF, 0xE4E8DF]);
    }
}
function FlamengoTercera2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf5f5f5, [0x71A5D4, 0x4477A7, 0x71A5D4]);
    }
}
function FlamengoTercera2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf5f5f5, [0x71A5D4, 0x4477A7, 0x71A5D4]);
    }
}
function SCInternacionalFun(player) { // !SCI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sci/titular/red | sci/titular/blue | sci/alternativa/red | sci/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SCInternacionalTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xD40D12]);
    }
}
function SCInternacionalTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xD40D12]);
    }
}
function SCInternacionalAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 64, 0x66020A, [0xF9F9FA, 0xC71B20, 0xF9F9FA]);
    }
}
function SCInternacionalAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 64, 0x66020A, [0xF9F9FA, 0xC71B20, 0xF9F9FA]);
    }
}
function SantosFun(player) { // !SAN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('san/titular/red | san/titular/blue | san/alternativa/red | san/alternativa/blue | san/tercera/red | san/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SantosTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xE8E8E8]);
    }
}
function SantosTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xE8E8E8]);
    }
}
function SantosAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xb0b0b0, [0x1F2026, 0xFFFFFF, 0x1F2026]);
    }
}
function SantosAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xb0b0b0, [0x1F2026, 0xFFFFFF, 0x1F2026]);
    }
}
function SantosTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 225, 0xa7adb1, [0x282A35, 0x282A35, 0x393C45]);
    }
}
function SantosTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 225, 0xa7adb1, [0x282A35, 0x282A35, 0x393C45]);
    }
}
function SaoPauloFun(player) { // !SAO
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sao/titular/red | sao/titular/blue | sao/alternativa/red | sao/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SaoPauloTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xB51212, [0xFF2537, 0xF7F7F7, 0x191820]);
    }
}
function SaoPauloTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xB51212, [0xFF2537, 0xF7F7F7, 0x191820]);
    }
}
function SaoPauloAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0x9F9AA6, [0xFF0928, 0xF7F7F7, 0x241F20]);
    }
}
function SaoPauloAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0x9F9AA6, [0xFF0928, 0xF7F7F7, 0x241F20]);
    }
}
function CorinthiansFun(player) { // !COR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cor/titular/red | cor/titular/blue | cor/alternativa/red | cor/alternativa/blue | cor/tercera/red/2011 | cor/tercera/blue/2011', player.id, 0x6BFFB5, "normal", 0);
}
function CorinthiansTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xF4F4F6]);
    }
}
function CorinthiansTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xF4F4F6]);
    }
}
function CorinthiansAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0xFFFFFF, [0x1F1E20]);
    }
}
function CorinthiansAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0xFFFFFF, [0x1F1E20]);
    }
}
function CorinthiansTercera2011RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffffff, [0x700b0f]);
    }
}
function CorinthiansTercera2011BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffffff, [0x700b0f]);
    }
}
function VascoDaGamaFun(player) { // !VAS
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('vas/titular/red | vas/titular/blue | vas/alternativa/red | vas/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function VascoDaGamaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 29, 0xd42a2a, [0x19181B, 0xE6E6E4, 0x19181B]);
    }
}
function VascoDaGamaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 29, 0xd42a2a, [0x19181B, 0xE6E6E4, 0x19181B]);
    }
}
function VascoDaGamaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 29, 0xd42a2a, [0xFEFEFE, 0x1C1C1C, 0xFEFEFE]);
    }
}
function VascoDaGamaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 29, 0xd42a2a, [0xFEFEFE, 0x1C1C1C, 0xFEFEFE]);
    }
}
function BotafogoFun(player) { // !BOT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bot/titular/red | bot/titular/blue | bot/alternativa/red | bot/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BotafogoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x777B87, [0x1C1F26, 0xFFFFFF, 0x1C1F26]);
    }
}
function BotafogoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x777B87, [0x1C1F26, 0xFFFFFF, 0x1C1F26]);
    }
}
function BotafogoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x161719]);
    }
}
function BotafogoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x161719]);
    }
}
function FluminenseFun(player) { // !FLU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('flu/titular/red | flu/titular/blue | flu/alternativa/red | flu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FluminenseTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0xF9F9F9, [0x326851, 0xA0002B, 0x326851]);
    }
}
function FluminenseTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0xF9F9F9, [0x326851, 0xA0002B, 0x326851]);
    }
}
function MineiroFun(player) { // !CAM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cam/titular/red | cam/titular/blue | cam/alternativa/red | cam/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MineiroTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x75798F, [0xFFFFFF, 0x231F20, 0xFFFFFF]);
    }
}
function MineiroTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x75798F, [0xFFFFFF, 0x231F20, 0xFFFFFF]);
    }
}
function MineiroAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1D1E24, [0xFFFFFF]);
    }
}
function MineiroAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1D1E24, [0xFFFFFF]);
    }
}
function AtlNacionalFun(player) { // !ATN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('atn/titular/red | atn/titular/blue | atn/alternativa/red | atn/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AtlNacionalTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xB2C9BB, [0x178B36, 0xFCFCFC, 0x178B36]);
    }
}
function AtlNacionalTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xB2C9BB, [0x178B36, 0xFCFCFC, 0x178B36]);
    }
}
function AtlNacionalAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -136, 0x008a26, [0xF6F6F8, 0xE6E8EA]);
    }
}
function AtlNacionalAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -136, 0x008a26, [0xF6F6F8, 0xE6E8EA]);
    }
}
    function MillonariosFun(player) { // !MIL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mil/titular/red | mil/titular/blue | mil/alternativa/red | mil/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MillonariosTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x0846AD]);
    }
}
function MillonariosTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x0846AD]);
    }
}
function MillonariosAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x093794, [0xF7F7F7]);
    }
}
function MillonariosAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x093794, [0xF7F7F7]);
    }
}
function AmericaDeCaliFun(player) { // !AME
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ame/titular/red | ame/titular/blue | ame/alternativa/red | ame/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AmericaDeCaliTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0xE81B1D]);
    }
}
function AmericaDeCaliTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0xE81B1D]);
    }
}
function AmericaDeCaliAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xc91212, [0xF8F8F8]);
    }
}
function AmericaDeCaliAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xc91212, [0xF8F8F8]);
    }
}
    function SantaFeFun(player) { // !SFE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sfe/titular/red | sfe/titular/blue | sfe/alternativa/red | sfe/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SantaFeTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xE0E0E0, [0xF6F6F8, 0xEB0505, 0xEB0505]);
    }
}
function SantaFeTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xE0E0E0, [0xF6F6F8, 0xEB0505, 0xEB0505]);
    }
}
function SantaFeAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xEB0505, [0xEB0505, 0xFFFFFF, 0xFFFFFF]);
    }
}
function SantaFeAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xEB0505, [0xEB0505, 0xFFFFFF, 0xFFFFFF]);
    }
}
    function DeportivoCaliFun(player) { // !CAL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cal/titular/red | cal/titular/blue | cal/alternativa/red | cal/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DeportivoCaliTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xBCC4D6, [0xFFFFFF, 0x1D5A48, 0x1D5A48]);
    }
}
function DeportivoCaliTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xBCC4D6, [0xFFFFFF, 0x1D5A48, 0x1D5A48]);
    }
}
function DeportivoCaliAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0x2D6E3A, [0xFFFFFF]);
    }
}
function DeportivoCaliAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0x2D6E3A, [0xFFFFFF]);
    }
}
    function OnceCaldasFun(player) { // !ONC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('onc/titular/red | onc/titular/blue | onc/alternativa/red | onc/alternativa/blue | onc/tercera/red | onc/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OnceCaldasTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x171717, [0xFFFFFF]);
    }
}
function OnceCaldasTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x171717, [0xFFFFFF]);
    }
}
function OnceCaldasAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0xFFFFFF, [0x171717]);
    }
}
function OnceCaldasAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0xFFFFFF, [0x171717]);
    }
}
function OnceCaldasTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0xFFFFFF, [0x1C69BB]);
    }
}
function OnceCaldasTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0xFFFFFF, [0x1C69BB]);
    }
}
function CerroFun(player) { // !CCP
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ccp/titular/red | ccp/titular/blue | ccp/alternativa/red | ccp/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CerroTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xCD2B38, 0x1F2F7C, 0xCD2B38]);
    }
}
function CerroTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xCD2B38, 0x1F2F7C, 0xCD2B38]);
    }
}
function CerroAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x1a3e7a, [0xFFFFFF]);
    }
}
function CerroAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x1a3e7a, [0xFFFFFF]);
    }
}
function OlimpiaFun(player) { // !OLI
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('oli/titular/red | oli/titular/blue | oli/alternativa/red | oli/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OlimpiaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x9290A3, [0xFFFFFF, 0x181818, 0xFFFFFF]);
    }
}
function OlimpiaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x9290A3, [0xFFFFFF, 0x181818, 0xFFFFFF]);
    }
}
function OlimpiaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0xFFFFFF, [0x48424C]);
    }
}
function OlimpiaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0xFFFFFF, [0x48424C]);
    }
}
function GuaraniFun(player) { // !GUA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('gua/titular/red | gua/titular/blue | gua/alternativa/red | gua/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GuaraniTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFDD537, 0x1C1B16, 0xFDD537]);
    }
}
function GuaraniTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFDD537, 0x1C1B16, 0xFDD537]);
    }
}
function GuaraniAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x504B48, 0x201F1B, 0x504B48]);
    }
}
function GuaraniAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x504B48, 0x201F1B, 0x504B48]);
    }
}
function LibertadFun(player) { // !LIB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lib/titular/red | lib/titular/blue | lib/alternativa/red | lib/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LibertadTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x5D636E, [0xFFFFFF, 0x16161E, 0xFFFFFF]);
    }
}
function LibertadTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x5D636E, [0xFFFFFF, 0x16161E, 0xFFFFFF]);
    }
}
function LibertadAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0xFFFFFF, [0x171B1E]);
    }
}
function LibertadAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0xFFFFFF, [0x171B1E]);
    }
}
function SouthamptonFun(player) { // !SOU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sou/titular/red | sou/titular/blue | sou/alternativa/red | sou/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SouthamptonTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x191B1F, [0xFF0028, 0xFFFFFF, 0xFF0028]);
    }
}
function SouthamptonTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x191B1F, [0xFF0028, 0xFFFFFF, 0xFF0028]);
    }
}
function SouthamptonAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe2fb40, [0xFDFE4B, 0x283639, 0x283639]);
    }
}
function SouthamptonAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe2fb40, [0xFDFE4B, 0x283639, 0x283639]);
    }
}
function WatfordFun(player) { // !WAT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('wat/titular/red | wat/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function WatfordTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf53117, [0xFADF09, 0x161616]);
    }
}
function WatfordTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf53117, [0xFADF09, 0x161616]);
    }
}
function WillemIIFun(player) { // !WIL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('wil/titular/red | wil/titular/blue | wil/alternativa/red | wil/alternativa/blue | wil/tercera/red | wil/tercera/blue  ', player.id, 0x6BFFB5, "normal", 0);
}
function WillemIITitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0A0A0A, [0x223263, 0xFFFFFF, 0xF7014C]);
    }
}
function WillemIITitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0A0A0A, [0x223263, 0xFFFFFF, 0xF7014C]);
    }
}
function WillemIIAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xA42F62, 0x6B436F, 0xA42F62]);
    }
}
function WillemIIAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xA42F62, 0x6B436F, 0xA42F62]);
    }
}
function WillemIITerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xc09926, [0xC72C27, 0xFFFFFF, 0x0A2245]);
    }
}
function WillemIITerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xc09926, [0xC72C27, 0xFFFFFF, 0x0A2245]);
    }
}
function AlvaradoFun(player) { // !ALV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('alv/titular/red | alv/titular/blue | alv/alternativa/red | alv/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AlvaradoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 44, 0x091021, [0x1E2F55, 0xFFFFFF, 0x1E2F55]);
    }
}
function AlvaradoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 44, 0x091021, [0x1E2F55, 0xFFFFFF, 0x1E2F55]);
    }
}
function AlvaradoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x091021, [0xFFFFFF, 0x022C77, 0xFFFFFF]);
    }
}
function AlvaradoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x091021, [0xFFFFFF, 0x022C77, 0xFFFFFF]);
    }
}
function AgropecuarioFun(player) { // !AGR
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('agr/titular/red | agr/titular/blue | agr/alternativa/red | agr/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AgropecuarioTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFCFCFC, [0x168C4B, 0xBA2C24, 0x168C4B]);
    }
}
function AgropecuarioTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFCFCFC, [0x168C4B, 0xBA2C24, 0x168C4B]);
    }
}
function AgropecuarioAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x151515, [0x1C5F3A, 0xFFFFFF, 0xBA2C24]);
    }
}
function AgropecuarioAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x151515, [0x1C5F3A, 0xFFFFFF, 0xBA2C24]);
    }
}
function RiverURUFun(player) { // !RIU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('riu/titular/red | riu/titular/blue | riu/alternativa/red | riu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RiverURUTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0x000000, [0xFFFFFF, 0xD20502, 0xFFFFFF]);
    }
}
function RiverURUTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0x000000, [0xFFFFFF, 0xD20502, 0xFFFFFF]);
    }
}
function RiverURUAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFE0002]);
    }
}
function RiverURUAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFE0002]);
    }
}
function GalatasarayFun(player) { // !GS
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('gs/titular/red | gs/titular/blue | gs/alternativa/red | gs/alternativa/blue | gs/tercera/red | gs/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GalatasarayTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xFFB840, 0xBE2736]);
    }
}
function GalatasarayTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xFFB840, 0xBE2736]);
    }
}
function GalatasarayAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x8d1d1d, [0xE3CFB3]);
    }
}
function GalatasarayAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x8d1d1d, [0xE3CFB3]);
    }
}
function GalatasarayTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xab1d28, [0xC9C5C9]);
    }
}
function GalatasarayTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xab1d28, [0xC9C5C9]);
    }
}
function FenerbahceFun(player) { // !FB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fb/titular/red | fb/titular/blue | fb/alternativa/red | fb/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FenerbahceTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xF7F41B, 0x212854, 0xF7F41B]);
    }
}
function FenerbahceTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xF7F41B, 0x212854, 0xF7F41B]);
    }
}
function FenerbahceAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x2f3a67, [0xF4E800]);
    }
}
function FenerbahceAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x2f3a67, [0xF4E800]);
    }
}
function BesiktasFun(player) { // !BJK
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bjk/titular/red | bjk/titular/blue | bjk/alternativa/red | bjk/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BesiktasTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFFFFFF]);
    }
}
function BesiktasTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFFFFFF]);
    }
}
function BesiktasAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFB3333]);
    }
}
function BesiktasAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFB3333]);
    }
}
function AmericaMXFun(player) { // !AMC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('amc/titular/red | amc/titular/blue | amc/alternativa/red | amc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AmericaMXTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x153647, [0xF2EB9A]);
    }
}
function AmericaMXTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x153647, [0xF2EB9A]);
    }
}
function AmericaMXAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xF2F2F2, [0x1A2C38]);
    }
}
function AmericaMXAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xF2F2F2, [0x1A2C38]);
    }
}
function CruzAzulFun(player) { // !CRUZ
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cruz/titular/red | cruz/titular/blue | cruz/alternativa/red | cruz/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CruzAzulTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x263D9A]);
    }
}
function CruzAzulTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x263D9A]);
    }
}
function CruzAzulAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x31357e, [0xFFFFFF]);
    }
}
function CruzAzulAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x31357e, [0xFFFFFF]);
    }
}
function MonterreyFun(player) { // !MTY
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mty/titular/red | mty/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MonterreyTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x7C8AA1, [0xFFFFFF, 0x272B44, 0xFFFFFF]);
    }
}
function MonterreyTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x7C8AA1, [0xFFFFFF, 0x272B44, 0xFFFFFF]);
    }
}
function ChivasFun(player) { // !CHV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('chv/titular/red | chv/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ChivasTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x052e4e, [0xFFFFFF, 0xFE3548, 0xFFFFFF]);
    }
}
function ChivasTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x052e4e, [0xFFFFFF, 0xFE3548, 0xFFFFFF]);
    }
}
function TigresFun(player) { // !TGS
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('chv/titular/red | chv/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function TigresTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x20428c, [0xEEC036, 0xF1B61C]);
    }
}
function TigresTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x20428c, [0xEEC036, 0xF1B61C]);
    }
}
function LigaDeQuitoFun(player) { // !GS
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ldu/titular/red | ldu/titular/blue | ldu/alternativa/red | ldu/alternativa/blue | ldu/tercera/red | ldu/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LigaDeQuitoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 360, 0x060541, [0xFFFFFF]);
    }
}
function LigaDeQuitoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 360, 0x060541, [0xFFFFFF]);
    }
}
function LigaDeQuitoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xd1bf58, [0xD8060E]);
    }
}
function LigaDeQuitoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xd1bf58, [0xD8060E]);
    }
}
function LigaDeQuitoTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf53315, [0x111832]);
    }
}
function LigaDeQuitoTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf53315, [0x111832]);
    }
}
function BarcelonaSCFun(player) { // !BSC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bsc/titular/red | bsc/titular/blue | bsc/alternativa/red | bsc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BarcelonaSCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xc90613, [0xF9D532]);
    }
}
function BarcelonaSCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xc90613, [0xF9D532]);
    }
}
function BarcelonaSCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xfd6600, [0x67020F]);
    }
}
function BarcelonaSCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xfd6600, [0x67020F]);
    }
}
function EmelecFun(player) { // !EME
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('eme/titular/red | eme/titular/blue | eme/alternativa/red | eme/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EmelecTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 148, 0xFFFFFF, [0x025CCC, 0x004390, 0x025CCC]);
    }
}
function EmelecTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 148, 0xFFFFFF, [0x025CCC, 0x004390, 0x025CCC]);
    }
}
function EmelecAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0151c2, [0xFFFFFF]);
    }
}
function EmelecAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0151c2, [0xFFFFFF]);
    }
}
function IndependienteDelValleFun(player) { // !IDV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('idv/titular/red | idv/titular/blue | idv/alternativa/red | idv/alternativa/blue | idv/clasica/red | idv/clasica/blue', player.id, 0x6BFFB5, "normal", 0);
}
function IndependienteDelValleTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x001638, 0x001638, 0x001638]);
    }
}
function IndependienteDelValleTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x001638, 0x001638, 0x001638]);
    }
}
function IndependienteDelValleAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xEC70AC, 0xEC599F, 0xE45195]);
    }
}
function IndependienteDelValleAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xEC70AC, 0xEC599F, 0xE45195]);
    }
}
function IndependienteDelValleClasicaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x012D6B, 0x231F20, 0x012D6B]);
    }
}
function IndependienteDelValleClasicaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x012D6B, 0x231F20, 0x012D6B]);
    }
}

function OlympiqueLyonFun(player) { // !OL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ol/titular/red | ol/titular/blue | ol/alternativa/red | ol/alternativa/blue | ol/alternativa/red/2010 | ol/alternativa/blue/2010', player.id, 0x6BFFB5, "normal", 0);
}
function OlympiqueLyonTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x113a80, [0xFBFDFC]);
    }
}
function OlympiqueLyonTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x113a80, [0xFBFDFC]);
    }
}
function OlympiqueLyonAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xe8e9ea, [0x212C52, 0x1D3C7F, 0x212C52]);
    }
}
function OlympiqueLyonAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xe8e9ea, [0x222C52, 0x1D3C7F, 0x222C52]);
    }
}
function OlympiqueLyonAlternativa2010RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xcab885, [0x6D2449, 0xD33878, 0x6D2449]);
    }
}
function OlympiqueLyonAlternativa2010BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xcab885, [0x6D2449, 0xD33878, 0x6D2449]);
    }
}

function SanTelmoFun(player) { // !STE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('stel/titular/red | stel/titular/blue | stel/alternativa/red | stel/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SanTelmoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffffff, [0x3CADFE, 0x24364C, 0x3CADFE]);
    }
}
function SanTelmoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffffff, [0x3CADFE, 0x24364C, 0x3CADFE]);
    }
}
function SanTelmoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x0D2B43, 0x39A2FE, 0xFFFFFF]);
    }
}
function SanTelmoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x0D2B43, 0x39A2FE, 0xFFFFFF]);
    }
}
function DeportivoMerloFun(player) { // !MER
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mer/titular/red | mer/titular/blue | mer/alternativa/red | mer/alternativa/blue | mer/tercera/red | mer/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DeportivoMerloTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0x666A78, [0xFFFFFF, 0x050C40, 0xFFFFFF]);
    }
}
function DeportivoMerloTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0x666A78, [0xFFFFFF, 0x050C40, 0xFFFFFF]);
    }
}
function DeportivoMerloAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0xFFFFFF, [0x050505, 0x04113D, 0x050505]);
    }
}
function DeportivoMerloAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0xFFFFFF, [0x050505, 0x04113D, 0x050505]);
    }
}
function DeportivoMerloTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x660B0A]);
    }
}
function DeportivoMerloTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x660B0A]);
    }
}
function ArgentinoDeQuilmesFun(player) { // !AdQ
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('adq/titular/red | adq/titular/blue | adq/alternativa/red | adq/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ArgentinoDeQuilmesTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0A0A0A, [0xFFFFFF, 0x76C4F0, 0xFFFFFF]);
    }
}
function ArgentinoDeQuilmesTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0A0A0A, [0xFFFFFF, 0x76C4F0, 0xFFFFFF]);
    }
}
function ArgentinoDeQuilmesAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x777A89, 0x000000, 0x777A89]);
    }
}
function ArgentinoDeQuilmesAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x777A89, 0x000000, 0x777A89]);
    }
}
function ValenciaFun(player) { // !RIV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('val/titular/red | val/titular/blue | val/alternativa/red | val/alternativa/blue | val/tercera/red | val/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ValenciaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x141205, [0xFE7103, 0xF8F7F8, 0xF8F7F8]);
    }
}
function ValenciaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x141205, [0xFE7103, 0xF8F7F8, 0xF8F7F8]);
    }
}
function ValenciaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xff671e, [0xE55C19, 0x161419, 0x161419]);
    }
}
function ValenciaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xff671e, [0xE55C19, 0x161419, 0x161419]);
    }
}
function ValenciaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 123, 0xf0fdfe, [0x0C83D5, 0x21BCF4]);
    }
}
function ValenciaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 123, 0xf0fdfe, [0x0C83D5, 0x21BCF4]);
    }
}
function BetisFun(player) { // !BET
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bet/titular/red | bet/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}

function BetisTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0x2CB764, 0xFFFFFF, 0x2CB764]);
    }
}
function BetisTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0x2CB764, 0xFFFFFF, 0x2CB764]);
    }
}
function CrystalPalaceFun(player) { // !CRY
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cry/titular/red | cry/titular/blue | cry/alternativa/red | cry/alternativa/blue | cry/tercera/red | cry/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CrystalPalaceTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xC11930, 0x01449B, 0xC11930]);
    }
}
function CrystalPalaceTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xC11930, 0x01449B, 0xC11930]);
    }
}
function CrystalPalaceAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x242227, 0x01449B, 0x242227]);
    }
}
function CrystalPalaceAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x242227, 0x01449B, 0x242227]);
    }
}
function CrystalPalaceTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0x0731c3, [0xFFFFFF, 0xED1628, 0xFFFFFF]);
    }
}
function CrystalPalaceTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0x0731c3, [0xFFFFFF, 0xED1628, 0xFFFFFF]);
    }
}
function JuventudAntonianaFun(player) { // !CJA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cja/titular/red | cja/titular/blue | cja/alternativa/red | cja/alternativa/blue | cja/tercera/red | cja/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function JuventudAntonianaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0x8892A6, [0xFFFFFF, 0x304268, 0xFFFFFF]);
    }
}
function JuventudAntonianaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0x8892A6, [0xFFFFFF, 0x304268, 0xFFFFFF]);
    }
}
function JuventudAntonianaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x17286E, 0x304268, 0x17286E]);
    }
}
function JuventudAntonianaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x17286E, 0x304268, 0x17286E]);
    }
}
function JuventudAntonianaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0x0F1014, [0x113653, 0xFFFFFF, 0x3D2813]);
    }
}
function JuventudAntonianaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0x0F1014, [0x113653, 0xFFFFFF, 0x3D2813]);
    }
}
function GimnasiaYTiroFun(player) { // !GyT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('gyt/titular/red | gyt/titular/blue | gyt/alternativa/red | gyt/alternativa/blue | gyt/tercera/red | gyt/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GimnasiaYTiroTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xA8E0F9, 0xFFFFFF, 0xA8E0F9]);
    }
}
function GimnasiaYTiroTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xA8E0F9, 0xFFFFFF, 0xA8E0F9]);
    }
}
function GimnasiaYTiroAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x141657, 0x181965, 0x141657]);
    }
}
function GimnasiaYTiroAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x141657, 0x181965, 0x141657]);
    }
}
function GimnasiaYTiroTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0xFFFFFF, [0x0A0A0A]);
    }
}
function GimnasiaYTiroTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0xFFFFFF, [0x0A0A0A]);
    }
}
function PatronatoFun(player) { // !PAT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('pat/titular/red | pat/titular/blue | pat/alternativa/red | pat/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PatronatoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xF51A21, 0x1A1B1E, 0xF51A21]);
    }
}
function PatronatoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xF51A21, 0x1A1B1E, 0xF51A21]);
    }
}
function PatronatoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xE8171F , 0xFFFFFF , 0xFFFFFF]);
    }
}
function PatronatoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xE8171F , 0xFFFFFF , 0xFFFFFF]);
    }
}
function RayoVallecanoFun(player) { // !RAY
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ray/titular/red | ray/titular/blue | ray/alternativa/red | ray/alternativa/blue | ray/tercera/red | ray/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RayoVallecanoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 28, 0x000000, [0xFFFFFF, 0xFF2E29, 0xFFFFFF]);
    }
}
function RayoVallecanoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 28, 0x000000, [0xFFFFFF, 0xFF2E29, 0xFFFFFF]);
    }
}
function RayoVallecanoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 28, 0xFFFFFF, [0xFE322B , 0x130F10 , 0xFE322B]);
    }
}
function RayoVallecanoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 28, 0xFFFFFF, [0xFE322B , 0x130F10 , 0xFE322B]);
    }
}
function RayoVallecanoTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 28, 0xFFFFFF, [0x130F10 , 0x00A4D2 , 0x130F10]);
    }
}
function RayoVallecanoTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 28, 0xFFFFFF, [0x130F10 , 0x00A4D2 , 0x130F10]);
    }
}
function LevanteFun(player) { // !LEV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lev/titular/red | lev/titular/blue | lev/alternativa/red | lev/alternativa/blue | lev/tercera/red | lev/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LevanteTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x0A1E97, 0xA60727, 0x0A1E97]);
    }
}
function LevanteTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x0A1E97, 0xA60727, 0x0A1E97]);
    }
}
function LevanteAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x191717, [0xFFFFFF , 0x000DD8 , 0xFFFFFF]);
    }
}
function LevanteAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x191717, [0xFFFFFF , 0x000DD8 , 0xFFFFFF]);
    }
}
function LevanteTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x191717, [0xE2E2E2]);
    }
}
function LevanteTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x191717, [0xE2E2E2]);
    }
}
function GetafeFun(player) { // !GET
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('get/titular/red | get/titular/blue | get/alternativa/red | get/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function GetafeTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x086BD3]);
    }
}
function GetafeTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x086BD3]);
    }
}
function GetafeAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xF34C28]);
    }
}
function GetafeAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xF34C28]);
    }
}
function ZenitFun(player) { // !ZEN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('zen/titular/red | zen/titular/blue | zen/alternativa/red | zen/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ZenitTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 146, 0xFFFFFF, [0x1BB1E3, 0x0E8BC1, 0x0F649A]);
    }
}
function ZenitTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 146, 0xFFFFFF, [0x1BB1E3, 0x0E8BC1, 0x0F649A]);
    }
}
function ZenitAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0099c3, [0xFFFFFF]);
    }
}
function ZenitAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0099c3, [0xFFFFFF]);
    }
}
function CSKAMoscuFun(player) { // !CSK
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('csk/titular/red | csk/titular/blue | csk/alternativa/red | csk/alternativa/blue | csk/tercera/red | csk/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CSKAMoscuTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFF2039, 0x016AD7, 0xFF2039]);
    }
}
function CSKAMoscuTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFF2039, 0x016AD7, 0xFF2039]);
    }
}
function CSKAMoscuAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x024fbb, [0xFFFFFF, 0xFF2039, 0xFFFFFF]);
    }
}
function CSKAMoscuAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x024fbb, [0xFFFFFF, 0xFF2039, 0xFFFFFF]);
    }
}
function CSKAMoscuTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 134, 0x082957, [0xFEAC48, 0xFEAC48, 0x01438F]);
    }
}
function CSKAMoscuTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 134, 0x082957, [0xFEAC48, 0xFEAC48, 0x01438F]);
    }
}
function LokomotivFun(player) { // !LOK
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lok/titular/red | lok/titular/blue | lok/alternativa/red | lok/alternativa/blue | lok/tercera/red | lok/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LokomotivTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 236, 0xFFFFFF, [0x025948, 0x025948, 0xC70B24]);
    }
}
function LokomotivTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 236, 0xFFFFFF, [0x025948, 0x025948, 0xC70B24]);
    }
}
function LokomotivAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe71218, [0x026052, 0xFFFFFF, 0xFFFFFF]);
    }
}
function LokomotivAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe71218, [0x026052, 0xFFFFFF, 0xFFFFFF]);
    }
}
function LokomotivTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe0e2e1, [0xCD090A, 0x525157, 0x525157]);
    }
}
function LokomotivTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe0e2e1, [0xCD090A, 0x525157, 0x525157]);
    }
}
function SpartakFun(player) { // !SPM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('spm/titular/red | spm/titular/blue | spm/alternativa/red | spm/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SpartakTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x8A939E, [0xD4001D, 0xFBFEFD, 0xD4001D]);
    }
}
function SpartakTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x8A939E, [0xD4001D, 0xFBFEFD, 0xD4001D]);
    }
}
function SpartakAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x4F0000, [0xFFFFFF, 0xCE1D31, 0xFFFFFF]);
    }
}
function SpartakAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x4F0000, [0xFFFFFF, 0xCE1D31, 0xFFFFFF]);
    }
}
function DynamoMoscowFun(player) { // !DIN
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('din/titular/red | din/titular/blue | din/alternativa/red | din/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DynamoMoscowTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFDFFFE, [0x0066CD]);
    }
}
function DynamoMoscowTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFDFFFE, [0x0066CD]);
    }
}
function DynamoMoscowAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1f71d7, [0xFFFFFF]);
    }
}
function DynamoMoscowAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1f71d7, [0xFFFFFF]);
    }
}
function DynamoKievFun(player) { // !DYK
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dyk/titular/red | dyk/titular/blue | dyk/alternativa/red | dyk/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DynamoKievTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x146dd3, [0xFFFFFF]);
    }
}
function DynamoKievTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x146dd3, [0xFFFFFF]);
    }
}
function DynamoKievAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x0167B2]);
    }
}
function DynamoKievAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x0167B2]);
    }
}
function ShakhtarFun(player) { // !DYK
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sha/titular/red | sha/titular/blue | sha/alternativa/red | sha/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ShakhtarTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 1, 0x000000, [0xF39C4D, 0xEF3B24]);
    }
}
function ShakhtarTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 1, 0x000000, [0xF39C4D, 0xEF3B24]);
    }
}
function ShakhtarAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 1, 0x000000, [0xAC9E9B, 0xDAD0CF, 0xAC9E9B]);
    }
}
function ShakhtarAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 1, 0x000000, [0xAC9E9B, 0xDAD0CF, 0xAC9E9B]);
    }
}

function JaponFun(player) { // !JAP
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('jap/titular/red | jap/titular/blue | jap/alternativa/red | jap/alternativa/blue | jap/titular/red/2018 | jap/titular/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function JaponTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf3373a, [0x45A7ED, 0x044BA7, 0x151C33]);
    }
}
function JaponTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf3373a, [0x45A7ED, 0x044BA7, 0x151C33]);
    }
}
function JaponAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xb52024, [0xF7FDFF]);
    }
}
function JaponAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xb52024, [0xF7FDFF]);
    }
}
function JaponTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0x2C396C]);
    }
}
function JaponTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0x2C396C]);
    }
}
function CoreaDelSurFun(player) { // !CSU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('csu/titular/red | csu/titular/blue | csu/alternativa/red | csu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CoreaDelSurTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0xE4221C]);
    }
}
function CoreaDelSurTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0xE4221C]);
    }
}
function CoreaDelSurAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x040404, [0xF1F2F1]);
    }
}
function CoreaDelSurAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x040404, [0xF1F2F1]);
    }
}
function NuevaZelandaFun(player) { // !NZE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nze/titular/red | nze/titular/blue | nze/alternativa/red | nze/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NuevaZelandaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x191e22, [0xFFFFFF]);
    }
}
function NuevaZelandaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x191e22, [0xFFFFFF]);
    }
}
function NuevaZelandaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xF5F5F5, [0x232323, 0x232323, 0x2E2F33]);
    }
}
function NuevaZelandaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xF5F5F5, [0x232323, 0x232323, 0x2E2F33]);
    }
}
function CoreaDelNorteFun(player) { // !CNO
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cno/titular/red | cno/titular/blue | cno/alternativa/red | cno/alternativa/blue | cno/bandera/red | cno/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CoreaDelNorteTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0xFF0000]);
    }
}
function CoreaDelNorteTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0xFF0000]);
    }
}
function CoreaDelNorteAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xff0000, [0xF5F9FF]);
    }
}
function CoreaDelNorteAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xff0000, [0xF5F9FF]);
    }
}
function CoreaDelNorteBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x024FA2, 0xED1C27, 0x024FA2]);
    }
}
function CoreaDelNorteBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x024FA2, 0xED1C27, 0x024FA2]);
    }
}
function AustriaFun(player) { // !AUT
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('aut/titular/red | aut/titular/blue | aut/alternativa/red | aut/alternativa/blue | aut/bandera/red | aut/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AustriaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0xD80B2A]);
    }
}
function AustriaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0xD80B2A]);
    }
}
function AustriaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0x000000, [0xFFFFFF]);
    }
}
function AustriaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0x000000, [0xFFFFFF]);
    }
}
function AustriaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xED2939, 0xFFFFFF, 0xED2939]);
    }
}
function AustriaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xED2939, 0xFFFFFF, 0xED2939]);
    }
}
function AtlantaUnitedFun(player) { // !ATLU
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('atlu/titular/red | atlu/titular/blue | atlu/alternativa/red | atlu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AtlantaUnitedTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xc2b28e, [0x222021, 0xC70C41, 0x222021]);
    }
}
function AtlantaUnitedTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xc2b28e, [0x222021, 0xC70C41, 0x222021]);
    }
}
function AtlantaUnitedAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xff774d, [0xE1E5E6]);
    }
}
function AtlantaUnitedAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xff774d, [0xE1E5E6]);
    }
}
function LAGalaxyFun(player) { // !LA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('la/titular/red | la/titular/blue | la/alternativa/red | la/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LAGalaxyTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 35, 0xfdc904, [0xFFFFFF, 0x232941, 0xFFFFFF]);
    }
}
function LAGalaxyTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 35, 0xfdc904, [0xFFFFFF, 0x232941, 0xFFFFFF]);
    }
}
function LAGalaxyAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x294A73, 0x1E2037, 0x294A73]);
    }
}
function LAGalaxyAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x294A73, 0x1E2037, 0x294A73]);
    }
}
function TorontoFCFun(player) { // !NZE
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('tofc/titular/red | tofc/titular/blue | tofc/alternativa/red | tofc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function TorontoFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0xE50126]);
    }
}
function TorontoFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0xE50126]);
    }
}
function TorontoFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0x1d1c21, [0xE6EBEF]);
    }
}
function TorontoFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0x1d1c21, [0xE6EBEF]);
    }
}
function NewYorkCityFun(player) { // !NYC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nyc/titular/red | nyc/titular/blue | nyc/alternativa/red | nyc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NewYorkCityTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x102a5b, [0x82BCEC]);
    }
}
function NewYorkCityTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x102a5b, [0x82BCEC]);
    }
}
function NewYorkCityAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0x7cbfea, [0x4D5361]);
    }
}
function NewYorkCityAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0x7cbfea, [0x4D5361]);
    }
}
function LosAngelesFCFun(player) { // !NYC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('lafc/titular/red | lafc/titular/blue | lafc/alternativa/red | lafc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LosAngelesFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xcbad6f, [0x322E2B]);
    }
}
function LosAngelesFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xcbad6f, [0x322E2B]);
    }
}
function LosAngelesFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xaeafb1, [0xEFEEF3]);
    }
}
function LosAngelesFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xaeafb1, [0xEFEEF3]);
    }
}
function SeattleSoundersFun(player) { // !SEA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sea/titular/red | sea/titular/blue | sea/alternativa/red | sea/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SeattleSoundersTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0x98C067]);
    }
}
function SeattleSoundersTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0x98C067]);
    }
}
function SeattleSoundersAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xFFFFFF, [0x2C2A2F, 0x2C2A2F, 0xE18298]);
    }
}
function SeattleSoundersAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xFFFFFF, [0x2C2A2F, 0x2C2A2F, 0xE18298]);
    }
}
function NewYorkRedBullFun(player) { // !NRB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nyrb/titular/red | nyrb/titular/blue | nyrb/alternativa/red | nyrb/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NewYorkRedBullTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x8c0c2d, [0xD0D0D2]);
    }
}
function NewYorkRedBullTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x8c0c2d, [0xD0D0D2]);
    }
}
function NewYorkRedBullAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xFFFFFF, [0xF1273D]);
    }
}
function NewYorkRedBullAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xFFFFFF, [0xF1273D]);
    }
}
function PortlandTimbersFun(player) { // !NRB
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ptim/titular/red | ptim/titular/blue | ptim/alternativa/red | ptim/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PortlandTimbersTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xdfb231, [0x293728, 0x31492F, 0x293728]);
    }
}
function PortlandTimbersTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xdfb231, [0x293728, 0x31492F, 0x293728]);
    }
}
function PortlandTimbersAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0x486551, [0xFFFFFF]);
    }
}
function PortlandTimbersAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0x486551, [0xFFFFFF]);
    }
}
function ColoColoFun(player) { // !CCO
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cco/titular/red | cco/titular/blue | cco/alternativa/red | cco/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ColoColoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x000000, [0xF6F6F7]);
    }
}
function ColoColoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x000000, [0xF6F6F7]);
    }
}
function ColoColoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 240, 0xCFCFCF, [0x212223, 0x212223, 0xFFFFFF]);
    }
}
function ColoColoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 240, 0xCFCFCF, [0x212223, 0x212223, 0xFFFFFF]);
    }
}
function UdeChileFun(player) { // !UDC
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('udc/titular/red | udc/titular/blue | udc/alternativa/red | udc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function UdeChileTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xf4f4f4, [0x1C2445]);
    }
}
function UdeChileTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xf4f4f4, [0x1C2445]);
    }
}
function UdeChileAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xf7f7f7, [0xF33134, 0x611C1C, 0xF33134]);
    }
}
function UdeChileAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xf7f7f7, [0xF33134, 0x611C1C, 0xF33134]);
    }
}
function StrongestFun(player) { // !STG
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('stg/titular/red | stg/titular/blue | stg/alternativa/red | stg/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function StrongestTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFECE2D, 0x1D1B1E, 0xFECE2D]);
    }
}
function StrongestTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFECE2D, 0x1D1B1E, 0xFECE2D]);
    }
}
function StrongestAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x030303, [0xFFFFFF, 0xEDAE00, 0xFFFFFF]);
    }
}
function StrongestAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x030303, [0xFFFFFF, 0xEDAE00, 0xFFFFFF]);
    }
}
function WilstermannFun(player) { // !WTM
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('wtm/titular/red | wtm/titular/blue | wtm/alternativa/red | wtm/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function WilstermannTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0xFFFFFF, [0xED1E3C]);
    }
}
function WilstermannTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0xFFFFFF, [0xED1E3C]);
    }
}
function WilstermannAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x1F3E70, 0x16304C, 0x1F3E70]);
    }
}
function WilstermannAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x1F3E70, 0x16304C, 0x1F3E70]);
    }
}
function BolivarFun(player) { // !BLV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('blv/titular/red | blv/titular/blue | blv/alternativa/red | blv/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BolivarTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 33, 0x21406b, [0x92E2FF]);
    }
}
function BolivarTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 33, 0x21406b, [0x92E2FF]);
    }
}
function BolivarAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xd8ddee, [0x333B45]);
    }
}
function BolivarAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xd8ddee, [0x333B45]);
    }
}
function EvertonFCFun(player) { // !ING
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('eve/titular/red | eve/titular/blue | eve/alternativa/red | eve/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EvertonFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf9f9f9, [0x15428A]);
    }
}
function EvertonFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf9f9f9, [0x15428A]);
    }
}
function EvertonFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0c1448, [0xFA6754]);
    }
}
function EvertonFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0c1448, [0xFA6754]);
    }
}
function ASMonacoFun(player) { // !ING
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('asm/titular/red | asm/titular/blue | asm/alternativa/red | asm/alternativa/blue | asm/tercera/red | asm/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ASMonacoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 61, 0xfeb60a, [0xB8242E, 0xAD232E, 0xFEFEFE]);
    }
}
function ASMonacoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 61, 0xfeb60a, [0xB8242E, 0xAD232E, 0xFEFEFE]);
    }
}
function ASMonacoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xd5a651, [0x1F2023]);
    }
}
function ASMonacoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xd5a651, [0x1F2023]);
    }
}
function ASMonacoTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x255e9a, [0x93D9F5]);
    }
}
function ASMonacoTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x255e9a, [0x93D9F5]);
    }
}
function AtalantaFun(player) { // !OL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ata/titular/red | ata/titular/blue | ata/alternativa/red | ata/alternativa/blue | ata/tercera/red | ata/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AtalantaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x2F71E2, 0x191B27, 0x2F71E2]);
    }
}
function AtalantaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x2F71E2, 0x191B27, 0x2F71E2]);
    }
}
function AtalantaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x357FFF, [0x2F71E2, 0x181818, 0xFFFFFF]);
    }
}
function AtalantaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x357FFF, [0x2F71E2, 0x181818, 0xFFFFFF]);
    }
}
function AtalantaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x874834]);
    }
}
function AtalantaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x874834]);
    }
}
function FCBaselFun(player) { // !OL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bas/titular/red | bas/titular/blue | bas/alternativa/red | bas/alternativa/blue | bas/tercera/red | bas/tercera/blue | bas/clasica/red | bas/clasica/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FCBaselTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xBC051F, 0xBC051F, 0x1B3F86]);
    }
}
function FCBaselTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xBC051F, 0xBC051F, 0x1B3F86]);
    }
}
function FCBaselAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x1a1a1a, [0xE1E1E1]);
    }
}
function FCBaselAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x1a1a1a, [0xE1E1E1]);
    }
}
function FCBaselTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x222222]);
    }
}
function FCBaselTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x222222]);
    }
}
function FCBaselClasicaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xffe500, [0xE40327, 0x0E3B85]);
    }
}
function FCBaselClasicaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0, 0xffe500, [0xE40327, 0x0E3B85]);
    }
}
function UCatolicaFun(player) { // !UCA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('uca/titular/red | uca/titular/blue | uca/alternativa/red | uca/alternativa/blue | uca/tercera/red | uca/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function UCatolicaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFE0000, [0xFFFFFF, 0x2148A0, 0xFFFFFF]);
    }
}
function UCatolicaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFE0000, [0xFFFFFF, 0x2148A0, 0xFFFFFF]);
    }
}
function UCatolicaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0xD22F1E]);
    }
}
function UCatolicaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0xD22F1E]);
    }
}
function UCatolicaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xff0000, [0x2148A0, 0xFFFFFF, 0x2148A0]);
    }
}
function UCatolicaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xff0000, [0x2148A0, 0xFFFFFF, 0x2148A0]);
    }
}
function CobreloaFun(player) { // !Cob
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cob/titular/red | cob/titular/blue | cob/alternativa/red | cob/alternativa/blue | cob/tercera/red | cob/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CobreloaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 30, 0xffffff, [0xFF4B15, 0xCC3900]);
    }
}
function CobreloaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 30, 0xffffff, [0xFF4B15, 0xCC3900]);
    }
}
function CobreloaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 30, 0x000000, [0xFFFFFF, 0xCFCFCF]);
    }
}
function CobreloaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 30, 0x000000, [0xFFFFFF, 0xCFCFCF]);
    }
}
function CobreloaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 30, 0xffffff, [0x45485B, 0x1A1A1A]);
    }
}
function CobreloaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 30, 0xffffff, [0x45485B, 0x1A1A1A]);
    }
}
function PalestinoFun(player) { // !Cob
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cdp/titular/red | cdp/titular/blue | cdp/alternativa/red | cdp/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PalestinoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x000000, [0xFFFFFF, 0x047B4E, 0xE30000]);
    }
}
function PalestinoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x000000, [0xFFFFFF, 0x047B4E, 0xE30000]);
    }
}
function PalestinoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFAFAFA, [0xE30000, 0x000503, 0x047B4E]);
    }
}
function PalestinoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFAFAFA, [0xE30000, 0x000503, 0x047B4E]);
    }
}
function MelgarFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mel/titular/red | mel/titular/blue | mel/alternativa/red | mel/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MelgarTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xEC1B30, 0x2A2A2A]);
    }
}
function MelgarTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xEC1B30, 0x2A2A2A]);
    }
}
function MelgarAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x2a2a2a, [0xECEFF4, 0xEC1B31, 0xECEFF4]);
    }
}
function MelgarAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x2a2a2a, [0xECEFF4, 0xEC1B31, 0xECEFF4]);
    }
}
function UniversitarioFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('unv/titular/red | unv/titular/blue | unv/alternativa/red | unv/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function UniversitarioTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x812124, [0xE1DCC5]);
    }
}
function UniversitarioTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x812124, [0xE1DCC5]);
    }
}
function UniversitarioAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x902C38]);
    }
}
function UniversitarioAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x902C38]);
    }
}
function AlianzaLimaFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ali/titular/red | ali/titular/blue | ali/alternativa/red | ali/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AlianzaLimaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0e2c4c, [0x091C35, 0xFFFFFF, 0x091C35]);
    }
}
function AlianzaLimaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0e2c4c, [0x091C35, 0xFFFFFF, 0x091C35]);
    }
}
function AlianzaLimaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0xf4f4f4, [0x1A2639, 0x253143, 0x253143]);
    }
}
function AlianzaLimaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0xf4f4f4, [0x1A2639, 0x253143, 0x253143]);
    }
}
function SportingCristalFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cri/titular/red | cri/titular/blue | cri/alternativa/red | cri/alternativa/blue | cri/tercera/red | cri/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SportingCristalTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x032543, [0x61C5ED]);
    }
}
function SportingCristalTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x032543, [0x61C5ED]);
    }
}
function SportingCristalAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0xFFFFFF, [0x212C4B, 0x334A7F]);
    }
}
function SportingCristalAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0xFFFFFF, [0x212C4B, 0x334A7F]);
    }
}
function SportingCristalTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 41, 0x1C1C1C, [0xFFFFFF, 0x3CBEEF, 0xFFFFFF]);
    }
}
function SportingCristalTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 41, 0x1C1C1C, [0xFFFFFF, 0x3CBEEF, 0xFFFFFF]);
    }
}
function RusiaFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rus/titular/red | rus/titular/blue | rus/alternativa/red | rus/alternativa/blue | rus/bandera/red | rus/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RusiaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xf7f7f7, [0xF01F21]);
    }
}
function RusiaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xf7f7f7, [0xF01F21]);
    }
}
function RusiaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0x114577, [0xEFEFF0]);
    }
}
function RusiaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0x114577, [0xEFEFF0]);
    }
}
function RusiaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xCCCCCC, [0xFFFFFF, 0x0039A6, 0xD52B1E]);
    }
}
function RusiaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xCCCCCC, [0xFFFFFF, 0x0039A6, 0xD52B1E]);
    }
}
function EstadosUnidosFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('usa/titular/red | usa/titular/blue | usa/alternativa/red | usa/alternativa/blue | usa/tercera/red | usa/tercera/blue | usa/clasica/red | usa/clasica/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EstadosUnidosTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 22, 0x0087DE, [0xFFFFFF, 0x105395, 0xD9272D]);
    }
}
function EstadosUnidosTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 22, 0x0087DE, [0xFFFFFF, 0x105395, 0xD9272D]);
    }
}
function EstadosUnidosAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x005092, [0xD8062B, 0xB4011E, 0xD8062B]);
    }
}
function EstadosUnidosAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x005092, [0xD8062B, 0xB4011E, 0xD8062B]);
    }
}
function EstadosUnidosTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0xfbfbfa, [0x013354]);
    }
}
function EstadosUnidosTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0xfbfbfa, [0x013354]);
    }
}
function EstadosUnidosClasicaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0x101085, [0xFF2E2E, 0xFFFFFF, 0x1C59FF]);
    }
}
function EstadosUnidosClasicaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0x101085, [0xFF2E2E, 0xFFFFFF, 0x1C59FF]);
    }
}
function AlmagroFun(player) { // !IND
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('alm/titular/red | alm/titular/blue | alm/alternativa/red | alm/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AlmagroTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x0137D5, 0x18181A, 0x0137D5]);
    }
}
function AlmagroTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x0137D5, 0x18181A, 0x0137D5]);
    }
}
function AlmagroAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1783FF, [0x003CDB, 0x1F1F21, 0xFDFDFD]);
    }
}
function AlmagroAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1783FF, [0x003CDB, 0x1F1F21, 0xFDFDFD]);
    }
}
function NigeriaFun(player) { // !nga
    room.sendAnnouncement('Nigeria | 🇳🇬', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nga/titular/red | nga/titular/blue | nga/alternativa/red |nga/alternativa/blue | nga/titular/red/2018 | nga/titular/blue/2018 | nga/alternativa/red/2018 |nga/alternativa/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function NigeriaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x101010, [0x3A9164, 0xFFFFFF, 0x3A9164]);
    }
}
function NigeriaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x101010, [0x3A9164, 0xFFFFFF, 0x3A9164]);
    }
}
function NigeriaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0xFAFAFA, [0x1D2327, 0x1D2124]);
    }
}
function NigeriaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0xFAFAFA, [0x1D2327, 0x1D2124]);
    }
}
function NigeriaTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1D2321, [0xFFFFFF, 0x75FF39, 0x75FF39]);
    }
}
function NigeriaTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1D2321, [0xFFFFFF, 0x75FF39, 0x75FF39]);
    }
}
function NigeriaAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x47ff20, [0x1E322C]);
    }
}
function NigeriaAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x47ff20, [0x1E322C]);
    }
}
function EcuadorFun(player) { // !ecu
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ecu/titular/red | ecu/titular/blue | ecu/alternativa/red |ecu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EcuadorTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x182332, [0xF9DD2F]);
    }
}
function EcuadorTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x182332, [0xF9DD2F]);
    }
}
function EcuadorAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x183D5E]);
    }
}
function EcuadorAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x183D5E]);
    }
}
function CADUFun(player) { // !CADU
    room.sendAnnouncement('Club Atlético Defensores Unidos 🇦🇷', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cadu/titular/red | cadu/titular/blue | cadu/alternativa/red | cadu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CADUTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x0F0F0F, [0x0A94DC, 0x2CCAF8, 0x0A94DC]);
    }
}
function CADUTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x0F0F0F, [0x0A94DC, 0x2CCAF8, 0x0A94DC]);
    }
}
function CADUAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 135, 0x007EFC, [0xFFFFFF, 0x47C4FB, 0xFFFFFF]);
    }
}
function CADUAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 135, 0x007EFC, [0xFFFFFF, 0x47C4FB, 0xFFFFFF]);
    }
}
function URSSFun(player) { // !urss
    room.sendAnnouncement('Unión Soviética - URSS - ☭', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('urss/titular/red | urss/titular/blue | urss/alternativa/red |urss/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function URSSTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffffff, [0xB00819]);
    }
}
function URSSTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffffff, [0xB00819]);
    }
}
function URSSAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xab0818, [0xFAFAFA]);
    }
}
function URSSAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xab0818, [0xFAFAFA]);
    }
}
function YugoslaviaFun(player) { // !yug
    room.sendAnnouncement('Yugoslavia 🇷🇸', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('yug/titular/red/1990 | yug/titular/blue/1990 | yug/alternativa/red/1990 |yug/alternativa/blue/1990 | yug/titular/red/1984 | yug/titular/blue/1984 | yug/alternativa/red/1984 |yug/alternativa/blue/1984 | yug/bandera/red | yug/bandera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function YugoslaviaTitular1990RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 153, 0xFFFFFF, [0x0F4BA1, 0x0F4BA1, 0xDE0000]);
    }
}
function YugoslaviaTitular1990BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 153, 0xFFFFFF, [0x0F4BA1, 0x0F4BA1, 0xDE0000]);
    }
}
function YugoslaviaAlternativa1990RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 153, 0x0d4bb2, [0xFFFFFF, 0xFFFFFF, 0xDD251D]);
    }
}
function YugoslaviaAlternativa1990BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 153, 0x0d4bb2, [0xFFFFFF, 0xFFFFFF, 0xDD251D]);
    }
}
function YugoslaviaTitular1984RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x18529D]);
    }
}
function YugoslaviaTitular1984BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x18529D]);
    }
}
function YugoslaviaAlternativa1984RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x00388e, [0xFFFFFF]);
    }
}
function YugoslaviaAlternativa1984BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x00388e, [0xFFFFFF]);
    }
}
function YugoslaviaBanderaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xde0000, [0x003893, 0xFFFFFF, 0xDE0000]);
    }
}
function YugoslaviaBanderaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xde0000, [0x003893, 0xFFFFFF, 0xDE0000]);
    }
}
function AlumniFun(player) { // !alu
    room.sendAnnouncement('Alumni 🇦🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('alu/titular/red | alu/titular/blue | alu/alternativa/red | alu/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AlumniTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFF0000, 0xFFFFFF, 0xFF0000]);
    }
}
function AlumniTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFF0000, 0xFFFFFF, 0xFF0000]);
    }
}
function AlumniAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xE30F10, 0xFFFFFF, 0xE30F10]);
    }
}
function AlumniAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xE30F10, 0xFFFFFF, 0xE30F10]);
    }
}
function VillaSanCarlosFun(player) { // !vsc
    room.sendAnnouncement('Villa San Carlos 🇦🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('vsc/titular/red | vsc/titular/blue | vsc/alternativa/red | vsc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function VillaSanCarlosTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 42, 0x131b2a, [0x48B8E5, 0xFFFFFF, 0x48B8E5]);
    }
}
function VillaSanCarlosTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 42, 0x131b2a, [0x48B8E5, 0xFFFFFF, 0x48B8E5]);
    }
}
function VillaSanCarlosAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 56, 0xF0F0F0, [0x01C8FF, 0x292C34, 0x292C34]);
    }
}
function VillaSanCarlosAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 56, 0xF0F0F0, [0x01C8FF, 0x292C34, 0x292C34]);
    }
}
function LomasAthleticFun(player) { // !loa
    room.sendAnnouncement('Lomas Athletic 🇦🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('loa/titular/red | loa/titular/blue | loa/escudo/red | loa/escudo/blue', player.id, 0x6BFFB5, "normal", 0);
}
function LomasAthleticTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xf5dc00, [0x336633, 0xD90000, 0x336633]);
    }
}
function LomasAthleticTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xf5dc00, [0x336633, 0xD90000, 0x336633]);
    }
}
function LomasAthleticEscudoRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xfcc916, [0x015440, 0xDD191A, 0x015440]);
    }
}
function LomasAthleticEscudoBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xfcc916, [0x015440, 0xDD191A, 0x015440]);
    }
}
function ChecoslovaquiaFun(player) { // !cze
    room.sendAnnouncement('Checoslovaquia 🇨🇿 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cze/titular/red | cze/titular/blue | cze/alternativa/red | cze/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ChecoslovaquiaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffffff, [0xBE2620]);
    }
}
function ChecoslovaquiaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffffff, [0xBE2620]);
    }
}
function ChecoslovaquiaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xac1013, [0xFFFFFF]);
    }
}
function ChecoslovaquiaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xac1013, [0xFFFFFF]);
    }
}
function NantesFun(player) { // !fcn
    room.sendAnnouncement('FC Nantes 🇫🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('fcn/titular/red | fcn/titular/blue | fcn/alternativa/red | fcn/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NantesTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x007037, [0xFEE030, 0x1AAD67, 0xFEE030]);
    }
}
function NantesTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x007037, [0xFEE030, 0x1AAD67, 0xFEE030]);
    }
}
function NantesAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xffff00, [0x228B67, 0x167554, 0x167554]);
    }
}
function NantesAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xffff00, [0x228B67, 0x167554, 0x167554]);
    }
}
function SaintEtienneFun(player) { // !ste
    room.sendAnnouncement('Saint Etienne 🇫🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ste/titular/red | ste/titular/blue | ste/alternativa/red | ste/alternativa/blue | ste/tercera/red | ste/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SaintEtienneTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffffff, [0x0F6B46, 0x1B9365, 0x1B9365]);
    }
}
function SaintEtienneTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffffff, [0x0F6B46, 0x1B9365, 0x1B9365]);
    }
}
function SaintEtienneAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x4c6e5d, [0x147858, 0xFFFFFF, 0xFFFFFF]);
    }
}
function SaintEtienneAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x4c6e5d, [0x147858, 0xFFFFFF, 0xFFFFFF]);
    }
}
function SaintEtienneTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x727085, 0x8E909D, 0x8E909D]);
    }
}
function SaintEtienneTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x727085, 0x8E909D, 0x8E909D]);
    }
}
function RennesFun(player) { // !ren
    room.sendAnnouncement('Rennes 🇫🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ren/titular/red | ren/titular/blue | ren/alternativa/red | ren/alternativa/blue | ren/tercera/red | ren/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RennesTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xF0F0F0, [0x000000, 0xDC0D15]);
    }
}
function RennesTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xF0F0F0, [0x000000, 0xDC0D15]);
    }
}
function RennesAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x276DD6, 0x1B50B5, 0x276DD6]);
    }
}
function RennesAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x276DD6, 0x1B50B5, 0x276DD6]);
    }
}
function RennesTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFFDF00]);
    }
}
function RennesTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFFDF00]);
    }
}
function FCNyvaVinnytsiaFun(player) { // !nyv
    room.sendAnnouncement('FC Nyva Vinnytsia (Нива Винница) | 🇺🇦 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nyv/titular/red | nyv/titular/blue | nyv/alternativa/red | nyv/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FCNyvaVinnytsiaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x42A161]);
    }
}
function FCNyvaVinnytsiaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x42A161]);
    }
}
function FCNyvaVinnytsiaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x439b73, [0x3AA070, 0xFFFFFF, 0xFFFFFF]);
    }
}
function FCNyvaVinnytsiaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x439b73, [0x3AA070, 0xFFFFFF, 0xFFFFFF]);
    }
}
function OrlandoCityFun(player) { // !ORL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('orl/titular/red | orl/titular/blue | orl/alternativa/red | orl/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OrlandoCityTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 70, 0xFFFFFF, [0x3F0B74, 0x360963, 0x360963]);
    }
}
function OrlandoCityTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 70, 0xFFFFFF, [0x3F0B74, 0x360963, 0x360963]);
    }
}
function OrlandoCityAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x3f0b74, [0xFFFFFF]);
    }
}
function OrlandoCityAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x3f0b74, [0xFFFFFF]);
    }
}
function EstudiantesBsAsFun(player) { // !EBA
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('eba/titular/red | eba/titular/blue | eba/alternativa/red | eba/alternativa/blue ', player.id, 0x6BFFB5, "normal", 0);
}
function EstudiantesBsAsTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x8C8C8C, [0xFFFFFF, 0x000000, 0xFFFFFF]);
    }
}
function EstudiantesBsAsTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x8C8C8C, [0xFFFFFF, 0x000000, 0xFFFFFF]);
    }
}
function EstudiantesBsAsAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 115, 0x050505, [0xEAE4E6, 0xFFFFFF, 0xA89D9B]);
    }
}
function EstudiantesBsAsAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 115, 0x050505, [0xEAE4E6, 0xFFFFFF, 0xA89D9B]);
    }
}
function FerencvarosiTCFun(player) { // !ftc
    room.sendAnnouncement('Ferencvarosi TC', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ftc/titular/red | ftc/titular/blue | ftc/alternativa/red | ftc/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function FerencvarosiTCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x0F0F0F, [0x00B66C, 0xFFFFFF, 0x00B66C]);
    }
}
function FerencvarosiTCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x0F0F0F, [0x00B66C, 0xFFFFFF, 0x00B66C]);
    }
}
function FerencvarosiTCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe6c673, [0xFFFFFF]);
    }
}
function FerencvarosiTCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe6c673, [0xFFFFFF]);
    }
}
function MOLVidiFCFun(player) { // !vid
    room.sendAnnouncement('MOL Vidi FC:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('vid/titular/red | vid/titular/blue | vid/alternativa/red | vid/alternativa/blue | vid/tercera/red | vid/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MOLVidiFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0xD31C2A, 0x3E486E]);
    }
}
function MOLVidiFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0xD31C2A, 0x3E486E]);
    }
}
function MOLVidiFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x1d439b, [0xBFC5E1, 0xFFFFFF, 0xFFFFFF]);
    }
}
function MOLVidiFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x1d439b, [0xBFC5E1, 0xFFFFFF, 0xFFFFFF]);
    }
}
function MOLVidiFCTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x26499f, [0x7D97CA, 0x9EBDDE, 0x9EBDDE]);
    }
}
function MOLVidiFCTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x26499f, [0x7D97CA, 0x9EBDDE, 0x9EBDDE]);
    }
}
function UjpestFCFun(player) { // !ujp
    room.sendAnnouncement('Újpest FC:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ujp/titular/red | ujp/titular/blue | ujp/alternativa/red | ujp/alternativa/blue | ujp/tercera/red | ujp/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function UjpestFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xd5b97d, [0xFFFFFF, 0x4B449B, 0xFFFFFF]);
    }
}
function UjpestFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xd5b97d, [0xFFFFFF, 0x4B449B, 0xFFFFFF]);
    }
}
function UjpestFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x4b449b, [0xFFFFFF, 0xF0F0F0, 0xFFFFFF]);
    }
}
function UjpestFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x4b449b, [0xFFFFFF, 0xF0F0F0, 0xFFFFFF]);
    }
}
function UjpestFCTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x484197, 0x544CA0, 0x484197]);
    }
}
function UjpestFCTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x484197, 0x544CA0, 0x484197]);
    }
}
function DVSCDebrecenFun(player) { // !dvs
    room.sendAnnouncement('DVSC Debreceni:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dvs/titular/red | dvs/titular/blue | dvs/alternativa/red | dvs/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DVSCDebrecenTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xE31F2B, 0xB82139, 0xE31F2B]);
    }
}
function DVSCDebrecenTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xE31F2B, 0xB82139, 0xE31F2B]);
    }
}
function DVSCDebrecenAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe31f2b, [0xDBDCDD, 0xFFFFFF, 0xDBDCDD]);
    }
}
function DVSCDebrecenAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe31f2b, [0xDBDCDD, 0xFFFFFF, 0xDBDCDD]);
    }
}
function HonvedFCFun(player) { // !HON
    room.sendAnnouncement('Honved FC:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('hon/titular/red | hon/titular/blue | hon/alternativa/red | hon/alternativa/blue | hon/tercera/red | hon/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HonvedFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xE31F2B, 0xFFFFFF, 0xE31F2B]);
    }
}
function HonvedFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xE31F2B, 0xFFFFFF, 0xE31F2B]);
    }
}
function HonvedFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFCFCFC, [0xE31F2B, 0x333333, 0x333333]);
    }
}
function HonvedFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFCFCFC, [0xE31F2B, 0x333333, 0x333333]);
    }
}
function HonvedFCTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x2E2E2E, [0xF9D100, 0xFEE14E, 0xFFF685]);
    }
}
function HonvedFCTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x2E2E2E, [0xF9D100, 0xFEE14E, 0xFFF685]);
    }
}
function PuskasAkademiaFCFun(player) { // !pafc
    room.sendAnnouncement('Puskas Akademia FC:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('pafc/titular/red | pafc/titular/blue | pafc/alternativa/red | pafc/alternativa/blue | pafc/tercera/red | pafc/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PuskasAkademiaFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 63, 0xFFFFFF, [0xE0BE6E, 0x323A5D, 0x323A5D]);
    }
}
function PuskasAkademiaFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 63, 0xFFFFFF, [0xE0BE6E, 0x323A5D, 0x323A5D]);
    }
}
function PuskasAkademiaFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x20253B, [0x323A5D, 0xFFFFFF, 0xFFFFFF]);
    }
}
function PuskasAkademiaFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x20253B, [0x323A5D, 0xFFFFFF, 0xFFFFFF]);
    }
}
function PuskasAkademiaFCTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 63, 0x2B324F, [0x323A5D, 0xFDD450, 0xFDD450]);
    }
}
function PuskasAkademiaFCTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 63, 0x2B324F, [0x323A5D, 0xFDD450, 0xFDD450]);
    }
}
function MezokovesdiSEFun(player) { // !mez
    room.sendAnnouncement('Mezokovesdi SE:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mez/titular/red | mez/titular/blue | mez/alternativa/red | mez/alternativa/blue | mez/tercera/red | mez/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MezokovesdiSETitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x01244A, [0xFFDA3D, 0x034EA2, 0xFFDA3D]);
    }
}
function MezokovesdiSETitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x01244A, [0xFFDA3D, 0x034EA2, 0xFFDA3D]);
    }
}
function MezokovesdiSEAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x212121]);
    }
}
function MezokovesdiSEAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x212121]);
    }
}
function MezokovesdiSETerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 63, 0x242424, [0xFFFFFF]);
    }
}
function MezokovesdiSETerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 63, 0x242424, [0xFFFFFF]);
    }
}
function KisvardaFCFun(player) { // !kisv
    room.sendAnnouncement('Kisvárda FC:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('kisv/titular/red | kisv/titular/blue | kisv/alternativa/red | kisv/alternativa/blue | kisv/tercera/red | kisv/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function KisvardaFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 63, 0xe31f2b, [0xFFFFFF]);
    }
}
function KisvardaFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 63, 0xe31f2b, [0xFFFFFF]);
    }
}
function KisvardaFCAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xE31F2B]);
    }
}
function KisvardaFCAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xE31F2B]);
    }
}
function KisvardaFCTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x424041, 0x3A393A]);
    }
}
function KisvardaFCTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x424041, 0x3A393A]);
    }
}
function DiosgyoriVTKFun(player) { // !dio
    room.sendAnnouncement('Diósgyőri VTK:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dio/titular/red | dio/titular/blue | dio/alternativa/red | dio/alternativa/blue | dio/tercera/red | dio/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DiosgyoriVTKTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 63, 0xffffff, [0xE31F2B]);
    }
}
function DiosgyoriVTKTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 63, 0xffffff, [0xE31F2B]);
    }
}
function DiosgyoriVTKAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe31f2b, [0xFFFFFF]);
    }
}
function DiosgyoriVTKAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe31f2b, [0xFFFFFF]);
    }
}
function DiosgyoriVTKTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x2E2E2E, [0xE31F2B, 0xFFFFFF, 0xE31F2B]);
    }
}
function DiosgyoriVTKTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x2E2E2E, [0xE31F2B, 0xFFFFFF, 0xE31F2B]);
    }
}
function PaksiSEFun(player) { // !paks
    room.sendAnnouncement('Paksi SE:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('paks/titular/red | paks/titular/blue | paks/alternativa/red | paks/alternativa/blue | paks/tercera/red | paks/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function PaksiSETitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 63, 0xffffff, [0x0C8D56]);
    }
}
function PaksiSETitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 63, 0xffffff, [0x0C8D56]);
    }
}
function PaksiSEAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x212121, [0xEFF0F0, 0xFFFFFF, 0xEFF0F0]);
    }
}
function PaksiSEAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x212121, [0xEFF0F0, 0xFFFFFF, 0xEFF0F0]);
    }
}
function PaksiSETerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 45, 0x313540, [0x565865, 0xC2BCC0, 0xC2BCC0]);
    }
}
function PaksiSETerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 45, 0x313540, [0x565865, 0xC2BCC0, 0xC2BCC0]);
    }
}
function AlmiranteBrownFun(player) { // !abrown
    room.sendAnnouncement('Almirante Brown:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('abrown/titular/red | abrown/titular/blue | abrown/alternativa/red | abrown/alternativa/blue | abrown/tercera/red | abrown/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AlmiranteBrownTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffffff, [0xEBC80E, 0x000000, 0xEBC80E]);
    }
}
function AlmiranteBrownTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffffff, [0xEBC80E, 0x000000, 0xEBC80E]);
    }
}
function AlmiranteBrownAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFF34F, [0x131313, 0x131313, 0xEBC80E]);
    }
}
function AlmiranteBrownAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFF34F, [0x131313, 0x131313, 0xEBC80E]);
    }
}
function AlmiranteBrownTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xE3C10E, [0x1D1D1D, 0xFFFFFF, 0xEBC60D]);
    }
}
function AlmiranteBrownTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xE3C10E, [0x1D1D1D, 0xFFFFFF, 0xEBC60D]);
    }
}
function CentroDeportivoRocaFun(player) { // !cdybgr
    room.sendAnnouncement('Centro Deportivo Roca (C.D.Y.B.G.R):', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cdybgr/titular/red | cdybgr/titular/blue | cdybgr/alternativa/red | cdybgr/alternativa/blue | cdybgr/tercera/red | cdybgr/tercera/blue | cdybgr/cuarta/red | cdybgr/cuarta/blue | cdybgr/quinta/red | cdybgr/quinta/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CentroDeportivoRocaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xF7F3FF, [0xDC1E37, 0x1C1A26]);
    }
}
function CentroDeportivoRocaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xF7F3FF, [0xDC1E37, 0x1C1A26]);
    }
}
function CentroDeportivoRocaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x000000, [0xFC224A, 0xFFFFFF, 0xC51641]);
    }
}
function CentroDeportivoRocaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x000000, [0xFC224A, 0xFFFFFF, 0xC51641]);
    }
}
function CentroDeportivoRocaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x757575, [0x1E1916, 0xFFFFFF, 0xDE231C]);
    }
}
function CentroDeportivoRocaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x757575, [0x1E1916, 0xFFFFFF, 0xDE231C]);
    }
}
function CentroDeportivoRocaCuartaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x817F85, [0x1E1916, 0xFFFFFF, 0xDC241C]);
    }
}
function CentroDeportivoRocaCuartaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x817F85, [0x1E1916, 0xFFFFFF, 0xDC241C]);
    }
}
function CentroDeportivoRocaQuintaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xD6BD8B, [0x1E1916, 0xFFFFFF, 0xDC1E37]);
    }
}
function CentroDeportivoRocaQuintaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xD6BD8B, [0x1E1916, 0xFFFFFF, 0xDC1E37]);
    }
}
function BochofiloBochazoFun(player) { // !bchz
    room.sendAnnouncement('Bochófilo Bochazo:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('bochz/titular/red | bochz/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function BochofiloBochazoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 40, 0x33376B, [0xBE2833, 0xFFFFFF, 0x2348A0]);
    }
}
function BochofiloBochazoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 40, 0x33376B, [0xBE2833, 0xFFFFFF, 0x2348A0]);
    }
}
function DinamoZagrebFun(player) { // !dzg
    room.sendAnnouncement('GNK Dinamo Zagreb | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dzg/titular/red | dzg/titular/blue | dzg/alternativa/red | dzg/alternativa/blue |  | dzg/tercera/red | dzg/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DinamoZagrebTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x0456C6]);
    }
}
function DinamoZagrebTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x0456C6]);
    }
}
function DinamoZagrebAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0x1b1f10, [0xDDFF51, 0xE1FD5B]);
    }
}
function DinamoZagrebAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0x1b1f10, [0xDDFF51, 0xE1FD5B]);
    }
}
function DinamoZagrebTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 120, 0xe5e811, [0x213C69, 0x1555AC]);
    }
}
function DinamoZagrebTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 120, 0xe5e811, [0x213C69, 0x1555AC]);
    }
}
function HajdukSplitFun(player) { // !haj
    room.sendAnnouncement('HNK Hajduk Split | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('haj/titular/red | haj/titular/blue | haj/alternativa/red | haj/alternativa/blue |  | haj/tercera/red | haj/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HajdukSplitTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1c43c9, [0xFFFFFF]);
    }
}
function HajdukSplitTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1c43c9, [0xFFFFFF]);
    }
}
function HajdukSplitAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x0054AE, 0xEC1F24, 0x0054AE]);
    }
}
function HajdukSplitAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x0054AE, 0xEC1F24, 0x0054AE]);
    }
}
function HajdukSplitTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 120, 0x271b4b, [0xD1C5D9]);
    }
}
function HajdukSplitTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 120, 0x271b4b, [0xD1C5D9]);
    }
}
function HNKRijekaFun(player) { // !rjk
    room.sendAnnouncement('HNK Rijeka | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rjk/titular/red | rjk/titular/blue | rjk/alternativa/red | rjk/alternativa/blue |  | rjk/tercera/red | rjk/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HNKRijekaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1fa6d5, [0xFFFFFF, 0x80CFED, 0xFFFFFF]);
    }
}
function HNKRijekaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1fa6d5, [0xFFFFFF, 0x80CFED, 0xFFFFFF]);
    }
}
function HNKRijekaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x25242A, 0x91BCEF, 0x25242A]);
    }
}
function HNKRijekaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x25242A, 0x91BCEF, 0x25242A]);
    }
}
function HNKRijekaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 120, 0xd2ab67, [0x982834]);
    }
}
function HNKRijekaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 120, 0xd2ab67, [0x982834]);
    }
}
function NKOsijekFun(player) { // !osi
    room.sendAnnouncement('NK Osijek | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('osi/titular/red | osi/titular/blue | osi/alternativa/red | osi/alternativa/blue |  | osi/tercera/red | osi/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NKOsijekTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x0C3A8A, [0x0054A6, 0xFFFFFF, 0x0054A6]);
    }
}
function NKOsijekTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x0C3A8A, [0x0054A6, 0xFFFFFF, 0x0054A6]);
    }
}
function NKOsijekAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 70, 0x0054a6, [0xF5F6F6, 0xFFFFFF, 0xFFFFFF]);
    }
}
function NKOsijekAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 70, 0x0054a6, [0xF5F6F6, 0xFFFFFF, 0xFFFFFF]);
    }
}
function NKOsijekTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xB81F29, 0xB81F29, 0xE31F2B]);
    }
}
function NKOsijekTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xB81F29, 0xB81F29, 0xE31F2B]);
    }
}
function NKLokomotivFun(player) { // !nklok
    room.sendAnnouncement('NK Lokomotiva Zagreb | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('nklok/titular/red | nklok/titular/blue | nklok/alternativa/red | nklok/alternativa/blue |  | nklok/tercera/red | nklok/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NKLokomotivTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xdcb452, [0x789BD1, 0x1E45A0, 0xE5E5ED]);
    }
}
function NKLokomotivTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xdcb452, [0x789BD1, 0x1E45A0, 0xE5E5ED]);
    }
}
function NKLokomotivAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xFF6899, 0xFFB4D2, 0xFFB4D2]);
    }
}
function NKLokomotivAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xFF6899, 0xFFB4D2, 0xFFB4D2]);
    }
}
function NKLokomotivTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xff5b4e, [0x544491, 0x32304A, 0x544491]);
    }
}
function NKLokomotivTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xff5b4e, [0x544491, 0x32304A, 0x544491]);
    }
}
function HNKGoricaFun(player) { // !gor
    room.sendAnnouncement('HNK Gorica | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('gor/titular/red | gor/titular/blue | gor/alternativa/red | gor/alternativa/blue |  | gor/tercera/red | gor/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HNKGoricaTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x4f4b4b, [0x4f4b4b, 0xF3F1F3, 0xD6D6D9]);
    }
}
function HNKGoricaTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x4f4b4b, [0x4f4b4b, 0xF3F1F3, 0xD6D6D9]);
    }
}
function HNKGoricaAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x333333, 0x45464A, 0x79889C]);
    }
}
function HNKGoricaAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x333333, 0x45464A, 0x79889C]);
    }
}
function HNKGoricaTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xE31F2B, 0xCE202A, 0xCA202A]);
    }
}
function HNKGoricaTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xE31F2B, 0xCE202A, 0xCA202A]);
    }
}
function NKSlavenBelupoFun(player) { // !slb
    room.sendAnnouncement('NK Slaven Belupo Koprivnica | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('slb/titular/red | slb/titular/blue | slb/alternativa/red | slb/alternativa/blue |  | slb/tercera/red | slb/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NKSlavenBelupoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0xFFFFFF, [0x315CBA, 0x12419D, 0x0E3D97]);
    }
}
function NKSlavenBelupoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0xFFFFFF, [0x315CBA, 0x12419D, 0x0E3D97]);
    }
}
function NKSlavenBelupoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x262525]);
    }
}
function NKSlavenBelupoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x262525]);
    }
}
function NKSlavenBelupoTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xe31f2b, [0x262524, 0xFFFFFF, 0xFFFFFF]);
    }
}
function NKSlavenBelupoTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xe31f2b, [0x262524, 0xFFFFFF, 0xFFFFFF]);
    }
}
function Istra1961Fun(player) { // !ist
    room.sendAnnouncement('NK Istra 1961 | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ist/titular/red | ist/titular/blue | ist/alternativa/red | ist/alternativa/blue |  | ist/tercera/red | ist/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function Istra1961TitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, -90, 0x1b1e23, [0xfcf533]);
    }
}
function Istra1961TitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, -90, 0x1b1e23, [0xfcf533]);
    }
}
function Istra1961AlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x02db8a]);
    }
}
function Istra1961AlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x02db8a]);
    }
}
function Istra1961TerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x01152d, 0x011329, 0x021325]);
    }
}
function Istra1961TerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x01152d, 0x011329, 0x021325]);
    }
}
function InterZapresicFun(player) { // !iza
    room.sendAnnouncement('NK Inter Zaprešić | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('iza/titular/red | iza/titular/blue | iza/alternativa/red | iza/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function InterZapresicTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x0c63b2, [0xFCE353, 0xEDEC80, 0x0099C5]);
    }
}
function InterZapresicTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x0c63b2, [0xFCE353, 0xEDEC80, 0x0099C5]);
    }
}
function InterZapresicAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xf5dd0e, 0x3169af, 0x3169AF]);
    }
}
function InterZapresicAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xf5dd0e, 0x3169af, 0x3169AF]);
    }
}
function NKVarazdinFun(player) { // !var
    room.sendAnnouncement('NK Varaždin | 🇭🇷 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('var/titular/red | var/titular/blue | var/alternativa/red | var/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NKVarazdinTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xffffff, [0x012351, 0x012f63, 0x01417e]);
    }
}
function NKVarazdinTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xffffff, [0x012351, 0x012f63, 0x01417e]);
    }
}
function NKVarazdinAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x242424, [0xFF8B42]);
    }
}
function NKVarazdinAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x242424, [0xFF8B42]);
    }
}
function Bayer04LeverkusenFun(player) { // !b04
    room.sendAnnouncement('Bayer 04 Leverkusen | 🇩🇪 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('b04/titular/red | b04/titular/blue | b04/alternativa/red | b04/alternativa/blue | b04/tercera/red | b04/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function Bayer04LeverkusenTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xffffff, [0xEC3339, 0xD6202D, 0xEC3339]);
    }
}
function Bayer04LeverkusenTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xffffff, [0xEC3339, 0xD6202D, 0xEC3339]);
    }
}
function Bayer04LeverkusenAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x222126, 0xE52E33, 0x222126]);
    }
}
function Bayer04LeverkusenAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x222126, 0xE52E33, 0x222126]);
    }
}
function Bayer04LeverkusenTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 56, 0x22211f, [0xCED0CD, 0xD9D9D7, 0xCED0CD]);
    }
}
function Bayer04LeverkusenTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 56, 0x22211f, [0xCED0CD, 0xD9D9D7, 0xCED0CD]);
    }
}
function VeneziaFCFun(player) { // !venfc
    room.sendAnnouncement('Venezia FC | 🇮🇹 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('venfc/titular/red | venfc/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function VeneziaFCTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xffffff, [0xFE7200, 0x161C28, 0x008956]);
    }
}
function VeneziaFCTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xffffff, [0xFE7200, 0x161C28, 0x008956]);
    }
}
function AthleticDeBilbaoFun(player) { // !ath
    room.sendAnnouncement('Athletic de Bilbao | 🇪🇸 ', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ath/titular/red | ath/titular/blue | ath/alternativa/red | ath/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function AthleticDeBilbaoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x020300, [0xEA011E, 0xFFFFFF, 0xEA011E]);
    }
}
function AthleticDeBilbaoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x020300, [0xEA011E, 0xFFFFFF, 0xEA011E]);
    }
}
function AthleticDeBilbaoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 121, 0xdecb89, [0x225F3E, 0x225F3E, 0x30734A]);
    }
}
function AthleticDeBilbaoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 121, 0xdecb89, [0x225F3E, 0x225F3E, 0x30734A]);
    }
}
function EspanyolFun(player) { // !RIV
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rcde/titular/red | rcde/titular/blue | rcde/alternativa/red | rcde/alternativa/blue | rcde/tercera/red | rcde/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function EspanyolTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0x272624, [0xFFFFFF, 0x006DB5, 0xFFFFFF]);
    }
}
function EspanyolTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0x272624, [0xFFFFFF, 0x006DB5, 0xFFFFFF]);
    }
}
function EspanyolAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xFFFFFF, [0x275F56, 0x1B81D3, 0xEBEDF2]);
    }
}
function EspanyolAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xFFFFFF, [0x275F56, 0x1B81D3, 0xEBEDF2]);
    }
}
function EspanyolTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1e1916, [0xF5CDCD, 0xF5ECE3, 0x39282E]);
    }
}
function EspanyolTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1e1916, [0xF5CDCD, 0xF5ECE3, 0x39282E]);
    }
}
function RBLeipzigFun(player) { // !RBL
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('rbl/titular/red | rbl/titular/blue | rbl/alternativa/red | rbl/alternativa/blue | rbl/tercera/red | rbl/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function RBLeipzigTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xdc0741, [0xF0EDEE, 0xE3E0E1]);
    }
}
function RBLeipzigTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xdc0741, [0xF0EDEE, 0xE3E0E1]);
    }
}
function RBLeipzigAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xdc0741, [0x0D1E2D]);
    }
}
function RBLeipzigAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xdc0741, [0x0D1E2D]);
    }
}
function RBLeipzigTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFEFEFE, [0x242426, 0x0E4182, 0xA60D17]);
    }
}
function RBLeipzigTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFEFEFE, [0x242426, 0x0E4182, 0xA60D17]);
    }
}
function MontevideoCityTorqueFun(player) { // !TOR
    room.sendAnnouncement('Montevideo City Torque | 🇺🇾', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('tor/titular/red | tor/titular/blue | tor/alternativa/red | tor/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MontevideoCityTorqueTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0x8fd1ff]);
    }
}
function MontevideoCityTorqueTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0x8fd1ff]);
    }
}
function MontevideoCityTorqueAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1D1D1D, [0xFFFFFF, 0xE8E7EA, 0xFFFFFF]);
    }
}
function MontevideoCityTorqueAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1D1D1D, [0xFFFFFF, 0xE8E7EA, 0xFFFFFF]);
    }
}
function MontevideoWanderersFun(player) { // !WAN
    room.sendAnnouncement('Montevideo Wanderers| 🇺🇾', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('wan/titular/red | wan/titular/blue | wan/alternativa/red | wan/alternativa/blue | wan/tercera/red | wan/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function MontevideoWanderersTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xB8B8B8, [0xFFFFFF, 0x000000, 0xFFFFFF]);
    }
}
function MontevideoWanderersTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xB8B8B8, [0xFFFFFF, 0x000000, 0xFFFFFF]);
    }
}
function MontevideoWanderersAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0x78DEF9, 0xA6E2F9, 0x78DEF9]);
    }
}
function MontevideoWanderersAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0x78DEF9, 0xA6E2F9, 0x78DEF9]);
    }
}
function MontevideoWanderersTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFFFFFF, 0xF1F1F1, 0xFFFFFF]);
    }
}
function MontevideoWanderersTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFFFFFF, 0xF1F1F1, 0xFFFFFF]);
    }
}
function HamburgerSVFun(player) { // !HSV
    room.sendAnnouncement('Hamburgo S.V.| 🇩🇪', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('hsv/titular/red | hsv/titular/blue | hsv/alternativa/red | hsv/alternativa/blue | hsv/tercera/red | hsv/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function HamburgerSVTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0x2B68B9, 0xFFFFFF, 0xFFFFFF]);
    }
}
function HamburgerSVTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0x2B68B9, 0xFFFFFF, 0xFFFFFF]);
    }
}
function HamburgerSVAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xFBB6D5, 0x6D5E7C, 0xFBB6D5]);
    }
}
function HamburgerSVAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xFBB6D5, 0x6D5E7C, 0xFBB6D5]);
    }
}
function HamburgerSVTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0x2D2B2C, 0x0D497D, 0x2D2B2C]);
    }
}
function HamburgerSVTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0x2D2B2C, 0x0D497D, 0x2D2B2C]);
    }
}
function NewcastleUnitedFun(player) { // !NEW
    room.sendAnnouncement('Newcastle United | 🇬🇧', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('new/titular/red | new/titular/blue | new/alternativa/red | new/alternativa/blue | new/tercera/red | new/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function NewcastleUnitedTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xeb0029, [0xFFFFFF, 0x222224, 0xFFFFFF]);
    }
}
function NewcastleUnitedTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xeb0029, [0xFFFFFF, 0x222224, 0xFFFFFF]);
    }
}
function NewcastleUnitedAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x1C2023, 0x143439, 0x143439]);
    }
}
function NewcastleUnitedAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x1C2023, 0x143439, 0x143439]);
    }
}
function NewcastleUnitedTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x111c4d, [0xEC440A, 0xF06C0F, 0xF06C0F]);
    }
}
function NewcastleUnitedTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x111c4d, [0xEC440A, 0xF06C0F, 0xF06C0F]);
    }
}
function WestHamUnitedFun(player) { // !WHU
    room.sendAnnouncement('West Ham United | 🇬🇧', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('whu/titular/red | whu/titular/blue | whu/alternativa/red | whu/alternativa/blue | whu/tercera/red | whu/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function WestHamUnitedTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0xA3C3EA, 0x751A2C, 0x751A2C]);
    }
}
function WestHamUnitedTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0xA3C3EA, 0x751A2C, 0x751A2C]);
    }
}
function WestHamUnitedAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x010101, [0xFFFFFF]);
    }
}
function WestHamUnitedAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x010101, [0xFFFFFF]);
    }
}
function WestHamUnitedTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 58, 0xFFFFFF, [0xAB2FC3, 0x2C2B54, 0x342F5F]);
    }
}
function WestHamUnitedTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 58, 0xFFFFFF, [0xAB2FC3, 0x2C2B54, 0x342F5F]);
    }
}
function InterMiamiCFFun(player) { // !MIA
    room.sendAnnouncement('Inter Miami CF | 🇺🇸', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('mia/titular/red | mia/titular/blue | mia/alternativa/red | mia/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function InterMiamiCFTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xffd4fe, [0xFFFFFF]);
    }
}
function InterMiamiCFTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xffd4fe, [0xFFFFFF]);
    }
}
function InterMiamiCFAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 55, 0xEFC4D8, [0xF5C6D0, 0x1B191C, 0x1B191C]);
    }
}
function InterMiamiCFAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 55, 0xEFC4D8, [0xF5C6D0, 0x1B191C, 0x1B191C]);
    }
}
function DeportivoEspanolFun(player) { // !CDE
    room.sendAnnouncement('Club Deportivo Español | 🇦🇷', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cde/titular/red | cde/titular/blue | cde/alternativa/red | cde/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DeportivoEspanolTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 66, 0xFFFFFF, [0xFFC100, 0xCD0000, 0xCD0000]);
    }
}
function DeportivoEspanolTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 66, 0xFFFFFF, [0xFFC100, 0xCD0000, 0xCD0000]);
    }
}
function DeportivoEspanolAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 66, 0x242d51, [0xC80000, 0xFFFFFF, 0xFFFFFF]);
    }
}
function DeportivoEspanolAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 66, 0x242d51, [0xC80000, 0xFFFFFF, 0xFFFFFF]);
    }
}
function SportivoItalianoFun(player) { // !NEW
    room.sendAnnouncement('Sportivo Italiano | 🇦🇷', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('sit/titular/red | sit/titular/blue | sit/alternativa/red | sit/alternativa/blue | sit/tercera/red | sit/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function SportivoItalianoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 307, 0xFFFFFF, [0x1367C0, 0x1367C0, 0x374A89]);
    }
}
function SportivoItalianoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 307, 0xFFFFFF, [0x1367C0, 0x1367C0, 0x374A89]);
    }
}
function SportivoItalianoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 65, 0x1e2c94, [0x0D3986, 0xFFFFFF, 0xFFFFFF]);
    }
}
function SportivoItalianoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 65, 0x1e2c94, [0x0D3986, 0xFFFFFF, 0xFFFFFF]);
    }
}
function SportivoItalianoTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFAF7FF, [0x0C785B, 0xDF1B2B, 0x0C785B]);
    }
}
function SportivoItalianoTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFAF7FF, [0x0C785B, 0xDF1B2B, 0x0C785B]);
    }
}
function ClubDeportivoMandiyuFun(player) { // !CDM
    room.sendAnnouncement('Club Deportivo Mandiyú | 🇦🇷', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('cdm/titular/red | cdm/titular/blue | cdm/alternativa/red | cdm/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function ClubDeportivoMandiyuTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x1aad69, [0x11B065, 0xFFFFFF, 0xFFFFFF]);
    }
}
function ClubDeportivoMandiyuTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x1aad69, [0x11B065, 0xFFFFFF, 0xFFFFFF]);
    }
}
function ClubDeportivoMandiyuAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0xFFFFFF, [0x81D368, 0x61CA65, 0x61CA65]);
    }
}
function ClubDeportivoMandiyuAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0xFFFFFF, [0x81D368, 0x61CA65, 0x61CA65]);
    }
}
function HullCityFun(player) { // !HUL
    room.sendAnnouncement('Hull City | 🇬🇧', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('hul/titular/red | hul/titular/blue | hul/alternativa/red |hul/alternativa/blue | hul/tercera/red |hul/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('hul/titular/red/2018 | hul/titular/blue/2018 | hul/alternativa/red/2018 | hul/alternativa/blue/2018 | hul/tercera/red/2018 |hul/tercera/blue/2018', player.id, 0x6BFFB5, "normal", 0);
}
function HullCityTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 247, 0x000000, [0xF77F15, 0xF77F15, 0x180602]);
    }
}
function HullCityTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 247, 0x000000, [0xF77F15, 0xF77F15, 0x180602]);
    }
}
function HullCityAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x000000, [0xFFFFFF]);
    }
}
function HullCityAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x000000, [0xFFFFFF]);
    }
}
function HullCityTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 247, 0xFFFFFF, [0x227592, 0x227592, 0xFFB10F]);
    }
}
function HullCityTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 247, 0xFFFFFF, [0x227592, 0x227592, 0xFFB10F]);
    }
}
function HullCityTitular2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0xFFFFFF, [0xF6871E, 0x231D1D, 0xF6871E]);
    }
}
function HullCityTitular2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0xFFFFFF, [0xF6871E, 0x231D1D, 0xF6871E]);
    }
}
function HullCityAlternativa2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 245, 0xF5F2F7, [0x1C1B20, 0x1C1B20, 0xF7933B]);
    }
}
function HullCityAlternativa2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 245, 0xF5F2F7, [0x1C1B20, 0x1C1B20, 0xF7933B]);
    }
}
function HullCityTercera2018RedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 245, 0x242321, [0xFFFFFF, 0xE6E4E2, 0xF8E80F]);
    }
}
function HullCityTercera2018BlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 245, 0x242321, [0xFFFFFF, 0xE6E4E2, 0xF8E80F]);
    }
}
function WolverhamptonFun(player) { // !WOL
    room.sendAnnouncement('Wolves | 🇬🇧', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('wol/titular/red | wol/titular/blue | wol/alternativa/red |wol/alternativa/blue | wol/tercera/red |wol/tercera/blue', player.id, 0x6BFFB5, "normal", 0);
}
function WolverhamptonTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x000000, [0xF98E29, 0xFB9F33, 0xFDAD3B]);
    }
}
function WolverhamptonTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x000000, [0xF98E29, 0xFB9F33, 0xFDAD3B]);
    }
}
function WolverhamptonAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 61, 0xFFFFFF, [0xF99F03, 0x202020, 0x202020]);
    }
}
function WolverhamptonAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 61, 0xFFFFFF, [0xF99F03, 0x202020, 0x202020]);
    }
}
function WolverhamptonTerceraRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 0, 0xF5F5F5, [0x1F6452, 0x3AAC88]);
    }
}
function WolverhamptonTerceraBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 0, 0xF5F5F5, [0x1F6452, 0x3AAC88]);
    }
}
function CerroLargoFun(player) { // !CRL
    room.sendAnnouncement('Cerro Largo | 🇺🇾', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('crl/titular/red | crl/titular/blue | crl/alternativa/red |crl/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function CerroLargoTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 180, 0x1f1e26, [0xFFFFFF, 0x2454DF, 0xFFFFFF]);
    }
}
function CerroLargoTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 180, 0x1f1e26, [0xFFFFFF, 0x2454DF, 0xFFFFFF]);
    }
}
function CerroLargoAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 61, 0x1f1e26, [0x0098CA]);
    }
}
function CerroLargoAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 61, 0x1f1e26, [0x0098CA]);
    }
}
function OldCaledoniansFootballClubFun(player) { // !OCFC
    room.sendAnnouncement('Old Caledonians Football Club | 🇦🇷', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('ocfc/titular/red | ocfc/titular/blue', player.id, 0x6BFFB5, "normal", 0);
}
function OldCaledoniansFootballClubTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x191919, [0xF7F6FB]);
    }
}
function OldCaledoniansFootballClubTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x191919, [0xF7F6FB]);
    }
}
function DefensorSportingFun(player) { // !DFS
    room.sendAnnouncement('Defensor Sporting | 🇺🇾', player.id, 0x6BFFB5, "bold", 0);
    room.sendAnnouncement('Puedes elegir entre:', player.id, 0x6BFFB5, "normal", 0);
    room.sendAnnouncement('dfs/titular/red | dfs/titular/blue | dfs/alternativa/red | dfs/alternativa/blue', player.id, 0x6BFFB5, "normal", 0);
}
function DefensorSportingTitularRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 60, 0xFFFFFF, [0x6D4DB4]);
    }
}
function DefensorSportingTitularBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 60, 0xFFFFFF, [0x6D4DB4]);
    }
}
function DefensorSportingAlternativaRedFun(player){
    if (player.admin == true){
        room.setTeamColors(1, 90, 0x402E6B, [0xFFFFFF, 0x6D4DB4, 0xFFFFFF]);
    }
}
function DefensorSportingAlternativaBlueFun(player){
    if (player.admin == true){
        room.setTeamColors(2, 90, 0x402E6B, [0xFFFFFF, 0x6D4DB4, 0xFFFFFF]);
    }
}


function ReglasFun(player) { // !reglas
    room.sendAnnouncement("📜 REGLAS DE LOS PENALES:", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("⒈ Sólo puede haber un arquero.", player.id, 0x00FFBB, "normal", 1);
    room.sendAnnouncement("⒉ Los jugadores deben patear en orden.", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("⒊ El jugador 𝐍𝐎 puede  ″𝙰𝙼𝙰𝙶𝙰𝚁″ en la ejecución del penal.​​", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("👨‍⚖️ Si incumple con ésta regla, deberá ejecutar nuevamente el penal. ⚖​", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("⒋ Si un equipo tiene menos de 4 jugadores, tienen derecho a decidir si uno de ellos patea dos veces o eligen a un espectador.", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("⒌ No vale invadir el área mientras un jugador está por patear.", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("⒍ Si se ejecutaron todos los penales y aún persiste el empate:", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("Los arqueros deberán enfrentarse entre ellos hasta 5̲ v̲e̲c̲e̲s̲ c̲o̲m̲o̲ m̲á̲x̲i̲m̲o̲.", player.id, 0x00FFBB, "normal", 0);
    room.sendAnnouncement("Y si el empate persiste, t̲o̲d̲o̲s̲ l̲o̲s̲ j̲u̲g̲a̲d̲o̲r̲e̲s̲ d̲e̲b̲e̲r̲á̲n̲ p̲a̲t̲e̲a̲r̲ l̲o̲s̲ p̲e̲n̲a̲l̲e̲s̲ n̲u̲e̲v̲a̲m̲e̲n̲t̲e̲.", player.id, 0x00FFBB, "normal", 0);
}
function putPauseFun() { // p
    room.pauseGame(true);
}

function unPauseFun() { // !p
    room.pauseGame(false);
}
function helpFun(player) { // !help
    room.sendAnnouncement('💬  Comandos disponibles: "!confirm", "!afk", "afks", "!confirmed_players", "!stats Nickname", "!elohelp", "!eloranking", "!ranking", "!goleadores", "!asistidores"', player.id, 0xFF003C, "normal", 0);
    room.sendAnnouncement('💬  "!pregunta", "!poss", "!adminhelp", "!gkhelp", "!scripts", "!avatars" "!rankhelp", "!nv", "!adormir", "!acomer", "!registrarme",  "!mapas" y "!camisetas".', player.id, 0xFF003C, "normal", 0);
}
    colors = {
        "red": 15729691,
        "green": 10812739,
        "black": 0,
        "transparent": -1,
        "blue": 367351,
        "yellow": 16771089,
        "orange": 16737796,
        "purple": 14886893,
        "white": 16777215,
        "gold": 14140044
    };
function bosshaftColor (player, message) {
    if (player.admin == true){
    let e = message.split(/ +/).slice(1);
    return room.setDiscProperties(0, {
        color: e[0]
    }), !1
}}
function bosshaftColorString (player, message) {
    if (player.admin == true){
    let e = message.split(/ +/).slice(1);
    return (colors.hasOwnProperty(e[0].toLowerCase()) ? room.setDiscProperties(0, {
        color: colors[e[0].toLowerCase()]
    }) : room.sendAnnouncement("Ese color no es válido! Los colores que puedes utilizar son: red/blue/green/yellow/orange/black/white/purple/gold/transparent", player.id, 0x66FFAD, "bold", 0))
}}

function PelotaFun(player) { // !pelota
    if (player.admin == true){
    room.sendAnnouncement('!ball + red/blue/green/yellow/orange/black/white/purple/gold/transparent (sin el + ni el slash)', player.id, 0xFF003C, "normal", 0);
    room.sendAnnouncement('!customball + color (En decimal) | Página para transformar colores: https://convertingcolors.com/', player.id, 0xFF003C, "normal", 0);
}
}
function NumeroUnoFun(player) { // !1
    room.sendAnnouncement('🔢  𝟭         ౹         𝟏          𝟷          𝟣         １         ߗ1𐰯¹₁⥠↿˥⒈         𝟏        𝟷𐰯 І        Ι         Ӏ        ᅵ        𝗹        ।         ⅂        𐐑        ⓵        ①         ➀         ➊          para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroDosFun(player) { // !1
    room.sendAnnouncement('🔢  𝟮        Ƨ        2️⃣        ౽        ੨        ૨        ২        २        ௨        𝟐        ２        2        ᒿ        𝟤        ᒾ        ²        ₂        շ        𝟸        ᘖ        𝟚        Ձ        ⒉        ƻ        Չ        Զ        ϩ        ⓶        ②        ➁        ❷        ㈃        ⒛ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroTresFun(player) { // !1
    room.sendAnnouncement('🔢  Ʒ        3        3️⃣        ३        ੩        ʒ        ӡ        Ӡ        ᴣ        ᶾ        э        Э        ℈        ぅ        う        ㄋ        ȝ        Ȝ        𝟯        𝟥        з        ɜ        ᴈ        ᢃ        ౩        ⓷        ③        ➂        ❸        ੩        ૩        ३ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroCuatroFun(player) { // !1
    room.sendAnnouncement('🔢  𝟰        ㏣        ㍜        𝟒        ４        𝟺        𝟦        4        ₄        ⁴        Ϥ        կ        Կ        Ч        ч        ɥ        ౺        ⒋ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroCincoFun(player) { // !1
    room.sendAnnouncement('🔢  Ƽ        ƽ        𐐠        𐑈        𝟱        𝟓        ５        ㏤        5        ㍝        5️⃣        𝟻        5        ₅        ⁵        ⒌ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroSeisFun(player) { // !1
    room.sendAnnouncement('🔢  𝟲        𝟔        ６        𝟼        ㏥        ㍞        6        𝟨        ₆        ⁶        𝟞        ⒍        ⑥        ⓺        ➅        ➏        ❻        ɓ        ꕃ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroSieteFun(player) { // !1
    room.sendAnnouncement('🔢  ⅂        𐐑        ヿ        ⏋        ⌉        𝟳        𝟕        𝟟        7        𝟽        ７        ⁊        ₇        ⁷        𝟩        7️⃣        ⒎        ꔔ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroOchoFun(player) { // !1
    room.sendAnnouncement('🔢  𝟴        𝟖        8        𝟪        ৪        ⁸        ₈        ８        𐌚        𝟾        ꖉ        ⊟        𝛉        ⒏        ㏧        ㍠        8️⃣ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroNueveFun(player) { // !1
    room.sendAnnouncement('🔢  𝟵        𝟗        9        𝟿        ９        𝟫        ⁹        ₉        ୨        ց        ɡ        ᕤ        ⒐        9        ㏨        ㍡        9️⃣        𝟡        ۹        ٩        ᑫ        ᑴ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}
function NumeroDiezFun(player) { // !1
    room.sendAnnouncement('🔢  ⒑        🔟        ⑩        ➉        ➓        ❿        ю        Ю        ㍢        ㏩        ⑽ para más ve a https://tell.wtf', player.id, 0xFF003C, "normal", 0);
}

function RegistrarmeFun(player) { // !registrarme
    playerName = player.name.replace(/ /g,"_");
    room.sendAnnouncement("[💻] @" + playerName + " ➡ Registrate ahora en http://bit.ly/2JJ78O1 para poder ver tus estadísticas. 📊", player.id, 0xFFE600, "normal", 0);
    room.sendAnnouncement("𝘚𝘰́𝘭𝘰 𝘢𝘯̃𝘢𝘥𝘪𝘮𝘰𝘴 𝘫𝘶𝘨𝘢𝘥𝘰𝘳𝘦𝘴 𝘳𝘦𝘨𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘴 𝘭𝘰𝘴 𝘥𝘪́𝘢𝘴 𝐒𝐀𝐁𝐀𝐃𝐎𝐒 𝘺 𝐃𝐎𝐌𝐈𝐍𝐆𝐎𝐒", player.id, 0xEB172D, "bold", 0);
}
function EstadiosFun(player) { // !estadios
    room.sendAnnouncement('🏟 Puedes seleccionar: !bombonera | !monumental', player.id, 0xFF003C, "normal", 0);

}
function ScriptsDisponiblesFun(player) { // !scripts
    playerName = player.name.replace(/ /g,"_");
    room.sendAnnouncement("[💻] @" + playerName + " para ver los scripts disponibles ve a ➡ http://bit.ly/2XOVKoT ⬅", player.id, 0xFFE600, "normal", 0);
}
function AvataresDisponiblesFun(player) { // !avatar
    playerName = player.name.replace(/ /g,"_");
    room.sendChat("[🔢🔤] @" + playerName + " para ver símbolos para tu avatar ve a:  ➡ https://tell.wtf ⬅");
    room.sendChat("@" + playerName + " y para ver números para tu avatar también puedes poner !1, !2, !3, etc (hasta !10)");
}

function MapasFun(player) { // !mapas
    room.sendAnnouncement('REAL SOCCER ⚽: !rs - !entrenamiento - !pensred - !pensblue', player.id, 0xd32668, "normal", 0);
    room.sendAnnouncement('TENIS 🎾: !tenis', player.id, 0xdc4253, "normal", 0);
    room.sendAnnouncement('VOLLEYBALL 🏐: !voley - !voleibol', player.id, 0xef7b2a, "normal", 0);
    room.sendAnnouncement('FUTSAL ⚽: !futx1 - !futx3 - !futx4 - !pensredfutsalx3 - !pensbluefutsalx3', player.id, 0xf99c1e, "normal", 0);
    room.sendAnnouncement('HANDBALL 🤾: !handball - !pensredhandball - !pensbluehandball', player.id, 0xe25c79, "normal", 0);
    room.sendAnnouncement('RANDOM 🎲: !big - !mundialito - !sniper - !carreras - !escuela - !skate', player.id, 0xcb1dd5, "normal", 0);
}

function adminHelpFun(player) {
    if (player.admin == true){
    room.sendAnnouncement('💬  Comandos disponibles: "!mute Player", "!unmute Player", "!unmuteall", "!clearbans", "!rr", "!kickafks", "!resign", "!pelota" y "!swap" (Para cambiar de equipos).', player.id, 0xFF6600, "normal", 0);
}}
 
 
function gkHelpFun() { // !gkhelp
    room.sendChat('💬  El jugador más atrasado en el saque inicial se establecerá como arquero! (Escribe "!gk" si el bot se equivoca).')
}
function rankHelpFun() { // !gkhelp
    room.sendChat("💬  Consigue puntos en el host! Gol: 2 pts, Asistencia: 1 pts, Victoria: 3 pts, Valla invicta: 3 pts, Derrota: -3 pts, Gol en contra: -2 pts.")
}
function eloHelpFun() {
    room.sendChat("💬 ¡Consigue puntos por ganar partidos! Los puntos se calculan utilizando el sistema elo.")
}
 
function statsFun(player, message){
    if (stats.hasOwnProperty(message.substr(7))){
    ps = stats[message.substr(7)]; // stands for playerstats
    var TotalDePartidosJugados = ps[2] + ps[3]
    var PromedioDeVictorias = ps[2] / TotalDePartidosJugados
    var PorcentajeDeVictorias = PromedioDeVictorias * 100
    var PromedioDeGoles = ps[0] / TotalDePartidosJugados
    var PromedioDeAsistencias = ps[1] / TotalDePartidosJugados
    var Goles = ps[0] * 2
    var Asistencias = ps[1] * 2
    var Victoria = ps[2] * 5
    var VallaInvicta = ps[5] * 3
    var Derrota = ps[3] * 1
    var GolesEnContra = ps[4] * 2
    var PuntosTotales = Goles + Asistencias + Victoria + VallaInvicta - Derrota - GolesEnContra 
    room.sendAnnouncement(message.substr(7) + ": ⚽ Goles: " + ps[0] + ", ➗ ⚽ Promedio de Gol: " + PromedioDeGoles.toFixed(2) + ", 👟 Asistencias: " + ps[1]  + ", ➗ 👟 Promedio de Asistencias: " + PromedioDeAsistencias.toFixed(2) + ",  ❌ Goles en contra: " + ps[4] + ", ✔️ Vallas invictas: " + ps[5] + ",  🏆 Victorias: " + ps[2] + ",  📊 Porcentaje de Victorias: " + PorcentajeDeVictorias.toFixed(2) + "% , 👎 Derrotas: " + ps[3] + ", 💎 ELO: " + ps[6] + " , 🌟 Puntos: " + PuntosTotales, player.id, 0xFFE121, "normal", 0);
    if (ps[7] !== "D" &&  ps[8] !== "D" && ps[9] !== "D" && ps[10] !== "D" && ps[11] !== "D"){room.sendAnnouncement("🎮 Últimos 5 partidos de " + message.substr(7) + ": " + ps[7] + " - " + ps[8] + " - " + ps[9] + " - " + ps[10] + " - " + ps[11], player.id, 0xFFE121, "normal", 0);}
    if (ps[7] !== "D" &&  ps[8] !== "D" && ps[9] !== "D" && ps[10] !== "D" && ps[11] == "D"){room.sendAnnouncement("🎮 Últimos 4 partidos de " + message.substr(7) + ": " + ps[7] + " - " + ps[8] + " - " + ps[9] + " - " + ps[10], player.id, 0xFFE121, "normal", 0);}
    if (ps[7] !== "D" &&  ps[8] !== "D" && ps[9] !== "D" && ps[10] == "D" && ps[11] == "D"){room.sendAnnouncement("🎮 Últimos 3 partidos de " + message.substr(7) + ": " + ps[7] + " - " + ps[8] + " - " + ps[9], player.id, 0xFFE121, "normal", 0);}
    if (ps[7] !== "D" &&  ps[8] !== "D" && ps[9] == "D" && ps[10] == "D" && ps[11] == "D"){room.sendAnnouncement("🎮 Últimos 2 partidos de " + message.substr(7) + ": " + ps[7] + " - " + ps[8], player.id, 0xFFE121, "normal", 0);}
    if (ps[7] !== "D" &&  ps[8] == "D" && ps[9] == "D" && ps[10] == "D" && ps[11] == "D"){room.sendAnnouncement("🎮 Último partido de " + message.substr(7) + ": " + ps[7], player.id, 0xFFE121, "normal", 0);}
    } else{     room.sendAnnouncement("Para ver tus estadísticas debes escribir: !stats NickConElQueTeRegistraste", player.id, 0x63EBE2, "bold", 0);
room.sendAnnouncement("Si aún no te has registrado puedes escribir !registrarme y te dará el link al que tienes debes ir para poder registrarte. Ten en cuenta que sólo añaden jugadores registrados los días Sábados y Domingos. ", player.id, 0xEB172D, "bold", 0);}
}


function clearbansFun(player){ // !clear
    if (player.admin == true){ room.clearBans(); room.sendChat("💎 Los bans han sido reseteados.");}
}
function MinirsFun(player){
    if (player.admin == true){
	realMap2=true;
        room.stopGame();
        room.setCustomStadium(MiniRS);        
        room.startGame() ;
    }
}

function RealSoccer2020Fun(player){
    if (player.admin == true){
	realMap=true;
        room.stopGame();
    room.setScoreLimit(0);
    room.setTimeLimit(0);
        room.setCustomStadium(RawRGLHMap);        
        room.startGame() ;
    }
}

function BigGLHFun(player){
    if (player.admin == true){
        room.stopGame();
        room.setCustomStadium(BigGLH);        
        room.startGame() ;
    }
}


function PenaltyBlueFun(player){
    if (player.admin == true){
        room.stopGame();
        room.setCustomStadium(pensblue);        
        room.startGame() ;
    room.sendChat( "Pᴀʀᴀ ᴠᴇʀ ʟᴀs ʀᴇɢʟᴀs ᴇsᴄʀɪʙᴇ:  !𝚛𝚎𝚐𝚕𝚊𝚜"  );
    }
}

function PenaltyRedFun(player){
    if (player.admin == true){
        room.stopGame();
        room.setCustomStadium(pensred);        
        room.startGame() ;
    room.sendChat( "Pᴀʀᴀ ᴠᴇʀ ʟᴀs ʀᴇɢʟᴀs ᴇsᴄʀɪʙᴇ:  !𝚛𝚎𝚐𝚕𝚊𝚜"  );

    }
}
 
function resetFun(player){
    if (player.admin == true){
        room.stopGame();
        room.startGame();
    }
}
 
function gkFun(player){ // !gk
 
    if (room.getScores() != null && room.getScores().time < 60){
        if (player.team == 1) {
            gk[0] = player;
        }
        else if (player.team == 2){
            gk[1] = player;
        }
    }
    return;
}
 
 
function closeFun(player){
    if (player.name == "Pajero"){ // artificially generate an error in order to close the room
        stats.crash();
    }
}


function leaveFun(player, message) {
if (message == "!nv")
room.kickPlayer(player.id, "Adiós vaquero! 👋", false);
else if (message == "!adormir")
room.kickPlayer(player.id, "💤 Buenas noches!! <3", false);
else if (message == "!bb")
room.kickPlayer(player.id, "Bye! 👋 😉", false);
else if (message == "!acomer")
room.kickPlayer(player.id, "😋 Bon appetit ! 🍽", false);
}
 
 
/*
    For ranking
*/
 
function rankingCalc(player){
    var name = player;
    players = Object.keys(stats);
    account = players.find(a => a === name)
    if (account !== undefined){
    return stats[name][0] * 2 + stats[name][1] * 2 +
            stats[name][2] * 5 + stats[name][5] * 3 -
            stats[name][3] * 3 - stats[name][4] * 2;
    }
    else {return 0;}
}
 
function ranking(player, message){
 
    var overall = [];
    players = Object.keys(stats);
    for (var i = 0; i < players.length; i++) {
        score = rankingCalc(players[i])
        // Gol: 2 pts, Asistencia: 2 pts, Victoria: 5 pts, Valla Invicta: 3 pts, Derrota: -3 pts, Gol en Contra: -2 pts
        overall.push({name: players[i], value: score});
    }
    overall.sort(function(a,b){
        return b.value - a.value;
    })
    let top30 = overall.splice(0, 30);
    let pos = 1;
    if (top30.length) {
    room.sendAnnouncement("💎 𝐑 𝐀 𝐍 𝐊 𝐈 𝐍 𝐆 [𝚃𝙾𝙿𝟹𝟶] 💎: ", player.id, 0xFFE121, "normal", 0);
    }
    while (top30.length) {
    let tmp = top30.splice(0, 5);
    let message = tmp.map(e => `${pos++}) ${e.name}: ${e.value}`).join(", ");
    room.sendAnnouncement(message, player.id, 0xFFE121, "normal", 0);

    }
    room.sendAnnouncement("[🔝] Ver TOP #30 de cada temporada | 🔗 LINK http://bit.ly/2RAwUJy", player.id, 0x30ff83, "bold", 0);
}
 
function eloCalc(player){
    var name = player;
    return stats[name][6];
}

function GoleadoresCalc(player){
    var name = player;
    players = Object.keys(stats);
    account = players.find(a => a === name)
    if (account !== undefined){
    return stats[name][0] * 1;
    }
    else {return 0;}
}
 
function TopGoleadores(player, message){
 
    var overall = [];
    players = Object.keys(stats);
    for (var i = 0; i < players.length; i++) {
        score = GoleadoresCalc(players[i])
        // Gol: 2 pts, Asistencia: 2 pts, Victoria: 5 pts, Valla Invicta: 3 pts, Derrota: -3 pts, Gol en Contra: -2 pts
        overall.push({name: players[i], value: score});
    }
    overall.sort(function(a,b){
        return b.value - a.value;
    })
    let top30 = overall.splice(0, 30);
    let pos = 1;
    if (top30.length) {
    room.sendAnnouncement("[⚽] 💎 MÁXIMOS GOLEADORES 💎: ", player.id, 0xFFE121, "bold", 0);
    }
    while (top30.length) {
    let tmp = top30.splice(0, 5);
    let message = tmp.map(e => `${pos++}) ${e.name}: ${e.value}`).join(", ");
    room.sendAnnouncement(message, player.id, 0xFFE121, "normal", 0);

    }
    room.sendAnnouncement("Para que tus goles sumen a las estadísticas debes registrarte en: http://bit.ly/2JJ78O1", player.id, 0x30ff83, "bold", 0);
}

function AsistidoresCalc(player){
    var name = player;
    players = Object.keys(stats);
    account = players.find(a => a === name)
    if (account !== undefined){
    return stats[name][1] * 1;
    }
    else {return 0;}
}
 
function TopAsistidores(player, message){
 
    var overall = [];
    players = Object.keys(stats);
    for (var i = 0; i < players.length; i++) {
        score = AsistidoresCalc(players[i])
        // Gol: 2 pts, Asistencia: 2 pts, Victoria: 5 pts, Valla Invicta: 3 pts, Derrota: -3 pts, Gol en Contra: -2 pts
        overall.push({name: players[i], value: score});
    }
    overall.sort(function(a,b){
        return b.value - a.value;
    })
    let top30 = overall.splice(0, 30);
    let pos = 1;
    if (top30.length) {
    room.sendAnnouncement("[👟] 💎 MÁXIMOS ASISTIDORES 💎: ", player.id, 0xFFE121, "bold", 0);
    }
    while (top30.length) {
    let tmp = top30.splice(0, 5);
    let message = tmp.map(e => `${pos++}) ${e.name}: ${e.value}`).join(", ");
    room.sendAnnouncement(message, player.id, 0xFFE121, "normal", 0);

    }
    room.sendAnnouncement("Para que tus asistencias sumen a las estadísticas debes registrarte en: http://bit.ly/2JJ78O1", player.id, 0x30ff83, "bold", 0);
}
 
function eloranking(player, message){
 
    var overall = [];
    players = Object.keys(stats);
    for (var i = 0; i < players.length; i++) {
        score = eloCalc(players[i])
        // Gol: 2 pts, Asistencia: 1 pts, Victoria: 3 pts, Valla invicta: 3 pts, Derrota: -3 pts, Gol en contra: -2 pts
        overall.push({name: players[i], value: score});
    }
    overall.sort(function(a,b){
        return b.value - a.value;
    })
    let top15 = overall.splice(0, 15);
    let pos = 1;
    if (top15.length) {
    room.sendAnnouncement("💎 ELO Ranking [TOP15]: ", player.id, 0xFFE121, "bold", 0);
    }
    while (top15.length) {
    let tmp = top15.splice(0, 5);
    let message = tmp.map(e => `${pos++}) ${e.name}: ${e.value}`).join(", ");
    room.sendAnnouncement(message, player.id, 0xFFE121, "bold", 0);
    }
}

 
function whichTeam(){ // gives the players in the red or blue team
    var players = room.getPlayerList();
    var redTeam = players.filter(player => player.team == 1);
    var blueTeam = players.filter(player => player.team == 2);
    return [redTeam, blueTeam]
}
function afkFun(player, message){ // !classic
    if (afkPlayerIDs.has(player.id)){
        afkPlayerIDs.delete(player.id);
        room.sendChat("💎 " + player.name + " volvió! y está listo para jugar!");}
    else {afkPlayerIDs.add(player.id); room.setPlayerTeam(player.id, 0);room.sendAnnouncement("[💤] " + player.name + " se encuentra actualmente 𝐀𝐅𝐊❗❗ ⏱ ⌨", null, 0xff8400, 'normal', 2);}
}
 
function afksFun(player, message){ // !huge
    afkPlayers_list = room.getPlayerList().filter((x) => afkPlayerIDs.has(x.id));
    afkPlayers_list_string = afkPlayers_list.map(x => x.name).join(", ");
    if (afkPlayers_list == "") {
        room.sendChat("💎 No hay jugadores AFK en este host!");
    }
    else {
        room.sendChat("💎 Jugadores AFK: " + afkPlayers_list_string);
    }
}
 
function kickafksFun(player, message){ // !huge
    if (player.admin == true){
        afksPlayers = room.getPlayerList().filter((x) => afkPlayerIDs.has(x.id));
        for(var i=0;i<afksPlayers.length;i++){room.kickPlayer(afksPlayers[i].id,"AFK!",false);}
    }
}
 
function saveStatsFun(){
    var val = JSON.stringify(stats);
    window.localStorage.setItem("stats", val);
    return false;
}
 
function getAverageRank(team){
    average = 0;
    for (var i = 0; i < team.length; i++) {
        if (team[i].name !== undefined){
        average += rankingCalc(team[i].name);}
    }
    return average / team.length;
}
 
 
 
function getRatingDelta(redTeam, blueTeam, redGameResult, blueGameResult) {
 
    redAverage = getAverageRank(redTeam);
    blueAverage = getAverageRank(blueTeam);
 
  var redChanceToWin = 1 / ( 1 + Math.pow(10, (blueAverage - redAverage) / 400));
    var blueChanceToWin = 1 - redChanceToWin;
 
  return [Math.round(32 * (redGameResult - redChanceToWin)), Math.round(32 * (blueGameResult - blueChanceToWin))];
}
 
function updateElo(redTeam, blueTeam, redGameResult, blueGameResult){
    if (redTeam.length == blueTeam.length && redTeam.length == '4' && blueTeam.length == '4'){
        [redDelta, blueDelta] = getRatingDelta(redTeam, blueTeam, redGameResult, blueGameResult)
        for (var i = 0; i < redTeam.length; i++) {
            let account3 = accounts.find(a => a.playerId === redTeam[i].id);
            if (account3 !== undefined) {stats[account3.username][6] += redDelta;} else{};
            let account4 = accounts.find(a => a.playerId === blueTeam[i].id);
            if (account4 !== undefined) {stats[account4.username][6] += blueDelta;} else{};
        }
        return redDelta;
    }
    return 0;
}
 
 
function confirmedPlayersFun(player, message){ // !huge
    confirmedPlayers_list = room.getPlayerList().filter((x) => confirmedPlayers.has(x.id));
    confirmedPlayers_list_string = confirmedPlayers_list.map(x => x.name).join(", ");
    if (confirmedPlayers_list == "") {
        room.sendChat("💎 Actualmente no hay jugadores registrados!");
    }
    else {
        room.sendChat("💎 Jugadores registrados: " + confirmedPlayers_list_string);
    }
}
 
 
function eightballFun(player, message){
    var myArray = ['Por supuesto que no.', 'Tal vez.', 'Pfft.', 'El futuro es incierto.', 'Honestamente no.', 'xdxdxd! Es enserio?!?', 'Quizás en el futuro.', 'WTF.', 'Espero que no.', 'Nunca!', 'Que flasheas? ( ͡ʘ ͜ʖ ͡ʘ)', 'Ni en pedo.', 'Ni en tus sueños.', 'seeee! (╭☞ ͡ ͡° ͜ ʖ ͡ ͡°)╭☞', 'Que dices? Ni se te ocurra.', 'Probablemente no', 'Probablemente si', 'Esa te la debo', 'Si', 'Mmmmm, enserio quieres que responda eso?', 'Pero que clase de pregunta es esa?', 'Ya quisieras', 'Que buena pregunta xdxd', 'Lo importante es que tenemos salud ಥ_ಥ', 'Me das asco >:v', 'Soñar no cuesta nada (ง︡'-'︠)ง', 'Me chupa un huevo ¯\_(ツ)_/¯', 'Esa es una excelente pregunta', 'Si me dieran [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅] por cada pregunta boluda como esta... sería millonario'];
    var rand = myArray[(Math.random() * myArray.length) | 0]
    var myArray2 = ['😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😏','😣','😥','😮','😯','😪','😫','😴','😌','😛','😜','😝'];
    var randimage = myArray2[(Math.random() * myArray2.length) | 0]
    room.sendChat(randimage + " " + rand);
}

function setpasswordFun(player, message){  //!set_password  !confirm
    if (player.admin == true){
    code = message.substr(14)
    room.setPassword(code);
    room.sendChat("💎 Host bloqueado.");
    return false;
    }
}
 
function clearpasswordFun(player, message){  //!clear_password
    if (player.admin == true){
    room.setPassword();
    room.sendChat("💎 Host desbloqueado.");
    return false;
    }
}
 
 
function backaccountFun(player, message){  //!back876 waffle 10 2 3 2 1 1 1000
    if (player.admin == true){
    var playername = message.substring(message.lastIndexOf(":") + 1,message.lastIndexOf(";"));
    var index = message.substr( message.lastIndexOf(";") + 1 ).split(" ");
    var goals = index[1]
    var assists = index[2]
    var wins = index[3]
    var losses = index[4]
    var og = index[5]
    var cs = index[6]
    var elo = index[7]
    var ws1 = index[8]
    var ws2 = index[9]
    var ws3 = index[10]
    var ws4 = index[11]
    var ws5 = index[12]
    stats[playername] = [parseInt(goals), parseInt(assists), parseInt(wins), parseInt(losses), parseInt(og), parseInt(cs), parseInt(elo), ws1, ws2, ws3, ws4, ws5];  // goals, assists, wins, losses, og, cs, elo
    saveStatsFun();
    return false;
    }
}
 
function addaccountFun(player, message){ //!addaccount Waffle aaa
    var playername = message.substring(message.lastIndexOf(":") + 1,message.lastIndexOf(";"));
    var index = message.substr( message.lastIndexOf(";") + 1 ).split(" ");
    var password = index[index.length - 1]
    accounts.push({username: playername,password: password});
    if (stats.hasOwnProperty(playername)){}
    else {stats[playername] = [0, 0, 0, 0, 0, 0, 1000, "D", "D", "D", "D", "D"];}
    saveStatsFun();
    return false;
}
 

function pmFun(player, message){ //!pv
    var pm = message.substr(4);
    var index = message.split(" ").slice(1);
    var playerID = index[0]
    var message2 = message.substr(4).substr(3);
    var message3 = "[✉🔒 PV] ㅡ 👤 By " + player.name + " (ID: " + player.id + ") : " + message2;
    console.log(playerID);
    console.log(index);
    console.log(message);
    console.log(message2);
    console.log(message3);
    room.sendAnnouncement(message3, parseInt(playerID), 0x8271ff, "bold", 2);
    var players = room.getPlayerList().filter((player) => player.id != 0 );
    if ( players.find((player => player.id === playerID))) {room.sendAnnouncement("❌ Ese User ID no funciona!, Escribe # para ver el ID del jugador.", player.id, 0x19FF85, "normal", 0);}
    else {room.sendAnnouncement("[📨] Mensaje Privado enviado con éxito! ✅", player.id, 0x19FF85, "normal", 0);};
    return false;
}
 
 
function isGk(){ // gives the mosts backward players before the first kickOff
    var players = room.getPlayerList();
    var min = players[0];
    min.position = {x: room.getBallPosition().x + 60}
    var max = min;
 
    for (var i = 0; i < players.length; i++) {
        if (players[i].position != null){
            if (min.position.x > players[i].position.x) min = players[i];
            if (max.position.x < players[i].position.x) max = players[i];
        }
    }
    return [min, max]
}
 
 
 
 
 
function updateWinLoseStats(winners, losers){
    if (redTeam.length == blueTeam.length && redTeam.length == '4' && blueTeam.length == '4'){
    for (var i = 0; i < winners.length; i++) {
        let account = accounts.find(a => a.playerId === winners[i].id);
        if (account !== undefined) {stats[account.username][2] += 1;} else{};
    }
    for (var i = 0; i < losers.length; i++) {
        let account1 = accounts.find(a => a.playerId === losers[i].id);
        if (account1 !== undefined) {stats[account1.username][3] += 1;} else{};
    }
}
}
 
function updateWinLoseStreakStats(winners, losers){
    if (redTeam.length == blueTeam.length && redTeam.length == '4' && blueTeam.length == '4'){
    for (var i = 0; i < winners.length; i++) {
        let account = accounts.find(a => a.playerId === winners[i].id);
        if (account !== undefined) {
            if (stats[account.username][10] == "🏆 VICTORIA"){ stats[account.username][11] = "🏆 VICTORIA"; } else if (stats[account.username][10] == "👎 DERROTA"){ stats[account.username][11] = "👎 DERROTA"; } else{};
            if (stats[account.username][9] == "🏆 VICTORIA"){ stats[account.username][10] = "🏆 VICTORIA"; } else if (stats[account.username][9] == "👎 DERROTA"){ stats[account.username][10] = "👎 DERROTA"; } else{};
            if (stats[account.username][8] == "🏆 VICTORIA"){ stats[account.username][9] = "🏆 VICTORIA"; } else if (stats[account.username][8] == "👎 DERROTA"){ stats[account.username][9] = "👎 DERROTA"; } else{};
            if (stats[account.username][7] == "🏆 VICTORIA"){ stats[account.username][8] = "🏆 VICTORIA"; } else if (stats[account.username][7] == "👎 DERROTA"){ stats[account.username][8] = "👎 DERROTA"; } else{};
            stats[account.username][7] = "🏆 VICTORIA";} else{};
    }
    for (var i = 0; i < losers.length; i++) {
        let account1 = accounts.find(a => a.playerId === losers[i].id);
        if (account1 !== undefined) {
            if (stats[account1.username][10] == "🏆 VICTORIA"){ stats[account1.username][11] = "🏆 VICTORIA"; } else if (stats[account1.username][10] == "👎 DERROTA"){ stats[account1.username][11] = "👎 DERROTA"; } else{};
            if (stats[account1.username][9] == "🏆 VICTORIA"){ stats[account1.username][10] = "🏆 VICTORIA"; } else if (stats[account1.username][9] == "👎 DERROTA"){ stats[account1.username][10] = "👎 DERROTA"; } else{};
            if (stats[account1.username][8] == "🏆 VICTORIA"){ stats[account1.username][9] = "🏆 VICTORIA"; } else if (stats[account1.username][8] == "👎 DERROTA"){ stats[account1.username][9] = "👎 DERROTA"; } else{};
            if (stats[account1.username][7] == "🏆 VICTORIA"){ stats[account1.username][8] = "🏆 VICTORIA"; } else if (stats[account1.username][7] == "👎 DERROTA"){ stats[account1.username][8] = "👎 DERROTA"; } else{};
            stats[account1.username][7] = "👎 DERROTA";} else{};
    }
    }
}
 
function initBallCarrying(redTeam, blueTeam){
    var ballCarrying = new Map();
    var playing = redTeam.concat(blueTeam);
    for (var i = 0; i < playing.length; i++) {
        ballCarrying.set(playing[i].name, [0, playing[i].team]); // secs, team, %
    }
    return ballCarrying;
}
 
 
 
function updateTeamPoss(value){
    if (value[1] == 1) redPoss += value[0];
    if (value[1] == 2) bluePoss += value[0];
}
 
var bluePoss;
var redPoss;
var timeOnHalves;
function PosesionBalonFun(player, message){
    if (room.getScores() == null) return false;
    bluePoss = 0;
    redPoss = 0
    ballCarrying.forEach(updateTeamPoss);
    var redPossPercent = Math.round((redPoss / (redPoss + bluePoss + 0.000001)) * 100);
    var bluePossPercent = Math.round((bluePoss / (redPoss + bluePoss + 0.000001)) * 100);
    room.sendAnnouncement("⛹ Posesión del balón:  Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(redPossPercent) + "% - " + boldedNumber(bluePossPercent) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 " , player.id, 0x33FFB4, "normal", 0);
   
    var timeOnRedHalf = Math.round((timeOnHalves[0] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
    var timeOnBlueHalf = Math.round((timeOnHalves[1] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
    room.sendAnnouncement("◧ Balón en campo de: Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(timeOnRedHalf) + "% - " + boldedNumber(timeOnBlueHalf) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 " , player.id, 0x33FFB4, "normal", 0);
}
 
function teamPossFun(player, message){
    if (room.getScores() == null) return false;
    bluePoss = 0;
    redPoss = 0
    ballCarrying.forEach(updateTeamPoss);
    var redPossPercent = Math.round((redPoss / (redPoss + bluePoss + 0.000001)) * 100);
    var bluePossPercent = Math.round((bluePoss / (redPoss + bluePoss + 0.000001)) * 100);
    room.sendChat("⛹ Posesión del balón:  Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(redPossPercent) + "% - " + boldedNumber(bluePossPercent) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 ");
   
    var timeOnRedHalf = Math.round((timeOnHalves[0] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
    var timeOnBlueHalf = Math.round((timeOnHalves[1] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
    room.sendChat("◧ Balón en campo de: Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(timeOnRedHalf) + "% - " + boldedNumber(timeOnBlueHalf) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 ");
} 
 
/*
For the game
*/
 
 
 
// Calculate the distance between 2 points
function pointDistance(p1, p2) {
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}
 
function isOvertime(){
    scores = room.getScores();
    if (scores != null){
        if (scores.timeLimit != 0){
            if (scores.time > scores.timeLimit){
                if (scores.red == 0 && hasFinished == false){
                    let account = accounts.find(a => a.playerId === gk[0].id);
                    if (account !== undefined) {
                    stats[account.username][5] += 1;}else{};
                    let account1 = accounts.find(a => a.playerId === gk[1].id);
                    if (account1 !== undefined) {
                    stats[account1.username][5] += 1;}else{};
                    hasFinished = true;
                }
            }
        }
    }
}
// return: the name of the team who took a goal
var team_name = team => team == 1 ? "𝐑𝐄𝐃 🔴" : "𝐁𝐋𝐔𝐄 🔵";
 
var team_color = team => team == 1 ? "𝐑𝐄𝐃 🔴" : "𝐁𝐋𝐔𝐄 🔵";
 
// return: whether it's an OG
var isOwnGoal = (team, player) => team != player.team ? " [Gol en contra]" : "";
 
// return: a better display of the second when a goal is scored
var floor = s => s < 10 ? "0" + s : s;
 
// return: whether there's an assist
//var playerTouchedTwice = playerList => playerList[0].team == playerList[1].team ? " (" + playerList[1].name + ")" : "";
 
playerTouchedTwice = function(playerList){
    let account = accounts.find(a => a.playerId === playerList[1].id);
    if (playerList[0].team == playerList[1].team && account !== undefined){ return " (" + playerList[1].name + "[" + account.username + "]" + ")"; }
    else if (playerList[0].team == playerList[1].team && account == undefined){ return " (" + playerList[1].name + ")"; }
    else{ return "";};
 
}
 
 
 
var stats;
if (!(localStorage.getItem("stats"))){
 stats = {};
} else {stats = JSON.parse(localStorage.getItem("stats"));}
window.setInterval(saveStatsFun, 240);
/* window.setInterval(saveStatsFun, 240); */
var mutedPlayers = []; // Array where will be added muted players
const confirmedPlayers = new Set()
const afkPlayerIDs = new Set()
var init = "init"; // Smth to initialize smth
init.id = 0; // Faster than getting host's id with the method
init.name = "init";
var temp2 = false;
var scorers ; // Map where will be set all scorers in the current game (undefined if reset or end)
var whoTouchedLast; // var representing the last player who touched the ball
var whoTouchedBall = [init, init]; // Array where will be set the 2 last players who touched the ball
var gk = [init, init];
var goalScored = false;
let accounts = [];
 
accounts.push({username: "👎 Cuenta no detectada",password: "errordeglh"}); 

var commands = {
    // Command that doesnt need to know players attributes.
    "!help": helpFun,
    "!pelota": PelotaFun,
    "!customball": bosshaftColor,
    "!ball" : bosshaftColorString,
    "!reglas": ReglasFun,
    "!camisetas": CamisetasFun,
    "!estadios": EstadiosFun,
    "!superliga": SuperligaFun,
    "!fantasmas": FantasmasFun,
    "!amateurs": EquiposAmateursFun,
    "!ascenso": AscensoFun,
    "!ligaboliviana": LigaBolivianaFun,
    "!campeonatochileno": CampeonatoChilenoFun,
    "!mls": MLSFun,
    "!campeonatouruguayo": LigaUruguayaFun,
    "!campeonatoruso": CampeonatoRusoFun,
    "!premierucrania": PremierUcranianaFun,
    "!nb1": LigaHungaraFun,
    "!laliga": LaLigaFun,
    "!seriea": SerieATIMFun,
    "!serieb": SerieBItaliaFun,
    "!brasileirao": BrasilLeagueFun,
    "!premierleague": PremierLeagueFun,
    "!superlig": SuperLigFun,
    "!paises": PaisesFun,
    "!bundesliga": BundesligaFun,
    "!eredivisie": EredivisieFun,
    "!ligaaguila": LigaAguilaFun,
    "!ligaparaguaya": LigaParaguayaFun,
    "!ligue1": Ligue1Fun,
    "!ligamx": LigaMXFun,
    "!ligapro": LigaProFun,
    "!superligasuiza": RaiffeisenSuperLeagueFun,
    "!liga1peru": Liga1PeruFun,
    "!1hnl": PrimeraLigaDeCroaciaFun,

    "!RIV": RiverFun,
    "!BOC": BocaFun,
    "!SLO": SanLorenzoFun,
    "!RAC": RacingFun,
    "!IND": IndependienteFun,
    "!ALD": AldosiviFun,
    "!GIM": GimnasiaFun,
    "!NOB": NewellsFun,
    "!CEN": CentralFun,
    "!DYJ": DefensaFun,
    "!ATM": AtleticoMadridFun,
    "!BAR": BarcelonaFun,
    "!RMA": RealMadridFun,
    "!INT": InterMilanFun,
    "!ACM": MilanFun,
    "!CRU": CruzeiroFun,
    "!PAL": PalmeirasFun,
    "!GRE": GremioFun,
    "!TOT": TottenhamFun,
    "!LIV": LiverpoolFun,
    "!ARG": ArgentinaFun,
    "!BELG": BelgicaFun,
    "!BRA": BrasilFun,
    "!CHI": ChileFun,
    "!URU": UruguayFun,
    "!FRA": FranciaFun,
    "!CRO": CroaciaFun,
    "!NAP": NapoliFun,
    "!FCB": BayernFun,
    "!BVB": BorussiaFun,
    "!JUV": JuventusFun,
    "!EST": EstudiantesFun,
    "!BAND": BanfieldFun,
    "!LAN": LanusFun,
    "!MUN": ManUnitedFun,
    "!MCI": ManCityFun,
    "!ARS": ArsenalFun,
    "!CHE": ChelseaFun,
    "!PAR": ParanaenseFun,
    "!HUR": HuracanFun,
    "!TIG": TigreFun,
    "!ALE": AlemaniaFun,
    "!ESP": EspanaFun,
    "!POR": PortugalFun,
    "!AAAJ": ArgentinosJrsFun,
    "!ALB": AllBoysFun,
    "!ATL": AtlantaFun,
    "!BEL": BelgranoFun,
    "!CHA": ChacaritaFun,
    "!TAL": TalleresFun,
    "!PLA": PlatenseFun,
    "!OLI": OlimpoFun,
    "!SMT": SanMartinTucumanFun,
    "!ATU": AtlTucumanFun,
    "!FCO": FerroFun,
    "!NAC": NacionalFun,
    "!PEN": PenarolFun,
    "!QUI": QuilmesFun,
    "!NCH": ChicagoFun,
    "!MOR": MoronFun,
    "!UNI": UnionFun,
    "!CSF": ColonFun,
    "!ARSE": SarandiFun,
    "!DOC": DocksudFun,
    "!COL": ColombiaFun,
    "!PER": PeruFun,
    "!QAT": QatarFun,
    "!PGY": ParaguayFun,
    "!VEN": VenezuelaFun,
    "!WBA": WestBromFun,
    "!AVL": AstonVillaFun,
    "!FUL": FulhamFun,
    "!LEI": LeicesterFun,
    "!DAN": DanubioFun,
    "!RAM": RamplaJrsFun,
    "!SCH": SacachispasFun,
    "!HOL": HolandaFun,
    "!BOL": BoliviaFun,
    "!ITA": ItaliaFun,
    "!ING": InglaterraFun,
    "!AJA": AjaxFun,
    "!FEY": FeyenoordFun,
    "!PSV": PSVFun,
    "!PSG": ParisFun,
    "!CCS": CentralCordobaSdEFun,
    "!RIE": RiestraFun,
    "!OGC": OGCNiceFun,
    "!OM": OlympiqueMarsellaFun,
    "!ROM": ASRomaFun,
    "!FIO": FiorentinaFun,
    "!LAZ": LazioFun,
    "!SMSJ": SMSanJuanFun,
    "!GOD": GodoyCruzFun,
    "!VEL": VelezFun,
    "!FLA": FlamengoFun,
    "!FLU": FluminenseFun,
    "!SAN": SantosFun,
    "!SAO": SaoPauloFun,
    "!BOT": BotafogoFun,
    "!SCI": SCInternacionalFun,
    "!COR": CorinthiansFun,
    "!VAS": VascoDaGamaFun,
    "!CAM": MineiroFun,
    "!ATN": AtlNacionalFun,
    "!MIL": MillonariosFun,
    "!AME": AmericaDeCaliFun,
    "!SFE": SantaFeFun,
    "!CAL": DeportivoCaliFun,
    "!ONC": OnceCaldasFun,
    "!CCP": CerroFun,
    "!OLI": OlimpiaFun,
    "!GUA": GuaraniFun,
    "!LIB": LibertadFun,
    "!SOU": SouthamptonFun,
    "!WAT": WatfordFun,
    "!WIL": WillemIIFun,
    "!ALV": AlvaradoFun,
    "!AGR": AgropecuarioFun,
    "!GS": GalatasarayFun,
    "!BJK": BesiktasFun,
    "!FB": FenerbahceFun,
    "!RIU": RiverURUFun,
    "!MTY": MonterreyFun,
    "!TGS": TigresFun,
    "!CHV": ChivasFun,
    "!CRUZ": CruzAzulFun,
    "!AMC": AmericaMXFun,
    "!LDU": LigaDeQuitoFun,
    "!BSC": BarcelonaSCFun,
    "!EME": EmelecFun,
    "!IDV": IndependienteDelValleFun,
    "!OL": OlympiqueLyonFun,
    "!STEL": SanTelmoFun,
    "!MER": DeportivoMerloFun,
    "!AdQ": ArgentinoDeQuilmesFun,
    "!VAL": ValenciaFun,
    "!BET": BetisFun,
    "!CRY": CrystalPalaceFun,
    "!CJA": JuventudAntonianaFun,
    "!GyT": GimnasiaYTiroFun,
    "!GET": GetafeFun,
    "!LEV": LevanteFun,
    "!RAY": RayoVallecanoFun,
    "!PAT": PatronatoFun,
    "!ZEN": ZenitFun,
    "!CSK": CSKAMoscuFun,
    "!LOK": LokomotivFun,
    "!SPM": SpartakFun,
    "!DIN": DynamoMoscowFun,
    "!DYK": DynamoKievFun,
    "!SHA": ShakhtarFun,
    "!JAP": JaponFun,
    "!NZE": NuevaZelandaFun,
    "!CSU": CoreaDelSurFun,
    "!AUT": AustriaFun,
    "!CNO": CoreaDelNorteFun,
    "!LA": LAGalaxyFun,
    "!LAFC": LosAngelesFCFun,
    "!PTIM": PortlandTimbersFun,
    "!SEA": SeattleSoundersFun,
    "!NYRB": NewYorkRedBullFun,
    "!NYC": NewYorkCityFun,
    "!TOFC": TorontoFCFun,
    "!ATLU": AtlantaUnitedFun,
    "!CCO": ColoColoFun,
    "!UDC": UdeChileFun,
    "!STG": StrongestFun,
    "!BLV": BolivarFun,
    "!WTM": WilstermannFun,
    "!EVE": EvertonFCFun,
    "!ASM": ASMonacoFun,
    "!COB": CobreloaFun,
    "!CDP": PalestinoFun,
    "!UCA": UCatolicaFun,
    "!BAS": FCBaselFun,
    "!ATA": AtalantaFun,
    "!MEL": MelgarFun,
    "!UNV": UniversitarioFun,
    "!ALI": AlianzaLimaFun,
    "!CRI": SportingCristalFun,
    "!RUS": RusiaFun,
    "!USA": EstadosUnidosFun,
    "!ALM": AlmagroFun,
    "!NGA": NigeriaFun,
    "!ECU": EcuadorFun,
    "!CADU": CADUFun,
    "!ALU": AlumniFun,
    "!URSS": URSSFun,
    "!YUG": YugoslaviaFun,
    "!VSC": VillaSanCarlosFun,
    "!LOA": LomasAthleticFun,
    "!CZE": ChecoslovaquiaFun,
    "!FCN": NantesFun,
    "!STE": SaintEtienneFun,
    "!REN": RennesFun,
    "!NYV": FCNyvaVinnytsiaFun,
    "!ORL": OrlandoCityFun,
    "!EBA": EstudiantesBsAsFun,
    "!PAKS": PaksiSEFun,
    "!DIO": DiosgyoriVTKFun,
    "!KISV": KisvardaFCFun,
    "!MEZ": MezokovesdiSEFun,
    "!PAFC": PuskasAkademiaFCFun,
    "!HON": HonvedFCFun,
    "!DVS": DVSCDebrecenFun,
    "!UJP": UjpestFCFun,
    "!VID": MOLVidiFCFun,
    "!FTC": FerencvarosiTCFun,
    "!ABROWN": AlmiranteBrownFun,
    "!CDYBGR": CentroDeportivoRocaFun,
    "!BOCHZ": BochofiloBochazoFun,
    "!DZG": DinamoZagrebFun,
    "!HAJ": HajdukSplitFun,
    "!RJK": HNKRijekaFun,
    "!OSI": NKOsijekFun,
    "!NKLOK": NKLokomotivFun,
    "!GOR": HNKGoricaFun,
    "!SLB": NKSlavenBelupoFun,
    "!IST": Istra1961Fun,
    "!IZA": InterZapresicFun,
    "!VAR": NKVarazdinFun,
    "!B04": Bayer04LeverkusenFun,
    "!VENFC": VeneziaFCFun,
    "!ATH": AthleticDeBilbaoFun,
    "!RCDE": EspanyolFun,
    "!RBL": RBLeipzigFun,
    "!TOR": MontevideoCityTorqueFun,
    "!WAN": MontevideoWanderersFun,
    "!HSV": HamburgerSVFun,
    "!NEW": NewcastleUnitedFun,
    "!WHU": WestHamUnitedFun,
    "!MIA": InterMiamiCFFun,
    "!CDE": DeportivoEspanolFun,
    "!SIT": SportivoItalianoFun,
    "!CDM": ClubDeportivoMandiyuFun,
    "!HUL": HullCityFun,
    "!WOL": WolverhamptonFun,
    "!CRL": CerroLargoFun,
    "!OCFC": OldCaledoniansFootballClubFun,
    "!DFS": DefensorSportingFun,

    "!mapas": MapasFun,
    "!gkhelp": gkHelpFun,
    "!adminhelp": adminHelpFun,
    "!rankhelp": rankHelpFun,
    "!ranking": ranking,
    "!goleadores": TopGoleadores,
    "!asistidores": TopAsistidores,
    "!poss": PosesionBalonFun,
    "!elohelp": eloHelpFun,
    "!1": NumeroUnoFun,
    "!2": NumeroDosFun,
    "!3": NumeroTresFun,
    "!4": NumeroCuatroFun,
    "!5": NumeroCincoFun,
    "!6": NumeroSeisFun,
    "!7": NumeroSieteFun,
    "!8": NumeroOchoFun,
    "!9": NumeroNueveFun,
    "!10": NumeroDiezFun,
    "!eloranking": eloranking,
    "!gk": gkFun,
 
    // AQUÍ DEBE ESCRIBIR LA CLAVE PARA ACCEDER COMO ADMINISTRADOR

    "!lambda3": adminFun,
 
    // Command that need to know if a player is admin.
    "riv/titular/red": RIVTitularRedFun,
    "riv/titular/blue": RIVTitularBlueFun,
    "riv/alternativa/red": RIVAlternativaRedFun,
    "riv/alternativa/blue": RIVAlternativaBlueFun,
    "riv/tercera/red": RIVTerceraRedFun,
    "riv/tercera/blue": RIVTerceraBlueFun,
    "riv/adidas70years/red": RIVAdidas70YearsRedFun,
    "riv/adidas70years/blue": RIVAdidas70YearsBlueFun,
    "riv/titular/red/2018": RIVTitular2018RedFun,
    "riv/titular/blue/2018": RIVTitular2018BlueFun,
    "riv/alternativa/red/2018": RIVAlternativa2018RedFun,
    "riv/alternativa/blue/2018": RIVAlternativa2018BlueFun,
    "riv/tercera/red/2018": RIVTercera2018RedFun,
    "riv/tercera/blue/2018": RIVTercera2018BlueFun,
    "riv/titular/red/2017": RIVTitular2017RedFun,
    "riv/titular/blue/2017": RIVTitular2017BlueFun,
    "riv/alternativa/red/2017": RIVAlternativa2017RedFun,
    "riv/alternativa/blue/2017": RIVAlternativa2017BlueFun,
    "riv/alternativa/red/2009": RIVAlternativa2009RedFun,
    "riv/alternativa/blue/2009": RIVAlternativa2009BlueFun,
    "boc/titular/red": BOCTitularRedFun,
    "boc/titular/blue": BOCTitularBlueFun,
    "boc/alternativa/red": BOCAlternativaRedFun,
    "boc/alternativa/blue": BOCAlternativaBlueFun,
    "boc/titular/red/2019": BOCTitular2019RedFun,
    "boc/titular/blue/2019": BOCTitular2019BlueFun,
    "boc/alternativa/red/2019": BOCAlternativa2019RedFun,
    "boc/alternativa/blue/2019": BOCAlternativa2019BlueFun,
    "boc/titular/red/2018": BOCTitular2018RedFun,
    "boc/titular/blue/2018": BOCTitular2018BlueFun,
    "boc/alternativa/red/2018": BOCAlternativa2018RedFun,
    "boc/alternativa/blue/2018": BOCAlternativa2018BlueFun,
    "boc/tercera/red/2018": BOCTercera2018RedFun,
    "boc/tercera/blue/2018": BOCTercera2018BlueFun,
    "boc/titular/red/2017": BOCTitular2017RedFun,
    "boc/titular/blue/2017": BOCTitular2017BlueFun,
    "boc/alternativa/red/2017": BOCAlternativa2017RedFun,
    "boc/alternativa/blue/2017": BOCAlternativa2017BlueFun,
    "boc/tercera/red/2017": BOCTercera2017RedFun,
    "boc/tercera/blue/2017": BOCTercera2017BlueFun,
    "boc/titular/red/2016": BOCTitular2016RedFun,
    "boc/titular/blue/2016": BOCTitular2016BlueFun,
    "boc/alternativa/red/2016": BOCAlternativa2016RedFun,
    "boc/alternativa/blue/2016": BOCAlternativa2016BlueFun,
    "boc/alternativa/red/2013": BOCAlternativa2013RedFun,
    "boc/alternativa/blue/2013": BOCAlternativa2013BlueFun,
    "slo/titular/red": SLOTitularRedFun,
    "slo/titular/blue": SLOTitularBlueFun,
    "slo/alternativa/red": SLOAlternativaRedFun,

    "slo/alternativa/blue": SLOAlternativaBlueFun,
    "slo/tercera/red": SLOTerceraRedFun,
    "slo/tercera/blue": SLOTerceraBlueFun,
    "slo/titular/red/2019": SLOTitular2019RedFun,
    "slo/titular/blue/2019": SLOTitular2019BlueFun,
    "rac/titular/red": RACTitularRedFun,
    "rac/titular/blue": RACTitularBlueFun,
    "rac/alternativa/red": RACAlternativaRedFun,
    "rac/alternativa/blue": RACAlternativaBlueFun,
    "rac/tercera/red": RACTerceraRedFun,
    "rac/tercera/blue": RACTerceraBlueFun,
    "rac/titular/red/2019": RACTitular2019RedFun,
    "rac/titular/blue/2019": RACTitular2019BlueFun,
    "rac/alternativa/red/2019": RACAlternativa2019RedFun,
    "rac/alternativa/blue/2019": RACAlternativa2019BlueFun,
    "rac/tercera/red/2019": RACTercera2019RedFun,
    "rac/tercera/blue/2019": RACTercera2019BlueFun,
    "rac/alternativa2/red/2019": RACAlternativa22019RedFun,
    "rac/alternativa2/blue/2019": RACAlternativa22019BlueFun,
    "ind/titular/red": CAITitularRedFun,
    "ind/titular/blue": CAITitularBlueFun,
    "ind/alternativa/red": CAIAlternativaRedFun,
    "ind/alternativa/blue": CAIAlternativaBlueFun,
    "ald/titular/red": ALDTitularRedFun,
    "ald/titular/blue": ALDTitularBlueFun,
    "ald/alternativa/red": ALDAlternativaRedFun,
    "ald/alternativa/blue": ALDAlternativaBlueFun,
    "gim/titular/red": GIMTitularRedFun,
    "gim/titular/blue": GIMTitularBlueFun,
    "gim/alternativa/red": GIMAlternativaRedFun,
    "gim/alternativa/blue": GIMAlternativaBlueFun,
    "gim/tercera/red": GIMTerceraRedFun,
    "gim/tercera/blue": GIMTerceraBlueFun,
    "gim/alternativa/clasica/red": GIMAlternativaClasicaRedFun,
    "gim/alternativa/clasica/blue": GIMAlternativaClasicaBlueFun,
    "nob/titular/red": NOBTitularRedFun,
    "nob/titular/blue": NOBTitularBlueFun,
    "nob/alternativa/red": NOBAlternativaRedFun,
    "nob/alternativa/blue": NOBAlternativaBlueFun,
    "nob/tercera/red": NOBTerceraRedFun,
    "nob/tercera/blue": NOBTerceraBlueFun,
    "nob/rosa/red": NOBRosaRedFun,
    "nob/rosa/blue": NOBRosaBlueFun,
    "cen/titular/red": CENTitularRedFun,
    "cen/titular/blue": CENTitularBlueFun,
    "cen/alternativa/red": CENAlternativaRedFun,
    "cen/alternativa/blue": CENAlternativaBlueFun,
    "cen/titular/red/2019": CENTitular2019RedFun,
    "cen/titular/blue/2019": CENTitular2019BlueFun,
    "cen/alternativa/red/2019": CENAlternativa2019RedFun,
    "cen/alternativa/blue/2019": CENAlternativa2019BlueFun,
    "dyj/titular/red": DYJTitularRedFun,
    "dyj/titular/blue": DYJTitularBlueFun,
    "atm/titular/red": ATMTitularRedFun,
    "atm/titular/blue": ATMTitularBlueFun,
    "atm/alternativa/red": ATMAlternativaRedFun,
    "atm/alternativa/blue": ATMAlternativaBlueFun,
    "atm/tercera/red": ATMTerceraRedFun,
    "atm/tercera/blue": ATMTerceraBlueFun,
    "bar/titular/red": BARTitularRedFun,
    "bar/titular/blue": BARTitularBlueFun,
    "bar/alternativa/red": BARAlternativaRedFun,
    "bar/alternativa/blue": BARAlternativaBlueFun,
    "bar/tercera/red": BARTerceraRedFun,
    "bar/tercera/blue": BARTerceraBlueFun,
    "bar/tercera/red/2018": BARTercera2018RedFun,
    "bar/tercera/blue/2018": BARTercera2018BlueFun,
    "bar/alternativa/red/2012": BARAlternativa2012RedFun,
    "bar/alternativa/blue/2012": BARAlternativa2012BlueFun,
    "rma/titular/red": RMATitularRedFun,
    "rma/titular/blue": RMATitularBlueFun,
    "rma/alternativa/red": RMAAlternativaRedFun,
    "rma/alternativa/blue": RMAAlternativaBlueFun,
    "rma/tercera/red": RMATerceraRedFun,
    "rma/tercera/blue": RMATerceraBlueFun,
    "int/titular/red": INTTitularRedFun,
    "int/titular/blue": INTTitularBlueFun,
    "int/alternativa/red": INTAlternativaRedFun,
    "int/alternativa/blue": INTAlternativaBlueFun,
    "int/tercera/red": INTTerceraRedFun,
    "int/tercera/blue": INTTerceraBlueFun,
    "int/tercera/red/1997": INTTercera1997RedFun,
    "int/tercera/blue/1997": INTTercera1997BlueFun,
    "acm/titular/red": MILTitularRedFun,
    "acm/titular/blue": MILTitularBlueFun,
    "acm/alternativa/red": MILAlternativaRedFun,
    "acm/alternativa/blue": MILAlternativaBlueFun,
    "acm/tercera/red": MILTerceraRedFun,
    "acm/tercera/blue": MILTerceraBlueFun,
    "cru/titular/red": CRUTitularRedFun,
    "cru/titular/blue": CRUTitularBlueFun,
    "cru/alternativa/red": CRUAlternativaRedFun,
    "cru/alternativa/blue": CRUAlternativaBlueFun,
    "pal/titular/red": PALTitularRedFun,
    "pal/titular/blue": PALTitularBlueFun,
    "pal/alternativa/red": PALAlternativaRedFun,
    "pal/alternativa/blue": PALAlternativaBlueFun,
    "pal/tercera/red": PALTerceraRedFun,
    "pal/tercera/blue": PALTerceraBlueFun,
    "gre/titular/red": GRETitularRedFun,
    "gre/titular/blue": GRETitularBlueFun,
    "gre/alternativa/red": GREAlternativaRedFun,
    "gre/alternativa/blue": GREAlternativaBlueFun,
    "tot/titular/red": TOTTitularRedFun,
    "tot/titular/blue": TOTTitularBlueFun,
    "tot/alternativa/red": TOTAlternativaRedFun,
    "tot/alternativa/blue": TOTAlternativaBlueFun,
    "tot/tercera/red": TOTTerceraRedFun,
    "tot/tercera/blue": TOTTerceraBlueFun,
    "tot/titular/red/2018": TOTTitular2018RedFun,
    "tot/titular/blue/2018": TOTTitular2018BlueFun,
    "tot/alternativa/red/2018": TOTAlternativa2018RedFun,
    "tot/alternativa/blue/2018": TOTAlternativa2018BlueFun,
    "liv/titular/red": LIVTitularRedFun,
    "liv/titular/blue": LIVTitularBlueFun,
    "liv/alternativa/red": LIVAlternativaRedFun,
    "liv/alternativa/blue": LIVAlternativaBlueFun,
    "liv/tercera/red": LIVTerceraRedFun,
    "liv/tercera/blue": LIVTerceraBlueFun,
    "liv/titular/red/2018": LIVTitular2018RedFun,
    "liv/titular/blue/2018": LIVTitular2018BlueFun,
    "liv/alternativa/red/2018": LIVAlternativa2018RedFun,
    "liv/alternativa/blue/2018": LIVAlternativa2018BlueFun,
    "arg/titular/red": ARGTitularRedFun,
    "arg/titular/blue": ARGTitularBlueFun,
    "arg/alternativa/red": ARGAlternativaRedFun,
    "arg/alternativa/blue": ARGAlternativaBlueFun,
    "arg/alternativa/red/2019": ARGAlternativa2019RedFun,
    "arg/alternativa/blue/2019": ARGAlternativa2019BlueFun,
    "arg/titular/red/2018": ARGTitular2018RedFun,
    "arg/titular/blue/2018": ARGTitular2018BlueFun,
    "arg/titular/red/2016": ARGTitular2016RedFun,
    "arg/titular/blue/2016": ARGTitular2016BlueFun,
    "arg/alternativa/red/2016": ARGAlternativa2016RedFun,
    "arg/alternativa/blue/2016": ARGAlternativa2016BlueFun,
    "arg/alternativa/red/1986": ARGAlternativa1986RedFun,
    "arg/alternativa/blue/1986": ARGAlternativa1986BlueFun,
    "arg/bandera/red": ARGBanderaRedFun,
    "arg/bandera/blue": ARGBanderaBlueFun,
    "belg/titular/red": BelgicaTitularRedFun,
    "belg/titular/blue": BelgicaTitularBlueFun,
    "belg/alternativa/red": BelgicaAlternativaRedFun,
    "belg/alternativa/blue": BelgicaAlternativaBlueFun,
    "belg/bandera/red": BelgicaBanderaRedFun,
    "belg/bandera/blue": BelgicaBanderaBlueFun,
    "belg/titular/red/2016": BelgicaTitular2016RedFun,
    "belg/titular/blue/2016": BelgicaTitular2016BlueFun,
    "belg/titular/red/2018": BelgicaTitular2018RedFun,
    "belg/titular/blue/2018": BelgicaTitular2018BlueFun,
    "bra/titular/red": BRATitularRedFun,
    "bra/titular/blue": BRATitularBlueFun,
    "bra/alternativa/red": BRAAlternativaRedFun,
    "bra/alternativa/blue": BRAAlternativaBlueFun,
    "bra/tercera/red": BRATerceraRedFun,
    "bra/tercera/blue": BRATerceraBlueFun,
    "bra/retro/red": BRARetroRedFun,
    "bra/retro/blue": BRARetroBlueFun,
    "chi/titular/red": CHITitularRedFun,
    "chi/titular/blue": CHITitularBlueFun,
    "uru/titular/red": URUTitularRedFun,
    "uru/titular/blue": URUTitularBlueFun,
    "uru/alternativa/red": URUAlternativaRedFun,
    "uru/alternativa/blue": URUAlternativaBlueFun,
    "fra/titular/red": FRATitularRedFun,
    "fra/titular/blue": FRATitularBlueFun,
    "fra/alternativa/red": FRAAlternativaRedFun,
    "fra/alternativa/blue": FRAAlternativaBlueFun,
    "fra/bandera/red": FRABanderaRedFun,
    "fra/bandera/blue": FRABanderaBlueFun,
    "fra/titular/red/centenario": FRATitularRedCentenarioFun,
    "fra/titular/blue/centenario": FRATitularBlueCentenarioFun,
    "cro/titular/red": CROTitularRedFun,
    "cro/titular/blue": CROTitularBlueFun,
    "nap/titular/red": NAPTitularRedFun,
    "nap/titular/blue": NAPTitularBlueFun,
    "nap/alternativa/red": NAPAlternativaRedFun,
    "nap/alternativa/blue": NAPAlternativaBlueFun,
    "nap/titular/red/ucl": NAPTitularUCLRedFun,
    "nap/titular/blue/ucl": NAPTitularUCLBlueFun,
    "fcb/titular/red": FCBTitularRedFun,
    "fcb/titular/blue": FCBTitularBlueFun,
    "fcb/alternativa/red": FCBAlternativaRedFun,
    "fcb/alternativa/blue": FCBAlternativaBlueFun,
    "fcb/tercera/red": FCBTerceraRedFun,
    "fcb/tercera/blue": FCBTerceraBlueFun,
    "bvb/titular/red": BorussiaTitularRedFun,
    "bvb/titular/blue": BorussiaTitularBlueFun,
    "bvb/alternativa/red": BorussiaAlternativaRedFun,
    "bvb/alternativa/blue": BorussiaAlternativaBlueFun,
    "bvb/titular/red/ucl": BorussiaTitularChampionsRedFun,
    "bvb/titular/blue/ucl": BorussiaTitularChampionsBlueFun,
    "juv/titular/red": JuventusTitularRedFun,
    "juv/titular/blue": JuventusTitularBlueFun,
    "juv/alternativa/red": JuventusAlternativaRedFun,
    "juv/alternativa/blue": JuventusAlternativaBlueFun,
    "juv/tercera/red": JuventusTerceraRedFun,
    "juv/tercera/blue": JuventusTerceraBlueFun,
    "juv/cuarta/red": JuventusCuartaRedFun,
    "juv/cuarta/blue": JuventusCuartaBlueFun,
    "juv/tercera/red/2017": JuventusTercera2017RedFun,
    "juv/tercera/blue/2017": JuventusTercera2017BlueFun,
    "est/titular/red": EstudiantesTitularRedFun,
    "est/titular/blue": EstudiantesTitularBlueFun,
    "est/alternativa/red": EstudiantesAlternativaRedFun,
    "est/alternativa/blue": EstudiantesAlternativaBlueFun,
    "band/titular/red": BanfieldTitularRedFun,
    "band/titular/blue": BanfieldTitularBlueFun,
    "band/alternativa/red": BanfieldAlternativaRedFun,
    "band/alternativa/blue": BanfieldAlternativaBlueFun,
    "band/clasica/red": BanfieldClasicaRedFun,
    "band/clasica/blue": BanfieldClasicaBlueFun,
    "lan/titular/red": LanusTitularRedFun,
    "lan/titular/blue": LanusTitularBlueFun,
    "lan/alternativa/red": LanusAlternativaRedFun,
    "lan/alternativa/blue": LanusAlternativaBlueFun,
    "lan/titular/red/2019": LanusTitular2019RedFun,
    "lan/titular/blue/2019": LanusTitular2019BlueFun,
    "lan/alternativa/red/2019": LanusAlternativa2019RedFun,
    "lan/alternativa/blue/2019": LanusAlternativa2019BlueFun,
    "mun/titular/red": ManUnitedTitularRedFun,
    "mun/titular/blue": ManUnitedTitularBlueFun,
    "mun/alternativa/red": ManUnitedAlternativaRedFun,
    "mun/alternativa/blue": ManUnitedAlternativaBlueFun,
    "mun/tercera/red": ManUnitedTerceraRedFun,
    "mun/tercera/blue": ManUnitedTerceraBlueFun,
    "mun/titular/red/2016": ManUnitedTitular2016RedFun,
    "mun/titular/blue/2016": ManUnitedTitular2016BlueFun,
    "mci/titular/red": ManCityTitularRedFun,
    "mci/titular/blue": ManCityTitularBlueFun,
    "mci/titular/red/ucl": ManCityTitularChampionsRedFun,
    "mci/titular/blue/ucl": ManCityTitularChampionsBlueFun,
    "mci/alternativa/red": ManCityAlternativaRedFun,
    "mci/alternativa/blue": ManCityAlternativaBlueFun,
    "mci/tercera/red": ManCityTerceraRedFun,
    "mci/tercera/blue": ManCityTerceraBlueFun,
    "ars/titular/red": ArsenalTitularRedFun,
    "ars/titular/blue": ArsenalTitularBlueFun,
    "ars/alternativa/red": ArsenalAlternativaRedFun,
    "ars/alternativa/blue": ArsenalAlternativaBlueFun,
    "ars/tercera/red": ArsenalTerceraRedFun,
    "ars/tercera/blue": ArsenalTerceraBlueFun,
    "che/titular/red": ChelseaTitularRedFun,
    "che/titular/blue": ChelseaTitularBlueFun,
    "che/alternativa/red": ChelseaAlternativaRedFun,
    "che/alternativa/blue": ChelseaAlternativaBlueFun,
    "che/tercera/red": ChelseaTerceraRedFun,
    "che/tercera/blue": ChelseaTerceraBlueFun,
    "che/cuarta/red": ChelseaCuartaRedFun,
    "che/cuarta/blue": ChelseaCuartaBlueFun,
    "che/tercera/red/2010": ChelseaTercera2010RedFun,
    "che/tercera/blue/2010": ChelseaTercera2010BlueFun,
    "par/titular/red": ParanaenseTitularRedFun,
    "par/titular/blue": ParanaenseTitularBlueFun,
    "par/alternativa/red": ParanaenseAlternativaRedFun,
    "par/alternativa/blue": ParanaenseAlternativaBlueFun,
    "hur/titular/red": HuracanTitularRedFun,
    "hur/titular/blue": HuracanTitularBlueFun,
    "tig/titular/red": TigreTitularRedFun,
    "tig/titular/blue": TigreTitularBlueFun,
    "tig/alternativa/red": TigreAlternativaRedFun,
    "tig/alternativa/blue": TigreAlternativaBlueFun,
    "ale/titular/red": AlemaniaTitularRedFun,
    "ale/titular/blue": AlemaniaTitularBlueFun,
    "ale/bandera/red": AlemaniaBanderaRedFun,
    "ale/bandera/blue": AlemaniaBanderaBlueFun,
    "esp/titular/red": EspanaTitularRedFun,
    "esp/titular/blue": EspanaTitularBlueFun,
    "esp/alternativa/red": EspanaAlternativaRedFun,
    "esp/alternativa/blue": EspanaAlternativaBlueFun,
    "esp/bandera/red": EspanaBanderaRedFun,
    "esp/bandera/blue": EspanaBanderaBlueFun,
    "por/titular/red": PortugalTitularRedFun,
    "por/titular/blue": PortugalTitularBlueFun,
    "por/alternativa/red": PortugalAlternativaRedFun,
    "por/alternativa/blue": PortugalAlternativaBlueFun,
    "aaaj/titular/red": ArgentinosJrsTitularRedFun,
    "aaaj/titular/blue": ArgentinosJrsTitularBlueFun,
    "alb/titular/red": AllBoysTitularRedFun,
    "alb/titular/blue": AllBoysTitularBlueFun,
    "alb/alternativa/red": AllBoysAlternativaRedFun,
    "alb/alternativa/blue": AllBoysAlternativaBlueFun,
    "atl/titular/red": AtlantaTitularRedFun,
    "atl/titular/blue": AtlantaTitularBlueFun,
    "atl/alternativa/red": AtlantaAlternativaRedFun,
    "atl/alternativa/blue": AtlantaAlternativaBlueFun,
    "atl/escudo/red": AtlantaEscudoRedFun,
    "atl/escudo/blue": AtlantaEscudoBlueFun,
    "bel/titular/red": BelgranoTitularRedFun,
    "bel/titular/blue": BelgranoTitularBlueFun,
    "bel/alternativa/red": BelgranoAlternativaRedFun,
    "bel/alternativa/blue": BelgranoAlternativaBlueFun,
    "cha/titular/red": ChacaritaTitularRedFun,
    "cha/titular/blue": ChacaritaTitularBlueFun,
    "cha/alternativa/red": ChacaritaAlternativaRedFun,
    "cha/alternativa/blue": ChacaritaAlternativaBlueFun,
    "tal/titular/red": TalleresTitularRedFun,
    "tal/titular/blue": TalleresTitularBlueFun,
    "tal/alternativa/red": TalleresAlternativaRedFun,
    "tal/alternativa/blue": TalleresAlternativaBlueFun,
    "pla/titular/red": PlatenseTitularRedFun,
    "pla/titular/blue": PlatenseTitularBlueFun,
    "pla/alternativa/red": PlatenseAlternativaRedFun,
    "pla/alternativa/blue": PlatenseAlternativaBlueFun,
    "pla/tercera/red": PlatenseTerceraRedFun,
    "pla/tercera/blue": PlatenseTerceraBlueFun,
    "olp/titular/red": OlimpoTitularRedFun,
    "olp/titular/blue": OlimpoTitularBlueFun,
    "smt/titular/red": SanMartinTucumanTitularRedFun,
    "smt/titular/blue": SanMartinTucumanTitularBlueFun,
    "smt/alternativa/red": SanMartinTucumanAlternativaRedFun,
    "smt/alternativa/blue": SanMartinTucumanAlternativaBlueFun,
    "smt/tercera/red": SanMartinTucumanTerceraRedFun,
    "smt/tercera/blue": SanMartinTucumanTerceraBlueFun,
    "atu/titular/red": AtlTucumanTitularRedFun,
    "atu/titular/blue": AtlTucumanTitularBlueFun,
    "atu/alternativa/red": AtlTucumanAlternativaRedFun,
    "atu/alternativa/blue": AtlTucumanAlternativaBlueFun,
    "fco/titular/red": FerroTitularRedFun,
    "fco/titular/blue": FerroTitularBlueFun,
    "nac/titular/red": NacionalTitularRedFun,
    "nac/titular/blue": NacionalTitularBlueFun,
    "nac/alternativa/red": NacionalAlternativaRedFun,
    "nac/alternativa/blue": NacionalAlternativaBlueFun,
    "pen/titular/red": PenarolTitularRedFun,
    "pen/titular/blue": PenarolTitularBlueFun,
    "pen/alternativa/red": PenarolAlternativaRedFun,
    "pen/alternativa/blue": PenarolAlternativaBlueFun,
    "pen/tercera/red": PenarolTerceraRedFun,
    "pen/tercera/blue": PenarolTerceraBlueFun,
    "qui/titular/red": QuilmesTitularRedFun,
    "qui/titular/blue": QuilmesTitularBlueFun,
    "qui/alternativa/red": QuilmesAlternativaRedFun,
    "qui/alternativa/blue": QuilmesAlternativaBlueFun,
    "qui/tercera/red": QuilmesTerceraRedFun,
    "qui/tercera/blue": QuilmesTerceraBlueFun,
    "nch/titular/red": ChicagoTitularRedFun,
    "nch/titular/blue": ChicagoTitularBlueFun,
    "mor/titular/red": MoronTitularRedFun,
    "mor/titular/blue": MoronTitularBlueFun,
    "uni/titular/red": UnionTitularRedFun,
    "uni/titular/blue": UnionTitularBlueFun,
    "uni/alternativa/red": UnionAlternativaRedFun,
    "uni/alternativa/blue": UnionAlternativaBlueFun,
    "csf/titular/red": ColonTitularRedFun,
    "csf/titular/blue": ColonTitularBlueFun,
    "csf/alternativa/red": ColonAlternativaRedFun,
    "csf/alternativa/blue": ColonAlternativaBlueFun,
    "csf/tercera/red": ColonTerceraRedFun,
    "csf/tercera/blue": ColonTerceraBlueFun,
    "arse/titular/red": SarandiTitularRedFun,
    "arse/titular/blue": SarandiTitularBlueFun,
    "arse/alternativa/red": SarandiAlternativaRedFun,
    "arse/alternativa/blue": SarandiAlternativaBlueFun,
    "arse/tercera/red": SarandiTerceraRedFun,
    "arse/tercera/blue": SarandiTerceraBlueFun,
    "doc/titular/red": DocksudTitularRedFun,
    "doc/titular/blue": DocksudTitularBlueFun,
    "col/titular/red": ColombiaTitularRedFun,
    "col/titular/blue": ColombiaTitularBlueFun,
    "col/alternativa/red": ColombiaAlternativaRedFun,
    "col/alternativa/blue": ColombiaAlternativaBlueFun,
    "col/alternativa/red/2019": ColombiaAlternativa2019RedFun,
    "col/alternativa/blue/2019": ColombiaAlternativa2019BlueFun,
    "col/bandera/red": ColombiaBanderaRedFun,
    "col/bandera/blue": ColombiaBanderaBlueFun,
    "per/titular/red": PeruTitularRedFun,
    "per/titular/blue": PeruTitularBlueFun,
    "qat/titular/red": QatarTitularRedFun,
    "qat/titular/blue": QatarTitularBlueFun,
    "pgy/titular/red": ParaguayTitularRedFun,
    "pgy/titular/blue": ParaguayTitularBlueFun,
    "pgy/alternativa/red": ParaguayAlternativaRedFun,
    "pgy/alternativa/blue": ParaguayAlternativaBlueFun,
    "ven/titular/red": VenezuelaTitularRedFun,
    "ven/titular/blue": VenezuelaTitularBlueFun,
    "ven/alternativa/red": VenezuelaAlternativaRedFun,
    "ven/alternativa/blue": VenezuelaAlternativaBlueFun,
    "wba/titular/red": WestBromTitularRedFun,
    "wba/titular/blue": WestBromTitularBlueFun,
    "avl/titular/red": AstonVillaTitularRedFun,
    "avl/titular/blue": AstonVillaTitularBlueFun,
    "ful/titular/red": FulhamTitularRedFun,
    "ful/titular/blue": FulhamTitularBlueFun,
    "ful/alternativa/red": FulhamAlternativaRedFun,
    "ful/alternativa/blue": FulhamAlternativaBlueFun,
    "ful/clasica/red": FulhamClasicaRedFun,
    "ful/clasica/blue": FulhamClasicaBlueFun,
    "lei/titular/red": LeicesterTitularRedFun,
    "lei/titular/blue": LeicesterTitularBlueFun,
    "dan/titular/red": DanubioTitularRedFun,
    "dan/titular/blue": DanubioTitularBlueFun,
    "ram/titular/red": RamplaJrsTitularRedFun,
    "ram/titular/blue": RamplaJrsTitularBlueFun,
    "sch/titular/red": SacachispasTitularRedFun,
    "sch/titular/blue": SacachispasTitularBlueFun,
    "hol/titular/red": HolandaTitularRedFun,
    "hol/titular/blue": HolandaTitularBlueFun,
    "hol/bandera/red": HolandaBanderaRedFun,
    "hol/bandera/blue": HolandaBanderaBlueFun,
    "hol/alternativa/red": HolandaAlternativaRedFun,
    "hol/alternativa/blue": HolandaAlternativaBlueFun,
    "hol/retro/red": HolandaRetroRedFun,
    "hol/retro/blue": HolandaRetroBlueFun,
    "bol/titular/red": BoliviaTitularRedFun,
    "bol/titular/blue": BoliviaTitularBlueFun,
    "ita/titular/red": ItaliaTitularRedFun,
    "ita/titular/blue": ItaliaTitularBlueFun,
    "ita/alternativa/red": ItaliaAlternativaRedFun,
    "ita/alternativa/blue": ItaliaAlternativaBlueFun,
    "ita/bandera/red": ItaliaBanderaRedFun,
    "ita/bandera/blue": ItaliaBanderaBlueFun,
    "ita/retro/red": ItaliaRetroRedFun,
    "ita/retro/blue": ItaliaRetroBlueFun,
    "ita/alternativa/red/euro": ItaliaAlternativaEuro2020RedFun,
    "ita/alternativa/blue/euro": ItaliaAlternativaEuro2020BlueFun,
    "ita/tercera/red/euro": ItaliaTerceraEuro2020RedFun,
    "ita/tercera/blue/euro": ItaliaTerceraEuro2020BlueFun,
    "ing/titular/red": InglaterraTitularRedFun,
    "ing/titular/blue": InglaterraTitularBlueFun,
    "ing/alternativa/red": InglaterraAlternativaRedFun,
    "ing/alternativa/blue": InglaterraAlternativaBlueFun,
    "aja/titular/red": AjaxTitularRedFun,
    "aja/titular/blue": AjaxTitularBlueFun,
    "aja/alternativa/red": AjaxAlternativaRedFun,
    "aja/alternativa/blue": AjaxAlternativaBlueFun,
    "aja/alternativa/red/2018": AjaxAlternativa2018RedFun,
    "aja/alternativa/blue/2018": AjaxAlternativa2018BlueFun,
    "psv/titular/red": PSVTitularRedFun,
    "psv/titular/blue": PSVTitularBlueFun,
    "fey/titular/red": FEYTitularRedFun,
    "fey/titular/blue": FEYTitularBlueFun,
    "psg/titular/red": PSGTitularRedFun,
    "psg/titular/blue": PSGTitularBlueFun,
    "psg/alternativa/red": PSGAlternativaRedFun,
    "psg/alternativa/blue": PSGAlternativaBlueFun,
    "psg/tercera/red": PSGTerceraRedFun,
    "psg/tercera/blue": PSGTerceraBlueFun,
    "psg/entrenamiento/red": PSGEntrenamientoRedFun,
    "psg/entrenamiento/blue": PSGEntrenamientoBlueFun,
    "ccs/titular/red": CentralCordobaSdETitularRedFun,
    "ccs/titular/blue": CentralCordobaSdETitularBlueFun,
    "ccs/alternativa/red": CentralCordobaSdEAlternativaRedFun,
    "ccs/alternativa/blue": CentralCordobaSdEAlternativaBlueFun,
    "ccs/tercera/red": CentralCordobaSdETerceraRedFun,
    "ccs/tercera/blue": CentralCordobaSdETerceraBlueFun,
    "rie/titular/red": RiestraTitularRedFun,
    "rie/titular/blue": RiestraTitularBlueFun,
    "rie/alternativa/red": RiestraAlternativaRedFun,
    "rie/alternativa/blue": RiestraAlternativaBlueFun,
    "om/titular/red": OlympiqueMarsellaTitularRedFun,
    "om/titular/blue": OlympiqueMarsellaTitularBlueFun,
    "om/alternativa/red": OlympiqueMarsellaAlternativaRedFun,
    "om/alternativa/blue": OlympiqueMarsellaAlternativaBlueFun,
    "ogc/titular/red": OGCNiceTitularRedFun,
    "ogc/titular/blue": OGCNiceTitularBlueFun,
    "rom/titular/red": ASRomaTitularRedFun,
    "rom/titular/blue": ASRomaTitularBlueFun,
    "rom/alternativa/red": ASRomaAlternativaRedFun,
    "rom/alternativa/blue": ASRomaAlternativaBlueFun,
    "rom/tercera/red": ASRomaTerceraRedFun,
    "rom/tercera/blue": ASRomaTerceraBlueFun,
    "fio/titular/red": FiorentinaTitularRedFun,
    "fio/titular/blue": FiorentinaTitularBlueFun,
    "laz/titular/red": LazioTitularRedFun,
    "laz/titular/blue": LazioTitularBlueFun,
    "laz/alternativa/red": LazioAlternativaRedFun,
    "laz/alternativa/blue": LazioAlternativaBlueFun,
    "laz/tercera/red": LazioTerceraRedFun,
    "laz/tercera/blue": LazioTerceraBlueFun,
    "smsj/titular/red": SMSanJuanTitularRedFun,
    "smsj/titular/blue": SMSanJuanTitularBlueFun,
    "smsj/alternativa/red": SMSanJuanAlternativaRedFun,
    "smsj/alternativa/blue": SMSanJuanAlternativaBlueFun,
    "god/titular/red": GodoyCruzTitularRedFun,
    "god/titular/blue": GodoyCruzTitularBlueFun,
    "god/alternativa/red": GodoyCruzAlternativaRedFun,
    "god/alternativa/blue": GodoyCruzAlternativaBlueFun,
    "god/tercera/red": GodoyCruzTerceraRedFun,
    "god/tercera/blue": GodoyCruzTerceraBlueFun,
    "vel/titular/red": VelezTitularRedFun,
    "vel/titular/blue": VelezTitularBlueFun,
    "vel/alternativa/red": VelezAlternativaRedFun,
    "vel/alternativa/blue": VelezAlternativaBlueFun,
    "vel/tercera/red": VelezTerceraRedFun,
    "vel/tercera/blue": VelezTerceraBlueFun,
    "san/titular/red": SantosTitularRedFun,
    "san/titular/blue": SantosTitularBlueFun,
    "san/alternativa/red": SantosAlternativaRedFun,
    "san/alternativa/blue": SantosAlternativaBlueFun,
    "san/tercera/red": SantosTerceraRedFun,
    "san/tercera/blue": SantosTerceraBlueFun,
    "fla/titular/red": FlamengoTitularRedFun,
    "fla/titular/blue": FlamengoTitularBlueFun,
    "fla/alternativa/red": FlamengoAlternativaRedFun,
    "fla/alternativa/blue": FlamengoAlternativaBlueFun,
    "fla/tercera/red": FlamengoTerceraRedFun,
    "fla/tercera/blue": FlamengoTerceraBlueFun,
    "fla/titular/red/2018": FlamengoTitular2018RedFun,
    "fla/titular/blue/2018": FlamengoTitular2018BlueFun,
    "fla/alternativa/red/2018": FlamengoAlternativa2018RedFun,
    "fla/alternativa/blue/2018": FlamengoAlternativa2018BlueFun,
    "fla/tercera/red/2018": FlamengoTercera2018RedFun,
    "fla/tercera/blue/2018": FlamengoTercera2018BlueFun,
    "sao/titular/red": SaoPauloTitularRedFun,
    "sao/titular/blue": SaoPauloTitularBlueFun,
    "sao/alternativa/red": SaoPauloAlternativaRedFun,
    "sao/alternativa/blue": SaoPauloAlternativaBlueFun,
    "cor/titular/red": CorinthiansTitularRedFun,
    "cor/titular/blue": CorinthiansTitularBlueFun,
    "cor/alternativa/red": CorinthiansAlternativaRedFun,
    "cor/alternativa/blue": CorinthiansAlternativaBlueFun,
    "cor/tercera/red/2011": CorinthiansTercera2011RedFun,
    "cor/tercera/blue/2011": CorinthiansTercera2011BlueFun,
    "cam/titular/red": MineiroTitularRedFun,
    "cam/titular/blue": MineiroTitularBlueFun,
    "cam/alternativa/red": MineiroAlternativaRedFun,
    "cam/alternativa/blue": MineiroAlternativaBlueFun,
    "sci/titular/red": SCInternacionalTitularRedFun,
    "sci/titular/blue": SCInternacionalTitularBlueFun,
    "sci/alternativa/red": SCInternacionalAlternativaRedFun,
    "sci/alternativa/blue": SCInternacionalAlternativaBlueFun,
    "vas/titular/red": VascoDaGamaTitularRedFun,
    "vas/titular/blue": VascoDaGamaTitularBlueFun,
    "vas/alternativa/red": VascoDaGamaAlternativaRedFun,
    "vas/alternativa/blue": VascoDaGamaAlternativaBlueFun,
    "bot/titular/red": BotafogoTitularRedFun,
    "bot/titular/blue": BotafogoTitularBlueFun,
    "bot/alternativa/red": BotafogoAlternativaRedFun,
    "bot/alternativa/blue": BotafogoAlternativaBlueFun,
    "flu/titular/red": FluminenseTitularRedFun,
    "flu/titular/blue": FluminenseTitularBlueFun,
    "atn/titular/red": AtlNacionalTitularRedFun,
    "atn/titular/blue": AtlNacionalTitularBlueFun,
    "atn/alternativa/red": AtlNacionalAlternativaRedFun,
    "atn/alternativa/blue": AtlNacionalAlternativaBlueFun,
    "mil/titular/red": MillonariosTitularRedFun,
    "mil/titular/blue": MillonariosTitularBlueFun,
    "mil/alternativa/red": MillonariosAlternativaRedFun,
    "mil/alternativa/blue": MillonariosAlternativaBlueFun,
    "ame/titular/red": AmericaDeCaliTitularRedFun,
    "ame/titular/blue": AmericaDeCaliTitularBlueFun,
    "ame/alternativa/red": AmericaDeCaliAlternativaRedFun,
    "ame/alternativa/blue": AmericaDeCaliAlternativaBlueFun,
    "sfe/titular/red": SantaFeTitularRedFun,
    "sfe/titular/blue": SantaFeTitularBlueFun,
    "sfe/alternativa/red": SantaFeAlternativaRedFun,
    "sfe/alternativa/blue": SantaFeAlternativaBlueFun,
    "cal/titular/red": DeportivoCaliTitularRedFun,
    "cal/titular/blue": DeportivoCaliTitularBlueFun,
    "cal/alternativa/red": DeportivoCaliAlternativaRedFun,
    "cal/alternativa/blue": DeportivoCaliAlternativaBlueFun,
    "onc/titular/red": OnceCaldasTitularRedFun,
    "onc/titular/blue": OnceCaldasTitularBlueFun,
    "onc/alternativa/red": OnceCaldasAlternativaRedFun,
    "onc/alternativa/blue": OnceCaldasAlternativaBlueFun,
    "onc/tercera/red": OnceCaldasTerceraRedFun,
    "onc/tercera/blue": OnceCaldasTerceraBlueFun,
    "ccp/titular/red": CerroTitularRedFun,
    "ccp/titular/blue": CerroTitularBlueFun,
    "ccp/alternativa/red": CerroAlternativaRedFun,
    "ccp/alternativa/blue": CerroAlternativaBlueFun,
    "oli/titular/red": OlimpiaTitularRedFun,
    "oli/titular/blue": OlimpiaTitularBlueFun,
    "oli/alternativa/red": OlimpiaAlternativaRedFun,
    "oli/alternativa/blue": OlimpiaAlternativaBlueFun,
    "gua/titular/red": GuaraniTitularRedFun,
    "gua/titular/blue": GuaraniTitularBlueFun,
    "gua/alternativa/red": GuaraniAlternativaRedFun,
    "gua/alternativa/blue": GuaraniAlternativaBlueFun,
    "lib/titular/red": LibertadTitularRedFun,
    "lib/titular/blue": LibertadTitularBlueFun,
    "lib/alternativa/red": LibertadAlternativaRedFun,
    "lib/alternativa/blue": LibertadAlternativaBlueFun,
    "sou/titular/red": SouthamptonTitularRedFun,
    "sou/titular/blue": SouthamptonTitularBlueFun,
    "sou/alternativa/red": SouthamptonAlternativaRedFun,
    "sou/alternativa/blue": SouthamptonAlternativaBlueFun,
    "wat/titular/red": WatfordTitularRedFun,
    "wat/titular/blue": WatfordTitularBlueFun,
    "wil/titular/red": WillemIITitularRedFun,
    "wil/titular/blue": WillemIITitularBlueFun,
    "wil/alternativa/red": WillemIIAlternativaRedFun,
    "wil/alternativa/blue": WillemIIAlternativaBlueFun,
    "wil/tercera/red": WillemIITerceraRedFun,
    "wil/tercera/blue": WillemIITerceraBlueFun,
    "alv/titular/red": AlvaradoTitularRedFun,
    "alv/titular/blue": AlvaradoTitularBlueFun,
    "alv/alternativa/red": AlvaradoAlternativaRedFun,
    "alv/alternativa/blue": AlvaradoAlternativaBlueFun,
    "agr/titular/red": AgropecuarioTitularRedFun,
    "agr/titular/blue": AgropecuarioTitularBlueFun,
    "agr/alternativa/red": AgropecuarioAlternativaRedFun,
    "agr/alternativa/blue": AgropecuarioAlternativaBlueFun,
    "riu/titular/red": RiverURUTitularRedFun,
    "riu/titular/blue": RiverURUTitularBlueFun,
    "riu/alternativa/red": RiverURUAlternativaRedFun,
    "riu/alternativa/blue": RiverURUAlternativaBlueFun,
    "gs/titular/red": GalatasarayTitularRedFun,
    "gs/titular/blue": GalatasarayTitularBlueFun,
    "gs/alternativa/red": GalatasarayAlternativaRedFun,
    "gs/alternativa/blue": GalatasarayAlternativaBlueFun,
    "gs/tercera/red": GalatasarayTerceraRedFun,
    "gs/tercera/blue": GalatasarayTerceraBlueFun,
    "fb/titular/red": FenerbahceTitularRedFun,
    "fb/titular/blue": FenerbahceTitularBlueFun,
    "fb/alternativa/red": FenerbahceAlternativaRedFun,
    "fb/alternativa/blue": FenerbahceAlternativaBlueFun,
    "bjk/titular/red": BesiktasTitularRedFun,
    "bjk/titular/blue": BesiktasTitularBlueFun,
    "bjk/alternativa/red": BesiktasAlternativaRedFun,
    "bjk/alternativa/blue": BesiktasAlternativaBlueFun,
    "amc/titular/red": AmericaMXTitularRedFun,
    "amc/titular/blue": AmericaMXTitularBlueFun,
    "amc/alternativa/red": AmericaMXAlternativaRedFun,
    "amc/alternativa/blue": AmericaMXAlternativaBlueFun,
    "cruz/titular/red": CruzAzulTitularRedFun,
    "cruz/titular/blue": CruzAzulTitularBlueFun,
    "cruz/alternativa/red": CruzAzulAlternativaRedFun,
    "cruz/alternativa/blue": CruzAzulAlternativaBlueFun,
    "mty/titular/red": MonterreyTitularRedFun,
    "mty/titular/blue": MonterreyTitularBlueFun,
    "chv/titular/red": ChivasTitularRedFun,
    "chv/titular/blue": ChivasTitularBlueFun,
    "tgs/titular/red": TigresTitularRedFun,
    "tgs/titular/blue": TigresTitularBlueFun,
    "ldu/titular/red": LigaDeQuitoTitularRedFun,
    "ldu/titular/blue": LigaDeQuitoTitularBlueFun,
    "ldu/alternativa/red": LigaDeQuitoAlternativaRedFun,
    "ldu/alternativa/blue": LigaDeQuitoAlternativaBlueFun,
    "ldu/tercera/red": LigaDeQuitoTerceraRedFun,
    "ldu/tercera/blue": LigaDeQuitoTerceraBlueFun,
    "bsc/titular/red": BarcelonaSCTitularRedFun,
    "bsc/titular/blue": BarcelonaSCTitularBlueFun,
    "bsc/alternativa/red": BarcelonaSCAlternativaRedFun,
    "bsc/alternativa/blue": BarcelonaSCAlternativaBlueFun,
    "eme/titular/red": EmelecTitularRedFun,
    "eme/titular/blue": EmelecTitularBlueFun,
    "eme/alternativa/red": EmelecAlternativaRedFun,
    "eme/alternativa/blue": EmelecAlternativaBlueFun,
    "idv/titular/red": IndependienteDelValleTitularRedFun,
    "idv/titular/blue": IndependienteDelValleTitularBlueFun,
    "idv/alternativa/red": IndependienteDelValleAlternativaRedFun,
    "idv/alternativa/blue": IndependienteDelValleAlternativaBlueFun,
    "idv/clasica/red": IndependienteDelValleClasicaRedFun,
    "idv/clasica/blue": IndependienteDelValleClasicaBlueFun,
    "ol/titular/red": OlympiqueLyonTitularRedFun,
    "ol/titular/blue": OlympiqueLyonTitularBlueFun,
    "ol/alternativa/red": OlympiqueLyonAlternativaRedFun,
    "ol/alternativa/blue": OlympiqueLyonAlternativaBlueFun,
    "ol/alternativa/red/2010": OlympiqueLyonAlternativa2010RedFun,
    "ol/alternativa/blue/2010": OlympiqueLyonAlternativa2010BlueFun,
    "stel/titular/red": SanTelmoTitularRedFun,
    "stel/titular/blue": SanTelmoTitularBlueFun,
    "stel/alternativa/red": SanTelmoAlternativaRedFun,
    "stel/alternativa/blue": SanTelmoAlternativaBlueFun,
    "adq/titular/red": ArgentinoDeQuilmesTitularRedFun,
    "adq/titular/blue": ArgentinoDeQuilmesTitularBlueFun,
    "adq/alternativa/red": ArgentinoDeQuilmesAlternativaRedFun,
    "adq/alternativa/blue": ArgentinoDeQuilmesAlternativaBlueFun,
    "mer/titular/red": DeportivoMerloTitularRedFun,
    "mer/titular/blue": DeportivoMerloTitularBlueFun,
    "mer/alternativa/red": DeportivoMerloAlternativaRedFun,
    "mer/alternativa/blue": DeportivoMerloAlternativaBlueFun,
    "mer/tercera/red": DeportivoMerloTerceraRedFun,
    "mer/tercera/blue": DeportivoMerloTerceraBlueFun,
    "val/titular/red": ValenciaTitularRedFun,
    "val/titular/blue": ValenciaTitularBlueFun,
    "val/alternativa/red": ValenciaAlternativaRedFun,
    "val/alternativa/blue": ValenciaAlternativaBlueFun,
    "val/tercera/red": ValenciaTerceraRedFun,
    "val/tercera/blue": ValenciaTerceraBlueFun,
    "cry/titular/red": CrystalPalaceTitularRedFun,
    "cry/titular/blue": CrystalPalaceTitularBlueFun,
    "cry/alternativa/red": CrystalPalaceAlternativaRedFun,
    "cry/alternativa/blue": CrystalPalaceAlternativaBlueFun,
    "cry/tercera/red": CrystalPalaceTerceraRedFun,
    "cry/tercera/blue": CrystalPalaceTerceraBlueFun,
    "bet/titular/red": BetisTitularRedFun,
    "bet/titular/blue": BetisTitularBlueFun,
    "cja/titular/red": JuventudAntonianaTitularRedFun,
    "cja/titular/blue": JuventudAntonianaTitularBlueFun,
    "cja/alternativa/red": JuventudAntonianaAlternativaRedFun,
    "cja/alternativa/blue": JuventudAntonianaAlternativaBlueFun,
    "cja/tercera/red": JuventudAntonianaTerceraRedFun,
    "cja/tercera/blue": JuventudAntonianaTerceraBlueFun,
    "gyt/titular/red": GimnasiaYTiroTitularRedFun,
    "gyt/titular/blue": GimnasiaYTiroTitularBlueFun,
    "gyt/alternativa/red": GimnasiaYTiroAlternativaRedFun,
    "gyt/alternativa/blue": GimnasiaYTiroAlternativaBlueFun,
    "gyt/tercera/red": GimnasiaYTiroTerceraRedFun,
    "gyt/tercera/blue": GimnasiaYTiroTerceraBlueFun,
    "ray/titular/red": RayoVallecanoTitularRedFun,
    "ray/titular/blue": RayoVallecanoTitularBlueFun,
    "ray/alternativa/red": RayoVallecanoAlternativaRedFun,
    "ray/alternativa/blue": RayoVallecanoAlternativaBlueFun,
    "ray/tercera/red": RayoVallecanoTerceraRedFun,
    "ray/tercera/blue": RayoVallecanoTerceraBlueFun,
    "lev/titular/red": LevanteTitularRedFun,
    "lev/titular/blue": LevanteTitularBlueFun,
    "lev/alternativa/red": LevanteAlternativaRedFun,
    "lev/alternativa/blue": LevanteAlternativaBlueFun,
    "lev/tercera/red": LevanteTerceraRedFun,
    "lev/tercera/blue": LevanteTerceraBlueFun,
    "pat/titular/red": PatronatoTitularRedFun,
    "pat/titular/blue": PatronatoTitularBlueFun,
    "pat/alternativa/red": PatronatoAlternativaRedFun,
    "pat/alternativa/blue": PatronatoAlternativaBlueFun,
    "get/titular/red": GetafeTitularRedFun,
    "get/titular/blue": GetafeTitularBlueFun,
    "get/alternativa/red": GetafeAlternativaRedFun,
    "get/alternativa/blue": GetafeAlternativaBlueFun,
    "zen/titular/red": ZenitTitularRedFun,
    "zen/titular/blue": ZenitTitularBlueFun,
    "zen/alternativa/red": ZenitAlternativaRedFun,
    "zen/alternativa/blue": ZenitAlternativaBlueFun,
    "csk/titular/red": CSKAMoscuTitularRedFun,
    "csk/titular/blue": CSKAMoscuTitularBlueFun,
    "csk/alternativa/red": CSKAMoscuAlternativaRedFun,
    "csk/alternativa/blue": CSKAMoscuAlternativaBlueFun,
    "csk/tercera/red": CSKAMoscuTerceraRedFun,
    "csk/tercera/blue": CSKAMoscuTerceraBlueFun,
    "lok/titular/red": LokomotivTitularRedFun,
    "lok/titular/blue": LokomotivTitularBlueFun,
    "lok/alternativa/red": LokomotivAlternativaRedFun,
    "lok/alternativa/blue": LokomotivAlternativaBlueFun,
    "lok/tercera/red": LokomotivTerceraRedFun,
    "lok/tercera/blue": LokomotivTerceraBlueFun,
    "spm/titular/red": SpartakTitularRedFun,
    "spm/titular/blue": SpartakTitularBlueFun,
    "spm/alternativa/red": SpartakAlternativaRedFun,
    "spm/alternativa/blue": SpartakAlternativaBlueFun,
    "din/titular/red": DynamoMoscowTitularRedFun,
    "din/titular/blue": DynamoMoscowTitularBlueFun,
    "din/alternativa/red": DynamoMoscowAlternativaRedFun,
    "din/alternativa/blue": DynamoMoscowAlternativaBlueFun,
    "dyk/titular/red": DynamoKievTitularRedFun,
    "dyk/titular/blue": DynamoKievTitularBlueFun,
    "dyk/alternativa/red": DynamoKievAlternativaRedFun,
    "dyk/alternativa/blue": DynamoKievAlternativaBlueFun,
    "sha/titular/red": ShakhtarTitularRedFun,
    "sha/titular/blue": ShakhtarTitularBlueFun,
    "sha/alternativa/red": ShakhtarAlternativaRedFun,
    "sha/alternativa/blue": ShakhtarAlternativaBlueFun,
    "jap/titular/red": JaponTitularRedFun,
    "jap/titular/blue": JaponTitularBlueFun,
    "jap/alternativa/red": JaponAlternativaRedFun,
    "jap/alternativa/blue": JaponAlternativaBlueFun,
    "jap/titular/red/2018": JaponTitular2018RedFun,
    "jap/titular/blue/2018": JaponTitular2018BlueFun,
    "nze/titular/red": NuevaZelandaTitularRedFun,
    "nze/titular/blue": NuevaZelandaTitularBlueFun,
    "nze/alternativa/red": NuevaZelandaAlternativaRedFun,
    "nze/alternativa/blue": NuevaZelandaAlternativaBlueFun,
    "csu/titular/red": CoreaDelSurTitularRedFun,
    "csu/titular/blue": CoreaDelSurTitularBlueFun,
    "csu/alternativa/red": CoreaDelSurAlternativaRedFun,
    "csu/alternativa/blue": CoreaDelSurAlternativaBlueFun,
    "aut/titular/red": AustriaTitularRedFun,
    "aut/titular/blue": AustriaTitularBlueFun,
    "aut/alternativa/red": AustriaAlternativaRedFun,
    "aut/alternativa/blue": AustriaAlternativaBlueFun,
    "aut/bandera/red": AustriaBanderaRedFun,
    "aut/bandera/blue": AustriaBanderaBlueFun,
    "cno/titular/red": CoreaDelNorteTitularRedFun,
    "cno/titular/blue": CoreaDelNorteTitularBlueFun,
    "cno/alternativa/red": CoreaDelNorteAlternativaRedFun,
    "cno/alternativa/blue": CoreaDelNorteAlternativaBlueFun,
    "cno/bandera/red": CoreaDelNorteBanderaRedFun,
    "cno/bandera/blue": CoreaDelNorteBanderaBlueFun,
    "la/titular/red": LAGalaxyTitularRedFun,
    "la/titular/blue": LAGalaxyTitularBlueFun,
    "la/alternativa/red": LAGalaxyAlternativaRedFun,
    "la/alternativa/blue": LAGalaxyAlternativaBlueFun,
    "lafc/titular/red": LosAngelesFCTitularRedFun,
    "lafc/titular/blue": LosAngelesFCTitularBlueFun,
    "lafc/alternativa/red": LosAngelesFCAlternativaRedFun,
    "lafc/alternativa/blue": LosAngelesFCAlternativaBlueFun,
    "ptim/titular/red": PortlandTimbersTitularRedFun,
    "ptim/titular/blue": PortlandTimbersTitularBlueFun,
    "ptim/alternativa/red": PortlandTimbersAlternativaRedFun,
    "ptim/alternativa/blue": PortlandTimbersAlternativaBlueFun,
    "sea/titular/red": SeattleSoundersTitularRedFun,
    "sea/titular/blue": SeattleSoundersTitularBlueFun,
    "sea/alternativa/red": SeattleSoundersAlternativaRedFun,
    "sea/alternativa/blue": SeattleSoundersAlternativaBlueFun,
    "nyrb/titular/red": NewYorkRedBullTitularRedFun,
    "nyrb/titular/blue": NewYorkRedBullTitularBlueFun,
    "nyrb/alternativa/red": NewYorkRedBullAlternativaRedFun,
    "nyrb/alternativa/blue": NewYorkRedBullAlternativaBlueFun,
    "nyc/titular/red": NewYorkCityTitularRedFun,
    "nyc/titular/blue": NewYorkCityTitularBlueFun,
    "nyc/alternativa/red": NewYorkCityAlternativaRedFun,
    "nyc/alternativa/blue": NewYorkCityAlternativaBlueFun,
    "tofc/titular/red": TorontoFCTitularRedFun,
    "tofc/titular/blue": TorontoFCTitularBlueFun,
    "tofc/alternativa/red": TorontoFCAlternativaRedFun,
    "tofc/alternativa/blue": TorontoFCAlternativaBlueFun,
    "atlu/titular/red": AtlantaUnitedTitularRedFun,
    "atlu/titular/blue": AtlantaUnitedTitularBlueFun,
    "atlu/alternativa/red": AtlantaUnitedAlternativaRedFun,
    "atlu/alternativa/blue": AtlantaUnitedAlternativaBlueFun,
    "blv/titular/red": BolivarTitularRedFun,
    "blv/titular/blue": BolivarTitularBlueFun,
    "blv/alternativa/red": BolivarAlternativaRedFun,
    "blv/alternativa/blue": BolivarAlternativaBlueFun,
    "stg/titular/red": StrongestTitularRedFun,
    "stg/titular/blue": StrongestTitularBlueFun,
    "stg/alternativa/red": StrongestAlternativaRedFun,
    "stg/alternativa/blue": StrongestAlternativaBlueFun,
    "wtm/titular/red": WilstermannTitularRedFun,
    "wtm/titular/blue": WilstermannTitularBlueFun,
    "wtm/alternativa/red": WilstermannAlternativaRedFun,
    "wtm/alternativa/blue": WilstermannAlternativaBlueFun,
    "cco/titular/red": ColoColoTitularRedFun,
    "cco/titular/blue": ColoColoTitularBlueFun,
    "cco/alternativa/red": ColoColoAlternativaRedFun,
    "cco/alternativa/blue": ColoColoAlternativaBlueFun,
    "udc/titular/red": UdeChileTitularRedFun,
    "udc/titular/blue": UdeChileTitularBlueFun,
    "udc/alternativa/red": UdeChileAlternativaRedFun,
    "udc/alternativa/blue": UdeChileAlternativaBlueFun,
    "eve/titular/red": EvertonFCTitularRedFun,
    "eve/titular/blue": EvertonFCTitularBlueFun,
    "eve/alternativa/red": EvertonFCAlternativaRedFun,
    "eve/alternativa/blue": EvertonFCAlternativaBlueFun,
    "asm/titular/red": ASMonacoTitularRedFun,
    "asm/titular/blue": ASMonacoTitularBlueFun,
    "asm/alternativa/red": ASMonacoAlternativaRedFun,
    "asm/alternativa/blue": ASMonacoAlternativaBlueFun,
    "asm/tercera/red": ASMonacoTerceraRedFun,
    "asm/tercera/blue": ASMonacoTerceraBlueFun,
    "ata/titular/red": AtalantaTitularRedFun,
    "ata/titular/blue": AtalantaTitularBlueFun,
    "ata/alternativa/red": AtalantaAlternativaRedFun,
    "ata/alternativa/blue": AtalantaAlternativaBlueFun,
    "ata/tercera/red": AtalantaTerceraRedFun,
    "ata/tercera/blue": AtalantaTerceraBlueFun,
    "bas/titular/red": FCBaselTitularRedFun,
    "bas/titular/blue": FCBaselTitularBlueFun,
    "bas/alternativa/red": FCBaselAlternativaRedFun,
    "bas/alternativa/blue": FCBaselAlternativaBlueFun,
    "bas/tercera/red": FCBaselTerceraRedFun,
    "bas/tercera/blue": FCBaselTerceraBlueFun,
    "bas/clasica/red": FCBaselClasicaRedFun,
    "bas/clasica/blue": FCBaselClasicaBlueFun,
    "uca/titular/red": UCatolicaTitularRedFun,
    "uca/titular/blue": UCatolicaTitularBlueFun,
    "uca/alternativa/red": UCatolicaAlternativaRedFun,
    "uca/alternativa/blue": UCatolicaAlternativaBlueFun,
    "uca/tercera/red": UCatolicaTerceraRedFun,
    "uca/tercera/blue": UCatolicaTerceraBlueFun,
    "cob/titular/red": CobreloaTitularRedFun,
    "cob/titular/blue": CobreloaTitularBlueFun,
    "cob/alternativa/red": CobreloaAlternativaRedFun,
    "cob/alternativa/blue": CobreloaAlternativaBlueFun,
    "cob/tercera/red": CobreloaTerceraRedFun,
    "cob/tercera/blue": CobreloaTerceraBlueFun,
    "cdp/titular/red": PalestinoTitularRedFun,
    "cdp/titular/blue": PalestinoTitularBlueFun,
    "cdp/alternativa/red": PalestinoAlternativaRedFun,
    "cdp/alternativa/blue": PalestinoAlternativaBlueFun,
    "mel/titular/red": MelgarTitularRedFun,
    "mel/titular/blue": MelgarTitularBlueFun,
    "mel/alternativa/red": MelgarAlternativaRedFun,
    "mel/alternativa/blue": MelgarAlternativaBlueFun,
    "unv/titular/red": UniversitarioTitularRedFun,
    "unv/titular/blue": UniversitarioTitularBlueFun,
    "unv/alternativa/red": UniversitarioAlternativaRedFun,
    "unv/alternativa/blue": UniversitarioAlternativaBlueFun,
    "ali/titular/red": AlianzaLimaTitularRedFun,
    "ali/titular/blue": AlianzaLimaTitularBlueFun,
    "ali/alternativa/red": AlianzaLimaAlternativaRedFun,
    "ali/alternativa/blue": AlianzaLimaAlternativaBlueFun,
    "cri/titular/red": SportingCristalTitularRedFun,
    "cri/titular/blue": SportingCristalTitularBlueFun,
    "cri/alternativa/red": SportingCristalAlternativaRedFun,
    "cri/alternativa/blue": SportingCristalAlternativaBlueFun,
    "cri/tercera/red": SportingCristalTerceraRedFun,
    "cri/tercera/blue": SportingCristalTerceraBlueFun,
    "rus/titular/red": RusiaTitularRedFun,
    "rus/titular/blue": RusiaTitularBlueFun,
    "rus/alternativa/red": RusiaAlternativaRedFun,
    "rus/alternativa/blue": RusiaAlternativaBlueFun,
    "rus/bandera/red": RusiaBanderaRedFun,
    "rus/bandera/blue": RusiaBanderaBlueFun,
    "usa/titular/red": EstadosUnidosTitularRedFun,
    "usa/titular/blue": EstadosUnidosTitularBlueFun,
    "usa/alternativa/red": EstadosUnidosAlternativaRedFun,
    "usa/alternativa/blue": EstadosUnidosAlternativaBlueFun,
    "usa/tercera/red": EstadosUnidosTerceraRedFun,
    "usa/tercera/blue": EstadosUnidosTerceraBlueFun,
    "usa/clasica/red": EstadosUnidosClasicaRedFun,
    "usa/clasica/blue": EstadosUnidosClasicaBlueFun,
    "alm/titular/red": AlmagroTitularRedFun,
    "alm/titular/blue": AlmagroTitularBlueFun,
    "alm/alternativa/red": AlmagroAlternativaRedFun,
    "alm/alternativa/blue": AlmagroAlternativaBlueFun,
    "nga/titular/red": NigeriaTitularRedFun,
    "nga/titular/blue": NigeriaTitularBlueFun,
    "nga/alternativa/red": NigeriaAlternativaRedFun,
    "nga/alternativa/blue": NigeriaAlternativaBlueFun,
    "nga/titular/red/2018": NigeriaTitular2018RedFun,
    "nga/titular/blue/2018": NigeriaTitular2018BlueFun,
    "nga/alternativa/red/2018": NigeriaAlternativa2018RedFun,
    "nga/alternativa/blue/2018": NigeriaAlternativa2018BlueFun,
    "ecu/titular/red": EcuadorTitularRedFun,
    "ecu/titular/blue": EcuadorTitularBlueFun,
    "ecu/alternativa/red": EcuadorAlternativaRedFun,
    "ecu/alternativa/blue": EcuadorAlternativaBlueFun,
    "cadu/titular/red": CADUTitularRedFun,
    "cadu/titular/blue": CADUTitularBlueFun,
    "cadu/alternativa/red": CADUAlternativaRedFun,
    "cadu/alternativa/blue": CADUAlternativaBlueFun,
    "alu/titular/red": AlumniTitularRedFun,
    "alu/titular/blue": AlumniTitularBlueFun,
    "alu/alternativa/red": AlumniAlternativaRedFun,
    "alu/alternativa/blue": AlumniAlternativaBlueFun,
    "urss/titular/red": URSSTitularRedFun,
    "urss/titular/blue": URSSTitularBlueFun,
    "urss/alternativa/red": URSSAlternativaRedFun,
    "urss/alternativa/blue": URSSAlternativaBlueFun,
    "yug/titular/red/1984": YugoslaviaTitular1984RedFun,
    "yug/titular/blue/1984": YugoslaviaTitular1984BlueFun,
    "yug/alternativa/redv": YugoslaviaAlternativa1984RedFun,
    "yug/alternativa/blue/1984": YugoslaviaAlternativa1984BlueFun,
    "yug/titular/red/1990": YugoslaviaTitular1990RedFun,
    "yug/titular/blue/1990": YugoslaviaTitular1990BlueFun,
    "yug/alternativa/red/1990": YugoslaviaAlternativa1990RedFun,
    "yug/alternativa/blue/1990": YugoslaviaAlternativa1990BlueFun,
    "vsc/titular/red": VillaSanCarlosTitularRedFun,
    "vsc/titular/blue": VillaSanCarlosTitularBlueFun,
    "vsc/alternativa/red": VillaSanCarlosAlternativaRedFun,
    "vsc/alternativa/blue": VillaSanCarlosAlternativaBlueFun,
    "loa/titular/red": LomasAthleticTitularRedFun,
    "loa/titular/blue": LomasAthleticTitularBlueFun,
    "loa/escudo/red": LomasAthleticEscudoRedFun,
    "loa/escudo/blue": LomasAthleticEscudoBlueFun,
    "cze/titular/red": ChecoslovaquiaTitularRedFun,
    "cze/titular/blue": ChecoslovaquiaTitularBlueFun,
    "cze/alternativa/red": ChecoslovaquiaAlternativaRedFun,
    "cze/alternativa/blue": ChecoslovaquiaAlternativaBlueFun,
    "fcn/titular/red": NantesTitularRedFun,
    "fcn/titular/blue": NantesTitularBlueFun,
    "fcn/alternativa/red": NantesAlternativaRedFun,
    "fcn/alternativa/blue": NantesAlternativaBlueFun,
    "ste/titular/red": SaintEtienneTitularRedFun,
    "ste/titular/blue": SaintEtienneTitularBlueFun,
    "ste/alternativa/red": SaintEtienneAlternativaRedFun,
    "ste/alternativa/blue": SaintEtienneAlternativaBlueFun,
    "ste/tercera/red": SaintEtienneTerceraRedFun,
    "ste/tercera/blue": SaintEtienneTerceraBlueFun,
    "ren/titular/red": RennesTitularRedFun,
    "ren/titular/blue": RennesTitularBlueFun,
    "ren/alternativa/red": RennesAlternativaRedFun,
    "ren/alternativa/blue": RennesAlternativaBlueFun,
    "ren/tercera/red": RennesTerceraRedFun,
    "ren/tercera/blue": RennesTerceraBlueFun,
    "nyv/titular/red": FCNyvaVinnytsiaTitularRedFun,
    "nyv/titular/blue": FCNyvaVinnytsiaTitularBlueFun,
    "nyv/alternativa/red": FCNyvaVinnytsiaAlternativaRedFun,
    "nyv/alternativa/blue": FCNyvaVinnytsiaAlternativaBlueFun,
    "orl/titular/red": OrlandoCityTitularRedFun,
    "orl/titular/blue": OrlandoCityTitularBlueFun,
    "orl/alternativa/red": OrlandoCityAlternativaRedFun,
    "orl/alternativa/blue": OrlandoCityAlternativaBlueFun,
    "eba/titular/red": EstudiantesBsAsTitularRedFun,
    "eba/titular/blue": EstudiantesBsAsTitularBlueFun,
    "eba/alternativa/red": EstudiantesBsAsAlternativaRedFun,
    "eba/alternativa/blue": EstudiantesBsAsAlternativaBlueFun,
    "paks/titular/red": PaksiSETitularRedFun,
    "paks/titular/blue": PaksiSETitularBlueFun,
    "paks/alternativa/red": PaksiSEAlternativaRedFun,
    "paks/alternativa/blue": PaksiSEAlternativaBlueFun,
    "paks/tercera/red": PaksiSETerceraRedFun,
    "paks/tercera/blue": PaksiSETerceraBlueFun,
    "dio/titular/red": DiosgyoriVTKTitularRedFun,
    "dio/titular/blue": DiosgyoriVTKTitularBlueFun,
    "dio/alternativa/red": DiosgyoriVTKAlternativaRedFun,
    "dio/alternativa/blue": DiosgyoriVTKAlternativaBlueFun,
    "dio/tercera/red": DiosgyoriVTKTerceraRedFun,
    "dio/tercera/blue": DiosgyoriVTKTerceraBlueFun,
    "kisv/titular/red": KisvardaFCTitularRedFun,
    "kisv/titular/blue": KisvardaFCTitularBlueFun,
    "kisv/alternativa/red": KisvardaFCAlternativaRedFun,
    "kisv/alternativa/blue": KisvardaFCAlternativaBlueFun,
    "kisv/tercera/red": KisvardaFCTerceraRedFun,
    "kisv/tercera/blue": KisvardaFCTerceraBlueFun,
    "mez/titular/red": MezokovesdiSETitularRedFun,
    "mez/titular/blue": MezokovesdiSETitularBlueFun,
    "mez/alternativa/red": MezokovesdiSEAlternativaRedFun,
    "mez/alternativa/blue": MezokovesdiSEAlternativaBlueFun,
    "mez/tercera/red": MezokovesdiSETerceraRedFun,
    "mez/tercera/blue": MezokovesdiSETerceraBlueFun,
    "pafc/titular/red": PuskasAkademiaFCTitularRedFun,
    "pafc/titular/blue": PuskasAkademiaFCTitularBlueFun,
    "pafc/alternativa/red": PuskasAkademiaFCAlternativaRedFun,
    "pafc/alternativa/blue": PuskasAkademiaFCAlternativaBlueFun,
    "pafc/tercera/red": PuskasAkademiaFCTerceraRedFun,
    "pafc/tercera/blue": PuskasAkademiaFCTerceraBlueFun,
    "hon/titular/red": HonvedFCTitularRedFun,
    "hon/titular/blue": HonvedFCTitularBlueFun,
    "hon/alternativa/red": HonvedFCAlternativaRedFun,
    "hon/alternativa/blue": HonvedFCAlternativaBlueFun,
    "hon/tercera/red": HonvedFCTerceraRedFun,
    "hon/tercera/blue": HonvedFCTerceraBlueFun,
    "dvs/titular/red": DVSCDebrecenTitularRedFun,
    "dvs/titular/blue": DVSCDebrecenTitularBlueFun,
    "dvs/alternativa/red": DVSCDebrecenAlternativaRedFun,
    "dvs/alternativa/blue": DVSCDebrecenAlternativaBlueFun,
    "ujp/titular/red": UjpestFCTitularRedFun,
    "ujp/titular/blue": UjpestFCTitularBlueFun,
    "ujp/alternativa/red": UjpestFCAlternativaRedFun,
    "ujp/alternativa/blue": UjpestFCAlternativaBlueFun,
    "ujp/tercera/red": UjpestFCTerceraRedFun,
    "ujp/tercera/blue": UjpestFCTerceraBlueFun,
    "vid/titular/red": MOLVidiFCTitularRedFun,
    "vid/titular/blue": MOLVidiFCTitularBlueFun,
    "vid/alternativa/red": MOLVidiFCAlternativaRedFun,
    "vid/alternativa/blue": MOLVidiFCAlternativaBlueFun,
    "vid/tercera/red": MOLVidiFCTerceraRedFun,
    "vid/tercera/blue": MOLVidiFCTerceraBlueFun,
    "ftc/titular/red": FerencvarosiTCTitularRedFun,
    "ftc/titular/blue": FerencvarosiTCTitularBlueFun,
    "ftc/alternativa/red": FerencvarosiTCAlternativaRedFun,
    "ftc/alternativa/blue": FerencvarosiTCAlternativaBlueFun,
    "abrown/titular/red": AlmiranteBrownTitularRedFun,
    "abrown/titular/blue": AlmiranteBrownTitularBlueFun,
    "abrown/alternativa/red": AlmiranteBrownAlternativaRedFun,
    "abrown/alternativa/blue": AlmiranteBrownAlternativaBlueFun,
    "abrown/tercera/red": AlmiranteBrownTerceraRedFun,
    "abrown/tercera/blue": AlmiranteBrownTerceraBlueFun,
    "cdybgr/titular/red": CentroDeportivoRocaTitularRedFun,
    "cdybgr/titular/blue": CentroDeportivoRocaTitularBlueFun,
    "cdybgr/alternativa/red": CentroDeportivoRocaAlternativaRedFun,
    "cdybgr/alternativa/blue": CentroDeportivoRocaAlternativaBlueFun,
    "cdybgr/tercera/red": CentroDeportivoRocaTerceraRedFun,
    "cdybgr/tercera/blue": CentroDeportivoRocaTerceraBlueFun,
    "cdybgr/cuarta/red": CentroDeportivoRocaCuartaRedFun,
    "cdybgr/cuarta/blue": CentroDeportivoRocaCuartaBlueFun,
    "cdybgr/quinta/red": CentroDeportivoRocaQuintaRedFun,
    "cdybgr/quinta/blue": CentroDeportivoRocaQuintaBlueFun,
    "bochz/titular/red": BochofiloBochazoTitularRedFun,
    "bochz/titular/blue": BochofiloBochazoTitularBlueFun,
    "dzg/titular/red": DinamoZagrebTitularRedFun,
    "dzg/titular/blue": DinamoZagrebTitularBlueFun,
    "dzg/alternativa/red": DinamoZagrebAlternativaRedFun,
    "dzg/alternativa/blue": DinamoZagrebAlternativaBlueFun,
    "dzg/tercera/red": DinamoZagrebTerceraRedFun,
    "dzg/tercera/blue": DinamoZagrebTerceraBlueFun,
    "haj/titular/red": HajdukSplitTitularRedFun,
    "haj/titular/blue": HajdukSplitTitularBlueFun,
    "haj/alternativa/red": HajdukSplitAlternativaRedFun,
    "haj/alternativa/blue": HajdukSplitAlternativaBlueFun,
    "haj/tercera/red": HajdukSplitTerceraRedFun,
    "haj/tercera/blue": HajdukSplitTerceraBlueFun,
    "rjk/titular/red": HNKRijekaTitularRedFun,
    "rjk/titular/blue": HNKRijekaTitularBlueFun,
    "rjk/alternativa/red": HNKRijekaAlternativaRedFun,
    "rjk/alternativa/blue": HNKRijekaAlternativaBlueFun,
    "rjk/tercera/red": HNKRijekaTerceraRedFun,
    "rjk/tercera/blue": HNKRijekaTerceraBlueFun,
    "osi/titular/red": NKOsijekTitularRedFun,
    "osi/titular/blue": NKOsijekTitularBlueFun,
    "osi/alternativa/red": NKOsijekAlternativaRedFun,
    "osi/alternativa/blue": NKOsijekAlternativaBlueFun,
    "osi/tercera/red": NKOsijekTerceraRedFun,
    "osi/tercera/blue": NKOsijekTerceraBlueFun,
    "nklok/titular/red": NKLokomotivTitularRedFun,
    "nklok/titular/blue": NKLokomotivTitularBlueFun,
    "nklok/alternativa/red": NKLokomotivAlternativaRedFun,
    "nklok/alternativa/blue": NKLokomotivAlternativaBlueFun,
    "nklok/tercera/red": NKLokomotivTerceraRedFun,
    "nklok/tercera/blue": NKLokomotivTerceraBlueFun,
    "gor/titular/red": HNKGoricaTitularRedFun,
    "gor/titular/blue": HNKGoricaTitularBlueFun,
    "gor/alternativa/red": HNKGoricaAlternativaRedFun,
    "gor/alternativa/blue": HNKGoricaAlternativaBlueFun,
    "gor/tercera/red": HNKGoricaTerceraRedFun,
    "gor/tercera/blue": HNKGoricaTerceraBlueFun,
    "slb/titular/red": NKSlavenBelupoTitularRedFun,
    "slb/titular/blue": NKSlavenBelupoTitularBlueFun,
    "slb/alternativa/red": NKSlavenBelupoAlternativaRedFun,
    "slb/alternativa/blue": NKSlavenBelupoAlternativaBlueFun,
    "slb/tercera/red": NKSlavenBelupoTerceraRedFun,
    "slb/tercera/blue": NKSlavenBelupoTerceraBlueFun,
    "ist/titular/red": Istra1961TitularRedFun,
    "ist/titular/blue": Istra1961TitularBlueFun,
    "ist/alternativa/red": Istra1961AlternativaRedFun,
    "ist/alternativa/blue": Istra1961AlternativaBlueFun,
    "ist/tercera/red": Istra1961TerceraRedFun,
    "ist/tercera/blue": Istra1961TerceraBlueFun,
    "iza/titular/red": InterZapresicTitularRedFun,
    "iza/titular/blue": InterZapresicTitularBlueFun,
    "iza/alternativa/red": InterZapresicAlternativaRedFun,
    "iza/alternativa/blue": InterZapresicAlternativaBlueFun,
    "var/titular/red": NKVarazdinTitularRedFun,
    "var/titular/blue": NKVarazdinTitularBlueFun,
    "var/alternativa/red": NKVarazdinAlternativaRedFun,
    "var/alternativa/blue": NKVarazdinAlternativaBlueFun,

    "b04/titular/red": Bayer04LeverkusenTitularRedFun,
    "b04/titular/blue": Bayer04LeverkusenTitularBlueFun,
    "b04/alternativa/red": Bayer04LeverkusenAlternativaRedFun,
    "b04/alternativa/blue": Bayer04LeverkusenAlternativaBlueFun,
    "b04/tercera/red": Bayer04LeverkusenTerceraRedFun,
    "b04/tercera/blue": Bayer04LeverkusenTerceraBlueFun,
    "venfc/titular/red": VeneziaFCTitularRedFun,
    "venfc/titular/blue": VeneziaFCTitularBlueFun,
    "ath/titular/red": AthleticDeBilbaoTitularRedFun,
    "ath/titular/blue": AthleticDeBilbaoTitularBlueFun,
    "ath/alternativa/red": AthleticDeBilbaoAlternativaRedFun,
    "ath/alternativa/blue": AthleticDeBilbaoAlternativaBlueFun,
    "rcde/titular/red": EspanyolTitularRedFun,
    "rcde/titular/blue": EspanyolTitularBlueFun,
    "rcde/alternativa/red": EspanyolAlternativaRedFun,
    "rcde/alternativa/blue": EspanyolAlternativaBlueFun,
    "rcde/tercera/red": EspanyolTerceraRedFun,
    "rcde/tercera/blue": EspanyolTerceraBlueFun,
    "rbl/titular/red": RBLeipzigTitularRedFun,
    "rbl/titular/blue": RBLeipzigTitularBlueFun,
    "rbl/alternativa/red": RBLeipzigAlternativaRedFun,
    "rbl/alternativa/blue": RBLeipzigAlternativaBlueFun,
    "rbl/tercera/red": RBLeipzigTerceraRedFun,
    "rbl/tercera/blue": RBLeipzigTerceraBlueFun,
    "wan/titular/red": MontevideoWanderersTitularRedFun,
    "wan/titular/blue": MontevideoWanderersTitularBlueFun,
    "wan/alternativa/red": MontevideoWanderersAlternativaRedFun,
    "wan/alternativa/blue": MontevideoWanderersAlternativaBlueFun,
    "wan/tercera/red": MontevideoWanderersTerceraRedFun,
    "wan/tercera/blue": MontevideoWanderersTerceraBlueFun,
    "tor/titular/red": MontevideoCityTorqueTitularRedFun,
    "tor/titular/blue": MontevideoCityTorqueTitularBlueFun,
    "tor/alternativa/red": MontevideoCityTorqueAlternativaRedFun,
    "tor/alternativa/blue": MontevideoCityTorqueAlternativaBlueFun,
    "hsv/titular/red": HamburgerSVTitularRedFun,
    "hsv/titular/blue": HamburgerSVTitularBlueFun,
    "hsv/alternativa/red": HamburgerSVAlternativaRedFun,
    "hsv/alternativa/blue": HamburgerSVAlternativaBlueFun,
    "hsv/tercera/red": HamburgerSVTerceraRedFun,
    "hsv/tercera/blue": HamburgerSVTerceraBlueFun,
    "new/titular/red": NewcastleUnitedTitularRedFun,
    "new/titular/blue": NewcastleUnitedTitularBlueFun,
    "new/alternativa/red": NewcastleUnitedAlternativaRedFun,
    "new/alternativa/blue": NewcastleUnitedAlternativaBlueFun,
    "new/tercera/red": NewcastleUnitedTerceraRedFun,
    "new/tercera/blue": NewcastleUnitedTerceraBlueFun,
    "whu/titular/red": WestHamUnitedTitularRedFun,
    "whu/titular/blue": WestHamUnitedTitularBlueFun,
    "whu/alternativa/red": WestHamUnitedAlternativaRedFun,
    "whu/alternativa/blue": WestHamUnitedAlternativaBlueFun,
    "whu/tercera/red": WestHamUnitedTerceraRedFun,
    "whu/tercera/blue": WestHamUnitedTerceraBlueFun,
    "mia/titular/red": InterMiamiCFTitularRedFun,
    "mia/titular/blue": InterMiamiCFTitularBlueFun,
    "mia/alternativa/red": InterMiamiCFAlternativaRedFun,
    "mia/alternativa/blue": InterMiamiCFAlternativaBlueFun,
    "cde/titular/red": DeportivoEspanolTitularRedFun,
    "cde/titular/blue": DeportivoEspanolTitularBlueFun,
    "cde/alternativa/red": DeportivoEspanolAlternativaRedFun,
    "cde/alternativa/blue": DeportivoEspanolAlternativaBlueFun,
    "sit/titular/red": SportivoItalianoTitularRedFun,
    "sit/titular/blue": SportivoItalianoTitularBlueFun,
    "sit/alternativa/red": SportivoItalianoAlternativaRedFun,
    "sit/alternativa/blue": SportivoItalianoAlternativaBlueFun,
    "sit/tercera/red": SportivoItalianoTerceraRedFun,
    "sit/tercera/blue": SportivoItalianoTerceraBlueFun,
    "cdm/titular/red": ClubDeportivoMandiyuTitularRedFun,
    "cdm/titular/blue": ClubDeportivoMandiyuTitularBlueFun,
    "cdm/alternativa/red": ClubDeportivoMandiyuAlternativaRedFun,
    "cdm/alternativa/blue": ClubDeportivoMandiyuAlternativaBlueFun,
    "hul/titular/red": HullCityTitularRedFun,
    "hul/titular/blue": HullCityTitularBlueFun,
    "hul/alternativa/red": HullCityAlternativaRedFun,
    "hul/alternativa/blue": HullCityAlternativaBlueFun,
    "hul/tercera/red": HullCityTerceraRedFun,
    "hul/tercera/blue": HullCityTerceraBlueFun,
    "hul/titular/red/2018": HullCityTitular2018RedFun,
    "hul/titular/blue/2018": HullCityTitular2018BlueFun,
    "hul/alternativa/red/2018": HullCityAlternativa2018RedFun,
    "hul/alternativa/blue/2018": HullCityAlternativa2018BlueFun,
    "hul/tercera/red/2018": HullCityTercera2018RedFun,
    "hul/tercera/blue/2018": HullCityTercera2018BlueFun,
    "wol/titular/red": WolverhamptonTitularRedFun,
    "wol/titular/blue": WolverhamptonTitularBlueFun,
    "wol/alternativa/red": WolverhamptonAlternativaRedFun,
    "wol/alternativa/blue": WolverhamptonAlternativaBlueFun,
    "wol/tercera/red": WolverhamptonTerceraRedFun,
    "wol/tercera/blue": WolverhamptonTerceraBlueFun,
    "crl/titular/red": CerroLargoTitularRedFun,
    "crl/titular/blue": CerroLargoTitularBlueFun,
    "crl/alternativa/red": CerroLargoAlternativaRedFun,
    "crl/alternativa/blue": CerroLargoAlternativaBlueFun,
    "ocfc/titular/red": OldCaledoniansFootballClubTitularRedFun,
    "ocfc/titular/blue": OldCaledoniansFootballClubTitularBlueFun,
    "dfs/titular/red": DefensorSportingTitularRedFun,
    "dfs/titular/blue": DefensorSportingTitularBlueFun,
    "dfs/alternativa/red": DefensorSportingAlternativaRedFun,
    "dfs/alternativa/blue": DefensorSportingAlternativaBlueFun,



    "!swap": swapFun,
    "!registrarme": RegistrarmeFun,
    "!scripts": ScriptsDisponiblesFun,
    "!avatars": AvataresDisponiblesFun,
    "!minirs": MinirsFun,
    "!rs": RealSoccer2020Fun,
    "!big": BigGLHFun,
    "!pensblue": PenaltyBlueFun,
    "!pensred": PenaltyRedFun,
    "!rr": resetFun,
    "!clearbans": clearbansFun,
    "!close876": closeFun,
    "!save876": saveStatsFun,  
 
    // Command that need to know what's the message.
    "!stats": statsFun,
    "!addaccount": addaccountFun,
    "!nv" : leaveFun,
    "!bb" : leaveFun,
    "!adormir" : leaveFun,
    "!acomer" : leaveFun,
    "!confirm" : confirmFun,
    "!afk" : afkFun,
    "!afks" : afksFun,
    "!kickafks" : kickafksFun,
    "!resign" : resignFun, 
    "!chatasbot" : chatasbotFun,
    "!mute" : pushMuteFun,
    "!unmuteall" : UnmuteAll,
    "!pregunta" : eightballFun,
    "!unmute": unmuteFun,
    "!thepasswordis": setpasswordFun,
    "!clear_password": clearpasswordFun,
    "!md": pmFun,
    "!pv": pmFun

}
 
initPlayerStats(room.getPlayerList()[0]) // lazy lol, i'll fix it later
initPlayerStats(init);
 
 
 
 
 
room.onGameStart = function(player) {
    lineCrossedPlayers = [{name: "temp", times: 0}];
    lastScores = room.getScores().red + room.getScores().blue;
    timeOutside = 0;
    isTimeAddedShown = false;
    isTimeAddedShowndos = false;
    isTimeAddedShowntres = false;
    isTimeAddedShowncuatro = false;
    isTimeAddedShowncinco = false;
    isTimeAddedShownseis = false;
    isTimeAddedShownquince = false;
    isTimeAddedShownsiete = false;
    tookASize = {};
    lineBallPosition = 0;
    [redTeam,blueTeam] = whichTeam();
    ballCarrying = initBallCarrying(redTeam, blueTeam);
    timeOnHalves = [0,0];
}
 
 
room.onPlayerTeamChange = function(player){
    if (room.getScores() != null){
        if (1 <= player.team <= 2) ballCarrying.set(player.name, [0, player.team]);
    }
    if (player.team !== 0 && afkPlayerIDs.has(player.id))
    {room.setPlayerTeam(player.id, 0)
    room.sendAnnouncement("[💤] ⚠ " + player.name + "   se encuentra 𝐀𝐅𝐊 ❗❗ ⏱ ⌨ ⚠", null, 0xff8400, 'normal', 0);}
    if (player.id <= 0){
    room.setPlayerTeam(player.id, 0)}
}
 
 
 
room.onPlayerChat = function(player, message) {
spammerosFilter(player, message);
    if(filter(message)) return false;
    if (mutedPlayers.includes(player.name)) return false;
    let spacePos = message.search(" ");
    let command = message.substr(0, spacePos !== -1 ? spacePos : message.length);
    if (commands.hasOwnProperty(command) == true) return commands[command](player, message);
    if (penalespregunta(player, message) == true) return penalespregunta(player, message);
    if (preguntatiempoagregado(player, message) == true) return preguntatiempoagregado(player, message);
    if (SaludandoGenteFun(player, message) == true) return SaludandoGenteFun(player, message);
    if (player.admin == true){
    if (message.indexOf("!") == 0) return false;
    adminMessage = message;
    message = message.split(/ +/);
    	var adminChatColor = 0x08FFF7; // Formato: 0xCOLOR (sustituye COLOR por el color en HEXADECIMAL, ejemplo azul es 33FFE0)
		room.sendAnnouncement(`${player.name}: ${adminMessage}`, null, adminChatColor, 'bold', 1);
		return false;
}
			if (ModoChatPausado.includes(player.id)==true){
				room.sendAnnouncement("[💬] El Modo pausado está activado. Sólo puedes enviar 1 mensaje cada 5 segundos. ⏱",player.id,0x00FF00,"bold",2);
				
				return false;
	
    	}
			if (player.admin==false && ModoChatPausado.includes(player.id)==false){
				ModoChatPausado.push(player.id);
				
				
				setTimeout(function(){
				ModoChatPausado.splice(ModoChatPausado.indexOf(player.id),1);
				}, 5000);
	
    	}
			if (player.admin == true && superAdmins3.includes(player.name) == false && ModoChatPausado.includes(player.id)==false){
				ModoChatPausado.push(player.id);
				
				
				setTimeout(function(){
				ModoChatPausado.splice(ModoChatPausado.indexOf(player.id),1);
				}, 5000);
	
    	}
    if(CensuradorDeSpammeros(message)) return false;
		if(player.admin == true && superAdmins3.includes(player.name) == false){
    if (message.indexOf("!") == 0) return false;
room.sendAnnouncement(player.name+": "+message,null,0x00ffb0,"bold",1);
return false;}
    if (message.indexOf("!") == 0) return false;
 
    }


var idlist=[];
 var superAdmins3 = ["A. Usuriaga", "💎 𝑳𝒂 𝑱𝒐𝒚𝒊𝒕𝒂 💎", "Teniste", "LNC Lucas Martinez", "Gian Mancini", "Baseball Furies", "Oti", "-Arii♪", "ArielAvancini", "Bleachara", "era istefi", "SirBusquets 5", "SirBuski 5", "BARBA RETIRADA", "YVAEL TERCERO", "BARBETA", "♚ Bebel③lⓞ", "♚ Bebel③lⓞ_10", "maxi velazquez '", "green arrow", "Sheckaa", "AppleJack", "Applejack", "Hαzαʀᴅ (Notebook)", "Hαzαʀᴅ", "Milky Way", "Dempsey", "-MorroDiablo'", "Morro de los Linces", "Mena", "redondo", "tran;", "tebo-", "rusito assad", "dramas", "toby dramas", "SHESHO ~", "SHESHITO", "nacho", "Gringo Heinze" , "AgusFer", "AgusFer RF"];
function voteKickPlayer(player,message){
x=message.substring(10);x=parseInt(x);
var players = room.getPlayerList();
	for(var i = 0; i < players.length; i++) { if (superAdmins3.includes(player.name) == true);}
    //oyuncu idleri sırala
            for (i = 0; i < voteKickList.length; i++){
			idlist.push(voteKickList[i].id);
            }
	//oyuncunun bulundugu satırı bulma
	for (i = 0; i < voteKickList.length; i++){
			if (voteKickList[i].id==player.id){sira=i;}
            }
	//atılma oyunu arttır, atılan kişiyi ekle		
	if(idlist.includes(x)==true && voteKickList[sira].attigikisiler.includes(x)==false && superAdmins3.includes(player.name) == false){
			voteKickList[sira].attigikisiler.push(x);
			for (i = 0; i < voteKickList.length; i++){
				if (voteKickList[i].id==x)
				{
				voteKickList[i].atilmaoyu+=1;
				 room.sendAnnouncement("✔️ Votaste para echar a " +voteKickList[i].isim+ " del host" +" ["+voteKickList[i].atilmaoyu+"/6] ",null,0x5CFFEF,"bold",2);
						if(voteKickList[i].atilmaoyu==6)
						room.kickPlayer(voteKickList[i].id,"Has sido expulsado luego de la votación",true);
				}
            }
			
	}	 //atilan kisinin id'si ekle ki tekrar oy veremesin.
	else if (idlist.includes(x)==true && voteKickList[sira].attigikisiler.includes(x)==false && superAdmins3.includes(player.name) == true){room.sendAnnouncement("❌ No se puede kickear administradores.",player.id,0x5CFFEF,"bold",2);}
	else if (idlist.includes(x)==true && voteKickList[sira].attigikisiler.includes(x)==true){room.sendAnnouncement("🔁 Ya has votado para kickear a este jugador..",player.id,0x5CFFEF,"bold",2);}
	else  {room.sendAnnouncement("🚫 Ingresaste un número de jugador no válido, puede escribir # sin presionar enter en la sección de chat o presionar enter para ver la lista de votación.",player.id,0x5CFFEF,"bold",2);}
	
}

var adminList=[];var numaralar=[];
 
room.onPlayerBallKick = function(player) {
    whoTouchedLast = player;
    var ballPosition = room.getBallPosition();
    if(player.name!=lastPlayerTouched)
    {
        if(lastTeamTouched==player.team)
        {
            assistingTouch = lastPlayerTouched;
        }else assistingTouch = "";
    }
    previousPlayerTouched = lastPlayerTouched;
    lastPlayerTouched = player.name;
    lastTeamTouched = player.team;
    if(isBallOutsideStadium)
    {
        getPlayersNotWithinLine();
    }
    if(isBallOutsideStadium && ballPosition.y<0)
    {
        isBallKickedOutside = true;
    }else if(isBallOutsideStadium && ballPosition.y>0)
    {
        isBallKickedOutside = true;
    }else isBallKickedOutside = false;
}
function isBallGoingUp() {
    previousBallPosForGoingUp = currentBallPosForGoingUp;
    currentBallPosForGoingUp = room.getBallPosition().y;
    if (previousBallPosForGoingUp - currentBallPosForGoingUp > 0.01) {
        isBallUp = 2;
    } else if (previousBallPosForGoingUp - currentBallPosForGoingUp < -0.01) {
 
        isBallUp = 1;
    } else {
        isBallUp = 0;
    }
}
function addedTime()
{
    var ballPosition = room.getBallPosition();
    if(isOutsideStadium(ballPosition))
    {
        timeOutside++;
        return true;
    }
}

function AvisoPenalesEnd() {
    var scores = room.getScores();
    if (scores.time > 6 && !isTimeAddedShowncuatro) {
    room.sendChat("Eʟ ᴘᴀʀᴛɪᴅᴏ ᴄᴏɴsᴛᴀ ᴅᴇ 5 ᴍɪɴᴜᴛᴏs, ᴍᴀ́s ᴇʟ ᴛɪᴇᴍᴘᴏ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ. Uɴᴀ ᴠᴇᴢ ᴄᴜᴍᴘʟɪᴅᴏ, sɪ sɪɢᴜᴇ ᴘᴇʀsɪsᴛɪᴇɴᴅᴏ ᴇʟ ᴇᴍᴘᴀᴛᴇ, ʜᴀʙʀᴀ́ ᴘᴇɴᴀʟᴇs.");
    isTimeAddedShowncuatro = true;
    }
}

function AvisoPenalesDos() {
    var scores = room.getScores();
    if (scores.time > 310 && !isTimeAddedShowndos) {
    room.sendChat("Sɪ ʟᴀ ᴘᴇʟᴏᴛᴀ sᴀʟᴇ ᴅᴇ ʟᴀ ᴄᴀɴᴄʜᴀ, ᴜɴᴀ ᴠᴇᴢ ᴄᴜᴍᴘʟɪᴅᴏ ᴇʟ ᴛɪᴇᴍᴘᴏ ᴇxᴛʀᴀ, ʜᴀʏ ᴘᴇɴᴀʟᴇs!");
  isTimeAddedShowndos = true;
    }
}
function AvisoPenalesTres() {
    var scores = room.getScores();
    if (scores.time > 301 && !isTimeAddedShowntres) {
    room.sendChat("⚠️ 𝐀𝐕𝐈𝐒𝐎: Sɪ ᴘᴇʀsɪsᴛᴇ ᴇʟ ᴇᴍᴘᴀᴛᴇ ᴅᴇsᴘᴜᴇ́s ᴅᴇʟ ᴛɪᴇᴍᴘᴏ ᴇxᴛʀᴀ, ʜᴀʙʀᴀ́ ᴘᴇɴᴀʟᴇs!. ⏰");
  isTimeAddedShowntres = true;
    }
}

function SelecionaPenales() {
    var scores = room.getScores();
    if (scores.time > 800 && !isTimeAddedShowncinco) {
    isBallKickedOutside = false;
        room.stopGame();
        room.setCustomStadium(pensred); 
        room.startGame() ;
    isTimeAddedShowncinco = true;
    }
}

function GetTeam(id){ return room.getPlayerList().filter((player) => player.id != 0 && player.team == id); }

function TerminarPartidoTiempo(player) {
	var spec = GetTeam(0);
	var red = GetTeam(1);
	var blue = GetTeam(2);
	for(var k = 0; k < red.length; k++)
	for( let i=0; i<= room.getDiscCount(); i++){
		let disc = room.getDiscProperties(i);
   var GolesTeamBlue = room.getScores().blue
   var GolesTeamRed = room.getScores().red
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var scores = room.getScores();
    var actualTimeAdded = Math.round((timeOutside-(100*0))/60);
    if (scores.time > 300 + actualTimeAdded && !isTimeAddedShownsiete && redTeam.length == '4' && blueTeam.length == '4' && GolesTeamRed > GolesTeamBlue && disc.radius == 9.8){
    teamPossFun();
    room.sendChat(" ⏰ 𝚃𝙸𝙴𝙼𝙿𝙾: [" + time + "]");
    room.sendAnnouncement("█████████████████████ ⚽️ 𝙼 𝙰 𝚁 𝙲 𝙰 𝙳 𝙾 𝚁 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2) + " █████████████████████", player, 0xffd559, "normal", 1)
    isTimeAddedShownsiete = true;
        eloDelta = updateElo(redTeam, blueTeam, 1, 0);
        updateWinLoseStats(redTeam, blueTeam);
        updateWinLoseStreakStats(redTeam, blueTeam);
    saveStatsFun();
    room.stopGame();
		for(var k = 0; k < red.length; k++)
		for(var k = 0; k < blue.length; k++) {room.setPlayerTeam(blue[k].id, 0);}
    }
    if (scores.time > 300 + actualTimeAdded && !isTimeAddedShownsiete && redTeam.length == '4' && blueTeam.length == '4' && GolesTeamRed < GolesTeamBlue && disc.radius == 9.8){
    teamPossFun();
    room.sendChat(" ⏰ 𝚃𝙸𝙴𝙼𝙿𝙾: [" + time + "]");
    room.sendAnnouncement("█████████████████████ ⚽️ 𝙼 𝙰 𝚁 𝙲 𝙰 𝙳 𝙾 𝚁 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2) + " █████████████████████", player, 0xffd559, "normal", 1)
    isTimeAddedShownsiete = true;
        eloDelta = updateElo(redTeam, blueTeam, 0, 1);
        updateWinLoseStats(blueTeam, redTeam);
        updateWinLoseStreakStats(blueTeam, redTeam);
    saveStatsFun();
    room.stopGame();
		for(var k = 0; k < blue.length; k++) {
room.setPlayerTeam(blue[k].id, 1);}
		for(var k = 0; k < red.length; k++) {
room.setPlayerTeam(red[k].id, 0);}
     }
    if (scores.time > 300 + actualTimeAdded && !isTimeAddedShownsiete && redTeam.length == '4' && blueTeam.length == '4' && GolesTeamRed == GolesTeamBlue && disc.radius == 9.8){
    teamPossFun();
    room.sendChat(" ⏰ 𝚃𝙸𝙴𝙼𝙿𝙾: [" + time + "]");
    room.sendAnnouncement("█████████████████████ ⚽️ 𝙼 𝙰 𝚁 𝙲 𝙰 𝙳 𝙾 𝚁 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2) + " █████████████████████", player, 0xffd559, "normal", 1)
    room.sendAnnouncement("[𝐒𝐎𝐋𝐎 𝐀𝐃𝐌𝐈𝐍] Pᴀʀᴀ sᴇʟᴇᴄᴄɪᴏɴᴀʀ ʟᴏs ᴍᴀᴘᴀs ᴅᴇ ᴘᴇɴᴀʟᴇs ᴜᴛɪʟɪᴢᴀ ʟᴏs sɪɢᴜɪᴇɴᴛᴇs ᴄᴏᴍᴀɴᴅᴏs: ", player, 0x4fff7d, "normal", 2)
    room.sendAnnouncement("❗𝐩𝐞𝐧𝐬𝐫𝐞𝐝  Para que el 𝐑𝐄𝐃 patee 🔴", player, 0xe56e56, "normal", 0)
    room.sendAnnouncement("❗𝐩𝐞𝐧𝐬𝐛𝐥𝐮𝐞 Para que el 𝐁𝐋𝐔𝐄 patee 🔵", player, 0x5689e5, "normal", 0);
    isTimeAddedShownsiete = true;
    room.stopGame();
    room.setCustomStadium(pensred);
    room.startGame();
}
}
}

function PublicitaDiscord(player) {
    var scores = room.getScores();
    if (scores.time > 30 && !isTimeAddedShownseis) {
    room.sendAnnouncement("                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ", player, 0x9250FD, "normal", 0)
    room.sendAnnouncement("                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ", player, 0x8466FD, "normal", 0)
    room.sendAnnouncement("                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ", player, 0x7B73FD, "normal", 0);
    room.sendAnnouncement("                                        💬 𝑼𝑵𝑨𝑵𝑺𝑬 𝑨𝑳 𝑫𝑰𝑺𝑪𝑶𝑹𝑫 𝑫𝑬 𝑮𝑳𝑯 ➡  ⬅", player, 0xF6FF43, "normal", 0);
    isTimeAddedShownseis = true;
    }
}

function Limpiarbans() {
    var scores = room.getScores();
    if (scores.time > 3 && !isTimeAddedShownquince) {
    room.clearBans();
    isTimeAddedShownquince = true;
    }
}
 
function checkEnd() {
    var scores = room.getScores();
    if (scores.time > 300 && !isTimeAddedShown) {
    var actualTimeAdded = Math.round((timeOutside-(100*0))/60);
    var MinutosTimeAdded = Math.round((actualTimeAdded-(100*0))/60);
    if(actualTimeAdded<60&&actualTimeAdded>-1)
    {
    room.sendChat("⏰ 𝐓𝐈𝐄𝐌𝐏𝐎 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐃𝐎: + " + actualTimeAdded + " SEGUNDOS");
    }else if(actualTimeAdded<0)
    {
    room.sendChat("𝐒𝐈𝐍 𝐓𝐈𝐄𝐌𝐏𝐎 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐃𝐎. (+0)");
    }else if(actualTimeAdded>60)
    {
    room.sendChat("⏰ 𝐓𝐈𝐄𝐌𝐏𝐎 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐃𝐎: + " + MinutosTimeAdded + " MINUTO(S)");
    }
    isTimeAddedShown = true;
    }
}
var tickCount = 0;
var kickOff = false;
var hasFinished = false;
room.onGameTick = function() {   
    if (kickOff == false) { // simplest comparison to not charge usulessly the tick thing
        if (room.getScores().time != 0){
            kickOff = true;
            gk = isGk();
            let account = accounts.find(a => a.playerId === gk[0].id);
            let account1 = accounts.find(a => a.playerId === gk[1].id);
            if (account == undefined && account1 == undefined) {room.sendAnnouncement("🥅 🙌⚽    🔴 𝙶𝙺 𝚁𝙴𝙳:  " + gk[0].name + "            🆚           🔵 𝙶𝙺 𝙱𝙻𝚄𝙴:  " + gk[1].name + "    ⚽🙌 🥅", null, 0xFFB82B, 'normal', 0);}
            else if (account !== undefined && account1 == undefined) {room.sendAnnouncement("🥅 🙌⚽    🔴 𝙶𝙺 𝚁𝙴𝙳:  " + gk[0].name + "[" + account.username + "]" + "            🆚           🔵 𝙶𝙺 𝙱𝙻𝚄𝙴:  " + gk[1].name + "    ⚽🙌 🥅", null, 0xFFB82B, 'normal', 0);}
            else if (account == undefined && account1 !== undefined) {room.sendAnnouncement("🥅 🙌⚽    🔴 𝙶𝙺 𝚁𝙴𝙳:  " + gk[0].name + "            🆚           🔵 𝙶𝙺 𝙱𝙻𝚄𝙴:  " + gk[1].name + "[" + account1.username + "]    ⚽🙌 🥅", null, 0xFFB82B, 'normal', 0);}
            else{room.sendAnnouncement("🥅 🙌⚽     🔴 𝙶𝙺 𝚁𝙴𝙳:  " + gk[0].name + "[" + account.username + "]" + "            🆚           🔵 𝙶𝙺 𝙱𝙻𝚄𝙴:  " + gk[1].name + "[" + account1.username + "]    ⚽🙌 🥅", null, 0xFFB82B, 'normal', 0);};
        }
    }
    if (goalScored == false){
        whoTouchedLast = getLastTouchTheBalltwo(whoTouchedLast);
    }
    if (whoTouchedLast != undefined) {
 
        if (ballCarrying.get(whoTouchedLast.name)) {
            ballCarrying.get(whoTouchedLast.name)[0] += 1/60;
        }
 
        if  ( whoTouchedLast.id != whoTouchedBall[0].id){
            whoTouchedBall[1] = whoTouchedBall[0];
            whoTouchedBall[0] = whoTouchedLast; // last player who touched the ball
        }
    }
    updateTimeOnHalves();  
   
   
    isThrowInCorrect();
    getLastTouchTheBalltwo();
    checkBallPosition();
    checkBallPosition2();
    isBackRequired();
    hasBallLeftTheLine();
    addedTime();
    checkEnd();
    AvisoPenalesEnd();
    AvisoPenalesDos();
    AvisoPenalesTres();
    SelecionaPenales();
    TerminarPartidoTiempo();
    PublicitaDiscord();
    Limpiarbans();
    tickCount++;
 
   
   
}
 
updateTimeOnHalves = function(){
    if(room.getBallPosition().x < 0){
        timeOnHalves[0] += 1/60;
    }else if(room.getBallPosition().x > 0){
        timeOnHalves[1] += 1/60;
    }
}

room.onTeamGoal = function(team){ // Write on chat who scored and when.
    if(realMap==true){BallPosition(0,-700,0,0);}
    if(realMap2==true){BallPosition2(0,-410,0,0);}
    if (redTeam.length == '4' && blueTeam.length < '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall); 
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando', ' pero la pu** (৴°ㅁ°)৴ ︵ ┻━━┻ ¡SOS INDOMABLE!'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    if (redTeam.length < '4' && blueTeam.length == '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall); 
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    if (redTeam.length > '4' && blueTeam.length < '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall); 
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    if (redTeam.length < '4' && blueTeam.length > '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall); 
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    if (redTeam.length > '4' && blueTeam.length > '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall); 
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    if (redTeam.length < '4' && blueTeam.length < '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall); 
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    if (redTeam.length == blueTeam.length && redTeam.length == '4' && blueTeam.length == '4'){
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var ownGoal = isOwnGoal(team, whoTouchedBall[0]);
    var assist = "";
    if (ownGoal == "") assist = playerTouchedTwice(whoTouchedBall);
 
    let account = accounts.find(a => a.playerId === whoTouchedBall[0].id);
    if (account !== undefined) {
 
    room.sendAnnouncement("      ⎮ ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name + "⎮ [" + account.username + "]" +
     assist + ownGoal + " ⎮ A los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
 
     if (ownGoal != "") {
     } else {
         stats[account.username][0] += 1;
     }
    }
    else {
    room.sendAnnouncement("      ⚽ 𝑮𝑶𝑳 marcado por " + whoTouchedBall[0].name +
     assist + ownGoal + " a los [🕒   " +
     time + " ] para el " + team_name(team), null, 0xffd800, 'normal', 0);
    room.sendAnnouncement("      🎰 𝗠 𝗔 𝗥 𝗖 𝗔 𝗗 𝗢 𝗥 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2), null, 0xffd800, 'normal', 0);
    var ComentariosRandomBot = [' magnífica actuación', ' uuuuffff que fenómeno', ' es un jugador por encima de la media.', ' a eso yo le llamo tener calidad!', ' más 3', ', que pedazo de jugador!!', ' siempre hace la diferencia', ' lo hizo de nuevo, es un fuera de serie.', ' está on fire 🔥🔥🔥', ' de qué planeta viniste?', ' siempre demostrando porqué le dicen "el mejor del host"', ' OOOOOOOO que verdadero crack', ' vestite!', ' juega desnudo', ' vacunando rivales desde tiempo inmemoriales', ' en modo diablo 🤘 👿', 'en modo cristo ✝', ' que lujo es verte jugar', 'dependencia. Juega y hace jugar éste verdadero crack', ' es de otro nivel', ' me has puesto la piel de gallina 😳', ' el de siempre, haciendo lo de siempre...', ' está loco 😲', ' es el puto amo 👍', ' cerrando ortos nivel dios 👉👌 😎', ' te gana los partidos solo ✌', ' la tiene afuera 🙈', ' es el rey de reyes 👑 🤴', ' da igual cuando leas ésto. Éste tipo no para de romperla 😵', ' el amo del juego 😎', ' no tiene límites 👏', ' naaaah sos un extraterrestre 👽', ' está enfermo 😵', ' no hay dudas, eres el mejor de todos 🙉 👌👌', '  que barbaridad lo de este hombre 👏👏👏', ' con que facilidad juega éste muchacho', ' dando cátedra de como jugar haxball 👏👏', ' no tengo palabras, no tengo nada que decir, se me acabaron las palabras para describir lo que es éste fenómeno. 👏👏 🙇🙇', ' me muerooooooooooooooo! vieron lo que hizo éste tipo? 🔥🔥🔥', ' simplemente una maravilla 😍', ' la leyenda continua', ' ¿Lo pedían? Ahí lo tienen. 😎', ' apareciendo cuando más se le necesita, el amo y señor del haxball. 🙇', ' no hay jugador que pueda con él y lo sigue demostrando'];
    var fraserandom = ComentariosRandomBot[(Math.random() * ComentariosRandomBot.length) | 0]
    room.sendAnnouncement("ℛᴇʟᴀᴛᴏʀ 🗣 🎙: " + whoTouchedBall[0].name + fraserandom, null, 0xf1a400, 'normal', 0);
    }
    let account1 = accounts.find(a => a.playerId === whoTouchedBall[1].id);
    if (account1 !== undefined) {
    if (whoTouchedBall[1] != init && assist != "") stats[account1.username][1] += 1;
    }
    else{
    if (whoTouchedBall[1] != init && assist != "");
    }
 
 
    if (scorers == undefined) scorers = new Map(); // Initializing dict of scorers
    whoTouchedBall = [init, init];
    whoTouchedLast = undefined;
    saveStatsFun();
}}
room.onPositionsReset = function(){
    let id = Object.keys(tookASize);
    let size;
    for (var i = 0; i < id.length; i++) {
        if (tookASize.hasOwnProperty(id[i])){
            size = tookASize[id[i]];
            room.setPlayerDiscProperties(id[i], {radius: size, invMass: size / 30});
        }
    }
}
    goalScored = false;
 
 
room.onTeamVictory = function(scores){ // Sum up all scorers since the beginning of the match.
    goalScored = true;
    var time = room.getScores().time;
    var m = Math.trunc(time/60); var s = Math.trunc(time % 60);
    time = m + ":" + floor(s); // MM:SS format
    var scores = room.getScores();
    var actualTimeAdded = Math.round((timeOutside-(100*0))/60);
    if (redTeam.length < '4' && redTeam.length == blueTeam.length){
    teamPossFun();
    room.sendChat(" ⏰ 𝚃𝙸𝙴𝙼𝙿𝙾: [" + time + "]");
    room.sendAnnouncement("█████████████████████ ⚽️ 𝙼 𝙰 𝚁 𝙲 𝙰 𝙳 𝙾 𝚁 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2) + " █████████████████████", null, 0xffd559, "normal", 1)
    isTimeAddedShownsiete = true;
}
    if (redTeam.length > '4' && redTeam.length == blueTeam.length){
    teamPossFun();
    room.sendChat(" ⏰ 𝚃𝙸𝙴𝙼𝙿𝙾: [" + time + "]");
    room.sendAnnouncement("█████████████████████ ⚽️ 𝙼 𝙰 𝚁 𝙲 𝙰 𝙳 𝙾 𝚁 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2) + " █████████████████████", null, 0xffd559, "normal", 1)
    isTimeAddedShownsiete = true;
}
    if (redTeam.length == '4' && redTeam.length == blueTeam.length){
    teamPossFun();
    room.sendChat(" ⏰ 𝚃𝙸𝙴𝙼𝙿𝙾: [" + time + "]");
    room.sendAnnouncement("█████████████████████ ⚽️ 𝙼 𝙰 𝚁 𝙲 𝙰 𝙳 𝙾 𝚁 :      " + team_color(1) + "      " +
                    scorerNumber(room.getScores().red) + "      -      " + scorerNumber(room.getScores().blue) + "      " + team_color(2) + " █████████████████████", null, 0xffd559, "normal", 1)
    isTimeAddedShownsiete = true;
}
}
 
room.onGameStop = function(){
    scorers = undefined;
    whoTouchedBall = [init, init];
    whoTouchedLast = undefined;
    gk = [init, init];
    kickOff = false;
    hasFinished = false;
}
 
function getNewRating(myRating, opponentRating, myGameResult) {
  return myRating + getRatingDelta(myRating, opponentRating, myGameResult);
}
 
var _savestatsInterval = 15769500 * 15769500;
SaveStats = setInterval(function() {saveStatsFun();},_savestatsInterval);
 
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

room.onPlayerJoin = function(player) {
	CreateOyuncu(player);
   let conn = connections.find(a => a[1] === player.conn);
            if (conn) {
             room.kickPlayer(player.id,"𝚂𝙾́𝙻𝙾 𝚄𝙽 𝙹𝚄𝙶𝙰𝙳𝙾𝚁 𝙿𝙾𝚁 𝙸𝙿 ❌",true);
            }
            else {
            connections.push([player.id, player.conn]);
            }

    if (db.log.filter((p) => p.id == player.id).length == 0) { db.log.push({ id: player.id, lm: [] }); }
    checkBanedAdmins(player);
    BaneandoGenteProhibidaFun(player);
    clonekick(player);
    playerName = player.name.replace(/ /g,"_");
    var SaludosRandomBot = [' bienvenido al host!', ' ojalá la pases bien!', ', acabas de unirte al host.', ' te damos las bienvenida.', ', nos alegra mucho que nos elijas!', ' hola!  llegó el más crack.', ' nos hacias falta en éste host.', ' hola!!!', ' gracias por unirte a nuestra comunidad.', ' te damos la bienvenida', ' ha llegado. Se acabó la fiesta.', ' te estábamos esperando', ' está aquí, tal y como predijo la profecía.', ' acaba de unirse. ¡Hagan como que están jugando!', ' acaba de aterrizar', ' se ha unido.', ' ha venido a carrear conos y a marcar muchos goles.', ' está aquí.', ' se ha unido al host! ¡Es superefectivo!', ' se ha unido. Ahora deberán jugar más que el 100%.', ' acaba de unirse... ¿O no?', ' MIRÁ QUIÉN LLEGÓ ¡Es un pájaro! ¡Es un avión! Ah no, no he dicho nada. Flashé', ' hola! quédate un rato y disfruta.', ' llegó el más grande.', ' ha ingresado. Eh muchachos, miren quién llegó.', ' Te estábamos esperando ( ͡° ͜ʖ ͡°)', ' se ha unido al host.', ' acaba de llegar.', ' apareció! cuidado que es salvaje.', ' Hola!! Alguien lo andaba buscando?', ' te estabamos esperando!'];
    var GeneradorRandom = SaludosRandomBot[(Math.random() * SaludosRandomBot.length) | 0]
    room.sendAnnouncement(" @" + playerName + GeneradorRandom , player.id, 0x00FFB3, "normal", 0);
    room.sendAnnouncement("[📶] IP del jugador: " + player.conn + " | Nickname: @" + playerName , null, 0x06ff00, 'bold', 0);
    room.sendAnnouncement("@" + playerName + " Escribe !help, !adminhelp, !rankhelp para ver los comandos.", player.id, 0x00FFB3, "normal", 0);
    room.sendAnnouncement("@" + playerName + " --> Registrate ahora en http://bit.ly/2JJ78O1 para poder ver tus estadísticas.", player.id, 0x00FFB3, "normal", 0);
    var players = room.getPlayerList();
    var adminNumber = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].admin) {
            adminNumber++;
        }
    }
    if (adminNumber < 2) {
        room.setPlayerAdmin(players[1].id, true);
    }
}
function DeleteOyuncu(id) { for(var i = 0; i < voteKickList.length; i++) {if(voteKickList[i].id == id) {voteKickList.splice(i, 1);}}}
function CreateOyuncu(player) { voteKickList[voteKickList.length] = {isim:player.name,id:player.id,atilmaoyu:0,attigikisiler:[0]};}
room.onPlayerLeave = function(player) {
DeleteOyuncu(player.id);
connections = connections.filter(a => a[0] !== player.id);
    var players = room.getPlayerList();
    var adminNumber = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].admin) {
            adminNumber++;
        }
    }
}
 
function isOutsideStadium(ballPosition) {if(ballPosition.y<-127 || ballPosition.y>127){return ballPosition.x > stadiumWidth || ballPosition.x < -stadiumWidth || ballPosition.y > stadiumHeight || ballPosition.y < -stadiumHeight;}}
 
var isBallOutsideStadium = false;
 
function checkBallPosition() {
    var ballPosition = room.getBallPosition();
   if(realMap==true){
    if(isOutsideStadium(ballPosition)) {
	  ballOut=true;
        if(!isBallOutsideStadium) {
            isBallOutsideStadium = true;
            exitingPos = ballPosition.x;
            exitingPos2 = ballPosition.y;
            var totalScores = room.getScores().red + room.getScores().blue;
            if(lastScores != totalScores) {
                lastScores = totalScores;
                return false;
            }
            if(ballPosition.x > stadiumWidth && lastTeamTouched == Team.RED || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.BLUE) {
			
                lastCall = lastTeamTouched == Team.RED ? "2" : "1";				
				
				if(ballPosition.x<0 && ballPosition.y<0){BallPosition( -1200,-210,0,0)}
				if(ballPosition.x<0 && ballPosition.y>0){BallPosition( -1200,210,0,0)}
				if(ballPosition.x>0 && ballPosition.y>0){BallPosition(  1200,210,0,0)}
				if(ballPosition.x>0 && ballPosition.y<0){BallPosition(  1200,-210,0,0)}
				setBallColor(lastCall == 1 ? 0xFF0000:0x0000FF);
                room.sendAnnouncement("[⚽] Sᴀǫᴜᴇ ᴅᴇ ᴀʀᴄᴏ", null, 0x00FF6E, "normal", 1);

				
				
            }
            else if(ballPosition.x > stadiumWidth && lastTeamTouched == Team.BLUE || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.RED) {
               
                lastCall = lastTeamTouched == Team.RED ? "2" : "1";				
				
				if(ballPosition.x<0 && ballPosition.y<0){BallPosition(-1197,-615,0,0)}
				if(ballPosition.x<0 && ballPosition.y>0){BallPosition(-1197,615,0,0)}
				if(ballPosition.x>0 && ballPosition.y>0){BallPosition( 1197,615,0,0)}
				if(ballPosition.x>0 && ballPosition.y<0){BallPosition( 1197,-615,0,0)}
				setBallColor(lastCall == 1 ? 0xFF0000:0x0000FF);
                room.sendAnnouncement("[🚩] ᴄᴏʀɴᴇʀ", null, 0x00FF6E, "normal", 1);

            }
            else {
			
                isBallKickedOutside = false;
          room.sendAnnouncement(lastTeamTouched == Team.RED ? "          🔵 🔵 🔵           [𝐋𝐀𝐓] ʟᴀᴛᴇʀᴀʟ ᴘᴀʀᴀ ᴇʟ 𝐁𝐋𝐔𝐄           🔵 🔵 🔵" : "          🔴 🔴 🔴           [𝐋𝐀𝐓] ʟᴀᴛᴇʀᴀʟ ᴘᴀʀᴀ ᴇʟ 𝐑𝐄𝐃           🔴 🔴 🔴", null, 0xbbff45, 'normal', 2);
                lastCall = lastTeamTouched == Team.RED ? "2" : "1";
				setBallColor(lastCall == 1 ? 0xFF0000:0x0000FF);
			if(exitingPos2>0){BallPosition(exitingPos,exitingPos2+17.5,0,0);}	
			if(exitingPos2<0){BallPosition(exitingPos,exitingPos2-17.5,0,0);}

				
            }

        }
    }
    else {
	    if(ballOut==true){ setBallColor(0xFFFFFF);}
        isBallOutsideStadium = false;
        backMSG = true;
		ballOut=false;
		
    }
      return true;
	}
		
}

function BallPosition(a,b,c,d){
	for( let i=0; i<= room.getDiscCount(); i++){
		let disc = room.getDiscProperties(i);
		
		if(disc && disc.radius == 9.8){
			room.setDiscProperties(i, {x: a,y:b});
			room.setDiscProperties(i, {xspeed :c,yspeed:d});
		}
	}
}


function setBallColor(c){
	for( let i=0; i<= room.getDiscCount(); i++){
		let disc = room.getDiscProperties(i);
		
		if(disc && disc.radius == 9.8){
			room.setDiscProperties(i, {color: c});
			
		}
	}
}
realMap=false;
ballOut=true;
kirmiziTakim=[];
maviTakim=[];
redTeam  =[0,0,0,0,0,0];
blueTeam =[0,0,0,0,0,0];
redT=[];
blueT=[];


function isOutsideStadium2(ballPosition2) {if(ballPosition2.y<-83.5 || ballPosition2.y>83.5){return ballPosition2.x > 700 || ballPosition2.x < -700 || ballPosition2.y > 320 || ballPosition2.y < -320;}}
 
var isBallOutsideStadium2 = false;
 
function checkBallPosition2() {
	for( let i=0; i<= room.getDiscCount(); i++){
		let disc = room.getDiscProperties(i);
    var ballPosition2 = room.getBallPosition();
   if(realMap2==true){
    if(isOutsideStadium2(ballPosition2)) {
	  ballOut2=true;
        if(!isBallOutsideStadium2) {
            isBallOutsideStadium2 = true;
            exitingPos3 = ballPosition2.x;
            exitingPos4 = ballPosition2.y;
            var totalScores = room.getScores().red + room.getScores().blue;
            if(lastScores != totalScores) {
                lastScores = totalScores;
                return false;
            }
            if(ballPosition2.x > 700 && lastTeamTouched == Team.RED && disc.radius == 9.9 || ballPosition2.x < -700 && lastTeamTouched == Team.BLUE && disc.radius == 9.9) {
			
                lastCall2 = lastTeamTouched == Team.RED ? "2" : "1";				
				
				if(ballPosition2.x<0 && ballPosition2.y<0){BallPosition2( -750,-195,0,0)}
				if(ballPosition2.x<0 && ballPosition2.y>0){BallPosition2( -750,195,0,0)}
				if(ballPosition2.x>0 && ballPosition2.y>0){BallPosition2(  750,195,0,0)}
				if(ballPosition2.x>0 && ballPosition2.y<0){BallPosition2(  750,-195,0,0)}
				setBallColor2(lastCall2 == 1 ? 0xFF0000:0x0000FF);
                room.sendAnnouncement("[⚽] Sᴀǫᴜᴇ ᴅᴇ ᴀʀᴄᴏ", null, 0x00FF6E, "normal", 1);

				
				
            }
            else if(ballPosition2.x > 700 && lastTeamTouched == Team.BLUE && disc.radius == 9.9 || ballPosition2.x < -700 && lastTeamTouched == Team.RED && disc.radius == 9.9) {
               
                lastCall2 = lastTeamTouched == Team.RED ? "2" : "1";				
				
				if(ballPosition2.x<0 && ballPosition2.y<0){BallPosition2(-745,-330,0,0)}
				if(ballPosition2.x<0 && ballPosition2.y>0){BallPosition2(-745,330,0,0)}
				if(ballPosition2.x>0 && ballPosition2.y>0){BallPosition2( 745,330,0,0)}
				if(ballPosition2.x>0 && ballPosition2.y<0){BallPosition2( 745,-330,0,0)}
				setBallColor2(lastCall2 == 1 ? 0xFF0000:0x0000FF);
                room.sendAnnouncement("[🚩] ᴄᴏʀɴᴇʀ", null, 0x00FF6E, "normal", 1);

            }
        }
    }
    else {
	    if(ballOut2==true){ setBallColor2(0xFFDD00);}
        isBallOutsideStadium2 = false;
        backMSG = true;
		ballOut2=false;
		
    }
}
      return true;
	}
		
}

function BallPosition2(e,f,g,h){
	for( let i=0; i<= room.getDiscCount(); i++){
		let disc = room.getDiscProperties(i);
		
		if(disc && disc.radius == 9.9){
			room.setDiscProperties(i, {x: e,y:f});
			room.setDiscProperties(i, {xspeed :g,yspeed:h});
		}
	}
}


function setBallColor2(c){
	for( let i=0; i<= room.getDiscCount(); i++){
		let disc = room.getDiscProperties(i);
		
		if(disc && disc.radius == 9.9){
			room.setDiscProperties(i, {color: c});
			
		}
	}
}
realMap2=false;
ballOut2=true;
kirmiziTakim=[];
maviTakim=[];
redTeam  =[0,0,0,0,0,0];
blueTeam =[0,0,0,0,0,0];
redT=[];
blueT=[];
 
function getLastTouchTheBalltwo() {
    var ballPosition = room.getBallPosition();
    var players = room.getPlayerList();
    for(var i = 0; i < players.length; i++) {
        if(players[i].position != null) {
            var distanceToBall = pointDistance(players[i].position, ballPosition);
            if(distanceToBall < triggerDistance) {
                if(lastPlayerTouched!=players[i].name)
                {
                    if(lastTeamTouched==players[i].team)
                    {
                        assistingTouch = lastPlayerTouched;
                    }else assistingTouch = "";
                }
                lastTeamTouched = players[i].team;
                previousPlayerTouched == lastPlayerTouched;
                lastPlayerTouched = players[i].name;
            }
        }
    }
    return lastPlayerTouched;
}
function filter(message)
{
    message = message.toLowerCase();
    message = message.replace(/\s/g, '');
    message = message.replace(/\./g,' ')
    if(message.includes("ఌ") ||message.includes("甈") ||message.includes("㐷") ||message.includes("怅") ||message.includes("瘪") ||message.includes("⑸") ||message.includes("㬆") ||message.includes("権") ||message.includes("怜") ||message.includes("∯") ||message.includes("㤒") ||message.includes("䉊") ||message.includes("匊") ||message.includes("ᙻ") ||message.includes("ൽ") ||message.includes("ᴧ") ||message.includes("爂") ||message.includes("爇") ||message.includes("त") ||message.includes("権") ||message.includes("怜") ||message.includes("∯") ||message.includes("㤒") ||message.includes("vengan") ||message.includes("soccer") ||message.includes("PIPIPI") ||message.includes("creas") ||message.includes("creen") ||message.includes("TITITI") ||message.includes("h0st") ||message.includes("hosteo") ||message.includes("cre0") ||message.includes("眮") ||message.includes("㤮") ||message.includes("㵧") ||message.includes("creo") ||message.includes("host") ||message.includes("間") ||message.includes("謝") ||message.includes("奶") ||message.includes("如") ||message.includes("失") ||message.includes("好") ||message.includes("莖") ||message.includes("治") ||message.includes("帶") ||message.includes("陰") ||message.includes("play?c=") ||message.includes("cr30") ||message.includes("RScon") ||message.includes("creers") ||message.includes("creenrs") ||message.includes("ʟᴀᴛᴇʀᴀʟ") ||message.includes("ᴄᴏʀɴᴇʀ") ||message.includes("ᴀʀᴄᴏ") ||message.includes("creé") ||message.includes("r5") ||message.includes("r3") ||message.includes("reals") ||message.includes("s0") ||message.includes("rscon") ||message.includes("ccercon") ||message.includes("cc3rc0n") ||message.includes("rsc0n") ||message.includes("rrr") ||message.includes("sss") ||message.includes("apocalip") ||message.includes("cortoluz") ||message.includes("soycaca") ||message.includes("down") ||message.includes("mogolico") ||message.includes("sidoso") ||message.includes("sidosa") ||message.includes("mogolica") ||message.includes("mogolic") ||message.includes("cancerigen") ||message.includes("d0wn") ||message.includes("m0g0lic0") ||message.includes("m0golic") ||message.includes("mog0lic") ||message.includes("mogol1c") ||message.includes("﷽") ||message.includes("m0g0l1c") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("﷽") ||message.includes("autista") ||message.includes("mongolic") ||message.includes("cancer") ||message.includes("retrasad") ||message.includes("enfermomental") ||message.includes("enfermito") ||message.includes("aborto") ||message.includes("peruanosucio") ||message.includes("muertodehambre") ||message.includes("esclavo") ||message.includes("comepalomas") ||message.includes("veteatupais") ||message.includes("negroaborigen") ||message.includes("peruanosucio") ||message.includes("abandonenestassalas") ||message.includes("abandonenlasala") ||message.includes("glhcorrupcion") ||message.includes("http") ||message.includes("\u0061\u0064\u0066\u006f\u0063\u002e\u0075\u0073") ||message.includes("arsa") ||message.includes("ars4") ||message.includes("4rs4") ||message.includes("4rsa") ||message.includes("newton") ||message.includes("\u0074\u00ed\u0061") ||message.includes("\u0063\u0072\u0065\u00e9") ||message.includes("dovvn") ||message.includes("daun") ||message.includes("doun"))
    {
        return true;
    }else return false;
}
function penalespregunta(player, message)
{
    message = message.toLowerCase();
    message = message.replace(/\s/g, '');
    message = message.replace(/\./g,' ')
    if(message.includes("cuandohaypenales") ||message.includes("haypen") ||message.includes("haypenales?") ||message.includes("cuando") ||message.includes("cuando termina") ||message.includes("acuanto") ||message.includes("nohaypenales") ||message.includes("nohaypen") ||message.includes("acuant") ||message.includes("acuantos") ||message.includes("minutos") ||message.includes("minuto") ||message.includes("mins") ||message.includes("tiempo") ||message.includes("time") ||message.includes("limit") ||message.includes("nohay") ||message.includes("cuantos"))
    {
        room.sendAnnouncement('⏰ Eʟ ᴀʀʙɪᴛʀᴏ ᴀᴅɪᴄɪᴏɴᴀ ᴛɪᴇᴍᴘᴏ ᴇɴ ᴇʟ ᴍɪɴᴜᴛᴏ 5. ​', player.id, 0xFF3838, "normal", 1);
        room.sendAnnouncement('Uɴᴀ ᴠᴇᴢ ᴄᴜᴍᴘʟɪᴅᴏ, sɪ sɪɢᴜᴇ ᴘᴇʀsɪsᴛɪᴇɴᴅᴏ ᴇʟ ᴇᴍᴘᴀᴛᴇ, ʜᴀʙʀᴀ́ ᴘᴇɴᴀʟᴇs.', player.id, 0xFF3838, "normal", 0);
    var actualTimeAdded = Math.round((timeOutside-(100*0))/60);
    var MinutosTimeAdded = Math.round((actualTimeAdded-(100*0))/60);
    var TiempoTotal = Math.round(MinutosTimeAdded+5);
    if(actualTimeAdded<60&&actualTimeAdded>-1)
    {
    room.sendAnnouncement("⏰ 𝐓𝐄𝐑𝐌𝐈𝐍𝐀 𝐀 𝐋𝐎𝐒: 5 MINUTOS y  " + actualTimeAdded + " SEGUNDOS (𝐏𝐎𝐑 𝐀𝐇𝐎𝐑𝐀)", player.id, 0x00FF88, "normal", 1);
    }else if(actualTimeAdded<0)
    {
    room.sendAnnouncement("𝐓𝐄𝐑𝐌𝐈𝐍𝐀 𝐀 𝐋𝐎𝐒 𝟓 𝐌𝐈𝐍𝐔𝐓𝐎𝐒 (𝐏𝐎𝐑 𝐀𝐇𝐎𝐑𝐀)", player.id, 0x00FF88, "normal", 1);
    }else if(actualTimeAdded>60)
    {
    room.sendAnnouncement("⏰ 𝐓𝐄𝐑𝐌𝐈𝐍𝐀 𝐀 𝐋𝐎𝐒: " + TiempoTotal + " MINUTOS (𝐏𝐎𝐑 𝐀𝐇𝐎𝐑𝐀)", player.id, 0x00FF88, "normal", 1);
    }
}
}

function preguntatiempoagregado(player, message)
{
    message = message.toLowerCase();
    message = message.replace(/\s/g, '');
    message = message.replace(/\./g,' ')
    if(message.includes("cuantoagreg") ||message.includes("cuantoadicion") ||message.includes("cuantosminutosagreg") ||message.includes("cuantosminsagreg") ||message.includes("cuantosminsañadi") ||message.includes("cuantosañadi") ||message.includes("cuantoañadi") ||message.includes("cuantosminutosagreg"))
    {
    var actualTimeAdded = Math.round((timeOutside-(100*0))/60);
    var MinutosTimeAdded = Math.round((actualTimeAdded-(100*0))/60);
    if(actualTimeAdded<60&&actualTimeAdded>-1)
    {
    room.sendAnnouncement("⏰ 𝐓𝐈𝐄𝐌𝐏𝐎 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐃𝐎: + " + actualTimeAdded + " SEGUNDOS (𝐏𝐎𝐑 𝐀𝐇𝐎𝐑𝐀)", player.id, 0xFF4400, "normal", 1);
    }else if(actualTimeAdded<0)
    {
    room.sendAnnouncement("𝐒𝐈𝐍 𝐓𝐈𝐄𝐌𝐏𝐎 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐃𝐎. (+0) (𝐏𝐎𝐑 𝐀𝐇𝐎𝐑𝐀)", player.id, 0xFF4400, "normal", 1);
    }else if(actualTimeAdded>60)
    {
    room.sendAnnouncement("⏰ 𝐓𝐈𝐄𝐌𝐏𝐎 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐃𝐎: + " + MinutosTimeAdded + " MINUTOS (𝐏𝐎𝐑 𝐀𝐇𝐎𝐑𝐀)", player.id, 0xFF4400, "normal", 1);
    }
}
}

function BaneandoGenteProhibidaFun(player)
{
    nicknameban = player.name
    nicknameban = nicknameban.toLowerCase();
    nicknameban = nicknameban.replace(/\s/g, '');
    nicknameban = nicknameban.replace(/\./g,' ')
    if(nicknameban.includes("realsoccercon") ||nicknameban.includes("detectorde") ||nicknameban.includes("admindown") ||nicknameban.includes("realsoccer") ||nicknameban.includes("r3al") ||nicknameban.includes("Áʀʙɪᴛʀᴏ ʙᴏᴛ") ||nicknameban.includes("rscon") ||nicknameban.includes("rbitro") ||nicknameban.includes("ʀʙɪᴛʀᴏʙᴏᴛ") ||nicknameban.includes("pipipi") ||nicknameban.includes("tititi") ||nicknameban.includes("ccc") ||nicknameban.includes("cacajr") ||nicknameban.includes("cacaj") ||nicknameban.includes("caca") ||nicknameban.includes("caquita") ||nicknameban.includes("caquita") ||nicknameban.includes("caqui") ||nicknameban.includes("cakit") ||nicknameban.includes("kakit") ||nicknameban.includes("kaquit") ||nicknameban.includes("kakajr") ||nicknameban.includes("kacajr") ||nicknameban.includes("kacajr") ||nicknameban.includes("kakitaj") ||nicknameban.includes("kakita") ||nicknameban.includes("kk") ||nicknameban.includes("desbann") ||nicknameban.includes("gordodesb") ||nicknameban.includes("desbanner") ||nicknameban.includes("nnerhack") ||nicknameban.includes("hack") ||nicknameban.includes("laexde") ||nicknameban.includes("jajaja") ||nicknameban.includes("mecojoatu") ||nicknameban.includes("banearme") ||nicknameban.includes("jaja") ||nicknameban.includes("puto") ||nicknameban.includes("lahermanade") ||nicknameban.includes("lamamade") ||nicknameban.includes("elpapade") ||nicknameban.includes("\u0063\u00e1\u0063\u0061\u006a\u0072") ||nicknameban.includes("\u006b\u00e1\u006b\u0061\u006a\u0072") ||nicknameban.includes("\u0063\u0061\u0063\u00e1\u006a\u0072") ||nicknameban.includes("\u006b\u0061\u006b\u00e1\u006a\u0072") ||nicknameban.includes("elhijode") ||nicknameban.includes("demierda") ||nicknameban.includes("mogolic") ||nicknameban.includes("baneame") ||nicknameban.includes("papade") ||nicknameban.includes("mamade") ||nicknameban.includes("hermanade") ||nicknameban.includes("\u0063\u00e1\u0063\u00e1") ||nicknameban.includes("criptonk") ||nicknameban.includes("jesusteama") ||nicknameban.includes("\u006a\u0065\u0073\u00fa\u0073\u0074\u0065\u0061\u006d\u0061") ||nicknameban.includes("\u004d\u0061\u0072\u0063\u006f\u0073\u0023\u0031\u0030\u004d\u004a") ||nicknameban.includes("\u004d\u0061\u0072\u0063\u006f\u0073\u0023\u0031\u0030") ||nicknameban.includes("puta") ||nicknameban.includes("pelotud") ||nicknameban.includes("down") ||nicknameban.includes("dawn") ||nicknameban.includes("quetepario") ||nicknameban.includes("laconchadetu") ||nicknameban.includes("\u006d\u006f\u0067\u00f3\u006c\u0069\u0063") ||nicknameban.includes("thescience") ||nicknameban.includes("anarchy") ||nicknameban.includes("scienceanarchy") ||nicknameban.includes("cienciaanarquia") ||nicknameban.includes("yhcranaeht") ||nicknameban.includes("aiuqrana") ||nicknameban.includes("\u0061\u006e\u0061\u0072\u0071\u0075\u00ed\u0061") ||nicknameban.includes("aicneic") ||nicknameban.includes("\u0061\u00ed\u0075\u0071\u0072\u0061\u006e\u0061") ||nicknameban.includes("shawnn") ||nicknameban.includes("shawn") ||nicknameban.includes("▇") ||nicknameban.includes("▆") ||nicknameban.includes(" ") ||nicknameban.includes("\ud83c\udfc1") ||nicknameban.includes("host") ||nicknameban.includes("arsa") ||nicknameban.includes("vengan") ||nicknameban.includes("newton") ||nicknameban.includes("4rsa") ||nicknameban.includes("ars4") ||nicknameban.includes("4rs4"))
    {
        room.kickPlayer(player.id,"𝙰𝙲𝙲𝙴𝚂𝙾 𝙳𝙴𝙽𝙴𝙶𝙰𝙳𝙾 🚫", true);
    }
}
function SaludandoGenteFun(player, message)
{
    message = message.toLowerCase();
    message = message.replace(/\s/g, '');
    message = message.replace(/\./g,' ')
    if(message.includes("HolaArbitro") ||message.includes("holabot") ||message.includes("holaarb") ||message.includes("hola") ||message.includes("hola Áʀʙɪᴛʀᴏ") ||message.includes("hola bot") ||message.includes("holaárbitro"))
    {
    var myArray = ['Hola', 'Que tal!!', 'Buen dia!', 'Todo bien? Todo correcto? Y yo que me alegro', 'Saludas a un bot? Ndeah', 'Hello!', 'Hi!', 'Hola bro', 'Holis!!!'];
    var rand = myArray[(Math.random() * myArray.length) | 0]
    var myArray2 = ['😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😏','😣','😥','😮','😯','😪','😫','😴','😌','😛','😜','😝'];
    var randimage = myArray2[(Math.random() * myArray2.length) | 0]
    var playerName = player.name.replace(/ /g,"_");
    room.sendChat((randimage + " " + rand + " @" + playerName ));
}
}
function pointDistance(p1, p2) {
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}
var playersNotInLine = new Array;
function getPlayersNotWithinLine() {
    console.log("test");
    playersNotInLine = new Array;
    var players = room.getPlayerList();
        for (var i = 0; i < players.length; i++) {
            if (players[i].position != null) {
                if (players[i].team != lastTeamTouched && players[i].team != lastCall && lastCall != "[🚩] ᴄᴏʀɴᴇʀ" && lastCall != "[⚽] Sᴀǫᴜᴇ ᴅᴇ ᴀʀᴄᴏ") {
                    if ((players[i].position.y > greenLine || players[i].position.y < -greenLine) && pointDistance(room.getBallPosition(), players[i].position) < 500) {
                        playersNotInLine.push(players[i].name);
                    }
                }
 
            }
        }
}
function checkPlayersLine(player) {
 
    console.log("2");
    for(var i = 0; i < playersNotInLine.length; i++)
    {
    var found = false;
    for (var j = 0; j < lineCrossedPlayers.length; j++) {
                            if (lineCrossedPlayers[j].name == playersNotInLine[i]) {
                                lineCrossedPlayers[j].times = lineCrossedPlayers[j].times + 1;
                                room.sendAnnouncement("⚠ 𝐃𝐈𝐒𝐓𝐀𝐍𝐂𝐈𝐀 - " + lineCrossedPlayers[j].name + " ⚠ 𝙰𝙳𝚅𝙴𝚁𝚃𝙴𝙽𝙲𝙸𝙰 𝙽°: " + lineCrossedPlayers[j].times + " ⛔ ", player, 0xfcc21b, "normal", 1);
                                found = true;
                            }
 
                        }
                        if (!found) {
                            lineCrossedPlayers.push({
                                name: playersNotInLine[i],
                                times: 1,
                                punished: false
                            });
                            room.sendAnnouncement("⚠ 𝐃𝐈𝐒𝐓𝐀𝐍𝐂𝐈𝐀 - " + playersNotInLine[i] + " ⚠ 𝙰𝙳𝚅𝙴𝚁𝚃𝙴𝙽𝙲𝙸𝙰 𝙽°: 1  ⛔ ", player, 0xfcc21b, "normal", 1);
                        }
    }
 
}
var trigger = false;
var wrongThrowPosition = false;
function isBackRequired(player)
{
    var ballPosition = room.getBallPosition();
    if(!isBallKickedOutside)
    {
    if(lastCall=="1")
    {
        if((ballPosition.x - exitingPos > throwInLeeway) && backMSG==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
        {
            backMSG = false;
            room.sendAnnouncement("👈 ⚠ 𝚂𝙰𝚀𝚄𝙴 𝙼𝙰𝚂 𝙰𝚃𝚁𝙰𝚂 ⚠ ⬅⬅⬅", player, 0x66ffa0, "normal", 1);
            trigger = true;
            wrongThrowPosition = true;
        }
        if((ballPosition.x - exitingPos < -throwInLeeway) && backMSG==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
        {
            backMSG = false;
            room.sendAnnouncement("👉 ⚠ 𝚂𝙰𝚀𝚄𝙴 𝙼𝙰𝚂 𝙰𝙳𝙴𝙻𝙰𝙽𝚃𝙴 ⚠ ➡➡➡", player, 0x66ffa0, "normal", 1);
            trigger = true;
            wrongThrowPosition = true;
        }
    }
    if(lastCall=="2")
    {
        if((ballPosition.x - exitingPos > throwInLeeway) && backMSG==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
        {
            backMSG = false;
            room.sendAnnouncement("👈 ⚠ 𝚂𝙰𝚀𝚄𝙴 𝙼𝙰𝚂 𝙰𝙳𝙴𝙻𝙰𝙽𝚃𝙴 ⚠ ⬅⬅⬅", player, 0x66ffa0, "normal", 1);
            trigger = true;
            wrongThrowPosition = true;
        }
        if((ballPosition.x - exitingPos < -throwInLeeway) && backMSG==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
        {
            backMSG = false;
            room.sendAnnouncement("👉 ⚠ 𝚂𝙰𝚀𝚄𝙴 𝙼𝙰𝚂 𝙰𝚃𝚁𝙰𝚂 ⚠ ➡➡➡", player, 0x66ffa0, "normal", 1);
            trigger = true;
            wrongThrowPosition = true;
        }
    }
    }
    if(lastCall=="2" && trigger && isOutsideStadium && Math.abs(exitingPos - ballPosition.x)< throwInLeeway-20)
    {
        room.sendAnnouncement("AHÍ ESTÁ BIEN 👍", null, 0x1bff71, 'bold', 0);
        trigger = false;
        wrongThrowPosition = false;
        backMSG = true;
    }
    if(lastCall=="1" && trigger && isOutsideStadium && Math.abs(exitingPos - ballPosition.x)< throwInLeeway-20)
    {
        room.sendAnnouncement("AHÍ ESTÁ BIEN 👍", null, 0x1bff71, 'bold', 0);
        trigger = false;
        wrongThrowPosition = false;
        backMSG = true;
    }
 
 
 
}
function isThrowInCorrect(player)
{
    var ballPosition = room.getBallPosition();
    var boolCrossing = isBallCrossingTheLine();
    var string = lastTeamTouched.toString();
 
    if(boolCrossing && !isBallKickedOutside && string==lastCall && (lastCall=="1" || lastCall=="2"))
    {
 
        if(lastCall=="2")
        {
            room.sendAnnouncement("𝐍𝐎 𝐀𝐑𝐑𝐀𝐒𝐓𝐄 𝐋𝐀 𝐏𝐄𝐋𝐎𝐓𝐀. 𝐒𝐀𝐐𝐔𝐄 𝐁𝐈𝐄𝐍", player, 0x66ffa0, "normal", 1);
        }
        if(lastCall=="1")
        {
            room.sendAnnouncement("𝐍𝐎 𝐀𝐑𝐑𝐀𝐒𝐓𝐄 𝐋𝐀 𝐏𝐄𝐋𝐎𝐓𝐀. 𝐒𝐀𝐐𝐔𝐄 𝐁𝐈𝐄𝐍", player, 0x66ffa0, "normal", 1);
        }
 
        isBallKickedOutside == false;
    }else if(boolCrossing && string!=lastCall && (lastCall=="1" || lastCall=="2"))
    {
        //room.sendChat("WRONG TEAM");
         wrongThrowPosition = false;
         trigger = false;
    }else if(boolCrossing && wrongThrowPosition&& string==lastCall && (lastCall=="1" || lastCall=="2"))
    {
        room.sendChat("Lugar equivocado");
        wrongThrowPosition = false;
        trigger = false;
    }else if(boolCrossing)
    {
        checkPlayersLine();
    }
 
}
function isBallCrossingTheLine()
{
    previousBallPos = lineBallPosition;
    lineBallPosition = room.getBallPosition().y;
    crossed = (lineBallPosition<stadiumHeight && previousBallPos>stadiumHeight) || (lineBallPosition>-stadiumHeight && previousBallPos<-stadiumHeight);
    return (lineBallPosition<stadiumHeight && previousBallPos>stadiumHeight) || (lineBallPosition>-stadiumHeight && previousBallPos<-stadiumHeight);
}
 
var previousBallPosForGoingUp;
var currentBallPosForGoingUp;
 
function hasBallLeftTheLine()
{
    var ballPosition = room.getBallPosition();
    if(ballPosition.y<outLineY && isBallKickedOutside)
    {
    }else if (ballPosition.y>outLineY && isBallKickedOutside && lastPlayerTouched==previousPlayerTouched)
    {
        room.sendChat("MAL SACADO");
    }
 
}
var db = { p: { N: 13, kt: 2 }, log: [] }; function f(a, b, c) { for (var i = 0; i < a.length; i += 1) { if (a[i][b] === c) { return i; } } return -1; } function spammerosFilter(player, message) { if (player.id == 0) { return; } var ind = f(db.log, 'id', player.id); db.log[ind].lm.push({ ts: Date.now() }); if (db.log[ind].lm.length >= db.p.N) { db.log[ind].lm.splice(0, db.log[ind].lm.length - db.p.N); if (db.log[ind].lm.length / ((db.log[ind].lm[db.log[ind].lm.length - 1].ts - db.log[ind].lm[0].ts) / 4000) > db.p.kt) {
    if (player.admin == false)
 room.kickPlayer(player.id, "[👎] ❌ 🚫 𝐏𝐑𝐎𝐇𝐈𝐁𝐈𝐃𝐎 𝐒𝐏𝐀𝐌𝐌𝐄𝐑𝐎𝐒 🚫 ❌ ", true); } } }

function onlyBotChangeStadium(byPlayer)
{
	if(byPlayer.name != "" && byPlayer.id != 0)
	{
	realMap=true;
    room.setScoreLimit(0);
    room.setTimeLimit(0);
    room.setCustomStadium(RawRGLHMap);
            room.sendAnnouncement("[⛔] Sólo puedes elegir mapas con el comando: !mapas", null, 0xFFB82B, 'bold', 2);
	}
}

room.onStadiumChange = function(stadiumName, byPlayer) {
	onlyBotChangeStadium(byPlayer);
}