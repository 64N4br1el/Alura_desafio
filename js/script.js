const toggleVisibility = (showResult) => {
    const defaultArea = document.querySelector("#default-area");
    const resultArea = document.querySelector("#result-area");

    if (showResult) {
        defaultArea.classList.add("hidden");
        resultArea.classList.remove("hidden");
    } else {
        defaultArea.classList.remove("hidden");
        resultArea.classList.add("hidden");
    }
};

const updateWarning = (message = "", color = "initial", fontSize = "initial") => {
    const warningText = document.querySelector("#warning-text");
    warningText.style.color = color;
    warningText.style.fontSize = fontSize;
    warningText.textContent = message;
};

const isValidInput = (text) => /^[a-z ]+$/.test(text.trim());

const encryptText = (translations) => {
    const inputTextElement = document.querySelector("#input-text");
    const inputText = inputTextElement.value.trim();
    const outputTextElement = document.querySelector("#output-text");

    updateWarning(); // Clear any previous warning

    if (!isValidInput(inputText)) {
        updateWarning("Solo letras minúsculas y sin acentos", "red", "16px");
        toggleVisibility(false);
        return;
    }

    const encryptedText = inputText
        .split('')
        .map(char => translations[char] || char)
        .join('');

    outputTextElement.value = encryptedText;
    toggleVisibility(true);
};

const decryptText = (translations) => {
    const inputTextElement = document.querySelector("#input-text");
    let inputText = inputTextElement.value.trim();
    const outputTextElement = document.querySelector("#output-text");

    updateWarning(); 

    if (!isValidInput(inputText)) {
        updateWarning("Solo letras minúsculas y sin acentos", "red", "16px");
        toggleVisibility(false);
        return;
    }

    Object.keys(translations).forEach(char => {
        const regex = new RegExp(translations[char], "g");
        inputText = inputText.replace(regex, char);
    });

    outputTextElement.value = inputText;
    toggleVisibility(true);
};

const copyToClipboard = () => {
    const outputTextElement = document.querySelector("#output-text");
    navigator.clipboard.writeText(outputTextElement.value)
        .then(() => {
            alert("Texto copiado al portapapeles.");
        })
        .catch(err => {
            alert("Error al copiar el texto: " + err);
        });
};

const encryptButton = document.querySelector('#encrypt-button');
const decryptButton = document.querySelector('#decrypt-button');
const copyButton = document.querySelector('#copy-button');

const translations = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

encryptButton.addEventListener('click', () => encryptText(translations));
decryptButton.addEventListener('click', () => decryptText(translations));
copyButton.addEventListener('click', copyToClipboard);
