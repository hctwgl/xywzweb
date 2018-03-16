<%@page contentType="text/html; charset=gb2312" %>
<%@ page import="java.util.*" %>
<%@ page import="com.ecc.echain.workflow.engine.EVO" %>
<%@ page import="com.ecc.echain.forms.model.FormFieldModel" %>
<%
String instanceid = (String)request.getAttribute("instanceid");
String nodeid = (String)request.getAttribute("nodeid");
List formfieldlist = (List)request.getAttribute("formfieldlist");
HashMap getNodeFormData = (HashMap)request.getAttribute("getNodeFormData");
if(getNodeFormData==null)getNodeFormData=new HashMap();
HashMap fMap = (HashMap)request.getAttribute("getNodeControlFormField");
if(fMap==null)fMap=new HashMap();
%>
<html>
<head>
<title>eChain流程演示</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<fieldset><legend>业务信息详情</legend>
<br>
<%
String fieldcode="",fieldname="",fieldvalue="";
if(formfieldlist==null||formfieldlist.isEmpty()){
%>
没有找到对应的表单字段信息
<%
}else{
	out.print("<table width='95%' align='center'>");
	FormFieldModel ffm;	
	Map ffMap;
	String ec;
	int field_size=0;
	for(int i=0;i<formfieldlist.size();i++){
		ffm=(FormFieldModel)formfieldlist.get(i);
		fieldcode=ffm.getId();
		fieldname=ffm.getName();
		fieldvalue=getNodeFormData.get(fieldcode)==null?"":(String)getNodeFormData.get(fieldcode);
		if(fMap==null||fMap.isEmpty()){
%>
<tr><td align="right"><%=fieldname%>：</td><td><input type="text" name="<%=fieldcode%>" value="<%=fieldvalue%>" readonly="true" style="border:0;background-color:#e3e4e3;width:300px"></td></tr>
<%
		}
		else{
		ffMap=(Map)fMap.get(fieldcode);
		if(ffMap!=null&&!ffMap.isEmpty()){
			if(ffm.getSize()==null||ffm.getSize().equals(""))
				field_size=0;
			else
				field_size=Integer.parseInt(ffm.getSize());
			ec=(String)ffMap.get("editcontrol");//编辑权限"none"不可见0，"true"只读1，"false"可编辑2
			if(ec!=null&&ec.equals("true")){
				if(!ffm.valueMap.isEmpty()){//字段带数据字典分类项的，生成select选择框
%>
<tr><td align="right"><%=fieldname%>：</td><td><select id="<%=fieldcode%>" name="<%=fieldcode%>" readonly="true" style="width:300;background-color:#e3e4e3" value="<%=fieldvalue%>">
<option value="">---请选择---</option>
<%				
					Iterator it=ffm.valueMap.keySet().iterator();
					String fk,fv,sel;
					while(it.hasNext()){
						fk=(String)it.next();
						fv=(String)ffm.valueMap.get(fk);
						if(fieldvalue.equals(fk))
							sel="selected";
						else
							sel="";
						out.println("<option value='"+fk+"' "+sel+">"+fv+"</option>");
					}
%>
</select>
</td></tr>
<%	
				}else if(field_size>=500){
%>
<tr><td align="right"><%=fieldname%>：</td><td><textarea name="<%=fieldcode%>" rows="5" cols="100" readonly="true" style="border:0;background-color:#e3e4e3"><%=fieldvalue%></textarea></td></tr>
<%
				}else if(field_size>=200){
%>
<tr><td align="right"><%=fieldname%>：</td><td><textarea name="<%=fieldcode%>" rows="2" cols="100" readonly="true" style="border:0;background-color:#e3e4e3"><%=fieldvalue%></textarea></td></tr>
<%
				}else{
%>
<tr><td align="right"><%=fieldname%>：</td><td><input type="text" name="<%=fieldcode%>" value="<%=fieldvalue%>" readonly="true" style="border:0;background-color:#e3e4e3;width:300px"></td></tr>
<%
				}

			}else if(ec!=null&&ec.equals("false")){
				if(!ffm.valueMap.isEmpty()){//字段带数据字典分类项的，生成select选择框
%>
<tr><td align="right"><%=fieldname%>：</td><td><select id="<%=fieldcode%>" name="<%=fieldcode%>" style="width:300;background-color:#F7FEA5" value="<%=fieldvalue%>">
<option value="">---请选择---</option>
<%				
					Iterator it=ffm.valueMap.keySet().iterator();
					String fk,fv,sel;
					while(it.hasNext()){
						fk=(String)it.next();
						fv=(String)ffm.valueMap.get(fk);
						if(fieldvalue.equals(fk))
							sel="selected";
						else
							sel="";
						out.println("<option value='"+fk+"' "+sel+">"+fv+"</option>");
					}
%>
</select>
</td></tr>
<%	
				}else if(field_size>=500){
%>
<tr><td align="right"><%=fieldname%>：</td><td><textarea name="<%=fieldcode%>" rows="5" cols="100" style="background-color:#F7FEA5"><%=fieldvalue%></textarea></td></tr>
<%
				}else if(field_size>=200){
%>
<tr><td align="right"><%=fieldname%>：</td><td><textarea name="<%=fieldcode%>" rows="2" cols="100" style="background-color:#F7FEA5"><%=fieldvalue%></textarea></td></tr>
<%
				}else{
%>
<tr><td align="right"><%=fieldname%>：</td><td><input type="text" name="<%=fieldcode%>" value="<%=fieldvalue%>" style="background-color:#F7FEA5;width:300px"></td></tr>
<%
				}
			}
		}
		}
	}
	out.print("</table>");
}
%>
<br><br><br>
</fieldset><br> 
</form>
</body></html>
