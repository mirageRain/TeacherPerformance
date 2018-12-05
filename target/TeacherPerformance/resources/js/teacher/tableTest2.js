//获取系统时间
var newDate = '';
getLangDate();

//值小于10时，在前面补0
function dateFilter(date) {
    if (date < 10) {
        return "0" + date;
    }
    return date;
}

function getLangDate() {
    var dateObj = new Date(); //表示当前系统时间的Date对象
    var year = dateObj.getFullYear(); //当前系统时间的完整年份值
    var month = dateObj.getMonth() + 1; //当前系统时间的月份值
    var date = dateObj.getDate(); //当前系统时间的月份中的日
    var day = dateObj.getDay(); //当前系统时间中的星期值
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串
    var hour = dateObj.getHours(); //当前系统时间的小时值
    var minute = dateObj.getMinutes(); //当前系统时间的分钟值
    var second = dateObj.getSeconds(); //当前系统时间的秒钟值
    var timeValue = "" + ((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午"); //当前时间属于上午、晚上还是下午
    newDate = dateFilter(year) + "年" + dateFilter(month) + "月" + dateFilter(date) + "日 " + " " + dateFilter(hour) + ":" + dateFilter(minute) + ":" + dateFilter(second);
    document.getElementById("nowTime").innerHTML = "张三，" + timeValue + "好！ 欢迎使用邯郸学院教师教学业绩考核系统。当前时间为： " + newDate + "　" + week;
    setTimeout("getLangDate()", 1000);
}

layui.use(['form', 'element', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element;
    $ = layui.jquery;
    //上次登录时间【此处应该从接口获取，实际使用中请自行更换】
    $(".loginTime").html(newDate.split("日")[0] + "日</br>" + newDate.split("日")[1]);
    //icon动画
    $(".panel a").hover(function () {
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    }, function () {
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    });
    $(".panel a").click(function () {
        parent.addTab($(this));
    });
    //系统基本参数
    if (window.sessionStorage.getItem("systemParameter")) {
        var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
        fillParameter(systemParameter);
    } else {
        $.ajax({
            url: "../resources/json/systemParameter.json",
            type: "get",
            dataType: "json",
            success: function (data) {
                fillParameter(data);
            }
        })
    }

    //填充数据方法
    function fillParameter(data) {
        //判断字段数据是否存在
        function nullData(data) {
            if (data == '' || data == "undefined") {
                return "未定义";
            } else {
                return data;
            }
        }

        $(".version").text(nullData(data.version));      //当前版本
        $(".author").text(nullData(data.author));        //开发作者
        $(".homePage").text(nullData(data.homePage));    //网站首页
        $(".server").text(nullData(data.server));        //服务器环境
        $(".dataBase").text(nullData(data.dataBase));    //数据库版本
        $(".maxUpload").text(nullData(data.maxUpload));    //最大上传限制
        $(".userRights").text(nullData(data.userRights));//当前用户权限
    }

    var evaluationIndexList = [];
    var observationPointList = [];
    var gradingStandardList = [];
    var auditList = [];
    var evaluationIndexJson;
    var observationPointJson;
    var gradingStandardJson;
    var tableList = {};
    $.ajax({
        "url": "../resources/json/evaluationIndexList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                tableList = returnData.data;
                evaluationIndexJson = returnData.data;
                $.each(returnData.data, function (i, item) {
                    evaluationIndexList[item.evaluationIndexId] = item.content;
                });

            } else {
                alert(returnData.msg);
            }

        }
    });
    $.ajax({
        "url": "../resources/json/observationPointList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                observationPointJson = returnData.data;
            } else {
                alert(returnData.errMsg);
            }

        }
    });

    $.ajax({
        "url": "../resources/json/gradingStandardList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                gradingStandardJson = returnData.data;
            } else {
                alert(returnData.msg);
            }

        }
    });

    $.ajax({
        "url": "../resources/json/auditList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                $.each(returnData.data,function(i,item){
                    auditList[item.auditId]=item.auditName;
                });
            } else {
                alert(returnData.msg);
            }

        }
    });

    var evaluationIndexJson;
    var observationPointJson;
    var gradingStandardJson;

    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableList
    function getTableListByAllJson(evaluationIndexJson,observationPointJson,gradingStandardJson) {
        var lastIndex1 = 0, lastIndex2 = 0;
        for (var i = 0; i < tableList.length; i++) {
            tableList[i].observationPointList = [];
            tableList[i].gradingStandardListSize=0;
            var jCount=0,kCount=0;
            for (var j = lastIndex1; j < observationPointJson.length; j++) {
                //记录每次添加的顺序，如果顺序不统一则会出错
                if (tableList[i].evaluationIndexId == observationPointJson[j].evaluationIndexId) {
                    delete observationPointJson[j].evaluationIndexId;
                    tableList[i].observationPointList.push(observationPointJson[j]);
                    tableList[i].observationPointList[jCount].gradingStandardList = [];
                    for (var k = lastIndex2; k < gradingStandardJson.length; k++) {
                        if (tableList[i].observationPointList[jCount].observationPointId == gradingStandardJson[k].observationPointId) {
                            tableList[i].observationPointList[jCount].gradingStandardList.push(gradingStandardJson[k]);
                        } else {
                            lastIndex2 = k;
                            break;
                        }
                    }
                    tableList[i].gradingStandardListSize+=tableList[i].observationPointList[jCount].gradingStandardList.length;
                    jCount++;
                } else {
                    lastIndex1 = j;
                    break;
                }
            }
        }
    }

    function createGradingStandardTable(tableList){
        var content="";
        for (var i = 0; i < tableList.length; i++) {
            for (var j = 0; j < tableList[i].observationPointList.length; j++) {
                for (var k = 0; k < tableList[i].observationPointList[j].gradingStandardList.length; k++) {
                    content+="<tr>";
                    var gradingStandard = tableList[i].observationPointList[j].gradingStandardList[k];
                    //第一分类第一项
                    if(j==0&&k==0){
                        content=content+'<td rowspan="'+tableList[i].gradingStandardListSize+'">'+(i+1)+'.'+tableList[i].content+'</td>';
                    }
                    //第二分类第一项
                    if(k==0){
                        content=content+'<td rowspan="'+tableList[i].observationPointList[j].gradingStandardList.length+'">'+(i+1)+'.'+(j+1)+' '+tableList[i].observationPointList[j].content+'</td>';
                    }
                      // '<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>'
                      //   '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>'C
                      //   '<a class="layui-btn layui-btn-xs layui-btn-primary" lay-event="look">预览</a>'
                    content=content+'<td>'+(i+1)+'.'+(j+1)+'.'+(k+1)+' 评分标准：'+gradingStandard.content+'</td>'
                    content=content+'<td>'+gradingStandard.gradingBasis+'</td>';
                    content=content+'<td>'+auditList[gradingStandard.auditId]+'</td>';
                    if(gradingStandard.status==1){
                        content=content+'<td>'+'<span class="layui-green">已申报</span>'+'</td>';
                        content=content+'<td  width="100">'+'' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary" lay-event="look">查看</a>'+
                            '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">撤回</a>'+
                            '</td>';
                    }else if(gradingStandard.status==2){
                        content=content+'<td>'+'<span class="layui-red">退回</span>'+'</td>';
                        content=content+'<td  width="100"> '+
                            '<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>'+
                            '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">撤回</a>'+'</td>';
                    }else {
                        content=content+'<td>'+'<span class="layui-blue">未申报</span>'+'</td>';
                        content=content+'<td  width="100">'+'<a class="layui-btn layui-btn-xs" lay-event="edit">申报</a>'+'</td>';
                    }

                    content+="</tr>";
                }
            }
        }
        $("#grading_standard_table").append(content);
    }

    getTableListByAllJson(evaluationIndexJson,observationPointJson,gradingStandardJson);
    createGradingStandardTable(tableList);




});
