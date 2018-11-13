layui.use(['form','layer','layedit','laydate','upload'],function(){

    var form = layui.form,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    function initData(){
        $.ajax({
            "url": "/admin/systemConfig",
            "contentType": "application/json",
            "type": "get",
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    console.log(result.data);
                    if(result.data.systemOpen == "1") {
                        $("#open").attr('checked',"");
                    }else{
                        $("#open").removeAttr('checked');
                    }
                    $("#semester").val(result.data.systemSemester);

                    //加载学年信息
                    laydate.render({
                        elem: '#year'
                        ,type: 'year'
                        ,value: result.data.systemYear
                    });
                    form.render();
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
    }
    initData();

    form.on("submit(updateSystemConfig)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});
        //将学院信息封装成JSON数据
        var systemConfigData = {};
        systemConfigData.systemOpen = $(".layui-unselect").hasClass("layui-form-onswitch")?1:0;
        systemConfigData.systemYear = $("#year").val();
        systemConfigData.systemSemester = $("#semester").val();

        $.ajax({
            "url": "/admin/systemConfig",
            "data": JSON.stringify(systemConfigData),
            "contentType": "application/json",
            "type": "put",
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    top.layer.close(index);
                    location.reload();
                    top.layer.msg("系统设置更新成功！");
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