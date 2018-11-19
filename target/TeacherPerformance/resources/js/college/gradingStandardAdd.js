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

    console.log(parent);

    form.on("submit(submit)", function (data) {

        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

        //将评分标准信息封装成JSON数据
        var gradingStandardData = {};
        gradingStandardData.evaluationIndexId = $("#evaluationIndex").val();
        gradingStandardData.observationPointId = $("#observationPoint").val();
        gradingStandardData.auditId = $("#audit").val();
        gradingStandardData.content = $("#gradingStandardContent").val();
        gradingStandardData.gradingBasis = $("#gradingBasis").val();
        gradingStandardData.note = $("#note").val();
        $.ajax({
            "url": "/college/gradingStandard",
            "data": JSON.stringify(gradingStandardData),
            "contentType": "application/json",
            "type": "post",
            "error": function () {
                top.layer.msg("服务器繁忙！");
                top.layer.close(index);
            },
            "success": function (result) {
                if (result.code == 200) {
                    top.layer.close(index);
                    $("#close").click();
                    top.layer.msg("评分标准添加成功！");
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        return false;
    });

    form.on('select(evaluationIndex)', function (data) {
        $("#observationPoint").html('<option value=""  disabled=""  selected>请选择</option>');
        $.each(parent.tableJson,function(i,item){
            if(item.evaluationIndexId==data.value){

                $.each(parent.tableJson[i].observationPointList,function(j,observationPoint){
                    $("#observationPoint").append("<option value='"+observationPoint.observationPointId+"'" +">"+(i+1)+'. '+(j+1)+' '+observationPoint.content+"</option>");
                });
            }
        });
        form.render();
    });

});