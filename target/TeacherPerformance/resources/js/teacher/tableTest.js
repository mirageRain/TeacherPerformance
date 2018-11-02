layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    var evaluationIndexList = [];
    var observationPointList = [];
    var gradingStandardList = [];
    var auditList = [];
    var evaluationIndexJson;
    var observationPointJson;
    var gradingStandardJson;
    var tableList = {};
    $.ajax({
        "url": "../resources/json/evaluationIndexList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (true) {
                tableList = returnData.data;
                evaluationIndexJson = returnData.data;
                $.each(returnData.data, function (i, item) {
                    evaluationIndexList[item.evaluationIndexId] = item.content;
                });

            } else {
                alert(returnData.msg);
            }

        }
    });
    $.ajax({
        "url": "../resources/json/observationPointList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                observationPointJson = returnData.data;
                $.each(returnData.data, function (i, item) {
                    observationPointList[item.observationPointId] = item.content;
                });
            } else {
                alert(returnData.errMsg);
            }

        }
    });

    $.ajax({
        "url": "../resources/json/gradingStandardList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (true) {
                gradingStandardJson = returnData.data;
            } else {
                alert(returnData.msg);
            }

        }
    });

    $.ajax({
        "url": "../resources/json/auditList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (true) {
                $.each(returnData.data, function (i, item) {
                    auditList[item.auditId] = item.auditName;
                });
            } else {
                alert(returnData.msg);
            }

        }
    });


    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '../resources/json/gradingStandardList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        response: {
             statusCode: 200
        },
        id: "newsListTable",
        cols: [[
            {
                field: 'evaluationIndexId', title: '评估指标', align: "left", templet: function (d) {
                    return evaluationIndexList[d.evaluationIndexId];
                }
            },
            {
                field: 'observationPointId', title: '主要观测点', align: 'left', templet: function (d) {
                    return observationPointList[d.observationPointId];
                }
            },
            {field: 'content', title: '评分标准及依据', align: 'left'},
            {field: 'gradingBasis', title: '评分依据', align: 'left'},
            {title: '操作', width: 170, templet: '#newsListBar', fixed: "right", align: "center"}
        ]]
    });

    //是否置顶
    form.on('switch(newsTop)', function (data) {
        var index = layer.msg('修改中，请稍候', {icon: 16, time: false, shade: 0.8});
        setTimeout(function () {
            layer.close(index);
            if (data.elem.checked) {
                layer.msg("置顶成功！");
            } else {
                layer.msg("取消置顶成功！");
            }
        }, 500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        if ($(".searchVal").val() != '') {
            table.reload("newsListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    //添加申报单
    function addNews(edit) {
        var index = layui.layer.open({
            title: "新评分申报",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['80%', '80%'],
            content: "newsAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src", edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='" + edit.newsLook + "']").prop("checked", "checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked", edit.newsTop);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回申报单列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })

        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {

        })
    }

    $(".addNews_btn").click(function () {
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的申报单？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除申报单接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        } else {
            layer.msg("请选择需要删除的申报单");
        }
    })

    //列表操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addNews(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此申报单？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除申报单接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行申报单内容页面访问")
        }
    });


})