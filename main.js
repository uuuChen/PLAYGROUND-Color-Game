
var pickedColor;
var hasDoneOnce;

var cardsRowNum = 1;
var cardsColNum = 3;
var firstInit = true;

var htmlEl;
var containerEl;
var cardEls;
var colorDisplayEl;
var messageEl;
var resetBtnEl;
var cardsContainerEl;
var rowBtnMinusEl;
var rowBtnPlusEl;
var colBtnMinusEl;
var colBtnPlusEl;

function pickRandIdx(arrLen){
  return Math.floor(Math.random() * arrLen);
}

function pickRandRGB(){
  var r = pickRandIdx(255);
  var g = pickRandIdx(255);
  var b = pickRandIdx(255);
  return '(' + r + ', ' + g + ', ' + b + ')';
}

function setBackGroundColor(color){
  containerEl.style.backgroundColor = color;
  htmlEl.style.backgroundColor = color;
}

function setCards2RandColor(){
  var randRGBs = [];
  cardEls.forEach((item, i) => {
    var randRGB = pickRandRGB();
    item.style.visibility = 'visible';
    item.style.backgroundColor = 'rgb'+ randRGB;
    randRGBs.push(randRGB);
  });
  pickedColor = randRGBs[pickRandIdx(randRGBs.length)];
  colorDisplayEl.innerHTML = 'RGB' + pickedColor;
  pickedColor = 'rgb' + pickedColor;
}

function setCardsWhite(){
  cardEls.forEach((item, i) => {
    item.style.visibility = 'visible';
    item.style.backgroundColor = 'rgb(255, 255, 255)';
    item.removeEventListener('click', respondCardClick);
  });
}

function respondCardClick(){
  clickedColor =  this.style.backgroundColor
  btnsShowOrHidden('none');
  if (clickedColor === pickedColor){
    hasDoneOnce = true;
    messageEl.textContent = 'CORRECT!';
    resetBtn.textContent = 'Play Again';
    setBackGroundColor(pickedColor);
    setCardsWhite();
  }else{
    messageEl.textContent = 'TRY AGAIN';
    this.style.visibility = 'hidden';
  }
}

function setCardsHandler(){
  cardEls.forEach((item, i) => {
    item.addEventListener('click', respondCardClick);
  });
}

function setResetBtnHandler(){
  resetBtnEl.addEventListener('click', function(){
      if(hasDoneOnce){
        initHandlers();
      }
      initVars();
    });
}

function getNewInnerHtml(){
  var newInnerHtml = '<div class="row flex-sm-row justify-content-center">';
  newInnerHtml += ('<div class="myCard"></div>'.repeat(cardsColNum));
  newInnerHtml += '</div>';
  newInnerHtml = newInnerHtml.repeat(cardsRowNum);
  return newInnerHtml;
}

function setRowBtnsHandler(){
  rowBtnMinusEl.addEventListener('click', function(){
      if(cardsRowNum == 1) return;
      cardsRowNum -= 1;
      cardsContainerEl.innerHTML = getNewInnerHtml();
      init();
  });
  rowBtnPlusEl.addEventListener('click', function(){
      cardsRowNum += 1;
      cardsContainerEl.innerHTML = getNewInnerHtml();
      init();
  });
}

function setColBtnsHandler(){

}

function btnsShowOrHidden(str){
  if(str === 'visible' || str === 'hidden'){
    rowBtnPlusEl.style.visibility = str;
    rowBtnMinusEl.style.visibility = str;
  }else if(str === 'none' || str === 'unset') {
    rowBtnPlusEl.style.display = str;
    rowBtnMinusEl.style.display = str;
  }
}

function initHandlers(){
  setCardsHandler();
  if(firstInit){
    setResetBtnHandler();
    setRowBtnsHandler();
    setColBtnsHandler();
    firstInit = false;
  }
}

function initVars() {
  hasDoneOnce = false;
  htmlEl = document.querySelector('html');
  containerEl = document.querySelector('.container-fluid');
  cardEls = document.querySelectorAll('.myCard');
  colorDisplayEl = document.getElementById('color-picked');
  messageEl = document.getElementById('message');
  resetBtnEl = document.getElementById('resetBtn');
  cardsContainerEl = document.getElementById('cards-container');
  rowBtnMinusEl = document.getElementById('rowBtn-minus');
  rowBtnPlusEl = document.getElementById('rowBtn-plus');
  colBtnMinusEl = document.getElementById('colBtn-minus');
  colBtnPlusEl = document.getElementById('colBtn-plus');
  btnEls = document.querySelectorAll('button');
  messageEl.textContent = 'WHAT\'S THE COLOR?';
  resetBtnEl.textContent = 'New Color';
  setBackGroundColor('#232323');
  setCards2RandColor();
  btnsShowOrHidden('unset');
}

function init(){
  initVars();
  initHandlers();
}

window.onload = function(){
  init();
}
