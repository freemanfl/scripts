chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "inject") {
    if (document.querySelector("#ContentFrame")) {
      var iframe = document.getElementById("ContentFrame");
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      var target = innerDoc.getElementById("accelerator-page");

      var url = target
        .querySelector(".info-banner")
        .children[0].innerText.split("... ")
        .pop()
        .split("Av")[0];

      url = url.split("/home")[1];

      sendResponse(url);
    }
  } else if (request.greeting === "inject2") {
    var target = document
      .querySelector("#cq-cf-framewrapper")
      .querySelector("#cq-cf-frame");
    target = target.contentWindow.document.body;

    var url = target
      .querySelector(".info-banner")
      .children[0].innerText.split("... ")
      .pop()
      .split("Av")[0];

    url = url.split("/home")[1];

    sendResponse(url);
  } else {
    console.log("error sending response");
  }

  return true;
});
