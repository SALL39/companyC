function isUndefined(value: any) {
    return value === undefined
}

function isObject(value: any) {
    return value === Object(value)
}

function isArray(value: any) {
    return Array.isArray(value)
}

function isFile(value: any) {
    return value instanceof File
}

function isDate(value: any) {
    return value instanceof Date
}

export const objectToFormData = (obj:  any) => {

    const fd = new FormData();

    if (isUndefined(obj)) {
        return fd
    } else {
        Object.keys(obj).forEach(function (prop) {
            fd.append(prop, obj[prop]);
        })
    }

    return fd
}
