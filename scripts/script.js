const app = new Vue({
    el: "#root",
    data: {
        usersList: usersList,
        loadedPic: 'img/avatar_io.jpg',
        activeChat: usersList[0],
        //v-model imput cerca contatto
        searchContact: "",
        //v-model imput scrivi in chat
        writeAMsg: "",
    },

    methods: {
        //funzione per attivare una chat solamente
        openChatOnClick(clickedContact) {
            this.activeChat = clickedContact
        },
        //funzione da passare per stampare ora corretta
        convertDateToTime(dateString) {
            const dateFromString = moment(dateString, "DD/MM/YYYY HH:mm:ss");
            return dateFromString.format("HH:mm")
        },
        //funzione x inviare i messaggi e risposta automatica 1 sec timer
        sendAMsg() {
            if (this.writeAMsg) {
                const currentDate = new Date();
                this.activeChat.messages.push(
                    {
                        date: currentDate.getHours() + ":" + currentDate.getMinutes(),
                        text: this.writeAMsg,
                        status: 'sent'
                    }
                )
                this.writeAMsg = "";
                setTimeout(() => {
                    this.activeChat.messages.push(
                        {
                            date: currentDate.getHours() + ":" + currentDate.getMinutes(),
                            text: "ok!",
                            status: 'received'
                        }
                    )
                }, 1000);

            }
        },
        //funzione per filtrare i contatti
        searchAContactList(search) {
            return this.usersList.filter(element => element.name.includes(search));
        }
    },
    computed: {
        //creo funzione per recuperare ultimo accesso utente  
        selectLastAccess() {
            console.log(this.activeChat)
            console.log(this.activeChat.messages)
            const lastReceivedMsg = this.activeChat.messages.filter((msg) => msg.status === 'received');
            const lastMsgDate = lastReceivedMsg[lastReceivedMsg.length - 1].date
            return this.convertDateToTime(lastMsgDate)
        },
    },

})