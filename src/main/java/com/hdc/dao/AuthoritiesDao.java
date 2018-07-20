package com.hdc.dao;

import java.util.List;

import com.hdc.entity.AuthoritiesEntity;

public interface AuthoritiesDao {
	/**
	 * 查询权限列表
	 * @return
	 */
	List<AuthoritiesEntity> queryAuthorities();
}
