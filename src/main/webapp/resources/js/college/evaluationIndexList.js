layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //评估指标列表
    var tableIns = table.render({
        elem: '#evaluationIndexList',
        id: "evaluationIndexListTable",
        url: '/college/evaluationIndex',
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
            {field: 'evaluationIndexId', title: '评估指标ID', width: 200, align: "center", sort: true},
            {field: 'content', title: '评估指标名称', align: "center", sort: true},
            {title: '操作', width: 220, templet: '#evaluationIndexListBar', fixed: "right", align: "center"}
        ]]
    });
    var initCollegeName,evaluationIndexTitleJson;
    function initData(){
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
    }
    initData();


    //添加评估指标
    function addEvaluationIndex() {
        var index = layui.layer.open({
            title: "添加评估指标",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "evaluationIndexAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                    body.find("#collegeName").val(initCollegeName);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回评估指标列表', '.layui-layer-setwin .layui-layer-close', {
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

    //更新评估指标
    function updateEvaluationIndex(data) {
        var index = layui.layer.open({
            title: "更新评估指标",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "evaluationIndexEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#collegeName").val(initCollegeName);
                    body.find("#evaluationIndexContent").val(data.content);
                    body.find("#evaluationIndexId").val(data.evaluationIndexId);

                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回评估指标列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteEvaluationIndex(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var evaluationIndexIdList = new Array();
        var evaluationIndexNameStr = "确定删除";
        for (var i in data) {
            evaluationIndexIdList.push(data[i].evaluationIndexId);
            if (i < data.length - 1) {
                evaluationIndexNameStr += data[i].content + "、";
            }
            else {
                evaluationIndexNameStr += data[i].content + "吗?";
            }
        }
        layer.confirm(evaluationIndexNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/college/evaluationIndex",
                "data": JSON.stringify(evaluationIndexIdList),
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
        table.reload('evaluationIndexListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('evaluationIndexListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加评估指标按钮
    $("#addEvaluationIndexBtn").click(function () {
        addEvaluationIndex();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('evaluationIndexListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteEvaluationIndex(data);
        } else {
            layer.msg("请选择需要删除的评估指标");
        }
    })

    //后端排序
    table.on('sort(evaluationIndexList)', function (obj) { //evaluationIndexList是table原始容器的属性 lay-filter="对应的值"
        table.reload('evaluationIndexListTable', {
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
    table.on('tool(evaluationIndexList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateEvaluationIndex(data);
        } else if (layEvent === 'del') { //删除
            deleteEvaluationIndex(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行评估指标内容页面访问")
        }
    });
});