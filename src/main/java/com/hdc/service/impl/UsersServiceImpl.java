package com.hdc.service.impl;

import com.hdc.dao.*;
import com.hdc.entity.*;
import com.hdc.service.CollegeService;
import com.hdc.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersDao usersDao;

	@Autowired
	private UserInfoDao userInfoDao;

	@Autowired
	private AuthoritiesDao authoritiesDao;

	@Autowired
	private AdminDao adminDao;

	@Autowired
	private TeacherDao teacherDao;

	@Autowired
	private AuditDao auditDao;

	@Autowired
	private CollegeDao collegeDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	//private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public long countByExample(UsersExample example) {
		return usersDao. countByExample(example);
	}

	@Override
	public int deleteByExample(UsersExample example) {
		return usersDao.deleteByExample(example);
	}

	@Override
	public int deleteByPrimaryKey(Long userId) {
		return usersDao.deleteByPrimaryKey(userId);
	}

	@Override
	public int insert(Users record) {
		return usersDao.insert(record);
	}

	@Override
	public int insertSelective(Users record) {
		return usersDao.insertSelective(record);
	}

	@Override
	public List<Users> selectByExample(UsersExample example) {
		return usersDao.selectByExample(example);
	}

	@Override
	public Users selectByPrimaryKey(Long userId) {
		return usersDao.selectByPrimaryKey(userId);
	}

	@Override
	public int updateByExampleSelective(Users record, UsersExample example) {
		return usersDao.updateByExampleSelective(record, example);
	}

	@Override
	public int updateByExample(Users record, UsersExample example) {
		return usersDao.updateByExample(record, example);
	}

	@Override
	public int updateByPrimaryKeySelective(Users record) {
		return usersDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(Users record) {
		return usersDao.updateByPrimaryKey(record);
	}

	/**
	 *
	 * @param admin 用户登录信息
	 * @param userInfo 用户个人信息
	 * @return 新增用户的ID
	 */
	@Override
	@Transactional
	public int insertAdmin(Users admin, UserInfo userInfo) {
		//将传进来的明文密码加密
		String password = passwordEncoder.encode(admin.getPassword());
		admin.setPassword(password);
		usersDao.insert(admin);
		//新增用户的用户ID
		int userID = admin.getUserId();
		String username = admin.getUsername();

		userInfo.setUserId(userID);
		userInfoDao.insert(userInfo);

		Authorities authorities = new Authorities();
		authorities.setAuthorities("ROLE_ADMIN");

		authorities.setUserId(userID);
		authoritiesDao.insert(authorities);

		Admin adminParam = new Admin();
		adminParam.setUserId(userID);
		adminParam.setAdminName(username);
		adminDao.insert(adminParam);

		return admin.getUserId();
	}

	@Override
	@Transactional
	public int insertTeacher(Users teacher, UserInfo userInfo) {
		int userId=usersDao.insert(teacher);
		userInfo.setUserId(userId);
		userInfoDao.insert(userInfo);
		Authorities authorities = new Authorities();
		authorities.setAuthorities("ROLE_TEACHER");
		authorities.setUserId(userId);
		authoritiesDao.insert(authorities);
		return userId;
	}

	@Override
	@Transactional
	public int insertCollege(Users users, UserInfo userInfo) {

		//将传进来的明文密码加密
		String password = passwordEncoder.encode(users.getPassword());
		users.setPassword(password);
		usersDao.insert(users);
		//新增用户的用户ID
		int userID = users.getUserId();
		String username = users.getUsername();

		userInfo.setUserId(userID);
		userInfoDao.insert(userInfo);

		Authorities authorities = new Authorities();
		authorities.setAuthorities("ROLE_COLLEGE");

		authorities.setUserId(userID);
		authoritiesDao.insert(authorities);

		College collegeParam = new College();
		collegeParam.setUserId(userID);
		collegeParam.setCollegeName(userInfo.getDisplayName());
		collegeDao.insert(collegeParam);

		return users.getUserId();
	}

	@Override
	@Transactional
	public int insertAudit(Users audit, UserInfo userInfo) {
		int userId=usersDao.insert(audit);
		userInfo.setUserId(userId);
		userInfoDao.insert(userInfo);
		Authorities authorities = new Authorities();
		authorities.setAuthorities("ROLE_AUDIT");
		authorities.setUserId(userId);
		authoritiesDao.insert(authorities);
		return userId;
	}
}
