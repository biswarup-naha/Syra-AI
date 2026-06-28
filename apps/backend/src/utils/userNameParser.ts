export const userNameparser = (url: string) => {
    url.split("/").filter(x => x != "").pop()
}