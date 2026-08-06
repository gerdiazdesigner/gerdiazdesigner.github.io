import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs";

// =========================
// CARGAR PDF
// =========================

const pdf = await pdfjsLib.getDocument("Portfolio Nuevo_web.pdf").promise;

// =========================
// CONTENEDOR DEL LIBRO
// =========================

const book = document.querySelector(".book");

// =========================
// CREAR CANVAS
// =========================

const leftCanvas = document.createElement("canvas");
leftCanvas.className = "page";

const gutter = document.createElement("div");
gutter.className = "book-gutter";

const rightCanvas = document.createElement("canvas");
rightCanvas.className = "page";

book.appendChild(leftCanvas);
book.appendChild(gutter);
book.appendChild(rightCanvas);

// =========================
// RENDERIZAR UNA PÁGINA
// =========================

async function renderPage(pageNumber, canvas) {

    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({
        scale: 1
    });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");

    await page.render({
        canvasContext: context,
        viewport: viewport
    }).promise;

}

// =========================
// RENDERIZAR UN SPREAD
// =========================

async function renderSpread(spread) {

    const leftPage = 2 + (spread * 2);
    const rightPage = leftPage + 1;

    await renderPage(leftPage, leftCanvas);
    await renderPage(rightPage, rightCanvas);

}

// =========================
// ESTADO DEL VISOR
// =========================

let currentSpread = 0;

// =========================
// MOSTRAR PRIMER SPREAD
// =========================

await renderSpread(currentSpread);
