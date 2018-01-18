# weibo
获取Weibo数据用的转发服务器

.giignore文件中的内容是排除上传到github的内容


测试脚本
    $(document).ready(function () {
            var url = $("#url").val();
            var data = $("#content").val();
            $("#submit").click(function () {
                $.ajax({
                    url: "http://127.0.0.1:3000/weibo",
                    type: "POST",
                    dataType: "JSON",
                    contentType: "application/json",
                    data: JSON.stringify({
                        url: url,
                        method: "GET",
                    })
                }).fail(function (response) {

                    var weiboText = null;
                    var el = $('<div></div>');
                    el.html(response.responseText);
                    var scripts = $('script', el);
                    console.log(scripts);
                    for (var key in scripts) {

                        if (scripts.hasOwnProperty(key)) {
                            var element = scripts[key];
                            if (/var config/.test(element.innerText)) {
                                var jsonstring = element.innerText;
                                // console.log(jsonstring);

                                jsonstring = /\[{[\d\D]*}\]/.exec(jsonstring);
                                // var json = $.parseJSON(jsonstring);
                                var json = JSON.parse(jsonstring);
                                console.log(json);
                                weiboText = json[0].status.retweeted_status.text;
                                console.log(weiboText);
                            }
                        }
                    }
                    $("#response").val(weiboText);

                });
            });
        });