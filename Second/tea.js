const info = document.querySelector('.info');
const goBack = document.querySelector('.goBack');

const getOrderText = (formVal) => {
    const { tast, number, symbol, sweet, free, money, ice, tea, address, telephone, time, remark, "pay-method": payMethod } = formVal;

    const freeText = free ? free : "-";
    const moneyText = money ? money : "-";

    const text = `
    【您的订单已经生成】
    
    🍨🍦🧃🥤---------🗯
    奶茶口味：${tast}
    数量：${number}
    杯型：${symbol}
    甜度：${sweet}
    免费小料：${freeText}
    加价小料：${moneyText}
    是否加冰：${ice}
    是否去茶底：${tea}
    地址：${address}
    手机号：${telephone}
    期待送达时间：${time}
    备注：${remark}
    支付方式：${payMethod}
    -------------------------
    感谢你的光临，欢迎下次再来！❤❤❤
`;
    return text;
}

const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(info);
    const formVals = Object.fromEntries(formData.entries());
    const telephone = formVals.telephone;

    const isValidTelephone = /^1\d{10}$/.test(telephone);
    if (!isValidTelephone) {
        alert('请输入以1开头的11位数字作为手机号！');
        return;
    }
    alert(getOrderText(formVals));
}

info.addEventListener("submit", onSubmit);
document.addEventListener('scroll', function () {
    if (window.pageYOffset > 0) {
        goBack.style.display = 'block';
    } else {
        goBack.style.display = 'none';
    }
})
goBack.addEventListener('click', function () {
    animate(window, 0);
})

function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        window.scroll(0, window.pageYOffset + step);
    }, 27)
}