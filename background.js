const resolverUrl =
  "https://wwwperf.brandeuauthorlb.ford.com/cf#/etc/guxacc/tools/resource-resolver-tool.html";

// chrome.runtime.onMessage.addListener(function (request, sendResponse) {
//   if (request.greeting === "inject") {
//     sendResponse("asd");
//   }

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "resolve") {
    if (request.domain === "co.uk") {
      url =
        "https://wwwperf.brandeuauthorlb.ford.com/bin/guxacc/tools/customslingresresolver?page-path=";
      url =
        url + `/content/guxeu-beta/uk/${request.folder}/home` + request.value;

      fetch(url)
        .then((response) => response.text())
        .then((response) => {
          console.log(response);
          var u = response.split('":"').pop().split('"')[0] + `.html`;
          console.log(u);
          sendResponse({ farewell: u });
        })
        .catch();
      return true;
    } else {
      url =
        "https://wwwperf.brandeuauthorlb.ford.com/bin/guxacc/tools/customslingresresolver?page-path=";
      url =
        url +
        `/content/guxeu-beta/${request.domain}/${request.folder}/home` +
        request.value;

      fetch(url)
        .then((response) => response.text())
        .then((response) => {
          var u = response.split('":"').pop().split('"')[0];
          sendResponse({ farewell: u + ".html" });
        })
        .catch();
      return true;
    }
  } else if (request.greeting === "inject") {
    chrome.scripting
      .executeScript({
        target: { tabId: request.value, allFrames: true },
        files: ["scripts/content.js"],
      })
      .then(() => {
        chrome.tabs.sendMessage(request.value, request).then((res) => {
          sendResponse(res);
        });
      });
  } else if (request.greeting === "inject2") {
    chrome.scripting
      .executeScript({
        target: { tabId: request.value },
        files: ["scripts/content.js"],
      })
      .then(() => {
        chrome.tabs.sendMessage(request.value, request).then((res) => {
          sendResponse(res);
        });
      });
  }

  return true;
});
