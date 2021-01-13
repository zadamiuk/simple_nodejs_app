const PlayerDelete = Vue.component('player-delete', {
    template: 
    `<form id="player-delete" @submit.prevent="process()" > 
        <h5> Czy na pewno usunąć zawodnika? </h5>
        <button type="submit" style="width: 80px; display: block">Tak, usuń!</button>
    </form>`,
data: function() {
    return {}
}, 
methods: {
    process: function() {
        data = {id: this.$route.params.id}
        console.log("hejka")
        axios.post("/webresources/delete", 
                   JSON.stringify(data), 
                    {   
                        headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }
        ).then((response) => {
            console.log(response);
            this.$router.push('/lista');
        }).catch(error => {
            alert("Error: " + error)
        });
    }
}
})
