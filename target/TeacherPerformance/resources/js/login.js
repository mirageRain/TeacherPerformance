layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;

    var time = new Date( ); //获得当前时间
                 var year = time.getFullYear();
                 $("#time").append("2017-"+year);


    function getRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var strs = url.split("?");
        return strs[strs.length-1];
    }
    var error=getRequest();
    if(error!=null&&error=="error"){
        layer.alert('登录失败，用户名或密码错误！', {icon: 2,anim: 6,offset: '100px'});
       // top.layer.msg("登录失败，用户名或密码错误！");
    }

    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
