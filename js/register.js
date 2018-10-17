define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function main() {
        $(function () {
            /* 上侧边栏 */
            $("#user").mouseenter(function () {
                $("#user-info").css("display", 'block');
            }).mouseleave(function () {
                $("#user-info").css("display", 'none');
            })
            $("#user-info").mouseenter(function () {
                $("#user-info").css("display", 'block');
            }).mouseleave(function () {
                $("#user-info").css("display", 'none');
            })
            $("#order").mouseenter(function () {
                $("#order-info").css("display", 'block');
            }).mouseleave(function () {
                $("#order-info").css("display", 'none');
            })
            $("#order-info").mouseenter(function () {
                $("#order-info").css("display", 'block');
            }).mouseleave(function () {
                $("#order-info").css("display", 'none');
            })

            /* 购物车进度条 */
            $('#order-info').find("a").mouseenter(function () {
                $("#shelter1").stop().animate({
                    width: 280,
                    opacity: 0.3
                }, "linear");
            }).mouseleave(function () {
                $("#shelter1").stop().animate({
                    width: 0,
                    opacity: 0
                }, "linear");
            });
            /* 滑块 */
            var offSetX = 0;
            $("form .slide span").mousedown(function (ev) {
                offSetX = ev.clientX - $("form .slide").offset().left;
                $(document).mousemove(function (ev) {
                    $("form .slide span").css({
                        left: ev.clientX - $("form .slide").offset().left - offSetX
                    })
                    $("form .slide i").css({
                        width: $("form .slide span").position().left
                    })
                    if ($("form .slide span").position().left >= 265 || $("form .slide span").position().left <= 0) {
                        $("form .slide span").css("left", "265");
                        $(document).off('mousemove');
                    }
                })

                $(document).mouseup(function () {
                    $(this).off();
                    if ($("form .slide span").position().left > 265) {
                        $("form .slide span").html(`<svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixinzhifu"></use>
                      </svg>`)
                        $("form .slide").html(`验证通过
                        <i></i>
                        <span>
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixinzhifu"></use>
                      </svg>
                        </span>`);
                    }
                })
            })
            /* 登录按钮进度条 */
            $('form button').mouseenter(function () {
                $("#shelter2").stop().animate({
                    width: 310,
                    opacity: 0.2
                }, "linear");
            }).mouseleave(function () {
                $("#shelter2").stop().animate({
                    width: 0,
                    opacity: 0
                }, "linear");
            });
            /* 表单验证 */
            $("#phone").blur(function () {
                var oValue = $(this).val();
                if (oValue.length == 0) {
                    $('#phoneSpan').html("请输入手机号");
                    $(this).css("border", "1px solid red");
                } else if (!(oValue.length == 11)) {
                    $("#phoneSpan").html("长度应为十一位数字");
                    $(this).css("border", "1px solid red");
                } else {
                    if (/^[1-3]{1}\d{10}$/.test(oValue)) {
                        $(this).css("border", "1px solid #000");
                        $('#phoneSpan').html("输入正确✔").css("color", "green");
                    }
                }
            })
            $("#password").blur(function () {
                var oValue = $(this).val();
                if (oValue.length == 0) {
                    $('#pwdSpan').html("请输入密码").css({
                        display: 'block',
                        color: 'red'
                    });
                    $(".text p").css('color', 'gray');
                    $(this).css("border", "1px solid red");
                } else if (/^\w{6,16}$/.test(oValue)) {
                    $(".text p").css("color", "green");
                    $('#pwdSpan').css({
                        display: 'none'
                    });
                    $(this).css("border", "1px solid #000");
                } else if (oValue.length >= 6 && oValue.length <= 16) {
                    $(".text p:first-child()").css('color', 'green');
                    $(this).css("border", "1px solid red");
                    $('#pwdSpan').css({
                        display: 'none'
                    });
                } else if (/\w+/.test(oValue)) {
                    $(".text p:last-child()").css('color', 'green');
                    $(this).css("border", "1px solid red");
                    $('#pwdSpan').css({
                        display: 'none'
                    });
                } else {
                    $(".text p").css('color', 'gray');
                    $(this).css("border", "1px solid red");
                }
            })


            /* footer2进度条 */
            $(".online").mouseenter(function () {
                $(this).css("color", "#fff");
                $("#shelter3").stop().animate({
                    width: 238
                }, 200);
            }).mouseleave(function () {
                $(this).css("color", "#000");
                $("#shelter3").stop().animate({
                    width: 0
                }, 200);
            });
            /* 二维码 */
            $("#wechat").mouseenter(function () {
                $(".pic").find("img").css("display", "block");
            }).mouseleave(function () {
                $(".pic").find("img").css("display", "none");
            })
        })
    }
    return {
        main: main
    }
})