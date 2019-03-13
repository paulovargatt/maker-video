const algorithmia = require('algorithmia');
const crediantialAlgorithmia = require('../credentials/algorithmia.json');
const sbd = require('sbd');


async function robot(content) {
    await fetchContentWikipedia(content);
    await sanitizeContent(content)
    breakContentIntoSentences(content)
    async function fetchContentWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(crediantialAlgorithmia.apiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2?timeout=300");
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();
        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal);
        const withoutDates = removeDates(withoutBlankLinesAndMarkdown)
        content.sourceContentSanitized = withoutDates;
        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n');
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false;
                }
                return true
            });
            return withoutBlankLinesAndMarkdown.join(' ');
        }
    }

    function removeDates(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
    }

    function breakContentIntoSentences(content) {
        content.sentences = [];
        const sentences = sbd.sentences(content.sourceContentSanitized);
       sentences.forEach((sentence) => {
           content.sentences.push({
               text: sentence,
               keywords: [],
               images: []
           })
       })
    }
}

module.exports = robot;
