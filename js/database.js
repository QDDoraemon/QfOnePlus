define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function main() {
        $(function () {
            //登陆
            $("#login").click(function () {

                var str = `username=${$("#phone").val()}&password=${$("#password").val()}`;

                $.ajax({
                    method: "post",
                    url: "php/user.php?type=login",
                    data: str,
                    success: function (data) {
                        if (data == "登陆成功") {
                            $(".success").show();
                            setTimeout(function () {
                                location.assign("oneplus6.html");
                            }, 1000);
                            $.cookie('user', `[{user:${$("#phone").val()},password:${$("#password").val()}}]`, {
                                expires: 7,
                                raw: true
                            });
                        } else if (data == "密码错误") {
                            alert("密码错误");
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                })
            })
            //注册
            $('#register').click(function () {
                var str = `username=${$("#phone").val()}&password=${$("#password").val()}`;
                $.ajax({
                    method: "post",
                    url: "php/user.php?type=register",
                    data: str,
                    success: function (data) {
                        if (data == "该用户已被注册") {
                            alert("该用户已被注册");
                            location.reload();
                        } else if (data == "注册成功") {
                            $(".success").show();
                            setTimeout(function () {
                                location.assign("login.html");
                            }, 1000);
                        } else {
                            alert("注册失败,请重试")
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                })
            })
        })
    }
    return {
        main: main
    }
})