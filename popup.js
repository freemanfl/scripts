function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

// Attach the onclick function to the button
document.addEventListener("DOMContentLoaded", function () {
  var copyButton = document.getElementById("copy");
  var copyContentButton = document.getElementById("copyContent");
  var copyDiv = document.getElementById("destination");

  copyButton.addEventListener("click", function () {
    var textToCopy = copyDiv.innerText;
    copyToClipboard(textToCopy);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied successfully!";

    copyButton.addEventListener("mouseout", function () {
      tooltip.innerHTML = "Copy to clipboard";
    });
  });
  copyContentButton.addEventListener("click", function () {
    if (copyDiv.innerText.includes("/content")) {
      var textToCopy = "/content" + copyDiv.innerText.split("/content")[1];

      copyToClipboard(textToCopy);

      var tooltip = document.getElementById("myTooltip2");
      tooltip.innerHTML = "Copied successfully!";

      copyContentButton.addEventListener("mouseout", function () {
        tooltip.innerHTML = "Copy to clipboard";
      });
    }
  });
});

var envCount = 0;
const markets = [
  { full: "Ford of Austria", domain: "at", folder: ["de_at"], beta: true },
  {
    full: "Ford of Belgium",
    domain: "be",
    folder: ["fr_be", "nl_be"],
    beta: false,
  },
  { full: "Ford of Britain", domain: "co.uk", folder: ["en_gb"], beta: true },
  {
    full: "Ford of Czech Republic",
    domain: "cz",
    folder: ["cs_cz"],
    beta: false,
  },
  { full: "Ford of Denmark", domain: "dk", folder: ["da_dk"], beta: true },
  { full: "Ford of Finland", domain: "fi", folder: ["fi_fi"], beta: false },
  { full: "Ford of France", domain: "fr", folder: ["fr_fr"], beta: true },
  { full: "Ford of Germany", domain: "de", folder: ["de_de"], beta: true },
  { full: "Ford of Greece", domain: "gr", folder: ["el_gr"], beta: false },
  { full: "Ford of Hungary", domain: "hu", folder: ["hu_hu"] },
  { full: "Ford of Ireland", domain: "ie", folder: ["en_ie"], beta: false },
  { full: "Ford of Italy", domain: "it", folder: ["it_it"], beta: true },
  { full: "Ford of Luxembourg", domain: "lu", folder: ["fr_lu"], beta: false },
  { full: "Ford of Netherlands", domain: "nl", folder: ["nl_nl"], beta: true },
  { full: "Ford of Norway", domain: "no", folder: ["no_no"], beta: true },
  { full: "Ford of Poland", domain: "pl", folder: ["pl_pl"], beta: true },
  { full: "Ford of Portugal", domain: "pt", folder: ["pt_pt"], beta: true },
  { full: "Ford of Romania", domain: "ro", folder: ["ro_ro"], beta: false },
  { full: "Ford of Spain", domain: "es", folder: ["es_es"], beta: true },
  { full: "Ford of Sweden", domain: "se" },
  {
    full: "Ford of Switzerland",
    domain: "ch",
    folder: ["de_ch", "fr_ch", "it_ch"],
    beta: false,
  },
];

let currentEnv = {
  url: "",
  domain: "",
  folder: "",
  ford: false,
  beta: true,
  editor: false,
  touch: false,
  longPerf: false,
  perf: false,
  prod: false,
  live: false,
  siteWide: false,
};

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
  links[i].target = "_self";
}
///////////////////////////////////////////////////////////////////////////////////////////////
async function sendGreetings() {
  var touchB = document.getElementById("touch").getElementsByTagName("a")[0];
  var loader = document.getElementById("touchLoader");

  touchB.style = "display: none";
  loader.style = "display: block";
  const response = await chrome.runtime.sendMessage({
    greeting: "resolve",
    value: currentEnv.url.split(`ford.${currentEnv.domain}`)[1],
    domain: currentEnv.domain,
    folder: currentEnv.folder,
  });

  // do something with response here, not outside the function

  touchB.href =
    "https://wwwperf.brandeuauthorlb.ford.com/editor.html" + response.farewell;

  touchB.style = "display: block";
  loader.style = "display: none";

  touchB.addEventListener("mouseover", () => {
    document.getElementById("destination").innerText = touchB.href;
  });

  touchB.addEventListener("click", () => {
    chrome.tabs.update({ url: touchB.href });
    window.close();
  });
}

async function sendGreetingsFromPerf() {
  var touchB = document.getElementById("touch").getElementsByTagName("a")[0];
  var loader = document.getElementById("touchLoader");

  touchB.style = "display: none";
  loader.style = "display: block";

  const response = await chrome.runtime.sendMessage({
    greeting: "resolve",
    value: currentEnv.url.split(`ford.com`)[1],
    domain: currentEnv.domain,
    folder: currentEnv.folder,
  });

  // do something with response here, not outside the function

  touchB.href =
    "https://wwwperf.brandeuauthorlb.ford.com/editor.html" + response.farewell;

  touchB.style = "display: block";
  loader.style = "display: none";

  touchB.addEventListener("mouseover", () => {
    document.getElementById("destination").innerText = touchB.href;
  });

  touchB.addEventListener("click", () => {
    chrome.tabs.update({ url: touchB.href });
    window.close();
  });
}

async function sendGreetingsFromTouch(id) {
  const response = await chrome.runtime.sendMessage({
    greeting: "inject",
    value: id,
    domain: currentEnv.domain,
    folder: currentEnv.folder,
  });

  // do something with response here, not outside the function

  var liveB = document.getElementById("live").getElementsByTagName("a")[0];

  liveB.href =
    currentEnv.url.split("perf")[0] + `.ford.${currentEnv.domain}` + response;

  liveB.addEventListener("click", () => {
    chrome.tabs.update({ url: liveB.href });
    window.close();
  });

  liveB.addEventListener("mouseover", () => {
    document.getElementById("destination").innerText = liveB.href;
  });
}

async function sendGreetingsFromTouchToPerf(id) {
  const response = await chrome.runtime.sendMessage({
    greeting: "inject",
    value: id,
    domain: currentEnv.domain,
    folder: currentEnv.folder,
  });

  // do something with response here, not outside the function

  var perfB = document.getElementById("perf").getElementsByTagName("a")[0];

  if (currentEnv.domain == "co.uk") {
    perfB.href =
      currentEnv.url.split("perf")[0] +
      `perf-beta-couk.brandeulb.ford.com` +
      response;

    perfB.addEventListener("click", () => {
      chrome.tabs.update({ url: perfB.href });
      window.close();
    });

    perfB.addEventListener("mouseover", () => {
      document.getElementById("destination").innerText = perfB.href;
    });
  } else {
    perfB.href =
      currentEnv.url.split("perf")[0] +
      `perf-beta-${currentEnv.domain}.brandeulb.ford.com` +
      response;

    perfB.addEventListener("click", () => {
      chrome.tabs.update({ url: perfB.href });
      window.close();
    });

    perfB.addEventListener("mouseover", () => {
      document.getElementById("destination").innerText = perfB.href;
    });
  }
}
function isEuLive(url) {
  if (url.includes("ford.") && url.includes(".com") == false) {
    envCount++;
    return true;
  }
}

function isPerf(url) {
  if (url.includes("perf") && url.includes("brandeuauthor") == false) {
    envCount++;
    return true;
  }
}

function isAuthor(url) {
  if (
    url.includes("editor.html") &&
    url.includes("perf") &&
    url.includes("/content/")
  ) {
    envCount++;
    return true;
  }
}

function isTouch(url) {
  if (
    (url.includes("/editor.html/") ||
      (url.includes("guxeu") && url.includes("brandeuauthor"))) &&
    url.includes("perf") &&
    url.includes("/content/")
  ) {
    envCount++;
    return true;
  }
}

function isSiteWide(url) {
  if (
    (isEuLive(url) && url.includes("/content/")) ||
    (isPerf(url) && url.includes("/content/")) ||
    (isAuthor(url) && url.includes("site-wide-content")) ||
    (isTouch(url) && url.includes("site-wide-content"))
  ) {
    return true;
  }
}

function isDam(url) {
  if (url.includes("/dam/")) {
    return true;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function livePerf(url) {
  var perfB = document.getElementById("perf").getElementsByTagName("a")[0];

  if (currentEnv.beta) {
    if (currentEnv.dam) {
      if (currentEnv.domain == "co.uk") {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-beta-couk.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "co.uk") {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-beta-couk.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else {
      if (currentEnv.domain == "co.uk") {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-beta-couk.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    }
  } else {
    if (currentEnv.dam) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        perfB.href = url.replace(
          `.${currentEnv.sub}.ford.${currentEnv.domain}`,
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        var perfB = document
          .getElementById("perf")
          .getElementsByTagName("a")[0];

        perfB.href = url.replace(
          `.${currentEnv.sub}.ford.${currentEnv.domain}`,
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`
        );

        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        perfB.href = url.replace(
          `.${currentEnv.sub}.ford.${currentEnv.domain}`,
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    }
  }
}

function liveTouch(url) {
  if (currentEnv.beta) {
    if (currentEnv.dam) {
      if (currentEnv.domain == "co.uk") {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];
        touchB.href = url.replace(
          `.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];
        touchB.href = url.replace(
          `.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "co.uk") {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];
        touchB.href = url.replace(
          `.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/uk/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";
        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];
        touchB.href = url.replace(
          `.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";
        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else {
      if (currentEnv.domain == "co.uk") {
        sendGreetings();
      } else {
        sendGreetings();
      }
    }
  } else {
    if (currentEnv.dam) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];

        touchB.href = url.replace(
          `.${currentEnv.sub}.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];

        touchB.href = url.replace(
          `.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];

        touchB.href = url.replace(
          `.${currentEnv.sub}.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";
        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];

        touchB.href = url.replace(
          `.ford.${currentEnv.domain}/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";
        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];

        touchB.href = url.replace(
          `.${currentEnv.sub}.ford.${currentEnv.domain}`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`
        );
        touchB.href = touchB.href + ".html";
        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        var touchB = document
          .getElementById("touch")
          .getElementsByTagName("a")[0];

        touchB.href = url.replace(
          `.ford.${currentEnv.domain}`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`
        );
        touchB.href = touchB.href + ".html";
        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function perfLive(url) {
  var liveB = document.getElementById("live").getElementsByTagName("a")[0];

  if (currentEnv.beta) {
    if (currentEnv.dam) {
      if (currentEnv.domain == "co.uk") {
        liveB.href = url.replace(
          `perf-beta-couk.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "co.uk") {
        liveB.href = url.replace(
          `perf-beta-couk.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else {
      if (currentEnv.domain == "co.uk") {
        liveB.href = url.replace(
          `perf-beta-couk.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    }
  } else {
    if (currentEnv.dam) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        liveB.href = url.replace(
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`,
          `.${currentEnv.sub}.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf-${currentEnv.domain}.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        liveB.href = url.replace(
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`,
          `.${currentEnv.sub}.ford.${currentEnv.domain}`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf-${currentEnv.domain}.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        liveB.href = url.replace(
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`,
          `.${currentEnv.sub}.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf-${currentEnv.domain}.brandeulb.ford.com`,
          `.ford.${currentEnv.domain}`
        );
        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    }
  }
}

function perfTouch(url) {
  var touchB = document.getElementById("touch").getElementsByTagName("a")[0];

  if (currentEnv.beta) {
    if (currentEnv.dam) {
      if (currentEnv.domain == "co.uk") {
        touchB.href = url.replace(
          `perf-beta-couk.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        touchB.href = url.replace(
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "co.uk") {
        touchB.href = url.replace(
          `perf-beta-couk.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/uk/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        touchB.href = url.replace(
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else {
      if (currentEnv.domain == "co.uk") {
        sendGreetingsFromPerf();
      } else {
        sendGreetingsFromPerf();
      }
    }
  } else {
    if (currentEnv.dam) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        touchB.href = url.replace(
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        touchB.href = url.replace(
          `perf-${currentEnv.domain}.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/damadmin#/content`
        );

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        touchB.href = url.replace(
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`
        );
        touchB.href = touchB.href + ".html";

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        touchB.href = url.replace(
          `perf-${currentEnv.domain}.brandeulb.ford.com/content`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`
        );

        touchB.href = touchB.href + ".html";

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    } else {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        touchB.href = url.replace(
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`
        );
        touchB.href = touchB.href + ".html";

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      } else {
        touchB.href = url.replace(
          `perf-${currentEnv.domain}.brandeulb.ford.com`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`
        );
        touchB.href = touchB.href + ".html";

        touchB.addEventListener("click", () => {
          chrome.tabs.update({ url: touchB.href });
          window.close();
        });
        touchB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = touchB.href;
        });
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function touchLive(url, id) {
  var liveB = document.getElementById("live").getElementsByTagName("a")[0];

  if (currentEnv.beta) {
    if (currentEnv.dam) {
      liveB.href = url.replace(
        `perf.brandeuauthorlb.ford.com/damadmin#/content/`,
        `.ford.${currentEnv.domain}/content/`
      );

      liveB.addEventListener("click", () => {
        chrome.tabs.update({ url: liveB.href });
        window.close();
      });
      liveB.addEventListener("mouseover", () => {
        document.getElementById("destination").innerText = liveB.href;
      });
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "co.uk") {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/uk/${currentEnv.folder}/site-wide-content`,
          `.ford.co.uk/content`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`,
          `.ford.${currentEnv.domain}/content`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });

        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else {
      if (currentEnv.domain == "co.uk") {
        sendGreetingsFromTouch(id);
      } else {
        sendGreetingsFromTouch(id);
      }
    }
  } else {
    if (currentEnv.dam) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/damadmin#/content`,
          `.${currentEnv.sub}.ford.${currentEnv.domain}/content`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/damadmin#/content`,
          `.ford.${currentEnv.domain}/content`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`,
          `.${currentEnv.sub}.ford.${currentEnv.domain}/content`
        );
        liveB.href = liveB.href + ".html";

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`,
          `.ford.${currentEnv.domain}/content`
        );

        liveB.href = liveB.href + ".html";

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    } else {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`,
          `.${currentEnv.sub}.ford.${currentEnv.domain}`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      } else {
        liveB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`,
          `.ford.${currentEnv.domain}`
        );

        liveB.addEventListener("click", () => {
          chrome.tabs.update({ url: liveB.href });
          window.close();
        });
        liveB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = liveB.href;
        });
      }
    }
  }
}
function touchPerf(url, id) {
  var perfB = document.getElementById("perf").getElementsByTagName("a")[0];

  if (currentEnv.beta) {
    if (currentEnv.dam) {
      if (currentEnv.domain == "co.uk") {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/damadmin#/content/`,
          `perf-beta-couk.brandeulb.ford.com/content/`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/damadmin#/content/`,
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com/content/`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "co.uk") {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/uk/en_gb/site-wide-content`,
          `perf-beta-couk.brandeulb.ford.com/content`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`,
          `perf-beta-${currentEnv.domain}.brandeulb.ford.com/content`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else {
      sendGreetingsFromTouchToPerf(id);
    }
  } else {
    if (currentEnv.dam) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/damadmin#/content`,
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com/content`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/damadmin#/content`,
          `perf-${currentEnv.domain}.brandeulb.ford.com/content`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else if (currentEnv.siteWide) {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`,
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com/content`
        );

        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/site-wide-content`,
          `perf-${currentEnv.domain}.brandeulb.ford.com/content`
        );

        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });

        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    } else {
      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`,
          `perf-${currentEnv.domain}${currentEnv.sub}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      } else {
        perfB.href = url.replace(
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentEnv.domain}/${currentEnv.folder}/home`,
          `perf-${currentEnv.domain}.brandeulb.ford.com`
        );
        perfB.addEventListener("click", () => {
          chrome.tabs.update({ url: perfB.href });
          window.close();
        });
        perfB.addEventListener("mouseover", () => {
          document.getElementById("destination").innerText = perfB.href;
        });
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currTab = tabs[0];
  if (currTab) {
    currentEnv.url = currTab.url;

    if (isEuLive(currentEnv.url)) {
      document
        .getElementById("live")
        .getElementsByTagName("a")[0]
        .classList.add("active");
      currentEnv.live = true;
      currentEnv.domain = currentEnv.url.split(".ford.").pop().split("/")[0];

      // Set beta status
      markets.forEach((market) => {
        if (market.domain == currentEnv.domain) {
          currentEnv.beta = market.beta;
        }
      });

      // Handle Switzerland and set subdomain and folder
      if (currentEnv.domain == "ch") {
        currentEnv.sub = currentEnv.url.split("www.").pop().split(".")[0];
        currentEnv.folder = markets.find((obj) => {
          if (obj.domain === currentEnv.domain) {
            return obj.folder;
          }
        }).folder;
        currentEnv.folder.forEach((i) => {
          if (i.includes(`${currentEnv.sub}`)) {
            currentEnv.folder = i;
          }
        });
      }
      // Same for belgium
      else if (currentEnv.domain == "be") {
        currentEnv.sub = currentEnv.url.split("www.").pop().split(".")[0];
        currentEnv.folder = markets.find((obj) => {
          if (obj.domain === currentEnv.domain) {
            return obj.folder;
          }
        }).folder;
        currentEnv.folder.forEach((i) => {
          if (i.includes(`${currentEnv.sub}`)) {
            currentEnv.folder = i;
          }
        });
      }
      // All other markets
      else {
        currentEnv.folder = markets.find((obj) => {
          return obj.domain === currentEnv.domain;
        }).folder;
      }

      if (isSiteWide(currentEnv.url)) {
        currentEnv.siteWide = true;
      }

      if (isDam(currentEnv.url)) {
        currentEnv.dam = true;
      }
      livePerf(currentEnv.url);
      liveTouch(currentEnv.url);
    }

    if (isPerf(currentEnv.url)) {
      document
        .getElementById("perf")
        .getElementsByTagName("a")[0]
        .classList.add("active");
      currentEnv.perf = true;
      currentEnv.domain = currentEnv.url.split("perf-").pop().split(".")[0];

      if (currentEnv.domain.includes("beta")) {
        currentEnv.domain = currentEnv.domain.split("beta-")[1];
      }

      if (currentEnv.domain == "couk") {
        currentEnv.domain = "co.uk";
      }

      if (currentEnv.domain.includes("be")) {
        currentEnv.sub = currentEnv.domain.split("be")[1];
        currentEnv.domain = "be";
      }

      if (currentEnv.domain.includes("ch")) {
        currentEnv.sub = currentEnv.domain.split("ch")[1];
        currentEnv.domain = "ch";
      }

      // Set beta status
      markets.forEach((market) => {
        if (market.domain == currentEnv.domain) {
          currentEnv.beta = market.beta;
        }
      });

      if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
        currentEnv.folder = markets.find((obj) => {
          if (obj.domain === currentEnv.domain) {
            return obj.folder;
          }
        }).folder;
        currentEnv.folder.forEach((i) => {
          if (i.includes(`${currentEnv.sub}`)) {
            currentEnv.folder = i;
          }
        });
      }

      // All other markets
      else {
        currentEnv.folder = markets.find((obj) => {
          return obj.domain === currentEnv.domain;
        }).folder;
      }

      if (isSiteWide(currentEnv.url)) {
        currentEnv.siteWide = true;
      }

      if (isDam(currentEnv.url)) {
        currentEnv.dam = true;
      }

      perfLive(currentEnv.url);
      perfTouch(currentEnv.url);
      for (var i = 0; i < links.length; i++) {
        if (!links[i].classList.contains("active")) {
          links[i].classList.add("toHover");
        }
      }
    }

    if (isTouch(currentEnv.url)) {
      document
        .getElementById("touch")
        .getElementsByTagName("a")[0]
        .classList.add("active");
      currentEnv.touch = true;

      if (isDam(currentEnv.url)) {
        currentEnv.dam = true;
        currentEnv.domain = currentEnv.url
          .split("/dam/guxeu/")
          .pop()
          .split("/")[0];

        if (currentEnv.domain == "ch") {
          currentEnv.sub = currentEnv.url
            .split("/dam/guxeu/ch/")
            .pop()
            .split("_ch")[0];
        }

        if (currentEnv.domain == "be") {
          currentEnv.sub = currentEnv.url
            .split("/dam/guxeu/be/")
            .pop()
            .split("_be")[0];
        }

        if (currentEnv.domain == "uk") {
          currentEnv.domain = "co.uk";
        }

        markets.forEach((market) => {
          if (market.domain == currentEnv.domain) {
            currentEnv.beta = market.beta;
          }
        });

        if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
          currentEnv.folder = markets.find((obj) => {
            if (obj.domain === currentEnv.domain) {
              return obj.folder;
            }
          }).folder;
          currentEnv.folder.forEach((i) => {
            if (i.includes(`${currentEnv.sub}`)) {
              currentEnv.folder = i;
            }
          });
        } else {
          currentEnv.folder = markets.find((obj) => {
            return obj.domain === currentEnv.domain;
          }).folder;
        }
      } else {
        if (currentEnv.url.includes("guxeu-beta")) {
          currentEnv.beta = true;
          currentEnv.domain = currentEnv.url
            .split("/guxeu-beta/")
            .pop()
            .split("/")[0];

          if (currentEnv.domain == "uk") {
            currentEnv.domain = "co.uk";
          }

          markets.forEach((market) => {
            if (market.domain == currentEnv.domain) {
              currentEnv.beta = market.beta;
            }
          });

          currentEnv.folder = markets.find((obj) => {
            if (obj.domain === currentEnv.domain) {
              return obj.folder;
            }
          }).folder;
        } else {
          currentEnv.beta = false;
          currentEnv.domain = currentEnv.url
            .split("/guxeu/")
            .pop()
            .split("/")[0];

          if (currentEnv.domain == "ch" || currentEnv.domain == "be") {
            currentEnv.sub = currentEnv.url
              .split(`/guxeu/${currentEnv.domain}/`)
              .pop()
              .split("_")[0];

            currentEnv.folder = markets.find((obj) => {
              if (obj.domain === currentEnv.domain) {
                return obj.folder;
              }
            }).folder;
            currentEnv.folder.forEach((i) => {
              if (i.includes(`${currentEnv.sub}`)) {
                currentEnv.folder = i;
              }
            });
          } else {
            currentEnv.folder = markets.find((obj) => {
              if (obj.domain === currentEnv.domain) {
                return obj.folder;
              }
            }).folder;
          }
        }
      }

      if (isSiteWide(currentEnv.url)) {
        currentEnv.siteWide = true;
      }

      touchLive(currentEnv.url, currTab.id);
      touchPerf(currentEnv.url, currTab.id);
    }
  }
});

// sendGreetings();
