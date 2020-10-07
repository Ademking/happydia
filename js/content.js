/**
 * Happydia - v1.0.0
 * Happy Social Media
 * Works on Facebook - Twitter - Youtube
 * 
 * Created By: Adem Kouki
 * 02/10/2020
 * Github Repository: https:/:github.com/Ademking/happydia
 */

var urls = [
    chrome.runtime.getURL("data/arabic.json"),
    chrome.runtime.getURL("data/french.json"),
    chrome.runtime.getURL("data/english.json"),
]

var totalfb = 0;
var totaltwitter = 0;
var totalyoutube = 0;


chrome.storage.local.get({
    'status': true,
    'totalfb': 0,
    'totaltwitter': 0,
    'totalyoutube': 0,
}, function (result) {
     totalfb = result.totalfb;
     totaltwitter = result.totaltwitter;
     totalyoutube = result.totalyoutube;




    if (result.status) {
        console.log("Happydia is ON...");
        //changeIcon("on48.png");
        happydia();
    } else {
        //changeIcon("off48.png");
        console.log("Happydia is OFF...");
    }
});

function changeIcon(icon) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, ([tab]) => {
        chrome.browserAction.setIcon({
            path: 'icons/' + icon
        });
    });
}

function happydia() {

    Promise.all(
        urls.map(
            u => fetch(u)
        )).then(responses =>
        Promise.all(
            responses.map(
                res => res.json()
            )
        )
    ).then(texts => {

        const bannedWords = texts.flat() // list of banned words
        const currentUrl = location.href; // current tab url
        const incrementTotal = (type) => { // increment total
            switch (type) {
                case "facebook":
                    totalfb++;
                    chrome.storage.local.set({
                        totalfb: totalfb
                    }, () => {});
                    break;

                case "twitter":
                    totaltwitter++;
                    chrome.storage.local.set({
                        totaltwitter: totaltwitter
                    }, () => {});
                    break;

                case "youtube":
                    totalyoutube++;
                    chrome.storage.local.set({
                        totalyoutube: totalyoutube
                    }, () => {});
                break;
            
                default:
                    break;
            }
        }
        // Test if facebook url is valid
        const validFBurl = (enteredURL) => {
            var url = /^(http|https)\:\/\/www.facebook.com\/.*/i;
            if (!enteredURL.match(url)) {
                return false
            } else {
                return true
            }
        }

        // Test if twitter url is valid
        const validTwitterurl = (enteredURL) => {
            var url = /^(http|https)\:\/\/(www.|)twitter.com\/.*/i;
            if (!enteredURL.match(url)) {
                return false
            } else {
                return true
            }

        }

        // Test if youtube url is valid
        const validYoutubeurl = (enteredURL) => {
            var url = /^(http|https)\:\/\/www.youtube.com\/.*/i;
            if (!enteredURL.match(url)) {
                return false
            } else {
                return true
            }
        }

        // filter facebook posts
        const filterFB = () => {
            document.body.querySelectorAll('div[role="article"]').forEach(post => {
                try {
                    let postText = post.innerText.toLowerCase().trim();

                    bannedWords.forEach(word => {
                        if (postText.includes(word)) {
                            incrementTotal("facebook");
                            console.log(`Removed post with word : ${word}`)
                            post.parentNode.removeChild(post);
                            return;
                        }
                    });
                } catch (error) {
                    console.log("Error while removing");
                }
            })
        }

        // filter twitter posts
        const filterTwitter = () => {
            document.body.querySelectorAll('article').forEach(post => {
                try {
                    let postText = post.innerText.toLowerCase().trim();
                    bannedWords.forEach(word => {
                        if (postText.includes(word)) {
                            incrementTotal("twitter");
                            console.log(`Removed post with word : ${word}`)
                            post.parentNode.parentNode.remove()
                            return;
                        }
                    });
                } catch (error) {
                    console.log("Error while removing");
                }

            })
        }

        // filter youtube videos
        const filterYoutube = () => {
            // Remove Youtube videos
            document.body.querySelectorAll('ytd-rich-item-renderer').forEach(post => {
                try {
                    let postText = post.innerText.toLowerCase().trim();

                    bannedWords.forEach(word => {
                        if (postText.includes(word)) {
                            incrementTotal("youtube");
                            console.log(`Removed video with word : ${word}`)
                            post.parentNode.removeChild(post);
                            return;
                        }
                    });
                } catch (error) {
                    console.log("Error while removing");
                }
            });

            // Remove Youtube comments
            document.body.querySelectorAll('ytd-comment-thread-renderer').forEach(post => {
                try {
                    let postText = post.innerText.toLowerCase().trim();

                    bannedWords.forEach(word => {
                        if (postText.includes(word)) {
                            incrementTotal("youtube");
                            console.log(`Removed video with word : ${word}`)
                            post.parentNode.removeChild(post);
                            return;
                        }
                    });
                } catch (error) {
                    console.log("Error while removing");
                }
            });

        }

        if (validFBurl(currentUrl)) { // if url is Facebook
            filterFB()
            document.addEventListener('scroll', e => {
                filterFB()
            }, true);
        }
        if (validTwitterurl(currentUrl)) { // if url is twitter
            filterTwitter()
            document.addEventListener('scroll', e => {
                filterTwitter()
            }, true);

        }
        if (validYoutubeurl(currentUrl)) { // if url is youtube
            filterYoutube()
            document.addEventListener('scroll', e => {
                filterYoutube()
            }, true);
        }

    })
}
