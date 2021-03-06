/* global PRODUCTION */
export default function createLoader(handlers: ?Object) {
  const handlerMap = new Map(Object.keys(handlers).map(key => [key, handlers[key]]));
  handlers = undefined;

  return (state, data) => {
    const keys = Object.keys(data);
    return Promise.all(
      keys.map(key => {
        const handler = handlerMap.get(key);
        if (!PRODUCTION && !handler) throw new Error(`Missing handler for "${key}".`);
        return handler(state, data[key]);
      }),
    ).then(results => {
      const data = Object.create(null);
      results.forEach((result, index) => {
        data[keys[index]] = result;
      });
      return data;
    });
  };
}
