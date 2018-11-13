package com.hdc.service.impl;

import com.hdc.dao.SystemConfigDao;
import com.hdc.dao.UserInfoDao;
import com.hdc.entity.SystemConfig;
import com.hdc.entity.SystemConfigExample;
import com.hdc.entity.UserInfo;
import com.hdc.entity.UserInfoExample;
import com.hdc.service.SystemConfigService;
import com.hdc.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SystemConfigServiceImpl implements SystemConfigService {

	@Autowired
	private SystemConfigDao systemConfigDao;


	@Override
	public long countByExample(SystemConfigExample example) {
		return systemConfigDao.countByExample(example);
	}

	@Override
	@Transactional
	public int deleteByExample(SystemConfigExample example) {
		return systemConfigDao.deleteByExample(example);
	}

	@Override
	@Transactional
	public int deleteByPrimaryKey(Integer systemConfigId) {
		return systemConfigDao.deleteByPrimaryKey(systemConfigId);
	}

	@Override
	@Transactional
	public int insert(SystemConfig record) {
		return systemConfigDao.insert(record);
	}

	@Override
	public int insertSelective(SystemConfig record) {
		return systemConfigDao.insertSelective(record);
	}

	@Override
	public List<SystemConfig> selectByExample(SystemConfigExample example) {
		return systemConfigDao.selectByExample(example);
	}

	@Override
	public SystemConfig selectByPrimaryKey(Integer systemConfigId) {
		return systemConfigDao.selectByPrimaryKey(systemConfigId);
	}

	@Override
	@Transactional
	public int updateByExampleSelective(SystemConfig record, SystemConfigExample example) {
		return systemConfigDao.updateByExampleSelective(record, example);
	}

	@Override
	@Transactional
	public int updateByExample(SystemConfig record, SystemConfigExample example) {
		return systemConfigDao.updateByExample(record, example);
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(SystemConfig record) {
		return systemConfigDao.updateByPrimaryKeySelective(record);
	}

	@Override
	@Transactional
	public int updateByPrimaryKey(SystemConfig record) {
		return systemConfigDao.updateByPrimaryKey(record);
	}
}
