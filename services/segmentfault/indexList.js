const url = require("url");
const superagent = require("superagent");
const eventproxy = require("eventproxy");
const cheerio = require("cheerio");

async function indexList(page) {
 const targetUrl = "https://segmentfault.com/";
 var dataList = [];

 await superagent.get(targetUrl).then((res, rej) => {
  if (rej) {
   console.log(rej);
   return;
  }
  var $ = cheerio.load(res.text);
  $(".container .middle .news-list .news-item").each((i, item) => {
   var question = $(item).find(".stream__item-zan-number").text().replaceAndTrim();
   var title = $(item).find(".news__item-title .mr10").text().replaceAndTrim();
   var href = url.resolve(targetUrl, $(item).find(".news__item-title .mr10").attr("href"));
   var tags = [];
   $(item).find(".taglist--inline li").each((i, tag) => {
    tags.push($(tag).find('a').text().replaceAndTrim());
   });
   var time = $(item).find(".news__item-meta span").eq(1).text().replaceAndTrim();
   var replyCounts = $(item).find(".news__item-meta .text-info a").text().replaceAndTrim();
   dataList.push({
    title,
    href,
    tags,
    question,
    time,
    replyCounts
   })
  });
 })
 return dataList;
}

module.exports = indexList