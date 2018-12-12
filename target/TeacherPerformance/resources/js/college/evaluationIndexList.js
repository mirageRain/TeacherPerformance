layui.use(['form', 'layer', 'laydate', 'table', 'laytpl','upload'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        upload = layui.upload,
        table = layui.table;

    //评估指标列表
    var tableIns = table.render({
        elem: '#evaluationIndexList',
        id: "evaluationIndexListTable",
        url: '/college/evaluationIndex',
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
            {field: 'evaluationIndexId', title: '评估指标ID', width: 200, align: "center", sort: true},
            {field: 'content', title: '评估指标名称', align: "center", sort: true},
            {title: '操作', width: 220, templet: '#evaluationIndexListBar', fixed: "right", align: "center"}
        ]]
    });
    var initCollegeName,evaluationIndexTitleJson;
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
    }
    initData();


    //添加评估指标
    function addEvaluationIndex() {
        var index = layui.layer.open({
            title: "添加评估指标",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "evaluationIndexAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                    body.find("#collegeName").val(initCollegeName);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回评估指标列表', '.layui-layer-setwin .layui-layer-close', {
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

    //更新评估指标
    function updateEvaluationIndex(data) {
        var index = layui.layer.open({
            title: "更新评估指标",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "evaluationIndexEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#collegeName").val(initCollegeName);
                    body.find("#evaluationIndexContent").val(data.content);
                    body.find("#evaluationIndexId").val(data.evaluationIndexId);

                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回评估指标列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteEvaluationIndex(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var evaluationIndexIdList = new Array();
        var evaluationIndexNameStr = "确定删除";
        for (var i in data) {
            evaluationIndexIdList.push(data[i].evaluationIndexId);
            if (i < data.length - 1) {
                evaluationIndexNameStr += data[i].content + "、";
            }
            else {
                evaluationIndexNameStr += data[i].content + "吗?";
            }
        }
        layer.confirm(evaluationIndexNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/college/evaluationIndex",
                "data": JSON.stringify(evaluationIndexIdList),
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
        table.reload('evaluationIndexListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('evaluationIndexListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加评估指标按钮
    $("#addEvaluationIndexBtn").click(function () {
        addEvaluationIndex();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('evaluationIndexListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteEvaluationIndex(data);
        } else {
            layer.msg("请选择需要删除的评估指标");
        }
    })

    //后端排序
    table.on('sort(evaluationIndexList)', function (obj) { //evaluationIndexList是table原始容器的属性 lay-filter="对应的值"
        table.reload('evaluationIndexListTable', {
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
    table.on('tool(evaluationIndexList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateEvaluationIndex(data);
        } else if (layEvent === 'del') { //删除
            deleteEvaluationIndex(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行评估指标内容页面访问")
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
                            "url": "/college/evaluationIndex/excel",
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