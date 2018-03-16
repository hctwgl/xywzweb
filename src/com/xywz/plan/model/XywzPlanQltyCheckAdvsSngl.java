package com.xywz.plan.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the xywz_plan_qlty_check_advs_sngl database table.
 * 
 */
@Entity
@Table(name="xywz_plan_qlty_check_advs_sngl")
public class XywzPlanQltyCheckAdvsSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="QUAL_ID")
	private Long qualId;

	@Column(name="LAST_MDFR")
	private String lastMdfr;

	@Column(name="LAST_MDFR_NM")
	private String lastMdfrNm;

    @Temporal( TemporalType.DATE)
	@Column(name="MODI_DT")
	private Date modiDt;

	@Column(name="NO")
	private String no;

    public XywzPlanQltyCheckAdvsSngl() {
    }

	public Long getQualId() {
		return this.qualId;
	}

	public void setQualId(Long qualId) {
		this.qualId = qualId;
	}

	public String getLastMdfr() {
		return this.lastMdfr;
	}

	public void setLastMdfr(String lastMdfr) {
		this.lastMdfr = lastMdfr;
	}

	public String getLastMdfrNm() {
		return this.lastMdfrNm;
	}

	public void setLastMdfrNm(String lastMdfrNm) {
		this.lastMdfrNm = lastMdfrNm;
	}

	public Date getModiDt() {
		return this.modiDt;
	}

	public void setModiDt(Date modiDt) {
		this.modiDt = modiDt;
	}

	public String getNo() {
		return this.no;
	}

	public void setNo(String no) {
		this.no = no;
	}

}