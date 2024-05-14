import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

// context yapısı tanımla
export const BasketContext = createContext();

// contex de tutulan verileri uygulamaya aktaracak sağlayıcı bileşeni
export function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage("basket", []);

  //   sepete ürün ekler
  const addToBasket = (newProduct) => {
    // bu üründen sepette varmı
    const found = basket.find((i) => i.id === newProduct.id);
    if (found) {
      // ürün sepette varsa > miktarını bir arttır
      // a)bulunan ürünün değerini bir arttır
      const updated = { ...found, amount: found.amount + 1 };

      // b)sepet dizisindeki eski ürünün yerine güncel halini koy
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );
      // c)stati güncelle
      setBasket(newBasket);
      toast.info(`Ürün miktarı arttırıldı.(${updated.amount})`);
    } else {
      // ürün sepette yoksa > ürünü sepete ekle(miktarı 1 e eşitle)
      setBasket([...basket, { ...newProduct, amount: 1 }]);
      toast.success("Ürün sepete eklendi.");
    }
  };
  // ürünü sepetten kaldır

  const removeFromBasket = (delete_id) => {
    // sepetteki ürünü bul
    const found = basket.find((i) => i.id === delete_id);
    if (found.amount > 1) {
      // miktarı 1 den fazlaysa > miktarını 1 eksilt
      const updated = { ...found, amount: found.amount - 1 };

      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      setBasket(newBasket);
      toast.info(`Ürün miktarı azaltıldı(${updated.amount})`);
    } else {
      // miktarı 1 e eşitse > ürünü diziden kaldır
      const filtred = basket.filter((i) => i.id !== delete_id);
      setBasket(filtred);
      toast.error(`Ürün sepetten kaldırıldı.`);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
