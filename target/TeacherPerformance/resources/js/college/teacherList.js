layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //教师列表
    var tableIns = table.render({
        elem: '#teacherList',
        id: "teacherListTable",
        url: '/college/teacher',
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
            {field: 'teacherId', title: '教师ID', width: 100, align: "center", sort: true},
            {field: 'teacherName', title: '教师名称', align: "center", sort: true},
            {field: 'username', title: '教师账号', align: "center", sort: true},
            {field: 'teacherTitleName', title: '教师职称', align: "center", sort: true},
            {title: '操作', width: 220, templet: '#teacherListBar', fixed: "right", align: "center"}
        ]]
    });
    var initCollegeName,teacherTitleJson;
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
        $.ajax({
            "url": "/info/teacherTitle",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    teacherTitleJson =result.data;

                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        $.each(teacherTitleJson,function(i,item){
            $("#teacherTitle").append("<option value='"+item.teacherTitleId+"'>"+item.name+"</option>");
        });
        form.render();
    }
    initData();


    //添加教师
    function addTeacher() {
        var index = layui.layer.open({
            title: "添加教师",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "teacherAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                    body.find("#collegeName").val(initCollegeName);
                    body.find("#teacherTitle").html("");
                    $.each(teacherTitleJson,function(i,item){
                        body.find("#teacherTitle").append("<option value='"+item.teacherTitleId+"'>"+item.name+"</option>");
                    });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回教师列表', '.layui-layer-setwin .layui-layer-close', {
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

    //更新教师
    function updateTeacher(data) {
        var index = layui.layer.open({
            title: "更新教师",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "teacherEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#collegeName").val(initCollegeName);
                    body.find("#teacherTitle").html("");
                    $.each(teacherTitleJson,function(i,item){
                        if(item.teacherTitleId==data.teacherTitleId)
                            body.find("#teacherTitle").append("<option value='"+item.teacherTitleId+"' selected='selected'>"+item.name+"</option>");
                        else
                            body.find("#teacherTitle").append("<option value='"+item.teacherTitleId+"'>"+item.name+"</option>");
                    });

                    body.find("#username").val(data.username);
                    body.find("#teacherName").val(data.teacherName);
                    body.find("#teacherId").val(data.teacherId);

                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回教师列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteTeacher(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var teacherIdList = new Array();
        var teacherNameStr = "确定删除";
        for (var i in data) {
            teacherIdList.push(data[i].teacherId);
            if (i < data.length - 1) {
                teacherNameStr += data[i].teacherName + "、";
            }
            else {
                teacherNameStr += data[i].teacherName + "吗?";
            }
        }
        layer.confirm(teacherNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/college/teacher",
                "data": JSON.stringify(teacherIdList),
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
        table.reload('teacherListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('teacherListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加教师按钮
    $("#addTeacherBtn").click(function () {
        addTeacher();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('teacherListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteTeacher(data);
        } else {
            layer.msg("请选择需要删除的教师");
        }
    })

    //后端排序
    table.on('sort(teacherList)', function (obj) { //teacherList是table原始容器的属性 lay-filter="对应的值"
        table.reload('teacherListTable', {
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
    table.on('tool(teacherList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateTeacher(data);
        } else if (layEvent === 'del') { //删除
            deleteTeacher(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行教师内容页面访问")
        }
    });
});