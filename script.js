// Função assíncrona para processar o arquivo.
async function processFile() {
    // Pega o elemento de entrada de arquivo pelo seu ID.
    const fileInput = document.getElementById('fileInput');
    // Pega o primeiro arquivo selecionado.
    const file = fileInput.files[0];

    if (file) {
        // Define o tamanho do chunk (pedaço) para 1MB.
        const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB
        // Calcula o número de chunks necessários para ler todo o arquivo.
        const chunks = Math.ceil(file.size / CHUNK_SIZE);

        // Itera sobre cada chunk.
        for (let i = 0; i < chunks; i++) {
            // Recorta um chunk do arquivo com base no índice atual.
            const blob = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
            // Processa o chunk. Como a função é assíncrona, ela espera a conclusão do processamento antes de continuar.
            await processChunk(blob);
        }
    }
}

// Função que processa um chunk (pedaço) do arquivo.
function processChunk(blob) {
    return new Promise((resolve, reject) => {
        // Cria uma nova instância de FileReader para ler o chunk.
        const reader = new FileReader();
        // Pega o primeiro elemento filho do elemento com ID 'jsonOutput'. Supõe-se que seja um elemento <code>.
        const outputElement = document.getElementById('jsonOutput').children[0];

        // Evento chamado quando a leitura do chunk é concluída.
        reader.onload = (event) => {
            // Pega o texto lido do chunk.
            const text = event.target.result;
            // Anexa o texto lido ao elemento <code>.
            outputElement.textContent += text;
            // Resolve a promessa.
            resolve();
        };

        // Evento chamado quando ocorre um erro na leitura do chunk.
        reader.onerror = (error) => {
            // Rejeita a promessa com um erro.
            reject(new Error("Erro ao ler o chunk: " + error.toString()));
        };

        // Inicia a leitura do blob (chunk) como texto.
        reader.readAsText(blob);
    });
}

// let fullText = ""; // Variável para armazenar o conteúdo completo do arquivo.
// let currentDisplayIndex = 0;
// const ITEMS_PER_LOAD = 25;

// async function processFile() {
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//         const CHUNK_SIZE = 1 * 1024 * 1024; 
//         const chunks = Math.ceil(file.size / CHUNK_SIZE);

//         for (let i = 0; i < chunks; i++) {
//             const blob = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
//             await processChunk(blob);
//             formatAndDisplayJSON();
//         }

//         document.addEventListener('scroll', onScroll);
//     }
// }

// function processChunk(blob) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             fullText += event.target.result;
//             resolve();
//         };

//         reader.onerror = (error) => {
//             reject(new Error("Erro ao ler o chunk: " + error.toString()));
//         };

//         reader.readAsText(blob);
//     });
// }

// function formatAndDisplayJSON() {
//     const jsonObject = safelyParseJSON(fullText);
//     if (jsonObject) {
//         displayNextItems(jsonObject);
//     }
// }

// function displayNextItems(jsonObject) {
//     const outputElement = document.getElementById('jsonOutput').children[0];
//     for(let i = 0; i < ITEMS_PER_LOAD && currentDisplayIndex < jsonObject.length; i++) {
//         const item = jsonObject[currentDisplayIndex];
//         const itemText = JSON.stringify(item, null, 2);
//         outputElement.textContent += itemText + "\n\n";
//         currentDisplayIndex++;
//     }
// }

// function onScroll() {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
//         const jsonObject = safelyParseJSON(fullText);
//         if (jsonObject) {
//             displayNextItems(jsonObject);
//         }
//     }
// }

// function safelyParseJSON(json) {
//     try {
//         return JSON.parse(json);
//     } catch (e) {
//         return null;
//     }
// }
