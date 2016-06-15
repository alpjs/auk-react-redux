var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export default function createAction(type, argsNames) {
    var action = argsNames ? function () {
        var action = { type: type };

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args.forEach(function (value, index) {
            return action[argsNames[index]] = value;
        });
        return action;
    } : function (args) {
        return _extends({ type: type }, args);
    };

    action.type = type;
    action.toString = function () {
        return type;
    };

    return action;
}
//# sourceMappingURL=createAction.js.map