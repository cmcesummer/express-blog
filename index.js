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

//设置模板全局常亮
app.locals.blog = {
	title: pkg.name,
	description: pkg.description
}

//app.locals 上通常挂载常量信息（如博客名、描述、作者信息），
//res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）

//添加模板必须的三个变量
app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	next();
})

routes(app);

app.listen(config.port, function() {
	console.log(`${pkg.name} listening on port ${config.port}`);
});

