import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Coin from './components/coin';
import {apiURL} from '../src/config.json'
import './App.css';

function App() {

  const [coins , setCoins] = useState([]);
  const [search , setSearch] = useState('');

  useEffect(() => {
    axios.get(apiURL).then(res=>{
      setCoins(res.data)
    }).catch(error => {console.log(error)})
  } , []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const handleFilter = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a Currency</h1>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange} />
        </form>
      </div>
      {handleFilter.map(coin => {
        return(<Coin 
        key={coin.id}
        name={coin.name}
        image={coin.image}
        symbol={coin.symbol}
        market_cap={coin.market_cap}
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        volume={coin.total_volume}
        />)
      })}
    </div>
  );
}

export default App;
