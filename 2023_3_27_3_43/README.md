因为signup要调用signin的方法，创了个新的auth.service.ts, 并把大部分signin，singup逻辑搬过去了


为了简明结构，把signin，signup组件挪到新建的authservice文件夹里了


可以检测用户登录注册是否成功，如果失败在网页上显示通知，login在response里检查，signup直接用response和error区分，都在auth.service.ts文件里


登录成功会this.user.next(user);推出一个用户，没推出前为空


用户有它在数据库user表里的全部数据，以及getter，setter方法以便使用

