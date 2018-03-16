package com.xywztech.bcrm.product.action;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
@Action(value = "/productInfoChart", results = { @Result(name = "success", type = "json") })
public class ProductInfoChartAction {

	@Autowired
    private CommonQueryService cqs;

    @Autowired
    private HttpServletRequest request;

    private Map<String, Object> map = new HashMap<String, Object>();

    private String dataXml = "";

    @SuppressWarnings("unchecked")
    public String index() {
        ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);

        // 当前客户ID 以后前台传过来
        String custId = request.getParameter("customerId");
        StringBuilder sb = new StringBuilder(
                "select z.* "
                        + "from acrm_f_ci_prd z where  z.cust_id='"
                        + custId
                        + "' and z.crm_dt = "
                         + "current date -1 day"
                        + " ");
        cqs.setPrimaryKey("z.bal");

        map = cqs.excuteQuery(sb.toString(), 0, 100000);
        List list = (List) map.get("data");

        StringBuilder xml = new StringBuilder();
        if (list != null && list.size() > 0) {
            Map m = (Map) list.get(0);

            // 资产
            String z_bal = (String) m.get("BAL");
            String z_bal_1 = "0";
            if (z_bal == null || "".equals(z_bal)) {
                z_bal_1 = "0";
            } else {
//                z_bal_1 = new BigDecimal(z_bal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
                z_bal_1 = new BigDecimal(z_bal).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
            }

            String rcv_int = (String) m.get("RCV");
            String rcv_int_1 = "0";
            if (rcv_int == null || "".equals(rcv_int)) {
                rcv_int_1 = "0";
            } else {
                rcv_int_1 = new BigDecimal(rcv_int).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
            }

            // 负债
            String f_bal = (String) m.get("BAL");
            String f_bal_1 = "0";
            if (f_bal == null || "".equals(f_bal)) {
                f_bal_1 = "0";
            } else {
                f_bal_1 = new BigDecimal(f_bal).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
            }

            // 中间业务
            String sell_amt = (String) m.get("CNT");
            String sell_amt_1 = "0";
            if (sell_amt == null || "".equals(sell_amt)) {
                sell_amt_1 = "0";
            } else {
                sell_amt_1 = new BigDecimal(sell_amt).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
            }
            String rcv = (String) m.get("RCV");
            String rcv_1 = "0";
            if (rcv == null || "".equals(rcv)) {
                rcv_1 = "0";
            } else {
                rcv_1 = new BigDecimal(rcv).setScale(0, BigDecimal.ROUND_HALF_UP).toString();
            }

            xml = xml
                    .append("<chart xaxisname=\"项目分类\" yaxisname=\"本年累计产品信息\"  caption=\"客户产品信息\"  palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\">"
                            + "<categories> "
                            + "<category label=\"资产\" /> "
                            + "<category label=\"负债\" />"
                            + "<category label=\"中间业务\" />"
                            + "</categories>"
                            + "<dataset SeriesName=\"余额(万元)\"> "
                            + "<set value=\""
                            + z_bal_1
                            + "\" />"
                            + "<set value=\""
                            + f_bal_1
                            + "\" />"
                            + "<set value=\""
                            + sell_amt_1
                            + "\" />"
                            + "</dataset>"
                            + "<dataset SeriesName=\"收益(万元)\"> "
                            + "<set value=\""
                            + rcv_int_1
                            + "\" />"
                            + "<set value=\"0\" />"
                            + "<set value=\""
                            + rcv_1
                            + "\" />" + "</dataset>" + "</chart>");
            if (list.size() > 0) {
                dataXml = xml.toString();
            }
            //system.out.printlnln(xml.toString());
        }
        return "success";
    }

    // HttpServletResponse response = ServletActionContext.getResponse();
    // response.setCharacterEncoding("UTF-8");
    // try {
    // if( list.size() != 0) {
    // response.getWriter().write(xml.toString());
    // }
    // } catch (Exception ex) {
    // ex.printStackTrace();
    // }
    public String getDataXml() {
        return dataXml;
    }

}
