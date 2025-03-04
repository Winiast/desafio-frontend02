/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useState, useEffect } from "react";

function App() {
  const [porcentageBar, setPorcentageBar] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [flag, setFlag] = useState(false);
  const [flagEmail, setFlagEmail] = useState(false);
  const [flagState, setFlagState] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [flagRadio, setFlagRadio] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    setPorcentageBar(porcentageBar);
    if (porcentageBar === 100) {
      setShowSubmit(true);
    }
  }, [porcentageBar]);

  const verifyName = () => {
    const regexName = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (regexName.test(name)) {
      setPorcentageBar(porcentageBar + 25);
      setFlag(true);
    } else if (name < 1 && porcentageBar > 0) {
      setPorcentageBar(porcentageBar - 25);
      setFlag(false);
    }
  };

  const verifyEmail = () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
      setPorcentageBar(porcentageBar + 25);
      setFlagEmail(true);
    } else if (email < 1 && porcentageBar > 0) {
      setPorcentageBar(porcentageBar - 25);
      setFlagEmail(false);
    }
  };

  const verifyState = () => {
    if (state !== "") {
      setPorcentageBar(porcentageBar + 25);
      setFlagState(true);
    } else if (state === "" && porcentageBar > 0) {
      setPorcentageBar(porcentageBar - 25);
      setFlagState(false);
    }
  };

  const verifyRadio = () => {
    if (flagRadio === false) {
      setPorcentageBar(porcentageBar + 25);
      setFlagRadio(true);
    } else {
    }
  };

  const submmit = () => {
    alert("Formulário enviado com sucesso!");
    setName("");
    setEmail("");
    setState("");
    setFlag(false);
    setFlagEmail(false);
    setFlagState(false);
    setShowRadio(false);
    setFlagRadio(false);
    setShowSubmit(false);
    setPorcentageBar(0);
    document.getElementById("radio1").checked = false;
    document.getElementById("radio2").checked = false;
    document.getElementById("select").value = "";
  };
  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${porcentageBar}%` }}></div>
        </div>
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            value={name}
            placeholder="Digite seu nome completo"
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={verifyName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">E-mail</label>
          <input
            value={email}
            placeholder="Digite seu e-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={verifyEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Estado Civil</label>
          <select
            onChange={(e) => {
              setState(e.target.value);
            }}
            onBlur={verifyState}
            id="select"
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                name="genero"
                id="radio1"
                onClick={() => {
                  setShowRadio(false);
                  verifyRadio();
                }}
              />
              Masculino
            </span>
            <span>
              <input
                type="radio"
                id="radio2"
                name="genero"
                onClick={() => {
                  setShowRadio(true);
                }}
              />
              Feminino
            </span>
          </div>
        </div>
        <button disabled={!showSubmit} onClick={submmit}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
