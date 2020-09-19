const webpush = require('web-push')

webpush.setVapidDetails(
    process.env.EMAIL,
    process.env.WP_PUBLIC_KEY,
    process.env.WP_PRIVATE_KEY
)

module.exports = webpush