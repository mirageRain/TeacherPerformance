package com.hdc.service.impl;

import com.hdc.dao.CollegeDao;
import com.hdc.dao.UserLoginDao;
import com.hdc.entity.College;
import com.hdc.entity.CollegeExample;
import com.hdc.entity.UserLoginEntity;
import com.hdc.service.CollegeService;
import com.hdc.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class collegeServiceImpl implements CollegeService {

	@Autowired
	private CollegeDao collegeDao;


	@Override
	public long countByExample(CollegeExample example) {
		long index = collegeDao.countByExample(example);
		return index;
	}

	@Override
	public int deleteByExample(CollegeExample example) {

		return collegeDao.deleteByExample(example);
	}

	@Override
	public int deleteByPrimaryKey(Integer collegeId) {
		return collegeDao.deleteByPrimaryKey(collegeId);

	}

	@Override
	public int insert(College record) {
		return collegeDao.insert(record);
	}

	@Override
	public int insertSelective(College record) {
		return collegeDao.insertSelective(record);
	}

	@Override
	public List<College> selectByExample(CollegeExample example) {
		return collegeDao.selectByExample(example);
	}

	@Override
	public List<College> selectAll() {
		return collegeDao.selectAll();
	}

	@Override
	public College selectByPrimaryKey(Integer collegeId) {
		return collegeDao.selectByPrimaryKey(collegeId);

	}

	@Override
	public int updateByExampleSelective(College record, CollegeExample example) {
		return collegeDao.updateByExampleSelective(record,example);
	}

	@Override
	public int updateByExample(College record, CollegeExample example) {
		return collegeDao.updateByExample(record,  example);
	}

	@Override
	public int updateByPrimaryKeySelective(College record) {
		return updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(College record) {
		return updateByPrimaryKey(record);
	}
}
