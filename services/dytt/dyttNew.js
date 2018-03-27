const url = require("url");
const superagent = require("superagent");
const eventproxy = require("eventproxy");
const cheerio = require("cheerio");

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

  movieInfoUrls.forEach(async (url) => {
    await superagent.get(url).then((res, rej) => {
      var $ = cheerio.load(res.text);
      var name = $(".title_all font").html().replaceAndTrim();
      var coverImage = $("#Zoom span").eq(0).find("img").eq(0).attr("src");
      var downloadUrl = $("#Zoom span").eq(0).find("a[thundertype]").attr("tmfgeulm");
      // var content = $("#Zoom span").eq(0).html().replaceAndTrim();
      movieInfo.push({name, coverImage, downloadUrl});
    })
    console.log(movieInfo)
  })

  return movieInfo;
  
}

module.exports = dyttNew