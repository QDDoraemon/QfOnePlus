console.log("加载成功");

/*
	管理我们index.html引入的所有模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",

        //抛物线函数，不遵从AMD
        "parabola": "parabola",
        "login": "login",
        "database": "database",
        "order": "order"
    },
    //设置模块之间的依赖关系
    shim: {
        "jquery-cookie": ["jquery"],
        /*
        	定义不遵从AMD规范的js文件
        */
        "parabola": {
            exports: "_"
        }
    }
})


require(['login', 'database', 'order'], function (login, database, order) {
    login.main();
    database.main();
    order.main();
})