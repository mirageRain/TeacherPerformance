package com.hdc.service.impl;

import com.hdc.dao.*;
import com.hdc.entity.*;
import com.hdc.service.UsersService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
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


    @Override
    @Transactional
    public int insertAudit(AuditTable auditTable) {

        Users users = new Users();
        UserInfo userInfo = new UserInfo();
        Audit audit = new Audit();

        users.init();
        userInfo.init();
        audit.init();

        users.setPassword(auditTable.getPassword());
        users.setUsername(auditTable.getUsername());
        users.setType((byte) 3);

        //将传进来的明文密码加密
        try {
            String password = passwordEncoder.encode(auditTable.getPassword());
            users.setPassword(password);
            int usersDaoEffectedCount = usersDao.insert(users);
            if (usersDaoEffectedCount <= 0) {
                throw new RuntimeException("用户表插入错误");
            }
        } catch (Exception e) {
            throw new RuntimeException("用户表插入错误");
        }


        //新增用户的用户ID
        Integer userId = users.getUserId();
        String email = auditTable.getEmail();
        String phone = auditTable.getPhone();
        String imgUrl = auditTable.getImgUrl();
        String displayName = auditTable.getAuditName();

        if (StringUtils.isNotBlank(email)) {
            userInfo.setEmail(email);
        }
        if (StringUtils.isNotBlank(phone)) {
            userInfo.setPhone(phone);
        }
        if (StringUtils.isNotBlank(imgUrl)) {
            userInfo.setImgUrl(imgUrl);
        }
        if (StringUtils.isNotBlank(displayName)) {
            userInfo.setDisplayName(displayName);
        } else {
            throw new RuntimeException("审核处名称不存在");
        }
        if (userId != null && userId > 0) {
            userInfo.setUserId(userId);
        } else {
            throw new RuntimeException("用户ID不存在");
        }


        try {
            int userInfoDapEffectedCount = userInfoDao.insert(userInfo);
            if (userInfoDapEffectedCount <= 0) {
                throw new RuntimeException("用户信息表插入错误");
            }
        } catch (Exception e) {
            throw new RuntimeException("用户信息表插入错误");
        }

        Authorities authorities = new Authorities();
        authorities.setAuthorities("ROLE_AUDIT");

        authorities.setUserId(userId);
        try {
            int authoritiesDaoEffectedCount = authoritiesDao.insert(authorities);
            if (authoritiesDaoEffectedCount <= 0) {
                throw new RuntimeException("权限表插入失败");
            }
        } catch (Exception e) {
            throw new RuntimeException("权限表插入失败");
        }

        Integer collegeId = auditTable.getCollegeId();
        String desc = auditTable.getDesc();
        //对审核机构实体赋值
        if (StringUtils.isNotBlank(displayName)) {
            audit.setAuditName(displayName);
        } else {
            throw new RuntimeException("审核处名称不存在");
        }

        if (userId != null && userId > 0) {
            audit.setUserId(userId);
        } else {
            throw new RuntimeException("用户ID不存在");
        }

        if (collegeId != null && collegeId > 0) {
            audit.setCollegeId(collegeId);
        } else {
            throw new RuntimeException("学院ID不存在");
        }
        if (StringUtils.isNotBlank(displayName)) {
            audit.setDesc(desc);
        }
        try {
            int auditDaoEffectedCount = auditDao.insert(audit);
            if (auditDaoEffectedCount <= 0) {
                throw new RuntimeException("审核处表插入失败");
            }
        } catch (Exception e) {
            throw new RuntimeException("审核处表插入失败");
        }

        return users.getUserId();
    }

    @Override
    @Transactional
    public int updateAudit(AuditTable auditTable) {

        Users users = new Users();
        UserInfo userInfo = new UserInfo();
        Audit audit = new Audit();

        users.init();
        userInfo.init();
        audit.init();

        users.setUserId(auditTable.getUserId());
        users.setPassword(auditTable.getPassword());
        users.setUsername(auditTable.getUsername());
        users.setType((byte) 3);


        //将传进来的明文密码加密
        try {
            String password = passwordEncoder.encode(auditTable.getPassword());
            users.setPassword(password);
            int usersDaoEffectedCount = usersDao.updateByPrimaryKeySelective(users);
            if (usersDaoEffectedCount <= 0) {
                throw new RuntimeException("用户表更新错误");
            }
        } catch (Exception e) {
            throw new RuntimeException("用户表更新错误");
        }

        //新增用户的用户ID
        Integer userId = auditTable.getUserId();
        String email = auditTable.getEmail();
        String phone = auditTable.getPhone();
        String imgUrl = auditTable.getImgUrl();
        String displayName = auditTable.getAuditName();

        if (StringUtils.isNotBlank(email)) {
            userInfo.setEmail(email);
        }
        if (StringUtils.isNotBlank(phone)) {
            userInfo.setPhone(phone);
        }
        if (StringUtils.isNotBlank(imgUrl)) {
            userInfo.setImgUrl(imgUrl);
        }
        if (StringUtils.isNotBlank(displayName)) {
            userInfo.setDisplayName(displayName);
        } else {
            throw new RuntimeException("审核处名称不存在");
        }
        if (userId != null && userId > 0) {
            userInfo.setUserId(userId);
        } else {
            throw new RuntimeException("用户ID不存在");
        }

        //更新用户信息表
        try {
            UserInfoExample userInfoExample = new UserInfoExample();
            userInfoExample.createCriteria().andUserIdEqualTo(userId);
            int userInfoDapEffectedCount = userInfoDao.updateByExampleSelective(userInfo, userInfoExample);
            if (userInfoDapEffectedCount <= 0) {
                throw new RuntimeException("用户信息表更新错误");
            }
        } catch (Exception e) {
            throw new RuntimeException("用户信息表更新错误");
        }

        //对审核机构实体赋值
        Integer collegeId = auditTable.getCollegeId();
        String desc = auditTable.getDesc();
        //对审核机构实体赋值
        if (StringUtils.isNotBlank(displayName)) {
            audit.setAuditName(displayName);
        } else {
            throw new RuntimeException("审核处名称不存在");
        }

        if (userId != null && userId > 0) {
            audit.setUserId(userId);
        } else {
            throw new RuntimeException("用户ID不存在");
        }

        if (collegeId != null && collegeId > 0) {
            audit.setCollegeId(collegeId);
        } else {
            throw new RuntimeException("学院ID不存在");
        }
        if (StringUtils.isNotBlank(displayName)) {
            audit.setDesc(desc);
        }
        //更新审核机构信息表
        try {
            AuditExample auditExample = new AuditExample();
            auditExample.createCriteria().andUserIdEqualTo(userId);
            audit.setUserId(userId);
            int auditDaoEffectedCount = auditDao.updateByExampleSelective(audit, auditExample);
            if (auditDaoEffectedCount <= 0) {
                throw new RuntimeException("审核处表更新失败");
            }
        } catch (Exception e) {
            throw new RuntimeException("审核处表更新失败");
        }

        return users.getUserId();
    }

    @Override
    @Transactional
    public int deleteAudit(List<Integer> auditIdList) {

        //将学院ID列表转换成相应的用户ID列表
        AuditExample auditExample = new AuditExample();
        auditExample.createCriteria().andAuditIdIn(auditIdList);
        List<Audit> collegeList = auditDao.selectByExample(auditExample);
        List<Integer> userIdList = new ArrayList<>();
        for (Audit user : collegeList) {
            userIdList.add(user.getUserId());
        }

        //删除学院信息
        try {
            int auditDaoEffectedCount = auditDao.deleteByExample(auditExample);
            if (auditDaoEffectedCount <= 0) {
                throw new RuntimeException("审核处表删除失败");
            }
        } catch (Exception e) {
            throw new RuntimeException("审核处表删除失败");
        }

        //删除权限信息
        try {
            AuthoritiesExample authoritiesExample = new AuthoritiesExample();
            authoritiesExample.createCriteria().andUserIdIn(userIdList);
            int authoritiesDaoEffectCount = authoritiesDao.deleteByExample(authoritiesExample);
            if (authoritiesDaoEffectCount <= 0) {
                throw new RuntimeException("权限表删除失败");
            }
        } catch (Exception e) {
            throw new RuntimeException("权限表删除失败");
        }

        //删除用户信息
        try {
            UserInfoExample userInfoExample = new UserInfoExample();
            userInfoExample.createCriteria().andUserIdIn(userIdList);
            int userInfoDapEffectedCount = userInfoDao.deleteByExample(userInfoExample);
            if (userInfoDapEffectedCount <= 0) {
                throw new RuntimeException("用户信息表删除错误");
            }
        } catch (Exception e) {
            throw new RuntimeException("用户信息表删除错误");
        }

        //删除用户
        try {
            UsersExample usersExample = new UsersExample();
            usersExample.createCriteria().andUserIdIn(userIdList);
            int usersDaoEffectedCount = usersDao.deleteByExample(usersExample);
            if (usersDaoEffectedCount <= 0) {
                throw new RuntimeException("用户表删除失败");
            }
        } catch (Exception e) {
            throw new RuntimeException("用户表删除失败");
        }

        return 1;
    }


}
