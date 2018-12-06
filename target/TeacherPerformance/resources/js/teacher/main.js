layui.use(['form','element','layer','jquery','util'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element;
    $ = layui.jquery;
    /**
     * 获取当前时间
     */
    var nowDate1 = "";
    var nowDate2 = "";
    var localTime = new Date();
    var serverTime;

    $.ajax({
        "url": "/info/serverTime",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            layer.msg("未获取服务器时间");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                serverTime = new Date(returnData.data);
                /**
                 * 初始化星期几
                 * @type {string}
                 */
                var weekday = "星期" + "日一二三四五六".charAt(serverTime.getDay());
                document.getElementById("weekday").innerHTML = weekday;

            } else {
                layer.msg("未获取服务器时间");
            }

        }
    });

    $.ajax({
        "url": "/teacher/info",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            layer.msg("未获取服务器时间");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                $("#collegeName").text(returnData.data.collegeName);
                $("#teacherName").text(returnData.data.teacherName);

            } else {
                layer.msg("未获取服务器时间");
            }

        }
    });

    $.ajax({
        "url": "/info/systemConfig",
        "contentType": "application/json",
        "type": "get",
        "async": false,
        "error": function () {
            layer.alert("服务器繁忙");
        },
        "success": function (returnData) {
            if (returnData.code == 200) {
                $("#systemYear").text(returnData.data.systemYear+"-"+(returnData.data.systemYear+1)+"学年");
                $("#systemSemester").text(returnData.data.systemSemester!=2?"第一学期":"第二学期");
                $("#systemOpen").text(returnData.data.systemOpen!=0?"开启":"关闭");
            } else {
                layer.alert(returnData.msg);
            }

        }
    });


    function setDate() {

        nowDate1 =  localTime.getFullYear()+ "-" + addZero((localTime.getMonth() + 1)) + "-" + addZero(localTime.getDate()) + "  ";
        nowDate1 += addZero(localTime.getHours()) + ":" + addZero(localTime.getMinutes()) + ":" + addZero(localTime.getSeconds());
        document.getElementById("nowTime").innerHTML = nowDate1;
        localTime.setTime(localTime.getTime()+1000);

        nowDate2 =  serverTime.getFullYear()+ "-" + addZero((serverTime.getMonth() + 1)) + "-" + addZero(serverTime.getDate()) + "  ";
        nowDate2 += addZero(serverTime.getHours()) + ":" + addZero(serverTime.getMinutes()) + ":" + addZero(serverTime.getSeconds());
        document.getElementById("serverTime").innerHTML = nowDate2;
        //serverTime+=1000;
        serverTime.setTime(serverTime.getTime()+1000);

        setTimeout(setDate, 1000);
    }

    /**
     * 年月日是分秒为10以下的数字则添加0字符串
     * @param time
     * @returns {number | *}
     */
    function addZero(time) {
        var i = parseInt(time);
        if (i / 10 < 1) {
            i = "0" + i;
        }
        return i;
    }


    /**
     * 初始化函数
     */
    setDate();


    $(".panel a").hover(function(){
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    },function(){
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    })
    $(".panel a").click(function(){
        parent.addTab($(this));
    });

    var util = layui.util;
    util.fixbar({});

});