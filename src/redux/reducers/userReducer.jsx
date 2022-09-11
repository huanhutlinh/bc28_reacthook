import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { ACCESS_TOKEN, getStore, getStoreJSON, setCookie, setStore, setStoreJSON, USER_LOGIN } from '../../util/config';

const initialState = {
    userLogin: getStoreJSON(USER_LOGIN)
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserLoginAction : (state,action) => {
            let userLogin = action.payload;
            state.userLogin =  userLogin;
            // state.userLogin.email = email;
        }
    }
});

export const { setUserLoginAction} = userReducer.actions

export default userReducer.reducer

/* ---------------- action api (Thunk) ----------------- */
export const signinApi = (userLogin) => { //userLogin = {email:'',password}


    return async dispatch => {
        try {
            let result = await axios({
                url: 'https://shop.cyberlearn.vn/api/Users/signin',
                method: 'POST',
                data: userLogin //{email:'',password:''}
            });

            //thành công
            //Lưu lại token
            setStore(ACCESS_TOKEN,result.data.content.accessToken);
            setCookie(result.data.content.accessToken,30,ACCESS_TOKEN);
            //Lưu email 
            setStoreJSON(USER_LOGIN,result.data.content)
        
            // console.log(result);
            //Đưa lên userLogin thành công lên reducer
            //result.data.content = {email:'',accessToken:''}
            const action = setUserLoginAction(result.data.content);
        
            dispatch(action)


        } catch (err) {
            console.log({err});
        }
    }
}


//call api getProfile
export const getProfileApi = ()=>{

    return async dispatch => {
        try {
            let result = await axios({
                url:'https://shop.cyberlearn.vn/api/Users/getProfile',
                method: 'POST',
                // data:'Dữ liệu người dùng nhập, chọn, thay đổi'
                headers: {
                    Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`
                }
            });

            console.log('Kết quả',result.data.content)
            //Tạo ra actioncreator => dispatch lên redux
            const action = setUserLoginAction(result.data.content);

            dispatch(action);
        }catch(err){
            console.log({err})
        }
    } 
}