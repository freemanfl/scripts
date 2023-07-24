const resolverUrl =
  "https://wwwperf.brandeuauthorlb.ford.com/cf#/etc/guxacc/tools/resource-resolver-tool.html";

(async () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );
    sendResponse("asda");
    // if (request.greeting === "hello") {
    //   chrome.tabs.create({ url: resolverUrl, active: false }, function (tab) {
    //     chrome.scripting
    //       .executeScript({
    //         target: { tabId: tab.id, allFrames: true },
    //         files: ["scripts/resolver.js"],
    //       })
    //       .then(() => {
    //         chrome.tabs.sendMessage(tab.id, request).then((res) => {
    //           console.log(res);
    //           sendResponse(res);
    //         });
    //       });
    //   });
    // }
    return true;
  });
})();
