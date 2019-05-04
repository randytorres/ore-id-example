import React from 'react'

export const UserDetails = (props) => {
  const { accountName, email, name, picture, username, handleLogout } = props
  return (
    <div style={{ marginTop:50, marginLeft:40 }}>
      <h3>User Info</h3>
      <img src={picture} style={{ width:50,height:50 }} alt='user'/>
      <p>accountName: {accountName}</p>
      <p>name: {name}</p>
      <p>username: {username}</p>
      <p>email: {email}</p>
      <button onClick={handleLogout} style={{ marginTop:20, padding: '10px', backgroundColor: '#FFFBE6', borderRadius: '5px'}}>
        Logout
      </button>
    </div>
  );
}