import React from 'react';
import { Footer } from './Components/layout/Footer';
import { Header } from './Components/layout/Header';
import { Section } from './Components/layout/Section';
import './App.scss';
import { useSelector } from 'react-redux';

export function App() {

  const todosArrayNotEmpty = useSelector(({todosReducer}) => todosReducer.todosArrayNotEmpty);

  return <div className="app">
        <Header />
        <Section />
        {todosArrayNotEmpty ? (
          <React.Fragment>
            <Footer />
            <h4 className="hint">Double click to edit a todo</h4>
          </React.Fragment>
        ) : null}
      </div>
}