let optBtn = document.querySelectorAll(".opt-btn");
let advOptBtn = document.querySelectorAll(".adv-opt-btn");

let fontSize = document.getElementById("fontSize");
let fontName = document.getElementById("fontName");
let textInputArea = document.getElementById("edit-div");
let linkBtn = document.querySelector("#createLink");
let removeLink= document.getElementById("unlink")
let aligBtn = document.querySelectorAll(".align");
let formatBtn = document.querySelectorAll(".format");
let spacingBtn = document.querySelectorAll(".spacing");
let scriptBtn = document.querySelectorAll(".script");
console.log(optBtn);
let fontList = [
  "Fira Sans",
  "Open Sans",
  "Poppins",
  "Raleway",
  "Roboto",
  "Rubik",
  "Sono",
];
// Initializer function
const initializer = () => {
  highlighter(aligBtn, true);
  highlighter(formatBtn, false);
  highlighter(scriptBtn, true);
  highlighter(spacingBtn, true);
};
const removeHighlighter = (className) => {
  className.forEach((btn) => {
    btn.classList.remove("active");
  });
};
const highlighter = (className, needsRemoval) => {
  className.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (needsRemoval) {
        let activeBtn = false;

        if (btn.classList.contains("active")) {
          activeBtn = true;
        }
        removeHighlighter(className);

        if (!activeBtn) {
          btn.classList.add("active");
        }
      } else {
        btn.classList.toggle("active");
      }
    });
  });
};
// Creating font style options for text editor
fontList.map((value) => {
  let option = document.createElement("option");
  option.innerHTML = value;
  option.value = value;
  fontName.appendChild(option);
});
// Font size allows upto 7 only

for (let i = 1; i <= 7; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  fontSize.appendChild(option);
}

const modifyText = (command, displayUI, value) => {
  document.execCommand(command, displayUI, value);
};

optBtn.forEach((btn) => {
  if (btn.classList.contains("format")) {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("active")) {
        modifyText(btn.id, false, null);
      }
      else if (btn.id=="bold") {
        modifyText("bold", false, null);
      }
      else if(btn.id=="italic"){
        modifyText("italic", false, null);
        
      }
      else if (btn.id=="underline") {
        
        modifyText("underline", false, null);
      }else if (btn.id=="strikethrough") {
        modifyText("strikethrough", false, null);
      }
    });
  } else {
    btn.addEventListener("click", () => {
      modifyText(btn.id, false, null);
    });
  }
});
advOptBtn.forEach((btn) => {
  btn.addEventListener("change", () => {
    modifyText(btn.id, false, btn.value);
  });
});

linkBtn.addEventListener("click", () => {
  let link = prompt("Enter a URL");
  if (/http/i.test(link)) {
    console.log(link);
    modifyText(linkBtn.id, false, link);
  } else {
    link = "http://" + link;
    modifyText(linkBtn.id, false, link);
  }
});
removeLink.addEventListener("click",()=>{
  modifyText(removeLink.id, false, null);
})

window.onload = initializer();
