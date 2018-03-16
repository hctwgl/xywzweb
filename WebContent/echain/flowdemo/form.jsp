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
HashMap actionMap = (HashMap)request.getAttribute("getNodeControlFormAction");
if(actionMap==null)actionMap=new HashMap();
HashMap fMap = (HashMap)request.getAttribute("getNodeControlFormField");
if(fMap==null)fMap=new HashMap();
%>
<html>
<head>
<title>eChain������ʾ</title>
<link href="<%=request.getContextPath()%>/echain/common/default.css" rel="stylesheet" type="text/css" />
<script language="javascript">
function submitForm(act)
{	
	document.forms[0].actionType.value=act;
	document.forms[0].submit();
}
function doSubmit()
{
	var instanceid = document.getElementById("instanceid").value;
	var nodeid = document.getElementById("nodeid").value;
	var contextPath="<%=request.getContextPath()%>";
	//��ѡ����һ�ڵ㼰�����˵Ľ���
	var url = contextPath+"/echain/common/selectNextNodePage.jsp?instanceid="+instanceid+"&nodeid="+nodeid;
	var retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');
		
	//��������:[״̬:true/false;���;��һ�ڵ�;��һ������];��û�з���ֵ,�򷵻�״̬��Ϊtrue,���ʾȡ��
	if(retObj == null)
		return;
	var status = retObj[0];
	if(status != true)
		return;

	var nextnodeid = retObj[1];
	var nextnodeuser = retObj[2];
	var nextnoderole = retObj[3];
	
	if(nextnodeid!=null)
		document.getElementById("nextnodeid").value = nextnodeid;
	if(nextnodeuser != null)
		document.getElementById("nextnodeuser").value = nextnodeuser;
	if(retObj[3] != null)
		document.getElementById("nextnoderole").value = nextnoderole;

	if(nextnodeuser!=null){
		//ѡ���û��Ƿ��д����ж�
		url = contextPath+"/echain/common/checkIsEntrust.jsp?instanceid="+instanceid+"&userList="+nextnodeuser;
		retObj = window.showModalDialog(url,'selectPage','dialogHeight:300px;dialogWidth:600px;help:no;resizable:no;status:no;');

		if(retObj==null) return;
		
		if(retObj[0]=="true"){
			//��entrustModel��
			var entrustModel = retObj[1];
			//var entrustModel = confirm("����ѡ�û���:"+retObj[2]+"\n�����ȷ������ַ��͸�ԭ�����ˣ������ȡ�������͸�������");
			if(entrustModel!=null && entrustModel!="")
				document.getElementById("entrustModel").value=entrustModel;
			else{
				alert("��ѡ�����ģʽ");
				return;
			}
		}
	}
		
	//�ύ�ڵ�
	document.forms[0].actionType.value="submit";
	document.forms[0].submit();
}
function change_wf(){
	if(document.getElementById("suggestControl_wf").checked)
		document.getElementById("suggestControl_wf").value="1";
	else
		document.getElementById("suggestControl_wf").value="0";
}
function change_biz(){
	if(document.getElementById("suggestControl_biz").checked)
		document.getElementById("suggestControl_biz").value="1";
	else
		document.getElementById("suggestControl_biz").value="0";
}
</script>
</head>
<body>
<form action="<%=request.getContextPath()%>/echaincommonservlet">
<input type="hidden" name="method" value="echainflowdemo">
<input type="hidden" name="instanceid" value="<%=instanceid%>"/>
<input type="hidden" name="nodeid" value="<%=nodeid%>"/>
<input type="hidden" name="actionType" />
<input type="hidden" name="nextnodeid" />
<input type="hidden" name="nextnodeuser" />
<input type="hidden" name="nextnoderole" />
<input type="hidden" id="entrustModel" name="entrustModel" value=""/>
<table width="80%" align="center">
<tr><td align="right">���̹����������ƣ�</td>
<td><input type="text" name="wfjobname" style="background-color:#F7FEA5;width:250px"></td>
<td align="right">ҵ����ˮ�ţ�</td>
<td><input type="text" name="bizseqno" style="background-color:#F7FEA5;width:250px"></td></tr>
<tr><td align="right">�ͻ�ID��</td>
<td><input type="text" name="custID" style="background-color:#F7FEA5;width:250px"></td>
<td align="right">�ͻ����ƣ�</td>
<td><input type="text" name="custName" style="background-color:#F7FEA5;width:250px"></td></tr>
</table>
<fieldset><legend>����������ҳ��</legend>
<br>
<%
String fieldcode="",fieldname="",fieldvalue="";
if(formfieldlist==null||formfieldlist.isEmpty()){
%>
û���ҵ���Ӧ�ı��ֶ���Ϣ
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
<tr><td align="right"><%=fieldname%>��</td><td><input type="text" name="<%=fieldcode%>" value="<%=fieldvalue%>" readonly="true" style="border:0;background-color:#e3e4e3"></td></tr>
<%
		}
		else{
		ffMap=(Map)fMap.get(fieldcode);
		if(ffMap!=null&&!ffMap.isEmpty()){
			if(ffm.getSize()==null||ffm.getSize().equals(""))
				field_size=0;
			else
				field_size=Integer.parseInt(ffm.getSize());
			ec=(String)ffMap.get("editcontrol");//�༭Ȩ��"none"���ɼ�0��"true"ֻ��1��"false"�ɱ༭2
			if(ec!=null&&ec.equals("true")){
				if(field_size>=500){
%>
<tr><td align="right"><%=fieldname%>��</td><td><textarea name="<%=fieldcode%>" rows="5" cols="100" readonly="true" style="border:0;background-color:#e3e4e3"><%=fieldvalue%></textarea></td></tr>
<%
				}else if(field_size>=200){
%>
<tr><td align="right"><%=fieldname%>��</td><td><textarea name="<%=fieldcode%>" rows="2" cols="100" readonly="true" style="border:0;background-color:#e3e4e3"><%=fieldvalue%></textarea></td></tr>
<%
				}else{
%>
<tr><td align="right"><%=fieldname%>��</td><td><input type="text" name="<%=fieldcode%>" value="<%=fieldvalue%>" readonly="true" style="border:0;background-color:#e3e4e3;width:300px"></td></tr>
<%
				}
			}else if(ec!=null&&ec.equals("false")){
				if(!ffm.valueMap.isEmpty()){//�ֶδ������ֵ������ģ�����selectѡ���
%>
<tr><td align="right"><%=fieldname%>��</td><td><select id="<%=fieldcode%>" name="<%=fieldcode%>" style="width:300;background-color:#F7FEA5" value="<%=fieldvalue%>">
<option value="">---��ѡ��---</option>
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
<tr><td align="right"><%=fieldname%>��</td><td><textarea name="<%=fieldcode%>" rows="5" cols="100" style="background-color:#F7FEA5"><%=fieldvalue%></textarea></td></tr>
<%
				}else if(field_size>=200){
%>
<tr><td align="right"><%=fieldname%>��</td><td><textarea name="<%=fieldcode%>" rows="2" cols="100" style="background-color:#F7FEA5"><%=fieldvalue%></textarea></td></tr>
<%
				}else{
%>
<tr><td align="right"><%=fieldname%>��</td><td><input type="text" name="<%=fieldcode%>" value="<%=fieldvalue%>" style="background-color:#F7FEA5;width:300px"></td></tr>
<%
				}
			}
		}
		}
	}
	out.print("</table>");
}
%>
<br>
</fieldset><br>

<b>�ҵ��������</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
�����ʶ��<select id="suggestSign_wf" name="suggestSign_wf" style="width:150">
<option value="">---��ѡ��---</option>
<option value="ͬ��">ͬ��</option>
<option value="���">���</option>
<option value="���">���</option>
<option value="�˻�">�˻�</option>
<option value="����">����</option>
<option value="">��</option></select><br>
<textarea  id="suggestContent_wf" name="suggestContent_wf" rows="5" cols="100" style="background-color:#F7FEA5"></textarea><br>
<input type="checkbox" id="suggestControl_wf" name="suggestControl_wf" value="1" checked=true onchange="change_wf()">�������̲����߿ɶ�<br><br>

<b>�ҵ�ҵ�����</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
�����ʶ��<select id="suggestSign_biz" name="suggestSign_biz" style="width:150">
<option value="">---��ѡ��---</option>
<option value="ͬ��">ͬ��</option>
<option value="���">���</option>
<option value="���">���</option>
<option value="�˻�">�˻�</option>
<option value="����">����</option>
<option value="">��</option></select><br>
<textarea id="suggestContent_biz" name="suggestContent_biz" rows="5" cols="100" style="background-color:#F7FEA5"></textarea><br>
<input type="checkbox" id="suggestControl_biz" name="suggestControl_biz" value="0" onchange="change_biz()">�������̲����߿ɶ�<br><br>

	  <div align="center">
	
			<% if(actionMap!=null && actionMap.get("signin")!=null) {%>
				<input name="Submit42" type="button" class="button" value="ǩ������" onClick="submitForm('signin')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("signoff")!=null) {%>
				<input name="Submit42" type="button" class="button" value="����ǩ��" onClick="submitForm('signoff')">
			<%}%>
			<%if(actionMap!=null && actionMap.get("save")!=null) {%>	    
			<input type="button" name="submit12" value="��������"  class="button" onClick="submitForm('save')">
			<%}	%>			
			<%if(actionMap!=null && actionMap.get("submit")!=null) {%>	
			  <input type="button" name="submit12" value="�ᡡ����"  class="button" onClick="doSubmit()">
			<%}%>
			<%if(actionMap!=null && actionMap.get("urge")!=null) {%>
				<input name="Submit322" type="button" class="button" value="�ߡ�����"onClick="submitForm('urge','')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("again")!=null) {%>
				<input name="Submit31" type="button" class="button" value="�ء�����"  onClick="submitForm('redo')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("cancel")!=null) {%>
				<input name="Submit32" type="button" class="button" value="��������"   onClick="submitForm('undo')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("returnback")!=null) {%>
				<input name="Submit42" type="button" class="button" value="�ˡ�����"   onClick="submitForm('back')">
			<%}%>
			<% if(actionMap!=null && actionMap.get("hang")!=null) {%>
				<input name="Submit423" type="button" class="button" value="�ҡ�����"  onClick="submitForm('hang')" width="2" size="2">
			<%}%>
			<% if(actionMap!=null && actionMap.get("wake")!=null) {%>
				<input name="Submit42" type="button" class="button" value="��������" onClick="submitForm('aweak')">
			<%}%>			
			<% if(actionMap!=null && actionMap.get("track")!=null) {%>
				<input name="Submit52" type="button"  value="��������" class="button" onClick="window.open('<%=request.getContextPath()%>/echain/studio/eChainMonitor.jsp?instanceid=<%=instanceid%>','name','left=0,top=0,width=1024,height=768,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');">
			<%}%>		
	  </div>
	  
</form>
</body></html>
