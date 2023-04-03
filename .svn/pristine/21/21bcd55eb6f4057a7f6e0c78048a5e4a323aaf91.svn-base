import Vue from 'vue'
import {
    ebigRequest
} from './utils.js'

const _base = Vue.prototype.base;

class API {
    login(params) {
        return ebigRequest(_base + '/echat/customerService.do', params, 'POST');
    }
}

export default API;