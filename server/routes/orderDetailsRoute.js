const router = require('express').Router();
const OrderDetails = require("../models/orderdetails");


router.post('/products', async (req, res) => {
  const { sellerName,sellerCityName,sellerState,sellerPinCode,sellerPanNo,sellerGSTRegisNo,sellerPlaceOfSupply,orderNo,orderDate,billingName,billingCityName,billingState,billingPinCode,billingUTCode,invoiceNo,invoiceDetails,invoiceDate,invoiceReverseCharge,shippingName,shippingCityName,shippingState,shippingPinCode,shippingUTCode,shippingPlaceOfDelivery,netAmount,cgstsgst,igst, items } = req.body;
  const newProduct = new OrderDetails({ sellerName,sellerCityName,sellerState,sellerPinCode,sellerPanNo,sellerGSTRegisNo,sellerPlaceOfSupply,orderNo,orderDate,billingName,billingCityName,billingState,billingPinCode,billingUTCode,invoiceNo,invoiceDetails,invoiceDate,invoiceReverseCharge,shippingName,shippingCityName,shippingState,shippingPinCode,shippingUTCode,shippingPlaceOfDelivery,netAmount,cgstsgst,igst,items });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/getitem', async (req, res) => {
  const { orderNo } = req.query;

  try {
    const items = await OrderDetails.find({ orderNo: orderNo });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/ordernumbers', async (req, res) => {
  try {
    const orderNumbers = await OrderDetails.distinct('orderNo');
    res.status(200).json(orderNumbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;