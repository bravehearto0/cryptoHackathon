pragma solidity ^0.4.24;

import "./Token.sol";
import "../PokemonPlatform.sol";

contract Auction {

    Token  public  mToken;

    PokemonPlatform public pokemon;

    struct Bid {
        address issuer;
        uint pokemonId;
        bytes32 blindedBid;
        uint deposit;
        address highestBidder;
        uint highestBid;
        uint biddingEnd;
        bool ended;
    }
    mapping(bytes32 => Bid) public bids;

    // modifier
    modifier onlyBefore(bytes32 _blindedBid) {
      require(now < bids[_blindedBid].biddingEnd);
      _;
    }

    modifier onlyAfter(bytes32 _blindedBid) {
      require(now > bids[_blindedBid].biddingEnd);
      _;
    }

    // event
    event BidSubmitted(address indexed _bider, bytes32 _blindedBid, uint _amount);
    event BidCreated(address indexed _issuer, bytes32 _blindedBid);
    event NeedBidHigher(address indexed _bider, bytes32 _blindedBid, uint _amount);
    event AuctionEnded(address indexed _caller, bytes32 _blindedBid, address indexed _winner, uint _highestBid);

    // constructor function
    constructor(address _tokenAddress, address _pokemonAddress) public {
        // address must be valid
        require(_tokenAddress != address(0));
        // instantiate deployed Ocean token contract
        mToken = Token(_tokenAddress);
        // pokemon instance
        pokemon = PokemonPlatform(_pokemonAddress);
    }

    // any one can create a blind bid - input hash value as id of bid, time for bidding in second
    function createBid(bytes32 _blindedBid, uint _pokemonId, uint _biddingTime) public onlyBefore(_blindedBid) {
        bids[_blindedBid] = Bid(msg.sender, _pokemonId, _blindedBid, 0, 0x0, 0, now + _biddingTime, false);
        emit BidCreated(msg.sender, _blindedBid);
    }

    // user submit their bids - transfer funds from msg.sender to Auction contract
    function submitBid(bytes32 _blindedBid, uint _amount) public returns (bool success){
        if (_amount <= bids[_blindedBid].highestBid) {
            emit NeedBidHigher(msg.sender, _blindedBid, _amount);
            return false;
        }
        if (bids[_blindedBid].highestBidder != address(0) && bids[_blindedBid].highestBid != 0 ) {
            // Refund the previously highest bidder.
            require(mToken.transfer(bids[_blindedBid].highestBidder, bids[_blindedBid].highestBid));
        }
        require(mToken.transferFrom(msg.sender, address(this), _amount));
        bids[_blindedBid].highestBid = _amount;
        bids[_blindedBid].highestBidder = msg.sender;
        emit BidSubmitted(msg.sender, _blindedBid, _amount);
        return true;
    }

    /// End the auction
    function auctionEnd(bytes32 _blindedBid) public onlyAfter(_blindedBid) {
        require(!bids[_blindedBid].ended);
        bids[_blindedBid].ended = true;
        // transfer ownership
        pokemon.changeOwner(bids[_blindedBid].highestBidder, bids[_blindedBid].pokemonId);
        // transfer funds
        require(mToken.transfer(bids[_blindedBid].issuer, bids[_blindedBid].highestBid));
        emit AuctionEnded(msg.sender, _blindedBid, bids[_blindedBid].highestBidder, bids[_blindedBid].highestBid);
    }

    // request tokens for bid  - demo purpose
    function requestToken(uint amount) public {
        require(mToken.transfer(msg.sender, amount));
    }

}
