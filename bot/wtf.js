const fetch = require('node-fetch');
const xmlParser = require('xml2json');

const API_URL = 'http://acronyms.silmaril.ie/cgi-bin/xaa';

const wtf = async (message, acronym) => {
  const xml = await fetch(`${API_URL}?${acronym}`).then((res) => res.text());
  const data = JSON.parse(xmlParser.toJson(xml));

  const n = parseInt(data.acronym.found.n, 10);

  if (1 === n) {
    const text = data.acronym.found.acro.expan;
    message.channel.send(`${acronym.toUpperCase()}: ${text}`);
  } else if (n > 1) {
    let text = data.acronym.found.acro[0].expan;

    let i = 0;
    while (text.indexOf('(code)') >= 0) {
      text = data.acronym.found.acro[++i].expan;
    }

    message.channel.send(`${acronym.toUpperCase()}: ${text}`);
  } else {
    message.channel.send('Terme inconnu.');
  }
};

module.exports = wtf;
