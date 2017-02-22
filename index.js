var path = require('path'),
	express = require('express'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	config = require('config-lite'),
	routes = require('./routes'),
	pkg = require('./package');

var app = express();

//set模板目录
app.set('views', path.join(__dirname, 'views'));
//set 模板引擎
app.set('view engine', 'ejs');

//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//session 中间件
app.use(session({
	name: config.session.key, //设置cookie中保存session.id的字段名字
	secret: config.session.secret, //用过设置secret来计算hash值并放在cookie中，使产生的signedCookie防篡改
	resaveL:true ,  //强制更新session
	saveUninitialized: false,//false 强制创建一个 session，即使用户未登录
	cookie: {
		maxAge:config.session.maxAge
	},
	store: new MongoStore({  //将session存储到mongodb
		url: config.mongodb
	})
}))

//flash中间件
app.use(flash());

routes(app);

app.listen(config.port, function() {
	console.log(`${pkg.name} listening on port ${config.port}`);
});

