import {
  ExpandedOrderRecord,
  ExpandedShoppingRecord,
} from "@/api/custom_types";

const ProductList = ({
  data,
  totalSum,
}: {
  data: ExpandedOrderRecord;
  totalSum: number;
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Заказ</h2>

      <div className="mb-2 flex justify-between text-sm">
        {data.expand.items.map((item: ExpandedShoppingRecord) => {
          const product = item.expand.product;

          return (
            <div key={item.id} className="flex justify-between w-full">
              <span>
                {item.amount}x {product.title}
              </span>
              <span>₸{product.price}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between font-semibold">
          <span>Всего</span>
          <span>₸{totalSum}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
