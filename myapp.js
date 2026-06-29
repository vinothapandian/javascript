let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart"))||[];

// COOKIE SET
function setCookie(name, value, days) {

  let expires = "";

  if (days) {

    let date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    expires = "; expires=" + date.toUTCString();
  }

  document.cookie =
    name + "=" + value + expires + "; path=/";
}

// COOKIE GET
function getCookie(name) {

  let nameEQ = name + "=";

  let ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {

    let c = ca[i].trim();

    if (c.indexOf(nameEQ) === 0) {

      return c.substring(nameEQ.length);
    }
  }

  return null;
}

// WINDOW LOAD
window.onload = function () {

  let user = getCookie("username");

  if (!user) {

    user = prompt("Enter your name");

    if (user) {

      setCookie("username", user, 7);
    }
  }

  document.getElementById("user-name").innerText =
    "Hi, " + user;
};

updateCart();

// ADD TO CART

function addToCart(title, price) {

  cart.push({
    title: title,
    price: price
  });

  localStorage.setItem("cart", JSON.stringify(cart))

  updateCart();
}

// UPDATE CART


function updateCart() {

  let list =
    document.getElementById("cart-list");

  list.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    // list.innerHTML += `

      // <li class="list-group-item d-flex justify-content-between align-items-center">

        // <div>
          // ${item.title}
          // <br>
          // ₹${item.price}
        // </div>

        // <button class="btn btn-danger btn-sm"
        // onclick="removeItem(${index})">

          // Delete

        // </button>

      // </li>
    // `;
    list.innerHTML += `
<tr>
  <td>${item.title}</td>
  <td>₹${item.price}</td>
  <td>
    <button
      class="btn btn-danger btn-sm"
      onclick="removeItem(${index})">
      Delete
    </button>
  </td>
</tr>
`;
  });
document.getElementById("cart-total").innerText = total;

  document.getElementById("cart-count").innerText = cart.length;
  
  list.innerHTML += `

    <li class="list-group-item active d-flex justify-content-between">

      <strong>Total</strong>

      <strong>₹${total}</strong>

    </li>
  `;

  document.getElementById("cart-count").innerText =
    cart.length;
}

function removeItem(index) {

  cart.splice(index, 1);

   localStorage.setItem("cart", JSON.stringify(cart))

  updateCart();
}

function paymentSuccess(event) {

  event.preventDefault();

  alert("Payment Successful ✅");

  cart = [];

  localStorage.removeItem("cart");
  updateCart();

  $('#paymentModal').modal('hide');

  $('#cartModal').modal('hide');
}

















































































































































































































































































































