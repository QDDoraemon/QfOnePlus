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
                    $(".color li").click(function () {
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