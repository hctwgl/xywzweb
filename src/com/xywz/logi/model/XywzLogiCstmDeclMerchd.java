package com.xywz.logi.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the xywz_para_bank database table.
 * 
 */
@Entity
@Table(name="XYWZ_LOGI_CSTM_DECL_MERCHD")
public class XywzLogiCstmDeclMerchd implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CSTM_DECL_MERCHD_ID")
	private Long cstmDeclMerchdId;

	@Column(name="CSTM_DECL_CN_HS_CODE")
	private String cstmDeclCnHsCode;

	@Column(name="CSTM_DECL_RLTV_CD")
	private String cstmDeclRltvCd;

	@Column(name="DTL_DESC")
	private String dtlDesc;

    public XywzLogiCstmDeclMerchd() {
    }

	public Long getCstmDeclMerchdId() {
		return this.cstmDeclMerchdId;
	}

	public void setCstmDeclMerchdId(Long cstmDeclMerchdId) {
		this.cstmDeclMerchdId = cstmDeclMerchdId;
	}

	public String getCstmDeclCnHsCode() {
		return this.cstmDeclCnHsCode;
	}

	public void setCstmDeclCnHsCode(String cstmDeclCnHsCode) {
		this.cstmDeclCnHsCode = cstmDeclCnHsCode;
	}

	public String getCstmDeclRltvCd() {
		return this.cstmDeclRltvCd;
	}

	public void setCstmDeclRltvCd(String cstmDeclRltvCd) {
		this.cstmDeclRltvCd = cstmDeclRltvCd;
	}

	public String getDtlDesc() {
		return this.dtlDesc;
	}

	public void setDtlDesc(String dtlDesc) {
		this.dtlDesc = dtlDesc;
	}
}