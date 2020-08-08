$(document).ready ( function StartRecord(){
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.lang = 'en-US'; 
        
        
        const StartBtn = document.querySelector("#StartBtn");
        const StopBtn = document.querySelector("#StopBtn");
        const ContiniousSwitch = document.querySelector("#continiousSwitch");

        $(ContiniousSwitch).change(function(){
            if($(this).is(':checked')) {
                recognition.continuous = true;
                console.log("Continious");
            } else {
                recognition.continuous = false;
                console.log("Non-Continious");
            }
        });
        

        StartBtn.addEventListener('click', function(){
            StartMeter();
            $(StopBtn).removeClass("d-none");
            $(StartBtn).addClass("d-none");
            document.querySelector("#message-box").innerText = "";

            recognition.addEventListener('result', e => {
                const transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                
                    console.log(transcript);
                    // const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
                    document.querySelector("#message-box").innerText = transcript;
            });
            recognition.onend = function() {
                recognition.abort(); 
                $(StopBtn).addClass("d-none");
                $(StartBtn).removeClass("d-none");
                console.log('Speech recognition service stopped');
                SendMSG();
            };
        // recognition.addEventListener('end', recognition.start);
        recognition.start();
        });

        StopBtn.addEventListener('click', function(){
            recognition.abort(); 
            // console.log("SpeechRecog Stopped!");
            $(StopBtn).addClass("d-none");
            $(StartBtn).removeClass("d-none");
        });
    });
    