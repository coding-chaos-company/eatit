global.main = main;

function main() {
  const url = "https://eatit-4xol.onrender.com";
  UrlFetchApp.fetch(url).getContentText();
}
