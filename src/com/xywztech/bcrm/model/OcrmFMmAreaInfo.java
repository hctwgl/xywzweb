package com.xywztech.bcrm.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_MM_AREA_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_AREA_INFO")
public class OcrmFMmAreaInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_MM_AREA_INFO_AREAID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_AREA_INFO_AREAID_GENERATOR")
	@Column(name="AREA_ID")
	private String areaId;

	@Column(name="AREA_NAME")
	private String areaName;

	private String flag;

	@Column(name="UP_AREA_ID")
	private String upAreaId;

    public OcrmFMmAreaInfo() {
    }

	public String getAreaId() {
		return this.areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getAreaName() {
		return this.areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getUpAreaId() {
		return this.upAreaId;
	}

	public void setUpAreaId(String upAreaId) {
		this.upAreaId = upAreaId;
	}

}