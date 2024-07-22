import React, { useState, useEffect} from "react";
import axios from "axios";
import numWords from "num-words";


const Invoice= React.forwardRef((props, ref)=> {
  const [error, setError] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [items, setItems] = useState([]);
  const [orderNumbers, setOrderNumbers] = useState([]);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalAmountToBePay, setTotalAmountToBePay] = useState(0);
  const [tshipchargeWTax, setTshipchargeWTax] = useState(0);
  const [tShipChargeWithTaxeP, setTShipChargeWithTaxeP] = useState(0); 
  const [tax, setTax] = useState(0)
  const [totalNumWord, setTotalNumWord] = useState(0)

  useEffect(() => {
    async function fetchOrderNumbers() {
      try {
        const response = await axios.get("http://localhost:3000/ordernumbers");
        setOrderNumbers(response.data);
      } catch (error) {
        console.error("Error fetching order numbers:", error);
      }
    }
    fetchOrderNumbers();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getitem", {
        params: { orderNo: orderNo },
      });

      setItems(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again.");
      setItems([]);
    }
  };

  useEffect(()=>{
    if(items[0]){
      if (items[0].igst == "") {
        setTax(items[0].cgstsgst);
      } else {
        setTax(items[0].igst);
      }
    }
  },[items])


  useEffect(() => {
    setTShipChargeWithTaxeP((shippingCharge * 18) / 100);
    setTshipchargeWTax(shippingCharge + tShipChargeWithTaxeP);
  });

  useEffect(() => {
    if (items[0]) {
      let totalShippingCharge = items[0].items.reduce((sum, item) => {
        return sum + (parseFloat(item.shippingCharge) || 0);
      }, 0);
      setShippingCharge(totalShippingCharge);
    }
  });

  useEffect(() => {
    if (items[0]) {
      let taxAmount = (items[0].netAmount * 18) / 100;
      const allAmount = items[0].netAmount + taxAmount;
      setGrossAmount(allAmount);
    }
  }, [items]);

  
  useEffect(() => {
    setTotalAmountToBePay(grossAmount + tshipchargeWTax);
  }, [grossAmount, tshipchargeWTax]);


  useEffect(() => {
    if (items[0]) {
      let taxAmount = (items[0].netAmount * 18) / 100;
      const taxs = taxAmount + tShipChargeWithTaxeP;
      setTotalTax(taxs);
    }
  });

    useEffect(() => {
      if (totalAmountToBePay !== null && totalAmountToBePay !== undefined) {
        setTotalNumWord(numWords(Math.round(totalAmountToBePay)));
      }
    }, [totalAmountToBePay]);

    return (
      <div className="flex justify-center">
        <div className="w-[80%]">
          <select
            className=" border-2 p-2 rounded-md"
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
          >
            <option value="" disabled>
              Select Order No
            </option>
            {orderNumbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 ml-2 text-white rounded-md cursor-pointer p-2 hover:bg-blue-500"
            onClick={fetchItems}
            disabled={!orderNo}
          >
            Fetch Items
          </button>
          <div className="w-full flex justify-center mt-5 mb-10">
            <div ref={ref} className="w-[100%] p-10 bg-slate-50">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <img
                    className="w-44"
                    src="https://seeklogo.com/images/A/amazon-in-logo-6FDF9EDE86-seeklogo.com.png"
                    alt=""
                  />
                  <div>
                    <h1 className="text-lg font-bold">
                      Tax Invoice/Bill of Supply/Cash Memo
                    </h1>
                    <p>(Original for Recipient)</p>
                  </div>
                </div>
                <div className=" flex justify-between mt-16">
                  <div className=" leading-4 font-semibold">
                    <h1 className=" font-bold">Sold By:</h1>
                    <span>{items[0] ? items[0].sellerName : <></>} </span>
                    <p>
                      {items[0] ? items[0].sellerCityName : <></>}
                      {"-"}
                      {items[0] ? items[0].sellerPinCode : <></>}
                    </p>
                    <p>{items[0] ? items[0].sellerState : <></>}</p>
                  </div>
                  <div className="leading-4 font-semibold text-right">
                    <h1 className=" font-bold">Billing Address:</h1>
                    <span>{items[0] ? items[0].sellerName : <></>}</span>
                    <p>
                      {items[0] ? items[0].billingCityName : <></>}
                      {"-"}
                      {items[0] ? items[0].billingPinCode : <></>}
                    </p>
                    <p>{items[0] ? items[0].sellerState : <></>}</p>
                  </div>
                </div>
                <div className=" flex justify-between mt-2">
                  <div className="leading-4 font-semibold">
                    <p>
                      <span className="font-bold">PAN No.:</span>{" "}
                      {items[0] ? items[0].sellerPanNo : <></>}
                    </p>
                    <p>
                      <span className="font-bold">GST Registration No.</span>
                      {items[0] ? items[0].sellerGSTRegisNo : <></>}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">State/UT Code :</span>{" "}
                      {items[0] ? items[0].billingUTCode : <></>}
                    </p>
                  </div>
                </div>
                <div className=" flex justify-end mt-2">
                  <div className="flex flex-col text-right leading-4 font-semibold">
                    <h1 className=" font-bold">Shipping Address:</h1>
                    <p>{items[0] ? items[0].shippingName : <></>}</p>
                    <p>
                      {items[0] ? items[0].shippingCityName : <></>}
                      {"-"}
                      {items[0] ? items[0].shippingPinCode : <></>}
                    </p>
                    <p>{items[0] ? items[0].shippingPlaceOfDelivery : <></>}</p>
                    <p>{items[0] ? items[0].shippingState : <></>}</p>
                    <p>
                      <span className="font-bold">State/UT Code :</span>{" "}
                      {items[0] ? items[0].shippingUTCode : <></>}
                    </p>
                    <p>
                      <span className="font-bold">Place of Supply : </span>{" "}
                      {items[0] ? items[0].sellerPlaceOfSupply : <></>}
                    </p>
                    <p>
                      <span className="font-bold">Place of Delivery: </span>{" "}
                      {items[0] ? items[0].shippingPlaceOfDelivery : <></>}
                    </p>
                  </div>
                </div>
                <div className=" flex justify-between mt-2">
                  <div className="leading-4 font-semibold">
                    <p>
                      <span className="font-bold">Order Number: </span>
                      {items[0] ? items[0].orderNo : <></>}
                    </p>
                    <p>
                      <span className="font-bold">Order Date: </span>
                      {items[0] ? (
                        new Date(items[0].orderDate).toDateString()
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                  <div className="leading-4 font-semibold text-right">
                    <p>
                      <span className="font-bold">Invoice Number : </span>{" "}
                      {items[0] ? items[0].invoiceNo : <></>}
                    </p>
                    <p>
                      <span className="font-bold">Invoice Details : </span>{" "}
                      {items[0] ? items[0].invoiceDetails : <></>}
                    </p>
                    <p>
                      <span className="font-bold">Invoice date : </span>{" "}
                      {items[0] ? (
                        new Date(items[0].invoiceDate).toDateString()
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center">
                  <table className=" border-collapse border w-full border-slate-500 mt-8">
                    <thead className="bg-gray-400">
                      <tr className="">
                        <th className="border border-slate-600 px-4 py-2">
                          SL No.
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Description
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Unit Price
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Qty
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Net Amount
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Tax Type
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Tax Rate
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Tax Amount
                        </th>
                        <th className="border border-slate-600 px-4 py-2">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items[0]
                        ? items[0].items.map((product, i) => (
                            <tr key={i} className="text-center">
                              <td className=" border border-slate-700 px-4 py-2">
                                {i + 1}
                              </td>
                              <td className=" border border-slate-700 px-4 py-2">
                                {product.description}
                                <br></br>
                                <span className="">Shipping Charges</span>
                              </td>
                              <td className=" border border-slate-700 px-4 py-2">
                                {product.unitPrice}
                                <br></br>
                                <span className="">
                                  {product.shippingCharge}
                                </span>
                              </td>
                              <td className=" border border-slate-700 px-4 py-2">
                                {product.quantity}
                              </td>
                              <td className=" border border-slate-700 px-4 py-2">
                                {product.totalAmount}
                                <br></br>
                                <span className="">
                                  {product.shippingCharge}
                                </span>
                              </td>
                              {items[0].cgstsgst == null ? (
                                <td className=" text-sm border border-slate-700 px-4 py-2">
                                  IGST
                                  <br></br>
                                  <span className=" text-sm">IGST</span>
                                </td>
                              ) : (
                                <td className=" text-sm border border-slate-700 px-4 py-2">
                                  SGST/CGST<br></br>
                                  <span className=" text-sm">SGST/CGST</span>
                                </td>
                              )}
                              {items[0].cgstsgst == null ? (
                                <td className=" border border-slate-700 px-4 py-2">
                                  18%<br></br>
                                  <span className="">18%</span>
                                </td>
                              ) : (
                                <td className=" border border-slate-700 px-4 py-2">
                                  {items[0].cgstsgst}%<br></br>
                                  <span className="">{items[0].cgstsgst}%</span>
                                </td>
                              )}
                              <td className=" text-sm border border-slate-700 px-4 py-2">
                                {/* total tax amount */}
                                {(product.totalAmount * 18) / 100}
                                <br />
                                <span>
                                  {(product.shippingCharge * 18) / 100}{" "}
                                </span>
                              </td>
                              {/* total product amount */}
                              <td className=" text-sm border border-slate-700 px-4 py-2">
                                {(product.totalAmount * 18) / 100 +
                                  product.totalAmount}
                                <br />
                                {/* total Shipping charges */}
                                <span>
                                  {(product.shippingCharge * 18) / 100 +
                                    product.shippingCharge}
                                </span>
                              </td>
                            </tr>
                          ))
                        : console.log()}
                      <tr>
                        <td colSpan={7} className="font-bold p-3">
                          Total :
                        </td>
                        <td className="border text-center bg-gray-400 border-slate-700 px-4 py-2">
                          {totalTax}
                        </td>
                        <td className="border text-center bg-gray-400 border-slate-700 px-4 py-2">
                          {totalAmountToBePay.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="border border-slate-700 px-4 py-2"
                          colSpan={9}
                        >
                          <span className="font-semibold">
                            Amount in Words:
                          </span>
                          <br></br>
                          <span className="font-bold">{totalNumWord}</span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="border border-slate-700 px-4 py-2 text-right"
                          colSpan={9}
                        >
                          <span className="font-bold">
                            {items[0] ? items[0].sellerName : <></>}{" "}
                          </span>
                          <div className="flex justify-end">
                            <div className="bg-gray-300 w-56 h-14 place-self-end border-l-4 "></div>
                          </div>
                          <span className="font-bold">
                            Authorised Signature
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Whether tax is payable under :
                  <span>
                    {items[0] ? items[0].invoiceReverseCharge : <></>}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
})

export default Invoice;
