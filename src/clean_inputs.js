function cleanTimeFormat(time) {
    return time.replace(/[^\d^\-^:]/gi, '');
}

export { cleanTimeFormat }