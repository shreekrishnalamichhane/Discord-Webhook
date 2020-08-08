const whurl = "your discord webhook url here";
const autoSend = document.querySelector("#autoSendMSG");
const SendBtn = document.querySelector("#SendBtn");
const MessageSuccess = document.querySelector("#message-send-successful");
const MessageFail = document.querySelector("#message-send-unsuccessful");
function RemoveMsgAlert(){
  setTimeout(function(){ 
    $(MessageSuccess).addClass("d-none");
    $(MessageFail).addClass("d-none");
  }, 3000);
}
function SendMSG(){
    if($(autoSend).is(':checked')) {
        Send();
    }
    else{
      console.log('Auto Send is disabled.');
    }
  };
  SendBtn.addEventListener('click', function(){
    Send();
  });
    function Send(){
      const msg = {
        "content": document.querySelector("#message-box").value
      }
      if(document.querySelector("#message-box").value != ""){
        fetch(whurl + "?wait=true",{"method":"POST",
                "headers": {
                    "content-type":"application/json"
                            },
                "body":JSON.stringify(msg)}
        )
        // .then(a=>a.json()).then(data => {
        //   if(data){
        //     console.log('Message has been send successfully');
        //     $(MessageSuccess).removeClass("d-none");
        //     RemoveMsgAlert();
        //   }
        // });
        .then(res => {
          if(res.ok) {
            console.log('Message has been send successfully');
            $(MessageSuccess).removeClass("d-none");
            RemoveMsgAlert();
            return res.json();
          }
          return res.text().then(text => {
            console.log(text);
            console.log('Message send failed');
            $(MessageFail).removeClass("d-none");
            RemoveMsgAlert();
          })
        });



        
      }
      else{
        console.log("There is nothing to send");
      }
    }
    
