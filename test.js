const resolverUrl =
  "https://wwwperf.brandeuauthorlb.ford.com/cf#/etc/guxacc/tools/resource-resolver-tool.html";

(async () => {
  chrome.runtime.onMessage.addListener(function (request, sendResponse) {
    if (request.greeting === "hello") {
      console.log("greetings received");
      var queriedTabs = [];
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let activeIndex;
        for (const tab of tabs) {
          // set the activeIndex so we wont have to run a loop on the tabs twice
          if (tab.active) {
            activeIndex = tab.index;
          }

          // tabs to the right of the active tab will have higher index
          if (typeof activeIndex !== "undefined" && tab.index > activeIndex) {
            // tabs is on the right of the active tab ... do whatever needed
            if (tab.url.includes("/content")) {
              queriedTabs.push(tab);
            }
          }
        }
        console.log(queriedTabs);

        chrome.tabs.create({ url: resolverUrl, active: false }, function (tab) {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id, allFrames: true },
              files: ["scripts/resolver.js"],
            })
            .then(() => {
              chrome.tabs.sendMessage(tab.id, queriedTabs).then((res) => {
                console.log(res);
                sendResponse(res);
              });
            });
        });
      });
    }
    return true;
  });
})();
