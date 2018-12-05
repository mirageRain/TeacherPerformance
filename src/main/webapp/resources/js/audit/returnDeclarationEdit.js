layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;
    form.on("submit(pass)", function (data) {

        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

        //将审核处信息封装成JSON数据
        var orderData = {};
        var gradingStandardId = $("#gradingStandardId").val();
        orderData.auditId = parent.orderListData.auditId;
        orderData.gradingStandardId = parent.orderListData.gradingStandardId;
        orderData.orderId = parent.orderListData.orderId;
        orderData.certifiedReportScore = $("#selfReportScore").val();
        orderData.certifiedNote = $("#declarationNote").val();
        orderData.status = 2;
        $.ajax({
            "url": "/audit/order",
            "data": JSON.stringify(orderData),
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
                    top.layer.msg("申报单已审核通过！");
                } else {
                    top.layer.close(index);
                    top.layer.msg(result.msg);
                }
            }
        });
        return false;
    });

    form.on("submit(return)", function (data) {

        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

        //将审核处信息封装成JSON数据
        var orderData = {};
        var gradingStandardId = $("#gradingStandardId").val();
        orderData.auditId = parent.orderListData.auditId;
        orderData.gradingStandardId = parent.orderListData.gradingStandardId;
        orderData.orderId = parent.orderListData.orderId;
        orderData.certifiedReportScore = $("#selfReportScore").val();
        orderData.certifiedNote = $("#declarationNote").val();
        orderData.status = 3;
        $.ajax({
            "url": "/audit/order",
            "data": JSON.stringify(orderData),
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
                    top.layer.msg("申报单已退回！");
                } else {
                    top.layer.close(index);
                    top.layer.msg(result.msg);
                }
            }
        });
        return false;
    });






});