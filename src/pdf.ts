import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Funkcja do ładowania i wyświetlania PDF
function loadPDF(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
        const pdfData = new Uint8Array(event.target?.result as ArrayBuffer);
        renderPDF(pdfData);
    };
    reader.readAsArrayBuffer(file);
}

// Funkcja do renderowania PDF na canvasie
function renderPDF(pdfData: Uint8Array): void {
    const canvas: HTMLCanvasElement = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Użyj pdf.js do renderowania pliku PDF
    GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
    
    getDocument(pdfData).promise.then((pdf: PDFDocumentProxy) => {
        pdf.getPage(1).then((page: PDFPageProxy) => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });
    });
}

// Obsługuje wybór pliku PDF
document.getElementById('file-input')?.addEventListener('change', (event) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    
    if (file && file.type === 'application/pdf') {
        loadPDF(file);
    } else {
        alert('Proszę wybrać plik PDF!');
    }
});
