const isArray = function (value: any): boolean {
    return Array.isArray(value);
};

// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
const isObject = function (value: any): boolean {
    return (!!value) && (value.constructor === Object);
}

const isPrimitive = function (value: any): boolean {
    const isComplex = value instanceof Error || isArray(value) || isObject(value);
    return !isComplex;
}

export default {
    isArray,
    isObject,
    isPrimitive,
}