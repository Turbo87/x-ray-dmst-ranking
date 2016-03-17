var request = require('request-promise');
var cheerio = require('cheerio');

function processPilotRanking($) {
    return $('#champion')
        .find('tbody tr')
        .map((index, row) => processPilotRankingRow($(row)))
        .toArray();
}

function processPilotRankingRow($row)  {
    var rank = parseInt($row.find('td:nth-child(1)').text());

    var nameColumn = $row.find('td:nth-child(2)').text().trim();
    var nameMatch = nameColumn.match(/(.+) \((\w+) \/ (\w+)\)/);
    if (!nameMatch)
        throw new Error('Could not parse name column: ' + nameColumn);

    var name = nameMatch[1];
    var country = nameMatch[2];
    var subcountry = nameMatch[3];

    var score = parseFloat($row.find('td:nth-child(3)').text().replace(',', '.'));
    var club = $row.find('td:nth-child(7)').text().trim();

    var flights = [4, 5, 6]
        .map(column => $row.find('td:nth-child(' + column + ')'))
        .map($col => processFlightScoreColumn($col))
        .filter(flight => !!flight);

    return {
        rank, name, country, subcountry, score, club, flights
    };
}

function processFlightScoreColumn($col) {
    var text = $col.text().trim();
    if (!text)
        return;

    var match = text.match(/(\d+(?:[\.,]\d+))pt\. \((\d+\.\d+)\)/);
    if (!match)
        throw new Error('Could not parse flight score column: ' + text);

    var score = parseFloat(match[1].replace(',', '.'));
    var date = match[2];

    var link = $col.find('a').prop('href');

    return { score, date, link };
}

var options = {
    uri: 'http://www.onlinecontest.org/olc-2.0/gliding/dmsteinzel.html?st=dmst&cl=open&sp=2015&c=DE&sc=nw',
    transform: body => cheerio.load(body, { normalizeWhitespace: true })
};

module.exports = request(options)
    .then($ => processPilotRanking($))
    .then(x => console.log(x));

module.exports.processPilotRanking = processPilotRanking;
