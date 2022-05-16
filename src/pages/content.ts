import browser from "webextension-polyfill";

let chatIdx = 1;
let chatBox: HTMLDivElement;
let origBox: HTMLDivElement;
let chat: HTMLCollectionOf<HTMLDListElement>;
let myBox: HTMLDivElement;
let config = { childList: true, subtree: true };

let bjCheck: string, managerCheck: string, fanCheck: string, topfanCheck: string, subscribeCheck: string;
let nicknames: Array<String> = new Array<String>();

function filterUpdate() {
  browser.storage.local.get("bjCheck").then((res) => {
    bjCheck = res.bjCheck;
  });
  browser.storage.local.get("managerCheck").then((res) => {
    managerCheck = res.managerCheck;
  });
  browser.storage.local.get("fanCheck").then((res) => {
    fanCheck = res.fanCheck;
  });
  browser.storage.local.get("topfanCheck").then((res) => {
    topfanCheck = res.topfanCheck;
  });
  browser.storage.local.get("subscribeCheck").then((res) => {
    subscribeCheck = res.subscribeCheck;
  });
  browser.storage.local.get("nicknames").then((res) => {
    if (res.nicknames) {
      nicknames = res.nicknames;
    }
  });
}

function filter(chat: Element) {
  if (!chat) return false;
  let image = chat.getElementsByTagName("img");
  let nickname = chat.querySelector("a").innerHTML;
  if (!image) return false;

  let flag = 0;
  [...image].forEach((elem) => {
    if (elem.alt === "BJ" && bjCheck) {
      flag = 1;
    }
    if (elem.alt === "매니저" && managerCheck) {
      flag = 1;
    }
    if (elem.alt === "열혈팬" && topfanCheck) {
      flag = 1;
    }
    if (elem.alt === "팬클럽" && fanCheck) {
      flag = 1;
    }
    if (elem.alt === "구독자" && subscribeCheck) {
      flag = 1;
    }
  });

  nicknames.forEach((e) => {
    if (e.toString() === nickname) {
      flag = 1;
    }
  });

  if (flag) return true;
  return false;
}

function getChatidx(idx) {
  for (let i = chat.length - 1; i >= 0; i--) {
    if (chat[i].getElementsByTagName("dd")[0].id == idx) {
      return i;
    }
  }
}

function myBoxcallback() {
  let i = 0;
  let first = getChatidx(chatIdx);
  for (i = first; i < chat.length - 1; i++) {
    chatIdx++;
    let here = chat[i];
    if (filter(here)) {
      myBox.appendChild(here.cloneNode(true));
      myBox.scrollTop = myBox.scrollHeight;
    }
  }
}

window.addEventListener("load", () => {
  filterUpdate();
  origBox = document.querySelector(".chat_area");
  chatBox = document.querySelector(".chatbox");
  if (origBox) {
    chat = origBox.getElementsByTagName("dl");
    myBox = <HTMLDivElement>origBox.cloneNode(true);
  }

  const observer = new MutationObserver(myBoxcallback);

  if (myBox && origBox && chatBox) {
    myBox.classList.add("myBox");
    origBox.classList.add("afm_chat_area");
    chatBox.appendChild(myBox);
    observer.observe(origBox, config);
  }
});

browser.storage.onChanged.addListener((changes) => {
  filterUpdate();
  for (var key in changes) {
    let newValue = changes[key].newValue;
    if (key === "bjCheck") {
    } else if (key === "managerCheck") {
    } else if (key === "fanCheck") {
    }
  }
});
