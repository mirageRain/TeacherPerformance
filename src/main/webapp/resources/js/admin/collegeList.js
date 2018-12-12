layui.use(['form', 'layer', 'laydate', 'table', 'laytpl', 'upload'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        upload = layui.upload,
        table = layui.table;

    //学院列表
    var tableIns = table.render({
        elem: '#collegeList',
        id: "collegeListTable",
        url: '/admin/college',
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
            {field: 'collegeId', title: '学院ID', width: 100, align: "center", sort: true},
            {field: 'collegeName', title: '学院名称', align: "center", sort: true},
            {field: 'username', title: '学院账号', align: "center", sort: true},
            {title: '操作', width: 220, templet: '#collegeListBar', fixed: "right", align: "center"}
        ]]
    });

    //添加学院
    function addCollge() {
        var index = layui.layer.open({
            title: "添加学院",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "collegeAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回学院列表', '.layui-layer-setwin .layui-layer-close', {
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

    //更新学院
    function updateCollge(data) {
        var index = layui.layer.open({
            title: "更新学院",
            type: 2,
            shadeClose: false,
            shade: [0.3, '#000'],
            maxmin: true, //开启最大化最小化按钮
            area: ['40%', '40%'],
            content: "collegeEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#username").val(data.username);
                    body.find("#collegeName").val(data.collegeName);
                    body.find("#collegeId").val(data.collegeId);
                }
                body.find('button#close').on('click', function () {
                    layer.close(index);
                    location.reload();//刷新
                });

                setTimeout(function () {
                    layui.layer.tips('点击此处返回学院列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 300)
            }
        });
    }

    function deleteCollege(data) {
        //如果不是批量删除传进来的对象数组，则将单个对象转换成对象数组
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
            var temp = data;
            data = [];
            data.push(temp);
        }
        var collegeIdList = new Array();
        var collegeNameStr = "确定删除";
        for (var i in data) {
            collegeIdList.push(data[i].collegeId);
            if (i < data.length - 1) {
                collegeNameStr += data[i].collegeName + "、";
            }
            else {
                collegeNameStr += data[i].collegeName + "吗?";
            }
        }
        layer.confirm(collegeNameStr, {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                "url": "/admin/college",
                "data": JSON.stringify(collegeIdList),
                "contentType": "application/json",
                "type": "delete",
                "error": function () {
                    top.layer.msg("删除失败，服务器繁忙");
                    top.layer.close(index);
                },
                "success": function (result) {

                    if (result.code == 200) {
                        top.layer.close(index);
                        location.reload();
                        top.layer.msg("删除成功！");
                    } else {
                        layer.close(index);
                        location.reload();
                        top.layer.msg(result.msg);

                    }
                }
            });
            return false;
        });
    }

    //搜索
    form.on("submit(searchForm)", function (data) {
        table.reload('collegeListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: data.field
        });
        return false;
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
        table.reload('collegeListTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: ""
        });
    });

    //添加学院按钮
    $("#addCollegeBtn").click(function () {
        addCollge();
    });

    //批量删除按钮
    $("#delAllBtn").click(function () {
        var checkStatus = table.checkStatus('collegeListTable'),
            data = checkStatus.data;

        if (data.length > 0) {
            deleteCollege(data);
        } else {
            layer.msg("请选择需要删除的学院");
        }
    })

    //后端排序
    table.on('sort(collegeList)', function (obj) { //collegeList是table原始容器的属性 lay-filter="对应的值"
        table.reload('collegeListTable', {
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
    table.on('tool(collegeList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            updateCollge(data);
        } else if (layEvent === 'del') { //删除
            deleteCollege(data);
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行学院内容页面访问")
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
                var titleInfo = "确定要导入 " + file.name + " 文件内的数据嘛？";
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

                        var index = top.layer.msg('数据导入中，请稍候', {icon: 16, time: false, shade: 0.1});
                        $.ajax({
                            "url": "/admin/college/excel",
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
                }, function (index) {
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


    /*$('#importData').change(function () {
        var rABS = false;
        var file = $("#importData");
        var fileName = file.val();
        var fileObj = file[0];
        var fileName = $("#importData").val();
        var point = fileName.lastIndexOf(".");
        var type = fileName.substr(point);
        var arr = new Array();
        arr = fileName.split("\\");
        //文件非空且为excel文件
        if (!fileObj || (type != '.xls' && type != '.xlsx')) {
            layer.msg("您上传的文件格式不符合要求", {icon: 5, anim: 6});
            return;
        }
        var str12 = "您要上传的文件名称为：" + arr[arr.length - 1] + "，是否确认上传？";
        layer.confirm(str12, {icon: 1, title: '确认导入信息', anim: 1}, function (index) {
            var f = fileObj.files[0];
            var reader = new FileReader();
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
                /!* $.ajax({	//发起请求
                     "url":"score_input",
                     "data":data,
                     "type":"post",
                     "contentType": "application/json;charset=utf-8",
                     "error":function(){
                         layer.msg("服务器繁忙，请稍后再试", {icon: 5, anim: 0});
                     },
                     "success":function(response){
                         if(response == 1) {
                             layer.msg('保存成功', {icon: 6,time: 700});
                             setTimeout("location.reload()", 800);
                         } else {
                             layer.confirm(response, {icon: 3, title:'未成功导入的数据', anim: 6});
                         }
                     }
                 });*!/
                console.log(data);
            };
            if (rABS) {	//读取文件
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        }, function (index) {
            $(".layui-upload-file").val("");
        });

    });*/
});