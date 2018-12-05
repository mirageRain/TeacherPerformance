layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

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



})