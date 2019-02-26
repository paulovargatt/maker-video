const readline = require('readline-sync')

function start() {
        const content = {}

        content.searchTerm = askAndReturnSearchTerm()
        content.prefix = askAndReturnPrefix()

        function askAndReturnSearchTerm() {
                return readline.question('Escreva um termo para pesquisa na Wiki:')
        }

        function askAndReturnPrefix() {
                const prefixes = ['Oque é', 'What Is', 'The History'];
                const selectedPrefix = readline.keyInSelect(prefixes);
                const selectedPrefixText = prefixes[selectedPrefix]
                return selectedPrefixText;
        }

        
        console.log(content)
}

start()