//Require
import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import Axios from 'axios';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

function Market() {
  //Initialize
  const params = useParams();
  const user_id = parseInt(params.id);
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    getUsers();
    getCart();
  }, []);

  useEffect(() => {
    setName(user.map(result => result.username));
    setMoney(user.map(result => result.money));
  }, [user]);

  const getUsers = () => {
    Axios.get('http://localhost:3001/users/' + user_id).then((response) => {
      //console.log(response.data);
      setUser(response.data);

    });

    Axios.get('http://localhost:3001/market/items').then((response) => {
      //console.log(response.data);
      setItem(response.data);
    });
  }

  const getCart = () => {
    Axios.get('http://localhost:3001/users/' + user_id + '/cart').then((response) => {
      //console.log(response.datas);
      setCart(response.data);

    });
  }

  const buyItem = (itemId, itemPrice) => {
    Axios.patch('http://localhost:3001/market/' + user_id +'/buy', {itemId: itemId, itemPrice: itemPrice, userMoney:money},
    ).then((response) => {

      if (response.data == false) {
        alert("You're broke nigga");
        return;
      }
      //console.log(response.data);
      getUsers();
      getCart();

    });
  }

  const sellItem = (itemId, itemPrice) => {
    Axios.patch('http://localhost:3001/market/' + user_id +'/sell', {itemId: itemId, itemPrice: itemPrice, userMoney:money},
    ).then((response) => {
      //console.log(response.data);
      getUsers();
      getCart();

    });
  }

  return (
    <div>
      <Container className="container">
        <h3>Welcome: {name}</h3>
        <h3>Your money: {money}</h3><br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {item.map(result => 
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.price}</td>
              <td><Button data={result.id} onClick={() => buyItem(result.id, result.price)}>Buy</Button></td>
            </tr>
            )}
          </tbody>
        </Table>
        
        <h2>Your Cart</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {cart.map((result) => {
          return (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.price}</td>
              <td><Button data={result.id} onClick={() => sellItem(result.id, result.price)}>Sell</Button></td>
            </tr>
          );
        })}
          </tbody>
        </Table>
        
      </Container>
    </div>
  )
}

export default Market
