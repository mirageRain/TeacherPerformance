layui.use(['form','layer','layedit','laydate','upload'],function(){

    var form = layui.form,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //添加验证规则
    form.verify({
        newPwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        confirmPwd : function(value, item){
            if($("#newPassword").val()!=value){
                return "两次输入密码不一致，请重新输入！";
            }
        }
    });

    form.on("submit(changePassword)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});
        //将学院信息封装成JSON数据
        var passwordData = {};
        passwordData.oldPassword = $("#oldPassword").val();
        passwordData.newPassword = $("#newPassword").val();
        passwordData.confirm = $("#confirmPasswor").val();
        $.ajax({
            "url": "/userInfo/password",
            "data": JSON.stringify(passwordData),
            "contentType": "application/json",
            "type": "put",
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    top.layer.close(index);
                    location.reload();
                    top.layer.msg("密码修改成功！");
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        return false;
    });




})