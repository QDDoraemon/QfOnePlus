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
                car_msg()
            }).mouseleave(function () {
                $("#order-info").css("display", 'none');
            })
            $("#order-info").mouseenter(function () {
                $("#order-info").css("display", 'block');
            }).mouseleave(function () {
                $("#order-info").css("display", 'none');
            })
            /* 登陆登出账号 */

            if ($.cookie('user')) {
                var arr = eval($.cookie('user'))
                $('#login').html(`登出${arr[0].user}`);
                $('#login').click(function () {
                    $.cookie('user', '');
                    $('#login').attr('href','');
                })
                $('#login').attr('href','login.html');
            }
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
            /* cont1 */
            /* 图片固定 */
            if ($(document).scrollTop() > 50 && $(document).scrollTop() < 400) {
                $(".left").css({
                    position: "fixed",
                    top: 200,
                    left: 72
                });
            } else if ($(document).scrollTop() > 400) {
                $(".left").css({
                    position: "absolute",
                    left: 40,
                    top: 400
                })
            }
            $(document).scroll(function () {
                if ($(document).scrollTop() > 50 && $(document).scrollTop() < 400) {
                    $(".left").css({
                        position: "fixed",
                        top: 200,
                        left: 72
                    });
                } else if ($(document).scrollTop() > 400) {
                    $(".left").css({
                        position: "absolute",
                        left: 40,
                        top: 400
                    })
                }
            })

            /*  动态加载cont1 */
            $.ajax({
                url: "json/oneplus6.json",
                type: "GET",
                success(res) {
                    // color 图片加载
                    var color = '';
                    for (var i = 0; i < res[0].length; i++) {

                        color += `<li><a href="">
                        ${res[0][i].title}
                        </a></li>`;
                    }

                    $(".color").append(color);
                    $(".right a").click(function (ev) {
                        ev.preventDefault(); //阻止a页面跳转
                    })
                    /* --------------------------------color */
                    $(".color h4").html(res[0][0].price)
                    $(".left a").eq(0).find("img").attr("src", res[0][0].url);
                    $(".left a").eq(1).find("img").attr("src", res[0][0].small);
                    $(".color li").eq(0).attr("class", "selected");
                    $(".hide-div span:nth-child(2)").html(res[0][0].title);
                    $(".hide-div span:nth-child(3)").html(res[0][0].price);
                    $(".buy-right >span").html(res[0][0].price);
                    $(".large").css("background", `url(${res[0][0].url})`);
                    $(".buyNow").attr('id', `${res[0][0].id}`)

                    $(".color li").click(function () {

                        $(".buyNow").attr('id', `${res[0][$(this).index() - 2].id}`);
                        $(".large").css("background", `url(${res[0][$(this).index() - 2].url})`);
                        $(".left a").eq(0).find("img").attr("src", res[0][$(this).index() - 2].url);
                        $(".left a").eq(1).find("img").attr("src", res[0][$(this).index() - 2].small);
                        $(".hide-div span:nth-child(2)").html(res[0][$(this).index() - 2].title);
                        $(".hide-div span:nth-child(3)").html(res[0][$(this).index() - 2].price);
                        $(".buy-right >span").html(res[0][$(this).index() - 2].price);
                        $(".color h4").html(res[0][$(this).index() - 2].price);

                        $(".color li").attr('class', '').eq($(this).index() - 2).attr("class", "selected");
                        if ($(".pay p a").eq(0).attr("class") == 'checked') {
                            var tmp = '';
                            for (var i = 0; i < 3; i++) {
                                tmp = `${res[0][$(this).index()-2].huabei[i]}
                            <span>含手续费</span>`;
                                $(".pay li").eq(i).find("a").html(tmp);
                            }
                        } else {
                            var tmp = '';
                            for (var i = 0; i < 3; i++) {
                                tmp = `${res[0][$(this).index()-2].baitiao[i]}
                                <span>含手续费</span>`;
                                $(".pay li").eq(i).find("a").html(tmp);
                            }
                        }
                    })
                    /* pay加载---------------------------------- */
                    var huabei = '';
                    var baitiao = '';
                    for (var i = 0; i < 3; i++) {
                        huabei += ` <li>
                        <a href="">${res[0][0].huabei[i]}
                            <span>含手续费</span>
                        </a>
                    </li>`;
                        baitiao += ` <li>
                        <a href="">${res[0][0].baitiao[i]}
                            <span>含手续费</span>
                        </a>
                    </li>`;
                    }
                    $(".pay p").after(huabei);
                    $(".right a").click(function (ev) {
                        ev.preventDefault(); //阻止a页面跳转
                    })
                    $('.pay p a').click(function () {
                        $(".pay p a").attr("class", '').eq($(this).index()).attr("class", 'checked');
                    })
                    $(".pay p a").eq(0).click(function () {
                        $(".pay li").css("display", "none");
                        $(".pay p").after(huabei);
                        $(".right a").click(function (ev) {
                            ev.preventDefault(); //阻止a页面跳转
                        })
                        $(".pay li").click(function () {
                            $(".pay li").attr("class", "").eq($(this).index() - 2).attr("class", "selected");
                        })
                    })

                    $(".pay p a").eq(1).click(function () {
                        $(".pay li").css("display", "none");
                        $(".pay p").after(baitiao);
                        $(".right a").click(function (ev) {
                            ev.preventDefault(); //阻止a页面跳转
                        })
                        $(".pay li").click(function () {
                            $(".pay li").attr("class", "").eq($(this).index() - 2).attr("class", "selected");
                        })
                    })
                    $(".pay li").click(function () {
                        $(".pay li").attr("class", "").eq($(this).index() - 2).attr("class", "selected");
                    })
                },
                error(msg) {
                    alert(msg);
                }
            })
            /* 保险详情 */
            $('.baoxian li a').hover(function () {
                $(this).parent().find("h4").show();
            }, function () {
                $(this).parent().find("h4").hide();
            })
            /* 放大镜 */

            $(".left a:nth-of-type(1)").mousemove(function (ev) {

                $(".large").show(); //显示蓝色小方块
                $(".move").show(); //显示右方放大图

                var oLeft = ev.pageX - $(".move").width() / 2 - $(this).offset().left; //小方块left属性 
                var oTop = ev.pageY - $(".move").height() / 2 - $(this).offset().top; //小方块top属性 			
                var max = $(this).width() - $(".move").width(); //小方块最大移动距离
                //防止小方块越界
                if (oLeft < 0)
                    oLeft = 0;
                if (oLeft > max)
                    oLeft = max;
                if (oTop < 0)
                    oTop = 0;
                if (oTop > max)
                    oTop = max;

                //移动小方块
                $(".move").css({
                    "left": oLeft,
                    "top": oTop
                })
                //移动放大图，5倍放大比例
                $(".large").css("backgroundPosition", `${-1.5*oLeft}px ${-1.5*oTop}px`);
            }).mouseleave(function () {
                $(".large").hide();
                $(".move").hide();
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
            /* cookie */
            $(".buyNow").click(function () {
                var id = $(this).attr('id');
                var first = $.cookie('goods') == null ? true : false;
                if (first) {
                    $.cookie('goods', `[{id:${id},num:1}]`, {
                        expires: 7,
                        raw: true
                    });
                } else {
                    var str = $.cookie('goods');
                    var arr = eval(str);
                    var same = false;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == id) {
                            arr[i].num++;
                            var cookieStr = JSON.stringify(arr);
                            $.cookie('goods', cookieStr, {
                                expires: 7,
                                raw: true
                            });
                            same = true;
                            break;
                        }
                    }
                    if (!same) {
                        var obj = {
                            id: id,
                            num: 1
                        };
                        arr.push(obj);
                        var cookieStr = JSON.stringify(arr);
                        $.cookie('goods', cookieStr, {
                            expires: 7,
                            raw: true
                        });
                    }
                }
            })
            /* 添加购物车 */
            function car_msg() {
                $.ajax({
                    url: 'json/oneplus6.json',
                    type: 'GET',
                    success: function (res) {
                        if ($.cookie('goods')) {
                            $("#order-info p").remove();
                            var cookie_arr = eval($.cookie('goods'));
                            // alert(res[0][cookie_arr[1].id].small);
                            var html = '';
                            for (var i = 0; i < cookie_arr.length; i++) {
                                html += `<li>
                            <img src="${res[0][cookie_arr[i].id].small}" alt="">
                            <div>
                                <span>${res[0][cookie_arr[i].id].title}</span>
                                <p>
                                    <span>${res[0][cookie_arr[i].id].price}</span>
                                    <span> X ${cookie_arr[i].num}</span>
                                </p>
                            </div>
                        </li>`;
                                $("#order-info ul").html(html);
                            }
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                })
            }



        })
    }
    return {
        main: main
    }
})