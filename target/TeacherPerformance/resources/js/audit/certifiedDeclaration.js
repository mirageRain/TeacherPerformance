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

    var initCollegeName, auditJson, evaluationIndexJson, observationPointJson,gradingStandardJson, teacherInfo;
    var evaluationIndexList = [], observationPointList = [], gradingStandardList = [], auditList = [];
    var tableList = [];
    var tableJson = {};
    function initData() {

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
                        evaluationIndexList[item.evaluationIndexId] = item;
                        $("#evaluationIndex").append("<option value='" + item.evaluationIndexId + "'>" + item.content + "</option>");
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
                    $.each(returnData.data,function(i,item){
                        observationPointList[item.observationPointId]=item;
                    });
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        $.ajax({
            "url": "/audit/gradingStandard",
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
                        gradingStandardList[item.gradingStandardId] = item;
                    });
                } else {
                    layer.alert(returnData.msg);
                }

            }
        });

        tableJson = formatTableJsonByAllJson(evaluationIndexJson, observationPointJson,gradingStandardJson);
        tableList = formatTableList(evaluationIndexJson,observationPointJson,gradingStandardJson);
        console.log(tableList);
        form.render();
    }

    initData();
    layer.alert("test");
    console.log(evaluationIndexList);

    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出二维数组tableList
    function formatTableList(evaluationIndexJson,observationPointJson,gradingStandardJson){
        var tempGradingStandardList = [];
        var tableList = [];

        $.each(gradingStandardJson, function (i, item) {
            if(tempGradingStandardList[item.observationPointId]!=null){
                tempGradingStandardList[item.observationPointId][item.gradingStandardId]=item;
            }else{
                tempGradingStandardList[item.observationPointId] = new Array();
                tempGradingStandardList[item.observationPointId][item.gradingStandardId]=item;
            }
        });
        $.each(observationPointJson, function (i, item) {
            console.log(item.evaluationIndexId);
            if(tableList[item.evaluationIndexId]!=null){
                tableList[item.evaluationIndexId][item.observationPointId]=(tempGradingStandardList[item.observationPointId]);
            }else{
                tableList[item.evaluationIndexId] = [];
                tableList[item.evaluationIndexId][item.observationPointId]=(tempGradingStandardList[item.observationPointId]);
            }
        });
        return tableList;
    }


    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableJson
    function formatTableJsonByAllJson(evaluationIndexJson,observationPointJson,gradingStandardJson) {
        var lastIndex1 = 0, lastIndex2 = 0;
        var tableJson = evaluationIndexJson;
        for (var i = 0; i < tableJson.length; i++) {
            tableJson[i].observationPointList = [];
            tableJson[i].gradingStandardListSize=0;
            var jCount=0,kCount=0;
            for (var j = lastIndex1; j < observationPointJson.length; j++) {
                //记录每次添加的顺序，如果顺序不统一则会出错
                if (tableJson[i].evaluationIndexId == observationPointJson[j].evaluationIndexId) {
                    tableJson[i].observationPointList.push(observationPointJson[j]);
                    tableJson[i].observationPointList[jCount].gradingStandardList = [];
                    for (var k = lastIndex2; k < gradingStandardJson.length; k++) {
                        if (tableJson[i].observationPointList[jCount].observationPointId == gradingStandardJson[k].observationPointId) {
                            tableJson[i].observationPointList[jCount].gradingStandardList.push(gradingStandardJson[k]);
                        } else {
                            lastIndex2 = k;
                            break;
                        }
                    }
                    tableJson[i].gradingStandardListSize+=tableJson[i].observationPointList[jCount].gradingStandardList.length;
                    jCount++;
                } else {
                    lastIndex1 = j;
                    break;
                }
            }
        }
        return tableJson;
    }

    form.on('select(evaluationIndex)', function (data) {
        $("#gradingStandard").html("<option value disabled selected>请选择</option>");
        $("#observationPoint").html('<option value disabled selected>请选择</option>');
        $.each(tableJson,function(i,item){
            if(item.evaluationIndexId==data.value){

                $.each(tableJson[i].observationPointList,function(j,observationPoint){
                    $("#observationPoint").append("<option value='"+observationPoint.observationPointId+"'" +">"+(i+1)+'. '+(j+1)+' '+observationPoint.content+"</option>");
                });
            }
        });


        form.render();
    });

    form.on('select(observationPoint)', function (data) {
        var observationPointId = data.value;
        var evaluationIndexId = observationPointList[observationPointId].evaluationIndexId;

        $("#gradingStandard").html('<option value disabled selected>请选择</option>');
        console.log(evaluationIndexId);
        console.log(observationPointId);
        console.log(tableList[evaluationIndexId][observationPointId]);

        for(var i=0;i<tableList[evaluationIndexId][observationPointId].length;i++){
            var item=tableList[evaluationIndexId][observationPointId][i];
            if(item!=null)
                $("#gradingStandard").append("<option value='"+item.gradingStandardId+"'>"+item.content+"</option>");
        }
        form.render();
    });


    //评分标准列表
    var tableIns = table.render({
        elem: '#certifiedDeclarationList',
        id: "certifiedDeclarationListTable",
        url: '/audit/order',
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
            "status": 2 //状态为待审核

        },
        defaultToolbar: ['filter', 'print', 'exports'],
        cols: [[
            {field: 'orderId', title: '申报单ID',  align: "center", sort: true},
            {field: 'teacherName', title: '申教教师',  align: "center", sort: true},
            {field: 'employeeId', title: '教师工号',  align: "center", sort: true},
            {field: 'teacherTitleName', title: '教师职称',  align: "center", sort: true},
            {
                field: 'evaluationIndexId',
                title: '评估指标',
                width: 200,
                align: "center",
                sort: true,
                templet: function (d) {
                    return evaluationIndexList[d.evaluationIndexId].content;
                }
            },
            {
                field: 'observationPointId',
                title: '申报项',
                width: 200,
                align: "center",
                sort: true,
                templet: function (d) {
                    return observationPointList[d.observationPointId].content;
                }
            },
            {field: 'status', title: '申报状态', align: 'center', templet: "#statusBar"},
            {
                field: 'addTime', title: '申报时间', align: 'center',sort: true, templet: function (d) {
                    return formatDate(d.addTime);
                }
            },
            {
                field: 'certifiedTime', title: '认证时间', align: 'center',sort: true, templet: function (d) {
                    return formatDate(d.certifiedTime);
                }
            },
            {
                field: 'certifiedScore', title: '认证得分', align: 'center',sort: true
            },
            {
                field: 'selfReportScore', title: '自评得分', align: 'center',sort: true
            },
            {title: '操作', width: 220, templet: '#ListBar', align: "center"}
        ]]
    });

    console.log(tableIns);
    //重新审核
    function updateCertifiedDeclaration(data) {
        var index = layui.layer.open({
            title: "重新审核",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "certifiedDeclarationEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    window.orderListData = data;
                    body.find("#teacherName").val(data.teacherName);
                    body.find("#teacherTitle").val(data.teacherTitleName);
                    body.find("#college").val(data.collegeName);
                    body.find("#audit").val(data.auditName);
                    body.find("#observationPoint").val(data.observationPointContent);
                    body.find("#evaluationIndex").val(data.evaluationIndexContent);
                    body.find("#gradingStandard").val(data.gradingStandardContent);
                    body.find("#gradingBasis").val(data.gradingBasis);
                    body.find("#gradingStandardId").val(data.gradingStandardId);
                    body.find("#declarationNote").val(data.declarationNote);
                    body.find("#selfReportScore").val(data.selfReportScore);
                    body.find("#certifiedScore").val(data.certifiedScore);
                    body.find("#certifiedNote").val(data.certifiedNote);

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

    //查看审核单
    function lookCertifiedDeclaration(data) {
        window.orderListData = data;
        var index = layui.layer.open({
            title: "查看审核单",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "certifiedDeclarationLook.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {

                    body.find("#teacherName").val(data.teacherName);
                    body.find("#teacherTitle").val(data.teacherTitleName);
                    body.find("#college").val(data.collegeName);
                    body.find("#audit").val(data.auditName);
                    body.find("#observationPoint").val(data.observationPointContent);
                    body.find("#evaluationIndex").val(data.evaluationIndexContent);
                    body.find("#gradingStandard").val(data.gradingStandardContent);
                    body.find("#gradingBasis").val(data.gradingBasis);
                    body.find("#gradingStandardId").val(data.gradingStandardId);
                    body.find("#declarationNote").val(data.declarationNote);
                    body.find("#selfReportScore").val(data.selfReportScore);
                    body.find("#certifiedScore").val(data.certifiedScore);
                    body.find("#certifiedNote").val(data.certifiedNote);

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

    //搜索
    form.on("submit(searchForm)", function (data) {
        table.reload('certifiedDeclarationListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });


    //重置按钮
    $('#resetBtn').on('click', function () {
        $("#observationPoint").html('<option value disabled selected>请选择</option>');
        $("#gradingStandard").html('<option value disabled selected>请选择</option>');


        table.reload('certifiedDeclarationListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
        form.render();
    });


    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('certifiedDeclarationListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteCertifiedDeclaration(data);
        } else {
            layer.msg("请选择需要删除的评分标准");
        }
    })

    //后端排序
    table.on('sort(certifiedDeclarationList)', function (obj) { //certifiedDeclarationList是table原始容器的属性 lay-filter="对应的值"
        table.reload('certifiedDeclarationListTable', {
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
    table.on('tool(certifiedDeclarationList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'look') { //查看
            lookCertifiedDeclaration(data);
        } else if (layEvent === 'edit') { //重审
            updateCertifiedDeclaration(data);
        }
    });

});