layui.use(['form','layer','layedit','laydate','upload'],function(){

    var form = layui.form,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    function initData(){
        $.ajax({
            "url": "/userInfo",
            "contentType": "application/json",
            "type": "get",
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    $("#displayName").val(result.data.displayName);
                    $("#phone").val(result.data.phone);
                    $("#email").val(result.data.email);
                    form.render();
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
    }
    initData();

    form.on("submit(updateUserInfo)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});
        //将学院信息封装成JSON数据
        var userInfoData = {};
        userInfoData.displayName = $("#displayName").val();
        userInfoData.phone = $("#phone").val();
        userInfoData.email = $("#email").val();

        $.ajax({
            "url": "/userInfo",
            "data": JSON.stringify(userInfoData),
            "contentType": "application/json",
            "type": "put",
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    top.layer.close(index);
                    location.reload();
                    top.layer.msg("用户信息更新成功！");
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        return false;
    });

    $("#reset").click(function(){
        initData();
    });

})