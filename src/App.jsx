import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProtectedRoute from './actions/ProtectedRoute';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { withNavigation } from './actions/withNavigation';
import Logout from './components/Logout';
import { PersistGate } from 'redux-persist/integration/react';


const LoginWithNavigation = withNavigation(Login);
const RegisterWithNavigation = withNavigation(Register);
const theme = createTheme();

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Container component="main" >
              <CssBaseline />
              <Router>
                <Routes>
                <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/login"
                    element={<LoginWithNavigation />}
                  ></Route>
                  <Route
                    path="/register"
                    element={<RegisterWithNavigation />}
                  ></Route>
                  <Route path="/logout" element={<Logout />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </Router>
            </Container>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;