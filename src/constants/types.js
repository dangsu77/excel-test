
String.prototype.escape = function() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

String.prototype.unescape = function() {
    return this.replace(/&amp;/g, '$').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

global.uuid = function() {
    function s4() { return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1); }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


JSON.flatten = function(data) {
    var arr = [];
    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            arr.push({
                key: prop,
                type: 'literal',
                value: cur
            });
        }
        else if (Array.isArray(cur)) {
            arr.push({
                key: prop,
                type: 'array',
                value: JSON.stringify(cur)
            });
        }
        else {
            var empty = true;
            for (var p in cur) {
                empty = false;
                recurse(cur[p], prop ? prop+'.'+p : p);
            }
            if (empty === true) {
                arr.push({
                    key: prop,
                    type: 'object',
                    value: '{}'
                });
            }
        }
    }
    recurse(data, '');
    return arr;
};
