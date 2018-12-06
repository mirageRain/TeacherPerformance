layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    function formatDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    }

    var initCollegeName, auditJson, evaluationIndexJson, observationPointJson, tableJson, teacherInfo;
    var evaluationIndexList = [], observationPointList = [], auditList = [];

    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableJson
    function formatTableJsonByAllJson(evaluationIndexJson, observationPointJson) {
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
                if ( tableList[iCount].evaluationIndexId == observationPointJson[j].evaluationIndexId) {
                    tableList[iCount].observationPointList.push(observationPointJson[j]);
                    jCount++;
                } else {
                    lastIndex1 = j;
                    break;
                }
            }
            if(tableList[iCount].observationPointList.length==0){
                tableList.pop();
            }else{
                iCount++;
            }
        }
        return tableList;
    }


    function initData() {

        $.ajax({
            "url": "/teacher/info",
            "contentType": "application/json",
            "type": "get",
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
            "url": "/teacher/audit",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    auditJson = result.data;
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        $.ajax({
            "url": "/userInfo",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    initCollegeName = result.data.displayName;
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        $.ajax({
            "url": "/teacher/evaluationIndex",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    evaluationIndexJson = result.data;

                } else {
                    top.layer.msg(result.msg);
                }
            }
        });

        $.ajax({
            "url": "/teacher/observationPoint",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    observationPointJson = result.data;

                } else {
                    top.layer.msg(result.msg);
                }
            }
        });

        tableJson = formatTableJsonByAllJson(evaluationIndexJson, observationPointJson);

        $.each(evaluationIndexJson, function (i, item) {
            evaluationIndexList[item.evaluationIndexId] = item.content;
        });

        $.each(tableJson, function (i, item) {
            $("#evaluationIndex").append("<option value='" + item.evaluationIndexId + "'>" + item.content + "</option>");
        });

        $.each(auditJson, function (i, item) {
            auditList[item.auditId] = item.auditName;
            $("#audit").append("<option value='" + item.auditId + "'>" + item.auditName + "</option>");
        });

        $.each(observationPointJson, function (i, item) {
            observationPointList[item.observationPointId] = item.content;
        });

        form.render()
    }

    initData();


    //评分标准列表
    var tableIns = table.render({
        elem: '#certifyingDeclarationList',
        id: "certifyingDeclarationListTable",
        url: '/teacher/order',
        cellMinWidth: 95,
        height: "full-125",
        page: true,
        limits: [10, 15, 20, 25],
        limit: 15,
        autoSort: false,
        response: {
            statusCode: 200
        },
        where: { //请求参数
            "status": 1 //状态为待审核

        },
        defaultToolbar: ['filter', 'print', 'exports'],
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'orderId', title: '申报单ID', width: 200, align: "center", sort: true},
            {
                field: 'observationPointId',
                title: '评估指标',
                width: 200,
                align: "center",
                sort: true,
                templet: function (d) {
                    return evaluationIndexList[d.evaluationIndexId];
                }
            },
            {
                field: 'evaluationIndexId',
                title: '申报项',
                width: 200,
                align: "center",
                sort: true,
                templet: function (d) {

                    return observationPointList[d.observationPointId];
                }
            },
            {
                field: 'gradingStandardContent', title: '评分标准', width: 200, align: "center", sort: true
            },
            {field: 'gradingBasis', title: '评分依据', align: "center", sort: true},
            {
                field: 'auditId', title: '审核机构', width: 200, align: "center", templet: function (d) {
                    return auditList[d.auditId];
                }
            },
            {field: 'status', title: '申报状态', align: 'center', templet: "#statusBar"},
            {
                field: 'addTime', title: '申报时间', align: 'center',sort: true, templet: function (d) {
                    return formatDate(d.addTime);
                }
            },
            {
                field: 'selfReportScore', title: '自评得分', align: 'center',sort: true
            },
            {title: '操作', width: 220, templet: '#ListBar', align: "center"}
        ]]
    });


    //更新评分标准
    function updateCertifyingDeclaration(data) {
        window.orderListData = data;
        var index = layui.layer.open({
            title: "更新评分标准",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "certifyingDeclarationEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {

                    body.find("#teacherName").val(teacherInfo.teacherName);
                    body.find("#teacherTitle").val(teacherInfo.teacherTitleName);
                    body.find("#college").val(teacherInfo.collegeName);
                    body.find("#audit").val(data.auditName);
                    body.find("#observationPoint").val(data.observationPointContent);
                    body.find("#evaluationIndex").val(data.evaluationIndexContent);
                    body.find("#gradingStandard").val(data.gradingStandardContent);
                    body.find("#gradingBasis").val(data.gradingBasis);
                    body.find("#gradingStandardId").val(data.gradingStandardId);
                    body.find("#declarationNote").val(data.declarationNote);
                    body.find("#selfReportScore").val(data.selfReportScore);
                    body.find("#gradingStandardNote").val(data.gradingStandardNote);

                    setTimeout(function () {
                        layui.layer.tips('点击此处返回审核单列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 300);
                    body.find('button#close').on('click', function () {
                        layer.close(index);
                        location.reload();//刷新
                    });
                }
            }
        });
        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    function deleteCertifyingDeclaration(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var orderIdList = new Array();
        var orderNameStr = "确定撤销审核单号为";
        for (var i in data) {
            orderIdList.push(data[i].orderId);
            if (i < data.length - 1) {
                orderNameStr += data[i].orderId + "、";
            }
            else {
                orderNameStr += data[i].orderId + "的审核单吗?";
            }
        }
        layer.confirm(orderNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/teacher/order",
                "data": JSON.stringify(orderIdList),
                "contentType": "application/json",
                "type": "delete",
                "error": function () {
                    top.layer.msg("删除失败，服务器繁忙");
                    top.layer.close(index);
                },
                "success": function (result) {

                    if (result.code == 200) {
                        top.layer.close(index);
                        tableIns.reload();
                        top.layer.msg("删除成功！");
                    } else {
                        top.layer.msg(result.msg);
                    }
                }
            });
            return false;
            tableIns.reload();
            layer.close(index);
        });
    }

    //搜索
    form.on("submit(searchForm)", function (data) {
        table.reload('certifyingDeclarationListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    form.on('select(evaluationIndex)', function (data) {
        $("#observationPoint").html('<option value=""  disabled=""  selected>请选择</option>');
        $.each(tableJson, function (i, item) {
            if (item.evaluationIndexId == data.value) {

                $.each(tableJson[i].observationPointList, function (j, observationPoint) {
                    $("#observationPoint").append("<option value='" + observationPoint.observationPointId + "'" + ">" + (i + 1) + '. ' + (j + 1) + ' ' + observationPoint.content + "</option>");
                });
            }
        });
        form.render();
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('certifyingDeclarationListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });


    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('certifyingDeclarationListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteCertifyingDeclaration(data);
        } else {
            layer.msg("请选择需要删除的评分标准");
        }
    })

    //后端排序
    table.on('sort(certifyingDeclarationList)', function (obj) { //certifyingDeclarationList是table原始容器的属性 lay-filter="对应的值"
        table.reload('certifyingDeclarationListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
            , where: { //请求参数
                field: obj.field //排序字段
                , order: obj.type //排序方式
            }
        });
    });

    //列表操作
    table.on('tool(certifyingDeclarationList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateCertifyingDeclaration(data);
        } else if (layEvent === 'del') { //删除
            deleteCertifyingDeclaration(data);
        }
    });
});