package com.xywz.plan.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;


/**
 * The persistent class for the xywz_plan_prdc_plan_merchd_rela database table.
 * 
 */
@Entity
@Table(name="xywz_plan_prdc_plan_merchd_rela")
public class XywzPlanPrdcPlanMerchdRela implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ADVS_MERCHD_ID")
	private Long advsMerchdId;

	@Column(name="MERCHD_ID")
	private BigInteger merchdId;

	@Column(name="PRDC_PLAN_ADVS_ID")
	private BigInteger prdcPlanAdvsId;

    public XywzPlanPrdcPlanMerchdRela() {
    }

	public Long getAdvsMerchdId() {
		return this.advsMerchdId;
	}

	public void setAdvsMerchdId(Long advsMerchdId) {
		this.advsMerchdId = advsMerchdId;
	}

	public BigInteger getMerchdId() {
		return this.merchdId;
	}

	public void setMerchdId(BigInteger merchdId) {
		this.merchdId = merchdId;
	}

	public BigInteger getPrdcPlanAdvsId() {
		return this.prdcPlanAdvsId;
	}

	public void setPrdcPlanAdvsId(BigInteger prdcPlanAdvsId) {
		this.prdcPlanAdvsId = prdcPlanAdvsId;
	}

}