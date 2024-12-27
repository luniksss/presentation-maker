import { jsPDF } from "jspdf";
import { Editor } from "./EditorType";
import { SlideType } from "./PresentationType";

async function exportPresentationToPDF(editor: Editor): Promise<Editor> {
    const width = 850 * 0.264583; 
    const height = 525 * 0.264583; 

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",             
        format: [width, height]
    });

    doc.setFontSize(22);
    doc.text(editor.presentation.title, 400, 230);

    for (const slide of editor.presentation.slides) {
        await addSlideToPDF(doc, slide, width, height);
    }

    doc.save("presentation.pdf");
    return { ...editor };
}

async function addSlideToPDF(doc: jsPDF, slide: SlideType, width: number, height: number) {
    doc.addPage();
    const background = slide.background;

    if (background) {
        if (background.startsWith("#")) {
            doc.setFillColor(background);
            doc.rect(0, 0, width, height, 'F');
        } else {
            await new Promise<void>((resolve) => {
                const img = new Image();
                img.src = background;

                img.onload = () => {
                    doc.addImage(img, 'JPEG', 0, 0, width, height);
                    resolve();
                };
            });
        }
    }

    await addSlideContent(doc, slide);
}

async function addSlideContent(doc: jsPDF, slide: SlideType) {
    let currentX = 10;
    let currentY = 10;

    for (const element of slide.elements) {
        if (element.type === "text") {
            doc.setFontSize(14);
            currentX = element.position.x * 0.264583 ;
            currentY = element.position.y * 0.264583;
            doc.text(element.content, currentX, currentY);

        } else if (element.type === "image") {
            await new Promise<void>((resolve) => {
                const img = new Image();
                img.src = element.src;
                currentX = element.position.x * 0.264583;
                currentY = element.position.y * 0.264583;

                img.onload = () => {
                    doc.addImage(img, 'JPEG', currentX, currentY,
                        element.size.width * 0.264583,
                        element.size.height * 0.264583);
                    resolve();
                };
            });
        }
    }
}

function exportPresentation(editor: Editor): Editor {
    exportPresentationToPDF(editor).then(() => {
    }).catch((error) => {
        console.error("Error generating PDF:", error);
    });
    return { ...editor };
}

export { exportPresentation };