$(function ()
{
    $("#btn_create_new_account").click(function ()
    {
        window.open("New Account.html");
    });


    //Activate / Deactivate Account Create Button
    $("#btn_create_account").attr('disabled', 'disabled');
    $("form").keyup(function ()
    {
        // To Disable Account Create Button
        $("#btn_create_account").attr('disabled', 'disabled');

        var firstname = $("#input_vorname").val();
        var lastname = $("#input_nachname").val();
        var mail = $("#input_mail").val();
        var benutzername = $("#input_benutzername").val();
        var pwd = $("#input_pwd").val();

        if (!(pwd === "" | firstname === "" | lastname === "" | benutzername === "" | mail === ""))
        {
            // To Enable Account Create Button
            $("#btn_create_account").removeAttr('disabled');
        }
    });
    
    $( "#btn_create_account" ).click(function() {
    
var productServiceUrl = 'http://localhost:8080/MyFirstWebService/MyFirstWebService'; // Preferably write this out from server side
  
var soapMessage =
'<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:insertNewCustomer xmlns:ns2="http://ws/">\
            <firstname>'+$( "#input_vorname" ).val()+'</firstname>\
            <lastname>'+$( "#input_nachname" ).val()+'</lastname>\
            <username>'+$( "#input_benutzername" ).val()+'</username>\
            <password>'+$( "#input_pwd" ).val()+'</password>\
            <email>'+$( "#input_mail" ).val()+'</email>\
        </ns2:insertNewCustomer>\
    </S:Body>\
</S:Envelope>';
  
$.ajax({
url: productServiceUrl,
type: "POST",
dataType: "xml",
data: soapMessage,
complete: getResult,
contentType: "text/xml; charset=\"utf-8\""
});
 
return false;
});
 
function getResult(xmlHttpRequest, status)
{
    alert($(xmlHttpRequest.responseXML).text());
 
}
   
   
});


