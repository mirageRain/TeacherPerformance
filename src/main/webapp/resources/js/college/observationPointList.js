layui.use(['form', 'layer', 'laydate', 'table', 'laytpl','upload'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        upload = layui.upload,
        table = layui.table;

    var initCollegeName,evaluationIndexJson;
    var evaluationIndexList=[];
    function initData(){
        $.ajax({
            "url": "/userInfo",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    initCollegeName=result.data.displayName;
                } else {
                    top.layer.msg(result.msg);
                }
            }
        });
        $.ajax({
            "url": "/college/evaluationIndex",
            "contentType": "application/json",
            "type": "get",
            "async": false,
            "error": function () {
                top.layer.msg("服务器繁忙！");
            },
            "success": function (result) {
                if (result.code == 200) {
                    evaluationIndexJson =result.data;
                    evaluationIndexJson = result.data;

                } else {
                    top.layer.msg(result.msg);
                }
            }
        });

        $.each(evaluationIndexJson,function(i,item){
            evaluationIndexList[item.evaluationIndexId] = item.content;
            $("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"'>"+item.content+"</option>");
        });
        form.render();
    }
    initData();

    //主要观测点列表
    var tableIns = table.render({
        elem: '#observationPointList',
        id: "observationPointListTable",
        url: '/college/observationPoint',
        cellMinWidth: 95,
        height: "full-125",
        page: true,
        limits: [10, 15, 20, 25],
        limit: 15,
        autoSort: false,
        response: {
            statusCode: 200
        },
        defaultToolbar: ['filter', 'print', 'exports'],
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'observationPointId', title: '主要观测点ID', width: 200, align: "center", sort: true},
            {field: 'evaluationIndexId', title: '所属评估指标ID', width: 200, align: "center", sort: true},
            {field: 'evaluationIndex', title: '所属评估指标', width: 200, align: "center",templet:function(d){
                    return evaluationIndexList[d.evaluationIndexId];
                }},
            {field: 'content', title: '主要观测点名称', align: "center", sort: true},
            {title: '操作', width: 220, templet: '#observationPointListBar', fixed: "right", align: "center"}
        ]]
    });



    //添加主要观测点
    function addObservationPoint() {
        var index = layui.layer.open({
            title: "添加主要观测点",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "observationPointAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                    body.find("#collegeName").val(initCollegeName);
                $.each(evaluationIndexJson,function(i,item){
                    body.find("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"'>"+item.content+"</option>");
                });
                setTimeout(function () {
                    layui.layer.tips('点击此处返回主要观测点列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });
            }
        });

        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {

        })
    }

    //更新主要观测点
    function updateObservationPoint(data) {
        var index = layui.layer.open({
            title: "更新主要观测点",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "observationPointEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#collegeName").val(initCollegeName);
                    body.find("#observationPointContent").val(data.content);
                    body.find("#observationPointId").val(data.observationPointId);
                    body.find("#evaluationIndex").html("");
                    $.each(evaluationIndexJson,function(i,item){
                        if(item.evaluationIndexId==data.evaluationIndexId)
                            body.find("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"' selected='selected'>"+item.content+"</option>");
                        else
                            body.find("#evaluationIndex").append("<option value='"+item.evaluationIndexId+"'>"+item.content+"</option>");
                    });

                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回主要观测点列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteObservationPoint(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var observationPointIdList = new Array();
        var observationPointNameStr = "确定删除";
        for (var i in data) {
            observationPointIdList.push(data[i].observationPointId);
            if (i < data.length - 1) {
                observationPointNameStr += data[i].content + "、";
            }
            else {
                observationPointNameStr += data[i].content + "吗?";
            }
        }
        layer.confirm(observationPointNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/college/observationPoint",
                "data": JSON.stringify(observationPointIdList),
                "contentType": "application/json",
                "type": "delete",
                "error": function () {
                    top.layer.msg("删除失败，服务器繁忙");
                    top.layer.close(index);
                },
                "success": function (result) {

                    if (result.code == 200) {
                        top.layer.close(index);
                        tableIns.reload();
                        top.layer.msg("删除成功！");
                    } else {
                        top.layer.msg(result.msg);
                    }
                }
            });
            return false;
            tableIns.reload();
            layer.close(index);
        });
    }

    //搜索
    form.on("submit(searchForm)", function (data) {
        table.reload('observationPointListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('observationPointListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加主要观测点按钮
    $("#addObservationPointBtn").click(function () {
        addObservationPoint();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('observationPointListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteObservationPoint(data);
        } else {
            layer.msg("请选择需要删除的主要观测点");
        }
    })

    //后端排序
    table.on('sort(observationPointList)', function (obj) { //observationPointList是table原始容器的属性 lay-filter="对应的值"
        table.reload('observationPointListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
            , where: { //请求参数
                field: obj.field //排序字段
                , order: obj.type //排序方式
            }
        });
    });

    //列表操作
    table.on('tool(observationPointList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateObservationPoint(data);
        } else if (layEvent === 'del') { //删除
            deleteObservationPoint(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行主要观测点内容页面访问")
        }
    });

    upload.render({
        elem: '#importData'
        , url: '/upload/'
        , accept: 'file' //普通文件
        , exts: 'XLSX|XLS' //只允许上传压缩文件
        , auto: false
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列

            //读取本地文件
            obj.preview(function (index, file, result) {
                var titleInfo = "确定要导入 "+file.name+" 文件内的数据嘛？";
                layer.confirm(titleInfo, {icon: 1, title: '确认导入信息', anim: 1}, function (index) {
                    var f = file;
                    var reader = new FileReader();
                    var rABS = false;
                    reader.onload = function (e) {	//定义生成事件
                        var data = e.target.result;
                        if (rABS) {
                            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(data, {
                                type: 'binary'
                            });
                        }
                        var jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        var data = JSON.stringify(jsonData);

                        console.log(data);

                        var index = top.layer.msg('数据导入中，请稍候', {icon: 16, time: false, shade: 0.1});
                        $.ajax({
                            "url": "/college/observationPoint/excel",
                            "data": data,
                            "contentType": "application/json",
                            "type": "post",
                            "error": function () {
                                top.layer.msg("导入失败，服务器繁忙");
                                top.layer.close(index);
                            },
                            "success": function (result) {

                                if (result.code == 200) {

                                    top.layer.msg("导入成功！");
                                    location.reload();
                                } else {
                                    top.layer.close(index);
                                    top.layer.alert(result.msg,{icon: 2, title:'导入失败', anim: 6});
                                    location.reload();
                                }
                            }
                        });
                        console.log(data);

                        //table.reload('collegeListTable');
                        //location.reload();
                    };
                    if (rABS) {	//读取文件
                        reader.readAsArrayBuffer(f);
                    } else {
                        reader.readAsBinaryString(f);
                    }
                },function (index) {
                    location.reload();
                });
            });
        }

        , done: function (res) {
            console.log(res)
        }
    });

    function fixdata(data) { //文件流转BinaryString
        var o = "",
            l = 0,
            w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }
});