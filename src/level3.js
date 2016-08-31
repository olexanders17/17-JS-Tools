

function Ajax(params) {

    this.method;
    this.url;
    this.data = {};
    this.headers;
    this.callback;


    var connect = function () {
        var self = this;

        var xhr = new XMLHttpRequest();
        xhr.open(this.method, this.url, true);
        for (key in this.headers) {
            xhr.setRequestHeader(key, this.headers[key]);
        }
        xhr.send(JSON.stringify(this.data));

        xhr.onreadystatechange = function () {
            if (xhr.readyState != xhr.DONE) {
                return;
            }

            var resp = {
                status: xhr.status,
                headers: xhr.getAllResponseHeaders(),
                responseText: xhr.responseText,

            }

            self.callback(resp);
        }

    }.bind(this);

    this.get = function (url, headers) {
        this.url = url;
        this.method = 'GET';
        return this;
    }

    this.post = function (url, data, headers) {
        this.url = url;
        this.method = 'POST';
        this.data = data;
        return this;
    }

    this.head = function (url, headers) {
        this.url = url;
        this.method = 'HEAD';
        return this;
    }

    this.put = function (url, headers) {
        this.url = url;
        this.method = 'PUT';
        return this;
    }


    this.done = function (callback) {
        this.callback = callback;
        connect();
    }


}


//----------------------------------

var url = 'https://api.github.com/users/olexanders17/repos'

function findAllRepos(data) {
    var arr = JSON.parse(data.responseText);
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].name);

    }

}

var cb = function (obj) {
    console.log(obj);
    console.log(JSON.parse(obj.responseText));

}

var ajax = new Ajax();
ajax.get(url).done(findAllRepos);


console.log();


var url2 = "http://httpbin.org/post";
var data2 = {
    form: {
        comments: "My comment",
        custemail: "one@gmail.com",
    }
};


var headers2 = {
    "Content-Type": "application/xml"
}
/*var ajax2 = new Ajax();
 ajax2.post(url2, data2, headers2).done(cb);*/




