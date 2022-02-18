import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Router, browserHistory } from 'react-router';

function Introduction() {
    return (
      <div className="intro-section">
        
        <div className="text-center text-white w-full md:w-3/5 mt-3">                   
          <div className="text-wrap font-bold text-6xl">
            About
          </div>
          <div className="text-wrap font-bold text-3xl mt-2">
            THE HOARD COLLECTION CONSISTS OF 10,000 UNIQUE NFT HOARD COINS INFLUENCED BY SEVERAL HISTORICAL ERA'S.
          </div>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/-qi8JiID0eU">
            </iframe>
          </div>          
          <div className="text-wrap font-bold text-3xl mt-8">
            INSTRUCTIONS
          </div>
          <div className="text-wrap font-bold text-3xl mt-1 opacity-90 hoard-coin">
            HOARD YOUR COINS
          </div>
          <div className="text-wrap font-bold text-xl mt-2 text-left">
            HOARD WALLET ADDRESS:
          </div>
          <div className="text-wrap mt-1 text-lg text-left line-height">
            You can reserve your HOARD by sending 25 XRD per HOARD TOKEN (Radix Tokens) to the HOARD WALLET address below.
          </div>
          <div className="text-wrap wallet-addr text-lg text-left font-bold w-full">
            rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left">
            EACH HOARD TOKEN IS 25 XRD currently:
          </div>
          <div className="text-wrap mt-1 text-lg text-left line-height">
            Add a note matching the units you have purchased. for Example -HOARD TOKENS x 10 please-, DO NOT ENCRYPT. Please do not  specify coin numbers as this Project Randmomly Distributes the Tokens for Fairness. If not followed exactly, your funds will be sent back, subject to -1 XRD to cover transaction fees. 
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left ">
            HOARD TOKEN/S WILL BE SENT BACK TO YOUR WALLET IN RETURN:
          </div>
          <div className="text-wrap mt-1 text-lg text-left line-height">
            This is currently a manual process right now, please be patient. Once you have recieved your HOARD TOKENS, you can check your allocation by coming back to www.hoardtokens.com website. Here you can see all of your coins by adding your wallet address in the ADVANCED BUTTON (wallet) text entry, as well as filter specific properties. If you want to guestimate the points of your HOARD TOKENS then you can goto the RARITY SEARCH BUTTON and export the data to compare. Lastly we have the LEADERBOARD BUTTON. Inside this page is the current leaderboard which will organically grow the more coins are purchased. The final Leaderboard is completed once all the 10000 HOARD TOKENS have been SOLD.
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left">
            FIND US HERE FOR VERIFICATION:
          </div>
          <div className="text-wrap wallet-addr mt-1 text-lg text-left line-height">
            <a 
              href="https://explorer.radixdlt.com/#/accounts/rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e"
              target="_blank"
              style={{ cursor: 'pointer' }}
              className="text-wrap"
            >
              https://explorer.radixdlt.com/#/accounts/rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
            </a>
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left">
            USE THE OFFICIAL WALLET HERE:
          </div>
          <div className="text-wrap wallet-addr mt-1 text-lg  text-left line-height">
            <a
              href="https://wallet.radixdlt.com/"
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              https://wallet.radixdlt.com/
            </a>            
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            ONLY USE RADIX'S NATIVE TOKEN (XRD):
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            The official Radix Wallet does NOT except ethereum wrapped Radix Tokens (EXRD).
          </div>
          <div className="text-wrap wallet-addr text-lg text-left">
            <a
              href="https://learn.radixdlt.com/article/how-can-i-purchase-xrd-and-exrd-tokens"
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              https://learn.radixdlt.com/article/how-can-i-purchase-xrd-and-exrd-tokens
            </a>
            
          </div>
          <div className="text-wrap font-bold text-3xl mt-8">
            TRADING
          </div>
          <div className="text-wrap font-bold text-lg mt-2">
            THE HOARD COLLECTION CONSISTS OF 10,000 UNIQUE HOARD COINS INFLUENCED BY SEVERAL HISTORICAL ERA'S.
          </div>
          <div className="text-wrap wallet-addr font-bold text-lg mt-1">
            You both negotiate the transaction through the HOARD wallet ONLY as we have to change the reserve list which will be reflected on the website: rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e 
          </div>
          <div className="text-wrap font-bold text-lg mt-1">
            Please do not encrypt or we will not be able to see the negociation. 
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            trading -offer- for -request-
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            where -offer- is what you are sending in the transaction and -request- is what the other party is sending in theirs.
          </div>
          <div className="text-wrap text-lg  text-left">
            If there is no XRD being traded, please send an additional transaction with the 10 xrd trading fee from either wallet with the message - trading fee.
          </div>
          <div className="text-wrap text-lg  text-left">
            For example, if you want to trade 100 xrd for HOARD 9000 and 10000, you would send 100 xrd to the HOARD TOKEN wallet with this message:.
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold">
            trading 100 xrd for 9000, 10000
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            The other party would have to send 2 HOARD tokens to the HOARD TOKEN wallet with this message:
          </div>
          <div className="text-wrap text-lg  text-left">
            trading 9000, 10000 for 100 xrd
          </div>
          <div className="text-wrap text-lg  text-left">
            If there is a match there, the trade will be finalized the next time we process the trade requests. The recipient would receive 90 xrd, 100 - 10 trading fee, and you would recieve 2 HOARD TOKENS. The database will be updated to reflect the new ownership. If you wish to cancel a pending trade, please get in touch in the links provided.
          </div>
          <div className="text-wrap font-bold text-3xl mt-8">
            DISCLAIMER
          </div>
          <div className="text-wrap wallet-addr font-bold text-lg mt-2">
            The Hoard Team will NOT be held responsible if your transactions are incorrect. Please make sure our address is accurate -see below-. You are advised to NOT use any ethereum wallets for sending XRD tokens to us. Wallet address here: rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            REACH US:
          </div>
          <div className="text-wrap wallet-addr mt-1 text-lg text-left line-height">
            TELEGRAM : <a href="https://t.me/HOARDTOKEN" target="_blank" style={{ cursor: 'pointer' }}>https://t.me/HOARDTOKEN</a>
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            TWITTER  : <a href="https://twitter.com/HOARDTOKEN" target="_blank" style={{ cursor: 'pointer' }}>https://twitter.com/HOARDTOKEN</a>
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            EMAIL : <a href="mail@hoardtoken.com" target="_blank" style={{ cursor: 'pointer' }}>mail@hoardtoken.com</a>
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            YOUTUBE : <a href="https://www.youtube.com/channel/UCm1QkEe5IYGXHkziEeNoNuQ" target="_blank" style={{ cursor: 'pointer' }}>https://www.youtube.com/channel/UCm1QkEe5IYGXHkziEeNoNuQ</a>
          </div>
          <div className="text-wrap font-bold text-3xl mt-4 opacity-90 hoard-coin">
            ON RADIX DLT
          </div>
        </div>
        <div 
          className="previous-icon"
          onClick={() => {
            browserHistory.push('/');
          }}>
          <i 
            className="fas fa-long-arrow-alt-left" 
            style={{ cursor: 'pointer' }}
          >            
          </i>&nbsp;
          Token List
        </div> 
      </div>
        
    )
}

export default Introduction;