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
    setTimeout("getLangDate()", 1000);
}



layui.use(['form', 'element', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element;

    $ = layui.jquery;

    var auditList = [];
    var tableList;
    var evaluationIndexList = [];
    var observationPointList = [];
    var gradingStandardList = [];
    var declarationTableList = [];
    var evaluationIndexJson,observationPointJson,gradingStandardJson;
    var teacherInfo,systemConfig;

    //填充数据方法
    function init() {
        $.ajax({
            "url": "/teacher/info",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    teacherInfo = returnData.data;
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/info/systemConfig",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    systemConfig = returnData.data;
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/teacher/evaluationIndex",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    evaluationIndexJson = returnData.data;
                    $.each(returnData.data, function (i, item) {
                        evaluationIndexList[item.evaluationIndexId] = item.content;
                    });

                } else {
                    layer.alert(returnData.msg);
                }

            }
        });
        $.ajax({
            "url": "/teacher/observationPoint",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    observationPointJson = returnData.data;
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/teacher/declarationTable",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    gradingStandardJson = returnData.data;
                    $.each(returnData.data, function (i, item) {
                        declarationTableList[item.gradingStandardId] = item;
                    });
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/teacher/audit",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    $.each(returnData.data, function (i, item) {
                        auditList[item.auditId] = item.auditName;
                    });
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        tableList = getTableListByAllJson(evaluationIndexJson, observationPointJson, gradingStandardJson);
        createGradingStandardTable(tableList);
        window.declarationTableList = declarationTableList;
        $("#collegeName").text("学院："+teacherInfo.collegeName);
        $("#systemYear").text("学年："+systemConfig.systemYear+"-"+(systemConfig.systemYear+1));
        $("#systemSemester").text("学期："+(systemConfig.systemSemester!=2?"第一学期":"第二学期"));
        $("#teacherName").text("申报人："+teacherInfo.teacherName);
        $("#employeeId").text("工号："+teacherInfo.employeeId)
        $("#teacherTitleName").text("职称："+teacherInfo.teacherTitleName);
        $("#selfReportScore").text("申报分数："+tableList.selfReportScore);
        $("#certifiedScore").text("认证分数："+tableList.certifiedScore);
        $("#score").text("学期总分："+tableList.certifiedScore);


    }
    init();

    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableList
    //注意后端传过来的数据一点要是正序排序好的，要不组装数据的时候会出错
    function getTableListByAllJson(evaluationIndexJson, observationPointJson, gradingStandardJson) {
        // 二级分类遍历断点，三级分类遍历断点，一级分类数组坐标，二级分类数组坐标
        var lastIndex1 = 0, lastIndex2 = 0 ,iCount = 0, jCount = 0;
        var tableList = [];
        tableList.selfReportScore=0;
        tableList.certifiedScore=0;
        for (var i = 0; i < evaluationIndexJson.length; i++) {

            tableList.push(evaluationIndexJson[i]);
            tableList[iCount].observationPointList = [];
            tableList[iCount].gradingStandardListSize = 0;
            tableList[iCount].selfReportScore=0;
            tableList[iCount].certifiedScore=0;

            jCount = 0;
            for (var j = lastIndex1; j < observationPointJson.length; j++) {
                //记录每次添加的顺序，如果顺序不统一则会出错
                if (tableList[iCount].evaluationIndexId == observationPointJson[j].evaluationIndexId) {
                    delete observationPointJson[j].evaluationIndexId;
                    tableList[iCount].observationPointList.push(observationPointJson[j]);
                    tableList[iCount].observationPointList[jCount].gradingStandardList = [];
                    for (var k = lastIndex2; k < gradingStandardJson.length; k++) {
                        if (tableList[iCount].observationPointList[jCount].observationPointId == gradingStandardJson[k].observationPointId) {
                            tableList[iCount].selfReportScore+=gradingStandardJson[k].selfReportScore;
                            if(gradingStandardJson[k].status==2){
                                tableList[iCount].certifiedScore+=gradingStandardJson[k].certifiedScore;
                            }
                            tableList[iCount].observationPointList[jCount].gradingStandardList.push(gradingStandardJson[k]);
                        } else {
                            lastIndex2 = k;
                            break;
                        }
                    }
                    //若果此二级分类的下面没有三级分类，则在[iCount].observationPointList里面删除此二级分类
                    if(tableList[iCount].observationPointList[jCount].gradingStandardList.length==0){
                        tableList[iCount].observationPointList.pop();
                        //tableList[i].observationPointList.splice(jCount,1)
                    }else{
                        tableList[iCount].gradingStandardListSize += tableList[iCount].observationPointList[jCount].gradingStandardList.length;
                        jCount++;
                    }

                } else {
                    lastIndex1 = j;
                    break;
                }
            }
            //若果此一级分类的下面没有二级分类，则在tableList里面删除此一级分类
            if(tableList[iCount].observationPointList.length==0){
                tableList.pop();
            }else{
                tableList[iCount].selfReportScore=parseFloat((tableList[iCount].selfReportScore*1).toFixed(2));
                tableList[iCount].certifiedScore=parseFloat((tableList[iCount].certifiedScore*1).toFixed(2));
                tableList.selfReportScore+=tableList[iCount].selfReportScore;
                tableList.certifiedScore+=tableList[iCount].certifiedScore;
                iCount++;
            }
        }
        tableList.selfReportScore=parseFloat((tableList.selfReportScore*1).toFixed(2));
        tableList.certifiedScore=parseFloat((tableList.certifiedScore*1).toFixed(2));
        return tableList;
    }

    function createGradingStandardTable(tableList) {
        var content = "";
        for (var i = 0; i < tableList.length; i++) {
            for (var j = 0; j < tableList[i].observationPointList.length; j++) {
                for (var k = 0; k < tableList[i].observationPointList[j].gradingStandardList.length; k++) {
                    content += "<tr>";
                    var gradingStandard = tableList[i].observationPointList[j].gradingStandardList[k];
                    //第一分类第一项
                    if (j == 0 && k == 0) {
                        if(i!=0){
                            content = content + '<td colspan="6" class="table-bold">' + (i) + '. ' + tableList[i-1].content + '得分合计' +'</td>';
                            content = content + '<td class="table-bold">' + tableList[i-1].selfReportScore +'</td>';
                            content = content + '<td class="table-bold">' + tableList[i-1].certifiedScore +'</td>';
                            content = content + '<td class="table-bold no-print" >' + tableList[i-1].certifiedScore +'</td>';
                            content += "</tr>";
                            content += "<tr>";
                        }
                        content = content + '<td rowspan="' + tableList[i].gradingStandardListSize + '">' + (i + 1) + '.' + tableList[i].content + '</td>';
                    }
                    //第二分类第一项
                    if (k == 0) {
                        content = content + '<td rowspan="' + tableList[i].observationPointList[j].gradingStandardList.length + '">' + (i + 1) + '.' + (j + 1) + ' ' + tableList[i].observationPointList[j].content + '</td>';
                    }
                    content = content + '<td>' + (i + 1) + '.' + (j + 1) + '.' + (k + 1) + ' 评分标准：' + gradingStandard.gradingStandardContent + '</td>'
                    content = content + '<td>' + gradingStandard.gradingBasis + '</td>';
                    content = content + '<td style="width: 100px">' + auditList[gradingStandard.auditId] + '</td>';
                    var gradingStandardStr = "gradingStandardId=" + gradingStandard.gradingStandardId;
                    if (gradingStandard.status == 1) {//待认证
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-cyan">待认证</span>' + '</td>';
                        content = content + '<td>' + gradingStandard.selfReportScore + '</td>';
                        content = content + '<td>' + 0 + '</td>';
                        content = content + '<td  width="100" class="no-print"> ' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary  lookDeclarationBtn" lay-event="look" ' + gradingStandardStr + '>查看详情</a>' + '</td>';
                    } else if (gradingStandard.status == 2) {//认证完成
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-green">认证完成</span>' + '</td>';
                        content = content + '<td>' + gradingStandard.selfReportScore + '</td>';
                        content = content + '<td>' + gradingStandard.certifiedScore + '</td>';
                        content = content + '<td  width="100" class="no-print"> ' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary  lookDeclarationBtn" lay-event="look" ' + gradingStandardStr + '>查看详情</a>' + '</td>';
                    } else if (gradingStandard.status == 3) {//认证退回
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-red">认证退回</span>' + '</td>';
                        content = content + '<td>' + gradingStandard.certifiedScore + '</td>';
                        content = content + '<td>' + 0 + '</td>';
                        content = content + '<td  width="100" class="no-print"> ' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary  lookDeclarationBtn" lay-event="look" ' + gradingStandardStr + '>查看详情</a>' + '</td>';
                    } else {//未申报
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-blue">未申报</span>' + '</td>';
                        content = content + '<td>' +0 + '</td>';
                        content = content + '<td>' + 0 + '</td>';
                        content = content + '<td  width="100" class="no-print"> ' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary  lookDeclarationBtn" lay-event="look" ' + gradingStandardStr + '>查看详情</a>' + '</td>';
                    }

                    content += "</tr>";
                }
            }
            content += "</tr>";

        }
        var lastIndex = tableList.length;
        content += "<tr>";
        content = content + '<td colspan="6" class="table-bold">' + (i) + '. ' + tableList[lastIndex-1].content + '得分合计' +'</td>';
        content = content + '<td class="table-bold">' + tableList[lastIndex-1].selfReportScore +'</td>';
        content = content + '<td class="table-bold">' + tableList[lastIndex-1].certifiedScore +'</td>';
        content = content + '<td class="table-bold no-print" >' + tableList[lastIndex-1].certifiedScore +'</td>';
        content += "</tr>";

        content += "<tr>";
        content = content + '<td colspan="6" class="table-bold">' + '教师教学业绩考核项目得分合计' +'</td>';
        content = content + '<td class="table-bold">' + tableList.selfReportScore +'</td>';
        content = content + '<td class="table-bold">' + tableList.certifiedScore +'</td>';
        content = content + '<td class="table-bold no-print">' + tableList.certifiedScore +'</td>';
        $("#grading_standard_table").append(content);
    }

    //更新申报表
    function lookDeclarationBtn(declarationData) {
        window.orderListData = declarationData;
        var index = layui.layer.open({
            title: "查看详情",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "scoreReportLook.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#teacherName").val(teacherInfo.teacherName);
                body.find("#teacherTitle").val(teacherInfo.teacherTitleName);
                body.find("#college").val(teacherInfo.collegeName);
                body.find("#audit").val(declarationData.auditName);
                body.find("#observationPoint").val(declarationData.observationPointContent);
                body.find("#evaluationIndex").val(declarationData.evaluationIndexContent);
                body.find("#gradingStandard").val(declarationData.gradingStandardContent);
                body.find("#gradingBasis").val(declarationData.gradingBasis);
                body.find("#gradingStandardId").val(declarationData.gradingStandardId);
                body.find("#declarationNote").val(declarationData.declarationNote);
                body.find("#selfReportScore").val(declarationData.selfReportScore);
                body.find("#certifiedScore").val(declarationData.certifiedScore);
                body.find("#certifiedNote").val(declarationData.certifiedNote);

                setTimeout(function () {
                    layui.layer.tips('点击此处返回申请单列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300);
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });
            }
        });
        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        });
    }


    $(".lookDeclarationBtn").click(function () {
        var gradingStandardId = $(this).attr("gradingStandardId");
        var declarationData = declarationTableList[gradingStandardId];
        lookDeclarationBtn(declarationData);
    });

    $("#printBtn").click(function(){
        $("#printArea").print();
    });


});
