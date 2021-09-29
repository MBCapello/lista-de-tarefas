import { useState } from 'react';
import close from './assets/delete.svg'


function Tarefa(props) {
  return (
    <li className="li">
      <span className="li__span"
        onClick={() => props.handleComplete(props.id)}
        style={{ textDecoration: props.completa ? 'line-through' : '' }} >
        {props.children}
      </span>
      <img className="li__img" src={close} alt="close"
        onClick={() => props.handleDelete(props.id)} />
    </li >
  )
};

function App() {

  const [tarefas, setTarefas] = useState([]);

  function handleKeyDown(event) {
    if (event.key !== 'Enter' || event.target.value === '') return;

    const novaTarefa = [...tarefas, {
      id: Math.random(), text: event.target.value,
      completa: false
    }]
    setTarefas(novaTarefa);

    event.target.value = '';
  };

  function handleDelete(id) {
    const novaTarefa = tarefas.filter(function (tarefa) {
      return tarefa.id !== id;
    });
    setTarefas(novaTarefa)
  };

  function handleComplete(id) {
    const novasTarefas = [...tarefas];
    const completas = novasTarefas.find(function (tarefa) {
      return tarefa.id === id;
    });
    completas.completa = !completas.completa;
    setTarefas(novasTarefas)
  };

  return (
    <div className="App">
      <div className="header">
        <div>
          <h1 className="header__h1">TAREFAS</h1>
          <input className="header__input" type="text" placeholder="Criar nova tarefa" onKeyDown={handleKeyDown} />
        </div>
      </div>
      <div className="list">
        <ul className="ul">
          {tarefas.map(function (tarefa) {
            return (
              <Tarefa
                key={tarefa.id}
                id={tarefa.id}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                completa={tarefa.completa}
              >{tarefa.text}
              </Tarefa>
            )
          })}
        </ul>
      </div>
    </div >
  );
}

export default App;
