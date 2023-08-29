import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <section className="flex gap-8 text-lg font-bold py-2 bg-[#333333]">
        <h1 className="text-white ml-3 hover:text-[#ff6b6b] text-3xl">
          TodoFie
        </h1>
        <NavLink to="/">
          <h1 className="hover:text-[#ff6b6b] text-white text-3xl"> Todo</h1>
        </NavLink>
        <NavLink to="/seeTodo">
          <h1 className=" hover:text-[#ff6b6b] text-white text-3xl">
            See Todo
          </h1>
        </NavLink>
      </section>
    </header>
  );
};

export default Header;
