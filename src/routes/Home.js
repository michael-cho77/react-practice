import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        // const value = event.target.value;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files }
        } = event;
        const theFile = files[0]
        const reader = new FileReader();
        // 2. 읽은 파일에 대한 결과를 여기서 출력함 
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        }
        // 1. 여기서 먼저 파일을 읽고 
        reader.readAsDataURL(theFile);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;