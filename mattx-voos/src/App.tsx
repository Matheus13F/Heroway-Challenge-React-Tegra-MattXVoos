import React, { useState, useEffect, useDebugValue } from 'react';
import './CSS/index.css';
import GetCard from "./Components/Cards/Card";
import aviao from './IMG/aviao.svg';
import aviaodestino from './IMG/aviaodestino.svg';
import aviaoorigem from './IMG/aviaoorigem.svg';
import money from './IMG/money.svg';
import timetravel from './IMG/timetravel.svg';
import airdate from './IMG/airdate.svg';
import heroway from './IMG/heroway.svg';
import conection from './IMG/conection.svg';
import { debuglog } from 'util';

function App() {

  // interface IVoos {
  //   chegada: String;
  //   data_saida: String;
  //   destino: String;
  //   origem: String;
  //   valor: Number;
  //   voo: String;
  // }

  const [listaVoos, setListaVoos] = React.useState([]);

  async function getVoos(e: any) {    
    e.preventDefault();
    const method = 'POST';
    const url = 'https://api-voadora.dev.tegra.com.br/flight';
    const body = {
      from: from, // aeroporto de origem
      to: to, // aeroporto de destino
      date: date // data de partida
    }
    
    if(to === from){
      alert('Não existem viagens disponiveis! Tente novamente!');

    } else if(to === "" || from === "" || date === ""){ 
      alert('Selecione o aeroporto de origem e de destino!');
    }else {
      const responseVoos = await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      debugger;
      const todosvoos = await responseVoos.json();
      console.log(todosvoos);
      setAirpotList(todosvoos);
      setListaVoos(todosvoos);    
      
      if(todosvoos.length == 0) {
        alert("Não existem voos disponiveis para esta data!");
      }
    }
    return listaVoos;
  }
  
  
  function handlePartida(evt) {
    setFrom(evt.target.value);
  }
  function handleDestino(evt) {
    setTo(evt.target.value);
  }
  function handleDate(evt) {
    setDate(evt.target.value);
  }

  const [airportList, setAirpotList] = useState([]);
  const [from, setFrom] = useState(String);
  const [to, setTo] = useState(String);
  const [date, setDate] = useState(String);
  
  async function getAirport() {
    try {
      const response = await fetch('https://api-voadora.dev.tegra.com.br/flight/companies');
      const listAirport = await response.json();
      setAirpotList(listAirport);

    } catch (err) {
      alert('A conexão foi perdida :( \n    - Reload F5');
    }
  }

  useEffect(() => { getAirport() }, []);

  getAirport();

  return (
    <>
      <section className="header">
        <div className="title">
          <p className="matt">Matt-<span className="corX">X</span> Voos  <img src={aviao} className="sizeImg" alt="aeroplane" /></p>
          <h1>Passagens Aéreas de um jeito fácil!!</h1>
          <div className="linha"></div>
        </div>    

        <div className="search-bar">
          <span className="description">Aeroporto - Origem</span>

          <select name="partida" id="partida" onChange={handlePartida}>
            {airportList.map(airport => 
              <option key={airport.nome} value={airport.aeroporto}>  
                {airport.nome} - {airport.aeroporto} - {airport.cidade} 
              </option>)}
          </select>
          
          <span className="description">Aeroporto - Destino</span>

        <select name="destino" id="destino" onChange={handleDestino}>
            {airportList.map(airport => 
            <option key={airport.nome} value={airport.aeroporto}>
                {airport.nome} - {airport.aeroporto} - {airport.cidade}  
            </option>)}
          </select>

          <span className="description">Data da Viagem (Apenas entre 10 e 18 de FEV de 2019)</span>

          <input className="date-bar" id="date" type="date" min="2019-02-10" max="2019-02-18" required onChange={handleDate} />
          <button className="button" id="button" onClick={getVoos}>Pesquisar</button>
        </div>

        <div className="rodape">
          <h3 className="rodape-text">Copyright © Desafio Tegra 2020 - Matheus ("MattX") Ferreira</h3>
        </div>
      </section>        
        {/* <!-- CONTEUDO DO SITE --> */}
              
      <section>
        <div className="container">
          {listaVoos.map((voos) => {
                debugger;
                return (
                  <div className="Viagem1">
                    <div className="LinhaCard">
                      <img src={aviaoorigem} className="sizeCard" alt="logo" /><h4>Aeroporto de Origem: {voos.origem} </h4>
                    </div>
                    <div className="LinhaCard">
                      <img src={aviaodestino} className="sizeCard" alt="logo" /><h4>Aeroporto de Destino: {voos.destino} </h4>
                    </div>
                    <div className="LinhaCard">
                      <img src={timetravel} className="sizeCard1" alt="logo" /><h4>Tempo de Voo: </h4>
                    </div>
                    <div className="LinhaCard">
                      <img src={airdate} className="sizeCard1" alt="logo" /><h4>Data do Voo: {voos.date} </h4>
                    </div>
                    <div className="LinhaCard">
                      <img src={money} className="sizeCard2" alt="logo" /><h4>Valor da Passagem: </h4>
                    </div>
                    <div className="LinhaCard">
                      <img src={conection} className="sizeCard2" alt="logo" /><h4>Escalas: </h4>
                    </div>
                    <img src={heroway} className="sizeImg2" alt="aeroplane" />
                  </div>
                );
          })}

          {/* {listaVoos.map((setListaVoos) => { 
            return(
              <h4>{setListaVoos.chegada}</h4>
            )
          })} */}

          {/* <GetCard /> */}
        </div>

      
      </section>    
    </>
  );
}

export default App;