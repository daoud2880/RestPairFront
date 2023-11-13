const baseUri = "https://restpairdaoudluna.azurewebsites.net/api/MusicRecords"

Vue.createApp({
    data() {
        return {
            musicRecords: [],
            name: null,
            message: null,
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
        getAll(filter){
            const uri = baseUri + "?title" + encodeURIComponent(title)
            this.helperGetAndShow(uri)
        },
        async helperGetAndShow(uri) {
            try {
                const response = await axios.get(uri)
                this.musicRecords = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },

    }
}).mount("#app")

