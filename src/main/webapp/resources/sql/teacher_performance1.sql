/*
Navicat MySQL Data Transfer

Source Server         : 上海
Source Server Version : 50722
Source Host           : 47.100.49.61:3306
Source Database       : teacher_performance

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-12-06 16:57:55
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
  UNIQUE KEY `admin_name` (`admin_name`),
  UNIQUE KEY `user_id_2` (`user_id`),
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员表';

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
  UNIQUE KEY `college_id` (`college_id`,`audit_name`),
  KEY `audit_name` (`audit_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='审核部门表';

-- ----------------------------
-- Records of audit
-- ----------------------------
INSERT INTO `audit` VALUES ('1', '信息工程学院教务处', '11', '17', '信息工程学院教务处');
INSERT INTO `audit` VALUES ('3', '信息工程学院办公室', '11', '18', '信息工程学院办公室');

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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户权限表';

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES ('1', '1', 'ROLE_ADMIN');
INSERT INTO `authorities` VALUES ('12', '12', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('13', '13', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('14', '17', 'ROLE_AUDIT');
INSERT INTO `authorities` VALUES ('15', '18', 'ROLE_AUDIT');
INSERT INTO `authorities` VALUES ('19', '23', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('20', '24', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('21', '25', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('22', '26', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('23', '27', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('24', '28', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('25', '29', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('26', '30', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('27', '31', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('28', '32', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('29', '33', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('30', '34', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('31', '35', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('32', '36', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('33', '37', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('34', '38', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('35', '39', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('36', '40', 'ROLE_COLLEGE');
INSERT INTO `authorities` VALUES ('37', '41', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('38', '42', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('39', '43', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('40', '44', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('41', '45', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('42', '46', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('43', '47', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('44', '48', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('45', '49', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('46', '50', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('47', '51', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('48', '52', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('49', '53', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('50', '54', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('51', '55', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('52', '56', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('53', '57', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('54', '58', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('55', '59', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('56', '60', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('57', '61', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('58', '62', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('59', '63', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('60', '64', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('61', '65', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('62', '66', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('63', '67', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('64', '68', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('65', '69', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('66', '70', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('67', '71', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('68', '72', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('69', '73', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('70', '74', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('71', '75', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('72', '76', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('73', '77', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('74', '78', 'ROLE_TEACHER');
INSERT INTO `authorities` VALUES ('75', '79', 'ROLE_TEACHER');

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college` (
  `college_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '学院自增ID',
  `user_id` int(11) unsigned NOT NULL COMMENT '学院对应的用户ID',
  `college_name` varchar(50) NOT NULL DEFAULT '' COMMENT '学院名称',
  PRIMARY KEY (`college_id`) USING BTREE,
  UNIQUE KEY `college_name` (`college_name`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='学院信息表';

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES ('11', '12', '信息工程学院');
INSERT INTO `college` VALUES ('12', '13', '邯郸学院');
INSERT INTO `college` VALUES ('17', '25', '外国语学院');
INSERT INTO `college` VALUES ('18', '26', '化学化工与材料学院');
INSERT INTO `college` VALUES ('19', '27', '机电学院');
INSERT INTO `college` VALUES ('20', '28', '教育学院');
INSERT INTO `college` VALUES ('21', '29', '经济管理学院');
INSERT INTO `college` VALUES ('22', '30', '软件学院');
INSERT INTO `college` VALUES ('23', '31', '社会科学教学部');
INSERT INTO `college` VALUES ('24', '32', '电子信息工程实验与实训中心');
INSERT INTO `college` VALUES ('25', '33', '数理学院');
INSERT INTO `college` VALUES ('26', '34', '太极文化学院');
INSERT INTO `college` VALUES ('27', '35', '体育学院');
INSERT INTO `college` VALUES ('28', '36', '文史学院');
INSERT INTO `college` VALUES ('29', '37', '夏青传媒学院');
INSERT INTO `college` VALUES ('30', '38', '艺术学院');
INSERT INTO `college` VALUES ('31', '39', '行政教辅');
INSERT INTO `college` VALUES ('32', '40', '生命科学与工程学院');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评估指标（一级分类）表';

-- ----------------------------
-- Records of evaluation_index
-- ----------------------------
INSERT INTO `evaluation_index` VALUES ('4', '承担教育教学工作量情况', '11', '2018', '1');
INSERT INTO `evaluation_index` VALUES ('5', '教学工作延伸', '11', '2018', '1');
INSERT INTO `evaluation_index` VALUES ('6', '师资队伍建设', '11', '2018', '1');
INSERT INTO `evaluation_index` VALUES ('8', '开展教学研究与教学改革及获奖情况', '11', '2018', '1');
INSERT INTO `evaluation_index` VALUES ('9', '其它创新工作', '11', '2018', '1');

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
  KEY `evaluation_index_id` (`evaluation_index_id`) USING BTREE,
  KEY `audit_id` (`audit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评分标准表';

-- ----------------------------
-- Records of grading_standard
-- ----------------------------
INSERT INTO `grading_standard` VALUES ('6', '4', '4', '11', '3', '1分×K1×K2×K3（K1为课程类别系数：学校新开设课程为1.5，新上课程为1.3，其他课程为1.1；K2为授课班学生人数系数：学生人数小于60为1，每增加10人递增0.1；K3为每门课的总课时', '相关教学文件', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('7', '4', '5', '11', '3', '实验课程：1分×K1×K2×K3（K1为课程类别系数：学校新开设课程为1.5，新上课程为1.2，其他课程为1.1课时，K2为授课班学生人数系数：学生人数小于60为1，每增加10人递增0.1；K3为每门课的总课时\n实训课程：1分×K1×K2×K3 ；（K1为课程类别系数：学校新开设课程为1.5，其他课程为1.1；K2为授课班学生人数系数：学生人数小于60为1，每增加10人递增0.1；K3为每门课的总课时\n', '相关教学文件', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('8', '4', '6', '11', '3', '教学计划内监考为1分/场（含英语四、六级监考）；巡考人员0.5分/次,考务人员0.5分/次', '考务安排及相关资料', '指教学计划内的期末考试监考工作。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('9', '4', '7', '11', '3', '实习指导0.5分/每生（最多不超过15分）', '实习周志', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('10', '4', '7', '11', '3', '导师制0.5分/生（最多不超过20分）', '实践方案、相关佐证材料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('11', '4', '7', '11', '3', '指导本科生0.5分/每生', '网上周志', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('12', '4', '7', '11', '3', '指导小组学生人数*2/小组导师人数', '启航书院导师人员名单', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('13', '4', '8', '11', '1', '2分×K1×K2/篇（K1为学科类别系数：人文学科为4，理工学科为5；K2为毕业论文级别系数：一般毕业论文为1，优秀毕业论文为1.2，每人指导论文篇数不超过8篇）', '论文指导资料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('14', '4', '8', '11', '1', '参与答辩0.2分/生', '答辩签到表', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('15', '4', '9', '11', '1', '1分/每生', '各专业短学期安排（系主任签字）', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('16', '4', '10', '11', '1', '主讲教师5分/课时，听讲教师1分/课时（信工教师教学大赛预赛）', '需要提供主讲教师讲课资料，听讲教师听课记录\n', '\n', '2018', '1');
INSERT INTO `grading_standard` VALUES ('17', '4', '10', '11', '1', '讲评课10分/天', '需要提供全勤记录、听课记录', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('18', '4', '11', '11', '1', '1分/课时，最高不超过10分', '需要提供听课班级学委及任课教师的签字或其它证明、听课记录', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('19', '5', '12', '11', '3', '国家级：10分/项;省级：8分/项; 校级：5分/项', '荣誉证书及相关资料', '指在本轮评教周期内指导学生完成的大学生创业训练项目、开放实验室项目、学理论项目等。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('20', '5', '13', '11', '3', '社会实践1-5分/项；社团活动（学校规定的）1-5分/项', '需要提供指导学生名单、实践内容、方案，需要信工团委提供相关佐证材料。', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('21', '5', '14', '11', '3', '完成省级重点实验室申报材料，负责人10分，前三名参与人8分/人 ；获批，负责人12分，参与人10分/人；完成市级重点实验室申报材料，负责人8分，前三名参与人6分/人 ；获批，负责人10分，前三名参与人8分/人；完成校级实验室申报材料，负责人6分，前三名参与人4分/人 ；获批，负责人8分，前三名参与人6分/人；（前三名按工作量由主持人确定，取最高分，不累积加分）', '需要提供申报材料/批文', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('22', '5', '14', '11', '3', '完成新建实验室申报材料，负责人8分，参与人6分/人 ', '需要提供申报材料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('23', '5', '15', '11', '3', '新建基地申报：负责人2分/个，参与人１分／个', '需要提供基地协议（本学年新建的，有建设经费的，需要有学校文件）', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('24', '5', '16', '11', '3', '5分×K5/项（K5为获奖级别系数：国际级奖为5、国家级一等奖为5、国家级二等奖为3、国家级三等奖为2、省级一等奖为2、省级二等奖为1.5、省级三等奖为1、校级一等奖为0.6、二等奖为0.4、三等奖为0.2）', '获奖证书', '数学建模竞赛奖、“挑战杯”本科大学生课外学术科技作品竞赛、创业计划大赛奖等学校、省教育厅、教育部等各级政府管理部门组织评定的奖项按原等级认定，国家一级学会（如数学学会等）组织的学科竞赛奖项也按原等级认定，其他民间团体组织评定的奖项降低一个等级。 ', '2018', '1');
INSERT INTO `grading_standard` VALUES ('25', '5', '17', '11', '3', '二级学院分管教学院长14分/学期，系主任12分/学期，实验室主任10分/学期，系、实验室副主任10分/学期，教学秘书12分/学期（以上各项同时任多职者，取最高分，不累计加分）', '信息工程学院领导分工为准', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('26', '5', '18', '11', '3', '学生管理人员8分/学期，兼职辅导员：本科0.1分/生，五年制0.2分/生（以上各项同时任多职者，取最高分，不累计加分）', '邯郸学院任命文件', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('27', '5', '19', '11', '1', '教学督导6分/学期；质量监控2分/半天（与教学检查相关的活动）', '邯郸学院文件、承担的工作证明', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('28', '6', '20', '11', '1', '参加教师培训3分/次；指导青年教师5分/人/学期', '提供培训资料、指导记录', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('29', '6', '20', '11', '1', '参加会议，国家级：3分/次；省级：2分/次，其他1分/次。均不封顶', '提供参会资料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('30', '6', '20', '11', '1', '会议发言，国家级：5分/次；省级：3分/次（均不封顶，取最高分，不重复计分）', '提供参会资料及发言资料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('31', '6', '20', '11', '1', '参加教研活动：1分/次', '提供教研活动签到记录及相关资料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('32', '6', '21', '11', '1', '10分/学期', '人事处认定的实践锻炼相关材料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('33', '8', '22', '11', '3', '国家级：20分/项；省级：重大项目（示范）15分/项，重点项目10分/项，一般项目6分/项；市级：重大项目（示范）12分/项，重点项目8分/项，一般项目5分/项；校级：重大项目10分/项，重点项目5分/项，一般项目3分/项；', '国家级：20分/项；省级：重大项目（示范）15分/项，重点项目10分/项，一般项目6分/项；市级：重大项目（示范）12分/项，重点项目8分/项，一般项目5分/项；校级：重大项目10分/项，重点项目5分/项，一般项目3分/项；', '指在本轮评教周期内结题的教改项目。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('34', '8', '23', '11', '3', 'B类期刊15分/篇，C类期刊12分/篇，核心期刊10分/篇，其他期刊6分/篇；参与者：乘以0.8/篇；', '发表的文章', '教师发表的论文如果界定为教研论文，则该论文不能申报科研论文评奖。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('35', '8', '24', '11', '1', '国家规划教材20分/部，其他教材、教研著作、工具书等12分/每部', '出版物', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('36', '8', '25', '11', '1', '一等奖7分/项，二等奖5分/项，三等奖3分/项', '荣誉证书', '校内教学专项获奖包括青年教师比赛获奖（含单项：课件奖、教案奖等）教学改革标兵。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('37', '8', '26', '11', '3', '国家级：一等奖9分/项，二等奖6分/项，三等奖4分/项；\n省级：一等奖6分/项，二等奖4分/项，三等奖2分/项；市级：一等奖5分/项，二等奖3分/项，三等奖1分/项\n', '获奖证书', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('38', '8', '27', '11', '1', '主持人：国家级：特等奖50分/项，一等奖30分/项，二等奖20分/项，三等奖15分/项；省级：一等奖15分/项，二等奖10分/项，三等奖8分/项；市级：一等奖12分/项，二等奖8分/项，三等奖6分/项；校级：一等奖5分/项，二等奖3分/项，三等奖1分/项;', '获奖证书', '教学成果奖指学校、省教育厅、国家教育部定期评选的教学成果奖。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('39', '8', '28', '11', '3', '主持人：国家级：一等奖30分/项，二等奖20分/项，三等奖15分/项；省级：一等奖15分/项，二等奖10分/项，三等奖8分/项；市级：一等奖12分/项，二等奖8分/项，三等奖6分/项；校级：一等奖5分/项，二等奖3分/项，三等奖1分/项；', '获奖证书', '教研成果奖指学校、各级政府教研管理部门评选的教育科学研究成果奖。教研成果不能重复申报各类科研成果奖。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('40', '8', '29', '11', '3', '主持人：国家级30分/项，省级20分/项，市级15分/项，校级（质量工程）10分/每项', '立项书/相关文件等资料', '质量工程包括精品课、重点学科、优秀教学团队、各级示范课等。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('41', '8', '30', '11', '3', '获批项目：重大项目主持人20分/项;重点项目主持人15分/项；一般项目主持人10分/项。结项项目：重大项目：主持人22分/项;重点项目：主持人17分/项；一般项目：主持人12分/项（为项目组成员，由主持人推荐；获批与结项项目不重复得分，最高不超过50分）', '立项文件及结项资料', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('42', '8', '31', '11', '3', '国家级15分/项，省级10分/项，市级8分/项，校级5分/项', '获奖证书', '指教师个人获得的各级教学名师、师德师风先进个人、师德标兵等教学工作荣誉称号。', '2018', '1');
INSERT INTO `grading_standard` VALUES ('43', '9', '32', '11', '3', '完成申报：负责人10分，参与人6分/人; 专业获批：负责人12分，参与人8分（取最高分，不累积加分）', '申报材料/批文', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('44', '9', '33', '11', '1', '完成验收：负责人8分，参与人6分/人; ', '验收材料/通过验收文件', '', '2018', '1');
INSERT INTO `grading_standard` VALUES ('45', '9', '34', '11', '1', '完成申报：负责人10分，参与人6分/人（由负责人确认3人）', '申报材料/通过文件', '', '2018', '1');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='登录日志表';

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
  KEY `college_id` (`college_id`) USING BTREE,
  KEY `evaluation_index_id` (`evaluation_index_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='主要观测点（二级分类）表';

-- ----------------------------
-- Records of observation_point
-- ----------------------------
INSERT INTO `observation_point` VALUES ('4', '4', '讲授理论课程', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('5', '4', '讲授实验、实训课程', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('6', '4', '考务工作', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('7', '4', '指导实习/教学实践/本科生导师/启航书院导师', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('8', '4', '指导毕业论文', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('9', '4', '指导短学期', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('10', '4', '参加教学观摩活动（包括讲评课）', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('11', '4', '教师间相互听课', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('12', '5', '指导学生完成创新创业项目', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('13', '5', '指导学生社团及社会实践活动', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('14', '5', '实验实训室建设', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('15', '5', '校外实践基地建设', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('16', '5', '指导学生课外学术科技活动获奖', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('17', '5', '兼职教学管理工作', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('18', '5', '兼职学生管理工作', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('19', '5', '兼职教学质量监控工作', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('20', '6', '教师培训与指导', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('21', '6', '教师参加实践锻炼', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('22', '8', '完成教改项目', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('23', '8', '发表教研论文', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('24', '8', '出版教材或教研著作', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('25', '8', '获得校内教学专项奖', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('26', '8', '获得各级教学竞赛奖', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('27', '8', '获得教学成果奖', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('28', '8', '获得教研成果奖', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('29', '8', '获批“质量工程”', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('30', '8', '综合改革项目建设', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('31', '8', '获得各级工作荣誉称号', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('32', '9', '专业申报', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('33', '9', '学士学位验收', '11', '2018', '1');
INSERT INTO `observation_point` VALUES ('34', '9', '科研平台创建', '11', '2018', '1');

-- ----------------------------
-- Table structure for order_
-- ----------------------------
DROP TABLE IF EXISTS `order_`;
CREATE TABLE `order_` (
  `order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '新业绩申报单ID',
  `teacher_id` int(11) unsigned NOT NULL COMMENT '申请人教师ID',
  `grading_standard_id` int(11) unsigned NOT NULL COMMENT '观测点的评分标准ID',
  `audit_id` int(11) unsigned NOT NULL COMMENT '认证机构ID',
  `self_report_score` decimal(10,2) unsigned NOT NULL COMMENT '自评得分',
  `certified_score` decimal(10,2) unsigned DEFAULT NULL COMMENT '被认证得分',
  `certified_note` varchar(255) DEFAULT NULL COMMENT '认证备注',
  `status` tinyint(255) unsigned NOT NULL DEFAULT '0' COMMENT '申报单状态：-1异常，0未申报，1新申报待认证，2已认证，3退回，4评分周期结束',
  `add_time` datetime NOT NULL COMMENT '申报时间',
  `certified_time` datetime DEFAULT NULL COMMENT '被认证时间',
  `year` int(4) NOT NULL COMMENT '所属年份',
  `semester` int(4) unsigned NOT NULL COMMENT '所属学期',
  `declaration_note` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  UNIQUE KEY `grading_standard_id_2` (`grading_standard_id`,`teacher_id`,`year`,`semester`) USING BTREE,
  KEY `user_id` (`teacher_id`) USING BTREE,
  KEY `grading_standard_id` (`grading_standard_id`) USING BTREE,
  KEY `audit_id` (`audit_id`) USING BTREE,
  KEY `year` (`year`),
  KEY `semester` (`semester`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='新业绩申报单表';

-- ----------------------------
-- Records of order_
-- ----------------------------
INSERT INTO `order_` VALUES ('11', '5', '6', '3', '112.00', null, 'test', '1', '2018-11-29 02:06:22', '2018-11-29 05:08:23', '2018', '1', 'test');
INSERT INTO `order_` VALUES ('13', '6', '7', '3', '101.86', null, null, '1', '2018-11-27 21:45:05', null, '2017', '1', '⑴2017-2018-1学期（小计101.86分）\n①2015级网络工程33人《综合布线与系统集成》：1*1.1*1*64=70.4\n②开放实验《程序设计大赛集训》：1*1.1*1*19=20.9\n③开放实验《计算机组装维护》：1*1.1*1.1*16=19.36');
INSERT INTO `order_` VALUES ('16', '6', '8', '3', '6.00', '6.00', '考务安排及相关资料', '2', '2018-11-27 21:49:03', '2018-11-29 13:11:49', '2018', '1', '考务安排及相关资料');
INSERT INTO `order_` VALUES ('17', '6', '9', '3', '30.00', '0.00', '30', '3', '2018-11-28 16:54:38', '2018-11-29 13:11:32', '2018', '1', '30');
INSERT INTO `order_` VALUES ('18', '6', '6', '3', '11.00', '4.00', '23', '1', '2018-11-28 19:24:36', '2018-11-29 05:08:44', '2018', '1', '23');

-- ----------------------------
-- Table structure for order_file
-- ----------------------------
DROP TABLE IF EXISTS `order_file`;
CREATE TABLE `order_file` (
  `order_file_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '申请单文件ID',
  `order_id` bigint(20) unsigned NOT NULL COMMENT '申请单ID',
  `teacher_id` int(10) unsigned NOT NULL COMMENT '提交的教师Id',
  `save_file_name` varchar(255) NOT NULL DEFAULT '' COMMENT '服务器保存的文件名称',
  `origin_file_name` varchar(255) NOT NULL DEFAULT '' COMMENT '上次时原始的文件名称',
  `size` bigint(20) unsigned NOT NULL COMMENT '文件大小，单位为B',
  `file_url` varchar(255) NOT NULL DEFAULT '' COMMENT '服务器中文件的URl',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`order_file_id`) USING BTREE,
  KEY `order_id` (`order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='申请单文件表';

-- ----------------------------
-- Records of order_file
-- ----------------------------
INSERT INTO `order_file` VALUES ('3', '0', '5', '2018112415550997808.sql', 'temp_teacher_performance2.sql', '0', '/upload/declarationFile/11/5/2018112415550997808.sql', '2018-11-24 15:55:09');
INSERT INTO `order_file` VALUES ('6', '4', '5', '2018112501474338191.doc', '20150410103004_马博韬.doc', '0', '/upload/declarationFile/11/5/2018112501474338191.doc', '2018-11-25 01:47:44');
INSERT INTO `order_file` VALUES ('7', '4', '5', '2018112501474476929.exe', 'TeamViewer_Setup.exe', '0', '/upload/declarationFile/11/5/2018112501474476929.exe', '2018-11-25 01:47:45');
INSERT INTO `order_file` VALUES ('8', '5', '5', '2018112502192583476.sql', 'teacher_performance3.sql', '0', '/upload/declarationFile/11/5/2018112502192583476.sql', '2018-11-25 02:19:25');
INSERT INTO `order_file` VALUES ('9', '5', '5', '2018112502192573898.sql', 'temp_teacher_performance2.sql', '0', '/upload/declarationFile/11/5/2018112502192573898.sql', '2018-11-25 02:19:25');
INSERT INTO `order_file` VALUES ('10', '5', '5', '2018112502192590757.jpg', '王皆.jpg', '0', '/upload/declarationFile/11/5/2018112502192590757.jpg', '2018-11-25 02:19:25');
INSERT INTO `order_file` VALUES ('14', '0', '5', '2018112520092684091.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520092684091.png', '2018-11-25 20:09:26');
INSERT INTO `order_file` VALUES ('15', '0', '5', '2018112520092686711.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520092686711.png', '2018-11-25 20:09:26');
INSERT INTO `order_file` VALUES ('16', '0', '5', '2018112520092652587.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520092652587.xml', '2018-11-25 20:09:26');
INSERT INTO `order_file` VALUES ('17', '0', '5', '2018112520092647094.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520092647094.png', '2018-11-25 20:09:26');
INSERT INTO `order_file` VALUES ('18', '0', '5', '2018112520103572858.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520103572858.png', '2018-11-25 20:10:35');
INSERT INTO `order_file` VALUES ('19', '0', '5', '2018112520103545823.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520103545823.png', '2018-11-25 20:10:35');
INSERT INTO `order_file` VALUES ('20', '0', '5', '2018112520103543181.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520103543181.xml', '2018-11-25 20:10:35');
INSERT INTO `order_file` VALUES ('21', '0', '5', '2018112520103511498.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520103511498.png', '2018-11-25 20:10:35');
INSERT INTO `order_file` VALUES ('22', '0', '5', '2018112520170590535.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520170590535.png', '2018-11-25 20:17:05');
INSERT INTO `order_file` VALUES ('23', '0', '5', '2018112520170598403.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520170598403.xml', '2018-11-25 20:17:05');
INSERT INTO `order_file` VALUES ('24', '0', '5', '2018112520170568874.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520170568874.png', '2018-11-25 20:17:05');
INSERT INTO `order_file` VALUES ('25', '0', '5', '2018112520170567687.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520170567687.png', '2018-11-25 20:17:05');
INSERT INTO `order_file` VALUES ('26', '0', '5', '2018112520204340401.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520204340401.png', '2018-11-25 20:20:44');
INSERT INTO `order_file` VALUES ('27', '0', '5', '2018112520204355544.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520204355544.png', '2018-11-25 20:20:44');
INSERT INTO `order_file` VALUES ('28', '0', '5', '2018112520204313460.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520204313460.png', '2018-11-25 20:20:44');
INSERT INTO `order_file` VALUES ('29', '0', '5', '2018112520204337298.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520204337298.xml', '2018-11-25 20:20:44');
INSERT INTO `order_file` VALUES ('30', '0', '5', '2018112520224451937.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520224451937.png', '2018-11-25 20:22:45');
INSERT INTO `order_file` VALUES ('31', '0', '5', '2018112520224425791.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520224425791.png', '2018-11-25 20:22:45');
INSERT INTO `order_file` VALUES ('32', '0', '5', '2018112520224439549.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520224439549.png', '2018-11-25 20:22:45');
INSERT INTO `order_file` VALUES ('33', '0', '5', '2018112520224486889.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520224486889.xml', '2018-11-25 20:22:45');
INSERT INTO `order_file` VALUES ('34', '0', '5', '2018112520441088445.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520441088445.png', '2018-11-25 20:44:11');
INSERT INTO `order_file` VALUES ('35', '0', '5', '2018112520441084249.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520441084249.png', '2018-11-25 20:44:11');
INSERT INTO `order_file` VALUES ('36', '0', '5', '2018112520441059013.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520441059013.png', '2018-11-25 20:44:11');
INSERT INTO `order_file` VALUES ('37', '0', '5', '2018112520441058408.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520441058408.xml', '2018-11-25 20:44:11');
INSERT INTO `order_file` VALUES ('38', '0', '5', '2018112520441295779.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520441295779.png', '2018-11-25 20:44:12');
INSERT INTO `order_file` VALUES ('39', '0', '5', '2018112520441265629.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520441265629.png', '2018-11-25 20:44:12');
INSERT INTO `order_file` VALUES ('40', '0', '5', '2018112520441242477.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520441242477.png', '2018-11-25 20:44:12');
INSERT INTO `order_file` VALUES ('41', '0', '5', '2018112520441257027.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520441257027.xml', '2018-11-25 20:44:12');
INSERT INTO `order_file` VALUES ('42', '0', '5', '2018112520442491440.png', 'fly.png', '0', '/upload/declarationFile/11/5/2018112520442491440.png', '2018-11-25 20:44:25');
INSERT INTO `order_file` VALUES ('43', '0', '5', '2018112520442414578.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112520442414578.png', '2018-11-25 20:44:25');
INSERT INTO `order_file` VALUES ('44', '0', '5', '2018112520442415001.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520442415001.xml', '2018-11-25 20:44:25');
INSERT INTO `order_file` VALUES ('45', '0', '5', '2018112520442441315.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520442441315.png', '2018-11-25 20:44:25');
INSERT INTO `order_file` VALUES ('48', '0', '5', '2018112520445687960.png', 'layui.png', '0', '/upload/declarationFile/11/5/2018112520445687960.png', '2018-11-25 20:44:56');
INSERT INTO `order_file` VALUES ('49', '0', '5', '2018112520445621277.xml', 'web.xml', '0', '/upload/declarationFile/11/5/2018112520445621277.xml', '2018-11-25 20:44:56');
INSERT INTO `order_file` VALUES ('52', '0', '5', '2018112611011539204.png', 'git.png', '0', '/upload/declarationFile/11/5/2018112611011539204.png', '2018-11-26 11:01:15');
INSERT INTO `order_file` VALUES ('60', '9', '5', '2018112618423340735.png', 'git.png', '2094', '/upload/declarationFile/11/5/2018112618423340735.png', '2018-11-26 18:42:34');
INSERT INTO `order_file` VALUES ('61', '9', '5', '2018112712292240887.png', 'layui.png', '2855', '/upload/declarationFile/11/5/2018112712292240887.png', '2018-11-27 12:29:23');
INSERT INTO `order_file` VALUES ('62', '9', '5', '2018112712292479427.png', 'layui.png', '2855', '/upload/declarationFile/11/5/2018112712292479427.png', '2018-11-27 12:29:24');
INSERT INTO `order_file` VALUES ('63', '9', '5', '2018112712292421830.png', 'layui.png', '2855', '/upload/declarationFile/11/5/2018112712292421830.png', '2018-11-27 12:29:25');
INSERT INTO `order_file` VALUES ('64', '9', '5', '2018112712294591010.png', 'layui.png', '2855', '/upload/declarationFile/11/5/2018112712294591010.png', '2018-11-27 12:29:45');
INSERT INTO `order_file` VALUES ('65', '0', '5', '2018112712345520511.xml', 'web.xml', '1851', '/upload/declarationFile/11/5/2018112712345520511.xml', '2018-11-27 12:34:56');
INSERT INTO `order_file` VALUES ('66', '11', '6', '2018112721155096747.png', 'fly.png', '2781', '/upload/declarationFile/11/6/2018112721155096747.png', '2018-11-27 21:15:50');
INSERT INTO `order_file` VALUES ('67', '0', '6', '2018112721155066974.png', 'layui.png', '2855', '/upload/declarationFile/11/6/2018112721155066974.png', '2018-11-27 21:15:50');
INSERT INTO `order_file` VALUES ('68', '0', '6', '2018112721155042370.png', 'git.png', '2094', '/upload/declarationFile/11/6/2018112721155042370.png', '2018-11-27 21:15:50');
INSERT INTO `order_file` VALUES ('69', '11', '6', '2018112721155021293.xml', 'web.xml', '1851', '/upload/declarationFile/11/6/2018112721155021293.xml', '2018-11-27 21:15:50');
INSERT INTO `order_file` VALUES ('70', '13', '6', '2018112721450497032.png', 'fly.png', '2781', '/upload/declarationFile/11/6/2018112721450497032.png', '2018-11-27 21:45:04');
INSERT INTO `order_file` VALUES ('71', '13', '6', '2018112721450432888.png', 'layui.png', '2855', '/upload/declarationFile/11/6/2018112721450432888.png', '2018-11-27 21:45:04');
INSERT INTO `order_file` VALUES ('72', '13', '6', '2018112721450448882.png', 'git.png', '2094', '/upload/declarationFile/11/6/2018112721450448882.png', '2018-11-27 21:45:04');
INSERT INTO `order_file` VALUES ('73', '13', '6', '2018112721450441524.xml', 'web.xml', '1851', '/upload/declarationFile/11/6/2018112721450441524.xml', '2018-11-27 21:45:04');
INSERT INTO `order_file` VALUES ('74', '16', '6', '2018112721490191113.png', 'git.png', '2094', '/upload/declarationFile/11/6/2018112721490191113.png', '2018-11-27 21:49:01');
INSERT INTO `order_file` VALUES ('75', '17', '6', '2018112721492356951.png', 'git.png', '2094', '/upload/declarationFile/11/6/2018112721492356951.png', '2018-11-27 21:49:23');
INSERT INTO `order_file` VALUES ('76', '11', '6', '2018112722385580116.png', 'git.png', '2094', '/upload/declarationFile/11/6/2018112722385580116.png', '2018-11-27 22:38:56');
INSERT INTO `order_file` VALUES ('77', '17', '5', '2018112816543349442.png', 'layui.png', '2855', '/upload/declarationFile/11/5/2018112816543349442.png', '2018-11-28 16:54:34');
INSERT INTO `order_file` VALUES ('78', '0', '6', '2018112911543299848.png', 'git.png', '2094', '/upload/declarationFile/11/6/2018112911543299848.png', '2018-11-29 11:54:32');

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config` (
  `system_config_id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '配置的KEY值',
  `value` varchar(512) NOT NULL COMMENT '配置的value值',
  `type` varchar(50) NOT NULL COMMENT '配置的分类',
  `desc` varchar(255) DEFAULT NULL COMMENT '配置的描述',
  PRIMARY KEY (`system_config_id`),
  UNIQUE KEY `name` (`name`) USING BTREE,
  KEY `name_2` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='系统配置表';

-- ----------------------------
-- Records of system_config
-- ----------------------------
INSERT INTO `system_config` VALUES ('1', 'open', '1', 'base', '系统是否开启：0关闭，1开启');
INSERT INTO `system_config` VALUES ('2', 'year', '2018', 'base', '系统当前年份');
INSERT INTO `system_config` VALUES ('3', 'semester', '1', 'base', '系统当前学期');

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
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `college_id` (`college_id`),
  KEY `teacher_title_id` (`teacher_title_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师表';

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('5', '23', '李四', '00102', '2', '11');
INSERT INTO `teacher` VALUES ('6', '24', '测试教师账号', '01234', '4', '11');
INSERT INTO `teacher` VALUES ('7', '41', '王璐', '01031021', '2', '11');
INSERT INTO `teacher` VALUES ('8', '42', '陈建春', '04011005', '4', '11');
INSERT INTO `teacher` VALUES ('9', '43', '陈卓夷', '04011007', '8', '11');
INSERT INTO `teacher` VALUES ('10', '44', '王亚楠', '04011009', '4', '11');
INSERT INTO `teacher` VALUES ('11', '45', '李晨', '04011010', '2', '11');
INSERT INTO `teacher` VALUES ('12', '46', '司玲玲', '04011011', '4', '11');
INSERT INTO `teacher` VALUES ('13', '47', '徐贵军', '04011013', '2', '11');
INSERT INTO `teacher` VALUES ('14', '48', '丁万宁', '04011014', '2', '11');
INSERT INTO `teacher` VALUES ('15', '49', '李慧', '04011015', '2', '11');
INSERT INTO `teacher` VALUES ('16', '50', '李涛', '04011016', '2', '11');
INSERT INTO `teacher` VALUES ('17', '51', '郑卫华', '04011025', '4', '11');
INSERT INTO `teacher` VALUES ('18', '52', '周明姬', '04011027', '4', '11');
INSERT INTO `teacher` VALUES ('19', '53', '贾电如', '04011029', '2', '11');
INSERT INTO `teacher` VALUES ('20', '54', '贾利敏', '04011030', '2', '11');
INSERT INTO `teacher` VALUES ('21', '55', '梁硕', '04011033', '2', '11');
INSERT INTO `teacher` VALUES ('22', '56', '董暾', '04021010', '8', '11');
INSERT INTO `teacher` VALUES ('23', '57', '赵燕', '04021016', '8', '11');
INSERT INTO `teacher` VALUES ('24', '58', '王超', '04021017', '1', '11');
INSERT INTO `teacher` VALUES ('25', '59', '王旭辉', '04031002', '4', '11');
INSERT INTO `teacher` VALUES ('26', '60', '郭红俊', '04031003', '4', '11');
INSERT INTO `teacher` VALUES ('27', '61', '张志来', '04031004', '2', '11');
INSERT INTO `teacher` VALUES ('28', '62', '贾素梅', '04031005', '2', '11');
INSERT INTO `teacher` VALUES ('29', '63', '王薇', '04031007', '2', '11');
INSERT INTO `teacher` VALUES ('30', '64', '姜韶军', '04031008', '2', '11');
INSERT INTO `teacher` VALUES ('31', '65', '王苗苗', '04031010', '2', '11');
INSERT INTO `teacher` VALUES ('32', '66', '李娜', '04031011', '2', '11');
INSERT INTO `teacher` VALUES ('33', '67', '王洁丽', '04031014', '2', '11');
INSERT INTO `teacher` VALUES ('34', '68', '李国玉', '04031016', '4', '11');
INSERT INTO `teacher` VALUES ('35', '69', '田俊芳', '04031018', '2', '11');
INSERT INTO `teacher` VALUES ('36', '70', '王智慧', '16011004', '2', '11');
INSERT INTO `teacher` VALUES ('37', '71', '焦洪强', '16011012', '2', '11');
INSERT INTO `teacher` VALUES ('38', '72', '韩翔宇', '20140036', '1', '11');
INSERT INTO `teacher` VALUES ('39', '73', '刘翠翠', '20140037', '1', '11');
INSERT INTO `teacher` VALUES ('40', '74', '王晓琳', '20140038', '1', '11');
INSERT INTO `teacher` VALUES ('41', '75', '谢飞', '20140040', '1', '11');
INSERT INTO `teacher` VALUES ('42', '76', '闫双双', '20150071', '1', '11');
INSERT INTO `teacher` VALUES ('43', '77', '闫芳园', '20150078', '1', '11');
INSERT INTO `teacher` VALUES ('44', '78', '石亚超', '20150079', '1', '11');
INSERT INTO `teacher` VALUES ('45', '79', '刘玉英', '20150092', '1', '11');

-- ----------------------------
-- Table structure for teacher_title
-- ----------------------------
DROP TABLE IF EXISTS `teacher_title`;
CREATE TABLE `teacher_title` (
  `teacher_title_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '教师职称ID',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '教师职称名称',
  `desc_` varchar(255) NOT NULL DEFAULT '' COMMENT '教师职称描述',
  PRIMARY KEY (`teacher_title_id`) USING BTREE,
  UNIQUE KEY `name_2` (`name`),
  KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='教师职称表';

-- ----------------------------
-- Records of teacher_title
-- ----------------------------
INSERT INTO `teacher_title` VALUES ('1', '无', '无');
INSERT INTO `teacher_title` VALUES ('2', '讲师', '讲师职称');
INSERT INTO `teacher_title` VALUES ('4', '副教授', '副教授职称\n');
INSERT INTO `teacher_title` VALUES ('8', '教授', '教授');

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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户信息表';

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '1', '管理员', '12', '13082070520', '905884644@qq.com');
INSERT INTO `user_info` VALUES ('12', '12', '信息工程学院', '', '', '');
INSERT INTO `user_info` VALUES ('13', '13', '信息工程学院', '', '', '');
INSERT INTO `user_info` VALUES ('18', '17', '邯郸学院教务处', '', '', '');
INSERT INTO `user_info` VALUES ('20', '18', '邯郸学院办公室', '', '', '');
INSERT INTO `user_info` VALUES ('21', '19', '张三1', '', '', '');
INSERT INTO `user_info` VALUES ('25', '23', '李四', '', '', '');
INSERT INTO `user_info` VALUES ('26', '24', '测试教师账号', '', '', '');
INSERT INTO `user_info` VALUES ('27', '25', '外国语学院', '', '', '');
INSERT INTO `user_info` VALUES ('28', '26', '化学化工与材料学院', '', '', '');
INSERT INTO `user_info` VALUES ('29', '27', '机电学院', '', '', '');
INSERT INTO `user_info` VALUES ('30', '28', '教育学院', '', '', '');
INSERT INTO `user_info` VALUES ('31', '29', '经济管理学院', '', '', '');
INSERT INTO `user_info` VALUES ('32', '30', '软件学院', '', '', '');
INSERT INTO `user_info` VALUES ('33', '31', '社会科学教学部', '', '', '');
INSERT INTO `user_info` VALUES ('34', '32', '电子信息工程实验与实训中心', '', '', '');
INSERT INTO `user_info` VALUES ('35', '33', '数理学院', '', '', '');
INSERT INTO `user_info` VALUES ('36', '34', '太极文化学院', '', '', '');
INSERT INTO `user_info` VALUES ('37', '35', '体育学院', '', '', '');
INSERT INTO `user_info` VALUES ('38', '36', '文史学院', '', '', '');
INSERT INTO `user_info` VALUES ('39', '37', '夏青传媒学院', '', '', '');
INSERT INTO `user_info` VALUES ('40', '38', '艺术学院', '', '', '');
INSERT INTO `user_info` VALUES ('41', '39', '行政教辅', '', '', '');
INSERT INTO `user_info` VALUES ('42', '40', '生命科学与工程学院', '', '', '');
INSERT INTO `user_info` VALUES ('43', '41', '王璐', '', '', '');
INSERT INTO `user_info` VALUES ('44', '42', '陈建春', '', '', '');
INSERT INTO `user_info` VALUES ('45', '43', '陈卓夷', '', '', '');
INSERT INTO `user_info` VALUES ('46', '44', '王亚楠', '', '', '');
INSERT INTO `user_info` VALUES ('47', '45', '李晨', '', '', '');
INSERT INTO `user_info` VALUES ('48', '46', '司玲玲', '', '', '');
INSERT INTO `user_info` VALUES ('49', '47', '徐贵军', '', '', '');
INSERT INTO `user_info` VALUES ('50', '48', '丁万宁', '', '', '');
INSERT INTO `user_info` VALUES ('51', '49', '李慧', '', '', '');
INSERT INTO `user_info` VALUES ('52', '50', '李涛', '', '', '');
INSERT INTO `user_info` VALUES ('53', '51', '郑卫华', '', '', '');
INSERT INTO `user_info` VALUES ('54', '52', '周明姬', '', '', '');
INSERT INTO `user_info` VALUES ('55', '53', '贾电如', '', '', '');
INSERT INTO `user_info` VALUES ('56', '54', '贾利敏', '', '', '');
INSERT INTO `user_info` VALUES ('57', '55', '梁硕', '', '', '');
INSERT INTO `user_info` VALUES ('58', '56', '董暾', '', '', '');
INSERT INTO `user_info` VALUES ('59', '57', '赵燕', '', '', '');
INSERT INTO `user_info` VALUES ('60', '58', '王超', '', '', '');
INSERT INTO `user_info` VALUES ('61', '59', '王旭辉', '', '', '');
INSERT INTO `user_info` VALUES ('62', '60', '郭红俊', '', '', '');
INSERT INTO `user_info` VALUES ('63', '61', '张志来', '', '', '');
INSERT INTO `user_info` VALUES ('64', '62', '贾素梅', '', '', '');
INSERT INTO `user_info` VALUES ('65', '63', '王薇', '', '', '');
INSERT INTO `user_info` VALUES ('66', '64', '姜韶军', '', '', '');
INSERT INTO `user_info` VALUES ('67', '65', '王苗苗', '', '', '');
INSERT INTO `user_info` VALUES ('68', '66', '李娜', '', '', '');
INSERT INTO `user_info` VALUES ('69', '67', '王洁丽', '', '', '');
INSERT INTO `user_info` VALUES ('70', '68', '李国玉', '', '', '');
INSERT INTO `user_info` VALUES ('71', '69', '田俊芳', '', '', '');
INSERT INTO `user_info` VALUES ('72', '70', '王智慧', '', '', '');
INSERT INTO `user_info` VALUES ('73', '71', '焦洪强', '', '', '');
INSERT INTO `user_info` VALUES ('74', '72', '韩翔宇', '', '', '');
INSERT INTO `user_info` VALUES ('75', '73', '刘翠翠', '', '', '');
INSERT INTO `user_info` VALUES ('76', '74', '王晓琳', '', '', '');
INSERT INTO `user_info` VALUES ('77', '75', '谢飞', '', '', '');
INSERT INTO `user_info` VALUES ('78', '76', '闫双双', '', '', '');
INSERT INTO `user_info` VALUES ('79', '77', '闫芳园', '', '', '');
INSERT INTO `user_info` VALUES ('80', '78', '石亚超', '', '', '');
INSERT INTO `user_info` VALUES ('81', '79', '刘玉英', '', '', '');

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
  UNIQUE KEY `username` (`username`) USING BTREE,
  KEY `type` (`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'mirage', '$2a$10$XefeuTFJsv3bi8QLxyUxFuK6/IctSn7DGA7cTHsebB6xbtuxc89t6', '1', '1', '1', '', '', '2018-11-08 16:29:50', '2018-11-08 16:29:50');
INSERT INTO `users` VALUES ('12', 'xxgcxy', '$2a$10$lJqIH3LzAKiYIO/XCAtQQuRxkm0b8r5uPAjsX26Jn9z7VjLR0.NOa', '1', '1', '1', '', '', '2018-11-09 18:24:54', '2018-11-09 18:24:54');
INSERT INTO `users` VALUES ('13', 'hdxy', '$2a$10$MCqexzC8ENZFMXRnkc7Np.ywsKF0cfZMWj7aAuazFlDTnCHus1yHy', '1', '1', '1', '', '', '2018-11-09 18:10:30', '2018-11-09 18:10:30');
INSERT INTO `users` VALUES ('17', 'xxgcxyjwc', '$2a$10$EeTiLrfTJeTAleIjD8/0Te0Ziq0G1wmGHe8d9iophEICI6tsME7QW', '1', '3', '1', '', '', '2018-11-16 12:57:28', '2018-11-16 12:57:28');
INSERT INTO `users` VALUES ('18', 'xxgcxybgs', '$2a$10$42WUxbcDwytv/pRTVNYOnu/31I5f9z8/msM/04RGuaroyrdqQLtBS', '1', '3', '1', '', '', '2018-11-17 21:43:54', '2018-11-17 21:43:54');
INSERT INTO `users` VALUES ('19', '00003', '$2a$10$mQwlwJ7uoqm3nYmCaxfAPO6.YkpjbOxVbeU.tSUGQHkgscLo2WwHy', '1', '4', '1', '', '', '2018-11-18 16:59:29', '2018-11-18 16:59:29');
INSERT INTO `users` VALUES ('23', '00001', '$2a$10$7Pzvh1XYqYNKaViRV2s8Sevhrzz/WkcF7D6jSk/OjVfixyus7Zaly', '1', '4', '1', '', '', '2018-11-22 01:31:56', '2018-11-22 01:31:56');
INSERT INTO `users` VALUES ('24', '01234', '$2a$10$rO54a/kraceRCaICWDGqsOH8RK/eV6NfRP07BggJ6vBga0bP/gx9G', '1', '4', '1', '', '', '2018-11-27 21:11:27', '2018-11-27 21:11:27');
INSERT INTO `users` VALUES ('25', 'wgyxy', '$2a$10$AwnF3SPZHyQwYyF2odaRqeQfmWQ2ZI3L3aauKjr4bKiuSKs96TNKy', '1', '1', '1', '', '', '2018-12-06 15:53:30', '2018-12-06 15:53:30');
INSERT INTO `users` VALUES ('26', 'hxhgyclxy', '$2a$10$2R4lwPpOl5dY6Ulel9ZYPOHRxoQjL3HduTWNBv8/fcV9RJ.ywg9O6', '1', '1', '1', '', '', '2018-12-06 15:54:34', '2018-12-06 15:54:34');
INSERT INTO `users` VALUES ('27', 'jdxy', '$2a$10$Znn8CqBC5Z7EH2MiT3B69e.5ee8uVUdt5KJDnF896oNj9JceKYtk2', '1', '1', '1', '', '', '2018-12-06 15:54:42', '2018-12-06 15:54:42');
INSERT INTO `users` VALUES ('28', 'jyxy', '$2a$10$tcnMCof3ep8elHfb3Lyyq.zkR/CTZhznoS2Sdy21fB/rRYixRA2Qe', '1', '1', '1', '', '', '2018-12-06 15:54:51', '2018-12-06 15:54:51');
INSERT INTO `users` VALUES ('29', 'jjglxy', '$2a$10$zKLHWRLSS/1Rw3WwwMgxB.Ig3KIKjWnQkYzB11TzpsmsIyamRn8d2', '1', '1', '1', '', '', '2018-12-06 15:54:58', '2018-12-06 15:54:58');
INSERT INTO `users` VALUES ('30', 'rjxy', '$2a$10$1J2wHMHir8IEiJunvWk/GezwMthdmgtWj4U13Nd3gcSa7qi5m.MvO', '1', '1', '1', '', '', '2018-12-06 15:55:04', '2018-12-06 15:55:04');
INSERT INTO `users` VALUES ('31', 'skkxjxb', '$2a$10$byXnJ8/GZsRLRLi2xrSruOZWpW3qX7bYeK/vJ4WUJfukjIZep.tuK', '1', '1', '1', '', '', '2018-12-06 15:55:18', '2018-12-06 15:55:18');
INSERT INTO `users` VALUES ('32', 'dzxxgcsyysxzx', '$2a$10$uKwc3ZhwJVO.R7RDJZMdpOgT9I/TvBJtvfyuO4VcsYyzYutaKgiwC', '1', '1', '1', '', '', '2018-12-06 15:55:30', '2018-12-06 15:55:30');
INSERT INTO `users` VALUES ('33', 'slxy', '$2a$10$EIlmea9Y4GUjJKV.2wiNi.hzLKdXxe4Rhx7zEDF4iyQCPq2dwCn2S', '1', '1', '1', '', '', '2018-12-06 15:55:38', '2018-12-06 15:55:38');
INSERT INTO `users` VALUES ('34', 'tjwhxy', '$2a$10$RM5NlpNXSgQeorlIbH39HuAILeZ67Yk/9rvCEz9h7U7D10H9BhwHK', '1', '1', '1', '', '', '2018-12-06 15:55:45', '2018-12-06 15:55:45');
INSERT INTO `users` VALUES ('35', 'tyxy', '$2a$10$WaLG.feuPzdZDxFm0T9hruaki5i4dLFhqMdhBTYsYhPWhyFKUDjUK', '1', '1', '1', '', '', '2018-12-06 15:55:53', '2018-12-06 15:55:53');
INSERT INTO `users` VALUES ('36', 'wsxy', '$2a$10$Uq2wwEWcMlmV5zP11nBJCeyhoGaAqsNTeuJY3MCmUUGTbKU86XQiq', '1', '1', '1', '', '', '2018-12-06 15:56:17', '2018-12-06 15:56:17');
INSERT INTO `users` VALUES ('37', 'xqzmxy', '$2a$10$iUVTnWuCFlGKGBykKQ3iruTwI7acrXOxTE3DmHyqTiXDRAdgwzUIS', '1', '1', '1', '', '', '2018-12-06 15:56:28', '2018-12-06 15:56:28');
INSERT INTO `users` VALUES ('38', 'yzxy', '$2a$10$7FYZBjYH3OE1WZWsh8FPwOFZkkztpD25vTmakx1DAsJfgMUQv4t/C', '1', '1', '1', '', '', '2018-12-06 15:56:37', '2018-12-06 15:56:37');
INSERT INTO `users` VALUES ('39', 'xzjf', '$2a$10$DlNTqX.ZKo3JKyvXDQI0Pelwjav9RxpS24PAIqOTpd/0U.MFeH6Z2', '1', '1', '1', '', '', '2018-12-06 15:56:42', '2018-12-06 15:56:42');
INSERT INTO `users` VALUES ('40', 'smkxygcxy', '$2a$10$3cYlPyFJ9zT/BNCUuMb/6Op8s7tCE.N1CJ.2onZ7LMYoTXKWE35WW', '1', '1', '1', '', '', '2018-12-06 15:56:50', '2018-12-06 15:56:50');
INSERT INTO `users` VALUES ('41', '01031021', '$2a$10$6DLvrxm19eQUoEXM6RYzVuAvSdy6OS7Sx4WFjwb/k.8uxPIqLeice', '1', '4', '1', '', '', '2018-12-06 15:58:07', '2018-12-06 15:58:07');
INSERT INTO `users` VALUES ('42', '04011005', '$2a$10$C5Te6D.NNkUv1jse6TjwjO1ylKzfffVUrlrT8OZGt2rfOhc2j4DQi', '1', '4', '1', '', '', '2018-12-06 15:58:27', '2018-12-06 15:58:27');
INSERT INTO `users` VALUES ('43', '04011007', '$2a$10$xfP23JIky/r/r9y1wqRiVesAc0.sFeF/wRKMSw0TQx4BdYq/GFnIa', '1', '4', '1', '', '', '2018-12-06 15:58:45', '2018-12-06 15:58:45');
INSERT INTO `users` VALUES ('44', '04011009', '$2a$10$hy3z/Tzz5mf3c1QvlBbqLu684B/pqEcf83lZI5CzLpMQ2lYcdP8Be', '1', '4', '1', '', '', '2018-12-06 15:58:57', '2018-12-06 15:58:57');
INSERT INTO `users` VALUES ('45', '04011010', '$2a$10$ZZwT24gsEDAzBtt1HqJaiuw3czsbCMthyHrJfoYZ5BQuOqO36YhsO', '1', '4', '1', '', '', '2018-12-06 15:59:11', '2018-12-06 15:59:11');
INSERT INTO `users` VALUES ('46', '04011011', '$2a$10$uiZJvspLhssbQOxNXTe0y.oY.oc.nartpHmrcAHz4nxzPq40fzA9m', '1', '4', '1', '', '', '2018-12-06 15:59:25', '2018-12-06 15:59:25');
INSERT INTO `users` VALUES ('47', '04011013', '$2a$10$m5Lmt6/LG12JCz3KgOA1q.H.w0msWcKf74TaeofAlI/P/IpB.wh1.', '1', '4', '1', '', '', '2018-12-06 15:59:40', '2018-12-06 15:59:40');
INSERT INTO `users` VALUES ('48', '04011014', '$2a$10$/r4hKaw9TYodV8v1dWFOQ.dXrUKbeUU0vjLFq5whqgICGkfHlsCY2', '1', '4', '1', '', '', '2018-12-06 15:59:53', '2018-12-06 15:59:53');
INSERT INTO `users` VALUES ('49', '04011015', '$2a$10$qpZHzocDABkPH/xOSmpdNuqNA1GOk5AIjR7T8vrMkQj5Kmv2TqxAa', '1', '4', '1', '', '', '2018-12-06 16:00:04', '2018-12-06 16:00:04');
INSERT INTO `users` VALUES ('50', '04011016', '$2a$10$rUYTRBEFB2U0WOWqg66smuAYhvkQ7N4BZW.R32azuSggEWr./iBLm', '1', '4', '1', '', '', '2018-12-06 16:00:15', '2018-12-06 16:00:15');
INSERT INTO `users` VALUES ('51', '04011025', '$2a$10$yQZ7aODtnRrEcg5CWPuBO.bsXuswTm056fkfaiQxw5PFhWm9c.5H6', '1', '4', '1', '', '', '2018-12-06 16:00:35', '2018-12-06 16:00:35');
INSERT INTO `users` VALUES ('52', '04011027', '$2a$10$Gc.gTPA9vQnpEOnbUhxB8.zD0Nbr.muenYae4r6pRMjp5EuE..f6C', '1', '4', '1', '', '', '2018-12-06 16:01:05', '2018-12-06 16:01:05');
INSERT INTO `users` VALUES ('53', '04011029', '$2a$10$PFthLBXGBoPpWg9ltM.RgORz/B1sJAVAEtGAk2wXnu/rAP2lQjhn6', '1', '4', '1', '', '', '2018-12-06 16:01:23', '2018-12-06 16:01:23');
INSERT INTO `users` VALUES ('54', '04011030', '$2a$10$ptiCPrwu7QL8f29Wxgsr.OKj/Ia.iYungNNy4W.i4Rg4.I3cVVY.u', '1', '4', '1', '', '', '2018-12-06 16:01:43', '2018-12-06 16:01:43');
INSERT INTO `users` VALUES ('55', '04011033', '$2a$10$PaeEVtUe5RhZh20bocQCsuG8BvgfkF.kQ0peorKEXsyiFDv6PCbBW', '1', '4', '1', '', '', '2018-12-06 16:02:12', '2018-12-06 16:02:12');
INSERT INTO `users` VALUES ('56', '04021010', '$2a$10$.F9vhLC8joFfGXIIj2p/quWaHcqbIakzSr6LO3Nl9kYLOytscd2Om', '1', '4', '1', '', '', '2018-12-06 16:02:25', '2018-12-06 16:02:25');
INSERT INTO `users` VALUES ('57', '04021016', '$2a$10$BAxCVZfuDMnoJwrfbRVaYulp0O7JdPPXaK5prS5OefmfUG9NNq9RS', '1', '4', '1', '', '', '2018-12-06 16:02:39', '2018-12-06 16:02:39');
INSERT INTO `users` VALUES ('58', '04021017', '$2a$10$5nCTNq.kJ4//zdEvEOV8iOfy21veCKix1M89iGv5EJTbTzxKhd89u', '1', '4', '1', '', '', '2018-12-06 16:03:06', '2018-12-06 16:03:06');
INSERT INTO `users` VALUES ('59', '04031002', '$2a$10$MhgMsqP2CcYX288Ul5I65.2r0iEpWzJWnyZiA.YIb0a/yN2Czob0K', '1', '4', '1', '', '', '2018-12-06 16:03:21', '2018-12-06 16:03:21');
INSERT INTO `users` VALUES ('60', '04031003', '$2a$10$bx6Mp0GQY8SzKTeQ/bjsDuIyX5F7sWoJAt7FXH0XzC/YIPe5jztby', '1', '4', '1', '', '', '2018-12-06 16:03:38', '2018-12-06 16:03:38');
INSERT INTO `users` VALUES ('61', '04031004', '$2a$10$IK82DELWrlGI8MQk2kpO4.3.0rjWGvmF6so1V0XDxjJ84zoV2xTeK', '1', '4', '1', '', '', '2018-12-06 16:04:10', '2018-12-06 16:04:10');
INSERT INTO `users` VALUES ('62', '04031005', '$2a$10$jjqOg/Pe/SqbGpfIhjN2CesINx4//Trh5YOgBnPP9VhGLkQw7EmMa', '1', '4', '1', '', '', '2018-12-06 16:04:22', '2018-12-06 16:04:22');
INSERT INTO `users` VALUES ('63', '04031007', '$2a$10$E8O6OgPATkqn0WWDU/dbzuUNg0PS1M6.9LzipE./qqGam7Jg2Jd.S', '1', '4', '1', '', '', '2018-12-06 16:04:33', '2018-12-06 16:04:33');
INSERT INTO `users` VALUES ('64', '04031008', '$2a$10$GRYyux4hcI2l2MaYwkUrFuLDJRaVL1dBT9901Lkb4.WsUek1Qoa4y', '1', '4', '1', '', '', '2018-12-06 16:04:43', '2018-12-06 16:04:43');
INSERT INTO `users` VALUES ('65', '04031010', '$2a$10$1FnQWYSXmiA/X7ky/LLjF.7OLW801nqEHzMyWVYw6Akbr1u5Cbo6C', '1', '4', '1', '', '', '2018-12-06 16:05:02', '2018-12-06 16:05:02');
INSERT INTO `users` VALUES ('66', '04031011', '$2a$10$oFJINExWIRw4Uf2QTwp7YeDybLOGtmmvhEQpj/WP3MVXOMT2VMAzW', '1', '4', '1', '', '', '2018-12-06 16:05:15', '2018-12-06 16:05:15');
INSERT INTO `users` VALUES ('67', '04031014', '$2a$10$5gfKSCRWM9ns9Ljld1wBNOspXuwlDL.kCLHp.GfkkR.n6gCyvn.Wy', '1', '4', '1', '', '', '2018-12-06 16:05:27', '2018-12-06 16:05:27');
INSERT INTO `users` VALUES ('68', '04031016', '$2a$10$A9IwMaqP1ry/aGCdl.5vb.wdYzERo2oB3fvOHhrxQDRpq9mOXOJA6', '1', '4', '1', '', '', '2018-12-06 16:05:47', '2018-12-06 16:05:47');
INSERT INTO `users` VALUES ('69', '04031018', '$2a$10$6AA5vBF5NtWFIZRwH5PuQ..O73SvZCKeAcpoDpnhL9xl7pcMifqGi', '1', '4', '1', '', '', '2018-12-06 16:06:03', '2018-12-06 16:06:03');
INSERT INTO `users` VALUES ('70', '16011004', '$2a$10$C9fe8JmOnIEYqiZKqc1IFeYh2p3r2VzApyireQCx9Ag7zL9BHvWaW', '1', '4', '1', '', '', '2018-12-06 16:06:20', '2018-12-06 16:06:20');
INSERT INTO `users` VALUES ('71', '16011012', '$2a$10$8G0wDlXf1KXdiNeiWcjMfeia7MAwvAHPyww5zy3Z5q47/l5MKguTG', '1', '4', '1', '', '', '2018-12-06 16:06:34', '2018-12-06 16:06:34');
INSERT INTO `users` VALUES ('72', '20140036', '$2a$10$Kw03SYu7lQzNflKv.K2JLOTF3p6cTDQo9Ryqp/DM8nyi3piLNJ9hu', '1', '4', '1', '', '', '2018-12-06 16:06:51', '2018-12-06 16:06:51');
INSERT INTO `users` VALUES ('73', '20140037', '$2a$10$oXQLbfjoQm/lBdspvHqsBuoZOWAC.SBGAWkHJswtPWBhkMM/7iCrC', '1', '4', '1', '', '', '2018-12-06 16:07:00', '2018-12-06 16:07:00');
INSERT INTO `users` VALUES ('74', '20140038', '$2a$10$pF549MXvXfBjQBtm.it0VugNHbtQ6xDYy.pYjo0c97OoTOnua63fi', '1', '4', '1', '', '', '2018-12-06 16:07:12', '2018-12-06 16:07:12');
INSERT INTO `users` VALUES ('75', '20140040', '$2a$10$jYKFbNalEVgEvyaodrKhieAk6cYZ2h5woTTkT4jrDUMtUL13uXBlu', '1', '4', '1', '', '', '2018-12-06 16:07:22', '2018-12-06 16:07:22');
INSERT INTO `users` VALUES ('76', '20150071', '$2a$10$XXx6pGa4FxXQU91/1nbRHu8zrNlXevE.Y9d.GcfhyBVIu.D1iV.SS', '1', '4', '1', '', '', '2018-12-06 16:07:36', '2018-12-06 16:07:36');
INSERT INTO `users` VALUES ('77', '20150078', '$2a$10$3qov/11YCrsAtCiISdPpiunWJtYkMViy1AiaIdHwOmxjexQfnCyYi', '1', '4', '1', '', '', '2018-12-06 16:07:48', '2018-12-06 16:07:48');
INSERT INTO `users` VALUES ('78', '20150079', '$2a$10$88HsDS.NASo3P.xURxKsyezocQqoFualJSntfm7MlqDsr8V0UJkPW', '1', '4', '1', '', '', '2018-12-06 16:07:58', '2018-12-06 16:07:58');
INSERT INTO `users` VALUES ('79', '20150092', '$2a$10$CZIZPzqZj4h.Sf23zyXDYOGZWVtRMpz1Xc9WSSK3CCVZB0kDZ8jfy', '1', '4', '1', '', '', '2018-12-06 16:08:09', '2018-12-06 16:08:09');
