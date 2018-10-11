
//碰撞函数
			function touch(node1, node2){
				var l1 = node1.offsetLeft;
				var r1 = node1.offsetLeft + node1.offsetWidth;
				var t1 = node1.offsetTop;
				var b1 = node1.offsetTop + node1.offsetHeight;

				var l2 = node2.offsetLeft;
				var r2 = node2.offsetLeft + node2.offsetWidth;
				var t2 = node2.offsetTop;
				var b2 = node2.offsetTop + node2.offsetHeight;

				if(l1 > r2 || r1 < l2 || t1 > b2 || b1 < t2){
					return false;
				}else{
					return true;
				}

			}
/*
	删除cookie
*/
function removeCookie(name){
	document.cookie = encodeURIComponent(name) + '= ;expires=' + new Date(0);
}

function getCookie(name){
	var cookieStr = decodeURIComponent(document.cookie);
	var start = cookieStr.indexOf(name);
	if(start == -1){
		return null;
	}else{
		var end = cookieStr.indexOf(';', start);
		if(end == -1){
			end = cookieStr.length;
		}
	}

	//字符串提取
	var subStr = cookieStr.substring(start, end);
	//字符串分割
	var arr = subStr.split('=');
	return arr[1];
}
/*
	expires 传数字天数
*/
function setCookie({name, value, expires=7, path, domain, secure}){
	//<1>name和value有可能是中文，编码去存
	var cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	//<2>可选值
	if(expires){
		cookieStr += ';expires=' + getNumOfDate(expires);
	}
	if(path){
		cookieStr += ';path=' + path;
	}
	if(domain){
		cookieStr += ';domain=' + domain; 
	}
	if(secure){
		cookieStr += ';secure';
	}
	document.cookie = cookieStr;

}
function getNumOfDate(n){
	var d = new Date();
	var day = d.getDate();
	d.setDate(day + n);
	return d;
}
function addEvent(obj, type, func){
	if(obj.addEventListener){
		obj.addEventListener(type, func, false);
	}else{
		obj.attachEvent('on' + type, func);
	}
}

function removeEvent(obj, type, func){
	if(obj.removeEventListener){
		obj.removeEventListener(type, func);
	}else{
		obj.detachEvent('on' + type, func);
	}
}

//拖拽
function drag(node){
	var offsetX = 0;
	var offsetY = 0;
	node.onmousedown = function(ev){
		var e = ev || window.event;
		offsetX = e.clientX - node.offsetLeft;
		offsetY = e.clientY - node.offsetTop;

		//拖拽
		document.onmousemove = function(ev){
			var e = ev || window.event;
			node.style.left = e.clientX - offsetX + 'px';
			node.style.top = e.clientY - offsetY + 'px';
		}

		//抬起，结束拖拽
		document.onmouseup = function(){
			document.onmousemove = null;
		}

	}
}


//阻止默认行为进行浏览器兼容性写法
function preDef(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
}

/*
	阻止事件冒泡的浏览器兼容写法
*/
function stopBubble(e){
	if(e.cancelBubble){
		e.cancelBubble = true;
	}else{
		e.stopPropagation();
	}
}

/*
	封装函数，创建一个带文本的元素节点
*/
function createElementWithText(tagName, txt){
	var otagName = document.createElement(tagName);
	var otxt = document.createTextNode(txt);
	otagName.appendChild(otxt);
	return otagName;
}

//nodes 传入子节点  生成新数组，不修改原有节点
function removeSpaceNode(nodes){
	var res = [];
	for(var i = 0; i < nodes.length; i++){
		if(!(nodes[i].nodeType == 3 && /^\s+$/ig.test(nodes[i].nodeValue))){
			res.push(nodes[i]);
		}
	}
	return res;
}

//parentNode 父节点 直接从源节点上删除空白。
function removeSpaceNode2(parentNode){
	var nodes = parentNode.childNodes;
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/ig.test(nodes[i].nodeValue)){
			//判断是空白节点
			parentNode.removeChild(nodes[i]);
		}
	}
	
}
//随机颜色
function randomColor(){
	var str = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',1)';
	return str;
}
/*
	函数库 丰富
*/
function $(CSSstr){
	//判断这个字符串是哪种选择器
	switch(CSSstr[0]){
		case '#': //id
			return document.getElementById(CSSstr.substring(1));
			break;
		case '.': //class
			return elementsByClassName(document, CSSstr.substring(1));
			break;
		case '[': //[name=hello]
			var name = CSSstr.substring(6, CSSstr.length - 1);
			return document.getElementsByName(name);
			break;
		default: //tagName
			return document.getElementsByTagName(CSSstr);
			break;
	}
}


function elementsByClassName(node, classStr){

	//将node下所有的节点类型，都获取到
	var nodes = node.getElementsByTagName('*');
	//对找到的节点进行筛选
	var res = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == classStr){
			res.push(nodes[i]);
		}
	}

	return res;
}



function getStyle(element, cssType){
	return element.currentStyle ? element.currentStyle[cssType] : getComputedStyle(element)[cssType];
}