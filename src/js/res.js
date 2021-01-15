import "./library/jquery.js";
$(function () {
  alert("没完成注册前注册按钮不可点击");
  let reg = /^.{4,16}/;
  let userInput = $("input");
  let btn = $(".btn-res");
  console.log(userInput);
  for (let i = 0; i < userInput.length; i++) {
    userInput[i].onblur = function () {
      if (i == 2) {
        if (
          userInput[i].value === userInput[i - 1].value &&
          reg.test(userInput[i].value)
        ) {
          userInput[i].style.background="blue";
        } else {
          userInput[i].style.background="red";
        }
      } else {
        reg.test(userInput[i].value)
          ? userInput[i].style.background="blue"
          : userInput[i].style.background="red";
      }
      let count = 0;
      for (var j = 0; j < userInput.length; j++) {
        userInput[j].style.background == "blue" ? count++ : count;
      }
      count == 4? btn.removeAttr("disabled"):btn.attr("disabled", "disabled");
      if(count==4){
          alert("注册按钮可以点击了");
      }
    };
  }
});
