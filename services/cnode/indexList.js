const url = require("url");
const superagent = require("superagent");
const eventproxy = require("eventproxy");
const cheerio = require("cheerio");

async function indexList(page, tab) {
  const targetUrl = "https://cnodejs.org/";
  var topicUrls = [];
  let pageUrl = url.resolve(targetUrl, `/?tab=${tab}&page=${page}`);
  await superagent.get(pageUrl).then((res, rej) => {
    if (rej) {
      return console.log(rej);
    }
    var $ = cheerio.load(res.text);
    $("#topic_list .cell").each((index, ele) => {
      var href = url.resolve(targetUrl, $(ele).find(".topic_title").attr("href"));
      var title = $(ele).find(".topic_title").attr("title");
      var repliesCount = $(ele).find(".count_of_replies").html().replaceAndTrim();
      var visitsCount = $(ele).find(".count_of_visits").html().replaceAndTrim();
      var classify = $(ele).find(".topic_title_wrapper span").text();
      topicUrls.push({ title, href, classify, repliesCount, visitsCount });
    });
  });

  return topicUrls;
}

module.exports = indexList;
