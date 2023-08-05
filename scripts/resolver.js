function waitForElementToDisplay(
  selector,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    } else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greetings === "from bg") {
    addEventListener("load", (event) => {
      alert("asda");
    });
  }

  return true;
});
