function getRndSeconds(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
  }
  
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function start_connections(){
    console.log("function started")

    var elements = [...document.querySelectorAll(".artdeco-button__text")].filter((ele)=>{
        return ele.innerText == "Connect"
    })

    console.log(elements)
    

    
    for (let ele of elements) {
      await sleep(getRndSeconds(5, 10));
    
      if (ele.innerText == "Connect") {
    
        //clicks the connect button
        ele.parentElement.click();
    
        //wait for model to showup
        setTimeout(() => {
          is_confirmation_required = true;
          overlay_elements = document.querySelectorAll(".artdeco-button__text");
    
          //click send button
          overlay_elements.forEach((overlay_ele) => {
            if (overlay_ele.innerText == "Send") {
              overlay_ele.parentElement.click();
              is_confirmation_required = false;
            }
          });
    
          //executes when confirmation is required
          //this handles when linkedin asks "how do you know this person?"
          if (is_confirmation_required) {
    
            console.log("Requesting confirmation ....");
    
            overlay_Radio_elements = document.querySelectorAll("Button");
    
            //Select Other option
            overlay_Radio_elements.forEach((overlay_radio_ele) => {
              if (overlay_radio_ele.innerText == "Other") {
                overlay_radio_ele.click();
              }
            });
            
            //get dialog/modal reference(in current state we may have many connect button elements, but we only one which is present in modal)
            dialog = document.querySelector("div[role='dialog']");
    
            //clicks Connect button
            setTimeout(() => {
              dialog.querySelectorAll(".artdeco-button__text").forEach((btn) => {
                if (btn.innerText == "Connect") {
                  btn.parentElement.click();
                }
              });
            }, 2000);
            
            //clicks Send button
            setTimeout(() => {
              overlay_elements = document.querySelectorAll(".artdeco-button__text");
              overlay_elements.forEach((overlay_ele) => {
                if (overlay_ele.innerText == "Send") {
                  overlay_ele.parentElement.click();
                  is_confirmation_required = false;
                }
              });
            }, 2000);
    
          }
        }, 2000);
    
        console.log("Invite Sent");
      }
    }
}


start_connections()

