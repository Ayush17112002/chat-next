"use client";

import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
export default function SideBar({ setReceiver }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const getAllUsers = onSnapshot(q, (querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            list.push(doc);
          });
          setUsers(list);
        });
        return () => getAllUsers;
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="bg-white col-span-2 h-[calc(100vh_-_8rem)]">
      {users.map((user) => {
        const data = user.data();
        if (data.name !== "Ayush" && data.type === "recruiter")
          return (
            <button
              onClick={setReceiver}
              key={user.id}
              id={user.id}
              className="w-full h-11 text-center text-xl border mb-1"
            >
              {data.name}
            </button>
          );
      })}
    </div>
  );
}
