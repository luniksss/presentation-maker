import LZString from "lz-string"

const localStorageMiddleware = store => next => action => {
    const result = next(action)
    const state = store.getState()

    const compressedState = LZString.compress(JSON.stringify(state))
    localStorage.setItem('presentationData', compressedState)
    return result
};

export default localStorageMiddleware