import request from "../utils/request"

const url = '/metabit'

function getNetworks() {
    return request({
        url: url + '/network/findAll'
    })
}

function getContractTokens() {
    return request({
        url: url + '/contractToken/findAll'
    })
}

const Metabit = {
    getNetworks,
    getContractTokens
}

export default Metabit