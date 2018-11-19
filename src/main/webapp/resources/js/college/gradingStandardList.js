layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    var initCollegeName,auditJson, evaluationIndexJson,observationPointJson,tableJson;
    var evaluationIndexList=[],observationPointList=[],auditList=[];

    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableJson
    function formatTableJsonByAllJson(evaluationIndexJson,observationPointJson) {
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
                    jCount++;
                } else {
                    lastIndex1 = j;
                    break;
                }
            }
        }
        return tableJson;
    }

    function initData(){
        $.ajax({
            "url": "/college/audit",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    auditJson=result.data;
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
                    initCollegeName=result.data.displayName;
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        $.ajax({
            "url": "/college/evaluationIndex",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    evaluationIndexJson =result.data;

                } else {
                    top.layer.msg(result.msg);
                }
            }
        });

        $.ajax({
            "url": "/college/observationPoint",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    observationPointJson =result.data;

                } else {
                    top.layer.msg(result.msg);
                }
            }
        });

        $.each(evaluationIndexJson,function(i,item){
            evaluationIndexList[item.evaluationIndexId] = item.content;
            $("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"'>"+item.content+"</option>");
        });

        $.each(auditJson,function(i,item){
            auditList[item.auditId] = item.auditName;
            $("#audit").append("<option value='"+item.auditId+"'>"+item.auditName+"</option>");
        });

        $.each(observationPointJson,function(i,item){
            observationPointList[item.observationPointId] = item.content;
        });


        tableJson=formatTableJsonByAllJson(evaluationIndexJson,observationPointJson);
        window.tableJson=tableJson;


        form.render()



    }
    initData();




    //评分标准列表
    var tableIns = table.render({
        elem: '#gradingStandardList',
        id: "gradingStandardListTable",
        url: '/college/gradingStandard',
        cellMinWidth: 95,
        height: "full-125",
        page: true,
        limits: [10, 15, 20, 25],
        limit: 15,
        autoSort: false,
        response: {
            statusCode: 200
        },
        defaultToolbar: ['filter', 'print', 'exports'],
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'gradingStandardId', title: '评分标准ID', width: 200, align: "center", sort: true},
            {field: 'evaluationIndexId', title: '所属评估指标', width: 200, align: "center", sort: true,templet:function(d){
                    return evaluationIndexList[d.evaluationIndexId];
                }},
            {field: 'observationPointId', title: '所属评估指标', width: 200, align: "center", sort: true,templet:function(d){
                    return observationPointList[d.observationPointId];
                }},
            {field: 'content', title: '评分标准', align: "center", sort: true},
            {field: 'gradingBasis', title: '评分依据', align: "center", sort: true},
            {field: 'note', title: '备注信息', align: "center", sort: true},
            {field: 'auditId', title: '审核机构', width: 200, align: "center",templet:function(d){
                    return auditList[d.auditId];
                }},

            {title: '操作', width: 220, templet: '#gradingStandardListBar', align: "center"}
        ]]
    });



    //添加评分标准
    function addGradingStandard() {
        var index = layui.layer.open({
            title: "添加评分标准",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "gradingStandardAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                    body.find("#collegeName").val(initCollegeName);
                $.each(evaluationIndexJson,function(i,item){
                    body.find("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"'>"+item.content+"</option>");
                });
                $.each(auditJson,function(i,item){
                    auditList[item.auditId] = item.auditName;
                    body.find("#audit").append("<option value='"+item.auditId+"'>"+item.auditName+"</option>");
                });
                setTimeout(function () {
                    layui.layer.tips('点击此处返回评分标准列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });
            }
        });

        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {

        })
    }

    //更新评分标准
    function updateGradingStandard(data) {
        var index = layui.layer.open({
            title: "更新评分标准",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "gradingStandardEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#collegeName").val(initCollegeName);
                    body.find("#gradingStandardContent").val(data.content);
                    body.find("#gradingStandardId").val(data.gradingStandardId);
                    body.find("#gradingBasis").val(data.gradingBasis);
                    body.find("#note").val(data.note);

                    body.find("#evaluationIndex").html('<option value=""  disabled=""  selected>请选择</option>');
                    $.each(evaluationIndexJson,function(i,item){
                        if(item.evaluationIndexId==data.evaluationIndexId)
                            body.find("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"' selected='selected'>"+item.content+"</option>");
                        else
                            body.find("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"'>"+item.content+"</option>");
                    });

                    body.find("#observationPoint").html('<option value=""  disabled=""  selected>请选择</option>');
                    $.each(tableJson,function(i,item){

                        if(item.evaluationIndexId==data.evaluationIndexId){
                            $.each(item.observationPointList,function(j,observationPoint){
                                console.log(observationPoint.observationPointId+" "+data.observationPointId);
                                if(observationPoint.observationPointId==data.observationPointId){
                                    console.log("in");
                                    body.find("#observationPoint").append("<option value='"+observationPoint.observationPointId+"' selected='selected' >"+(i+1)+'. '+(j+1)+' '+observationPoint.content+"</option>");
                                }else{
                                    body.find("#observationPoint").append("<option value='"+observationPoint.observationPointId+"'" +">"+(i+1)+'. '+(j+1)+' '+observationPoint.content+"</option>");
                                }
                            });
                        }
                    });

                    body.find("#audit").html('<option value=""  disabled=""  selected>请选择</option>');
                    $.each(auditJson,function(i,item){
                        if(item.auditId==data.auditId)
                            body.find("#audit").append("<option value='"+item.auditId+"' selected='selected'>"+item.auditName+"</option>");
                        else
                            body.find("#audit").append("<option value='"+item.auditId+"'>"+item.auditName+"</option>");
                    });

                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回评分标准列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteGradingStandard(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var gradingStandardIdList = new Array();
        var gradingStandardNameStr = "确定删除";
        for (var i in data) {
            gradingStandardIdList.push(data[i].gradingStandardId);
            if (i < data.length - 1) {
                gradingStandardNameStr += data[i].content + "、";
            }
            else {
                gradingStandardNameStr += data[i].content + "吗?";
            }
        }
        layer.confirm(gradingStandardNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/college/gradingStandard",
                "data": JSON.stringify(gradingStandardIdList),
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
        table.reload('gradingStandardListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    form.on('select(evaluationIndex)', function (data) {
        $("#observationPoint").html('<option value=""  disabled=""  selected>请选择</option>');
        $.each(tableJson,function(i,item){
            if(item.evaluationIndexId==data.value){

                $.each(tableJson[i].observationPointList,function(j,observationPoint){
                    $("#observationPoint").append("<option value='"+observationPoint.observationPointId+"'" +">"+(i+1)+'. '+(j+1)+' '+observationPoint.content+"</option>");
                });
            }
        });
        form.render();
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('gradingStandardListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加评分标准按钮
    $("#addGradingStandardBtn").click(function () {
        addGradingStandard();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('gradingStandardListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteGradingStandard(data);
        } else {
            layer.msg("请选择需要删除的评分标准");
        }
    })

    //后端排序
    table.on('sort(gradingStandardList)', function (obj) { //gradingStandardList是table原始容器的属性 lay-filter="对应的值"
        table.reload('gradingStandardListTable', {
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
    table.on('tool(gradingStandardList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateGradingStandard(data);
        } else if (layEvent === 'del') { //删除
            deleteGradingStandard(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行评分标准内容页面访问")
        }
    });
});