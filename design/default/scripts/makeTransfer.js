var GLOBAL_JUMP = require("mod_global_trans").GLOBAL_JUMP;
var GET_SHOW_AMOUNT = require("mod_global_funcs").GET_SHOW_AMOUNT;


ViewModel("makeTransfer", {
    data: {
        showModel: false,
        searchQy:"",
        theme:null,
        transferType:false,
        transferTypeValue:"Transfer to PurplePay",
        accountNumberStr:"",
        amount_and_narration:false,
        transactionSummary:false,
        transactionPin:false,
        searchBank:false,
        user:null,
        otherBanks:false,
        filteredBankList:null,
        isNoBank:true,
        banks:null,
        fundTransferRequest:{
            amount:"",
            bankName:"",
            bankCode:"",
            creditAccountName:"",
            creditAccountNumber:"",
            debitAccountName:"",
            debitAccountNumber:"",
            narration:"",
            sessionId:"",
            reference:"",
            sourceType:"POS_TERMINAL",
            pin:""
        },
        loading:false,
        isShowScrollbar: false,
        nameEnquiryLoading:false,
        isSelectedBank:false,
        selectedBank: {bankName:"Select bank"},
        nameEnquiry:false,
        nameEnquiryRequest:{
            accountBankCode:null,
            accountNumber:null,
        },
        nameEnquiryResponse: {},
        fundTransferAmount:"₦ 0.00",
        trans:{},
        popUp:false,
        transParam:{},
        activeBankIndicator:null,
        bankFilterAlphabets:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        flow:{},
        title:"",
        showTip:"Fetching account details",
        isError:false,
        error:"",
        filteredBanks:null,
        loadingBanks:false,
        isFiltering:false
    },

    methods:{
        selectBank(args){
            this.selectedBank = args
            this.fundTransferRequest.bankName = this.selectedBank.bankName
            this.fundTransferRequest.bankCode = this.selectedBank.bankCode
            this.nameEnquiryRequest.accountBankCode = this.selectedBank.bankCode
            this.isSelectedBank = true
            this.searchBank = false
            this.notifyPropsChanged();
        },

        _formatInput: function () {
            if(this.fundTransferRequest.amount === "") this.fundTransferAmount = "₦ 0.00";
            // parseFloat(this.fundTransferRequest.amount).toFixed(2);
            this.fundTransferRequest.amount = this.fundTransferRequest.amount.replace(/,/g, '');
            // const parts  = this.fundTransferRequest.amount.toString().split(".");
            // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            // this.fundTransferAmount = parts.join(".")
            this.notifyPropsChanged();
        },

        navigator(){
            this.transferType = false
            this.nameEnquiry = false
            this.amount_and_narration = true
            this.notifyPropsChanged()
        },

        enterPin(){
            this.handleNext()
            this.transactionSummary = false
            this.notifyPropsChanged()
        },

        navigatorTransactionSummary(){
            this.fundTransferRequest.narration = `trf to ${this.nameEnquiryResponse.accountName}`.toLowerCase()
            this.fundTransferRequest.debitAccountName = this.user.organisation.organisationName
            this.fundTransferRequest.creditAccountName = this.nameEnquiryResponse.accountName
            this.fundTransferRequest.sessionId = this.nameEnquiryResponse.sessionId
            this.fundTransferRequest.debitAccountNumber = this.user.terminal.terminalAccountNumber
            this.fundTransferRequest.creditAccountNumber = this.nameEnquiryResponse.accountNumber
            this._formatInput()
            this.transactionSummary = true
            this.notifyPropsChanged()
        },

        showFilterView(){
            this.isFiltering = true;
            this.notifyPropsChanged()
        },

        filter(args){
            this.filteredBanks = [];  // Reinitialize filteredBanks to a new empty array

            for(let i = 0; i < this.banks.length; i++){

                if(this.banks[i].bankName[0].toLowerCase() === args){
                    this.filteredBanks.push(this.banks[i])
                }
            }

            this.isFiltering = false;
            this.notifyPropsChanged();
        },


        initHTTPCB: function () {
            console.log("HttpclientCbEvent start 0000000===========");
            Tos.HttpclientCbEvent();
        },

        notMe(){
            this.nameEnquiry = false;
            this.searchBank = false
            this.nameEnquiryResponse = {};
            this.notifyPropsChanged()
        },


        doNameSearch(){
            let that = this;
            that.nameEnquiryLoading = true
            that.showTip = 'Loading Account Details'
            if(that.transferTypeValue === "Transfer to PurplePay"){
                that.nameEnquiryRequest.accountBankCode = "000000"
                that.fundTransferRequest.bankName = "CoreBank"
                that.fundTransferRequest.bankCode = "090356"
            }

            that.notifyPropsChanged();
            function onSuccess(data){
                that.nameEnquiryLoading = false
                that.nameEnquiry = true
                that.nameEnquiryResponse = data
                that.notifyPropsChanged();
            }
            function onError(data){
                that.nameEnquiryLoading = false
                that.isError = true
                that.nameEnquiry = false
                that.error = data.responseMessage
                that.notifyPropsChanged();
            }
            Tos.GLOBAL_API.callApi(Tos.GLOBAL_API.NAME_ENQUIRY,that.nameEnquiryRequest,onSuccess,onError,1,Tos.GLOBAL_CONFIG.userInfo.organisation.organisationId)
        },


        handleClick(args){
            this.transferType = true
            this.transferTypeValue = args
            this.otherBanks = this.transferTypeValue === 'Transfer to Other Banks';
            this.notifyPropsChanged();
        },

        onFail: function () {
            if (this.showModel) {
                this.hideModel();
                return;
            }
            navigateReplace({
                target: "pay",
                type: "cancel",
                //data:this.user
            });
        },

        hideModel: function () {
            this.showModel = false;
            this.selectedBank = null
            this.otherBanks = false
            this.notifyPropsChanged();
        },

        handleCancel: function () {
            if (this.showModel) {
                this.hideModel();
                return;
            }else if(this.transferType) {
                this.transferType = false;
                // if(!this.fundTransferRequest.bankCode || !this.nameEnquiryRequest.accountBankCode) this.isSelectedBank = false;
                // this.selectedBank = {name:"Select Bank"};
                this.otherBanks = false
                this.notifyPropsChanged();
                return;
            }else if(this.transferType && this.otherBanks){
                this.otherBanks = false
                this.searchBank = false
                this.transferType = true;
                this.isSelectedBank = false
                this.notifyPropsChanged();
                return;
            }
            this.onFail();
        },

        navigateTo: function (args) {
            GLOBAL_JUMP("", args);
        },

        openBankList(){
            this.searchBank = true
            this.filteredBanks = this.banks.filter(it => {
                return it.bankName[0].toLowerCase() === 'a'
            })
            this.notifyPropsChanged()

        },

        handleNext: function () {
            if(this.transferType && this.transferTypeValue === 'Transfer to Other Banks'){
                if(this.isSelectedBank){
                    this.navigateTo({fundRequest:this.fundTransferRequest})
                }else{
                    this.searchBank = true;
                    this.isSelectedBank =true
                    this.otherBanks = true;
                    this.notifyPropsChanged()
                }

            }else{
                this.navigateTo({fundRequest:this.fundTransferRequest})
            }
        },

        onKeyDown(args) {
            console.log("key down----->>>>:", args);
            var key = args;
            switch (key) {
                case "0":
                    if(!this.value) break;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    if (this.showModel) break;
                    if(this.value.length>12) break;
                    this.value += key;
                    this._formatInput();
                    break;
                case "cancel":
                    if(this.isError){
                        this.isError = false;
                        this.notifyPropsChanged();
                        return;
                    }
                    if(this.nameEnquiry){
                        this.nameEnquiry = false;
                        this.notifyPropsChanged();
                        return;
                    }
                    if(this.transactionSummary){
                        this.transferType = true
                        this.nameEnquiry = true
                        this.transactionSummary = false
                        this.notifyPropsChanged()
                    }
                    else if(this.transactionPin) {
                        this.transactionSummary = true
                        this.transactionPin = false
                        this.notifyPropsChanged()
                    }
                    else{
                        this.isError = false
                        this.notifyPropsChanged();
                        this.handleCancel();
                        this.notMe()
                    }
                    break;
                case "backspace":
                    if (this.showModel) {
                        this.hideModel();
                        return;
                    }
                    this.reduceNum();
                    break;
                case "return":
                    if (this.showModel || this.isError) {
                        this.isError = false
                        this.notifyPropsChanged();
                        this.hideModel();
                        return;
                    }
                    else if(!this.nameEnquiry){
                        this.nameEnquiryRequest.accountNumber = this.accountNumberStr
                        if(this.transferTypeValue === 'Transfer to Other Banks' && !this.isSelectedBank){
                            this.searchBank = true
                            this.notifyPropsChanged();
                        }else{
                            this.notifyPropsChanged();
                            this.doNameSearch()
                        }
                    }
                    else{
                        if(this.transferType) this.navigatorTransactionSummary();
                        if(this.transactionSummary)this.enterPin();
                        if(this.transactionPin) this.doTransfer();
                    }
                    break;
                default:
                    break;
            }
        },
    },




    onWillMount: function (req) {
        this.flow =Tos.GLOBAL_TRANSACTION.flow;
        this.trans =Tos.GLOBAL_TRANSACTION.trans;
        this.title =  this.trans.transName;
        this.fundTransferRequest.amount = GET_SHOW_AMOUNT(this.trans.amount)
        this.fundTransferAmount = GET_SHOW_AMOUNT(this.trans.amount)
        if(Tos.GLOBAL_CONFIG != null) this.theme = Tos.GLOBAL_CONFIG.theme

        this.user = Tos.GLOBAL_CONFIG.userInfo
        this.activeBankIndicator = this.theme.primary_bold
        this.banks = Tos.GLOBAL_CONFIG.banks

        this.notifyPropsChanged()
    },

    onMount: function () {
    },

    onWillUnmount: function () {
        Tos.PrnClose();
    }
})