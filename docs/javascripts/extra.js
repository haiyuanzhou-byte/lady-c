// 抽屉侧边栏：点侧边栏以外的任何地方，侧边栏都会自动收起
document.addEventListener("click", function (e) {
  var toggle = document.querySelector('[data-md-toggle="drawer"]');
  if (!toggle || !toggle.checked) return; // 抽屉没打开，不用管

  var target = e.target;
  if (target instanceof Element) {
    // 汉堡按钮和半透明遮罩层本身就是"开关"按钮，交给浏览器原生处理，避免重复开关
    if (target.closest('label[for="__drawer"]')) return;
    // 点侧边栏内部不关，导航菜单还能正常用
    var sidebar = document.querySelector(".md-sidebar--primary");
    if (sidebar && sidebar.contains(target)) return;
  }

  // 点其他任何地方：收起侧边栏
  toggle.checked = false;
});
