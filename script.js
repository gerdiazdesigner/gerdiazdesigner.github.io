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
// ESTADO DEL VISOR
// =========================

let currentSpread = 0;
const totalSpreads = Math.floor((pdf.numPages - 1) / 2);

// Bloqueo para evitar múltiples cambios por un solo scroll
let isScrolling = false;

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

    updateButtons();

}

// =========================
// BOTONES
// =========================

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function updateButtons() {

    prevButton.disabled = currentSpread === 0;
    nextButton.disabled = currentSpread >= totalSpreads - 1;

}

nextButton.addEventListener("click", async () => {

    if (currentSpread >= totalSpreads - 1) return;

    currentSpread++;

    await renderSpread(currentSpread);

});

prevButton.addEventListener("click", async () => {

    if (currentSpread <= 0) return;

    currentSpread--;

    await renderSpread(currentSpread);

});

// =========================
// SCROLL
// =========================

window.addEventListener("wheel", async (event) => {

    event.preventDefault();

    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0) {

        if (currentSpread < totalSpreads - 1) {

            currentSpread++;
            await renderSpread(currentSpread);

        }

    } else {

        if (currentSpread > 0) {

            currentSpread--;
            await renderSpread(currentSpread);

        }

    }

    setTimeout(() => {

        isScrolling = false;

    }, 350);

}, { passive: false });

// =========================
// INICIO
// =========================

await renderSpread(currentSpread);
