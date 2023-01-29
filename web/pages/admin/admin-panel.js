import React, { useEffect } from "react";
import axios from "axios";
export default function AdminPanel() {
  useEffect(() => {
    //Get param
    const param = new URL(window.location).searchParams.get("admin");
    if (
      param !==
      "983E12455436E662CB9E27FD32BBBBEC13A4F3D9C351F775E48A3DDF66223AC2BB7E55DF67"
    ) {
      window.location.replace("/");
    }
  }, []);

  const createTopic = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const f = {
      topic: data.get("name"),
      description: data.get("desc"),
      img: data.get("url"),
    };

    //Sent Req
    const res = await axios.post("/api/topics/create", f);
    console.log(res);
  };

  const globalNotif = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const f = {
      text: data.get("txt"),
      temp: {
        pfpic: data.get("url"),
        buf: data.get("buf"),
      },
    };

    //Sent Req
    const res = await axios.post("/api/notifications/global-create", f);
    console.log(res);
  };

  return (
    <div style={{ paddingLeft: 30 }}>
      <h1 style={{ textAlign: "center" }}>Ponder Admin Panel</h1>

      <form onSubmit={createTopic}>
        <h2>Create Topic</h2>
        <p>Topic Name</p>
        <input name="name" placeholder="Enter Topic Name..."></input>
        <p>Topic Description</p>
        <input name="desc" placeholder="Enter Topic Description..."></input>
        <p>Topic Picture URL</p>
        <input name="url" placeholder="Enter Topic Picture URL..."></input>
        <br />
        <br />
        <button>Create</button>
      </form>

      <h2>Data Controls</h2>
      <button>Wipe Everything except Users</button>

      <form onSubmit={globalNotif}>
        <h2>Global Notification</h2>
        <p>Title</p>
        <input name="txt" placeholder="Enter Text..."></input>
        <p>Actual Buffer</p>
        <input name="buf" placeholder="Enter Buffer..."></input>
        <p>Picture URL</p>
        <input name="url" placeholder="Enter Picture URL..."></input>
        <br />
        <br />
        <button>Create</button>
      </form>
    </div>
  );
}
