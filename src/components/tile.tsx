interface Props {
  number: number;
  image?: string;
}

export default function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="tile black">
        {image && (
          <div
            className="chess-piece"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="tile white">
        {image && (
          <div
            className="chess-piece"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
      </div>
    );
  }
}
