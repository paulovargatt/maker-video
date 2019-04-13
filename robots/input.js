const readline = require('readline-sync')
const state = require('./state.js');

function robot() {

    const content = {
        maximumSentences: 7
    };

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    state.save(content);

    function askAndReturnSearchTerm() {
        return readline.question('Escreva um termo para pesquisa na Wiki:')
    }

    function askAndReturnPrefix() {
        const prefixes = ['Oque é', 'What Is', 'The History'];
        const selectedPrefix = readline.keyInSelect(prefixes);
        const selectedPrefixText = prefixes[selectedPrefix];

        return selectedPrefixText;
    }
}

module.exports = robot;