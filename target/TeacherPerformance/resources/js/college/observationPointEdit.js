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
    });


    form.on("submit(submit)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

        //将主要观测点信息封装成JSON数据
        var observationPointData = {};
        observationPointData.observationPointId = $("#observationPointId").val();
        observationPointData.evaluationIndexId = $("#evaluationIndex").val();
        observationPointData.content = $("#observationPointContent").val();
        $.ajax({
            "url": "/college/observationPoint",
            "data": JSON.stringify(observationPointData),
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
                    layer.msg("主要观测点信息更新成功！");
                } else {
                    layer.msg("更新失败"+result.msg);
                }
            }
        });
        return false;
    })
})