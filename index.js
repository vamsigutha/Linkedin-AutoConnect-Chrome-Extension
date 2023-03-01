var start_button = document.querySelector("#start");

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

start_button.addEventListener("click", async () => {

  let tab = await getCurrentTab();
  document.body.style.backgroundColor = "green";

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  });


});
