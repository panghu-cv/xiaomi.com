import "./library/jquery.js";
import "./library/jquery-1.11.0.min.js";
import "./library/jquery.lazyload.js";

$(function () {
  // 图片缓存
  $("img.lazy").lazyload({ effect: "fadeIn" });
  $.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function (res) {
      let temp = "";
      res.forEach((elm, i) => {
        let picture = JSON.parse(elm.picture);
        temp += ` <li>
              <a href="./product.html?id=${elm.id}">
                <div class="figure-img">
                  <img src="${picture[0].src}" alt="" />
                </div>
                <h3 class="tittle">${elm.title}</h3>
                <p class="desc">${elm.index_details}</p>
                <p class="price">
                  <span class="num">${elm.price}</span>元<span>起</span>
                </p>
              </a>
            </li>`;
      });
      $(".phone-list").append(temp);
    },
  });
  // 第一个二级导航
  // 鼠标进入
  $(".btn-first").on("mouseenter", function () {
    $(".nav-first").addClass("first-active");
    let index = $(".btn-first").index(this);
    $(".list-first").eq(index).addClass("show").siblings().removeClass("show");
  });
  // 鼠标移出
  $(".nav-first").on("mouseleave", function () {
    $(this).removeClass("first-active");
    $(".list-first").removeClass("show");
  });
  // 第二个二级导航
  $(".category-item").on("mouseenter", function () {
    // alert(1);
    $(this)
      .css("background", "orange")
      .siblings()
      .css("background", "transport");
    $(this).find("div").addClass("show");
    $(this).siblings().removeClass("show");
  });

  $(".category-item").on("mouseleave", function () {
    $(this).css("background", "transport");
    $(this).find("div").removeClass("show");
  });
  //  秒杀倒计时
  // 获得标准时间对象 并设计一个计时器

  let timer = setInterval(function () {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let s = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    $(".hour").text(h);
    $(".minute").text(m);
    $(".second").text(s);
  }, 1000);

  // 固定定位的导航

  let ti = setInterval(function () {
    //计算页面滚动的距离
    let tops = document.documentElement.scrollTop;
    // 根据滚动的距离判断固定定位的导航是否出现
    if (tops > 200) {
      $(".return-top").addClass("show");
    } else {
      $(".return-top").removeClass("show");
    }
  }, 1000);
});
