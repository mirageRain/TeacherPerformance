package com.hdc.service.impl;


import com.hdc.dao.ObservationPointDao;
import com.hdc.entity.ObservationPoint;
import com.hdc.entity.ObservationPointExample;
import com.hdc.service.ObservationPointService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObservationPointServiceImpl implements ObservationPointService {

	@Autowired
	private ObservationPointDao observationPointDao;

	@Override
	public long countByExample(ObservationPointExample example) {
		return observationPointDao.countByExample(example);
	}

	@Override
	public int deleteByExample(ObservationPointExample example) {
		return observationPointDao.deleteByExample(example);
	}

	@Override
	public int deleteByPrimaryKey(Integer observationPointId) {
		return observationPointDao.deleteByPrimaryKey(observationPointId);
	}

	@Override
	public int insert(ObservationPoint record) {
		return observationPointDao.insert(record);
	}

	@Override
	public int insertSelective(ObservationPoint record) {
		return observationPointDao.insertSelective(record);
	}

	@Override
	public List<ObservationPoint> selectByExample(ObservationPointExample example) {
		return observationPointDao.selectByExample(example);
	}

	@Override
	public ObservationPoint selectByPrimaryKey(Integer observationPointId) {
		return observationPointDao.selectByPrimaryKey(observationPointId);
	}

	@Override
	public int updateByExampleSelective(ObservationPoint record, ObservationPointExample example) {
		return observationPointDao.updateByExampleSelective(record, example);
	}

	@Override
	public int updateByExample(ObservationPoint record, ObservationPointExample example) {
		return observationPointDao.updateByExample(record, example);
	}

	@Override
	public int updateByPrimaryKeySelective(ObservationPoint record) {
		return observationPointDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(ObservationPoint record) {
		return observationPointDao.updateByPrimaryKey(record);
	}
}
