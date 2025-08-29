// import React, { useState, useEffect } from 'react';
// import { Box, Zoom } from '@mui/material';
// import {auth } from "firebase/auth";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { collection,getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function Admin() {
    const [admin, setAdmins] = useState([]);
    const [users,setUsers] = useState([]);
    const [stations,setStations]= useState([]);
    const [bookings,setBookings]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Admins"));
                const querysnapshotUsers = await getDocs(collection(db,"Users"));
                const querysnapshotStations = await getDocs(collection(db,"Stations"));
                const querysnapshotBookings = await getDocs(collection(db,"Bookings"));
                // const a = querysnapshotBookings.docs('')
                const datau = querysnapshotUsers.docs.map(doc=>({id:doc.id,...doc.data()}));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const dataStation = querysnapshotStations.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const dataBookings = querysnapshotBookings.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setAdmins(data);
                setUsers(datau);
                setStations(dataStation)
                setBookings(dataBookings)

            } catch (error) {
                console.error("Error while fetching all users", error);
            }
        };
        // const 
        fetchData();
    }, []);

    return (
        <div style={{padding:"100px",maxWidth:"800px",margin:"auto",color:"white",display:"flex",flexDirection:"column"}}>
            {/* <div style={{display:"flex",gap:"20px",flexWrap:"wrap",color:"black"}}> */}
            <h2>Admin Panel,</h2>
            <div style={{ 
      display: "flex", 
    flexDirection:"row",
      gap: "20px", 
      flexWrap: "wrap", 
      alignItems: "center", 
      background: "#222", 
      padding: "25px 20px", 
      borderRadius: "12px",
      boxShadow: "8px 2px 8px 8px rgba(0,0,0,0.3)" 
  }}>
            
           <div
           style={{display:"flex",flexDirection:"column"}}
           > <p>Total Admins</p>
           <p> {admin.length}</p>
           </div>
           <div
           style={{display:"flex",flexDirection:"column",}}
           >
            <p>Total number of users Registered</p>
            <p> {users.length}</p>
            </div>
             <div
           style={{display:"flex",flexDirection:"column"}}
           > <p>Total Main Stations</p>
           <p> {stations.length}</p>
           </div>
             <div
           style={{display:"flex",flexDirection:"column"}}
           > <p>Total Bookings</p>
           <p> {bookings.length}</p>
           </div>
            {/* <ul>
                {admin.map(admin => (
                    <li key={admin.id}>{JSON.stringify(admin)}</li>
                ))}
            </ul> */}
            {/* </div> */}


            </div>

            <button
            onClick={() => {
                navigate("/adminRequest"); 
            }}
            >
                Admin Requests
            </button>
        </div>
    );
}

export default Admin;
    