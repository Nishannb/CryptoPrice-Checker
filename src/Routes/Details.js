import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const CoinData =({Coin:{id, name, symbol, market_data, image}})=>{
    return(
        <>
        <div className='coin-detail'>
            <h1>{name?.toUpperCase()}</h1>
            <div className='card'>
                <img src={image?.large} alt={id} />
                <div className='detail-info'>
                    <h3>Symbol: <span className='details'>{symbol?.toUpperCase()}</span></h3>
                    <h3>Current Price:<span className='details'> $ {market_data?.current_price?.usd.toLocaleString()}</span></h3>
                    <h3>Market Cap: <span className='details'> $ {market_data?.market_cap?.usd.toLocaleString()}</span> </h3>
                    <h3>Total Volume: <span className='details'> $ {market_data?.total_volume?.usd.toLocaleString()}</span></h3>
                    <h3>24hr High: <span className='details'> $ {market_data?.high_24h?.usd.toLocaleString()}</span></h3>
                    <h3>24hr Low: <span className='details'> $ {market_data?.low_24h?.usd.toLocaleString()}</span></h3>
                    <Link to="/"><button>Back</button></Link>
                </div>
            </div>
            
        </div>
        </>
        
    )
}


function Detail(){
    const [coin, setCoin]= useState("")
    const {id} = useParams()
     useEffect(()=>{
        const fetchOneCoinData = async()=>{
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        setCoin(response.data)
        }
        fetchOneCoinData()
    }, []);
    return(
        <div className='coin'>
            <CoinData Coin = {coin} />
        </div>
    
    )
  }

export default Detail