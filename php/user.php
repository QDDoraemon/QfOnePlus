<?php 
	//设置编码格式
header("Content-type:text/html;charset=utf-8");
	/*
		总结：php链接数据的  天龙八部
 */
	//1、链接数据库
$link = mysql_connect("localhost", 'root', '123456');
	// var_dump($link)
	//2、判断链接是否成功
if (!$link) {
    echo "链接数据库失败";
    exit; //退出当前程序。
}

	//3、设置字符集
mysql_set_charset("utf8");

	//4、选择数据库
mysql_select_db("OnePlus");

	//5、准备sql语句进行操作。
$sql = "select * from users";

	//6、发送sql语句

$res = mysql_query($sql);

	// var_dump($res);

$arr = array();
	//7、处理结果集  取出返回结果中的其中一行数据
while ($row = mysql_fetch_assoc($res)) {
    array_push($arr, $row);
}

echo json_encode($arr);
	

	//8、关闭数据库
mysql_close($link);

?>	