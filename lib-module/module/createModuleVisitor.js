// import AppContainer from '../layout/AppContainer';
import AlpModule from './AlpModule';

export default (function () {
  var reducers = void 0;

  return {
    visitor: function visitor(element, instance) {
      // console.log(element, instance, instance instanceof AlpModule, element.type === AppContainer);

      return instance && instance instanceof AlpModule ? (reducers = instance.props.reducers, false) : true;
    },

    getReducers: function getReducers() {
      return reducers;
    }
  };
});
//# sourceMappingURL=createModuleVisitor.js.map