
export const getCorrectTime = (str: string) => {
    let correctTime: string [] = []
    str.split (':').forEach (item => item.length === 1 ? correctTime.push (`0${item}`) : correctTime.push (item))
    return correctTime
}