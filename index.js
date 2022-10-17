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
  del.removeEventListener("click",normalizeDel);
  del.removeEventListener("click", gradualResult)
  del.addEventListener("click", logicalDelete);
  del.addEventListener("touchstart", prepareClear);
  del.addEventListener("touchmove", decideClear);
  del.addEventListener("touchend", decideClear);
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
    document.getElementById("calculation").style.fontSize = "5vw";
  }else{
    portrait = true;
    let signs = document.getElementsByClassName("signs");
    for(let i = 0; i < signs.length; i++) {
      signs[i].style.right = "-70vw";
    }
    document.getElementById("calculation").style.fontSize = "18vw";
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
    unitIndicator.textContent = "DEG";
  }
  else{
    for(let i = 0; i < unit.length; i++) {
      unit[i].textContent = "DEG";
    }
    unitIndicator.textContent = "RAD";
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
  calculationResizer();
  calculation.innerHTML = clarify(calculation.innerHTML);
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
  calculationResizer();
  calculation.innerHTML = clarify(calculation.innerHTML);
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
  calculationResizer();
  calculation.innerHTML = clarify(calculation.innerHTML);
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
  gradualResult();
  calculation.innerHTML = clarify(calculation.innerHTML);
}
function prepareClear(e) {
  let time = new Date().getTime();
  e.currentTarget.setAttribute("time", JSON.stringify(time));
}
function decideClear(e){
  let newTime = new Date().getTime();
  let oldTime = JSON.parse(e.currentTarget.getAttribute("time"));
  let calculation = document.getElementById("calculation").innerHTML;
  if(newTime - oldTime > 500 && calculation !== ""){
    clearCalculation();
  }
}
function clearCalculation(){
  let calculation = document.getElementById("calculation");
  let result = document.getElementById("result");
  let display = document.getElementById("display");
  display.style.animation = "cleaner 0.5s ease-in";
  setTimeout(function() {
    display.style.animation = "";
  }, 500);
  calculation.innerHTML = "";
  result.textContent = "";
  calculation.style.fontSize = (portrait)? "18vw":"5vw";
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
    string = (string.toString().length > 12)? Number(string).toPrecision(12) : string;
    string = (/e\+/.test(string.toString())? string.toString().replace(/e\+/, "E") : string);
    return string;
  }catch(error){
    return error.name;
  }
}
function sanitize(string) {
  let unit = document.getElementById("unit").textContent;
  string = string.replace(/,/g, "");
  string = string.replace(/<sup>2<\/sup>/g, "**2");
  string = (string.length > 1 && string.match(/%./))? string.replace(/%/g, "%×"): string;
  string = string.replace(/%/g, "/100");
  string = string.replace(/exp/g, "Math.exp");
  string = (string.length > 1 && string.match(/e./) && !string.match(/ex/))? string.replace(/e/g, "e×"): string;
  string = (string.length > 1 && string.match(/π.+/))? string.replace(/π/g, "π×"): string;
  string = string.replace(/π/g, Math.PI);
  string = (string.match(/e/) && !string.match(/ex/))? string.replace(/e/g, Math.E): string;
  string = string.replace(/log/g, "Math.log10");
  string = string.replace(/ln/g, "Math.log");
  let beforeRoots = string.match(/.√/g);
  if(beforeRoots){
    let change = true;
    for( let root of beforeRoots){
      for (let sign of signs){
        if (sign === root[0]){
          beforeRoots = beforeRoots.splice(beforeRoots.indexOf(root), 1);
          change = false;
          break;
        }
      }
    }
    if (change){
      for(let root of beforeRoots){
        string = string.replace(root, root[0] + "×√");
      }
    }
  }
  let afterClosingBrackets = string.match(/\)./g);
  if(afterClosingBrackets){
    let change = true;
    for( let bracket of afterClosingBrackets){
      for (let sign of signs){
        if (sign === bracket[1]){
          afterClosingBrackets = afterClosingBrackets.splice(afterClosingBrackets.indexOf(bracket), 1);
          change = false;
          break;
        }
      }
      if (bracket[1] === ")"){
        afterClosingBrackets = afterClosingBrackets.splice(afterClosingBrackets.indexOf(bracket), 1);
      }
    }
    if (change){
      for(let bracket of afterClosingBrackets){
        string = string.replace(bracket, ")×" + bracket[1]);
      }
    }
  }
  string = string.replace(/××+/g, "*");
  string = string.replace(/×/g, "*");
  string = string.replace(/÷/g, "/");
  string = string.replace(/–/g, "-");
  string = string.replace(/\^/g, "**");
  let rootMatches = string.match(/√\d+(?:\.\d+)?/g);
  if(rootMatches){
    for (let root of rootMatches){
      string = string.replace(root, "Math.sqrt(" + root.substring(1, root.length)+")");
    }
  }
  let factorials = string.match(/\d+(?:\.\d+)?!$/g);
  if(factorials){
    for (let factorial of factorials){
      string = string.replace(factorial, "nFactorial(" + factorial.substring(0, factorial.length-1)+")");
    }
  }
  let arcsines = string.match(/sin<sup>-1<\/sup>/g);
  if(arcsines){
    for (let arcsine of arcsines){
      string = string.replace(arcsine, "asine");
    }
  }
  let arcosines = string.match(/cos<sup>-1<\/sup>/g);
  if(arcosines){
    for (let arcos of arcosines){
      string = string.replace(arcos, "acosine");
    }
  }
  let arctangents = string.match(/tan<sup>-1<\/sup>/g);
  if(arctangents){
    for (let arctangent of arctangents){
      string = string.replace(arctangent,  "atangent");
    }
  }
  let sines = string.match(/sin\(/g);
  if(sines){
    for (let sine of sines){
      string = string.replace(sine, "sin(");
    }
  }
  let cosines = string.match(/cos\(/g);
  if(cosines){
    for (let cosine of cosines){
      string = string.replace(cosine, "cos(");
    }
  }
  let tangents = string.match(/tan\(/g);
  if(tangents){
    for (let tangent of tangents){
      string = string.replace(tangent, "tan(");
    }
  }
  string = balanceBracket(string);
  return string;
}
function gradualResult(){
  let calculation = document.getElementById("calculation").innerHTML;
  let result = document.getElementById("result");
  let calculatable = (Number(calculation))? false : true;
  if(calculation !== "" && calculatable){
    let answer = calculate(calculation);
    if(answer.toString().match(/\d+/)){
      result.textContent = answer;
    }
  }else{
    result.textContent = "";
  }
  result.textContent = clarify(result.textContent);
}
function answer(){
  let del = document.getElementById("del");
  let calculation = document.getElementById("calculation");
  let result = document.getElementById("result");
  result.textContent = "";
  let calculations = calculation.innerHTML;
  if(/\d+/.test(calculate(calculations))){
    del.textContent = "CLR";
    del.removeEventListener("click", logicalDelete);
    del.addEventListener("click", clearCalculation);
    calculation.style.fontSize = (portrait)? "11vw":"5vw";
    calculation.innerHTML = calculate(calculations);
    calculation.innerHTML = clarify(calculation.innerHTML);
  }else{
    result.textContent = "Bad expression";
  }
}
function nFactorial(number){
  number = Number(number);
  if(number === null || number === NaN || number.toString().match(/\./)){
    return "SyntaxError";
  }
  let counter = 1;
  let finalAnswer = 1;
  while (counter <=  number){
    finalAnswer *= counter;
    counter++;
  }
  return finalAnswer;
}
const toDegreeAngle = angle => angle * (180 / Math.PI);
const toRadianAngle = angle => angle * (Math.PI / 180);
function asine(string){
  let unit = document.getElementById("unit").textContent;
  let angle = Math.asin(string);
  angle = (unit === "DEG")? toDegreeAngle(string) : angle;
  return angle;
}
function acosine(string){
  let unit = document.getElementById("unit").textContent;
  let angle = Math.acos(string);
  angle = (unit === "DEG")? toDegreeAngle(string) : angle;
  return angle;
}
function atangent(string){
  let unit = document.getElementById("unit").textContent;
  let angle = Math.atan(string);
  angle = (unit === "DEG")? toDegreeAngle(string) : angle;
  return angle;
}
function sin(string){
  let unit = document.getElementById("unit").textContent;
  let angle = (unit === "DEG")? toDegreeAngle(string) : string;
  return Math.sin(angle);
}
function cos(string){
  let unit = document.getElementById("unit").textContent;
  let angle = (unit === "DEG")? toDegreeAngle(string) : string;
  return Math.cos(angle);
}
function tan(string){
  let unit = document.getElementById("unit").textContent;
  let angle = (unit === "DEG")? toDegreeAngle(string) : string;
  return Math.tan(angle);
}
function balanceBracket(string){
  let opens;
  let closes;
  try{
    opens = string.match(/\(/g).length;
    closes = string.match(/\)/g).length;
  }catch(e){}
  if(typeof(opens) === "number"){
    closes = (typeof(closes) === "number")? closes: 0;
    let requiredBrackets = opens - closes;
    for (let i = 0; i < requiredBrackets; i++){
      string += ")";
    }
  }
  return string;
}
function calculationResizer(){
  if(portrait && resizeTime < 3) {
    let width = window.getComputedStyle(calculation).getPropertyValue("width").replace("px", "");
    if(width > window.screen.availWidth){
      switch (resizeTime) {
        case 0:
          calculation.style.fontSize = "16vw";
          resizeTime++;
          break;
        case 1:
          calculation.style.fontSize = "14vw";
          resizeTime++;
          break;
        case 2:
          calculation.style.fontSize = "12vw";
          resizeTime++
          break;
        default:
          calculation.style.fontSize = "18vw";
          resizeTime = 0;
      }
    }
  }
}
function clarify(string){
  string = string.replace(/,/g, "");
  let clarifiables = string.match(/\d+(?:\.\d+)?(?:E\d+)?/g);
  for (let clarifiable of clarifiables){
    let intPart = clarifiable.match(/\d+/)[0];
    intPart = intPart.toString();
    if(intPart.length > 3){
      for(let i = 0; ; i++){
        lastComma = intPart.indexOf(",");
        lastComma = (i === 0)? intPart.length : lastComma;
        if(lastComma > 3){
          intPart = intPart.substr(0, lastComma-3) + "," + intPart.substr(lastComma-3, intPart.length);
        }else{
          let newClarifiable = clarifiable.replace(/\d+/, intPart);
          string = string.replace(clarifiable, newClarifiable);
          break;
        }
      }
    }
  }
  return string;
}