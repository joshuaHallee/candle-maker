require('dotenv').config()
const fse = require('fs-extra')
const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

// Custom modules
const fxml = require('./utils/formatXml')
const furl = require('./utils/formatUrl')
const scrape = require('./utils/scrapePage')

// Root lambda call
// const lambdaCall = process.env.AWS_LAMBDA

// let body = {
//     url: 'https://api.bazaarvoice.com/data/batch.json?passkey=caHrD6xPptQbU2TrQnC3fr4YiOAMuEUcjoNxxiBFYwL3o&apiversion=5.5&displaycode=5639-en_us&resource.q0=products&filter.q0=id%3Aeq%3A1003319&stats.q0=questions%2Creviews&filteredstats.q0=questions%2Creviews&filter_questions.q0=contentlocale%3Aeq%3Aen_US&filter_answers.q0=contentlocale%3Aeq%3Aen_US&filter_reviews.q0=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q0=contentlocale%3Aeq%3Aen_US&resource.q1=questions&filter.q1=productid%3Aeq%3A1003319&filter.q1=contentlocale%3Aeq%3Aen_US&sort.q1=lastapprovedanswersubmissiontime%3Adesc&stats.q1=questions&filteredstats.q1=questions&include.q1=authors%2Cproducts%2Canswers&filter_questions.q1=contentlocale%3Aeq%3Aen_US&filter_answers.q1=contentlocale%3Aeq%3Aen_US&limit.q1=20&offset.q1=0&limit_answers.q1=20&resource.q2=reviews&filter.q2=isratingsonly%3Aeq%3Afalse&filter.q2=productid%3Aeq%3A1003319&filter.q2=contentlocale%3Aeq%3Aen_US&sort.q2=submissiontime%3Adesc&stats.q2=reviews&filteredstats.q2=reviews&include.q2=authors%2Cproducts%2Ccomments&filter_reviews.q2=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q2=contentlocale%3Aeq%3Aen_US&filter_comments.q2=contentlocale%3Aeq%3Aen_US&limit.q2=100&offset.q2=0&limit_comments.q2=3'
// }


// fse.readFile('./output/arrayTest.json', 'utf-8', function(err, data) {
//     if (err) return

//     let callArray = JSON.parse(data)
//     var interval = 1000;

//     callArray.forEach(function (url, index) {
//         setTimeout(function() {
//             // console.log(url)
//             fetch(`${lambdaCall}`, {
//                 method: 'post',
//                 body: JSON.stringify(body),
//                 headers: { 'Content-Type': 'application/json' }
//             })
//             .then( res => res.json())
//             .then( json => console.log(json))
//         }, index * interval)
//     });
// })

// TODO figure out a better options setup
options = {
    inputFile: 'sitemap.xml', 
    outputFile: './output/productIds.json'
}

options2 = {
    inputFile: `${options.outputFile}`,
    outputFile: './output/array.json'
}

options3 = {
    outputFile: `./cached/${Date.now()}.xml`
}

// TODO fix promises so furl.formatUrl() can run after fxml.formatXml() without error
fxml.formatXml(options)
// furl.formatUrl(options2)

// TODO fix errors
// www prefix gives error
// any non-json/xml page returns 1
scrape.scrapePage('https://www.yankeecandle.com/xml/detail0.xml', options3)

// practical result
//scrape.scrapePage('https://api.bazaarvoice.com/data/batch.json?passkey=caHrD6xPptQbU2TrQnC3fr4YiOAMuEUcjoNxxiBFYwL3o&apiversion=5.5&displaycode=5639-en_us&resource.q0=products&filter.q0=id%3Aeq%3A1629476&stats.q0=questions%2Creviews&filteredstats.q0=questions%2Creviews&filter_questions.q0=contentlocale%3Aeq%3Aen_US&filter_answers.q0=contentlocale%3Aeq%3Aen_US&filter_reviews.q0=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q0=contentlocale%3Aeq%3Aen_US&resource.q1=questions&filter.q1=productid%3Aeq%3A1629476&filter.q1=contentlocale%3Aeq%3Aen_US&sort.q1=lastapprovedanswersubmissiontime%3Adesc&stats.q1=questions&filteredstats.q1=questions&include.q1=authors%2Cproducts%2Canswers&filter_questions.q1=contentlocale%3Aeq%3Aen_US&filter_answers.q1=contentlocale%3Aeq%3Aen_US&limit.q1=10&offset.q1=0&limit_answers.q1=10&resource.q2=reviews&filter.q2=isratingsonly%3Aeq%3Afalse&filter.q2=productid%3Aeq%3A1629476&filter.q2=contentlocale%3Aeq%3Aen_US&sort.q2=submissiontime%3Adesc&stats.q2=reviews&filteredstats.q2=reviews&include.q2=authors%2Cproducts%2Ccomments&filter_reviews.q2=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q2=contentlocale%3Aeq%3Aen_US&filter_comments.q2=contentlocale%3Aeq%3Aen_US&limit.q2=8&offset.q2=0&limit_comments.q2=3', options3)