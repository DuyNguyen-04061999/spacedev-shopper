export const onKeyDownNumber = evt => {
    if (evt.key === 'e' || evt.key === 'E' || (evt.target.value === '' && evt.key === '0')) {
        evt.preventDefault();
    }
}