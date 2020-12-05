const fse = require('fs-extra')

let productApiCall = 'https://api.bazaarvoice.com/data/batch.json?passkey=caHrD6xPptQbU2TrQnC3fr4YiOAMuEUcjoNxxiBFYwL3o&apiversion=5.5&displaycode=5639-en_us&resource.q0=products&filter.q0=id%3Aeq%3A*******&stats.q0=questions%2Creviews&filteredstats.q0=questions%2Creviews&filter_questions.q0=contentlocale%3Aeq%3Aen_US&filter_answers.q0=contentlocale%3Aeq%3Aen_US&filter_reviews.q0=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q0=contentlocale%3Aeq%3Aen_US&resource.q1=questions&filter.q1=productid%3Aeq%3A*******&filter.q1=contentlocale%3Aeq%3Aen_US&sort.q1=lastapprovedanswersubmissiontime%3Adesc&stats.q1=questions&filteredstats.q1=questions&include.q1=authors%2Cproducts%2Canswers&filter_questions.q1=contentlocale%3Aeq%3Aen_US&filter_answers.q1=contentlocale%3Aeq%3Aen_US&limit.q1=20&offset.q1=0&limit_answers.q1=20&resource.q2=reviews&filter.q2=isratingsonly%3Aeq%3Afalse&filter.q2=productid%3Aeq%3A*******&filter.q2=contentlocale%3Aeq%3Aen_US&sort.q2=submissiontime%3Adesc&stats.q2=reviews&filteredstats.q2=reviews&include.q2=authors%2Cproducts%2Ccomments&filter_reviews.q2=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q2=contentlocale%3Aeq%3Aen_US&filter_comments.q2=contentlocale%3Aeq%3Aen_US&limit.q2=100&offset.q2=0&limit_comments.q2=3'
//let source =         'https://api.bazaarvoice.com/data/batch.json?passkey=caHrD6xPptQbU2TrQnC3fr4YiOAMuEUcjoNxxiBFYwL3o&apiversion=5.5&displaycode=5639-en_us&resource.q0=products&filter.q0=id%3Aeq%3A1199604&stats.q0=questions%2Creviews&filteredstats.q0=questions%2Creviews&filter_questions.q0=contentlocale%3Aeq%3Aen_US&filter_answers.q0=contentlocale%3Aeq%3Aen_US&filter_reviews.q0=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q0=contentlocale%3Aeq%3Aen_US&resource.q1=questions&filter.q1=productid%3Aeq%3A1199604&filter.q1=contentlocale%3Aeq%3Aen_US&sort.q1=lastapprovedanswersubmissiontime%3Adesc&stats.q1=questions&filteredstats.q1=questions&include.q1=authors%2Cproducts%2Canswers&filter_questions.q1=contentlocale%3Aeq%3Aen_US&filter_answers.q1=contentlocale%3Aeq%3Aen_US&limit.q1=20&offset.q1=0&limit_answers.q1=20&resource.q2=reviews&filter.q2=isratingsonly%3Aeq%3Afalse&filter.q2=productid%3Aeq%3A1199604&filter.q2=contentlocale%3Aeq%3Aen_US&sort.q2=submissiontime%3Adesc&stats.q2=reviews&filteredstats.q2=reviews&include.q2=authors%2Cproducts%2Ccomments&filter_reviews.q2=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q2=contentlocale%3Aeq%3Aen_US&filter_comments.q2=contentlocale%3Aeq%3Aen_US&limit.q2=100&offset.q2=0&limit_comments.q2=3'
const search = /\*\*\*\*\*\*\*/g
let apiUrl = []

const formatUrl = function(config) {

    return new Promise(function (resolve, reject) {
        fse.readFile(`./output/productIds.json`, 'utf8', (err, res) => {

            if (err) throw err

            let productIds = JSON.parse(res)
        
            for(const productId in productIds) {
                apiUrl.push(productApiCall.replace(search, productIds[productId]))
            }
        
            fse.writeFile(`./output/array.json`, JSON.stringify(apiUrl), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                    return(res)
                }
            })
        })
    })
}

exports.formatUrl = formatUrl