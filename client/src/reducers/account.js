const initialState = {
  email: null,
  firstName: null,
  //id: null,
  isLoggedIn: false,
  lastName: null
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      return {
        email: action.email,
        firstName: action.firstName,
        //id: action.id,
        isLoggedIn: true,
        lastName: action.lastName
      };
    }

    case 'SIGN_OUT': {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
