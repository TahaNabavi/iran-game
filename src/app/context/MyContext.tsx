"use client";

import { getCartCount } from "@/components/action/setCart";
import { CookGet } from "@/components/global/cookie";
import React, { Component, ReactNode, createContext } from "react";

const AppContext = createContext<any>(null);

class AppProvider extends Component<{ children: ReactNode }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      platformAccount: [],
      cart: 0,
    };
  }

  setPlatformAccount = (data: {
    type: "steam";
    data: {
      username: string;
      password: string;
    };
  }) => {
    this.setState({
      platformAccount: [data],
    });
  };
  reloadCart = async () => {
    const res = await getCartCount(CookGet("jwt"));
    if (res.status === 200) {
      this.setState({
        cart: res.data,
      });
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setPlatformAccount: this.setPlatformAccount,
          reloadCart: this.reloadCart,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export { AppProvider, AppContext };
