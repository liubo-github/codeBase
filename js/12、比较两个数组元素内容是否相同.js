function compareArray(arrA, arrB) {
    return [...arrA].sort().join('') === [...arrB].sort().join('')
}