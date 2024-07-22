import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Form() {
  const formRef = useRef(null);
  const [formDataArray, setFormDataArray] = useState([]);
  const [sellerName, setSellerName] = useState("");
  const [sellerCityName, setSellerCityName] = useState("");
  const [sellerState, setSellerState] = useState("");
  const [sellerPinCode, setSellerPinCode] = useState("");
  const [sellerPanNo, setSellerPanNo] = useState("");
  const [sellerGSTRegisNo, setSellerGSTRegisNo] = useState("");
  let [sellerPlaceOfSupply, setSellerPlaceOfSupply] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingCityName, setBillingCityName] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingPinCode, setBillingPinCode] = useState("");
  const [billingUTCode, setBillingUTCode] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceReverseCharge, setInvoiceReverseCharge] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingCityName, setShippingCityName] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingPinCode, setShippingPinCode] = useState("");
  const [shippingUTCode, setShippingUTCode] = useState("");
  let [shippingPlaceOfDelivery, setShippingPlaceOfDelivery] = useState("");
  const [netAmount, setNetAmount] = useState(0);
  const [cgstsgst, setCgstSgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addItem = (e) => {
    e.preventDefault();
    const formVal = formRef.current;

    if (formVal instanceof HTMLFormElement) {
      const formData = new FormData(formVal);
      const formDataObj = {};

      formData.forEach((value, key) => {
        if (key === "unitPrice" || key === "quantity" || key === "discount") {
          formDataObj[key] = parseFloat(value);
        } else {
          formDataObj[key] = value;
        }
      });

      setFormDataArray((prevArray) => [...prevArray, formDataObj]);
      formVal.reset(); // Clear form after submission
    }
  };

  const tax = 18;

  useEffect(() => {
    // Calculate the net amount
    const toBeNetAmt = formDataArray.reduce((sum, item) => {
      return sum + (parseFloat(item.totalAmount) || 0);
    }, 0);

    setNetAmount(toBeNetAmt);

    // Calculate the total amount using unit price, quantity, and discount
    const tAmount = unitPrice * quantity;
    const discountAmount = (tAmount * discount) / 100;
    const calculatedAmount = tAmount - discountAmount;
    setTotalAmt(calculatedAmount);
  }, [formDataArray, unitPrice, quantity, discount]);

  const submitItems = (e) => {
    e.preventDefault();
    const payload = {
      sellerName: sellerName,
      sellerCityName: sellerCityName,
      sellerState: sellerState,
      sellerPinCode: sellerPinCode,
      sellerPanNo: sellerPanNo,
      sellerGSTRegisNo: sellerGSTRegisNo,
      sellerPlaceOfSupply: sellerPlaceOfSupply,
      orderNo: orderNo,
      orderDate: orderDate,
      billingName: billingName,
      billingCityName: billingCityName,
      billingState: billingState,
      billingPinCode: billingPinCode,
      billingUTCode: billingUTCode,
      invoiceNo: invoiceNo,
      invoiceDetails: invoiceDetails,
      invoiceDate: invoiceDate,
      invoiceReverseCharge: invoiceReverseCharge,
      shippingName: shippingName,
      shippingCityName: shippingCityName,
      shippingState: shippingState,
      shippingPinCode: shippingPinCode,
      shippingUTCode: shippingUTCode,
      netAmount: netAmount,
      cgstsgst: cgstsgst,
      igst: igst,
      items: formDataArray,
    };
    axios
      .post("http://localhost:3000/products", payload)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center w-full border-b-2 mb-4">
      <div className="w-[90%]  flex flex-wrap justify-center mt-5 gap-5">
        <div className="flex flex-col w-[300px]">
          <h1 className="text-2xl font-bold mb-3">Seller Details:</h1>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setSellerName(e.target.value)}
          />
          <label htmlFor="">Ciry name:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setSellerCityName(e.target.value)}
          />
          <label htmlFor="">State:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setSellerState(e.target.value)}
          />
          <label htmlFor="">Pin code:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setSellerPinCode(e.target.value)}
          />
          <label htmlFor="">PAN No.</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100 uppercase"
            name=""
            id=""
            onChange={(e) => setSellerPanNo(e.target.value)}
          />
          <label htmlFor="">GST Registration No.</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 uppercase focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setSellerGSTRegisNo(e.target.value)}
          />
          <label htmlFor="">Place of Supply</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setSellerPlaceOfSupply(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[300px]">
          <h1 className="text-2xl font-bold mb-3">Shipping Details:</h1>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setShippingName(e.target.value)}
          />
          <label htmlFor="">Ciry name:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setShippingCityName(e.target.value)}
          />
          <label htmlFor="">State:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setShippingState(e.target.value)}
          />
          <label htmlFor="">Pin code:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setShippingPinCode(e.target.value)}
          />
          <label htmlFor="">State/UT Code</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setShippingUTCode(e.target.value)}
          />
          <label htmlFor="">Place of Delivery</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setShippingPlaceOfDelivery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-[300px]">
          <h1 className="text-2xl font-bold mb-1">Billing Details:</h1>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setBillingName(e.target.value)}
          />
          <label htmlFor="">Ciry name:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setBillingCityName(e.target.value)}
          />
          <label htmlFor="">State:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setBillingState(e.target.value)}
          />
          <label htmlFor="">Pin code:</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setBillingPinCode(e.target.value)}
          />
          <label htmlFor="">State/UT Code</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setBillingUTCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[300px]">
          <h1 className="text-2xl font-bold mb-3">Invoice Details:</h1>
          <label htmlFor="">Invoice No.</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
          <label htmlFor="">Invoice Details.</label>
          <input
            type="text"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            id=""
            onChange={(e) => setInvoiceDetails(e.target.value)}
          />
          <label htmlFor="">Invoice Date</label>
          <input
            type="date"
            className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
            name=""
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
          <label className="mt-5" htmlFor="">
            Reverse Charge: Yes/No
          </label>
          <div className="flex gap-3">
            <label>
              <input
                type="checkbox"
                value="yes"
                checked={invoiceReverseCharge === "yes"}
                onChange={(e) => setInvoiceReverseCharge(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="checkbox"
                value="no"
                checked={invoiceReverseCharge === "no"}
                onChange={(e) => setInvoiceReverseCharge(e.target.value)}
              />
              No
            </label>
          </div>
        </div>
        <div className="flex flex-col w-[300px]">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-3">Order Details:</h1>
            <label htmlFor="">Order No.</label>
            <input
              type="text"
              className=" rounded-md focus:outline-none border-2 focus:bg-gray-100"
              name=""
              id=""
              onChange={(e) => setOrderNo(e.target.value)}
            />
            <label htmlFor="">Order Date</label>
            <input
              type="date"
              className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
              name=""
              id=""
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[300px] gap-2 mt-5">
            <h1 className="text-2xl font-bold mb-3">CGST/SGST & IGST</h1>
            {sellerPlaceOfSupply === shippingPlaceOfDelivery ? (
              <div className="mb-2  w-[300px]">
                <label htmlFor="">CGST/SGST(In %)</label>
                <input
                  type="number"
                  className=" rounded-md w-[300px] h-8 focus:outline-none border-2 focus:bg-gray-100 mt-2"
                  name="csgtsgst"
                  id=""
                  onChange={(e) => setCgstSgst(e.target.value)}
                />
              </div>
            ) : (
              <div className=" w-[300px] flex flex-col">
                <label htmlFor="">IGST(In %)</label>
                <input
                  type="number"
                  className=" rounded-md h-8 focus:outline-none border-2 focus:bg-gray-100"
                  name="igst"
                  id=""
                  onChange={(e) => setIgst(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-[300px]">
          <h1 className="text-2xl font-bold mb-3">Item Details:</h1>
          <form ref={formRef} onSubmit={addItem} className="flex flex-col">
            <label>Description:</label>
            <input
              type="text"
              className=" focus:bg-gray-100 focus:outline-none border-2 rounded-md"
              name="description"
              required
            />
            <label>Unit Price:</label>
            <input
              type="number"
              className=" focus:bg-gray-100 focus:outline-none border-2 rounded-md"
              name="unitPrice"
              required
              onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
            />
            <label>Quantity:</label>
            <input
              type="number"
              className=" focus:bg-gray-100 focus:outline-none border-2 rounded-md"
              name="quantity"
              required
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
            />
            <label>Discount:</label>
            <input
              type="text"
              className=" focus:bg-gray-100 focus:outline-none border-2 mt-2 rounded-md"
              name="discount"
              required
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
            <label>Shipping Charger</label>
            <input
              type="text"
              className=" focus:bg-gray-100 focus:outline-none border-2 mt-2 rounded-md"
              name="shippingCharge"
              required
              onChange={(e) => setShippingCharge(parseFloat(e.target.value))}
            />
            <div className="flex">
              <button
                className="hover:bg-blue-500  bg-blue-600 text-white rounded-md p-2 mt-2 mb-5"
                type="submit"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col">
          <div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Discount</th>
                  <th className="px-4 py-2">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {formDataArray.map((item, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.unitPrice}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.discount}</td>
                    <td className="border px-4 py-2">{item.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="hover:bg-teal-500 mt-5 w-32 h-10 mb-4 bg-teal-600 text-white rounded-md"
            onClick={submitItems}
          >
            Submit All Data
          </button>
        </div>
      </div>
    </div>
  );
}
