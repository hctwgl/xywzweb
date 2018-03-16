<%@page language="java" contentType="image/png"%>
<%@ page import="java.util.*,java.io.*,java.lang.*"%>
<%
String urlpath = request.getParameter("urlpath"); 
FileInputStream fr=new FileInputStream(urlpath);
OutputStream outs=response.getOutputStream();

byte[] bs=new byte[1024];
int c;
while((c=fr.read(bs))!=-1){
outs.write(bs);
}
outs.flush();
outs.close();
out.clear();
out = pageContext.pushBody();
fr.close();
%>