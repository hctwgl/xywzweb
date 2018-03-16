package com.xywz.plan.model;

import java.io.Serializable;
import javax.persistence.*;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_plan_prd_state database table.
 * 
 */
@Entity
@Table(name="xywz_plan_prd_state")
public class XywzPlanPrdState implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PRODID")
	private Long prodid;

	@Column(name="HS_CODE")
	private String hsCode;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="INPUT_PERS_NM")
	private String inputPersNm;

	@Column(name="JIAN_CNT")
	private int jianCnt;

	@Column(name="PROD_STATE")
	private String prodState;

	@Column(name="REM_CNT")
	private int remCnt;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="WEIGHT")
	private BigDecimal weight;

	@Column(name="WORK_SHOP")
	private String workShop;

	@Column(name="ZHI_CNT")
	private int zhiCnt;

    public XywzPlanPrdState() {
    }

	public Long getProdid() {
		return this.prodid;
	}

	public void setProdid(Long prodid) {
		this.prodid = prodid;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getInputPersId() {
		return this.inputPersId;
	}

	public void setInputPersId(String inputPersId) {
		this.inputPersId = inputPersId;
	}

	public String getInputPersNm() {
		return this.inputPersNm;
	}

	public void setInputPersNm(String inputPersNm) {
		this.inputPersNm = inputPersNm;
	}

	public int getJianCnt() {
		return this.jianCnt;
	}

	public void setJianCnt(int jianCnt) {
		this.jianCnt = jianCnt;
	}

	public String getProdState() {
		return this.prodState;
	}

	public void setProdState(String prodState) {
		this.prodState = prodState;
	}

	public int getRemCnt() {
		return this.remCnt;
	}

	public void setRemCnt(int remCnt) {
		this.remCnt = remCnt;
	}

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public String getWorkShop() {
		return this.workShop;
	}

	public void setWorkShop(String workShop) {
		this.workShop = workShop;
	}

	public int getZhiCnt() {
		return this.zhiCnt;
	}

	public void setZhiCnt(int zhiCnt) {
		this.zhiCnt = zhiCnt;
	}

}