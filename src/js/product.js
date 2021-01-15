import "./library/jquery.js";
import { cookie } from "./library/cookie.js";
let id = location.search.split("=")[1];
$.ajax({
  type: "get",
  url: "../../interface/getItem.php",
  data: {
    id: id,
  },
  dataType: "json",
  success: function (res) {
    console.log(res.id);

    let temp_picture = "";
    let temp_desrc = "";
    let temp_big = "";
    let picture = JSON.parse(res.picture);
    temp_picture += ` <img src="${picture[1].src}"> `;
    temp_desrc += `<font color="#ff4a00">「购机享多看阅读免费VIP季卡；+1元得200G云空间月卡；购机抽奖赢70英寸电视」</font>${res.desrc}`;
    temp_big += ` <ul>
        <li>
          ${res.title} 4GB+128GB 羽墨黑<span>${res.price}元</span>
        </li>
      </ul>
      <div class="total-price">总计：${res.price}元</div>`;

    $(".img-left").append(temp_picture);
    $(".product-con>h2").append(`${res.title}`);
    $(".nav-bar>.wrapper>h2").append(`${res.title}`);
    $(".sale-desc").append(temp_desrc);
    $(".price-info").append(`${res.price}元`);
    $(".selected-list").append(temp_big);
    $(".btn-car").on("click", function () {
      addItem(res.id, res.price, 1);
      alert('添加购物车成功');   
    });
  },
});
function addItem(id, price, num) {
  let shop = cookie.get('shop');
  let product = {
    id,
    price,
    num,
  };
  console.log(id, price, num);
  console.log(cookie);

  if (shop) {
    shop = JSON.parse(shop);
    if (shop.some((elm) => elm.id == id)) {
      shop.forEach((el) => {
        el.id == id ? el.num += num : null;
      });
    } else {
      shop.push(product);
    }
  } else {
    shop = [];
    shop.push(product);
  }
  cookie.set('shop', JSON.stringify(shop), 1);
  console.log(shop);
}
