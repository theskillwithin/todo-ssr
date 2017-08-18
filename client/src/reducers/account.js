const initialState = {
  email: '',
  firstName: '',
  //id: -1,
  isLoggedIn: false,
  lastName: ''
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
