const path = require('path')

const appFile = './server/server-entry'

async function render(url, res) {
    let htmlString
    try {
        await require(appFile)?.default({url}, res)
    } catch (err) {
        console.error(err);
        htmlString = 'Internal Error'
    } finally {
        if (process.env.NODE_ENV === 'development') {
            // remove src/ from require cache
            for (const modulePath in require.cache) {
                if (modulePath.startsWith(path.join(__dirname, './server/')) || path.resolve(__dirname, appFile) === modulePath) {
                    delete require.cache[modulePath]
                }
            }
        }
    }
    return htmlString
}

module.exports = render
