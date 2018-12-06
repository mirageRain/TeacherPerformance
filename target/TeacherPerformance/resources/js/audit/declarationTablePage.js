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
    var auditInfo,systemConfig;

    //填充数据方法
    function init() {
        $.ajax({
            "url": "/audit/info",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.msg("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    auditInfo = returnData.data;
                } else {
                    alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/info/systemConfig",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    systemConfig = returnData.data;
                } else {
                    alert(returnData.msg);
                }

            }
        });

        $(".table-title").text(auditInfo.collegeName+systemConfig.systemYear+"-"+(systemConfig.systemYear+1)+"学年"+(systemConfig.systemSemester!=2?"第一学期":"第二学期")+"教师教学业绩考核项目");

        $.ajax({
            "url": "/audit/evaluationIndex",
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
            "url": "/audit/observationPoint",
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
            "url": "/audit/college/gradingStandard",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                layer.alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    gradingStandardJson = returnData.data;
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/audit/all",
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
        console.log(tableList);
    }



    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableList
    //注意后端传过来的数据一点要是正序排序好的，要不组装数据的时候会出错
    function getTableListByAllJson(evaluationIndexJson, observationPointJson, gradingStandardJson) {
        // 二级分类遍历断点，三级分类遍历断点，一级分类数组坐标，二级分类数组坐标
        var lastIndex1 = 0, lastIndex2 = 0 ,iCount = 0, jCount = 0;
        var tableList = [];
        for (var i = 0; i < evaluationIndexJson.length; i++) {

            tableList.push(evaluationIndexJson[i]);
            tableList[iCount].observationPointList = [];
            tableList[iCount].gradingStandardListSize = 0;

            jCount = 0;
            for (var j = lastIndex1; j < observationPointJson.length; j++) {
                //记录每次添加的顺序，如果顺序不统一则会出错
                if (tableList[iCount].evaluationIndexId == observationPointJson[j].evaluationIndexId) {
                    delete observationPointJson[j].evaluationIndexId;
                    tableList[iCount].observationPointList.push(observationPointJson[j]);
                    tableList[iCount].observationPointList[jCount].gradingStandardList = [];
                    for (var k = lastIndex2; k < gradingStandardJson.length; k++) {
                        if (tableList[iCount].observationPointList[jCount].observationPointId == gradingStandardJson[k].observationPointId) {
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
                iCount++;
            }
        }
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
                        content = content + '<td rowspan="' + tableList[i].gradingStandardListSize + '">' + (i + 1) + '. ' + tableList[i].content + '</td>';
                    }
                    //第二分类第一项
                    if (k == 0) {
                        content = content + '<td rowspan="' + tableList[i].observationPointList[j].gradingStandardList.length + '">' + (i + 1) + '. ' + (j + 1) + ' ' + tableList[i].observationPointList[j].content + '</td>';
                    }
                    // '<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>'
                    //   '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>'C
                    //   '<a class="layui-btn layui-btn-xs layui-btn-primary" lay-event="look">预览</a>'
                    content = content + '<td>' + (i + 1) + '.' + (j + 1) + '.' + (k + 1) + ' 评分标准：' + gradingStandard.content + '</td>'
                    content = content + '<td>' + gradingStandard.gradingBasis + '</td>';
                    content = content + '<td style="width: 100px">' + auditList[gradingStandard.auditId] + '</td>';

                }
            }
        }
        $("#grading_standard_table").append(content);
    }
    init();

    $("#printBtn").click(function(){
        $("#printArea").print();
    });


});
