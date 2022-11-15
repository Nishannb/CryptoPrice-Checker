import {useState, useEffect} from "react";
import axios from "axios";
import { Link} from "react-router-dom";

const DisperCoinData = ({Coins:{id, name, symbol, market_cap, current_price, image,price_change_percentage_24h }})=>{
        return (
           <>
            <div className="crypto-table">
                <div className="onecrypto">
                    <img src={image} alt={id} />
                    <h4><span>Name:</span> {name}</h4>
                    <p><span>Symbol:</span> {symbol.toUpperCase()}</p>
                    <p><span> Current Price:</span> $ {current_price.toLocaleString()}</p>
                    <p><span>Price Change: </span>{price_change_percentage_24h}%</p>
                    <p><span>Market Cap:</span> $ {market_cap.toLocaleString()}</p>
                    <Link to={id}><button>More Info</button> </Link>
                </div>    
            </div>
           </>
        )
    }

function Home(){
    const [coinData, setCoinData] = useState([])
    const [searchInput, setSearchInput]= useState('')
    const [searchResults, setSearchResults]= useState([])

    useEffect(()=>{
        const fetchCoinData = async()=>{
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        setCoinData(response.data)
        }
        fetchCoinData()
    }, []);

    
    const SearchTerm=(e)=>{
        setSearchInput(e.target.value)
        if(e.target.value !==""){
            const newCoinData = coinData.filter((coin)=>{
            return (Object.values(coin)
                        .join(' ')
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()
            ))}
        )
        setSearchResults(newCoinData)
        }
        else{   
            setSearchResults(coinData)
        }   
    }
    
    return(
        <>
        <h1 className="heading">Welcome to Crypto Checker App</h1>
        <div className="input">
            <input className="search-input" type='text' placeholder="Search for Coins" onChange={SearchTerm}  />
        </div>
        <section className="main">
            {searchInput.length <1 ? coinData.map((coin)=><DisperCoinData key={coin.id} Coins={coin} />) 
                                    : searchResults.map((coin)=><DisperCoinData key={coin.id} Coins={coin} />) }
            {searchResults.length < 1 && searchInput.length > 1 && <h2 className="no-result-found">No result found</h2> }
        </section>
        </>   
    )
}

export default Home