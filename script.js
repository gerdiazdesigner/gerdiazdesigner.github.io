import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs";

// ----------
// Cargar PDF
// ----------

const pdf = await pdfjsLib.getDocument("Portfolio Nuevo_web.pdf").promise;

// ----------
// Contenedor del libro
// ----------

const book = document.querySelector(".book");

// ----------
// Canvas
// ----------

const leftCanvas = document.createElement("canvas");
leftCanvas.className = "page";

const gutter = document.createElement("div");
gutter.className = "book-gutter";

const rightCanvas = document.createElement("canvas");
rightCanvas.className = "page";

book.appendChild(leftCanvas);
book.appendChild(gutter);
book.appendChild(rightCanvas);

// ----------
// Renderizar página
// ----------

async function renderPage(pageNumber, canvas){

    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale: 1 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");

    await page.render({

        canvasContext: context,
        viewport: viewport

    }).promise;

}

// ----------
// Primer spread
// ----------

await renderPage(2, leftCanvas);
await renderPage(3, rightCanvas);
