package com.xywztech.bcrm.custmanager.action;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

/**
 * 周工作记录查询
 * @author lixb
 * @since2012-11-15
 */
@ParentPackage("json-default")
@Action(value = "/workLogInfos-query", results = { @Result(name = "success", type = "json")})
public class WorkLogInfosQueryAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
    @Override
	public void prepare() {
    	ActionContext ctx = ActionContext.getContext();
    	HttpServletRequest request = (HttpServletRequest) ctx
                .get(StrutsStatics.HTTP_REQUEST);
    	String startdt = request.getParameter("startdt");
    	String enddt = request.getParameter("enddt");
    	//String weekType = request.getParameter("weekType");//日志类型 2：周
    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	String userId = auth.getUserId();
    	StringBuilder sql = new StringBuilder(
				" select a.WORKLOG_TERM, case when not exists (select b.id from OCRM_F_WP_WORKLOG b " +
				" where b.WORKLOG_DATE=a.WORKLOG_term AND b.USER_ID ='"+userId+"'and " +
				" b.WORKLOG_type='W') then  '未录入' else '已提交' end as WEEKLOG_HANDED," +
				" c.id as WORK_ID ,case when c.AUDIT_USER is null then '未录入' end AS WORKPLAN" +
				" from OCRM_F_WP_WORKLOG_TERM a  left join OCRM_F_WP_WORKLOG c on " +
				" c.WORKLOG_DATE=a.WORKLOG_TERM where a.WORKLOG_TYPE='W'" );
    	if((null == startdt || startdt.length()==0) && (null == enddt  || enddt.length()==0)){
    		sql.append(" and a.WORKLOG_TERM<='"+DateToStr(new Date()+"")+"'" +
    				" and a.WORKLOG_TERM>= '"+DateToStrLow(new Date())+"'");
    	}
    	else if ((null != startdt && startdt.length()!=0) && (null == enddt  || enddt.length()==0) ){
    		sql.append(" and a.WORKLOG_TERM>='"+DateToStr(startdt)+"'");
    		sql.append(" and a.WORKLOG_TERM<='"+DateToStr(new Date() +"")+"'");
    	}
    	else if ((null != enddt&& enddt.length()!=0)&& (null == startdt || startdt.length()==0)){
    		sql.append(" and a.WORKLOG_TERM<='"+DateToStr(enddt)+"'");
    		sql.append(" and a.WORKLOG_TERM>='"+DateToStr(new Date() +"")+"'");
    	}else{
    		sql.append(" and a.WORKLOG_TERM>='"+DateToStr(startdt)+"'");
    		sql.append(" and a.WORKLOG_TERM<='"+DateToStr(enddt)+"'");
    	}
    	
		setPrimaryKey("a.WORKLOG_TERM DESC");
        SQL=sql.toString();
        datasource = ds;
	}
    
    /**
     * 获得当前周期 
     * @param date
     * @return
     */
	public  String DateToStr(String dateStr) {
		boolean result = dateStr.matches(".*\\p{Alpha}.*");//判断是否含有英文
		   SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   String str=null;
		   String dayStr = null;
		   String strw = null;
		   if (result==false){
			   Date date = new Date();
			    str = format.format(date).substring(0,8);
			    dayStr =format.format(date).substring(8,10); 
		   }else
		   {   String date = null;
			   String dateChar = dateStr.substring(0,1);
			   if (dateChar.matches(".*\\p{Alpha}.*")==false) {
				    date = dateStr.substring(0,10);
			   }
			   else {
				   Date dateStrEn = parse(dateStr, "EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
				   date = String.format("%tF %<tT%n", dateStrEn); 
			   }
			   str = date.substring(0,8);
			    dayStr =date.substring(8,10); 
		   }
		   
		   float day = Integer.parseInt(dayStr);
			if ((day / 7) > 0 && (day / 7) <= 1) {
				strw = str + "1";
			}
			else if ((day / 7) > 1 && (day / 7) <= 2) {
				strw = str + "2";
			} else if ((day / 7) > 2 && (day / 7) <= 3) {
				strw = str + "3";
			} else {
				strw = str + "4";
		} 
			return strw;
	}
    
    /**
     * 获得当前时间的前两个月份的周期 
     * @param date
     * @return
     */
    public String DateToStrLow(Date date) {
		   SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   String dayStr =format.format(date).substring(8,10);
		   String monthstr = format.format(date).substring(5,7);
		   String yearstr = format.format(date).substring(0,4);
		   String strw = null;
		   float day = Integer.parseInt(dayStr);
		   int month =  Integer.parseInt(monthstr);
		   int year =  Integer.parseInt(yearstr);
		   int lowMonth = month - 2;
		   if (lowMonth==0) {
			   month=12;
			   year=year-1;
		   }else if (lowMonth<0){
			   month=12+lowMonth;
			   year=year-1;
		   }else{
			   month=month-2;
		   }
		   String months=month+"";
		   String years=year+"";
		   if(months.length()==1){
			   months="0"+months;
		   }
			if ((day / 7) > 0 && (day / 7) <= 1) {
				strw = years +"-"+months+"-" + "1";
			}
			else if ((day / 7) > 1 && (day / 7) <= 2) {
				strw = years +"-"+months+"-" + "2";
			} else if ((day / 7) > 2 && (day / 7) <= 3) {
				strw = years +"-"+months+"-" + "3";
			} else {
				strw = years +"-"+months+"-" + "4";
		} 
			return strw;
	}
    
    /**
     * 英文格式的时间转换正常显示的时间2012-11-12
     * @param str
     * @param pattern
     * @param locale
     * @return
     */
    public Date parse(String str, String pattern, Locale locale) {
        if(str == null || pattern == null) {
            return null;
        }
        try {
            return new SimpleDateFormat(pattern, locale).parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    public void setStart(String start) {
    }
}

