const PlayerForm = Vue.component('player-form', {
    template: `
<form id="player-form" @submit.prevent="process()" >    
    <table style="width: 800px;">
        <tr>
            <td style="width: 15%;"><label for="name">Imie</label></td>
            <td style="width: 85%;"><input type="text" id="name" name="name" v-model="name"></td>
        </tr>
        <tr>
            <td><label for="surname">Nazwisko</label></td>
            <td><input type="text" id="surname" name="surname" v-model="surname"></td>
        </tr>
        <tr>
            <td><label for="position">Pozycja</label></td>
            <td><input type="text" id="position" name="position" v-model="position"></td>
        </tr>
        <tr>
            <td style="vertical-align:top"><label for="field">Kluby (oddzielone przecinkami)</label></td>
            <td><textarea id="field" name="field" v-model="clubs" row="10" columns="80" style="width: 100%; height: 100px;"></textarea></td>
        </tr>
        <tr>
            <td colspan="2">
                <button type="submit" style="width: 80px; display: block">Dodaj zawodnika</button>
            </td>
        </tr>
    </table>
</form>` ,
    data: function() {
        return {
            name: "Imie",
            surname: "Nazwisko",
            position: "Pozycja",
            clubs: "Klub 1, Klub 2" 
        }
    }, 
    methods: {
        process: function() {
            console.log("form: name=", this.name, "surname=", this.surname, "position=", this.position, 'clubs=', this.clubs);
            player = {
                name: this.name,
                surname: this.surname,
                position: this.position,
                clubs: this.clubs
            }
            axios.post("/webresources/players", 
                       JSON.stringify(player), 
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
 