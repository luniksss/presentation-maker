import { jsPDF } from "jspdf"
import { Editor } from "./EditorType"
import { SlideType } from "./PresentationType"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../consts";

async function exportPresentationToPDF(editor: Editor): Promise<Editor> {
    const width = SLIDE_WIDTH
    const height = SLIDE_HEIGHT 
    const presentationName = editor.presentation.title

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",             
        format: [width, height]
    })

    for (const slide of editor.presentation.slides) {
        await addSlideToPDF(doc, slide, width, height, editor)
    }

    presentationName !== '' ? doc.save(`${presentationName}.pdf`) : doc.save("presentation.pdf") 
    return { ...editor }
}

async function addSlideToPDF(doc: jsPDF, slide: SlideType, width: number, height: number, editor: Editor) {
    if (slide  !== editor.presentation.slides[0]) doc.addPage()
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
            console.log(element)
            doc.setFontSize(element.fontSize)
            doc.setTextColor(element.color)
            if (element.fontFamily) {
                doc.setFont(element.fontFamily)
            }
            doc.text(element.content, element.position.x, element.position.y)
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

export { exportPresentation }   