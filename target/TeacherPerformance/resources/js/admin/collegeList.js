layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //学院列表
    var tableIns = table.render({
        elem: '#collegeList',
        id: "collegeListTable",
        url: '/admin/college',
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
            {field: 'collegeId', title: '学院ID', width: 100, align: "center", sort: true},
            {field: 'collegeName', title: '学院名称', align: "center", sort: true},
            {field: 'username', title: '学院账号', align: "center", sort: true},
            {title: '操作', width: 220, templet: '#collegeListBar', fixed: "right", align: "center"}
        ]]
    });

    //添加学院
    function addCollge() {
        var index = layui.layer.open({
            title: "添加学院",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "collegeAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回学院列表', '.layui-layer-setwin .layui-layer-close', {
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

    //更新学院
    function updateCollge(data) {
        var index = layui.layer.open({
            title: "更新学院",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "collegeEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#username").val(data.username);
                    body.find("#collegeName").val(data.collegeName);
                    body.find("#collegeId").val(data.collegeId);
                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回学院列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteCollege(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var collegeIdList = new Array();
        var collegeNameStr = "确定删除";
        for (var i in data) {
            collegeIdList.push(data[i].collegeId);
            if (i < data.length - 1) {
                collegeNameStr += data[i].collegeName + "、";
            }
            else {
                collegeNameStr += data[i].collegeName + "吗?";
            }
        }
        layer.confirm(collegeNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/admin/college",
                "data": JSON.stringify(collegeIdList),
                "contentType": "application/json",
                "type": "delete",
                "error": function () {
                    top.layer.msg("删除失败，服务器繁忙");
                    top.layer.close(index);
                },
                "success": function (data1) {

                    if (data1.code == 200) {
                        top.layer.close(index);
                        tableIns.reload();
                        top.layer.msg("删除成功！");
                    } else {
                        top.layer.msg(data1.msg);
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
        table.reload('collegeListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('collegeListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加学院按钮
    $("#addCollegeBtn").click(function () {
        addCollge();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('collegeListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteCollege(data);
        } else {
            layer.msg("请选择需要删除的学院");
        }
    })

    //后端排序
    table.on('sort(collegeList)', function (obj) { //collegeList是table原始容器的属性 lay-filter="对应的值"
        table.reload('collegeListTable', {
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
    table.on('tool(collegeList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateCollge(data);
        } else if (layEvent === 'del') { //删除
            deleteCollege(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行学院内容页面访问")
        }
    });
});