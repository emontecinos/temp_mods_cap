import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Orders from '../orders';
import Order from '../order';
import Rent from '../rent';

// ------------------------------   CORREGIDOS   -------------------------------

import Carrier from '../carrier';
import Carriers from '../carriers';
import EditCarrier from '../carriers/editCarrier';
import RegisterCarrier from '../carriers/registerCarrier';
import Chats from '../chats';
import IndividualChat from '../chat';
import Home from '../home';
import Layout from '../layout';
import Login from '../login';
import Machine from '../machine';
import Machines from '../machines';
import ServiceProvider from '../serviceProvider';
import ServiceProviders from '../serviceProviders';
import EditServiceProvider from '../serviceProviders/editServiceProvider';
import RegisterServiceProvider from '../serviceProviders/registerServiceProvider';
import MobileUsers from '../users-mobile';
import MobileUserProfile from '../user-mobile';
import WebUsers from '../users-web';
import WebUsersRegister from '../users-web/registerUserWeb';
import WebUsersEdit from '../users-web/editUserWeb';
import OrderRegister from '../new-order/registerOrder';

import Type from '../type';
import Types from '../types';

const Router = () => {
  const currentUser = useSelector((state) => state.userInformation);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/types" component={Types} />
          <Route exact path="/types/:id" component={Type} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orders/new" component={OrderRegister} />
          <Route path="/orders/:id" component={Order} />
          <Route path="/rent/:id" component={Rent} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/carriers/register" component={RegisterCarrier} />
          <Route exact path="/carriers/edit/:id" component={EditCarrier} />
          <Route exact path="/carriers/:id" component={Carrier} />
          <Route exact path="/carriers" component={Carriers} />
          <Route exact path="/chats" component={Chats} />
          <Route excat path="/chats/:id" component={IndividualChat} />
          <Route exact path="/machines" component={Machines} />
          <Route exact path="/machines/:id" component={Machine} />
          <Route
            exact
            path="/serviceProviders/register"
            component={RegisterServiceProvider}
          />
          <Route
            exact
            path="/serviceProviders/edit/:id"
            component={EditServiceProvider}
          />
          <Route
            exact
            path="/serviceProviders/:id"
            component={ServiceProvider}
          />
          <Route exact path="/serviceProviders" component={ServiceProviders} />
          <Route exact path="/users-mobile" component={MobileUsers} />
          <Route exact path="/users-mobile/:id" component={MobileUserProfile} />
          <Route
            exact
            path="/users-web"
            component={currentUser.role === 'admin' ? WebUsers : Home}
          />
          <Route
            exact
            path="/users-web/register"
            component={currentUser.role === 'admin' ? WebUsersRegister : Home}
          />
          <Route
            exact
            path="/users-web/edit/:id"
            component={currentUser.role === 'admin' ? WebUsersEdit : Home}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
