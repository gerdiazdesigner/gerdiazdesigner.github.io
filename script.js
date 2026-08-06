import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs";

const pdf = await pdfjsLib.getDocument("Portfolio Nuevo_web.pdf").promise;

const page = await pdf.getPage(1);

const scale = 1.5;

const viewport = page.getViewport({ scale });

const canvas = document.createElement("canvas");

const context = canvas.getContext("2d");

canvas.width = viewport.width;
canvas.height = viewport.height;

document.getElementById("portfolio").appendChild(canvas);

await page.render({
    canvasContext: context,
    viewport: viewport
}).promise;
