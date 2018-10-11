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
            //slide动画
            //初始位置判断
            if ($(document).scrollTop() >= 100) {
                $("#slide").find("svg").stop().animate({
                    width: 0,
                    height: 0
                }, 600, "linear", function () {
                    $(".slide_box").animate({
                        height: 133,
                    }, "linear")
                });
                $(".slide_box").css({
                    position: "fixed",
                    top: -70,
                    boxShadow: "0 0px 10px 5px #999"
                });
            }
            $(document).scroll(function () {
                if ($(document).scrollTop() >= 100) {
                    $("#slide").find("svg").stop().animate({
                        width: 0,
                        height: 0
                    }, 600, "linear", function () {
                        $(".slide_box").animate({
                            height: 133,
                        }, "linear")
                    });
                    $(".slide_box").css({
                        position: "fixed",
                        top: -70,
                        boxShadow: "0 0px 10px 5px #999"
                    });
                }
                if ($(document).scrollTop() < 100) {
                    $("#slide").find("svg").stop().animate({
                        width: 31,
                        height: 31
                    }, 600, "linear", function () {
                        $(".slide_box").animate({
                            height: 160
                        }, "linear")
                    });
                    $(".slide_box").css({
                        position: "relative",
                        top: 0,
                        boxShadow: "none"
                    });
                }

            })

            //banner动态加载
            $.ajax({
                url: "json/shopping.json",
                type: "GET",
                success(res) {
                    $("#banner").css("background", `url(${res[0][0].url})`);
                },
                error(msg) {
                    alert(msg);
                }
            })
            //cont1动态加载
            $.ajax({
                url: "json/shopping.json",
                type: "GET",
                success(res) {
                    var html = '';
                    for (var i = 0; i < res[1].length; i++) {
                        html += `<li><a href="">
                        <img src="${res[1][i].url}" alt="">
                        </a></li>`;
                    }
                    $(".cont1_box").find(".cont1").html(html);
                },
                error(msg) {
                    alert(msg);
                }
            })
            //获取对象长度
            function objLength(obj) {
                var arr = Object.keys(obj);
                return arr.length;
            }
            //cont2动态加载
            $.ajax({
                url: "json/shopping.json",
                type: "GET",
                success(res) {
                    var html1 = '';
                    var html2 = '';
                    var html3 = '';
                    for (var i = 0; i < res[2].length; i++) {
                        res[2][i].length = objLength(res[2][i]);
                        var newHtml = '';
                        if (res[2][i].length > 3) {
                            for (var j = 0; j < res[2][i].color.length; j++) {
                                newHtml += `<img src="${res[2][i].color[j]}"alt="">`;
                            }
                        }

                        html1 += ` <li><a href="">
                        <img src="${res[2][i].url}" alt="">
                        <h3>${res[2][i].title}</h3>
                        <p>${res[2][i].price}</p>
                        <div>
                            ${newHtml}
                        </div>
                    </a>
                </li>`;
                    }
                    for (var i = 0; i < res[3].length; i++) {
                        res[3][i].length = objLength(res[3][i]);
                        var newHtml = '';
                        if (res[3][i].length > 3) {
                            for (var j = 0; j < res[3][i].color.length; j++) {
                                newHtml += `<img src="${res[3][i].color[j]}"alt="">`;
                            }
                        }

                        html2 += ` <li><a href="">
                        <img src="${res[3][i].url}" alt="">
                        <h3>${res[3][i].title}</h3>
                        <p>${res[3][i].price}</p>
                        <div>
                            ${newHtml}
                        </div>
                    </a>
                </li>`;
                    }
                    for (var i = 0; i < res[4].length; i++) {
                        res[4][i].length = objLength(res[4][i]);
                        var newHtml = '';
                        if (res[4][i].length > 3) {
                            for (var j = 0; j < res[4][i].color.length; j++) {
                                newHtml += `<img src="${res[4][i].color[j]}"alt="">`;
                            }
                        }

                        html3 += ` <li><a href="">
                        <img src="${res[4][i].url}" alt="">
                        <h3>${res[4][i].title}</h3>
                        <p>${res[4][i].price}</p>
                        <div>
                            ${newHtml}
                        </div>
                    </a>
                </li>`;
                    }
                    $(".cont2_box").find(".cont2").find(".op6").find("ul").html(html1);
                    $(".cont2_box").find(".cont2").find(".op5T").find("ul").html(html2);
                    $(".cont2_box").find(".cont2").find(".life").find("ul").html(html3);


                },
                error(msg) {
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