package com.hdc.service;

import com.hdc.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public interface UsersService {
	long countByExample(UsersExample example);

	int deleteByExample(UsersExample example);

	int deleteByPrimaryKey(Integer userId);

	int insert(Users record);

	int insertSelective(Users record);

	List<Users> selectByExample(UsersExample example);

	Users selectByPrimaryKey(Integer userId);

	int updateByExampleSelective(@Param("record") Users record, @Param("example") UsersExample example);

	int updateByExample(@Param("record") Users record, @Param("example") UsersExample example);

	int updateByPrimaryKeySelective(Users record);

	int updateByPrimaryKey(Users record);

	int insertAdmin(Users admin, UserInfo userInfo);

	int insertTeacher(Users teacher , UserInfo userInfo);

	int insertCollege(Users college, UserInfo userInfo);

    @Transactional
    int insertAudit(AuditTable auditTable);

    @Transactional
	int updateCollege(Users users, UserInfo userInfo);

	int deleteCollege(List<Integer> collegeIdList);

	@Transactional
	int updateAudit(AuditTable auditTable);

	@Transactional
	int deleteAudit(List<Integer> auditIdList);

    @Transactional
    int insertTeacher(TeacherTable teacherTable);

	@Transactional
	int updateTeacher(TeacherTable teacherTable);

	@Transactional
	int deleteTeacher(List<Integer> teacherIdList);
}
