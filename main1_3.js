function projectObject(source, prototype) {
    // Check if source is not an object or prototype is not an object
    if (typeof source !== 'object' || typeof prototype !== 'object') {
        throw new Error('Input parameters must be objects');
    }

    const projected = {};

    for (const key in prototype) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && typeof prototype[key] === 'object' && prototype[key] !== null) {
                projected[key] = projectObject(source[key], prototype[key]);
            } else {
                projected[key] = source[key];
            }
        }
    }

    return projected;
}

const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31,
            prop32: 32,
        }
    },
    prop12: 12
};

const proto = {
    prop11: {
        prop22: null
    }
};

const res = projectObject(src, proto);
console.log(res);