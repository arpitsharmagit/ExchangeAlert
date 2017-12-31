import request from 'request';
const vm = require('vm');
var urlparse = require('url-parse')

const j = request.jar()
const httpreq = request.defaults({ jar: j })
const headers = { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36" }

class cloudFlareByPass {
    initCall(url) {
        httpreq({ method: 'GET', uri: koinexdata, headers: headers }, async function (error, response, body) {
            if (response.statusCode == 503 && response.headers["Server"].startsWith("cloudflare")) {
                await sleep(5);
                parsed_url = urlparse(response.url);
                domain = parsed_url.host;
                submit_url = `${parsed_url.protocol}://${domain}/cdn-cgi/l/chk_jschl`;
                headers["Referer"] = response.url;

                const jschl_vc = /name="jschl_vc" value="(\w+)"/.exec(body)[0];
                const pass = /name="pass" value="(.+?)"/.exec(body)[0];
                if (!jschl_vc || !pass) {
                    return null;
                }
                //solve puzzle
                const jschl_answer = solveChallenge(body) + domain.len;
                const formData = { jschl_vc, pass, jschl_answer };

                request.post({ url: submit_url, formData: formData, followRedirect: false }, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        return console.error('upload failed:', err);
                    }
                    console.log('Upload successful!  Server responded with:', body);
                });
            }
        });
    }
    solveChallenge(body) {
        let js = /setTimeout\(function\(\){\s+(var s,t,o,p,b,r,e,a,k,i,n,g,f.+?\r?\n[\s\S]+?a\.value =.+?)\r?\n/.exec(body)[0];
        let paresedInt = /a\.value = (parseInt\(.+?\)).+/.exec(js)[0];
        js = js.replace(/a\.value = (parseInt\(.+?\)).+/, "");
        js = js.replace(/\s{3,}[a-z](?: = |\.).+/g, "");

        let result = vm.runInNewContext(js, Object.create(null), { timeout: 5000 });
    }
    sleep(seconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, seconds * 1000);
        })
    }
}

export default new cloudFlareByPass();