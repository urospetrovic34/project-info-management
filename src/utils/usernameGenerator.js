export const usernameGenerator = (name,surname,count) => {
    return name.toLowerCase() + surname.toLowerCase() + count + Math.floor(Math.random() * 1000)
}