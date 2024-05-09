<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/checkout.css" />
    <script src="/js/checkout.js" defer></script>
    <script
      src="https://kit.fontawesome.com/yourcode.js"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />

    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

    <title>Shopping Cart</title>
  </head>
  <body>
    <div class="navbar">
      <h1><ion-icon name="cart-outline"></ion-icon> Checkout</h1>
      <nav>
        <ul>
          <li>
            <div class="tooltip">
              <span class="tooltiptext">Home</span>

              <a href="main.html"
                ><span class="material-symbols-outlined"> home </span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <main class="containerr">
      <div class="item-flex">
        <section class="checkout">
          <h2 class="section-heading">Payment Details</h2>
          <div class="payment-form">
            <div class="payment-method">
              <button class="method selected">
                <ion-icon name="card"></ion-icon>
                <span>Credit Car</span>
                <ion-icon
                  class="checkmark fill"
                  name="checkmark-circle"
                ></ion-icon>
              </button>

              <button class="method selected">
                <ion-icon name="logo-paypal"></ion-icon>
                <span>Paypal</span>
                <ion-icon
                  class="checkmark"
                  name="checkmark-circle-outline"
                ></ion-icon>
              </button>
            </div>
            <form action="#">
              <div class="cardholder-name">
                <label for="cardholder-name" class="label-default"
                  >Carholder name</label
                >
                <input
                  type="text"
                  name="cardholder-name"
                  id="cardholder-name"
                  class="input-default"
                />
              </div>

              <div class="card-number">
                <label for="card-number" class="label-default"
                  >Card Number</label
                >
                <input
                  type="number"
                  name="card-number "
                  id="card-number"
                  class="input-default"
                />
              </div>

              <div class="input-flex">
                <div class="expire-date">
                  <label for="expire-date" class="label-default"
                    >Expiration date</label
                  >
                  <div class="input-flex">
                    <input
                      type="number"
                      name="day"
                      id="expire-date"
                      class="input-default"
                      placeholder="31"
                      min="1"
                      max="31"
                    />
                    /
                    <input
                      type="number"
                      name="month"
                      id="expire-date"
                      class="input-default"
                      placeholder="12"
                      min="1"
                      max="12"
                    />
                  </div>
                </div>

                <div class="cvv">
                  <label for="cvv" class="label-default">CVV</label>
                  <input
                    type="number"
                    name="CVV"
                    id="CVV"
                    class="input-default"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
        <section class="cart">
          <div class="cart-item-box">
            <h2 class="section-heading">Order Summery</h2>
          </div>

          <div class="wrapper">
            <div class="amount">
              <div class="shipping">
                <span>Shipping</span><span id="shipping"> 0.00</span
                ><span>€</span>
              </div>

              <div class="total">
                <span>Total</span><span id="total-text-span"> 3.00</span
                ><span>€</span>
              </div>
            </div>
            <button class="btnn btnn-primary order-button">
              <span>Pay</span>
            </button>
          </div>
        </section>
      </div>
    </main>
    <script
      type="module"
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
    ></script>
  </body>
</html>
