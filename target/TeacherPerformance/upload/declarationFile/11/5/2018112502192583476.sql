/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : teacher_performance

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-11-22 17:25:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '管理员对应的用户ID',
  `admin_name` varchar(255) NOT NULL DEFAULT '' COMMENT '管理员名称',
  PRIMARY KEY (`admin_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员表';

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '1', 'mirage');

-- ----------------------------
-- Table structure for audit
-- ----------------------------
DROP TABLE IF EXISTS `audit`;
CREATE TABLE `audit` (
  `audit_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '审核部门ID',
  `audit_name` varchar(50) NOT NULL DEFAULT '' COMMENT '审核名称',
  `college_id` int(11) NOT NULL COMMENT '所属学院ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '审核部门对应的用户ID',
  `desc_` varchar(255) NOT NULL DEFAULT '' COMMENT '审核部门描述',
  PRIMARY KEY (`audit_id`) USING BTREE,
  KEY `audit_name` (`audit_name`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='审核部门表';

-- ----------------------------
-- Records of audit
-- ----------------------------
INSERT INTO `audit` VALUES ('1', '邯郸学院教务处', '11', '17', '邯郸学院教务处');
INSERT INTO `audit` VALUES ('3', '邯郸学院办公室', '11', '18', '邯郸学院办公室');

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `authority_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `authorities` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`authority_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户权限表';

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES ('1', '1', 'ROLE_ADMIN');
INSERT INTO `authorities` VALUES ('12', '12', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('13', '13', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('14', '17', 'ROLE_AUDIT');
INSERT INTO `authorities` VALUES ('15', '18', 'ROLE_AUDIT');
INSERT INTO `authorities` VALUES ('17', '21', 'ROLE_AUDIT');
INSERT INTO `authorities` VALUES ('18', '22', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('19', '23', 'ROLE_TEACHER');

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college` (
  `college_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '学院自增ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '学院对应的用户ID',
  `college_name` varchar(50) NOT NULL DEFAULT '' COMMENT '学院名称',
  PRIMARY KEY (`college_id`) USING BTREE,
  KEY `college_name` (`college_name`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='学院信息表';

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES ('11', '12', '邯郸学院');
INSERT INTO `college` VALUES ('12', '13', '信息工程学院');

-- ----------------------------
-- Table structure for evaluation_index
-- ----------------------------
DROP TABLE IF EXISTS `evaluation_index`;
CREATE TABLE `evaluation_index` (
  `evaluation_index_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '评估指标ID',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '评估指标内容',
  `college_id` int(11) unsigned NOT NULL COMMENT '创建指标的学院ID',
  `year` int(4) NOT NULL COMMENT '所属年份',
  `semester` int(4) NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`evaluation_index_id`) USING BTREE,
  KEY `college_id` (`college_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评估指标（一级分类）表';

-- ----------------------------
-- Records of evaluation_index
-- ----------------------------
INSERT INTO `evaluation_index` VALUES ('1', '测试11', '11', '2018', '1');
INSERT INTO `evaluation_index` VALUES ('2', '第二次测试2323', '11', '2018', '1');

-- ----------------------------
-- Table structure for grading_standard
-- ----------------------------
DROP TABLE IF EXISTS `grading_standard`;
CREATE TABLE `grading_standard` (
  `grading_standard_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '评分标准ID',
  `evaluation_index_id` int(11) unsigned NOT NULL COMMENT '评估指标ID',
  `observation_point_id` int(11) unsigned NOT NULL COMMENT '观测点ID',
  `college_id` int(11) unsigned NOT NULL COMMENT '创建评分标准的学院ID',
  `audit_id` int(11) unsigned NOT NULL COMMENT '分配的审核处Id',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '评分标准内容',
  `grading_basis` varchar(255) NOT NULL DEFAULT '' COMMENT '评分依据',
  `note` varchar(255) NOT NULL DEFAULT '' COMMENT '备注信息',
  `year` int(4) NOT NULL COMMENT '所属年份',
  `semester` int(4) unsigned NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`grading_standard_id`) USING BTREE,
  KEY `college_id` (`college_id`) USING BTREE,
  KEY `observation_point_id` (`observation_point_id`) USING BTREE,
  KEY `evaluation_index_id` (`evaluation_index_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评分标准表';

-- ----------------------------
-- Records of grading_standard
-- ----------------------------
INSERT INTO `grading_standard` VALUES ('1', '2', '2', '11', '1', '第二次', '2. 1 主要', '123312', '2018', '1');
INSERT INTO `grading_standard` VALUES ('2', '2', '2', '11', '3', 'aaa2', 'bbb2', '123123', '2018', '1');
INSERT INTO `grading_standard` VALUES ('4', '1', '1', '11', '3', 'qwewqe', 'qweqwe', 'qweqwe', '2018', '1');

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log` (
  `login_log_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '登录日志ID',
  `user_id` int(11) NOT NULL COMMENT '登录用户ID',
  `login_url` varchar(255) DEFAULT '' COMMENT '登录URL',
  `login_ip` varchar(40) NOT NULL DEFAULT '' COMMENT '登录IP',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  `login_state` tinyint(255) NOT NULL COMMENT '登录是否成功：0失败，1成功',
  PRIMARY KEY (`login_log_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `login_state` (`login_state`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='登录日志表';

-- ----------------------------
-- Records of login_log
-- ----------------------------

-- ----------------------------
-- Table structure for observation_point
-- ----------------------------
DROP TABLE IF EXISTS `observation_point`;
CREATE TABLE `observation_point` (
  `observation_point_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '观测点ID',
  `evaluation_index_id` int(11) unsigned NOT NULL COMMENT '评估指标ID',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '观测点内容',
  `college_id` int(11) unsigned NOT NULL COMMENT '创建观察点的学院ID',
  `year` int(4) NOT NULL COMMENT '所属年份',
  `semester` int(4) unsigned NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`observation_point_id`) USING BTREE,
  KEY `college_id` (`college_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='主要观测点（二级分类）表';

-- ----------------------------
-- Records of observation_point
-- ----------------------------
INSERT INTO `observation_point` VALUES ('1', '1', '观测点1', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('2', '2', '主要观测点2', '11', '2018', '1');

-- ----------------------------
-- Table structure for order_
-- ----------------------------
DROP TABLE IF EXISTS `order_`;
CREATE TABLE `order_` (
  `order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '新业绩申报单ID',
  `teacher_id` int(11) unsigned NOT NULL COMMENT '申请人教师ID',
  `grading_standard_id` int(11) unsigned NOT NULL COMMENT '观测点的评分标准ID',
  `audit_id` int(11) unsigned NOT NULL COMMENT '认证机构ID',
  `self_report_score` decimal(10,2) unsigned DEFAULT NULL COMMENT '自评得分',
  `certified_score` decimal(10,2) unsigned NOT NULL COMMENT '被认证得分',
  `certified_note` varchar(255) NOT NULL COMMENT '认证备注',
  `status` tinyint(255) unsigned NOT NULL COMMENT '申报单状态：-1异常，0未申报，1新申报待认证，2已认证，3退回，4评分周期结束',
  `add_time` datetime NOT NULL COMMENT '申报时间',
  `certified_time` datetime NOT NULL COMMENT '被认证时间',
  `year` int(4) NOT NULL COMMENT '所属年份',
  `semester` int(4) unsigned NOT NULL COMMENT '所属学期',
  `declaration_note` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  KEY `user_id` (`teacher_id`) USING BTREE,
  KEY `grading_standard_id` (`grading_standard_id`) USING BTREE,
  KEY `audit_id` (`audit_id`) USING BTREE,
  KEY `year` (`year`),
  KEY `semester` (`semester`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='新业绩申报单表';

-- ----------------------------
-- Records of order_
-- ----------------------------

-- ----------------------------
-- Table structure for order_file
-- ----------------------------
DROP TABLE IF EXISTS `order_file`;
CREATE TABLE `order_file` (
  `order_file_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '申请单文件ID',
  `order_id` bigint(20) unsigned NOT NULL COMMENT '申请单ID',
  `save_file_name` varchar(255) NOT NULL DEFAULT '' COMMENT '服务器保存的文件名称',
  `upload_file_name` varchar(255) NOT NULL DEFAULT '' COMMENT '上次时原始的文件名称',
  `file_url` varchar(255) NOT NULL DEFAULT '' COMMENT '服务器中文件的URl',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`order_file_id`) USING BTREE,
  KEY `order_id` (`order_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='申请单文件表';

-- ----------------------------
-- Records of order_file
-- ----------------------------

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config` (
  `system_config_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '系统配置ID',
  `system_open` tinyint(4) unsigned NOT NULL COMMENT '系统是否开启：0关闭，1开启',
  `system_year` int(10) unsigned NOT NULL COMMENT '系统当前年份',
  `system_semester` int(10) unsigned NOT NULL COMMENT '系统当前学期',
  PRIMARY KEY (`system_config_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='系统配置表';

-- ----------------------------
-- Records of system_config
-- ----------------------------
INSERT INTO `system_config` VALUES ('1', '1', '2018', '1');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacher_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '教师ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '用户ID',
  `teacher_name` varchar(255) NOT NULL DEFAULT '' COMMENT '教师名称',
  `employee_id` varchar(10) NOT NULL COMMENT '教师工号',
  `teacher_title_id` int(11) unsigned NOT NULL COMMENT '教师职称ID',
  `college_id` int(11) unsigned NOT NULL COMMENT '学院ID',
  PRIMARY KEY (`teacher_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师表';

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('3', '21', '王五', '', '4', '11');
INSERT INTO `teacher` VALUES ('4', '22', '张三', '', '2', '11');
INSERT INTO `teacher` VALUES ('5', '23', '李四', '00102', '2', '11');

-- ----------------------------
-- Table structure for teacher_title
-- ----------------------------
DROP TABLE IF EXISTS `teacher_title`;
CREATE TABLE `teacher_title` (
  `teacher_title_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '教师职称ID',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '教师职称名称',
  `desc_` varchar(255) NOT NULL DEFAULT '' COMMENT '教师职称描述',
  PRIMARY KEY (`teacher_title_id`) USING BTREE,
  KEY `name` (`name`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师职称表';

-- ----------------------------
-- Records of teacher_title
-- ----------------------------
INSERT INTO `teacher_title` VALUES ('1', '无', '无');
INSERT INTO `teacher_title` VALUES ('2', '讲师', '讲师职称');
INSERT INTO `teacher_title` VALUES ('4', '副教授', '副教授职称\n');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `enable` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '是否被删除：0删除，1启用',
  `type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户类型：1超级管理员，2学院管理员，3审核机构管理员，4教师',
  `state` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态：1正常，2冻结',
  `register_ip` varchar(50) DEFAULT NULL COMMENT '注册时的IP地址',
  `last_login_ip` varchar(50) DEFAULT NULL COMMENT '上次登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `username` (`username`) USING BTREE,
  KEY `type` (`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'mirage', '$2a$10$XefeuTFJsv3bi8QLxyUxFuK6/IctSn7DGA7cTHsebB6xbtuxc89t6', '1', '1', '1', '', '', '2018-11-08 16:29:50', '2018-11-08 16:29:50');
INSERT INTO `users` VALUES ('12', 'hdxy', '$2a$10$TlRZT9V5eDhEc0xEF4Lr3uKfbeeu8IWQ12hoR.jdbiUC3jWnEZUZG', '1', '1', '1', '', '', '2018-11-09 18:24:54', '2018-11-09 18:24:54');
INSERT INTO `users` VALUES ('13', 'xxgcxy', '$2a$10$MCqexzC8ENZFMXRnkc7Np.ywsKF0cfZMWj7aAuazFlDTnCHus1yHy', '1', '1', '1', '', '', '2018-11-09 18:10:30', '2018-11-09 18:10:30');
INSERT INTO `users` VALUES ('17', 'hdxyjwc', '$2a$10$EeTiLrfTJeTAleIjD8/0Te0Ziq0G1wmGHe8d9iophEICI6tsME7QW', '1', '3', '1', '', '', '2018-11-16 12:57:28', '2018-11-16 12:57:28');
INSERT INTO `users` VALUES ('18', 'hdxybgs', '$2a$10$42WUxbcDwytv/pRTVNYOnu/31I5f9z8/msM/04RGuaroyrdqQLtBS', '1', '3', '1', '', '', '2018-11-17 21:43:54', '2018-11-17 21:43:54');
INSERT INTO `users` VALUES ('19', '00003', '$2a$10$mQwlwJ7uoqm3nYmCaxfAPO6.YkpjbOxVbeU.tSUGQHkgscLo2WwHy', '1', '4', '1', '', '', '2018-11-18 16:59:29', '2018-11-18 16:59:29');
INSERT INTO `users` VALUES ('21', '00005', '$2a$10$Vt7asHncaJcQE35wtpueUutensq87GsV0MLwSuDthTPMJf60yAyzq', '1', '4', '1', '', '', '2018-11-18 17:15:06', '2018-11-18 17:15:06');
INSERT INTO `users` VALUES ('22', '00012', '$2a$10$vSBO0OPuHBDFoUpYEjWf6.X3SPuSTO5z4Fl99WuWFZSqnzuTFODCa', '1', '4', '1', '', '', '2018-11-18 17:20:35', '2018-11-18 17:20:35');
INSERT INTO `users` VALUES ('23', '00001', '$2a$10$7Pzvh1XYqYNKaViRV2s8Sevhrzz/WkcF7D6jSk/OjVfixyus7Zaly', '1', '4', '1', '', '', '2018-11-22 01:31:56', '2018-11-22 01:31:56');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `user_info_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户信息ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '用户ID',
  `display_name` varchar(50) NOT NULL DEFAULT '' COMMENT '展示名称',
  `img_url` varchar(255) NOT NULL DEFAULT '' COMMENT '头像URL',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT '电话',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  PRIMARY KEY (`user_info_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户信息表';

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '1', '管理员', '12', '13082070520', '905884644@qq.com');
INSERT INTO `user_info` VALUES ('12', '12', '邯郸学院', '', '', '');
INSERT INTO `user_info` VALUES ('13', '13', '信息工程学院', '', '', '');
INSERT INTO `user_info` VALUES ('18', '17', '邯郸学院教务处', '', '', '');
INSERT INTO `user_info` VALUES ('20', '18', '邯郸学院办公室', '', '', '');
INSERT INTO `user_info` VALUES ('21', '19', '张三1', '', '', '');
INSERT INTO `user_info` VALUES ('25', '23', '李四', '', '', '');
INSERT INTO `user_info` VALUES ('23', '21', '王五', '', '', '');
INSERT INTO `user_info` VALUES ('24', '22', '张三', '', '', '');
