import { useEffect, useState, useCallback } from "react";
import VirtualScroll from "react-dynamic-virtual-scroll";
import Basket from "./Basket";

function Bets() {

    const betsApi = "https://nesine-case-study.onrender.com/bets";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [basketData, setBasketData] = useState([]);
    let updateBasketData = [];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(betsApi);
        const data = await response.json();
        setData(data);
        setLoading(false)
    };

    const handleRate = (e, id, item) => {
        const rate = e.innerHTML;
        const sameItemIndex = updateBasketData.findIndex(el => el.code === item.C);
        const isActive = e.classList.contains("active");
        if (sameItemIndex !== -1 && !isActive) {
            updateBasketData.splice(sameItemIndex, 1);
        }
        if (!isActive) {
            updateBasketData.push({
                id,
                mbs: item.OCG[1].MBS,
                code: item.C,
                match: item.N,
                rate: rate
            });
            setBasketData([...updateBasketData]);
            e.classList.add("active");
        } else {
            e.classList.remove("active");
            updateBasketData = updateBasketData.filter(el => el.code !== item.C);
            setBasketData([...updateBasketData]);
        }
    };

    const isInBasket = (itemCode, id) => {
        return updateBasketData.some(el => el.code === itemCode && el.id === id);
    };

    const renderItem = useCallback((rowIndex) => {
        const item = data[rowIndex];
        return (
            <div className="list__group">
                <div className="list__group--category">
                    <div className="cell">
                        {
                            item.D + " " + item.DAY + " " + item.LN
                        }
                    </div>
                    <div className="cell">
                        Yorumlar
                    </div>
                    <div className="cell"></div>
                    <div className="cell">
                        {
                            item.OCG[1].OC[0].N
                        }
                    </div>
                    <div className="cell">
                        {
                            item.OCG[1].OC[1].N
                        }
                    </div>
                    <div className="cell">
                        2
                    </div>
                    <div className="cell">
                        {
                            item.OCG[5].OC[25].N
                        }
                    </div>
                    <div className="cell">
                        {
                            item.OCG[5].OC[26].N
                        }
                    </div>
                    <div className="cell">
                        H1
                    </div>
                    <div className="cell">1</div>
                    <div className="cell">X</div>
                    <div className="cell">2</div>
                    <div className="cell">
                        H2
                    </div>
                    <div className="cell">
                        {
                            item.OCG[2].OC[3].N
                        }
                    </div>
                    <div className="cell">
                        {
                            item.OCG[2].OC[4].N
                        }
                    </div>
                    <div className="cell">
                        {
                            item.OCG[2].OC[5].N
                        }
                    </div>
                    <div className="cell">Var</div>
                    <div className="cell">Yok</div>
                    <div className="cell">+99</div>
                </div>
                <div className="list__group--category-item">
                    <div className="cell">
                        <strong> {item.C} </strong>
                        {
                            item.T + " " + item.N
                        }
                    </div>
                    <div className="cell">
                        Yorumlar
                    </div>
                    <div className="cell">
                        {
                            item.OCG[1].MBS
                        }
                    </div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[1].OC[0].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[1].OC[0].ID, item)}>
                        {
                            item.OCG[1].OC[0].O
                        }
                    </div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[1].OC[1].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[1].OC[1].ID, item)}>
                        {
                            item.OCG[1].OC[1].O
                        }
                    </div>
                    <div className="cell"></div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[5].OC[25].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[5].OC[25].ID, item)}>
                        {
                            item.OCG[5].OC[25].O
                        }
                    </div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[5].OC[26].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[5].OC[26].ID, item)}>
                        {
                            item.OCG[5].OC[26].O
                        }
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[2].OC[3].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[2].OC[3].ID, item)}>
                        {
                            item.OCG[2].OC[3].O
                        }
                    </div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[2].OC[4].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[2].OC[4].ID, item)}>
                        {
                            item.OCG[2].OC[4].O
                        }
                    </div>
                    <div className={`cell ${isInBasket(item.C, item.OCG[2].OC[5].ID) ? "active" : ""}`} onClick={(e) => handleRate(e.target, item.OCG[2].OC[5].ID, item)}>
                        {
                            item.OCG[2].OC[5].O
                        }
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell">3</div>
                </div>
            </div>
        );
    }, [data]);

    return (
        <div className={loading ? "loading" : ""}>
            <div className="table">
                <header>
                    <div className="cell th">
                        Event Count: {data.length}
                    </div>
                    <div className="cell th">
                        Yorumlar
                    </div>
                    <div className="cell th">

                    </div>
                    <div className="cell th">
                        1
                    </div>
                    <div className="cell th">
                        X
                    </div>
                    <div className="cell th">
                        2
                    </div>

                    <div className="cell th">
                        Alt
                    </div>
                    <div className="cell th">
                        Üst
                    </div>
                    <div className="cell th">
                        H1
                    </div>
                    <div className="cell th">
                        1
                    </div>
                    <div className="cell th">
                        X
                    </div>
                    <div className="cell th">
                        2
                    </div>
                    <div className="cell th">
                        H2
                    </div>
                    <div className="cell th">
                        1-X
                    </div>
                    <div className="cell th">
                        1-2
                    </div>
                    <div className="cell th">
                        X-2
                    </div>
                    <div className="cell th">
                        Var
                    </div>
                    <div className="cell th">
                        Yok
                    </div>
                    <div className="cell th">
                        +99
                    </div>

                </header>
                <main>
                    <VirtualScroll
                        className="list"
                        minItemHeight={40}
                        totalLength={data.length}
                        renderItem={renderItem}
                    />
                </main>
            </div>
            <Basket
                basketData={basketData}
            />
        </div>
    );
}

export default Bets;