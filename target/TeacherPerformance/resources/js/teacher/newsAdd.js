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


    var evaluationIndexList = [];
    var observationPointList = [];
    var gradingStandardList = [];
    var auditList = [];
    var tableList = [];

    var evaluationIndexJson;
    var observationPointJson;
    var gradingStandardJson;
    var tableJson = {};

    $.ajax({
        "url": "../resources/json/evaluationIndexList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                evaluationIndexJson = returnData.data;
                $.each(returnData.data, function (i, item) {
                    evaluationIndexList[item.evaluationIndexId] = item;
                });

            } else {
                layer.alert(returnData.msg);
            }

        }
    });
    $.ajax({
        "url": "../resources/json/observationPointList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            layer.alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                observationPointJson = returnData.data;
                $.each(returnData.data,function(i,item){
                    observationPointList[item.observationPointId]=item;
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
            if (returnData.code == 200) {
                gradingStandardJson = returnData.data;
                $.each(returnData.data, function (i, item) {
                    gradingStandardList[item.gradingStandardId] = item;
                });
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
            if (returnData.code == 200) {
                $.each(returnData.data,function(i,item){
                    auditList[item.auditId]=item.auditName;
                });
            } else {
                alert(returnData.msg);
            }

        }
    });


    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出二维数组tableList
    function formatTableList(evaluationIndexJson,observationPointJson,gradingStandardJson){
        var tempGradingStandardList = [];
        var tableList = [];

        $.each(gradingStandardJson, function (i, item) {
            if(tempGradingStandardList[item.observationPointId]!=null){
                tempGradingStandardList[item.observationPointId][item.gradingStandardId]=item;
            }else{
                tempGradingStandardList[item.observationPointId] = new Array();
                tempGradingStandardList[item.observationPointId][item.gradingStandardId]=item;
            }
        });
       $.each(observationPointJson, function (i, item) {
           console.log(item.evaluationIndexId);
            if(tableList[item.evaluationIndexId]!=null){
                tableList[item.evaluationIndexId][item.observationPointId]=(tempGradingStandardList[item.observationPointId]);
            }else{
                tableList[item.evaluationIndexId] = [];
                tableList[item.evaluationIndexId][item.observationPointId]=(tempGradingStandardList[item.observationPointId]);
            }
        });
        return tableList;
    }

    //通过evaluationIndexJson、observationPointJson、gradingStandardJson组合出树形的分层tableJson
    function formatTableJsonByAllJson(evaluationIndexJson,observationPointJson,gradingStandardJson) {
        var lastIndex1 = 0, lastIndex2 = 0;
        var tableJson = evaluationIndexJson;
        for (var i = 0; i < tableJson.length; i++) {
            tableJson[i].observationPointList = [];
            tableJson[i].gradingStandardListSize=0;
            var jCount=0,kCount=0;
            for (var j = lastIndex1; j < observationPointJson.length; j++) {
                //记录每次添加的顺序，如果顺序不统一则会出错
                if (tableJson[i].evaluationIndexId == observationPointJson[j].evaluationIndexId) {
                    tableJson[i].observationPointList.push(observationPointJson[j]);
                    tableJson[i].observationPointList[jCount].gradingStandardList = [];
                    for (var k = lastIndex2; k < gradingStandardJson.length; k++) {
                        if (tableJson[i].observationPointList[jCount].observationPointId == gradingStandardJson[k].observationPointId) {
                            tableJson[i].observationPointList[jCount].gradingStandardList.push(gradingStandardJson[k]);
                        } else {
                            lastIndex2 = k;
                            break;
                        }
                    }
                    tableJson[i].gradingStandardListSize+=tableJson[i].observationPointList[jCount].gradingStandardList.length;
                    jCount++;
                } else {
                    lastIndex1 = j;
                    break;
                }
            }
        }
        return tableJson;
    }
    tableJson = formatTableJsonByAllJson(evaluationIndexJson,observationPointJson,gradingStandardJson);
    tableList = formatTableList(evaluationIndexJson,observationPointJson,gradingStandardJson);
    console.log(tableList);
    $.each(tableJson,function(i,item){
        $("#evaluation_index_list").append("<option value='"+item.evaluationIndexId+"'>"+(i+1)+'. '+item.content+"</option>");

    });
    form.render();


    form.on('select(evaluation_index)', function (data) {

        $("#observation_point_list").html('<option value="0"  disabled=""  selected>请选择</option>');
        $.each(tableJson,function(i,item){
            if(item.evaluationIndexId==data.value){

                $.each(tableJson[i].observationPointList,function(j,observationPoint){
                    $("#observation_point_list").append("<option value='"+observationPoint.observationPointId+"'" +">"+(i+1)+'. '+(j+1)+' '+observationPoint.content+"</option>");
                });
            }
        });
        $("#grading_standard_list").html("");
        $("#grading_basis").val("");
        form.render();
    });

    form.on('select(observation_point)', function (data) {
        console.log([data.value]);

        var observationPointId = data.value;
        var evaluationIndexId = observationPointList[observationPointId].evaluationIndexId;
        console.log(tableList);
        $("#grading_standard_list").html('<option value="0"  disabled=""  selected>请选择</option>');

        for(var i=0;i<tableList[evaluationIndexId][observationPointId].length;i++){
            var item=tableList[evaluationIndexId][observationPointId][i];
            if(item!=null)
                $("#grading_standard_list").append("<option value='"+item.gradingStandardId+"'>"+item.content+"</option>");
        }
        $("#grading_basis").val("");
        form.render();
    });

    form.on('select(grading_standard)', function (data) {


        $("#grading_basis").val(gradingStandardList[data.value].gradingBasis);

    });

    /*$.ajax({
        "url": "/json/evaluationIndexList.json",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            alert("服务器繁忙");
        },
        "success": function (returnData) {

            if (returnData.code == 200) {
                for (var i = 0; i < returnData.data.length; i++) {
                     $("#evaluation_index_list").append("<option value='"+returnData.data[i].evaluationIndexId+"'>"+(i+1)+'. '+returnData.data[i].content+"</option>");
                }
                form.render();
            } else {
                alert(returnData.msg);
            }

        }
    });*/

    //上传缩略图
    upload.render({
        elem: '.thumbBox',
        url: '../resources/json/userface.json',
        method : "get",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
        done: function(res, index, upload){
            var num = parseInt(4*Math.random());  //生成0-4的随机数，随机显示一个头像信息
            $('.thumbImg').attr('src',res.data[num].src);
            $('.thumbBox').css("background","#fff");
        }
    });

    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());
    laydate.render({
        elem: '#release',
        type: 'datetime',
        trigger : "click",
        done : function(value, date, endDate){
            submitTime = value;
        }
    });
    form.on("radio(release)",function(data){
        if(data.elem.title == "定时发布"){
            $(".releaseDate").removeClass("layui-hide");
            $(".releaseDate #release").attr("lay-verify","required");
        }else{
            $(".releaseDate").addClass("layui-hide");
            $(".releaseDate #release").removeAttr("lay-verify");
            submitTime = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
        }
    });

    form.verify({
        newsName : function(val){
            if(val == ''){
                return "文章标题不能为空";
            }
        },
        content : function(val){
            if(val == ''){
                return "文章内容不能为空";
            }
        }
    })
    form.on("submit(addNews)",function(data){
        //截取文章内容中的一部分文字放入文章摘要
        var abstract = layedit.getText(editIndex).substring(0,50);
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        // $.post("上传路径",{
        //     newsName : $(".newsName").val(),  //文章标题
        //     abstract : $(".abstract").val(),  //文章摘要
        //     content : layedit.getContent(editIndex).split('<audio controls="controls" style="display: none;"></audio>')[0],  //文章内容
        //     newsImg : $(".thumbImg").attr("src"),  //缩略图
        //     classify : '1',    //文章分类
        //     newsStatus : $('.newsStatus select').val(),    //发布状态
        //     newsTime : submitTime,    //发布时间
        //     newsTop : data.filed.newsTop == "on" ? "checked" : "",    //是否置顶
        // },function(res){
        //
        // })
        setTimeout(function(){
            top.layer.close(index);
            top.layer.msg("文章添加成功！");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        },500);
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
	//多文件列表示例
  var demoListView = $('#demoList')
  ,uploadListIns = upload.render({
    elem: '#testList'
    ,url: '/upload/'
    ,accept: 'file'
    ,multiple: true
    ,auto: false
    ,bindAction: '#testListAction'
    ,choose: function(obj){   
      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
      //读取本地文件
      obj.preview(function(index, file, result){
        var tr = $(['<tr id="upload-'+ index +'">'
          ,'<td>'+ file.name +'</td>'
          ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
          ,'<td>等待上传</td>'
          ,'<td>'
            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
          ,'</td>'
        ,'</tr>'].join(''));
        
        //单个重传
        tr.find('.demo-reload').on('click', function(){
          obj.upload(index, file);
        });
        
        //删除
        tr.find('.demo-delete').on('click', function(){
          delete files[index]; //删除对应的文件
          tr.remove();
          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
        });
        
        demoListView.append(tr);
      });
    }
    ,done: function(res, index, upload){
      if(res.code == 0){ //上传成功
        var tr = demoListView.find('tr#upload-'+ index)
        ,tds = tr.children();
        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
        tds.eq(3).html(''); //清空操作
        return delete this.files[index]; //删除文件队列已经上传成功的文件
      }
      this.error(index, upload);
    }
    ,error: function(index, upload){
      var tr = demoListView.find('tr#upload-'+ index)
      ,tds = tr.children();
      tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
    }
  });

})