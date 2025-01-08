"use client";
import { Button } from "../ui/button";

const Counter = ({
  count,
  plus,
  minus,
}: {
  count: number;
  plus: () => void;
  minus: () => void;
}) => {
  return (
    <Button
      className="w-24 gap-0 justify-between border-primary text-primary p-0"
      variant="outline"
    >
      <div className="w-1/3" onClick={minus}>
        -
      </div>
      <span className="w-1/3">{count}</span>
      <div className="w-1/3" onClick={plus}>
        +
      </div>
    </Button>
  );
};

export default Counter;
