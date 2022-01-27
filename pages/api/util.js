import { ethers } from "ethers";

export const login = async ({ setAddr }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const walletAddress = await signer.getAddress();
  setAddr(walletAddress);
};

export function getShortAccountHash(account) {
  const accountHash = String(account);
  if (accountHash) {
    return (
      accountHash.slice(0, 6) +
      "..." +
      accountHash.slice(-4, accountHash.length)
    );
  } else {
    return "Login";
  }
}

export function abbreviateNumber(number) {
  const SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];

  number = Number(number).toFixed(2);

  const tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(2) + suffix;
}

export function changeratio(x) {
  var y = 1.5;
  return x * y;
}

export function toPercent(number, float) {
  var percent = parseFloat(number * 100).toFixed(float) + "%";
  return percent;
}

export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  // var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  // var hour = a.getHours();
  // var min = a.getMinutes();
  // var sec = a.getSeconds();
  // var time =
  //   date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  var display = date + " " + month;
  return display;
}

export function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

export const round = (num) => {
  return Math.round(num * 10000) / 10000;
};
