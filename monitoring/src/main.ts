global.main = main;

function main() {
  const url = "https://eatit-7esa.onrender.com/";
  UrlFetchApp.fetch(url).getContentText();
}
