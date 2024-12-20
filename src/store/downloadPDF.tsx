import { PDFDocument, rgb } from 'pdf-lib';
import { Editor } from "./EditorType";

function exportPresentationToPDF(editor: Editor): Editor {
    const pdfDocPromise = PDFDocument.create();

    pdfDocPromise.then(async (pdfDoc) => {
        const slidePromises = editor.presentation.slides.map(async (slide) => {
            const page = pdfDoc.addPage([850, 525]);

            if (slide.background.startsWith('#')) {
                page.drawRectangle({
                    x: 0,
                    y: 0,
                    width: 850,
                    height: 525,
                    color: rgb(
                        parseInt(slide.background.slice(1, 3), 16) / 255,
                        parseInt(slide.background.slice(3, 5), 16) / 255,
                        parseInt(slide.background.slice(5, 7), 16) / 255
                    ),
                });
            } else {
                const imgBytes = await fetch(slide.background).then(res => res.arrayBuffer());
                const image = await pdfDoc.embedPng(imgBytes);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: page.getWidth(),
                    height: page.getHeight(),
                });
            }

            slide.elements.forEach(async (element) => {
                if (element.type === 'text') {
                    const font = await pdfDoc.embedFont('Helvetica');
                    page.drawText(element.content, {
                        x: element.position.x,
                        y: element.position.y,
                        size: element.fontSize,
                        color: rgb(0, 0, 0),
                        font: font,
                    });
                }
                if (element.type === 'image') {
                    const imgBytes = await fetch(element.src).then(res => res.arrayBuffer());
                    let pdfImage = await pdfDoc.embedJpg(imgBytes);

                    page.drawImage(pdfImage, {
                        x: element.position.x,
                        y: element.position.y,
                        width: element.size.width,
                        height: element.size.height,
                    });
                }
            });
        });

        // Wait for all slides to be processed
        await Promise.all(slidePromises);

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "presentation.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    });
    return { ...editor }; // Return the editor object
}

export { exportPresentationToPDF };
