package com.xywztech.bob.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the OCRM_F_MM_CHANNEL_INFO database table. 
 * 渠道管理表
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "PERSON")
public class PersonInfo implements Serializable {

	//private static final long serialVersionUID = 2476367195732252769L;

	/** 渠道ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "id",nullable = false)
	private Long id;

	/** 准入条件 */
	@Column(name = "name", length = 800)
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	/** 渠道特点 */
	@Column(name = "sex", length = 800)
	private String sex;

	/** 渠道政策 */
	@Column(name = "age", length = 800)
	private String age;

	}