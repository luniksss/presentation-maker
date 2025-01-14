import { DEFAULT_SCALE, MEDIUM_NOTEBOOK_SCALE, MEDIUM_NOTEBOOK_WIDTH, MEDIUM_SLIDELIST_SCALE, MIN_NOTEBOOK_SCALE, MIN_NOTEBOOK_SLIDELIST_SCALE, MIN_NOTEBOOK_WIDTH, MIN_SLIDELIST_SCALE, MIN_WIDTH, MIN_WIDTH_SCALE, SLIDE_DOWNLOAD_PREVIEW_SCALE, SLIDE_PREVIEW_SCALE, WORKSPACE } from "../consts"

const calculateWorkSpaceScale = () => {
    const width = window.innerWidth
    if (width < MIN_WIDTH) return MIN_WIDTH_SCALE
    if (width < MIN_NOTEBOOK_WIDTH) return MIN_NOTEBOOK_SCALE
    if (width < MEDIUM_NOTEBOOK_WIDTH) return MEDIUM_NOTEBOOK_SCALE
    return DEFAULT_SCALE
}

const calculateSlideListScale = () => {
    const width = window.innerWidth
    if (width < MIN_WIDTH) return MIN_SLIDELIST_SCALE
    if (width < MIN_NOTEBOOK_WIDTH) return MIN_NOTEBOOK_SLIDELIST_SCALE
    if (width < MEDIUM_NOTEBOOK_WIDTH) return MEDIUM_SLIDELIST_SCALE
    return SLIDE_PREVIEW_SCALE
}

const calculateDownloadPreviewtScale = () => {
    const width = window.innerWidth
    if (width < MIN_WIDTH) return MIN_WIDTH_SCALE
    if (width < MIN_NOTEBOOK_WIDTH) return MIN_NOTEBOOK_SCALE
    if (width < MEDIUM_NOTEBOOK_WIDTH) return MEDIUM_NOTEBOOK_SCALE
    return SLIDE_DOWNLOAD_PREVIEW_SCALE
}

export {calculateWorkSpaceScale, calculateSlideListScale, calculateDownloadPreviewtScale}