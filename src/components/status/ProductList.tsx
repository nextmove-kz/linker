import { ExpandedOrderItems, ExpandedOrderRecord } from "@/api/custom_types";

const ProductList = ({
  items,
  totalSum,
}: {
  items: ExpandedOrderItems[];
  totalSum: number;
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Заказ</h2>

      <div className="mb-2 flex flex-col gap-4 text-sm">
        {items.map((item: ExpandedOrderItems) => {
          return (
            <div key={item.id} className="flex justify-between w-full">
              <div className="flex flex-col">
                <span>
                  {item.amount}x {item.product_name}
                </span>
                <span className="text-xs text-gray-500">
                  {item.selected_variants}
                </span>
              </div>
              <span>₸{item.price * item.amount}</span>
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
