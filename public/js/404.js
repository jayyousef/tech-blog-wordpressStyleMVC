var pageX = $(document).width();
var pageY = $(document).height();
var mouseY=0;
var mouseX=0;

const eyesGo =( event ) => {
   const ghostEyes= document.querySelector('.box__ghost-eyes')
  //verticalAxis
  mouseY = event.pageY;
  yAxis = (pageY/2-mouseY)/pageY*300; 
  //horizontalAxis
  mouseX = event.pageX / -pageX;
  xAxis = -mouseX * 100 - 100;

  ghostEyes.css({ 'transform': 'translate('+ xAxis +'%,-'+ yAxis +'%)' }); 

  //console.log('X: ' + xAxis);
}

document.addEventListener('onmousemove', eyesGo)