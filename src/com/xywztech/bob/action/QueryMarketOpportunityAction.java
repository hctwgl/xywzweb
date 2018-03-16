package com.xywztech.bob.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.service.CommonQueryService;

@ParentPackage("json-default")
@Action(value = "/querymarketopportunity", results = { @Result(name = "success", type = "json") })
public class QueryMarketOpportunityAction extends BaseAction {

	@Autowired
    private CommonQueryService cqs;
    private HttpServletRequest request;

    public String index() {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String customerId = request.getParameter("customerId");

        StringBuilder sb = new StringBuilder(
                "select a.*,b.MKT_ACTI_NAME,c.MKT_PLAN_CHARGE,d.OPPOR_STAGE_ID "
                        + "from OCRM_F_MM_MKT_OPPORTUNITY a LEFT JOIN "
                        + "OCRM_F_MM_MKT_ACTIVITY b ON a.MKT_ACTI_ID=b.MKT_ACTI_ID "
                        + "LEFT JOIN OCRM_F_MM_MKT_PLAN c ON b.PLAN_ID=c.PLAN_ID "
                        + "LEFT JOIN OCRM_F_MM_OPPOR_STAGE d ON a.MKT_OPPOR_ID=d.MKT_OPPOR_ID "
                        + "where a.AIM_CUST_ID= '" + customerId + "'");
        for (String key : this.getJson().keySet()) {
            if (null != this.getJson().get(key)
                    && !this.getJson().get(key).equals("")) {
                if (key.equals("MKT_OPPOR_NAME"))
                    sb.append(" and a." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                else if (key.equals("MKT_OPPOR_STAT"))
                    sb.append(" and a." + key + "= '" + this.getJson().get(key)
                            + "'");
                else if (key.equals("OPPOR_START_DATE"))
                    sb.append(" and a." + key + ">= to_date('"
                            + this.getJson().get(key) + "','yyyy-MM-dd')");
                else if (key.equals("OPPOR_END_DATE"))
                    sb.append(" and a." + key + "<= to_date('"
                            + this.getJson().get(key) + "','yyyy-MM-dd')");
            }
        }

        cqs.setPrimaryKey("a.MKT_OPPOR_ID");
        this.setJson(cqs.excuteQuery(sb.toString(), this.getStart(),
                this.getLimit()));
        return "success";
    }

}
