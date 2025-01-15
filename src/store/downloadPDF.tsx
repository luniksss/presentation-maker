import { jsPDF } from "jspdf"
import { Editor } from "./EditorType"
import { SlideType } from "./PresentationType"
import { MIN_SIZE, SLIDE_HEIGHT, SLIDE_WIDTH } from "../consts"
import PoppinsBase64 from "./fonts/PoppinsBase64"
import MerriweatherBase64 from "./fonts/MerriweatherBase64"
import MontserratBase64 from "./fonts/Montserrat_Base64"
import TimesNewRoman from "./fonts/TimesNewRoman_Base64"
import OpenSansBase64 from "./fonts/OpenSansBase64"
import VerdanaBase64 from "./fonts/VerdanaBase64"

async function exportPresentationToPDF(editor: Editor): Promise<Editor> {
    const width = SLIDE_WIDTH
    const height = SLIDE_HEIGHT
    const presentationName = editor.presentation.title

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [width, height]
    })

    addPoppinsFont(doc)
    addMerriweatherFont(doc)
    addMontserratFont(doc)
    addTimesNewRomanFont(doc)
    addOpenSansFont(doc)
    addVerdanaFont(doc)

    for (const slide of editor.presentation.slides) {
        await addSlideToPDF(doc, slide, width, height, editor)
    }

    presentationName !== '' ? doc.save(`${presentationName}.pdf`) : doc.save("presentation.pdf")
    return { ...editor }
}

async function addSlideToPDF(doc: jsPDF, slide: SlideType, width: number, height: number, editor: Editor) {
    if (slide !== editor.presentation.slides[0]) doc.addPage()
    const background = slide.background

    if (background) {
        if (background.startsWith("#")) {
            doc.setFillColor(background)
            doc.rect(0, 0, width, height, 'F')
        } else if (background.startsWith("linear-gradient")) {
            const gradientImage = await createGradientImage(background, width, height)
            doc.addImage(gradientImage, 'JPEG', 0, 0, width, height)
        } else {
            await new Promise<void>((resolve) => {
                const img = new Image();
                img.src = background

                img.onload = () => {
                    doc.addImage(img, 'JPEG', 0, 0, width, height)
                    resolve()
                }
            })
        }
    }

    await addSlideContent(doc, slide)
}

async function addSlideContent(doc: jsPDF, slide: SlideType) {
    for (const element of slide.elements) {
        if (element.type === "text") {
            doc.setFontSize(element.fontSize)
            doc.setTextColor(element.color)
            if (element.fontFamily) {
                doc.setFont(element.fontFamily)
            }
            const maxWidth = element.size.width;
            const textLines = doc.splitTextToSize(element.content, maxWidth);

            let startY = element.position.y + MIN_SIZE / 2;

            for (const line of textLines) {
                doc.text(line, element.position.x, startY);
                startY += element.fontSize;
            }
        } else if (element.type === "image") {
            await new Promise<void>((resolve) => {
                const img = new Image()
                img.src = element.src
                img.onload = () => {
                    doc.addImage(img, 'JPEG', element.position.x, element.position.y,
                        element.size.width,
                        element.size.height)
                    resolve()
                }
            })
        }
    }
}

function createGradientImage(gradientString: string, width: number, height: number): Promise<string> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error("Failed to get canvas context")

        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        const colors = parseGradientColors(gradientString)
        colors.forEach((colorStop) => {
            gradient.addColorStop(colorStop.position, colorStop.color)
        })

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
        const imageDataUrl = canvas.toDataURL('image/jpeg')
        resolve(imageDataUrl)
    });
}

function parseGradientColors(gradientString: string) {
    const regex = /linear-gradient\(([^)]+)\)/
    const match = gradientString.match(regex)

    if (!match) return []

    const colorStopsString = match[1]
    const colors = colorStopsString.split(',').map(color => color.trim())

    return colors.map((color, index) => ({
        position: index / (colors.length - 1),
        color: color,
    }))
}

function exportPresentation(editor: Editor): Editor {
    exportPresentationToPDF(editor).then(() => {
    }).catch((error) => {
        console.error("Error generating PDF:", error)
    })
    return { ...editor }
}

function addPoppinsFont(doc: jsPDF) {
    var fontName = "Poppins-Regular";
    var fontData = PoppinsBase64;
    doc.addFileToVFS(fontName + ".ttf", fontData);
    doc.addFont(fontName + ".ttf", "Poppins", "normal");
    doc.setFont(fontName);
}

function addMerriweatherFont(doc: jsPDF) {
    var fontName = "Merriweather-Regular";
    var fontData = MerriweatherBase64;
    doc.addFileToVFS(fontName + ".ttf", fontData);
    doc.addFont(fontName + ".ttf", "Merriweather", "normal");
    doc.setFont(fontName);
}

function addMontserratFont(doc: jsPDF) {
    var fontName = "Montserrat-Regular";
    var fontData = MontserratBase64;
    doc.addFileToVFS(fontName + ".ttf", fontData);
    doc.addFont(fontName + ".ttf", "Montserrat", "normal");
    doc.setFont(fontName);
}

function addTimesNewRomanFont(doc: jsPDF) {
    var fontName = "TimesNewRoman";
    var fontData = TimesNewRoman;
    doc.addFileToVFS(fontName + ".ttf", fontData);
    doc.addFont(fontName + ".ttf", "Times New Roman", "normal");
    doc.setFont(fontName);
}

function addOpenSansFont(doc: jsPDF) {
    var fontName = "OpenSans-Regular";
    var fontData = OpenSansBase64;
    doc.addFileToVFS(fontName + ".ttf", fontData);
    doc.addFont(fontName + ".ttf", "Open Sans", "normal");
    doc.setFont(fontName);
}

function addVerdanaFont(doc: jsPDF) {
    var fontName = "Verdana";
    var fontData = VerdanaBase64;
    doc.addFileToVFS(fontName + ".ttf", fontData);
    doc.addFont(fontName + ".ttf", "Verdana", "normal");
    doc.setFont(fontName);
}
export { exportPresentation }   