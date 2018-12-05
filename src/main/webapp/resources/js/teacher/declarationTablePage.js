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
                layer.msg("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    teacherInfo = returnData.data;
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

        $(".table-title").text(teacherInfo.collegeName+systemConfig.systemYear+"-"+(systemConfig.systemYear+1)+"学年"+(systemConfig.systemSemester!=2?"第一学期":"第二学期")+"教师教学业绩考核项目");

        $.ajax({
            "url": "/teacher/evaluationIndex",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
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
            "url": "/teacher/observationPoint",
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
                    alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/teacher/declarationTable",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    gradingStandardJson = returnData.data;
                    $.each(returnData.data, function (i, item) {
                        declarationTableList[item.gradingStandardId] = item;
                    });
                } else {
                    alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/teacher/audit",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                alert("服务器繁忙");
            },
            "success": function (returnData) {
                if (returnData.code == 200) {
                    $.each(returnData.data, function (i, item) {
                        auditList[item.auditId] = item.auditName;
                    });
                } else {
                    alert(returnData.msg);
                }

            }
        });

        tableList = getTableListByAllJson(evaluationIndexJson, observationPointJson, gradingStandardJson);
        createGradingStandardTable(tableList);
        window.declarationTableList = declarationTableList;


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
                    content = content + '<td>' + (i + 1) + '.' + (j + 1) + '.' + (k + 1) + ' 评分标准：' + gradingStandard.gradingStandardContent + '</td>'
                    content = content + '<td>' + gradingStandard.gradingBasis + '</td>';
                    content = content + '<td style="width: 100px">' + auditList[gradingStandard.auditId] + '</td>';
                    var gradingStandardStr = "gradingStandardId=" + gradingStandard.gradingStandardId;
                    if (gradingStandard.status == 1) {
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-cyan">待认证</span>' + '</td>';
                        content = content + '<td  width="100" class="no-print">' + '' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary updateDeclarationBtn" lay-event="edit" ' + gradingStandardStr + '>编辑</a>' +
                            '<a class="layui-btn layui-btn-xs layui-btn-danger deleteDeclarationBtn" lay-event="del" ' + gradingStandardStr + '>撤回</a>' +
                            '</td>';
                    } else if (gradingStandard.status == 2) {
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-green">认证完成</span>' + '</td>';
                        content = content + '<td  width="100" class="no-print"> ' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary updateDeclarationTable updateDeclarationBtn" lay-event="edit" ' + gradingStandardStr + '>编辑</a>' +
                            '<a class="layui-btn layui-btn-xs layui-btn-danger deleteDeclarationBtn" lay-event="del" ' + gradingStandardStr + '>撤回</a>' + '</td>';
                    } else if (gradingStandard.status == 3) {
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-red">退回</span>' + '</td>';
                        content = content + '<td  width="100" class="no-print"> ' +
                            '<a class="layui-btn layui-btn-xs layui-btn-primary updateDeclarationTable updateDeclarationBtn" lay-event="edit" ' + gradingStandardStr + '>修改</a>' +
                            '<a class="layui-btn layui-btn-xs layui-btn-danger deleteDeclarationBtn" lay-event="del" ' + gradingStandardStr + '>撤回</a>' + '</td>';
                    } else {
                        content = content + '<td>' + '<span class="layui-btn layui-btn-xs  layui-bg-blue">未申报</span>' + '</td>';
                        content = content + '<td  width="100" class="no-print">' + '<a class="layui-btn layui-btn-xs addDeclarationBtn" lay-event="add" ' + gradingStandardStr + '>申报</a>' + '</td>';
                    }

                    content += "</tr>";
                }
            }
        }
        $("#grading_standard_table").append(content);
    }
    init();


    //新增申报表
    function addDeclarationBtn(declarationData) {
        var index = layui.layer.open({
            title: "添加审核处",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "declarationTableAdd.html",
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

                setTimeout(function () {
                    layui.layer.tips('点击此处返回申请单列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
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

    //更新申报表
    function updateDeclarationBtn(declarationData) {
        window.gradingStandardId=declarationData.gradingStandardId;
        var index = layui.layer.open({
            title: "添加审核处",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "declarationTableEdit.html",
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

    function deleteDeclarationBtn(data) {


        var orderFileIdList = new Array();
        var orderFileNameStr = "确定撤回";
        orderFileIdList.push(declarationTableList[data].orderId);
        orderFileNameStr += declarationTableList[data].gradingStandardContent + "的审核单嘛吗?";

        layer.confirm(orderFileNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/teacher/order",
                "data": JSON.stringify(orderFileIdList),
                "contentType": "application/json",
                "type": "delete",
                "error": function () {
                    top.layer.msg("删除失败，服务器繁忙");
                    top.layer.close(index);
                },
                "success": function (result) {

                    if (result.code == 200) {
                        top.layer.close(index);
                        location.reload();//刷新
                        top.layer.msg("撤回成功！");
                    } else {
                        top.layer.msg(result.msg);
                    }
                }
            });
            return false;
            //tableIns.reload();
            layer.close(index);
        });
    }


    $(".addDeclarationBtn").click(function () {
        var gradingStandardId = $(this).attr("gradingStandardId");
        var declarationData = declarationTableList[gradingStandardId];
        addDeclarationBtn(declarationData);
    });

    $(".deleteDeclarationBtn").click(function () {
        var gradingStandardId = $(this).attr("gradingStandardId");
        var declarationData = declarationTableList[gradingStandardId];
        deleteDeclarationBtn(gradingStandardId);
    });

    $(".updateDeclarationBtn").click(function () {
        var gradingStandardId = $(this).attr("gradingStandardId");
        var declarationData = declarationTableList[gradingStandardId];
        updateDeclarationBtn(declarationData);
    });

    $("#printBtn").click(function(){
        $("#printArea").print();
    });


});
