var totalfb;
var totaltwitter;
var totalyoutube;

chrome.storage.local.get({
    'status': true,
    'totalfb': 0,
    'totaltwitter': 0,
    'totalyoutube': 0,
}, function (result) {

    totalfb = result.totalfb;
    totaltwitter = result.totaltwitter;
    totalyoutube = result.totalyoutube;

    document.getElementById("totalfb").innerHTML = totalfb
    document.getElementById("totaltwitter").innerHTML = totaltwitter
    document.getElementById("totalyoutube").innerHTML = totalyoutube

    console.log("status is" + result.status)

    const happydia_on_content = `<svg class="h-6 w-6 text-gray-600 fill-current mr-3" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 62.4 62.4" style="enable-background:new 0 0 62.4 62.4;" xml:space="preserve">
                    <style type="text/css">
                        .st0 {
                            fill: green;
                        }
                    </style>
                    <path class="st0"
                        d="M31.2,61.5c-16.7,0-30.3-13.6-30.3-30.3S14.5,0.8,31.2,0.8c16.7,0,30.3,13.6,30.3,30.3S47.9,61.5,31.2,61.5z
                            	 M31.2,4.8C16.7,4.8,4.8,16.7,4.8,31.2s11.8,26.3,26.3,26.3c14.5,0,26.3-11.8,26.3-26.3S45.7,4.8,31.2,4.8z" />
                    <path class="st0" d="M31.7,47.9h-0.5c-10.1,0-14.7-7.5-15.6-11.4c-0.3-1.1,0.4-2.2,1.5-2.4c1.1-0.3,2.2,0.4,2.4,1.5
                            	c0.1,0.3,2.3,8.4,11.8,8.4h0.5c9.5,0,11.7-8,11.8-8.4c0.3-1.1,1.4-1.7,2.4-1.4c1.1,0.3,1.7,1.3,1.5,2.4
                            	C46.3,40.5,41.8,47.9,31.7,47.9z" />
                    <circle class="st0" cx="20.7" cy="25.3" r="3.5" />
                    <circle class="st0" cx="41.4" cy="25.3" r="3.5" />
                </svg>

                <p>
                    <span class="text-green-500 font-bold">Happydia Filter is ON</span>
                </p>`;
    const happydia_off_content = `
        <svg class="h-6 w-6 text-gray-600 fill-current mr-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 62.4 62.4"
    style="enable-background:new 0 0 62.4 62.4;" xml:space="preserve">
    <style type="text/css">
        .st0 {
            fill: red;
        }
    </style>
    <path class="st0" d="M31.2,61.5c-16.7,0-30.3-13.6-30.3-30.3c0-16.7,13.6-30.3,30.3-30.3c16.7,0,30.3,13.6,30.3,30.3
                	C61.5,47.9,47.9,61.5,31.2,61.5z M31.2,4.8C16.7,4.8,4.8,16.7,4.8,31.2c0,14.5,11.8,26.3,26.3,26.3c14.5,0,26.3-11.8,26.3-26.3
                	C57.5,16.7,45.7,4.8,31.2,4.8z" />
    <path class="st0" d="M22.1,46.7l-0.3-0.1c-1.1-0.2-1.9-1.3-1.5-2.4c1.3-3.6,4.7-8.4,11.8-9l0.4,0c3.4-0.3,6.4,0.5,9,2.2
                	c0.9,0.7,1.1,2,0.3,2.8l-0.2,0.2c-0.6,0.7-1.7,0.7-2.4,0.2c-1.8-1.2-3.8-1.7-6.3-1.5l-0.4,0c-5.5,0.5-7.6,4.2-8.4,6.4
                	C23.8,46.4,22.9,46.9,22.1,46.7z" />
    <circle class="st0" cx="20.7" cy="25.3" r="3.5" />
    <circle class="st0" cx="41.4" cy="25.3" r="3.5" />
</svg>

                <p>
                    <span class="text-red-500 font-bold">Happydia Filter is OFF</span>
                </p>
        `;
    const status_elm = document.querySelector('#status');

    let status = true;

    status = result.status;
    console.log(status)

    if (status) {
        console.log("Status: ", status)
        changeIcon('on48.png')
        status_elm.innerHTML = happydia_on_content;
        document.querySelector('#toogleA').checked = true;


    } else {
        console.log("Status: ", status)
        changeIcon('off48.png')
        status_elm.innerHTML = happydia_off_content;
        document.querySelector('#toogleA').checked = false;

    }

    function saveData(status) {
        chrome.storage.local.set({
            'status': status
        }, function () {});
    }

    function changeIcon(icon) {

        let iconElem = document.querySelector("#logo");
        iconElem.src = "icons/" + icon;
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, ([tab]) => {
            chrome.browserAction.setIcon({
                path: 'icons/' + icon
            });
        });
    }


    document.querySelector("input").addEventListener('click', () => {
        changeIcon("on48.png");
        if (document.querySelector('#toogleA').checked) {
            status_elm.innerHTML = happydia_on_content;

           
            saveData(true);

        } else {
            changeIcon("off48.png");

            
            status_elm.innerHTML = happydia_off_content;
            saveData(false);
        }
    });
});


// Open Help page
document.querySelector("#helpBtn").addEventListener("click", () => {

    chrome.tabs.create({
        url: chrome.runtime.getURL("help.html")
    });

})
// Open Github repository
document.querySelector("#githubBtn").addEventListener("click", () => {

    chrome.tabs.create({
        url: "https://github.com/Ademking/happydia"
    });

})
// Open Donation Page
document.querySelector("#donateBtn").addEventListener("click", () => {

    chrome.tabs.create({
        url: "https://paypal.me/AdemKouki"
    });

})
// Open Donation Page
document.querySelector("#aboutBtn").addEventListener("click", () => {

    chrome.tabs.create({
        url: "https://about.me/Ademkouki"
    });

})
// Reset Total Counter
document.querySelector("#resetBtn").addEventListener("click", () => {

   document.getElementById("totalfb").innerHTML = '0'
   document.getElementById("totaltwitter").innerHTML = '0'
   document.getElementById("totalyoutube").innerHTML = '0'

   chrome.storage.local.set({
          
          'totalfb': 0,
          'totaltwitter': 0,
          'totalyoutube': 0,

   }, () => {});

})
