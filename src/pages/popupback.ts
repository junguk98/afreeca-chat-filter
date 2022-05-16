import browser from "webextension-polyfill";

let bjSwitch: HTMLInputElement | undefined;
let managerSwitch: HTMLInputElement | undefined;
let fanSwitch: HTMLInputElement | undefined;
let topfanSwitch: HTMLInputElement | undefined;
let subscribeSwitch: HTMLInputElement | undefined;
let nicknameInput: HTMLInputElement | undefined;
let addButton: HTMLButtonElement | undefined;
let nicknameList: HTMLDivElement | undefined;
let nicknames: Array<String> = new Array<String>();

function pageinit() {
  bjSwitch = <HTMLInputElement>document.getElementById("bj-switch");
  managerSwitch = <HTMLInputElement>document.getElementById("manager-switch");
  fanSwitch = <HTMLInputElement>document.getElementById("fan-switch");
  topfanSwitch = <HTMLInputElement>document.getElementById("topfan-switch");
  subscribeSwitch = <HTMLInputElement>document.getElementById("subscribe-switch");
  nicknameInput = <HTMLInputElement>document.getElementById("nickname-input");
  addButton = <HTMLButtonElement>document.getElementById("add-btn");
  nicknameList = <HTMLDivElement>document.getElementById("nickname-list");
}

window.addEventListener("load", (e) => {
  pageinit();

  browser.storage.local.get("bjCheck").then((res) => {
    bjSwitch.checked = res.bjCheck;
  });
  browser.storage.local.get("managerCheck").then((res) => {
    managerSwitch.checked = res.managerCheck;
  });
  browser.storage.local.get("fanCheck").then((res) => {
    fanSwitch.checked = res.fanCheck;
  });
  browser.storage.local.get("topfanCheck").then((res) => {
    topfanSwitch.checked = res.topfanCheck;
  });
  browser.storage.local.get("subscribeCheck").then((res) => {
    subscribeSwitch.checked = res.subscribeCheck;
  });
  browser.storage.local.get("nicknames").then((res) => {
    if (res.nicknames) {
      while (nicknameList.hasChildNodes()) {
        nicknameList.removeChild(nicknameList.firstChild);
      }
      nicknames = res.nicknames;
      nicknames.forEach((e) => {
        const $name = document.createElement("div");
        $name.classList.add("nickname");
        $name.innerHTML = "" + e;
        nicknameList.appendChild($name);
      });
    }
  });

  bjSwitch.addEventListener("change", (e) => {
    const target = <HTMLInputElement>e.target;
    browser.storage.local.set({ bjCheck: target.checked });
  });
  managerSwitch.addEventListener("change", (e) => {
    const target = <HTMLInputElement>e.target;
    browser.storage.local.set({ managerCheck: target.checked });
  });
  fanSwitch.addEventListener("change", (e) => {
    const target = <HTMLInputElement>e.target;
    browser.storage.local.set({ fanCheck: target.checked });
  });
  topfanSwitch.addEventListener("change", (e) => {
    const target = <HTMLInputElement>e.target;
    browser.storage.local.set({ topfanCheck: target.checked });
  });
  subscribeSwitch.addEventListener("change", (e) => {
    const target = <HTMLInputElement>e.target;
    browser.storage.local.set({ subscribeCheck: target.checked });
  });
  addButton.addEventListener("click", () => {
    if (nicknameInput.value === "") return;
    nicknames.push(nicknameInput.value);
    console.log(nicknames);
    nicknameInput.value = "";
    browser.storage.local.set({ nicknames: nicknames });
    window.location.reload();
  });
  nicknameList.addEventListener("click", (e) => {
    const target = <HTMLDivElement>e.target;
    const deleteElement = target.closest(".nickname");
    console.log(deleteElement.innerHTML);
    nicknames.forEach((e, i) => {
      if (e.toString() === deleteElement.innerHTML) {
        nicknames.splice(i, 1);
      }
    });
    browser.storage.local.set({ nicknames: nicknames });
    window.location.reload();
  });
});
