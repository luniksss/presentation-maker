const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();

    localStorage.setItem('presentationData', JSON.stringify(state));
    return result;
};

export default localStorageMiddleware;