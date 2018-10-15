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
                    var html = '';
                    for (var i = 0; i < res[0].length; i++) {
                        html += `
                        <li>
                        <div class = 'text'>
                        <p>${res[0][i].text[0]}</p>
                        <p>${res[0][i].text[1]}</p>
                        <a href="">${res[0][i].text[2]}</a>
                        <p>${res[0][i].text[3]}</p>
                        </div>
                        <a href=""><img src="${res[0][i].url}" alt="${res[0][i].title}"/></a>
                        </li>`;
                    }

                    $("#banner ul").html(html);

                    $("#banner ul li:nth-child(1) .text").css({
                        right: "20%",
                        top: "20%"
                    })
                    $("#banner ul li:nth-child(2) .text").css({
                        left: "15%",
                        top: "20%"
                    })
                    $("#banner ul li:nth-child(3) .text").css({
                        right: "20%",
                        top: "20%"
                    })

                    var index = 0;
                    var timer = null;

                    function autoPlay() {
                        timer = setInterval(function () {
                            document.title = index;
                            index++;
                            if (index > 2) {
                                index = 0
                            } else if (index < 0) {
                                index = 2;
                            };
                            $("#banner ul li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
                        }, 3000);
                    }

                    autoPlay();

                    $("#prev").click(function () {
                        clearInterval(timer);
                        index--;
                        if (index > 2) {
                            index = 0
                        } else if (index < 0) {
                            index = 2;
                        };
                        $("#banner ul li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
                    })
                    $("#next").click(function () {
                        clearInterval(timer);
                        index++;
                        if (index > 2) {
                            index = 0
                        } else if (index < 0) {
                            index = 2;
                        };
                        $("#banner ul li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
                    })

                    $("#banner ul li").hover(function () {
                            clearInterval(timer);
                        },
                        function () {
                            autoPlay();
                        })
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