import React, {useState} from 'react';

//Conceitos Principais do React
//-> Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
//-> Propriedade:  Informações que um componente pai passa para o componente filho, como atributos.
//-> Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
 
function App() { //-> Isso é um componente
  const [counter, setCounter] = useState(0);//-> Isso é um estado

  function incrementCounter(){
    setCounter(counter + 1);
  }
  
  return (
    <>
      <h2>Contador: {counter}</h2>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
