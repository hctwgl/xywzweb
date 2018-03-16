package com.xywztech.bcrm.customer.action;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bcrm.customer.model.OcrmFCiAccBelong;
import com.xywztech.bcrm.customer.service.AssignAccountService;

@SuppressWarnings("serial")
@Action("/assignAccount")
@Results({@org.apache.struts2.convention.annotation.Result(name="success", type="redirectAction", params={"actionName", "assignAccount"})})
public class AssignAccountAction extends ValidationAwareSupport
  implements ModelDriven<Object>, Validateable
{
  private OcrmFCiAccBelong wi = new OcrmFCiAccBelong();
  private Collection<OcrmFCiAccBelong> wic;
  private String id;
  private HttpServletRequest request;

  @Autowired
  private AssignAccountService wis;

  public HttpHeaders show()
  {
    this.wi = this.wis.find(this.id);
    return new DefaultHttpHeaders("show");
  }

  public HttpHeaders index()
  {
    this.wic = this.wis.findAll();
    return new DefaultHttpHeaders("index").disableCaching
      ();
  }

  public String edit()
  {
    return "edit";
  }

  public String editNew()
  {
    return "editNew";
  }

  public String deleteConfirm()
  {
    return "deleteConfirm";
  }

  public String destroy()
  {
    ActionContext ctx = ActionContext.getContext();
    this.request = 
      ((HttpServletRequest)ctx.get
      ("com.opensymphony.xwork2.dispatcher.HttpServletRequest"));
    String idStr = this.request.getParameter("idStr");

    this.wis.remove(idStr);
    return "success";
  }

  public Date getCurrentDate() throws Exception
  {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-DD");
    String date = format.format(new Date()).toString();
    return format.parse(date);
  }

  public String create()
    throws Exception
  {
    ActionContext ctx = ActionContext.getContext();
    this.request = ((HttpServletRequest)ctx.get("com.opensymphony.xwork2.dispatcher.HttpServletRequest"));
    String s3 = this.request.getParameter("models");
    JSONArray jarray = JSONArray.fromObject(s3);

    //JSONObject jsonObject = null;
   // JSONArray jarray = null;

      
     // jsonObject = JSONObject.fromObject(s3);
      //jarray = jsonObject.
    
  

    this.wis.save(jarray);

    return "success";
  }

  public String update()
  {
    this.wis.save(this.wi);
    return "success";
  }

  public void validate()
  {
  }

  public Object getModel()
  {
    return ((this.wic != null) ? this.wic : this.wi);
  }
}