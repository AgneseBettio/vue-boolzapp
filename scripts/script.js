const app = new Vue({
    el: "#root",
    data: {
        usersList: usersList,
        loadedPic : 'img/avatar_io.jpg',
        activeChat : {},
        searchContact = "",
        
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
        },
    },
    computed : {
       //creo funzione per recuperare ultimo accesso utente  
       selectLastAccess() {
       const lastReceivedMsg = this.activeChat.messages.filter((msg)=> msg.status === 'received');
       const lastMsgDate = lastReceivedMsg[lastReceivedMsg.length -1].date 
       return this.convertDateToTime(lastMsgDate)
       }
    },
    mounted(){
        this.activeChat = this.usersList[0];
    }
})