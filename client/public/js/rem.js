function remSize() {
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 800) {
        deviceWidth = 800;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    document.querySelector('body').style.fontSize = 0.1 + "rem";
}
remSize()

window.onresize = function () {


}