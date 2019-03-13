const readline = require('readline-sync')
const robots = {
    text: require('./robots/text')
};

async function start() {
    const content = {};

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    await robots.text(content);

    function askAndReturnSearchTerm() {
        return readline.question('Escreva um termo para pesquisa na Wiki:')
    }

    function askAndReturnPrefix() {
        const prefixes = ['Oque é', 'What Is', 'The History'];
        const selectedPrefix = readline.keyInSelect(prefixes);
        const selectedPrefixText = prefixes[selectedPrefix];

        return selectedPrefixText;
    }

    console.log(content)
}

start();
