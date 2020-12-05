const fse = require('fs-extra')

// Converts xml file to json file of product IDs
const formatXml = function(config){

    // Read sitemap
    return new Promise(function (resolve, reject) {
        fse.readFile(`${config.inputFile}`, 'utf8', (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
                return res
            }
        })
    })
    // Format sitemap / writes productId array
    .then(function(result) {
        
        // Regular express to test against
        const re = /R-(.*)<\/loc>/g
        const productIds = []

        let sitemap = result.toString()
        let products = sitemap.match(re)

        // Cleans regex results
        for(const product in products) {
            let targetProduct = products[product].replace('R-', "").replace('</loc>', "")
            productIds.push(targetProduct)
        }
    
        // Writes productIds array to file
        fse.writeFile(`${config.outputFile}`, JSON.stringify(productIds), function(err) {
            if (err) console.log(err)
            console.log(`Total products: ${productIds.length}`)
        })
        
    })
}

exports.formatXml = formatXml