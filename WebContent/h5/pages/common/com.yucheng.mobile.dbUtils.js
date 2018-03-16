/**
* 数据库：支持多数据库（数据库1、数据库2），不推荐多数据库
* 使用步骤：
*     第一步：getDB(); -- 获取连接，返回DB
*     第二步：根据获取到的DB，进行具体业务操作：
			  1.如果不需要事务提交，可直接用
				db.executeSql(具体sql, [参数数组], 成功返回方法，失败返回方法);
				eg：
					db.executeSql("select count(1) as cnt from t_user;",
                                                   [],
                                                   function(res){
                                                    alert(res.rows.length);
                                                   });
				--注：失败返回方法可有可无；获取数据res.rows
			  2.需要事务提交：
				db.transaction(function(tx) {
					tx.executeSql('DROP TABLE IF EXISTS test_table');
					tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

					// demonstrate PRAGMA:
					db.executeSql("pragma table_info (test_table);", [], function(res) {
					  console.log("PRAGMA res: " + JSON.stringify(res));
					});

					tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
					  console.log("insertId: " + res.insertId + " -- probably 1");
					  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

					  db.transaction(function(tx) {
						tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
						  console.log("res.rows.length: " + res.rows.length + " -- should be 1");
						  console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
						});
					  });

					}, function(e) {
					  console.log("ERROR: " + e.message);
					});
				  });
*     第三步：closeDB(); -- 关闭连接
*/

/**
* 项目db目录下的SQLite数据库文件名
*/
var dbname_ = "crm.db";


/**
* 获取数据库连接
* dbName 数据库名（*.db）：可以不传（默认）
*/
var getDB = function(dbName){
	if(dbName == undefined || dbName == "undefined" 
		|| dbName == null || dbName == "null" 
		|| dbName == ""){
		dbName = dbname_;
	}
	return sqlitePlugin.openDatabase({name:dbName});
};
/**
* 查询方法
* db 
* querysql 查询sql，eg：select * from where 参数1='值' and 参数2=值
* success 成功回调方法，必须自行实现，取返回数据，eg：
* 			var success = function(res){
				var data = res.rows;
				if(data != null && data.length > 0){
					user.j_username = data.item(0).ACCOUNT_NAME;
					user.j_password = data.item(0).PASSWORD;
					user.userName = data.item(0).USER_NAME;
					user.recordAccount = data.item(0).RECORDACCOUNT;
					user.autoLogin = data.item(0).AUTOLOGIN;
					user.isOffline = data.item(0).ISOFFLINE;
					user.unitId = data.item(0).UNITID;
				}
			}
* error 错误返回，可传（必须自行实现），可不传。
	传入，eg：
		function(e) {
			console.log("ERROR: " + e.message);
		}
*/
var query = function(crmApp,querysql,success,error){
	//alert("in Query!!!");
	if(crmApp == undefined || querysql == undefined || querysql == "" || success == undefined){
		console.log("dbUtils.js 中query方法传参不能为空！");
		return;
	}
	console.log("query sql>>>"+querysql);
	//alert("query sql>>>"+querysql);
	var db = crmApp.crmDB;
	if(error == undefined)
		db.executeSql(querysql,[],success);
	else
		db.executeSql(querysql,[],success,error);
};
/**
* 执行需要commit的sql，无返回
* sql：insert、update、delete
* crmApp 系统对象，1.用于判断系统（Android、IOS）,2.获取数据库DB对象：crmApp.crmDB
* success 成功回调方法
*/
var execute = function(crmApp,sql,success){
	//alert("in execute!!!");
	//alert(crmApp);
	if(crmApp == undefined || sql == undefined || sql == "" || success == undefined){
		console.log("dbUtils.js 中execute方法传参不能为空！");
		return;
	}
	//判断系统
	if(crmApp.device.platform == 'IOS' || crmApp.device.platform == 'iOS') 
		executeIOS(crmApp.crmDB,sql,success);
	else
		executeAndroid(crmApp.crmDB,sql,success);
};
/**
 * 安卓执行方法
 */
var executeAndroid = function(db,sql,success){
	//alert("in executeAndroid!!!");
	db.transaction(function(tx){
		tx.executeSql(sql, []);
		tx.executeSql("commit",[],success);
	});
};
/**
 * 安卓执行方法
 */
var executeIOS = function(db,sql,success){
	db.transaction(function(tx){
		tx.executeSql(sql, [], success);
	});
};