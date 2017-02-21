let defaults = {
	port: 3000,
	session: {
		secret: 'myblog',
		key: 'myblog',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/myblog'
};

module.exports = defaults;

/**
 * 1.port: 程序启动要监听的端口号
 * 2.mongodb: mongodb 的地址，myblog 为 db 名
 * 3.session: express-session 的配置信息
 */