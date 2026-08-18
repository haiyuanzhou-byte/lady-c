// 抽屉侧边栏：点侧边栏以外的任何地方，侧边栏都会自动收起
var lastHamburgerClick = 0;

document.addEventListener("click", function (e) {
  var toggle = document.querySelector('[data-md-toggle="drawer"]');
  if (!toggle) return;

  var target = e.target;

  // 汉堡按钮：0.5 秒内的连点只算第一次，避免双击导致"开了又关"
  if (target instanceof Element && target.closest('.md-header__button[for="__drawer"]')) {
    var now = Date.now();
    if (now - lastHamburgerClick < 500) {
      e.preventDefault();
      return;
    }
    lastHamburgerClick = now;
    return; // 正常单击交给浏览器原生处理
  }

  if (!toggle.checked) return; // 抽屉没打开，不用管

  if (target instanceof Element) {
    // 浏览器处理汉堡按钮/遮罩层点击时，会先把复选框勾上再补发一次 click 到复选框，
    // 这次补发的 click 不干预，否则抽屉刚打开就会被关掉
    if (target === toggle) return;
    // 半透明遮罩层本身就是"开关"按钮，交给浏览器原生处理，避免重复开关
    if (target.closest('label[for="__drawer"]')) return;
    // 点侧边栏内部不关，导航菜单还能正常用
    var sidebar = document.querySelector(".md-sidebar--primary");
    if (sidebar && sidebar.contains(target)) return;
  }

  // 点其他任何地方：收起侧边栏
  toggle.checked = false;
});
