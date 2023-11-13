const baseUri = "https://restpairdaoudluna.azurewebsites.net/api/MusicRecords"

Vue.createApp({
    data() {
        return {
            musicRecords: [],
            filterToGetBy:"",
            name: null,
            addData:{title:"",artist:"",release:null ,genre:""},
            message: null,
            addMessage:"",
            title:null,
            artist:null,
            release:null,
            genre:null,

        }
    },
    methods: {
        sayHello(name) {
            if (name)
                this.message = "Hello " + name
            else
                this.message = "Hello No Name"
        },
        getAll(){
            this.helperGetAndShow(baseUri)
        },
        getAllByFilter(filterToGetBy){
            const uri = baseUri + "?filter=" + encodeURIComponent(filterToGetBy)
            console.log(uri)
            this.helperGetAndShow(uri)
        },
        async helperGetAndShow(uri) {
            try {
                const response = await axios.get(uri)
                this.musicRecords = await response.data
                console.log(this.musicRecords)
            } catch (ex) {
                alert(ex.message)
            }
        },
        async AddMusicRecord(){
            try{
                response = await axios.post(baseUri,this.addData)
                this.addMessage = "response" + response.status + " " + response.statusText
                this.getAll()
            }
            catch(ex){
                alert(ex.message)
            }

        }

    }
}).mount("#app")

