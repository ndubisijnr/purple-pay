const GLOBAL_RESPONSE = [
    {responseCode:"00", responseMessage:"Completed successfully"},
    {responseCode:"01", responseMessage:"Refer to card issuer"},
    {responseCode:"02", responseMessage:"Refer to card issuer's special conditions"},
    {responseCode:"03", responseMessage:"Invalid merchant"},
    {responseCode:"04", responseMessage:"Pick-up"},
    {responseCode:"05", responseMessage:"Do not honor"},
    {responseCode:"07", responseMessage:"Pick-up card, responseMessage:special condition"},
    {responseCode:"08", responseMessage:"Honour with identification"},
    {responseCode:"09", responseMessage:"Request in progress"},
    {responseCode:"10", responseMessage:"Approved for partial amount"},
    {responseCode:"11", responseMessage:"Approved (VIP)"},
    {responseCode:"12", responseMessage:"Invalid transaction"},
    {responseCode:"13", responseMessage:"Invalid amount"},
    {responseCode:"14", responseMessage:"Invalid card number (no such number)"},
    {responseCode:"15", responseMessage:"No such issuer"},
    {responseCode:"16", responseMessage:"Approved, responseMessage:update track 3"},
    {responseCode:"17", responseMessage:"Customer cancellation"},
    {responseCode:"18", responseMessage:"Customer dispute"},
    {responseCode:"19", responseMessage:"Re-enter transaction"},
    {responseCode:"20", responseMessage:"Invalid response"},
    {responseCode:"21", responseMessage:"No action taken"},
    {responseCode:"22", responseMessage:"Suspected malfunction"},
    {responseCode:"23", responseMessage:"Unacceptable transaction fee"},
    {responseCode:"24", responseMessage:"File update not supported by receiver"},
    {responseCode:"25", responseMessage:"Unable to locate record"},
    {responseCode:"26", responseMessage:"Duplicate record"},
    {responseCode:"27", responseMessage:"File update field edit error"},
    {responseCode:"28", responseMessage:"File update file locked out"},
    {responseCode:"29", responseMessage:"File update not successful, responseMessage:contact acquirer"},
    {responseCode:"30", responseMessage:"Format error"},
    {responseCode:"31", responseMessage:"Bank not supported by switch"},
    {responseCode:"32", responseMessage:"Completed partially"},
    {responseCode:"33", responseMessage:"Expired card"},
    {responseCode:"34", responseMessage:"Suspected fraud"},
    {responseCode:"35", responseMessage:"Card acceptor contact acquirer"},
    {responseCode:"36", responseMessage:"Restricted card"},
    {responseCode:"37", responseMessage:"Card acceptor call acquirer security"},
    {responseCode:"38", responseMessage:"Allowable PIN tries exceeded"},
    {responseCode:"39", responseMessage:"No credit account"},
    {responseCode:"40", responseMessage:"Requested function not supported"},
    {responseCode:"41", responseMessage:"Lost card"},
    {responseCode:"42", responseMessage:"No universal account"},
    {responseCode:"43", responseMessage:"Stolen card, responseMessage:pick-up"},
    {responseCode:"44", responseMessage:"No investment account"},
    {responseCode:"45-50", responseMessage:"Reserved for ISO use"},
    {responseCode:"51", responseMessage:"Not sufficient funds"},
    {responseCode:"52", responseMessage:"No checking account"},
    {responseCode:"53", responseMessage:"No savings account"},
    {responseCode:"54", responseMessage:"Expired card"},
    {responseCode:"55", responseMessage:"Incorrect pin"},
    {responseCode:"56", responseMessage:"No card record"},
    {responseCode:"57", responseMessage:"Transaction not permitted to cardholder"},
    {responseCode:"58", responseMessage:"Transaction not permitted to terminal"},
    {responseCode:"59", responseMessage:"Suspected fraud"},
    {responseCode:"60", responseMessage:"Card acceptor contact acquirer"},
    {responseCode:"61", responseMessage:"Exceeds withdrawal amount limit"},
    {responseCode:"62", responseMessage:"Restricted card"},
    {responseCode:"63", responseMessage:"Security violation"},
    {responseCode:"64", responseMessage:"Original amount incorrect"},
    {responseCode:"65", responseMessage:"Exceeds withdrawal frequency limit"},
    {responseCode:"66", responseMessage:"Card acceptor call acquirer's security department"},
    {responseCode:"67", responseMessage:"Hard capture (requires that card be picked up at ATM)"},
    {responseCode:"68", responseMessage:"Response received too late"},
    {responseCode:"69-74", responseMessage:"Reserved for ISO use"},
    {responseCode:"75", responseMessage:"Allowable number of PIN tries exceeded"},
    {responseCode:"76", responseMessage:"Invalid Credit Account"},
    {responseCode:"77", responseMessage:"Invalid Debit Account"},
    {responseCode:"78", responseMessage:"Invalid Account"},
    {responseCode:"79", responseMessage:"Invalid Entry"},
    {responseCode:"80", responseMessage:"Authorization Key must be passed"},
    {responseCode:"81", responseMessage:"Invalid Action"},
    {responseCode:"82", responseMessage:"Your account has been deleted or suspended"},
    {responseCode:"83", responseMessage:"Invalid date Format"},
    {responseCode:"84", responseMessage:"Invalid Path"},
    {responseCode:"85", responseMessage:"Failed to perform action"},
    {responseCode:"86", responseMessage:"Invalid Credential"},
    {responseCode:"87", responseMessage:"Activity Already Queued Authorized"},
    {responseCode:"87", responseMessage:"Activity Already Performed"},
    // {responseCode:"00", responseMessage:"Activity Queued Awaiting Authorization"},
    {responseCode:"88", responseMessage:"Failed to create record"},
    {responseCode:"89", responseMessage:"Failed to update record"},
    {responseCode:"90", responseMessage:"Cutoff is in process"},
    {responseCode:"", responseMessage:"(switch ending a day's business and starting the next. Transaction can be sent again in a few minutes)"},
    {responseCode:"91", responseMessage:"Issuer or switch is inoperative"},
    {responseCode:"92", responseMessage:"Financial institution or intermediate network facility cannot be found for routing"},
    {responseCode:"93", responseMessage:"Transaction cannot be completed. Violation of law"},
    {responseCode:"94", responseMessage:"Duplicate transmission"},
    {responseCode:"95", responseMessage:"Reconcile error"},
    {responseCode:"22", responseMessage:"System malfunction"},
    {responseCode:"97", responseMessage:"Failed to upload records."},
    {responseCode:"98", responseMessage:"No Pending Entries."},
    {responseCode:"99", responseMessage:"Invalid Bank Code"},
    {responseCode:"100", responseMessage:"Authentication Failed"},
    {responseCode:"101", responseMessage:"Failed to generate OTP"},
    {responseCode:"102", responseMessage:"Invalid Type"},
    {responseCode:"103", responseMessage:"Invalid interest Rate"},
    {responseCode:"104", responseMessage:"Invalid Checker ID"},
    // {responseCode:"00", responseMessage:"OTP is sent to your email for authorization"},
    {responseCode:"105", responseMessage:"OTP is Required"},
    {responseCode:"106", responseMessage:"Bad Request"},
    // {responseCode:"00", responseMessage:"Access Granted"},
    {responseCode:"107", responseMessage:"Access Denied"},
    {responseCode:"108", responseMessage:"Bank Code not Found"},
    {responseCode:"109", responseMessage:"Invalid Username"},
    {responseCode:"110", responseMessage:"Incorrect Old Password"},
    {responseCode:"111", responseMessage:"Password mismatch"},
    {responseCode:"112", responseMessage:"Token Expired"},
    {responseCode:"113", responseMessage:"Unauthorized Token"},
    {responseCode:"114", responseMessage:"Authorization Token Missing"},
    {responseCode:"115", responseMessage:"Invalid Authorization Token"},
    {responseCode:"116", responseMessage:"Invalid Authorization Token"},
    {responseCode:"117", responseMessage:"Record already exists"},
    {responseCode:"N Zero-ZZ", responseMessage:"Reserved for private use"},
    {responseCode:"99", responseMessage:"Something Went Wrong"}
]
function getResponse(code) {
    const response = GLOBAL_RESPONSE.filter(it => it.responseCode === code)
    if (response.length < 1) return {responseCode:"99", responseMessage:"Something Went Wrong"}
    else return response[0]
}

exports.GLOBAL_RESPONSE = GLOBAL_RESPONSE;
exports.getResponse = getResponse;