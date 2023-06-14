import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import vars, { cookies } from 'src/data/product-data';

import Cookies from 'universal-cookie';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);


export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '',
        avatar: '',
        name: '',
        email: ''
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    []
  );

  const signIn = async (username, password) => {
    let user = {
      username: username,
      password: password
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(user)
    };
    fetch("http://127.0.0.1:8081/authenticate", requestOptions).then(response => response.json()).then(data => {
      if (data.username !== null && data.username !== '') {
        try {
          window.sessionStorage.setItem('authenticated', 'true');
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });
        cookies.set('userId', data.id, { path: '/' });
        cookies.set('userName', data.name, { path: '/' });
        cookies.set('userSurname', data.surname, { path: '/' });
        window.location.href = "http://localhost:3000/";
      } else {
        try {
          window.sessionStorage.setItem('authenticated', 'false');
        } catch (err) {
          console.error(err);
        }

        window.location.href = "http://localhost:3000/auth/login";
      }
    })


  };

  const signUp = async (email, username, password) => {
    let user = {
      username: username,
      password: password,
      email: email,
      balance: 1000,
      name: '',
      surname: '',
      defGenre: '',
      phone: ''
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(user)
    };
    fetch("http://127.0.0.1:8085/updateUser", requestOptions).then(window.location.href = "http://localhost:3000/auth/login")
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    window.sessionStorage.setItem('authenticated', 'false');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
