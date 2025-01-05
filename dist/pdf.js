function loadPDF(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const pdfData = new Uint8Array(event.target.result);
        renderPDF(pdfData);
    };
    reader.readAsArrayBuffer(file);
}

function renderPDF(pdfData) {
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    import('pdfjs-dist').then(function(pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
        
        pdfjsLib.getDocument(pdfData).promise.then(function(pdf) {
            pdf.getPage(1).then(function(page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });
            });
        });
    });
}

document.getElementById('file-input').addEventListener('change', function(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    
    if (file && file.type === 'application/pdf') {
        loadPDF(file);
    } else {
        alert('Proszę wybrać plik PDF!');
    }
});
