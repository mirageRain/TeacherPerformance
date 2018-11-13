package com.hdc.entity;

import java.util.ArrayList;
import java.util.List;

public class SystemConfigExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    public SystemConfigExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getOffset() {
        return offset;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andSystemConfigIdIsNull() {
            addCriterion("system_config_id is null");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdIsNotNull() {
            addCriterion("system_config_id is not null");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdEqualTo(Integer value) {
            addCriterion("system_config_id =", value, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdNotEqualTo(Integer value) {
            addCriterion("system_config_id <>", value, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdGreaterThan(Integer value) {
            addCriterion("system_config_id >", value, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("system_config_id >=", value, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdLessThan(Integer value) {
            addCriterion("system_config_id <", value, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdLessThanOrEqualTo(Integer value) {
            addCriterion("system_config_id <=", value, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdIn(List<Integer> values) {
            addCriterion("system_config_id in", values, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdNotIn(List<Integer> values) {
            addCriterion("system_config_id not in", values, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdBetween(Integer value1, Integer value2) {
            addCriterion("system_config_id between", value1, value2, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemConfigIdNotBetween(Integer value1, Integer value2) {
            addCriterion("system_config_id not between", value1, value2, "systemConfigId");
            return (Criteria) this;
        }

        public Criteria andSystemOpenIsNull() {
            addCriterion("system_open is null");
            return (Criteria) this;
        }

        public Criteria andSystemOpenIsNotNull() {
            addCriterion("system_open is not null");
            return (Criteria) this;
        }

        public Criteria andSystemOpenEqualTo(Byte value) {
            addCriterion("system_open =", value, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenNotEqualTo(Byte value) {
            addCriterion("system_open <>", value, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenGreaterThan(Byte value) {
            addCriterion("system_open >", value, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenGreaterThanOrEqualTo(Byte value) {
            addCriterion("system_open >=", value, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenLessThan(Byte value) {
            addCriterion("system_open <", value, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenLessThanOrEqualTo(Byte value) {
            addCriterion("system_open <=", value, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenIn(List<Byte> values) {
            addCriterion("system_open in", values, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenNotIn(List<Byte> values) {
            addCriterion("system_open not in", values, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenBetween(Byte value1, Byte value2) {
            addCriterion("system_open between", value1, value2, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemOpenNotBetween(Byte value1, Byte value2) {
            addCriterion("system_open not between", value1, value2, "systemOpen");
            return (Criteria) this;
        }

        public Criteria andSystemYearIsNull() {
            addCriterion("system_year is null");
            return (Criteria) this;
        }

        public Criteria andSystemYearIsNotNull() {
            addCriterion("system_year is not null");
            return (Criteria) this;
        }

        public Criteria andSystemYearEqualTo(Integer value) {
            addCriterion("system_year =", value, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearNotEqualTo(Integer value) {
            addCriterion("system_year <>", value, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearGreaterThan(Integer value) {
            addCriterion("system_year >", value, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearGreaterThanOrEqualTo(Integer value) {
            addCriterion("system_year >=", value, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearLessThan(Integer value) {
            addCriterion("system_year <", value, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearLessThanOrEqualTo(Integer value) {
            addCriterion("system_year <=", value, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearIn(List<Integer> values) {
            addCriterion("system_year in", values, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearNotIn(List<Integer> values) {
            addCriterion("system_year not in", values, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearBetween(Integer value1, Integer value2) {
            addCriterion("system_year between", value1, value2, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemYearNotBetween(Integer value1, Integer value2) {
            addCriterion("system_year not between", value1, value2, "systemYear");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterIsNull() {
            addCriterion("system_semester is null");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterIsNotNull() {
            addCriterion("system_semester is not null");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterEqualTo(Integer value) {
            addCriterion("system_semester =", value, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterNotEqualTo(Integer value) {
            addCriterion("system_semester <>", value, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterGreaterThan(Integer value) {
            addCriterion("system_semester >", value, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterGreaterThanOrEqualTo(Integer value) {
            addCriterion("system_semester >=", value, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterLessThan(Integer value) {
            addCriterion("system_semester <", value, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterLessThanOrEqualTo(Integer value) {
            addCriterion("system_semester <=", value, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterIn(List<Integer> values) {
            addCriterion("system_semester in", values, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterNotIn(List<Integer> values) {
            addCriterion("system_semester not in", values, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterBetween(Integer value1, Integer value2) {
            addCriterion("system_semester between", value1, value2, "systemSemester");
            return (Criteria) this;
        }

        public Criteria andSystemSemesterNotBetween(Integer value1, Integer value2) {
            addCriterion("system_semester not between", value1, value2, "systemSemester");
            return (Criteria) this;
        }
    }

    /**
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}