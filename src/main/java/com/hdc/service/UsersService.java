package com.hdc.service;

import com.hdc.entity.UserInfo;
import com.hdc.entity.Users;
import com.hdc.entity.UsersExample;
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

	int insertAudit(Users audit, UserInfo userInfo);

	@Transactional
	int updateCollege(Users users, UserInfo userInfo);

	int deleteCollege(List<Integer> collegeIdList);
}
