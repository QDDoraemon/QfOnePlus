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
                car_msg();
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
            /* 去购物进度条 */
            $('.details button').mouseenter(function () {
                $(this).css('color', '#fff');
                $("#shelter2").stop().animate({
                    width: 200
                }, "linear");
            }).mouseleave(function () {
                $(this).css('color', 'rgb(90, 5, 5)');
                $("#shelter2").stop().animate({
                    width: 0
                }, "linear");
            });
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

        goods_details();

        function goods_details() {
            $.ajax({
                url: 'json/oneplus6.json',
                type: 'GET',
                success: function (res) {
                    if ($.cookie('goods')) {
                        $(".details").html('');
                        var cookie_arr = eval($.cookie('goods'));
                        // alert(res[0][cookie_arr[1].id].small);
                        var html = '';
                        for (var i = 0; i < cookie_arr.length; i++) {
                            html += `
                            <li>
                                <img src="${res[0][cookie_arr[i].id].small}" alt="">
                                <span>${res[0][cookie_arr[i].id].title}</span>
                                <span class='price'>${res[0][cookie_arr[i].id].price}</span>
                                <span>
                                    <b>-</b>
                                    <i>${cookie_arr[i].num}</i>
                                    <b>+</b>
                                </span>
                                <span class="total">￥${parseFloat(res[0][cookie_arr[i].id].price.substring(1) * (cookie_arr[i].num))}.00</span>
                                <span class="remove">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-chahao"></use>
                                    </svg>
                                </span>
                            </li>`;
                            $(".details").html('<ul></ul>');
                            $(".details ul").html(html);
                        }
                    }
                    /* 删除商品 */
                    $('.remove').click(function(){
                        var arr = eval($.cookie('goods'));
                        var index = $(this).closest('li').index();
                        arr.splice(index,1);
                        $.cookie('goods',JSON.stringify(arr),{expires:7,raw:true});
                        // $(this).closest('li').remove();
                        location.reload();
                    })
                    /* 计算总价 */
                    $('.pay').show();
                    var min = 2;
                    var sum_total = 0;
                    for (var i = 0; i < $('.details li:last-child()').index() + 1; i++) {
                        sum_total += parseFloat($('.details ul li').eq(i).find('.total').html().substring(1));
                    }
                    $('.pay .sum-total').html(`￥${sum_total}.00`);

                    $('.details ul li span b:even').click(function () {
                        if (parseInt($(this).siblings('i').html()) < min) {
                            $(this).siblings('i').html(min);
                        }
                        $(this).siblings('i').html(parseInt($(this).siblings('i').html()) - 1);
                        var total = `￥${parseInt($(this).siblings('i').html()) * parseFloat($(this).closest('span').siblings(".price").html().substring(1))}.00`;
                        $(this).closest("span").siblings('.total').html(total);
                        var sum_total = 0;
                        for (var i = 0; i < $('.details li:last-child()').index() + 1; i++) {
                            sum_total += parseFloat($('.details ul li').eq(i).find('.total').html().substring(1));
                        }
                        $('.pay .sum-total').html(`￥${sum_total}.00`);
                    })

                    $('.details ul li span b:odd').click(function () {
                        $(this).siblings('i').html(parseInt($(this).siblings('i').html()) + 1);
                        var total = `￥${parseInt($(this).siblings('i').html()) * parseFloat($(this).closest('span').siblings(".price").html().substring(1))}.00`;
                        $(this).closest("span").siblings('.total').html(total);
                        var sum_total = 0;
                        for (var i = 0; i < $('.details li:last-child()').index() + 1; i++) {
                            sum_total += parseFloat($('.details ul li').eq(i).find('.total').html().substring(1));
                        }
                        $('.pay .sum-total').html(`￥${sum_total}.00`);
                    })
                },
                error: function (msg) {
                    alert(msg);
                }
            })
        }
        /* 购物车 */
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

    }
    return {
        main: main
    }
})