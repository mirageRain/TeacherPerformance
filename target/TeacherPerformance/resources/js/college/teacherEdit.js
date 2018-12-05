layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //验证表单信息
    form.verify({
        teacherName: function (value, item) { //value：表单的值、item：表单的DOM对象

            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            var meg;
            var teacherId = $("#teacherId").val();
            $.ajax({
                "url": "/college/teacher/testTeacherName",
                "data": {"teacherName": value, "teacherId": teacherId},
                "contentType": "application/json",
                "type": "get",
                "async": false,
                "error": function () {
                    meg = "服务器繁忙！";
                },
                "success": function (result) {
                    if (result.code != 200) {
                        meg = result.msg;
                    }
                }
            });
            if (meg != null && meg != "")
                return meg;
        },
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            var meg;
            var teacherId = $("#teacherId").val();
            $.ajax({
                "url": "/college/teacher/testUsername",
                "data": {"username": value, "teacherId": teacherId},
                "contentType": "application/json",
                "type": "get",
                "async": false,
                "error": function () {
                    meg = "服务器繁忙！";
                },
                "success": function (result) {
                    if (result.code != 200) {
                        meg = result.msg;
                    }
                }
            });
            if (meg != null && meg != "")
                return meg;
        }
        , employeeId: [
            /^[\d]{1,10}$/
            , '工号必须为1到10为的数字'
        ]
        , password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });


    form.on("submit(submit)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

        //将教师信息封装成JSON数据
        var teacherData = {};
        teacherData.teacherId = $("#teacherId").val();
        teacherData.username = $("#username").val();
        teacherData.password = $("#password").val();
        teacherData.teacherName = $("#teacherName").val();
        teacherData.employeeId = $("#employeeId").val();
        teacherData.teacherTitleId = $("#teacherTitle").val();
        $.ajax({
            "url": "/college/teacher",
            "data": JSON.stringify(teacherData),
            "contentType": "application/json",
            "type": "put",
            "error": function () {
                top.layer.msg("服务器繁忙！");
                top.layer.close(index);
            },
            "success": function (result) {
                if (result.code == 200) {
                    top.layer.close(index);
                    $("#close").click();
                    layer.msg("教师信息更新成功！");
                } else {
                    layer.msg("更新失败"+result.msg);
                }
            }
        });
        return false;
    })
})