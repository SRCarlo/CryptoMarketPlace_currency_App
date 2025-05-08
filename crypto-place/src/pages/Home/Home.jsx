/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' // ✅ Import Framer Motion

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className='home'>
      <div className='hero'>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          Largest <br /> Crypto Marketplace
        </motion.h1>

        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
        >
          Welcome to the world's largest cryptocurrency marketplace.
          Sign up to explore more about cryptos.
        </motion.p>

        <motion.form
          onSubmit={searchHandler}
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        >
          <input
            onChange={inputHandler}
            list='coinlist'
            value={input}
            type="text"
            placeholder='Search Crypto'
            required
          />
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </motion.form>

      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>
            24h Changes
          </p>
          <p className='market-cap'>
            Market Cap
          </p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className='market-cap'>
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        }
      </div>

      {/* ✅ Animated Go To Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="go-top-btn"
      >
        ⬆
      </motion.button>

    </div>
  )
}

export default Home
