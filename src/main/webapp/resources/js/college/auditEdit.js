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
        auditName: function (value, item) { //value：表单的值、item：表单的DOM对象

            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            var meg;
            var auditId = $("#auditId").val();
            $.ajax({
                "url": "/college/audit/testAuditName",
                "data": {"auditName": value, "auditId": auditId},
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
            var auditId = $("#auditId").val();
            $.ajax({
                "url": "/college/audit/testUsername",
                "data": {"username": value, "auditId": auditId},
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
        , password: [
            /^[\S]{6,18}$/
            , '密码必须6到18位，且不能出现空格'
        ]
    });


    form.on("submit(submit)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

        //将审核处信息封装成JSON数据
        var auditData = {};
        auditData.auditId = $("#auditId").val();
        auditData.username = $("#username").val();
        auditData.password = $("#password").val();
        auditData.auditName = $("#auditName").val();
        auditData.desc = $("#desc").val();
        $.ajax({
            "url": "/college/audit",
            "data": JSON.stringify(auditData),
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
                    layer.msg("审核处信息更新成功！");
                } else {
                    layer.msg("更新失败"+result.msg);
                }
            }
        });
        return false;
    })
})