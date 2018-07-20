package com.hdc.security;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.Resource;


import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * 从数据库中读入用户的密码，角色信息，是否锁定，账号是否过期等
 * 
 */
public class MyUserDetailService implements UserDetailsService {
	
//    @Resource
//    private UserService userService;

    /**
     * 数据库交互获取用户拥有的权限角色，并设置权限
     */
    @Override
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException, DataAccessException {
        // 根据登录用户名获取用户信息
//        Users user = new Users();
//        user.setUserCode(username);
//        user = userService.selectByModel(user);
//        if (null != user) {
            // 存放权限
            Collection<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();
                String action = "ROLE_USER";
              
                    String[] roleaCtion = action.split(",");
                    for (int i = 0; i < roleaCtion.length; i++) {
                        SimpleGrantedAuthority auth = new SimpleGrantedAuthority(roleaCtion[i]);
                        auths.add(auth);
                    }
                
                //spring security自带的User对象
            User userDetails = new User("admin", "123456", true, true, true, true, auths);
            return userDetails;
//        }
//        return null;
    }
}