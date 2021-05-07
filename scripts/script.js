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
        randomAnswerArray: ['eeeeeee macarena', 'scusa, ma non ti conosco', 'buongiornooooo', 'ok'],
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
        //funzione per pescare una risposta random da array in dati
        randomAnswer() {
            let randomIndex = Math.floor(Math.random() * this.randomAnswerArray.length);
            return this.randomAnswerArray[randomIndex];
        },
        //funzione x inviare i messaggi e risposta automatica 1 sec timer
        sendAMsg() {
            if (this.writeAMsg) {
                const currentDate = moment().format("DD/MM/YYYY HH:mm:ss");
                //per evitare problemi con risposta in chat sbagliata, salvo l'utente attivo al momento in una variabile

                const activeUser = this.activeChat;

                activeUser.messages.push(
                    {
                        date: currentDate,
                        text: this.writeAMsg,
                        status: 'sent',
                        popupActive: false
                    }
                )

                this.writeAMsg = "";
                this.scrollToBottom();



                setTimeout(() => {
                    activeUser.messages.push(
                        {
                            date: currentDate,
                            text: this.randomAnswer(),
                            status: 'received',
                            popupActive: false
                        }
                    )
                    this.scrollToBottom();
                }, 2000);

            }
        },
        //funzione per scroll
        scrollToBottom() {
            this.$nextTick(() => {
                const htmlChatRef = this.$refs.chatAreaToScroll;
                htmlChatRef.scrollTop = htmlChatRef.scrollHeight
            })
        },
        //funzione per aprire tendina 
        showDroppedMenu(i) {
            let currentMessage = this.activeChat.messages[i];
            currentMessage.popupActive = !currentMessage.popupActive
        },
        hideDroppedMenu(i) {
            this.activeChat.messages[i].popupActive = false;
        },
        //funzione per cancellare messaggio
        deleteMsg(i) {
            return this.activeChat.messages.splice(i, 1)
        },
        //milestone 5 - recupero ultimo messaggio e accesso
        lastReceivedMessage(i) {
            const chatText = this.searchAContactList[i].messages;
            if (chatText.length === 0) {
                return 'non ci sono messaggi disponibili'
            }
            const lastText = chatText[chatText.length - 1].text;
            let trimmedText = lastText.slice(0, 20);
            if (lastText.length > 20) {
                return trimmedText + '...'
            } else {
                return lastText;
            }
        },
        selectLastAccess(i) {
            const chatMsg = this.searchAContactList[i].messages;
            const lastMsgDate = chatMsg[chatMsg.length - 1].date
            return this.convertDateToTime(lastMsgDate)
        }
    },

});