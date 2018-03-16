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
@Action(value = "/querymarketactivity", results = { @Result(name = "success", type = "json") })
public class QueryMarketActivityAction extends BaseAction {

	@Autowired
    private CommonQueryService cqs;
    private HttpServletRequest request;

    public String index() {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
        String customerId = request.getParameter("customerId");

        StringBuilder sb = new StringBuilder(
                "select a.*,b.MKT_PLAN_CHARGE from OCRM_F_MM_MKT_ACTIVITY a LEFT JOIN "
                        + "OCRM_F_MM_MKT_PLAN b ON a.PLAN_ID=b.PLAN_ID "
                        + "where a.ACTI_CUST_ID= '" + customerId + "'");
        for (String key : this.getJson().keySet()) {
            if (null != this.getJson().get(key)
                    && !this.getJson().get(key).equals("")) {
                if (key.equals("MKT_ACTI_NAME"))
                    sb.append(" and a." + key + " like '%"
                            + this.getJson().get(key) + "%'");
                else if (key.equals("ACTI_COMPL_CIRC"))
                    sb.append(" and a." + key + "= '" + this.getJson().get(key)
                            + "'");
                else if (key.equals("ACTI_START_DATE"))
                    sb.append(" and a." + key + ">= to_date('" + this.getJson().get(key)+"','yyyy-MM-dd')");
                else if (key.equals("ACTI_END_DATE"))
                    sb.append(" and a." + key + "<= to_date('" + this.getJson().get(key)+"','yyyy-MM-dd')");
            }
        }

        cqs.setPrimaryKey("a.MKT_ACTI_ID");
        this.setJson(cqs.excuteQuery(sb.toString(), this.getStart(),
                this.getLimit()));
        return "success";
    }

}
