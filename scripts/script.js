const app = new Vue({
    el: "#root",
    data: {
        usersList: usersList,
        loadedPic : 'img/avatar_io.jpg',
        activeChat : {},
        
    },
    methods : {
        //funzione per attivare una chat solamente
        openChatOnClick(clickedContact){
            this.activeChat = clickedContact      
        },
        //funzione da passare per stampare ora corretta
        convertDateToTime(dateString){
            const dateFromString = moment(dateString, "DD/MM/YYYY HH:mm:ss");
            return dateFromString.format("HH:mm")
        }
    }
})