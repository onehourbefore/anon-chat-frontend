export const getCorrectPath = (path: string) => {
    const partOne = 'D:/DEV/anon-chat/server/static'
    const partTwo = 'http://localhost:5001'
    const newPath = path.slice (partOne.length)
    console. log (partTwo + newPath)
    return partTwo + newPath
}