import React, {useState} from 'react';

import './global.css'
import './App.css'
import './Sidebar.css'


function App() {

  
  return (
    <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <form>
            <div className="input-block">
              <label htmlFor="github_username">Usuário do Github</label>
              <input name="github_username" id="github_username" required />
            </div>
            <div className="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input name="techs" id="techs" required />
            </div>
            <div className="input-block">
              <label htmlFor="latitude">Tecnologias</label>
              <input name="techs" id="techs" required />
            </div>

            <div className="input-group">
              <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input name="latitude" id="latitude" required />
              </div>
              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input name="longitude" id="longitude" required />
              </div>
            </div>
            <button type="submit">Salvar</button>
          </form>
        </aside>


        <main>
          <ul>
            <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/8159987?s=460&v=4" alt="Leonardo Oliveira"></img>
                  <div className="user-info">
                    <strong>Leonardo Oliveira</strong>
                    <span>.NET, ReactJs, Node.js</span>
                  </div>
                </header>
                <p>Desenvolvedor apaixonado pelas melhores tecnlogoias de desenvolvimento.</p>
                <a href="https://github.com/lfmaker">Acessar perfil no Github</a>
            </li>
            <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/8159987?s=460&v=4" alt="Leonardo Oliveira"></img>
                  <div className="user-info">
                    <strong>Leonardo Oliveira</strong>
                    <span>.NET, ReactJs, Node.js</span>
                  </div>
                </header>
                <p>Desenvolvedor apaixonado pelas melhores tecnlogoias de desenvolvimento.</p>
                <a href="https://github.com/lfmaker">Acessar perfil no Github</a>
            </li>
            <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/8159987?s=460&v=4" alt="Leonardo Oliveira"></img>
                  <div className="user-info">
                    <strong>Leonardo Oliveira</strong>
                    <span>.NET, ReactJs, Node.js</span>
                  </div>
                </header>
                <p>Desenvolvedor apaixonado pelas melhores tecnlogoias de desenvolvimento.</p>
                <a href="https://github.com/lfmaker">Acessar perfil no Github</a>
            </li>
            <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/8159987?s=460&v=4" alt="Leonardo Oliveira"></img>
                  <div className="user-info">
                    <strong>Leonardo Oliveira</strong>
                    <span>.NET, ReactJs, Node.js</span>
                  </div>
                </header>
                <p>Desenvolvedor apaixonado pelas melhores tecnlogoias de desenvolvimento.</p>
                <a href="https://github.com/lfmaker">Acessar perfil no Github</a>
            </li>
            <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/8159987?s=460&v=4" alt="Leonardo Oliveira"></img>
                  <div className="user-info">
                    <strong>Leonardo Oliveira</strong>
                    <span>.NET, ReactJs, Node.js</span>
                  </div>
                </header>
                <p>Desenvolvedor apaixonado pelas melhores tecnlogoias de desenvolvimento.</p>
                <a href="https://github.com/lfmaker">Acessar perfil no Github</a>
            </li> 
          </ul>
        </main>
    </div>
  );


}

export default App;
