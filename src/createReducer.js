export default function createReducer(defaultState: Function, handlers: Object) {
    const handlerMap = new Map();
    Object.keys(handlers).forEach(key => {
        if (typeof key === 'function') {
            if (typeof key.type !== 'string') {
                throw new Error(`Invalid handler key: "${key.name}"`);
            }
            handlerMap.set(key.type, handlers[key]);
        } else {
            handlerMap.set(key, handlers[key]);
        }
    });

    return (state = defaultState(), action) => {
        if (action && handlerMap.has(action.type)) {
            return handlerMap.get(action.type)(state, action);
        }

        return state;
    };
}