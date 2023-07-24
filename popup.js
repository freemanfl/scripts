// 1. initial setup

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

let currentUrl = {
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
  urlLocalized: false,
};
///////////////////////////////////////////////////////////////////////////////////////////////
function isEuLive(url) {
  if (url.includes("ford.") && url.includes(".com") == false) {
    return true;
  }
}

function isPerf(url) {
  if (url.includes("perf") && url.includes("/content/") == false) {
    return true;
  }
}

function isAuthor(url) {
  if (
    url.includes("cf#") &&
    url.includes("perf") &&
    url.includes("/content/")
  ) {
    return true;
  }
}

function isTouch(url) {
  if (
    url.includes("/editor.html/") &&
    url.includes("perf") &&
    url.includes("/content/")
  ) {
    return true;
  }
}

/////////////////////////////////////////////////////////////////////

function livePerf(url) {
  if (currentUrl.live == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "co.uk") {
        console.log(currentUrl.domain);
        var destination = currentUrl.url.replace(
          ".ford.co.uk",
          `perf-beta-couk`
        );
        destination = destination.replace(`-couk`, `-couk.brandeulb.ford.com`);

        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(".ford.", "perf-beta-");
        destination = destination.replace(
          `-${currentUrl.domain}`,
          `-${currentUrl.domain}.brandeulb.ford.com`
        );

        document.getElementById("destination").innerText = destination;
      }
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `.${currentUrl.sub}.ford.${currentUrl.domain}`,
          `perf-ch${currentUrl.sub}.brandeulb.ford.com`
        );

        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `.${currentUrl.sub}.ford.${currentUrl.domain}`,
          `perf-be${currentUrl.sub}.brandeulb.ford.com`
        );

        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.ford.${currentUrl.domain}`,
          `perf-${currentUrl.domain}`
        );
        destination = destination.replace(
          `-${currentUrl.domain}`,
          `-${currentUrl.domain}.brandeulb.ford.com`
        );
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function liveTouch(url) {
  if (currentUrl.live == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "co.uk") {
        var destination = currentUrl.url.replace(
          `.ford.co.uk`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/uk/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
      } else {
        var destination = currentUrl.url.replace(
          `.ford.${currentUrl.domain}`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `.${currentUrl.sub}.ford.ch`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }

        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `.${currentUrl.sub}.ford.be`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }

        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.ford.${currentUrl.domain}`,
          `perf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }

        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function liveClassic(url) {
  if (currentUrl.live == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "co.uk") {
        var destination = currentUrl.url.replace(
          `.ford.co.uk`,
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/uk/${currentUrl.folder}/home`
        );
        if (!destination.includes(".html")) {
          destination += ".html";
        }
      } else {
        var destination = currentUrl.url.replace(
          `.ford.${currentUrl.domain}`,
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        if (!destination.includes(".html")) {
          destination += ".html";
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == `ch`) {
        var destination = currentUrl.url.replace(
          `.${currentUrl.sub}.ford.${currentUrl.domain}`,
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }

        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == `be`) {
        var destination = currentUrl.url.replace(
          `.${currentUrl.sub}.ford.${currentUrl.domain}`,
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }

        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.ford.${currentUrl.domain}`,
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }

        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

////////////////////////////////////////////////////////////////////

function perfLive(url) {
  if (currentUrl.perf == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == `couk`) {
        var destination = currentUrl.url.replace(
          "perf-beta-couk",
          ".ford.co.uk"
        );
        dest = destination.replace(`.brandeulb.ford.com`, ``);
      } else {
        var destination = currentUrl.url.replace("perf-beta-", ".ford.");
        dest = destination.replace(`.brandeulb.ford.com`, ``);
      }

      document.getElementById("destination").innerText = dest;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `perf-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`,
          `.${currentUrl.sub}.ford.${currentUrl.domain}`
        );
        destination = destination.replace(`.brandeulb.ford.com`, ``);
        document.getElementById("destination").innerText = destination;
        //////////////////////////
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `perf-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`,
          `.${currentUrl.sub}.ford.${currentUrl.domain}`
        );
        destination = destination.replace(`.brandeulb.ford.com`, ``);
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace("perf-", ".ford.");
        destination = destination.replace(`.brandeulb.ford.com`, ``);
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function perfTouch(url) {
  if (currentUrl.perf == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "couk") {
        var destination = currentUrl.url.replace(
          `-beta-couk.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/uk/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
      } else {
        var destination = currentUrl.url.replace(
          `-beta-${currentUrl.domain}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `-${currentUrl.domain}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function perfClassic(url) {
  if (currentUrl.perf == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "couk") {
        var destination = currentUrl.url.replace(
          `-beta-couk.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/uk/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
      } else {
        var destination = currentUrl.url.replace(
          `-beta-${currentUrl.domain}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `-${currentUrl.domain}.brandeulb.ford.com`,
          `.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`
        );
        var count = (destination.match(/.html/g) || []).length;
        if (count < 2) {
          destination += ".html";
        }
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

function classicLive(url) {
  if (currentUrl.author == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "uk") {
        var destination = currentUrl.url.replace(
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `.ford.co.uk`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
      } else {
        var destination = currentUrl.url.replace(
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `.ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `.${currentUrl.sub}.ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `.${currentUrl.sub}.ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `perf.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `.ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function classicPerf(url) {
  if (currentUrl.author == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "uk") {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-beta-couk.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-beta-${currentUrl.domain}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }

        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }

        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/cf#/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-${currentUrl.domain}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }

        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function classicTouch(url) {
  if (currentUrl.author == true) {
    var destination = currentUrl.url.replace(`cf#`, `editor.html`);

    document.getElementById("destination").innerText = destination;
  }
}

////////////////////////////////////////////////////////////////////////

function touchLive(url) {
  if (currentUrl.touch == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "uk") {
        var destination = currentUrl.url.replace(
          `https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `https://ford.co.uk`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
      } else {
        var destination = currentUrl.url.replace(
          `https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `https://ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
      }

      document.getElementById("destination").innerText = destination;
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `https://${currentUrl.sub}.ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `https://${currentUrl.sub}.ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `https://ford.${currentUrl.domain}`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function touchPerf(url) {
  if (currentUrl.touch == true) {
    if (currentUrl.beta == true) {
      if (currentUrl.domain == "uk") {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-beta-couk.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-beta-${currentUrl.domain}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      }
    } else {
      if (currentUrl.domain == "ch") {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else if (currentUrl.domain == "be") {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-${currentUrl.domain}${currentUrl.sub}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      } else {
        var destination = currentUrl.url.replace(
          `.brandeuauthorlb.ford.com/editor.html/content/guxeu/${currentUrl.domain}/${currentUrl.folder}/home`,
          `-${currentUrl.domain}.brandeulb.ford.com`
        );
        if ((destination.includes = ".html")) {
          destination.replace(".html", "");
        }
        document.getElementById("destination").innerText = destination;
      }
    }
  }
}

function touchClassic(url) {
  if (currentUrl.touch == true) {
    var destination = currentUrl.url.replace(`editor.html`, `cf#`);

    document.getElementById("destination").innerText = destination;
  }
}

////////////////////////////////////////////////////

async function sendGreetings() {
  const response = await chrome.runtime.sendMessage({ greeting: "hello" });

  // do something with response here, not outside the function
}

// 2. Grab the items needed
const balls = document.getElementsByClassName("ball");

// 2.1 Add listeners and logic for selecting destination

for (let i = 0; i < balls.length; i++) {
  // code to be executed
  balls[i].addEventListener("mouseover", (event) => {
    if (balls[i].classList.contains("ball-active") == false) {
      balls[i].classList.toggle("ball-destination");
    }
  });
  balls[i].addEventListener("mouseout", (event) => {
    if (balls[i].classList.contains("ball-active") == false) {
      balls[i].classList.toggle("ball-destination");
    }
  });
  balls[i].addEventListener("click", (e) => {
    var url = document.getElementById("destination").innerText;

    chrome.tabs.update({ url: url });
    window.close();
  });
}

// 3 Get tab url and find out where we are
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;

  // 3.1

  // 3.2 Find out where we are
  function whereWeAre() {
    currentUrl.url = url;

    // 3.2.1 Check if its a live page and
    if (isEuLive(url)) {
      currentUrl.live = true;
      currentUrl.domain = url.split(".ford.").pop().split("/")[0];

      markets.forEach((market) => {
        if (market.domain == currentUrl.domain) {
          currentUrl.beta = market.beta;
        }
      });

      if (currentUrl.domain == "ch") {
        currentUrl.sub = url.split("www.").pop().split(".")[0];
        currentUrl.folder = markets.find((obj) => {
          if (obj.domain === currentUrl.domain) {
            return obj.folder;
          }
        }).folder;
        currentUrl.folder.forEach((i) => {
          if (i.includes(`${currentUrl.sub}`)) {
            currentUrl.folder = i;
          }
        });
      } else if (currentUrl.domain == "be") {
        currentUrl.sub = url.split("www.").pop().split(".")[0];
        currentUrl.folder = markets.find((obj) => {
          if (obj.domain === currentUrl.domain) {
            return obj.folder;
          }
        }).folder;
        currentUrl.folder.forEach((i) => {
          if (i.includes(`${currentUrl.sub}`)) {
            currentUrl.folder = i;
          }
        });
      } else {
        currentUrl.folder = markets.find((obj) => {
          return obj.domain === currentUrl.domain;
        }).folder;
      }

      document.getElementById("live").classList.add("ball-active");
    }

    // 3.2.1 Check if its a prod page and

    // 3.2.2 Check if its a perf page and
    if (isPerf(url)) {
      currentUrl.perf = true;

      if (currentUrl.url.includes("perf-beta")) {
        currentUrl.beta = true;
        currentUrl.domain = url
          .split("https://wwwperf-beta-")
          .pop()
          .split(".brandeulb")[0];
        if (currentUrl.domain == `couk`) {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === `co.uk`;
          }).folder;
        } else {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;
        }
      } else {
        currentUrl.beta = false;
        currentUrl.domain = url
          .split("https://wwwperf-")
          .pop()
          .split(".brandeulb")[0];

        if (currentUrl.domain.includes("ch")) {
          currentUrl.domain = "ch";
          currentUrl.sub = url.split("-ch").pop().split(".")[0];

          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;

          currentUrl.folder.forEach((i) => {
            if (i.includes(currentUrl.sub)) {
              currentUrl.folder = i;
            }
          });
        } else if (currentUrl.domain.includes("be")) {
          currentUrl.domain = "be";
          currentUrl.sub = url.split("-be").pop().split(".")[0];

          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;

          currentUrl.folder.forEach((i) => {
            if (i.includes(currentUrl.sub)) {
              currentUrl.folder = i;
            }
          });
        } else {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;
        }
      }

      document.getElementById("perf").classList.add("ball-active");
    }
    // 3.2.3 Check if long or short perf and

    // 3.2.4 Check if Author and
    if (isAuthor(url)) {
      currentUrl.author = true;
      if (currentUrl.url.includes("guxeu-beta")) {
        currentUrl.beta = true;
        currentUrl.domain = url
          .split(
            "https://wwwperf.brandeuauthorlb.ford.com/cf#/content/guxeu-beta/"
          )
          .pop()
          .split("/")[0];

        if (currentUrl.domain == "uk") {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === `co.uk`;
          }).folder;
        } else {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;
        }
      } else {
        currentUrl.beta = false;
        currentUrl.domain = url
          .split("https://wwwperf.brandeuauthorlb.ford.com/cf#/content/guxeu/")
          .pop()
          .split("/")[0];
        if (currentUrl.domain == "ch") {
          currentUrl.sub = url
            .split(
              "https://wwwperf.brandeuauthorlb.ford.com/cf#/content/guxeu/ch/"
            )
            .pop()
            .split("_")[0];
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;

          currentUrl.folder.forEach((i) => {
            if (i.includes(`${currentUrl.sub}`)) {
              currentUrl.folder = i;
            }
          });
        } else if (currentUrl.domain == "be") {
          currentUrl.sub = url
            .split(
              "https://wwwperf.brandeuauthorlb.ford.com/cf#/content/guxeu/be/"
            )
            .pop()
            .split("_")[0];
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;

          currentUrl.folder.forEach((i) => {
            if (i.includes(`${currentUrl.sub}`)) {
              currentUrl.folder = i;
            }
          });
        } else {
          currentUrl.beta = false;

          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;
        }
      }

      document.getElementById("author").classList.add("ball-active");
    }
    // 3.2.5 Check if Touch and
    if (isTouch(url)) {
      currentUrl.touch = true;
      if (currentUrl.url.includes("guxeu-beta")) {
        currentUrl.beta = true;
        currentUrl.domain = url
          .split(
            "https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu-beta/"
          )
          .pop()
          .split("/")[0];
        if (currentUrl.domain == "uk") {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === `co.uk`;
          }).folder;
        } else {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;
        }
      } else {
        currentUrl.beta = false;
        currentUrl.domain = url
          .split(
            "https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu/"
          )
          .pop()
          .split("/")[0];
        if (currentUrl.domain == "ch") {
          currentUrl.sub = url
            .split(
              "https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu/ch/"
            )
            .pop()
            .split("_")[0];
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;

          currentUrl.folder.forEach((i) => {
            if (i.includes(`${currentUrl.sub}`)) {
              currentUrl.folder = i;
            }
          });
        } else if (currentUrl.domain == "be") {
          currentUrl.sub = url
            .split(
              "https://wwwperf.brandeuauthorlb.ford.com/editor.html/content/guxeu/be/"
            )
            .pop()
            .split("_")[0];
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;

          currentUrl.folder.forEach((i) => {
            if (i.includes(`${currentUrl.sub}`)) {
              currentUrl.folder = i;
            }
          });
        } else {
          currentUrl.folder = markets.find((obj) => {
            return obj.domain === currentUrl.domain;
          }).folder;
        }
      }

      document.getElementById("touchui").classList.add("ball-active");
    }

    console.log(currentUrl);

    if (currentUrl.live) {
      balls[1].addEventListener("mouseover", (e) => {
        livePerf(currentUrl.url);
      });

      balls[2].addEventListener("mouseover", (e) => {
        liveClassic(currentUrl.url);
      });
      balls[3].addEventListener("mouseover", (e) => {
        liveTouch(currentUrl.url);
      });
    }

    if (currentUrl.perf) {
      balls[0].addEventListener("mouseover", (e) => {
        perfLive(currentUrl.url);
      });

      balls[2].addEventListener("mouseover", (e) => {
        perfClassic(currentUrl.url);
      });
      balls[3].addEventListener("mouseover", (e) => {
        perfTouch(currentUrl.url);
      });
    }

    if (currentUrl.author) {
      balls[0].addEventListener("mouseover", (e) => {
        classicLive(currentUrl.url);
      });

      balls[1].addEventListener("mouseover", (e) => {
        classicPerf(currentUrl.url);
      });

      balls[3].addEventListener("mouseover", (e) => {
        classicTouch(currentUrl.url);
      });
    }

    if (currentUrl.touch) {
      balls[0].addEventListener("mouseover", (e) => {
        touchLive(currentUrl.url);
      });

      balls[1].addEventListener("mouseover", (e) => {
        touchPerf(currentUrl.url);
      });

      balls[2].addEventListener("mouseover", (e) => {
        touchClassic(currentUrl.url);
      });
    }
    console.log(currentUrl);
  }

  whereWeAre();
});

// 4. Connection with background script
sendGreetings();
