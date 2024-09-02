import { model, Schema } from 'mongoose';
import { OrderStatus } from '../constants/orderStatus.js';
import { FoodModel } from './foodModel.js';

export const LatLngSchema = new Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  {
    _id: false,
  }
);
export const BookTableInfoSchema = new Schema({
  tableNumber: { type: String, required: true },
  numberOfPersons: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

export const OrderItemSchema = new Schema(
  {
    food: { type: FoodModel.schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

OrderItemSchema.pre('validate', function (next) {
  if (this.food && this.food.price) {
    this.price = this.food.price * this.quantity;
  }
  next();
});


const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: false },
    paymentId:{ type: Boolean, default: false },
    bookTableInfo:{ type: BookTableInfoSchema, required: true },
    amount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);


export const OrderModel = model('order', orderSchema);

