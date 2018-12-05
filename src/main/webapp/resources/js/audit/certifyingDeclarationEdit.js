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

    //预览
    form.on("submit(look)", function () {
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    });


    function initFileList() {

        var orderFileList = parent.orderListData.orderFileList;

        $.each(orderFileList, function (i, item) {

            var tr = ['<tr id="upload-' + i + '">'
                , '<td>' + item.originFileName + '</td>'
                , '<td>' + (item.size/1000).toFixed(2)+"KB"+'</td>'
                , '<td><span style="color: #5FB878;">上传成功</span></td>'
                , '<td>'
                , '<a class="layui-btn layui-btn-mini demo-look" href="/download/'
                , item.orderFileId
                , '">查看</a>'
                , '</td>'
                , '</tr>'].join('');

            orderFileIdList.push(item.orderFileId);

            $("#demoList").append(tr);
        });
    }

    var orderFileIdList = [];
    var gradingStandardId = $("#gradingStandardId").val();
    initFileList();

});