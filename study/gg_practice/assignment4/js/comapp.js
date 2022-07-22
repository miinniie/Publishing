/**
 * ============================================================= 
 * 공통선언
 */
com = {};
com.docRoot = '';

com.basic = {};
com.basic.page = 'index.jsp';
com.basic.uploadFileMbSize = 5;
	
com.date = new Object();
com.date.fullDate; // YYYYMMDD HH24:MI:SS
com.date.toDay; // YYYYMMDD
com.date.toMonth; // MM
com.date.toYear; // YYYY
com.date.toTime; // HH24
com.date.toMinute; // MI


/**
 * ============================================================= 
 * 업무공통
 */
com.CONST = new Object();

/**
 * ============================================================= 
 * 유틸
 */
com.util = new Object();

/**
 * 프로토콜을 조회하여 redirect
 */
com.util.replaceRedirect = function(asis, tobe){
    var hp_hostname = window.location.hostname;
    if(!hp_hostname.match('localhost'))
    {
        var url = document.URL + "";
        if(url){
        	if(url.indexOf(asis + ':') > -1){
        		url = url.replace(asis, tobe);
        		window.location.href = url;
        	}
        }
    }
}

com.util.isProtocol = function(val){
    var url = document.URL + "";
    if(url){
    	return ((url.indexOf(val + ':') > -1) ? true : false);
    }
    return false;
}

/**
 * 모바일 check
 */
com.util.isMobile = {

	  Android: function () {
               return navigator.userAgent.match(/Android/i) == null ? false : true;
      },
      BlackBerry: function () {
               return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
      },
      IOS: function () {
               return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
      },
      Opera: function () {
               return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
      },
      Windows: function () {
               return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
      },
      any: function () {
               return (com.util.isMobile.Android() || com.util.isMobile.BlackBerry() || com.util.isMobile.IOS() || com.util.isMobile.Opera() || com.util.isMobile.Windows());
      }
};


/**
 * 팝업 열기 = 모바일 앱인 경우 예외처리
 */
com.util.popOpen = function(url, name, specs, replace){
	
	var bday 	= '20181213';
	var today 	= function(){
		var n = new Date();
		var y = n.getFullYear();
		var m = (n.getMonth() + 1);
		m = (m<10) ? '0' + m : m;
		var d = n.getDate();
		d = (d<10) ? '0' + d : d;
		return y+''+m+''+d;
	};
	
	var addUrl = function(val, type){
		val = val + '';
		val = (val.indexOf('?')>-1) ? val + '&appok=y' : val + '?appok=y';
		var a_url = (type=='ios') ? 'exitpop://' : '';
		
		if(val.indexOf('http')>-1){
			val = a_url + val;
		} else {
			val = (val.substring(0,1)=='/') ? val : '/' + val;
			val	= a_url + window.location.protocol + '//' + window.location.hostname + val;			
		}
		return val;
	}
	
	var standalone 	= window.navigator.standalone, 
	userAgent 		= window.navigator.userAgent.toLowerCase(),
	safari 			= /safari/.test( userAgent ),
	ios 			= /iphone|ipod|ipad/.test( userAgent ),
	android 		= /android/.test( userAgent );
	
	var wopen = function(url, name, specs, replace){
		if(replace){
			window.open(url, name, specs, replace);
		} else if(specs){
			window.open(url, name, specs);
		} else if(name){
			window.open(url, name);
		} else {
			window.open(url);
		}
	}
	
	if(bday < today()){
		if( ios ) {
			if ( !standalone && !safari ) {
				// 아이폰 웹뷰
				//window.location.href = "exitpop://https://event.seoul.go.kr/collegerpartime/partTimeInfo.do";
				window.location.href = addUrl(url,'ios');
				return;
		 	};
		} else {
			if(android) {
				if (typeof mobileseoulandroid === "undefined") {
				} else {
			    	// 안드로이드 웹뷰
					url = addUrl(url,'android');
				}
			}
		};		
	};
	wopen(url, name, specs, replace);
};


/**
 * 팝업 닫기 = 모바일 앱인 경우만 예외처리
 */
com.util.popClose = function(){
	
	var standalone 	= window.navigator.standalone, 
	userAgent 		= window.navigator.userAgent.toLowerCase(),
	safari 			= /safari/.test( userAgent ),
	ios 			= /iphone|ipod|ipad/.test( userAgent ),
	android 		= /android/.test( userAgent );
	
	var isApp = function(){
		var furl = window.location.href + '';
		return ((furl.indexOf('appok')>-1) ? true : false);
	}
	
	if( ios ) {
		if ( !standalone && safari ) {
			// 아이폰 브라우저 접속
			if(isApp()){
				window.location.href = "mobileseoulapp://";
				return;
			}
	 	} else if ( standalone && !safari ) {
	 		// 아이폰 Standalone 
	 	} else if ( !standalone && !safari ) {
	 		// 아이폰 웹뷰
	 	};
	} else {
		if(android) {
			if (typeof mobileseoulandroid === "undefined") {
				// 안드로이드 브라우저
				if(isApp()){
					window.location.href = "mobileseoulapp://seoul";
					return;
				}
			} else {
		    	// 안드로이드 웹뷰
			}
		}
	};		
	window.open('','_self').close();
};


/**
 * 검색어 마지막글자 초성여부
 */
com.util.keyword = function(v){
	var com = /[ㄱ-ㅎ]/g;
	var last = v.substring(v.length-1);
	var res = last.replace(com, '');
	return res == '' ? false : true;
};

/**
 * replace all
 */
com.util.replaceAll = function(v, searchStr, replaceStr){
	return v.split(searchStr).join(replaceStr);
};


/**
 * Object 값 판단
 * 
 * @obj : Object
 */
com.util.isEmptyObject = function(obj) {

	// null and undefined are "empty"
	if (obj == undefined)
		return true;
	if (obj == null)
		return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0)
		return false;
	if (obj.length === 0)
		return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for ( var key in obj) {
		if (hasOwnProperty.call(obj, key))
			return false;
	}

	return true;
};

/**
 * formater 형식으로 값을 변형함.
 * 
 * @value : number return 10000.00 => '10,000.00'
 */
com.util.formatThreeComma = function(value) {

	return (value.toString()).replace(

	/^([-+]?)(0?)(\d+)(.?)(\d+)$/g, function(match, sign, zeros, before,
			decimal, after) {

		var reverseString = function(string) {
			return string.split('').reverse().join('');
		};
		var insertCommas = function(string) {
			var reversed = reverseString(string);
			var reversedWithCommas = reversed.match(/.{1,3}/g).join(',');
			return reverseString(reversedWithCommas);
		};
		return sign
				+ (decimal ? insertCommas(before) + decimal + after
						: insertCommas(before + after));
	});
};

/**
 * formater 형식으로 값을 변형함.
 * 
 * @value : 값
 * @format : '####-##-##'
 * @mark : '#' (생략가능)
 */
com.util.formatMake = function(value, format, mark) {

	var mak = (mark == undefined) ? '#' : mark;
	var chk = value.split('');
	var fom = format.split('');
	var cnt = -1;
	var res = '';

	for (idx in fom) {
		if (fom[idx] == mak) {
			cnt++;
			res = res + chk[cnt];
		} else {
			res = res + fom[idx];
		}
	}
	return res;
};

/**
 * 이메일 형식 check
 * 
 * @value : 이메일
 */
com.util.isEmailType = function(email) {
	
	var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   
	return regex.test(email);
};

/**
 * Object 의 값중 orgValue --> changeValue 변경하여 새로은 오브젝트를 리턴한다.
 */
com.util.OjectChangeValue = function(tarObj, orgValue, changeValue) {

	var obj = new Object();
	for ( var key in tarObj) {
		if (tarObj[key] == orgValue) {
			obj[key] = changeValue;
		} else {
			obj[key] = tarObj[key];
		}
	}
	return obj;
};

/**
 * Array 값중에 특정컬럼의 값을 찾아서 해당 Row를 리턴한다.
 * 
 * @tarArray : 찾을 list
 * @findColumn : 찾을 컬럼
 * @findValue : 찾을 값
 */
com.util.findValueInArray = function(tarArray, findColumn, findValue) {

	var idx = 0;
	for (idx in tarArray) {
		if (tarArray[idx][findColumn] == findValue) {
			var reObj = tarArray[idx];
			break;
		}
	}
	return reObj;
};

/**
 * 
 * 숫자를 증가시켜서 Array 값으로 리턴한다.
 * 
 * @startValue : 시작값
 * @interval : 증감값
 * @count : 반복횟수
 * @isMaxSizeFill : boolean ( true : 부족한 크기를 '0' 으로 채운다 --> '01' )
 * @objectFormat : 오브젝트를 형태를 만들어서 리턴한다. ( 예: {'value':'', 'text':''} )
 */
com.util.repeatDataToArray = function(startValue, interval, count,
		isMaxSizeFill, objectFormat) {

	var i = 0;
	var val;

	if (startValue > -1) {
		val = (interval < 0) ? startValue + 1 : startValue - 1;
	} else {
		val = startValue + 1;
	}

	var save = [];
	var maxSize = 0;
	while (i < count) {

		val += interval;
		maxSize = ((val.toString().length) > maxSize) ? val.toString().length
				: maxSize;
		save.push(val);
		i++;
	}
	;

	var fillString = function(data) {
		if (maxSize == data.toString().length)
			return data.toString();

		var tmp = '';
		var len = maxSize - data.toString().length;
		for (var i = 0; i < len; i++) {
			tmp += '0';
		}
		tmp = tmp + data;
		return tmp;
	};

	var redata = [];
	var imsi = '';
	for ( var idx in save) {

		if (isMaxSizeFill == undefined || isMaxSizeFill == false) {
			imsi = save[idx];
		} else {
			imsi = fillString(save[idx]);
		}
		if (objectFormat == undefined) {
			redata.push(imsi);
		} else {
			var obj = new Object();
			for (key in objectFormat) {
				obj[key] = imsi;
			}
			;
			redata.push(obj);
		}
	}
	;
	return redata;

};

/**
 * URL을 파싱하여 url부분과 파라미터를 Object로 담아 리턴한다.
 * 
 * @urlString : 주소
 */
com.util.parsUrl = function(urlString) {
	var split = urlString.split('?');
	var url = split[0];
	var params;
	var resultParam = {};
	if (split.length > 1) {
		params = split[1].split('&');
		for (var i = 0; i < params.length; i++) {
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			resultParam[key] = value;
		}
	}

	return {
		url : url,
		param : resultParam
	};
};

/**
 * 숫자만 입력받게 한다.
 * 
 * @className : 대상 class
 */
com.util.numberInput = function(className) {

	$(className).css('ime-mode', 'disabled');
	
	$(className).on(
			'keydown',
			function(e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1
						||
						// Allow: Ctrl+A
						(e.keyCode == 65 && e.ctrlKey === true) ||
						// Allow: home, end, left, right
						(e.keyCode >= 35 && e.keyCode <= 39)) {
					// let it happen, don't do anything
					return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
						&& (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});
};

/**
 * 기본키값 제외
 */
com.util.etckey = function(e){
	if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1
			||
			// Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
		// let it happen, don't do anything
		return true;
	}
	return false;
};


/**
 * 문자와 숫자를 비교하여 숫자로 리턴한다.
 * 
 * value : 문자, 숫자 값
 */
com.util.getNumber = function(value) {
	value = value.replace(/[,]/g, '');
	var num = 0;
	if(value == "" || value == undefined){
	} else if(isNaN(value)){
	} else {
		num = Number(value);
	}
	return num;
};


/**
 * 현재 포커스의 위치(index)를 return한다.
 * 
 * @ctrl : element( ex : this )
 */
com.util.doGetCaretPosition = function(ctrl) {

	var CaretPos = 0;
	// IE Support
	if (document.selection) {

		ctrl.focus();
		var Sel = document.selection.createRange();

		Sel.moveStart('character', -ctrl.value.length);

		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;

	return (CaretPos);
};

/**
 * 지정한 위치로 포커스를 이동시킨다.
 * 
 * @ctrl : element( ex : this )
 * @pos : element( ex : index )
 */
com.util.setCaretPosition = function(ctrl, pos) {
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};


/**
 * 쿠키 생성 및 삭제 
 * ex) 생성: cookieSet('test', 'cookie test, 쿠키 테스트', 1) 
 * ex) 삭제: cookieSet('test', '', -1)
 */
com.util.cookieSet = function(cName, cValue, cDay) {

	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ ';
	if (typeof cDay != 'undefined') {
		cookies += ';expires=' + expire.toGMTString() + ';';
	}
	document.cookie = cookies;
};

/**
 * 쿠키 가져오기
 * 
 * @cName : id
 */
com.util.cookieGet = function(cName) {

	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1)
			end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
};

/**
 * 쿠기 전체를 Array로 추출한다.
 * 
 * @param keyName :
 *            key로 사용될 이름 (없는경우: 'key')
 * @param valueName :
 *            value로 사용될 이름. (없는경우: 'value') return : Array[]
 */
com.util.cookieGetArray = function(keyName, valueName) {
	var reArr = [];
	if (document.cookie.length > 0) {
		var inArr = document.cookie.split('; ');
		for ( var idx in inArr) {
			var tmp = inArr[idx].split('=');
			var obj = new Object();
			if (keyName != undefined) {
				var patt1 = new RegExp(keyName);
				if (patt1.test(tmp[0])) {
					obj[keyName] = tmp[0].replace(keyName, '');
				}
			} else {
				obj['key'] = tmp[0];
			}
			if (valueName != undefined) {
				var patt2 = new RegExp(valueName);
				if (patt2.test(tmp[1])) {
					obj[valueName] = tmp[1].replace(valueName, '');
				}
			} else {
				obj['value'] = tmp[1];
			}
			reArr.push(obj);
		}
	}
	return reArr;
};

/**
 * 쿠기 전체를 삭제한다.
 * 
 * @param keyName :
 *            key로 사용된 이름
 */
com.util.cookieDeleteAll = function(keyName) {
	var inArr = [];
	if (document.cookie.length > 0) {
		inArr = document.cookie.split('; ');
		for ( var idx in inArr) {
			var tmp = inArr[idx].split('=');
			if (keyName != undefined) {
				var patt1 = new RegExp(keyName);
				if (patt1.test(tmp[0])) {
					com.util.cookieSet(tmp[0], '', -1);
				}
			} else {
				com.util.cookieSet(tmp[0], '', -1);
			}
		}
	}
};

/**
 * 테이블의 선택된 tr의 위치를 찾아서 스크롤을 위치시킨다.
 * 
 * @param {
 *            container : container(div) table : table selectIndex : selectIndex //
 *            tr 이 선택된 index }
 */
com.util.scrollFindTable = function(param) {

	// param
	var container = param['container'];
	var table = param['table'];
	var selectIndex = param['selectIndex'];

	selectIndex = (selectIndex == 0) ? 0 : selectIndex - 2;

	var w = $(container);
	var row = $(table).find('tr').eq(selectIndex);
	if (row.length) {
		w.scrollTop(0);
		w.scrollTop(row.offset().top - (w.height() / 2));
	}
};

/**
 * 16진수 칼라값을 10진수로 변경하여 리턴한다.
 * 
 * @hex : '#4b4b4b'
 * @return: [255,255,0]
 * 
 */
com.util.Hex2RGB = function(hex) {
	if (hex.lastIndexOf('#') > -1) {
		hex = hex.replace(/#/, '0x');
	} else {
		hex = '0x' + hex;
	}
	var r = hex >> 16;
	var g = (hex & 0x00FF00) >> 8;
	var b = hex & 0x0000FF;
	return [ r, g, b ];
};


/**
 * 문자열 길이 구하기.
 * 한글은 2, 그외 1로 체크한다.
 * @val : string value값
 */
com.util.charLength = function(val) {
	var sb = 0;
	sb = (function(s,b,i,c){for(b=i=0; c=s.charCodeAt(i++);b+=c>>11?2:c>>7?2:1); return b;})(val);
	return sb;
};


/**
 * sourceId form 에서 값을 가져와, targetid form에 합쳐진다.
 * @targetId : 합쳐지는 form id
 * @sourceId : 가져올 form id
 */
com.util.mergeForm = function(targetId, sourceId){
	
	var formObj = {};
	var html	= '';
    var inputs = $(sourceId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
        //html = '<input type="hidden" name="' + input.name + '" value="' + input.value + '">';
        //XSS 대응 20201015
        html = $("<input type='hidden' />");
        html.attr("name",input.name);
        html.attr("value",input.value);
        
        $(targetId).append(html);
    });
}


/**
 * targetId form 에서 파라미터 값을 추출한다.
 * @targetId : targetId
 * @return: {key1:'value1',key2:'value2'}
 */
com.util.getFormParam = function(targetId){
	
	var obj = {};
    var inputs = $(targetId).serializeArray();
    $.each(inputs, function (i, input) {
    	obj[input.name] = input.value;
    });
    return obj;
}


/**
 * targetId form 에서 파라미터 값을 추출한다.
 * @targetId : targetId
 * @prop : 특정 attr 이 있는 경우만 파라미터를 추출 
 * @return: {key1:'value1',key2:'value2'}
 */
com.util.getFormParamChoice = function(targetId, prop){
	
	var obj 	= {};
    var arr 	= $(targetId).serializeArray();
    var fval 	= "";
    prop 		= '[' + prop + ']';
    $.each(arr, function (i, input) {
    	
    	fval = '[name=' + input.name + ']';
    	if( $(targetId).find(fval).is(prop) ){
        	obj[input.name] = input.value;
    	}
    });
    return obj;
}

com.util.redirectDelParam = function(find){
	
	var url = window.location.href;
	// check find sting
	if(url.indexOf("?")>-1){
		var tmps = url.split("?");
		if(tmps[1].indexOf(find)==-1){
			return url;
		}
	} else {
		return url;
	}
	// process
	var res   = "";
	var cnt   = 0;
	var spt1  = url.split("?");
	var spt2  = spt1[1].split("&");
	for(var idx in spt2){
		if(spt2[idx].indexOf(find)==-1){
			cnt ++;
			res += spt2[idx] + "&";
		}
	}
	res = ((cnt>0) ? spt1[0] + "?" + res.slice(0,-1) : spt1[0]);
	return res.substring(res.indexOf(location.pathname), res.length);
}

com.util.redirectList = 
	[
	 '1|저장되었습니다.',
	 '2|삭제되었습니다.',
	 '3|중복된 대상자가 있습니다.'
	 ]

com.util.redirectMsg = function(key, afterFn){
	
	if(!key) return;
	var arr = com.util.redirectList;
	var spl = null;
	for (var idx in arr) {
		spl = arr[idx].split("|");
		if(spl[0].toString()==key.toString()){
			history.replaceState({}, null, com.util.redirectDelParam("redirectKey"));
			alert(spl[1]);
			if(afterFn) {
				afterFn();
				return;
			}
			break;
		}
	}
}

com.util.getBrowser = function(){
	
	var agt = navigator.userAgent.toLowerCase();
	if( (navigator.appName=='Netscape' && agt.indexOf('trident') != -1) || (agt.indexOf('msie') != -1) ){

		if(agt.indexOf('msie') != -1){
			// 익스플로러 10 이하일 경우
			var rv = -1;   	
			if (navigator.appName == 'Microsoft Internet Explorer') {        
				var ua = navigator.userAgent;   
				var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");  
				if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);    
			}
			return 'IE:'+rv;
		} else {
			return 'IE:11';
		}
	}

	if (agt.indexOf("chrome") != -1) 		return 'Chrome'; 
	if (agt.indexOf("opera") != -1) 		return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) 	return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) 		return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) 		return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) 		return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) 	return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) 		return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) 		return 'Firefox'; 
	if (agt.indexOf("safari") != -1) 		return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) 	return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) 		return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) 	return 'Mozilla'; 
}

com.util.getFileSize = function(id, unit){
	
	var iSize = 0;
	var brow  = com.util.getBrowser();
	
	if(brow.indexOf('IE') != -1 && brow.indexOf('IE:11')==-1){
		var objFSO 	= new ActiveXObject("Scripting.FileSystemObject");
		var sPath 	= $(id)[0].value;
		var objFile = objFSO.getFile(sPath);
		iSize		= objFile.size;
	} else {
		iSize = $(id)[0].files[0].size;
	}
	if(unit.toLowerCase()=='kb'){
		iSize = iSize / 1024;
	} else if(unit.toLowerCase()=='mb'){
		iSize = iSize / 1024 / 1024;
	} else {
		// BYTE
		iSize = iSize;
	}
	return Number(iSize);
}


com.util.InputFileCheck = function(obj){
	
	var target 			= obj['target'];
	var extlist 		= obj['extlist'];
	var size			= obj['size'];
	var unit			= obj['unit'];
	var extCallback 	= obj['extCallback'];
	var sizeCallback 	= obj['sizeCallback'];
	var afterCallback 	= obj['afterCallback'];
	
	$(target).change(function(event){
		
		var file = $(this).val();
		var ext = file.split('.').pop().toLowerCase();
		if($.inArray(ext, extlist)==-1){
			
			if(file!=''){
				var estr = "";
				for(i=0; i<extlist.length; i++){
					estr += extlist[i] + ', ';
				}
				extCallback(estr);
			}
			$(this).val('');
			return;
		}
		
		var fsize = com.util.getFileSize(target, unit);
		if(fsize > 2){
			if(file!=''){
				var sstr = size + unit;
				sizeCallback(sstr);
			}
			$(this).val('');
			return;
		}
		if(afterCallback){
			afterCallback(file);
		}
	});	
}

com.util.readImageURL = function(input, imgPrivewId){
	
	if(input.files && input.files[0]){
		if ( window.FileReader ) {
			var reader = new FileReader();
			reader.onload = function(e){
				$("#"+imgPrivewId).attr("src", e.target.result);
			}
			 
			reader.readAsDataURL(input.files[0]);
		}else{
			input.select();
			var src = document.selection.createRange().text;
			$('#'+imgPrivewId).attr('src', src);  
		}
		$("#"+imgPrivewId).show();
	 }
}

com.util.readImageURL2 = function(input, imgId, callback){

	var robj = {};
	
	if(input.files && input.files[0]){
		if ( window.FileReader ) {
			var reader = new FileReader();
			reader.onload = function(e){
				
				document.getElementById(imgId).addEventListener('load', function(){
					
					robj.width 	= this.naturalWidth;
					robj.height	= this.naturalHeight;
					callback(robj);
				});
				
				$("#"+imgId).attr("src", e.target.result);
			}
			 
			reader.readAsDataURL(input.files[0]);
		}else{
			
			document.getElementById(imgId).addEventListener('load', function(){
				robj.width 	= this.naturalWidth;
				robj.height	= this.naturalHeight;
				callback(robj);
			});
			
			input.select();
			var src = document.selection.createRange().text;
			$('#'+imgId).attr('src', src);  
		}
	 }
}

com.util.setSelectTag = function(target){
	
	var val = $(target).attr('cu-findval');
	$(target + ' option').each(function(){
		if(val==$(this).attr('value')){
			$(target).val(val).prop('selected', true);
			return false;
		}
	})
}

com.util.alertTime = function(msg, callback, second){
	
	alert(msg);
	var sec = !(second) ? 1000 : Number(second);
	
	setTimeout(function(){
		if(callback) callback();
	}, sec);
	return false;
}

/**
 * ============================================================= 
 * 유틸 - Date
 */

com.dateUtil = new Object();

/**
 * 날짜를 문자열로 변환 한다.
 * 
 * @param{ 
 * 		cdate : New Date() 
 *  	type : 24 , 12 (default: 24) : 시간제 
 *  	mask : 'YYYY-MM-DD', 'YYYY-MM-DD HH:MI:SS' , 'YYYYMMDDHHMI' (default: 'YYYY-MM-DD') 
 *  }
 * @return : 문자열 날짜 ( '2014-05-01' or '2014-05-01 14:25:35' or '201405011425' )
 */
com.dateUtil.getStringToDate = function(param) {

	var cdate = param['cdate'];
	var type = param['type'];
	var mask = param['mask'];

	type = (type == undefined) ? 24 : type;
	mask = (mask == undefined) ? 'YYYY-MM-DD' : mask;

	var addZero = function(val) {
		if (val < 10)
			val = "0" + val;
		return val;
	};

	// 추출
	var ry = cdate.getFullYear();
	var rm = addZero(cdate.getMonth() + 1);
	var rd = addZero(cdate.getDate());
	var hours = addZero(cdate.getHours());
	if (type == undefined || type == '12' || type == 12) {
		hours = (hours < 13) ? 'AM' + hours : 'PM' + hours;
	}
	var minutes = addZero(cdate.getMinutes());
	var seconds = addZero(cdate.getSeconds());

	mask = mask.replace('YYYY', ry);
	mask = mask.replace('MM', rm);
	mask = mask.replace('DD', rd);
	mask = mask.replace('HH', hours);
	mask = mask.replace('MI', minutes);
	mask = mask.replace('SS', seconds);

	return mask;
};

/**
 * 날짜계산: 기준일부터 몇일까지
 * 
 * @baseDate : 기준일자 ( '2014-05-01' or '20140501' )
 * @cDay : 증감일 ( -30 혹은 30 )
 * @returnMask : default '-'
 * @return : 문자열 날짜 ( '2014-05-01' or '20140501' )
 */
com.dateUtil.stringToCount = function(baseDate, cDay, returnMask) {

	var reg1 = /[1-9]{1}[0-9]{3}[0-9]{2}[0-9]{2}/;
	var rval = baseDate.replace(/[^0-9]/g, '');
	if (!reg1.test(rval))
		return '';

	returnMask = (returnMask == undefined) ? '-' : returnMask;
	var reg2 = /[^0-9]/g;

	var ymask = reg2.exec(baseDate);
	ymask = (ymask === null) ? returnMask : ymask;
	rval = rval.substring(0, 4) + '-' + rval.substring(4, 6) + '-'
			+ rval.substring(6, 8);

	var mdate = new Date(rval);
	mdate.setDate(mdate.getDate() + cDay);

	var ry = mdate.getFullYear();
	var rm = ((mdate.getMonth() + 1) < 10) ? '0' + (mdate.getMonth() + 1)
			: (mdate.getMonth() + 1);
	var rd = (mdate.getDate() < 10) ? '0' + mdate.getDate() : mdate.getDate();

	return ry + ymask + rm + ymask + rd;
};

/**
 * 날짜차이 계산
 * 
 * @schk : 과거일자 ('2014-05-01' or '20140501')
 * @echk : 현재일자 ('2014-04-10' or '20140410')
 * @type : 'day', 'month', 'year'
 * @return : 일수
 */
com.dateUtil.getDifferentDate = function(schk, echk, type) {

	schk = schk.replace(/[^0-9]/gi, '');
	echk = echk.replace(/[^0-9]/gi, '');

	var sdate = new Date(schk.substring(0, 4), schk.substring(4, 6)-1, schk.substring(6, 8));
	var edate = new Date(echk.substring(0, 4), echk.substring(4, 6)-1, echk.substring(6, 8));

	var years 	= "";
	var months 	= "";
	var days 	= "";
	var val		= "";
	
	if(type=='month'){
		years 	= edate.getFullYear() - sdate.getFullYear();
		months 	= edate.getMonth() - sdate.getMonth();
		days	= edate.getDate() - sdate.getDate();
		val 	= ( years * 12 + months + (days >= 0 ? 0 : -1) ) + 1;
		return val;
	} else if(type=='year'){
		years 	= edate.getFullYear() - sdate.getFullYear();
		return years;
	} else {
		days = (edate - sdate) / 1000 / 60 / 60 / 24;
		days = days * 30;
		return days;
	}
};


/**
 * 기준날짜부터 일자를 차감(가감)한 날짜를 계산한다.
 * 
 * @param{ 
 * 		startDate : new Date(year, month, day, hours, minutes, seconds, milliseconds) ( default: new Date() ) 
 * 		addDay : 숫자 (+-) 
 * 		type : 24 , 12 (default: 24) : 시간제 
 * 		mask : 'YYYY-MM-DD', 'YYYY-MM-DD HH:MI:SS', 'YYYYMMDDHHMI' (default: 'YYYY-MM-DD') 
 * }
 * @return : object {sDate:'2014-05-02 14:25:35', eDate:'2014-05-01 14:25:35'} :
 *         -1 일을 한 경우
 */
com.dateUtil.getStringAddDate = function(param) {

	var addYear		= param['addYear'];
	var addMonth	= param['addMonth'];
	var addDay 		= param['addDay'];
	var addHours	= param['addHours'];
	var addMinutes	= param['addMinutes'];
	var addSeconds	= param['addSeconds'];
	
	var startDate 	= param['startDate'];
	var type 		= param['type'];
	var mask 		= param['mask'];

	var now1 = '';
	if (startDate == undefined) {
		now1 = new Date();
	} else {
		now1 = startDate;
	}

	var now2 = new Date(now1.getFullYear(), now1.getMonth(), now1.getDate(), now1.getHours(), now1.getMinutes(), now1.getSeconds(), now1.getMilliseconds());
	if(addYear){
		now2.setFullYear((now1.getFullYear() - (addYear * -1)) , now1.getMonth(), now1.getDate());
	} else if(addMonth){
		now2.setMonth(now1.getMonth() - (addMonth * -1));
	} else if(addDay){
		now2.setDate(now1.getDate() - (addDay * -1));
	} else if(addHours){
		now2.setHours(now1.getHours() - (addHours * -1));
	} else if(addMinutes){
		now2.setMinutes(now1.getMinutes() - (addMinutes * -1));
	} else if(addSeconds){
		now2.setSeconds(now1.getSeconds() - (addSeconds * -1));
	}
	
	var str1 = com.dateUtil.getStringToDate({
		cdate : now1,
		type : type,
		mask : mask
	});
	var str2 = com.dateUtil.getStringToDate({
		cdate : now2,
		type : type,
		mask : mask
	});

	return {
		sDate : str1,
		eDate : str2
	};
};

/**
 * 실시간 시계표현
 * 
 * @param {
 *            selector : target selector type : 12, 24 (default 12) interval :
 *            폴링간격 seconds (default 1) }
 */
com.dateUtil.autoClock = function(param) {

	var selector = param['selector'];
	var type = param['type'];
	var interval = param['interval'];

	var returnClock = function() {
		var mdate = new Date();
		var ry = mdate.getFullYear();
		var rm = ((mdate.getMonth() + 1) < 10) ? '0' + (mdate.getMonth() + 1)
				: (mdate.getMonth() + 1);
		var rd = (mdate.getDate() < 10) ? '0' + mdate.getDate() : mdate
				.getDate();

		var revalue = '';
		revalue = ry + '-' + rm + '-' + rd;

		var hours = mdate.getHours();
		if (type == undefined || type == '12' || type == 12) {
			hours = (hours < 13) ? ' AM ' + hours : ' PM ' + hours;
		} else {
			hours = ' ' + hours;
		}
		hours += ':' + mdate.getMinutes() + ':';
		hours += (mdate.getSeconds() < 10) ? '0' + mdate.getSeconds() : mdate
				.getSeconds();
		revalue += hours;
		return revalue;
	};

	interval = (interval == undefined || interval == 0) ? 1 : interval;
	interval = interval * 1000;

	// timer
	setInterval(function() {
		selector = $(selector);
		if (selector.prop('value')) {
			selector.val(returnClock());
		} else {
			selector.text(returnClock());
		}
	}, interval);

};

/**
 * 날짜 유효성 체크
 * 
 */
com.dateUtil.isValidDate = function(param) {
    try
    {
        param = param.replace(/-/g,'');

        // 자리수가 맞지않을때
        if( isNaN(param) || param.length!=8 ) {
            return false;
        }
         
        var year = Number(param.substring(0, 4));
        var month = Number(param.substring(4, 6));
        var day = Number(param.substring(6, 8));

        var dd = day / 0;

         
        if( month<1 || month>12 ) {
            return false;
        }
         
        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month-1];
         
        // 윤년 체크
        if( month==2 && ( year%4==0 && year%100!=0 || year%400==0 ) ) {
            maxDay = 29;
        }
         
        if( day<=0 || day>maxDay ) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }                       
};

/**
 * 시간 유효성 체크
 * 
 */
com.dateUtil.isValidTime = function(param) {
   
    	//alert(param.length);
    	if(param.length != 6){
    		return false;
    	}
    	
    	var first = param.substring(0,1);
    	//alert(first);
    	var timeRegExp = /^[0-2]{1}[0-9]{1}[0-5]{1}[0-9]{1}[0-5]{1}[0-9]{1}$/;
    	if(first =="2"){
    		timeRegExp = /^[0-2]{1}[0-3]{1}[0-5]{1}[0-9]{1}[0-5]{1}[0-9]{1}$/;
    	}
    	
    	if(timeRegExp.test(param)){
    		return true;
    	}else{
    		return false;
    	}
    	
                        
};



/**
 * ============================================================= 이벤트 - Event
 */

com.event = new Object();

/**
 * click & enter event 를 동시에 부여한다.
 * 
 * @param(array)[ {selector: '', leftKeyTarget:'', rightKeyTarget:'', executeFn:
 *                ''}, // leftKeyTarget, rightKeyTarget, executeFn : 생략가능
 *                {selector: '', leftKeyTarget:'', rightKeyTarget:'', executeFn:
 *                ''} ]
 */
com.event.clickAndEnter = function(param) {

	var sel = '';
	for ( var idx in param) {
		sel = param[idx]['selector'];

		$(sel).on('click', function(obj) {
			return function(ev) {
				if (obj['executeFn'] != undefined) {
					obj['executeFn']();
				}
			};
		}(param[idx]));

		$(sel).on('keydown', function(obj) {
			return function(ev) {
				if (ev.which == 13) {
					if (obj['executeFn'] != undefined) {
						obj['executeFn']();
					}
				}
				if (ev.which == 37) {
					if (obj['leftKeyTarget'] != undefined) {
						$(obj['leftKeyTarget']).focus();
					}
				}
				if (ev.which == 39) {
					if (obj['rightKeyTarget'] != undefined) {
						$(obj['rightKeyTarget']).focus();
					}
				}
			};
		}(param[idx]));

	}
	;
};

/**
 * enter를 치면 포커스가 이동된다.
 * 
 * @param(array)[ {selector: '', target: '', executeFn: ''}, // executeFn (생략가능)
 *                {selector: '', target: '', executeFn: ''} ]
 */
com.event.enterGoFocus = function(param) {

	var sel = '';
	for ( var idx in param) {
		sel = param[idx]['selector'];

		$(sel).on('keydown', function(obj) {
			return function(ev) {
				if (ev.which == 13) {
					$(obj['target']).focus();
					if (obj['executeFn'] != undefined) {
						obj['executeFn']();
					}
				}
			};
		}(param[idx]));
	}
	;
};

/**
 * enter를 치면 trigger가 실행된다.
 * 
 * @param(array)[ {selector: '', target: '', eventType: ''}, {selector: '',
 *                target: '', eventType: ''} ]
 */
com.event.enterGoTrigger = function(param) {

	var sel = '';
	for ( var idx in param) {
		sel = param[idx]['selector'];

		$(sel).on('keydown', function(obj) {
			return function(ev) {
				if (ev.which == 13) {
					$(obj['target']).trigger(obj['eventType']);
				}
			};
		}(param[idx]));
	}
	;
};

/**
 * enter를 치면 펑션이 실행된다.
 * 
 * @param(array)[ {selector: '', executeFn: ''}, {selector: '', executeFn: ''} ]
 */
com.event.enterGoFunction = function(param) {

	var sel = '';
	for ( var idx in param) {
		sel = param[idx]['selector'];

		$(sel).on('keydown', function(obj) {
			return function(ev) {
				if (ev.which == 13) {
					obj['executeFn']();
				}
			};
		}(param[idx]));
	}
	;
};

/**
 * ============================================================= list data를
 * Hierarchical 형식으로 변환
 * 
 * @keyName : code Name
 * @upperKeyName : 부모code Name
 * @rootName : 'root'
 * @openFolder : 처음에 폴더를 오픈할지를 결정 true, false
 * @data : array list data
 */
com.listToHierarchical = function(keyName, upperKeyName, rootName, openFolder,
		data) {

	var len = data.length;
	var count = 0;
	var output = [];
	var i = 0;
	var j = 0;

	while (count < len) {

		for (i = 0; i < len; i++) {
			var rowi = data[i];

			if (rowi[upperKeyName] == rootName && rowi['inner_reg'] != 'Y') {
				rowi['inner_reg'] = 'Y';
				output.push(rowi);
				count++;
			}

			for (j = 0; j < len; j++) {
				var rowj = data[j];
				if (rowj['inner_reg'] != 'Y'
						&& rowj[upperKeyName] == rowi[keyName]) {

					rowi['expanded'] = openFolder;
					rowi['folder'] = true;
					if (rowi['children'] == undefined)
						rowi['children'] = [];

					rowj['inner_reg'] = 'Y';
					rowi['children'].push(rowj);
					count++;
				}
			}
		}
	}
	;
	return output;
};



/**
 * ============================================================= 
 * submit
 */
com.submit = function(id, isload, url) {

	if(!isload){
	} else {
		com.showLoading(true);
	}
	if(url){
		$(id).attr('action', url);
	}
	$(id).submit();
};


/**
 * ============================================================= 
 * href
 */
com.href = function(url, isload, param) {

	if(isload){
		com.showLoading(true);
	}
	if((param) && typeof param === 'object'){
		url += "?";
		for(var key in param) { 
			if(param[key]){
			    var attr = param[key]; 
			    url += key + "=" + param[key] + "&";
			}
		}
		url = url.slice(0, -1);
	}
	window.location.href = url;
};

com.reload = function(isload){
	
	if(isload){
		com.showLoading(true);
	}
	window.location.reload();
}


/**
 * ============================================================= 
 * ajax
 */
com.ajax = function(obj) {
	
	try{
		var _type 		= obj.type;
		var _url 		= obj.url;
		var _data 		= obj.data;
		var _successfn 	= obj.success;
		var _errorfn 	= obj.error;
		var _complete	= obj.complete;
		var _dataType 	= (obj.dataType) ? obj.dataType : 'json';
	
		com.showLoading(true);
		try{
			$.ajax({
				 type 		: _type,
				 url 		: _url,
				 dataType 	: _dataType,
				 data 		: _data,
				 beforeSend : function(xmlHttpRequest){
					 try{
						 xmlHttpRequest.setRequestHeader("AJAX","true");
					 }catch(e){
						 console.log("11"+e);
					 }
					 
				 },
				 success : function(responseData){
					 try{
						 com.showLoading(false);
						 _successfn(responseData);
					 }catch(e){
						 console.log("22"+e);
					 }
					 
				 },
				 error : function(e, data){
					 try{
						 com.showLoading(false);
						 if(e.status==400){
							 alert('세션이 없습니다. 로그인 하시기 바랍니다.');
							 location.href = '/member/userlogin/loginCheck.do';
						 } else if(e.status==401){
							 alert('로그인 하시기 바랍니다.');
							 location.href = '/member/userlogin/loginCheck.do';
						 } else if(e.status==402){
							 alert('로그인 하시기 바랍니다.');
							 location.href = '/member/userlogin/loginCheck.do';
						 } else {
							 _errorfn(data);
							 location.href = '/scom/error.do';
						 }
					 }catch(e){
						 console.log("33"+e);
					 }
					 
					 
				 },
				 complete : function(){
					 try{
						 com.showLoading(false);
						 if(_complete) {
							 _complete();
						 }
					 }catch(e){
						 console.log("444"+e);
					 }
					 
				 }
			 });
		 }catch(e){
			 console.log("55"+e);
		 }
		
	}catch(e){
		console.log("ajax 호출 오류");
	}
};


/**
 * ============================================================= 
 * 로딩바
 */
com.showLoading = function(bool, callback) {
	if (bool) {
		if(!callback){
			$('#loading').show();
		} else {
			$('#loading').show('fast', callback);
		}
	} else {
		if(!callback){
			$('#loading').hide();
		} else {
			$('#loading').hide('fast', callback);
		}
	}
};


/**
 * ============================================================= 
 * 모달팝업
 */
com.popupModalOpen = function(){
	
	$('body').css('pointer-events','none');
	com.showLoading(true);
}

com.popupModalClose = function(tar){
		
	var timer = setInterval(function(){
		if(tar.closed){
			clearInterval(timer);
			$('body').css('pointer-events','');
			com.showLoading(false);
		}
	}, 1000);
}

/**
 * ============================================================= 
 * GET, POST 공통 팝업
 */
com.popupOpen = function(url, type, target, paramData, popOption) {
	
	var option = "";
	
	// 팝업 옵션
	if(popOption) {
 		$.each(popOption, function(key, value) {
 			if(option != "") {
 				option = option + "," + key + "=" + value;	
 			}else {
 				option = key + "=" + value;
 			}
		});
	}
	
	// default option 추가
	option = option + ",toolbar=no,mebubar=no,status=no,location=no,personalbar=no";
	
	window.open("", target, option);
	
	var $form = $("<form></form>");
	
	$form.attr("action", url);
	$form.attr("method", type);
	$form.attr("target", target);
	
	if(paramData) {
		$.each(paramData, function(key, value) {
			//$form.append("<input type='hidden' name='" + key + "' value='" + value + "' />");
			
			//XSS 대응 20201015
	        var input = $("<input type='hidden' />");
	        input.attr("name",key);
	        input.attr("value",value);
	        
	        $form.append(input);
		});
	}
	
	$form.appendTo("body");
	$form.submit();
	$form.detach();
};

/**
 * ============================================================= 
 * 윈도우 사이즈 계산
 */
com.util.getWindowSize  = function() {
	var windowWidth, windowHeight;

	if (self.innerHeight) {
		// all except Explorer
		if (document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}

		windowHeight = self.innerHeight;
	} else if (document.documentElement
			&& document.documentElement.clientHeight) { // Explorer
		// 6
		// Strict
		// Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	return [ windowWidth, windowHeight ];
};


/**
 * ============================================================= 
 * 초기작업
 */
com.init = function(callbackFn) {
	
	com.showLoading(false);
	
	$('a[cu-loading]').click(function(e){
		var val = $(this).attr('href');
		if(val=='#none' || val=='' || val=='#'){
		} else {
			com.showLoading(true);
		}
	});
	
	if (callbackFn != undefined){
		callbackFn();
	};
};

/**
 * ============================================================= 
 * 종합화면 이벤트 등록
 */
com.eventListener = function() {

};


/**
 * ============================================================= 
 * document ready
 */
$(document).ready(function() {

	com.eventListener();

	console.log('[comapp.js] ready.......');

});



/**
 * ============================================================= 
 * 앱 함수 호출
 */


/**
   * [loadScript 스크립트 동적 로딩 함수]
   * @param  {[String]}   url    [url]
   * @param  {Function} callback [로딩 완료 후 callback 함수]
   * @return {[type]}            [description]
*/
com.loadScript = function(url, callback, attributeObj){
	var local_hostname = window.location.hostname;
	
	if(local_hostname == "testwww.seoul.go.kr"){
		url = url.replace("www.seoul.go.kr","testwww.seoul.go.kr");
	}
	
    var script = document.createElement('script');
    script.src = url;
    script.charset = 'utf-8';

    if (typeof attributeObj === 'object') {
      for(var obj in attributeObj) {
        script.setAttribute(obj, attributeObj[obj]);
      }
    }

    var head = document.getElementsByTagName('head')[0] || document.documentElement;
    var done = false;
    // 콜백함수가 있는 경우
    if (typeof callback === 'function') {
      script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
          done = true;
          // 로딩 완료 후 콜백 실행
          callback();
          script.onload = script.onreadystatechange = null;
        }
      };
    }
    head.appendChild(script);
};

com.loadScript("//www.seoul.go.kr/res_newseoul/js/webFilterApi.js");





