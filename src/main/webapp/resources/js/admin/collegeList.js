layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url : '/admin/college',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        response: {
            statusCode: 200
        },
        defaultToolbar:['filter', 'print', 'exports'],
        limits : [10,15,20,25],
        id : "newsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'collegeId', title: '学院ID', width:100, align:"center", sort: true},
			{field: 'collegeName', title: '学院名称',  align:"center", sort: true},
			{field: 'username', title: '学院账号', align:"center", sort: true},
            {title: '操作', width:220, templet:'#newsListBar',fixed:"right",align:"center"}
        ]]
    });

    //是否置顶
    form.on('switch(newsTop)', function(data){
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            if(data.elem.checked){
                layer.msg("置顶成功！");
            }else{
                layer.msg("取消置顶成功！");
            }
        },500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("newsListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //更新学院
    function updateCollge(edit) {
        var index = layui.layer.open({
            title: "更新学院",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "collegeAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                alert(JSON.stringify(edit));
                if (edit) {
                    body.find("#username").val(edit.username);
                    body.find("#college_name").val(edit.collegeName);
                    body.find("#password").attr("type", password);
                    body.find("#password").val(edit.password);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回学院列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    //添加学院
    function addCollge(){
        var index = layui.layer.open({
            title : "添加学院",
            type : 2,
			shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
			area: ['40%', '40%'],
            content : "collegeAdd.html",
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回学院列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },300)
            }
        });
        
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
           
        })
    }
    $(".addNews_btn").click(function(){
        addCollge();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的学院？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除学院接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        }else{
            layer.msg("请选择需要删除的学院");
        }
    })

    //列表操作
    table.on('tool(newsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            updateCollge(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此学院？',{icon:3, title:'提示信息'},function(index){
                // $.get("删除学院接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行学院内容页面访问")
        }
    });
    

});