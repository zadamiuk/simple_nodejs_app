const NotFound = { template: '<div>nie ma takiego numeru</div>' }

const routes = [
    { path: '/', redirect: '/lista'},
    { path: '/lista',
      component: PlayerList,
      name: "lista"
    },
    { path: '/nowy', 
      name: 'nowy', 
      component: PlayerForm 
    },
    { path: '/update/:id', 
      component: NewPlayerForm,
      name: 'update',
    },
    { path: '/delete/:id', 
      component: PlayerDelete,
      name: 'delete'
    },
    { path: '*', component: NotFound}
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,    
    data: {
      players: "abc"
    },
    methods: {
      send: function() {
        console.log("submit form");
      }
  }
  }).$mount('#app')
