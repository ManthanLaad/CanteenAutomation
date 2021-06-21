const form = document.querySelector("form");
const input1 = document.querySelector("#username");
const input2 = document.querySelector("#password");
const msg = document.querySelector("#msg");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(`http://localhost:3000/admin`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: input1.value,
      password: input2.value,
    }),
  }).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msg.innerText = data.msg;
      } else {
        location.replace(
          `http://localhost:3000/home?userId=${encodeURIComponent(data.msg)}`
        );
      }
    });
  });
});
