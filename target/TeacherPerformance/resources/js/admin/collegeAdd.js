layui.use(['form','layer','layedit','laydate','upload'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //用于同步编辑器内容到textarea
    layedit.sync(editIndex);


    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
        }
        , password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });


    form.on("submit(submit)",function(data){
        //弹出loading
        //var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息

        var collegeData = {};

        collegeData.username =  $("#username").val();
        collegeData.password =  $("#password").val();
        collegeData.collegeName =  $("#collegeName").val();
        alert(JSON.stringify(collegeData));
        $.ajax({
            "url" : "/admin/college",
            "data" : JSON.stringify(collegeData),
            "contentType" : "application/json",
            "type" : "post",
            "error" : function() {
            },
            "success" : function(data1) {

                if (data1.code==200) {


                    top.layer.msg("学院添加成功！");
                    top.layer.close(index);
                    layer.closeAll("iframe");
                    parent.location.reload();
                } else {
                    top.layer.msg(data1.msg);

                }

            }
        });
        return false;
    })

    //预览
    form.on("submit(look)",function(){
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    })

    //创建一个编辑器
    var editIndex = layedit.build('news_content',{
        height : 535,
        uploadImage : {
            url : "../resources/json/newsImg.json"
        }
    });


})