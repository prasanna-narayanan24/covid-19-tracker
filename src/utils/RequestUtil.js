import qs from "querystring";
import appConfig  from "../config";

class API {
    static methods = { "GET": "GET", "POST": "POST", "DELETE": "DELETE", "PUT": "PUT" };
    static _BASE_URL = appConfig.api_2;
    static _method = "GET";

    static call = (url, onSuccess=null, onFailure=null, options={}) => {
        url = this.prepareURL(url, options);
        let method = options.method ? options.method : this._method;

        fetch(url, {method})
        .then(res => res.json())
        .then(res => {
            if(onSuccess) onSuccess(res)
        })
        .catch(err => {
            if(onFailure) onFailure(err);
        });
    }

    static prepareURL = (url, options) => {
        if(!url.startsWith("/"))
            url = `/${url}`;
        
        if(options.query) {
            url += `?${qs.stringify(options.query)}`;
        }

        const domain = options.baseURL ? options.baseURL : this._BASE_URL;

        return domain + url;
    }
}

export default API;