import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";

export default function UserProfilePicture(){
    const [img, setImg] = useState("https://cdn-icons-png.flaticon.com/512/456/456212.png");
    useEffect(() => {

    }, [])
    
    return (
        <>
            <Image source={{uri:img}} style={{width:40, height:40}} />
        </>
    )
}