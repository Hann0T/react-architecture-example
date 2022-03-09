interface Props {
  name: string;
  price: number;
  stock: number;
}

export function ItemCard({ name, price, stock }: Props): JSX.Element {
  return (
    <div>
      <h3 id='productName'>{name}</h3>
      <p id='productPrice'>{price}</p>
      <p id='productStock'>{stock}</p>
    </div>
  );
}
