interface Props {
  name: string;
  price: number;
  stock: number;
}

export const ProductCardView: React.FC<Props> = ({
  name,
  price,
  stock,
}: Props) => {
  return (
    <div>
      <h3 id='productName'>{name}</h3>
      <p id='productPrice'>{price}</p>
      <p id='productStock'>{stock}</p>
    </div>
  );
};
