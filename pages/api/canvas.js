import {
  abbreviateNumber,
  changeratio,
  timeConverter,
  toPercent,
} from "./util.js";

const fillMixedText = (context, args, x, y) => {
  let defaultFillStyle = context.fillStyle;
  let defaultFont = context.font;

  context.save();
  args.forEach(({ text, fillStyle, font }) => {
    context.fillStyle = fillStyle || defaultFillStyle;
    context.font = font || defaultFont;
    context.fillText(text, x, y);
    x += context.measureText(text).width;
  });
  context.restore();
};

export const drawText = function (ctx, imgData) {
  const name = imgData.name;
  const description = imgData.description;

  // // normal, italic, bold
  // // px pt cm in rem em
  // // any installed or imported font
  // let fontFamily = 'Inter';
  // ctx.font = `normal 100px xyz, ${fontFamily}, monospace`;
  // ctx.fillStyle = 'cornflowerblue';
  // ctx.strokeStyle = '#bada55';
  // //textAlign center, left, right, end, start
  // ctx.textAlign = 'start';
  // //textBaseline top, hanging, middle, bottom,ideographic, alphabetic
  // ctx.textBaseline = 'alphabetic';
  // //direction ltr, rtl, inherit
  // ctx.direction = 'ltr';

  // // let txt = document.getElementById('msg').value;

  // let metrics = ctx.measureText(oldTxt);
  // let w = metrics.width;
  // ctx.clearRect(50, 110, w, -50);

  // if( txt == '' ) {
  // 	txt = 'Please give me a message.';
  // }

  // ctx.strokeText(txt, 50, 100);
  // oldTxt = txt;

  // ctx.fillStyle = '#999';
  // ctx.font = 'italic 20px Arial';
  // let m = `Message is ${w}px wide`;
  // ctx.clearRect(50, 310, 500, -30);
  // ctx.fillText(m, 50, 300);
};

// const nooftrades = imgData.noOfTrades;
// const gas = abbreviateNumber(imgData.gasUSD);
// const valueoftrades = abbreviateNumber(imgData.value); // 2DP
// const favpair = imgData.favPair;
// const favpairamt = abbreviateNumber(imgData.favPairValue); // 2DP
// const avgtradesize = "$" + abbreviateNumber(imgData.avgTrade); // 2DP
// const biggesttradevalue = "$" + abbreviateNumber(imgData.maxTrade); // 2DP
// const biggesttradedate = timeConverter(imgData.maxDate); // DATE FORMATTER
// const smallesttradevalue = "$" + abbreviateNumber(imgData.minTrade); // 2DP
// const smallesttradedate = timeConverter(imgData.minDate); // DATE FORMATTER
// let rank;
// let avgtradesizepctcomp;
// const usertradevolume = imgData.value;

//from 3 mil wallets for eth
// const defi1 = 10.99; // 1 percentile
// const defi10 = 66.08; // 10 percentile
// const defi20 = 184.3; // 20 percentile
// const defi25 = 252.31; // 25 percentile
// const defi30 = 379.28; // 30 percentile
// const defi40 = 704.01; // 40 percentile
// const defi50 = 1248.97; // 50 percentile
// const defi60 = 2337.12; // 60 percentile
// const defi70 = 4683.66; // 70 percentile
// const defi75 = 6817.66; // 75 percentile
// const defi80 = 11033.52; // 80 percentile
// const defi90 = 38841.95; // 90 percentile
// const defi99 = 3661023.91; // 99 percentile

// for polygon
// const defi1 = 0.1; // 1 percentile
// const defi10 = 0.2; // 10 percentile
// const defi20 = 5.6; // 20 percentile
// const defi25 = 8.9; // 25 percentile
// const defi30 = 12; // 30 percentile
// const defi40 = 31; // 40 percentile
// const defi50 = 113; // 50 percentile
// const defi60 = 298; // 60 percentile
// const defi70 = 769; // 70 percentile
// const defi75 = 1424; // 75 percentile
// const defi80 = 2079; // 80 percentile
// const defi90 = 85765; // 90 percentile
// const defi99 = 34072; // 99 percentile
// let highlightcolour = "#fb923c";

// const ranking = [
// 	defi99,
// 	defi90,
// 	defi80,
// 	defi70,
// 	defi60,
// 	defi50,
// 	defi40,
// 	defi30,
// 	defi20,
// 	defi10,
// 	defi1,
// ];

// let percentile = 99;
// for (let i = 0; i < ranking.length; i++) {
// 	if (usertradevolume >= parseInt(ranking[i])) {
// 		avgtradesizepctcomp = percentile;
// 		break;
// 	}

// 	if (i == 0 || i == 9) {
// 		percentile -= 9;
// 	} else {
// 		percentile -= 10;
// 	}
// }

// if (usertradevolume >= 2000000) {
// 	rank = "DEFI GOD";
// } else if (usertradevolume >= defi75) {
// 	rank = "DEFI GOAT";
// } else if (usertradevolume >= defi50) {
// 	rank = "DEFI PUNK";
// } else if (usertradevolume >= defi25) {
// 	rank = "DEFI DOGE";
// } else if (usertradevolume >= defi1) {
// 	rank = "DEFI BABY";
// } else if (usertradevolume < defi1) {
// 	rank = "DEFI NOOB";
// 	avgtradesizepctcomp = 0;
// }

// let fontFamily = "Inter";

// let fontSize = changeratio(90);
// let positionFromLeft = changeratio(85);
// let positionFromTop = changeratio(477.5);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = "white";
// ctx.fillText(
// 	`YOUR DEX JOURNEY `,
// 	`${positionFromLeft}`,
// 	`${positionFromTop}`
// );

// positionFromTop = changeratio(590);

// const args = [
// 	{ text: "SINCE ", fillStyle: "white" },
// 	{ text: "2021", fillStyle: highlightcolour },
// ];
// fillMixedText(ctx, args, positionFromLeft, positionFromTop);

// fontSize = changeratio(50);
// positionFromTop = changeratio(825 + 215);

// ctx.textAlign = "left";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// const args2 = [
// 	{ text: "MADE ", fillStyle: "white" },
// 	{ text: `${nooftrades}`, fillStyle: highlightcolour },
// 	{ text: " TRADES", fillStyle: "white" },
// ];
// fillMixedText(ctx, args2, positionFromLeft, positionFromTop);

// positionFromTop = changeratio(900 + 215);

// const args3 = [
// 	{ text: "SPENT ", fillStyle: "white" },
// 	{ text: `$${gas}`, fillStyle: highlightcolour },
// 	{ text: " IN GAS", fillStyle: "white" },
// ];
// fillMixedText(ctx, args3, positionFromLeft, positionFromTop);

// positionFromTop = changeratio(975 + 215);

// const args4 = [
// 	{ text: "TRADING A TOTAL OF ", fillStyle: "white" },
// 	{ text: `$${valueoftrades}`, fillStyle: highlightcolour },
// ];
// fillMixedText(ctx, args4, positionFromLeft, positionFromTop);

// fontSize = changeratio(70);
// positionFromLeft = changeratio(110);
// positionFromTop = changeratio(1167.5 + 215);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = "white";
// ctx.textAlign = "left";
// ctx.fillText(
// 	`YOUR FAVORITE PAIR IS..`,
// 	`${positionFromLeft}`,
// 	`${positionFromTop}`
// );

// fontSize = changeratio(75);
// positionFromLeft = changeratio(1412.5);
// positionFromTop = changeratio(1325 + 215);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = highlightcolour;
// ctx.textAlign = "right";
// ctx.fillText(`${favpair}`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1412.5);
// positionFromTop = changeratio(1480 + 215);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = "white";
// ctx.textAlign = "right";
// ctx.fillText(`YOU TRADED`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1145);
// positionFromTop = changeratio(1577.5 + 215);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = highlightcolour;
// ctx.textAlign = "right";
// ctx.fillText(`$${favpairamt}`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1412.5);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = "white";
// ctx.textAlign = "right";
// ctx.fillText("OF IT...", positionFromLeft, positionFromTop);

// fontSize = changeratio(50);
// positionFromLeft = changeratio(85);
// positionFromTop = changeratio(1737.5 + 215);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.textAlign = "left";
// ctx.fillText(
// 	"YOUR AVERAGE TRADE SIZE IS ",
// 	positionFromLeft,
// 	positionFromTop
// );

// fontSize = changeratio(80);
// ctx.fillStyle = highlightcolour;
// positionFromLeft = changeratio(85 + 780);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.textAlign = "left";
// const args5 = [
// 	{ text: `${avgtradesize}`, fillStyle: highlightcolour },
// 	{ text: ",", fillStyle: "white" },
// ];
// fillMixedText(ctx, args5, positionFromLeft, positionFromTop);

// fontSize = changeratio(50);
// positionFromLeft = changeratio(85);
// positionFromTop = changeratio(1805 + 235);

// ctx.fillStyle = "white";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.textAlign = "left";
// ctx.fillText("TRADING MORE THAN", positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(85 + 575);
// positionFromTop = changeratio(1805 + 235);

// fontSize = changeratio(80);
// ctx.fillStyle = highlightcolour;
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.textAlign = "left";
// ctx.fillText(`${avgtradesizepctcomp}%`, positionFromLeft, positionFromTop);

// // IF LESS THAN 10%
// if (usertradevolume < defi10) {
// 	// IF MORE THAN 1%
// 	if (usertradevolume >= defi1) {
// 		positionFromLeft = changeratio(85 + 575 + 125);
// 		// IF LESS THAN 1%
// 	} else {
// 		positionFromLeft = changeratio(85 + 575 + 140);
// 	}
// 	// IF MORE THAN 10%
// } else {
// 	positionFromLeft = changeratio(85 + 575 + 190);
// }

// fontSize = changeratio(50);

// ctx.fillStyle = "white";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.textAlign = "left";
// ctx.fillText("OF DEXSTERS", positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(85);
// positionFromTop = changeratio(1980 + 217);
// fontSize = changeratio(50);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = "white";
// ctx.fillText(`BIGGEST TRADE`, positionFromLeft, positionFromTop);

// positionFromTop = changeratio(2155 + 210);

// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = "white";
// ctx.fillText(`SMALLEST TRADE`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1140);
// positionFromTop = changeratio(1980 + 217);

// ctx.textAlign = "right";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = highlightcolour;
// ctx.fillText(`${biggesttradevalue}`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1140 + 110);

// ctx.textAlign = "left";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillText(`${biggesttradedate}`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1140);
// positionFromTop = changeratio(2155 + 210);

// ctx.textAlign = "right";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillStyle = highlightcolour;
// ctx.fillText(`${smallesttradevalue}`, positionFromLeft, positionFromTop);

// positionFromLeft = changeratio(1140 + 110);

// ctx.textAlign = "left";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// ctx.fillText(`${smallesttradedate}`, positionFromLeft, positionFromTop);

// fontSize = changeratio(92);
// positionFromLeft = changeratio(85);
// positionFromTop = changeratio(815);

// ctx.textAlign = "left";
// ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
// const args9 = [
// 	{ text: "YOU ARE A | ", fillStyle: "white" },
// 	{ text: `${rank}`, fillStyle: highlightcolour },
// ];
// fillMixedText(ctx, args9, positionFromLeft, positionFromTop);
