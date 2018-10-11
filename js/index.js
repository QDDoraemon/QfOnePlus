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
            /* 广告窗箭头 */
            $("#prev").hover(function () {
                $(this).stop().animate({
                    opacity: 1
                })
            }, function () {
                $(this).stop().animate({
                    opacity: 0.3
                })
            })
            $("#next").hover(function () {
                $(this).stop().animate({
                    opacity: 1
                })
            }, function () {
                $(this).stop().animate({
                    opacity: 0.3
                })
            })
            /* 广告窗滚动 --------------------------------*/
            $.ajax({
                url: "json/index.json",
                type: "GET",
                success: function (res) {
                    $("#banner").css("background", `url(${res[0][0].url})`);
                    var oBtns = $("#banner").find("ol").find("li");
                    var Olis = $("#banner").find("ul").find("li");
                    var timer = null;
                    var Olis = $("#banner").find("ul").find("li");
                    var iNow = 0;
                    oBtns.click(function () {
                        iNow = $(this).index();
                        // tab();
                    })
                    timer = setInterval(function () {
                        $("#banner").css("background", `url(${res[0][iNow].url})`)
                            .stop().animate({
                                opacity: 1
                            }, 800, "linear", function () {
                                if (iNow == 2) {
                                    iNow = 0;
                                }
                                $("#banner").css("background", `url(${res[0][iNow+1].url})`)
                                    .stop().animate({
                                        opacity: 0
                                    }, 800, "linear");
                                iNow++;
                            });

                    }, 3000);


                },
                error: function (msg) {
                    alert(msg);
                }
            })




            /* --------------------------------------*/
            /* cont1动态加载 */
            $.ajax({
                url: "json/index.json",
                type: "GET",
                success: function (res) {
                    var html = '';
                    for (var i = 0; i < res[1].length; i++) {
                        html += `<li>
                        <a href=""><img src="${res[1][i].url}" alt=""></a>
                        </li>`;
                    }
                    $(".cont1").html(html);
                },
                error: function (msg) {
                    alert(msg);
                }
            })
            /* cont2动态加载 */
            $.ajax({
                url: "json/index.json",
                type: "GET",
                success: function (res) {
                    $(".cont2").css("background", `url(${res[2][0].url}`)
                },
                error: function (msg) {
                    alert(msg);
                }
            })

            /* cont2进度条 */
            $('.cont2').find(".cont2-text").find("a").mouseenter(function () {
                $(this).css("color", "#000");
                $("#shelter2").stop().animate({
                    width: 134
                }, 200);
            }).mouseleave(function () {
                $(this).css("color", "#fff");
                $("#shelter2").stop().animate({
                    width: 0
                }, 200);
            });
            /* cont3动态加载 */
            $.ajax({
                url: "json/index.json",
                type: "GET",
                success: function (res) {
                    var html = '';
                    for (var i = 0; i < res[3].length; i++) {
                        html += `<dl>
                        <dt><a href=""><img src="${res[3][i].url}" alt=""></a></dt>
                        <dd>
                            <h4>${res[3][i].title}</h4>
                            <p>${res[3][i].desc}</p>
                        </dd>
                    </dl>`;
                    }
                    $(".cont3").html(html);
                },
                error: function (msg) {
                    alert(msg);
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