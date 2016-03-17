var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;

var processPilotRanking = require('..').processPilotRanking;

describe('processPilotRanking()', function() {
    it('can read open-2015-nw.html', function() {
        var result = processPilotRanking(loadFixture('open-2015-nw'));
        expect(result, 'result').to.have.length(50);

        var first = result[0];
        expect(first, 'first').to.have.property('rank', 1);
        expect(first, 'first').to.have.property('name', 'Wilfried Großkinsky');
        expect(first, 'first').to.have.property('country', 'DE');
        expect(first, 'first').to.have.property('subcountry', 'NW');
        expect(first, 'first').to.have.property('score', 2654.52);
        expect(first, 'first').to.have.property('club', 'LSF Dahlemer Binz');
        expect(first, 'first').to.have.property('flights');
        expect(first.flights, 'first.flights').to.have.length(3);
        expect(first.flights[0], 'first.flights[0]').to.have.property('score', 968.24);
        expect(first.flights[0], 'first.flights[0]').to.have.property('date', '31.07');
        expect(first.flights[0], 'first.flights[0]').to.have.property('link', 'flightinfo.html?dsId=4604259');
        expect(first.flights[1], 'first.flights[1]').to.have.property('score', 862.52);
        expect(first.flights[1], 'first.flights[1]').to.have.property('date', '18.04');
        expect(first.flights[1], 'first.flights[1]').to.have.property('link', 'flightinfo.html?dsId=4238508');
        expect(first.flights[2], 'first.flights[2]').to.have.property('score', 823.76);
        expect(first.flights[2], 'first.flights[2]').to.have.property('date', '21.05');
        expect(first.flights[2], 'first.flights[2]').to.have.property('link', 'flightinfo.html?dsId=4350062');

        var fourNine = result[48];
        expect(fourNine, 'fourNine').to.have.property('rank', 49);
        expect(fourNine, 'fourNine').to.have.property('name', 'Ingo Zoyke');
        expect(fourNine, 'fourNine').to.have.property('country', 'DE');
        expect(fourNine, 'fourNine').to.have.property('subcountry', 'NW');
        expect(fourNine, 'fourNine').to.have.property('score', 748.41);
        expect(fourNine, 'fourNine').to.have.property('club', 'LSG Paderborn');
        expect(fourNine, 'fourNine').to.have.property('flights');
        expect(fourNine.flights, 'fourNine.flights').to.have.length(1);
        expect(fourNine.flights[0], 'fourNine.flights[0]').to.have.property('score', 748.41);
        expect(fourNine.flights[0], 'fourNine.flights[0]').to.have.property('date', '07.06');
        expect(fourNine.flights[0], 'fourNine.flights[0]').to.have.property('link', 'flightinfo.html?dsId=4433734');
    })
});

function loadFixture(name) {
    var content = fs.readFileSync(__dirname + '/fixtures/' + name + '.html', { encoding: 'utf-8' });
    return cheerio.load(content, { normalizeWhitespace: true });
}
