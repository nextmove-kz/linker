import { Button } from "../ui/button";

// const Counter = ({
//   count,
//   plus,
//   minus,
// }: {
//   count: number;
//   plus: () => void;
//   minus: () => void;
// }) => {
//   return (
//     <Button
//       className="w-24 gap-0 justify-between border-primary text-primary p-0"
//       variant="outline"
//     >
//       <div className="w-1/3" onClick={minus}>
//         -
//       </div>
//       <span className="w-1/3">{count}</span>
//       <div className="w-1/3" onClick={plus}>
//         +
//       </div>
//     </Button>
//   );
// };

// export default Counter;
export default function Counter({
  count,
  plus,
  minus,
  disabled = false,
}: {
  count: number;
  plus: () => void;
  minus: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 select-none">
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
    </div>
  );
}
