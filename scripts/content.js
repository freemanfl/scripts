chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("received");
  console.log(document.getElementById("ContentFrame"));

  if (document.getElementById("ContentFrame")) {
    var iframe = document.getElementById("ContentFrame");
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var target = innerDoc.getElementById("accelerator-page");
    console.log(target.querySelector(".info-banner"));
    console.log(
      target
        .querySelector(".info-banner")
        .children[0].innerText.split("... ")
        .pop()
        .split("Av")[0]
    );

    var url = target
      .querySelector(".info-banner")
      .children[0].innerText.split("... ")
      .pop()
      .split("Av")[0];

    url = url.split("/home")[1];
    console.log(url);
    sendResponse(url);
  }

  return true;
});
