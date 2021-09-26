const axios = require('axios')

exports.paramBasicApi = (request, contentType = 'application/x-www-form-urlencoded') => {
    try {
        const {headers, cookies} = request
        const {referer, origin, host} = headers
        axios.defaults.headers.common['Authorization'] = cookies && cookies.jwt ? cookies.jwt : '';
        axios.defaults.headers.post['Content-Type'] = contentType
        if (origin) {
            axios.defaults.baseURL = origin
        } else {
            let prefix = 'http:'
            if (referer) {
                prefix = referer.split('//')[0]
            }
            axios.defaults.baseURL = `${prefix}//${host}`
        }
    } catch (e) {
        console.log({e})
    }
    return axios
}
