# 教师教学学业业绩考核系统

## 一、简介
-  本项目是一个高校的教师教学学业业绩考核系统，目前正在coding。
-  效果截图：
![效果截图](http://www.mabotao.com/imgCDN/TeacherPerformanceLogin.jpg "登录.jpg")
![效果截图](http://www.mabotao.com/imgCDN/TeacherPerformance1.jpg "登录.jpg")
![效果截图](http://www.mabotao.com/imgCDN/TeacherPerformance2.jpg "登录.jpg")

## 二、使用技术
-  开发语言：JAVA
-  数据库：MYSQL
-  JAVA开发框架：Spring MVC+Spring+Mybatis
-  安全管理框架：Spring Security
-  前端开发框架：layUi+VUE+JQuery+Bootstrap

## 三、环境要求
-  JDK8或更高版本
-  Tomcat7.0或更高版本
-  MySQL5.6或更高版本

## 四、部署说明
1.  创建MySQL数据库，字符集选择为utf8。
2.  在eclipse中导入maven项目。点击eclipse菜单File - Import，选择Maven - Existing Maven Projects。
3.  设置项目编码为utf-8，选择jdk1.8版本或以上。
4.  修改数据库连接。打开/src/main/resources/jdbc.properties文件，根据实际情况修改jdbc.url、jdbc.user、jdbc.password的值。
5.  编译项目。在eclipse中，右键点击项目名，选择Run as - Maven build...，Goals填入clean package，然后点击Run，第一次运行需要下载jar包，请耐心等待。
6.  部署项目。将项目部署到Tomcat7或以上版本，启动Tomcat。
7.  访问系统。前台地址：http://localhost:8080/TeacherPerformance；用户名：admin，密码：admin。