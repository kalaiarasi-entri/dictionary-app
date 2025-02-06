document.getElementById('searchButton').addEventListener('click', async function (event) {
    event.preventDefault();
    let word = document.getElementById('searchInput').value.trim();
    let resultDiv = document.getElementById('result');

    if (word === "") {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "Please enter a word.";
        return;
    }

    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<i class="bi bi-search"></i> Searching...`;

    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = '';
            // Extract phonetic, meaning, definition, and example
            let phonetic = data[0]?.phonetic || "No phonetic available";
            let meanings = data[0]?.meanings?.[0];
            let partOfSpeech = meanings?.partOfSpeech || "No part of speech available";
            let definition = meanings?.definitions?.[0]?.definition || "No definition found.";
            let example = meanings?.definitions?.[0]?.example || "No example available.";
            console.log(response);

            // Update HTML elements with results
            resultDiv.innerHTML = `<strong>Part of Speech:</strong> ${partOfSpeech} <br>
            <strong>Definition:</strong> ${definition} <br>
            <strong>Example:</strong> ${example} <br>
            <strong>Phonetic:</strong> ${phonetic}`;
        } else {
            resultDiv.innerHTML = "Word not found. Try another word.";
        }
    } catch (error) {
        resultDiv.innerHTML = error;
    }
});
