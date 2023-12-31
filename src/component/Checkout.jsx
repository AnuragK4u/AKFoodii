import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const [username, setUsername] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState({
    street: "",
    
  });

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";

    if (username === null || username === "") {
      isproceed = false;
      errormessage += " Username";
    }

    if (Firstname === null || Firstname === "") {
      isproceed = false;
      errormessage += " Fullname";
    }

    if (Lastname === null || Lastname === "") {
      isproceed = false;
      errormessage += " Fullname";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (!username) {
        isproceed = false;
        toast.warning("Please enter the valid user name");
      }
    }

    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let orderid = Math.random().toString(16).slice(2); // Generate a unique ID
    let orderdetails = {
      totalAmount: total, // Calculate total amount based on the cart
      items: state, // Use the state directly as the order items
    };
    let regobj = {
      orderid,
      username,
      Firstname,
      Lastname,
      country,
      address, // This is now an object with "street" and "zip" properties
      zip,
      orderdetails,
    };

    if (IsValidate()) {
      fetch("http://localhost:3000/checkoutDetails", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Checkout successfully.");
          navigate("/order");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  const state = useSelector((state) => state.handleCart);
  var total = 0;

  const restList = (rest) => {
    total = total + rest.price * rest.qty;
    return (
      <li className="list-group-item d-flex justify-content-between lh-sm" key={rest.foodName}>
        <div>
          <h6 className="my-0">
            {rest.foodName} ({rest.qty})
          </h6>
        </div>
        <span className="text-muted">${rest.price * rest.qty}</span>
      </li>
    );
  };

  return (
    <>
      <div className="container my-5" onSubmit={handlesubmit}>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{state.length}</span>
            </h4>
            <ul className="list-group mb-3">{state.map(restList)}
            <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total}</strong>
              </li>
            </ul>
            

            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code" />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    value={Firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="form-control"
                  ></input>
                  <div className="invalid-feedback">Valid first name is required.</div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    value={Lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="form-control"
                  ></input>
                  <div className="invalid-feedback">Valid last name is required.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    ></input>
                    <div className="invalid-feedback">Your username is required.</div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="form-control"
                  ></textarea>
                  <div className="invalid-feedback">Please enter your shipping address.</div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country <span className="errmsg">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-control"
                    >
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="singapore">Singapore</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input value={zip} onChange={(e) => setZip(e.target.value)} className="form-control"></input>
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="same-address" />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    checked=""
                    required=""
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                  <small className="text-body-secondary">Full name as displayed on card</small>
                  <div className="invalid-feedback">Name on card is required</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                  <div className="invalid-feedback">Credit card number is required</div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                  <div className="invalid-feedback">Expiration date required</div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>

              <hr className="my-4" />

              <button type="submit" className="btn btn-outline-dark fw-bolder text-center">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
