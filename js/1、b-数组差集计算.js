function difference(arrA, arrB) {
    return [...arrA, ...arrB].filter(v => !arrA.includes(v) || !arrB.includes(v))
}