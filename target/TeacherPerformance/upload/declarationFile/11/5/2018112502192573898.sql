/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : temp_teacher_performance

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-11-21 10:12:05
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='审核部门表';

-- ----------------------------
-- Records of audit
-- ----------------------------

-- ----------------------------
-- Table structure for audit_table
-- ----------------------------
DROP TABLE IF EXISTS `audit_table`;
CREATE TABLE `audit_table` (
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
  `authority_id` int(20) unsigned NOT NULL,
  `authorities` varchar(100) NOT NULL DEFAULT '',
  `user_info_id` int(10) unsigned NOT NULL COMMENT '用户信息ID',
  `display_name` varchar(50) NOT NULL DEFAULT '' COMMENT '展示名称',
  `img_url` varchar(255) NOT NULL DEFAULT '' COMMENT '头像URL',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT '电话',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  PRIMARY KEY (`audit_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='审核部门表';































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

-- ----------------------------
-- Table structure for grading_standard
-- ----------------------------
DROP TABLE IF EXISTS `grading_standard`;
CREATE TABLE `declaration_table` (
  `grading_standard_id` int(255) unsigned NOT NULL AUTO_INCREMENT COMMENT '评分标准ID',
  `grading_standard_content` varchar(255) NOT NULL DEFAULT '' COMMENT '评分标准内容',
  `observation_point_id` int(255) unsigned NOT NULL COMMENT '观测点ID',
  `observation_point_content` varchar(255) NOT NULL DEFAULT '' COMMENT '观测点内容',
  `evaluation_index_id` int(11) unsigned NOT NULL COMMENT '评估指标ID',
  `evaluation_index_content` varchar(255) NOT NULL DEFAULT '' COMMENT '评估指标内容',
  `college_id` int(11) unsigned NOT NULL COMMENT '所属学院ID', 
  `college_name` varchar(255) NOT NULL DEFAULT '' COMMENT '所属学院名称',
  `grading_basis` varchar(255) NOT NULL DEFAULT '' COMMENT '评分依据',
  `note` varchar(255) NOT NULL DEFAULT '' COMMENT '备注信息',
  `year` year(4) NOT NULL COMMENT '所属年份',
  `semester` tinyint(4) unsigned NOT NULL COMMENT '所属学期',
  `order_id` bigint(20) unsigned NOT NULL COMMENT '新业绩申报单ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '申请人用户ID',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '教师姓名',
  `audit_id` int(11) unsigned NOT NULL COMMENT '认证机构ID',
  `audit_name` varchar(255) NOT NULL DEFAULT '' COMMENT '认证机构的名称',
  `self_report_score` decimal(10,0) unsigned NOT NULL COMMENT '自评得分',
  `certified_score` decimal(10,0) unsigned NOT NULL COMMENT '被认证得分',
  `certified_note` varchar(255) NOT NULL COMMENT '认证备注',
  `status` tinyint(255) unsigned NOT NULL COMMENT '申报单状态：-1异常，0未申报，1新申报待认证，2已认证，3退回，4评分周期结束',
  `add_time` datetime NOT NULL COMMENT '申报时间',
  `certified_time` datetime NOT NULL COMMENT '被认证时间'
  PRIMARY KEY (`grading_standard_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='审核表';

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'mirage', '$2a$10$XefeuTFJsv3bi8QLxyUxFuK6/IctSn7DGA7cTHsebB6xbtuxc89t6', '1', '1', '1', '', '', '2018-11-08 16:29:50', '2018-11-08 16:29:50');
INSERT INTO `users` VALUES ('12', 'hdxy', '$2a$10$TlRZT9V5eDhEc0xEF4Lr3uKfbeeu8IWQ12hoR.jdbiUC3jWnEZUZG', '1', '1', '1', '', '', '2018-11-09 18:24:54', '2018-11-09 18:24:54');
INSERT INTO `users` VALUES ('13', 'xxgcxy', '$2a$10$MCqexzC8ENZFMXRnkc7Np.ywsKF0cfZMWj7aAuazFlDTnCHus1yHy', '1', '1', '1', '', '', '2018-11-09 18:10:30', '2018-11-09 18:10:30');
INSERT INTO `users` VALUES ('14', '00001', '$2a$10$MCqexzC8ENZFMXRnkc7Np.ywsKF0cfZMWj7aAuazFlDTnCHus1yHy', '1', '1', '1', null, null, null, null);

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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            