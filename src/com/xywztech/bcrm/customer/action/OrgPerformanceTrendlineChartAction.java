package com.xywztech.bcrm.customer.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.service.CommonQueryService;

@ParentPackage("json-default")
@Action(value="/orgPerformanceTrendline", results={
    @Result(name="success", type="json")
})
public class OrgPerformanceTrendlineChartAction {
	
	@Autowired
    private CommonQueryService cqs;
	
	@Autowired
	private HttpServletRequest request;

	private Map<String, Object> map = new HashMap<String, Object>();
	
	private String dataXml = ""; 

	@SuppressWarnings("unchecked")
	public String index() {
		 ActionContext ctx = ActionContext.getContext();
		 request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);

		// 统计年份始
		String startLoanYear = request.getParameter("startLoanYear");
		
		// 统计月份
		String startLoanMonth = request.getParameter("startLoanMonth");
		
        // 统计条件	
		String tempCondtion = request.getParameter("condition");
		
        // 统计年份止
		String crmDtEnd = request.getParameter("crmDtEnd");

		// 笔数、按日期统计		
    	if(tempCondtion.toString().equals("1")&&(startLoanYear != null && !"".equals(startLoanYear))&&(startLoanMonth != null && !"".equals(startLoanMonth))){
    		StringBuilder sb = new StringBuilder("select a.START_LOAN_YEAR,a.START_LOAN_MONTH,a.start_loan_dt,count(cont_amt) as total_amt,"+
    				" count(case  a.start_loan_dt when b.start_loan_dt then cont_amt else 0 end)  as new_amt"+
    				" from ACRM_F_CI_TINY_LOAN a left join ACRM_F_CI_TINY_LOAN_DATE b on a.custom_id=b.custom_id"+
    				" group by a.start_loan_dt,a.START_LOAN_YEAR,a.START_LOAN_MONTH"+
    				" having");
    		
    			sb.append(" a.start_loan_year = '"+startLoanYear+"' ");
    			sb.append(" and a.start_loan_month ='"+startLoanMonth+"'");
    			sb.append(" order by a.start_loan_dt");
    		

    		cqs.setPrimaryKey("a.start_loan_dt");
    		map = cqs.excuteQuery(sb.toString(), 0, 100000);
    		List list = (List) map.get("data");
    		// 总放款笔数xml 
    		StringBuilder depBalXml = new StringBuilder("<dataset SeriesName=\"总放款笔数\">");
    		// 新增放款笔数xml 
    		StringBuilder depAvgXml = new StringBuilder("<dataset SeriesName=\"新增放款笔数\">");
            
    		StringBuilder crmDtXml = new StringBuilder("<categories>");
    		
    		for(int i = 0; i < list.size(); i++) {
    			Map m = (Map)list.get(i);
    			
    			// 总放款笔数
    			String depBal = (String)m.get("TOTAL_AMT");
    			if(depBal == null || "".equals(depBal)) {
    				depBal = "0";
    			} else {
//    				depBal = new BigDecimal(depBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    			}

    			// 新增放款笔数
    			String depAvg = (String)m.get("NEW_AMT");
    			System.out.println(depAvg);
    			if(depAvg == null || "".equals(depAvg)) {
    				depAvg = "0";
    			} else {
//    				depAvg = new BigDecimal(depAvg).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    			}
    			
    			
    			// 横轴日期
    			String crmDt  = (String)m.get("START_LOAN_DT");
    			
    			depBalXml.append("<set value=\"" + depBal  + "\" />");
    			depAvgXml.append("<set value=\"" + depAvg  + "\" />");
    			crmDtXml.append("<category label=\"" + crmDt  + "\" />");
    		}
    	 
    		depBalXml.append("</dataset>");
    		depAvgXml.append("</dataset>");
    		crmDtXml.append("</categories>");
    		
    		// 最后生成的xml
    		StringBuilder xml = new StringBuilder("<chart xaxisname=\"日期\" yaxisname=\"笔数(单位: 笔)\"  caption=\"放款笔数趋势图\" palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\"> ");
    		xml.append(depBalXml.toString())
    		   .append(depAvgXml.toString())
    		   .append(crmDtXml.toString())
    		   .append("</chart>");

    		if(list.size() > 0) {
    			dataXml = xml.toString();
    		}
    		
    		
    		
    			
    	}
    	
    	// 金额、按日期统计   	
    	else if(tempCondtion.toString().equals("2")&&(startLoanYear != null && !"".equals(startLoanYear))&&(startLoanMonth != null && !"".equals(startLoanMonth))){
		StringBuilder sb = new StringBuilder("select a.START_LOAN_YEAR,a.START_LOAN_MONTH,a.start_loan_dt,sum(cont_amt)/10000 as total_amt,sum(loan_bal)/10000 as bal_amt,"+
				" sum(case  a.start_loan_dt when b.start_loan_dt then cont_amt else 0 end)/10000  as new_amt"+
				" from ACRM_F_CI_TINY_LOAN a left join ACRM_F_CI_TINY_LOAN_DATE b on a.custom_id=b.custom_id"+
				" group by a.start_loan_dt,a.START_LOAN_YEAR,a.START_LOAN_MONTH"+
				" having");
		
			sb.append(" a.start_loan_year = '"+startLoanYear+"' ");
			sb.append(" and a.start_loan_month ='"+startLoanMonth+"'");
			sb.append(" order by a.start_loan_dt");
		

		cqs.setPrimaryKey("a.start_loan_dt");
		map = cqs.excuteQuery(sb.toString(), 0, 100000);
		List list = (List) map.get("data");
		// 总放款xml 
		StringBuilder depBalXml = new StringBuilder("<dataset SeriesName=\"总放款\">");
		// 新增放款xml 
		StringBuilder depAvgXml = new StringBuilder("<dataset SeriesName=\"新增放款\">");
		// 余额xml 
		StringBuilder lonBalXml = new StringBuilder("<dataset SeriesName=\"余额\">");
		StringBuilder crmDtXml = new StringBuilder("<categories>");
		
		for(int i = 0; i < list.size(); i++) {
			Map m = (Map)list.get(i);
			
			// 总放款
			String depBal = (String)m.get("TOTAL_AMT");
			if(depBal == null || "".equals(depBal)) {
				depBal = "0";
			} else {
//				depBal = new BigDecimal(depBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
			}

			// 新增放款
			String depAvg = (String)m.get("NEW_AMT");
			if(depAvg == null || "".equals(depAvg)) {
				depAvg = "0";
			} else {
//				depAvg = new BigDecimal(depAvg).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
			}
			
			// 余额
			String lonBal = (String)m.get("BAL_AMT");
			if(lonBal == null || "".equals(lonBal)) {
				lonBal = "0";
			} else {
//				lonBal = new BigDecimal(lonBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
			}
			
			// 横轴日期
			String crmDt  = (String)m.get("START_LOAN_DT");
			
			depBalXml.append("<set value=\"" + depBal  + "\" />");
			depAvgXml.append("<set value=\"" + depAvg  + "\" />");
			lonBalXml.append("<set value=\"" + lonBal  + "\" />");
			crmDtXml.append("<category label=\"" + crmDt  + "\" />");
		}
	 
		depBalXml.append("</dataset>");
		depAvgXml.append("</dataset>");
		lonBalXml.append("</dataset>");
		crmDtXml.append("</categories>");
		
		// 最后生成的xml
		StringBuilder xml = new StringBuilder("<chart xaxisname=\"日期\" yaxisname=\"金额(单位: 万元)\"  caption=\"放款金额趋势图\" palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\"> ");
		xml.append(depBalXml.toString())
		   .append(depAvgXml.toString())
		   .append(lonBalXml.toString())
		   .append(crmDtXml.toString())
		   .append("</chart>");

		if(list.size() > 0) {
			dataXml = xml.toString();
		}
		
		
	}
    	
//笔数、按月份统计    	
    	else if(tempCondtion.toString().equals("1")&&(startLoanYear != null && !"".equals(startLoanYear))&&(startLoanMonth == null && "".equals(startLoanMonth))){
    		StringBuilder sb = new StringBuilder("SELECT a.START_LOAN_YEAR,a.START_LOAN_MONTH,count (a.CONT_AMT) AS total_amt,"+
    				" count (CASE a.start_loan_dt WHEN b.start_loan_dt THEN cont_amt ELSE 0 END) AS new_amt"+
    				" from ACRM_F_CI_TINY_LOAN a left join ACRM_F_CI_TINY_LOAN_DATE b on a.custom_id=b.custom_id"+
    				" group by a.START_LOAN_YEAR,a.START_LOAN_MONTH"+
    				" having");
    		
    			sb.append(" a.start_loan_year = '"+startLoanYear+"' ");
    			sb.append(" order by a.START_LOAN_MONTH");
    		

    		cqs.setPrimaryKey("a.START_LOAN_MONTH");
    		map = cqs.excuteQuery(sb.toString(), 0, 100000);
    		List list = (List) map.get("data");
    		// 总放款笔数xml 
    		StringBuilder depBalXml = new StringBuilder("<dataset SeriesName=\"总放款笔数\">");
    		// 新增放款笔数xml 
    		StringBuilder depAvgXml = new StringBuilder("<dataset SeriesName=\"新增放款笔数\">");
            
    		StringBuilder crmDtXml = new StringBuilder("<categories>");
    		
    		for(int i = 0; i < list.size(); i++) {
    			Map m = (Map)list.get(i);
    			
    			// 总放款笔数
    			String depBal = (String)m.get("TOTAL_AMT");
    			//System.out.println(depBal);
    			if(depBal == null || "".equals(depBal)) {
    				depBal = "0";
    			} else {
    				//System.out.println("??????????????????????????????/");
//    				depBal = new BigDecimal(depBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depBal);
    			}

    			// 新增放款笔数
    			String depAvg = (String)m.get("NEW_AMT");
    			//System.out.println(depAvg);
    			if(depAvg == null || "".equals(depAvg)) {
    				depAvg = "0";
    			} else {
//    				depAvg = new BigDecimal(depAvg).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depAvg);
    			}
    			
    			
    			// 横轴日期
    			String crmDt  = (String)m.get("START_LOAN_MONTH");
    			
    			depBalXml.append("<set value=\"" + depBal  + "\" />");
    			depAvgXml.append("<set value=\"" + depAvg  + "\" />");
    			crmDtXml.append("<category label=\"" + crmDt  + "\" />");
    		}
    	 
    		depBalXml.append("</dataset>");
    		depAvgXml.append("</dataset>");
    		crmDtXml.append("</categories>");
    		
    		// 最后生成的xml
    		StringBuilder xml = new StringBuilder("<chart xaxisname=\"月份\" yaxisname=\"笔数(单位: 笔)\"  caption=\"放款笔数趋势图\" palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\"> ");
    		xml.append(depBalXml.toString())
    		   .append(depAvgXml.toString())
    		   .append(crmDtXml.toString())
    		   .append("</chart>");

    		if(list.size() > 0) {
    			dataXml = xml.toString();
    		}
    		
    		//System.out.println(dataXml.toString());	
    	}
    	
//金额、按月份统计    	
    	else if(tempCondtion.toString().equals("2")&&(startLoanYear != null && !"".equals(startLoanYear))&&(startLoanMonth == null && "".equals(startLoanMonth))){
    		StringBuilder sb = new StringBuilder("SELECT a.START_LOAN_YEAR,a.START_LOAN_MONTH,sum(CASE a.start_loan_dt WHEN b.start_loan_dt THEN cont_amt ELSE 0 END)/10000 AS NEW_AMT,"+
    				" sum (a.CONT_AMT)/10000 AS TOTAL_AMT,sum (a.LOAN_BAL)/10000 AS BAL_AMT"+
    				" from ACRM_F_CI_TINY_LOAN a left join ACRM_F_CI_TINY_LOAN_DATE b on a.custom_id=b.custom_id"+
    				" group by a.START_LOAN_YEAR, a.START_LOAN_MONTH"+
    				" having");
    		
    			sb.append(" a.start_loan_year = '"+startLoanYear+"' ");
    			sb.append(" order by a.START_LOAN_MONTH");
    		

    		cqs.setPrimaryKey("a.START_LOAN_MONTH");
    		//System.out.println(sb);
    		map = cqs.excuteQuery(sb.toString(), 0, 100000);
    		//System.out.println(map);
    		List list = (List) map.get("data");
            //System.out.println(list);
    		// 总放款xml 
    		StringBuilder depBalXml = new StringBuilder("<dataset SeriesName=\"总放款\">");
    		// 新增放款xml 
    		StringBuilder depAvgXml = new StringBuilder("<dataset SeriesName=\"新增放款\">");
    		// 余额xml 
    		StringBuilder lonBalXml = new StringBuilder("<dataset SeriesName=\"余额\">");
    		StringBuilder crmDtXml = new StringBuilder("<categories>");
    		
    		for(int i = 0; i < list.size(); i++) {
    			Map m = (Map)list.get(i);
    			
    			// 总放款
    			String depBal = (String)m.get("TOTAL_AMT");
    			//System.out.println(depBal);
    			if(depBal == null || "".equals(depBal)) {
    				depBal = "0";
    			} else {
    				//System.out.println("??????????????????????????????/");
//    				depBal = new BigDecimal(depBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depBal);
    			}

    			// 新增放款
    			String depAvg = (String)m.get("NEW_AMT");
    			//System.out.println(depAvg);
    			if(depAvg == null || "".equals(depAvg)) {
    				depAvg = "0";
    			} else {
//    				depAvg = new BigDecimal(depAvg).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depAvg);
    			}
    			
    			// 余额
    			String lonBal = (String)m.get("BAL_AMT");
    			//System.out.println(lonBal);
    			if(lonBal == null || "".equals(lonBal)) {
    				lonBal = "0";
    			} else {
//    				lonBal = new BigDecimal(lonBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(lonBal);
    			}
    			
    			// 横轴日期
    			String crmDt  = (String)m.get("START_LOAN_MONTH");
    			
    			depBalXml.append("<set value=\"" + depBal  + "\" />");
    			depAvgXml.append("<set value=\"" + depAvg  + "\" />");
    			lonBalXml.append("<set value=\"" + lonBal  + "\" />");
    			crmDtXml.append("<category label=\"" + crmDt  + "\" />");
    		}
    	 
    		depBalXml.append("</dataset>");
    		depAvgXml.append("</dataset>");
    		lonBalXml.append("</dataset>");
    		crmDtXml.append("</categories>");
    		
    		// 最后生成的xml
    		StringBuilder xml = new StringBuilder("<chart xaxisname=\"日期\" yaxisname=\"金额(单位: 万元)\"  caption=\"放款金额趋势图\" palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\"> ");
    		xml.append(depBalXml.toString())
    		   .append(depAvgXml.toString())
    		   .append(lonBalXml.toString())
    		   .append(crmDtXml.toString())
    		   .append("</chart>");

    		if(list.size() > 0) {
    			dataXml = xml.toString();
    		}
    		
    		//System.out.println(dataXml.toString());	
    	}
    	
//笔数、按年份统计    	
    	else if(tempCondtion.toString().equals("1")&&(startLoanYear != null && !"".equals(startLoanYear))&&(crmDtEnd != null && !"".equals(crmDtEnd))){
    		StringBuilder sb = new StringBuilder("SELECT a.START_LOAN_YEAR,count (a.CONT_AMT) AS TOTAL_AMT,"+
    				" count (CASE a.start_loan_dt WHEN b.start_loan_dt THEN cont_amt ELSE 0 END) AS NEW_AMT"+
    				" from ACRM_F_CI_TINY_LOAN a left join ACRM_F_CI_TINY_LOAN_DATE b on a.custom_id=b.custom_id"+
    				" group by a.START_LOAN_YEAR"+
    				" having");
    		
    			sb.append(" a.start_loan_year >= '"+startLoanYear+"'");
    			sb.append(" and a.start_loan_year <= '"+crmDtEnd+"'");
    			sb.append(" order by a.START_LOAN_YEAR");
    		

    		cqs.setPrimaryKey("a.START_LOAN_YEAR");
    		//System.out.println(sb);
    		map = cqs.excuteQuery(sb.toString(), 0, 100000);
    		//System.out.println(map);
    		List list = (List) map.get("data");
            //System.out.println(list);
    		// 总放款笔数xml 
    		StringBuilder depBalXml = new StringBuilder("<dataset SeriesName=\"总放款笔数\">");
    		// 新增放款笔数xml 
    		StringBuilder depAvgXml = new StringBuilder("<dataset SeriesName=\"新增放款笔数\">");
            
    		StringBuilder crmDtXml = new StringBuilder("<categories>");
    		
    		for(int i = 0; i < list.size(); i++) {
    			Map m = (Map)list.get(i);
    			
    			// 总放款笔数
    			String depBal = (String)m.get("TOTAL_AMT");
    			//System.out.println(depBal);
    			if(depBal == null || "".equals(depBal)) {
    				depBal = "0";
    			} else {
    				//System.out.println("??????????????????????????????/");
//    				depBal = new BigDecimal(depBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depBal);
    			}

    			// 新增放款笔数
    			String depAvg = (String)m.get("NEW_AMT");
    			//System.out.println(depAvg);
    			if(depAvg == null || "".equals(depAvg)) {
    				depAvg = "0";
    			} else {
//    				depAvg = new BigDecimal(depAvg).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				System.out.println(depAvg);
    			}
    			
    			
    			// 横轴日期
    			String crmDt  = (String)m.get("START_LOAN_YEAR");
    			
    			depBalXml.append("<set value=\"" + depBal  + "\" />");
    			depAvgXml.append("<set value=\"" + depAvg  + "\" />");
    			crmDtXml.append("<category label=\"" + crmDt  + "\" />");
    		}
    	 
    		depBalXml.append("</dataset>");
    		depAvgXml.append("</dataset>");
    		crmDtXml.append("</categories>");
    		
    		// 最后生成的xml
    		StringBuilder xml = new StringBuilder("<chart xaxisname=\"年份\" yaxisname=\"笔数(单位: 笔)\"  caption=\"放款笔数趋势图\" palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\"> ");
    		xml.append(depBalXml.toString())
    		   .append(depAvgXml.toString())
    		   .append(crmDtXml.toString())
    		   .append("</chart>");

    		if(list.size() > 0) {
    			dataXml = xml.toString();
    		}
    		
    		//System.out.println(dataXml.toString());		
    	}
    	
//金额、按年份统计    	
    	else if (tempCondtion.toString().equals("2")&&(startLoanYear != null && !"".equals(startLoanYear))&&(crmDtEnd != null && !"".equals(crmDtEnd))){
    		StringBuilder sb = new StringBuilder("SELECT a.START_LOAN_YEAR,sum(CASE a.start_loan_dt WHEN b.start_loan_dt THEN cont_amt ELSE 0 END)/10000 AS NEW_AMT,"+
    				" sum (a.CONT_AMT)/10000 AS TOTAL_AMT,sum (a.LOAN_BAL)/10000 AS BAL_AMT"+
    				" from ACRM_F_CI_TINY_LOAN a left join ACRM_F_CI_TINY_LOAN_DATE b on a.custom_id=b.custom_id"+
    				" group by a.START_LOAN_YEAR"+
    				" having");
    		
    		sb.append(" a.start_loan_year >= '"+startLoanYear+"'");
			sb.append(" and a.start_loan_year <= '"+crmDtEnd+"'");
    			sb.append(" order by a.START_LOAN_YEAR");
    		

    		cqs.setPrimaryKey("a.START_LOAN_YEAR");
    		System.out.println(sb);
    		map = cqs.excuteQuery(sb.toString(), 0, 100000);
    		//System.out.println(map);
    		List list = (List) map.get("data");
            //System.out.println(list);
    		// 总放款xml 
    		StringBuilder depBalXml = new StringBuilder("<dataset SeriesName=\"总放款\">");
    		// 新增放款xml 
    		StringBuilder depAvgXml = new StringBuilder("<dataset SeriesName=\"新增放款\">");
    		// 余额xml 
    		StringBuilder lonBalXml = new StringBuilder("<dataset SeriesName=\"余额\">");
    		StringBuilder crmDtXml = new StringBuilder("<categories>");
    		
    		for(int i = 0; i < list.size(); i++) {
    			Map m = (Map)list.get(i);
    			
    			// 总放款
    			String depBal = (String)m.get("TOTAL_AMT");
    			//System.out.println(depBal);
    			if(depBal == null || "".equals(depBal)) {
    				depBal = "0";
    			} else {
    				//System.out.println("??????????????????????????????/");
//    				depBal = new BigDecimal(depBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depBal);
    			}

    			// 新增放款
    			String depAvg = (String)m.get("NEW_AMT");
    			//System.out.println(depAvg);
    			if(depAvg == null || "".equals(depAvg)) {
    				depAvg = "0";
    			} else {
//    				depAvg = new BigDecimal(depAvg).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(depAvg);
    			}
    			
    			// 余额
    			String lonBal = (String)m.get("BAL_AMT");
    			//System.out.println(lonBal);
    			if(lonBal == null || "".equals(lonBal)) {
    				lonBal = "0";
    			} else {
//    				lonBal = new BigDecimal(lonBal).movePointLeft(4).setScale(0, BigDecimal.ROUND_HALF_UP).toString(); 
    				//System.out.println(lonBal);
    			}
    			
    			// 横轴日期
    			String crmDt  = (String)m.get("START_LOAN_YEAR");
    			
    			depBalXml.append("<set value=\"" + depBal  + "\" />");
    			depAvgXml.append("<set value=\"" + depAvg  + "\" />");
    			lonBalXml.append("<set value=\"" + lonBal  + "\" />");
    			crmDtXml.append("<category label=\"" + crmDt  + "\" />");
    		}
    	 
    		depBalXml.append("</dataset>");
    		depAvgXml.append("</dataset>");
    		lonBalXml.append("</dataset>");
    		crmDtXml.append("</categories>");
    		
    		// 最后生成的xml
    		StringBuilder xml = new StringBuilder("<chart xaxisname=\"年份\" yaxisname=\"金额(单位: 万元)\"  caption=\"放款金额趋势图\" palette=\"1\" baseFontSize=\"13\" formatNumberScale=\"0\"> ");
    		xml.append(depBalXml.toString())
    		   .append(depAvgXml.toString())
    		   .append(lonBalXml.toString())
    		   .append(crmDtXml.toString())
    		   .append("</chart>");

    		if(list.size() > 0) {
    			dataXml = xml.toString();
    		}
    		
    		//System.out.println(dataXml.toString());		
    	}
    	
    	return "success";
	}
		
	public String getDataXml() {
		return dataXml;
	}

}

