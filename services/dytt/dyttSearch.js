const url = require("url");
const charset = require("superagent-charset");
const superagent = require("superagent");
const eventproxy = require("eventproxy");
const cheerio = require("cheerio");
charset(superagent)

async function dyttSearch(keyword, page, pageSize, totalResult) {
  const baseUrl = "http://www.ygdy8.com";
  const search_baseUrl = "http://s.ygdy8.com/plus/so.php";
  const targetUrl = `${search_baseUrl}?keyword=${keyword}&searchtype=title&channeltype=0&orderby=&kwtype=0&pagesize=${pageSize}&typeid=0&TotalResult=${totalResult}&PageNo=${page}`;
  var movieInfoUrls = [];
  var movieInfo = [];
  await superagent.get(targetUrl).then((res, rej) => {
    if(rej){
      console.log(rej);
      return;
    }
    var $ = cheerio.load(res.text);
    var movieInfoUrl = "";
    $(".co_content8 ul table:not(:last-child) a").each((i, item) => {
      movieInfoUrl = `${baseUrl}${$(item).attr("href")}`;
      movieInfoUrls.push(movieInfoUrl);
    })
  })
  for (let index = 0; index < movieInfoUrls.length; index++) {
    await superagent.get(movieInfoUrls[index]).charset('GB2312').then((res, rej) => {
      var $ = cheerio.load(res.text);
      var name = $(".title_all font").text().replaceAndTrim();
      var coverImage = $("#Zoom span").eq(0).find("img").eq(0).attr("src");
      var downloadURL = [];
      var m = /^ftp:\/\//;
      $("#Zoom span").eq(0).find("a[href]").each((i, h) => {
        let flag = m.test($(h).attr("href"));
        if(flag) {
          downloadURL.push($(h).attr("href"))
        } 
      });
      movieInfo.push({name, coverImage, originURL: movieInfoUrls[index], downloadURL});
    })
  }
  
  return movieInfo;
}

module.exports = dyttSearch;