import { useState } from "react";

function Basket({ basketData }) {
    const [small, setSmall] = useState(false);
    let total = 1;
    const basketClass = basketData.length > 0 ? "active" : "";
    const smallClass = small ? "small" : "";
    const handleSmallSize = () => {
        setSmall(!small)
    }
    return (
        <div className={`basket ${basketClass} ${smallClass}`}>
            <h2 onClick={handleSmallSize} className="basket__smallsize">
                <span>
                    İDDAA KUPONUM
                </span>
                <span className="basket__count">{basketData.length}</span>
            </h2>
            <div className="basket__wrapper">
                <ul>
                    {
                        basketData.map((item, index) => {
                            total *= item.rate;
                            return (
                                <li key={index}>
                                    <span>{item.mbs}</span>
                                    <span>Kod: {item.code}</span>
                                    <span className="flex-1">Maç: {item.match}</span>
                                    <strong>Oran: {item.rate}</strong>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3>Toplam Tutar: {total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</h3>
            </div>
        </div>
    );
}

export default Basket;