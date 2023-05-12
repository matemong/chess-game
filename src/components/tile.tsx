interface Props {
    number: number
    image?: string
}

export default function Tile({number, image}: Props) {
    if (number % 2 === 0) {
        return <div className="tile black"><img src={image}></img></div>
    } else{
        return <div className="tile white"><img src={image}></img></div>
    }
    
}