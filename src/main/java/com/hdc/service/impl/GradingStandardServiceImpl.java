package com.hdc.service.impl;


import com.hdc.dao.GradingStandardDao;
import com.hdc.entity.GradingStandard;
import com.hdc.entity.GradingStandardExample;
import com.hdc.service.GradingStandardService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradingStandardServiceImpl implements GradingStandardService {

	@Autowired
	private GradingStandardDao gradingStandardDao;

	@Override
	public long countByExample(GradingStandardExample example) {
		return gradingStandardDao.countByExample(example);
	}

	@Override
	public int deleteByExample(GradingStandardExample example) {
		return gradingStandardDao.deleteByExample(example);
	}

	@Override
	public int deleteByPrimaryKey(Integer gradingStandardId) {
		return gradingStandardDao.deleteByPrimaryKey(gradingStandardId);
	}

	@Override
	public int insert(GradingStandard record) {
		return gradingStandardDao.insert(record);
	}

	@Override
	public int insertSelective(GradingStandard record) {
		return gradingStandardDao.insertSelective(record);
	}

	@Override
	public List<GradingStandard> selectByExample(GradingStandardExample example) {
		return gradingStandardDao.selectByExample(example);
	}

	@Override
	public GradingStandard selectByPrimaryKey(Integer gradingStandardId) {
		return gradingStandardDao.selectByPrimaryKey(gradingStandardId);
	}

	@Override
	public int updateByExampleSelective(GradingStandard record, GradingStandardExample example) {
		return gradingStandardDao.updateByExampleSelective(record, example);
	}

	@Override
	public int updateByExample(GradingStandard record, GradingStandardExample example) {
		return gradingStandardDao.updateByExample(record, example);
	}

	@Override
	public int updateByPrimaryKeySelective(GradingStandard record) {
		return gradingStandardDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(GradingStandard record) {
		return gradingStandardDao.updateByPrimaryKey(record);
	}
}
