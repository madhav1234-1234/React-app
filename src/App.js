
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import axios from "axios"
const App = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const allUsers = useSelector(state => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get('https://reqres.in/api/users')
      .then((res) => {
        dispatch({ data: res.data, type: 'getUsers' });
        setLoading(false);
      }).catch(err => console.log(err));

  }, []);


  const getUserData = (id) => {
    // console.log(id);
    axios.get('https://reqres.in/api/users/' + id)
      .then((res) => {
        // console.log("This is my user data", res);
        setUserInfo(res?.data?.data);
      }).catch(err => console.log(err));
  }


  return (
    <div className='flex bg-gray-50 flex-col h-screen transition-height duration-75 ease-out'>
      {loading &&
        <div className="flex flex-col justify-center items-center w-full h-full">
          <TailSpin
            color="#00BFFF"
            height={100}
            width={100}
            className="m-5"
          />
          <p className="text-lg text-center px-2 my-2">{"Loading Users"}</p>
        </div>
      }

      {!loading &&
        <div className='h-full bg-gray-200  dark:bg-gray-800'>
          <div className="flex flex-wrap justify-center items-center mt-24">
            <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 h-60 bg-white  shadow-lg transform  duration-200 easy-in-out">
              {userInfo &&
                <>
                  <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full " src={userInfo?.avatar} alt="" />
                  </div>
                  <div className=" ">
                    <div className="text-center px-14">
                      <h2 className="text-gray-800 text-3xl font-bold">{userInfo?.first_name + " " + userInfo?.last_name}</h2>
                      <p className="text-gray-400 mt-2">{userInfo?.email}</p>
                    </div>
                  </div>
                </>}
              {!userInfo &&
                <>
                  <div>
                    <div className="flex justify-center items-center mt-10">
                      <h2 className="text-gray-800 text-3xl">Click on any Button</h2>
                    </div>
                  </div>
                </>}

            </div>
          </div>
          <div className='flex flex-wrap justify-center items-center mt-3'>
            {allUsers?.data?.map((res, index) => (
              <div
                className='flex bg-blue-500 rounded-full 
              font-bold text-white px-8 py-3 transition duration-300 ease-in-out 
              hover:bg-blue-600 m-2 cursor-pointer' key={index}
                onClick={() => getUserData(res?.id)}
              >{index + 1}</div>
            ))}
          </div>
        </div>}


    </div>
  )
}

export default App