package com.hdc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hdc.dao.AuthoritiesDao;
import com.hdc.entity.AuthoritiesEntity;
import com.hdc.service.AuthoritiesService;

@Service
public class AuthoritiesServiceImpl implements AuthoritiesService{

	@Autowired
	private AuthoritiesDao authoritiesDao;
	
	@Override
	public List<AuthoritiesEntity> getAuthoritiesList() {
		List<AuthoritiesEntity> AuthoritiesList=authoritiesDao.queryAuthorities();
		return AuthoritiesList;
	}

}
