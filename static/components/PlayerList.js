const PlayerList = Vue.component('player-list', {
    data: function () {
        return { players: null}
    },
    template: 
    `<div id="player-list">
      <ul>
        <li v-for="player in players">{{player.name}} {{player.surname}} (id: {{player._id}})
          <ul v-if="player.clubs.length > 0">
            <li v-for="clubs in player.clubs">{{clubs}}</li>
            
            <router-link :to="{name: 'update', params: {id: player._id}, props: {player: player.name}}">Modyfikuj</router-link>
            <router-link :to="{name: 'delete', params: {id: player._id}}">Usun</router-link>
          </ul>
        </li>                
      </ul>
    </div>`,

    created: function() {
      axios.get("/webresources/players").then((response) => {
        const data = response.data;
        console.log(data);
        this.players = data;
      }).catch(error => {
        alert("Error: " + error)
      });
    }
  })
  