export const userNameparser = (url: string) => {
    return url.split("/").filter(x => x != "").pop()
}