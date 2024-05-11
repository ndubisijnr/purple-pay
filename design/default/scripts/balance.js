var GLOBAL_JUMP = require("mod_global_trans").GLOBAL_JUMP;

ViewModel("balance", {
    data: {
        showModel:false,
        user:null,
        loading:false,
        showTip:"Fetching account balance",
        balanceEnquiryRequest:{accountNumber:""},
        balance:"0.00"
    },

    methods:{
        _formatInput: function (amount) {
            let amountFloat = parseFloat(amount).toFixed(2);
            const parts  = amountFloat.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return  parts.join(".")
        },


        initHTTPCB: function () {
            Tos.HttpclientCbEvent();
        },

        readBalance(){
            console.log('reading balance ===> ')
            this.loading = true
            this.notifyPropsChanged();
            this.balanceEnquiryRequest.accountNumber = this.user.customerOrganisationWallet
            this.notifyPropsChanged();
            let that = this
            function onSuccess(data){
                console.log('balance response =====> ',JSON.stringify(data))
                that.loading = false
                that.balance = that._formatInput(data.accountBalance)
                that.notifyPropsChanged();
            }
            function onError(data){
                that.loading = false
                that.error = data
                that.notifyPropsChanged();
            }
            Tos.GLOBAL_API.callApi(Tos.GLOBAL_API.BALANCE_ENQUIRY,this.balanceEnquiryRequest,onSuccess,onError)
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
            this.notifyPropsChanged();
        },

        handleCancel: function () {
            if (this.showModel) {
                this.hideModel();
                return;
            }
            this.onFail();
        },

        navigateTo: function (args) {
            GLOBAL_JUMP("", args);
        },

        handleNext: function () {
            if(this.transferType && this.transferTypeValue === 'Transfer to Other Banks'){
                if(this.searchBank){
                    this.navigateTo()
                }
                this.searchBank = true;
                this.otherBanks = true;
                this.notifyPropsChanged()

            }else{
                this.navigateTo()
            }

        },

        onKeyDown(args) {
            console.log("key down----->>>>:", args);
            var key = args;
            switch (key) {
                case "cancel":
                    this.handleCancel();
                    break;
                default:
                    break;
            }
        },
    },

    onWillMount: function (req) {
        this.user = Tos.GLOBAL_CONFIG.userInfo
    },

    onMount: function () {
        this.readBalance()

    },
    onWillUnmount: function () {

    }
})