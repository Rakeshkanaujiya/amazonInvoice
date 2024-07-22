const mongoose = require("mongoose");

const OrderDetails = new mongoose.Schema({
   sellerName: String,
   sellerCityName: String,
   sellerState: String,
   sellerPinCode: Number,
   sellerPanNo: String,
   sellerGSTRegisNo: String,
   sellerPlaceOfSupply: String,
   orderNo: Number,
   orderDate: Date,
   billingName: String,
   billingCityName: String,
   billingState: String,
   billingPinCode: String,
   billingUTCode: String,
   invoiceNo: Number,
   invoiceDetails: String,
   invoiceDate: Date,
   invoiceReverseCharge: String,
   shippingName: String,
   shippingCityName: String,
   shippingState: String,
   shippingPinCode: String,
   shippingUTCode: String,
   shippingPlaceOfDelivery: String,
   netAmount:Number,
   cgstsgst:Number,
   igst:Number,
   items: [{
    description: String,
    unitPrice: Number,
    quantity: Number,
    discount: Number,
    shippingCharge:Number,
    totalAmount: Number
  }]
})

module.exports = mongoose.model('OrderDetails', OrderDetails)