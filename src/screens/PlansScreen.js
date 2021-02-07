import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setPlan } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`Àn error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51IHbzCCGNojTUAgKoHJvbcKRLTeudl1b6nOZ66RSG9EqhffhOJschAIPSF7e0H8fye6kd9a261B1sul1ZCaTfVci00Au7bmUjd  "
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  useEffect(() => {
    if (subscription?.role) {
      dispatch(setPlan({plan: subscription.role.trim()}));
    }
  }, [subscription?.role]);

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.trim());

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h4>{productData.name}</h4>
              <h5>{productData.description}</h5>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
