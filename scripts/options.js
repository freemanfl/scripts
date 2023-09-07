const saveOptions = () => {
  const jira = document.getElementById("jira").checked;

  chrome.storage.sync.set({ jira: jira }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";

    setTimeout(() => {
      status.textContent = "";
    }, 750);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get("jira", function (data) {
    document.getElementById("jira").checked = data.jira;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
