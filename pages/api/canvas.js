import {
	abbreviateNumber,
	changeratio,
	timeConverter,
	toPercent,
	wrapText,
	getShortAccountHash,
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
	const walletaddress = "0x7eF199087327207034feACd05832E61035FCA929"

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	
	const date = today = dd + '/' + mm + '/' + yyyy;

	let fontFamily = "Oxygen";
	let fontSize = changeratio(90);
	let positionFromLeft = changeratio(350);
	let positionFromTop = changeratio(1690);

	ctx.textAlign = "center";
	ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
	ctx.fillStyle = "white";
	ctx.fillText(
		`${name}`,
		`${positionFromLeft}`,
		`${positionFromTop}`
	);

	var maxWidth = 1680;
	var lineHeight = 290;
	var x = 2000;
	var y = 1680;

	ctx.textAlign = "start";
	fontSize = changeratio(70);
	ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
	ctx.fillStyle = "black";

	wrapText(ctx, description, x, y, maxWidth, lineHeight);

	positionFromLeft = changeratio(1400);
	positionFromTop = changeratio(440);

	fontSize = changeratio(70);
	ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
	ctx.fillStyle = "black";
	ctx.fillText(
		`${date}`,
		`${positionFromLeft}`,
		`${positionFromTop}`
	);

	positionFromLeft = changeratio(300);
	positionFromTop = changeratio(1795);

	fontSize = changeratio(45);
	ctx.font = `bold ${fontSize}px ${fontFamily}, Arial`;
	ctx.fillStyle = "white";
	ctx.fillText(
		`(` + getShortAccountHash(`${walletaddress}` + `)`),
		`${positionFromLeft}`,
		`${positionFromTop}`
	);
};



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