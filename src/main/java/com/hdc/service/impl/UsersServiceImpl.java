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

import java.util.ArrayList;
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
        return usersDao.countByExample(example);
    }

    @Override
    public int deleteByExample(UsersExample example) {
        return usersDao.deleteByExample(example);
    }

    @Override
    public int deleteByPrimaryKey(Integer userId) {
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
    public Users selectByPrimaryKey(Integer userId) {
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
     * @param admin    用户登录信息
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
        int userId = admin.getUserId();
        String username = admin.getUsername();

        userInfo.setUserId(userId);
        userInfoDao.insert(userInfo);

        Authorities authorities = new Authorities();
        authorities.setAuthorities("ROLE_ADMIN");

        authorities.setUserId(userId);
        authoritiesDao.insert(authorities);

        Admin adminParam = new Admin();
        adminParam.setUserId(userId);
        adminParam.setAdminName(username);
        adminDao.insert(adminParam);

        return admin.getUserId();
    }

    @Override
    @Transactional
    public int insertTeacher(Users teacher, UserInfo userInfo) {
        int userId = usersDao.insert(teacher);
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
        int userId = users.getUserId();
        String username = users.getUsername();

        userInfo.setUserId(userId);
        userInfoDao.insert(userInfo);

        Authorities authorities = new Authorities();
        authorities.setAuthorities("ROLE_COLLEGE");

        authorities.setUserId(userId);
        authoritiesDao.insert(authorities);

        College collegeParam = new College();
        collegeParam.init();
        collegeParam.setUserId(userId);
        collegeParam.setCollegeName(userInfo.getDisplayName());
        collegeDao.insert(collegeParam);

        return users.getUserId();
    }

    @Override
    @Transactional
    public int insertAudit(Users audit, UserInfo userInfo) {
        int userId = usersDao.insert(audit);
        userInfo.setUserId(userId);
        userInfoDao.insert(userInfo);
        Authorities authorities = new Authorities();
        authorities.setAuthorities("ROLE_AUDIT");
        authorities.setUserId(userId);
        authoritiesDao.insert(authorities);
        return userId;
    }

    @Override
    @Transactional
    public int updateCollege(Users users, UserInfo userInfo) {

        //将传进来的明文密码加密
        String password = passwordEncoder.encode(users.getPassword());
        users.setPassword(password);
        usersDao.updateByPrimaryKeySelective(users);
        //新增用户的用户ID
        int userId = users.getUserId();
        String username = users.getUsername();

        //更新用户信息表
        UserInfoExample userInfoExample = new UserInfoExample();
        userInfoExample.createCriteria().andUserIdEqualTo(userId);
        userInfo.setUserId(userId);
        userInfoDao.updateByExampleSelective(userInfo, userInfoExample);

        //更新学院信息表
        CollegeExample collegeExample = new CollegeExample();
        collegeExample.createCriteria().andUserIdEqualTo(userId);
        College collegeParam = new College();
        collegeParam.setUserId(userId);
        collegeParam.setCollegeName(userInfo.getDisplayName());
        collegeDao.updateByExampleSelective(collegeParam, collegeExample);

        return users.getUserId();
    }

    @Override
    @Transactional
    public int deleteCollege(List<Integer> collegeIdList) {

        //将学院ID列表转换成相应的用户ID列表
        CollegeExample collegeExample = new CollegeExample();
        collegeExample.createCriteria().andCollegeIdIn(collegeIdList);
        List<College> collegeList = collegeDao.selectByExample(collegeExample);
        List<Integer> userIdList = new ArrayList<>();
        for (College user : collegeList) {
            userIdList.add(user.getUserId());
        }

        //删除学院信息
        collegeDao.deleteByExample(collegeExample);

        //删除权限信息
        AuthoritiesExample authoritiesExample = new AuthoritiesExample();
        authoritiesExample.createCriteria().andUserIdIn(userIdList);
        authoritiesDao.deleteByExample(authoritiesExample);

        //删除用户信息
        UserInfoExample userInfoExample = new UserInfoExample();
        userInfoExample.createCriteria().andUserIdIn(userIdList);
        userInfoDao.deleteByExample(userInfoExample);

        //删除用户
        UsersExample usersExample = new UsersExample();
        usersExample.createCriteria().andUserIdIn(userIdList);
        usersDao.deleteByExample(usersExample);

        return 1;
    }
}
