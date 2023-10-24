const { createSlice, PayloadAction } = require('@reduxjs/toolkit');

const initialState = {
  value: {
    isAuth: false,
    username: '',
    uid: '',
    isModerator: false,
  }
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState
    },
    logIn: (state, action) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: 'dfassdfgsdfgsdfgs45',
          isModerator: false,
        }
      }
    }
  }
})

const { logOut, logIn } = auth.actions
module.exports = { logOut, logIn, reducer: auth.reducer }
