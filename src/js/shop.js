import "./library/jquery.js";
import { cookie } from "./library/cookie.js";

let shop = cookie.get("shop");
// console.log(shop);

if (shop) {
  shop = JSON.parse(shop); // 有cookie数据才需要转换
  //  console.log(shop);
  let idList = shop.map((elm) => elm.id).join(); // 获得所有id
  //   console.log(idList);
  $.ajax({
    type: "get",
    url: "../../interface/getItems.php",
    data: {
      idList,
    },
    dataType: "json",
    success: function (res) {
      let temp = "";
      let sum1 = 0; //商品总件数
      let sum2 = 0; //已经选择的商品数
      let total_price1 = 0; //商品总价
      let total_price2 = 0; //已经选择的商品总价
      res.forEach((elm, i) => {
        let picture = JSON.parse(elm.picture);

        // 让ajax获得的数据结果id与cookie中的id  一一对应
        // 索引不同

        // 从购物车的cookie数据中去选择当前遍历的数据
        let arr = shop.filter((val) => val.id == elm.id);
        sum1 += arr[0].num;
        total_price1 += elm.price * arr[0].num;

        // total_price += elm.price * arr[0].num;
        // total_price2+=
        temp += `  <div class="item-box "data-id="${elm.id}">
                <div class="item-table">
                  <div class="item-row clearfix">
                    <div class="col col-check">
                      <input type="checkbox" class="sel" data-id="${elm.id}" />
                    </div>
                    <div class="col col-img">
                      <a href="">
                        <img
                          src="${picture[2].src}"
                          alt="" class='small-img'
                        />
                      </a>
                    </div>
                    <div class="col col-name">
                      <h3 class="name">
                        <a href="">${elm.title} 6GB+128GB 流影紫</a>
                      </h3>
                    </div>
                    <div class="col col-price" >${elm.price}元</div>
                    <div class="col col-num">
                      <div class="change-goods-num clearfix">
                        <a class="minus" data-id="${elm.id}"> - </a>
                        <input
                          type="text"
                          class="goods-num"
                          autocomplete="off"
                          value="${arr[0].num}" data-id="${elm.id}"
                        />
                        <a class="plus" data-id="${elm.id}"> + </a>
                      </div>
                    </div>
                    <div class="col col-total want-pay">${
                      elm.price * arr[0].num
                    }元</div>
                    <div class="col col-action">
                      <a  class="del" data-id="${elm.id}"> ✖ </a>
                    </div>
                  </div>
                </div>
              </div>`;
      });
      $(".list-body").append(temp);
      $(".cart-all").text(sum1);

      //   console.log(total_price1);

      //    删除
      $(".del").on("click", function () {
        let shop2 = shop.filter((el) => el.id != $(this).attr("data-id")); // 获得id不匹配的元素
        cookie.set("shop", JSON.stringify(shop2), 1); // 将不匹配的元素从新写进cookie
        location.reload();
      });

      //   // 减少
      $(".minus").on("click", function () {
        let shop2 = shop.map((elm) => {
          elm.id == $(this).attr("data-id") && elm.num--;
          elm.num < 1 && ++elm.num;
          return elm;
        });

        cookie.set("shop", JSON.stringify(shop2), 1); // 将不匹配的元素从新写进cookie
        location.reload();
      });
      //   增加
      $(".plus").on("click", function () {
        let shop2 = shop.map((elm) => {
          elm.id == $(this).attr("data-id") && elm.num++;

          return elm;
        });
        //   let shop3 = shop.filter((elm) => {
        //             if (elm.id == $(this).attr("data-id")) {
        //               return elm.num;
        //             }
        //           });
        //           $(this).parent().parent().find(".goods-num")[0].attr("value","++shop3[0].num");
        cookie.set("shop", JSON.stringify(shop2), 1); // 将不匹配的元素从新写进cookie
        location.reload();
      });
      //    全选情况
      $(".total-check").on("click", function () {
        if ($(this).prop("checked")) {
          $(".sel").prop("checked", true);
          sum2 = sum1;
          total_price2 = total_price1;
        } else {
          $(".sel").prop("checked", false);
          sum2 = 0;
          total_price2 = 0;
        }
        $(".cart-sel").text(sum2);
        $(".pay").text(total_price2);
      });
      //   勾选
      $(".sel").on("click", function () {
        let shop2 = shop.filter((elm) => {
          if (elm.id == $(this).attr("data-id")) {
            return elm.num;
          }
        });
        
        if (this.checked) {
        sum2+=shop2[0].num;
        total_price2 +=shop2[0].num*shop2[0].price;
        }else{
          sum2-=shop2[0].num;
          total_price2 -=shop2[0].num*shop2[0].price;
        }       
        $(".cart-sel").text(sum2);
        $(".pay").text(total_price2);
      });
    },
  });
}
