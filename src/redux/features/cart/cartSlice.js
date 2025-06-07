import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "🛒 Product added to cart!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: "#f0f9ff",
          color: "#0f172a",
          iconColor: "#10b981", // emerald-500
          customClass: {
            popup: "swal2-rounded",
          },
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      } else
        Swal.fire({
          title: "⚠️ Already in Cart!",
          text: "You've already added this item. Please check your cart.",
          icon: "warning",
          iconColor: "#f59e0b", // amber-500
          background: "#f0f9ff",
          color: "#78350f", // dark amber text
          confirmButtonText: "Go to Cart",
          confirmButtonColor: "#f59e0b",
          cancelButtonText: "Close",
          cancelButtonColor: "#d33",
          showCancelButton: true,
          customClass: {
            popup: "swal2-rounded",
            confirmButton: "swal2-confirm-button",
            cancelButton: "swal2-cancel-button",
          },
        });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
