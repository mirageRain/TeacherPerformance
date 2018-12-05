layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    form.verify({
        score: [
            /^[0-9]+([.]{1}[0-9]{1,2})?$/
            , '自评得分必须为保留两位小数的正数'
        ]
    });



    form.on("submit(submit)", function (data) {

        if(typeof (uploadListIns.config.files)== 'object' && JSON.stringify(uploadListIns.config.files) != "{}"){
            top.layer.msg("文件列表还有文件尚未上传，请检查后提交！");
        }else {
            var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.1});

            //将审核处信息封装成JSON数据
            var orderData = {};
            var gradingStandardId = $("#gradingStandardId").val();
            orderData.auditId = parent.orderListData.auditId;
            orderData.gradingStandardId = parent.orderListData.gradingStandardId;
            orderData.orderId = parent.orderListData.orderId;
            orderData.selfReportScore = $("#selfReportScore").val();
            orderData.declarationNote = $("#declarationNote").val();
            orderData.orderFileIdList = orderFileIdList;
            $.ajax({
                "url": "/teacher/order",
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
                        top.layer.msg("申报单更新成功！");
                    } else {
                        top.layer.close(index);
                        top.layer.msg(result.msg);
                    }
                }
            });
        }
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
                , '<a class="layui-btn layui-btn-mini demo-look" href="/teacher/download/'
                , item.orderFileId
                , '">查看</a>'
                , '<button class="layui-btn layui-btn-mini layui-btn-danger demo-revoke" data-orderFileId="',
                , item.orderFileId
                , '">删除</button>'
                , '</td>'
                , '</tr>'].join('');

            orderFileIdList.push(item.orderFileId);

            $("#demoList").append(tr);
        });
    }

    var orderFileIdList = [];
    var gradingStandardId = $("#gradingStandardId").val();
    initFileList();
    console.log(orderFileIdList);

    //多文件
    var demoListView = $('#demoList')
        , uploadListIns = upload.render({
        elem: '#testList'
        , url: '/teacher/upload'
        , accept: 'file'
        , multiple: true
        , auto: false
        , bindAction: '#testListAction'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code == 0) { //上传成功

                $.each(res.data, function (i, item) {
                    orderFileIdList.push(item);
                });
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(
                    '<a class="layui-btn layui-btn-mini demo-look" href="/teacher/download/' + res.data[0] +
                    '">查看</a>'
                    + '<button class="layui-btn layui-btn-mini layui-btn-danger demo-revoke" data-orderFileId="'
                    + res.data[0]
                    + '">撤销</button>'
                );
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            console.log(orderFileIdList);
            this.error(index, upload);
        }
        , error: function (index, upload) {
            var tr = demoListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //删除
    $('.demo-revoke').on('click', function () {
        var orderFileId = $(this).attr("data-orderFileId");
        var index = orderFileIdList.indexOf(parseInt(orderFileId));
        if (index > -1) {
            orderFileIdList.splice(index, 1);
        }
        $(this).parents("tr")[0].remove();
        uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
    });

})