package com.hdc.service.impl;


import com.hdc.dao.EvaluationIndexDao;
import com.hdc.entity.EvaluationIndex;
import com.hdc.entity.EvaluationIndexExample;
import com.hdc.service.EvaluationIndexService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluationIndexServiceImpl implements EvaluationIndexService {

	@Autowired
	private EvaluationIndexDao evaluationIndexDao;

	@Override
	public long countByExample(EvaluationIndexExample example) {
		return evaluationIndexDao.countByExample(example);
	}

	@Override
	public int deleteByExample(EvaluationIndexExample example) {
		return evaluationIndexDao.deleteByExample(example);
	}

	@Override
	public int deleteByPrimaryKey(Integer evaluationIndexId) {
		return evaluationIndexDao.deleteByPrimaryKey(evaluationIndexId);
	}

	@Override
	public int insert(EvaluationIndex record) {
		return evaluationIndexDao.insert(record);
	}

	@Override
	public int insertSelective(EvaluationIndex record) {
		return evaluationIndexDao.insertSelective(record);
	}

	@Override
	public List<EvaluationIndex> selectByExample(EvaluationIndexExample example) {
		return evaluationIndexDao.selectByExample(example);
	}

	@Override
	public EvaluationIndex selectByPrimaryKey(Integer evaluationIndexId) {
		return evaluationIndexDao.selectByPrimaryKey(evaluationIndexId);
	}

	@Override
	public int updateByExampleSelective(EvaluationIndex record, EvaluationIndexExample example) {
		return evaluationIndexDao.updateByExampleSelective(record, example);
	}

	@Override
	public int updateByExample(EvaluationIndex record, EvaluationIndexExample example) {
		return evaluationIndexDao.updateByExample(record, example);
	}

	@Override
	public int updateByPrimaryKeySelective(EvaluationIndex record) {
		return evaluationIndexDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(EvaluationIndex record) {
		return evaluationIndexDao.updateByPrimaryKey(record);
	}
}
