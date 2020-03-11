import React from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Warning.css";

function Warning() {
  const [cookies, setCookie] = useCookies(["userName", "chacked"]);

  function checkYes(event) {
    event.preventDefault();
    setCookie("chacked", true);
  }
  function checkNo(event) {
    event.preventDefault();
    setCookie("chacked", false);
  }

  return (
    <>
      <div id="nc-main" className="nc-main bg-cover bg-cc">
        <div className="startPage">
          <div className="smallStartPage">
            <div className="full-wh">
              <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
              </div>
            </div>
            <div>
              {cookies.chacked ? (
                cookies.chacked === "true" ? (
                  cookies.userName ? (
                    <Redirect from="warning" to="/" />
                  ) : (
                    <Redirect from="warning" to="/login" />
                  )
                ) : (
                  <h1 className="red">Sorry, you can't use this app</h1>
                )
              ) : (
                <>
                  <h1 className="segment">Are you 18+</h1>
                  <form onSubmit={checkYes}>
                    <button
                      style={{
                        backgroundColor: "#FFF",
                        color: "#0f4567",
                        textShadow: "none"
                      }}
                      type="submit"
                    >
                      Yes, Sure
                    </button>
                  </form>
                  <form onSubmit={checkNo}>
                    <button
                      type="submit"
                      style={{
                        color: "#FFF",
                        backgroundColor: "transparent",
                        textShadow: "none"
                      }}
                    >
                      No
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Warning;
