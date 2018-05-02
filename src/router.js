const routers = [{
    path: '/',
    meta: {
        title: '老虎数码'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}];
export default routers;