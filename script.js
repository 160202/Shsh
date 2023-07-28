document.addEventListener("DOMContentLoaded", function() {
  // Ngày sinh nhật của cô ấy là 16/02
  const birthdayMonth = 2;
  const birthdayDay = 16;

  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthdayDate = new Date(`${birthdayMonth}/${birthdayDay}/${currentYear}`);

    // Nếu ngày sinh nhật đã qua, tính đến ngày sinh nhật năm sau
    if (now > birthdayDate) {
      birthdayDate.setFullYear(currentYear + 1);
    }

    const timeLeft = birthdayDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // Xác định thông báo lời chúc dựa vào giờ hiện tại
    const currentHour = now.getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Chúc buổi sáng tốt lành!";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Chúc buổi chiều vui vẻ!";
    } else if (currentHour >= 18 && currentHour < 23) {
      greeting = "Chúc buổi tối an lành!";
    } else {
      greeting = "Đã đến giờ đi ngủ, chúc ngủ ngon!";
    }

    document.querySelector(".greeting").textContent = greeting;
  }

  function getWeatherData(cityName, cityId) {
    const apiKey = "4a617c0e3dd49c420c875d3c570e57d5";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=vi`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const description = data.weather[0].description;
        const temperature = data.main.temp;

        displayWeatherData(cityId, description, temperature);
      })
      .catch(error => console.log(error));
  }

  function displayWeatherData(cityId, description, temperature) {
    const weatherContainer = document.getElementById(cityId);
    const weatherDescriptionElement = weatherContainer.querySelector(".weather-description");
    const weatherTemperatureElement = weatherContainer.querySelector(".weather-temperature");

    weatherDescriptionElement.textContent = getVietnameseDescription(description);
    weatherTemperatureElement.textContent = `${temperature} °C`;
  }

  function getVietnameseDescription(description) {
    // Xác định các dòng chữ thích hợp cho từng loại thời tiết bằng tiếng Việt
    switch (description) {
      case "clear sky":
        return "Trời quang trong";
      case "few clouds":
        return "Ít mây";
      case "scattered clouds":
        return "Mây rải rác";
      case "broken clouds":
        return "Mây rải rác";
      case "shower rain":
        return "Mưa rào";
      case "rain":
        return "Mưa";
      case "thunderstorm":
        return "Dông";
      case "snow":
        return "Tuyết";
      case "mist":
        return "Sương mù";
      default:
        return description;
    }
  }

  function getGreeting() {
    const currentHour = new Date().getHours();

    // Danh sách các thông điệp chúc theo khung thời gian trong ngày
    const greetings = {
      morning: [
        "Chúc buổi sáng tốt lành!",
        "Chào buổi sáng!",
        "Buổi sáng vui vẻ!",
        "Một ngày mới tràn đầy năng lượng!",
      ],
      afternoon: [
        "Chúc buổi chiều vui vẻ!",
        "Buổi chiều an lành!",
        "Cảm giác thế nào khi gió thổi qua?",
        "Hãy thưởng thức một buổi chiều thú vị!",
      ],
      evening: [
        "Chúc buổi tối an lành!",
        "Buổi tối thật êm đềm!",
        "Cùng xem mặt trời lặn!",
        "Hãy để tâm hồn lắng đọng trong buổi tối!",
      ],
      night: [
        "Đã đến giờ đi ngủ, chúc ngủ ngon!",
        "Đêm đã khuya, hãy nghỉ ngơi thật ngon!",
        "Thời gian đi ngủ rồi đấy!",
        "Hãy chuẩn bị cho một đêm ngủ ngon!",
      ],
    };

    if (currentHour >= 5 && currentHour < 12) {
      return getRandomMessage(greetings.morning);
    } else if (currentHour >= 12 && currentHour < 18) {
      return getRandomMessage(greetings.afternoon);
    } else if (currentHour >= 18 && currentHour < 23) {
      return getRandomMessage(greetings.evening);
    } else {
      return getRandomMessage(greetings.night);
    }
  }

  function getRandomMessage(messages) {
    // Hàm này giúp lấy ngẫu nhiên một thông điệp chúc trong danh sách các thông điệp
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  // Gọi hàm cập nhật đếm ngược và thông tin thời tiết
  updateCountdown();
  setInterval(updateCountdown, 1000);

  getWeatherData("Lang Son", "lang-son");
  getWeatherData("Hanoi", "hanoi");

  // Hiển thị thông báo lời chúc
  document.querySelector(".greeting").textContent = getGreeting();
});
