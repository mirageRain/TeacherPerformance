/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : teacher_performance

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-11-15 17:19:10
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
DROP TABLE IF EXISTS `auditTable`;
CREATE TABLE `auditTable` (
  `audit_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '审核部门ID',
  `audit_name` varchar(50) NOT NULL DEFAULT '' COMMENT '审核名称',
  `college_id` int(11) NOT NULL COMMENT '所属学院ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '审核部门对应的用户ID',
  `desc_` varchar(255) NOT NULL DEFAULT '' COMMENT '审核部门描述',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `enable` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '是否被删除：0删除，1启用',
  `type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户类型：1超级管理员，2学院管理员，3审核机构管理员，4教师',
  `state` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态：1正常，2冻结',
  `register_ip` varchar(50) DEFAULT NULL COMMENT '注册时的IP地址',
  `last_login_ip` varchar(50) DEFAULT NULL COMMENT '上次登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  `authority_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `authorities` varchar(100) NOT NULL DEFAULT '',
  `user_info_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户信息ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '用户ID',
  `display_name` varchar(50) NOT NULL DEFAULT '' COMMENT '展示名称',
  `img_url` varchar(255) NOT NULL DEFAULT '' COMMENT '头像URL',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT '电话',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱'
  PRIMARY KEY (`audit_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='审核部门表';

-- ----------------------------
-- Records of audit
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户权限表';

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES ('1', '1', 'ROLE_ADMIN');
INSERT INTO `authorities` VALUES ('12', '12', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('13', '13', 'ROLE_COLLEGE');

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
  `year` year(4) NOT NULL COMMENT '所属年份',
  `semester` tinyint(4) NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`evaluation_index_id`) USING BTREE,
  KEY `college_id` (`college_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评估指标（一级分类）表';

-- ----------------------------
-- Records of evaluation_index
-- ----------------------------

-- ----------------------------
-- Table structure for grading_standard
-- ----------------------------
DROP TABLE IF EXISTS `grading_standard`;
CREATE TABLE `grading_standard` (
  `grading_standard_id` int(255) unsigned NOT NULL AUTO_INCREMENT COMMENT '评分标准ID',
  `observation_point_id` int(255) unsigned NOT NULL COMMENT '观测点ID',
  `evaluation_index_id` int(11) unsigned NOT NULL COMMENT '评估指标ID',
  `college_id` int(11) unsigned NOT NULL COMMENT '创建评分标准的学院ID',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '评分标准内容',
  `grading_basis` varchar(255) NOT NULL DEFAULT '' COMMENT '评分依据',
  `note` varchar(255) NOT NULL DEFAULT '' COMMENT '备注信息',
  `year` year(4) NOT NULL COMMENT '所属年份',
  `semester` tinyint(4) unsigned NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`grading_standard_id`) USING BTREE,
  KEY `college_id` (`college_id`) USING BTREE,
  KEY `observation_point_id` (`observation_point_id`) USING BTREE,
  KEY `evaluation_index_id` (`evaluation_index_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评分标准表';

-- ----------------------------
-- Records of grading_standard
-- ----------------------------

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
  `observation_point_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '观测点ID',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '观测点内容',
  `college_id` int(11) unsigned NOT NULL COMMENT '创建观察点的学院ID',
  `year` year(4) NOT NULL COMMENT '所属年份',
  `semester` tinyint(4) unsigned NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`observation_point_id`) USING BTREE,
  KEY `college_id` (`college_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='主要观测点（二级分类）表';

-- ----------------------------
-- Records of observation_point
-- ----------------------------

-- ----------------------------
-- Table structure for order_
-- ----------------------------
DROP TABLE IF EXISTS `order_`;
CREATE TABLE `order_` (
  `order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '新业绩申报单ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '申请人用户ID',
  `grading_standard_id` int(11) unsigned NOT NULL COMMENT '观测点的评分标准ID',
  `audit_id` int(11) unsigned NOT NULL COMMENT '认证机构ID',
  `note` varchar(255) NOT NULL COMMENT '申报备注',
  `self_report_score` float(255,0) unsigned NOT NULL COMMENT '自评得分',
  `certified_score` float(255,0) unsigned NOT NULL COMMENT '被认证得分',
  `certified_note` varchar(255) NOT NULL COMMENT '认证备注',
  `state` tinyint(255) unsigned NOT NULL COMMENT '申报单状态：0异常，1新申报待认证，2以认证，3评分周期结束',
  `add_time` datetime NOT NULL COMMENT '申报时间',
  `certified_time` datetime NOT NULL COMMENT '被认证时间',
  `year` year(4) NOT NULL COMMENT '所属年份',
  `semester` tinyint(4) unsigned NOT NULL COMMENT '所属学期',
  PRIMARY KEY (`order_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
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
CREATE TABLE `teacher_table` (
  `teacher_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '教师ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '用户ID',
  `teacher_name` varchar(255) NOT NULL DEFAULT '' COMMENT '教师名称',
  `teacher_title_id` int(11) unsigned NOT NULL COMMENT '教师职称ID',
  `college_id` int(11) NOT NULL COMMENT '所属学院ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '审核部门对应的用户ID',
  `desc_` varchar(255) NOT NULL DEFAULT '' COMMENT '审核部门描述',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `enable` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '是否被删除：0删除，1启用',
  `type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户类型：1超级管理员，2学院管理员，3审核机构管理员，4教师',
  `state` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态：1正常，2冻结',
  `register_ip` varchar(50) DEFAULT NULL COMMENT '注册时的IP地址',
  `last_login_ip` varchar(50) DEFAULT NULL COMMENT '上次登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  `authority_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `authorities` varchar(100) NOT NULL DEFAULT '',
  `user_info_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户信息ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '用户ID',
  `display_name` varchar(50) NOT NULL DEFAULT '' COMMENT '展示名称',
  `img_url` varchar(255) NOT NULL DEFAULT '' COMMENT '头像URL',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT '电话',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱'
  PRIMARY KEY (`teacher_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师表';

-- ----------------------------
-- Records of teacher
-- ----------------------------

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师职称表';

-- ----------------------------
-- Records of teacher_title
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'mirage', '$2a$10$XefeuTFJsv3bi8QLxyUxFuK6/IctSn7DGA7cTHsebB6xbtuxc89t6', '1', '1', '1', '', '', '2018-11-08 16:29:50', '2018-11-08 16:29:50');
INSERT INTO `users` VALUES ('12', 'hdxy', '$2a$10$TlRZT9V5eDhEc0xEF4Lr3uKfbeeu8IWQ12hoR.jdbiUC3jWnEZUZG', '1', '1', '1', '', '', '2018-11-09 18:24:54', '2018-11-09 18:24:54');
INSERT INTO `users` VALUES ('13', 'xxgcxy', '$2a$10$MCqexzC8ENZFMXRnkc7Np.ywsKF0cfZMWj7aAuazFlDTnCHus1yHy', '1', '1', '1', '', '', '2018-11-09 18:10:30', '2018-11-09 18:10:30');

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
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户信息表';

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '1', '管理员', '12', '13082070520', '905884644@qq.com');
INSERT INTO `user_info` VALUES ('12', '12', '邯郸学院', '', '', '');
INSERT INTO `user_info` VALUES ('13', '13', '信息工程学院', '', '', '');
