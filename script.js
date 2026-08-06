import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs";

// Cargar el PDF

const pdf = await pdfjsLib.getDocument("Portfolio Nuevo_web.pdf").promise;

// Contenedor principal

const viewer = document.getElementById("viewer");

// Crear estructura del libro

const book = document.createElement("div");
book.className = "book";

const leftCanvas = document.createElement("canvas");
leftCanvas.className = "page";

const gutter = document.createElement("div");
gutter.className = "book-gutter";

const rightCanvas = document.createElement("canvas");
rightCanvas.className = "page";

book.appendChild(leftCanvas);
book.appendChild(gutter);
book.appendChild(rightCanvas);

viewer.appendChild(book);

// Función para renderizar una página

async function renderPage(pageNumber, canvas) {

    const page = await pdf.getPage(pageNumber);

    const scale = 1.4;

    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");

    await page.render({
        canvasContext: context,
        viewport: viewport
    }).promise;

}

// Renderizar el primer spread

await renderPage(2, leftCanvas);
await renderPage(3, rightCanvas);
