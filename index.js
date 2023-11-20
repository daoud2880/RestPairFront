const baseUri = "https://restpairdaoudluna.azurewebsites.net/api/MusicRecords"

Vue.createApp({
    data() {
        return {
            musicRecords: [],
            filterToGetBy:"",
            titleToGetBy:"",
            name: null,
            addData:{title:"",artist:"",release:null ,genre:""},
            message: null,
            addMessage:"",
            title:null,
            deleteMessage:"",
            artist:null,
            release:null,
            genre:null,
            titleToBeDeleted:"",
            titleToBeUpdated:"",
            updateMessage:"",
            updateData:{title:"",artist:"",release:null ,genre:""},
            tracks:[],
            selected:null,

        }
    },
    methods: {
        sayHello(name) {
            if (name)
                this.message = "Hello " + name
            else
                this.message = "Hello No Name"
        },
        async Clicked(recordName) {
            console.log(this.recordName)
            const uri = baseUri + "/recordName?recordName=" + encodeURIComponent(recordName)
            console.log(uri)
            const response = axios.get(uri)
            this.tracks = await response.data
            console.log(this.tracks)
            
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

        },
        async DeleteMusicRecord(){
            try{
                const uri = baseUri + "?title=" + encodeURIComponent(this.titleToBeDeleted)
                response = await axios.delete(uri)
                this.addMessage = "response" + response.status + " " + response.statusText
                this.getAll()
            }
            catch(ex){
                alert(ex.message)
            }

        },
        async UpdateMusicRecord(){

            try{
                const uri = baseUri + "/" + encodeURIComponent(this.titleToBeUpdated)
                response = await axios.put(uri,this.updateData)
                this.updateMessage = "response" + response.status + " " + response.statusText
                this.getAll()
            }
            catch(ex){
                alert(ex.message)
            }
        }

    },

}).mount("#app")

