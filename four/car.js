// 获取页面元素
const car = document.getElementById("car");
const speedSelect = document.getElementById("speed");
const carTypeSelect = document.getElementById("car-type");

// 初始化速度和车型
let speed = 1;
let carType = "car1.jpg";
let positionX = 0;
let positionY = 0;
let direction = "right"; // 初始方向为右

// 检查本地存储是否有存储的状态
if (localStorage.getItem("carSpeed")) {
  speed = parseInt(localStorage.getItem("carSpeed"));
  speedSelect.value = speed;
}

if (localStorage.getItem("carType")) {
  carType = localStorage.getItem("carType");
  carTypeSelect.value = carType;
}

if (localStorage.getItem("carPositionX")) {
  positionX = parseInt(localStorage.getItem("carPositionX"));
}

if (localStorage.getItem("carPositionY")) {
  positionY = parseInt(localStorage.getItem("carPositionY"));
}

if (localStorage.getItem("carDirection")) {
  direction = localStorage.getItem("carDirection");
}

// 更新小车图像
function updateCarImage() {
  car.src = `images/${carType}`;
  car.style.transform = `translate(${positionX}px, ${positionY}px) rotate(${getRotationAngle()}deg)`;
}

// 获取车头旋转角度
function getRotationAngle() {
  switch (direction) {
    case "up":
      return -90;
    case "down":
      return 90;
    case "left":
      return 180;
    case "right":
      return 0;
    default:
      return 0;
  }
}

// 弹窗提示函数
function showAlert(message) {
  alert(message);
}

// 处理键盘事件
document.addEventListener("keydown", (event) => {
  const prevPositionX = positionX;
  const prevPositionY = positionY;

  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      positionY -= speed;
      break;
    case "ArrowDown":
      direction = "down";
      positionY += speed;
      break;
    case "ArrowLeft":
      direction = "left";
      positionX -= speed;
      break;
    case "ArrowRight":
      direction = "right";
      positionX += speed;
      break;
    default:
      return;
  }

  // 限制小车在边界内移动
  if (positionX < 0) {
    positionX = 0;
  } else if (positionX > 1100) {
    positionX = 1100;
  }

  if (positionY < 0) {
    positionY = 0;
  } else if (positionY > 440) {
    positionY = 440;
  }

  // 检查是否碰到边框
  if (positionX === prevPositionX && positionY === prevPositionY) {
    showAlert("小车碰到边框了，请返回");
  }

  // 更新本地存储的状态
  localStorage.setItem("carSpeed", speed);
  localStorage.setItem("carType", carType);
  localStorage.setItem("carPositionX", positionX);
  localStorage.setItem("carPositionY", positionY);
  localStorage.setItem("carDirection", direction);

  // 更新小车图像位置和方向
  updateCarImage();
});

// 更新小车图像
updateCarImage();

// 监听速度下拉框的变化
speedSelect.addEventListener("change", () => {
  speed = parseInt(speedSelect.value);
  // 更新本地存储的速度设置
  localStorage.setItem("carSpeed", speed);
});

// 监听车型下拉框的变化
carTypeSelect.addEventListener("change", () => {
  carType = carTypeSelect.value;
  // 更新本地存储的车型设置
  localStorage.setItem("carType", carType);
  // 更新小车图像
  updateCarImage();
});
