import React from "react";

var DataStateContent = React.createContext();
var DataDispatchContext = React.createContext();

function dataReducer(state, action) {
    switch (action.type) {
      case "LOAD_DATA":
        return { ...state, user_list : action.user_list };
      case "ADD_DATA":
        return { ...state, user_list : [...state.user_list, action.user] };
      case "LOAD_MESSAGES":
        console.log(`Load message !!!`);
        console.log(action);
        return { ...state, messages: action.messages };
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }

  function DataProvider({ children }) {
    var [state, dispatch] = React.useReducer(dataReducer, {
      user_list: [],
      messages: []
    });
  
    return (
      <DataStateContent.Provider value={state}>
        <DataDispatchContext.Provider value={dispatch}>
          {children}
        </DataDispatchContext.Provider>
      </DataStateContent.Provider>
    );
  }

  function useDataState() {
    var context = React.useContext(DataStateContent);
    if (context === undefined) {
      throw new Error("DataStateContent must be used within a DataProvider");
    }
    return context;
  }
  
  function useDataDispatch() {
    var context = React.useContext(DataDispatchContext);
    if (context === undefined) {
      throw new Error("DataDispatchContext must be used within a DataProvider");
    }
    return context;
  }

  export { DataProvider, useDataState, useDataDispatch, getUsers, setUser, getMessageCount };


// ########################################################### Business Logic

async function getUsers(dispatch) {

    // fetch('http://127.0.0.1:3000/mongo', { method : 'GET', headers : { 'Content-Type': 'application/json' }})
    // .then(data => data.json())
    //   .then(result => {
    //     console.log(result);
    //     dispatch({ type: 'LOAD_DATA', user_list: result })

    //   }).catch(function(err) {
    //     console.log(err);
    // });
    try {
      let data = await fetch('http://127.0.0.1:3000/mongo', { method : 'GET', headers : { 'Content-Type': 'application/json' }});
      let data_json = await data.json();
      dispatch({ type: 'LOAD_DATA', user_list: data_json })
    } catch(ex) {
          console.log(ex);
    }
    
  }

async function setUser(dispatch, user_id, name) {

    const post_options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, user_id: user_id})
      };

    try {
      let data = await fetch('http://127.0.0.1:3000/insert_mongo', post_options);
      let data_json = await data.json();
      dispatch({ type: 'ADD_DATA', user: data_json });
    } catch(ex) {
      console.log(ex);
    } 
    // fetch('http://127.0.0.1:3000/insert_mongo', post_options)
    // .then(data => data.json())
    // .then(result => {
    //     console.log(`Results ------>`)
    //     console.log(result);

    //     dispatch({ type: 'ADD_DATA', user: result[0] })
    // })
}

async function getMessageCount(dispatch) {

  try {
    const data = await fetch('http://127.0.0.1:3000/get_messages', {method: 'GET'});
    const data_json = await data.json();
    let resultArray = []
    for (let i = 0; i < 30; i++) {
      
      
    let message_arr = {}

    for(const user of data_json) {
      message_arr[user._id] = user.num_messages;
    }

    resultArray.push(message_arr);
  }
    console.log(resultArray);
    dispatch({ type: 'LOAD_MESSAGES', messages: resultArray });
  } catch(ex) {
    console.log(ex);
  }
}