import './jquery.js';
import './jquery-1.11.0.min.js';
import './jquery.lazyload.js';
// 图片缓存
$(function() {
    $("img.lazy").lazyload({effect: "fadeIn"});
});
