<%@page language="java" contentType="text/xml;charset=utf-8"%>
<%@ page import="java.util.*,java.io.*,java.lang.*"%>
<%
String urlpath = request.getParameter("urlpath"); 
FileReader fr=new FileReader(urlpath);
int c=fr.read();
while(c!=-1){
out.write(c);
c=fr.read();
}
fr.close();
%>