package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the xywz_sale_inland_quotn_sngl database table.
 * 
 */
@Entity
@Table(name="xywz_sale_inland_quotn_sngl")
public class XywzSaleInlandQuotnSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="SNGL_ID")
	private Long snglId;

	@Column(name="BIZ_CONTCR_ID")
	private String bizContcrId;

	@Column(name="BIZ_CONTCR_NM")
	private String bizContcrNm;

	@Column(name="CHK_STAT")
	private String chkStat;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="INPUT_PERS_NM")
	private String inputPersNm;

	@Column(name="LAST_MDFR")
	private String lastMdfr;

	@Column(name="LAST_MDFR_ID")
	private String lastMdfrId;

    @Temporal( TemporalType.DATE)
	@Column(name="LAST_MODI_DT")
	private Date lastModiDt;

    @Temporal( TemporalType.DATE)
	@Column(name="QUOTN_DT")
	private Date quotnDt;

	@Column(name="QUOTN_SNGL_ID")
	private String quotnSnglId;

    public XywzSaleInlandQuotnSngl() {
    }

	public Long getSnglId() {
		return this.snglId;
	}

	public void setSnglId(Long snglId) {
		this.snglId = snglId;
	}

	public String getBizContcrId() {
		return this.bizContcrId;
	}

	public void setBizContcrId(String bizContcrId) {
		this.bizContcrId = bizContcrId;
	}

	public String getBizContcrNm() {
		return this.bizContcrNm;
	}

	public void setBizContcrNm(String bizContcrNm) {
		this.bizContcrNm = bizContcrNm;
	}

	public String getChkStat() {
		return this.chkStat;
	}

	public void setChkStat(String chkStat) {
		this.chkStat = chkStat;
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

	public String getLastMdfr() {
		return this.lastMdfr;
	}

	public void setLastMdfr(String lastMdfr) {
		this.lastMdfr = lastMdfr;
	}

	public String getLastMdfrId() {
		return this.lastMdfrId;
	}

	public void setLastMdfrId(String lastMdfrId) {
		this.lastMdfrId = lastMdfrId;
	}

	public Date getLastModiDt() {
		return this.lastModiDt;
	}

	public void setLastModiDt(Date lastModiDt) {
		this.lastModiDt = lastModiDt;
	}

	public Date getQuotnDt() {
		return this.quotnDt;
	}

	public void setQuotnDt(Date quotnDt) {
		this.quotnDt = quotnDt;
	}

	public String getQuotnSnglId() {
		return this.quotnSnglId;
	}

	public void setQuotnSnglId(String quotnSnglId) {
		this.quotnSnglId = quotnSnglId;
	}

}