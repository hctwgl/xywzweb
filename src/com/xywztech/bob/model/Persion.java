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
 * 练习表
 */
@Entity
@Table(name = "PERSON")
public class Persion implements Serializable {

	private static final long serialVersionUID = 2476367195732252769L;

	/** PERSON_ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "PERSON_ID",nullable = false)
	private Long personid;

	/** 准入条件 */
	@Column(name = "ID", length = 20)
	private String id;

	/** 渠道特点 */
	@Column(name = "FIRSTNAME", length = 20)
	private String firstname;

	/** 渠道政策 */
	@Column(name = "LASTNAME", length = 20)
	private String lastname;

	/** 渠道类型 */
	@Column(name = "SEX", length = 20)
	private String sex;

	/** 渠道编号 */
	@Column(name = "BIRTHDAY", length = 400)
	private String birthday;

	

	public Long getPersonid() {
		return personid;
	}



	public void setPersonid(Long personid) {
		this.personid = personid;
	}



	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}



	public String getFirstname() {
		return firstname;
	}



	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}



	public String getLastname() {
		return lastname;
	}



	public void setLastname(String lastname) {
		this.lastname = lastname;
	}



	public String getSex() {
		return sex;
	}



	public void setSex(String sex) {
		this.sex = sex;
	}



	public String getBirthday() {
		return birthday;
	}



	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}