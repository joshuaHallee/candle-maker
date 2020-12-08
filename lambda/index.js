const axios = require('axios')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

exports.handler = async (event, context, callback) => {
    let page = await axios.get(event.url)
        .then(function (res) {
            let params = {Bucket: 'candle-maker', Key: `${Date.now()}.txt`, Body: `${JSON.stringify(res.data)}`}
            
            s3.upload(params, function(err, data) {

                if (err) console.log(err, err.stack)
                else console.log(data)
            })
        });

    const response = {
        statusCode: 200,
        body: JSON.stringify(`Hello from, ${event.url}`),
    };
    return response;
};