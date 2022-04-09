import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Auth from "./views/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContextProvider from "./contexts/authContext";
import PostContextProvider from "./contexts/postContexts";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import PrortectedRouted from "./contexts/routing/PrortectedRouted";
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <PrortectedRouted exact path="/dashboard" component={Dashboard} />
            <PrortectedRouted exact path="/about" component={About} />
          </Switch>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
