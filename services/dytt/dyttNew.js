const url = require("url");
const charset = require("superagent-charset");
const superagent = require("superagent");
const eventproxy = require("eventproxy");
const cheerio = require("cheerio");
charset(superagent)

async function dyttNew(page) {
  const baseUrl = 'http://www.dytt8.net';
  const targetUrl = page == 1 ? `${baseUrl}/html/gndy/dyzz/index.html` : `${baseUrl}/html/gndy/dyzz/list_23_${page}.html`;
  var movieInfoUrls = [];
  var movieInfo = [];
  await superagent.get(targetUrl).then((res, rej) => {
    if(rej){
      console.log(rej);
      return;
    }
    var $ = cheerio.load(res.text);
    var movieInfoUrl = "";
    $(".co_content8 ul a.ulink").each((i, item) => {
      movieInfoUrl = `${baseUrl}${$(item).attr("href")}`;
      movieInfoUrls.push(movieInfoUrl);
    })
  })
  for (let index = 0; index < movieInfoUrls.length; index++) {
    await superagent.get(movieInfoUrls[index]).charset('GB2312').then((res, rej) => {
      var $ = cheerio.load(res.text);
      var name = $(".title_all font").text().replaceAndTrim();
      var coverImage = $("#Zoom span").eq(0).find("img").eq(0).attr("src");
      var downloadURL = $("#Zoom span").eq(0).find("a[href]").eq(0).attr("href");
      movieInfo.push({name, coverImage, originURL: movieInfoUrls[index], downloadURL});
    })
  }
  
  return movieInfo;
}

module.exports = dyttNew