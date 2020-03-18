const url = require("url");
const charset = require("superagent-charset");
const superagent = require("superagent");
const eventproxy = require("eventproxy");
const cheerio = require("cheerio");
const lodash = require("lodash");

charset(superagent)

const baseUrl = 'https://cn.valutafx.com';

async function getRate(source, target) {
    const targetUrl = `${baseUrl}/${source}-${target}-history.htm`;
    let result = [];

    await superagent.get(targetUrl)
    .set('accept-encoding', 'gzip')
    .then((res, rej) => {
        if (rej) {
            console.log(rej);
            return;
        }
        let $ = cheerio.load(res.text);
        let arr = lodash.chunk($('#historyTable div').not('.pure-row-spacer').not('.currency-spacer'), 4);

        for (let index = 0; index < arr.length; index++) {
            if (!$(`#historyTable div.date[ds=${index}]`).find('.pure-g-cell').text()) {
                continue;
            }
            result.push({
                date: $(`#historyTable div.date[ds=${index}]`).find('.pure-g-cell').text(),
                week: $(`#historyTable div.weekday[ds=${index}]`).find('.pure-g-cell').text(),
                rate: $(`#historyTable div.currency-rate.pure-u-md-8-24[ds=${index}]`).find('.pure-g-cell').text(),
                rateReverse: $(`#historyTable div.currency-rate.pure-u-md-9-24[ds=${index}]`).find('.pure-g-cell').text()
            })
        }
    }).catch(e => {
        console.log('err====', e);
    });
    return result;
}

module.exports = getRate;