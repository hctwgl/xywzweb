package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_CI_CUST_RALE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_RALE")
public class AcrmFCiCustRale implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_RALE_MXTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_RALE_MXTID_GENERATOR")
	@Column(name ="mxtid",unique=true, nullable=false)
	private Long mxtid;

	private BigDecimal amt;
	
	@Temporal( TemporalType.DATE)
	private Date birthday;

	@Column(name="CONTACT_PHONE")
	private String contactPhone;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_ORG")
	private String createOrg;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	private String demo;

	private String direct;

	@Column(name="KG_RATE")
	private BigDecimal kgRate;

	@Column(name="MAX_EDU")
	private String maxEdu;

	private String position;

	@Column(name="RELA_CUST_ID")
	private String relaCustId;

	@Column(name="RELA_CUST_NAME")
	private String relaCustName;

	@Column(name="RELATION_NAME")
	private String relationName;

	@Column(name="RELATION_TYPE")
	private String relationType;

	@Column(name="SX_AMT")
	private BigDecimal sxAmt;

	private String telphone;

	@Column(name="WORKK_UNIT")
	private String workkUnit;

	@Column(name="YX_BAL")
	private BigDecimal yxBal;

    public AcrmFCiCustRale() {
    }

	public Long getMxtid() {
		return this.mxtid;
	}

	public void setMxtid(Long mxtid) {
		this.mxtid = mxtid;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}
	public void setAmt(String amt) {
		if(amt!=null){
			this.amt = BigDecimal.valueOf(Double.parseDouble(amt));
		}
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getContactPhone() {
		return this.contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateOrg() {
		return this.createOrg;
	}

	public void setCreateOrg(String createOrg) {
		this.createOrg = createOrg;
	}

	public String getCreateUser() {
		return this.createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getDemo() {
		return this.demo;
	}

	public void setDemo(String demo) {
		this.demo = demo;
	}

	public String getDirect() {
		return this.direct;
	}

	public void setDirect(String direct) {
		this.direct = direct;
	}

	public BigDecimal getKgRate() {
		return this.kgRate;
	}

	public void setKgRate(BigDecimal kgRate) {
		this.kgRate = kgRate;
	}
	public void setKgRate(String kgRate) {
		if(kgRate!=null){
			this.kgRate = BigDecimal.valueOf(Double.parseDouble(kgRate));
		}
	}
	public String getMaxEdu() {
		return this.maxEdu;
	}

	public void setMaxEdu(String maxEdu) {
		this.maxEdu = maxEdu;
	}

	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getRelaCustId() {
		return this.relaCustId;
	}

	public void setRelaCustId(String relaCustId) {
		this.relaCustId = relaCustId;
	}

	public String getRelaCustName() {
		return this.relaCustName;
	}

	public void setRelaCustName(String relaCustName) {
		this.relaCustName = relaCustName;
	}

	public String getRelationName() {
		return this.relationName;
	}

	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}

	public String getRelationType() {
		return this.relationType;
	}

	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}

	public BigDecimal getSxAmt() {
		return this.sxAmt;
	}

	public void setSxAmt(BigDecimal sxAmt) {
		this.sxAmt = sxAmt;
	}
	public void setSxAmt(String sxAmt) {
		if(sxAmt!=null){
			this.sxAmt = BigDecimal.valueOf(Double.parseDouble(sxAmt));
		}
	}
	public String getTelphone() {
		return this.telphone;
	}

	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	public String getWorkkUnit() {
		return this.workkUnit;
	}

	public void setWorkkUnit(String workkUnit) {
		this.workkUnit = workkUnit;
	}

	public BigDecimal getYxBal() {
		return this.yxBal;
	}

	public void setYxBal(BigDecimal yxBal) {
		this.yxBal = yxBal;
	}
	public void setYxBal(String yxBal) {
		if(yxBal!=null){
			this.yxBal = BigDecimal.valueOf(Double.parseDouble(yxBal));
		}
	}

}