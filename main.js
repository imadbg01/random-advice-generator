import "./style.css";

const btnGenerator = document.querySelector("[data-generator]");

btnGenerator.addEventListener("click", () => {
  console.log("clicked");
  getRandomAdvice();
  loadingAnimation(false);
});

const getRandomAdvice = async () => {
  const url = "https://api.adviceslip.com/advice";
  const res = await fetch(url, {
    cache: "no-cache",
  });
  const json = await res.json();
  processRandomAdvice(json);
};
const processRandomAdvice = async (data, err) => {
  if (err) throw err;
  const adviceContent = await data.slip.advice;
  const adviceId = await data.slip.id;
  return setRandomAdvice(adviceContent, adviceId);
};
const setRandomAdvice = async (content = null, id = null) => {
  const advicePlaceHolder = document.querySelector("[data-advice]");
  const adviceId = document.querySelector("[data-advice-id]");
  advicePlaceHolder.innerHTML = await `&#8221 ${content} &#8222`;
  adviceId.textContent = await ` ${id}`;
};

const loadingAnimation = (isLoad = false) => {
  const dev = document.createElement("div");
  const advicePlaceHolder = document.querySelector("[data-advice]");
  if (isLoad === false) {
    dev.classList.add("loading");
    advicePlaceHolder.appendChild(dev);
  } else {
    dev.style.display = "none";
    advicePlaceHolder.removeChild(dev);
  }
};

loadingAnimation();
const divider = document.querySelector("[data-divider]");
window.addEventListener("load", () => {
  if (window.matchMedia("min-width: 23rem")) {
    // divider.setAttribute("src", "./images/pattern-divider-mobile.svg");
    console.log("from divider");
  }
});
