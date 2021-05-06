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
        messageIndex: null,
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
                        date: currentDate,
                        text: this.writeAMsg,
                        status: 'sent',
                        popupActive: false
                    }
                )
                this.writeAMsg = "";
                setTimeout(() => {
                    this.activeChat.messages.push(
                        {
                            date: currentDate,
                            text: "ok!",
                            status: 'received',
                            popupActive: false
                        }
                    )
                }, 1000);

            }
        },
        //funzione per aprire tendina 
        showDroppedMenu(i) {
            let currentMessage = this.activeChat.messages[i];
            currentMessage.popupActive = !currentMessage.popupActive
        },
        //funzione per cancellare messaggio
        deleteMsg(i) {
            return this.activeChat.messages.splice(i, 1)
        },
        //milestone 5 - recupero ultimo messaggio e accesso
        lastReceivedMessage(i) {
            const lastChatText = this.usersList[i].messages;
            const lastText = lastChatText[lastChatText.length - 1].text
            return lastText;
        },
        selectLastAccess(i) {
            const lastChatMsg = this.usersList[i].messages;
            const lastMsgDate = lastChatMsg[lastChatMsg.length - 1].date
            return this.convertDateToTime(lastMsgDate)
        }
    },
    computed: {
        //creo funzione per recuperare ultimo accesso utente  
        ActiveChatLastAccess() {
            const lastReceivedMsg = this.activeChat.messages.filter((mgs) => mgs.status === 'received');
            const lastMsgDate = lastReceivedMsg[lastReceivedMsg.length - 1].date
            return this.convertDateToTime(lastMsgDate)
        },
        //funzione per filtrare i contatti
        searchAContactList() {
            return this.usersList.filter((element) => {
                return element.name.toLowerCase().startsWith(this.searchContact.toLowerCase());
            });
        },
 
    },

});