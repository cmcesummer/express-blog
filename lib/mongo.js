var config = require('config-lite'),
	Mongolass = require('mongolass'),
	mongolass = new Mongolass();

mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
	name: {type: 'string'},
	password: {type: 'string'},
	avatar: {type: 'string'},//头像
	gender: {type: 'string', enum:['m', 'f', 'x']}, //性别
	bio: {type: 'string'}  //个人简介
});

exports.User.index(
	{name:1},
	{unique: true}
).exec() //根据用户名找到用户，用户名全局唯一