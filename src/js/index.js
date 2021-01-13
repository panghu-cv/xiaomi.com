import './library/jquery.js';
import './jquery-1.11.0.min.js';
import './jquery.lazyload.js';
// 图片缓存
$(function() {
    $("img.lazy").lazyload({effect: "fadeIn"});
});

$.ajax({
    type: "get",
    url: "../../interface/library/getData.php",
    dataType: "jason",
    success: function (res) {
        let temp='';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            temp+=` <li>
            <a href="#">
              <div class="figure-img">
                <img class="lazy" data-original="${picture[0].src}" alt="" />
              </div>
              <h3 class="tittle">${elm.title}</h3>
              <p class="desc">${elm.index-details}</p>
              <p class="price">
                <span class="num">${elm.price}</span>元<span>起</span>
              </p>
            </a>
          </li>`
        
        
        
        });
        $('.phone-list').append(temp);
    }
});