export const localValue = (key,value=null)  => {
    if(value === null) {
        return localStorage.getItem(key);
    } else {
        localStorage.setItem(key,value);
    }
}