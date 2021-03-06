
$(function(){
	seachMoney();
});

function seachMoney(){
	$("#mytable").html("");
	var to_money = null;
	var msg = $("#work_time").val();
	var str = $('#searchMenuForm').serialize()+"&pageNum="+"1"+"&msg="+msg;
	$.ajax({
		url: "carport/searchMoney.action",
//		contentType :"application/json;charset=utf-8", //如果采用requestbody那么一定要加
		type: "POST",
		dataType: "json",
		data: str,
		success: function(date){
			$("#mytable tr:not(:first)").html("");
			var typelist = date.list;
			if(typelist==""){
				alert("查无数据");
			}else{
			var tableNode = document.getElementById("mytable");
			var a=1;
			for (var i = 0; i < typelist.length; i++) {
				var trNode = tableNode.insertRow();
				for(var j=0;j<5;j++){
					var tdNode = trNode.insertCell();
					switch (j) {
					case 0:
						tdNode.innerHTML = a++;
						break;
					case 1:
						tdNode.innerHTML = typelist[i].deal_time;
						break;
					case 2:
						tdNode.innerHTML = typelist[i].car_park_license;
						break;						
					case 3:
						tdNode.innerHTML =typelist[i].deal_matter;
						break;	
					case 4:
						tdNode.innerHTML = typelist[i].deal_money;
						to_money += typelist[i].deal_money;
						break;							
					default:
						break;
					}
				}
			}
			$("#total_money").html(to_money);
			//记录分页信息
			document.getElementById("pages").innerHTML = date.pages;	//总页数
			document.getElementById("total").innerHTML = date.total;	//查询总数
			
			//初始化页数
			document.getElementById("pageNum").text = 1;	//重置页码
			document.getElementById("lastPage").style = "color: red";	//上一页置灰
			//下一页置灰
			var pages = document.getElementById("pages").innerHTML;
			if(pages == 1){7
				document.getElementById("nextPage").style = "color: red";
			}else{
				document.getElementById("nextPage").style = "";
			}
			}
		}
	});	
}


//下一页
function nextPage(){
	var pageNum = document.getElementById("pageNum").text;	//当前页数
	var nextpageNum = Number(pageNum) + 1;	//下一页页数
	var msg = $("#work_time").val();
	var pages = document.getElementById("pages").innerHTML;	//总页数

	//页数判断
	if(nextpageNum > pages){
//		alert("已经是最后一页了");
	}else{
		var msg = $('#searchMenuForm').serialize() + "&pageNum="+ nextpageNum+"&msg="+msg;
		$.ajax({
			url: "carport/searchMoney.action",
//			contentType : "application/json;charset=utf-8",  //如果采用requestbody那么一定要加
			type: "POST",
			dataType: "json",
			data: msg,
			success: function(date){
				
				$("#mytable tr:not(:first)").html("");
				var typelist = date.list;
				var tableNode = document.getElementById("mytable");
				var a=1;
//				var tabNode = document.getElementById("DataTables_Table_0");
				for (var i = 0; i < typelist.length; i++) {
					var trNode = tableNode.insertRow();
					for(var j=0;j<5;j++){
						var tdNode = trNode.insertCell();
						switch (j) {
						case 0:
							tdNode.innerHTML = a++;
							break;
						case 1:
							tdNode.innerHTML = typelist[i].deal_time;
							break;
						case 2:
							tdNode.innerHTML = typelist[i].car_park_license;
							break;						
						case 3:
							tdNode.innerHTML =typelist[i].deal_matter;
							break;	
						case 4:
							tdNode.innerHTML = typelist[i].deal_money;
							break;							
						default:
							break;
						}
					}
				}
				//赋值新页数
				document.getElementById("pageNum").text = nextpageNum;
				
				//按钮操作（只改变颜色，不会禁用）
				if(nextpageNum == 1){	// 当前页数 = 1 时
					document.getElementById("lastPage").style = "color: red";
				}else{
					document.getElementById("lastPage").style = "";
				}
				
				document.getElementById("nextPage").style = ""; //恢复下一页颜色
			}
		})
	}
}


//上一页
function lastPage(){
	var pageNum = document.getElementById("pageNum").text;	//当前页数
	var nextpageNum = Number(pageNum) - 1;	//下一页页数
	
	var pages = document.getElementById("pages").innerHTML;	//总页数

	//页数判断
	if(nextpageNum == 0){
//		alert("已经是最后一页了");
	}else{
		var msg = $('#searchMenuForm').serialize()+"&pageNum="+nextpageNum+"&msg=";
		$.ajax({
			url: "carport/searchMoney.action",
//			contentType : "application/json;charset=utf-8",  //如果采用requestbody那么一定要加
			type: "POST",
			dataType: "json",
			data: msg,
			success: function(date){
				$("#mytable tr:not(:first)").html("");
				var typelist = date.list;
				var tableNode = document.getElementById("mytable");
				var a = 1;
				for (var i = 0; i < typelist.length; i++) {
					var trNode = tableNode.insertRow();
					for(var j=0;j<5;j++){
						var tdNode = trNode.insertCell();
						switch (j) {
						case 0:
							tdNode.innerHTML = a++;
							break;
						case 1:
							tdNode.innerHTML = typelist[i].deal_time;
							break;
						case 2:
							tdNode.innerHTML = typelist[i].car_park_license;
							break;						
						case 3:
							tdNode.innerHTML =typelist[i].deal_matter;
							break;	
						case 4:
							tdNode.innerHTML = typelist[i].deal_money;
							break;							
						default:
							break;
					}
				}
				//赋值新页数
				document.getElementById("pageNum").text = nextpageNum;
				
				//按钮操作（只改变颜色，不会禁用）
				if(nextpageNum == 1){	// 当前页数 = 1 时
					document.getElementById("lastPage").style = "color: red";
				}else{
					document.getElementById("lastPage").style = "";
				}
				
				document.getElementById("nextPage").style = ""; //恢复下一页颜色
			}
			}
		})
	}
}


//--------------------开始导出excel------------------
var idTmr; 
//获取当前浏览器类型 
 function getExplorer() { 
  var explorer = window.navigator.userAgent ; 
  //ie 
  if (explorer.indexOf("MSIE") >= 0) { 
   return 'ie'; 
  } 
  //firefox 
  else if (explorer.indexOf("Firefox") >= 0) { 
   return 'Firefox'; 
  } 
  //Chrome 
  else if(explorer.indexOf("Chrome") >= 0){ 
   return 'Chrome'; 
  } 
  //Opera 
  else if(explorer.indexOf("Opera") >= 0){ 
   return 'Opera'; 
  } 
  //Safari 
  else if(explorer.indexOf("Safari") >= 0){ 
   return 'Safari'; 
  } 
 } 
   
//获取到类型需要判断当前浏览器需要调用的方法，目前项目中火狐，谷歌，360没有问题 
 //win10自带的IE无法导出 
 function exportExcel(tableid) { 
  if(getExplorer()=='ie') 
  { 
   var curTbl = document.getElementById(tableid); 
   var oXL = new ActiveXObject("Excel.Application"); 
   var oWB = oXL.Workbooks.Add(); 
   var xlsheet = oWB.Worksheets(1); 
   var sel = document.body.createTextRange(); 
   sel.moveToElementText(curTbl); 
   sel.select(); 
   sel.execCommand("Copy"); 
   xlsheet.Paste(); 
   oXL.Visible = true; 
 
   try { 
    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls"); 
   } catch (e) { 
    print("Nested catch caught " + e); 
   } finally { 
    oWB.SaveAs(fname); 
    oWB.Close(savechanges = false); 
    oXL.Quit(); 
    oXL = null; 
    idTmr = window.setInterval("Cleanup();", 1); 
   } 
 
  } 
  else 
  { 
   tableToExcel(tableid) 
  } 
 } 
 function Cleanup() { 
  window.clearInterval(idTmr); 
  CollectGarbage(); 
 } 
   
//判断浏览器后调用的方法，把table的id传入即可 
 var tableToExcel = (function() { 
  var uri = 'data:application/vnd.ms-excel;base64,', 
    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>', 
    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }, 
    format = function(s, c) { 
     return s.replace(/{(\w+)}/g, 
       function(m, p) { return c[p]; }) } 
  return function(table, name) { 
   if (!table.nodeType) table = document.getElementById(table) 
   var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML} 
   window.location.href = uri + base64(format(template, ctx)) 
  } 
 })() 



