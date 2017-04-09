/* global PRODUCTION */
export default function createLoader(handlers) {
  const handlerMap = new Map(Object.keys(handlers).map(function (key) {
    return [key, handlers[key]];
  }));
  handlers = undefined;

  return function (state, data) {
    const keys = Object.keys(data);
    return Promise.all(keys.map(function (key) {
      const handler = handlerMap.get(key);

      return handler(state, data[key]);
    })).then(function (results) {
      const data = Object.create(null);
      results.forEach(function (result, index) {
        data[keys[index]] = result;
      });
      return data;
    });
  };
}
//# sourceMappingURL=createLoader.js.map