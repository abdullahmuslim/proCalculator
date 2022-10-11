let resizeTime = 0;
let signs = "÷×+–^";
let portrait;
let navHiding;
if(window.screen.availWidth < 540){
  portrait = true;
}else{
  portrait = false;
}
window.onload = function() {
  navHiding = setTimeout(hideNavs, 2000);
  let inv = document.getElementsByClassName("inv");
  for (let i = 0;
  i < inv.length; i++) {
    inv[i].addEventListener("click", swapKeys);
  }
  let unit = document.getElementsByClassName("unit");
  for (let i = 0;
  i < unit.length; i++) {
    unit[i].addEventListener("click", changeUnit);
  }
  let signs = document.getElementsByClassName("signs");
  for (let i = 0;
  i < signs.length; i++) {
    signs[i].addEventListener("click", showSigns);
  }
  let buttonTrans = document.getElementById("buttonTrans");
  buttonTrans.addEventListener("click", closeButtonTrans)
  let nums = document.getElementById("nums");
  for (let i = 0; i < nums.children.length; i++){
    nums.children[i].addEventListener("click", inputNums);
    nums.children[i].addEventListener("click", normalizeDel);
    nums.children[i].addEventListener("click", gradualResult);
  }
  let del = document.getElementById("del");
  del.removeEventListener("click", inputNums);
  del.removeEventListener("click",normalizeDel)
  del.addEventListener("click", logicalDelete);
  let equal = document.getElementById("equal");
  equal.removeEventListener("click", inputNums);
  equal.removeEventListener("click", normalizeDel);
  equal.addEventListener("click", answer);
  signs = document.getElementById("signs");
  for (let i = 0; i < signs.children.length; i++){
    signs.children[i].addEventListener("click", inputSigns);
    signs.children[i].addEventListener("click", normalizeDel);
    signs.children[i].addEventListener("click", gradualResult);
  }
  let additionalSigns = document.getElementById("additionalSigns");
  for (let i = 0; i < additionalSigns.children.length; i++){
    additionalSigns.children[i].addEventListener("click", inputAdditionalSigns);
    additionalSigns.children[i].addEventListener("click", normalizeDel);
    additionalSigns.children[i].addEventListener("click", gradualResult);
  }
  let display = document.getElementById("display");
  display.addEventListener("click", showNavs)
}
window.onresize = function() {
  if(window.screen.availWidth > 540){
    portrait = false;
    let swiper = document.getElementById("swipeNotify");
    swiper.style.right = "-3vw";
    swiper.style.animation = "none";
    let buttonTrans = document.getElementById("buttonTrans");
    buttonTrans.style.left = "-21vw";
    let signs = document.getElementsByClassName("signs");
    for(let i = 0; i < signs.length; i++) {
      signs[i].style.right = "0";
    }
  }else{
    portrait = true;
    let signs = document.getElementsByClassName("signs");
    for(let i = 0; i < signs.length; i++) {
      signs[i].style.right = "-70vw";
    }
  }
}
function showNavs(){
  clearTimeout(navHiding);
  let nav = document.getElementsByTagName("nav")[0];
  let unit = document.getElementById("unit");
  let display = window.getComputedStyle(nav).getPropertyValue("display");
  let flex = (display !== "flex")? true : false;
  if(flex){
    nav.style.display = "flex";
    unit.style.display = "flex";
    navHiding = setTimeout(hideNavs, 2000);
  }else{
    hideNavs();
  }
}
function hideNavs(){
  let nav = document.getElementsByTagName("nav")[0];
  let unit = document.getElementById("unit");
  nav.style.display = "none";
  unit.style.display = "none";
}
function swapKeys() {
  let signs = document.getElementById("signs");
  let additionalSigns = document.getElementById("additionalSigns");
  let signDisplayed = window.getComputedStyle(signs).getPropertyValue("display");
  if(signDisplayed == "none") {
    signs.style.display = "grid";
    additionalSigns.style.display = "none";
  }else{
    signs.style.display = "none";
    additionalSigns.style.display = "grid";
  }
}
function changeUnit() {
  let unit = document.getElementsByClassName("unit");
  let unitIndicator = document.getElementById("unit");
  if(unit[0].textContent === "DEG") {
    for(let i = 0; i < unit.length; i++) {
      unit[i].textContent = "RAD";
    }
    unitIndicator.textContent = "RAD";
  }
  else{
    for(let i = 0; i < unit.length; i++) {
      unit[i].textContent = "DEG";
    }
    unitIndicator.textContent = "DEG";
  }
  hideNavs();
  showNavs();
}
function showSigns(e) {
  if(e.target === e.currentTarget) {
    let swiper = document.getElementById("swipeNotify");
    swiper.style.right = "-3vw";
    swiper.style.animation = "none";
    let buttonTrans = document.getElementById("buttonTrans");
    buttonTrans.style.left = "0";
    buttonTrans.style.transition = "all 0.3s ease-in";
    let signs = document.getElementsByClassName("signs");
    for(let i = 0; i < signs.length; i++) {
      signs[i].style.position = "fixed";
      signs[i].style.right = "0";
    }
  }
}
function closeButtonTrans() {
  let swiper = document.getElementById("swipeNotify");
    swiper.style.right = "3vw";
    swiper.style.animation = "swiper 0.9s linear infinite";
  let buttonTrans = document.getElementById("buttonTrans");
  buttonTrans.style.left = "-21vw";
  let signs = document.getElementsByClassName("signs");
  for(let i = 0; i < signs.length; i++) {
    signs[i].style.right = "-70vw";
    signs[i].style.transition = "all 0.3s ease-in";
  }
}
function inputNums(e){
  let calculation = document.getElementById("calculation");
  let calcContent = calculation.innerHTML;
  let lastChar = calcContent[calcContent.length-1];
  if(e.currentTarget.textContent === "DEL" ||  e.currentTarget.textContent === "CLR"){
    //do nothing
  }else{
    let isSign = false;
    let isReplaceAble = false;
    for (let sign of signs){
      if(sign === e.currentTarget.textContent){
        isSign = true;
      }
    }
    for (let replaceAble of signs) {
      if (replaceAble === lastChar){
        isReplaceAble = true;
      }
    }
    if(lastChar === undefined){
      isReplaceAble = true;
    }
    if(isSign && !isReplaceAble){
      calculation.innerHTML += e.currentTarget.textContent;
    }else if(isSign && isReplaceAble && lastChar !== "×" && lastChar !== "–"){
      calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
    }else if(!isSign){
      calculation.innerHTML += e.currentTarget.textContent;
    }else if(isSign && lastChar === "×"){
      if (e.currentTarget.textContent === "–"){
        calculation.innerHTML += e.currentTarget.textContent;
      }else{
        calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
      }
    }else if(isSign && lastChar === "–"){
      if(calcContent.length - calcContent.lastIndexOf("×–") === 2){
        calculation.innerHTML = calcContent.replace(/..$/g, e.currentTarget.textContent);
      }else{
        calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
      }
    }
  }
  if(portrait && resizeTime < 3) {
    let width = window.getComputedStyle(calculation).getPropertyValue("width").replace("px", "");
    if(width > window.screen.availWidth){
      switch (resizeTime) {
        case 0:
          calculation.style.fontSize = "18vw";
          resizeTime++;
          break;
        case 1:
          calculation.style.fontSize = "16vw";
          resizeTime++;
          break;
        case 2:
          calculation.style.fontSize = "14vw";
          resizeTime++
          break;
        default:
          calculation.style.fontSize = "20vw";
          resizeTime = 0;
      }
    }
  }
}
function inputSigns(e) {
  if (e.target === e.currentTarget) {
    let sign = e.currentTarget.innerHTML;
    let calculation = document.getElementById("calculation");
    let calcContent = calculation.innerHTML;
    let lastChar = calculation.textContent[calculation.textContent.length-1];
    if (sign !== "INV" && sign !== "DEG" && sign !== "RAD"){
      let isSign = false;
      let isReplaceAble = false;
      for (let sign of signs){
        if(sign === e.currentTarget.textContent){
          isSign = true;
        }
      }
      for (let replaceAble of signs) {
        if (replaceAble === lastChar){
          isReplaceAble = true;
        }
      }
      if(lastChar === undefined){
        isReplaceAble = true;
      }
      if(sign === "sin" || sign ===  "cos" || sign ===  "tan" || sign ===  "ln" || sign ===  "log") {
        calculation.innerHTML += e.currentTarget.textContent + "(";
      }else if(isSign && !isReplaceAble){
        calculation.innerHTML += e.currentTarget.textContent;
      }else if(isSign && isReplaceAble && lastChar !== "×" && lastChar !== "–"){
        calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
      }else if(!isSign){
        calculation.innerHTML += e.currentTarget.textContent;
      }else if(isSign && lastChar === "×"){
        if (e.currentTarget.textContent === "–"){
          calculation.innerHTML += e.currentTarget.textContent;
        }else{
          calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
        }
      }else if(isSign && lastChar === "–"){
        if(calcContent.length - calcContent.lastIndexOf("×–") === 2){
          calculation.innerHTML = calcContent.replace(/..$/g, e.currentTarget.textContent);
        }else{
          calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
        }
      }
    }
  }
  if(portrait && resizeTime < 3) {
    let width = window.getComputedStyle(calculation).getPropertyValue("width").replace("px", "");
    if(width > window.screen.availWidth){
      switch (resizeTime) {
        case 0:
          calculation.style.fontSize = "18vw";
          resizeTime++;
          break;
        case 1:
          calculation.style.fontSize = "16vw";
          resizeTime++;
          break;
        case 2:
          calculation.style.fontSize = "14vw";
          resizeTime++
          break;
        default:
          calculation.style.fontSize = "20vw";
          resizeTime = 0;
      }
    }
  }
}
function inputAdditionalSigns(e){
  if(e.target === e.currentTarget){
    let sign = e.currentTarget.innerHTML;
    let calculation = document.getElementById("calculation");
    let calcContent = calculation.innerHTML;
    let lastChar = calculation.innerHTML[calculation.innerHTML.length-1];
    if (sign !== "INV" && sign !== "DEG" && sign !== "RAD"){
      let isSign = false;
      let isReplaceAble = false;
      for (let sign of signs){
        if(sign === e.currentTarget.textContent){
          isSign = true;
        }
      }
      for (let replaceAble of signs) {
        if (replaceAble === lastChar){
          isReplaceAble = true;
        }
      }
      if(lastChar === undefined){
        isReplaceAble = true;
      }
      if(sign.match(/.+<sup>-1<\/sup>/)){
        calculation.innerHTML += sign + "(";
      }else if(sign.match(/.+<sup>x<\/sup>/) || sign === "x²"){
        switch (sign) {
          case "x²":
            calculation.innerHTML += "<sup>2</sup>";
            break;
          case "10<sup>x</sup>":
            calculation.innerHTML += "10^";
            break;
          case "e<sup>x</sup>":
            calculation.innerHTML += "exp(";
            break;
          
          default:
            // code
        }
      }else if(isSign && !isReplaceAble){
        calculation.innerHTML += e.currentTarget.textContent;
      }else if(isSign && isReplaceAble && lastChar !== "×" && lastChar !== "–"){
        calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
      }else if(!isSign){
        calculation.innerHTML += e.currentTarget.textContent;
      }else if(isSign && lastChar === "×"){
        if (e.currentTarget.textContent === "–"){
          calculation.innerHTML += e.currentTarget.textContent;
        }else{
          calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
        }
      }else if(isSign && lastChar === "–"){
        if(calcContent.length - calcContent.lastIndexOf("×–") === 2){
          calculation.innerHTML = calcContent.replace(/..$/g, e.currentTarget.textContent);
        }else{
          calculation.innerHTML = calcContent.replace(/.$/g, e.currentTarget.textContent);
        }
      }
    }
  }
  if(portrait && resizeTime < 3) {
    let width = window.getComputedStyle(calculation).getPropertyValue("width").replace("px", "");
    if(width > window.screen.availWidth){
      switch (resizeTime) {
        case 0:
          calculation.style.fontSize = "18vw";
          resizeTime++;
          break;
        case 1:
          calculation.style.fontSize = "16vw";
          resizeTime++;
          break;
        case 2:
          calculation.style.fontSize = "14vw";
          resizeTime++
          break;
        default:
          calculation.style.fontSize = "20vw";
          resizeTime = 0;
      }
    }
  }
}
function logicalDelete(){
  let calculation = document.getElementById("calculation");
  let calcContent = calculation.innerHTML;
  calcLength = calcContent.length;
  let complexSigns = ["sin(", "cos(", "tan(", "ln(", "log(", "exp(", "sin<sup>-1</sup>(", "cos<sup>-1</sup>(", "tan<sup>-1</sup>(", "<sup>2</sup>"];
  let foundSign = false;
  for (sign of complexSigns) {
    if (calcContent.includes(sign)){
      let index = calcContent.lastIndexOf(sign);
      if(calcLength - index === sign.length) {
        foundSign = true
        calculation.innerHTML = calcContent.substr(0, index);
      }
    }
  }
  if(!foundSign){
    calculation.innerHTML = calcContent.substr(0, calcLength - 1);
  }
  if(portrait && resizeTime > 0) {
    let width = window.getComputedStyle(calculation).getPropertyValue("width").replace("px", "");
    if(width < window.screen.availWidth){
      switch (resizeTime) {
        case 1:
          calculation.style.fontSize = "20vw";
          resizeTime--;
          break;
        case 2:
          calculation.style.fontSize = "18vw";
          resizeTime--;
          break;
        case 3:
          calculation.style.fontSize = "16vw";
          resizeTime--;
          break;
        default:
          calculation.style.fontSize = "20vw";
          resizeTime = 0;
      }
    }
  }
}
function clearCalculation(){
  let calculation = document.getElementById("calculation");
  let result = document.getElementById("result");
  calculation.innerHTML = "";
  result.textContent = "";
  normalizeDel();
}
function normalizeDel(){
  let del = document.getElementById("del");
  del.textContent = "DEL";
  del.removeEventListener("click", clearCalculation);
  del.addEventListener("click", logicalDelete);
}
function calculate(string) {
  string = sanitize(string);
  try{
    string = eval(string);
    return string;
  }catch(error){
    return error.name;
  }
}
function sanitize(string) {
  string = string.replace(/÷/g, "/");
  string = string.replace(/×/g, "*");
  string = string.replace(/–/g, "-");
  string = string.replace(/\^/g, "**");
  string = string.replace(/<sup>2<\/sup>/g, "**2");
  return string;
}
function gradualResult(){
  let calculation = document.getElementById("calculation").innerHTML;
  let result = document.getElementById("result");
  if(calculation !== ""){
    let answer = calculate(calculation);
    console.log(answer);
    if(answer !== "SyntaxError"){
      result.textContent = answer;
    }
  }
}
function answer(){
  let del = document.getElementById("del");
  del.textContent = "CLR";
  del.removeEventListener("click", logicalDelete);
  del.addEventListener("click", clearCalculation);
  let calculation = document.getElementById("calculation");
  let result = document.getElementById("result");
  result.textContent = "";
  let calculations = calculation.innerHTML;
  calculation.innerHTML = calculate(calculations);
}