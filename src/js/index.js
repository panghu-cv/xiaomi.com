import './library/jquery.js';
import './library/jquery-1.11.0.min.js';
import './library/jquery.lazyload.js';
// 图片缓存
$(function() {
    $("img.lazy").lazyload({effect: "fadeIn"});
    $.ajax({
      type: "get",
      url: "../../interface/getData.php",
      dataType: "json",
      success: function (res) {
          let temp='';
          res.forEach((elm, i) => {
              let picture = JSON.parse(elm.picture);
              temp+=` <li>
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
            </li>`
          
          
          
          });
          $('.phone-list').append(temp);
      }
    });
    // 第一个二级导航
    // 第二个二级导航
    $('.category-item').on('mouseenter',function(){
      // alert(1);
      $(this).css('background','orange').siblings().css("background","transport");
      $(this).find("div").addClass('show');
      $(this).siblings().removeClass("show");
    });
    

    $('.category-item').on('mouseleave',function(){
      $(this).css("background","transport");
      $(this).find("div").removeClass('show');

    });
  //   $(function() {
  //     let btns = $('#tabs>ul>li');
  //     btns.on('click', function() {
  //         $(this).addClass('active').siblings().removeClass('active');
  //         let index = btns.index(this);
  //         $('#tabs>div').eq(index).addClass('show').siblings().removeClass('show');
  //     });
  // });
});


